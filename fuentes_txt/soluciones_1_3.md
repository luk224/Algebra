# Soluciones — Sección 1.3 Determinantes (Ejercicios 1.21–1.29 de E)

**Fuentes.** E = *Ejercicios de Álgebra para Ingenieros* (página impresa = PDF − 4); U = *Álgebra para Ingenieros* (página impresa = PDF − 6). Todos los cálculos se han comprobado con `sympy` (`Matrix.det()`, `.cofactor()`, `.cofactor_matrix()`, `.minor_submatrix()`, `.inv()`, `.rank()`, `.rref()`, `sympy.combinatorics.Permutation.signature()`, parámetros con `symbols`).

**Herramientas de teoría que se usan (U §1.3, pp. 23–28, páginas impresas comprobadas en el PDF):**

| Resultado | Dónde |
|---|---|
| El determinante solo está definido para matrices **cuadradas** (nota al margen) | U p.23 |
| Fórmulas de orden 2 y 3 (Ejemplo 1.16) | U p.23 |
| **Adjunto** $A_{ij}=(-1)^{i+j}\cdot$(determinante de la submatriz que resulta al quitar $F_i$ y $C_j$); **desarrollo por una fila** $\lvert A\rvert=a_{i1}A_{i1}+\dots+a_{in}A_{in}$; y (nota 11) análogamente **por una columna** | U p.24 |
| Permutaciones, $S_n$ ($n!$ elementos), paridad por número de **intercambios**, $\operatorname{sig}(p)$ | U p.24–25 |
| **Def. 1.6** $\det(A)=\sum_{p\in S_n}\operatorname{sig}(p)\,a_{1p_1}a_{2p_2}\cdots a_{np_n}$ | U p.25 |
| **Regla de Sarrus**: $\lvert A\rvert=a_{11}a_{22}a_{33}+a_{21}a_{32}a_{13}+a_{12}a_{23}a_{31}-a_{13}a_{22}a_{31}-a_{23}a_{32}a_{11}-a_{21}a_{12}a_{33}$ | U p.26 |
| Propiedades: fila de ceros $\Rightarrow\det=0$; triangular $\Rightarrow\det=a_{11}\cdots a_{nn}$; $\det(A+B)\neq\det A+\det B$ en general; $\det A=\det A^t$; $\det(\alpha A)=\alpha^n\det A$; $\det(AB)=\det A\det B$ | U §1.3.3 p.26 |
| **Operaciones elementales por filas**: $F_i\leftrightarrow F_j$ cambia el signo; $F_i\to\alpha F_i$ ($\alpha\neq0$) multiplica por $\alpha$; $F_i\to F_i+\alpha F_j$ no lo cambia. Ejemplo 1.22: determinantes de las matrices elementales | U p.27 |
| $A$ regular $\iff\det A\neq0$; si $\lvert A\rvert\neq0$, $A^{-1}=\frac{1}{\lvert A\rvert}(\operatorname{Adj}A)^t$; $\operatorname{rang}(A)$ = mayor orden de un menor no nulo | U p.27 |
| **Matriz adjunta** $\operatorname{Adj}(A)$ = sustituir cada $a_{ij}$ por su adjunto $A_{ij}$; **menor** = determinante de una submatriz cuadrada (Ejemplos 1.23 y 1.24) | U p.28 |
| (De §1.2) $A$ de orden $n$ regular $\iff\operatorname{rang}(A)=n$; rango = n.º de filas no nulas de una escalonada | U p.22 |

**Operaciones por columnas.** U p.27 solo enuncia las propiedades para **filas**. Para columnas se deducen así: hacer una operación sobre las columnas de $A$ es hacerla sobre las filas de $A^t$, y $\det A=\det A^t$ (U p.26). Por tanto las tres reglas valen igual para columnas. Lo usaremos en 1.27 y lo citaremos como «filas + $\det A=\det A^t$».

> **Nota de extracción.** En `ejercicios.txt` (modo `-layout`) se pierde el símbolo $\neq$ (sale «=»: en 1.25, en 1.29 y en la nota al margen de 1.23) y se desordenan matrices y fracciones (1.21, 1.23, 1.27, 1.29). Todos los enunciados de este archivo se han contrastado con `pdftotext -raw` y con la imagen renderizada de las páginas del PDF (E pp. 23–28 = PDF 27–32). Tres enunciados que circulaban con errores quedan corregidos aquí: **1.23** ($A_3$ es $4\times3$ y $A_5$ no es $I_4$), **1.27** (la segunda matriz es $\begin{pmatrix}x&\frac14&4\\ y&0&4\\ z&\frac12&12\end{pmatrix}$) y **1.29** (las opciones A y C dicen «si $a=0$»; solo B dice «si $a\neq0$»).

**Errores u omisiones detectados en E** (no hay erratas de cálculo en esta sección; todos los resultados finales de E son correctos): 1.25 (se salta el paso clave $\det(BA)=\det B\det A$), 1.29 (afirma que los menores que lista son «las únicas posibilidades» de menores de orden 2 no nulos, y es falso; además el test tiene **dos** opciones verdaderas, B y C). Ver cada ejercicio.

**Orden de estudio recomendado** (de fácil a difícil): 1.23 → 1.24 → 1.21 → 1.28 → 1.26 → 1.27 → 1.29 → 1.22 → 1.25. Abajo se mantienen en el orden del libro.

---

## Ejercicio 1.21 (E p.23)

