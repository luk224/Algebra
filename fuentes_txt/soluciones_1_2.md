# Soluciones — Sección 1.2 Álgebra matricial (Ejercicios 1.6–1.20 de E)

**Fuentes.** E = *Ejercicios de Álgebra para Ingenieros* (página impresa = PDF − 4); U = *Álgebra para Ingenieros* (página impresa = PDF − 6). Todos los cálculos se han comprobado con `sympy` (`Matrix`, `**`, `.rref()`, `.rank()`, `.inv()`, `.det()`).

**Herramientas de teoría que se usan (todas en U §1.2, pp. 9–22):**

| Resultado | Dónde |
|---|---|
| Suma, producto por escalar y sus propiedades | U §1.2.2 p.11–12 |
| Producto de matrices $p_{ij}=\sum_k a_{ik}b_{kj}$; asociativa, distributivas, $AI_n=I_mA=A$ | U §1.2.2 p.12 |
| El producto **no es conmutativo**; traspuesta y $(AB)^t=B^tA^t$ | U §1.2.2 p.13 |
| Inversa: $AB=BA=I_n$; regular/singular; $(AB)^{-1}=B^{-1}A^{-1}$, $(A^{-1})^t=(A^t)^{-1}$ | U §1.2.2 p.13 |
| Operaciones elementales por filas (3 tipos) | U §1.2.2 p.14 |
| Def. 1.1 matrices equivalentes por filas (y, «análogamente», por columnas) | U p.15 |
| Def. 1.2 matriz elemental | U §1.2.3 p.15 |
| Las matrices elementales son regulares y su inversa es la elemental de la operación «deshacer» | U p.16 |
| Hacer una operación por filas en $A$ = calcular $EA$; por columnas = calcular $AF$ | U p.16 (texto y nota al margen) |
| Teorema 1.1 (matriz de paso, $(A\mid I_m)\to(B\mid E)\Rightarrow B=EA$) y algoritmo de la inversa | U p.18 |
| «No es posible transformar una matriz no regular en la identidad» | U p.19 |
| Teorema 1.2 (equivalentes por filas $\iff B=QA$, $Q$ regular) | U p.19 |
| Def. 1.3 escalonada / pivotes normalizados / escalonada reducida; Def. 1.4 | U §1.2.4 p.20 |
| La escalonada no es única, la reducida sí | U p.21 |
| $A$ regular $\iff$ su reducida es $I_n$; Def. 1.5 rango; Teorema 1.3; $A$ regular $\iff \operatorname{rang}(A)=n$ | U p.22 |
| (Fuera de §1.2) $\det A=\det A^t$; rango = mayor orden de un menor no nulo | U §1.3 p.26 y p.27 |
| (Fuera de §1.2) Def. 4.3 matrices equivalentes $B=MAN$; Teorema 4.1 | U §4.1.2 p.146 |

> Nota de extracción: en `ejercicios.txt` (modo `-layout`) varias matrices salen desordenadas; los enunciados de 1.8, 1.13 y 1.14 se han contrastado con `pdftotext -raw` sobre el PDF.

**Errores u omisiones detectados en E** (detallados en cada ejercicio): 1.10 (menciona $A^{-1}$, que no existe; hipótesis superflua), 1.11 (concluye «A) es falsa» cuando su propio argumento la prueba cierta), 1.13 (errata en la tabla al margen de tipos de elementales), 1.16 (nota al margen falsa sobre la inversa por filas), 1.18 (afirma que $A_4$ es escalonada y no lo es).

---

## Ejercicio 1.6 (E p.11)

> **Enunciado.** Calcúlese $A^3$ sabiendo que $A$ es la matriz cuyas filas son: $(0,\cos x,\operatorname{sen}x)$, $(\cos x,0,-1)$ y $(\operatorname{sen}x,1,0)$.

Escribimos $c=\cos x$, $s=\operatorname{sen}x$:
$$A=\begin{pmatrix}0&c&s\\ c&0&-1\\ s&1&0\end{pmatrix}.$$

**Solución.**

1. **Qué significa $A^3$.** Es $A\cdot A\cdot A$. Como el producto es asociativo (U p.12), da igual calcular $(AA)A$ o $A(AA)$; calculamos primero $A^2$ y luego $A\cdot A^2$. El producto existe porque $A$ es cuadrada de orden 3 (U p.12).
2. **Cálculo de $A^2$** con $p_{ij}=\sum_k a_{ik}a_{kj}$ (fila $i$ de la primera por columna $j$ de la segunda):
   - Fila 1 $(0,c,s)$: por col. 1 $(0,c,s)^t$: $0+c^2+s^2$; por col. 2 $(c,0,1)^t$: $0+0+s=s$; por col. 3 $(s,-1,0)^t$: $0-c+0=-c$.
   - Fila 2 $(c,0,-1)$: col. 1: $0+0-s=-s$; col. 2: $c^2+0-1$; col. 3: $cs+0+0=cs$.
   - Fila 3 $(s,1,0)$: col. 1: $0+c+0=c$; col. 2: $sc+0+0=sc$; col. 3: $s^2-1$.
3. **Simplificamos con $s^2+c^2=1$** (identidad trigonométrica fundamental): $c^2+s^2=1$, $c^2-1=-s^2$, $s^2-1=-c^2$:
$$A^2=\begin{pmatrix}1&s&-c\\ -s&-s^2&sc\\ c&sc&-c^2\end{pmatrix}.$$
4. **Cálculo de $A^3=A\cdot A^2$**, fila por columna:
   - Fila 1 $(0,c,s)$: col. 1 $(1,-s,c)^t$: $-cs+sc=0$; col. 2 $(s,-s^2,sc)^t$: $-cs^2+s^2c=0$; col. 3 $(-c,sc,-c^2)^t$: $c^2s-sc^2=0$.
   - Fila 2 $(c,0,-1)$: col. 1: $c-c=0$; col. 2: $cs-sc=0$; col. 3: $-c^2+c^2=0$.
   - Fila 3 $(s,1,0)$: col. 1: $s-s=0$; col. 2: $s^2-s^2=0$; col. 3: $-sc+sc=0$.
5. **Resultado:** $A^3=0_3$ (la matriz nula de orden 3) **para todo** $x\in\mathbb R$.

Comprobado con sympy: `simplify(A**3) == zeros(3)`.

**Receta.** Para una potencia $A^n$: calcula $A^2$, simplifica **antes** de seguir (aquí con $s^2+c^2=1$) y usa $A^{k+1}=A\cdot A^k$; el producto es asociativo, así que el orden de agrupación no importa.

**Error típico.** Elevar al cubo cada elemento ($\cos^3x$, …). $A^3$ es el producto matricial, no la potencia elemento a elemento. Otro error: no simplificar $A^2$ y arrastrar expresiones enormes.

**Teoría:** producto de matrices y asociatividad, U §1.2.2 p.12.

---

## Ejercicio 1.7 (E p.11)

> **Enunciado.** $A$ es la matriz de filas $(0,a,0)$, $(0,0,b)$, $(c,0,0)$ siendo $a,b,c\in\mathbb R$. De entre las opciones siguientes, se pide elegir la correcta: A) $A^3$ es una matriz escalar. B) $A^n$ es una matriz escalar para todo $n\in\mathbb N$.

