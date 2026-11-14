# Plan: temas como datos + plantillas

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
| `probar_practica.py` | comprueba con sympy los generadores de `assets/practica.js` |
| `prioridades.py` | regenera `prioridades.html` |

Esquema del registro de un ejercicio: ver la cabecera de `herramientas/datos_tema.py`.

**Cómo se edita un dato:** cambiar el texto dentro del bloque literal (`campo: |-` y el texto indentado debajo, sin comillas ni escapes), luego `construir X.Y`, luego `verificar` o abrir el HTML. No se edita a mano `temas/tema_X_Y_*.html` de un tema migrado: se perdería en la siguiente construcción.

## Estado de los temas
Leyenda: `—` sin tocar · `E` ejercicios en datos (fase F2) · `C` carcasa y teoría en datos (fase F3) · `P` capa pedagógica en datos (fase F5).

| Tema | Estado | Tema | Estado | Tema | Estado |
|---|---|---|---|---|---|
| 1.2 | — | 3.1 | — | 5.1 | — |
| 1.3 | — | 3.2 | — | 5.2 | — |
| 1.4 | — | 3.3 | — | 5.3 | — |
| 1.5 | — | 3.4 | — | 5.4 | — |
| 2.1 | — | 3.5 | — | 6.1 | — |
| 2.2 | — | 4.1 | — | 6.2 | — |
| **2.3** | **E** (piloto, ida y vuelta OK) | 4.2 | — | 6.3 | — |
| 2.4 | — | 4.3 | — | 6.4 | — |
| | | 4.4 | — | 6.5 | — |

## Lo que se sabe del contenido actual (censo hecho antes de empezar)
- 636 soluciones (`details.sol`) en 26 temas; 593 llevan `<p class="enun">` dentro de la solución. **Solo el 2.3 tiene el formato nuevo** (enunciado visible, pista, nivel ★) y los demás el antiguo.
- Bloques dentro de una solución: `div.plan` (539), `ol.steps` (628), `p` (997), `div.recipe` (565); rarezas: `div.box` (15), `table` (3), `figure` (2), `h4` (2), `p.note` (1).
- 25 soluciones **sin `id`**. ~15 irregulares para el extractor actual: `details` anidados, comentarios `<!-- -->` y fórmulas `$$…$$` sueltas a nivel superior.
- Con el extractor actual, los temas donde más soluciones no se pueden leer son 1.2 (7 de 35), 1.3 (2 de 23), 1.4 (3 de 32), 1.5 (1 de 6) y 2.1 (1 de 17); en los demás pasan todas.

## Pasos
Cada paso termina con commit. Orden estricto en F1-F4; F5 puede ir en paralelo a F3 por temas ya migrados; F7 y F8 son propuestas que el usuario debe aprobar antes de empezar. La **prueba con estudiantes (8.5)** conviene hacerla antes de extender la capa pedagógica (F5) a todos los temas.

### F1 — Generalizar el extractor al formato antiguo
- [ ] **1.1** Hacer opcionales `nivel` y `pista` en el esquema. El renderizador usa el formato antiguo (enunciado **dentro** de la solución, sin estrellas) cuando faltan, y el nuevo cuando existen. Hecho cuando: `verificar` pasa en un tema antiguo de prueba (propuesta: 2.2).
- [ ] **1.2** Admitir en el cuerpo bloques `html` con comentarios y fórmulas `$$` sueltas, y `details` anidados (contar la profundidad real, no buscar `\n</details>`).
- [ ] **1.3** Generar `id` estables para las 25 soluciones sin id (`e<tema>-<n>`), sin cambiar los enlaces existentes (comprobar con `grep` que nadie enlaza a un id inexistente).
- [ ] **1.4** Recordatorio: `datos/` **se sube a git** (es la fuente); no añadirlo al `.gitignore`.
- [ ] **1.5** Probar `extraer`+`verificar` sobre los 25 temas restantes **sin construir**, solo para ver cuáles pasan sin intervención. Anotar en la tabla los que fallan y por qué. Hecho cuando: lista de fallos documentada aquí.

