import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026';
const H2_OK = '<h2 style="color:hsl(0, 0%, 20%); font-size:1.4em; font-weight:bold; margin-top:20px; margin-bottom:10px;">';
const H1_RE = /^<h1 style="color:hsl\(0, 0%, 12%\); font-size:1\.7em; font-weight:bold; margin:0 0 14px; line-height:1\.3;">/;
const P_SPAN_RE = /^<p><span style="color:hsl\(0, 0%, 30%\);">[\s\S]*<\/span><\/p>$/;
const P_EMPTY = '<p>&nbsp;</p>';

const files = process.argv.slice(2);
let problems = [];

function wordCount(html) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text ? text.split(' ').length : 0;
}

for (const f of files) {
  const abs = path.join(root, f);
  if (!fs.existsSync(abs)) { problems.push(`${f}: NO EXISTE`); continue; }
  const html = fs.readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
  const arts = html.split(/<!-- ART[IÍ]CULO [\d.]+ -->/).slice(1);
  const artBlocks = html.match(/<article id="art-(\d+)-(\d+)"[\s\S]*?<\/article>/g) || [];
  const h1s = html.match(/<h1[^>]*>/g) || [];
  const h2s = html.match(/<h2[^>]*>/g) || [];
  const h2ok = html.split(H2_OK).length - 1;
  const pAll = html.match(/<p>[\s\S]*?<\/p>/g) || [];
  const pEmpty = pAll.filter(p => p === P_EMPTY).length;
  const pContent = pAll.filter(p => p !== P_EMPTY);
  const badP = pContent.filter(p => !P_SPAN_RE.test(p));

  // empty paragraph before every h2
  let missingSpaceBeforeH2 = 0;
  const h2idx = [...html.matchAll(/<h2[^>]*>/g)].map(m => m.index);
  for (const i of h2idx) {
    const before = html.slice(Math.max(0, i - 60), i);
    if (!before.includes(P_EMPTY)) missingSpaceBeforeH2++;
  }

  const secLabel = /(Secci[oó]n:|SECCI[OÓ]N|Secci&oacute;n)/.test(html);
  const h3 = (html.match(/<h3/g) || []).length;

  console.log(`\n== ${f}`);
  console.log(`  bytes=${html.length}  articulos=${artBlocks.length}  h1=${h1s.length}  h2=${h2s.length}  h2_exactos=${h2ok}`);
  console.log(`  p_total=${pAll.length}  p_vacios=${pEmpty}  p_contenido=${pContent.length}  p_sin_span=${badP.length}`);
  console.log(`  h2_sin_espacio_previo=${missingSpaceBeforeH2}  h3=${h3}  "Seccion:"=${secLabel}`);
  for (const a of artBlocks) {
    const id = (a.match(/<article id="([^"]+)"/) || [])[1];
    const t = (a.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '(sin h1)';
    const hs = (a.split(H2_OK).length - 1);
    const wc = wordCount(a);
    console.log(`   - ${id}  h2=${hs}  palabras=${wc}  ${wc < 700 ? '<<< CORTO' : ''}  ${t.slice(0, 58)}`);
    if (wc < 700) problems.push(`${id}: solo ${wc} palabras`);
  }
  if (badP.length) problems.push(`${f}: ${badP.length} párrafos sin span`);
  if (h2s.length !== h2ok) problems.push(`${f}: ${h2s.length - h2ok} h2 fuera de formato`);
  if (missingSpaceBeforeH2) problems.push(`${f}: ${missingSpaceBeforeH2} h2 sin <p>&nbsp;</p> previo`);
  if (h3) problems.push(`${f}: contiene h3`);
  if (artBlocks.length === 0) problems.push(`${f}: sin <article>`);
}

console.log('\n--- PROBLEMAS ---');
console.log(problems.length ? problems.map(p => ' * ' + p).join('\n') : 'ninguno');
