# PROMPT MAESTRO — 50 artículos de salud en 50 archivos HTML (uno por artículo, CKEditor)

> Pega todo este documento como instrucción en una sesión nueva, en la misma carpeta de trabajo.
> Ejecuta el encargo completo y **sobrescribe** los archivos existentes sin pedir confirmación.

---

## 1. Objetivo

Redactar **50 artículos de salud completos, originales y profesionales** en español a partir de los títulos de `data.txt`, con **un artículo por archivo HTML** (`1.html` … `50.html`), listos para copiar y pegar en CKEditor. No es una landing page: solo contenido editorial.

## 2. Entrada

`data.txt` en la carpeta de trabajo, con este formato:

- 5 líneas `Categoría N: Nombre`
- 10 títulos por categoría, separados por líneas en blanco

Debes extraer exactamente 50 títulos y respetar su orden, su redacción y su categoría. Verifica el conteo antes de redactar.

Categorías esperadas (en este orden):

1. Nutrición y Alimentación Saludable
2. Ejercicio, Running y Rendimiento Físico
3. Bienestar Mental y Manejo del Estrés
4. Prevención y Salud Preventiva
5. Estilo de Vida Saludable y Longevidad

## 3. Salidas (sobrescribir)

En la raíz de la carpeta de trabajo, exactamente **50 archivos, uno por artículo**, numerados en el orden de `data.txt`: `1.html`, `2.html` … `50.html`.

| Archivos | Categoría |
|---|---|
| `1.html` – `10.html` | 1. Nutrición y Alimentación Saludable |
| `11.html` – `20.html` | 2. Ejercicio, Running y Rendimiento Físico |
| `21.html` – `30.html` | 3. Bienestar Mental y Manejo del Estrés |
| `31.html` – `40.html` | 4. Prevención y Salud Preventiva |
| `41.html` – `50.html` | 5. Estilo de Vida Saludable y Longevidad |

- Cada archivo lleva **exactamente un artículo**: `<article id="art-N-M">`, donde `N` es la categoría (1–5) y `M` la posición dentro de ella (1–10).
- El divisor de categoría aparece **solo** en `1.html`, `11.html`, `21.html`, `31.html` y `41.html`.
- Si existen, reemplaza su contenido por completo (no dupliques, no anexes, no guardes copias en la raíz).
- UTF-8 sin BOM, saltos de línea `\n`.
- No generes un `articulos.html` maestro, ni archivos por lotes, ni una página índice.

## 4. Reglas de formato (obligatorias, carácter por carácter)

### 4.1 Subtítulos `<h2>` — plantilla literal

```html
<h2 style="color:hsl(0, 0%, 20%); font-size:1.4em; font-weight:bold; margin-top:20px; margin-bottom:10px;">Subtítulo aquí</h2>
```

Prohibido: `<h3>`, `<h4>`, párrafos usados como subtítulo, texto “Sección:”, numeración tipo “1.” dentro del `<h2>`, atributos extra o distinto orden.

### 4.2 Párrafos

```html
<p><span style="color:hsl(0, 0%, 30%);">Texto del párrafo.</span></p>
```

Todo párrafo de contenido lleva ese `<span>` con ese color exacto. Puedes usar `<strong>` dentro del span de forma muy puntual (máximo 1–3 palabras por artículo).

### 4.3 Espaciado

Antes de cada `<h2>` va un párrafo vacío:

```html
<p>&nbsp;</p>
```

Secuencia: `…</span></p>` → `<p>&nbsp;</p>` → `<h2 …>` → `<p><span …>…</span></p>`.

### 4.4 Título del artículo

```html
<h1 style="color:hsl(0, 0%, 12%); font-size:1.7em; font-weight:bold; margin:0 0 14px; line-height:1.3;">Título exacto del data.txt</h1>
```

### 4.5 Listas (opcional, máximo 1–2 por artículo)

```html
<ul>
<li><span style="color:hsl(0, 0%, 30%);">Ítem.</span></li>
</ul>
```

Cada `<li>` lleva su span. No uses `<ol>`.

### 4.6 Contenedor del artículo

```html
<article id="art-N-M" class="articulo">
…
</article>
```

`N` = número de archivo (1–5), `M` = posición dentro del archivo (1–10). Ejemplo: en `31-40.html`, los artículos son `art-4-1` … `art-4-10`.

### 4.7 Encabezado de categoría (uno por archivo, arriba del primer artículo)

```html
<div style="background-color:hsl(210, 45%, 96%); border-left:6px solid hsl(210, 60%, 35%); padding:12px 18px; margin:0 0 30px;"><div style="color:hsl(210, 60%, 28%); font-size:1.25em; font-weight:bold; letter-spacing:0.5px;">CATEGORÍA N: Nombre de la categoría</div></div>
```

### 4.8 Shell de cada archivo (estructura fija)

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Título exacto del artículo</title>
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

[divisor de categoría: solo si el archivo abre una categoría]

[1 bloque <article>]

