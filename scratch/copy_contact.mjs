import fs from 'fs';
import path from 'path';

const langs = ['da', 'es', 'fr', 'nl', 'ak', 'de', 'nh', 'yo', 'ig', 'kg', 'sv', 'pt'];
const srcPath = path.join(process.cwd(), 'src', 'pages', 'contact.astro');

const content = fs.readFileSync(srcPath, 'utf8').replace("../layouts/Layout.astro", "../../layouts/Layout.astro").replace("../i18n/utils", "../../i18n/utils");

for (const lang of langs) {
  const destPath = path.join(process.cwd(), 'src', 'pages', lang, 'contact.astro');
  fs.writeFileSync(destPath, content);
}
console.log("Successfully copied contact.astro to localized folders.");
