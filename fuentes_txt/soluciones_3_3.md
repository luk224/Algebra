# Soluciones — Sección 3.3 Ecuaciones y matriz asociada (Ejercicios 3.15, 3.17, 3.18, 3.19 de E)

**Fuentes.** E = *Ejercicios de Álgebra para Ingenieros* (página impresa = PDF − 4); U = *Álgebra para Ingenieros* (página impresa = PDF − 6). Todos los cálculos se han comprobado con `sympy` (`Matrix`, producto matriz·vector, `.inv()`, `.rank()`, `.det()`, `.nullspace()`).

**Herramientas de teoría que se usan:**

| Resultado | Dónde |
|---|---|
| **Definición 3.1** aplicación lineal: $f(v+\lambda u)=f(v)+\lambda f(u)$; propiedad 3: $f(\sum a_iv_i)=\sum a_if(v_i)$ | U §3.1 p.101, p.103 |
| **Teorema 3.2** (determinación de una aplicación lineal): la imagen de cualquier $v$ está determinada por $f(e_1),\dots,f(e_m)$, imágenes de una base $B$ de $V$; si $v=(v_1,\dots,v_m)_B$, $f(v)=v_1f(e_1)+\dots+v_mf(e_m)$ | U §3.3.2 p.114 |
| Ejemplo 3.16 (ecuaciones de $f$ a partir de las imágenes de la base canónica) y Ejemplo 3.17 (no existe $f$ lineal con $f(2,3)=(0,1)$, $f(-2,-3)=(1,0)$) | U pp.114–115 |
| **Teorema 3.3**: fijadas una base $B$ de $V$ y una base $S$ de $W$, $f$ determina una **única** matriz asociada | U p.115 |
| **Definición 3.4** matriz asociada $A$ respecto de $B=\{e_1,\dots,e_m\}\subset V$ y $S=\{u_1,\dots,u_n\}\subset W$: $f(e_j)=a_{1j}u_1+\dots+a_{nj}u_n$, es decir, **la columna $j$ son las coordenadas en $S$ de $f(e_j)$**; $A$ tiene $n=\mathrm{Dim}\,W$ filas y $m=\mathrm{Dim}\,V$ columnas | U §3.3.3 p.116 |
| Ejemplo 3.18 (matriz $3\times2$ del Ej. 3.16) | U p.116 |
| **Expresión matricial** $Y=AX$ ($X$ = coordenadas de $x$ en $B$, $Y$ = coordenadas de $f(x)$ en $S$) y Ejemplo 3.19 | U p.117 |
| (Tema 2) Base (Def. 2.9) y coordenadas (Def. 2.10); bases canónicas de $\mathbb R^n$, $\wp_n$, $\mathcal M_{2\times2}$ | U pp.82, 85 |
| (Tema 2) $\wp_n$ = polinomios de grado $\le n$ (Ej. 2.6); E lo escribe $P_n$ o $P_n(x)$ | U p.62 |
| (Frontera §3.5, solo como comprobación) cambio de base $A'=P^{-1}AQ$ (Def. 3.15) | U p.136 |

**Notación.** U no usa un símbolo especial para la matriz asociada: dice «$A$ es la matriz asociada a $f$ respecto de las bases $B$ y $S$» (Def. 3.4). En estas soluciones se abrevia, cuando ayuda a distinguir varias matrices de la misma $f$, como **$M(f;B,S)$** (primero la base del espacio **inicial**, luego la del **final**); es abreviatura propia, no de U. Las coordenadas se escriben **en columna** (como $X$, $Y$ en $Y=AX$, U p.117). «Bases canónicas» sin más significa: $\{e_1,\dots,e_n\}$ en $\mathbb R^n$; $\{1,x,\dots,x^n\}$ en $P_n$; $\{E_{11},E_{12},E_{21},E_{22}\}$ (en este orden) en $\mathcal M_{2\times2}$.

**Delimitación de la sección.** E trata 3.2 y 3.3 conjuntamente (E p.92). Por contenido, los ejercicios **propios de §3.3** son **3.15, 3.17, 3.18, 3.19** (E pp.93–96: solo piden matriz asociada o ecuaciones). Los ejercicios **3.20, 3.21, 3.25 y 3.28** tienen un apartado de matriz asociada, pero están desarrollados completos en `temas/tema_3_2_nucleo_imagen.html` (ver el apartado «Enlaces al tema 3.2» al final; no se repiten). 3.16 y 3.22–3.24, 3.26, 3.27, 3.29 son de §3.2 (3.29 roza §3.4); 3.30–3.31 son de §3.4.

**Orden de estudio** (fácil → difícil): 3.15 ($\mathbb R^3\to\mathbb R^2$) → 3.17 (a matrices $2\times2$) → 3.18 (derivada en $P_3$) → 3.19 (endomorfismo de $P_2$, ecuaciones e imagen de un vector). Coincide con la numeración de E.

