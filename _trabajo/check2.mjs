import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026/parts';
const files = ['c1a','c1b','c2a','c2b','c3a','c3b','c4a','c4b','c5a','c5b']
  .map(n => `parts/${n}.html`)
  .filter(f => fs.existsSync(path.join('C:/Users/mario/Desktop/Promo Octubre 2026', f)));

let texts = [];
for (const f of files) {
  const html = fs.readFileSync(path.join('C:/Users/mario/Desktop/Promo Octubre 2026', f), 'utf8');
  const arts = html.match(/<article id="(art-\d+-\d+)"[\s\S]*?<\/article>/g) || [];
  for (const a of arts) {
    const id = (a.match(/<article id="(art-\d+-\d+)"/) || [])[1];
    const text = a.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    texts.push({ id, text });
  }
}

// frases repetidas (>= 12 palabras) entre artículos distintos
const seen = new Map();
const dups = [];
for (const { id, text } of texts) {
  const sents = text.split(/(?<=[.!?])\s+/).filter(s => s.split(' ').length >= 12);
  for (const s of sents) {
    const key = s.toLowerCase().replace(/[^a-záéíóúñü ]/g, '').trim();
    if (seen.has(key) && seen.get(key).id !== id) dups.push(`${seen.get(key).id} == ${id}: ${s.slice(0, 90)}`);
    else seen.set(key, { id });
  }
}

console.log(`artículos analizados: ${texts.length}`);
console.log(`frases largas repetidas entre artículos: ${dups.length}`);
dups.slice(0, 25).forEach(d => console.log('  ' + d));

const bad = [];
for (const f of files) {
  const html = fs.readFileSync(path.join('C:/Users/mario/Desktop/Promo Octubre 2026', f), 'utf8');
  for (const token of ['Lorem', 'TODO', 'XXX', '[insertar', 'Sección 1', '<br', '<div class="articulo"', '<h3', '<h4', 'Categoría ', '&amp;nbsp;']) {
    if (html.includes(token)) bad.push(`${f}: contiene "${token}"`);
  }
  // comillas rectas y dobles espacios en texto visible
  const visible = html.replace(/<[^>]+>/g, ' ');
  const straight = visible.match(/["']/g);
  if (straight) bad.push(`${f}: ${straight.length} comillas rectas en texto visible`);
  const dbl = visible.match(/[^\s] {2,}[^\s]/g);
  if (dbl) bad.push(`${f}: ${dbl.length} dobles espacios`);
}
console.log('\n--- OTROS HALLAZGOS ---');
console.log(bad.length ? bad.join('\n') : 'ninguno');
