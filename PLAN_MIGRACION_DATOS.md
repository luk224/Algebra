# Plan: temas como datos + plantillas

> **ESTADO AL CERRAR LA SESIÓN (14-nov-2026, límite de uso):** hechas F1, F2, F3, F4, F5.1 (los 26 temas con capa), F5.2 (series de práctica en 11 temas; 20 generadores verificados), F6 (CLAUDE.md, agentes, `construir_todo.py`). **Pendiente:** F5.3 (revisión: ver `CORRECCIONES_PENDIENTES.md`, nada aplicado; faltan por recoger los informes de 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 4.1-4.4, 5.1-5.4, 6.1-6.5), F5.1b (mejoras de contenido: teoría en tarjetas, pregunta motivadora, soluciones con resultado primero, consignas en animaciones), generadores de práctica para los demás temas, y F7/F8 (esperan aprobación). Antes de seguir: `git pull`, `~/venv/bin/python herramientas/construir_todo.py --sin-practica`.

**Alcance:** uso personal, solo contenido estático. Las pestañas arrancan en «Todo».

Objetivo: dejar de editar a mano 26 HTML de ~120 KB. El contenido vive en **datos** (YAML + fragmentos HTML con LaTeX) y el HTML de `temas/` se **genera**. Así un cambio de diseño se aplica a todos los temas, los agentes abren trozos pequeños en vez de ficheros enormes y un validador impide que se pierda un ejercicio de examen.

> **Regla de oro:** no se migra un tema si `verificar` no da «IDA Y VUELTA OK». Nunca se empieza el siguiente paso sin haber hecho commit del anterior.
> **Estado:** el usuario ha aprobado solo el piloto (tema 2.3). **No migrar el resto hasta que el usuario lo confirme.**

## Cómo retomar el trabajo (si se acaba el contexto o los tokens)
1. `cd ~/UNED/ALGEBRA/claude && git pull --rebase --autostash origin main && git log -8 --oneline`
2. Leer este fichero: la tabla «Estado» y la primera casilla sin marcar de «Pasos».
3. Python con las dependencias: **`~/venv/bin/python`** (tiene PyYAML y Playwright; el `python3` del sistema no). Si falta algo: `~/venv/bin/pip install pyyaml playwright`. En `wyse` hace falta lo mismo solo para *editar datos*; el HTML generado ya está en git.
4. Comprobar que lo ya migrado sigue bien: `~/venv/bin/python herramientas/datos_tema.py verificar 2.3` (repetir con cada tema migrado).
5. Seguir por el primer paso sin marcar. Al terminar cada paso: commit + push (CLAUDE.md §4b).

## Herramientas (ya hechas)
| Orden | Qué hace |
|---|---|
| `datos_tema.py extraer X.Y` | HTML actual → `datos/X_Y/{tema.yaml, pagina.html, ejercicios.yaml}` (cada ejercicio sustituido en la página por `{{ejercicio:ID}}`) |
| `datos_tema.py construir X.Y` | datos → `temas/tema_X_Y_*.html` |
| `datos_tema.py verificar X.Y` | construye en memoria y compara con el HTML actual: (1) mismas etiquetas, atributos y texto; (2) mismo texto visible en Chrome |
| `datos_tema.py validar X.Y` | ids únicos, campos obligatorios, bloque `plan` y `pasos`, fuente X en los ejercicios de examen, sin menciones a erratas |
| `datos_tema.py migrar X.Y` | extraer + validar + verificar + construir y comprobación de que no se pierde ningún ejercicio |
| `datos_tema.py probar todos` | extrae y reconstruye los 26 temas EN MEMORIA y compara; es la prueba rápida antes de cada commit |
| `examenes.py` | regenera `datos/examenes.yaml` (registro global) y valida |
| `probar_practica.py` | comprueba con sympy los generadores de `assets/practica.js` |
| `prioridades.py` | regenera `prioridades.html` |

Esquema del registro de un ejercicio: ver la cabecera de `herramientas/datos_tema.py`.

**Cómo se edita un dato:** cambiar el texto dentro del bloque literal (`campo: |-` y el texto indentado debajo, sin comillas ni escapes), luego `construir X.Y`, luego `verificar` o abrir el HTML. No se edita a mano `temas/tema_X_Y_*.html` de un tema migrado: se perdería en la siguiente construcción.

