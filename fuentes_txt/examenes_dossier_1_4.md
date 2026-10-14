# Dossier de exámenes (fuente X) — Tema 1.4: Sistemas de ecuaciones lineales

Revisados **completos** los 24 ficheros `fuentes_txt/examenes/*.txt` (feb. 2017 – feb. 2026, sept. 2017 – sept. 2025). Los enunciados dudosos (matrices mal maquetadas, signos perdidos) se han confirmado renderizando el PDF de `E:\UNED\ALGEBRA\Examenes\` (PyMuPDF). Todos los cálculos están verificados con sympy (`Matrix.rref()`, `.rank()`, `.det()`, `.LUdecomposition()`, `.LUsolve()`, `.nullspace()`).

**Recuento:** 14 ejercicios/apartados seleccionados del tema 1.4 (+ 1 dudoso resuelto en el apéndice) · 2 errores detectados en las soluciones oficiales · lista de excluidos al final.

Referencias de teoría (U = *Álgebra para Ingenieros*, página impresa, verificadas en `ingenieros.txt`):

| Contenido | U |
|---|---|
| Sistema $AX=B$, matriz ampliada $(A\mid B)$, homogéneo | §1.4.1 p.29 |
| Teorema 1.4 (0, 1 o infinitas soluciones); clasificación por rangos (Rouché-Frobenius); homogéneos siempre compatibles | §1.4.1 p.30 |
| Interpretación geométrica (rectas/planos), Ejemplo 1.25 | p.30-31 |
| Definición 1.7 (sistemas equivalentes), operaciones elementales con ecuaciones | §1.4.2 p.31-32 |
| Teorema 1.5 (operaciones elementales en $(A\mid B)$ dan sistemas equivalentes) | p.32 |
| Regla de Cramer | p.33 |
| Cartesianas → paramétricas (Ej. 1.27) | p.33-34 |
| Paramétricas → cartesianas (Ej. 1.28, igualdad de rangos) | p.34-36 |
| §1.4.3 Métodos numéricos; método de Gauss (PASOS 1-6) | p.36, p.38-41 |
| Método de Gauss-Jordan | p.43-44 |
| Factorización LU (PASO 1-2, $L=E^{-1}$, unicidad si $A$ regular) | p.44-46 |
| Ejemplos 1.33-1.35 (LU) | p.46-48 |
| Resolución de $AX=B$ con LU ($LY=B$, $UX=Y$), Ej. 1.36 | p.49 |
| LU permutada $PA=LU$, usos (inversa, determinante, varios $B$) | p.50-51 |
| Rango (Def. 1.5), Teorema 1.3, $A$ regular $\iff \operatorname{rang}(A)=n$ | §1.2.4 p.22 |
| La escalonada reducida es única | p.21 |
| $\det(AB)=\det A\det B$ | §1.3 p.26 |
| Rango = mayor orden de un menor no nulo | p.27 |
| Matriz ortogonal $m\times n$ (Def. 5.13) y $A^tA=I_n$ (Teorema 5.5) | §5.2 p.214-215 |

> Aviso de extracción: en `ingenieros.txt` p.30 aparece «S. incompatible ⇔ rang(A) = rang(A|B)»; el signo $\neq$ se perdió al extraer. En el libro es $\operatorname{rang}(A)\neq\operatorname{rang}(A\mid B)$. Lo mismo ocurre en los `.txt` de exámenes (p. ej. «Si m = −2, 1» significa $m\neq-2,1$).

Orden: de más fácil a más difícil (se conserva el número de pregunta del examen).

---

## 1. Rouché-Frobenius con más incógnitas que ecuaciones — Sept. 2023, pregunta 1

**Fuente:** `Algebra_Septiembre23.txt`, pregunta 1 (1 punto). `data-l="X"`, `data-ref="Sept. 2023, pregunta 1"`.

**Enunciado (literal):** «Considere el sistema matricial $AX = B$ siendo $A \in \mathcal M_{5\times 6}$ la matriz de coeficientes, $X \in \mathcal M_{6\times 1}$ la matriz de incógnitas y $B \in \mathcal M_{5\times 1}$ la matriz de términos independientes. Clasifique el sistema sabiendo que $\operatorname{rang}(A) = 5$.»

**Solución paso a paso**

1. **Datos.** Hay $m=5$ ecuaciones (filas de $A$) y $n=6$ incógnitas (columnas de $A$). La matriz ampliada $(A\mid B)$ es de orden $5\times 7$ (U §1.4.1 p.29).
2. **Cota inferior para $\operatorname{rang}(A\mid B)$.** $(A\mid B)$ contiene a $A$ como submatriz (sus 6 primeras columnas), así que cualquier menor no nulo de $A$ es también menor de $(A\mid B)$. Por la caracterización del rango por menores (U §1.3 p.27): $\operatorname{rang}(A\mid B)\ge \operatorname{rang}(A)=5$.
3. **Cota superior.** El rango de una matriz no puede superar su número de filas (hay como mucho tantos pivotes como filas en una escalonada, U Def. 1.5 p.22). $(A\mid B)$ tiene 5 filas, luego $\operatorname{rang}(A\mid B)\le 5$.
4. **Conclusión de 2 y 3:** $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=5$. Por el teorema de Rouché-Frobenius (U p.30) el sistema es **compatible**.
5. **¿Determinado o indeterminado?** El rango común es $k=5<n=6$, luego es **compatible indeterminado**, y la solución depende de $n-k=6-5=1$ parámetro (U p.30).

**Resultado:** sistema compatible indeterminado con un parámetro (para *cualquier* $B$).

**Receta.** Si $\operatorname{rang}(A)$ es igual al número de **ecuaciones** $m$, el sistema es compatible para todo $B$ (porque $(A\mid B)$ tiene $m$ filas y no puede tener más rango); después se compara ese rango con el número de **incógnitas** $n$: si es igual, compatible determinado; si es menor, indeterminado con $n-m$ parámetros.

**Error típico.** Afirmar «$\operatorname{rang}(A\mid B)=5$» sin justificarlo: hay que dar las dos desigualdades (≥ porque contiene a $A$; ≤ porque solo tiene 5 filas).

---

## 2. Rouché-Frobenius (6 ecuaciones, 7 incógnitas) — Feb. 2026 (2.ª sem.), pregunta 1

**Fuente:** `Algebra-Febrero2026-B.txt`, pregunta 1 (1 punto). `data-ref="Feb. 2026 (2.ª sem.), pregunta 1"`.

**Enunciado (literal):** «Considere el sistema matricial $AX = B$ donde $A$ es la matriz de coeficientes, $X$ la matriz de incógnitas y $B$ la matriz de términos independientes. Clasifique el sistema, si es posible, de manera razonada, sabiendo que tiene 6 ecuaciones, 7 incógnitas y $\operatorname{rang}(A) = 6$.»

**Solución paso a paso**

1. $A\in\mathcal M_{6\times 7}$, $X\in\mathcal M_{7\times1}$, $B\in\mathcal M_{6\times1}$, y $(A\mid B)\in\mathcal M_{6\times 8}$ (U p.29).
2. $\operatorname{rang}(A\mid B)\ge\operatorname{rang}(A)=6$, porque $A$ es submatriz de $(A\mid B)$ (todo menor no nulo de $A$ lo es de $(A\mid B)$, U p.27).
3. $\operatorname{rang}(A\mid B)\le 6$, porque $(A\mid B)$ tiene 6 filas (U Def. 1.5 p.22).
4. Luego $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=6<7=n$. Por Rouché-Frobenius (U p.30): **compatible indeterminado**, con $7-6=1$ parámetro.

**Sí es posible clasificarlo** sin conocer $B$, precisamente porque el rango de $A$ ya es «máximo por filas».

**Receta.** Igual que el ejercicio 1: rango de $A$ = n.º de ecuaciones ⇒ siempre compatible; luego comparar con el n.º de incógnitas.

**Error típico.** Decir «no se puede clasificar porque no conocemos $B$». Aquí $B$ no importa; sí importaría si $\operatorname{rang}(A)<m$ (ver ejercicio 3).

---

## 3. V/F: rango completo por columnas + existencia de solución — Feb. 2024 (1.ª sem.), pregunta 1

**Fuente:** `Algebra_Febrero24A.txt`, pregunta 1 (1 punto). `data-ref="Feb. 2024 (1.ª sem.), pregunta 1"`.

**Enunciado (literal):** «Considere el sistema matricial $AX = B$ siendo $A \in \mathcal M_{7\times4}$ la matriz de coeficientes, $X \in \mathcal M_{4\times1}$ la matriz de incógnitas y $B \in \mathcal M_{7\times1}$ la matriz de términos independientes. Justifique de manera razonada si la siguiente afirmación es verdadera o falsa: Si $\operatorname{rango}(A) = 4$ y existe $X$ solución del sistema de ecuaciones $AX = B$ (es decir, $AX = B$), entonces el sistema $AX = B$ es compatible determinado.»

**Solución paso a paso**

1. **Datos:** $m=7$ ecuaciones, $n=4$ incógnitas, $\operatorname{rang}(A)=4$.
2. **Aquí el rango de $A$ NO garantiza compatibilidad**: $(A\mid B)$ es $7\times5$ y podría tener rango 5. Por eso el enunciado añade la hipótesis «existe una solución».
3. **Existe solución ⇒ compatible.** Por definición (U p.30) un sistema es compatible si tiene al menos una solución. Por Rouché-Frobenius, compatible ⇔ $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)$; luego $\operatorname{rang}(A\mid B)=4$.
4. **Determinado.** El rango común es $4=n$ (número de incógnitas), así que por Rouché-Frobenius el sistema es **compatible determinado** (U p.30).
5. **Respuesta: VERDADERO.**

**Comprobación alternativa (sin Rouché).** Si $X_0$ y $X_1$ fueran dos soluciones, $A(X_0-X_1)=0$. Como $\operatorname{rang}(A)=4=n$, el sistema homogéneo $AX=0$ solo tiene la solución nula (U p.30), luego $X_0=X_1$.

**Ejemplo (sympy):** $A=\begin{pmatrix}I_4\\0_{3\times4}\end{pmatrix}$, $B=(1,2,3,4,0,0,0)^t$: rangos 4 y 4, única solución $(1,2,3,4)$. Con $B=(1,2,3,4,1,0,0)^t$: $\operatorname{rang}(A\mid B)=5$, incompatible — por eso hacía falta la hipótesis de existencia.

**Receta.** «Determinado» depende solo de $\operatorname{rang}(A)$ frente a $n$; «compatible» depende de $\operatorname{rang}(A\mid B)$. Si se sabe que hay solución y $\operatorname{rang}(A)=n$, la solución es única.

**Error típico.** Pensar que $\operatorname{rang}(A)=n$ basta para tener solución cuando $m>n$ (sistema con más ecuaciones que incógnitas): puede ser incompatible.

---

## 4. V/F: escalonada reducida y sistemas equivalentes — Sept. 2022, ejercicio 1

**Fuente:** `Algebra_Septiembre22.txt`, Ejercicio 1 (1 punto). `data-ref="Sept. 2022, ejercicio 1"`. (El apartado A es de 1.2; se incluye entero porque el B es de 1.4.)

**Enunciado (literal):** «Razonar si son ciertas las siguientes proposiciones: A) La matriz escalonada reducida de una matriz $A$ no es única; B) Se puede obtener un sistema de ecuaciones lineales equivalente a uno dado mediante transformaciones elementales en las ecuaciones lineales que definen el sistema inicial.»

**Solución paso a paso**

**A) FALSA.**
1. Una matriz *escalonada* equivalente por filas a $A$ no es única: p. ej. $\begin{pmatrix}1&2\\2&6\end{pmatrix}\xrightarrow{F_2\to F_2-2F_1}\begin{pmatrix}1&2\\0&2\end{pmatrix}$, y multiplicando $F_2$ por 3 se obtiene otra escalonada, $\begin{pmatrix}1&2\\0&6\end{pmatrix}$.
2. Pero la *escalonada reducida* (pivotes iguales a 1 y ceros encima y debajo de cada pivote) **sí es única**: lo afirma U p.21 («la matriz escalonada reducida sí es única»). En el ejemplo, ambas llevan a $\begin{pmatrix}1&0\\0&1\end{pmatrix}$.

**B) VERDADERA.**
1. Definición 1.7 (U p.31): $S$ y $S'$ son equivalentes si tienen **las mismas soluciones**.
2. Las tres transformaciones elementales con ecuaciones (U p.31-32): $E_i\leftrightarrow E_j$; $E_i\to\alpha E_i$ con $\alpha\neq0$; $E_i\to E_i+\alpha E_j$ ($j\ne i$).
3. Cada una corresponde a una operación elemental por filas en $(A\mid B)$, es decir, a multiplicar por la izquierda por una matriz elemental $E$ (U §1.2.3). El Teorema 1.5 (U p.32) asegura que, si $(A'\mid B')=E_p\cdots E_1(A\mid B)$, los sistemas $AX=B$ y $A'X=B'$ son equivalentes: como las $E_i$ son regulares, $A'X_0=B'\iff E_p\cdots E_1AX_0=E_p\cdots E_1B\iff AX_0=B$.
4. Ese es el fundamento del método de Gauss (U p.38).

**Receta.** Para V/F de teoría: citar la definición (equivalente = mismas soluciones) y el resultado (Teorema 1.5), y explicar el porqué en una línea (las matrices elementales son invertibles).

**Error típico.** Olvidar la condición $\alpha\neq0$ al multiplicar una ecuación: multiplicar por 0 elimina una ecuación y cambia el conjunto de soluciones.

---

## 5. Escribir dos sistemas equivalentes con ampliada $3\times4$ — Sept. 2018 (tipo A), ejercicio 1

**Fuente:** `Algebra_Septiembre18A.txt`, Ejercicio 1 (1 punto). `data-ref="Sept. 2018, ejercicio 1"`.

**Enunciado (literal):** «Escribir dos sistemas de ecuaciones lineales equivalentes entre sí tales que las matrices ampliadas asociadas sean de dimensión $3\times4$, justificando la equivalencia.»

> **ERROR EN LA SOLUCIÓN OFICIAL** (confirmado en el PDF, p.2). Parte de
> $S:\ 2x_1+x_2-x_3=1,\ 2x_1-x_2+x_3=2,\ x_1-3x_2=3$ y escribe como segundo sistema $2x_1+x_2-x_3=1,\ -2x_2+2x_3=1,\ \mathbf{-5x_2}+x_3=5$, y un tercero con $(-\tfrac25+2)x_3=-1$. Pero la operación correcta $F_3\to 2F_3-F_1$ da $\mathbf{-7x_2}+x_3=5$. Comprobado con sympy: la única solución de $S$ es $(\tfrac34,-\tfrac34,-\tfrac14)$, mientras que los sistemas segundo y tercero de la solución oficial tienen como solución $(\tfrac34,-\tfrac98,-\tfrac58)$, que **no** cumple la 3.ª ecuación de $S$ ($\tfrac34+\tfrac{27}8=\tfrac{33}8\neq3$). Es decir, el ejemplo oficial **no** es un par de sistemas equivalentes al primero (sí lo son el segundo y el tercero entre sí). Abajo, versión corregida.

**Solución paso a paso (corregida, con el mismo sistema de partida)**

1. **Sistema de partida** y su matriz ampliada ($3\times4$: 3 ecuaciones, 3 incógnitas + columna de términos independientes, U p.29):
$$S:\ \begin{cases}2x_1+x_2-x_3=1\\2x_1-x_2+x_3=2\\x_1-3x_2=3\end{cases}\qquad (A\mid B)=\left(\begin{array}{ccc|c}2&1&-1&1\\2&-1&1&2\\1&-3&0&3\end{array}\right).$$
2. **Por qué basta con operaciones elementales.** Por el Teorema 1.5 (U p.32), cualquier matriz obtenida de $(A\mid B)$ con operaciones elementales por filas es la ampliada de un sistema equivalente (mismas soluciones, Def. 1.7 p.31).
3. **Anular la columna 1 bajo el pivote $2$.**
 - $F_2\to F_2-F_1$: $(2-2,\,-1-1,\,1+1\mid 2-1)=(0,-2,2\mid1)$.
 - $F_3\to 2F_3-F_1$ (es la composición de $F_3\to2F_3$, tipo 2 con $\alpha=2\ne0$, y $F_3\to F_3-F_1$, tipo 3; se usa para no tener fracciones): $(2-2,\,-6-1,\,0+1\mid 6-1)=(0,-7,1\mid5)$.
$$\left(\begin{array}{ccc|c}2&1&-1&1\\0&-2&2&1\\0&-7&1&5\end{array}\right).$$
4. **Anular el $-7$ bajo el pivote $-2$:** $F_3\to2F_3-7F_2$: $(0,\,-14+14,\,2-14\mid10-7)=(0,0,-12\mid3)$.
$$S':\ \begin{cases}2x_1+x_2-x_3=1\\-2x_2+2x_3=1\\-12x_3=3\end{cases}\qquad (A'\mid B')=\left(\begin{array}{ccc|c}2&1&-1&1\\0&-2&2&1\\0&0&-12&3\end{array}\right).$$
5. **Comprobación (no imprescindible, pero recomendable):** de $S'$, $x_3=-\tfrac14$; $-2x_2-\tfrac12=1\Rightarrow x_2=-\tfrac34$; $2x_1-\tfrac34+\tfrac14=1\Rightarrow x_1=\tfrac34$. Sustituyendo en $S$: $\tfrac32-\tfrac34+\tfrac14=1$ ✓, $\tfrac32+\tfrac34-\tfrac14=2$ ✓, $\tfrac34+\tfrac94=3$ ✓.
6. **Conclusión:** $S$ y $S'$ son equivalentes (Teorema 1.5), y ambas ampliadas son $3\times4$.

**Respuesta mínima válida** (también correcta): intercambiar dos ecuaciones ($E_1\leftrightarrow E_2$) ya da un sistema equivalente; basta citar el Teorema 1.5.

**Receta.** Para fabricar un sistema equivalente: aplicar a la ampliada operaciones elementales (anotando cada una: «$F_3\to2F_3-F_1$») y citar el Teorema 1.5. Comprobar al final que la solución satisface el sistema original.

**Error típico.** Equivocarse en una operación (como en la propia solución oficial) y no comprobarlo: sustituir la solución en el sistema original detecta el error en segundos.

---

## 6. Paramétricas ↔ cartesianas de «un sistema» — Feb. 2022 (tipo A), ejercicio 1

**Fuente:** `Algebra_Febrero22A2.txt`, Ejercicio 1 (1 punto). `data-ref="Feb. 2022 (tipo A), ejercicio 1"`. (Dudoso entre 1.4 y 2.x; se incluye porque U trata este paso en §1.4.2, Ej. 1.27-1.28, p.33-36.)

**Enunciado (literal):** «Escríba unas ecuaciones paramétricas de un sistema y halle las ecuaciones cartesianas de dicho sistema. Considere 3 incógnitas.»

**Solución oficial (muy sencilla):** $x=\alpha,\ y=-\alpha,\ z=0$ ⇒ cartesianas $x+y=0,\ z=0$.

**Solución desarrollada (ejemplo con dos parámetros y término independiente)**

1. **Elegimos unas paramétricas** (3 incógnitas, 2 parámetros):
$$x=1+\alpha+\beta,\qquad y=\alpha,\qquad z=2-\beta,\qquad \alpha,\beta\in\mathbb R.$$
2. **Qué significa «hallar las cartesianas»** (U p.34-35): buscar un sistema en $x,y,z$ cuyas soluciones sean exactamente esos puntos, es decir, **eliminar los parámetros**. Un punto $(x,y,z)$ es de esa forma si y solo si el sistema en las incógnitas $\alpha,\beta$
$$\alpha+\beta=x-1,\qquad \alpha=y,\qquad -\beta=z-2$$
es **compatible**.
3. **Imponer la igualdad de rangos (Rouché-Frobenius, U p.30).** La matriz de coeficientes en $(\alpha,\beta)$ tiene rango 2 (el menor de filas 2-3 vale $\begin{vmatrix}1&0\\0&-1\end{vmatrix}=-1\ne0$). La ampliada
$$\left(\begin{array}{cc|c}1&1&x-1\\1&0&y\\0&-1&z-2\end{array}\right)$$
debe tener también rango 2, y como es $3\times3$ eso equivale a que su determinante sea 0 (U p.27):
$$\begin{vmatrix}1&1&x-1\\1&0&y\\0&-1&z-2\end{vmatrix}=y-(z-2)-(x-1)=-x+y-z+3=0.$$
(desarrollo por la primera fila; verificado con sympy.)
4. **Cartesiana:** $x-y+z=3$ (una ecuación, porque $3$ incógnitas $-\ 2$ parámetros $=1$).
5. **Atajo (U p.36):** como un parámetro coincide con una variable ($\alpha=y$) basta sustituir: $\beta=2-z$ y $x=1+y+(2-z)$, es decir, $x-y+z=3$.
6. **Comprobación:** $(1+\alpha+\beta)-\alpha+(2-\beta)=3$ ✓ para todo $\alpha,\beta$.

**Receta.** Paramétricas → cartesianas: escribir el sistema en los parámetros con los $x_i$ como términos independientes y exigir $\operatorname{rang}(\text{coef.})=\operatorname{rang}(\text{ampliada})$ (escalonando o con un determinante). N.º de ecuaciones cartesianas = n.º de incógnitas − n.º de parámetros independientes.

**Error típico.** Dar ecuaciones que cumplen solo algunos puntos (p. ej. comprobar con $\alpha=\beta=0$ y nada más) o dar demasiadas ecuaciones (que describen un conjunto más pequeño).

---

## 7. Sistema de ecuaciones matriciales — Sept. 2025, pregunta 7 (primer apartado)

**Fuente:** `Algebra_Septiembre25.txt`, pregunta 7, primer apartado (1 de 2 puntos). `data-ref="Sept. 2025, pregunta 7"`. (Los otros dos apartados —base de $\mathcal M_{2\times2}$, dimensión— son del tema 2.3.)

**Enunciado (literal):** «Se sabe que las matrices $X, Y \in \mathcal M_{2\times2}$ satisfacen $\begin{cases}2X+3Y=A\\X-Y=B\end{cases}$, en donde $A=\begin{pmatrix}5&1\\0&4\end{pmatrix}$ y $B=\begin{pmatrix}1&-1\\2&0\end{pmatrix}$. Calcule $X+Y$ (1 PUNTO). Razone si el conjunto $\{A,B,X,Y\}$ forma o no una base de $\mathcal M_{2\times2}$ (0.5 PUNTOS). Calcule la dimensión del subespacio generado por $\{A,B,Y\}$ (0.5 PUNTOS).»

**Solución paso a paso (apartado 1)**

1. **Idea.** Es un sistema lineal $2\times2$ cuyas «incógnitas» son matrices. Se resuelve igual que uno numérico (sustitución o reducción, U p.29) porque la suma de matrices y el producto por escalares cumplen las mismas propiedades que con números (U §1.2.2 p.11). **No** aparece ningún producto de matrices, así que no hay problemas de conmutatividad.
2. **Sustitución.** De la 2.ª ecuación, $X=Y+B$. Sustituyendo en la 1.ª: $2(Y+B)+3Y=A\Rightarrow 5Y=A-2B$.
3. $A-2B=\begin{pmatrix}5-2&1+2\\0-4&4-0\end{pmatrix}=\begin{pmatrix}3&3\\-4&4\end{pmatrix}$, luego $Y=\dfrac15\begin{pmatrix}3&3\\-4&4\end{pmatrix}=\begin{pmatrix}3/5&3/5\\-4/5&4/5\end{pmatrix}$.
4. $X=Y+B=\begin{pmatrix}3/5+1&3/5-1\\-4/5+2&4/5+0\end{pmatrix}=\begin{pmatrix}8/5&-2/5\\6/5&4/5\end{pmatrix}$.
5. $X+Y=\begin{pmatrix}11/5&1/5\\2/5&8/5\end{pmatrix}$.
6. **Comprobación** (sympy): $2X+3Y=\begin{pmatrix}16/5+9/5&-4/5+9/5\\12/5-12/5&8/5+12/5\end{pmatrix}=\begin{pmatrix}5&1\\0&4\end{pmatrix}=A$ ✓ y $X-Y=B$ ✓.

**Atajo (reducción directa a $X+Y$).** Buscamos $\lambda,\mu$ con $\lambda(2X+3Y)+\mu(X-Y)=X+Y$: $2\lambda+\mu=1$, $3\lambda-\mu=1$ ⇒ $\lambda=\tfrac25$, $\mu=\tfrac15$. Así $X+Y=\tfrac{2A+B}{5}=\tfrac15\begin{pmatrix}11&1\\2&8\end{pmatrix}$, sin calcular $X$ ni $Y$.

**Apartados 2-3 (tema 2, resumen).** $A=2X+3Y$ y $B=X-Y$ son combinación lineal de $X,Y$, luego $\{A,B,X,Y\}$ es ligado y no es base. $A$ y $B$ no son proporcionales (la entrada $(2,1)$ de $A$ es 0 y la de $B$ es 2, pero la $(1,1)$ de $A$ no es 0), luego $\{A,B\}$ es libre; $Y=\tfrac15(A-2B)$, así que $\dim\langle A,B,Y\rangle=2$.
*Nota sobre la solución oficial:* escribe «si $\lambda A=B$ … entonces necesariamente $\lambda=0$»; lo correcto es que **no existe** ningún $\lambda$ (con $\lambda=0$ se obtendría $B=0$, falso).

**Receta.** Sistemas lineales con incógnitas matriciales: resolver por sustitución/reducción como con números, sin multiplicar matrices; comprobar sustituyendo.

**Error típico.** Dividir por una matriz o «despejar» con productos; aquí solo se divide por el escalar 5.

---

## 8. Sistema homogéneo con parámetro — Feb. 2020 (tipo A), ejercicio 1

**Fuente:** `Algebra_Febrero20A.txt`, Ejercicio 1 (1 punto). `data-ref="Feb. 2020 (tipo A), ejercicio 1"`. (La cabecera del enunciado dice «Enero. 2020»; la de soluciones, «Febrero [1]. 2020».)

**Enunciado (literal):** «Calcular las soluciones del sistema
$$\begin{cases}mx+y+z=0\\x+my+z=0\\x+y+mz=0\end{cases}$$
para los distintos valores de $m\in\mathbb R$.»

**Solución paso a paso**

1. **Es homogéneo** (términos independientes nulos), luego **siempre es compatible**: $(0,0,0)$ es solución y $\operatorname{rang}(A)=\operatorname{rang}(A\mid 0)$ (U p.30). La pregunta es cuándo hay **más** soluciones que la nula.
2. **Criterio.** Es determinado (solo la nula) $\iff\operatorname{rang}(A)=3\iff\det A\neq0$ (U p.22 y p.30).
3. **Determinante** (truco: todas las filas suman $m+2$). $C_1\to C_1+C_2+C_3$ (no cambia el determinante, U §1.3):
$$\det A=\begin{vmatrix}m+2&1&1\\m+2&m&1\\m+2&1&m\end{vmatrix}=(m+2)\begin{vmatrix}1&1&1\\1&m&1\\1&1&m\end{vmatrix}\overset{F_2-F_1,\ F_3-F_1}{=}(m+2)\begin{vmatrix}1&1&1\\0&m-1&0\\0&0&m-1\end{vmatrix}=(m+2)(m-1)^2.$$
(sympy: `factor(det) = (m-1)**2*(m+2)`.)
4. **Caso $m\neq1$ y $m\ne-2$:** $\det A\ne0$, $\operatorname{rang}A=3=n$: compatible determinado, **única solución $x=y=z=0$**.
5. **Caso $m=1$:** las tres ecuaciones son $x+y+z=0$. $\operatorname{rang}A=1$, solución con $3-1=2$ parámetros: tomando $x=\alpha,\ y=\beta$ (incógnitas que no son pivote, U p.34),
$$x=\alpha,\quad y=\beta,\quad z=-\alpha-\beta,\qquad\alpha,\beta\in\mathbb R.$$
6. **Caso $m=-2$:** escalonamos (intercambiamos para tener pivote 1):
$$\begin{pmatrix}-2&1&1\\1&-2&1\\1&1&-2\end{pmatrix}\xrightarrow{F_1\leftrightarrow F_2}\begin{pmatrix}1&-2&1\\-2&1&1\\1&1&-2\end{pmatrix}\xrightarrow[F_3\to F_3-F_1]{F_2\to F_2+2F_1}\begin{pmatrix}1&-2&1\\0&-3&3\\0&3&-3\end{pmatrix}\xrightarrow{F_3\to F_3+F_2}\begin{pmatrix}1&-2&1\\0&-3&3\\0&0&0\end{pmatrix}.$$
 $\operatorname{rang}A=2$, un parámetro. De $-3y+3z=0$: $y=z$; tomando $z=\alpha$: $y=\alpha$, $x=2y-z=\alpha$:
$$x=y=z=\alpha,\qquad\alpha\in\mathbb R.$$
7. **Comprobación:** con $m=-2$: $-2\alpha+\alpha+\alpha=0$ ✓ (las tres ecuaciones). Con $m=1$: $\alpha+\beta-\alpha-\beta=0$ ✓.

**Nota oficial:** «Tenga en cuenta que se piden **soluciones** del sistema, no clasificación del sistema.» (En el `.txt` falta el $\neq$: «Si $m=-2,1$ … compatible determinado» significa $m\ne-2,1$.)

**Receta.** Homogéneo cuadrado con parámetro: (1) siempre compatible; (2) $\det A=0$ da los valores críticos; (3) fuera de ellos, solo la solución nula; (4) en cada valor crítico, escalonar y escribir la solución con $n-\operatorname{rang}A$ parámetros.

**Error típico.** Quedarse en «compatible indeterminado» sin dar las soluciones; o dividir por $m-1$ al escalonar sin separar el caso $m=1$.

---

## 9. Discusión y resolución con parámetro — Feb. 2023 (2.ª sem.), pregunta 8

**Fuente:** `Algebra_Febrero23B.txt`, pregunta 8 (problema, 2 puntos). `data-ref="Feb. 2023 (2.ª sem.), pregunta 8"`. Enunciado y matrices confirmados en el PDF (p.4).

**Enunciado (literal):** «Sea $a\in\mathbb R$ y consideremos el siguiente sistema de ecuaciones:
$$\begin{cases}(1+a)x+y+z=1\\x+(1+a)y+z=a\\x+y+(1+a)z=a^2\end{cases}$$
(i) Discuta el sistema en función del parámetro $a\in\mathbb R$. (1 PUNTO) (ii) Resuélvalo en los casos que sea compatible. (1 PUNTO)»

**Solución paso a paso**

**(i) Discusión**

1. **Matriz ampliada** (U p.29), reordenada con $F_1\leftrightarrow F_3$ para que el primer pivote sea el número $1$ y no $1+a$ (que se anula si $a=-1$ y nos obligaría a separar casos):
$$\left(\begin{array}{ccc|c}1&1&1+a&a^2\\1&1+a&1&a\\1+a&1&1&1\end{array}\right).$$
 El intercambio de ecuaciones da un sistema equivalente (Teorema 1.5, U p.32).
2. **Anular la columna 1.** $F_2\to F_2-F_1$ y $F_3\to F_3-(1+a)F_1$:
 - fila 2: $(0,\ a,\ 1-(1+a),\ a-a^2)=(0,\ a,\ -a,\ -a^2+a)$;
 - fila 3: $(0,\ 1-(1+a),\ 1-(1+a)^2,\ 1-(1+a)a^2)=(0,\ -a,\ -a^2-2a,\ -a^3-a^2+1)$.
$$\left(\begin{array}{ccc|c}1&1&1+a&a^2\\0&a&-a&-a^2+a\\0&-a&-a^2-2a&-a^3-a^2+1\end{array}\right).$$
3. **Anular la columna 2.** $F_3\to F_3+F_2$ (no divide por nada, válido para todo $a$):
$$\left(\begin{array}{ccc|c}1&1&1+a&a^2\\0&a&-a&-a^2+a\\0&0&-a^2-3a&-a^3-2a^2+a+1\end{array}\right),\qquad -a^2-3a=-a(a+3).$$
4. **Comprobación con el determinante.** $\det A=a^2(a+3)$ (sumando las tres columnas en la primera sale el factor $a+3$, como en el ejercicio 8; sympy: `a**2*(a + 3)`). Se anula solo en $a=0$ y $a=-3$.
5. **Caso $a\ne0$ y $a\ne-3$.** Los tres pivotes $1,\ a,\ -a(a+3)$ son no nulos: $\operatorname{rang}A=\operatorname{rang}(A\mid B)=3=n$ ⇒ **compatible determinado** (U p.30).
6. **Caso $a=0$.** La matriz queda
$\left(\begin{array}{ccc|c}1&1&1&0\\0&0&0&0\\0&0&0&1\end{array}\right)$: $\operatorname{rang}A=1\ne2=\operatorname{rang}(A\mid B)$ ⇒ **incompatible**. (Se ve directamente: el sistema es $x+y+z=1$, $x+y+z=0$, $x+y+z=0$, contradictorio.)
7. **Caso $a=-3$.** Sustituyendo: fila 2 $=(0,-3,3\mid-12)$, fila 3 $=(0,0,0\mid 27-18-3+1)=(0,0,0\mid7)$. $\operatorname{rang}A=2\ne3=\operatorname{rang}(A\mid B)$ ⇒ **incompatible** (la última ecuación dice $0=7$).

**(ii) Resolución para $a\ne0,-3$** (sustitución hacia atrás, U p.39 PASO 6)

8. De la fila 3: $-a(a+3)z=-a^3-2a^2+a+1\Rightarrow z=\dfrac{a^3+2a^2-a-1}{a(a+3)}$.
9. De la fila 2 (dividimos por $a\ne0$): $y-z=1-a\Rightarrow y=z+1-a=\dfrac{a^3+2a^2-a-1+(1-a)(a^2+3a)}{a(a+3)}=\dfrac{2a-1}{a(a+3)}$
 (pues $(1-a)(a^2+3a)=-a^3-2a^2+3a$).
10. De la fila 1: $x=a^2-y-(1+a)z=\dfrac{a^3(a+3)-(2a-1)-(1+a)(a^3+2a^2-a-1)}{a(a+3)}=\dfrac{2-a^2}{a(a+3)}$
 (pues $(1+a)(a^3+2a^2-a-1)=a^4+3a^3+a^2-2a-1$).
$$\boxed{x=\frac{2-a^2}{a(a+3)},\qquad y=\frac{2a-1}{a(a+3)},\qquad z=\frac{a^3+2a^2-a-1}{a(a+3)}}\qquad(a\ne0,-3).$$
11. **Comprobación** (sympy `LUsolve`): para $a=1$ sale $(\tfrac14,\tfrac14,\tfrac14)$: $2\cdot\tfrac14+\tfrac14+\tfrac14=1$ ✓, $\tfrac14+\tfrac12+\tfrac14=1=a$ ✓, $\tfrac14+\tfrac14+\tfrac12=1=a^2$ ✓. Para $a=2$: $(-\tfrac15,\tfrac3{10},\tfrac{13}{10})$; para $a=-1$: $(-\tfrac12,\tfrac32,-\tfrac12)$.

*(Alternativa: regla de Cramer, U p.33, con $|A|=a^2(a+3)$; da lo mismo pero con más cálculo.)*

**Resumen:** $a\ne0,-3$: compatible determinado (solución de arriba); $a=0$ o $a=-3$: incompatible. Nunca es compatible indeterminado.

**Fallo recurrente (oficial):** «En los casos en los que el sistema es compatible determinado, resolver el sistema únicamente para un valor concreto de $a$.» La solución debe darse **en función de $a$**.

**Receta.** Discusión con parámetro: (1) escalonar $(A\mid B)$ sin dividir por expresiones con el parámetro (elegir pivotes numéricos, reordenar si hace falta); (2) los valores que anulan pivotes son los casos críticos (confirmar con $\det A$ si es cuadrado); (3) caso general por Rouché-Frobenius; (4) sustituir cada valor crítico en la escalonada y comparar rangos; (5) resolver en función del parámetro y comprobar con un valor concreto.

**Error típico.** Dividir una fila por $a$ o por $1+a$ sin haber excluido antes $a=0$ o $a=-1$; olvidar estudiar por separado los valores críticos.

---

## 10. Matriz ortogonal ⇒ compatible determinado o incompatible — Feb. 2022 (tipo A), problema b

**Fuente:** `Algebra_Febrero22A2.txt`, Problema b) (1,5 puntos). `data-ref="Feb. 2022 (tipo A), problema b"`. Enunciado confirmado en el PDF p.1.

**Enunciado (literal):** «Compruébe que si $A$ es una matriz ortogonal de orden $m\times n$ entonces cualquier sistema de ecuaciones definido por $AX=B$ es compatible determinado o bien incompatible.»

**Aclaración previa.** En U, una matriz $A\in\mathcal M_{m\times n}$ es ortogonal si sus columnas forman un sistema ortonormal de $\mathbb R^m$ (Def. 5.13, U p.214), lo que equivale a $A^tA=I_n$ (Teorema 5.5, p.215). No tiene por qué ser cuadrada.

**Solución paso a paso**

1. **Rango de $A$.** Un sistema ortonormal es linealmente independiente (U Teorema 5.2), luego las $n$ columnas de $A$ son independientes y $\operatorname{rang}(A)=n$. (Equivalente con matrices: si $AX=0$, multiplicando por $A^t$ queda $A^tAX=I_nX=X=0$, así que el homogéneo solo tiene la solución nula y $\operatorname{rang}A=n$, U p.30.)
2. **Consecuencia:** $n\le m$ (el rango no supera el número de filas).
3. **Aplicamos Rouché-Frobenius** (U p.30) a $AX=B$, con $X\in\mathcal M_{n\times1}$ ($n$ incógnitas):
 - Si $\operatorname{rang}(A\mid B)=\operatorname{rang}(A)=n$: compatible y el rango es igual al número de incógnitas ⇒ **compatible determinado**.
 - Si $\operatorname{rang}(A\mid B)\ne\operatorname{rang}(A)$ (solo puede ser $n+1$, y únicamente si $m>n$): **incompatible**.
4. No hay tercera posibilidad: «compatible indeterminado» exigiría $\operatorname{rang}A<n$, imposible. ∎

**Bonus (fórmula de la solución).** Si existe solución $X_0$, multiplicando $AX_0=B$ por $A^t$: $X_0=A^tB$. Por tanto la solución, si existe, es única y vale $A^tB$.

**Ejemplo** (sympy): $A=\begin{pmatrix}1&0\\0&1\\0&0\end{pmatrix}$ ($A^tA=I_2$). Con $B=(1,2,0)^t$: rangos 2 y 2, CD, $X=A^tB=(1,2)^t$. Con $B=(1,2,3)^t$: $\operatorname{rang}(A\mid B)=3$, incompatible.

**Receta.** Para probar que un sistema «nunca es indeterminado» basta probar que $\operatorname{rang}A=n$ (columnas independientes, o $AX=0\Rightarrow X=0$); el resto lo da Rouché-Frobenius.

**Error típico.** Suponer que $A$ es cuadrada (entonces sería siempre CD); con $m>n$ puede ser incompatible.

---

## 11. Test sobre la factorización LU — Sept. 2017 (tipo A), ejercicio 1

**Fuente:** `Algebra_Septiembre17A1.txt`, Ejercicio 1 (test, 1 punto). `data-ref="Sept. 2017, ejercicio 1"`. Confirmado en el PDF p.1.

**Enunciado (literal):** «La factorización $LU$ de una matriz $A$ cuadrada de orden $n$: A) Siempre es única; B) NO se puede utilizar en la resolución de un sistema de ecuaciones lineales del tipo $AX=B$; C) Permite calcular el determinante de $A$ ya que coincide con el determinante de $U$; D) Ninguna de las anteriores es cierta.»

**Solución paso a paso**

1. **Recordatorio** (U p.45-46): $A=LU$ con $L$ triangular inferior con **unos en la diagonal** y $U$ triangular superior obtenida por Gauss solo con operaciones de reemplazo $F_i\to F_i+\lambda F_j$, sin normalizar pivotes. U garantiza unicidad **cuando $A$ es regular** (p.46).
2. **A) Falsa.** Sin regularidad puede no ser única. Contraejemplo (sympy): $A=\begin{pmatrix}0&0\\0&1\end{pmatrix}$ cumple $A=\begin{pmatrix}1&0\\ \ell&1\end{pmatrix}\begin{pmatrix}0&0\\0&1\end{pmatrix}$ para **todo** $\ell\in\mathbb R$. (Además puede no existir sin permutar filas: $\begin{pmatrix}0&1\\1&0\end{pmatrix}$, que necesita $PA=LU$, U p.50.)
3. **B) Falsa.** Es justamente su uso principal: $AX=B\iff L(UX)=B$; se resuelve $LY=B$ (hacia delante) y luego $UX=Y$ (hacia atrás) (U p.49).
4. **C) Verdadera.** Por $\det(LU)=\det L\det U$ (U p.26) y como el determinante de una triangular es el producto de su diagonal, $\det L=1$; luego $\det A=\det U$ (U p.51).
5. **Respuesta: C.**

**Receta.** En test de LU, recordar las tres frases: única si $A$ es regular; sirve para resolver $AX=B$ en dos sistemas triangulares; $\det A=\det U$ porque $\det L=1$.

**Error típico.** Confundir «$L$ con unos en la diagonal» con «$U$ con unos en la diagonal» (en U no se normalizan los pivotes de $U$).

---

## 12. Cálculo de una factorización LU — Feb. 2020 (tipo B), ejercicio 1

**Fuente:** `Algebra_Febrero20B.txt`, Ejercicio 1 (1 punto). `data-ref="Feb. 2020 (tipo B), ejercicio 1"`. Confirmado en el PDF.

**Enunciado (literal):** «Calcular la factorización $LU$ de $A=\begin{pmatrix}1&0&2\\4&3&5\\2&0&1\end{pmatrix}$.»

**Solución paso a paso**

1. **¿Es única?** $\det A=-9\ne0$ (sympy), así que $A$ es regular y, si se triangulariza solo con reemplazos, la factorización es única (U p.46).
2. **PASO 1 (obtener $U$):** pivote $a_{11}=1$. Anulamos debajo con reemplazos (multiplicador = elemento / pivote):
 - $F_2\to F_2-4F_1$: $(4-4,\ 3-0,\ 5-8)=(0,3,-3)$;
 - $F_3\to F_3-2F_1$: $(2-2,\ 0-0,\ 1-4)=(0,0,-3)$.
$$A\longrightarrow\begin{pmatrix}1&0&2\\0&3&-3\\0&0&-3\end{pmatrix}=U.$$
 El elemento bajo el segundo pivote ya es 0, así que no hace falta una tercera operación (su multiplicador es 0). No se ha permutado ni normalizado: es válido.
3. **PASO 2 (obtener $L$):** $L=E^{-1}=E_1^{-1}E_2^{-1}$ (U p.46, ec. 1.7): las inversas de $F_2\to F_2-4F_1$ y $F_3\to F_3-2F_1$ son $F_2\to F_2+4F_1$ y $F_3\to F_3+2F_1$, así que
$$L=\begin{pmatrix}1&0&0\\4&1&0\\0&0&1\end{pmatrix}\begin{pmatrix}1&0&0\\0&1&0\\2&0&1\end{pmatrix}=\begin{pmatrix}1&0&0\\4&1&0\\2&0&1\end{pmatrix}.$$
 Regla práctica: en la posición $(i,j)$ de $L$ va el multiplicador $\lambda$ usado en $F_i\to F_i-\lambda F_j$ (aquí $\ell_{21}=4$, $\ell_{31}=2$, $\ell_{32}=0$).
4. **Comprobación:** $LU=\begin{pmatrix}1&0&2\\4\cdot1&4\cdot0+3&4\cdot2-3\\2\cdot1&0&2\cdot2-3\end{pmatrix}=\begin{pmatrix}1&0&2\\4&3&5\\2&0&1\end{pmatrix}=A$ ✓ (sympy `LUdecomposition` da las mismas $L$, $U$).
5. **Uso (para completar):** $\det A=\det U=1\cdot3\cdot(-3)=-9$ ✓. Y para resolver $AX=(3,12,3)^t$: $LY=B$ da $y_1=3$, $y_2=12-4\cdot3=0$, $y_3=3-2\cdot3=-3$; $UX=Y$ da $-3x_3=-3\Rightarrow x_3=1$, $3x_2-3=0\Rightarrow x_2=1$, $x_1+2=3\Rightarrow x_1=1$. Solución $(1,1,1)$ ✓.

**Receta.** LU: Gauss **sin** normalizar y **solo** con $F_i\to F_i-\lambda F_j$ ($i>j$) hasta $U$; $L$ = identidad con los multiplicadores $\lambda$ colocados en su sitio; comprobar $LU=A$.

**Error típico.** Poner en $L$ los multiplicadores con el signo cambiado ($-4$, $-2$): eso sería la matriz $E$, no $L=E^{-1}$.

---

## 13. Explicar la factorización LU y una aplicación — Feb. 2018 (tipo A), problema c

**Fuente:** `Algebra_Febrero18A.txt`, Problemas c) (1 punto). `data-ref="Feb. 2018 (tipo A), problema c"`. La solución oficial solo dice «Se trata de teoría del primer tema».

**Enunciado (literal):** «Explicar la factorización LU para matrices regulares (0.5 ptos.) y enunciar una aplicación (0.5 ptos.).»

**Solución modelo**

1. **Qué es** (U p.45-46). Si $A\in\mathcal M_n$ es regular y se puede llevar a forma triangular superior por el método de Gauss **sin normalizar los pivotes y solo con operaciones de reemplazo** $F_i\to F_i+\lambda F_j$, entonces se puede escribir **de modo único** como $A=LU$, con
 - $U$: la matriz triangular superior obtenida;
 - $L$: triangular inferior con unos en la diagonal, que guarda las operaciones hechas.
2. **Por qué funciona.** Si $E_1,\dots,E_p$ son las matrices elementales de las operaciones, $U=E_p\cdots E_1A=EA$, y $L=E^{-1}=E_1^{-1}\cdots E_p^{-1}$ (U p.46, ec. (1.6)-(1.7)). Cada $E_k^{-1}$ es triangular inferior con unos en la diagonal, y el producto también.
3. **Ejemplo** (propio, verificado con sympy). $A=\begin{pmatrix}1&1&1\\2&1&-1\\1&-1&1\end{pmatrix}$ ($\det A=-6\ne0$).
 $F_2\to F_2-2F_1$: $(0,-1,-3)$; $F_3\to F_3-F_1$: $(0,-2,0)$; $F_3\to F_3-2F_2$: $(0,0,6)$.
$$U=\begin{pmatrix}1&1&1\\0&-1&-3\\0&0&6\end{pmatrix},\qquad L=\begin{pmatrix}1&0&0\\2&1&0\\1&2&1\end{pmatrix},\qquad LU=A.$$
4. **Aplicación: resolver $AX=B$** (U p.49). Como $LUX=B$, se resuelven dos sistemas triangulares: $LY=B$ (sustitución hacia delante) y $UX=Y$ (hacia atrás). Con $B=(6,1,2)^t$:
 - $LY=B$: $y_1=6$; $2\cdot6+y_2=1\Rightarrow y_2=-11$; $6+2(-11)+y_3=2\Rightarrow y_3=18$.
 - $UX=Y$: $6z=18\Rightarrow z=3$; $-y-9=-11\Rightarrow y=2$; $x+2+3=6\Rightarrow x=1$.
 Solución $(1,2,3)$ ✓. La ventaja aparece cuando hay que resolver **muchos sistemas con la misma $A$ y distintos $B$** (p. ej. en circuitos, U p.51): la factorización se hace una sola vez.
5. **Otras aplicaciones** (U p.51): $\det A=\det U$ (aquí $1\cdot(-1)\cdot6=-6$ ✓) y $A^{-1}=U^{-1}L^{-1}$.

**Receta.** Pregunta de teoría de LU: definición (forma de $L$ y $U$ + hipótesis: regular y sin permutaciones), cómo se construye ($U$ por Gauss con reemplazos, $L=E^{-1}$), unicidad, y una aplicación con los dos sistemas triangulares. Un ejemplo $3\times3$ breve vale mucho.

**Error típico.** Dar solo «$A=LU$» sin decir qué son $L$ y $U$ ni bajo qué hipótesis; en esta asignatura «lo que no se justifica no se puntúa».

---

## 14. Enunciar y aplicar un método numérico — Feb. 2019 (tipo A), problema b

**Fuente:** `Algebra_Febrero19A.txt`, Problemas b) (1 punto). `data-ref="Feb. 2019 (tipo A), problema b"`. Solución oficial: «Pueden explicarse, método LU, QR,…».

**Enunciado (literal):** «Enunciar algún método numérico para resolver un sistema de ecuaciones lineales y mostrar sus pasos, es decir, cómo se aplica.»

**Solución modelo: método de Gauss** (U §1.4.3 p.38-39). (También valdría LU, ver ejercicio 13.)

1. **Idea.** Transformar $(A\mid B)$, mediante operaciones elementales por filas, en una matriz escalonada; el sistema obtenido es equivalente (Teorema 1.5, U p.32) y se resuelve por sustitución hacia atrás.
2. **Pasos** (U p.39): PASO 1, localizar el pivote de la primera fila (si $a_{11}=0$, intercambiar con una fila que tenga elemento no nulo en esa columna); PASO 2, normalizar el pivote si se desea y anular todo lo que hay debajo; PASOS 3-5, repetir con la fila siguiente hasta que la matriz sea escalonada; PASO 6, sustitución hacia atrás. Además, comparando rangos en la escalonada se **clasifica** el sistema (Rouché-Frobenius).
3. **Ejemplo** (propio, verificado con sympy): $x+2y+z=4$, $2x+5y+3z=10$, $x+3y+4z=8$.
$$\left(\begin{array}{ccc|c}1&2&1&4\\2&5&3&10\\1&3&4&8\end{array}\right)\xrightarrow[F_3\to F_3-F_1]{F_2\to F_2-2F_1}\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&1&3&4\end{array}\right)\xrightarrow{F_3\to F_3-F_2}\left(\begin{array}{ccc|c}1&2&1&4\\0&1&1&2\\0&0&2&2\end{array}\right).$$
 (por qué: el pivote $1$ de la fila 1 anula los $2$ y $1$ de la columna 1; el pivote $1$ de la fila 2 anula el $1$ de la fila 3.)
4. **Clasificación:** $\operatorname{rang}A=\operatorname{rang}(A\mid B)=3=n$ ⇒ compatible determinado.
5. **Sustitución hacia atrás:** $2z=2\Rightarrow z=1$; $y+z=2\Rightarrow y=1$; $x+2y+z=4\Rightarrow x=1$. Solución $(1,1,1)$; comprobación: $1+2+1=4$, $2+5+3=10$, $1+3+4=8$ ✓.
6. **Comentarios numéricos** (U p.41-42): Gauss cuesta del orden de $n^3/3$ operaciones; problemas: redondeo con pivotes pequeños (de ahí el pivoteo parcial/total) y sistemas mal condicionados (Def. 1.8, Ej. 1.31). Gauss-Jordan (U p.43) continúa hasta la escalonada reducida y evita la sustitución, pero cuesta más ($\sim n^3/2$).

**Fallo común señalado en otro examen** (Feb. 2026, 2.ª sem., pregunta 7): «hay que indicar, en las operaciones elementales, sobre qué fila se está haciendo el cambio. Muchos estudiantes simplemente han puesto, por ejemplo, $F_1+F_2$, pero se debe indicar sobre qué fila se está haciendo esa operación» (escribir $F_1\to F_1+F_2$).

**Receta.** «Enuncie un método»: nombre + idea (sistema equivalente más sencillo) + pasos numerados + un ejemplo $3\times3$ con cada operación anotada + clasificación por rangos + comprobación.

**Error típico.** Usar una fila ya «usada» para hacer ceros debajo de un pivote posterior (deshace los ceros conseguidos, U p.40 al margen).

---

## Apéndice — dudoso resuelto (contenido principal de tema 3, pero es un sistema sobredeterminado)

### A1. Vector del núcleo con dos parámetros — Sept. 2025, pregunta 3

**Fuente:** `Algebra_Septiembre25.txt`, pregunta 3 (1 punto). `data-ref="Sept. 2025, pregunta 3"`. Se puede usar en 1.4 como ejemplo de **sistema con más ecuaciones que incógnitas** (o dejarlo para el 3.2).

**Enunciado (literal):** «Sea $f:\mathbb R^3\to\mathbb R^3$ una aplicación lineal cuya matriz asociada es $M=\begin{pmatrix}1&2&1\\2&4&3\\3&6&4\end{pmatrix}$. Halle $a,b\in\mathbb R$ de manera que el vector $(10,a,b)$ pertenezca al núcleo de $f$.»

**Solución:** $(10,a,b)\in\operatorname{Nuc}f\iff M(10,a,b)^t=0$: $10+2a+b=0$, $20+4a+3b=0$, $30+6a+4b=0$. Son 3 ecuaciones con 2 incógnitas:
$$\left(\begin{array}{cc|c}2&1&-10\\4&3&-20\\6&4&-30\end{array}\right)\xrightarrow[F_3\to F_3-3F_1]{F_2\to F_2-2F_1}\left(\begin{array}{cc|c}2&1&-10\\0&1&0\\0&1&0\end{array}\right)\xrightarrow{F_3\to F_3-F_2}\left(\begin{array}{cc|c}2&1&-10\\0&1&0\\0&0&0\end{array}\right).$$
$\operatorname{rang}=2=\operatorname{rang}$ ampliada $=n$: compatible determinado; $b=0$, $a=-5$ (sympy ✓). **Receta:** con más ecuaciones que incógnitas hay que comprobar que la ecuación «sobrante» es compatible, no basta con resolver dos de ellas.

---

## Lista de excluidos (revisión de los 24 exámenes)

### Dudosos (anotados; no incluidos como ejercicios de 1.4)

| Examen (fichero) | Ítem | Motivo |
|---|---|---|
| Sept. 2025 (`Algebra_Septiembre25.txt`) | pregunta 3 | Núcleo (3.2) resuelto como sistema 3×2; resuelto en el apéndice A1. |
| Feb. 2018 A (`Algebra_Febrero18A.txt`) | ejercicio 1 ($A+B$, $A-B$ dados, calcular $A^2-B^2$) | Mismo tipo que Sept. 2025 p.7 (sistema matricial por reducción), pero el núcleo es álgebra matricial y la no conmutatividad: **1.2**. |
| Sept. 2024 (`Algebra_Septiembre24.txt`) | pregunta 1 (idéntico tipo, $A^2-B^2$) | **1.2** (fallo recurrente: elevar al cuadrado elemento a elemento / usar $(A+B)(A-B)$). |
| Feb. 2025 1.ª sem. (`Algebra_Febrero25A.txt`) | pregunta 3 ($w$ combinación lineal de $v_1,v_2,v_3$; parámetro $t$; sistema 4×3) | Combinación lineal: **2.2**. Se resuelve como sistema sobredeterminado con parámetro. |
| Sept. 2023 (`Algebra_Septiembre23.txt`) | pregunta 2 ($k$ para combinación lineal, vía determinante) | **2.2**. |
| Feb. 2024 1.ª sem. (`Algebra_Febrero24A.txt`) | pregunta 2 (matrices dependientes; sistema 4×2) y pregunta 8 (coordenadas en base de derivadas, sistema triangular 5×5) | **2.2 / 2.3**. |
| Sept. 2024 | pregunta 2 (coordenadas de una matriz en una base, sistema 4×4) | **2.3**. |
| Feb. 2022 A (`Algebra_Febrero22A2.txt`) | ejercicio 2 (sistema generador de $U$ dado por cartesianas) | Resolver un homogéneo, pero el objetivo es generadores: **2.2**. |
| Feb. 2019 B (`Algebra_Febrero19B.txt`) | ejercicio 2 (paramétricas de $U_1\cap U_2$) | **2.4**. |
| Feb. 2022 (enero) A1 (`Algebra_Febrero22A1-v2.txt`) | ejercicio 3 (sistema para $f(e_i)$) | Matriz de una aplicación: **3.3**. |
| Feb. 2020 B (`Algebra_Febrero20B.txt`) | ejercicio 4 (matriz con autoespacio de 0 dado; «sistema homogéneo asociado») | **4.2**. |
| Sept. 2019 (`Algebra_Septiembre19A.txt`) | problema a ($f(v)=\lambda v$ como homogéneo con parámetro $\lambda$) | **4.2** (vectores propios). |
| Sept. 2022 (`Algebra_Septiembre22.txt`) | ejercicio 4 (sistema 6×6 para $a,b,c,\lambda,\mu$) | **4.2**. |
| Feb. 2017 A2 (`Algebra_Febrero17A2.txt`) problema a; Sept. 2022 problema a; Feb. 2019 A ejercicio 1 | Rango por el método de Gauss | **1.2** (matrices escalonadas y rango, U §1.2.4). |
| Feb. 2026 1.ª sem. (`Algebra-Febrero2026-A.txt`) | pregunta 1 (escalonada reducida) | **1.2**. |
| Feb. 2026 2.ª sem. (`Algebra-Febrero2026-B.txt`) | pregunta 7 (escalonada reducida + base del núcleo) | **1.2 / 3.2** (se cita su «fallo común» en el ejercicio 14). |

### Excluidos claramente (otros temas)

- **Feb. 2017 A2:** ej.1 (simplificar expresión matricial, 1.2), ej.2 (sistema ligado, 2.2), ej.3 (cambio de base, 3.5), ej.4 (simétrica/vector propio, 4-5), ej.5 ($U^\perp$, 5.1), ej.6 (forma cuadrática, 6.2), probl. b (mínimos cuadrados, 5.4), probl. c (núcleo/imagen de la derivada, 3.2).
- **Feb. 2018 A:** ej.2 (generador/base, 2.2-2.3), ej.3 (núcleo, 3.2), ej.4 (matrices semejantes, 4.1-4.3), ej.5 (coseno, 5.1), ej.6 (bilineal antisimétrica, 6.1), probl. a (ortogonal, 5.1), probl. b (forma canónica, 6.3).
- **Feb. 2018 B:** ej.1 (base / sistema ligado, 2.3), ej.2 (suma directa, 2.4), ej.3 (matriz de aplicación, 3.3), ej.4 (`eigenvalues` de Maxima, 4.2), ej.5 (transformación ortogonal, 5.2), ej.6 (forma cuadrática, 6.2), probl. a (vectores propios, 4.2), probl. b (invariantes de cónica, 6.4), probl. c (mínimos cuadrados, 5.4).
- **Feb. 2019 A:** ej.2 (estructura algebraica, 2.1), ej.3 (matriz asociada, 3.3), ej.4 (diagonal semejante, 4.3), ej.5 (error cuadrático, 5.4), ej.6 (parábola, 6.4), probl. a (núcleo e imagen, 3.2), probl. c (matriz de Gram, 5.1).
- **Feb. 2019 B:** ej.1 (término del determinante, 1.3), ej.3 (aplicación lineal, 3.1), ej.4 (det de semejante, 4.1), ej.5 (base ortonormal, 5.1), ej.6 (cónica, 6.4), probl. a (diagonalización, 4.3), probl. b (QR, 5.2), probl. c (núcleo trivial, 3.2).
- **Feb. 2020 A:** ej.2 (operación interna, 2.1), ej.3 (composición, 3.4), ej.4 (Jordan, 4.4), ej.5 (diagonalización ortogonal, 5.3), ej.6 (forma cuadrática, 6.2), probl. a (subespacios, 2.4), probl. b (inversa de simétrica, 1.2).
- **Feb. 2020 B:** ej.2 (extraer base, 2.3), ej.3 (rango y núcleo, 3.2), ej.5 (proyección, 5.1), ej.6 (invariantes de cónica, 6.4), probl. a (QR, 5.2), probl. b (mínimos cuadrados, 5.4).
- **Feb. 2022 (enero) A1:** ej.1 ($A^2=A$ regular, 1.2), ej.2 (subespacios de polinomios, 2.4), ej.4 (Jordan, 4.4), ej.5 (matrices de Gram, 5.1), ej.6 (clasificación, 6.3), probl. a (cónica, 6.4), probl. b (matriz ortogonal, 5.2).
- **Feb. 2022 A:** ej.3 (núcleo e imagen, 3.2), ej.4 (simétrica, 4.2), ej.5 (Gram, 5.1), ej.6 (forma canónica, 6.3), probl. a (ortogonal/suplementario, 5.1).
- **Feb. 2023 1.ª sem.:** p.1 (determinantes, 1.3), p.2 (subespacio, 2.1), p.3 (composición, 3.4), p.4 (autovector, 4.2), p.5 (Gram, 5.1), p.6 (forma cuadrática, 6.2), p.7 (núcleo/imagen de la derivada, 3.2), p.8 (**mínimos cuadrados, 5.4**: el sistema es incompatible y se resuelven las ecuaciones normales).
- **Feb. 2023 2.ª sem.:** p.1 (matriz elemental $MA=B$, 1.2), p.2 (subespacio, 2.1), p.3 (núcleo/imagen, 3.2), p.4 (diagonalizable, 4.3), p.5 (producto escalar, 5.1), p.6 (rango de forma cuadrática, 6.2), p.7 (subespacio, base ortonormal, 2.3/5.1).
- **Feb. 2024 1.ª sem.:** p.3 (imagen, 3.2), p.4 (autovectores, 4.2), p.5 (transformación ortogonal, 5.2), p.6 (forma canónica, 6.3), p.7 (Grassmann, 2.4).
- **Feb. 2024 2.ª sem.:** p.1 (simétricas, 1.2), p.2 (determinantes, 1.3), p.3 (aplicación lineal, 3.1), p.4 (subespacio, 2.1), p.5 (norma con Gram, 5.1), p.6 (forma cuadrática, 6.2), p.7 (núcleo de $f\circ f$, 3.2-3.4), p.8 (diagonalización, 4.3).
- **Feb. 2025 1.ª sem.:** p.1 ($MA=B$, 1.2), p.2 (cambio de base, 3.5), p.4 (Jordan, 4.4), p.5 (rango de $Q$, 6.2), p.6 (forma cuadrática, 6.2), p.7 (aplicaciones, 3.x), p.8 (diagonalización, 4.3).
- **Feb. 2025 2.ª sem.:** p.1 (determinantes, 1.3), p.2 (Grassmann, 2.4), p.3 (aplicación lineal, 3.1), p.4 (diagonalizable, 4.3), p.5 (ortogonalidad de funciones, 5.1), p.6 (bilineal, 6.1), p.7 (diagonalización, $A^{51}$, 4.3), p.8 (Sylvester, 6.3).
- **Feb. 2026 1.ª sem.:** p.2 (rango de matriz asociada, 3.3), p.3 (base de $\mathcal M_{2\times2}$, 2.3), p.4 (polinomio característico, 4.2), p.5 (sistema ortogonal, 5.1), p.6 (cambio de base en bilineal, 6.1), p.7 (núcleo de $g\circ f$, 3.2-3.4), p.8 (autovalores, 4.3).
- **Feb. 2026 2.ª sem.:** p.2 (subespacio, 2.1), p.3 (aplicación lineal, 3.1), p.4 (determinante de semejante, 4.3), p.5 (norma, 5.1), p.6 (Sylvester, 6.3), p.8 (matriz en otra base y diagonalización, 3.5/4.3).
- **Sept. 2017 A1:** ej.2 (subespacio de matrices, 2.1), ej.3 (cambio de base, 3.5), ej.4 (diagonalizable, 4.3), ej.5 (proyección, 5.1), ej.6 (cónica, 6.4), probl. a (estructura, 2.1), probl. b (núcleo/imagen, 3.2).
- **Sept. 2018 A:** ej.2 (base de polinomios, 2.3), ej.3 (composición, 3.4), ej.4 ($A^{100}$, 4.3), ej.5 (**ecuaciones normales, 5.4**), ej.6 (bilineal, cambio de base, 6.1), probl. a (conmutatividad y matrices elementales, 1.2), probl. b (núcleo e imagen, 3.2), probl. c (sistema ortonormal, 5.1).
- **Sept. 2019 A:** ej.1 (matrices elementales, 1.2), ej.2 (intersección, 2.4), ej.3 (núcleo, 3.2: homogéneo 4×4), ej.4 (relación de equivalencia, 4.1), ej.5 (Gram-Schmidt, 5.1), ej.6 (rango de $Q$, 6.2), probl. b (ortogonal a tres vectores, 5.1).
- **Sept. 2022:** ej.2 (ecuaciones de un subespacio, 2.x), ej.3 (imagen y núcleo, 3.2), ej.5 (norma con Gram, 5.1), ej.6 (forma cuadrática, 6.2), probl. b ($F+G$, 2.4).
- **Sept. 2023:** p.3 (matriz de $3g-5h$, 3.4), p.4 (matriz ortogonal, 5.2), p.5 (congruencia, 6.1), p.6 (matriz de $Q$, 6.2), p.7 (núcleo/imagen, 3.2), p.8 ($A^{546}$, 4.3).
- **Sept. 2024:** p.3 (composición, 3.4), p.4 (determinante de semejante, 4.3), p.5 (proyección, 5.1), p.6 (rango de $Q$, 6.2), p.7 (suma e intersección, 2.4), p.8 (Jordan, 4.4).
- **Sept. 2025:** p.1 (determinante tras operaciones por columnas, 1.3), p.2 (dimensión de la imagen, 3.2), p.4 (proyección, 5.1), p.5 (simétrica y ortogonal, 5.2), p.6 (norma con Gram, 5.1), p.7 apartados 2-3 (base/dimensión, 2.3), p.8 (forma cuadrática, signatura, 6.3).

## Errores u omisiones detectados en las soluciones oficiales

1. **Sept. 2018, ejercicio 1:** la fila $-5x_2+x_3=5$ debe ser $-7x_2+x_3=5$; los sistemas 2.º y 3.º que da la solución **no** son equivalentes al 1.º (soluciones $(\tfrac34,-\tfrac98,-\tfrac58)$ frente a $(\tfrac34,-\tfrac34,-\tfrac14)$). Corregido en el ejercicio 5.
2. **Sept. 2025, pregunta 7 (apartado 3):** «si $\lambda A=B$ … necesariamente $\lambda=0$» es incorrecto: no existe tal $\lambda$. Comentado en el ejercicio 7.
3. (Extracción, no del examen) En los `.txt` se pierden los signos $\neq$: Feb. 2020 A ej.1 («Si m = −2, 1 … compatible determinado») y Feb. 2023 B p.8 («Si a = 0 y a = −3, … compatible determinado») significan $m\ne-2,1$ y $a\ne0,-3$ (confirmado en el PDF de Feb. 2023 B).