**Erratas, errores u omisiones detectados en E:**
- **E 3.15**: da solo la opción correcta (C) sin explicar por qué A y B son falsas. Hay un argumento inmediato: A y B describen matrices de **3 filas de 2 elementos** ($3\times2$), y la matriz de $f:\mathbb R^3\to\mathbb R^2$ tiene que ser $2\times3$ (Def. 3.4).
- **E 3.17**: escribe «como es evidente» el tamaño $4\times3$; se justifica por la Def. 3.4 (filas = $\mathrm{Dim}\,W$, columnas = $\mathrm{Dim}\,V$). No hay error en la matriz.
- **E 3.18**: no justifica que la derivada sea lineal ni que sea endomorfismo (la derivada de un polinomio de grado $\le3$ tiene grado $\le2\le3$), y dice «Las opciones A), B) y C) no son correctas» sin indicar qué aplicación representan (A es la matriz de otra aplicación, B la de la identidad). El texto extraído de `ejercicios.txt` desordena las matrices; se ha comprobado sobre el PDF (p. PDF 99).
- **E 3.19**: el enunciado dice «$P_2$ (polinomios reales de grado 2)»; debe ser **grado $\le2$** (el propio margen de E lo aclara: «polinomios de grado $<3$ o de grado $\le2$»): los polinomios de grado exactamente 2 no forman espacio vectorial (la suma $x^2+(-x^2)=0$ no tiene grado 2). Además, «$f(x)=2$» significa que **la imagen del polinomio $x$ es el polinomio constante $2$**, no «$f$ evaluada en $x$».

---

## Ejercicio 3.15 (E p.93)

> **Enunciado.** Si $f:\mathbb R^3\to\mathbb R^2$ es una aplicación lineal, tal que $f(1,0,0)=(1,1)$, $f(0,1,0)=(1,1)$ y $f(0,0,1)=(1,0)$, entonces, las filas de la matriz asociada a $f$ en las bases canónicas son: A) $(1,1),(1,0),(0,1)$. B) $(1,1),(0,1),(1,1)$. C) $(1,1,1),(1,1,0)$.

**Qué se pide.** Construir la matriz asociada a $f$ cuando las bases son las canónicas y, ojo, fijarse en sus **filas** (no en sus columnas), que es lo que comparan las opciones.

**Solución.**

1. **Tamaño de la matriz.** Por la Def. 3.4 (U p.116), la matriz asociada a $f:V\to W$ tiene tantas **columnas** como $\mathrm{Dim}\,V$ (una por cada vector de la base de partida) y tantas **filas** como $\mathrm{Dim}\,W$ (una por cada coordenada de las imágenes). Aquí $\mathrm{Dim}\,\mathbb R^3=3$ y $\mathrm{Dim}\,\mathbb R^2=2$: $A$ es **$2\times3$** (2 filas de 3 elementos).
   - Esto ya descarta A) y B): ambas dan **3 filas de 2 elementos**, es decir, una matriz $3\times2$, que sería la matriz de una aplicación $\mathbb R^2\to\mathbb R^3$.
2. **Columnas.** La columna $j$ son las coordenadas, en la base de llegada, de la imagen del $j$-ésimo vector de la base de partida (Def. 3.4). En la base canónica de $\mathbb R^2$ las coordenadas de $(a,b)$ son $(a,b)$ (Def. 2.10, U p.85), así que las columnas son directamente $f(1,0,0)$, $f(0,1,0)$, $f(0,0,1)$:
$$A=\Big(\,f(e_1)\;\Big|\;f(e_2)\;\Big|\;f(e_3)\,\Big)=\begin{pmatrix}1&1&1\\1&1&0\end{pmatrix}.$$
3. **Filas.** Leyendo $A$ por filas: $(1,1,1)$ y $(1,1,0)$. **Solo es correcta la C).**
4. **Ecuaciones** (expresión matricial $Y=AX$, U p.117):
$$\begin{pmatrix}y_1\\y_2\end{pmatrix}=\begin{pmatrix}1&1&1\\1&1&0\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}\iff\begin{cases}y_1=x_1+x_2+x_3\\y_2=x_1+x_2\end{cases}$$
   Comprobación por el Teorema 3.2 (U p.114): $f(x_1,x_2,x_3)=x_1(1,1)+x_2(1,1)+x_3(1,0)=(x_1+x_2+x_3,\ x_1+x_2)$ ✓. Ejemplo: $f(2,-1,3)=(4,1)$.

**Verificación (sympy).** `Matrix([[1,1,1],[1,1,0]])`; `A*Matrix([2,-1,3]) = (4,1)`.