**Definición previa.** Una *matriz escalar* es una matriz diagonal con todos los elementos de la diagonal iguales, es decir, $\lambda I_n$ (la define E en nota al margen de p.11; U p.10–11 solo menciona «diagonal» entre los tipos de matrices).

**Solución.**

1. $A=\begin{pmatrix}0&a&0\\0&0&b\\c&0&0\end{pmatrix}$. Calculamos $A^2=AA$ por la fórmula del producto (U p.12):
$$A^2=\begin{pmatrix}0&0&ab\\ bc&0&0\\ 0&ac&0\end{pmatrix}.$$
   (Ej.: $p_{13}=0\cdot0+a\cdot b+0\cdot0=ab$; $p_{21}=0+0+b\cdot c=bc$; $p_{32}=c\cdot a=ac$; el resto da 0.)
2. $A^3=A\cdot A^2$:
$$A^3=\begin{pmatrix}0&a&0\\0&0&b\\c&0&0\end{pmatrix}\begin{pmatrix}0&0&ab\\ bc&0&0\\ 0&ac&0\end{pmatrix}=\begin{pmatrix}abc&0&0\\0&abc&0\\0&0&abc\end{pmatrix}=abc\,I_3.$$
3. **Opción A: cierta.** $A^3=abc\,I_3$ es diagonal con diagonal constante, luego escalar, **para cualesquiera** $a,b,c$ (si $abc=0$ da $0_3=0\cdot I_3$, que también es escalar).
4. **Opción B: falsa en general.** Basta un contraejemplo: para $n=1$, $A^1=A$ tiene $a$ fuera de la diagonal, así que si $a\neq0$ no es ni siquiera diagonal. (Más aún, $A^{3k+1}=(abc)^kA$ y $A^{3k+2}=(abc)^kA^2$ no son escalares salvo casos degenerados; B solo es cierta si $a=b=c=0$.)

Comprobado con sympy (`A**3 == a*b*c*eye(3)`; `A**4` no es diagonal).

**Receta.** Para decidir sobre $A^n$, calcula $A^2, A^3,\dots$ hasta ver un patrón (aquí $A^3=\lambda I$, y entonces $A^{3k+r}=\lambda^kA^r$). Una afirmación «para todo $n$» se refuta con **un** $n$.

**Error típico.** Generalizar de $A^3$ a $A^n$: que una potencia sea escalar no implica que lo sean todas.

**Teoría:** producto de matrices, U §1.2.2 p.12; tipos de matrices, U p.10–11.

---

## Ejercicio 1.8 (E p.12)

> **Enunciado.** Se pide determinar la opción cierta, sabiendo que las matrices $A$ y $B$ satisfacen $A+B=\begin{pmatrix}3&2\\7&0\end{pmatrix}$ y $A-B=\begin{pmatrix}2&3\\-1&0\end{pmatrix}$.
> A) $A^2+B^2=\begin{pmatrix}12&6\\ \frac{19}{2}&\frac{11}{2}\end{pmatrix}$. B) $(A+B)^2=\begin{pmatrix}9&4\\49&0\end{pmatrix}$. C) $A^2-B^2=\begin{pmatrix}4&9\\14&21\end{pmatrix}$.

**Solución.**

1. **Despejar $A$ y $B$.** Sumando y restando las dos igualdades, y usando las propiedades de la suma (asociativa, conmutativa, opuesto; U p.11) y del producto por escalar (distributivas; U p.12): $(A+B)+(A-B)=2A$ y $(A+B)-(A-B)=2B$. Luego
$$A=\tfrac12\begin{pmatrix}5&5\\6&0\end{pmatrix}=\begin{pmatrix}\frac52&\frac52\\3&0\end{pmatrix},\qquad B=\tfrac12\begin{pmatrix}1&-1\\8&0\end{pmatrix}=\begin{pmatrix}\frac12&-\frac12\\4&0\end{pmatrix}.$$
2. **Potencias.** $A^2=\begin{pmatrix}\frac{55}{4}&\frac{25}{4}\\ \frac{15}{2}&\frac{15}{2}\end{pmatrix}$, $B^2=\begin{pmatrix}-\frac74&-\frac14\\ 2&-2\end{pmatrix}$ (p. ej. $(A^2)_{11}=\frac52\cdot\frac52+\frac52\cdot3=\frac{25}{4}+\frac{30}{4}=\frac{55}{4}$).
3. **Opción A.** $A^2+B^2=\begin{pmatrix}\frac{48}{4}&\frac{24}{4}\\ \frac{19}{2}&\frac{11}{2}\end{pmatrix}=\begin{pmatrix}12&6\\frac{19}{2}&\frac{11}{2}\end{pmatrix}$. **Cierta.**
4. **Opción B.** $(A+B)^2=(A+B)(A+B)=\begin{pmatrix}3&2\\7&0\end{pmatrix}\begin{pmatrix}3&2\\7&0\end{pmatrix}=\begin{pmatrix}23&6\\21&14\end{pmatrix}\ne\begin{pmatrix}9&4\\49&0\end{pmatrix}$. **Falsa.** (La matriz de la opción B es la que resulta de elevar **cada elemento** al cuadrado: trampa deliberada.)
5. **Opción C.** $A^2-B^2=\begin{pmatrix}\frac{31}{2}&\frac{13}{2}\\ \frac{11}{2}&\frac{19}{2}\end{pmatrix}$. **Falsa.** (La matriz de la opción C es $(A+B)(A-B)=\begin{pmatrix}4&9\\14&21\end{pmatrix}$: otra trampa, porque $(A+B)(A-B)=A^2-AB+BA-B^2$, que solo es $A^2-B^2$ si $AB=BA$. Aquí $AB=\begin{pmatrix}\frac{45}{4}&-\frac54\\frac32&-\frac32\end{pmatrix}\ne BA=\begin{pmatrix}-\frac14&\frac54\\10&10\end{pmatrix}$.)

Comprobado con sympy. (Observación: para decidir **solo** entre las opciones basta el paso 4 y comparar $A^2+B^2$; no hace falta hallar $A$ y $B$ para descartar B.)

**Receta.** Si te dan $A+B$ y $A-B$, despeja $A=\frac12[(A+B)+(A-B)]$, $B=\frac12[(A+B)-(A-B)]$. Para desarrollar productos usa **solo** la distributiva: $(A+B)^2=A^2+AB+BA+B^2$.

**Error típico.** Aplicar identidades notables de números: $(A+B)^2=A^2+2AB+B^2$ o $A^2-B^2=(A+B)(A-B)$ son **falsas** en general porque el producto no es conmutativo (U p.13). Y elevar al cuadrado elemento a elemento.

**Teoría:** U §1.2.2 p.11–13.

---

## Ejercicio 1.9 (E p.13)

> **Enunciado.** Sean $A=\begin{pmatrix}1&0\\0&2\end{pmatrix}$, $B=\begin{pmatrix}2&0\\0&3\end{pmatrix}$. Se pide calcular la suma $S=A+AB+AB^2+AB^3+\cdots+AB^n$.
> A) $S=\begin{pmatrix}2^{n+1}-1&0\\0&\frac{3^{n+1}-1}{2}\end{pmatrix}$. B) $S=\begin{pmatrix}2^{n+1}-1&0\\0&3^{n+1}-1\end{pmatrix}$.

**Solución.**

