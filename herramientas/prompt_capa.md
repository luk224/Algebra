# Instrucciones para redactar la capa pedagógica de un tema

Tu tema es el que te indique quien te llama (en lo que sigue, **X.Y**; carpeta `datos/X_Y/`, p. ej. el 3.2 → `datos/3_2/`).
Proyecto: apuntes de Álgebra (UNED) en `/home/luk/UNED/ALGEBRA/claude`. Python con sympy: usa siempre `~/venv/bin/python`.
Todo el contenido va en español, matemáticas con KaTeX (`$…$`).

## Qué hay que hacer
Los temas se guardan como datos en `datos/X_Y/`: `tema.yaml`, `secciones/*.html` (la teoría) y `ejercicios.yaml` (un registro por
ejercicio resuelto). Tu trabajo es escribir **un único fichero nuevo, `datos/X_Y/capa_propuesta.yaml`**, con la capa de estudio pensada
para alguien que ve el tema por primera vez: para cada ejercicio un nivel y una pista, y para el tema los tipos de problema con su
ficha de método, «lo esencial» y una autoevaluación. **No edites ningún otro fichero**, no hagas commit y no ejecutes nada que escriba datos.

## Lee primero (en este orden)
1. `herramientas/aplicar_capa.py`: su cabecera es el ESQUEMA exacto de tu fichero.
2. El modelo ya terminado: `datos/2_3/tema.yaml` (campos `esencial`, `que_cae_nota`, `tipos`, `quiz`) y los 3 primeros registros de
   `datos/2_3/ejercicios.yaml` (campos `nivel`, `pista`, `problema`, `etiqueta`). Es el nivel de calidad y de concisión esperado.
3. `datos/X_Y/secciones/*.html` (la teoría del tema: de ahí salen los tipos de problema, la receta de cada uno, lo esencial y el quiz)
   y `datos/X_Y/ejercicios.yaml` (todos los ejercicios; mira el bloque `enun` de cada uno, que es su enunciado, y `titulo`, `fuentes`, `cuerpo`).
4. Reglas 1, 5, 8, 8 bis y 9 de `CLAUDE.md` (sección 3).

## Qué escribir
- `ejercicios`: **todos** los ejercicios del tema (cada `id` del yaml, sin faltar ninguno). Para cada uno:
  - `nivel`: 1 = aplicación directa de una definición o fórmula; 2 = ejercicio típico de examen; 3 = varios métodos encadenados, parámetros o razonamiento más fino.
  - `pista`: **1-2 frases** con la IDEA del primer paso o el método a elegir («¿qué matriz formas?», «mira cuántos vectores hay frente a la
    dimensión»). **Nunca** el resultado, nunca el cálculo hecho. Debe servir a quien ha leído la teoría pero no sabe por dónde empezar.
  - `problema`: lista con 1-3 ids de los `tipos` que defines abajo; el primero es el principal. **Todos** los ejercicios de examen
    (los de `clase: examen`) deben tener al menos uno.
  - `etiqueta`: solo si la deducida automáticamente no sirve (normalmente omítela).
  - `enunciado`: omítelo salvo que el bloque `enun` del ejercicio **no exista** o **contenga ya la solución** (frases como «Respuesta: C»,
    el resultado, «luego…»). En ese caso escribe aquí solo la pregunta, sin spoilers; lo que sobre se queda donde está en la solución.
- `tipos`: de 3 a 5 tipos de problema que de verdad reparten los ejercicios del tema, con el nombre con el que los reconocería un estudiante
  («¿Es diagonalizable?», «Calcular el determinante»). Cada uno: `id` (corto, minúsculas), `nombre`, `receta` (una línea), `senal` (cómo se
  reconoce en un enunciado), `pasos` (3-5, cada uno una frase), `ejemplo` (ejemplo numérico mínimo y completo, de 1-3 líneas,
  **verificado con sympy**) y `fallos` (los errores típicos, separados por « · »). Basa los pasos en el método que usa el libro (la teoría
  y las soluciones del yaml), no inventes otro.
- `esencial`: `intro` (una frase) y 3-5 `items` con lo que hay que llevarse del tema (definiciones y atajos de examen con sus hipótesis).
- `quiz`: 5-6 preguntas de opción múltiple (3-4 opciones, exactamente una `ok: true`). Cada opción incorrecta lleva `why` (por qué falla:
  el error que revela). `fb`: explicación de la correcta. Que comprueben comprensión (no memoria), con números concretos
  **verificados con sympy**.

## Reglas de calidad (obligatorias)
- Todo el texto en bloques literales YAML (`campo: |-` y el texto indentado debajo); así no hay que escapar nada, y las barras invertidas
  de LaTeX se escriben tal cual.
- Rigor (regla 9): comprueba con sympy cada cálculo de ejemplos y quiz antes de escribirlo. No inventes páginas ni teoremas; si citas un
  teorema o página, que sea uno que aparece en la teoría o las soluciones del tema.
- Regla 8 bis: no escribas nada sobre erratas, errores de libros, «solución oficial», ni comparativas entre fuentes. Escribe directamente lo correcto.
- Nada de «es evidente». Lenguaje llano, como lo explicaría un profesor de academia: sin rodeos.
- No copies párrafos de los libros; redacta con tus palabras.

## Cómo comprobar tu trabajo
Cuando termines, ejecuta `~/venv/bin/python herramientas/aplicar_capa.py X.Y --solo-validar` (no escribe nada) y corrige hasta que diga
«PROPUESTA VÁLIDA (0 errores…)». Revisa también los avisos que imprima.

## Qué devolver
En 6-10 líneas: los ids y nombres de los tipos que definiste, cuántos ejercicios hay por nivel, qué ejercicios tuvieron `enunciado`
reescrito y por qué, y cualquier duda o cosa rara que veas en el contenido del tema (sin corregirla tú).
