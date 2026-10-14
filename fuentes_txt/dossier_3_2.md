# Dossier tema 3.2 «Imagen y núcleo» (Aplicaciones lineales)

Generado a partir de `fuentes_txt/ingenieros.txt` (U), `fuentes_txt/lay.txt` (L) y `fuentes_txt/ejercicios.txt` (E). Páginas impresas verificadas leyendo la cabecera de cada página del .txt. En los enunciados de E se han restaurado acentos y símbolos (el texto original tiene `´` separada, `ϭ`, `‫ޒ‬`); en U y L los símbolos se han normalizado (ℝ, =, →).

Verificado en U: §3.2 ocupa impresa **104 (último tercio, tras el Ej. 3.7) a 112** (PDF 110-118). §3.3 empieza en impresa 113 (PDF 119). Encabezado «3.2. Imagen y núcleo» en PDF 110 = impresa 104.

---

## 1. U (libro oficial), §3.2

### 1.0 Elementos didácticos (impresa 105)
- Introducción: «Cualquier aplicación lineal, f: V → W, (V y W son espacios vectoriales) lleva asociados dos subespacios que tienen un interés especial: la imagen y el núcleo de la aplicación.»
- Orientaciones: «Para fijar correctamente los conceptos imagen y núcleo de una aplicación lineal es conveniente detenerse en la observación de los diagramas de flechas…» y «Se debe hacer énfasis en la equivalencia entre la expresión en lenguaje natural, en lenguaje de conjuntos y en lenguaje algebraico de los subespacios imagen y núcleo.»
- Objetivos: «Saber que la imagen y el núcleo de una aplicación lineal son subespacios de los espacios vectoriales final e inicial, respectivamente.» · «Reconocer cuándo un elemento pertenece a la imagen o al núcleo…» · «Escribir las ecuaciones de imagen y núcleo…» · «Relacionar las dimensiones de imagen y núcleo… con la dimensión del espacio vectorial inicial.»
- Nota 1 (pie, impresa 105): «En algunos libros, el subespacio imagen de una aplicación lineal es denominado rango de una aplicación lineal.»
- Nota 2 (pie, impresa 105): «En algunos libros, el subespacio núcleo de una aplicación lineal es denominado kernel o subespacio nulo de una aplicación lineal.»

### 1.1 Imagen (impresa 105-106)
- **Texto previo (impresa 105, 3.2.2):** «La imagen de una aplicación lineal f: V → W está formada por el conjunto de los vectores de W que tienen algún original en V. Se denota por Im(f).»
- **Definición 3.2 (impresa 106):** «Im(f) = {w ∈ W | w = f(v) para algún v ∈ V}.» «La imagen de f es un subespacio de W.»
- **Demostración (impresa 106):** «Para comprobar que el conjunto Im(f) es un subespacio vectorial de W es suficiente ver que: si w1, w2 ∈ Im(f), entonces w1 + λw2 ∈ Im(f). En efecto: … w1 + λw2 = f(v1) + λf(v2) = f(v1 + λv2)…»
- **Figura 3.1 (impresa 106):** «Imagen de una aplicación lineal» (diagrama: espacio V → f → Im(f) ⊂ espacio W). Recortable con `extraer_figura.py` (PDF 112).

### 1.2 Ejemplos de imagen
- **Ejemplo 3.8 (impresa 106):** en la aplicación del Ej. 3.1 (f de M en ℝ⁴), «cada matriz de M se transforma en un vector de ℝ⁴ tal que tiene la última coordenada nula… en general, una condición observada a simple vista no basta para caracterizar el subespacio imagen de f».
- **Ejemplo 3.9 (impresa 107):** f(x1,x2,x3) = (x1+x2, x3, x2). Se reescribe como combinación de f(e1), f(e2), f(e3); «{(1,0,0),(1,0,1),(0,1,0)} es un sistema generador de Im(f)… son linealmente independientes, forman una base y Im(f) = ⟨…⟩ = ℝ³». (Las ⟨ ⟩ del texto extraído están perdidas.)
- **Ejemplo 3.10 (impresa 108):** f(1,0,0)=(1,0), f(0,1,0)=(1,1), f(0,0,1)=(3,2). «Im(f) es un subespacio generado por {(1,0),(1,1),(3,2)}… hay dos vectores linealmente independientes, ya que su rango es dos… Im(f) = ℝ²».
- **Ejemplo 3.11 (impresa 108-109):** f: ℘₂ → ℝ³, f(a+bx+cx²) = (a, b+c, 0). «Im(f) = ⟨(1,0,0),(0,1,0)⟩. Por tanto, Dim Im(f) = 2.» Ecuación cartesiana: «x3 = 0».

