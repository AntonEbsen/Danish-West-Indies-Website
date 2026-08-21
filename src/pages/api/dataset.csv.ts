import { getCollection } from 'astro:content';

export async function GET() {
  const allEntries = await getCollection('memorial');
  
  if (allEntries.length === 0) {
    return new Response("No data available", { status: 404 });
  }

  // Get headers from schema
  const headers = ['id', 'name', 'yearOfBirth', 'yearOfDeath', 'origin', 'location', 'island', 'plantation', 'source', 'tags'];
  
  let csv = headers.join(',') + '\n';

  allEntries.forEach(entry => {
    const row = headers.map(header => {
      if (header === 'id') return entry.id;
      
      let val = entry.data[header as keyof typeof entry.data];
      
      if (val === undefined || val === null) {
        return '';
      }
      
      if (Array.isArray(val)) {
        val = val.join(';');
      }
      
      // Escape quotes and wrap in quotes if contains comma
      const strVal = String(val).replace(/"/g, '""');
      if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
        return `"${strVal}"`;
      }
      return strVal;
    });
    
    csv += row.join(',') + '\n';
  });

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="memorial_register.csv"',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