1. **Sacar factor común $A$ por la izquierda.** Por la distributiva por la izquierda (U p.12) y $A=AI$ (U p.12): $S=A(I+B+B^2+\cdots+B^n)$. Ojo: $A$ se saca **por la izquierda** porque en todos los sumandos está a la izquierda.
2. **Potencias de una diagonal.** Afirmamos $B^k=\begin{pmatrix}2^k&0\\0&3^k\end{pmatrix}$. Por inducción: para $k=1$ es cierto; si vale para $k$, $B^{k+1}=B^kB=\begin{pmatrix}2^k\cdot2&0\\0&3^k\cdot3\end{pmatrix}$ (fórmula del producto). Para $k=0$, $B^0=I$.
3. **Sumar.** La suma de diagonales es diagonal, sumando elemento a elemento (U p.11):
$$I+B+\cdots+B^n=\begin{pmatrix}1+2+\cdots+2^n&0\\0&1+3+\cdots+3^n\end{pmatrix}.$$
4. **Progresiones geométricas.** $1+r+\cdots+r^n=\dfrac{r^{n+1}-1}{r-1}$ ($n+1$ términos, $r\neq1$). Así $1+2+\cdots+2^n=2^{n+1}-1$ y $1+3+\cdots+3^n=\dfrac{3^{n+1}-1}{2}$.
5. **Multiplicar por $A$:**
$$S=\begin{pmatrix}1&0\\0&2\end{pmatrix}\begin{pmatrix}2^{n+1}-1&0\\0&\frac{3^{n+1}-1}{2}\end{pmatrix}=\begin{pmatrix}2^{n+1}-1&0\\0&3^{n+1}-1\end{pmatrix}.$$
   **Opción B cierta; A falsa** (A es la suma $I+B+\dots+B^n$ olvidando multiplicar por $A$).
6. **Comprobación** con $n=1$: $S=A+AB=\begin{pmatrix}1&0\\0&2\end{pmatrix}+\begin{pmatrix}2&0\\0&6\end{pmatrix}=\begin{pmatrix}3&0\\0&8\end{pmatrix}$, y B da $\begin{pmatrix}2^2-1&0\\0&3^2-1\end{pmatrix}=\begin{pmatrix}3&0\\0&8\end{pmatrix}$ ✓ (sympy lo verifica para $n=0,\dots,4$).

**Receta.** Suma de potencias: saca factor común respetando el lado; si las matrices son diagonales, trabaja entrada a entrada y aplica la fórmula de la progresión geométrica. Comprueba siempre con $n=0$ o $n=1$.

**Error típico.** Olvidar el factor $A$ (lleva a la opción A) o sacarlo por el lado equivocado ($S=(I+\cdots+B^n)A$): aquí daría lo mismo porque las diagonales conmutan, pero en general no.

**Teoría:** U §1.2.2 p.11–12.

---

## Ejercicio 1.10 (E p.14)

> **Enunciado.** Suponiendo que $I_n-A$ es una matriz regular siendo $A\in\mathcal M_{n\times n}$, calcúlese la matriz inversa de $I-A$ en función de las potencias de $A$ sabiendo que $A^3=0$.

**Solución** (más directa que la de E).

1. **Idea (analogía con números):** $1-x^3=(1-x)(1+x+x^2)$. Si $x^3=0$, entonces $(1-x)(1+x+x^2)=1$. Probamos el candidato $C=I+A+A^2$.
2. **Por la definición de inversa** (U p.13) hay que comprobar $(I-A)C=I$ **y** $C(I-A)=I$.
3. $(I-A)(I+A+A^2)=I+A+A^2-A-A^2-A^3=I-A^3=I$, usando la distributiva (U p.12), $IA=AI=A$ (U p.12) y $A^3=0$.
4. $(I+A+A^2)(I-A)=I-A+A-A^2+A^2-A^3=I-A^3=I$ (mismo razonamiento).
5. **Conclusión:** $(I-A)^{-1}=I+A+A^2$ (y es la única inversa, U p.13).

**Comentarios sobre E.**
- E dice «utilizando $A^{-1}$»: es una errata, $A$ **no** puede ser regular, pues si existiera $A^{-1}$, multiplicando $A^3=0$ por $(A^{-1})^3$ saldría $I=0$. Lo que E usa en realidad es $(I-A)^{-1}$.
- La hipótesis «$I_n-A$ regular» es innecesaria: los pasos 3–4 **demuestran** que lo es.
- La deducción de E ($(I-A)^2=(I-A)^{-1}-3A$, …) es correcta pero enrevesada; comprobar el candidato es suficiente y es lo que se espera en examen.

Comprobado con sympy con $A=\begin{pmatrix}0&1&2\\0&0&3\\0&0&0\end{pmatrix}$ ($A^3=0$): $(I-A)^{-1}=I+A+A^2=\begin{pmatrix}1&1&5\\0&1&3\\0&0&1\end{pmatrix}$.

**Receta.** Si $A^k=0$, entonces $(I-A)^{-1}=I+A+\cdots+A^{k-1}$; se justifica multiplicando por ambos lados y viendo que queda $I-A^k=I$.

**Error típico.** Comprobar solo un producto ($(I-A)C=I$) sin mencionar el otro, o escribir $\frac{1}{I-A}$: no existe la «división» de matrices.

**Teoría:** inversa, U §1.2.2 p.13; propiedades del producto, U p.12.

---

## Ejercicio 1.11 (E p.14)

> **Enunciado.** Si $A$ y $B$ son matrices cuadradas de orden $n$ tales que $AB=A$ y $BA=B$, se verifica: A) Si $A$ es regular, entonces $B=I_n$. B) $A^2=A$ y $B^2=B$.

**Solución.**

1. **Opción A.** Si $A$ es regular existe $A^{-1}$ (U p.13). Multiplicando $AB=A$ por la izquierda por $A^{-1}$: $A^{-1}(AB)=A^{-1}A$. Por asociatividad (U p.12), $(A^{-1}A)B=I$, es decir $IB=I$, luego $B=I_n$. **A es cierta.**
2. **Opción B, $A^2=A$.** Partimos de $BA=B$ y multiplicamos por la izquierda por $A$: $A(BA)=AB$. Asociatividad: $(AB)A=AB$. Sustituyendo $AB=A$ en ambos lados: $AA=A$, o sea $A^2=A$.
3. **Opción B, $B^2=B$.** Partimos de $AB=A$ y multiplicamos por la izquierda por $B$: $B(AB)=BA\Rightarrow(BA)B=BA\Rightarrow BB=B$. **B es cierta.**
4. **Ambas opciones son ciertas.**

**Error en E.** La solución de E escribe «Si existe $A^{-1}$ entonces $A^{-1}AB=A^{-1}A$. Por tanto $B=I$ y **A) es falsa**»: es una contradicción; su propio razonamiento prueba que A) es **cierta**.

**Receta.** En igualdades matriciales, multiplica **por el mismo lado** en ambos miembros y usa la asociatividad para reagrupar hasta poder sustituir las hipótesis.

**Error típico.** «Simplificar» $A$ en $AB=A$ para concluir $B=I$ sin saber que $A$ es regular (con $A$ singular es falso; p. ej. $A=B=\begin{pmatrix}1&0\\0&0\end{pmatrix}$ cumple $AB=A$, $BA=B$ y $B\ne I$). También multiplicar un miembro por la izquierda y el otro por la derecha.

**Teoría:** U §1.2.2 p.12–13.

---

## Ejercicio 1.12 (E p.15)

