import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026';
const H2_OK = '<h2 style="color:hsl(0, 0%, 20%); font-size:1.4em; font-weight:bold; margin-top:20px; margin-bottom:10px;">';
const P_SPAN = /^<p><span style="color:hsl\(0, 0%, 30%\);">[\s\S]*<\/span><\/p>$/;
const P_EMPTY = '<p>&nbsp;</p>';

let problems = [], totalArts = 0, totalH2 = 0, totalP = 0, totalWords = 0, seenIds = new Set();

for (let i = 1; i <= 25; i++) {
  const file = `parte${i}.html`;
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) { problems.push(`${file}: no existe`); continue; }
  const html = fs.readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
  const arts = html.match(/<article id="art-(\d+)-(\d+)"[\s\S]*?<\/article>/g) || [];
  const h2s = html.match(/<h2[^>]*>/g) || [];
  const h2ok = html.split(H2_OK).length - 1;
  const ps = html.match(/<p>[\s\S]*?<\/p>/g) || [];
  const pContent = ps.filter(p => p !== P_EMPTY);
  const badP = pContent.filter(p => !P_SPAN.test(p));
  const emptyBefore = [...html.matchAll(/<h2[^>]*>/g)].every(m => html.slice(Math.max(0, m.index - 60), m.index).includes(P_EMPTY));
  const words = arts.map(a => a.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length);
  const ids = arts.map(a => a.match(/id="(art-\d+-\d+)"/)[1]);

  totalArts += arts.length;
  totalH2 += h2s.length;
  totalP += pContent.length;
  totalWords += words.reduce((a, b) => a + b, 0);
  ids.forEach(id => { if (seenIds.has(id)) problems.push(`${file}: id repetido ${id}`); seenIds.add(id); });

  const ok = arts.length === 2 && h2s.length === h2ok && badP.length === 0 && emptyBefore && !/<h3|<h4|<br/.test(html) && words.every(w => w >= 750);
  if (!ok) problems.push(`${file}: arts=${arts.length} h2=${h2s.length}/${h2ok} sinSpan=${badP.length} espaciado=${emptyBefore} palabras=${words}`);
  console.log(`${file.padEnd(13)} arts=${arts.length} h2=${String(h2s.length).padStart(2)} palabras=${words.join('+')} ids=${ids.join(',')}`);
}

console.log(`\nTOTAL artículos=${totalArts} h2=${totalH2} párrafos=${totalP} palabras=${totalWords} ids únicos=${seenIds.size}`);
console.log('PROBLEMAS:', problems.length ? '\n' + problems.join('\n') : 'ninguno');
