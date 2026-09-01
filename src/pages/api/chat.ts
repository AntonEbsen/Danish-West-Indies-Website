export const prerender = false;

import { getCollection } from 'astro:content';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import MiniSearch from 'minisearch';

export async function POST({ request }) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid messages array' }), { status: 400 });
    }

    // Get the last user message to use as our search query
    const lastMessage = messages[messages.length - 1];
    const query = lastMessage.content;

    // 1. Advanced RAG Retrieval using MiniSearch
    const history = await getCollection('history');
    const thesis = await getCollection('thesis');

    const documents = [
      ...history.map(doc => ({
        id: `history-${doc.id}`,
        title: doc.data.title,
        description: doc.data.description || '',
        text: doc.body,
        type: 'history'
      })),
      ...thesis.map(doc => ({
        id: `thesis-${doc.id}`,
        title: doc.data.title,
        description: doc.data.description || '',
        text: doc.body,
        type: 'thesis'
      }))
    ];

    const miniSearch = new MiniSearch({
      fields: ['title', 'description', 'text'], // fields to index for full-text search
      storeFields: ['title', 'text', 'type'], // fields to return with search results
      searchOptions: {
        boost: { title: 3, description: 2 },
        fuzzy: 0.2,
        prefix: true
      }
    });

    // Index all documents
    miniSearch.addAll(documents);

    // Search
    const results = miniSearch.search(query);
    const topDocs = results.slice(0, 3);

    let contextString = "No highly relevant context found in the archives for this exact query, but use your general historical knowledge of the Danish West Indies if applicable.";
    if (topDocs.length > 0) {
      contextString = topDocs.map(doc => `--- ARTICLE TITLE: ${doc.title} ---\n${doc.text.substring(0, 3000)}...\n`).join('\n\n');
    }

    // 2. Build the System Prompt with Strict Tone & Ethics Guardrails
    const systemPrompt = `You are a specialized, expert historian AI assistant for the Danish West Indies digital archive.
Your job is to answer the user's questions based primarily on the provided archival context below.

ARCHIVAL CONTEXT:
${contextString}

STRICT ETHICS & TONE GUIDELINES:
1. Always use modern, respectful terminology: use "enslaved people" instead of "slaves", and "enslavers" instead of "masters" or "owners".
2. Center the experiences, agency, and resistance of the enslaved populations.
3. Avoid passive voice when describing colonial violence or oppression (e.g., instead of "harsh punishments were administered", say "enslavers administered harsh punishments").
4. Maintain a highly respectful, objective, and academic tone.
5. MULTILINGUAL SUPPORT: You must automatically detect the language of the user's input. Even though the archival context is mostly in English, you must translate your final historical response into the user's native language (e.g., Danish, Spanish, Yoruba) to ensure global accessibility.

RULES:
1. Answer the question using ONLY the provided archival context if possible.
2. If the context does not contain the answer, say "I don't have enough specific information in the retrieved archives to answer that completely, but based on historical context..." and provide a cautious answer. Do not make up facts or hallucinate.
3. Cite the article titles when you reference them.
4. Be concise and format your answer with markdown when appropriate.
5. IMPORTANT: At the very end of your response, you MUST provide exactly 3 suggested follow-up questions that the user might want to ask next. Wrap these 3 questions in a <suggestions> XML tag, separating each question with a new line. For example:
<suggestions>
What were the consequences of the 1733 Slave Codes?
How did General Buddhoe lead the 1848 rebellion?
Explain the economic impact of the sugar beet.
</suggestions>`;

    // 3. Stream response with Claude 3.5
    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      messages: messages, // Send the full conversation history
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
