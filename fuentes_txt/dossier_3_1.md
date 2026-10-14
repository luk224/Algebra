# Dossier 3.1 — Conceptos y propiedades (Aplicaciones lineales)

Páginas verificadas en los `.txt`. U impresa = PDF − 6; E impresa = PDF − 4; L impresa = PDF − offset según cabecera (ver §0).

## 0. Páginas que ocupa cada apartado

- **U §3.1**: impresa **101–104** (PDF 107–110). Empieza en p.101 («3.1. Conceptos y propiedades»). Termina en la mitad de p.104: ahí aparecen los Ejemplos 3.4–3.7 y, al pie, el encabezado **3.2 Imagen y núcleo** y **3.2.1 Elementos didácticos** (§3.2 empieza en p.104, como indica CLAUDE.md).
- **E cap. 3, §3.1**: intro en impresa **79** (PDF 83); Ejercicios **3.1–3.14** en impresa **80–91** (PDF 84–95).
- **E §3.2 y §3.3**: comparten una única introducción en impresa **92** (PDF 96). El primer ejercicio de esas secciones es el 3.15 (impresa 93).
- **L**: §1.8 en impresa **63–66** (PDF 106–109); §4.2 en impresa **204–205** (PDF 294–295). §4.7 (cambio de base, impresa 239, PDF 364) pertenece a U §3.5, no a 3.1.

---

## 1. U §3.1 — extractos literales

### 1.1 Elementos didácticos (U p.101, PDF 107)

**Introducción** (p.101): «En esta sección se van a sentar las bases para poder hablar con propiedad del término lineal que, con frecuencia, se utiliza de forma impropia en expresiones como incremento salarial lineal, etc.»

**Orientaciones** (p.101): «En el capítulo anterior estudiamos los conjuntos que tienen estructura de espacio vectorial, en éste estudiaremos las aplicaciones que los relacionan conservando las operaciones que los definen (suma de vectores y producto de escalar por vector), es decir, que transforman un espacio vectorial en un espacio vectorial (puede ser el inicial u otro).» Y: «Es conveniente repasar previamente los contenidos del módulo Conjuntos del “Curso 0”.»

**Objetivos** (p.101):
- «Identificar la expresión coloquial la aplicación conserva la suma de vectores y el producto por escalares con la caracterización en lenguaje algebraico de las aplicaciones lineales.»
- «Recordar qué son aplicaciones lineales y saber reconocerlas.»
- «Construir una aplicación lineal a partir de distintas hipótesis de trabajo.»

**Nota al margen** (p.101): «Recordemos que los elementos de un espacio vectorial se llaman vectores.»

### 1.2 Definición 3.1 (U p.101, PDF 107)

**Definición 3.1.** «Si v y u son vectores cualesquiera de V y λ un escalar, f : V → W es una aplicación lineal entre V y W si: f(v + λu) = f(v) + λf(u).»

### 1.3 Ejemplos 3.1–3.2 (U p.101–102, PDF 107–108)

**Ejemplo 3.1** (p.101–102): «En la aplicación f : (M, +, ℝ) → (ℝ⁴, +, ℝ) definida como f([a11 a12; a21 0]) = (a11 + a12, a12 − a11, a21, 0) intervienen: El espacio vectorial inicial (M, +, ℝ), formado por las matrices cuadradas de orden 2, cuyo elemento a22 es igual a 0. [...] El espacio vectorial final (ℝ⁴, +, ℝ), formado por los vectores de ℝ⁴. [...] La aplicación f que transforma cada matriz de M en el vector (a11 + a12, a12 − a11, a21, 0) de ℝ⁴.»

**Nota al margen** (p.102): «Para afirmar que una aplicación es lineal se comprueba que verifica la definición.»

**Ejemplo 3.2** (p.102): «f : (M, +, ℝ) → (ℝ⁴, +, ℝ) del Ejemplo 3.1 es lineal: Si v, w ∈ M, y λ ∈ ℝ, hay que comprobar que f(v + λw) = f(v) + λf(w).»
- Primer miembro (texto extraído desordenado; reconstruido con la fórmula del Ej. 3.1): f(v+λw) = (a11 + λb11 + a12 + λb12, a12 + λb12 − a11 − λb11, a21 + λb21, 0).
- Segundo miembro (reconstruido igual): f(v) + λf(w) = (a11 + a12 + λ(b11 + b12), a12 − a11 + λ(b12 − b11), a21 + λb21, 0).
- Conclusión literal: «La aplicación f es lineal porque ambos miembros son idénticos.»