## Estado de los temas
Leyenda: `—` sin tocar · `E` ejercicios en datos (fase F2) · `C` carcasa y teoría en datos (fase F3) · `P` capa pedagógica en datos (fase F5).

| Tema | Estado | Tema | Estado | Tema | Estado |
|---|---|---|---|---|---|
| 1.2 | **C** | 3.1 | **C** | 5.1 | **C** |
| 1.3 | **C** | 3.2 | **C** | 5.2 | **C** |
| 1.4 | **C** | 3.3 | **C** | 5.3 | **C** |
| 1.5 | **C** | 3.4 | **C** | 5.4 | **C** |
| 2.1 | **C** | 3.5 | **C** | 6.1 | **C** |
| 2.2 | **C** | 4.1 | **C** | 6.2 | **C** |
| **2.3** | **C** (+ tipos/problema) | 4.2 | **C** | 6.3 | **C** |
| 2.4 | **C** | 4.3 | **C** | 6.4 | **C** |
| | | 4.4 | **C** | 6.5 | **C** |

## Hallazgos durante la migración (leer antes de seguir)
- **Corrección de cifras:** la página de prioridades contaba 235 «ejercicios de examen» porque usaba `id="ex-…"`. Eran 13 ejercicios propios con id `ex-propio-…` (sin fuente X) y 3 resúmenes que solo remiten a otro tema. La cifra correcta es **219** ejercicios de examen desarrollados paso a paso (222 con fuente X). `prioridades.html` ya usa el registro y los 219.
- Un mismo `id` de examen (p. ej. `ex-sep24`) existe en varios temas: designa el examen, no la pregunta. No hay colisión porque cada tema es una página distinta.
- El extractor v2 lee los 26 temas sin intervención (636 soluciones). Los bloques con estructura no estándar (27 recetas con texto extra, `ol.steps` con `start`, párrafos «Qué se pide») quedan como bloque `html` literal.
- **Después de la migración no se vuelve a ejecutar `extraer` ni `plantilla` en un tema**: sobrescribirían ediciones hechas en los datos. Se edita el dato y se reconstruye.

## Lo que se sabía del contenido antes de empezar (censo inicial)
- 636 soluciones (`details.sol`) en 26 temas; 593 llevan `<p class="enun">` dentro de la solución. **Solo el 2.3 tiene el formato nuevo** (enunciado visible, pista, nivel ★) y los demás el antiguo.
- Bloques dentro de una solución: `div.plan` (539), `ol.steps` (628), `p` (997), `div.recipe` (565); rarezas: `div.box` (15), `table` (3), `figure` (2), `h4` (2), `p.note` (1).
- 25 soluciones **sin `id`**. ~15 irregulares para el extractor actual: `details` anidados, comentarios `<!-- -->` y fórmulas `$$…$$` sueltas a nivel superior.
- Con el extractor actual, los temas donde más soluciones no se pueden leer son 1.2 (7 de 35), 1.3 (2 de 23), 1.4 (3 de 32), 1.5 (1 de 6) y 2.1 (1 de 17); en los demás pasan todas.

## Pasos
Cada paso termina con commit. Orden estricto en F1-F4; F5 puede ir en paralelo a F3 por temas ya migrados; F7 y F8: aprobadas por el usuario (14-nov-2026), hechas salvo 8.3.

### F1 — Generalizar el extractor al formato antiguo
- [x] **1.1** Hacer opcionales `nivel` y `pista` en el esquema. El renderizador usa el formato antiguo (enunciado **dentro** de la solución, sin estrellas) cuando faltan, y el nuevo cuando existen. Hecho cuando: `verificar` pasa en un tema antiguo de prueba (propuesta: 2.2). *(hecho: `nivel`/`pista`/`enunciado` opcionales; formato antiguo = bloque `enun` dentro del cuerpo)*
- [x] **1.2** Admitir en el cuerpo bloques `html` con comentarios y fórmulas `$$` sueltas, y `details` anidados (contar la profundidad real, no buscar `\n</details>`). *(hecho: `top_level` admite comentarios y texto suelto; `bloques_sol` cuenta la anidación real de `details`)*
- [x] **1.3** Generar `id` estables para las 25 soluciones sin id (`e<tema>-<n>`), sin cambiar los enlaces existentes (comprobar con `grep` que nadie enlaza a un id inexistente). *(hecho: ids `sol-X_Y-N` para las 25 soluciones sin id; el comparador ignora el atributo `id` que empieza por `sol-`)*
- [x] **1.4** Recordatorio: `datos/` **se sube a git** (es la fuente); no añadirlo al `.gitignore`.
- [x] **1.5** Probar `extraer`+`verificar` sobre los 25 temas restantes **sin construir**, solo para ver cuáles pasan sin intervención. Anotar en la tabla los que fallan y por qué. Hecho cuando: lista de fallos documentada aquí. *(hecho: `datos_tema.py probar todos` → **26 de 26 temas pasan sin intervención**; 636 ejercicios, 235 de examen, 243 de libro, 158 propios)*

