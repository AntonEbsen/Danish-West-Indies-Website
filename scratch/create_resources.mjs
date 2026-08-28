import fs from 'fs';
import path from 'path';

const resources = [
  {
    id: "st-croix-landmarks-society",
    title: "St. Croix Landmarks Society",
    category: "website",
    link: "https://www.stcroixlandmarks.org/",
    description: "Dedicated to the preservation of St. Croix's rich history, this society manages several historic properties, including the Whim Museum and the Research Library & Archives, which are essential for genealogical research."
  },
  {
    id: "enslaved-org",
    title: "Enslaved: Peoples of the Historical Slave Trade",
    category: "website",
    link: "https://enslaved.org/",
    description: "A robust digital hub that brings together historical records regarding enslaved individuals, slaveholders, and related events, allowing researchers to explore the intricate web of the historical slave trade."
  },
  {
    id: "st-john-rebellion-article",
    title: "The 1733 St. John Slave Rebellion",
    category: "article",
    link: "https://www.blackpast.org/global-african-history/st-john-slave-rebellion-1733-1734/",
    description: "A comprehensive overview of one of the earliest and longest-lasting slave rebellions in the Americas. Enslaved Akans (referred to as Amina) took control of the island of St. John for six months."
  },
  {
    id: "royal-library-denmark",
    title: "The Royal Danish Library (Det Kgl. Bibliotek)",
    category: "archive",
    link: "https://www.kb.dk/en",
    description: "Denmark's national library holds extensive collections of maps, photographs, newspapers, and manuscripts relating to the Danish West Indies, many of which have been digitized."
  },
  {
    id: "dloc",
    title: "Digital Library of the Caribbean (dLOC)",
    category: "archive",
    link: "https://dloc.com/",
    description: "A cooperative digital library for resources from and about the Caribbean. It provides access to digitized versions of historical Caribbean newspapers, official documents, maps, and historical texts."
  },
  {
    id: "national-museum-denmark",
    title: "The National Museum of Denmark",
    category: "website",
    link: "https://en.natmus.dk/",
    description: "Features permanent exhibitions on Denmark's colonial history and the transatlantic slave trade, showcasing physical artifacts brought from the Danish West Indies to Copenhagen."
  },
  {
    id: "vi-public-libraries",
    title: "Virgin Islands Public Libraries & Archives",
    category: "archive",
    link: "https://www.usvilib.org/",
    description: "The territorial library system holds vital local records, historical newspapers, and physical archives necessary for understanding local historical narratives post-Transfer."
  },
  {
    id: "night-of-the-fire",
    title: "Night of the Fire: The St. Croix Slave Rebellion",
    category: "book",
    link: "https://uwipress.com/",
    description: "A historical account focusing on the sociopolitical climate that led to the 1848 rebellion, analyzing the organization of the enslaved workers."
  },
  {
    id: "black-danes-project",
    title: "The Black Danes Project",
    category: "website",
    link: "https://www.blackdanes.com/",
    description: "An initiative that documents and explores the lives of Black individuals in Denmark during the colonial era, specifically focusing on those who migrated or were brought from the Danish West Indies."
  },
  {
    id: "transfer-day",
    title: "Transfer Day Centennial Archive",
    category: "website",
    link: "https://www.vitransfercentennial.org/",
    description: "Created for the 100th anniversary of the transfer of the islands from Denmark to the US in 1917, featuring historical essays, timelines, and digitized records."
  },
  {
    id: "whim-museum",
    title: "Estate Whim Museum",
    category: "website",
    link: "https://www.stcroixlandmarks.org/museums/estate-whim-museum",
    description: "The only colonial-era estate museum in the Virgin Islands. Its restored buildings and ruins offer a stark, physical look into the spatial organization of a Danish sugar plantation."
  }
];

const dir = path.join(process.cwd(), 'src', 'content', 'resources');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

for (const res of resources) {
  const content = JSON.stringify({
    title: res.title,
    category: res.category,
    link: res.link,
    description: res.description
  }, null, 2);
  
  fs.writeFileSync(path.join(dir, `${res.id}.json`), content);
}

console.log('Successfully created 11 more resources.');