**Nota al margen** (p.102): «Recordemos que una técnica para comprobar que una igualdad es cierta es desarrollar independientemente los dos miembros y compararlos después.»

### 1.4 Discusión y forma general (U p.103, PDF 109)

Texto literal: «En este ejemplo f es una aplicación que transforma la suma de las matrices A, B ∈ M en la suma de las imágenes de dichas matrices y la imagen del producto de una matriz por un escalar en el escalar por la imagen de la matriz, es decir: Conserva la suma: f(A + B) = f(A) + f(B). Conserva el producto por escalares f(λA) = λf(A).»

Nota al margen (p.103): «Es aplicación, porque para cada original la imagen es única.»

Texto literal: «Las aplicaciones que, como ésta, conservan las operaciones que definen la estructura de los espacios vectoriales reciben el nombre de aplicaciones lineales o transformaciones lineales.»

Nota al margen (p.103): «Recordemos que es muy frecuente escribir un vector como una matriz columna cuyos elementos son las coordenadas de dicho vector para dar mayor claridad al texto.»

### 1.5 Ejemplo 3.3 (U p.103, PDF 109)

«La aplicación f : ℝ → ℝ, tal que f(x) = k, donde k es un valor real fijo no nulo, no es una aplicación lineal ya que no verifica la condición f(x + λy) = f(x) + λf(y):» Primer miembro: f(x + λy) = k. Segundo miembro: f(x) + λf(y) = k + λk.

### 1.6 «Propiedades de las aplicaciones lineales» (U p.103, PDF 109)

Texto literal: «Algunas de las propiedades de las aplicaciones lineales son consecuencia directa de su definición y hacer las demostraciones es muy fácil. Si f : V → W es una aplicación lineal verifica:»
1. f(0_V) = 0_W. (0_V es el elemento neutro de V y 0_W el elemento neutro de W).
2. f(−v) = −f(v).
3. f(a₁v₁ + a₂v₂ + ··· + aₙvₙ) = a₁f(v₁) + a₂f(v₂) + ··· + aₙf(vₙ) con aᵢ ∈ ℝ y vᵢ ∈ V.
4. Si v, u ∈ V son linealmente dependientes, sus imágenes f(v), f(u) también lo son.
5. Aunque v, u ∈ V sean linealmente independientes, sus imágenes f(v) y f(u) pueden no serlo.

(Nota: estas cinco propiedades aparecen como lista «Propiedades» en p.103, sin numeración de Teorema.)

### 1.7 Ejemplos 3.4–3.7 (U p.104, PDF 110)

**Ejemplo 3.4.** «Si f : V → W es una aplicación lineal, entonces f(0_V) = 0_W.» Demostración (literal): «Como f(0_V) = f(0_V + 0_V) = f(0_V) + f(0_V), despejando f(0_V) en el primer miembro de la igualdad f(0_V) + f(0_V) = f(0_V) se obtiene: f(0_V) = f(0_V) − f(0_V) = 0_W.» Texto de la sección: «Para facilitar la notación, si no induce a error, no se indicará a qué conjunto pertenece el elemento neutro (los neutros de V y W se denotarán 0).»

**Ejemplo 3.5.** «Si v, u ∈ V son linealmente dependientes, entonces f(v) y f(u) también lo son.» Demostración (texto extraído): «Por ser v, u un sistema ligado, λv + µu = 0 y alguno de los coeficientes λ o µ es no nulo. Como f es lineal f(λv + µu) = λf(v) + µf(u) = f(0) con λ = 0 o µ = 0 [SIC: símbolo perdido en la extracción, ver §4]. Por la propiedad demostrada en el ejemplo anterior sabemos que f(0) = 0, por tanto f(v), f(u) forman un sistema ligado.»