### F2 — Migrar los ejercicios, tema a tema
Receta por tema (un commit cada uno): `extraer X.Y` → `validar X.Y` → `verificar X.Y` (OK) → `construir X.Y` → abrir el HTML en Chrome (sin errores) → marcar `E` en la tabla → commit «Tema X.Y: ejercicios en datos».
- [ ] **2.1** Módulo 2: 2.1, 2.2, 2.4 (2.3 ya hecho).
- [ ] **2.2** Módulo 3: 3.1 a 3.5.
- [ ] **2.3** Módulo 4: 4.1 a 4.4.
- [ ] **2.4** Módulo 5: 5.1 a 5.4.
- [ ] **2.5** Módulo 6: 6.1 a 6.5.
- [ ] **2.6** Módulo 1: 1.2 a 1.5 (los más irregulares, al final).
- Si un tema falla `verificar`: no tocar el HTML; corregir el extractor o escribir el bloque como `html` y volver a probar. Nunca «arreglar» el contenido a la vez que se migra.
- Tras cada módulo: `validar` en todos los migrados y comprobar que el nº de `details.sol` y de `id="ex-…"` por tema no ha bajado (`grep -c`).

### F3 — Carcasa y teoría
- [ ] **3.1** `tema.yaml` ampliado con: título, módulo, kicker, resumen del hero, horas, libro y páginas, prerrequisitos, mapa del tema, enlaces a la teoría de otros temas.
- [ ] **3.2** `plantilla_tema.html` con cabecera, topbar, pestañas, índice lateral, chuleta, lista de comprobación, errores frecuentes y panel de fuentes, rellenada desde `tema.yaml`. Verificar con la misma ida y vuelta.
- [ ] **3.2b** La carcasa debe incluir lo que hoy solo tiene el 2.3: `<html class="pilot">`, `assets/pedagogia.css/js` y `practica.js`, `data-vista` en cada `h2` (teoría / tipos / ejercicios / examen), pestañas, botón «Mostrar fuentes» (ocultas por defecto) y el aviso «archivo generado» en la cabecera.
- [ ] **3.3** Partir `pagina.html` en un fragmento por sección (`datos/X_Y/s1.html`, `s2.html`…), para que un agente abra solo la sección que toca.
- [ ] **3.4** Migrar tema a tema (mismo orden que F2) con la receta: extraer → verificar → construir → commit.

### F4 — Datos globales
- [ ] **4.1** `datos/examenes.yaml`: un registro por ejercicio de examen con convocatoria, pregunta, **tema donde se desarrolla**, **tipo de problema** y puntos si se conocen. Rellenarlo desde los dossiers (`fuentes_txt/examenes_dossier_*.md`) y los `id="ex-…"`.
- [ ] **4.1b** Añadir al esquema de ejercicio el campo `problema` (tipo de problema: `base`, `coord`, `dim`, `completar`…) para generar automáticamente las listas de enlaces de las fichas «Por tipo» y la tabla «Qué cae». En el 2.3 hoy esos enlaces están escritos a mano en `pagina.html`.
- [ ] **4.2** Validador global: cada ejercicio del registro aparece **exactamente una vez** en algún tema; ningún ejercicio de examen desaparece (regla 14).
- [ ] **4.3** Generar desde datos: tabla «Qué cae en el examen», enlaces de las fichas «Por tipo», `prioridades.html` y `index.html`.

### F5 — Capa pedagógica en el resto de temas (ya con datos)
- [ ] **5.1** Por tema: `nivel` y `pista` de cada ejercicio, fichas de método por tipo de problema, «Lo esencial en 5 minutos» y autoevaluación con el porqué de cada opción errónea. Se escribe en datos; el piloto 2.3 es el modelo.
- [ ] **5.1b** Mejoras de contenido del piloto aún no aplicadas ni siquiera al 2.3 (decidir primero en el 2.3, luego extender):
  - Teoría en tarjetas cortas (idea, definición, ejemplo mínimo, error típico) y el resto en «Ampliación» plegada (`details.ampl`). En el 2.3 solo se plegaron 2 bloques.
  - Pregunta motivadora de 2 líneas **antes** de cada definición.
  - Soluciones de práctica con «resultado + por qué» primero y el desarrollo largo tras «Ver desarrollo» (las de examen mantienen el desarrollo completo).
  - Cada animación con consigna: «mueve esto y fíjate en aquello» + pregunta que se responde observando.
  - Decidir si las pestañas arrancan en Teoría (actual) o en Todo.
