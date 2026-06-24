import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  'cm-to-inches',
  'inches-to-cm',
  'feet-to-cm',
  'cm-to-feet',
  'meters-to-feet',
  'feet-to-meters',
  'mm-to-inches',
  'inches-to-mm',
  'about-us',
  'contact-us',
  'privacy-policy',
  'terms-and-conditions',
  'disclaimer',
  'cookie-policy',
  'sitemap',
  'blog',
  'blog/how-many-inches-in-1-cm',
  'blog/cm-vs-inches',
  'blog/uk-height-conversion-guide',
  'blog/clothing-size-conversion',
  'blog/international-measurement-systems',
  '150-cm-to-inches',
  '170-cm-to-inches',
  '180-cm-to-inches',
  '200-cm-to-inches',
  '5-feet-in-cm',
  '6-feet-in-cm'
];

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf-8');

routes.forEach((route) => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), indexContent, 'utf-8');
  console.log(`Generated: ${route}/index.html`);
});

// Also create a 404.html at the root of dist as a fallback
fs.writeFileSync(path.join(distDir, '404.html'), indexContent, 'utf-8');
console.log('Generated: 404.html fallback');

console.log('Static route prerendering completed successfully!');