**Receta.** Matriz en bases canónicas = **imágenes de la base canónica puestas en columna**. Antes de nada, comprueba el tamaño: $\mathrm{Dim}(\text{llegada})\times\mathrm{Dim}(\text{salida})$.

**Error típico.** Poner las imágenes **en filas** (se obtiene la traspuesta, $3\times2$, que no puede multiplicar a un vector de $\mathbb R^3$). Otro: confundir «filas» con «columnas» al leer las opciones.

**Teoría:** Teorema 3.2, U §3.3.2 p.114; Def. 3.4 y Ej. 3.18, U §3.3.3 p.116; $Y=AX$, U p.117.

---

## Ejercicio 3.17 (E p.94)

> **Enunciado.** Si $f:\mathbb R^3\to\mathcal M_{2\times2}$ es una aplicación lineal, tal que $f(1,0,0)$, $f(0,1,0)$, $f(0,0,1)$ son, respectivamente, las matrices de filas $\{(3,1),(2,4)\}$, $\{(1,-1),(-5,5)\}$ y $\{(2,-2),(-1,4)\}$, se pide calcular la matriz asociada a $f$.

**Qué se pide.** La matriz asociada cuando el espacio de llegada **no** es $\mathbb R^n$ sino $\mathcal M_{2\times2}$. Las imágenes son matrices; la matriz asociada no admite «matrices dentro de matrices»: hay que pasar cada imagen a **coordenadas**.

**Solución.**

1. **Elegir base en cada espacio.** El enunciado no dice qué bases usar, así que se toman las canónicas: en $\mathbb R^3$, $\{e_1,e_2,e_3\}$; en $\mathcal M_{2\times2}$,
$$S=\left\{E_{11}=\begin{pmatrix}1&0\\0&0\end{pmatrix},\ E_{12}=\begin{pmatrix}0&1\\0&0\end{pmatrix},\ E_{21}=\begin{pmatrix}0&0\\1&0\end{pmatrix},\ E_{22}=\begin{pmatrix}0&0\\0&1\end{pmatrix}\right\}.$$
   Como $\begin{pmatrix}a&b\\c&d\end{pmatrix}=aE_{11}+bE_{12}+cE_{21}+dE_{22}$, sus coordenadas en $S$ son $(a,b,c,d)$: **las entradas leídas por filas** (Def. 2.10, U p.85).
2. **Tamaño.** $\mathrm{Dim}\,\mathbb R^3=3$ columnas, $\mathrm{Dim}\,\mathcal M_{2\times2}=4$ filas: $A$ es **$4\times3$** (Def. 3.4, U p.116). (E dice «como es evidente»: la razón es esta definición.)
3. **Coordenadas de cada imagen.**
$$f(e_1)=\begin{pmatrix}3&1\\2&4\end{pmatrix}=3E_{11}+1E_{12}+2E_{21}+4E_{22}\ \to\ (3,1,2,4),$$
$$f(e_2)=\begin{pmatrix}1&-1\\-5&5\end{pmatrix}\ \to\ (1,-1,-5,5),\qquad f(e_3)=\begin{pmatrix}2&-2\\-1&4\end{pmatrix}\ \to\ (2,-2,-1,4).$$
4. **Matriz asociada** (esas coordenadas **en columna**):
$$A=\begin{pmatrix}3&1&2\\1&-1&-2\\2&-5&-1\\4&5&4\end{pmatrix}.$$
5. **Ecuaciones y comprobación.** Por $Y=AX$ (U p.117), $f(x_1,x_2,x_3)$ es la matriz de coordenadas
$$\begin{cases}y_1=3x_1+x_2+2x_3\\y_2=x_1-x_2-2x_3\\y_3=2x_1-5x_2-x_3\\y_4=4x_1+5x_2+4x_3\end{cases}\qquad f(x_1,x_2,x_3)=\begin{pmatrix}y_1&y_2\\y_3&y_4\end{pmatrix}.$$
   Comprobación con un vector: $f(1,1,1)=f(e_1)+f(e_2)+f(e_3)=\begin{pmatrix}6&-2\\-4&13\end{pmatrix}$ (linealidad, propiedad 3, U p.103), y $A(1,1,1)^T=(6,-2,-4,13)^T$ ✓.

**Verificación (sympy).** `A*Matrix([1,1,1]) = (6,-2,-4,13)`; `A*Matrix([2,0,-1]) = (4,4,5,4)` (= $2f(e_1)-f(e_3)$ ✓).

**Receta.** Si el espacio de llegada son matrices (o polinomios), **traduce cada imagen a coordenadas** en la base elegida y pon esas coordenadas en columna. El número de filas es la dimensión del espacio de llegada (4 para $\mathcal M_{2\times2}$), no el tamaño de las matrices imagen.

