# Dossier tema 3.3 «Ecuaciones y matriz asociada» (Aplicaciones lineales)

Generado a partir de `fuentes_txt/ingenieros.txt` (U), `fuentes_txt/lay.txt` (L) y `fuentes_txt/ejercicios.txt` (E). Páginas impresas verificadas leyendo la cabecera de cada página del .txt (U: impresa = PDF − 6; E: impresa = PDF − 4; L: el desfase varía, ver §2). Los cálculos de los ejercicios se han comprobado con sympy. En los enunciados se han restaurado acentos y símbolos; en U y L los símbolos se han normalizado.

Verificado en U: §3.3 ocupa impresa **113 a 117**. La página 117 comparte la cabecera con el inicio de §3.4 («3.4. Operaciones con aplicaciones lineales…»), por lo que el último bloque de 3.3 (expresión matricial y Ej. 3.19) está en 117. CLAUDE.md da «113-116 aprox.»: el dato real es 113-117.

---

## 1. U (libro oficial), §3.3

### 1.0 Elementos didácticos (impresa 113)
- Introducción: «Determinar una aplicación es dar un modo de calcular las imágenes de todos los elementos del conjunto inicial.» Y: «Si la aplicación es lineal no es necesario dar esa ley de formación ni las imágenes de todos los vectores del espacio vectorial inicial, es suficiente dar las imágenes de los vectores de una base, porque con ello se pueden encontrar las ecuaciones de la aplicación como veremos en el Teorema 3.2.»
- Orientaciones (impresa 113): «Las matrices existen independientemente de las aplicaciones…»; «En esta sección se van a estudiar de forma paralela las aplicaciones lineales y las matrices asociadas.»
- Objetivos (impresa 113): «Saber interpretar la información contenida en la matriz asociada a una aplicación lineal.» · «Construir la matriz asociada a una aplicación lineal, fijada una base.» · «Encontrar las ecuaciones de una aplicación lineal dada.» · «Saber generar las ecuaciones de una aplicación lineal.»

### 1.1 Determinación de una aplicación lineal (impresa 114-115)
- **Teorema 3.2 (impresa 114):** «Si f : V → W es una aplicación lineal y B = {e1, e2, …, em} una base de V, entonces: La imagen de cualquier vector v de V está determinada por las imágenes f(e1), f(e2), …, f(em) de los vectores de la base B.»
- **Demostración (impresa 114):** «Un vector v = (v1, v2, …, vm)_B de V es combinación lineal de los vectores de B… Por ser f lineal, su imagen es: f(v) = v1 f(e1) + v2 f(e2) + ⋯ + vm f(em).»
- **Ejemplo 3.16 (impresa 114-115):** «Si f : ℝ² → ℝ³ es una aplicación lineal tal que f(1,0) = (1,2,1) y f(0,1) = (1,1,0)…». Se escribe x = x1(1,0) + x2(0,1) y, por linealidad, f(x) = x1(1,2,1) + x2(1,1,0) = (x1 + x2, 2x1 + x2, x1). Unas ecuaciones de f (impresa 115): **y1 = x1 + x2; y2 = 2x1 + x2; y3 = x1.** Nota del libro: «B = {(1,0),(0,1)} es una base de ℝ² y {(1,2,1),(1,1,0)} es un subconjunto de ℝ³ pero no es base.»
- **Ejemplo 3.17 (impresa 115):** «No puede haber una aplicación lineal f : ℝ² → ℝ², tal que, f(2,3) = (0,1) y f(−2,−3) = (1,0).» Razón: si fuera lineal, f(−2,−3) = −f(2,3) = (0,−1) ≠ (1,0).