**Ejemplo 3.6.** «La imagen del sistema libre S = {(2, 1), (1, 3)} ⊂ ℝ² mediante la aplicación lineal f : ℝ² → ℝ, definida por f(x1, x2) = x1, forman un sistema ligado en ℝ.» Demostración: «Tenemos f(2, 1) = 2, f(1, 3) = 1, por tanto f(S) = {2, 1}, que es un sistema ligado en ℝ porque 2 = 2 · 1.»
- Texto de transición (p.104): «A veces es más cómodo utilizar alguna de las propiedades anteriores que la definición para comprobar que una aplicación no es lineal.»

**Ejemplo 3.7.** «Para ver que la aplicación f : ℝ → ℝ del Ejemplo 3.3 no es lineal es suficiente comprobar que f(0) = 0.»

**Notas al margen** (p.104):
- «Para comprobar que una afirmación es falsa es suficiente que lo sea en algún caso, llamado contraejemplo.»
- «Maxima: no tiene ninguna instrucción que determine si una aplicación es lineal.» (Nota de Maxima: no es de examen; ver E 3.9.D.)

### 1.8 Encabezado de §3.2 (U p.104, PDF 110)

«3.2. Imagen y núcleo» / «3.2.1. Elementos didácticos» / «Introducción: En general, los subespacios vectoriales aparecen como el conjunto de todas las soluciones de un sistema de ecuaciones o como el conjunto de…» (empieza §3.2; no forma parte de 3.1. El Ejemplo 3.8 está en p.106.)

---

## 2. Lay (L)

### 2.1 Lay §1.8 — Introducción a las transformaciones lineales (impresa 63–66)

**Offset real de esta sección: PDF − 43** (cabeceras: PDF 106 = «1.8 … 63»; PDF 108 = «… 65»; PDF 109 = «66 CAPÍTULO 1»). CLAUDE.md dice PDF − 18 para el cap. 1, pero eso sólo vale para §1.1 (PDF 21 = impresa 3). §1.7 está en PDF 104 = impresa 61 (offset 43) y §1.9 en PDF 126 = impresa 71 (offset 55). El desfase varía dentro del cap. 1: hay que corregir CLAUDE.md §1.

Contenido (extractos):
- **p.63 (PDF 106)**: «Una transformación (o función o mapeo) T de ℝⁿ a ℝᵐ es una regla que asigna a cada vector x en ℝⁿ un vector T(x) en ℝᵐ. El conjunto ℝⁿ se llama el dominio de T, y ℝᵐ se llama el codominio de T.» «El conjunto de todas las imágenes T(x) es el rango de T.»
- **p.64 (PDF 107)**: Ejemplo 1 (T(x)=Ax con A de 3×2; resolver T(x)=b, ver si c está en el rango). Lo de unicidad y existencia se formula como «problema de unicidad» y «problema de existencia».
- **p.65 (PDF 108)**: **DEFINICIÓN** «Una transformación (o mapeo) T es lineal si: i. T(u + v) = T(u) + T(v) para todas las u, v en el dominio de T; ii. T(cu) = cT(u) para todos los escalares c y para todas las u en el dominio de T.» Y: «Cada transformación matricial es una transformación lineal.»
- **p.66 (PDF 109)**: «Si T es una transformación lineal, entonces T(0) = 0 (3) y T(cu + dv) = cT(u) + dT(v) (4).» (5): T(c₁v₁ + ··· + cₚvₚ) = c₁T(v₁) + ··· + cₚT(vₚ) (principio de superposición). Ejemplo 4: T(x) = rx (contracción/dilatación), demostración de linealidad.

Correspondencia con U §3.1: la Definición de U (f(v+λu)=f(v)+λf(u)) equivale a la DEFINICIÓN de Lay p.65 (dos condiciones separadas); la propiedad U 1 = Lay (3); la propiedad U 3 = Lay (5). El ejemplo U 3.3 (f = k) no aparece en Lay.
Notación: Lay usa T, «dominio», «codominio» y «rango» donde U usa f, «espacio inicial/final» e «imagen» (Im f). Gana U en notación.

### 2.2 Lay §4.2 — Espacios nulos, espacios columna y transformaciones lineales (impresa 204–205)

**Offset verificado: PDF − 90** (PDF 294 = «204 CAPÍTULO 4»; PDF 295 = «4.2 … 205»).