> **Enunciado.** Calcúlese el determinante de la matriz $A$ de filas $(1,2,m,4)$, $(3,2,1,m)$, $(0,1,4,0)$ y $(3m,5,1,2)$ mediante el desarrollo de la columna $C_4$ siendo $m\in\mathbb R$.

$$A=\begin{pmatrix}1&2&m&4\\ 3&2&1&m\\ 0&1&4&0\\ 3m&5&1&2\end{pmatrix}.$$

**Solución.**

1. **Fórmula que vamos a usar.** El desarrollo por la columna $C_4$ (U p.24, nota 11) es
$$\lvert A\rvert=a_{14}A_{14}+a_{24}A_{24}+a_{34}A_{34}+a_{44}A_{44},$$
donde $A_{i4}=(-1)^{i+4}\,M_{i4}$ y $M_{i4}$ es el determinante $3\times3$ que queda al tachar la fila $i$ y la columna 4.

2. **Elementos y signos de $C_4$.** $a_{14}=4$, $a_{24}=m$, $a_{34}=0$, $a_{44}=2$. Signos $(-1)^{i+4}$: $i=1\to-$, $i=2\to+$, $i=3\to-$, $i=4\to+$. Como $a_{34}=0$, el tercer sumando es 0 y **no hace falta calcular** $A_{34}$ (por eso conviene elegir filas o columnas con ceros).

3. **Menor $M_{14}$** (quitar $F_1$ y $C_4$), por Sarrus (U p.26):
$$M_{14}=\begin{vmatrix}3&2&1\\ 0&1&4\\ 3m&5&1\end{vmatrix}=3\cdot1\cdot1+0\cdot5\cdot1+2\cdot4\cdot3m-1\cdot1\cdot3m-4\cdot5\cdot3-0\cdot2\cdot1=21m-57.$$
Luego $A_{14}=-M_{14}=57-21m$.

4. **Menor $M_{24}$** (quitar $F_2$ y $C_4$):
$$M_{24}=\begin{vmatrix}1&2&m\\ 0&1&4\\ 3m&5&1\end{vmatrix}=1+0+24m-3m^2-20-0=-3m^2+24m-19=A_{24}.$$

5. **Menor $M_{44}$** (quitar $F_4$ y $C_4$):
$$M_{44}=\begin{vmatrix}1&2&m\\ 3&2&1\\ 0&1&4\end{vmatrix}=8+3m+0-0-1-24=3m-17=A_{44}.$$

6. **Suma.**
$$\lvert A\rvert=4(57-21m)+m(-3m^2+24m-19)+0+2(3m-17)=228-84m-3m^3+24m^2-19m+6m-34,$$
$$\boxed{\lvert A\rvert=-3m^3+24m^2-97m+194.}$$

7. **Comprobación independiente** por la fila $F_3=(0,1,4,0)$, que también tiene dos ceros: $\lvert A\rvert=1\cdot A_{32}+4\cdot A_{33}$, con
$A_{32}=-\begin{vmatrix}1&m&4\\ 3&1&m\\ 3m&1&2\end{vmatrix}=-(3m^3-19m+14)$ y $A_{33}=+\begin{vmatrix}1&2&4\\ 3&2&m\\ 3m&5&2\end{vmatrix}=6m^2-29m+52$.
Suma: $-3m^3+19m-14+24m^2-116m+208=-3m^3+24m^2-97m+194$. Coincide; el resultado de E es correcto (sympy también).

**Comentario.** El polinomio tiene una única raíz real ($m\approx3{,}959$, comprobado con sympy); para ese valor $A$ es singular (U p.27) y para cualquier otro es regular. El ejercicio no lo pide.

**Receta.** Desarrolla por la fila o columna que te digan (o, si eliges tú, la que tenga más ceros); escribe primero el tablero de signos $(-1)^{i+j}$ y luego calcula solo los menores cuyo elemento no es 0.

**Error típico.** Olvidar el signo $(-1)^{i+j}$ del adjunto (aquí, el $-$ de $A_{14}$), o confundir el menor $M_{ij}$ con el adjunto $A_{ij}$.

**Teoría:** U p.24 (adjunto, desarrollo por fila/columna), p.26 (Sarrus).

---

## Ejercicio 1.22 (E p.23)

> **Enunciado.** Si $a_{15}a_{2i}a_{3j}a_{42}a_{53}$ es un término del desarrollo de un determinante de orden 5, dicho término debe llevar signo negativo cuando $(i,j)$ sea: A) $(1,4)$. B) $(4,1)$. C) Lo es siempre.

**Solución.**

1. **Qué es «un término del desarrollo».** Por la Def. 1.6 (U p.25), $\det(A)=\sum_{p\in S_5}\operatorname{sig}(p)\,a_{1p_1}a_{2p_2}a_{3p_3}a_{4p_4}a_{5p_5}$: cada término toma **un elemento de cada fila** (primeros subíndices $1,2,3,4,5$ en orden) y **un elemento de cada columna** (los segundos subíndices $p_1,\dots,p_5$ forman una permutación de $\{1,\dots,5\}$). El «signo que lleva» el término es $\operatorname{sig}(p)$.

2. **Qué valores pueden tomar $i,j$.** Aquí $p=\{5,i,j,2,3\}$. Las columnas 5, 2 y 3 ya están usadas, así que $\{i,j\}=\{1,4\}$: solo hay dos posibilidades, $(i,j)=(1,4)$ o $(4,1)$.

