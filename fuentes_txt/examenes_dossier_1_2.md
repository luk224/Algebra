# Dossier de exámenes (fuente X) — Tema 1.2: Álgebra matricial

Revisados **los 24 exámenes** de `fuentes_txt/examenes/*.txt` (más los PDF de `E:\UNED\ALGEBRA\Examenes\` cuando el texto era dudoso). Todos los cálculos se han verificado con sympy (`Matrix`, `.rref()`, `.rank()`, `.LUdecomposition()`, `.inv()`, `.det()`, pruebas simbólicas y numéricas).

**Criterio de selección.** Se incluyen las preguntas o apartados cuyo contenido principal es el de U §1.2 (p.9-22): operaciones y sus propiedades, traspuesta, simétricas, inversa, operaciones y matrices elementales, matrices equivalentes por filas, escalonadas, escalonada reducida y rango por Gauss.

**Aviso de alcance (LU y sistemas equivalentes).** El encargo menciona la factorización LU dentro del tema 1.2, pero **en U la LU está en §1.4.3 «Métodos numéricos» (p.44-49)**, y los sistemas equivalentes en **§1.4.2 (p.31-32)**. Además, `temas/tema_1_4_sistemas_ecuaciones.html` ya trata la LU (56 apariciones). Por eso esas preguntas van aparte, en el **Bloque B (frontera 1.2/1.4)**, para que el coordinador decida si van en 1.2, en 1.4 o en ambos. Todas usan matrices elementales (U §1.2.3), y eso las conecta con este tema.

**Referencias de teoría (U, página impresa, comprobadas en `ingenieros.txt`):**
- Suma, producto por escalar y producto, con sus propiedades: U §1.2.2 p.11-13 (el producto no es conmutativo: p.13).
- Traspuesta: $(A^t)^t=A$, $(A+B)^t=A^t+B^t$, $(AB)^t=B^tA^t$: U §1.2.2 p.13.
- Inversa, regular/singular, $(A^{-1})^{-1}=A$, $(AB)^{-1}=B^{-1}A^{-1}$, $(A^{-1})^t=(A^t)^{-1}$: U §1.2.2 p.13.
- Matriz simétrica ($a_{ij}=a_{ji}$, es decir, $A=A^t$): U Ejemplo 1.2 p.11.
- Operaciones elementales por filas: U p.14. Definición 1.1 (equivalentes por filas): p.15. Definición 1.2 (matriz elemental): p.15.
- Inversas de las elementales: U p.16. «Hacer una operación por filas en $A$ es calcular $EA$»: p.16. Teorema 1.1 (matriz de paso): p.18. Algoritmo de la inversa: p.18. Teorema 1.2: p.19.
- Definición 1.3 (escalonada, pivotes normalizados, escalonada reducida) y Definición 1.4: U §1.2.4 p.20. La escalonada no es única, pero la reducida sí: p.21.
- $A$ regular $\iff$ su escalonada reducida es $I_n$ $\iff$ $\operatorname{rang}A=n$. Definición 1.5 (rango = n.º de filas no nulas de una escalonada). Teorema 1.3: U p.22.
- Determinantes: $\det(AB)=\det A\det B$; triangular $\Rightarrow$ $\det$ = producto de la diagonal: U §1.3 p.26.
- Sistemas equivalentes (Definición 1.7, operaciones, Teorema 1.5): U §1.4.2 p.31-32. LU: U §1.4.3 p.44-48. Resolver $AX=B$ con $LU$: p.49. Gauss: p.38-39.

Recuento: **Bloque A = 17** preguntas o apartados, **Bloque B = 5**. **Total 22.**

---

## BLOQUE A — Contenido principal del tema 1.2

### A.1 Operaciones con matrices: $A^2-B^2$ y no conmutatividad

#### X1. Feb. 2018 (tipo A), pregunta 1 — `Algebra_Febrero18A.txt`, Ejercicio 1

**Enunciado (literal).** «Se consideran dos matrices $A$ y $B$ tales que: `A+B:matrix([3,2],[7,0])` y `A-B:matrix([2,3],[-1,0])`. Calcule $A^2-B^2$.»
(En notación matemática: $A+B=\begin{pmatrix}3&2\\7&0\end{pmatrix}$, $A-B=\begin{pmatrix}2&3\\-1&0\end{pmatrix}$.)

**Solución.**
1. **Idea.** Conocemos $A+B$ y $A-B$, pero no $A$ ni $B$. Aunque fuera tentador, **no** se puede usar $A^2-B^2=(A+B)(A-B)$. Al desarrollar con la propiedad distributiva (U p.12):
   $(A+B)(A-B)=A^2-AB+BA-B^2$.
   Eso solo vale $A^2-B^2$ si $AB=BA$, y el producto de matrices **no es conmutativo** en general (U p.13). Por tanto, primero hay que calcular $A$ y $B$.
2. **Despejar $A$.** Sumamos las dos igualdades. Esto es válido porque la suma es asociativa y conmutativa y $B+(-B)=0$ (U p.11):
   $(A+B)+(A-B)=2A=\begin{pmatrix}3&2\\7&0\end{pmatrix}+\begin{pmatrix}2&3\\-1&0\end{pmatrix}=\begin{pmatrix}5&5\\6&0\end{pmatrix}$.
   Multiplicando por el escalar $\tfrac12$: $A=\begin{pmatrix}5/2&5/2\\3&0\end{pmatrix}$.
3. **Despejar $B$.** Restamos las dos igualdades:
   $(A+B)-(A-B)=2B=\begin{pmatrix}1&-1\\8&0\end{pmatrix}$, así que $B=\begin{pmatrix}1/2&-1/2\\4&0\end{pmatrix}$.
4. **Calcular $A^2=AA$** (fila por columna, U p.12):
   $A^2=\begin{pmatrix}\frac52\cdot\frac52+\frac52\cdot3 & \frac52\cdot\frac52+\frac52\cdot0\\ 3\cdot\frac52+0\cdot3 & 3\cdot\frac52+0\end{pmatrix}=\begin{pmatrix}55/4&25/4\\15/2&15/2\end{pmatrix}$.
5. **Calcular $B^2$:**
   $B^2=\begin{pmatrix}\frac14-2 & -\frac14+0\\ 2+0 & -2+0\end{pmatrix}=\begin{pmatrix}-7/4&-1/4\\2&-2\end{pmatrix}$.
6. **Restar:**
   $$A^2-B^2=\begin{pmatrix}55/4+7/4 & 25/4+1/4\\ 15/2-2 & 15/2+2\end{pmatrix}=\begin{pmatrix}31/2&13/2\\11/2&19/2\end{pmatrix}.$$
7. **Comprobación de que el atajo falla:** $(A+B)(A-B)=\begin{pmatrix}4&9\\14&21\end{pmatrix}\neq A^2-B^2$. Aquí $AB=\begin{pmatrix}45/4&-5/4\\3/2&-3/2\end{pmatrix}\ne BA=\begin{pmatrix}-1/4&5/4\\10&10\end{pmatrix}$.

**Resultado:** $A^2-B^2=\begin{pmatrix}31/2&13/2\\11/2&19/2\end{pmatrix}$ (verificado con sympy; coincide con el examen).

**Receta.** Si te dan $A+B$ y $A-B$: $A=\tfrac12[(A+B)+(A-B)]$ y $B=\tfrac12[(A+B)-(A-B)]$. Después calcula $A^2=AA$ y $B^2=BB$ por separado. **Nunca** uses $(A+B)(A-B)$ sin comprobar antes que $AB=BA$.

**Fallo recurrente** (el examen lo señala): «en general, $A^2-B^2\neq(A+B)(A-B)$ por ser el producto de matrices no conmutativo».

---

#### X2. Sept. 2024, pregunta 1 — `Algebra_Septiembre24.txt`, pregunta 1

**Enunciado (literal).** «Sabiendo que las matrices $A,B\in M_{2\times2}$ satisfacen $A+B=\begin{pmatrix}3&3\\1&3\end{pmatrix}$ y $A-B=\begin{pmatrix}1&-1\\-1&3\end{pmatrix}$, calcule $A^2-B^2$.»

**Solución.**
1. Por la misma razón que en X1, el producto no es conmutativo (U p.13) y no se puede usar $(A+B)(A-B)$. Primero hay que hallar $A$ y $B$.
2. $2A=(A+B)+(A-B)=\begin{pmatrix}4&2\\0&6\end{pmatrix}$, luego $A=\begin{pmatrix}2&1\\0&3\end{pmatrix}$.
3. $2B=(A+B)-(A-B)=\begin{pmatrix}2&4\\2&0\end{pmatrix}$, luego $B=\begin{pmatrix}1&2\\1&0\end{pmatrix}$.
4. $A^2=\begin{pmatrix}2&1\\0&3\end{pmatrix}\begin{pmatrix}2&1\\0&3\end{pmatrix}=\begin{pmatrix}4&2+3\\0&9\end{pmatrix}=\begin{pmatrix}4&5\\0&9\end{pmatrix}$.
5. $B^2=\begin{pmatrix}1&2\\1&0\end{pmatrix}\begin{pmatrix}1&2\\1&0\end{pmatrix}=\begin{pmatrix}1+2&2+0\\1+0&2+0\end{pmatrix}=\begin{pmatrix}3&2\\1&2\end{pmatrix}$.
6. $A^2-B^2=\begin{pmatrix}1&3\\-1&7\end{pmatrix}$.
7. Contraste: $(A+B)(A-B)=\begin{pmatrix}0&6\\-2&8\end{pmatrix}$, distinto, porque $AB=\begin{pmatrix}3&4\\3&0\end{pmatrix}\ne BA=\begin{pmatrix}2&7\\2&1\end{pmatrix}$.

**Resultado:** $\begin{pmatrix}1&3\\-1&7\end{pmatrix}$ (verificado).

**Receta.** La misma que en X1.

**Fallos recurrentes** (literal del examen): «Calcular $A^2$ elevando cada elemento de la matriz al cuadrado. Recordemos que $A^2=AA$. Para calcular $A^2-B^2$ no se puede hacer $(A+B)(A-B)$ (recordemos que el producto de matrices no es, en general, conmutativo).»

---

#### X3. Sept. 2018 (tipo A), problema, apartado a) — `Algebra_Septiembre18A.txt`, Problema a)

**Enunciado (literal).** «a) (0.5 ptos.) Si $A,B$ son matrices cuadradas, se pide justificar si es cierta o no la siguiente igualdad, $(A-B)(A+B)=A^2-B^2$. (0.5 ptos.) Escribir dos matrices elementales asociadas a operaciones elementales de distinto tipo.»

**Solución.**
1. **Desarrollo.** Por la propiedad distributiva del producto respecto de la suma, por la izquierda y por la derecha (U p.12):
   $(A-B)(A+B)=A(A+B)-B(A+B)=A^2+AB-BA-B^2$.
2. Por tanto, $(A-B)(A+B)=A^2-B^2 \iff AB-BA=0 \iff AB=BA$.
3. Como el producto de matrices no es conmutativo en general (U p.13), la igualdad **no es cierta en general**. Basta un contraejemplo:
   $A=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, $B=\begin{pmatrix}1&0\\0&0\end{pmatrix}$.
   - $AB=\begin{pmatrix}1&0\\0&0\end{pmatrix}$ y $BA=\begin{pmatrix}1&1\\0&0\end{pmatrix}$, que son distintas.
   - $A^2=A$ y $B^2=B$, así que $A^2-B^2=\begin{pmatrix}0&1\\0&0\end{pmatrix}$.
   - En cambio, $(A-B)(A+B)=\begin{pmatrix}0&1\\0&0\end{pmatrix}\begin{pmatrix}2&1\\0&0\end{pmatrix}=\begin{pmatrix}0&0\\0&0\end{pmatrix}$.
   - Son distintas, luego la igualdad falla. (Verificado con sympy.)
   - Matiz: la igualdad **sí** es cierta cuando $A$ y $B$ conmutan, por ejemplo si $B=I$ o si $B=A$.
4. **Dos matrices elementales de distinto tipo.** Una matriz elemental es la que resulta de hacer **una sola** operación elemental por filas en la identidad (Def. 1.2, U p.15). Por ejemplo, en $I_3$:
   - Tipo «permutar» $F_1\leftrightarrow F_2$: $E_1=\begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix}$.
   - Tipo «multiplicar por $\alpha\ne0$» $F_2\to 2F_2$: $E_2=\begin{pmatrix}1&0&0\\0&2&0\\0&0&1\end{pmatrix}$.
   - (Tercer tipo, «reemplazo» $F_1\to F_1+5F_3$: $E_3=\begin{pmatrix}1&0&5\\0&1&0\\0&0&1\end{pmatrix}$.)

**Receta.** Para decidir si vale una «identidad notable» con matrices, desarrolla con la distributiva **sin conmutar** factores y mira qué condición queda (casi siempre $AB=BA$). Después da un contraejemplo $2\times2$ concreto. Para escribir una matriz elemental, aplica exactamente **una** operación a $I_n$ e indica cuál.

**Fallo recurrente** (examen): olvidar que puede ocurrir $AB\neq BA$.

---

#### X4. Sept. 2025, pregunta 7, primer apartado — `Algebra_Septiembre25.txt`, pregunta 7 (solo «Calcule $X+Y$»)

**Enunciado (literal, parte incluida).** «Se sabe que las matrices $X,Y\in M_{2\times2}$ satisfacen $2X+3Y=A$, $X-Y=B$, en donde $A=\begin{pmatrix}5&1\\0&4\end{pmatrix}$ y $B=\begin{pmatrix}1&-1\\2&0\end{pmatrix}$. Calcule $X+Y$ (1 PUNTO).» (Los otros dos apartados, sobre si $\{A,B,X,Y\}$ es base de $M_{2\times2}$ y la dimensión de $\langle A,B,Y\rangle$, son del tema 2 y no se incluyen.)

**Solución.**
1. **Por qué se puede «despejar» como en un sistema numérico.** Solo se usan la suma y el producto por escalares, que cumplen asociativa, conmutativa, opuesto y distributivas (U p.11-12). No aparece ningún producto de matrices, así que la falta de conmutatividad no interviene.
2. De la segunda ecuación (sumando $Y$ a ambos lados): $X=Y+B$.
3. Sustituyendo en la primera: $2(Y+B)+3Y=A$, es decir, $5Y+2B=A$, y por tanto $Y=\tfrac15(A-2B)$.
4. $A-2B=\begin{pmatrix}5&1\\0&4\end{pmatrix}-\begin{pmatrix}2&-2\\4&0\end{pmatrix}=\begin{pmatrix}3&3\\-4&4\end{pmatrix}$, así que $Y=\begin{pmatrix}3/5&3/5\\-4/5&4/5\end{pmatrix}$.
5. $X=Y+B=\begin{pmatrix}8/5&-2/5\\6/5&4/5\end{pmatrix}$.
6. $X+Y=\begin{pmatrix}11/5&1/5\\2/5&8/5\end{pmatrix}$.
7. **Comprobación:** $2X+3Y=\begin{pmatrix}16/5+9/5 & -4/5+9/5\\ 12/5-12/5 & 8/5+12/5\end{pmatrix}=\begin{pmatrix}5&1\\0&4\end{pmatrix}=A$ ✓. Y $X-Y=B$ ✓ (sympy).

**Resultado:** $X+Y=\begin{pmatrix}11/5&1/5\\2/5&8/5\end{pmatrix}$.

**Receta.** Un sistema lineal cuyas incógnitas son matrices, y que solo tiene sumas y productos por escalares, se resuelve igual que uno numérico (sustitución o reducción). Al final, comprueba sustituyendo.

---

### A.2 Traspuesta, inversa y simétricas (demostraciones cortas)

#### X5. Feb. 2017 [2] (tipo A), Ejercicio 1 (test) — `Algebra_Febrero17A2.txt`, Ejercicio 1

**Enunciado (literal).** «Sean las matrices cuadradas regulares $A,B,C$. La expresión simplificada de $[A(BC)^{-1}]^{-1}[A(A^tB^t)^t(BA)^{-1}]$ es: A) $AB$; B) $ABC$; C) $BC$; D) Ninguna de ellas.»

**Solución.** Todas las inversas existen porque $A,B,C$ son regulares, y el producto de regulares es regular, con $(AB)^{-1}=B^{-1}A^{-1}$ (U p.13).
1. **Primer corchete.** Se aplica $(MN)^{-1}=N^{-1}M^{-1}$ con $M=A$ y $N=(BC)^{-1}$:
   $[A(BC)^{-1}]^{-1}=\big((BC)^{-1}\big)^{-1}A^{-1}=(BC)A^{-1}$, usando $(M^{-1})^{-1}=M$ (U p.13).
2. **Traspuesta interior.** $(A^tB^t)^t=(B^t)^t(A^t)^t=BA$, por $(MN)^t=N^tM^t$ y $(M^t)^t=M$ (U p.13).
3. **Segundo corchete.** $A(BA)(BA)^{-1}=A\,I=A$, por la definición de inversa (U p.13) y porque $AI=A$ (U p.12).
4. **Producto total.** $(BC)A^{-1}\cdot A=BC\,(A^{-1}A)=BC\,I=BC$, por la asociatividad del producto (U p.12).
5. Comprobado numéricamente con sympy (matrices regulares aleatorias $3\times3$): la expresión coincide con $BC$ y no con $AB$ ni con $ABC$.

**Respuesta: C) $BC$.**

**Receta.** Simplifica de dentro afuera, con las tres reglas de U p.13:
- $(MN)^{-1}=N^{-1}M^{-1}$;
- $(MN)^t=N^tM^t$ (ambas **invierten el orden**);
- $(M^{-1})^{-1}=M$, $(M^t)^t=M$.

Cancela solo pares $MM^{-1}$ que estén **contiguos**: el producto no es conmutativo, así que no se pueden «juntar» factores separados.

**Error típico.** Escribir $(AB)^{-1}=A^{-1}B^{-1}$ o $(AB)^t=A^tB^t$ (sin invertir el orden), o «cancelar» $A$ con $A^{-1}$ cuando hay otra matriz en medio.

---

#### X6. Feb. 2022 (modelo A1, «Enero [1]»), Ejercicio 1 — `Algebra_Febrero22A1-v2.txt`, Ejercicio 1

**Enunciado (literal).** «Probar que si $A\in M_n$ es real, regular y tal que $A^2=A$ entonces $A$ solo puede ser la matriz unidad de orden $n$.»

**Solución.**
1. **Hipótesis útil.** $A$ es regular, luego existe $A^{-1}$ con $AA^{-1}=A^{-1}A=I_n$ (definición, U p.13).
2. Multiplicamos la igualdad $A^2=A$, es decir $AA=A$, **por la derecha** por $A^{-1}$ en los dos miembros. Hay que multiplicar por el mismo lado en ambos, porque el producto no es conmutativo:
   $(AA)A^{-1}=AA^{-1}$.
3. Por la asociatividad (U p.12), el lado izquierdo es $A(AA^{-1})=AI_n=A$. El derecho es $I_n$.
4. Luego $A=I_n$. $\blacksquare$
5. **Por qué hace falta «regular».** Sin esa hipótesis el resultado es falso: $A=\begin{pmatrix}1&0\\0&0\end{pmatrix}$ cumple $A^2=A$ (comprobado) y no es $I_2$. Es singular, porque no tiene inversa: su rango es $1<2$ (U p.22).

**Receta.** Para «cancelar» una matriz en una igualdad, multiplica **por el mismo lado** en ambos miembros por su inversa, y solo si es regular. Después usa la asociatividad y $MM^{-1}=I$.

**Error típico.** «Dividir» entre $A$ o cancelar sin justificar que $A^{-1}$ existe. Otro error es multiplicar por $A^{-1}$ por la izquierda en un miembro y por la derecha en el otro.

---

#### X7. Feb. 2020 (tipo A), problema, apartado b) — `Algebra_Febrero20A.txt`, Problemas b)

**Enunciado (literal).** «(1 pto.) Razonar si es cierta la siguiente proposición: Si $A$ es una matriz regular simétrica, entonces su inversa, $A^{-1}$, también es simétrica.»

**Solución (es cierta).**
1. **Qué hay que probar.** $A^{-1}$ es simétrica si $(A^{-1})^t=A^{-1}$ (simétrica: $a_{ij}=a_{ji}$, U p.11).
2. **Datos.** $A^t=A$ por ser simétrica, y existe $A^{-1}$ por ser regular.
3. **Vía 1 (propiedad directa, U p.13).** Para $A$ regular se cumple $(A^{-1})^t=(A^t)^{-1}$. Sustituyendo $A^t=A$: $(A^{-1})^t=A^{-1}$. $\blacksquare$
4. **Vía 2 (sin usar esa propiedad, solo la traspuesta del producto).**
   - Partimos de $AA^{-1}=I$. Trasponemos los dos miembros y usamos $(MN)^t=N^tM^t$ e $I^t=I$: $(A^{-1})^tA^t=I$.
   - Como $A^t=A$, queda $(A^{-1})^tA=I$.
   - Multiplicando por la derecha por $A^{-1}$: $(A^{-1})^t=A^{-1}$. $\blacksquare$
5. **Comprobación con un ejemplo** (sympy): $A=\begin{pmatrix}2&1\\1&1\end{pmatrix}$ es simétrica y $A^{-1}=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}$ también es simétrica.

**Receta.** Para demostrar que «$M$ es simétrica», prueba $M^t=M$. Parte de una igualdad conocida ($AA^{-1}=I$), trasponla con $(MN)^t=N^tM^t$ y sustituye la hipótesis $A^t=A$.

**Error típico.** Probarlo solo con un ejemplo: un ejemplo no demuestra una proposición general. Solo sirve para refutarla.

---

#### X8. Feb. 2024 (2.ª sem.), pregunta 1 — `Algebra_Febrero24B.txt`, pregunta 1

**Enunciado (literal).** «Razone si la siguiente afirmación es verdadera o falsa: Si $A$ y $B$ son matrices cuadradas simétricas tales que $AB$ es también simétrica, entonces $AB=BA$.»

**Solución (verdadera).**
1. **Hipótesis.** $A^t=A$ y $B^t=B$ (simétricas, U p.11), y $(AB)^t=AB$ ($AB$ simétrica).
2. **Cadena de igualdades:**
   $$AB\overset{(1)}{=}(AB)^t\overset{(2)}{=}B^tA^t\overset{(3)}{=}BA.$$
   - (1): $AB$ es simétrica.
   - (2): traspuesta del producto, que invierte el orden (U p.13).
   - (3): $A$ y $B$ son simétricas.
3. Luego $AB=BA$. $\blacksquare$
4. **La hipótesis «$AB$ simétrica» es necesaria.** Sin ella, dos simétricas no tienen por qué conmutar. Ejemplo (sympy): $A=\begin{pmatrix}1&0\\0&2\end{pmatrix}$, $B=\begin{pmatrix}0&1\\1&0\end{pmatrix}$.
   - $AB=\begin{pmatrix}0&1\\2&0\end{pmatrix}$, que no es simétrica.
   - $BA=\begin{pmatrix}0&2\\1&0\end{pmatrix}\neq AB$.

**Receta.** En las afirmaciones sobre simétricas, escribe cada hipótesis como una igualdad con traspuestas ($M^t=M$). Después encadénalas usando $(MN)^t=N^tM^t$.

---

### A.3 Operaciones y matrices elementales (matriz $M$ tal que $MA=B$)

#### X9. Feb. 2023 (2.ª sem.), pregunta 1 — `Algebra_Febrero23B.txt`, pregunta 1

**Enunciado (literal).** «Siendo $A$ y $B$ las matrices
$A=\begin{pmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{pmatrix}$, $B=\begin{pmatrix}a_{31}&a_{32}&a_{33}\\a_{21}&a_{22}&a_{23}\\-6a_{11}&-6a_{12}&-6a_{13}\end{pmatrix}$,
determine la matriz $M$ que verifica $MA=B$, sean cuales sean los coeficientes $a_{ij}\in\mathbb R$, con $1\le i\le3$, $1\le j\le3$.»

**Solución.**
1. **Idea clave (U p.16, Teorema 1.1 p.18).** Hacer una operación elemental por filas en $A$ equivale a multiplicar $A$ **por la izquierda** por la matriz elemental de esa operación. Varias operaciones $O_1,\dots,O_p$ (en ese orden) equivalen a multiplicar por $E_p\cdots E_1$.
2. **Identificar las operaciones.** Comparamos las filas de $B$ con las de $A$ ($F_i$ = fila $i$ de $A$):
   - fila 1 de $B$ = $F_3$;
   - fila 2 de $B$ = $F_2$;
   - fila 3 de $B$ = $-6F_1$.
   Se obtiene con $O_1$: $F_1\to-6F_1$ y, después, $O_2$: $F_1\leftrightarrow F_3$.
3. **Matrices elementales.** Se obtienen haciendo cada operación en $I_3$ (Def. 1.2, U p.15):
   $E_1=\begin{pmatrix}-6&0&0\\0&1&0\\0&0&1\end{pmatrix}$, $E_2=\begin{pmatrix}0&0&1\\0&1&0\\1&0&0\end{pmatrix}$.
4. **Producto en el orden correcto** (la última operación queda a la izquierda):
   $M=E_2E_1=\begin{pmatrix}0&0&1\\0&1&0\\-6&0&0\end{pmatrix}$.
5. **Atajo equivalente.** La fila $i$ de $MA$ es «fila $i$ de $M$» $\times A$. Para que la fila 1 de $MA$ sea $F_3$, la fila 1 de $M$ debe ser $(0,0,1)$. Para la fila 2, $(0,1,0)$. Para la fila 3 ($-6F_1$), $(-6,0,0)$. Es decir, **$M$ es lo que se obtiene al hacer en $I_3$ las mismas operaciones que llevan $A$ a $B$**.
6. **Comprobación simbólica** (sympy): $MA=\begin{pmatrix}a_{31}&a_{32}&a_{33}\\a_{21}&a_{22}&a_{23}\\-6a_{11}&-6a_{12}&-6a_{13}\end{pmatrix}=B$ para cualesquiera $a_{ij}$ ✓.

**Resultado:** $M=\begin{pmatrix}0&0&1\\0&1&0\\-6&0&0\end{pmatrix}$.

**Receta.** Si $B$ se obtiene de $A$ con operaciones **por filas**, entonces $M$ va **a la izquierda** ($MA=B$). Su fila $i$ indica qué combinación de filas de $A$ da la fila $i$ de $B$. Equivalente: aplica a $I$ las mismas operaciones. Si las operaciones fueran por columnas, la matriz iría a la derecha ($AM=B$; ver el margen de U p.16).

**Error típico.** Multiplicar en el orden equivocado ($E_1E_2$ en lugar de $E_2E_1$). Otro error es poner $M$ a la derecha (eso operaría columnas).

---

#### X10. Feb. 2025 (1.ª sem.), pregunta 1 — `Algebra_Febrero25A.txt`, pregunta 1

**Enunciado (literal).** «Siendo $A$ y $B$ las matrices
$A=\begin{pmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{pmatrix}$, $B=\begin{pmatrix}5a_{31}&5a_{32}&5a_{33}\\a_{11}&a_{12}&a_{13}\\-3a_{21}&-3a_{22}&-3a_{23}\end{pmatrix}$,
determine la matriz $M$ que verifica $MA=B$, sean cuales sean los coeficientes $a_{ij}\in\mathbb R$, con $1\le i\le3$, $1\le j\le3$.»

**Solución.**
1. Igual que en X9 (U p.16 y Teorema 1.1 p.18): $M$ va a la izquierda y su fila $i$ dice cómo se forma la fila $i$ de $B$ con las filas de $A$.
2. Comparando filas:
   - fila 1 de $B$ = $5F_3$, luego la fila 1 de $M$ es $(0,0,5)$;
   - fila 2 de $B$ = $F_1$, luego la fila 2 de $M$ es $(1,0,0)$;
   - fila 3 de $B$ = $-3F_2$, luego la fila 3 de $M$ es $(0,-3,0)$.
3. $M=\begin{pmatrix}0&0&5\\1&0&0\\0&-3&0\end{pmatrix}$.
4. **Como producto de elementales** (por ejemplo):
   - operaciones en orden: $F_3\to5F_3$, $F_2\to-3F_2$, y una permutación cíclica de filas;
   - la permutación cíclica son dos intercambios: $F_1\leftrightarrow F_3$ y después $F_2\leftrightarrow F_3$;
   - se comprueba que el producto de sus elementales, en ese orden, da la misma $M$.
5. **Comprobación** (sympy): $MA=B$ simbólicamente ✓.

**Resultado:** $M=\begin{pmatrix}0&0&5\\1&0&0\\0&-3&0\end{pmatrix}$.

**Receta.** La misma que en X9.

---

#### X11. Sept. 2019 (tipo A), Ejercicio 1 — `Algebra_Septiembre19A.txt`, Ejercicio 1

**Enunciado (literal).** «Comprobar si es cierta o falsa la siguiente proposición: Si $A,B\in M_{3\times3}$ son dos matrices elementales entonces $A+B$ es una matriz elemental. Nota: Utilizar distintos ejemplos de matrices elementales.»

**Solución (falsa).**
1. **Definición (Def. 1.2, U p.15).** Matriz elemental es la que resulta de hacer **una sola** operación elemental por filas en la identidad. Por tanto, una elemental difiere de $I_3$:
   - o en **una** fila (tipo «multiplicar $F_i$ por $\alpha\neq0$» o «$F_i\to F_i+\alpha F_j$»),
   - o en dos filas intercambiadas (tipo «permutar»).
2. **Contraejemplo 1.** $I_3$ es elemental (operación $F_1\to1\cdot F_1$), pero $I_3+I_3=2I_3=\begin{pmatrix}2&0&0\\0&2&0\\0&0&2\end{pmatrix}$ no lo es:
   - difiere de $I_3$ en las **tres** filas;
   - una sola operación cambia como mucho dos filas, y solo si es una permutación, que no multiplica por 2.
3. **Contraejemplo 2 (de tipos distintos).**
   - $A=\begin{pmatrix}1&0&0\\0&0&1\\0&1&0\end{pmatrix}$ ($F_2\leftrightarrow F_3$) y $B=I_3$.
   - $A+B=\begin{pmatrix}2&0&0\\0&1&1\\0&1&1\end{pmatrix}$, que tiene determinante 0 (filas 2 y 3 iguales).
   - Las elementales son regulares (U p.16), así que $A+B$ no puede ser elemental.
4. **El ejemplo del examen ($2\times2$).** $\begin{pmatrix}0&1\\1&0\end{pmatrix}+\begin{pmatrix}1&5\\0&1\end{pmatrix}=\begin{pmatrix}1&6\\1&1\end{pmatrix}$, que no es elemental:
   - cambia las dos filas de $I_2$ y no es el intercambio de filas;
   - ninguna operación de tipo 2 o 3 cambia dos filas a la vez.
5. Basta **un** contraejemplo para refutar una proposición universal.

**Receta.** Para decidir si $M$ es elemental, compárala con $I$. Debe diferir en **una sola fila** (fila multiplicada por $\alpha\neq0$, o fila más múltiplo de otra) o ser $I$ con **dos filas intercambiadas**. Un atajo útil: si $\det M=0$, no es elemental, porque las elementales son regulares (U p.16).

**Error típico.** Confundir «elemental» con «regular» o con «sencilla». La suma no conserva la propiedad.

---

### A.4 Escalonada, escalonada reducida y rango por el método de Gauss

#### X12. Feb. 2019 (tipo A), Ejercicio 1 — `Algebra_Febrero19A.txt`, Ejercicio 1

**Enunciado (literal).** «Hallar una matriz escalonada de la matriz $A=\begin{pmatrix}0&2&-1\\1&5&0\\1&-1&2\end{pmatrix}$ y, utilizando dicha matriz, calcular el rango de $A$.»

**Solución.**
1. **Objetivo.** Llegar a una matriz que cumpla la Def. 1.3 (U p.20):
   - debajo de cada pivote hay ceros;
   - cada fila empieza con más ceros que la anterior;
   - las filas nulas van al final.
   Solo se usan operaciones elementales por filas (U p.14), porque producen matrices equivalentes por filas, que tienen el mismo rango (Teorema 1.3, U p.22).
2. **$F_1\leftrightarrow F_2$.** El elemento $(1,1)$ es 0 y no puede ser pivote. Se intercambia con una fila cuyo primer elemento no sea nulo:
   $\begin{pmatrix}1&5&0\\0&2&-1\\1&-1&2\end{pmatrix}$.
3. **$F_3\to F_3-F_1$** para anular el 1 debajo del pivote de la columna 1:
   $\begin{pmatrix}1&5&0\\0&2&-1\\0&-6&2\end{pmatrix}$.
4. **$F_3\to F_3+3F_2$** para anular el $-6$ debajo del pivote 2 de la columna 2 (el múltiplo es $6/2=3$):
   $A_e=\begin{pmatrix}1&5&0\\0&2&-1\\0&0&-1\end{pmatrix}$.
5. $A_e$ es escalonada: los pivotes 1, 2 y $-1$ están en las columnas 1, 2 y 3, y no hay filas nulas.
6. **Rango.** Por la Def. 1.5 (U p.22), es el número de filas no nulas de una escalonada: $\operatorname{rang}A=3$. Como $A$ es $3\times3$, además es regular (U p.22). Comprobación: $\det A=2\neq0$ y la reducida es $I_3$ (sympy).

**Receta (Gauss para el rango).**
- Columna a columna: elige pivote no nulo (permuta filas si hace falta) y anula **solo lo que hay debajo** con $F_i\to F_i-\frac{a}{p}F_k$.
- Pasa a la siguiente fila y columna.
- Al final, cuenta las filas no nulas.
- Indica siempre **sobre qué fila** actúas.

**Error típico.** Tomar como pivote un 0. Otro error es usar operaciones «no elementales» como $F_3\to 2F_3-F_1$ sin decirlo; sí es lícita, porque son dos operaciones elementales, pero hay que indicarlo.

---

#### X13. Feb. 2017 [2] (tipo A), problema, apartado a) — `Algebra_Febrero17A2.txt`, Problema a)

**Enunciado (literal).** «a) Calcular, por el método de Gauss, el rango de $\begin{pmatrix}1&1&2&2&-1\\1&2&0&3&1\\1&0&4&1&-3\\2&1&6&3&-4\end{pmatrix}$. (1 pto.)»

**Solución.**
1. Se escalona por filas (Def. 1.3, U p.20). El rango es el número de filas no nulas de la escalonada (Def. 1.5, U p.22). Las operaciones elementales no cambian el rango (Teorema 1.3, U p.22).
2. **Columna 1** (pivote $a_{11}=1$): $F_2\to F_2-F_1$, $F_3\to F_3-F_1$, $F_4\to F_4-2F_1$:
   $\begin{pmatrix}1&1&2&2&-1\\0&1&-2&1&2\\0&-1&2&-1&-2\\0&-1&2&-1&-2\end{pmatrix}$.
3. **Columna 2** (pivote $a_{22}=1$): $F_3\to F_3+F_2$, $F_4\to F_4+F_2$:
   $\begin{pmatrix}1&1&2&2&-1\\0&1&-2&1&2\\0&0&0&0&0\\0&0&0&0&0\end{pmatrix}$.
4. La matriz es escalonada, con dos filas no nulas, así que **el rango es 2** (sympy: `rank()=2`).

**Receta.** La misma que en X12. Si al escalonar aparecen filas iguales u opuestas, una resta las convierte en filas de ceros.

---

#### X14. Sept. 2022, problema, apartado a) — `Algebra_Septiembre22.txt`, Problemas a)

**Enunciado (literal).** «a) (1 punto) Calcular, por el método de Gauss, el rango de $\begin{pmatrix}1&1&2&2&-1\\1&2&0&3&1\\1&0&4&1&-3\end{pmatrix}$.»

**Solución.**
1. Es la misma matriz que X13 sin la cuarta fila. El método es el mismo (U p.20-22).
2. $F_2\to F_2-F_1$, $F_3\to F_3-F_1$:
   $\begin{pmatrix}1&1&2&2&-1\\0&1&-2&1&2\\0&-1&2&-1&-2\end{pmatrix}$.
3. $F_3\to F_3+F_2$:
   $\begin{pmatrix}1&1&2&2&-1\\0&1&-2&1&2\\0&0&0&0&0\end{pmatrix}$.
4. Hay dos filas no nulas, así que el **rango es 2** (sympy ✓).
   - Escalonada reducida (única, U p.21): $\begin{pmatrix}1&0&4&1&-3\\0&1&-2&1&2\\0&0&0&0&0\end{pmatrix}$.

**Receta.** La misma que en X12. El examen justifica el final con «no se puede seguir escalonando»: lo que hay que decir es que la matriz **ya es escalonada** y contar sus filas no nulas.

---

#### X15. Feb. 2026 (1.ª sem.), pregunta 1 — `Algebra-Febrero2026-A.txt`, pregunta 1

**Enunciado (literal).** «Calcule de manera razonada la forma escalonada reducida de la siguiente matriz: $A=\begin{pmatrix}1&2&-3\\0&2&1\\-1&0&3\end{pmatrix}$.»

**Solución.** Escalonada reducida (Def. 1.3, U p.20): es escalonada, cada pivote vale 1 y por encima y por debajo de cada pivote solo hay ceros. Es única (U p.21).
1. **$F_3\to F_3+F_1$** para anular el $-1$ debajo del pivote $a_{11}=1$:
   $\begin{pmatrix}1&2&-3\\0&2&1\\0&2&0\end{pmatrix}$.
2. **$F_3\to F_3-F_2$** para anular el 2 debajo del pivote 2 de la columna 2:
   $\begin{pmatrix}1&2&-3\\0&2&1\\0&0&-1\end{pmatrix}$.
   Ya es escalonada, con pivotes 1, 2 y $-1$. Ahora hay que normalizar y anular por encima.
3. **$F_3\to-F_3$** para que el pivote sea 1:
   $\begin{pmatrix}1&2&-3\\0&2&1\\0&0&1\end{pmatrix}$.
4. **$F_2\to F_2-F_3$ y $F_1\to F_1+3F_3$** para anular los elementos **encima** del pivote de la columna 3:
   $\begin{pmatrix}1&2&0\\0&2&0\\0&0&1\end{pmatrix}$.
5. **$F_2\to\tfrac12F_2$** para normalizar el pivote de la columna 2:
   $\begin{pmatrix}1&2&0\\0&1&0\\0&0&1\end{pmatrix}$.
6. **$F_1\to F_1-2F_2$** para anular el 2 encima de ese pivote:
   $\begin{pmatrix}1&0&0\\0&1&0\\0&0&1\end{pmatrix}=I_3$.
7. **Conclusión.** La escalonada reducida es $I_3$, luego $A$ es regular (U p.22: regular $\iff$ reducida $=I_n$). Comprobación: $\det A=-2\neq0$; `rref` de sympy = $I_3$ ✓.

**Receta (Gauss-Jordan para la reducida).**
1. Escalona hacia abajo (ceros bajo los pivotes).
2. Normaliza cada pivote a 1.
3. Anula hacia arriba, empezando por el **último** pivote. Así no se estropean los ceros ya conseguidos.

**Nota sobre notación.** El examen escribe «$R_3\leftrightarrow R_3+R_1$». En U, $\leftrightarrow$ se reserva para **intercambiar** filas, y la sustitución se escribe $F_3\to F_3+F_1$ (U p.14). Conviene usar la notación de U.

---

#### X16. Feb. 2026 (2.ª sem.), pregunta 7, segundo apartado — `Algebra-Febrero2026-B.txt`, pregunta 7 (solo «Halle la forma escalonada reducida de $A$»)

**Enunciado (literal, contexto + apartado incluido).** «Sea $f(x,y,z,t)=(x+2y-z+3t,\,2x+4y+6t,\,-x-2y+z-3t)$ una aplicación lineal de $\mathbb R^4$ en $\mathbb R^3$. [...] Halle la forma escalonada reducida de $A$ (1 PUNTO).»
Aquí $A$ es la matriz asociada, que da el propio examen: $A=\begin{pmatrix}1&2&-1&3\\2&4&0&6\\-1&-2&1&-3\end{pmatrix}$. (Los apartados «matriz asociada» y «base de Nuc$(f)$» son del tema 3 y no se incluyen.)

**Solución.**
1. **Columna 1** (pivote 1): $F_2\to F_2-2F_1$, $F_3\to F_3+F_1$:
   $\begin{pmatrix}1&2&-1&3\\0&0&2&0\\0&0&0&0\end{pmatrix}$.
   - La columna 2 no tiene pivote: debajo del 2 de la fila 1 solo quedan ceros.
   - El siguiente pivote es el 2 de la columna 3. La matriz ya es escalonada y su rango es 2.
2. **$F_2\to\tfrac12F_2$** (normalizar):
   $\begin{pmatrix}1&2&-1&3\\0&0&1&0\\0&0&0&0\end{pmatrix}$.
3. **$F_1\to F_1+F_2$** para anular el $-1$ **encima** del pivote de la columna 3:
   $$A_r=\begin{pmatrix}1&2&0&3\\0&0&1&0\\0&0&0&0\end{pmatrix}.$$
4. sympy: `rref` $=A_r$, con columnas pivote 1 y 3 ✓.

**Receta.** La misma que en X15. Si una columna no tiene pivote, se salta y se sigue con la siguiente; los pivotes no tienen por qué estar en la diagonal.

**Fallos comunes** (literal del examen): «La forma escalonada reducida no es una matriz equivalente triangular inferior. Hay que indicar, en las operaciones elementales sobre qué fila se está haciendo el cambio. Muchos estudiantes simplemente han puesto, por ejemplo, $F_1+F_2$, pero se debe indicar sobre qué fila se está haciendo esa operación.»

---

#### X17. Sept. 2022, Ejercicio 1 — `Algebra_Septiembre22.txt`, Ejercicio 1

**Enunciado (literal).** «Razonar si son ciertas las siguientes proposiciones: A) La matriz escalonada reducida de una matriz $A$ no es única; B) Se puede obtener un sistema de ecuaciones lineales equivalente a uno dado mediante transformaciones elementales en las ecuaciones lineales que definen el sistema inicial.»

**Solución.**
1. **A) Falsa.** U p.21: «Dada una matriz $A$ su matriz escalonada no es única pero su matriz escalonada reducida sí es única».
   - Ejemplo (U Ej. 1.13-1.14, p.21): $\begin{pmatrix}1&2\\2&3\\1&1\end{pmatrix}$ tiene varias escalonadas, como $\begin{pmatrix}1&2\\0&-1\\0&0\end{pmatrix}$ o $\begin{pmatrix}1&2\\0&1\\0&0\end{pmatrix}$.
   - Su reducida es solo una: $\begin{pmatrix}1&0\\0&1\\0&0\end{pmatrix}$.
   - Lo que **no** es única es la escalonada a secas. La reducida está determinada porque sus pivotes valen 1 y tiene ceros encima y debajo de ellos.
2. **B) Verdadera.** Las tres operaciones elementales sobre ecuaciones son:
   - $E_i\leftrightarrow E_j$;
   - $E_i\to\alpha E_i$ con $\alpha\neq0$;
   - $E_i\to E_i+\alpha E_j$.

   Estas operaciones dan un sistema equivalente, es decir, con las mismas soluciones (Def. 1.7 y Teorema 1.5, U §1.4.2 p.31-32). El motivo es que equivalen a multiplicar la ampliada $(A\mid B)$ por la izquierda por matrices elementales $E_p\cdots E_1$, que son **regulares** (U p.16). Así, $A'X=B'\iff E_p\cdots E_1AX=E_p\cdots E_1B\iff AX=B$. Es lo que hace el método de Gauss.

**Receta.** En los verdadero/falso de teoría, cita el resultado exacto de U y acompáñalo de un ejemplo pequeño. Para B, la clave es «las elementales son regulares, luego se pueden deshacer».

(El apartado B pertenece formalmente a U §1.4.2, pero se apoya en las matrices elementales de 1.2.)

---

## BLOQUE B — Frontera 1.2/1.4 (en U: §1.4.2 y §1.4.3). Decidir en qué tema se colocan

#### X18. Feb. 2020 (tipo B), Ejercicio 1 — `Algebra_Febrero20B.txt`, Ejercicio 1

**Enunciado (literal).** «Calcular la factorización $LU$ de $A=\begin{pmatrix}1&0&2\\4&3&5\\2&0&1\end{pmatrix}$.»

**Solución** (método de U §1.4.3 p.45-46: PASO 1, triangular **solo** con reemplazos $F_i\to F_i+\lambda F_j$ y sin normalizar pivotes; PASO 2, $L=E^{-1}$).
1. **¿Existe y es única?** $\det A=-9\neq0$ (desarrollando por la columna 2: $3\cdot\begin{vmatrix}1&2\\2&1\end{vmatrix}=3(1-4)=-9$), luego $A$ es regular.
   - Si se puede triangular sin permutar filas, la factorización es única (U p.46).
2. **$E_1$: $F_2\to F_2-4F_1$** para anular el 4 bajo el pivote 1.
3. **$E_2$: $F_3\to F_3-2F_1$** para anular el 2. Resultado:
   $E_2E_1A=\begin{pmatrix}1&0&2\\0&3&-3\\0&0&-3\end{pmatrix}=U$.
   - El elemento $(3,2)$ ya era 0, así que no hace falta más.
   - No ha habido que permutar, luego la LU existe.
4. **$L=(E_2E_1)^{-1}=E_1^{-1}E_2^{-1}$** (Teorema 1.1 e inversas de elementales, U p.16-18). La inversa de $F_i\to F_i-\lambda F_j$ es $F_i\to F_i+\lambda F_j$:
   $E_1^{-1}=\begin{pmatrix}1&0&0\\4&1&0\\0&0&1\end{pmatrix}$, $E_2^{-1}=\begin{pmatrix}1&0&0\\0&1&0\\2&0&1\end{pmatrix}$, así que $L=\begin{pmatrix}1&0&0\\4&1&0\\2&0&1\end{pmatrix}$.
   - Truco: debajo de la diagonal de $L$ van los **multiplicadores** $4$ y $2$ que se restaron.
5. **Comprobación.** $LU=A$ ✓. sympy `LUdecomposition` da las mismas $L$ y $U$. Además, $\det A=\det L\det U=1\cdot(1\cdot3\cdot(-3))=-9$ ✓.

**Resultado:** $L=\begin{pmatrix}1&0&0\\4&1&0\\2&0&1\end{pmatrix}$, $U=\begin{pmatrix}1&0&2\\0&3&-3\\0&0&-3\end{pmatrix}$.

**Receta.**
1. Gauss solo con reemplazos $F_i\to F_i-m_{ij}F_j$ hasta obtener $U$ triangular superior.
2. $L$ es triangular inferior con unos en la diagonal y $m_{ij}$ en la posición $(i,j)$.
3. Comprueba $LU=A$.

**Error típico.** Normalizar pivotes, o permutar filas (entonces ya no es $A=LU$, sino la LU permutada). Otro error es poner en $L$ los multiplicadores con el signo cambiado.

---

#### X19. Sept. 2017 (tipo A), Ejercicio 1 (test) — `Algebra_Septiembre17A1.txt`, Ejercicio 1

**Enunciado (literal).** «La factorización $LU$ de una matriz $A$ cuadrada de orden $n$: A) Siempre es única; B) NO se puede utilizar en la resolución de un sistema de ecuaciones lineales del tipo $AX=B$; C) Permite calcular el determinante de $A$ ya que coincide con el determinante de $U$; D) Ninguna de las anteriores es cierta.»

**Solución.**
1. **A) Falsa.** U p.46 garantiza la unicidad solo si $A$ es **regular** y se triangula con reemplazos. Fuera de ese caso:
   - **Puede no existir.** $A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$ necesita un intercambio de filas: el pivote $(1,1)$ es 0 y no hay reemplazo que lo arregle.
   - **Puede no ser única.** Con $A=0_{2\times2}$, para todo $t$: $\begin{pmatrix}1&0\\t&1\end{pmatrix}\begin{pmatrix}0&0\\0&0\end{pmatrix}=0$.
2. **B) Falsa.** Es precisamente su aplicación principal (U p.49): $AX=B\iff L(UX)=B$. Se resuelve $LY=B$ por sustitución hacia adelante y después $UX=Y$ hacia atrás.
3. **C) Verdadera** (cuando $A=LU$):
   - $\det A=\det L\cdot\det U$, porque el determinante del producto es el producto de determinantes (U §1.3 p.26);
   - $L$ es triangular con unos en la diagonal, luego $\det L=1$ (determinante de una triangular = producto de la diagonal, U p.26);
   - por tanto, $\det A=\det U=u_{11}\cdots u_{nn}$. Ejemplo: en X18, $\det A=-9=1\cdot3\cdot(-3)$.
4. **D) Falsa**, porque C es cierta.

**Respuesta: C.**

**Receta.** En los test sobre LU, recuerda tres cosas:
- existe si se triangula sin permutar;
- es única si además $A$ es regular;
- sirve para resolver $AX=B$ en dos sistemas triangulares, y $\det A=\prod u_{ii}$.

---

#### X20. Feb. 2018 (tipo A), problema, apartado c) — `Algebra_Febrero18A.txt`, Problemas c)

**Enunciado (literal).** «c) Explicar la factorización $LU$ para matrices regulares (0.5 ptos.) y enunciar una aplicación (0.5 ptos.).»

**Solución (respuesta modelo).**
1. **Qué es** (U p.45-46). Si $A\in M_{n\times n}$ es regular y se puede triangular superiormente por Gauss **solo con reemplazos** $F_i\to F_i+\lambda F_j$ y sin normalizar pivotes, entonces $A=LU$ de forma **única**, donde:
   - $U$ es la triangular superior obtenida;
   - $L$ es triangular inferior con unos en la diagonal y contiene las operaciones hechas. Si $E_p\cdots E_1A=U$, entonces $L=(E_p\cdots E_1)^{-1}=E_1^{-1}\cdots E_p^{-1}$ (Teorema 1.1, U p.18).
2. **Aplicación (U p.49): resolver $AX=B$.**
   - PASO 1: resolver $LY=B$ (triangular, sustitución hacia adelante).
   - PASO 2: resolver $UX=Y$ (triangular, sustitución hacia atrás).
   - Es útil cuando hay que resolver muchos sistemas con la misma $A$ y distintos $B$, porque $A$ se factoriza una sola vez.
   - Otra aplicación es calcular $\det A=\prod u_{ii}$.
3. **Ejemplo breve propio (verificado).** $A=\begin{pmatrix}2&1\\4&5\end{pmatrix}$.
   - Factorización: $F_2\to F_2-2F_1$ da $U=\begin{pmatrix}2&1\\0&3\end{pmatrix}$ y $L=\begin{pmatrix}1&0\\2&1\end{pmatrix}$.
   - Para $B=\begin{pmatrix}3\\9\end{pmatrix}$, $LY=B$: $y_1=3$ e $y_2=9-2\cdot3=3$.
   - $UX=Y$: $3x_2=3\Rightarrow x_2=1$; $2x_1+1=3\Rightarrow x_1=1$.
   - Comprobación: $AX=(3,9)^t$ ✓.

**Receta.** La respuesta de teoría debe tener tres partes: hipótesis (regular, triangulable con reemplazos), construcción de $U$ y de $L$, y aplicación ($LY=B$, $UX=Y$). Un ejemplo $2\times2$ redondea la respuesta.

---

#### X21. Feb. 2019 (tipo A), problema, apartado b) — `Algebra_Febrero19A.txt`, Problemas b)

**Enunciado (literal).** «b) (1 pto.) Enunciar algún método numérico para resolver un sistema de ecuaciones lineales y mostrar sus pasos, es decir, cómo se aplica.»

**Solución (con el método de Gauss, U §1.4.3 p.38-39; también sirve la LU de X20).**
1. **Método de Gauss.**
   - Se forma la ampliada $(A\mid B)$ y se escalona con operaciones elementales por filas. El sistema obtenido es equivalente: Teorema 1.5, U p.32, porque las elementales son regulares.
   - Después se resuelve el sistema triangular por **sustitución hacia atrás**.
2. **Pasos sobre un ejemplo propio (verificado).** Sistema $x+y+z=6$, $2x+3y+z=11$, $x+2y+3z=14$:
   $$\left(\begin{array}{ccc|c}1&1&1&6\\2&3&1&11\\1&2&3&14\end{array}\right)\xrightarrow[F_3\to F_3-F_1]{F_2\to F_2-2F_1}\left(\begin{array}{ccc|c}1&1&1&6\\0&1&-1&-1\\0&1&2&8\end{array}\right)\xrightarrow{F_3\to F_3-F_2}\left(\begin{array}{ccc|c}1&1&1&6\\0&1&-1&-1\\0&0&3&9\end{array}\right).$$
3. **Sustitución hacia atrás.**
   - $3z=9\Rightarrow z=3$.
   - $y-z=-1\Rightarrow y=2$.
   - $x+y+z=6\Rightarrow x=1$.
   - Comprobación: $(1,2,3)$ cumple las tres ecuaciones ✓.

**Receta.** Ampliada, escalonar (anotando cada operación), comprobar los rangos y sustituir hacia atrás. Alternativas válidas: Gauss-Jordan (llega a la reducida y no necesita sustitución, U p.43) y LU (X20).

---

#### X22. Sept. 2018 (tipo A), Ejercicio 1 — `Algebra_Septiembre18A.txt`, Ejercicio 1

**Enunciado (literal).** «Escribir dos sistemas de ecuaciones lineales equivalentes entre sí tales que las matrices ampliadas asociadas sean de dimensión $3\times4$, justificando la equivalencia.»

**Solución.**
1. **Idea.** Dos sistemas son equivalentes si tienen las mismas soluciones (Def. 1.7, U p.31). Si $(A'\mid B')$ se obtiene de $(A\mid B)$ con operaciones elementales por filas, los sistemas son equivalentes (Teorema 1.5, U p.32). Basta, pues, tomar un sistema $3\times3$ y escalonar su ampliada.
2. **Sistema $S$** (el del examen): $2x_1+x_2-x_3=1$, $2x_1-x_2+x_3=2$, $x_1-3x_2=3$.
   $$\left(\begin{array}{ccc|c}2&1&-1&1\\2&-1&1&2\\1&-3&0&3\end{array}\right)\xrightarrow{F_2\to F_2-F_1}\left(\begin{array}{ccc|c}2&1&-1&1\\0&-2&2&1\\1&-3&0&3\end{array}\right)\xrightarrow[\;F_3\to F_3-F_1\;]{F_3\to 2F_3}\left(\begin{array}{ccc|c}2&1&-1&1\\0&-2&2&1\\0&-7&1&5\end{array}\right)$$
   $$\xrightarrow[\;F_3\to F_3-7F_2\;]{F_3\to 2F_3}\left(\begin{array}{ccc|c}2&1&-1&1\\0&-2&2&1\\0&0&-12&3\end{array}\right).$$
3. **Sistema equivalente $S'$:** $2x_1+x_2-x_3=1$, $-2x_2+2x_3=1$, $-12x_3=3$.
   - Ambas ampliadas son $3\times4$.
   - Son equivalentes por el Teorema 1.5: todas las operaciones son elementales.
4. **Comprobación** (sympy). Ambos sistemas tienen la misma solución única: $x_1=3/4$, $x_2=-3/4$, $x_3=-1/4$.

**Error en la solución oficial (señalarlo).**
- El examen escribe como segundo sistema $-2x_2+2x_3=1$, $-5x_2+x_3=5$. La tercera ecuación es incorrecta: $2F_3-F_1$ da $-7x_2+x_3=5$, no $-5x_2+x_3=5$.
- Como tercer sistema pone «$(-\tfrac25+2)x_3=-1$», tampoco coherente.
- Con esas ecuaciones, la solución sería $(3/4,-9/8,-5/8)$, distinta de la del sistema original (sympy). **Los sistemas oficiales no son equivalentes.** (Comprobado sobre el PDF renderizado, no es un fallo de extracción.)

**Receta.** Para fabricar sistemas equivalentes, aplica a la ampliada operaciones elementales anotadas y cita el Teorema 1.5. Para estar seguro, comprueba que una solución de uno lo es del otro.

**Error típico.** Mezclar en un solo paso operaciones como «$F_3\to2F_3-F_1$» y equivocarse en la aritmética, como le ocurre a la solución oficial.

---

## No incluidos (y por qué)

- **1.3 Determinantes:**
  - Feb19B Ej. 1: signo de un término del desarrollo.
  - Feb23A p.1 y Feb25B p.1: determinante tras operaciones por filas.
  - Feb24B p.2: $\det(ABA^t)$.
  - Sept25 p.1: $\det B^t$ tras operaciones por columnas.
- **1.4 Sistemas** (Rouché, discusión con parámetros):
  - Feb20A Ej. 1, Feb23B p.8, Feb24A p.1, Sept23 p.1, Feb26B p.1.
  - Feb22A2 Pb. b): ortogonal $m\times n$ y sistema; además usa $A^tA=I$, de 5.2.
- **Matrices ortogonales (U §5.2 p.214; no se definen en 1.2):**
  - Sept25 p.5: simétrica con $A^2=I$, ¿ortogonal?
  - Feb22A1 Pb. b): $s,t$ para que sea ortogonal.
  - Sept23 p.4: ortogonal $2\times2$ con primera fila dada.
- **Tema 2** (dependencia lineal, bases, coordenadas, rango de un sistema de vectores):
  - Feb17A2 Ej. 2, Feb18B Ej. 1, Feb20B Ej. 2, Feb23B p.7, Feb24A p.2.
  - Sept25 p.7, apartados 2.º y 3.º.
- **Tema 3** (matriz asociada, composición, núcleo e imagen):
  - Sept23 p.3 ($3g-5h$), Feb23A p.3, Sept24 p.3.
  - Feb26B p.7, apartados 1.º y 3.º.
- **Temas 4-6:**
  - Diagonalización y Jordan: Feb26A p.4 y similares.
  - Producto escalar, QR y mínimos cuadrados: Feb20B Pb., Feb19A Ej. 5.
  - Formas cuadráticas y bilineales, cónicas: Feb26A p.6, Sept18A Ej. 6.
- **Sin contenido 1.2:** Feb24A (1.ª sem. 2024) no tiene ninguna pregunta del tema 1.2. Su $A^2-B^2$ está en **Sept. 2024**, y la ecuación «AB» citada como candidata es en realidad el $A^2-B^2$ de **Feb. 2018**. Tampoco tienen preguntas de 1.2 Feb18B, Feb19B, Feb22A2, Feb23A, Feb25B y Sept23.