**Error típico.** Leer las entradas de la matriz imagen **por columnas** $(a,c,b,d)$ en una fila y **por filas** $(a,b,c,d)$ en otra: el orden de las coordenadas lo fija el orden de la base y debe ser el mismo para todas las columnas. Otro: escribir una matriz $2\times6$ «pegando» las tres matrices imagen.

**Teoría:** Def. 2.10, U p.85; Def. 3.4, U §3.3.3 p.116; $Y=AX$, U p.117.

---

## Ejercicio 3.18 (E p.95)

> **Enunciado.** El endomorfismo de $P_3$ que asigna a cada polinomio de grado $\le3$ su derivada, tiene por matriz asociada en la base canónica:
> $$\text{A) }\begin{pmatrix}1&0&0&0\\1&1&0&0\\1&1&1&0\\1&1&1&1\end{pmatrix}.\quad\text{B) }\begin{pmatrix}1&0&0&0\\0&1&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix}.\quad\text{C) }\begin{pmatrix}0&0&0&0\\3&0&0&0\\0&1&0&0\\0&0&2&0\end{pmatrix}.$$
> D) Ninguna de las anteriores.

**Qué se pide.** La matriz de la aplicación derivada $f(p)=p'$ en $P_3$ respecto de la base canónica $\{1,x,x^2,x^3\}$ (la misma en el espacio inicial y en el final, por ser endomorfismo).

**Solución.**

1. **$f$ es lineal y es endomorfismo** (E lo da por supuesto). Por las reglas de derivación, $(p+\lambda q)'=p'+\lambda q'$, que es la Def. 3.1 (U p.101). Y si $p$ tiene grado $\le3$, $p'$ tiene grado $\le2\le3$, así que $p'\in P_3$: $f:P_3\to P_3$ (endomorfismo).
2. **Base y coordenadas.** Base canónica $B=\{1,x,x^2,x^3\}$; el polinomio $a+bx+cx^2+dx^3$ tiene coordenadas $(a,b,c,d)$ (**el orden de las coordenadas es el orden de la base**). $\mathrm{Dim}\,P_3=4$, luego la matriz es $4\times4$.
3. **Imágenes de la base y sus coordenadas:**

| vector de $B$ | imagen $f$ | coordenadas de la imagen |
|---|---|---|
| $1$ | $0$ | $(0,0,0,0)$ |
| $x$ | $1$ | $(1,0,0,0)$ |
| $x^2$ | $2x$ | $(0,2,0,0)$ |
| $x^3$ | $3x^2$ | $(0,0,3,0)$ |

4. **Matriz** (coordenadas en columna, Def. 3.4, U p.116):
$$D=\begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\\0&0&0&0\end{pmatrix}.$$
5. **Comparación con las opciones.** $D$ no coincide con ninguna:
   - A) tiene la primera columna $(1,1,1,1)$: diría que $f(1)=1+x+x^2+x^3$, pero $f(1)=0$. Falsa.
   - B) es la identidad: es la matriz de la aplicación $p\mapsto p$, no de la derivada (p. ej. $f(x)=1\neq x$). Falsa.
   - C) tiene la segunda columna nula: diría $f(x)=0$, pero $f(x)=1$. Falsa. (Tampoco es la traspuesta de $D$, que tendría filas $(0,0,0,0),(1,0,0,0),(0,2,0,0),(0,0,3,0)$.)
   
   **Respuesta: D).**
6. **Uso de la matriz** (ejemplo de E, comprobado). $P(x)=2x^3+5x^2-1$ tiene coordenadas $(-1,0,5,2)$ (ojo con el orden: término independiente primero). Por $Y=AX$ (U p.117):
$$\begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\\0&0&0&0\end{pmatrix}\begin{pmatrix}-1\\0\\5\\2\end{pmatrix}=\begin{pmatrix}0\\10\\6\\0\end{pmatrix}\ \to\ 10x+6x^2=P'(x)\ ✓$$
   En general $D(a,b,c,d)^T=(b,2c,3d,0)^T$, coordenadas de $b+2cx+3dx^2$.

**Verificación (sympy).** `D*Matrix([-1,0,5,2]) = (0,10,6,0)`; `D*Matrix([a,b,c,d]) = (b,2c,3d,0)`.

**Receta.** En espacios de polinomios: aplica $f$ a cada elemento de la base canónica **en orden** ($1,x,x^2,\dots$), escribe las coordenadas de cada resultado y colócalas en columna. Para descartar opciones basta mirar **una columna**: la columna $j$ debe ser $f(\text{$j$-ésimo vector de la base})$.

**Error típico.** Ordenar la base al revés ($x^3,x^2,x,1$) sin decirlo, o escribir las coordenadas de $2x^3+5x^2-1$ como $(2,5,0,-1)$: cambia la matriz. Otro: poner $f(1)=1$ (la derivada de una constante es $0$).