- **p.204 (PDF 294), DEFINICIÓN** (literal): «Una transformación lineal T de un espacio vectorial V en un espacio vectorial W es una regla que asigna a cada vector x en V un único vector T(x) en W, tal que i. T(u + v) = T(u) + T(v) para toda u, v en V, y ii. T(cu) = cT(u) para toda u en V y todo escalar c.»
  «El núcleo (o espacio nulo) de dicha T es el conjunto de todas las u en V tales que T(u) = 0 (el vector cero en W). El rango de T es el conjunto de todos los vectores en W de la forma T(x) para alguna x en V.» «No es difícil demostrar que el núcleo de T es un subespacio de V [...]. Además, el rango de T es un subespacio de W.» (Figura 2, p.204.)
- **p.205 (PDF 295)**: Ejemplo 8 (derivación D: V → C[a,b], con núcleo = funciones constantes y rango = C[a,b]); Ejemplo 9 (la ecuación y″ + v²y = 0 como núcleo). Son transformaciones lineales no matriciales (útiles como ejemplo de V → W).

Relevancia para 3.1: sólo la DEFINICIÓN (V → W) y la figura. El núcleo y el rango son U §3.2; no citarlos en 3.1 salvo como anticipo.

### 2.3 Lay §4.7 — Cambio de base (impresa 239, PDF 364)

Offset PDF − 125. No pertenece a 3.1 (es U §3.5). No se ha extraído texto.

---

## 3. E — mapa de ejercicios de la sección 3.1

**Resultado:** la sección 3.1 de E ocupa los **Ejercicios 3.1 a 3.14** (impresa 80–91). El Ejercicio 3.15 (impresa 93) es el primero de §3.2/3.3. Hay ejercicios fronterizos con 3.2 (ver 3.3).

Intro de §3.1 (E p.79, PDF 83, lista «Es importante recordar»; extracto): «Que una aplicación lineal transforma el elemento neutro del conjunto inicial en el elemento neutro del conjunto final.» «Que cualquier aplicación constante no nula, no es aplicación lineal.» «Que si dos vectores son linealmente dependientes, sus imágenes mediante una aplicación lineal también lo son.» «Que si dos vectores son linealmente independientes, sus imágenes mediante una aplicación lineal pueden no serlo.» (El resto son puntos sobre MAXIMA.)

### 3.1 Tabla resumen