<div class="nota-final">
<p><span style="color:hsl(0, 0%, 30%);"><strong>Nota editorial:</strong> este contenido tiene finalidad informativa y educativa, y no sustituye la valoración, el diagnóstico ni el tratamiento de un profesional de la salud. Antes de iniciar un plan de alimentación, un programa de entrenamiento o suplementación, consulta con tu médico o especialista de confianza, especialmente si tienes enfermedades crónicas, tomas medicación o estás embarazada.</span></p>
</div>
</div>
</body>
</html>
```

El `<title>` de cada archivo es el título exacto del artículo (mismo texto que el `<h1>`).

## 5. Estructura de cada artículo

- `<h1>` con el título exacto.
- Introducción de 2–3 párrafos; la palabra clave del título aparece de forma natural en el primero.
- **6 subtítulos `<h2>`** de desarrollo.
- **1 `<h2>` final de conclusión** que empiece por “Conclusión: …”.
- Cada sección con 2–3 párrafos; al menos una sección con recomendaciones prácticas (pasos, cantidades orientativas, errores frecuentes).
- Signos de alarma y cuándo consultar a un profesional cuando el tema lo justifique.
- Extensión: **850–1.100 palabras visibles** (nunca menos de 750).

## 6. Contenido y estilo

- Voz: médico especialista y redactor senior de divulgación; explica mecanismos, fisiología y práctica clínica en lenguaje accesible.
- Registro: **tuteo** en todo el documento (tú, tu, tienes, consulta, evita). Prohibido mezclar con usted (consulte, acuda, su caso).
- Español neutro con tildes y signos de apertura (¿ ¡). Comillas tipográficas “ ”, nunca comillas rectas dentro del texto.
- Rigor: **no inventes estudios, autores, revistas, porcentajes ni dosis de medicamentos**. Usa fórmulas generales: “la evidencia disponible”, “diversos estudios observacionales”, cifras de consenso expresadas como aproximadas.
- Originalidad: redacción propia, sin copiar de internet, sin relleno ni frases huecas. No repitas frases largas entre artículos.
- Sin `<br>`, `<div>` extra, `<script>`, `<style>` dentro de los artículos, ni comentarios distintos de `<!-- ARTÍCULO N.M -->`.

## 7. Procedimiento de ejecución

1. **Leer y validar la entrada.** Extrae los 50 títulos de `data.txt`; confirma 5 categorías × 10 títulos y que la redacción es idéntica a la del archivo.
2. **Crear `_trabajo/_formato.md`** con las reglas de la sección 4, para que los redactores las lean.
3. **Redactar por bloques de 5 artículos.** Delega en 10 redactores (2 por categoría, 5 artículos cada uno):
   - Bloque `a` de cada categoría: divisor de categoría + artículos M=1–5.
   - Bloque `b`: artículos M=6–10, sin divisor.
   - Guardar en `_trabajo/parts/c1a.html` … `_trabajo/parts/c5b.html`.
   - Límite de 8 agentes activos por tanda: lanza 8, y al liberarse cupo lanza los 2 restantes.
   - Cada encargo debe incluir: ruta del `_formato.md`, títulos literales, ids, categoría, número de palabras, estructura y criterios de verificación.
4. **Validar cada bloque** antes de ensamblar (script en `_trabajo`, ver sección 8).
5. **Ensamblar los 50 archivos**: recorre los 50 artículos en orden y escribe `1.html` … `50.html` con: shell de 4.8 + divisor (solo en `1.html`, `11.html`, `21.html`, `31.html` y `41.html`; descarta el que traigan los demás bloques) + el `<article>` + nota final. Sobrescribe los existentes.
6. **Validación global** (sección 8). Corrige y reensambla hasta que no haya incidencias.
7. **Normalizar el registro**: busca y corrige cualquier forma de usted o mezcla de tratamiento; reconstruye los archivos.
8. **Ordenar el workspace**: en la raíz solo `data.txt`, `PROMPT.md` y los 50 HTML; todo lo auxiliar (partes, scripts, especificación, copias) dentro de `_trabajo/`.
9. **Responder** con una tabla de archivos (artículos y palabras) y el resumen de las verificaciones.

## 8. Validación obligatoria (no a ojo: con script)

Comprueba y reporta:

- 50 archivos (`1.html` … `50.html`), un artículo cada uno, con ids `art-1-1` … `art-5-10` únicos y correlativos: para el archivo `N`, el id es `art-C-P` con `C = ⌈N/10⌉` y `P = ((N−1) mod 10) + 1`.
- El divisor de categoría aparece únicamente en `1.html`, `11.html`, `21.html`, `31.html` y `41.html`.
- El `<title>` de cada archivo coincide con el texto de su `<h1>`.
- Los 50 `<h1>` coinciden con los títulos de `data.txt` (normalizando mayúsculas, comillas y puntuación), en el mismo orden y categoría.
- **Todos** los `<h2>` son idénticos a la plantilla 4.1 (comparación literal del atributo `style`). Cero desviaciones.
- **Todos** los `<p>` de contenido cumplen 4.2; cero párrafos sin span.
- Hay un `<p>&nbsp;</p>` inmediatamente antes de cada `<h2>`.
- Sin `<h3>`, `<h4>`, `<br>`, `<script>`, ni “Sección:” en subtítulos.
- Ningún artículo por debajo de 750 palabras; total del conjunto entre 45.000 y 55.000 palabras.
- Sin frases de 12+ palabras repetidas entre artículos distintos; sin comillas rectas en texto visible; sin dobles espacios.
- Etiquetas balanceadas: `<article>`, `<p>`, `<ul>`, `<li>`, `<h1>`, `<h2>` abren y cierran en igual número; cada archivo termina en `</html>`.

Números de referencia de la ejecución anterior: 342 `<h2>`, 899 párrafos de contenido en los artículos (más uno de nota editorial por archivo), 342 `<p>&nbsp;</p>` y 49.332 palabras visibles. Si tu ejecución difiere porque cambiaste la longitud, mantén los criterios, no las cifras.

## 9. Restricciones finales

- No escribas una landing page, índice, menú ni formulario: solo los 50 archivos con los artículos.
- No añadas texto tuyo dentro del contenido (ni notas del proceso, ni “aquí tienes”, ni placeholders).
- No pidas confirmación para sobrescribir: la instrucción es reemplazar los 50 archivos existentes.
- Si `data.txt` no tiene 50 títulos o cambia de formato, detente y reporta la diferencia antes de redactar.