> **Enunciado.** Se pide elegir las respuestas correctas: A) Las matrices elementales son cuadradas. B) Las matrices elementales son regulares. C) Las matrices elementales permiten calcular la matriz inversa de una matriz regular.

**Solución.**

1. **A) Cierta.** Por la Def. 1.2 (U p.15), una matriz elemental es «la matriz **cuadrada** que resulta al realizar una sola operación elemental por filas en la matriz identidad». Se parte de $I_n$ (cuadrada) y una operación por filas no cambia el tamaño.
2. **B) Cierta.** U p.16: «Las matrices elementales son matrices regulares». Motivo: cada operación se deshace con otra del mismo tipo ($F_i\leftrightarrow F_j$ consigo misma; $F_i\to\alpha F_i$ con $F_i\to\frac1\alpha F_i$, posible porque $\alpha\ne0$; $F_i\to F_i+\alpha F_j$ con $F_i\to F_i-\alpha F_j$), y la elemental de la operación inversa es la matriz inversa.
3. **C) Cierta.** Si $A$ es regular, su escalonada reducida es $I_n$ (U p.22), así que existen operaciones $O_1,\dots,O_p$ con $(A\mid I_n)\to(I_n\mid E)$. Por el Teorema 1.1 (U p.18), $I_n=EA$ con $E=E_p\cdots E_1$ producto de elementales, y por el algoritmo de U p.18, $E=A^{-1}$.

**Todas son ciertas.**

**Receta.** Para preguntas de verdadero/falso sobre definiciones, cita la definición literal (aquí Def. 1.2) y la propiedad del libro que lo garantiza.

**Error típico.** Olvidar que en $F_i\to\alpha F_i$ se exige $\alpha\ne0$ (U p.14); con $\alpha=0$ la matriz no sería regular ni elemental.

**Teoría:** U Def. 1.2 p.15; p.16; Teorema 1.1 y algoritmo p.18; p.22.

---

## Ejercicio 1.13 (E p.15)

> **Enunciado.** Se pide justificar si las siguientes matrices son o no son elementales:
> $A_1=\begin{pmatrix}1&0\\0&3\end{pmatrix}$, $A_2=\begin{pmatrix}1&2&0\\0&1&0\\0&0&1\end{pmatrix}$, $A_3=\begin{pmatrix}1&0&0\\0&0&1\\0&1&2\\0&0&1\end{pmatrix}$, $A_4=\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix}$, $A_5=\begin{pmatrix}1&0&5&1\\0&1&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix}$, $A_6=\begin{pmatrix}2&1&0\\0&0&0\\0&0&1\end{pmatrix}$.

**Criterio (Def. 1.2, U p.15).** $M$ es elemental si y solo si es cuadrada y se obtiene de $I_n$ con **una sola** operación elemental por filas. Cada tipo deja una «huella» reconocible en $I_n$:
- $F_i\leftrightarrow F_j$: los unos de la diagonal en $ii$, $jj$ pasan a 0 y aparecen unos en $ij$ y $ji$;
- $F_i\to\alpha F_i$ ($\alpha\ne0$): cambia **un** elemento de la diagonal, que pasa a valer $\alpha$;
- $F_i\to F_i+\alpha F_j$ ($i\ne j$): cambia **un** elemento fuera de la diagonal, el $ij$, que pasa a $\alpha$.

**Solución.**

1. **$A_1$: sí.** Es $I_2$ con el elemento $(2,2)$ cambiado a $3\ne0$: operación $F_2\to3F_2$.
2. **$A_2$: sí.** Es $I_3$ con el elemento $(1,2)$ cambiado a 2: operación $F_1\to F_1+2F_2$.
3. **$A_3$: no.** Es $4\times3$, no cuadrada; las elementales son cuadradas (Def. 1.2).
4. **$A_4$: sí.** Es $I_3$ con las filas 1 y 3 intercambiadas: $F_1\leftrightarrow F_3$.
5. **$A_5$: no.** Difiere de $I_4$ en **dos** elementos fuera de la diagonal, $(1,3)=5$ y $(1,4)=1$, con la diagonal intacta. Ningún tipo de operación produce esa huella (el tipo 3 cambia uno solo; los tipos 1 y 2 alteran la diagonal). Es producto de dos elementales: $A_5=E(F_1\to F_1+F_4)\,E(F_1\to F_1+5F_3)$ (comprobado con sympy).
6. **$A_6$: no.** Tiene una fila nula, luego no es regular (una escalonada suya tiene 2 filas no nulas, rango $2<3$, ver Ej. 1.18, y U p.22: regular $\iff$ rango $n$); pero toda elemental es regular (U p.16). También se ve directamente: difiere de $I_3$ en tres posiciones.

**Respuesta:** son elementales $A_1,A_2,A_4$; no lo son $A_3,A_5,A_6$.

**Nota sobre E.** En la tabla al margen de E p.15, la operación de tipo 2 aparece como «multiplicar: $F_i\leftrightarrow\alpha F_1$ … con $\alpha=0$»: debe leerse $F_i\to\alpha F_i$ con $\alpha\ne0$ (errata/pérdida del símbolo en la extracción).

**Receta.** Compara la matriz con $I_n$: si es cuadrada y la diferencia es exactamente la huella de **una** operación, es elemental (y di cuál).

**Error típico.** Aceptar $A_5$ porque «solo tiene cosas en una fila»: son dos operaciones. O aceptar $A_6$ por parecer «casi» la identidad.

**Teoría:** U Def. 1.2 p.15; p.16; p.22.

---

## Ejercicio 1.14 (E p.16)

> **Enunciado.** Dada $A=\begin{pmatrix}2&2&3\\1&2&5\\3&0&1\\5&3&1\end{pmatrix}$, se pide calcular: una matriz escalonada de $A$; una matriz escalonada de $A$ con los pivotes normalizados; la forma escalonada reducida de $A$; y la matriz de paso asociada a cada una de ellas.

**Idea.** Por el Teorema 1.1 (U p.18), si hacemos las operaciones sobre $(A\mid I_4)$ (identidad $4\times4$ porque $A$ tiene 4 filas), al final la parte derecha es la matriz de paso $P$ con $B=PA$.

**Solución.**

1. **Ceros bajo el primer pivote $a_{11}=2$:** $F_2\to F_2-\frac12F_1$, $F_3\to F_3-\frac32F_1$, $F_4\to F_4-\frac52F_1$ (tipo 3; el factor es «elemento a anular / pivote»):
$$\left(\begin{array}{ccc|cccc}2&2&3&1&0&0&0\0&1&\frac72&-\frac12&1&0&0\0&-3&-\frac72&-\frac32&0&1&0\0&-2&-\frac{13}{2}&-\frac52&0&0&1\end{array}\right)$$
2. **Ceros bajo el segundo pivote (1):** $F_3\to F_3+3F_2$, $F_4\to F_4+2F_2$:
$$\left(\begin{array}{ccc|cccc}2&2&3&1&0&0&0\0&1&\frac72&-\frac12&1&0&0\0&0&7&-3&3&1&0\0&0&\frac12&-\frac72&2&0&1\end{array}\right)$$
3. **Cero bajo el tercer pivote (7):** $F_4\to F_4-\frac1{14}F_3$:
$$\left(\begin{array}{ccc|cccc}2&2&3&1&0&0&0\0&1&\frac72&-\frac12&1&0&0\0&0&7&-3&3&1&0\0&0&0&-\frac{23}{7}&\frac{25}{14}&-\frac1{14}&1\end{array}\right)=(A_e\mid P_1).$$
   $A_e$ es escalonada (Def. 1.3, U p.20): cada pivote tiene ceros debajo, cada fila empieza con más ceros que la anterior y la fila nula está al final. $A_e=P_1A$.
