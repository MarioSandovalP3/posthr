import fs from 'node:fs';
const html = fs.readFileSync('C:/Users/mario/Desktop/Promo Octubre 2026/articulos.html', 'utf8');
const arts = html.match(/<article id="(art-\d+-\d+)"[\s\S]*?<\/article>/g) || [];
let issues = 0;
const titles = new Set();
for (const a of arts) {
  const id = a.match(/id="(art-\d+-\d+)"/)[1];
  const h1 = (a.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  if (titles.has(h1)) { console.log(`${id}: título duplicado`); issues++; }
  titles.add(h1);
  const h2s = [...a.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m => m[1].trim());
  const dup = h2s.filter((h, i) => h2s.indexOf(h) !== i);
  if (dup.length) { console.log(`${id}: subtítulos repetidos -> ${[...new Set(dup)].join(' | ')}`); issues++; }
  if (h2s.length < 5) { console.log(`${id}: solo ${h2s.length} subtítulos`); issues++; }
  if (!h2s.some(h => /^Conclusi[oó]n/i.test(h))) { console.log(`${id}: sin h2 de conclusión`); issues++; }
  if (/<h2[^>]*>\s*(Secci[oó]n|\d+\.)/i.test(a)) { console.log(`${id}: h2 con numeración/Sección`); issues++; }
}
console.log(`artículos: ${arts.length} | títulos únicos: ${titles.size} | incidencias: ${issues}`);
