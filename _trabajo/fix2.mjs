import fs from 'node:fs';

const root = 'C:/Users/mario/Desktop/Promo Octubre 2026/parts/';
const fixes = [
  ['c3b.html', 'Siéntese o recuéstese y afloje la ropa que oprima el abdomen.', 'Siéntate o recuéstate y afloja la ropa que oprima el abdomen.'],
  ['c3b.html', 'Coloque una mano sobre el abdomen y otra sobre el pecho, para notar cuál se mueve.', 'Coloca una mano sobre el abdomen y otra sobre el pecho, para notar cuál se mueve.'],
  ['c3b.html', 'Inhale por la nariz contando hasta cuatro, dejando que el abdomen se expanda.', 'Inhala por la nariz contando hasta cuatro, dejando que el abdomen se expanda.'],
  ['c3b.html', 'Exhale por la nariz o por la boca entreabierta contando hasta seis, sin forzar el vaciado.', 'Exhala por la nariz o por la boca entreabierta contando hasta seis, sin forzar el vaciado.'],
  ['c3b.html', 'Repita entre ocho y diez ciclos, aproximadamente durante cinco minutos.', 'Repite entre ocho y diez ciclos, aproximadamente durante cinco minutos.'],
  ['c3b.html', 'Al terminar, vuelva a su respiración habitual y observe el cambio sin juzgarlo.', 'Al terminar, vuelve a tu respiración habitual y observa el cambio sin juzgarlo.'],
  ['c3b.html', 'Elija una actividad que tolere y que pueda repetir sin depender de la motivación.', 'Elige una actividad que toleres y que puedas repetir sin depender de la motivación.'],
  ['c3b.html', 'Empiece con sesiones de diez a quince minutos y aumente de forma gradual.', 'Empieza con sesiones de diez a quince minutos y aumenta de forma gradual.'],
  ['c3b.html', 'Fije un horario estable y prepare la ropa o el calzado la noche anterior.', 'Fija un horario estable y prepara la ropa o el calzado la noche anterior.'],
  ['c3b.html', 'Registre la sesión, no el rendimiento: marcar el día cumplido refuerza el hábito.', 'Registra la sesión, no el rendimiento: marcar el día cumplido refuerza el hábito.'],
  ['c3b.html', 'Combine movimiento con contacto social siempre que sea posible.', 'Combina movimiento con contacto social siempre que sea posible.'],
  ['c3b.html', 'Reserve un día de descanso y respete las señales de fatiga.', 'Reserva un día de descanso y respeta las señales de fatiga.'],
  ['c3b.html', 'Sesenta minutos antes: baje el brillo, active el modo nocturno y silencie las notificaciones que no sean urgentes.', 'Sesenta minutos antes: baja el brillo, activa el modo nocturno y silencia las notificaciones que no sean urgentes.'],
  ['c3b.html', 'Cuarenta y cinco minutos antes: termine las tareas que exigen pantalla y responda los mensajes pendientes.', 'Cuarenta y cinco minutos antes: termina las tareas que exigen pantalla y responde los mensajes pendientes.'],
  ['c3b.html', 'Treinta minutos antes: apague las pantallas grandes y deje el teléfono fuera del alcance de la cama.', 'Treinta minutos antes: apaga las pantallas grandes y deja el teléfono fuera del alcance de la cama.'],
  ['c3b.html', 'Veinte minutos antes: reduzca la luz ambiental y realice una actividad tranquila sin pantalla.', 'Veinte minutos antes: reduce la luz ambiental y realiza una actividad tranquila sin pantalla.'],
  ['c3b.html', 'Diez minutos antes: respire despacio, estírese o lea unas páginas en papel.', 'Diez minutos antes: respira despacio, estírate o lee unas páginas en papel.'],
  ['c3b.html', 'Al despertar, evite revisar el teléfono durante los primeros quince minutos.', 'Al despertar, evita revisar el teléfono durante los primeros quince minutos.'],
  ['c3b.html', 'Beba un vaso de agua y abra las cortinas o salga a la luz natural.', 'Bebe un vaso de agua y abre las cortinas o sal a la luz natural.'],
  ['c3b.html', 'Dedique cinco minutos a moverse: estiramientos, movilidad de cadera y hombros o una caminata breve.', 'Dedica cinco minutos a moverte: estiramientos, movilidad de cadera y hombros o una caminata breve.'],
  ['c3b.html', 'Escriba en una frase la tarea más importante del día.', 'Escribe en una frase la tarea más importante del día.'],
  ['c3b.html', 'Desayune sin pantallas y sin prisas, aunque sea algo sencillo.', 'Desayuna sin pantallas y sin prisas, aunque sea algo sencillo.'],
  ['c3b.html', 'Reserve dos minutos para respirar despacio antes de comenzar las obligaciones.', 'Reserva dos minutos para respirar despacio antes de comenzar las obligaciones.'],
  ['c3b.html', 'Retome un contacto que se haya enfriado con un mensaje breve y sin expectativas.', 'Retoma un contacto que se haya enfriado con un mensaje breve y sin expectativas.'],
  ['c3b.html', 'Inscríbase en una actividad con horario fijo: taller, caminata, coro, voluntariado o clase.', 'Inscríbete en una actividad con horario fijo: taller, caminata, coro, voluntariado o clase.'],
  ['c3b.html', 'Frecuente espacios de barrio donde el encuentro sea incidental: biblioteca, mercado, parque.', 'Frecuenta espacios de barrio donde el encuentro sea incidental: biblioteca, mercado, parque.'],
  ['c3b.html', 'Ofrezca ayuda concreta a alguien; la reciprocidad construye pertenencia.', 'Ofrece ayuda concreta a alguien; la reciprocidad construye pertenencia.'],
  ['c3b.html', 'Limite el uso pasivo de redes sociales y priorice la conversación directa.', 'Limita el uso pasivo de redes sociales y prioriza la conversación directa.'],
  ['c4b.html', 'Si tiene antecedentes familiares de enfermedad cardiovascular, cifras elevadas en análisis previos o dudas sobre su alimentación, consulte a un profesional de la salud.', 'Si tienes antecedentes familiares de enfermedad cardiovascular, cifras elevadas en análisis previos o dudas sobre tu alimentación, consulta a un profesional de la salud.'],
  ['c4b.html', 'Si el malestar se vuelve persistente o aparecen síntomas neurológicos, acuda a un profesional de la salud para una evaluación adecuada.', 'Si el malestar se vuelve persistente o aparecen síntomas neurológicos, acude a un profesional de la salud para una evaluación adecuada.'],
  ['c4b.html', 'Si el agotamiento persiste, limita su vida diaria o se acompaña de cualquiera de las señales de alarma descritas, acuda a un profesional de la salud. Un diagnóstico oportuno permite descartar enfermedades serias y recuperar la energía con un plan adaptado a su caso.', 'Si el agotamiento persiste, limita tu vida diaria o se acompaña de cualquiera de las señales de alarma descritas, acude a un profesional de la salud. Un diagnóstico oportuno permite descartar enfermedades serias y recuperar la energía con un plan adaptado a tu caso.'],
  ['c5b.html', 'Añada una porción nueva al día: una fruta extra, una ración de legumbre o una cucharada de semillas.', 'Añade una porción nueva al día: una fruta extra, una ración de legumbre o una cucharada de semillas.'],
  ['c5b.html', 'Aumente el agua a medida que sube la fibra; sin líquido suficiente, el efecto puede ser el contrario.', 'Aumenta el agua a medida que subes la fibra; sin líquido suficiente, el efecto puede ser el contrario.'],
  ['c5b.html', 'Remoje las legumbres y descarte el agua de cocción si generan muchas molestias.', 'Remoja las legumbres y descarta el agua de cocción si generan muchas molestias.'],
  ['c5b.html', 'Prefiera cereales integrales y fruta entera antes que jugos, que pierden fibra y saciedad.', 'Prefiere cereales integrales y fruta entera antes que jugos, que pierden fibra y saciedad.'],
  ['c5b.html', 'Reparta la fibra entre todas las comidas en lugar de concentrarla en una sola.', 'Reparte la fibra entre todas las comidas en lugar de concentrarla en una sola.'],
];

const cache = new Map();
let ok = 0, fail = 0;
for (const [file, from, to] of fixes) {
  const p = root + file;
  if (!cache.has(p)) cache.set(p, fs.readFileSync(p, 'utf8'));
  let html = cache.get(p);
  const n = html.split(from).length - 1;
  if (n !== 1) { console.log(`FALLO (${n}) ${file}: ${from.slice(0, 55)}`); fail++; continue; }
  cache.set(p, html.replace(from, to));
  ok++;
}
for (const [p, html] of cache) fs.writeFileSync(p, html, 'utf8');
console.log(`aplicados: ${ok} | fallos: ${fail}`);