4. **Pivotes normalizados:** $F_1\to\frac12F_1$, $F_3\to\frac17F_3$ (tipo 2, $\alpha\neq0$):
$$(A_{en}\mid P_2)=\left(\begin{array}{ccc|cccc}1&1&\frac32&\frac12&0&0&0\0&1&\frac72&-\frac12&1&0&0\0&0&1&-\frac37&\frac37&\frac17&0\0&0&0&-\frac{23}{7}&\frac{25}{14}&-\frac1{14}&1\end{array}\right),\quad A_{en}=P_2A.$$
5. **Escalonada reducida** (ceros **encima** de cada pivote): $F_1\to F_1-F_2$ da $F_1=(1,0,-2\mid 1,-1,0,0)$; luego $F_1\to F_1+2F_3$ y $F_2\to F_2-\frac72F_3$:
$$(A_{er}\mid P_3)=\left(\begin{array}{ccc|cccc}1&0&0&\frac17&-\frac17&\frac27&0\0&1&0&1&-\frac12&-\frac12&0\0&0&1&-\frac37&\frac37&\frac17&0\0&0&0&-\frac{23}{7}&\frac{25}{14}&-\frac1{14}&1\end{array}\right),\quad A_{er}=P_3A.$$
6. **Rango** (Def. 1.5, U p.22): 3 filas no nulas, $\operatorname{rang}(A)=3$.

Comprobado con sympy: $A_e=P_1A$, $A_{en}=P_2A$, $A_{er}=P_3A$, `A.rref()[0]` $=A_{er}$ y $\det P_1=1\neq0$. Coincide con E.

**Observación.** $A_e$, $A_{en}$ y las matrices de paso **no son únicas** (dependen de las operaciones elegidas); $A_{er}$ **sí** es única (U p.21). La última fila de $P$ da una combinación de las filas de $A$ que vale cero: $-\frac{23}{7}F_1+\frac{25}{14}F_2-\frac1{14}F_3+F_4=0$.

**Receta.** Escribe $(A\mid I_m)$; baja columna a columna haciendo ceros bajo cada pivote con $F_i\to F_i-\frac{a_{ik}}{\text{pivote}}F_k$; normaliza dividiendo cada fila por su pivote; sube haciendo ceros encima. Lo que queda a la derecha es la matriz de paso.

**Error típico.** Usar $I_3$ en vez de $I_4$ (la identidad tiene tantas filas como $A$); operar con una fila ya modificada sin darse cuenta; olvidar aplicar la operación también a la parte derecha.

**Teoría:** U Teorema 1.1 p.18; Def. 1.3–1.4 p.20; unicidad de la reducida p.21; Def. 1.5 p.22.

---

## Ejercicio 1.15 (E p.18)

> **Enunciado.** Dada $A=\begin{pmatrix}2&1&3\\0&5&4\\1&7&6\end{pmatrix}$ y las matrices elementales $E_1=\begin{pmatrix}2&0&0\\0&1&0\\0&0&1\end{pmatrix}$, $E_2=\begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix}$ y $E_3=\begin{pmatrix}1&0&0\\0&1&0\\0&3&1\end{pmatrix}$, se pide calcular e interpretar los productos $E_1A,E_2A,E_3A$ (por la izquierda) y $AE_1,AE_2,AE_3$ (por la derecha).

**Solución.**

1. **Identificar cada elemental como operación por filas sobre $I_3$** (Def. 1.2): $E_1$: $F_1\to2F_1$; $E_2$: $F_1\leftrightarrow F_2$; $E_3$: $F_3\to F_3+3F_2$ (el 3 está en la posición $(3,2)$).
2. **Por la izquierda = operación por filas en $A$** (U p.16):
$$E_1A=\begin{pmatrix}4&2&6\\0&5&4\\1&7&6\end{pmatrix}\ (F_1\to2F_1),\qquad E_2A=\begin{pmatrix}0&5&4\\2&1&3\\1&7&6\end{pmatrix}\ (F_1\leftrightarrow F_2),$$
$$E_3A=\begin{pmatrix}2&1&3\\0&5&4\\1&22&18\end{pmatrix}\ (F_3\to F_3+3F_2:\ (1,7,6)+3(0,5,4)).$$
3. **Las mismas matrices vistas como operaciones por columnas sobre $I_3$:** $E_1$: $C_1\to2C_1$; $E_2$: $C_1\leftrightarrow C_2$; $E_3$: $C_2\to C_2+3C_3$ (la columna 2 de $E_3$ es $(0,1,3)^t=e_2+3e_3$). **Atención:** en el tipo 3 los índices «se cruzan»: fila 3 += 3·fila 2 equivale a columna 2 += 3·columna 3.
4. **Por la derecha = operación por columnas en $A$** (U p.16, nota al margen):
$$AE_1=\begin{pmatrix}4&1&3\\0&5&4\\2&7&6\end{pmatrix},\qquad AE_2=\begin{pmatrix}1&2&3\\5&0&4\\7&1&6\end{pmatrix},\qquad AE_3=\begin{pmatrix}2&10&3\\0&17&4\\1&25&6\end{pmatrix}$$
   (en $AE_3$: $C_2=(1,5,7)^t+3(3,4,6)^t=(10,17,25)^t$).

Comprobado con sympy.

**Receta.** $EA$: aplica a las **filas** de $A$ la operación que convierte $I$ en $E$ por filas. $AE$: aplica a las **columnas** de $A$ la operación que convierte $I$ en $E$ por columnas. Si $E$ es de tipo 3 con $\alpha$ en $(i,j)$: por filas $F_i\to F_i+\alpha F_j$; por columnas $C_j\to C_j+\alpha C_i$.

**Error típico.** Creer que $AE_3$ hace $C_3\to C_3+3C_2$ (índices invertidos). Y confundir el orden: el producto no es conmutativo, $EA\ne AE$ en general.

**Teoría:** U Def. 1.2 p.15; p.16.

---

## Ejercicio 1.16 (E p.19)

> **Enunciado.** Calcúlese, si es posible, la inversa de $A=\begin{pmatrix}0&5&-3\\1&0&0\\0&0&1\end{pmatrix}$ mediante operaciones elementales por filas.

**Solución.**