| Ej. | Pág. impresa inicio (PDF) | Tema | Solución (resumen) | Clasificación |
|---|---|---|---|---|
| 3.1 | 80 (84) | f(x1,x2)=x1−x2+1: imágenes, linealidad, endomorfismo | No lineal (término +1); no endomorfismo (ℝ² ≠ ℝ) | 3.1 |
| 3.2 | 81 (85) | f(x1,x2)=(2x1, 3x1+x2, x1+x2): descripción, definición, linealidad, endomorfismo | Lineal (comprobación de las dos condiciones); no endomorfismo (ℝ² ≠ ℝ³) | 3.1 |
| 3.3 | 83 (87) | f(x1..x4)=(x1,1,x3,1): endomorfismo | No lineal ⇒ no endomorfismo | 3.1 |
| 3.4 | 83 (87) | f lineal ℝ²→ℝ³: f(0)=0; qué igualdades con 5f(3,2) son ciertas | f(0)=f(0)+f(0) ⇒ f(0)=0; sólo 5f(3,2)=f(15,10) es cierta | 3.1 |
| 3.5 | 84 (88) | Comprobar 3.4 con la f del 3.2 | f(3,2)=(6,11,5); 5f(3,2)=(30,55,25)=f(15,10); f(15,2)=(30,47,17) y f(3,10)=(6,19,13) no coinciden | 3.1 |
| 3.6 | 84 (88) | V/F sobre f del 3.3 (f(0), f(5v), f(x+y)) | Todas falsas: f(0)=(0,1,0,1)≠0 y no es lineal | 3.1 |
| 3.7 | 85 (89) | f(x)=(x,1,−x) de ℝ en ℝ³: conserva suma, producto, neutro, lineal | No conserva suma ni producto; f(0)=(0,1,0)≠0; no lineal ⇒ opción E | 3.1 |
| 3.8 | 86 (90) | f(x)=(x,0,−x): comprobar linealidad | Lineal (directo) | 3.1 |
| 3.9 | 86 (90) | V/F sin operar: f(x)=(x1+2,x2); endomorfismo; f(0)=(0); Maxima | A falsa (f(0)=(2,0)); B falsa; C falsa (f(0)=0 siempre); D cierta según E | 3.1 |
| 3.10 | 87 (91) | Aplicación lineal ℝ²→ℝ³ fijada por f(1,0), f(0,1): comprobar A, B, C | A y C ciertas; B falsa (f(1,1)=(1,5,1)); D falsa | 3.1 (C frontera 3.2: imagen en un plano) |
| 3.11 | 88 (92) | Endomorfismo de ℝ² con f(1,1)=(1,4), f(2,−1)=(−2,3): imagen de (3,−1); f(0)=0 | (3,−1)=(1/3)(1,1)+(4/3)(2,−1) ⇒ f(3,−1)=(−7/3, 16/3) | 3.1 (uso de coordenadas en base; 2.3) |
| 3.12 | 89 (93) | f de ℝ² en ℝ³ conocida en una base: A) imagen de cualquier vector; B) todo ℝ³ tiene original; C) Im(f)=ℝ³ | A correcta; B y C falsas (contraejemplo: f nula); D falsa | 3.1 (frontera 3.2: Im(f) y núcleo en el contraejemplo) |
| 3.13 | 90 (94) | Endomorfismo de V: f(0)≠0, f(−x)≠−f(x), f(x)=f(y)⇒f(x−y)=0, f(S) subespacio | A, B, C falsas (negación de negación); D cierta | 3.1 (frontera 3.2: imagen de subespacio) |
| 3.14 | 91 (95) | f(x1,x2,x3)=(x1,x2): ¿la independencia se conserva o se refleja? | A falsa (contraejemplo x=(0,1,0), y=(0,1,1)); B falsa (mismo ejemplo); C cierta; D falsa | 3.1 (frontera leve: núcleo implícito) |

### 3.2 Enunciados completos (E, literal) y solución resumida

**Ejercicio 3.1** (E p.80, PDF 84). «Si f : ℝ² → ℝ es la aplicación definida por f(x1, x2) = x1 − x2 + 1, se pide: A) Calcular las imágenes de algunos vectores de ℝ². B) Comprobar si la aplicación dada, f, es lineal. C) Justificar si f es un endomorfismo.»
*Solución:* A) (5,2)→4; (0,0)→1; (−3,−2)→0; (4,−2)→7; (−2,1)→−2; (−7,−3)→−3. B) No lineal: f(x+λy) = x1+λy1−x2−λy2+1, pero f(x)+λf(y) = x1+λy1−x2−λy2+1+λ. C) No endomorfismo: no es lineal y el conjunto inicial (ℝ²) no coincide con el final (ℝ).

**Ejercicio 3.2** (E p.81, PDF 85). «Si f : ℝ² → ℝ³ es la aplicación definida por f(x1, x2) = (2x1, 3x1 + x2, x1 + x2), se pide: A) Describir en qué consiste la aplicación dada. B) Escribir con lenguaje simbólico la definición de aplicación lineal entre los espacios vectoriales V y W. C) Comprobar si la aplicación dada, f, es lineal. D) Justificar si f es un endomorfismo.»
*Solución:* A) Cada par (x1,x2) va a la terna (2x1, 3x1+x2, x1+x2). B) f(x+λy)=f(x)+λf(y). C) Lineal: se comprueba f(x+λy)=f(x)+λf(y) y, por separado, f(x+y)=f(x)+f(y) y f(λx)=λf(x). D) No endomorfismo: es lineal, pero ℝ² ≠ ℝ³.

**Ejercicio 3.3** (E p.83, PDF 87). «Compruébese que no es endomorfismo la aplicación f(x1, x2, x3, x4) = (x1, 1, x3, 1).»
*Solución:* f(x)+λf(y) = (x1+λy1, 1+λ, x3+λy3, 1+λ), que no coincide con f(x+λy) = (x1+λy1, 1, x3+λy3, 1). No lineal ⇒ no endomorfismo.