### 1.2 Matriz asociada (impresa 115-116)
- **Teorema 3.3 (impresa 115):** «Si f : V → W es una aplicación lineal, B = {e1, e2, …, em} una base de V y S = {u1, u2, …, un} una base de W, entonces: f determina una matriz única que está asociada a la aplicación lineal en las bases elegidas B y S.» («Dicha matriz juega un papel decisivo en el estudio de las aplicaciones lineales.»)
- **Definición 3.4 (impresa 116):** «A es la matriz asociada a la aplicación lineal f : V → W respecto a las bases B ⊂ V y S ⊂ W si:» f(e1) = a11 u1 + a21 u2 + ⋯ + an1 un; f(e2) = a12 u1 + a22 u2 + ⋯ + an2 un; …; f(em) = a1m u1 + a2m u2 + ⋯ + anm un. «Los aij están ordenados en una tabla rectangular de n filas y m columnas que corresponden a: m = Dimensión de V (número de vectores de las bases de V porque cada columna es la imagen de un vector de la base de V). n = Dimensión de W (número de coordenadas de f(ei) porque cada f(ei) es un vector de W).»
  - Lectura práctica: **cada columna de A son las coordenadas en S de f(e_j)**; A es n×m (filas = dim W, columnas = dim V).
- **Ejemplo 3.18 (impresa 116):** en la aplicación del Ej. 3.16, «las imágenes de la base B = {(1,0),(0,1)} de ℝ², referidas a la base canónica de ℝ³ determinan la matriz asociada». Número de columnas = 2 (dim ℝ²), número de filas = 3 (dim ℝ³). «La matriz asociada a f es A = [[1, 1],[2, 1],[1, 0]].» (Matriz 3×2 cuyas columnas son f(1,0) = (1,2,1) y f(0,1) = (1,1,0).)

### 1.3 Expresión matricial (impresa 117)
- «Si f(x1, x2, …, xm) = (y1, y2, …, yn) y A es la matriz asociada a la aplicación lineal f : V → W en las bases B ⊂ V y S ⊂ W, es evidente que la aplicación se puede determinar mediante su expresión matricial: Y = AX», con X la matriz columna de coordenadas de x respecto de B e Y la de y respecto de S.
- **Ejemplo 3.19 (impresa 117):** «Las ecuaciones en forma matricial y en forma cartesiana de la aplicación lineal del Ejemplo 3.16 son:» [y1; y2; y3] = [[1, 1],[2, 1],[1, 0]] · [x1; x2] ⇔ y1 = x1 + x2, y2 = 2x1 + x2, y3 = x1.

### 1.4 Figuras
- En §3.3 **no hay figuras** en el texto extraído (búsqueda de «Figura» en impresas 113-117: ninguna). No hace falta `extraer_figura.py`.

### 1.5 Lo que NO aparece en §3.3 (aviso)
- U no añade en 3.3 una notación distinta para matrices respecto de bases no canónicas: la misma Def. 3.4 cubre cualquier par de bases B y S.
- El caso de bases no canónicas en un endomorfismo (cambio de base de la matriz) corresponde a §3.5 (impresa 131 y ss.); no se ha leído aquí.

## 2. L (Lay), apartados equivalentes

**Desfase de página (verificado en cabeceras):** §1.9 PDF 126 = impresa 71 (desfase −55). §4.4 PDF 319 = impresa 216 (desfase −103). §5.4 PDF 449 = impresa 289 (desfase −160). **No es −18 en ninguno de los casos usados aquí**: citar siempre la impresa que muestra la cabecera.

### 2.1 §1.9 «Matriz de una transformación lineal» (impresa 71-72): caso de bases canónicas
- **Teorema 10 (impresa 71):** «Sea T : ℝⁿ → ℝᵐ una transformación lineal. Así, existe una única matriz A tal que T(x) = Ax para toda x en ℝⁿ. De hecho, A es la matriz de m × n cuya j-ésima columna es el vector T(e_j), donde e_j es la j-ésima columna de la matriz identidad en ℝⁿ: A = [T(e1) ⋯ T(en)].» Lay la llama «matriz estándar».
- Equivalencia con U: la T de Lay es la f de U con B y S canónicas; la A de Lay es la matriz asociada de U Def. 3.4. Lay explica la intuición (impresa 71): «El término transformación lineal se enfoca sobre una propiedad de un mapeo, mientras que la transformación matricial describe cómo se implementa tal mapeo.»
- Ejemplos 2-3 (impresa 72): dilatación T(x) = 3x, con A = [[3,0],[0,3]]; giro de ángulo ω, con A = [[cos ω, −sen ω],[sen ω, cos ω]].
- Límite: §1.9 solo trata bases canónicas; para bases arbitrarias ver §5.4 (abajo).