### 1.3 Núcleo (impresa 109-110)
- **Texto previo (impresa 109, 3.2.3):** el núcleo «se denota por Nuc(f) y está definido por el subconjunto de los vectores de V cuya imagen es el elemento neutro de W».
- **Definición 3.3 (impresa 109):** «Nuc(f) = {v ∈ V | f(v) = 0 ∈ W} = f⁻¹(0).» «El núcleo de f es un subespacio de V.»
- **Demostración (impresa 109):** «Si v1, v2 ∈ Nuc(f), entonces v1 + λv2 ∈ Nuc(f). … f(v1 + λv2) = f(v1) + λf(v2) = 0.»
- **Figura 3.2 (impresa 110):** «Núcleo de una aplicación lineal» (diagrama Nuc(f) ⊂ V → f → 0 ∈ W). Recortable (PDF 116).

### 1.4 Ejemplos de núcleo
- **Ejemplo 3.12 (impresa 110):** núcleo de la f del Ej. 3.1: «a11 + a12 = 0, a12 − a11 = 0, a21 = 0 ⇒ a11 = a21 = a12 = 0. Por tanto Nuc(f) = {0}.»
- **Ejemplo 3.13 (impresa 110):** núcleo de f del Ej. 3.9: «Nuc(f) = {(x1,x2,x3) ∈ ℝ³ | (x1+x2, x3, x2) = (0,0,0)} = {(0,0,0)}.»
- **Ejemplo 3.14 (impresa 111):** núcleo del Ej. 3.10: «Nuc(f) = ⟨(1/2, 1, −1/2)⟩… Su dimensión es uno» (sistema x1+x2+3x3=0, x2+2x3=0). Núcleo del Ej. 3.11: «a = 0, b = −c, es decir, Nuc(f) = ⟨x − x²⟩.»

### 1.5 Teorema de las dimensiones (impresa 111)
- **Teorema 3.1 (impresa 111):** «Si f: V → W es una aplicación lineal, entonces Dim Im(f) + Dim Nuc(f) = Dim V.»
- **Ejemplo 3.15 (impresa 112):** comprobación en la f del Ej. 3.1 (V = M, dim 3): Dim Im(f) = 3 (base {(1,0,0,0),(0,1,0,0),(0,0,1,0)}), Dim Nuc(f) = 0 (se toma Dim(0)=0). «3 + 0 = 3.»

### 1.6 Qué NO aparece en §3.2 del texto extraído
- No hay definiciones de **inyectiva**, **sobreyectiva** ni **isomorfismo** en U (búsqueda en todo `ingenieros.txt` de «inyec», «sobreyec», «uno a uno», «isomor», «biyec»: sin resultados salvo «biyección» en impresa 118, §3.4). Tampoco hay una caracterización «f inyectiva ⇔ Nuc(f) = {0}» como teorema. Si el temario lo exige, habrá que buscarlo en otra fuente (L, §1.9 Teorema 11 sirve; ver §2) o confirmar con el libro.

---

## 2. L (Lay), apartados equivalentes

**Desfase de página en Lay cap. 4 (verificado en cabeceras):** impresa 198-204 = PDF 288-294 (PDF − 90); impresa 216-220 = PDF 319-323 (PDF − 103); impresa 224-233 = PDF 347-356 (PDF − 123). **Hay que mirar la cabecera de cada página.**