3. **Paridad de $p=\{5,1,4,2,3\}$** (opción A), contando intercambios hasta llegar a la identidad (U p.25):
$\{5,1,4,2,3\}\to\{3,1,4,2,5\}\to\{3,1,2,4,5\}\to\{1,3,2,4,5\}\to\{1,2,3,4,5\}$: **4 intercambios**, par, $\operatorname{sig}=+1$. El término lleva signo $+$: **A es falsa**.

4. **Paridad de $p=\{5,4,1,2,3\}$** (opción B):
$\{5,4,1,2,3\}\to\{3,4,1,2,5\}\to\{1,4,3,2,5\}\to\{1,2,3,4,5\}$: **3 intercambios**, impar, $\operatorname{sig}=-1$. **B es verdadera.**

5. **C es falsa**, pues en el caso A el signo es $+$.

6. **Atajo de comprobación.** Las dos permutaciones se diferencian en **un solo intercambio** (el de los valores 1 y 4), así que necesariamente tienen paridad opuesta: exactamente una de A, B es la negativa. (Comprobado con sympy: `signature()` da $+1$ y $-1$; número de inversiones 6 y 7.)

**Respuesta: B.**

**Receta.** Lee los segundos subíndices en el orden de las filas: eso es $p$. Completa lo que falte para que sea permutación y cuenta intercambios hasta la identidad: par $\to+$, impar $\to-$.

**Error típico.** Pensar que el «signo» depende de los valores $a_{ij}$ (es el de la permutación), o equivocarse al contar intercambios; la paridad no depende del camino elegido (U p.25, nota al margen), pero cada paso debe intercambiar exactamente dos posiciones.

**Teoría:** U p.24–25 (permutaciones, paridad, signo), Def. 1.6 p.25.

---

## Ejercicio 1.23 (E p.24)

> **Enunciado.** Se pide calcular, si es posible, los determinantes de las matrices del Ejercicio 1.13.

Las matrices del Ejercicio 1.13 (E p.15; confirmadas en `soluciones_1_2.md` y en la imagen de E p.24) son:
$A_1=\begin{pmatrix}1&0\\ 0&3\end{pmatrix}$, $A_2=\begin{pmatrix}1&2&0\\ 0&1&0\\ 0&0&1\end{pmatrix}$, $A_3=\begin{pmatrix}1&0&0\\ 0&0&1\\ 0&1&2\\ 0&0&1\end{pmatrix}$, $A_4=\begin{pmatrix}0&0&1\\ 0&1&0\\ 1&0&0\end{pmatrix}$, $A_5=\begin{pmatrix}1&0&5&1\\ 0&1&0&0\\ 0&0&1&0\\ 0&0&0&1\end{pmatrix}$, $A_6=\begin{pmatrix}2&1&0\\ 0&0&0\\ 0&0&1\end{pmatrix}$.

**Solución.** Primero se mira si es cuadrada (si no, el determinante no existe, U p.23); después se busca la propiedad que dé el resultado sin cálculo.

1. **$A_1$**: es la elemental de $F_2\to3F_2$ aplicada a $I_2$. Por U p.27 (tipo 2), $\det A_1=3\det I_2=3$. (También: triangular, $1\cdot3=3$.)
2. **$A_2$**: elemental de $F_1\to F_1+2F_2$ (tipo 3, no cambia el determinante): $\det A_2=\det I_3=1$. (También: triangular superior, $1\cdot1\cdot1$.)
3. **$A_3$**: es $4\times3$, **no es cuadrada**, luego **no tiene determinante** (U p.23, nota al margen).
4. **$A_4$**: elemental de $F_1\leftrightarrow F_3$ (tipo 1, cambia el signo): $\det A_4=-\det I_3=-1$.
5. **$A_5$**: no es elemental (Ej. 1.13), pero es **triangular superior** (todo lo que hay debajo de la diagonal es 0), así que $\det A_5=1\cdot1\cdot1\cdot1=1$ (U p.26).
6. **$A_6$**: tiene una **fila de ceros** ($F_2$), luego $\det A_6=0$ (U p.26). Coherente con Ej. 1.13/1.18: no es regular.

| $A_1$ | $A_2$ | $A_3$ | $A_4$ | $A_5$ | $A_6$ |
|---|---|---|---|---|---|
| 3 | 1 | no existe | $-1$ | 1 | 0 |

(sympy: 3, 1, —, −1, 1, 0.)

**Receta.** Antes de calcular, busca atajos: ¿cuadrada?, ¿fila/columna de ceros?, ¿triangular?, ¿elemental (se obtiene de $I$ con una operación)? Determinante de una elemental: $-1$ (permutar), $\alpha$ (multiplicar por $\alpha$), $1$ (reemplazar).

**Error típico.** Intentar «calcular» el determinante de $A_3$ (no existe), o creer que como $A_5$ no es elemental hay que desarrollar: es triangular.

**Teoría:** U p.23 (solo cuadradas), p.26 (fila de ceros, triangular), p.27 (operaciones elementales, Ejemplo 1.22).

---

## Ejercicio 1.24 (E p.25)

> **Enunciado.** Si $A$ es la matriz de filas $(-1,-5,-7)$, $(2,5,6)$ y $(1,3,4)$, hállese la tercera columna de $A^{-1}$.

$$A=\begin{pmatrix}-1&-5&-7\\ 2&5&6\\ 1&3&4\end{pmatrix}.$$

**Solución.**

