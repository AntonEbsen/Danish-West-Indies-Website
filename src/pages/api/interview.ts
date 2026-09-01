export const prerender = false;

import { getCollection } from 'astro:content';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import MiniSearch from 'minisearch';

const personas = {
  "peter-von-scholten": {
    name: "Governor Peter von Scholten",
    description: "Governor-General of the Danish West Indies from 1827 to 1848, who emancipated the enslaved population under threat of rebellion."
  },
  "mary-thomas": {
    name: "Queen Mary Thomas",
    description: "One of the 'Queens' of the 1878 Fireburn labor riot on St. Croix. A fierce leader demanding fair wages and rights for contract workers."
  },
  "general-buddhoe": {
    name: "General Buddhoe (John Gottlieb)",
    description: "The leader of the 1848 Emancipation Rebellion on St. Croix, who organized thousands of enslaved people to march on Fort Frederik."
  },
  "anna-heegaard": {
    name: "Anna Heegaard",
    description: "A wealthy Free Woman of Color and the common-law wife of Peter von Scholten, who greatly influenced colonial society."
  }
};

export async function POST({ request }) {
  try {
    const { messages, personaId } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid messages array' }), { status: 400 });
    }
    
    if (!personaId || !personas[personaId]) {
      return new Response(JSON.stringify({ error: 'Invalid persona' }), { status: 400 });
    }

    const persona = personas[personaId];

    // Get the last user message to use as our search query
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;

    // Advanced RAG Retrieval using MiniSearch
    const history = await getCollection('history');
    const thesis = await getCollection('thesis');

    const documents = [
      ...history.map(doc => ({ id: doc.id, title: doc.data.title, text: doc.body })),
      ...thesis.map(doc => ({ id: doc.id, title: doc.data.title, text: doc.body }))
    ];

    const miniSearch = new MiniSearch({
      fields: ['title', 'text'], 
      storeFields: ['title', 'text'],
      searchOptions: { boost: { title: 2 }, fuzzy: 0.2, prefix: true }
    });

    miniSearch.addAll(documents);
    // Combine the query with the persona name to ensure we get context about them
    const results = miniSearch.search(`${persona.name} ${query}`);
    const topDocs = results.slice(0, 3);

    let contextString = "No specific archival context found, but rely on your vast historical knowledge of this figure.";
    if (topDocs.length > 0) {
      contextString = topDocs.map(doc => `--- ARTICLE TITLE: ${doc.title} ---\n${doc.text.substring(0, 2000)}...\n`).join('\n\n');
    }

    // Build the Persona System Prompt
    const systemPrompt = `You are an interactive historical roleplay AI.
You are playing the role of: ${persona.name}
Description of your persona: ${persona.description}

ARCHIVAL CONTEXT ABOUT YOU AND YOUR ERA:
${contextString}

ROLEPLAY RULES:
1. You must respond in the first person ("I") strictly as ${persona.name}.
2. Never break character. Do not refer to yourself as an AI.
3. Base your answers on the provided archival context and actual historical facts. If asked something historically inaccurate, correct the user from your perspective.
4. Adopt a tone appropriate for your historical figure (e.g., Peter von Scholten might be aristocratic and defensive about emancipation; Queen Mary Thomas would be fiery, demanding justice and tired of exploitation).
5. Ensure your language is historically immersive but understandable to modern students.
6. Automatically detect the language the user is speaking. Even if the historical figure did not speak that language natively, you must answer in the user's chosen language to ensure accessibility.
7. Be concise (1-2 paragraphs max). Formatting with markdown is allowed.`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in interview API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
