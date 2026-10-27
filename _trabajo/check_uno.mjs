import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026';
const H2_OK = '<h2 style="color:hsl(0, 0%, 20%); font-size:1.4em; font-weight:bold; margin-top:20px; margin-bottom:10px;">';
const P_SPAN = /^<p><span style="color:hsl\(0, 0%, 30%\);">[\s\S]*<\/span><\/p>$/;
const P_EMPTY = '<p>&nbsp;</p>';

let problems = [], ids = new Set(), totalH2 = 0, totalWords = 0, totalContentP = 0;

for (let i = 1; i <= 50; i++) {
  const file = `${i}.html`;
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) { problems.push(`${file}: no existe`); continue; }
  const html = fs.readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
  const arts = html.match(/<article id="art-(\d+)-(\d+)"[\s\S]*?<\/article>/g) || [];
  if (arts.length !== 1) { problems.push(`${file}: ${arts.length} artículos`); continue; }
  const art = arts[0];
  const id = art.match(/id="(art-\d+-\d+)"/)[1];
  const expected = `art-${Math.floor((i - 1) / 10) + 1}-${((i - 1) % 10) + 1}`;
  if (id !== expected) problems.push(`${file}: id ${id}, se esperaba ${expected}`);
  if (ids.has(id)) problems.push(`${file}: id repetido ${id}`);
  ids.add(id);

  const h2s = art.match(/<h2[^>]*>/g) || [];
  const h2ok = art.split(H2_OK).length - 1;
  const ps = art.match(/<p>[\s\S]*?<\/p>/g) || [];
  const pContent = ps.filter(p => p !== P_EMPTY);
  const badP = pContent.filter(p => !P_SPAN.test(p));
  const spaced = [...art.matchAll(/<h2[^>]*>/g)].every(m => art.slice(Math.max(0, m.index - 60), m.index).includes(P_EMPTY));
  const words = art.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().split(' ').length;
  const h1 = (art.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  const titleTag = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const divs = (html.match(/CATEGORÍA \d:/g) || []).length;
  const expectsDiv = (i - 1) % 10 === 0;

  totalH2 += h2s.length; totalWords += words; totalContentP += pContent.length;

  const errs = [];
  if (h2s.length !== h2ok) errs.push(`h2 formato ${h2s.length}/${h2ok}`);
  if (badP.length) errs.push(`p sin span ${badP.length}`);
  if (!spaced) errs.push('h2 sin &nbsp; previo');
  if (words < 750) errs.push(`corto ${words}`);
  if (/<h3|<h4|<br/.test(html)) errs.push('h3/h4/br');
  if (divs > 1) errs.push(`${divs} divisores`);
  if (divs === 1 && !expectsDiv) errs.push('divisor inesperado');
  if (divs === 0 && expectsDiv) errs.push('falta divisor');
  if (titleTag.trim() !== h1.trim()) errs.push('title != h1');
  if (errs.length) problems.push(`${file}: ${errs.join(', ')}`);
}

console.log(`archivos=50 ids únicos=${ids.size} h2=${totalH2} párrafos=${totalContentP} palabras=${totalWords}`);
console.log('PROBLEMAS:', problems.length ? '\n' + problems.join('\n') : 'ninguno');
