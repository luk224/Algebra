# CLAUDE.md — Álgebra (UNED, Grado en Ingeniería, curso 2026-27)

**Objetivo del proyecto:** que el usuario apruebe la asignatura y sepa resolver los ejercicios del libro de ejercicios.
**Producto principal:** un resumen HTML por cada tema/sección (`temas/tema_X_Y_nombre.html`), pensado para alguien que lo estudia **por primera vez**, con ejercicios resueltos y **la fuente (libro + página/capítulo) visible en lateral o al pasar el ratón**.

Idioma: **español** (todo el contenido, comentarios y comunicación con el usuario).

Metodología de este proyecto tomada de `E:\UNED\CALCULO\claude` (mismo autor). El prompt genérico para replicar esta metodología en otra asignatura está en `E:\UNED\PROMPT_BASE_METODOLOGIA_APUNTES.md`.

## 1. Fuentes (carpeta padre `E:\UNED\ALGEBRA\`)

| Clave | Libro | PDF | Texto extraído (`fuentes_txt/`) | Uso |
|---|---|---|---|---|
| **U** | *Álgebra para Ingenieros* — Díaz, Hernández, Tejero (UNED, 2ª ed. 2014). **Libro oficial** del cronograma | `Libro_Algebra_Para_Ingenieros_2a_edicion_junio_2014_UNED.pdf` | `ingenieros.txt` | Estructura, definiciones, teoremas, ejemplos y notación de referencia. **Manda el temario.** |
| **E** | *Ejercicios de Álgebra para Ingenieros* — mismos autores (UNED, 2ª ed. 2014) | `Ejercicios_de_Algebra_Para_Ingenieros_2_edicion_2014_UNED.pdf` | `ejercicios.txt` | 248 ejercicios resueltos, organizados **fielmente** según las secciones del libro de teoría U (mismo capítulo.sección). |
| **L** | *Álgebra Lineal y sus Aplicaciones* — David C. Lay, 4ª ed. | `Álgebra_Lineal_y_sus_Aplicaciones_Lay.pdf` | `lay.txt` | Mejores explicaciones intuitivas y geométricas, más ejemplos. Estructura de capítulos **distinta** de U (ver §2 tabla de correspondencia). No cubre cónicas/cuádricas. |
| **A** | Apuntes/diapositivas de tutoría ETSI (Azahar Monge), **solo Tema 1** | `algebraetsi_tema1.pdf` | `etsi_tema1.txt` | Explicación alternativa de matrices, determinantes y sistemas, con más ejemplos numéricos. Es una presentación de diapositivas: **no tiene página impresa fiable**, citar por el título de la diapositiva/apartado (ver `data-ref` en §3). |
| **N** | NotebookLM «Algebra» (id `573ad779-c907-4062-9286-810e42bb19f9`, MCP `gemini-notebook-mcp`) | mismos 4 PDF + vídeo de YouTube «Curso Álgebra UNED» | — | Consultas rápidas y para orientarse en el vídeo del curso. **No fiarse de sus índices/páginas**; verificar siempre en los `.txt`. |
| — | *Guía de estudio* (guía docente oficial, curso 2026/27) | `Guía_Álgebra.pdf` (en `E:\UNED\ALGEBRA\`, no en el notebook) | — | Cronograma, sistema de evaluación, bibliografía. Ya volcada en la tabla de módulos de este documento; no hace falta volver a leerla salvo para confirmar detalles de evaluación. |

Los `.txt` están generados con `pdftotext -layout -enc UTF-8` (las páginas se separan con `\f`). Regenerar copiando antes el PDF a un nombre ASCII si `pdftotext` de Git Bash falla con tildes (ya se hizo así para L: `Álgebra_Lineal_y_sus_Aplicaciones_Lay.pdf` → copiar a `lay.pdf` temporalmente).

### Numeración de páginas (citar SIEMPRE la página **impresa**, comprobada contra el índice de cada libro)
- **U**: página impresa = página PDF **− 6** (p. ej. §1.2 empieza en impresa p.9 = PDF p.15; comprobado en el índice, PDF p.11 → impresa "5").
- **E**: impresa = PDF **− 4** (comprobado: PDF p.9 → impresa "5", Ejercicio 1.1).
- **L** (Lay): impresa = PDF **− 18** (comprobado: PDF p.20 → impresa "2", §1.1).
- **A** (diapositivas ETSI): sin numeración de página fiable — citar con `data-l="A"` y `data-ref` = título de la diapositiva/apartado (según el índice del PDF, ej. «Determinantes de orden tres»).
- El índice que devuelve NotebookLM es poco fiable: confirmar siempre contra el texto extraído.

## 2. Temario y cronograma (curso 2026-27)

La asignatura tiene 6 módulos y **el número de módulo coincide con el número de Tema/Capítulo en U y en E** (a diferencia de Cálculo). 90% examen final (8 preguntas: 6 cuestiones cortas + 2 problemas), hasta 1 punto de PEC1+PEC2 (test, no obligatorias). PEC1 = módulos 1-3, PEC2 = módulos 4-6. El contenido de Maxima **no** entra en el examen.

| Tema/Módulo | Título | U (secciones) | Página U (impresa) | Página E (impresa) |
|---|---|---|---|---|
| **1** | Herramientas | 1.1 Maxima ⚠**fuera de examen, se omite el resumen** · 1.2 Álgebra matricial · 1.3 Determinantes · 1.4 Sistemas de ecuaciones lineales | 1.1 p.5 · 1.2 p.9 · 1.3 p.23 · 1.4 p.28 (autoeval. p.52) | 1.1 p.3 · 1.2 p.10 · 1.3 p.22 · 1.4 p.29 |
| **2** | Espacios vectoriales | 2.1 Espacios vectoriales. Subespacios · 2.2 Sistemas de generadores · 2.3 Bases. Dimensión. Coordenadas · 2.4 Operaciones entre subespacios. Suma directa | 2.1 p.55 · 2.2 p.69 · 2.3 p.81 · 2.4 p.89 (autoeval. p.98) | 2.1 p.45 · 2.2 p.57 · 2.3 p.64 · 2.4 p.70 |
| **3** | Aplicaciones lineales y matrices | 3.1 Conceptos y propiedades · 3.2 Imagen y núcleo · 3.3 Ecuaciones y matriz asociada · 3.4 Operaciones con aplicaciones lineales y matrices · 3.5 Matriz inversa y cambios de base | 3.1 p.101 · 3.2 p.104 · 3.3 p.113 · 3.4 p.117 · 3.5 p.131 (autoeval. p.137) | 3.1 p.79 · 3.2 p.92 · 3.3 p.92 · 3.4 p.105 · 3.5 p.109 |
| **4** | Diagonalización de matrices | 4.1 Relaciones de equivalencia · 4.2 Valores y vectores propios · 4.3 Diagonalización de matrices · 4.4 Matrices de Jordan | 4.1 p.141 · 4.2 p.148 · 4.3 p.159 · 4.4 p.167 (autoeval. p.190) | 4.1 p.119 · 4.2 p.129 · 4.3 p.140 · 4.4 p.150 |
| **5** | Ortogonalidad | 5.1 Producto escalar · 5.2 Matrices ortogonales · 5.3 Diagonalización de matrices simétricas · 5.4 Mínimos cuadrados | 5.1 p.193 · 5.2 p.214 · 5.3 p.220 · 5.4 p.225 (autoeval. p.238) | 5.1 p.161 · 5.2 p.174 · 5.3 p.183 · 5.4 p.190 |
| **6** | Formas bilineales y cuadráticas | 6.1 Formas bilineales · 6.2 Formas cuadráticas · 6.3 Clasificación de las formas cuadráticas · 6.4 Cónicas · 6.5 Cuádricas | 6.1 p.243 · 6.2 p.251 · 6.3 p.258 · 6.4 p.271 · 6.5 p.288 (autoeval. p.306) | 6.1 p.201 · 6.2 p.209 · 6.3 p.215 · 6.4 p.222 · 6.5 p.228 |

**No es materia de examen:** 1.1 Introducción a Maxima (ni el uso de Maxima en general). El usuario ya ha decidido **saltarse el 1.1** en este proyecto: no se hace resumen de esa sección; se empieza directamente por **1.2**.

### Correspondencia aproximada con Lay (L) — estructura de capítulos distinta, usar solo para explicaciones más claras
| Tema UNED | Capítulo(s) de Lay más afines |
|---|---|
| 1 (matrices, determinantes, sistemas) | Cap. 1 (§1.1-1.5, sistemas y ecuación matricial), Cap. 2 (§2.1-2.3, álgebra de matrices, inversa), Cap. 3 (determinantes) |
| 2 (espacios vectoriales) | Cap. 4 (§4.1-4.6) |
| 3 (aplicaciones lineales) | §1.8-1.9 (transformaciones lineales), Cap. 4 §4.2 (núcleo/imagen), §4.7 (cambio de base) |
| 4 (diagonalización) | Cap. 5 (valores y vectores propios) |
| 5 (ortogonalidad) | Cap. 6 (ortogonalidad y mínimos cuadrados) |
| 6 (formas bilineales/cuadráticas, cónicas, cuádricas) | §7.1-7.2 (formas cuadráticas: diagonalización, clasificación). **Lay no trata cónicas ni cuádricas**: para 6.4-6.5 usar solo U (y A si aplica). |

Estos rangos son orientativos; verificar el contenido exacto en `fuentes_txt/lay.txt` al redactar cada tema (el agente `fuentes-algebra` debe confirmarlo, no asumirlo).

### Unidades de resumen
Un HTML por sección del cronograma: `1.2, 1.3, 1.4, 2.1…2.4, 3.1…3.5, 4.1…4.4, 5.1…5.4, 6.1…6.5` (21 temas en total; no se hace 1.1). Orden de trabajo = orden del cronograma, salvo que el usuario pida otro. El usuario pide cada tema por su número («tema 1.2», «tema 4.3»…).

### Mapa de ejercicios de E por sección
E organiza los ejercicios **por capítulo, en el mismo orden que U**, pero el libro no numera qué ejercicios exactos corresponden a cada subsección (1.2 vs 1.3 vs 1.4, etc.) — solo da la página de inicio de cada subsección (tabla de arriba). **Regla operativa para el agente `fuentes-algebra`:** un ejercicio de E pertenece a la subsección de U cuya página impresa es la mayor que no supera la página impresa de inicio de ese ejercicio en E, comparando el **contenido** (tipo de objeto matemático que usa) para confirmar, no solo la página — un ejercicio de repaso al final de una sección puede anticipar la siguiente. Para el Tema 1 ya se ha comprobado un primer corte orientativo (verificar siempre en `ejercicios.txt` antes de dar por bueno):
- 1.1 (Maxima, fuera de examen): Ejercicios 1.1-1.5.
- 1.2 (álgebra matricial): aproximadamente Ejercicios 1.6-1.20 (incluye matrices, matrices elementales, escalonadas y rango).
- 1.3 (determinantes): aproximadamente Ejercicios 1.21-1.30.
- 1.4 (sistemas de ecuaciones): aproximadamente Ejercicios 1.31 en adelante (hasta el final del capítulo, Ejercicio 1.44 o el que sea el último).
Para los temas 2-6, el agente `fuentes-algebra` debe construir este mapa la primera vez que se toque cada tema y anotar el resultado en el dossier que entrega (no hace falta escribirlo aquí, pero si se detecta un error en lo anterior, corregir esta lista).

## 3. Formato de los resúmenes HTML

Ficheros y estructura:
```
E:\UNED\ALGEBRA\claude\
  CLAUDE.md
  index.html                      índice de todos los temas (actualizarlo al terminar cada tema)
  assets/resumen.css, resumen.js  estilo y comportamiento COMPARTIDOS (no duplicar en cada tema)
  assets/katex/                   KaTeX local (offline)
  plantilla_tema.html             esqueleto que se copia para cada tema
  temas/tema_1_2_algebra_matricial.html   …
  fuentes_txt/                    texto de los PDF (ingenieros.txt=U, ejercicios.txt=E, lay.txt=L, etsi_tema1.txt=A)
  herramientas/extraer_figura.py  recorte de figuras de los PDF
  .claude/agents/, .claude/skills/
```

Reglas de contenido (para alguien que estudia por primera vez):
1. **Intuición primero**: cada concepto = idea en lenguaje llano + ejemplo/analogía → definición formal → ejemplo → error típico. Nada de «es evidente». En Álgebra esto es especialmente importante: muchos conceptos (subespacio, base, núcleo, forma cuadrática…) son abstractos y necesitan un ejemplo numérico concreto en $\mathbb R^2$ o $\mathbb R^3$ antes de generalizar.
2. **Prerrequisitos** al principio y **mapa del tema** (qué se pide en los ejercicios y en el examen).
3. Cajas: `def` (definición), `thm` (teorema/propiedad), `ex` (ejemplo resuelto), `tip` (truco de examen), `warn` (error típico), `intu` (intuición).
4. **Ejercicios resueltos**: los de **E** correspondientes a la sección (con su número: «Ejercicio 2.5»), resueltos paso a paso y con el «por qué» de cada paso, más ejemplos propios sencillos → difíciles. Cada ejercicio enseña un **método reutilizable** (recuadro «Receta»). El examen exige *desarrollar el proceso lógico* (no solo el resultado): las soluciones deben modelar eso.
5. Al final: **chuleta** (fórmulas/propiedades clave, con sus hipótesis — en Álgebra las hipótesis importan mucho: p. ej. cuándo una matriz es diagonalizable), **lista de comprobación** («sé hacer…») y errores frecuentes.
6. Matemáticas con **KaTeX** local (`$…$`, `$$…$$`). Las matrices se escriben con `\begin{pmatrix}…\end{pmatrix}` o `bmatrix`. Figuras en **SVG inline** cuando aclaren (rectas, planos, elipses/hipérbolas en cónicas, cuádricas en 3D simplificadas). Todo debe verse bien en claro/oscuro y en móvil, e imprimirse.
7. **Fuentes visibles**: cada definición, teorema, ejemplo y ejercicio lleva una etiqueta `<span class="src" data-l data-ref>` con **libro + sección + página impresa** (ej. `U §1.2.2 p.11`, `E Ej. 2.5 p.47`, `L §4.3 p.208`, `A "Determinantes de orden tres"` sin página). En escritorio aparece en el **lateral** (nota marginal); en móvil/hover se muestra como tooltip; además hay un panel «Fuentes del tema» (colapsado en un `<details class="fuentes-toggle">`) con todas. Si algo es explicación propia sin fuente, marcarlo `data-l="P"`.
8. Prioridad de fuentes: **U** define lo que cae en examen (notación, enunciados, alcance); **L** (y **A** solo para el Tema 1) se usan para explicar mejor, indicando qué apartado de U cubren. Si L contradice a U en notación o alcance, gana U y se avisa.
9. **Rigor**: no inventar páginas ni enunciados. Toda cita de página se verifica en `fuentes_txt`. Todo cálculo se comprueba (con Python/sympy, matrices simbólicas, cuando sea posible) antes de publicarlo.
10. Estilo de las cajas y componentes: ver `assets/resumen.css` y `plantilla_tema.html` (no reinventar).
11. **Figuras: preferir recortes de los libros a SVG.** Si el libro (U, E, L o A) ya tiene la figura, se recorta con `python herramientas/extraer_figura.py` (`list` para ver candidatas, `auto <libro> <pág PDF> "<pie>" <nombre>` o `crop`/`page`; ver cabecera del script; páginas PDF: U impresa+6, E impresa+4, L impresa+18) y se guarda en `assets/img/`. En el HTML: `<figure class="bookfig"><img src="../assets/img/nombre.png" alt="descripción" loading="lazy"><figcaption>… <span class="src" …></span></figcaption></figure>`. SVG inline **solo** para figuras propias que no existan en los libros (p. ej. clasificación de cónicas por excentricidad, esquema de suma directa de subespacios). Las imágenes son solo para uso personal de estudio: no publicar los HTML con ellas si el repositorio es público (ver §4b).
12. **Ejemplos «alternativos» (fuente A u otra) = ejemplo completo, nunca un resumen.** Las diapositivas de A a menudo solo dan el resultado o una frase suelta («se llega a 12 en la diagonal…»). Trasladarlo tal cual deja un ejemplo inservible para quien estudia por primera vez (caso real: «Ejemplo alternativo — método de Gauss para la inversa», tema 1.2, primera versión: una sola frase con el resultado y un «12 en la diagonal» sin explicar). Regla: el redactor debe **rehacer el cálculo** (sympy) y escribir **todos los pasos numerados**, cada uno con la matriz intermedia y el **porqué** de la operación (qué se anula, por qué ese múltiplo). Si la fuente usa un término ambiguo o impreciso, **corregirlo y aclarar explícitamente** qué significa (el «12» era el mcm de la *columna 1* = 3 y 4, no un valor «en la diagonal»). Si el ejemplo usa un método distinto al de U (p. ej. evitar fracciones con el mcm frente a normalizar cada pivote), decir en la 1.ª línea en qué se diferencia y cuándo conviene. Los pasos del ejemplo alternativo tienen la misma profundidad que los del ejemplo de U, y el `revisor-tema` comprueba que ningún ejemplo se queda en «se obtiene…» sin el desarrollo.
13. **Matrices ampliadas con línea divisoria.** Toda matriz ampliada —$(A\mid I)$, $(A\mid b)$, $(A\mid B)$, $(A_e\mid P)$…— se dibuja con la **línea vertical** que separa ambos bloques, usando `\left(\begin{array}{cc|cc}…\end{array}\right)` (con tantas `c` a cada lado del `|` como columnas tenga cada bloque). **No** usar `pmatrix` sin separador para estas matrices: sin la barra el lector no ve dónde acaba $A$ y dónde empieza $I$ (o $b$), y los ejemplos de inversa/matriz de paso/sistemas resultan confusos. La notación en línea `(A\mid I)` sí es correcta en el texto; lo que debe llevar barra es la matriz escrita con sus entradas. Modelo: Ejemplo 1.11 y Ej. 1.16 del tema 1.2.

## 4. Flujo de trabajo por tema (subagentes en `.claude/agents/`)

| Agente | Modelo | Función |
|---|---|---|
| `fuentes-algebra` | haiku | Busca en `fuentes_txt/*.txt` los pasajes de un tema en U, L, A (solo tema 1) y E, y devuelve extractos con página impresa, más enunciados de ejercicios y el mapa exacto ejercicio↔subsección. Solo lectura. |
| `resolutor-ejercicios` | opus | Resuelve paso a paso los ejercicios de E asignados a un tema, verifica con sympy (matrices, determinantes, autovalores, etc.) y devuelve soluciones didácticas con «receta». |
| `redactor-tema` | sonnet | Escribe el HTML final a partir de la plantilla, integrando teoría, explicaciones, ejercicios y fuentes. |
| `revisor-tema` | opus | Revisa rigor matemático, citas de página, cobertura de ejercicios y accesibilidad (render). Devuelve lista de correcciones. |

Pipeline: (1) `fuentes-algebra` → dossier del tema; (2) `resolutor-ejercicios` (en paralelo con 3 si es posible); (3) `redactor-tema`; (4) `revisor-tema`; (5) corregir, actualizar `index.html` y avisar al usuario. Al empezar un tema, la conversación principal coordina y **no** escribe el HTML a mano salvo retoques.
Skills de diseño ya disponibles y a usar por el redactor/maquetador: `frontend-design:frontend-design`, `carattere` (tipografía), `componi` (layout), `scrutinio` (accesibilidad/rendimiento), `lucida` (pulido final). Skill propio del proyecto: `resumen-algebra` (`.claude/skills/`).

## 4b. Publicación en GitHub (obligatorio tras cada cambio)
Repositorio: `git@github.com:luk224/Algebra.git` (rama `main`, **público**; ya existía con solo un README, se sobrescribe). Web: GitHub Pages desde `main`, carpeta raíz; hay `.nojekyll`.
**Cada vez que se termine un tema nuevo o se haga un cambio en el proyecto (temas, assets, CLAUDE.md, agentes, index.html), y antes de dar la tarea por cerrada:**
1. Actualizar `index.html` (marcar el tema como «listo») si se añadió o terminó un tema.
2. `git add -A`, revisar `git status` (no debe entrar nada de `.gitignore`: los `.pdf` y los 4 textos completos `fuentes_txt/{ingenieros,ejercicios,lay,etsi_tema1}.txt` se quedan fuera; regenerarlos desde los PDF si hacen falta).
3. `git commit` con mensaje en español que diga qué tema o cambio (p. ej. «Tema 2.2: sistemas de generadores»), terminado con la línea de coautoría que indique el entorno.
4. `git pull --rebase origin main` si hace falta y `git push origin main`.
5. Confirmar con `git log -1` y `git status` que quedó sincronizado, e indicar al usuario el enlace de la web (GitHub Pages).
Un commit por tema o cambio coherente; no acumular varios temas sin subir. No usar `--force`. Si el push falla (red, credenciales), avisar al usuario en lugar de dejarlo sin subir en silencio.

## 5. Comandos útiles
- Buscar en un libro: `Grep pattern=… path=fuentes_txt/ingenieros.txt` (usar `-C` para contexto).
- Leer una página de U: `python -c "print(open('fuentes_txt/ingenieros.txt',encoding='utf8').read().split(chr(12))[PDF-1])"` (PDF = impresa + 6).
- Leer una página de E: offset PDF = impresa + 4. De L: PDF = impresa + 18.
- Verificar cálculos: `python -c "import sympy…"` (matrices, determinantes, autovalores/autovectores, formas cuadráticas — sympy tiene `Matrix`, `.det()`, `.eigenvals()`, `.rref()`, etc.).
- Previsualizar: abrir el HTML en el navegador (o con Claude in Chrome y captura).

## 6. Impresión y PDF
La hoja de impresión está en `assets/resumen.css` (`@media print`: A4, blanco y negro, sin fuentes `.src` ni `details.fuera`, soluciones abiertas, saltos de página controlados). El botón «Imprimir / PDF» de la barra superior lo inyecta `assets/resumen.js`. Para generar PDF: `python herramientas/exportar_pdf.py [filtro…] [--unir todo.pdf] [--color]` (B/N en `pdf/`, color en `pdf/color/`, ignorado por git; botones «Imprimir / PDF» e «Imprimir en color»; `generar_pdfs.bat` hace ambos). Al crear componentes nuevos, añadirles `break-inside: avoid` en el bloque de impresión si no deben partirse.