### 2.1 §4.2 «Espacios nulos, espacios columna y transformaciones lineales» — núcleo y rango de una T.L. (impresa 204, PDF 294)
- Resumen: Lay define la transformación lineal y, para T: V → W, el **núcleo** («espacio nulo») y el **rango** de T. Usa «rango de T» para el **subespacio imagen** (no para la dimensión; cuidado: en Lay «rango de A» = dim Col A).
- Extracto literal: «El núcleo (o espacio nulo) de dicha T es el conjunto de todas las u en V tales que T(u) = 0 (el vector cero en W). El rango de T es el conjunto de todos los vectores en W de la forma T(x) para alguna x en V.» «No es difícil demostrar que el núcleo de T es un subespacio de V… el rango de T es un subespacio de W.»
- Cubre: U Def. 3.2 y 3.3 (imagen/núcleo como subespacios). Diferencia de notación: Lay «núcleo/rango» ↔ U «Nuc/Im» (U nota 1-2 da los sinónimos).
- Tabla comparativa Nul A / Col A (impresa 204, PDF 294), ítem 8: «Nul A = {0} si y solo si la transformación lineal x → Ax es de uno a uno.»

### 2.2 §4.2, ejemplo de núcleo y rango «de cálculo» (impresa 205, PDF 295)
- Ejemplo 8 (requiere cálculo): D: derivada en V (funciones diferenciables) → W = C[a,b]. «El núcleo de D es el conjunto de las funciones constantes en [a, b] y el rango de D es el conjunto W de todas las funciones continuas en [a, b].» (Ejemplo fuera de U §3.2; útil para intuición de núcleo ≠ {0}.)

### 2.3 §4.2 Nul A y Col A para matrices (impresa 199-203, PDF 289-293)
- Definición de Nul A (impresa 199, PDF 289): «El espacio nulo de una matriz A de m×n… es el conjunto de todas las soluciones de la ecuación homogénea Ax = 0.» Teorema 2 (impresa 199): «El espacio nulo de una matriz A de m×n es un subespacio de ℝⁿ.»
- Col A (impresa 201, PDF 291): «El espacio columna de una matriz A… es el conjunto de todas las combinaciones lineales de las columnas de A.» Teorema 3 (impresa 201): subespacio de ℝᵐ.
- Ejemplos 1-3 (impresa 199-200): comprobación de pertenencia a Nul A (Au = 0) y base por variables libres. Son el caso matricial de Nuc(f) para f(x) = Ax (la propia Lay lo dice en impresa 198 y 204).

### 2.4 §1.9 «Matriz de una transformación lineal» — uno a uno y sobre (impresa 75-77, PDF 130-132)
- Definición «uno a uno» (impresa 75, PDF 130): «Se dice que un mapeo T: ℝⁿ → ℝᵐ es uno a uno si cada b en ℝᵐ es la imagen de a lo sumo una x en ℝⁿ.»
- Definición «sobre» (impresa 75, PDF 130): «Se dice que un mapeo T: ℝⁿ → ℝᵐ es sobre ℝᵐ si cada b en ℝᵐ es la imagen de al menos una x en ℝⁿ.»
- **Teorema 11 (impresa 76, PDF 131):** «Sea T: ℝⁿ → ℝᵐ una transformación lineal. Entonces T es uno a uno si y solo si la ecuación T(x) = 0 tiene únicamente la solución trivial.» (Es el equivalente de U «f inyectiva ⇔ Nuc(f) = {0}», que U no enuncia.)
- **Teorema 12 (impresa 77, PDF 132):** versión matricial: T uno a uno ⇔ columnas de A linealmente independientes.
- Cubre: a lo sumo la caracterización de inyectividad (no está en U §3.2). El texto es de §1.9 y no de §3.2: útil como complemento, no como fuente de definición.

