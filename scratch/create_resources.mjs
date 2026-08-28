import fs from 'fs';
import path from 'path';

const resources = [
  {
    id: "rigsarkivet-dwi",
    title: "The Danish National Archives (Rigsarkivet) - Danish West Indies Sources",
    type: "archive",
    author: "Rigsarkivet",
    url: "https://www.sa.dk/en/brug-arkivet/danish-west-indies/",
    description: "The primary repository for colonial records from the Danish West Indies. It holds millions of digitized documents, including census records, police reports, and correspondence between the local administration and Copenhagen."
  },
  {
    id: "visha",
    title: "Virgin Islands Social History Associates (VISHA)",
    type: "website",
    author: "George Tyson",
    url: "https://www.visharoots.org/",
    description: "An incredible genealogical and historical database compiling biographical data of the enslaved and free populations in the Danish West Indies from historical censuses and parish records."
  },
  {
    id: "slave-voyages",
    title: "SlaveVoyages Database",
    type: "website",
    author: "Emory University et al.",
    url: "https://www.slavevoyages.org/",
    description: "The premier digital database for the transatlantic slave trade. It includes comprehensive data on voyages made under the Danish flag and those that disembarked at St. Thomas, St. Croix, and St. John."
  },
  {
    id: "neville-hall-slave-society",
    title: "Slave Society in the Danish West Indies: St. Thomas, St. John, and St. Croix",
    type: "book",
    author: "Neville A. T. Hall",
    url: "https://uwipress.com/9789764100295/slave-society-in-the-danish-west-indies/",
    description: "A foundational text on the social history of the Danish West Indies, exploring the complex dynamics between the enslaved population, the free people of color, and the colonial elite."
  },
  {
    id: "gunvor-simonsen-slave-stories",
    title: "Slave Stories: Law, Representation, and Gender in the Danish West Indies",
    type: "book",
    author: "Gunvor Simonsen",
    url: "https://www.jstor.org/stable/j.ctt1wf4dhw",
    description: "An in-depth analysis of the legal and social framework of the Danish West Indies, focusing on how the enslaved used the colonial legal system to navigate and resist their enslavement, with a strong focus on gender."
  },
  {
    id: "von-scholten-rebellion",
    title: "The 1848 Emancipation Rebellion",
    type: "article",
    author: "Virgin Islands History",
    url: "https://www.virgin-islands-history.org/en/history/slavery/the-rebellion-in-1848/",
    description: "A detailed historical overview of the events leading up to July 3, 1848, when General Buddhoe led a massive rebellion on St. Croix that resulted in Governor-General Peter von Scholten declaring emancipation."
  },
  {
    id: "fireburn-documentary",
    title: "Fireburn The Documentary",
    type: "video",
    author: "Angela Golden Bryan",
    url: "https://www.fireburndocumentary.org/",
    description: "An award-winning documentary exploring the 1878 labor revolt on St. Croix known as the Fireburn, led by three extraordinary women: Queen Mary, Queen Agnes, and Queen Mathilda."
  },
  {
    id: "moravian-archives",
    title: "Moravian Archives (Herrnhut)",
    type: "archive",
    author: "Unitätsarchiv Herrnhut",
    url: "https://www.archiv.ebu.de/",
    description: "The Moravian Brethren were the first missionaries in the Danish West Indies (arriving in 1732). Their archives contain incredibly detailed diaries, censuses, and correspondence regarding the daily lives of the enslaved."
  },
  {
    id: "buddhoe-park",
    title: "Buddhoe Park & Frederiksted",
    type: "website",
    author: "St. Croix Tourism",
    url: "https://www.gotostcroix.com/st-croix-blog/buddhoe-park/",
    description: "Information regarding the historical site in Frederiksted where the 1848 emancipation was declared, honoring the leader of the rebellion, General Buddhoe."
  },
  {
    id: "usni-archives",
    title: "U.S. National Archives - Virgin Islands Records",
    type: "archive",
    author: "National Archives and Records Administration (NARA)",
    url: "https://www.archives.gov/",
    description: "Records pertaining to the transfer of the islands from Denmark to the United States in 1917, as well as subsequent territorial administration records."
  },
  {
    id: "st-thomas-historical-trust",
    title: "St. Thomas Historical Trust",
    type: "website",
    author: "St. Thomas Historical Trust",
    url: "https://www.stthomashistoricaltrust.org/",
    description: "An organization dedicated to preserving the history and architecture of St. Thomas, featuring extensive resources on the island's colonial and maritime history."
  },
  {
    id: "danish-maritime-museum",
    title: "M/S Maritime Museum of Denmark",
    type: "archive",
    author: "M/S Museet for Søfart",
    url: "https://mfs.dk/en/",
    description: "Holds extensive collections and exhibits related to Danish maritime history, including the ships that participated in the Triangular Trade and journeys to the West Indies."
  }
];

const dir = path.join(process.cwd(), 'src', 'content', 'resources');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

for (const res of resources) {
  const content = JSON.stringify({
    title: res.title,
    type: res.type,
    author: res.author,
    url: res.url,
    description: res.description
  }, null, 2);
  
  fs.writeFileSync(path.join(dir, \`\${res.id}.json\`), content);
}

console.log('Successfully created 12 new resources.');
