import { getCollection } from 'astro:content';

export async function GET() {
  const history = await getCollection('history');
  const thesis = await getCollection('thesis');
  const memorial = await getCollection('memorial');
  
  // Combine all content into a lightweight JSON index
  const searchIndex = [
    ...history.map((item) => ({
      title: item.data.title,
      description: item.data.description || '',
      url: `/history/${item.id}`,
      type: 'History',
      tags: item.data.tags || [],
    })),
    ...thesis.map((item) => ({
      title: item.data.title,
      description: item.data.description || '',
      url: `/thesis/${item.id}`,
      type: 'Thesis',
      tags: [],
    })),
    ...memorial.map((item) => ({
      title: item.data.name,
      description: item.data.biography || '',
      url: `/memorial`, // Assuming we just link to the main memorial page for now
      type: 'Memorial',
      tags: item.data.tags || [],
    })),
  ];

  return new Response(JSON.stringify(searchIndex), {
    headers: { 'Content-Type': 'application/json' },
  });
}
