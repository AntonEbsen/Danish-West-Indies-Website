export const prerender = false;

import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST({ request }) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: 'Missing image URL' }), { status: 400 });
    }
    
    // For local dev/testing
    const origin = new URL(request.url).origin;
    const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${origin}${imageUrl}`;
    
    const imageRes = await fetch(fullUrl);
    if (!imageRes.ok) throw new Error('Failed to fetch image');
    
    const arrayBuffer = await imageRes.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageRes.headers.get('content-type') || 'image/jpeg';

    const systemPrompt = `You are an expert archivist and paleographer specializing in the Danish West Indies.
You will be provided with an image of a historical manuscript or document (often written in old Gothic Danish script).

Your task is to:
1. Provide a careful transcription of the visible text in its original language.
2. Provide a side-by-side modern English translation.
3. Briefly explain the historical context or significance of the document.

Format your response exactly like this:

### Original Transcription
[Your transcription here]

### English Translation
[Your translation here]

### Historical Context
[Your explanation here]`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Please transcribe, translate, and explain this archival manuscript.' },
            {
              type: 'image',
              image: `data:${mimeType};base64,${base64Data}`,
            },
          ],
        },
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in transcribe API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
