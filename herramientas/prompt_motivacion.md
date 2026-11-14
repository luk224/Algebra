# Instrucciones: preguntas motivadoras y consignas de animación de un tema

Tu tema es el que te indique quien te llama (X.Y; carpeta `datos/X_Y/`). Proyecto: apuntes de Álgebra (UNED) en `/home/luk/UNED/ALGEBRA/claude`.
Python con sympy: `~/venv/bin/python`. Todo en español, matemáticas con KaTeX (`$…$`). **Escribe un único fichero nuevo:
`datos/X_Y/motivacion_propuesta.yaml`.** No edites nada más, no hagas commit.

## Qué hay que escribir
Para que alguien que ve el tema por primera vez entienda **para qué sirve** cada apartado antes de leer las definiciones:

1. `motivacion`: una **pregunta motivadora** por cada sección de teoría (las `h2` con id `s1`, `s2`, … de `datos/X_Y/secciones/`; no `prereq`, `chuleta`,
   `ejercicios` ni `examenes`). 1-2 frases, 20-420 caracteres: una situación concreta o un problema que el apartado va a resolver
   («¿Cuántos vectores hacen falta para describir todo un plano? ¿Y cuántos sobran?»). Sin dar la respuesta ni la definición; que genere curiosidad
   y use un ejemplo en $\mathbb R^2$/$\mathbb R^3$, una analogía o un caso numérico mínimo cuando ayude. Lenguaje llano, como en una academia.
2. `consignas`: una por **cada animación o interactivo** del tema (cajas cuyo encabezado `<span class="h">` contiene «animación», «interactivo» o «laboratorio» (sin distinguir mayúsculas);
   búscalas con `grep -n 'class="h">.*\(nimaci\|nteractivo\|aboratorio\)' datos/X_Y/secciones/*.html`). Cada una:
   - `animacion`: un trozo del texto del encabezado que **aparezca una sola vez** en el tema;
   - `consigna`: «Mueve/cambia … y fíjate en …» (1-2 frases, concreta: qué tocar y qué observar; lee el HTML/`data-*` del componente para saber qué hace);
   - `pregunta` (opcional): una pregunta que se responde observando.

## Lee primero
`herramientas/aplicar_motivacion.py` (cabecera = esquema exacto), las secciones `datos/X_Y/secciones/*.html` (para saber qué explica cada
apartado) y, para las animaciones, la descripción de cada componente en `CLAUDE.md` regla 15.

## Reglas
- Todo el texto en bloques literales YAML (`campo: |-`), sin escapar nada.
- Rigor: si usas números en una pregunta o consigna, compruébalos con sympy. No inventes teoremas ni páginas. Regla 8 bis de `CLAUDE.md`: nada de erratas ni comparativas entre libros.
- No repitas la «Idea intuitiva» que ya trae la sección: la pregunta debe ser el gancho previo, no un resumen.

## Cómo comprobar
`~/venv/bin/python herramientas/aplicar_motivacion.py X.Y --solo-validar` hasta «PROPUESTA VÁLIDA» (no escribe nada). Si el validador dice que faltan
preguntas para alguna sección, añádelas.

## Qué devolver
3-6 líneas: nº de preguntas y consignas escritas y cualquier cosa rara que veas en el tema (sin corregirla).