### 2.5 §4.6 «Rango» — teorema del rango (sección impresa 230; definición y teorema en impresa 233, PDF 353 y 356)
- **Definición (impresa 233, PDF 356):** «El rango de A es la dimensión del espacio columna de A.»
- **Teorema 14 (impresa 233, PDF 356), «El teorema del rango»:** «Las dimensiones del espacio columna y del espacio fila de una matriz A de m×n son iguales. Esta dimensión común, el rango de A… satisface la ecuación: rango A + dim Nul A = n.»
- Cubre: el Teorema 3.1 de U en su versión matricial (para f(x) = Ax, Dim Im = rango, Dim Nuc = dim Nul A, n = dim V). Lay solo lo enuncia para matrices; la versión abstracta se obtiene con la matriz asociada (U §3.3).
- Ejercicios de Lay sobre el tema: §4.6 (impresa 236-237, PDF 359-360); §4.2 ejercicios: no revisados.

### 2.6 Lay §1.8 «Introducción a las transformaciones lineales» (impresa 63, PDF 106)
- Cabecera verificada («1.8 Introducción a las transformaciones lineales 63»). No se ha extraído su contenido para este dossier; sirve de introducción general a T.L. como mapeos (no revisado en detalle).

---

## 3. E (libro de ejercicios), mapa de 3.2

**Cabecera verificada (impresa 92, PDF 96):** «3.2. Imagen y núcleo» y «3.3. Ecuaciones y matriz asociada» aparecen en la misma página con una introducción común: «Los ejercicios de las secciones 3.2 y 3.3 se abordarán conjuntamente porque la matriz asociada es muy útil para analizar núcleo e imagen…». Por tanto «3.3 p.92» de CLAUDE.md no es una errata: es la página compartida. La sección 3.1 empieza en impresa 79 (PDF 83) como indica CLAUDE.md. Lo que sí hay que decidir es el reparto de ejercicios, que el libro no marca: se hace por contenido.

Páginas de inicio (impresa = PDF − 4): Ej. 3.12 imp 89 · 3.14 imp 91 · 3.15 imp 93 · 3.16 imp 93 · 3.17 imp 94 · 3.18 imp 95 · 3.19 imp 96 · 3.20 imp 97 · 3.21 imp 98 · 3.22 imp 99 · 3.23 imp 100 · 3.24 imp 101 · 3.25 imp 101 · 3.26 imp 102 · 3.27 imp 102 · 3.28 imp 103 · 3.29 imp 104 · 3.30 imp 106 (§3.4) · 3.31 imp 108 (§3.4).

### 3.1 Reparto propuesto
- **Solo 3.2 (imagen/núcleo):** Ej. 3.16, 3.22, 3.23, 3.24, 3.26, 3.27.
- **Mixtos 3.2 + 3.3:** Ej. 3.20, 3.21, 3.25, 3.28, 3.29.
- **Solo 3.3 (matriz asociada / ecuaciones):** Ej. 3.15, 3.17, 3.18, 3.19.
- **Frontera 3.1/3.2:** Ej. 3.12 (A: imagen de cualquier vector; C: Im(f) = ℝ³). El Ej. 3.14 es de 3.1 (independencia), no de 3.2.
- **Frontera 3.2/3.4:** Ej. 3.29 usa f∘f (composición, §3.4) además de Im/Nuc; los Ej. 3.30-3.31 son §3.4.

**Rango de E para 3.2: Ejercicios 3.16 y 3.20 a 3.29** (con 3.15 y 3.17-3.19 de 3.3 y 3.12 como frontera 3.1).

### 3.2 Enunciados (literales, acentos restaurados) y solución del libro resumida

**Ejercicio 3.12 (impresa 89, frontera 3.1/3.2).** «Si f: ℝ² → ℝ³ es una aplicación lineal en la que se conocen las imágenes de los elementos de una base de ℝ², se pide analizar si es correcta alguna de las afirmaciones siguientes: A) Es posible obtener la imagen de cualquier vector de ℝ². B) Cualquier vector de ℝ³ tiene un original en ℝ². C) Im(f) es ℝ³. D) Ninguna de las anteriores.»
- Solución: A es correcta (combinación lineal de la base canónica y linealidad). Las demás se descartan.