**Teoría:** Def. 3.1, U p.101; Def. 3.4, U p.116; $Y=AX$, U p.117. (Este endomorfismo reaparece en E 3.25–3.27 y 3.29, tema 3.2.)

---

## Ejercicio 3.19 (E p.96)

> **Enunciado.** Si $f(1)=3+2x+x^2$, $f(x)=2$ y $f(x^2)=2x^2$ en el endomorfismo $f$ de $P_2$ (polinomios reales de grado 2), es cierto que: A) No hay datos suficientes para escribir la matriz de $f$. B) No se pueden escribir las ecuaciones de $f$. C) No hay datos suficientes para encontrar la imagen de $x+3$. D) Las coordenadas de $f(x+3)$ respecto a la base canónica son $(11,6,3)$.

**Qué se pide.** Decidir si las imágenes de $1$, $x$, $x^2$ bastan para conocer $f$ (matriz, ecuaciones, imagen de cualquier polinomio) y calcular $f(x+3)$.

**Lectura del enunciado.** $P_2$ son los polinomios de grado **$\le2$** (ver erratas). «$f(x)=2$» quiere decir: la imagen del polinomio $x$ es el polinomio constante $2$.

**Solución.**

1. **¿Hay datos suficientes? (A falsa).** $\{1,x,x^2\}$ es una base de $P_2$ (la canónica). Por el Teorema 3.2 (U p.114), conocer las imágenes de **todos** los vectores de una base determina la imagen de cualquier vector; y por el Teorema 3.3 (U p.115) y la Def. 3.4 (U p.116), fijada la base, la matriz queda determinada (y es única). Luego **A) es falsa**.
2. **Matriz.** Coordenadas en $\{1,x,x^2\}$ de las imágenes:
   - $f(1)=3+2x+x^2\to(3,2,1)$;
   - $f(x)=2=2+0x+0x^2\to(2,0,0)$;
   - $f(x^2)=2x^2\to(0,0,2)$.

   En columna:
$$A=\begin{pmatrix}3&2&0\\2&0&0\\1&0&2\end{pmatrix}.$$
3. **Ecuaciones (B falsa).** Por $Y=AX$ (U p.117), si $p=x_1+x_2x+x_3x^2$ y $f(p)=y_1+y_2x+y_3x^2$:
$$\begin{pmatrix}y_1\\y_2\\y_3\end{pmatrix}=\begin{pmatrix}3&2&0\\2&0&0\\1&0&2\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}\iff\begin{cases}y_1=3x_1+2x_2\\y_2=2x_1\\y_3=x_1+2x_3\end{cases}$$
   Se pueden escribir: **B) es falsa**.
4. **Imagen de $x+3$ (C falsa, D cierta).** $x+3=3\cdot1+1\cdot x+0\cdot x^2$, coordenadas $(3,1,0)$.
   - *Con la matriz:* $A\begin{pmatrix}3\\1\\0\end{pmatrix}=\begin{pmatrix}9+2+0\\6+0+0\\3+0+0\end{pmatrix}=\begin{pmatrix}11\\6\\3\end{pmatrix}$.
   - *Sin la matriz (Teorema 3.2 / linealidad):* $f(3+x)=3f(1)+f(x)=3(3+2x+x^2)+2=11+6x+3x^2\to(11,6,3)$.

   Se puede calcular, luego **C) es falsa**, y las coordenadas son $(11,6,3)$: **D) es la única cierta.**

**Verificación (sympy).** `A*Matrix([3,1,0]) = (11,6,3)`; además `A.det() = -8` (no pedido: $f$ es biyectiva).

**Receta.** Si conoces las imágenes de **todos** los vectores de una base, conoces $f$ entera: matriz = coordenadas de esas imágenes en columna; ecuaciones = $Y=AX$; imagen de un vector = matriz × coordenadas (o combinación lineal de las imágenes con esas coordenadas).

**Error típico.** Leer $f(x)=2$ como «$f$ vale 2 en el punto $x$» y no saber qué columna poner; la columna es $(2,0,0)$. Otro: escribir las coordenadas de $x+3$ como $(1,3,0)$ (el término independiente va primero en la base $\{1,x,x^2\}$).

**Teoría:** Teoremas 3.2–3.3, U pp.114–115; Def. 3.4, U p.116; $Y=AX$, U p.117.

---

## Enlaces al tema 3.2 (ejercicios mixtos ya desarrollados allí; no se repiten)

Estos ejercicios tienen un apartado de §3.3 (construir la matriz o decidir si se puede), pero su objetivo principal es núcleo/imagen y están resueltos completos en `temas/tema_3_2_nucleo_imagen.html`. Desde 3.3 basta un enlace indicando la parte matricial:

