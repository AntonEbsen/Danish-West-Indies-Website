export const prerender = false;

import { getEntry } from 'astro:content';
import { generateText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST({ request }) {
  try {
    const { slug, type } = await request.json();

    if (!slug || !type) {
      return new Response(JSON.stringify({ error: 'Missing slug or type' }), { status: 400 });
    }

    const doc = await getEntry(type, slug);

    if (!doc) {
      return new Response(JSON.stringify({ error: 'Document not found' }), { status: 404 });
    }

    const systemPrompt = `You are an expert history educator. Your job is to create a dynamic lesson plan based on the provided archival text.
You MUST output ONLY valid JSON. Do not output any markdown formatting, backticks, or conversational text. Just the raw JSON object.

The JSON object must have this exact structure:
{
  "flashcards": [
    { "term": "Term 1", "definition": "Definition 1" },
    ... exactly 5 flashcards ...
  ],
  "quiz": [
    {
      "question": "Question 1?",
      "options": ["A", "B", "C", "D"],
      "answerIndex": 0,
      "explanation": "Explanation 1"
    },
    ... exactly 3 quiz questions ...
  ]
}

ARCHIVAL TEXT:
${doc.body.substring(0, 15000)}`;

    const { text } = await generateText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      prompt: "Generate the lesson plan JSON now.",
    });

    // Try to parse it to ensure it's valid JSON before sending
    const parsed = JSON.parse(text);

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error in generate-lesson API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
