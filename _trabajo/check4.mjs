import fs from 'node:fs';
const html = fs.readFileSync('C:/Users/mario/Desktop/Promo Octubre 2026/articulos.html', 'utf8').replace(/\r\n/g, '\n');
const lines = html.split('\n');
const re = /\b(usted|consulte|evite|mantenga|realice|recuerde|empiece|elija|añada|beba|duerma|coma|acuda|su situación|su caso|su alimentación|su dieta|su rutina|su plan|su médico|su profesional|sus síntomas|sus hábitos)\b/;
lines.forEach((l, i) => {
  if (/<p>|<li>/.test(l) && re.test(l)) console.log(`${i + 1}: ${l.replace(/<[^>]+>/g, '').trim()}`);
});