1. **Herramienta.** Si $\lvert A\rvert\neq0$, $A^{-1}=\frac1{\lvert A\rvert}(\operatorname{Adj}A)^t$ (U p.27), con $\operatorname{Adj}A=(A_{ij})$ la matriz de adjuntos (U p.28).

2. **Qué adjuntos hacen falta.** La tercera columna de $(\operatorname{Adj}A)^t$ es la **tercera fila** de $\operatorname{Adj}A$, es decir $(A_{31},A_{32},A_{33})$. Por tanto
$$\text{3.ª columna de }A^{-1}=\frac1{\lvert A\rvert}\begin{pmatrix}A_{31}\\ A_{32}\\ A_{33}\end{pmatrix}.$$
No hace falta calcular los nueve adjuntos.

3. **Los tres adjuntos** (quitar $F_3$ y la columna correspondiente; signos $+,-,+$):
$$A_{31}=+\begin{vmatrix}-5&-7\\ 5&6\end{vmatrix}=-30+35=5,\quad A_{32}=-\begin{vmatrix}-1&-7\\ 2&6\end{vmatrix}=-(-6+14)=-8,\quad A_{33}=+\begin{vmatrix}-1&-5\\ 2&5\end{vmatrix}=-5+10=5.$$

4. **Determinante reaprovechando esos adjuntos**: desarrollando por $F_3=(1,3,4)$ (U p.24),
$$\lvert A\rvert=1\cdot5+3\cdot(-8)+4\cdot5=5-24+20=1\neq0,$$
luego $A$ es regular (U p.27) y la fórmula es aplicable. (Por Sarrus: $-20-42-30+35+18+40=1$.)

5. **Resultado.** Tercera columna de $A^{-1}$: $\boxed{(5,-8,5)^t}$.

6. **Comprobación** (sin calculadora): si $c$ es la 3.ª columna de $A^{-1}$, debe cumplirse $Ac=e_3$ porque $AA^{-1}=I$:
$A\,(5,-8,5)^t=(-5+40-35,\;10-40+30,\;5-24+20)^t=(0,0,1)^t$. Correcto.

Para referencia, E da $\operatorname{Adj}A=\begin{pmatrix}2&-2&1\\ -1&3&-2\\ 5&-8&5\end{pmatrix}$ y $A^{-1}=\begin{pmatrix}2&-1&5\\ -2&3&-8\\ 1&-2&5\end{pmatrix}$; ambas confirmadas con sympy (métodos cofactor_matrix e inv).

**Receta.** Columna $k$ de $A^{-1}$ = $\frac1{\lvert A\rvert}\times$ (adjuntos de la **fila** $k$ de $A$). Y $\lvert A\rvert$ sale gratis desarrollando por esa misma fila.

**Error típico.** Olvidar trasponer: tomar los adjuntos de la **columna** 3, $(A_{13},A_{23},A_{33})=(1,-2,5)$, que dan la tercera **fila** de $A^{-1}$, no la columna. Otro: olvidar los signos $(-1)^{i+j}$ (el $-8$).

**Teoría:** U p.24 (adjunto, desarrollo), p.27 ($A^{-1}=\frac1{\lvert A\rvert}(\operatorname{Adj}A)^t$), p.28 (definición de $\operatorname{Adj}A$).

---

## Ejercicio 1.25 (E p.25)

> **Enunciado.** Si $A$ es una matriz cuadrada real de orden $n$ y $B$ la matriz traspuesta de la matriz adjunta de $A$, se pide calcular el rango de $B$ suponiendo que $\operatorname{rang}(A)=n$.

**Solución.**

1. **Traducir la hipótesis.** $A$ de orden $n$ con $\operatorname{rang}(A)=n$ $\Rightarrow$ $A$ es regular (U p.22) $\Rightarrow$ $\lvert A\rvert\neq0$ (U p.27).

2. **Usar la fórmula de la inversa.** Como $\lvert A\rvert\neq0$, $A^{-1}=\frac1{\lvert A\rvert}(\operatorname{Adj}A)^t=\frac1{\lvert A\rvert}B$ (U p.27). Multiplicando por $A$ por la derecha: $I_n=A^{-1}A=\frac1{\lvert A\rvert}BA$, es decir,
$$BA=\lvert A\rvert\,I_n.$$

3. **Tomar determinantes** (paso que E omite). Por $\det(XY)=\det X\det Y$ y $\det(\alpha I_n)=\alpha^n$ (U p.26):
$$\lvert B\rvert\,\lvert A\rvert=\lvert A\rvert^n\quad\Longrightarrow\quad\lvert B\rvert=\lvert A\rvert^{\,n-1}\neq0$$
(se puede dividir porque $\lvert A\rvert\neq0$).

4. **Conclusión.** $\lvert B\rvert\neq0\Rightarrow B$ regular (U p.27) $\Rightarrow\operatorname{rang}(B)=n$ (U p.22). $\boxed{\operatorname{rang}(B)=n}$.

**Otra forma (más corta).** De 2, $B=\lvert A\rvert\,A^{-1}$: producto de un escalar no nulo por una matriz regular, luego regular (su inversa es $\frac1{\lvert A\rvert}A$).

**Verificación.** sympy con una matriz $3\times3$ genérica: $BA-\lvert A\rvert I_3=0$ y $\lvert B\rvert-\lvert A\rvert^2=0$ idénticamente. Ejemplo: $A=\begin{pmatrix}1&2&3\\ 0&1&4\\ 5&6&0\end{pmatrix}$, $\lvert A\rvert=1$, $\operatorname{rang}(B)=3$.

