import fs from 'fs';
import path from 'path';

const langs = ['da', 'es', 'fr', 'nl', 'ak', 'de', 'nh', 'yo', 'ig', 'kg', 'sv', 'pt'];

// Files to copy
const filesToCopy = [
  { src: 'src/pages/resources/index.astro', dest: 'resources/index.astro' },
  { src: 'src/pages/thesis/index.astro', dest: 'thesis/index.astro' },
  { src: 'src/pages/thesis/[slug].astro', dest: 'thesis/[slug].astro' }
];

filesToCopy.forEach(file => {
  const srcPath = path.join(process.cwd(), file.src);
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    return;
  }
  
  // Adjust relative imports (e.g. '../../layouts/Layout.astro' -> '../../../layouts/Layout.astro')
  let content = fs.readFileSync(srcPath, 'utf8');
  content = content.replace(/..\/..\/layouts\/Layout.astro/g, '../../../layouts/Layout.astro');
  
  for (const lang of langs) {
    const destPath = path.join(process.cwd(), 'src', 'pages', lang, file.dest);
    
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.writeFileSync(destPath, content);
  }
});

console.log("Successfully copied resources and thesis routes to localized folders.");