**Ejercicio 3.15 (impresa 93, 3.3).** «Si f: ℝ³ → ℝ² es una aplicación lineal tal que f(1,0,0) = (1,1), f(0,1,0) = (1,1) y f(0,0,1) = (1,0), entonces las filas de la matriz asociada a f en las bases canónicas son: A) (1,1), (1,0), (0,1). B) (1,1), (0,1), (1,1). C) (1,1,1), (1,1,0).»
- Solución: sólo C es correcta (matriz 2×3 con columnas f(e_i)).

**Ejercicio 3.16 (impresa 93, 3.2).** «Si f es la aplicación del Ejercicio 3.15, se piden ecuaciones paramétricas y ecuaciones cartesianas de Im(f).»
- Solución: con α = x1+x2 y β = x3, (y1, y2) = α(1,1) + β(1,0); Im(f) = ℝ² y no hay ecuaciones cartesianas.

**Ejercicio 3.17 (impresa 94, 3.3).** «Si f: ℝ³ → M2×2 es una aplicación lineal tal que f(1,0,0), f(0,1,0), f(0,0,1) son, respectivamente, las matrices de filas {(3,1),(2,4)}, {(1,−1),(−5,5)} y {(2,−2),(−1,4)}, se pide calcular la matriz asociada a f.»
- Solución: base canónica de M2×2; coordenadas de cada matriz imagen como columnas de la matriz asociada (4×3).

**Ejercicio 3.18 (impresa 95, 3.3).** Derivada como endomorfismo de P3 (grado ≤ 3); cuatro opciones con matrices 4×4 (A, B, C; D = ninguna). Solución del libro: A, B y C no son correctas; la respuesta es D. Las matrices del extracto están desordenadas: releer PDF p.99.

**Ejercicio 3.19 (impresa 96, 3.3).** «Si f(1) = 3+2x+x², f(x) = 2 y f(x²) = 2x² en el endomorfismo f de P2, es cierto que: A) No hay datos suficientes para escribir la matriz de f. B) No se pueden escribir las ecuaciones de f. C) No hay datos suficientes para encontrar la imagen de x+3. D) Las coordenadas de f(x+3) respecto a la base canónica son (11,6,3).»
- Solución: D (f(x+3) = 3f(1) + f(x) = 11 + 6x + 3x²).

**Ejercicio 3.20 (impresa 97, mixto 3.3 + 3.2).** «Si las imágenes por una aplicación lineal f de los vectores de la base canónica de ℝ⁴ en P2 son (1,0,−1), (2,−4,1), (−1,0,−2), (2,−2,−2), se pide: A) Matriz y ecuaciones de f en las bases canónicas. B) Ecuaciones y una base de Nuc(f). C) Dimensión de Im(f). D) Instrucciones de MAXIMA que permiten encontrar una base y la dimensión del núcleo de f.»
- Solución: A = [[1,2,−1,2],[0,−4,0,−2],[−1,1,−2,−2]]; y1 = x1+2x2−x3+2x4, y2 = −4x2−2x4, y3 = −x1+x2−2x3−2x4. B: Nuc(f) = ⟨(3,1,1,−2)⟩, dim 1 (comprobado: A·(3,1,1,−2) = 0). C: dim Im(f) = 4−1 = 3. D: nullspace(A) y nullity(A).

**Ejercicio 3.21 (impresa 98, mixto 3.3 + 3.2).** «Si f: ℝ³ → M2×2 es la aplicación lineal tal que f(1,0,0) = [2 −1; 3 0], f(0,1,0) = [1 0; 4 2], f(0,0,1) = [5 1; 0 1], se pide: A) La matriz asociada a f. B) Base de Im(f). C) Núcleo de f.»
- Solución: A = [[2,1,5],[−1,0,1],[3,4,0],[0,2,1]] (columnas = coordenadas de las imágenes). B y C se resuelven con esa matriz por reducción por filas. Las matrices 2×2 se han deducido de las columnas de la solución: el extracto las da mal.