### 2.2 §4.4 «Sistemas de coordenadas» (impresa 216-217): coordenadas de los vectores de la imagen
- **Teorema 7 (impresa 216, «teorema de la representación única»)** y **definición de coordenadas** (impresa 216): para B = {b1,…,bn} base de V y x en V, las coordenadas de x respecto de la base B son los pesos c1,…,cn tales que x = c1b1 + ⋯ + cnbn; el vector de ℝⁿ formado por ellos es el vector de coordenadas [x]_B.
- Ejemplo 1 (impresa 217): ejemplo numérico con una base B = {b1, b2} de ℝ² y un vector de B-coordenadas dado (dibujo de la malla adaptada a B). Útil para explicar por qué las columnas de la matriz asociada son **coordenadas** y no vectores «en bruto».
- Uso en 3.3: en la Def. 3.4 de U, las entradas a_ij son precisamente las S-coordenadas de f(e_j).

### 2.3 §5.4 «Vectores propios y transformaciones lineales»: «La matriz de una transformación lineal» (impresa 289-290)
Es el **equivalente de U Def. 3.4 con bases arbitrarias**. No figura en la tabla de CLAUDE.md §2 (ver §7 de este dossier).
- Texto (impresa 289): «Sean V un espacio vectorial n-dimensional, W un espacio vectorial m-dimensional y T cualquier transformación lineal de V a W. Para asociar una matriz con T, se eligen bases (ordenadas) B y C para V y W, respectivamente.»
- Ecuaciones (3) y (4) (impresa 289): **[T(x)]_C = M [x]_B**, con **M = [ [T(b1)]_C  [T(b2)]_C  ⋯  [T(bn)]_C ]**. «La matriz M es una representación matricial de T, llamada matriz para T respecto a las bases B y C.»
- Ejemplo 1 (impresa 289-290): B = {b1, b2} de V, C = {c1, c2, c3} de W; las columnas de M son los vectores de C-coordenadas de T(b1) y T(b2), por lo que M es 3×2.
- Caso V = W, B = C: «B-matriz para T», [T]_B (impresa 290). Ejemplo 2 (impresa 290): derivada en ℘2 con B = {1, t, t²}: T(1) = 0, T(t) = 1, T(t²) = 2t, y [T]_B = [[0,1,0],[0,0,2],[0,0,0]]. Lay comprueba [T(p)]_B = [T]_B [p]_B.
- Aviso de Lay (impresa 290): «Si B y C son bases para el mismo espacio V y si T es la transformación identidad… la matriz M en la ecuación (4) es justo una matriz de cambio de coordenadas (véase la sección 4.7).» Esto conecta con §3.5, no con 3.3.

### 2.4 Qué NO aporta Lay a 3.3
- **§4.2** (núcleo, espacio columna, Nul/Col) es de 3.2 (ver dossier_3_2.md §2).
- **§4.7** «Cambio de base» (impresa 239 y ss., PDF 364) es de **3.5** (matriz de cambio de base de U). Se cita aquí solo como referencia cruzada.

## 3. E (libro de ejercicios): mapa de 3.3

**Cabecera (impresa 92, PDF 96):** «3.2. Imagen y núcleo» y «3.3. Ecuaciones y matriz asociada» comparten una introducción: «Los ejercicios de las secciones 3.2 y 3.3 se abordarán conjuntamente porque la matriz asociada es muy útil para analizar núcleo e imagen…» Por tanto «3.3 p.92» de CLAUDE.md es la página compartida. El libro no reparte los ejercicios: el reparto es por contenido.

**Páginas de inicio (impresa = PDF − 4), verificadas:** Ej. 3.14 imp 91 · **3.15 imp 93** · 3.16 imp 93 · **3.17 imp 94** · **3.18 imp 95** · **3.19 imp 96** · 3.20 imp 97 · 3.21 imp 98 · 3.22 imp 99 · 3.23 imp 100 · 3.24 imp 101 · 3.25 imp 101 · 3.26 imp 102 · 3.27 imp 102 · 3.28 imp 103 · 3.29 imp 104 · **3.30 imp 106 (§3.4)** · 3.31 imp 108 (§3.4). La cabecera «3.4 Aplicaciones y matrices: operaciones» está en impresa 105 (PDF 109), así que 3.30 y 3.31 son de 3.4.