- [ ] **5.2** Series de práctica: añadir los generadores de cada tema a `assets/practica.js` y comprobarlos con `probar_practica.py` (0 errores). Orden por rentabilidad según `prioridades.html`: 1.2, 3.2, 6.2, 5.1, 1.3, 1.4, 4.3, 4.2.
- [ ] **5.3** Revisión con el `revisor-tema` de cada tema y prueba con un estudiante real.

### F6 — Procesos y agentes
- [ ] **6.1** Actualizar `CLAUDE.md` (§3, §4, §4b): el HTML de `temas/` es un producto generado; el flujo es datos → `validar` → `construir` → `verificar` → commit.
- [ ] **6.2** Actualizar `.claude/agents/redactor-tema.md`, `revisor-tema.md`, `resolutor-ejercicios.md` y el skill `resumen-algebra`: los agentes escriben/revisan `datos/X_Y/`, no el HTML.
- [ ] **6.3** Un script `construir_todo.py` que valida y construye todos los temas e imprime un resumen; usarlo antes de cada commit.

### F7 — Producto de estudio completo (propuesto, **pendiente de aprobación**)
- [ ] **7.1** Repaso espaciado: preguntas de temas anteriores a los 2 y 7 días y cuestionarios que mezclan temas; tarjetas de repaso (definiciones, «¿cuándo es diagonalizable?»).
- [ ] **7.2** Simulacros de examen cronometrados (6 cortas + 2 problemas) con los ejercicios de `datos/examenes.yaml` y rúbrica de puntuación parcial (qué da puntos aunque el resultado final falle).
- [ ] **7.3** Ruta semanal ligada al cronograma (PEC1 27-30 nov 2026, PEC2 15-18 ene 2027), progreso visible por tema y panel «lo que te falta».
- [ ] **7.4** Chuleta global por módulo (descargable), glosario y tabla de notación con búsqueda, mapa conceptual por tema y global (dependencias entre temas).
- [ ] **7.5** Aprendizaje en espiral: cada concepto aparece en versión intuitiva, formal y de examen; enlaces «si te atascas, vuelve a…».
- [ ] **7.6** Tutor: botón «no entiendo este paso» con el contexto del ejercicio (requiere decidir cómo se despliega; hoy no hay servidor).

### F8 — Calidad, legal y pruebas (propuesto, **pendiente de aprobación**)
- [ ] **8.1** **Aviso legal:** el repositorio es público y publica recortes de figuras de los libros y contenido de exámenes de la UNED. Decidir con el usuario: rehacer las figuras como SVG propios, mantener el sitio privado o con enlace, o dejarlo como está. Es la decisión que más puede romper el proyecto.
- [ ] **8.2** Tests automáticos antes de cada commit: sin errores de consola, enlaces internos válidos (`#id` y entre temas), buen aspecto a 390 px y en modo oscuro, nº de ejercicios de examen no baja, interactivos y 3D con fallback sin WebGL.
- [ ] **8.3** Impresión/PDF con la capa nueva (pestañas, pistas y series ocultas; fichas visibles; todo abierto): `exportar_pdf.py` sobre el 2.3 y revisar el resultado.
- [ ] **8.4** Accesibilidad y rendimiento (`scrutinio`): foco, contraste, navegación con teclado de pestañas y cuestionarios, tamaño de página.
- [ ] **8.5** Prueba con 2 o 3 estudiantes que no sepan Álgebra (20 minutos con un tema): anotar dónde se atascan, qué pistas usan y qué preguntas fallan; corregir antes de extender a los 22 temas restantes.
- [ ] **8.6** Revisión por otra persona de las pistas y soluciones nuevas (las pistas del 2.3 las escribió una sola persona).
- [ ] **8.7** Revisar la columna «Necesitas antes» de `prioridades.html` (dependencias orientativas, criterio del autor) y las horas estimadas de cada tema.

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