**Nota sobre E.** E escribe «Como $\lvert A\rvert\neq0$, de la igualdad anterior se deduce que $\lvert B\rvert\neq0$» sin decir cómo: hay que tomar determinantes y usar $\det(BA)=\det B\det A$ (paso 3). Sin ese paso, en el examen la deducción quedaría sin justificar. (Además, en `ejercicios.txt` el $\neq$ aparece como «=» por la extracción; en el PDF es $\neq$.)

**Receta.** Si aparece $(\operatorname{Adj}A)^t$ con $A$ regular, sustitúyelo por $\lvert A\rvert A^{-1}$ y razona con eso.

**Error típico.** Confundir $\operatorname{Adj}A$ (matriz de adjuntos, U p.28) con $(\operatorname{Adj}A)^t$ (lo que Maxima llama `adjoint`, U p.27 al margen). Aquí da igual para el rango (porque $\det X=\det X^t$), pero no para la inversa (Ej. 1.24).

**Teoría:** U p.22 (regular $\iff$ rango $n$), p.26 ($\det(AB)$, $\det(\alpha A)$), p.27 (regular $\iff\det\neq0$, fórmula de la inversa).

---

## Ejercicio 1.26 (E p.26)

> **Enunciado.** Si $A$ es una matriz cuadrada de orden 4 en cuyas filas se hacen las siguientes transformaciones: multiplicar por $\frac12$ la primera, multiplicar por $\frac13$ la segunda, restar a la tercera el doble de la cuarta y calcular su traspuesta, obtenemos una matriz $B$ que verifica: A) $\lvert A\rvert=\lvert B\rvert$. B) $\lvert A\rvert=6\lvert B\rvert$. C) $\lvert A\rvert=(2-\frac16)\lvert B\rvert$.

**Solución.** Cada paso es una operación elemental por filas o la trasposición; seguimos el efecto de cada una sobre el determinante (U p.27 y p.26).

| Paso | Operación | Tipo | Efecto | Determinante |
|---|---|---|---|---|
| 1 | $F_1\to\frac12F_1$ | multiplicar fila por $\alpha=\frac12\neq0$ | $\times\frac12$ | $\lvert B_1\rvert=\frac12\lvert A\rvert$ |
| 2 | $F_2\to\frac13F_2$ | multiplicar fila por $\alpha=\frac13\neq0$ | $\times\frac13$ | $\lvert B_2\rvert=\frac16\lvert A\rvert$ |
| 3 | $F_3\to F_3-2F_4$ | reemplazo ($F_i\to F_i+\alpha F_j$, $\alpha=-2$) | no cambia | $\lvert B_3\rvert=\frac16\lvert A\rvert$ |
| 4 | $B=B_3^t$ | trasponer | no cambia ($\det X=\det X^t$) | $\lvert B\rvert=\frac16\lvert A\rvert$ |

Por tanto $\lvert B\rvert=\frac16\lvert A\rvert\iff\lvert A\rvert=6\lvert B\rvert$. **Respuesta: B.**

A es falsa salvo si $\lvert A\rvert=0$; C ($\lvert A\rvert=\frac{11}6\lvert B\rvert$) proviene de creer que el reemplazo con coeficiente $-2$ también altera el determinante.

**Verificación.** sympy con $A$ $4\times4$ simbólica: $\lvert A\rvert-6\lvert B\rvert\equiv0$. Numéricamente, con $A=\begin{pmatrix}2&1&0&3\\ 1&-1&2&0\\ 0&4&1&1\\ 3&0&-2&5\end{pmatrix}$: $\lvert A\rvert=-2$, $\lvert B\rvert=-\frac13$.

**Receta.** Recorre las operaciones anotando un factor: permutar $\to(-1)$, multiplicar una fila por $\alpha\to\alpha$, reemplazo $\to1$, trasponer $\to1$. El determinante final es el inicial por el producto de los factores.

**Error típico.** (a) Pensar que $F_3\to F_3-2F_4$ multiplica por $-2$ (o por $1-2$): el reemplazo no cambia nada. (b) Confundir «multiplicar **una fila** por $\alpha$» ($\times\alpha$) con «multiplicar **la matriz** por $\alpha$» ($\times\alpha^n$, U p.26).

**Teoría:** U p.26 ($\det A=\det A^t$, $\det(\alpha A)=\alpha^n\det A$), p.27 (operaciones elementales por filas).

---

## Ejercicio 1.27 (E p.27)

> **Enunciado.** Sabiendo que $\begin{vmatrix}x&y&z\\ 1&0&2\\ 1&1&3\end{vmatrix}=1$, calcúlese $\begin{vmatrix}x&\frac14&4\\ y&0&4\\ z&\frac12&12\end{vmatrix}$.

(Enunciado comprobado en la imagen de E p.27.)

**Solución.**

1. **Observar la estructura.** Llamemos $M=\begin{pmatrix}x&y&z\\ 1&0&2\\ 1&1&3\end{pmatrix}$ y $N=\begin{pmatrix}x&\frac14&4\\ y&0&4\\ z&\frac12&12\end{pmatrix}$. La primera columna de $N$ es $(x,y,z)^t$, la primera fila de $M$ traspuesta. Las otras columnas de $N$ son **múltiplos** de las filas 2 y 3 de $M$:
$$C_2(N)=\left(\tfrac14,0,\tfrac12\right)^t=\tfrac14(1,0,2)^t,\qquad C_3(N)=(4,4,12)^t=4(1,1,3)^t.$$

