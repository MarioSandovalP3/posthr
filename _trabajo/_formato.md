# ESPECIFICACIÓN DE FORMATO — artículos para blog (CKEditor)

Idioma: español neutro (Latinoamérica), profesional, claro, sin regionalismos.
Autor implícito: médico especialista y redactor senior de contenidos de salud.

## REGLAS OBLIGATORIAS (no negociables)

1. SUBTÍTULOS: cada subtítulo interno del artículo debe ser EXACTAMENTE así (misma línea, mismos atributos, mismo orden, misma puntuación):

<h2 style="color:hsl(0, 0%, 20%); font-size:1.4em; font-weight:bold; margin-top:20px; margin-bottom:10px;">Texto del subtítulo</h2>

   - Prohibido el texto "Sección:", "SECCIÓN", numeraciones tipo "1." dentro del h2.
   - Prohibido usar <h3>, <h4> o párrafos sueltos como subtítulo.

2. PÁRRAFOS: cada párrafo debe ir envuelto así, sin excepción:

<p><span style="color:hsl(0, 0%, 30%);">Texto del párrafo...</span></p>

   - El <span> con ese color es obligatorio en TODOS los párrafos de contenido.
   - Sin estilos adicionales dentro del span (puedes usar <strong> puntualmente dentro del span para 1-3 palabras clave, con moderación).

3. ESPACIADO: entre secciones y antes de cada <h2> debe ir un párrafo vacío:

<p>&nbsp;</p>

   Patrón: ...texto</span></p>  →  <p>&nbsp;</p>  →  <h2 ...>...</h2>  →  <p><span ...>texto</span></p>

4. TÍTULO DEL ARTÍCULO: es un <h1> con este estilo (la única variación permitida):

<h1 style="color:hsl(0, 0%, 12%); font-size:1.7em; font-weight:bold; margin:0 0 14px; line-height:1.3;">Título del artículo</h1>

5. LISTAS (opcional, máximo una o dos por artículo): si usas lista, cada ítem también lleva span con el color:

<ul>
<li><span style="color:hsl(0, 0%, 30%);">Ítem...</span></li>
</ul>

## ESTRUCTURA DE CADA ARTÍCULO

<!-- ARTÍCULO X.N -->
<article id="art-X-N" class="articulo">
<h1 ...>Título</h1>
<p><span ...>Párrafo de entrada (2-3 párrafos de introducción atractiva y profesional; en el primer párrafo debe aparecer la palabra clave del título de forma natural).</span></p>
<p>&nbsp;</p>
<h2 exacto>Subtítulo 1</h2>
<p><span ...>...</span></p>
<p><span ...>...</span></p>
<p>&nbsp;</p>
<h2 exacto>Subtítulo 2</h2>
... (5 a 7 subtítulos en total, con 2-4 párrafos cada uno)
<p>&nbsp;</p>
<h2 exacto>Conclusión: ...</h2>
<p><span ...>Cierre con recomendaciones prácticas y una frase de invitación a consultar a un profesional cuando corresponda.</span></p>
</article>

## CONTENIDO

- Extensión: 800 a 1,100 palabras de texto visible por artículo (ni menos de 750).
- Nivel: divulgación médica de alto nivel; explica mecanismos, fisiología y práctica clínica en lenguaje accesible.
- Rigor: NO inventes estudios, autores, revistas, cifras exactas ni porcentajes falsos. Usa fórmulas generales ("la evidencia científica disponible", "diversos estudios observacionales") sin atribuir datos inventados. Si citas cifras, que sean de consenso general y exprésalas como aproximadas.
- Originalidad: redacción propia, sin copiar textos de internet, sin relleno ni frases huecas.
- Cada artículo debe incluir: introducción, al menos un subtítulo con recomendaciones prácticas (pasos, cantidades orientativas, errores comunes), advertencias/contraindicaciones cuando aplique, y conclusión.
- Español correcto con tildes y signos de apertura (¿ ¡). Uso de comillas tipográficas o latinas, no comillas rectas dobles dentro del texto.
- No incluir <html>, <head>, <body>, CSS, scripts ni comentarios distintos a los indicados.

## DIVISOR DE CATEGORÍA (solo si tu encargo lo indica)

<!-- CATEGORÍA N: Nombre de la categoría -->
<div style="background-color:hsl(210, 45%, 96%); border-left:6px solid hsl(210, 60%, 35%); padding:12px 18px; margin:35px 0 20px;"><div style="color:hsl(210, 60%, 28%); font-size:1.25em; font-weight:bold; letter-spacing:0.5px;">CATEGORÍA N: Nombre de la categoría</div></div>

(No añadir <h1>/<h2> para la categoría. No modificar este bloque.)

## FORMATO DE ENTREGA

- Escribe UN archivo de salida con la ruta exacta que se te indique.
- Contenido del archivo: solo bloques <article> ... </article> (sin encabezado HTML), separados por una línea en blanco.
- Si el bloque es el primero de una categoría (indicado en tu encargo), inicia el archivo con el divisor de categoría exacto que se te indique y luego los artículos.
- Verifica antes de terminar: (a) todos los <h2> idénticos al patrón, (b) todos los <p> de contenido con su <span>, (c) <p>&nbsp;</p> antes de cada h2, (d) ningún <p> sin span, (e) tildes correctas.