### 3.1 Reparto propuesto (por contenido)

| Ejercicio | Página E | Sección por contenido | Decisión |
|---|---|---|---|
| 3.15 | 93 | **3.3** (matriz asociada de f: ℝ³→ℝ²) | **Asignado a 3.3** |
| 3.17 | 94 | **3.3** (matriz asociada ℝ³→M2×2) | **Asignado a 3.3** |
| 3.18 | 95 | **3.3** (matriz de la derivada en P3) | **Asignado a 3.3** |
| 3.19 | 96 | **3.3** (matriz y ecuaciones de un endomorfismo de P2) | **Asignado a 3.3** |
| 3.20 | 97 | mixto: 3.3 (A: matriz y ecuaciones) + 3.2 (B, C: núcleo, dim imagen) | **Ya desarrollado en tema 3.2**; en 3.3 solo enlace a su parte A |
| 3.21 | 98 | mixto: 3.3 (A: matriz) + 3.2 (B, C) | **Ya desarrollado en tema 3.2**; en 3.3 solo enlace a A |
| 3.25 | 101 | mixto: 3.3 (matriz de la derivada en P3) + 3.2 (base de Im) | **Ya desarrollado en tema 3.2**; enlace a la matriz |
| 3.28 | 103 | mixto: 3.2 (base de Nuc, completar base) + 3.3 (C: matriz «si es posible») | **Ya desarrollado en tema 3.2**; enlace a C |
| 3.29 | 104 | frontera 3.2 / 3.3 / **3.4** (composición f∘f) | **Ya desarrollado en tema 3.2**; no es de 3.3 |
| 3.30, 3.31 | 106, 108 | **3.4** (operaciones: suma, composición de matrices) | **No son de 3.3** (tema 3.4) |

**Resultado: los ejercicios que el tema 3.3 desarrolla en propio son 3.15, 3.17, 3.18 y 3.19.** Los 3.20, 3.21, 3.25 y 3.28 tienen una parte de matriz asociada que se puede enlazar; no se duplican. El 3.16 (ecuaciones de Im) es de 3.2 y ya está en `temas/tema_3_2_nucleo_imagen.html`.

**Sobre la premisa del encargo:** es cierto que 3.2 cubre hasta E 3.29 (en `tema_3_2_nucleo_imagen.html`, E 3.16 y 3.20–3.29). Pero los 3.15 y 3.17–3.19 son de 3.3 y están **antes** en el libro (E pp. 93-96), no después. El salto 3.29 → 3.30 coincide con el cambio a §3.4; no hay un bloque de 3.3 entre ellos.

---

## 4. Enunciados E de 3.3 (literales, acentos restaurados) y solución del libro

### Ejercicio 3.15 (E p.93, imp. 93; PDF 97): solo 3.3
«Si f : ℝ³ → ℝ² es una aplicación lineal, tal que f(1, 0, 0) = (1, 1), f(0, 1, 0) = (1, 1) y f(0, 0, 1) = (1, 0), entonces, las filas de la matriz asociada a f en las bases canónicas son: A) (1, 1), (1, 0), (0, 1). B) (1, 1), (0, 1), (1, 1). C) (1, 1, 1), (1, 1, 0).»
- **Método:** en bases canónicas, las columnas de la matriz son f(e1), f(e2), f(e3): A = [[1,1,1],[1,1,0]] (2×3). Sus **filas** son (1,1,1) y (1,1,0). Solución del libro: **solo C**. Ecuaciones (impresa 93): y1 = x1 + x2 + x3; y2 = x1 + x2.
- sympy: A = [[1,1,1],[1,1,0]] ✓.