**Ejercicio 3.4** (E p.83, PDF 87). «Siendo f cualquier aplicación lineal de ℝ² en ℝ³, se pide: A) Demostrar que f(0, 0) = (0, 0, 0). B) Comprobar si es cierta alguna de las igualdades: 5f(3, 2) = f(15, 2); 5f(3, 2) = f(3, 10); 5f(3, 2) = f(15, 10).»
*Solución:* A) f(0) = f(0+0) = f(0)+f(0) ⇒ f(0) = 0 (diferencia de dos iguales). B) Por linealidad 5f(3,2) = f(5(3,2)) = f(15,10); sólo esta igualdad es cierta siempre.

**Ejercicio 3.5** (E p.84, PDF 88). «Si f es la aplicación lineal definida en el Ejercicio 3.2, se pide: Comprobar que se verifican las respuestas dadas en el Ejercicio 3.4.»
*Solución:* f(0,0)=(0,0,0). f(3,2)=(6,11,5) ⇒ 5f(3,2)=(30,55,25); f(15,10)=(30,55,25) (igual); f(15,2)=(30,47,17) y f(3,10)=(6,19,13) (no iguales).

**Ejercicio 3.6** (E p.84, PDF 88). «Si f es la aplicación del Ejercicio 3.3, se pide responder verdadero o falso a las siguientes cuestiones: A) Se tiene que verificar f(0, 0, 0, 0) = (0, 0, 0, 0). B) Se tiene que verificar f(5(2, 3, 1, 0)) = 5f(2, 3, 1, 0). C) Se tiene que verificar f(2, 3, 1, 0) = f(1, 2, 1, 0) + f(1, 1, 0, 0).»
*Solución:* Todas falsas (f no es lineal). A) f(0)=(0,1,0,1). B) f(10,15,5,0)=(10,1,5,1) ≠ 5(2,1,1,1)=(10,5,5,5). C) (2,1,1,1) ≠ (1,1,1,1)+(1,1,0,1)=(2,2,1,2).

**Ejercicio 3.7** (E p.85, PDF 89). «Si f : ℝ → ℝ³ es la aplicación f(x) = (x, 1, −x), se pide comprobar si f verifica: A) Conserva la suma de vectores. B) Conserva el producto de escalar por vector. C) Transforma el neutro de (ℝ, +) en el neutro de (ℝ³, +). D) Es una aplicación lineal. E) Ninguna de las anteriores.»
*Solución:* A) No: f(x+y) = (x+y, 1, −x−y) ≠ f(x)+f(y) = (x+y, 2, −x−y). B) No: f(λx) = (λx, 1, −λx) ≠ λf(x) = (λx, λ, −λx) salvo λ=1. C) No: f(0) = (0,1,0) ≠ (0,0,0). D) No (basta que falle una condición). E) Correcta.

**Ejercicio 3.8** (E p.86, PDF 90). «Compruébese que la aplicación f : ℝ → ℝ³, tal que f(x) = (x, 0, −x), es lineal.»
*Solución:* f(x+λy) = (x+λy, 0, −(x+λy)) = f(x)+λf(y). Se verifica.

**Ejercicio 3.9** (E p.86, PDF 90). «Sin hacer operaciones, se pide responder verdadero o falso a las siguientes afirmaciones: A) La aplicación f : ℝ² → ℝ², tal que f(x1, x2) = (x1 + 2, x2), es lineal. B) f es un endomorfismo de ℝ². C) En algún endomorfismo de ℝ² puede ocurrir f(0) = (0). D) Con MAXIMA se puede saber si una aplicación dada es lineal.»
*Solución:* A) Falsa: f(0,0) = (2,0) ≠ (0,0). B) Falsa: no es lineal. C) Falsa: en toda aplicación lineal f(0)=0. D) Cierta según E: no hay instrucción específica, pero se pueden encadenar varias (ver §5, discrepancia con U p.104).

