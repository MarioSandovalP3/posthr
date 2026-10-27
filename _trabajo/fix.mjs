import fs from 'node:fs';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026/parts/';
const fixes = [
  ['c3a.html',
   'Veinte minutos antes: reduzca la luz ambiental y realice una actividad tranquila sin pantalla.',
   'Veinte minutos antes: reduce la luz ambiental y realiza una actividad tranquila sin pantalla.'],
  ['c3a.html',
   'Al despertar, evite revisar el teléfono durante los primeros quince minutos.',
   'Al despertar, evita revisar el teléfono durante los primeros quince minutos.'],
  ['c3b.html',
   'Si el malestar persiste, consulte: la soledad también se aborda en terapia.',
   'Si el malestar persiste, consulta: la soledad también se aborda en terapia.'],
  ['c4b.html',
   'Si el dolor se repite, se irradia o interfiere con el sueño y el trabajo, acuda a un profesional de la salud.',
   'Si el dolor se repite, se irradia o interfiere con el sueño y el trabajo, acude a un profesional de la salud.'],
  ['c4b.html',
   'Si los síntomas digestivos son persistentes, intensos o se acompañan de pérdida de peso o sangre en las heces, consulte a un profesional de la salud.',
   'Si los síntomas digestivos son persistentes, intensos o se acompañan de pérdida de peso o sangre en las heces, consulta a un profesional de la salud.'],
  ['c4a.html',
   'Si tiene antecedentes familiares de enfermedad cardiovascular, cifras elevadas en análisis previos o dudas sobre su alimentación, consulte a un profesional de la salud.',
   'Si tienes antecedentes familiares de enfermedad cardiovascular, cifras elevadas en análisis previos o dudas sobre tu alimentación, consulta a un profesional de la salud.'],
  ['c4a.html',
   'Si el malestar se vuelve persistente o aparecen síntomas neurológicos, acuda a un profesional de la salud para una evaluación adecuada.',
   'Si el malestar se vuelve persistente o aparecen síntomas neurológicos, acude a un profesional de la salud para una evaluación adecuada.'],
  ['c4a.html',
   'Si el agotamiento persiste, limita su vida diaria o se acompaña de cualquiera de las señales de alarma descritas, acuda a un profesional de la salud. Un diagnóstico oportuno permite descartar enfermedades serias y recuperar la energía con un plan adaptado a su caso.',
   'Si el agotamiento persiste, limita tu vida diaria o se acompaña de cualquiera de las señales de alarma descritas, acude a un profesional de la salud. Un diagnóstico oportuno permite descartar enfermedades serias y recuperar la energía con un plan adaptado a tu caso.'],
  ['c5b.html',
   'Empiece esta semana con un solo cambio y consolídelo antes de añadir el siguiente. Si tiene dolor persistente, lesiones previas o factores de riesgo cardiovascular, consulte a un profesional de la salud para adaptar el plan a su situación.',
   'Empieza esta semana con un solo cambio y consolídalo antes de añadir el siguiente. Si tienes dolor persistente, lesiones previas o factores de riesgo cardiovascular, consulta a un profesional de la salud para adaptar el plan a tu situación.'],
  ['c5b.html',
   'Si presenta estreñimiento persistente, cambios en el ritmo deposicional, dolor abdominal o antecedentes de enfermedad digestiva, consulte a un profesional antes de modificar su alimentación de forma significativa.',
   'Si presentas estreñimiento persistente, cambios en el ritmo deposicional, dolor abdominal o antecedentes de enfermedad digestiva, consulta a un profesional antes de modificar tu alimentación de forma significativa.'],
  ['c5b.html',
   'Si el aislamiento se prolonga o se acompaña de síntomas persistentes, consulte a un profesional de la salud mental.',
   'Si el aislamiento se prolonga o se acompaña de síntomas persistentes, consulta a un profesional de la salud mental.'],
  ['c5b.html',
   'Si tiene una condición médica que requiere control estricto de la alimentación, consulte con un profesional de la nutrición antes de aplicar un plan general. La planificación debe adaptarse a su situación clínica y a su estilo de vida.',
   'Si tienes una condición médica que requiere control estricto de la alimentación, consulta con un profesional de la nutrición antes de aplicar un plan general. La planificación debe adaptarse a tu situación clínica y a tu estilo de vida.'],
];

const cache = new Map();
let ok = 0, fail = 0;
for (const [file, from, to] of fixes) {
  const p = root + file;
  if (!cache.has(p)) cache.set(p, fs.readFileSync(p, 'utf8'));
  let html = cache.get(p);
  const n = html.split(from).length - 1;
  if (n !== 1) { console.log(`FALLO (${n} coincidencias) en ${file}: ${from.slice(0, 60)}...`); fail++; continue; }
  html = html.replace(from, to);
  cache.set(p, html);
  ok++;
}
for (const [p, html] of cache) fs.writeFileSync(p, html, 'utf8');
console.log(`reemplazos aplicados: ${ok} | fallos: ${fail}`);
