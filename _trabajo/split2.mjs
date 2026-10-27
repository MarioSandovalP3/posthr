import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026';
const html = fs.readFileSync(path.join(root, '_trabajo/articulos-completo.html'), 'utf8').replace(/\r\n/g, '\n');
const articles = html.match(/<article id="art-\d+-\d+"[\s\S]*?<\/article>/g) || [];
if (articles.length !== 50) throw new Error(`Se esperaban 50 artículos, hay ${articles.length}`);

const cats = [
  'Nutrición y Alimentación Saludable',
  'Ejercicio, Running y Rendimiento Físico',
  'Bienestar Mental y Manejo del Estrés',
  'Prevención y Salud Preventiva',
  'Estilo de Vida Saludable y Longevidad',
];

const shellTop = (from, to, cat) => `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Artículos ${from}-${to} — ${cat}</title>
<style>
  body { margin: 0; background: #f5f6f8; font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .contenedor { max-width: 820px; margin: 0 auto; padding: 40px 24px 60px; background: #ffffff; }
  .articulo { border-bottom: 1px dashed #d8dde5; padding-bottom: 10px; margin-bottom: 45px; }
  .articulo:last-child { border-bottom: none; }
  .articulo ul { margin: 0 0 1em 0; padding-left: 22px; }
  .articulo li { margin-bottom: 8px; line-height: 1.7; }
  .articulo p { line-height: 1.7; }
  .nota-final { border: 1px solid #e2e6ee; border-radius: 8px; padding: 18px 22px; margin-top: 40px; background: #fbfcfe; }
  @media (max-width: 600px) { .contenedor { padding: 24px 16px 40px; } }
</style>
</head>
<body>
<div class="contenedor">
`;

const divider = (n, cat) => `
<div style="background-color:hsl(210, 45%, 96%); border-left:6px solid hsl(210, 60%, 35%); padding:12px 18px; margin:0 0 30px;"><div style="color:hsl(210, 60%, 28%); font-size:1.25em; font-weight:bold; letter-spacing:0.5px;">CATEGORÍA ${n}: ${cat}</div></div>
`;

const foot = `
<div class="nota-final">
<p><span style="color:hsl(0, 0%, 30%);"><strong>Nota editorial:</strong> este contenido tiene finalidad informativa y educativa, y no sustituye la valoración, el diagnóstico ni el tratamiento de un profesional de la salud. Antes de iniciar un plan de alimentación, un programa de entrenamiento o suplementación, consulta con tu médico o especialista de confianza, especialmente si tienes enfermedades crónicas, tomas medicación o estás embarazada.</span></p>
</div>
</div>
</body>
</html>
`;

let generated = 0;
for (let i = 0; i < articles.length; i += 2) {
  const from = i + 1;
  const to = i + 2;
  const catIndex = Math.floor(i / 10);
  const cat = cats[catIndex];
  const name = `parte${i / 2 + 1}.html`;
  let out = shellTop(from, to, cat);
  if (i % 10 === 0) out += divider(catIndex + 1, cat);
  out += '\n' + articles.slice(i, i + 2).join('\n\n') + '\n' + foot;
  fs.writeFileSync(path.join(root, name), out, 'utf8');
  generated++;
}
console.log(`archivos generados: ${generated}`);