**Ejercicio 3.10** (E p.87, PDF 91). «Si f : ℝ² → ℝ³ es una aplicación lineal que verifica f(1, 0) = (1, 2, 0) y f(0, 1) = (0, 3, 1), se pide comprobar si es cierto que: A) f(5, 7) = (5, 31, 7). B) f(1, 1) = (1, 0, 1). C) Las imágenes de todos los vectores de ℝ² están en el plano de ecuación 2x1 − x2 + 3x3 = 0. D) Ninguna de las anteriores.»
*Solución:* A) Cierta: 5f(1,0)+7f(0,1)=(5,10+21,7)=(5,31,7). B) Falsa: f(1,1)=(1,5,1). C) Cierta: f(a,b)=(a, 2a+3b, b) cumple 2a−(2a+3b)+3b=0. D) Falsa.

**Ejercicio 3.11** (E p.88, PDF 92). «Si f es un endomorfismo de ℝ², tal que f(1, 1) = (1, 4) y f(2, −1) = (−2, 3), se pide: A) Calcular la imagen de (3, −1). B) Comprobar que f(0, 0) = (0, 0).»
*Solución:* A) (3,−1) = (1/3)(1,1) + (4/3)(2,−1) (sistema α+2β=3, α−β=−1); f(3,−1) = (1/3)(1,4)+(4/3)(−2,3) = (−7/3, 16/3). B) f(0)=0 por linealidad.

**Ejercicio 3.12** (E p.89, PDF 93). «Si f : ℝ² → ℝ³ es una aplicación lineal en la que se conocen las imágenes de los elementos de una base de ℝ², se pide analizar si es correcta alguna de las afirmaciones siguientes: A) Es posible obtener la imagen de cualquier vector de ℝ². B) Cualquier vector de ℝ³ tiene un original en ℝ². C) Im(f) es ℝ³. D) Ninguna de las anteriores.»
*Solución:* A) Correcta: cualquier (x1,x2) es combinación lineal de la base canónica (o de cualquier base) y f es lineal. B) Falsa: contraejemplo f nula, sólo (0,0,0) tiene original. C) Falsa: mismo contraejemplo. D) Falsa.

**Ejercicio 3.13** (E p.90, PDF 94). «Si f es un endomorfismo de V, se pide justificar si son ciertas o falsas las afirmaciones siguientes: A) Es falso que f(0) = 0, con 0 ∈ V. B) Es falso que f(−x) = −f(x), con x ∈ V. C) Es falso que f(x) = f(y) ⇒ f(x − y) = 0, con x, y, 0 ∈ V. D) Si S es subespacio de V, entonces f(S) es subespacio de V.»
*Solución:* A, B, C: la negación de cada afirmación es falsa, luego las expresiones son ciertas (f(0)=0, f(−x)=−f(x), f(x−y)=f(x)−f(y)=0). D) Cierta: f(x+λy)=f(x)+λf(y) ∈ f(S).

**Ejercicio 3.14** (E p.91, PDF 95). «Si f es la aplicación lineal f(x1, x2, x3) = (x1, x2), se pide decir si son ciertas o falsas las implicaciones siguientes: A) {x, y} libre ⇒ {f(x), f(y)} libre. B) {f(x), f(y)} ligado ⇒ {x, y} ligado. C) {f(x), f(y)} libre ⇒ {x, y} libre. D) Ninguna de las anteriores.»
*Solución:* A) Falsa: x=(0,1,0), y=(0,1,1) son libres pero f(x)=f(y)=(0,1). B) Falsa: mismo contraejemplo. C) Cierta: si λf(x)+µf(y)=0 entonces λ=µ=0 y por tanto x, y son libres. D) Falsa.

### 3.3 Frontera con 3.2 (anticipos)

- **3.10 C**: habla de la imagen de todo ℝ² (un plano de ℝ³). Anticipa la imagen.
- **3.12**: C pregunta por Im(f) y el contraejemplo es la aplicación nula: anticipa 3.2 (núcleo).
- **3.13 D**: imagen de un subespacio, f(S) (U §3.2.2 «Imagen»).
- **3.14**: f tiene núcleo no trivial {(0,0,t)}; el contraejemplo se entiende mejor con el núcleo, pero el ejercicio trata de dependencia lineal (3.1).

Los ejercicios de 3.2/3.3 empiezan en el 3.15 (impresa 93); E indica en p.92 que ambas secciones se abordan juntas.

---

## 4. Erratas y símbolos perdidos