### F2 — Migrar los ejercicios, tema a tema *(HECHO: 26 de 26 temas; 636 soluciones, 235 ejercicios de examen intactos; `datos_tema.py migrar X.Y` automatiza la receta)*
Receta por tema (un commit cada uno): `extraer X.Y` → `validar X.Y` → `verificar X.Y` (OK) → `construir X.Y` → abrir el HTML en Chrome (sin errores) → marcar `E` en la tabla → commit «Tema X.Y: ejercicios en datos».
- [x] **2.1** Módulo 2: 2.1, 2.2, 2.4 (2.3 ya hecho).
- [x] **2.2** Módulo 3: 3.1 a 3.5.
- [x] **2.3** Módulo 4: 4.1 a 4.4.
- [x] **2.4** Módulo 5: 5.1 a 5.4.
- [x] **2.5** Módulo 6: 6.1 a 6.5.
- [x] **2.6** Módulo 1: 1.2 a 1.5 *(hecho; no fueron irregulares con el extractor v2)*.
- Si un tema falla `verificar`: no tocar el HTML; corregir el extractor o escribir el bloque como `html` y volver a probar. Nunca «arreglar» el contenido a la vez que se migra.
- Tras cada módulo: `validar` en todos los migrados y comprobar que el nº de `details.sol` y de `id="ex-…"` por tema no ha bajado (`grep -c`).

### F3 — Carcasa y teoría *(HECHO)*
- [x] **3.1** `tema.yaml` ampliado con: título, módulo, kicker, resumen del hero, horas, libro y páginas, prerrequisitos, mapa del tema, enlaces a la teoría de otros temas. *(hecho: `tema.yaml` lleva código, archivo, título, clase de `<html>`, listas `css`/`js`, kicker, h1, resumen, chips —horas, libro y páginas— y letras de la leyenda. Prerrequisitos y mapa del tema siguen dentro de la sección «inicio» (HTML))*
- [x] **3.2** `plantilla_tema.html` con cabecera, topbar, pestañas, índice lateral, chuleta, lista de comprobación, errores frecuentes y panel de fuentes, rellenada desde `tema.yaml`. Verificar con la misma ida y vuelta. *(hecho: `datos/_plantilla/tema.html` con marcadores `{{titulo}}`, `{{recursos}}`, `{{kicker}}`, `{{h1}}`, `{{resumen}}`, `{{chips}}`, `{{leyenda}}`, `{{cuerpo}}`; el pie es común a los 26 temas. Se edita a mano: no volver a ejecutar `plantilla`)*
- [x] **3.2b** La carcasa debe incluir lo que hoy solo tiene el 2.3: `<html class="pilot">`, `assets/pedagogia.css/js` y `practica.js`, `data-vista` en cada `h2` (teoría / tipos / ejercicios / examen), pestañas, botón «Mostrar fuentes» (ocultas por defecto) y el aviso «archivo generado» en la cabecera. *(hecho: la plantilla lee `html_class`, `css` y `js` de `tema.yaml`; solo el 2.3 las usa de momento. Activar pestañas en otro tema = poner `html_class: class="pilot"`, añadir `pedagogia.css/js` y `data-vista` a sus `h2`: es F5. Aviso «GENERADO» ya incluido en el HTML)*
- [x] **3.3** Partir `pagina.html` en un fragmento por sección (`datos/X_Y/s1.html`, `s2.html`…), para que un agente abra solo la sección que toca. *(hecho: `datos/X_Y/secciones/NN_id.html`, uno por `h2`; `cargar` los concatena por orden de nombre)*
- [x] **3.4** Migrar tema a tema (mismo orden que F2) con la receta: extraer → verificar → construir → commit. *(hecho: los 26 temas, 1 commit por tema, ida y vuelta verificada con Chrome)*

