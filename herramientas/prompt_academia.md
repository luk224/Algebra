# Instrucciones para convertir un tema al «formato academia» (plan_academia.md, D1-D3)

Tu tema es el que te indique quien te llama (**X.Y**, carpeta `datos/X_Y/`). Proyecto: apuntes de Álgebra (UNED)
en `/home/luk/UNED/ALGEBRA/claude`. Todo en español. Python: `~/venv/bin/python`. **Modelo terminado: el tema 3.5**
(`datos/3_5/`): míralo antes de empezar y copia su estilo exacto.

**Importante: las soluciones ya están resueltas y verificadas.** Tu trabajo es REORGANIZAR y CONDENSAR, no
re-resolver: copia las matemáticas tal cual están, sin recalcular ni «mejorar» ningún resultado. No borres
contenido matemático: lo que sobre de un sitio se recoloca en otro (o en un desplegable).

## D1 — Bloque «redaccion» en todos los ejercicios de examen
En `datos/X_Y/ejercicios.yaml`, para cada registro con `clase: examen`, reestructura su `cuerpo` así (en este orden):
1. `plan:` se conserva (con la fila «Qué uso» acortada según D3).
2. `redaccion:` (NUEVO, lista de pasos): la solución **limpia y completa tal cual se escribiría a mano en el
   examen**, con el desarrollo del proceso lógico que exige el tribunal (planteamiento, fórmula aplicada con su
   nombre si procede, cálculos intermedios en `$$…$$`, casos, conclusión/respuesta en negrita). SIN digresiones:
   nada de «comparación con la otra vía», «¿y si significara lo contrario?», controles de traza/determinante,
   comprobaciones con un vector, menciones a sympy ni avisos pedagógicos. Normalmente sale de depurar los `pasos`
   actuales; si un paso actual mezcla cálculo y comentario, el cálculo va aquí y el comentario a `comentarios`.
3. `comentarios:` (NUEVO, lista de puntos): todo lo didáctico que NO se escribiría en el examen y que estaba en
   los `pasos` o bloques `html` del cuerpo: comprobaciones, controles rápidos, comparación de vías, matices de
   enunciado, qué pasaría con otra lectura, enlaces a otros temas. **Nada se pierde**: cada punto sustantivo de
   los `pasos`/`html` antiguos acaba en `redaccion` o en `comentarios`.
4. `receta:` y `error:` se conservan tal cual (al final, como estaban).
Los bloques `pasos` y `html` antiguos del ejercicio desaparecen una vez repartido su contenido (el bloque
`html` inicial tipo «Qué se pide» suele fundirse con el plan o con el primer punto de la redacción; si no aporta
nada nuevo, se elimina). Los ejercicios de `clase: libro` y `propio` **no llevan** `redaccion`: se quedan con sus
`pasos` (solo se les aplica D3).

## D3 — «Qué uso» en una línea (todos los ejercicios con `plan`)
La fila «Qué uso» del plan deja de repetir el enunciado completo del teorema. Formato: nombre del resultado +
fórmula clave + enlace a la caja de teoría del propio tema. Ejemplo:
`<b>Teor. 4.7</b> (U p.164): diagonalizable $\iff$ $d_i=\alpha_i$ para todo valor propio — <a href="#s3">ver teoría</a>.`
Máximo ~2 líneas. El enunciado completo solo vive en su caja de la teoría. Si el plan tiene otras filas
redundantes con el enunciado visible («Qué me piden» que solo repite el título), abréviala también a una línea.

## D2 — Condensación moderada de la teoría (`datos/X_Y/secciones/*.html`)
Objetivo: ~25-35% menos palabras visibles en el tema, sin perder información.
- Cajas `def`/`thm`/`intu`/`tip` largas → enunciado o fórmula + 1-2 líneas de idea. El resto (deducciones,
  «lectura de Lay», contexto histórico, párrafos de matices) pasa a un
  `<details class="ampl"><summary>…</summary>…</details>` dentro de la propia caja o justo después, con un
  summary descriptivo («Deducción», «Cómo lo cuenta con más detalle», «Más matices»). Las etiquetas
  `<span class="src">` acompañan al contenido que citan (si el texto se pliega, su src se pliega con él;
  cada caja conserva al menos una fuente visible).
- Elimina solo metadiscurso puro: frases de transición («como veremos», «pasamos ahora a»), repeticiones de lo
  que ya dice el título o el enunciado visible, segundas explicaciones de lo mismo que no añaden nada.
- NO toques: enunciados de definiciones y teoremas, ejemplos resueltos (sus pasos se quedan), animaciones,
  figuras, marcadores `{{ejercicio:…}}`/`{{que_cae}}`/`{{vinculos:…}}`, la chuleta, los `id=` de cajas y
  secciones (hay enlaces que apuntan a ellos), ni el orden de las secciones.

## Reglas duras
- El nº de registros en `ejercicios.yaml` y de ejercicios de examen NO baja; ningún `id` cambia.
- YAML: todo texto en bloques literales (`campo: |-`); no uses comillas con escapes. Si generas YAML con un
  script Python, usa cadenas `r'…'`.
- Regla 8 bis de CLAUDE.md: nada de erratas, «solución oficial» ni comparativas entre fuentes.
- No ejecutes `datos_tema.py extraer` ni `plantilla`. No hagas commit (lo hace quien te llama).

## Comprobación final (obligatoria)
```
~/venv/bin/python herramientas/datos_tema.py validar X.Y     # 0 errores; sin avisos de «examen sin redaccion»
~/venv/bin/python herramientas/datos_tema.py construir X.Y
~/venv/bin/python herramientas/datos_tema.py estado x        # el tema queda sincronizado
```
Comprueba con grep que el nº de `details.sol` y de `id="ex-…"` del HTML generado no ha bajado respecto a git
(`git show HEAD:temas/tema_X_Y_….html`). Informa al terminar: nº de ejercicios de examen convertidos, palabras
visibles antes/después (texto sin etiquetas) y cualquier duda que hayas dejado sin resolver.
