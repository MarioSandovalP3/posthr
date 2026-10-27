import fs from 'node:fs';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026';
const data = fs.readFileSync(`${root}/data.txt`, 'utf8').replace(/\r\n/g, '\n');
const html = fs.readFileSync(`${root}/articulos.html`, 'utf8').replace(/\r\n/g, '\n');

// títulos esperados por categoría
const cats = [];
let current = null;
for (const line of data.split('\n').map(l => l.trim()).filter(Boolean)) {
  const m = line.match(/^Categoría (\d):\s*(.+)$/);
  if (m) { current = { n: +m[1], name: m[2], titles: [] }; cats.push(current); }
  else if (current) current.titles.push(line);
}

const expected = [];
for (const c of cats) for (const t of c.titles) expected.push({ cat: c.n, title: t });

const got = [...html.matchAll(/<article id="art-(\d+)-(\d+)"[\s\S]*?<h1 style="color:hsl\(0, 0%, 12%\); font-size:1\.7em; font-weight:bold; margin:0 0 14px; line-height:1\.3;">([\s\S]*?)<\/h1>/g)]
  .map(m => ({ cat: +m[1], n: +m[2], title: m[3].trim() }));

console.log(`Títulos en data.txt: ${expected.length} | Artículos en HTML: ${got.length}`);

const norm = s => s.toLowerCase().replace(/[«»“”"']/g, '').replace(/\s+/g, ' ').replace(/[.,;:!?¿¡]/g, '').trim();
let mismatches = 0, orderErrors = 0;
expected.forEach((e, i) => {
  const g = got[i];
  if (!g) { console.log(`  FALTA artículo ${i + 1}`); mismatches++; return; }
  if (norm(g.title) !== norm(e.title)) { console.log(`  TÍTULO DISTINTO #${i + 1}\n    esperado: ${e.title}\n    obtenido: ${g.title}`); mismatches++; }
  if (g.cat !== e.cat) { console.log(`  CATEGORÍA DISTINTA #${i + 1}: ${g.cat} vs ${e.cat}`); orderErrors++; }
});
console.log(`títulos no coincidentes: ${mismatches} | errores de categoría: ${orderErrors}`);

// categorías y divisores
const dividers = [...html.matchAll(/CATEGORÍA (\d): ([^<]+)</g)].map(m => `${m[1]}: ${m[2]}`);
console.log('\ndivisores de categoría:');
dividers.forEach(d => console.log('  ' + d));

// integridad de etiquetas
const count = re => (html.match(re) || []).length;
console.log(`\n<article> abiertos=${count(/<article /g)} cerrados=${count(/<\/article>/g)}`);
console.log(`<h1>=${count(/<h1 /g)}  <h2>=${count(/<h2 /g)}  <p>=${count(/<p>/g)}  </p>=${count(/<\/p>/g)}`);
console.log(`<ul>=${count(/<ul>/g)}  <li>=${count(/<li>/g)}  </li>=${count(/<\/li>/g)}  <ul>cerrados=${count(/<\/ul>/g)}`);
console.log(`<strong>=${count(/<strong>/g)}  <em>=${count(/<em>/g)}  <br>=${count(/<br/g)}`);
console.log(`doctype/head/body: ${html.startsWith('<!DOCTYPE html>')} / ${html.includes('<head>')} / ${html.includes('<body>')}`);
console.log(`cierre html: ${html.trimEnd().endsWith('</html>')}`);

// palabras totales
const text = html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
console.log(`\npalabras visibles totales: ${text.split(' ').length}`);