1. **Método (U p.18):** si $(A\mid I_3)\xrightarrow{\text{op. por filas}}(I_3\mid E)$, entonces $E=A^{-1}$. Si en algún momento aparece una fila nula en la parte izquierda, $A$ no es regular (U p.19 y p.22) y se para.
2. $\left(\begin{array}{ccc|ccc}0&5&-3&1&0&0\1&0&0&0&1&0\0&0&1&0&0&1\end{array}\right)\xrightarrow{F_1\leftrightarrow F_2}\left(\begin{array}{ccc|ccc}1&0&0&0&1&0\0&5&-3&1&0&0\0&0&1&0&0&1\end{array}\right)$ — hay que permutar porque $a_{11}=0$ no puede ser pivote.
3. $\xrightarrow{F_2\to\frac15F_2}\left(\begin{array}{ccc|ccc}1&0&0&0&1&0\0&1&-\frac35&\frac15&0&0\0&0&1&0&0&1\end{array}\right)$ (normalizar el pivote).
4. $\xrightarrow{F_2\to F_2+\frac35F_3}\left(\begin{array}{ccc|ccc}1&0&0&0&1&0\0&1&0&\frac15&0&\frac35\0&0&1&0&0&1\end{array}\right)$ (cero encima del tercer pivote).
5. La parte izquierda es $I_3$, luego $A$ es regular y
$$A^{-1}=\begin{pmatrix}0&1&0\\frac15&0&\frac35\\0&0&1\end{pmatrix}.$$
6. **Comprobación** $AA^{-1}=I_3$: fila 1 $(0,5,-3)$ por las columnas de $A^{-1}$: $(5\cdot\frac15,\ 0,\ 5\cdot\frac35-3)=(1,0,0)$; fila 2 $(1,0,0)$ da $(0,1,0)$; fila 3 $(0,0,1)$ da $(0,0,1)$ ✓ (sympy: `A.inv()` coincide; $\det A=-5$).

**Error en E (nota al margen de p.19).** E afirma que «si $A$ es regular, $A^{-1}$ no siempre admite una construcción realizando operaciones elementales por filas a la matriz $A$ ya que pueden ser necesarias también operaciones elementales por columnas». **Es falso**: U p.22 establece que $A$ es regular $\iff$ su escalonada reducida (obtenida **solo por filas**) es $I_n$, así que el algoritmo por filas funciona **siempre** con una matriz regular. Lo que no se debe hacer es **mezclar** filas y columnas en el mismo cálculo.

**Receta.** $(A\mid I)\to(I\mid A^{-1})$ solo con operaciones por filas: pivote no nulo (permuta si hace falta), normaliza, ceros debajo y luego encima. Comprueba multiplicando.

**Error típico.** Mezclar operaciones de filas y columnas; olvidar aplicar la operación a la parte derecha; no comprobar el resultado.

**Teoría:** U algoritmo de la inversa p.18; p.19; p.22.

---

## Ejercicio 1.17 (E p.19)

> **Enunciado.** ¿Es cierto que $\operatorname{rang}(A)+\operatorname{rang}(B)=\operatorname{rang}(A+B)$ siendo $A,B\in\mathcal M_{m\times n}$?

**Solución.**

1. **Estrategia:** una igualdad «general» se refuta con **un contraejemplo**.
2. **Cota útil:** una escalonada de $A\in\mathcal M_{m\times n}$ tiene a lo sumo $m$ filas no nulas y, como cada pivote está en una columna distinta, a lo sumo $n$. Luego $\operatorname{rang}(A)\le\min\{m,n\}$ (Def. 1.5, U p.22). Si la igualdad fuera cierta, tomando $A$ y $B$ con $\operatorname{rang}A=\operatorname{rang}B=\min\{m,n\}\ge1$ obtendríamos $\operatorname{rang}(A+B)=2\min\{m,n\}>\min\{m,n\}$, imposible. Esto ya indica que es falsa.
3. **Contraejemplo más simple:** $A=I_2$, $B=-I_2$. $\operatorname{rang}A=\operatorname{rang}B=2$ (son escalonadas con 2 filas no nulas), pero $A+B=0$ tiene rango 0: $2+2\ne0$.
4. **Contraejemplo de E:** $A=\begin{pmatrix}2&1\\0&0\end{pmatrix}$ (escalonada, rango 1), $B=\begin{pmatrix}2&1\\1&0\end{pmatrix}$ ($F_2\to F_2-\frac12F_1$ da $\begin{pmatrix}2&1\\0&-\frac12\end{pmatrix}$, rango 2), $A+B=\begin{pmatrix}4&2\\1&0\end{pmatrix}$ ($F_2\to F_2-\frac14F_1$ da $\begin{pmatrix}4&2\\0&-\frac12\end{pmatrix}$, rango 2). $1+2=3\ne2$ (sympy ✓).
5. **Conclusión:** **no** es cierto en general (puede cumplirse en casos concretos, p. ej. $\begin{pmatrix}1&0\\0&0\end{pmatrix}+\begin{pmatrix}0&0\\0&1\end{pmatrix}$: $1+1=2$).

Nota: en el `.txt` de E el signo «$\ne$» se ha perdido y aparece «$=$»; el libro dice $\neq$.

**Receta.** Para «¿es cierto en general…?»: prueba con matrices muy simples ($I$, $-I$, $0$, diagonales). Un solo contraejemplo basta.

**Error típico.** «Demostrar» algo con un ejemplo en el que sí se cumple. El rango **no** respeta sumas.

**Teoría:** U Def. 1.5 p.22.

---

## Ejercicio 1.18 (E p.20)

> **Enunciado.** Calcúlese el rango de las matrices del Ejercicio 1.13.

**Solución.** Por la Def. 1.5 (U p.22), el rango es el número de filas no nulas de **cualquier** escalonada. Para cuadradas también sirve: $A$ regular $\iff\operatorname{rang}A=n$ (U p.22).

1. **$A_1=\begin{pmatrix}1&0\\0&3\end{pmatrix}$:** ya es escalonada (Def. 1.3), 2 filas no nulas: $\operatorname{rang}=2$ (coherente: es elemental ⇒ regular ⇒ rango = orden).
2. **$A_2$:** escalonada (triangular superior sin ceros en la diagonal), 3 filas no nulas: $\operatorname{rang}=3$.
3. **$A_3$** ($4\times3$): no es escalonada (la fila 2 empieza en la columna 3 y la fila 3 en la columna 2). $F_2\leftrightarrow F_3$ y luego $F_4\to F_4-F_3$:
$$\begin{pmatrix}1&0&0\\0&0&1\\0&1&2\\0&0&1\end{pmatrix}\to\begin{pmatrix}1&0&0\\0&1&2\\0&0&1\\0&0&1\end{pmatrix}\to\begin{pmatrix}1&0&0\\0&1&2\\0&0&1\\0&0&0\end{pmatrix},\qquad\operatorname{rang}A_3=3.$$
4. **$A_4=\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix}$:** **no** es escalonada (la fila 2 empieza con menos ceros que la 1). Con $F_1\leftrightarrow F_3$ queda $I_3$: $\operatorname{rang}=3$ (o bien: es elemental ⇒ regular ⇒ rango 3).
5. **$A_5$:** es escalonada (triangular superior con unos en la diagonal), 4 filas no nulas: $\operatorname{rang}=4$.
6. **$A_6=\begin{pmatrix}2&1&0\\0&0&0\\0&0&1\end{pmatrix}$:** no es escalonada (la fila nula no está al final). $F_2\leftrightarrow F_3$ da $\begin{pmatrix}2&1&0\\0&0&1\\0&0&0\end{pmatrix}$: $\operatorname{rang}=2$ (luego $A_6$ no es regular, lo que confirma el Ej. 1.13).

**Resumen:** rangos $2,3,3,3,4,2$ (sympy: `.rank()` coincide).

**Error en E.** E dice «$\operatorname{rang}(A_4)=3$ porque $A_4$ es escalonada»: $A_4$ **no** es escalonada (Def. 1.3). El resultado es correcto pero la justificación no; en examen habría que dar $F_1\leftrightarrow F_3$ o el argumento «elemental ⇒ regular ⇒ rango 3».

