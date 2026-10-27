import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026';
const parts = ['c1a', 'c1b', 'c2a', 'c2b', 'c3a', 'c3b', 'c4a', 'c4b', 'c5a', 'c5b'];

const head = fs.readFileSync(path.join(root, 'parts/_head.html'), 'utf8').replace(/\r\n/g, '\n').trim();
const foot = fs.readFileSync(path.join(root, 'parts/_foot.html'), 'utf8').replace(/\r\n/g, '\n').trim();

const blocks = parts.map(p => {
  const file = path.join(root, `parts/${p}.html`);
  if (!fs.existsSync(file)) throw new Error(`Falta ${file}`);
  return fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').trim();
});

const body = blocks.join('\n\n');
const out = `${head}\n\n${body}\n\n${foot}\n`;
fs.writeFileSync(path.join(root, 'articulos.html'), out, 'utf8');

const arts = out.match(/<article id="art-\d+-\d+"/g) || [];
console.log(`articulos.html escrito: ${out.length} bytes, ${arts.length} artículos, ${out.split('\n').length} líneas`);