### Ejercicio 3.17 (E p.94, imp. 94; PDF 98): solo 3.3
«Si f : ℝ³ → M2×2 es una aplicación lineal, tal que f(1, 0, 0), f(0, 1, 0), f(0, 0, 1) son, respectivamente, las matrices de filas {(3, 1), (2, 4)}, {(1, −1), (−5, 5)} y {(2, −2), (−1, 4)}, se pide calcular la matriz asociada a f.»
- **Método:** base canónica de M2×2: B = { E11, E12, E21, E22 } (orden del libro: [[1,0],[0,0]], [[0,1],[0,0]], [[0,0],[1,0]], [[0,0],[0,1]]). Las coordenadas de cada matriz imagen son sus entradas leídas por filas: (3,1,2,4), (1,−1,−5,5), (2,−2,−1,4). Son las **columnas**.
- Matriz 4×3 (solución del libro, impresa 94): filas (3, 1, 2), (1, −1, −2), (2, −5, −1), (4, 5, 4). Verificada con sympy ✓.
- Comprobación de dimensiones (libro, impresa 94): dim ℝ³ = 3 columnas; dim M2×2 = 4 filas.

### Ejercicio 3.18 (E p.95, imp. 95; PDF 99): solo 3.3
«El endomorfismo de P3 que asigna a cada polinomio de grado ≤ 3 su derivada, tiene por matriz asociada en la base canónica: A) [matriz triangular inferior con unos: filas (1,0,0,0), (1,1,0,0), (1,1,1,0), (1,1,1,1)]. B) [matriz identidad 4×4]. C) [filas (0,0,0,0), (3,0,0,0), (0,1,0,0), (0,0,2,0)]. D) Ninguna de las anteriores.»
- **Método:** imágenes de la base {1, x, x², x³}: 1 ↦ 0; x ↦ 1; x² ↦ 2x; x³ ↦ 3x². Columnas: (0,0,0,0), (1,0,0,0), (0,2,0,0), (0,0,3,0). **Matriz correcta:** [[0,1,0,0],[0,0,2,0],[0,0,0,3],[0,0,0,0]].
- Solución del libro (impresa 95): A), B) y C) no son correctas: **respuesta D**.
- Verificación: el texto extraído de E estaba desordenado; la imagen de la página (PDF 99) confirma las tres opciones tal como se escriben arriba. Ninguna coincide con la matriz correcta (sympy ✓).
- Ejemplo del libro en el mismo recuadro (impresa 95-96): P(x) = 2x³ + 5x² − 1 tiene coordenadas (−1, 0, 5, 2); su derivada 6x² + 10x tiene coordenadas (0, 10, 6, 0) = matriz · coordenadas (comprobado con sympy).

### Ejercicio 3.19 (E p.96, imp. 96; PDF 100): solo 3.3
«Si f(1) = 3 + 2x + x², f(x) = 2 y f(x²) = 2x² en el endomorfismo f de P2 (polinomios reales de grado 2), es cierto que: A) No hay datos suficientes para escribir la matriz de f. B) No se pueden escribir las ecuaciones de f. C) No hay datos suficientes para encontrar la imagen de x + 3. D) Las coordenadas de f(x+3) respecto a la base canónica son (11, 6, 3).»
- **Método:** las columnas son f(1), f(x), f(x²) en coordenadas de {1, x, x²}: f(1) = (3, 2, 1), f(x) = 2 (polinomio constante, coordenadas (2, 0, 0)), f(x²) = 2x² = (0, 0, 2). Matriz A = [[3,2,0],[2,0,0],[1,0,2]]. Ecuaciones (impresa 96): y1 = 3x1 + 2x2; y2 = 2x1; y3 = x1 + 2x3.
- Imagen de x + 3 = (3, 1, 0): f(x+3) = 3f(1) + f(x) = 3(3 + 2x + x²) + 2 = 11 + 6x + 3x² → (11, 6, 3) ✓ (sympy: A·(3,1,0) = (11,6,3)). Solución del libro: **D**.
- Atención: la «f(x) = 2» del enunciado es el **polinomio constante 2**, no «f evaluada en x».

## 5. Ejercicios de E compartidos con 3.2 (ya desarrollados en `tema_3_2_nucleo_imagen.html`)

