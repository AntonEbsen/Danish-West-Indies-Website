export const prerender = false;

import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

// Simulated dataset of the economic/demographic data
const dataset = {
  islandPopulations: [
    { year: 1750, stCroix: 8000, stThomas: 3500, stJohn: 2000 },
    { year: 1770, stCroix: 18000, stThomas: 4200, stJohn: 2300 },
    { year: 1790, stCroix: 22000, stThomas: 4800, stJohn: 2100 },
    { year: 1810, stCroix: 26000, stThomas: 5500, stJohn: 2400 },
    { year: 1830, stCroix: 22000, stThomas: 6000, stJohn: 2200 },
    { year: 1848, stCroix: 19000, stThomas: 5000, stJohn: 2000 }
  ],
  sugarVsMortality: [
    { year: 1790, sugarTons: 12000, mortalityRatePct: 4.5 },
    { year: 1800, sugarTons: 15000, mortalityRatePct: 5.2 },
    { year: 1810, sugarTons: 14000, mortalityRatePct: 4.8 },
    { year: 1820, sugarTons: 11000, mortalityRatePct: 3.5 },
    { year: 1830, sugarTons: 9000, mortalityRatePct: 3.2 },
    { year: 1840, sugarTons: 7500, mortalityRatePct: 2.9 }
  ]
};

export async function POST({ request }) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages array' }), { status: 400 });
    }

    const systemPrompt = `You are a Data Analyst and Economic Historian for the Danish West Indies.
You are equipped with the following raw dataset (JSON):

${JSON.stringify(dataset, null, 2)}

RULES:
1. When the user asks a quantitative question, refer to the dataset and perform the necessary calculations or data retrieval.
2. Explain what the numbers mean historically (e.g., higher mortality correlates with peak sugar output).
3. Do not invent data outside this JSON. If the data does not exist, say so.
4. Keep answers clear, academic, and concise. Format with markdown.`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20240620'),
      system: systemPrompt,
      messages: messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in data-chat API:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
