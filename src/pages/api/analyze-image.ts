export const prerender = false;

import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST({ request }) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: 'Missing image URL' }), { status: 400 });
    }

    // Convert local URL to absolute if necessary (for development/testing)
    // In a real production environment, you might need to fetch the image and pass it as base64
    // However, since Claude needs a public URL or base64, we will assume the image URL is accessible 
    // or we will fetch it on the server and convert to base64.
    
    // For local dev, we must fetch the image ourselves and send as base64
    const origin = new URL(request.url).origin;
    const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${origin}${imageUrl}`;
    
    const imageRes = await fetch(fullUrl);
    if (!imageRes.ok) throw new Error('Failed to fetch image');
    
    const arrayBuffer = await imageRes.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageRes.headers.get('content-type') || 'image/jpeg';

    const systemPrompt = `You are an expert archivist and historian for the Danish West Indies. 
Analyze the provided historical image, ledger, or map. 
Describe what it depicts, any readable text, its historical significance, and any context you can derive.
Format your response in markdown. Be academic but accessible.`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Please analyze this archival document/image.' },
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
    console.error("Error in analyze-image API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