Se listan con su parte de matriz asociada (la que corresponde a 3.3) para enlazar desde 3.3. No se desarrollan de nuevo.

### Ejercicio 3.20 (E p.97, imp. 97; PDF 101): 3.3 (A) + 3.2 (B, C) + MAXIMA (D)
«Si las imágenes por una aplicación lineal f de los vectores de la base canónica de ℝ⁴ en P2 son (1, 0, −1), (2, −4, 1), (−1, 0, −2), (2, −2, −2), se pide: A) Matriz y ecuaciones de f en las bases canónicas. B) Ecuaciones y una base de Nuc(f). C) Dimensión de Im(f). D) Escribir las instrucciones de MAXIMA que permiten encontrar una base y la dimensión del núcleo de f.»
- Parte 3.3 (A): A = [[1,2,−1,2],[0,−4,0,−2],[−1,1,−2,−2]] (3×4). Ecuaciones (impresa 97): y1 = x1 + 2x2 − x3 + 2x4; y2 = −4x2 − 2x4; y3 = −x1 + x2 − 2x3 − 2x4. Las imágenes se leen como coordenadas en {1, x, x²} (el enunciado no lo dice; el libro lo supone). Verificado con sympy ✓.
- Parte 3.2 (B, C): Nuc(f) = ⟨(3, 1, 1, −2)⟩, dim 1; dim Im(f) = 3. Verificado ✓ (rango 3).

### Ejercicio 3.21 (E p.98, imp. 98; PDF 102): 3.3 (A) + 3.2 (B, C)
«Si f : ℝ³ → M2×2 es la aplicación lineal, tal que, f(1, 0, 0) = [[2, −1],[3, 0]]; f(0, 1, 0) = [[1, 0],[4, 2]]; f(0, 0, 1) = [[5, 1],[0, 1]], se pide calcular: A) La matriz asociada a f. B) Base de Imagen de f. C) Núcleo de f.»
- Parte 3.3 (A): coordenadas de cada matriz en la base canónica de M2×2 como columnas: f(e1) = (2,−1,3,0), f(e2) = (1,0,4,2), f(e3) = (5,1,0,1). A = [[2,1,5],[−1,0,1],[3,4,0],[0,2,1]] (4×3). Verificado ✓.
- Parte 3.2 (B, C): rango 3 → base de Im(f) = {f(e1), f(e2), f(e3)} (dim 3); Nuc(f) = {0} (sympy: nullspace vacío) ✓.

### Ejercicio 3.25 (E p.101, imp. 101; PDF 105): 3.3 (matriz) + 3.2 (imagen)
«Si P3(x) es el espacio vectorial de los polinomios reales de una variable y grado ≤ 3, y f es el endomorfismo de P3(x) que asigna a cada polinomio su primera derivada, se pide: Matriz de la aplicación, una base y dimensión de Im(f).»
- Parte 3.3: matriz [[0,1,0,0],[0,0,2,0],[0,0,0,3],[0,0,0,0]] (la misma que 3.18). Ejemplo a + bx + cx² + dx³ ↦ b + 2cx + 3dx² (impresa 101).
- Parte 3.2: Im(f) = P2(x), base {1, x, x²}, dim 3.

### Ejercicio 3.28 (E p.103, imp. 103; PDF 107): 3.2 (A, B) + 3.3 (C)
«Si f es una aplicación lineal de P3(x) en ℝ⁴ cuyo núcleo es Nuc(f) = {ax + bx²}, se pide: A) Una base de Nuc(f). B) Completar la base elegida para el núcleo hasta obtener una base de P3(x). C) Matriz asociada a f, si es posible.»
- Parte 3.3 (C): **no es posible** con los datos. La matriz necesita f(1), f(x), f(x²), f(x³), y el núcleo solo informa de f(x) = f(x²) = 0 (libro, impresa 103: «solo conocemos dos columnas»). Útil como ejemplo de por qué la matriz asociada exige **imágenes de toda la base** del espacio inicial.
- Parte 3.2 (A, B): base de Nuc = {x, x²}; completar con {1, x³}.