| Ejercicio | Parte de §3.3 que conviene señalar | Resultado de esa parte |
|---|---|---|
| **3.20** (E p.97), $f:\mathbb R^4\to P_2$ | Apartado **A**: matriz y ecuaciones en bases canónicas, leyendo las ternas dadas como coordenadas en $\{1,x,x^2\}$ | $A=\begin{pmatrix}1&2&-1&2\\0&-4&0&-2\\-1&1&-2&-2\end{pmatrix}$ ($3\times4$), $y_1=x_1+2x_2-x_3+2x_4$, $y_2=-4x_2-2x_4$, $y_3=-x_1+x_2-2x_3-2x_4$ |
| **3.21** (E p.98), $f:\mathbb R^3\to\mathcal M_{2\times2}$ | Apartado **A**: matriz asociada pasando cada matriz imagen a coordenadas (mismo método que 3.17) | $A=\begin{pmatrix}2&1&5\\-1&0&1\\3&4&0\\0&2&1\end{pmatrix}$ ($4\times3$) |
| **3.25** (E p.101), derivada en $P_3$ | La **matriz de la derivada** (la misma que en 3.18) | $D=\begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\\0&0&0&0\end{pmatrix}$ |
| **3.28** (E p.103), $f:P_3\to\mathbb R^4$ con $\mathrm{Nuc}(f)=\{ax+bx^2\}$ | Apartado **C**: «matriz asociada, si es posible» → **no es posible**: solo se conocen las columnas de $x$ y $x^2$ (nulas); faltan $f(1)$ y $f(x^3)$ (Teorema 3.2: hacen falta las imágenes de toda una base) | Contraste con 3.19: allí sí se dan las imágenes de **toda** la base |

---

## Ejemplos propios (dificultad creciente)

### Ejemplo propio 1 (fácil) — de la matriz a las ecuaciones y a $f(x)$

> Sea $f$ la aplicación lineal cuya matriz en las bases canónicas es $A=\begin{pmatrix}1&0&2\\-1&1&0\end{pmatrix}$. (a) ¿Entre qué espacios va $f$? (b) Escribe sus ecuaciones y $f(x_1,x_2,x_3)$. (c) Calcula $f(2,-1,1)$ y $f(-2,-2,1)$. (d) Da $f(e_1),f(e_2),f(e_3)$.

1. **(a) Espacios.** $A$ es $2\times3$: 3 columnas ⇒ el espacio inicial tiene dimensión 3; 2 filas ⇒ el final tiene dimensión 2 (Def. 3.4, U p.116). Con bases canónicas: $f:\mathbb R^3\to\mathbb R^2$.
2. **(b) Ecuaciones** ($Y=AX$, U p.117): $\begin{pmatrix}y_1\\y_2\end{pmatrix}=\begin{pmatrix}1&0&2\\-1&1&0\end{pmatrix}\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix}\iff\begin{cases}y_1=x_1+2x_3\\y_2=-x_1+x_2\end{cases}$, es decir, $f(x_1,x_2,x_3)=(x_1+2x_3,\ -x_1+x_2)$.
3. **(c)** $f(2,-1,1)=(2+2,\ -2-1)=(4,-3)$; $f(-2,-2,1)=(-2+2,\ 2-2)=(0,0)$ (este vector está en el núcleo, cf. tema 3.2).
4. **(d)** Las imágenes de la base canónica son las **columnas**: $f(e_1)=(1,-1)$, $f(e_2)=(0,1)$, $f(e_3)=(2,0)$.
5. *Verificado con sympy:* `A*(2,-1,1)=(4,-3)`, `A*(-2,-2,1)=(0,0)`.

**Receta.** Tamaño de $A$ ⇒ dimensiones (columnas = salida, filas = llegada); cada fila de $A$ da una ecuación $y_i=\dots$; cada columna es la imagen de un vector de la base.

### Ejemplo propio 2 (medio) — obtener $f$ a partir de las imágenes de una base no canónica

> Sea $f:\mathbb R^2\to\mathbb R^3$ lineal con $f(1,1)=(1,0,2)$ y $f(1,2)=(2,1,3)$. (a) Justifica que $f$ queda determinada. (b) Escribe la matriz de $f$ respecto de $B=\{(1,1),(1,2)\}$ y la canónica $C_3$ de $\mathbb R^3$. (c) Halla la matriz en bases canónicas y $f(x,y)$.

1. **(a)** $u_1=(1,1)$, $u_2=(1,2)$ son independientes ($\begin{vmatrix}1&1\\1&2\end{vmatrix}=1\neq0$), luego son base de $\mathbb R^2$ (dos vectores libres en un espacio de dimensión 2, Teorema 2.6, U p.88). Por el Teorema 3.2 (U p.114), las imágenes de una base determinan $f$.
2. **(b) Matriz $M(f;B,C_3)$.** Columnas = coordenadas canónicas de $f(u_1)$, $f(u_2)$ (Def. 3.4 con base de salida $B$):
$$M(f;B,C_3)=\begin{pmatrix}1&2\\0&1\\2&3\end{pmatrix}.$$
   Ojo: esta matriz multiplica a las coordenadas **en $B$**, no a $(x,y)$.