**Ejercicio 3.22 (impresa 99, 3.2).** «Si f: ℝ³ → ℝ² está definida por f(x1,x2,x3) = (x1+x2, 0), se pide justificar si es cierta alguna de las afirmaciones: A) Dim Im(f) + Dim Nuc(f) = Dim ℝ². B) Si A es la matriz asociada, al ejecutar en MAXIMA columnspace(A) y nullity(A) se obtienen Dim Im(f) y Dim Nuc(f). C) Las dimensiones de Nuc(f) e Im(f) coinciden.»
- Solución: A = [[1,1,0],[0,0,0]]. A es falsa (la suma es dim ℝ³ = 3); B es falsa (columnspace devuelve una base, no una dimensión; nullity da la dimensión del núcleo); C es falsa (dim Nuc = 2, dim Im = 1).

**Ejercicio 3.23 (impresa 100, 3.2).** «Si f es la aplicación lineal del Ejercicio 3.2 (f(x1,x2) = (2x1, 3x1+x2, x1+x2)), se pide: A) Ecuaciones y base del subespacio Im(f). B) Ecuaciones y base del subespacio Nuc(f). C) Relación entre las dimensiones de Im(f) y Nuc(f).»
- Solución: Im(f) = {(y1,y2,y3) | y2 = y1 + y3} (compatibilidad por rangos); base {(2,3,1),(0,1,1)}, dim 2. Nuc(f) = {0}. Dim Im + Dim Nuc = 2 = dim ℝ². Ojo: el libro escribe «x2 = x1 + x3» para la ecuación de Im; debe ser «y2 = y1 + y3» (ver §4).

**Ejercicio 3.24 (impresa 101, 3.2).** «Si f es una aplicación lineal entre V y W, y λ un número real no nulo, se pide elegir las correctas: A) Nuc(λf) = λ Nuc(f). B) Dim Nuc(λf) > Dim Nuc(f) cuando λ > 1. C) Dim Nuc(λf) < Dim Nuc(f) cuando λ < 1.»
- Solución: sólo A es correcta: v ∈ Nuc(f) ⇔ f(v) = 0 ⇔ λf(v) = f(λv) = 0 ⇔ λv ∈ Nuc(λf). B y C son falsas (Nuc(λf) = Nuc(f) para λ ≠ 0).

**Ejercicio 3.25 (impresa 101, mixto 3.3 + 3.2).** «Si P3(x) es el espacio de polinomios reales de grado ≤ 3 y f es el endomorfismo que asigna a cada polinomio su primera derivada, se pide: matriz de la aplicación, una base y dimensión de Im(f).»
- Solución: base canónica {1,x,x²,x³}; matriz de la derivada (columnas 0, e1, 2e2, 3e3). Im(f) = P2(x), base {1, x, x²}, dim 3. El extracto de la solución está incompleto: releer PDF p.105.

**Ejercicio 3.26 (impresa 102, 3.2).** «Si f es el endomorfismo de P3(x) del Ejercicio 3.25, se pide: A) Subespacio Nuc(f). B) Una base de Nuc(f). C) Dimensión de Nuc(f).»
- Solución: Nuc(f) = polinomios constantes = P0(x); base {1}; dim 1.

**Ejercicio 3.27 (impresa 102, 3.2).** «Si f es el endomorfismo de P3(x) del Ejercicio 3.25, se pide: A) Subespacio Im(f∘f). B) Subespacio Nuc(f∘f). C) Relación entre las dimensiones.»
- Solución: f∘f es la segunda derivada; Im(f∘f) = P1(x) (dim 2); Nuc(f∘f) = P1(x) (dim 2); 2 + 2 = 4 = dim P3(x).

**Ejercicio 3.28 (impresa 103, mixto 3.2 + 3.3).** «Si f es una aplicación lineal de P3(x) en ℝ⁴ cuyo núcleo es Nuc(f) = {ax + bx²}, se pide: A) Una base de Nuc(f). B) Completar la base elegida hasta una base de P3(x). C) Matriz asociada a f, si es posible.»
- Solución: base del núcleo {x, x²}; completar con {1, x³} da la base {1, x, x², x³} de P3(x). C: el libro lo trata como «si es posible» (la matriz depende de la imagen de 1 y x³, que no se dan). La parte C del extracto es poco legible.