2. **Sacar factores de columnas.** «Multiplicar una columna por $\alpha$ multiplica el determinante por $\alpha$» (U p.27 para filas + $\det X=\det X^t$, U p.26). Leído al revés: un factor común de una columna sale fuera del determinante:
$$\lvert N\rvert=\frac14\cdot4\cdot\begin{vmatrix}x&1&1\\ y&0&1\\ z&2&3\end{vmatrix}=1\cdot\begin{vmatrix}x&1&1\\ y&0&1\\ z&2&3\end{vmatrix}.$$

3. **Reconocer la traspuesta.** $\begin{pmatrix}x&1&1\\ y&0&1\\ z&2&3\end{pmatrix}=M^t$, y $\det M^t=\det M$ (U p.26). Por tanto
$$\boxed{\lvert N\rvert=\lvert M\rvert=1.}$$

4. **Verificación directa** (sympy, y a mano por Sarrus): ambos determinantes valen $-2x-y+z$, así que son iguales para todo $x,y,z$; con la hipótesis, valen 1.

**Nota al margen de E.** «En general $\alpha\det(A)\neq\det(\alpha A)$»: correcto, lo cierto es $\det(\alpha A)=\alpha^n\det A$ (U p.26). Aquí solo se multiplican **columnas sueltas**, no la matriz entera.

**Receta.** Compara las filas/columnas de la matriz pedida con las de la conocida: busca trasposición, factores comunes en una línea, permutaciones y combinaciones; aplica a cada cambio su factor.

**Error típico.** Sacar el factor como si fuera de toda la matriz (elevarlo al cubo), o no ver la trasposición e intentar relacionar filas con filas.

**Teoría:** U p.26 ($\det A=\det A^t$, $\det(\alpha A)=\alpha^n\det A$), p.27 (multiplicar una fila por $\alpha$).

---

## Ejercicio 1.28 (E p.27)

> **Enunciado.** Calcúlese el determinante de la matriz de filas $(x,a,b,c)$, $(a,x,0,0)$, $(b,0,x,0)$, $(c,0,0,x)$.

$$M=\begin{pmatrix}x&a&b&c\\ a&x&0&0\\ b&0&x&0\\ c&0&0&x\end{pmatrix}.$$

**Solución** (desarrollo por $F_3=(b,0,x,0)$, que tiene dos ceros; U p.24).

1. **Fórmula.** $\lvert M\rvert=b\,A_{31}+0\cdot A_{32}+x\,A_{33}+0\cdot A_{34}=b\,A_{31}+x\,A_{33}$. Signos: $(-1)^{3+1}=+$, $(-1)^{3+3}=+$.

2. **$A_{31}$** (quitar $F_3$ y $C_1$):
$$A_{31}=+\begin{vmatrix}a&b&c\\ x&0&0\\ 0&0&x\end{vmatrix}.$$
Desarrollando este $3\times3$ por su segunda fila $(x,0,0)$: $=x\cdot(-1)^{2+1}\begin{vmatrix}b&c\\ 0&x\end{vmatrix}=-x\cdot bx=-bx^2$.

3. **$A_{33}$** (quitar $F_3$ y $C_3$):
$$A_{33}=+\begin{vmatrix}x&a&c\\ a&x&0\\ c&0&x\end{vmatrix}\overset{\text{Sarrus}}{=}x^3+0+0-c\,x\,c-0-a\,a\,x=x^3-a^2x-c^2x.$$

4. **Suma.**
$$\lvert M\rvert=b(-bx^2)+x(x^3-a^2x-c^2x)=\boxed{x^4-x^2(a^2+b^2+c^2)=x^2\left(x^2-a^2-b^2-c^2\right).}$$

5. **Comprobación por $C_4=(c,0,0,x)^t$** (como hace E): $\lvert M\rvert=c\,A_{14}+x\,A_{44}$, con $A_{14}=-\begin{vmatrix}a&x&0\\ b&0&x\\ c&0&0\end{vmatrix}=-cx^2$ y $A_{44}=\begin{vmatrix}x&a&b\\ a&x&0\\ b&0&x\end{vmatrix}=x^3-a^2x-b^2x$. Suma: $-c^2x^2+x^4-a^2x^2-b^2x^2$. Coincide (el determinante es único). sympy (factor): $x^2(x^2-a^2-b^2-c^2)$.

**Comentario.** La forma factorizada permite ver enseguida cuándo $M$ es singular: $x=0$ o $x^2=a^2+b^2+c^2$ (útil si luego piden el rango o la inversa). E deja el resultado sin factorizar.

**Receta.** Desarrolla por la línea con más ceros; si un menor $3\times3$ vuelve a tener una línea casi nula, repite el desarrollo en vez de usar Sarrus. Factoriza el resultado.

**Error típico.** Errores de signo en el adjunto de un elemento fuera de la diagonal (aquí $A_{14}$ lleva $-$), o equivocarse en qué fila/columna se tacha.

**Teoría:** U p.24 (desarrollo por filas y columnas), p.26 (Sarrus).

---

## Ejercicio 1.29 (E p.28)

> **Enunciado.** El rango de la matriz $\begin{pmatrix}1&2&0\\ 1&2+a&1\\ 2&4+a&1+a\end{pmatrix}$ es: A) 1 si $a=0$. B) 3 si $a\neq0$. C) 2 si $a=0$.