**Receta.** Antes de contar filas no nulas, **comprueba las condiciones de escalonada**; si falla alguna, escalona primero (a menudo basta una permutación).

**Error típico.** Contar filas no nulas de una matriz no escalonada (en $A_3$ saldría 4, imposible pues el rango de una $4\times3$ es $\le3$).

**Teoría:** U Def. 1.3 p.20; Def. 1.5 y regular $\iff$ rango $n$, p.22.

---

## Ejercicio 1.19 (E p.21)

> **Enunciado.** Si $A$ y $B$ son matrices no cuadradas de orden $m\times n$, se pide decidir si son o no ciertas las siguientes proposiciones: A) Si $A$ y $B$ son equivalentes por filas, $\operatorname{rang}(A)=\operatorname{rang}(B)$. B) Si $A$ y $B$ son equivalentes por columnas, $\operatorname{rang}(A)=\operatorname{rang}(B)$.

**Solución.**

1. **A) Cierta.** Es exactamente el Teorema 1.3 (U p.22). Idea: si $B$ se obtiene de $A$ por filas y $B_e$ es una escalonada de $B$, entonces $B_e$ se obtiene también de $A$ por filas (encadenando las operaciones), luego es una escalonada **de $A$**; y la Def. 1.5 dice que el rango es el número de filas no nulas de **cualquier** escalonada. (E indica en nota que la demostración completa, es decir, que ese número no depende de la escalonada elegida, se da en U, Teorema 4.1, p.146.)
2. **B) Cierta.** Pasamos a traspuestas para reducirnos a A):
   - Equivalentes por columnas significa que $B$ sale de $A$ por operaciones por columnas; cada una equivale a multiplicar a la derecha por una elemental (U p.16), luego $B=AQ$ con $Q=F_1\cdots F_p$ regular (producto de regulares, U p.13).
   - Trasponiendo: $B^t=(AQ)^t=Q^tA^t$ (U p.13), y $Q^t$ es regular porque $(Q^t)^{-1}=(Q^{-1})^t$ (U p.13).
   - Por el Teorema 1.2 (U p.19), $A^t$ y $B^t$ son equivalentes por filas, y por A), $\operatorname{rang}(A^t)=\operatorname{rang}(B^t)$.
   - Falta $\operatorname{rang}(M)=\operatorname{rang}(M^t)$. Esto **no** está en U §1.2; se obtiene de U §1.3: el rango es el mayor orden de un menor no nulo (U p.27), y cada menor de $M^t$ es el determinante de la traspuesta de una submatriz cuadrada de $M$, con el mismo valor porque $\det N=\det N^t$ (U p.26). Luego $\operatorname{rang}A=\operatorname{rang}A^t=\operatorname{rang}B^t=\operatorname{rang}B$.

**Observaciones.** Que sean «no cuadradas» no influye. El recíproco de A) es falso: igual rango no implica equivalencia por filas (ejemplo de U p.22: $\begin{pmatrix}2&1&0\\0&0&0\end{pmatrix}$ y $\begin{pmatrix}3&1&1\\0&0&0\end{pmatrix}$, ambas de rango 1).

**Receta.** «Columnas» se convierte en «filas» trasponiendo: $B=AQ\Rightarrow B^t=Q^tA^t$.

**Error típico.** Usar $\operatorname{rang}A=\operatorname{rang}A^t$ sin decir de dónde sale; o escribir $(AQ)^t=A^tQ^t$ (el orden se invierte).

**Teoría:** U traspuesta e inversa p.13; p.16; Teorema 1.2 p.19; Teorema 1.3 y Def. 1.5 p.22; §1.3 p.26–27.

---

## Ejercicio 1.20 (E p.21)

> **Enunciado.** Si $A,B\in\mathcal M_{m\times n}$ y existen $P$ y $Q$ matrices regulares tales que $B=PAQ$ se pide justificar la relación anterior en términos de operaciones elementales y decidir si $\operatorname{rang}(A)=\operatorname{rang}(B)$.

**Solución.**

1. **Toda matriz regular es producto de elementales.** Si $P$ ($m\times m$) es regular, el algoritmo de U p.18 da $E_p\cdots E_1P=I$, así que $P^{-1}=E_p\cdots E_1$ y $P=E_1^{-1}\cdots E_p^{-1}$ (inversa de un producto, U p.13), y cada $E_i^{-1}$ es elemental (U p.16). Lo mismo para $Q$ ($n\times n$).
2. **Interpretación.** $AQ=AF_1F_2\cdots F_r$: multiplicar a la derecha por elementales = hacer operaciones **por columnas** en $A$ (U p.16). Después $P(AQ)=E'_1\cdots E'_s(AQ)$: multiplicar a la izquierda = operaciones **por filas**. Así, $B$ se obtiene de $A$ haciendo operaciones por columnas (matriz de paso $Q$) y luego por filas (matriz de paso $P$); como $P(AQ)=(PA)Q$ (asociatividad), el orden entre ambas da igual. En U esta relación se llama «matrices equivalentes» (Def. 4.3, p.146).
3. **Rango.** $AQ$ es equivalente por columnas a $A$ ⇒ $\operatorname{rang}(AQ)=\operatorname{rang}(A)$ (Ej. 1.19 B). $B=P(AQ)$ es equivalente por filas a $AQ$ (Teorema 1.2) ⇒ $\operatorname{rang}(B)=\operatorname{rang}(AQ)$ (Teorema 1.3). **Luego sí: $\operatorname{rang}(A)=\operatorname{rang}(B)$.**

**Ejemplo (propio).** $A=\begin{pmatrix}1&2&3\\2&4&6\end{pmatrix}$. Filas: $F_2\to F_2-2F_1$, $P=\begin{pmatrix}1&0\\-2&1\end{pmatrix}$. Columnas: $C_2\to C_2-2C_1$, $C_3\to C_3-3C_1$, $Q=\begin{pmatrix}1&-2&-3\\0&1&0\\0&0&1\end{pmatrix}$. Entonces $PAQ=\begin{pmatrix}1&0&0\\0&0&0\end{pmatrix}$, de rango 1 como $A$ (sympy ✓).

**Receta.** $P\cdot(\ )$ = filas, $(\ )\cdot Q$ = columnas; multiplicar por matrices regulares, a cualquier lado, **no cambia el rango**.

**Error típico.** Pensar que $B=PAQ$ implica que $A$ y $B$ son equivalentes **por filas** (en general solo lo son «por filas y columnas»), o que $PAQ=PQA$.

**Teoría:** U p.13, p.16, p.18; Teoremas 1.2 (p.19) y 1.3 (p.22); Def. 4.3 p.146.

---

## Ejemplos propios (dificultad creciente)

### Ejemplo propio 1 — Operaciones con matrices (fácil)

**Enunciado (propio).** Sean $A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$, $B=\begin{pmatrix}2&0\\1&1\end{pmatrix}$. (a) Calcula $AB$ y $BA$. (b) Comprueba que $(A+B)^2\ne A^2+2AB+B^2$. (c) Comprueba $(AB)^t=B^tA^t$ y que $(AB)^t\ne A^tB^t$. (d) Calcula $A^n$.

