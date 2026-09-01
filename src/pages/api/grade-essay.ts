export const prerender = false;

import { getCollection } from 'astro:content';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import MiniSearch from 'minisearch';

export async function POST({ request }) {
  try {
    const { essayText } = await request.json();

    if (!essayText || typeof essayText !== 'string' || essayText.trim().length < 50) {
      return new Response(JSON.stringify({ error: 'Please provide a valid essay (min 50 characters).' }), { status: 400 });
    }

    // Advanced RAG Retrieval using MiniSearch to ground the grading
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
    // Search for keywords from the essay to find relevant historical context
    // We just take the first 100 words of the essay to build a search query
    const query = essayText.split(/\s+/).slice(0, 100).join(" ");
    const results = miniSearch.search(query);
    const topDocs = results.slice(0, 3);

    let contextString = "No specific archival context matched, use general historical knowledge of the Danish West Indies.";
    if (topDocs.length > 0) {
      contextString = topDocs.map(doc => `--- ARCHIVE REFERENCE: ${doc.title} ---\n${doc.text.substring(0, 2000)}...\n`).join('\n\n');
    }

    const systemPrompt = `You are a strict but constructive Academic Peer-Reviewer specializing in the history of the Danish West Indies.
You are evaluating a student's essay.

ARCHIVAL CONTEXT FOR FACT-CHECKING:
${contextString}

YOUR TASK:
1. Grade the essay based on Historical Accuracy (using the provided archival context). Point out any factual errors.
2. Check for Ethical Terminology (e.g., the student should use "enslaved people" instead of "slaves", and should center the agency of the oppressed).
3. Evaluate the Argument Strength and clarity.
4. Provide a final constructive summary.

Format your response using markdown with clear headings:
### Historical Accuracy
### Ethical Terminology
### Argument & Style
### Final Verdict`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Please grade the following essay:\n\n"${essayText}"`
        }
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in grade-essay API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