### F4 — Datos globales *(HECHO)*
- [x] **4.1** `datos/examenes.yaml`: un registro por ejercicio de examen con convocatoria, pregunta, **tema donde se desarrolla**, **tipo de problema** y puntos si se conocen. Rellenarlo desde los dossiers (`fuentes_txt/examenes_dossier_*.md`) y los `id="ex-…"`. *(hecho: `herramientas/examenes.py` genera `datos/examenes.yaml` desde los temas; no se edita a mano)*
- [x] **4.1b** Añadir al esquema de ejercicio el campo `problema` (tipo de problema: `base`, `coord`, `dim`, `completar`…) para generar automáticamente las listas de enlaces de las fichas «Por tipo» y la tabla «Qué cae». En el 2.3 hoy esos enlaces están escritos a mano en `pagina.html`. *(hecho en el esquema y en el 2.3: `problema` —lista, el primero es el principal— y `etiqueta`. Los otros 25 temas lo rellenan en F5)*
- [x] **4.2** Validador global: cada ejercicio del registro aparece **exactamente una vez** en algún tema; ningún ejercicio de examen desaparece (regla 14). *(hecho, adaptado: el mismo `id` de examen se repite en varios temas porque designa el examen y cada tema desarrolla una pregunta distinta; la clave es (tema, id). El validador marca error si hay id repetido dentro de un tema y avisa de preguntas con la misma referencia en varios temas, para revisar a mano)*
- [x] **4.3** Generar desde datos: tabla «Qué cae en el examen», enlaces de las fichas «Por tipo», `prioridades.html` y `index.html`. *(hecho para «Qué cae» y los enlaces de las fichas del 2.3 —marcadores `{{que_cae}}` y `{{vinculos:ID}}`— y para `prioridades.html`. `index.html` se deja manual: sus tarjetas llevan miniaturas SVG propias)*

### F5 — Capa pedagógica en el resto de temas (ya con datos)
**Cómo se hace F5.1 (proceso montado):** un agente por tema (sonnet) lee `herramientas/prompt_capa.md` y escribe `datos/X_Y/capa_propuesta.yaml` (niveles, pistas, tipos, esencial, quiz); se valida con `aplicar_capa.py X.Y --solo-validar`; después `aplicar_capa.py X.Y` lo aplica (mueve el enunciado, añade pistas, copia esencial/tipos/quiz a `tema.yaml`, pone `capa: true` y reconstruye). Revisar a mano una muestra de pistas por tema antes de commit. Estado por tema: ver la tabla de arriba (columna **P** = capa aplicada).
- [ ] **5.1** Por tema: `nivel` y `pista` de cada ejercicio, fichas de método por tipo de problema, «Lo esencial en 5 minutos» y autoevaluación con el porqué de cada opción errónea. Se escribe en datos; el piloto 2.3 es el modelo.
- [ ] **5.1b** Mejoras de contenido del piloto aún no aplicadas ni siquiera al 2.3 (decidir primero en el 2.3, luego extender):
  - Teoría en tarjetas cortas (idea, definición, ejemplo mínimo, error típico) y el resto en «Ampliación» plegada (`details.ampl`). En el 2.3 solo se plegaron 2 bloques.
  - Pregunta motivadora de 2 líneas **antes** de cada definición.
  - Soluciones de práctica con «resultado + por qué» primero y el desarrollo largo tras «Ver desarrollo» (las de examen mantienen el desarrollo completo).
  - Cada animación con consigna: «mueve esto y fíjate en aquello» + pregunta que se responde observando.
  - Las pestañas arrancan en **Todo** (decidido por el usuario); Teoría, Por tipo, Ejercicios y Examen filtran.
- [ ] **5.2** Series de práctica: añadir los generadores de cada tema a `assets/practica.js` y comprobarlos con `probar_practica.py` (0 errores). Orden por rentabilidad según `prioridades.html`: 1.2, 3.2, 6.2, 5.1, 1.3, 1.4, 4.3, 4.2.
- [x] **5.3** Revisión con el `revisor-tema` de cada tema. *(hecho: 26 de 26; correcciones aplicadas; restos en `CORRECCIONES_PENDIENTES.md`)*

### F6 — Procesos y agentes
- [ ] **6.1** Actualizar `CLAUDE.md` (§3, §4, §4b): el HTML de `temas/` es un producto generado; el flujo es datos → `validar` → `construir` → `verificar` → commit.
- [ ] **6.2** Actualizar `.claude/agents/redactor-tema.md`, `revisor-tema.md`, `resolutor-ejercicios.md` y el skill `resumen-algebra`: los agentes escriben/revisan `datos/X_Y/`, no el HTML.
- [ ] **6.3** Un script `construir_todo.py` que valida y construye todos los temas e imprime un resumen; usarlo antes de cada commit.