(Opciones comprobadas en la imagen de E p.28: solo B lleva «$\neq$».)

**Solución (vía determinante y menores).**

1. **Determinante con reemplazos** (no lo cambian, U p.27):
$$\begin{pmatrix}1&2&0\\ 1&2+a&1\\ 2&4+a&1+a\end{pmatrix}\xrightarrow{F_2\to F_2-F_1}\begin{pmatrix}1&2&0\\ 0&a&1\\ 2&4+a&1+a\end{pmatrix}\xrightarrow{F_3\to F_3-2F_1}\begin{pmatrix}1&2&0\\ 0&a&1\\ 0&a&1+a\end{pmatrix}\xrightarrow{F_3\to F_3-F_2}\begin{pmatrix}1&2&0\\ 0&a&1\\ 0&0&a\end{pmatrix}.$$
La última es triangular, así que (U p.26) $\lvert A\rvert=1\cdot a\cdot a=a^2$.

2. **Caso $a\neq0$.** $\lvert A\rvert=a^2\neq0$: hay un menor de orden 3 no nulo (el propio $\lvert A\rvert$), luego $\operatorname{rang}A=3$ (U p.27). **B es verdadera.**

3. **Caso $a=0$.** $\lvert A\rvert=0$, así que $\operatorname{rang}A\le2$. Para ver si es 2 basta **un** menor de orden 2 no nulo. Con $a=0$, $A=\begin{pmatrix}1&2&0\\ 1&2&1\\ 2&4&1\end{pmatrix}$ y el menor de filas 1–2, columnas 1 y 3 es $\begin{vmatrix}1&0\\ 1&1\end{vmatrix}=1\neq0$. Luego $\operatorname{rang}A=2$ (U p.27). **C es verdadera y A es falsa.**

4. **Comprobación por escalonada** (U p.22): con $a=0$ la última matriz del paso 1 es $\begin{pmatrix}1&2&0\\ 0&0&1\\ 0&0&0\end{pmatrix}$, ya escalonada, con 2 filas no nulas: rango 2. Con $a\neq0$ tiene 3 pivotes ($1,a,a$): rango 3. sympy: rango 2 para $a=0$ y 3 para $a=\pm1$; $\det=a^2$.

**Respuesta:** B y C son verdaderas; A es falsa. (Es un test atípico con **dos** opciones correctas; E lo reconoce explícitamente.)

**Nota sobre E.** E dice que «las únicas posibilidades de menores de orden 2 no nulos» vienen de tres submatrices concretas (con valores 1, 0 y 2). Es impreciso: una matriz $3\times3$ tiene $3\cdot3=9$ menores de orden 2, y hay más no nulos (por ejemplo, filas 2–3, columnas 2–3 con $a=0$: $\begin{vmatrix}2&1\\ 4&1\end{vmatrix}=-2$). No afecta a la conclusión, porque basta encontrar **uno** no nulo. Además, la escalonada que E ya tenía resuelve el caso $a=0$ sin menores.

**Receta.** Para el rango de una matriz cuadrada con parámetro: calcula el determinante (factorizado); donde no se anula, rango máximo; en cada valor que lo anula, sustituye y busca un menor no nulo del orden inmediatamente inferior (o escalona).

**Error típico.** Concluir «si $\det=0$ entonces rango 1» o «rango 0»: $\det=0$ solo dice rango $<n$; hay que bajar orden a orden. Otro: dividir por $a$ al escalonar sin separar el caso $a=0$.

**Teoría:** U p.22 (rango por escalonada), p.26 (triangular), p.27 (reemplazo no cambia det; rango = mayor orden de un menor no nulo), p.28 (Ejemplo 1.24, mismo método).

---

## Ejemplos propios

### Ejemplo propio 1 (fácil) — Sarrus frente a cofactores

> Calcula $\det M$ con $M=\begin{pmatrix}2&1&3\\ 0&-1&4\\ 1&2&1\end{pmatrix}$ por la regla de Sarrus y por desarrollo por la primera columna, y comprueba que coinciden.

1. **Sarrus** (U p.26), término a término:
   - $+a_{11}a_{22}a_{33}=2\cdot(-1)\cdot1=-2$; $+a_{21}a_{32}a_{13}=0\cdot2\cdot3=0$; $+a_{12}a_{23}a_{31}=1\cdot4\cdot1=4$;
   - $-a_{13}a_{22}a_{31}=-3\cdot(-1)\cdot1=+3$; $-a_{23}a_{32}a_{11}=-4\cdot2\cdot2=-16$; $-a_{21}a_{12}a_{33}=-0=0$;
   - suma: $-2+0+4+3-16+0=-11$.
2. **Desarrollo por $C_1=(2,0,1)^t$** (tiene un cero; U p.24): $\det M=2A_{11}+0\cdot A_{21}+1\cdot A_{31}$ con
   $A_{11}=+\begin{vmatrix}-1&4\\ 2&1\end{vmatrix}=-1-8=-9$ y $A_{31}=+\begin{vmatrix}1&3\\ -1&4\end{vmatrix}=4+3=7$, luego $\det M=2(-9)+7=-11$.
3. Coinciden: $\boxed{\det M=-11}$ (sympy: $-11$). Como $\det M\neq0$, $M$ es regular (U p.27).

**Moraleja:** Sarrus solo sirve para $3\times3$; el desarrollo por adjuntos sirve para cualquier orden y aprovecha los ceros.