3. **(c) Expresar la base canónica en función de $B$.** Buscamos $e_1=\alpha u_1+\beta u_2$: $(1,0)=(\alpha+\beta,\ \alpha+2\beta)$ ⇒ $\alpha+\beta=1$, $\alpha+2\beta=0$ ⇒ $\beta=-1$, $\alpha=2$: $e_1=2u_1-u_2$. Análogamente $(0,1)$: $\alpha+\beta=0$, $\alpha+2\beta=1$ ⇒ $\beta=1$, $\alpha=-1$: $e_2=-u_1+u_2$.
4. **Imágenes de la base canónica** por linealidad (propiedad 3, U p.103):
$$f(e_1)=2f(u_1)-f(u_2)=2(1,0,2)-(2,1,3)=(0,-1,1),\qquad f(e_2)=-f(u_1)+f(u_2)=(1,1,1).$$
5. **Matriz en bases canónicas y $f(x,y)$:**
$$A=\begin{pmatrix}0&1\\-1&1\\1&1\end{pmatrix},\qquad f(x,y)=(y,\ -x+y,\ x+y).$$
6. **Comprobación:** $f(1,1)=(1,0,2)$ ✓, $f(1,2)=(2,1,3)$ ✓.
7. *Verificado con sympy:* `U=Matrix([[1,1],[1,2]])`, `U.inv()=[[2,-1],[-1,1]]`, `F*U.inv()=[[0,1],[-1,1],[1,1]]` y `A*U = F` (comprobación con producto de matrices, herramienta de §3.4–3.5: $A=M(f;B,C_3)\,U^{-1}$).

**Receta.** Si te dan imágenes de una base no canónica: (1) comprueba que es base; (2) escribe cada $e_i$ como combinación de esa base; (3) aplica la linealidad para obtener $f(e_i)$; (4) ponlos en columna.

**Error típico.** Poner $f(1,1)$ y $f(1,2)$ como columnas y creer que es la matriz en **bases canónicas** (lo es respecto de $B$ en la salida, no de $C_2$): con ella, $A(1,0)^T$ daría $(1,0,2)$, que es $f(1,1)$, no $f(1,0)$.

### Ejemplo propio 3 (tipo examen) — matriz respecto de bases no canónicas en salida y llegada

> Sea $f:\mathbb R^3\to\mathbb R^2$, $f(x,y,z)=(x+y,\ y+z)$. Halla la matriz de $f$ respecto de $B=\{(1,0,0),(1,1,0),(1,1,1)\}$ en $\mathbb R^3$ y $S=\{(1,1),(1,2)\}$ en $\mathbb R^2$. Usa esa matriz para calcular, en coordenadas de $S$, la imagen del vector cuyas coordenadas en $B$ son $(1,1,1)$, y compruébalo.

1. **Son bases.** $\begin{vmatrix}1&1&1\\0&1&1\\0&0&1\end{vmatrix}=1\neq0$ y $\begin{vmatrix}1&1\\1&2\end{vmatrix}=1\neq0$ (Teoremas 2.5–2.6, U p.88). Tamaño de la matriz: $2\times3$.
2. **Imágenes de los vectores de $B$** (con la fórmula de $f$): $f(1,0,0)=(1,0)$, $f(1,1,0)=(2,1)$, $f(1,1,1)=(2,2)$.
3. **Coordenadas en $S$ de un vector genérico $(p,q)$.** $(p,q)=a(1,1)+b(1,2)$ ⇒ $a+b=p$, $a+2b=q$ ⇒ $b=q-p$, $a=2p-q$.
   - $(1,0)$: $a=2$, $b=-1$ → $(2,-1)_S$. Comprobación: $2(1,1)-(1,2)=(1,0)$ ✓.
   - $(2,1)$: $a=3$, $b=-1$ → $(3,-1)_S$. Comprobación: $3(1,1)-(1,2)=(2,1)$ ✓.
   - $(2,2)$: $a=2$, $b=0$ → $(2,0)_S$ ✓.