**Solución.**
1. $AB=\begin{pmatrix}1\cdot2+2\cdot1&1\cdot0+2\cdot1\\0\cdot2+1\cdot1&0\cdot0+1\cdot1\end{pmatrix}=\begin{pmatrix}4&2\\1&1\end{pmatrix}$; $BA=\begin{pmatrix}2&4\\1&3\end{pmatrix}$. Distintas: no conmutan (U p.13).
2. $A+B=\begin{pmatrix}3&2\\1&2\end{pmatrix}$, $(A+B)^2=\begin{pmatrix}11&10\\5&6\end{pmatrix}$. $A^2=\begin{pmatrix}1&4\\0&1\end{pmatrix}$, $B^2=\begin{pmatrix}4&0\\3&1\end{pmatrix}$, y $A^2+2AB+B^2=\begin{pmatrix}13&8\\5&4\end{pmatrix}\ne(A+B)^2$. En cambio $A^2+AB+BA+B^2=\begin{pmatrix}11&10\\5&6\end{pmatrix}$ ✓.
3. $(AB)^t=\begin{pmatrix}4&1\\2&1\end{pmatrix}$; $B^tA^t=\begin{pmatrix}2&1\\0&1\end{pmatrix}\begin{pmatrix}1&0\\2&1\end{pmatrix}=\begin{pmatrix}4&1\\2&1\end{pmatrix}$ ✓; $A^tB^t=\begin{pmatrix}1&0\\2&1\end{pmatrix}\begin{pmatrix}2&1\\0&1\end{pmatrix}=\begin{pmatrix}2&1\\4&3\end{pmatrix}\ne(AB)^t$.
4. $A^2=\begin{pmatrix}1&4\\0&1\end{pmatrix}$, $A^3=\begin{pmatrix}1&6\\0&1\end{pmatrix}$: conjetura $A^n=\begin{pmatrix}1&2n\\0&1\end{pmatrix}$. Inducción: si vale para $n$, $A^{n+1}=A^nA=\begin{pmatrix}1&2+2n\\0&1\end{pmatrix}=\begin{pmatrix}1&2(n+1)\\0&1\end{pmatrix}$ ✓.

(sympy ✓.) **Receta:** desarrolla con la distributiva **sin conmutar**; para $A^n$, conjetura con $n=2,3$ y demuestra por inducción.

### Ejemplo propio 2 — Inversa por Gauss–Jordan y detección de matriz singular (medio)

**Enunciado (propio).** (a) Calcula la inversa de $A=\begin{pmatrix}1&2&1\\0&1&1\\1&2&2\end{pmatrix}$ por operaciones elementales por filas. (b) Intenta lo mismo con $S=\begin{pmatrix}1&2&3\\2&4&7\\1&2&4\end{pmatrix}$.

**Solución (a).**
1. $(A\mid I_3)\xrightarrow{F_3\to F_3-F_1}\left(\begin{array}{ccc|ccc}1&2&1&1&0&0\0&1&1&0&1&0\0&0&1&-1&0&1\end{array}\right)$ — ya es escalonada con pivotes 1 (luego $A$ es regular, U p.22).
2. $\xrightarrow{F_1\to F_1-2F_2}\left(\begin{array}{ccc|ccc}1&0&-1&1&-2&0\0&1&1&0&1&0\0&0&1&-1&0&1\end{array}\right)$.
3. $\xrightarrow{F_1\to F_1+F_3,\ F_2\to F_2-F_3}\left(\begin{array}{ccc|ccc}1&0&0&0&-2&1\0&1&0&1&1&-1\0&0&1&-1&0&1\end{array}\right)$.
4. $A^{-1}=\begin{pmatrix}0&-2&1\\1&1&-1\\-1&0&1\end{pmatrix}$. Comprobación: fila 1 de $A$, $(1,2,1)$, por las columnas de $A^{-1}$: $(0+2-1,\ -2+2+0,\ 1-2+1)=(1,0,0)$; análogamente las filas 2 y 3 dan $(0,1,0)$ y $(0,0,1)$ ✓ (sympy ✓, $\det A=1$).

**Solución (b).**
1. $F_2\to F_2-2F_1$, $F_3\to F_3-F_1$: la parte izquierda queda $\begin{pmatrix}1&2&3\\0&0&1\\0&0&1\end{pmatrix}$.
2. $F_3\to F_3-F_2$: la tercera fila de la izquierda es nula. La escalonada tiene 2 filas no nulas, $\operatorname{rang}S=2<3$, así que $S$ **no es regular** (U p.22) y es imposible llegar a $I_3$ (U p.19): **no tiene inversa** (sympy: $\det S=0$, rango 2).

**Receta:** en cuanto aparezca una fila nula en la parte izquierda, para: la matriz es singular.

### Ejemplo propio 3 — Rango por escalonamiento, numérico y con parámetro (difícil)

**Enunciado (propio).** (a) Calcula el rango de $C=\begin{pmatrix}1&2&0&1\\2&1&3&0\\3&3&3&1\\1&-1&3&-1\end{pmatrix}$. (b) Discute, según $k\in\mathbb R$, el rango de $M=\begin{pmatrix}1&1&k\\1&k&1\\k&1&1\end{pmatrix}$.

**Solución (a).**
1. $F_2\to F_2-2F_1$, $F_3\to F_3-3F_1$, $F_4\to F_4-F_1$: las tres filas nuevas son iguales, $(0,-3,3,-2)$.
2. $F_3\to F_3-F_2$, $F_4\to F_4-F_2$: $\begin{pmatrix}1&2&0&1\\0&-3&3&-2\\0&0&0&0\\0&0&0&0\end{pmatrix}$, escalonada con 2 filas no nulas: $\operatorname{rang}C=2$ (sympy ✓).

**Solución (b).** Cuidado: **no se puede tomar como pivote ni dividir por una expresión que pueda valer 0** sin separar casos.
1. $F_2\to F_2-F_1$, $F_3\to F_3-kF_1$ (tipo 3, válidas para todo $k$):
$$\begin{pmatrix}1&1&k\\0&k-1&1-k\\0&1-k&1-k^2\end{pmatrix}.$$
2. $F_3\to F_3+F_2$ (tipo 3, válida para todo $k$): tercera fila $(0,\,0,\,1-k^2+1-k)=(0,\,0,\,-(k-1)(k+2))$:
$$\begin{pmatrix}1&1&k\\0&k-1&1-k\\0&0&-(k-1)(k+2)\end{pmatrix}.$$
3. **Casos:**
   - $k\ne1$ y $k\ne-2$: los tres pivotes $1,\ k-1,\ -(k-1)(k+2)$ son no nulos; escalonada con 3 filas no nulas: $\operatorname{rang}M=3$.
   - $k=1$: queda $\begin{pmatrix}1&1&1\\0&0&0\\0&0&0\end{pmatrix}$: $\operatorname{rang}M=1$.
   - $k=-2$: queda $\begin{pmatrix}1&1&-2\\0&-3&3\\0&0&0\end{pmatrix}$: $\operatorname{rang}M=2$.
4. Comprobado con sympy ($\det M=-(k-1)^2(k+2)$; rangos 1, 2 y 3 para $k=1$, $k=-2$ y, p. ej., $k=0,2$).

**Receta:** con parámetros, usa solo operaciones de tipo 3 (y permutaciones) mientras puedas; los valores que anulan un posible pivote se estudian aparte.

**Error típico:** hacer $F_2\to\frac1{k-1}F_2$ sin excluir $k=1$ (la operación de tipo 2 exige $\alpha\ne0$, U p.14).
