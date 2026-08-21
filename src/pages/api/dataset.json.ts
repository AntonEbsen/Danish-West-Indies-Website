import { getCollection } from 'astro:content';

export async function GET() {
  const allEntries = await getCollection('memorial');
  
  // Format the data for public consumption
  const data = allEntries.map(entry => ({
    id: entry.id,
    ...entry.data
  }));

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Allow CORS for researchers
      'Access-Control-Allow-Origin': '*',
    }
  });
}