**Ejercicio 3.29 (impresa 104, mixto 3.3 + 3.2 + 3.4).** «El endomorfismo f de P4 que asigna a cada polinomio su derivada verifica: A) Las filas de la matriz asociada a f∘f en la base canónica son (0,0,2,0,0), (0,0,0,6,0), (0,0,0,0,12), (0,0,0,0,0), (0,0,0,0,0). B) Im(f∘f) = P2. C) Nuc(f∘f) = P1. D) Nuc(f∘f) ⊂ Im(f∘f).»
- Solución: f∘f es la derivada segunda; A es correcta (columnas de la matriz de f∘f). Las opciones B-D y la solución completa no se han podido leer bien del extracto: releer PDF p.108.

---

## 4. Erratas y símbolos perdidos

**U (`ingenieros.txt`):**
1. Los signos ⟨ ⟩ de «generado por» desaparecen en los ejemplos: impresa 107 (Ej. 3.9, «Im(f) = (1,0,0),(1,0,1),(0,1,0) = ℝ³»), 108 (Ej. 3.10), 109 (Ej. 3.11, «Im(f) = (1,0,0),(0,1,0)»), 111 (Ej. 3.14, «Nuc(f) = (1/2,1,−1/2)» y «Nuc(f) = x − x²»). Se leen como vectores sueltos; el sentido es «subespacio generado».
2. La palabra «inyectiva», «sobreyectiva», «isomorfismo» no aparece en U (ver §1.6).
3. Margen «Maxima: no tiene ninguna instrucción…» (impresa 104) y «M A X I M A» en otras páginas: ignorados.
4. Las figuras 3.1 (impresa 106) y 3.2 (impresa 110) aparecen en el texto sólo como pie de figura; los diagramas sólo se ven en imagen.

**E (`ejercicios.txt`):**
1. Ej. 3.23, solución (impresa 100): la ecuación cartesiana de Im(f) aparece como «x2 = x1 + x3» → debe ser **y2 = y1 + y3** (variables de la imagen). El resto (base {(2,3,1),(0,1,1)}) es correcto.
2. Ej. 3.21, 3.25, 3.28: matrices 2×2 y matrices de la derivada con filas/columnas mezcladas en el texto extraído; reconstruidas a partir de la solución.
3. Ej. 3.28, solución (parte A/B): «(0, a, b, 0)_B» mezcla coordenadas en la base canónica de P3 y en la de ℝ⁴; la notación es confusa.
4. Ej. 3.18, 3.19: matrices 4×4 y opciones con columnas desordenadas en el extracto.
5. Las letras «M AXIM A» en el margen se han ignorado.

---

## 5. Faltas o dudas
- No he localizado en U una definición o teorema de **inyectividad/sobreyectividad/isomorfismo** en §3.2. La caracterización «inyectiva ⇔ Nuc = {0}» sólo aparece en Lay §1.9 Teorema 11 (impresa 76) para ℝⁿ → ℝᵐ.
- La versión de Lay del teorema del rango (Teorema 14, impresa 233) es sólo matricial; no he encontrado el enunciado abstracto en Lay.
- Lay §4.2 (impresa 198-205) y §4.6 (impresa 230-237): páginas citadas verificadas por cabecera; el cap. 4 de Lay tiene desfase variable (90, 103 y 123). Las citas de §4.2 ejercicios y §1.8 no se han leído en detalle.
- Enunciados de E 3.18, 3.19, 3.21, 3.25, 3.28, 3.29: partes con matrices u opciones ilegibles en el extracto; releer el PDF antes de copiar literal. El resto son literales con acentos restaurados.
- Las figuras 3.1 y 3.2 de U no están recortadas (se pueden extraer con herramientas/extraer_figura.py, PDF 112 y 116).