**U (ingenieros.txt):**
- Ligaduras tipográficas «ﬁ» en lugar de «fi» (p.ej. «Deﬁnición», «ﬁjo»); acentos separados del carácter base («dida´ctico», «Introduccio´n»).
- Ejemplo 3.2, p.102: los miembros de la igualdad salen entremezclados (p.ej. «b21a11 0»). Reconstruido desde la fórmula del Ej. 3.1 (ver §1.3).
- Ejemplo 3.5, p.104: en la demostración, λ, µ y el símbolo ≠ pierden glifo en la extracción («con  = 0 o � = 0» en raw). Lo más probable es «con λ ≠ 0 o µ ≠ 0», pero no lo he podido verificar en imagen (no hay pdftoppm en el entorno).

**E (ejercicios.txt):**
- El símbolo **≠** falta en varios sitios, y en algunos el contexto lógico lo exige:
  - Ej. 3.5 B (p.84): «⇒ 5f(3, 2)=f(15, 2)» y «⇒ 5f(3, 2)=f(3, 10)» deben ser ≠ (el texto dice «No es cierto»).
  - Ej. 3.7 A, B, C (p.85): «f(x + y) = f(x) + f(y) = (x + y, 2, −x − y)» (el primer = debe ser ≠) y «Si λ = 1 ⇒ λf(x)=f(λx) (la segunda coordenada es distinta)». Como está escrito, **«Si λ = 1» contradice la frase siguiente**: con λ=1 las imágenes coinciden; lo correcto es «Si λ ≠ 1 ⇒ λf(x) ≠ f(λx)». Erratum probable: ≠ perdido.
  - Ej. 3.7 C (p.85): «f(0) = (0,1,0) = (0,0,0)» debe ser ≠.
  - Ej. 3.9 A (p.86): «f(0,0) = (2,0)=(0,0)» debe ser ≠.
  - Ej. 3.3 (p.83) solución: «f(x) + λf(y) = f(x + λy)» aparece como igualdad en la frase que describe lo que no se verifica (la lectura es correcta, pero conviene revisar el símbolo en la imagen).
- Ej. 3.4 A (p.83): «f(0,0)=f(0,0)+f(0,0)» con colores didácticos en el original; el texto indica que el color es sólo didáctico.
- Fraccionarios del Ej. 3.11 A fragmentados en la extracción; el resultado (−7/3, 16/3) se ha verificado a mano.
- Marcas «M A X I M A» en el margen: ignoradas.

---

## 5. Faltas o dudas

1. **Símbolo ≠ (y λ/µ en Ej. 3.5 U)**: confirmado que no está en la capa de texto de los PDF (pdftotext en modo raw lo pierde), pero no he podido verlo en imagen. Revisar a ojo en el PDF antes de citar ese texto literalmente.
2. **Discrepancia Maxima**: U p.104 (nota al margen) dice que Maxima «no tiene ninguna instrucción que determine si una aplicación es lineal», y E 3.9 D (p.86) responde «es cierto» (encadenando varias instrucciones). No es contradicción total (E dice «no hay una instrucción específica»), pero conviene recogerlo en el HTML.
3. **Offset de Lay**: CLAUDE.md §1 dice PDF − 18 para el cap. 1, pero §1.8 es PDF − 43 y §1.9 es PDF − 55. Corregir la nota de CLAUDE.md.
4. **Lay §1.8 no leído completo**: sólo p.63–66 (suficiente para la definición y el ejemplo T(x)=rx); la discusión del trasquilado (p.67–68) no se ha extraído.
5. **Reparto 3.1 / 3.2 de los fronterizos**: 3.10.C, 3.12, 3.13.D y 3.14 se consideran de 3.1 por criterio propio. El rango 3.1–3.14 sí está verificado por encabezado y contenido.
6. **Mapa E de 3.2/3.3 en p.92**: CLAUDE.md da 3.2 y 3.3 ambos en p.92; es lo que dice el índice de E y el cuerpo, no es una errata. Los ejercicios de 3.2 y 3.3 empiezan en el 3.15 y se resuelven juntos.
7. **U 3.1 sin «Teorema» formal**: las propiedades 1–5 y los Ejemplos 3.4–3.7 no tienen numeración de Teorema; se citan como «Propiedades» (p.103) y «Ejemplo 3.x».
