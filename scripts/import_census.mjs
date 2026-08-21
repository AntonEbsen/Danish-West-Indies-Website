import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// A simple script to convert CSV data into JSON files for the memorial collection.
// Usage: node scripts/import_census.mjs <path-to-csv>
// The CSV should have headers: name, yearOfBirth, origin, location, island, plantation, biography, notes, tags (comma separated), source

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '../src/content/memorial');

async function importCensus() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Please provide a path to the CSV file. Example: node import_census.mjs data.csv");
    process.exit(1);
  }

  const csvPath = path.resolve(args[0]);
  if (!fs.existsSync(csvPath)) {
    console.error(`File not found: ${csvPath}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');
  
  if (lines.length < 2) {
    console.error("CSV file is empty or only contains headers.");
    process.exit(1);
  }

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  let count = 0;

  for (let i = 1; i < lines.length; i++) {
    // Basic CSV parsing (doesn't handle quotes with commas inside perfectly, but good for demo)
    const values = lines[i].split(',').map(v => v.trim());
    const record = {};

    headers.forEach((header, index) => {
      let val = values[index];
      if (val === undefined || val === '') return;

      // Type conversions
      if (header === 'yearofbirth' || header === 'yearofdeath') {
        record[header === 'yearofbirth' ? 'yearOfBirth' : 'yearOfDeath'] = parseInt(val, 10);
      } else if (header === 'maplat' || header === 'maplng') {
        record[header === 'maplat' ? 'mapLat' : 'mapLng'] = parseFloat(val);
      } else if (header === 'tags') {
        record.tags = val.split(';').map(t => t.trim()).filter(Boolean);
      } else if (header === 'images') {
        record.images = val.split(';').map(t => t.trim()).filter(Boolean);
      } else {
        record[header] = val;
      }
    });

    if (record.name) {
      // Create a filename friendly slug
      const slug = record.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const filePath = path.join(outputDir, `${slug}.json`);
      
      fs.writeFileSync(filePath, JSON.stringify(record, null, 2));
      console.log(`Created: ${slug}.json`);
      count++;
    }
  }

  console.log(`\nImport complete. Created ${count} entries.`);
}

importCensus().catch(console.error);