4. **Matriz** (Def. 3.4: columna $j$ = coordenadas en $S$ de $f(\text{$j$-ésimo vector de }B)$):
$$M(f;B,S)=\begin{pmatrix}2&3&2\\-1&-1&0\end{pmatrix}.$$
5. **Imagen del vector $(1,1,1)_B$** con $Y=AX$ (U p.117; $X$ en $B$, $Y$ en $S$):
$$\begin{pmatrix}2&3&2\\-1&-1&0\end{pmatrix}\begin{pmatrix}1\\1\\1\end{pmatrix}=\begin{pmatrix}7\\-2\end{pmatrix}_S .$$
6. **Comprobación por otro camino.** $(1,1,1)_B=(1,0,0)+(1,1,0)+(1,1,1)=(3,2,1)$; $f(3,2,1)=(5,3)$; y $7(1,1)-2(1,2)=(5,3)$ ✓.
7. *Verificado con sympy:* con la matriz canónica $A_c=\begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$, $Q$ = vectores de $B$ en columna y $P$ = vectores de $S$ en columna, $P^{-1}A_cQ=\begin{pmatrix}2&3&2\\-1&-1&0\end{pmatrix}$ (fórmula de cambio de base, Def. 3.15, U p.136: es la herramienta de §3.5; en §3.3 basta el método directo de los pasos 2–4).

**Receta.** Matriz respecto de bases $B$ (salida) y $S$ (llegada): calcula $f$ de cada vector de $B$, **expresa cada resultado en coordenadas de $S$** (resolviendo un sistema), y pon esas coordenadas en columna. La matriz resultante transforma coordenadas en $B$ en coordenadas en $S$.

**Error típico.** Poner como columnas las imágenes $f(b_j)$ **en coordenadas canónicas** $(1,0),(2,1),(2,2)$: eso es $M(f;B,C_2)$, no $M(f;B,S)$. Otro: aplicar la matriz a $(1,1,1)$ pensando que son coordenadas canónicas.

---

## Receta global de la sección (para la chuleta)

1. **Determinación** (Teorema 3.2): una aplicación lineal queda fijada por las imágenes de **todos** los vectores de una base de $V$; si $v=(v_1,\dots,v_m)_B$, $f(v)=v_1f(e_1)+\dots+v_mf(e_m)$. Si faltan imágenes (E 3.28) o los datos contradicen la linealidad (U Ej. 3.17), no hay matriz única / no existe $f$.
2. **Matriz asociada** (Def. 3.4): columna $j$ = **coordenadas en $S$** de $f(e_j)$. Tamaño $\mathrm{Dim}\,W\times\mathrm{Dim}\,V$ (filas = llegada, columnas = salida).
3. **Ecuaciones** ($Y=AX$): cada fila de $A$ da $y_i=a_{i1}x_1+\dots+a_{im}x_m$; $X$ son coordenadas en $B$ e $Y$ en $S$.
4. **Polinomios / matrices:** usar la base canónica en su orden ($1,x,x^2,\dots$; $E_{11},E_{12},E_{21},E_{22}$) y trabajar con coordenadas.
5. **Bases no canónicas:** si la salida es no canónica, las columnas son $f(b_j)$; para pasar a canónica, escribe $e_i$ en función de $B$ y usa la linealidad. Si la llegada es no canónica, resuelve un sistema para las coordenadas en $S$ de cada imagen.

---

## Tabla de ejercicios cubiertos

| Ejercicio de E | Página impresa | Contenido | Teoría de U usada | Errata / omisión de E |
|---|---|---|---|---|
| 3.15 | p.93 | Matriz $2\times3$ en bases canónicas, $\mathbb R^3\to\mathbb R^2$ (opción múltiple sobre las filas) | Teor. 3.2 p.114; Def. 3.4 p.116; $Y=AX$ p.117 | No explica por qué A y B son falsas (tamaño $3\times2$) |
| 3.17 | p.94 | Matriz $4\times3$, $\mathbb R^3\to\mathcal M_{2\times2}$ | Def. 2.10 p.85; Def. 3.4 p.116 | «Como es evidente» el tamaño: se justifica con Def. 3.4 |
| 3.18 | p.95 | Matriz de la derivada en $P_3$ (opción múltiple) | Def. 3.1 p.101; Def. 3.4 p.116; $Y=AX$ p.117 | No justifica linealidad ni por qué A, B, C fallan; texto extraído desordenado (verificado en PDF) |
| 3.19 | p.96 | Matriz, ecuaciones e imagen de $x+3$ en un endomorfismo de $P_2$ | Teor. 3.2–3.3 pp.114–115; Def. 3.4 p.116; $Y=AX$ p.117 | «$P_2$ = grado 2» debe ser grado $\le2$; «$f(x)=2$» = imagen del polinomio $x$ |
| (3.20 A, 3.21 A, 3.25, 3.28 C) | pp.97–103 | Parte matricial de ejercicios mixtos | Def. 3.4; Teor. 3.2 | Desarrollados en el tema 3.2 (solo enlace) |
| Ejemplos propios 1–3 | — | De la matriz a las ecuaciones; $f$ a partir de una base no canónica; $M(f;B,S)$ con bases no canónicas en ambos lados | Teor. 3.2; Def. 3.4; $Y=AX$ (comprobación con Def. 3.15 p.136) | — |