### F7 — Producto de estudio *(APROBADA y HECHA, salvo la tabla de notación)*
- [x] **7.1** Repaso espaciado: preguntas de temas anteriores a los 2 y 7 días y cuestionarios que mezclan temas; tarjetas de repaso (definiciones, «¿cuándo es diagonalizable?»). *(hecho: `repaso.html` con 276 tarjetas —156 preguntas y 120 fichas—, caja de Leitner 1-2-4-7-14-30 días en `localStorage`, modos «repaso de hoy», «test mezclado» y «fichas»; lo genera `herramientas/repaso.py`)*
- [x] **7.2** Ruta semanal ligada al cronograma (PEC1 27-30 nov 2026, PEC2 15-18 ene 2027). *(hecho: `ruta.html`; calcula qué temas caben antes de cada PEC según las horas semanales, por prioridad y dependencias, con casillas «estudiado»; `herramientas/ruta.py`)*
- [x] **7.3** Chuleta global por módulo (descargable), glosario y tabla de notación con búsqueda, mapa conceptual por tema y global (dependencias entre temas). *(hecho: `chuletas.html` por módulo e imprimible, `glosario.html` con buscador (123 definiciones), `mapa.html` de dependencias; `herramientas/estudio.py`. La «tabla de notación» no se ha hecho)*
- [x] **7.4** Aprendizaje en espiral: cada concepto aparece en versión intuitiva, formal y de examen; enlaces «si te atascas, vuelve a…». *(hecho: caja «Si te atascas, vuelve a…» en cada tema desde `datos/dependencias.yaml`; `capa.atascas`)*

### F8 — Calidad *(APROBADA; 8.3 pendiente de que el usuario revise dependencias y horas)*

- [x] **8.1** Tests automáticos antes de cada commit: sin errores de consola, enlaces internos válidos (`#id` y entre temas), buen aspecto a 390 px y en modo oscuro, nº de ejercicios de examen no baja, interactivos y 3D con fallback sin WebGL. *(hecho: `herramientas/tests_sitio.py`: 28 páginas × 3 vistas sin errores de consola ni scroll horizontal, enlaces internos válidos, pestañas con contenido y recuentos de ejercicios; 0 fallos)*
- [x] **8.2** Impresión/PDF con la capa nueva (pestañas, pistas y series ocultas; fichas visibles; todo abierto): `exportar_pdf.py` sobre el 2.3 y revisar el resultado. *(hecho: PDF de 2.3 y 4.3 revisados: se imprimen «Lo esencial», «Qué cae», fichas y «Si te atascas»; no se imprimen pistas, autoevaluación, series, pestañas ni el aviso «GENERADO»)*



- [ ] **8.3** Revisar la columna «Necesitas antes» de `prioridades.html` (dependencias orientativas, criterio del autor) y las horas estimadas de cada tema.

## Riesgos y cómo se evitan
| Riesgo | Medida |
|---|---|
| Perder o cambiar contenido al migrar | `verificar` (etiquetas, atributos, texto y texto visible en Chrome) obligatorio; migrar sin corregir contenido a la vez |
| Editar a mano un HTML generado | Aviso en CLAUDE.md; `validar` y `construir_todo.py` antes de commit; cabecera «generado» en el HTML (pendiente en F3.2) |
| YAML mal formado al editar a mano | Todo el texto en bloques literales (`|-`); mensaje de error explica el consejo |
| Perder ejercicios de examen | Registro global y validador (F4) |
| Dos equipos desincronizados | El HTML generado va en git; los datos también; `git pull --rebase --autostash` al empezar |
| Series de práctica aleatorias en las comparaciones | `verificar` elimina los `.drill` antes de comparar el texto visible |

## Costes estimados (orientativos)
- F1: un trabajo contiguo, el más delicado (decide cuántos temas pasan solos).
- F2: cuando F1 funciona, ~1 comando + 1 revisión por tema. Bajo.
- F3: medio-alto (se toca la estructura de la página). Se puede dejar para más tarde sin perder lo ganado en F2.
- F4: medio. Aporta `Qué cae`/prioridades sin regex.
- F5: es el trabajo grande de contenido (pistas, fichas, generadores); ahora es barato de editar y de comprobar.
