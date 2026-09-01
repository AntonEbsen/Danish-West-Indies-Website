export const prerender = false;

import { getEntry } from 'astro:content';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST({ request }) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing slug' }), { status: 400 });
    }

    const chapter = await getEntry('thesis', slug);

    if (!chapter) {
      return new Response(JSON.stringify({ error: 'Chapter not found' }), { status: 404 });
    }

    // Pass the raw markdown text to Claude
    const prompt = `You are a helpful academic assistant analyzing a Master's Thesis about the economic history of the Danish West Indies.
    Please summarize the following chapter in 3 to 5 clear, concise bullet points. 
    Focus on the most important historical and economic takeaways. 
    
    Chapter Title: ${chapter.data.title}
    
    Chapter Content:
    ${chapter.body}`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      prompt: prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in summarize API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
