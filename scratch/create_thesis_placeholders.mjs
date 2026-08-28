import fs from 'fs';
import path from 'path';

const chapters = [
  "Acknowledgements",
  "Declaration of AI Transparency",
  "Preface",
  "Terminology",
  "Table of Contents",
  "List of Figures",
  "List of Tables",
  "List of Maps",
  "Abstract",
  "Introduction",
  "Historical Background",
  "Theoretical Framework",
  "Literature Review",
  "Description of Data",
  "Empirical Results",
  "Robustness",
  "Discussion",
  "Conclusion",
  "References",
  "Data Appendix",
  "Historical Background Appendix",
  "Replication Appendix",
  "Empirical Results Appendix",
  "Robustness Appendix"
];

const dir = path.join(process.cwd(), 'src', 'content', 'thesis');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Convert title to slug
function toSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

chapters.forEach((title, index) => {
  const chapterNumber = index + 1;
  const slug = toSlug(title);
  // Pad number for nice file sorting (e.g. 01-acknowledgements.md)
  const padNum = chapterNumber.toString().padStart(2, '0');
  const filename = `${padNum}-${slug}.md`;
  
  const content = `---
title: "${title}"
chapterNumber: ${chapterNumber}
description: "Placeholder content for ${title}"
---

# ${title}

*This section is currently a placeholder. Content for the master thesis will be added here prior to final submission.*
`;

  fs.writeFileSync(path.join(dir, filename), content);
});

console.log(`Successfully created ${chapters.length} placeholder thesis chapters.`);