### Ejercicio 3.29 (E p.104, imp. 104; PDF 108): frontera 3.2 / 3.4 (no de 3.3)
«El endomorfismo f de P4 que asigna a cada polinomio su derivada, verifica: A) Las filas de la matriz asociada a f∘f en la base canónica son (0,0,2,0,0), (0,0,0,6,0), (0,0,0,0,12), (0,0,0,0,0), (0,0,0,0,0). B) Im(f∘f) = P2. C) Nuc(f∘f) = P1. D) Nuc(f∘f) ⊂ Im(f∘f).»
- Solución del libro: A, B, C y D son correctas (f∘f = derivada segunda). Es de composición (§3.4) y de núcleo/imagen (§3.2). Ya está en el tema 3.2.

---

## 6. Erratas y símbolos perdidos
- U impresa 116: la matriz del Ej. 3.18 llega en texto como «1 1 / 2 1 / 10»; se reconstruye como [[1,1],[2,1],[1,0]] a partir de las ecuaciones del Ej. 3.16 (impresa 115) y de la expresión matricial de la impresa 117.
- U impresa 117: la cabecera y el texto de 3.4 están en la misma página (sin error, pero el Ej. 3.19 se cita como impresa 117).
- E 3.18: el texto extraído (`ejercicios.txt`) da las matrices desordenadas; la imagen del PDF confirma el enunciado (ver §4).
- E 3.21: el texto extraído da mal las matrices 2×2; se han reconstruido a partir de las columnas del libro y coinciden con las de la solución.
- Margen «M A X I M A» y texto de la columna lateral: ignorado.

---

## 7. Faltas o dudas
1. **CLAUDE.md §1 y §2, página U de 3.3:** pone «113-116 aprox.». La sección llega a 117 (Ej. 3.19 y expresión matricial, cabecera compartida con §3.4). Corregir a 113-117 cuando se actualice el temario.
2. **CLAUDE.md §2, Lay para 3.3 (§1.9, §4.4-4.7):** la referencia más afín a la **matriz asociada respecto de bases** es Lay **§5.4** («La matriz de una transformación lineal», impresa 289-290), que no está en la tabla. §4.7 es de 3.5 y §4.2 es de 3.2.
3. **Desfase de L:** en este tema el desfase es −55 (§1.9), −103 (§4.4) y −160 (§5.4), no −18. Verificado en cabeceras; aun así, confirmar la página exacta antes de citar.
4. **Ejemplos de examen (X) para 3.3:** no están en este dossier (alcance pedido: U, L, E). Falta compilar `fuentes_txt/examenes_dossier_3_3.md` con `resolutor-ejercicios` (regla de «todos los ejercicios de examen»).
5. **Reparto E:** 3.20, 3.21, 3.25 y 3.28 tienen una parte de matriz asociada, pero ya están desarrollados en el tema 3.2 y no se duplican. Si se prefiere que la matriz se desarrolle en 3.3, habría que moverlos y avisar al redactor de 3.2. Decisión tomada aquí: no duplicar.
6. **E 3.20:** el enunciado dice «imágenes… en P2» sin especificar las coordenadas; la solución las lee en la base {1, x, x²}. Conviene decirlo explícitamente en el HTML.
7. **E 3.19:** «f(x) = 2» es el polinomio constante 2. Notarlo en el HTML para evitar confusión con «evaluar en x».
8. **Lay, cita literal:** el texto de Lay tiene símbolos de fuente mal extraídos («Ä», «D», «C», «ϭ», «Ϫ»); las citas de §1.9, §4.4 y §5.4 de este dossier están normalizadas. Las páginas impresas se han verificado con las cabeceras.
9. **Coordenadas en L §4.4:** la definición de B-coordenadas está en impresa 216, pero la línea de texto extraída está cortada en la fórmula «x = c1 b1 + ⋯ + cn bn»; la fórmula se toma del contexto del párrafo. Si se cita literal, releer PDF 319.
10. **Figuras:** no hay figuras de U para 3.3. Si el redactor quiere una figura de «matriz como aplicación», debe ser SVG propio.
11. **Ejemplo 3.18 de U (impresa 116):** la matriz se reconstruye (ver §6); conviene releer PDF 122 si se cita literal.