### Ejemplo propio 2 (medio) — singularidad por fila proporcional

> Sin desarrollar, justifica que $N=\begin{pmatrix}1&2&-1\\ 3&0&2\\ -2&-4&2\end{pmatrix}$ no es invertible y calcula su rango.

1. **Observación:** $F_3=(-2,-4,2)=-2\,(1,2,-1)=-2F_1$.
2. **Determinante:** la operación $F_3\to F_3+2F_1$ es un reemplazo, no cambia el determinante (U p.27), y produce una fila de ceros; una matriz con fila de ceros tiene determinante 0 (U p.26). Luego $\det N=0$.
3. **Consecuencia:** $\det N=0\Rightarrow N$ no es regular, no tiene inversa (U p.27).
4. **Rango:** $\operatorname{rang}N<3$. El menor $\begin{vmatrix}1&2\\ 3&0\end{vmatrix}=-6\neq0$, luego $\operatorname{rang}N=2$ (U p.27).

(sympy: $\det N=0$, $\operatorname{rang}N=2$.) **Regla:** dos filas (o columnas) proporcionales $\Rightarrow\det=0$, justificándolo con un reemplazo + fila de ceros.

### Ejemplo propio 3 (medio) — seguir el determinante a través de operaciones elementales

> Sea $A=\begin{pmatrix}1&2&0\\ 3&1&2\\ 0&1&1\end{pmatrix}$. Se hacen, en este orden, $F_1\leftrightarrow F_2$, $F_3\to3F_3$, $F_2\to F_2-2F_1$, obteniendo $B$. Sin calcular $\det B$ directamente, halla $\det B$, $\det B^t$ y $\det(2A)$.

1. $\det A$ (Sarrus): $1\cdot1\cdot1+3\cdot1\cdot0+2\cdot2\cdot0-0\cdot1\cdot0-2\cdot1\cdot1-3\cdot2\cdot1=1-2-6=-7$.
2. Factores (U p.27): permutar $\to-1$; multiplicar $F_3$ por 3 $\to3$; reemplazo $\to1$. Total: $(-1)\cdot3\cdot1=-3$.
3. $\det B=-3\cdot(-7)=\boxed{21}$; $\det B^t=\det B=21$ (U p.26); $\det(2A)=2^3\det A=-56$ (U p.26: $\det(\alpha A)=\alpha^n\det A$, **no** $2\det A$).
4. Comprobación: $B=\begin{pmatrix}3&1&2\\ -5&0&-4\\ 0&3&3\end{pmatrix}$; sympy: $\det B=21$, $\det(2A)=-56$.

Observa que el reemplazo $F_2\to F_2-2F_1$ **no** introduce el factor $-2$ (compárese con el distractor C del Ej. 1.26).

### Ejemplo propio 4 (más difícil) — determinante con parámetro y rango

> Discute, según $a\in\mathbb R$, el rango de $P=\begin{pmatrix}1&1&1\\ 1&a&1\\ 1&1&a\end{pmatrix}$ y, para $a=2$, calcula $P^{-1}$ por adjuntos.

1. **Determinante con reemplazos** $F_2\to F_2-F_1$, $F_3\to F_3-F_1$ (no cambian el det, U p.27): $\begin{pmatrix}1&1&1\\ 0&a-1&0\\ 0&0&a-1\end{pmatrix}$, triangular, $\det P=(a-1)^2$ (U p.26).
2. **$a\neq1$:** $\det P\neq0\Rightarrow\operatorname{rang}P=3$.
3. **$a=1$:** todas las filas son $(1,1,1)$; todos los menores de orden 2 valen $1\cdot1-1\cdot1=0$ y hay un menor de orden 1 no nulo ($1$), así que $\operatorname{rang}P=1$ (U p.27). (Aquí el rango baja **dos** unidades: por eso hay que comprobar los menores de orden 2, no suponer rango 2.)
4. **$a=2$:** $\det P=1$. Adjuntos: $A_{11}=\begin{vmatrix}2&1\\ 1&2\end{vmatrix}=3$, $A_{12}=-\begin{vmatrix}1&1\\ 1&2\end{vmatrix}=-1$, $A_{13}=\begin{vmatrix}1&2\\ 1&1\end{vmatrix}=-1$, $A_{21}=-\begin{vmatrix}1&1\\ 1&2\end{vmatrix}=-1$, $A_{22}=\begin{vmatrix}1&1\\ 1&2\end{vmatrix}=1$, $A_{23}=-\begin{vmatrix}1&1\\ 1&1\end{vmatrix}=0$, $A_{31}=\begin{vmatrix}1&1\\ 2&1\end{vmatrix}=-1$, $A_{32}=-\begin{vmatrix}1&1\\ 1&1\end{vmatrix}=0$, $A_{33}=\begin{vmatrix}1&1\\ 1&2\end{vmatrix}=1$.
   Así $\operatorname{Adj}P=\begin{pmatrix}3&-1&-1\\ -1&1&0\\ -1&0&1\end{pmatrix}$ (simétrica, porque $P$ lo es), y $P^{-1}=\frac11(\operatorname{Adj}P)^t=\begin{pmatrix}3&-1&-1\\ -1&1&0\\ -1&0&1\end{pmatrix}$.
5. Comprobación: $PP^{-1}=I_3$ (sympy: $\det P=(a-1)^2$; rango 1 para $a=1$ y 3 para $a=2$; $P^{-1}$ coincide).
