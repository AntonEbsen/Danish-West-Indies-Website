import fs from 'fs';
import path from 'path';

const langs = ['da', 'es', 'fr', 'nl', 'ak', 'de', 'nh', 'yo', 'ig', 'kg', 'sv', 'pt'];
const srcIndex = path.join(process.cwd(), 'src', 'pages', 'languages', 'index.astro');
const srcId = path.join(process.cwd(), 'src', 'pages', 'languages', '[id].astro');

const indexContent = fs.readFileSync(srcIndex, 'utf8').replace("../../layouts/Layout.astro", "../../../layouts/Layout.astro").replace("../../i18n/utils", "../../../i18n/utils");
const idContent = fs.readFileSync(srcId, 'utf8').replace("../../layouts/Layout.astro", "../../../layouts/Layout.astro");

for (const lang of langs) {
  const destDir = path.join(process.cwd(), 'src', 'pages', lang, 'languages');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.writeFileSync(path.join(destDir, 'index.astro'), indexContent);
  fs.writeFileSync(path.join(destDir, '[id].astro'), idContent);
}
console.log("Successfully copied language routes and updated imports.");
