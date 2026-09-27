# Soluciones comentadas — Sección 1.4 Sistemas de ecuaciones lineales (Ejercicios 1.30 a 1.44)

Fuentes: **E** = *Ejercicios de Álgebra para Ingenieros* (páginas impresas, E p.30-44); **U** = *Álgebra para Ingenieros* (páginas impresas, U p.28-51).
Todos los cálculos se han verificado con Python/sympy (`rank`, `det`, `rref`, `linsolve`, `LUdecomposition`, `solve`).
Los enunciados se han contrastado con `pdftotext -raw` **y con el PDF renderizado como imagen**, porque la extracción de texto pierde el símbolo $\neq$ (lo convierte en «=»). Esto afecta a los enunciados de los ejercicios 1.32 y 1.39 (ver avisos ⚠).

**Herramientas de teoría que se usan (U):**

| Herramienta | Referencia |
|---|---|
| Sistema, forma matricial $AX=B$, matriz ampliada $(A\mid B)$, sistema homogéneo | U §1.4.1, p.29 |
| Teorema 1.4 (si hay más de una solución, hay infinitas) | U p.30 |
| Clasificación por rangos (Rouché-Frobenius): incompatible $\Leftrightarrow \operatorname{rang}(A)\neq\operatorname{rang}(A\mid B)$; compatible determinado $\Leftrightarrow \operatorname{rang}(A)=\operatorname{rang}(A\mid B)=n$; compatible indeterminado $\Leftrightarrow \operatorname{rang}(A)=\operatorname{rang}(A\mid B)=k<n$, con $n-k$ parámetros. Los homogéneos siempre son compatibles | U p.30 |
| Definición 1.7 (sistemas equivalentes) y Teorema 1.5 (las operaciones elementales por filas dan sistemas equivalentes) | U §1.4.2, p.31-32 |
| Regla de Cramer | U p.33 |
| Paso cartesianas $\leftrightarrow$ paramétricas (Ejemplos 1.27 y 1.28) | U p.33-35 |
| Método de Gauss (pasos 1-4) y Gauss-Jordan | U p.38-39 y p.43 |
| Factorización $LU$ (PASO 1 y PASO 2, fórmulas (1.6)-(1.7)), unicidad si $A$ es regular, Ejemplos 1.33-1.36 | U p.45-49 |
| $LU$ permutada $PA=LU$ (Ejemplo 1.37); usos de $LU$: $A^{-1}=U^{-1}L^{-1}$ y $\det A = 1\cdot\det U$ | U p.50-51 |
| Rango mediante menores («el rango es el mayor orden de un menor no nulo»); $A$ regular $\Leftrightarrow \det A\neq 0$ | U §1.3, p.27 |
| Propiedades del determinante: $\det(AB)=\det A\det B$; si $A$ es triangular, $\det A=a_{11}\cdots a_{nn}$ | U §1.3.3, p.26 |
| $A$ regular $\Leftrightarrow \operatorname{rang}(A)=n$ (U p.22); $(AB)^{-1}=B^{-1}A^{-1}$ (U p.13); inversas de matrices elementales (U p.16); Teorema 1.3: equivalentes por filas $\Rightarrow$ mismo rango (U p.22) | U p.13-22 |

**Orden de estudio sugerido** (de fácil a difícil; la numeración se conserva): 1.30 → 1.36 → 1.35 → 1.34 → 1.37 → 1.41 → 1.31 → 1.39 → 1.40 → 1.32 → 1.33 → 1.38 → 1.44 → 1.43 → 1.42. Abajo los ejercicios aparecen en orden numérico.

---

## Ejercicio 1.30 (E p.30)

> **Enunciado.** Se pide elegir la opción correcta, si existe:
> A) Un sistema homogéneo es siempre compatible determinado.
> B) Existe una solución común a cualquier sistema homogéneo.
> C) Un sistema homogéneo puede ser incompatible.

**Solución.**

1. **Qué es un homogéneo.** Un sistema es homogéneo si todos sus términos independientes son $0$, es decir, es de la forma $AX=0$ (U p.29).
2. **B es cierta.** La columna nula $X=0$ cumple $A\cdot 0=0$ para cualquier matriz $A$. Por tanto $X=0$ (la «solución trivial») es solución de *todos* los sistemas homogéneos: es una solución común.
3. **C es falsa.** La matriz ampliada es $(A\mid 0)$: añadir una columna de ceros no cambia el rango (cualquier menor que use esa columna es nulo; o bien, al escalonar, la columna de ceros sigue siendo de ceros y no crea pivotes). Así $\operatorname{rang}(A)=\operatorname{rang}(A\mid 0)$ y, por la clasificación por rangos (U p.30), el sistema es **siempre compatible**. (Más directo aún: el paso 2 ya muestra una solución, luego no puede ser incompatible.)
4. **A es falsa.** Compatible *determinado* exige $\operatorname{rang}(A)=n$ (número de incógnitas). Contraejemplo: $x+y=0$ (una ecuación, dos incógnitas) tiene $\operatorname{rang}(A)=1<2$ y las infinitas soluciones $(\lambda,-\lambda)$.

**Respuesta: B.**

**Receta.** Homogéneo $\Rightarrow$ siempre compatible ($X=0$ es solución). Será determinado (solo la nula) si y solo si $\operatorname{rang}(A)=n$; si $\operatorname{rang}(A)<n$, indeterminado.

**Error típico.** Pensar que «homogéneo» significa «solo la solución nula». Eso ocurre únicamente cuando $\operatorname{rang}(A)=n$.

**Teoría:** U §1.4.1, p.29-30 («como $\operatorname{rang}(A)=\operatorname{rang}(A\mid 0)$, los sistemas homogéneos siempre son compatibles»).

---

## Ejercicio 1.31 (E p.30)

> **Enunciado.** Los valores de $a$ y $b$ que hacen que el sistema dado por
> $$(a-1)x+2y=0,\quad (a+b)x-y=0,\quad bx-4y=0$$
> sea compatible e indeterminado cumplen la condición: A) $a+b=1$. B) $a+b=-1$.

**Solución.**

1. **Tipo de sistema.** Homogéneo, $m=3$ ecuaciones, $n=2$ incógnitas. Por el ejercicio 1.30 es siempre compatible; solo hay que decidir cuándo es indeterminado.
2. **Condición de indeterminado.** Por la clasificación por rangos (U p.30), indeterminado $\Leftrightarrow \operatorname{rang}(A)<n=2$, con
$$A=\begin{pmatrix} a-1 & 2\ a+b & -1\ b & -4\end{pmatrix}.$$
El rango no puede ser $0$ (la columna 2 tiene entradas $2,-1,-4\neq 0$), luego necesitamos $\operatorname{rang}(A)=1$.
3. **Rango 1 con menores.** El rango es el mayor orden de un menor no nulo (U p.27). $\operatorname{rang}(A)=1$ $\Leftrightarrow$ los tres menores de orden 2 se anulan:
$$\begin{vmatrix} a-1&2\ a+b&-1\end{vmatrix}=-3a-2b+1=0,\qquad
\begin{vmatrix} a-1&2\ b&-4\end{vmatrix}=-4a-2b+4=0,\qquad
\begin{vmatrix} a+b&-1\ b&-4\end{vmatrix}=-4a-3b=0.$$
4. **Resolver.** Restando las dos primeras: $(-3a-2b+1)-(-4a-2b+4)=a-3=0\Rightarrow a=3$; entonces $-9-2b+1=0\Rightarrow b=-4$. Comprobación en la tercera: $-12+12=0$ ✓. Única solución: $a=3,\ b=-4$.
5. **Comprobación.** Con $a=3,b=-4$: $A=\begin{pmatrix}2&2\-1&-1\-4&-4\end{pmatrix}$, todas las filas proporcionales a $(1,1)$, rango 1 ✓ (sympy: `rank()=1`).
6. **Elegir opción.** $a+b=3-4=-1$. **Respuesta: B.**

**Matiz** (no lo dice E): la opción B es una condición *necesaria* que cumplen los valores buscados, no *suficiente*: por ejemplo $a=0,b=-1$ cumple $a+b=-1$ pero el menor $\begin{vmatrix}-1&2\-1&-1\end{vmatrix}=3\neq0$ y el sistema es determinado. La pregunta dice «cumplen la condición», así que B es la respuesta correcta.

**Receta.** Homogéneo con $n$ incógnitas: indeterminado $\Leftrightarrow \operatorname{rang}(A)<n$. Si $A$ no es cuadrada, imponer que se anulen *todos* los menores de orden $n$ y resolver el sistema (no lineal en general) de parámetros.

**Error típico.** Anular un solo menor de orden 2: con eso solo se obtiene una recta de valores $(a,b)$ y no se garantiza rango 1.

**Teoría:** U p.30 (clasificación por rangos, homogéneos), U p.27 (rango por menores).

---

## Ejercicio 1.32 (E p.31)

> ⚠ **Enunciado verificado en el PDF renderizado** (la extracción de texto pierde los $\neq$):
>
> **Enunciado.** El sistema $\begin{cases}2x+3y-z=2\ bx+ay+2z=0\ 5x+5y+z=0\end{cases}$ es:
> A) Compatible indeterminado si $a=2$ y $b\neq 3$.
> B) Compatible determinado si $a\neq 2$ y $b=3$.
> C) Incompatible si $a=2$ y $b=5$.

**Solución.**

1. **Matrices.** $A=\begin{pmatrix}2&3&-1\ b&a&2\ 5&5&1\end{pmatrix}$, $(A\mid B)=\left(\begin{array}{ccc|c}2&3&-1&2\ b&a&2&0\ 5&5&1&0\end{array}\right)$, $n=3$ incógnitas.
2. **Determinante de $A$** (desarrollo por la primera fila, U §1.3):
$$|A|=2(a-10)-3(b-10)-1(5b-5a)=7a-8b+10.$$
3. **$\operatorname{rang}(A)\ge 2$ siempre**, porque el menor $\begin{vmatrix}2&3\5&5\end{vmatrix}=-5\neq 0$ no depende de los parámetros (U p.27).
4. **Caso $7a-8b+10\neq 0$.** Entonces $\operatorname{rang}(A)=3$; como $(A\mid B)$ tiene 3 filas, $\operatorname{rang}(A\mid B)\le 3$ y contiene a $A$, luego también vale 3. $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=3=n$: **compatible determinado** (U p.30).
5. **Caso $7a-8b+10=0$.** $\operatorname{rang}(A)=2$. Los menores de orden 3 de $(A\mid B)$ que usan la columna $B$ son (sympy):
$$\begin{vmatrix}2&3&2\ b&a&0\5&5&0\end{vmatrix}=10(b-a),\quad
\begin{vmatrix}2&-1&2\ b&2&0\5&1&0\end{vmatrix}=2b-20,\quad
\begin{vmatrix}3&-1&2\ a&2&0\5&1&0\end{vmatrix}=2a-20.$$
Los tres se anulan a la vez solo si $a=b=10$ (que efectivamente cumple $70-80+10=0$). Por tanto:
   - $7a-8b+10=0$ y $a\neq 10$: $\operatorname{rang}(A\mid B)=3\neq 2$ → **incompatible**;
   - $a=b=10$: $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=2<3$ → **compatible indeterminado** (1 parámetro).
6. **Opciones.**
   - A) $a=2$, $b\neq 3$: $|A|=14-8b+10=8(3-b)\neq 0$ → determinado. **Falsa.**
   - B) $a\neq 2$, $b=3$: $|A|=7a-24+10=7(a-2)\neq 0$ → rango 3 = rango de la ampliada = $n$ → **compatible determinado. Cierta.**
   - C) $a=2$, $b=5$: $|A|=14-40+10=-16\neq0$ → determinado, no incompatible. **Falsa.**

**Respuesta: B.**

**Observación sobre E.** Al justificar C, E dice que $a=2,b=5$ «es un caso particular de A) y de B)»; en realidad solo es caso particular de A) ($a=2$, $b\neq3$), no de B) (que exige $b=3$). La conclusión es correcta.
⚠ **Aviso sobre el texto extraído:** si se lee el `.txt` sin los $\neq$, las opciones quedan «A) … si $a=2$ y $b=3$; B) … si $a=2$ y $b=3$», y con $a=2,b=3$ se tiene $|A|=0$ y el sistema sería **incompatible** (sympy: $\operatorname{rang}A=2$, $\operatorname{rang}(A\mid B)=3$). La versión mal extraída llevaría a una respuesta distinta; la correcta es la de arriba.

**Receta.** Sistema cuadrado con parámetros: (1) calcular $|A|$; (2) donde $|A|\neq0$, compatible determinado; (3) en los valores que anulan $|A|$, calcular los menores de orden $\operatorname{rang}(A)+1$ de la ampliada (orlando un menor no nulo de $A$ con la columna $B$) para decidir entre incompatible e indeterminado.

**Error típico.** Concluir «incompatible» solo porque $|A|=0$: hay que comparar con el rango de la ampliada (aquí, $a=b=10$ da indeterminado).

**Teoría:** U p.30 (clasificación por rangos), U p.27 (rango por menores; $A$ regular $\Leftrightarrow |A|\neq0$).

---

## Ejercicio 1.33 (E p.32)

> **Enunciado.** Calcúlese el conjunto de soluciones de los sistemas de ecuaciones de los ejercicios 1.31 y 1.32 dependiendo del valor de sus parámetros.

**Solución — sistema del 1.31** $\;(a-1)x+2y=0,\ (a+b)x-y=0,\ bx-4y=0$.

1. **Caso $a=3,\ b=-4$** (indeterminado, ejercicio 1.31). El sistema es $2x+2y=0,\ -x-y=0,\ -4x-4y=0$; las tres ecuaciones son múltiplos de $x+y=0$, así que (Teorema 1.5, U p.32) es equivalente a $x+y=0$. Hay $n-\operatorname{rang}=2-1=1$ parámetro (U p.30). Tomando $x=\alpha$:
$$\{(x,y)=(\alpha,-\alpha):\ \alpha\in\mathbb R\}.$$
2. **Caso $a\neq3$ o $b\neq-4$.** Algún menor de orden 2 es no nulo, $\operatorname{rang}(A)=2=n$ y el homogéneo es compatible determinado: su única solución es la trivial, $\{(0,0)\}$.

**Solución — sistema del 1.32** $\;2x+3y-z=2,\ bx+ay+2z=0,\ 5x+5y+z=0$.

3. **Caso $7a-8b+10\neq0$ (determinado).** Es un sistema cuadrado con $|A|\neq0$, así que se puede aplicar **Cramer** (U p.33): cada incógnita es el cociente entre el determinante que resulta de sustituir su columna por $B=(2,0,0)^t$ y $|A|$:
$$x=\frac{\begin{vmatrix}2&3&-1\0&a&2\0&5&1\end{vmatrix}}{7a-8b+10}=\frac{2a-20}{7a-8b+10},\quad
y=\frac{\begin{vmatrix}2&2&-1\b&0&2\5&0&1\end{vmatrix}}{7a-8b+10}=\frac{20-2b}{7a-8b+10},\quad
z=\frac{\begin{vmatrix}2&3&2\b&a&0\5&5&0\end{vmatrix}}{7a-8b+10}=\frac{10b-10a}{7a-8b+10}.$$
(Los determinantes se desarrollan cómodamente por la columna que tiene dos ceros.) Comprobado con sympy ($A^{-1}B$).
4. **Caso $a=b=10$ (indeterminado).** La segunda ecuación $10x+10y+2z=0$ es el doble de la tercera: $10x+10y+2z = 2\,(5x+5y+z)$. Por el Teorema 1.5 el sistema equivale a $2x+3y-z=2,\ 5x+5y+z=0$. Sumando ambas: $7x+8y=2$. Tomando $z=5\mu$ para evitar fracciones: de la segunda $x+y=-\mu$, y con $7x+8y=2$ resulta $y=2+7\mu$, $x=-2-8\mu$. Solución:
$$\{(x,y,z)=(-2-8\mu,\ 2+7\mu,\ 5\mu):\ \mu\in\mathbb R\}.$$
Comprobación: $2(-2-8\mu)+3(2+7\mu)-5\mu=2$ ✓; $5(-2-8\mu)+5(2+7\mu)+5\mu=0$ ✓; $10x+10y+2z=-20-80\mu+20+70\mu+10\mu=0$ ✓ (sympy `linsolve` da lo mismo con $z$ libre: $x=-2-\tfrac85z$, $y=2+\tfrac75z$).
5. **Caso $7a-8b+10=0$ y $a\neq10$ (incompatible).** Conjunto de soluciones vacío, $\varnothing$.

**Omisiones de E.** (i) E no da la expresión explícita de la solución en el caso $a=b=10$ (solo dice que «depende de un parámetro»); aquí está en el paso 4. (ii) E no menciona que en el caso incompatible el conjunto de soluciones es $\varnothing$, aunque el enunciado pide el conjunto «dependiendo del valor de sus parámetros».

**Receta.** Primero clasificar (rangos). Después: determinado cuadrado → Cramer o Gauss; indeterminado → quitar ecuaciones redundantes, escalonar y tomar como parámetros las incógnitas sin pivote; incompatible → $\varnothing$.

**Error típico.** Aplicar Cramer cuando $|A|=0$ (divide entre cero) u olvidar el caso incompatible al listar los conjuntos de soluciones.

**Teoría:** U p.30 (número de parámetros $n-k$), U p.32 (Teorema 1.5), U p.33 (regla de Cramer).

---

## Ejercicio 1.34 (E p.33)

> **Enunciado.** Se pide comprobar si son equivalentes los sistemas:
> $$S_1=\begin{cases}2x+4y-3z=-2\ x+2y-z=-1\ 8x+16y-11z=-8\end{cases},\quad S_2=\begin{cases}3x+6y-4z=-3\ 2x+4y-2z=-2\ 5x+10y-7z=-5\end{cases},\quad S_3=\begin{cases}2x+4y-3z=-2\ x+2y-z=-1\end{cases},\quad S_4=\begin{cases}x-y=2\ 2x-2y=4\end{cases}.$$

**Solución.**

1. **Qué hay que ver.** Dos sistemas son equivalentes si tienen **las mismas soluciones** (Definición 1.7, U p.31). Una forma de probarlo (Teorema 1.5, U p.32): si la matriz ampliada de uno se obtiene de la del otro por operaciones elementales por filas, son equivalentes.
2. **$S_1\equiv S_2$.** Partimos de $(A_1\mid B_1)$:
$$\left(\begin{array}{ccc|c}2&4&-3&-2\1&2&-1&-1\8&16&-11&-8\end{array}\right)
\xrightarrow{F_1\to F_1+F_2}
\left(\begin{array}{ccc|c}3&6&-4&-3\1&2&-1&-1\8&16&-11&-8\end{array}\right)
\xrightarrow{F_2\to 2F_2}
\left(\begin{array}{ccc|c}3&6&-4&-3\2&4&-2&-2\8&16&-11&-8\end{array}\right)
\xrightarrow{F_3\to F_3-F_1}
\left(\begin{array}{ccc|c}3&6&-4&-3\2&4&-2&-2\5&10&-7&-5\end{array}\right).$$
La última es $(A_2\mid B_2)$. Las tres operaciones son elementales (dos reemplazos y un producto por el escalar no nulo $2$), así que por el Teorema 1.5 $S_1$ y $S_2$ son equivalentes. (Comprobación: sympy da la misma forma escalonada reducida para ambas.)
3. **$S_1\equiv S_3$.** La tercera ecuación de $S_1$ es combinación de las dos primeras:
$$(8,16,-11,-8)-3(2,4,-3,-2)-2(1,2,-1,-1)=(0,0,0,0),$$
es decir, $E_3=3E_1+2E_2$. Haciendo $F_3\to F_3-3F_1$ y luego $F_3\to F_3-2F_2$ (Teorema 1.5), $S_1$ equivale al sistema formado por $E_1$, $E_2$ y $0=0$; la ecuación $0x+0y+0z=0$ la cumple cualquier terna, así que se puede suprimir sin cambiar el conjunto de soluciones. Queda exactamente $S_3$. Luego $S_1\equiv S_3$ (y, por transitividad, $S_2\equiv S_3$).
4. **Comprobación directa (la «otra vía» de E).** En $S_3$, $E_1-2E_2$ da $-z=0$, luego $z=0$ y $x+2y=-1$. Soluciones de $S_1$, $S_2$ y $S_3$: $\{(-1-2\lambda,\lambda,0):\lambda\in\mathbb R\}$ (compatibles indeterminados, $\operatorname{rang}=2<3$, 1 parámetro).
5. **$S_4$ no es equivalente a ninguno.** Sus soluciones son pares $(x,y)$ (dos incógnitas), no ternas $(x,y,z)$: los conjuntos de soluciones viven en sitios distintos y no pueden coincidir. Incluso si se interpretara $S_4$ en $\mathbb R^3$ con $z$ libre, tampoco: $(2,0,5)$ cumple $x-y=2$ pero no es solución de $S_1$ (que exige $z=0$).

**Receta.** Para ver si dos sistemas con las mismas incógnitas son equivalentes: escalonar (o reducir) las dos matrices ampliadas y comparar (quitando filas nulas), o bien resolver ambos y comparar los conjuntos de soluciones.

**Error típico.** Creer que dos sistemas con distinto número de ecuaciones no pueden ser equivalentes (las ecuaciones redundantes no aportan nada), o que dos sistemas con infinitas soluciones y el mismo número de parámetros son equivalentes sin comparar los conjuntos.

**Teoría:** U §1.4.2, p.31-32 (Definición 1.7, operaciones elementales, Teorema 1.5).

---

## Ejercicio 1.35 (E p.34)

> **Enunciado.** Las ecuaciones $\begin{cases}x=2\alpha\ y=\beta-1\ z=\alpha-\beta\end{cases}$ siendo $\alpha,\beta\in\mathbb R$, representan las ecuaciones paramétricas de un sistema. Se pide calcular unas ecuaciones cartesianas de dicho sistema.

**Solución.**

1. **Cuántas ecuaciones cartesianas.** Hay 3 incógnitas $(x,y,z)$ y 2 parámetros. Los parámetros son «independientes»: la matriz de sus coeficientes $\begin{pmatrix}2&0\0&1\1&-1\end{pmatrix}$ tiene rango 2. Por la relación «nº de parámetros $=n-\operatorname{rang}$» (U p.30), el sistema buscado tiene rango $3-2=1$: basta **una** ecuación cartesiana.
2. **Vía 1: eliminar parámetros.** De la 1ª, $\alpha=x/2$; de la 2ª, $\beta=y+1$. Sustituyendo en la 3ª: $z=\dfrac{x}{2}-y-1$. Multiplicando por 2 y ordenando:
$$\boxed{\,2z-x+2y=-2\,}.$$
3. **Vía 2: rangos (método de U, Ejemplo 1.28, p.34-35).** Un punto $(x,y,z)$ está en el conjunto si y solo si existen $\alpha,\beta$ con $2\alpha=x$, $\beta=y+1$, $\alpha-\beta=z$, es decir, si ese sistema **en las incógnitas $\alpha,\beta$** es compatible. Como el rango de su matriz de coeficientes es 2, la condición es
$$\operatorname{rang}\begin{pmatrix}2&0&x\0&1&y+1\1&-1&z\end{pmatrix}=2\iff \det\begin{pmatrix}2&0&x\0&1&y+1\1&-1&z\end{pmatrix}=0\iff 2z-x+2(y+1)=0,$$
la misma ecuación (determinante comprobado con sympy: $-x+2y+2z+2$).
4. **Comprobación.** $2(\alpha-\beta)-2\alpha+2(\beta-1)=-2$ ✓ para todo $\alpha,\beta$.

**Receta.** Paramétricas → cartesianas: nº de ecuaciones $= n-$ (nº de parámetros independientes). Eliminar parámetros por sustitución, o imponer que el sistema en los parámetros sea compatible (rango de coeficientes $=$ rango de la ampliada, con determinante o escalonando).

**Error típico.** Olvidar el término independiente (escribir $2z-x+2y=0$): el conjunto no pasa por el origen ($\alpha=\beta=0$ da el punto $(0,-1,0)$).

**Teoría:** U p.34-35 («Paso de ecuaciones paramétricas a ecuaciones cartesianas», Ejemplo 1.28).

---

## Ejercicio 1.36 (E p.35)

> **Enunciado.** Calcúlense las ecuaciones paramétricas del sistema $\begin{cases}x-y+2z=2\ y-3z=1\ 2x-3y+7z=3\end{cases}$

**Solución.**

1. **Matriz ampliada:** $(A\mid B)=\left(\begin{array}{ccc|c}1&-1&2&2\0&1&-3&1\2&-3&7&3\end{array}\right)$.
2. **Escalonar (Gauss sin normalizar, U p.38-39).** Ceros bajo el pivote $1$ de la fila 1: $F_3\to F_3-2F_1$ da $(0,-1,3,-1)$. Cero bajo el pivote $1$ de la fila 2: $F_3\to F_3+F_2$ da $(0,0,0,0)$:
$$\left(\begin{array}{ccc|c}1&-1&2&2\0&1&-3&1\0&0&0&0\end{array}\right).$$
3. **Clasificar.** $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=2$ (dos pivotes; las operaciones elementales conservan el rango, Teorema 1.3, U p.22) $<3=n$ → compatible indeterminado con $3-2=1$ parámetro (U p.30).
4. **Elegir parámetro.** Las incógnitas con pivote son $x$ (col. 1) e $y$ (col. 2); la que no tiene pivote, $z$, hace de parámetro (criterio del Ejemplo 1.27, U p.33-34): $z=\lambda$.
5. **Retrosustitución.** $y=1+3z=1+3\lambda$; $x=2+y-2z=2+(1+3\lambda)-2\lambda=3+\lambda$:
$$\begin{cases}x=3+\lambda\ y=1+3\lambda\ z=\lambda\end{cases}\quad\lambda\in\mathbb R.$$
6. **Comprobación** en la 3ª ecuación original: $2(3+\lambda)-3(1+3\lambda)+7\lambda=6-3+(2-9+7)\lambda=3$ ✓ (sympy `rref` da $x-z=3$, $y-3z=1$).

**Receta.** Cartesianas → paramétricas: escalonar la ampliada, comprobar compatibilidad, tomar como parámetros las incógnitas de columnas **sin pivote** y despejar las demás de abajo arriba.

**Error típico.** Escribir paramétricas sin comprobar antes que $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)$ (si el sistema es incompatible no existen), o equivocarse en el número de parámetros ($n-\operatorname{rang}$, no $n-m$).

**Teoría:** U p.33-34 (Ejemplo 1.27), U p.30, U p.38-39 (Gauss).

---

## Ejercicio 1.37 (E p.36)

> **Enunciado.** Se pide resolver por el método de Gauss el sistema $\begin{cases}2x-y+z=8\ -x+y-3z=2\ 2x-3y+5z=3\end{cases}$

**Solución.** El método de Gauss de U (p.38-39) lleva la ampliada a forma escalonada **con pivotes normalizados** (iguales a 1) y después resuelve por retrosustitución.

1. $(A\mid B)=\left(\begin{array}{ccc|c}2&-1&1&8\-1&1&-3&2\2&-3&5&3\end{array}\right)$.
2. **Normalizar el primer pivote** ($a_{11}=2\neq0$): $F_1\to\tfrac12F_1$ da $\left(1,-\tfrac12,\tfrac12,4\right)$.
3. **Ceros bajo el pivote:** $F_2\to F_2+F_1$ da $\left(0,\tfrac12,-\tfrac52,6\right)$; $F_3\to F_3-2F_1$ da $(0,-2,4,-5)$.
4. **Normalizar el segundo pivote:** $F_2\to 2F_2$ da $(0,1,-5,12)$.
5. **Cero bajo él:** $F_3\to F_3+2F_2$ da $(0,0,-6,19)$.
6. **Normalizar el tercer pivote:** $F_3\to -\tfrac16F_3$ da $\left(0,0,1,-\tfrac{19}{6}\right)$. Resultado:
$$\left(\begin{array}{ccc|c}1&-\tfrac12&\tfrac12&4\0&1&-5&12\0&0&1&-\tfrac{19}{6}\end{array}\right).$$
7. **Clasificar.** Tres pivotes: $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=3=n$ → compatible determinado (U p.30). Por el Teorema 1.5 (U p.32) este sistema triangular es equivalente al original.
8. **Retrosustitución.** $z=-\tfrac{19}{6}$; $y=12+5z=12-\tfrac{95}{6}=-\tfrac{23}{6}$; $x=4+\tfrac12y-\tfrac12z=4-\tfrac{23}{12}+\tfrac{19}{12}=4-\tfrac13=\tfrac{11}{3}$.
$$\boxed{x=\tfrac{11}{3},\quad y=-\tfrac{23}{6},\quad z=-\tfrac{19}{6}}$$
9. **Comprobación** en la 1ª ecuación: $\tfrac{22}{3}+\tfrac{23}{6}-\tfrac{19}{6}=\tfrac{44+23-19}{6}=8$ ✓; en la 2ª: $-\tfrac{22}{6}-\tfrac{23}{6}+\tfrac{57}{6}=2$ ✓ (sympy `rref` confirma).

**Receta.** Gauss: para cada columna, (i) pivote no nulo (intercambiar filas si hace falta), (ii) normalizarlo, (iii) anular lo de debajo con reemplazos $F_i\to F_i+\lambda F_j$; al final, retrosustitución.

**Error típico.** Errores de signo al operar con fracciones. Truco: se puede posponer la normalización y trabajar con enteros: con $F_2\to 2F_2+F_1$ y $F_3\to F_3-F_1$ se obtienen $(0,1,-5,12)$ y $(0,-2,4,-5)$ sin fracciones.

**Teoría:** U p.38-39 (método de Gauss, PASOS 1-4), U p.30, U p.32.

---

## Ejercicio 1.38 (E p.37-38)

> **Enunciado.** En la descomposición $LU$ de $A=\begin{pmatrix}1&2&-1\-1&2&-3\3&-1&-2\end{pmatrix}$, la matriz $L$ es:
> A) $\begin{pmatrix}1&0&0\-1&1&0\3&-\tfrac74&1\end{pmatrix}$. B) $\begin{pmatrix}-1&0&0\-1&1&0\3&-7&1\end{pmatrix}$. C) $\begin{pmatrix}0&1&0\1&1&0\0&0&1\end{pmatrix}$.

**Solución.**

1. **Descartes por definición** (U p.45: $L$ es triangular inferior **con unos en la diagonal**). B tiene $-1$ en la posición $(1,1)$: falsa. C tiene un $1$ en la posición $(1,2)$, por encima de la diagonal (no es triangular inferior), y un $0$ en la diagonal: falsa.
2. **Existencia y unicidad.** $\det A=-24\neq0$ (sympy), así que $A$ es regular; si además se puede triangularizar solo con reemplazos, la factorización existe y es única (U p.46). Lo comprobamos al calcular $U$.
3. **PASO 1: obtener $U$** (Gauss sin normalizar, solo reemplazos $F_i\to F_i+\lambda F_j$):
   - $E_1$: $F_2\to F_2+F_1$ → $(0,4,-4)$.
   - $E_2$: $F_3\to F_3-3F_1$ → $(0,-7,1)$.
   - $E_3$: $F_3\to F_3+\tfrac74F_2$ → $(0,-7+7,\ 1-7)=(0,0,-6)$.
$$U=E_3E_2E_1A=\begin{pmatrix}1&2&-1\0&4&-4\0&0&-6\end{pmatrix}.$$
No ha habido intercambios: la factorización existe.
4. **PASO 2: obtener $L$.** Por (1.7) (U p.46), $L=(E_3E_2E_1)^{-1}=E_1^{-1}E_2^{-1}E_3^{-1}$ (inversa de un producto, U p.13). La inversa de un reemplazo $F_i\to F_i+\lambda F_j$ es $F_i\to F_i-\lambda F_j$ (U p.16), así que en $L$ la entrada $(i,j)$ es **el multiplicador cambiado de signo**:
   - $E_1$ usó $+1$ en $(2,1)$ → $l_{21}=-1$;
   - $E_2$ usó $-3$ en $(3,1)$ → $l_{31}=3$;
   - $E_3$ usó $+\tfrac74$ en $(3,2)$ → $l_{32}=-\tfrac74$.
$$L=\begin{pmatrix}1&0&0\-1&1&0\3&-\tfrac74&1\end{pmatrix}.$$
(Con el producto en el orden $E_1^{-1}E_2^{-1}E_3^{-1}$ los multiplicadores se colocan sin mezclarse; sympy `LUdecomposition` da exactamente esta $L$ y esta $U$.)
5. **Comprobación:** fila 3 de $LU$: $3(1,2,-1)-\tfrac74(0,4,-4)+(0,0,-6)=(3,\,6-7,\,-3+7-6)=(3,-1,-2)$ ✓.

**Respuesta: A.**

**Erratas de E (p.38).** En la explicación de las operaciones inversas: «Op. inversa de la Op. elemental 2: $F_3\to F_3+3F_1$. Sustitución de la fila 3ª por su suma con la 1ª multiplicada por $-3$» — debe decir **multiplicada por $3$**. Y «Op. inversa de la Op. elemental 3: $F_3\to F_3-\tfrac74F_2$ … multiplicada por $\tfrac74$» — debe decir **multiplicada por $-\tfrac74$**. Las matrices $E_2^{-1}$, $E_3^{-1}$ y $L$ que da E sí son correctas.

**Receta.** $LU$ sin intercambios: triangularizar $A$ con reemplazos $F_i\to F_i+\lambda F_j$ ($j<i$) → eso es $U$; en $L$ (unos en la diagonal) poner $-\lambda$ en la posición $(i,j)$.

**Error típico.** Poner en $L$ el multiplicador con su mismo signo (daría $l_{21}=1$, $l_{31}=-3$, $l_{32}=\tfrac74$), o normalizar pivotes (entonces $U$ no es la de la factorización de U, que se hace «sin normalizar»).

**Teoría:** U p.45-46 (factorización $LU$, PASOS 1-2, (1.6)-(1.7), unicidad para regulares), U p.16 (inversas de elementales), Ejemplos 1.33-1.35 (U p.46-48).

---

## Ejercicio 1.39 (E p.39)

> ⚠ **Enunciado verificado en el PDF renderizado** (la extracción de texto convierte los $\neq$ en «=», de modo que A y B aparecen idénticas):
>
> **Enunciado.** El sistema de ecuaciones $\begin{cases}x+by+z=1\ y+az=b\ x+(b-1)y+2z=1\end{cases}$ es compatible indeterminado cuando los valores de $a$ y $b$ son:
> A) $a=-1,\ b\neq0$. B) $a\neq-1,\ b\neq0$. C) $a=b=-1$. D) Otros.

**Solución.**

1. **Matrices.** $A=\begin{pmatrix}1&b&1\0&1&a\1&b-1&2\end{pmatrix}$, $(A\mid B)=\left(\begin{array}{ccc|c}1&b&1&1\0&1&a&b\1&b-1&2&1\end{array}\right)$.
2. **$\operatorname{rang}(A)\ge2$** siempre: el menor $\begin{vmatrix}1&b\0&1\end{vmatrix}=1\neq0$ (U p.27).
3. **$|A|$.** Restando la fila 1 a la 3 (no cambia el determinante, U p.26): $\begin{vmatrix}1&b&1\0&1&a\0&-1&1\end{vmatrix}=1\cdot(1+a)=a+1$.
4. **Condición necesaria.** Indeterminado exige $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)<3$ (U p.30); como $\operatorname{rang}(A)\ge 2$, hace falta $\operatorname{rang}(A)=2$, es decir, $|A|=0\iff a=-1$. Con $a\neq -1$ el sistema es compatible determinado. Esto ya descarta **B**.
5. **Con $a=-1$, rango de la ampliada.** Los otros menores de orden 3 de $\left(\begin{array}{ccc|c}1&b&1&1\0&1&-1&b\1&b-1&2&1\end{array}\right)$ (sympy):
   - columnas 2,3,4: $\begin{vmatrix}b&1&1\1&-1&b\b-1&2&1\end{vmatrix}=-b^2-b=-b(b+1)$;
   - columnas 1,3,4: $\begin{vmatrix}1&1&1\0&-1&b\1&2&1\end{vmatrix}=-b$;
   - columnas 1,2,4: $\begin{vmatrix}1&b&1\0&1&b\1&b-1&1\end{vmatrix}=b$.

   Todos se anulan $\iff b=0$. Así, con $a=-1$: $\operatorname{rang}(A\mid B)=2$ si $b=0$ (indeterminado) y $=3$ si $b\neq0$ (incompatible).
6. **Conclusión.** Es compatible indeterminado **exactamente cuando $a=-1$ y $b=0$**.
   - A) $a=-1,\ b\neq0$: incompatible. Falsa.
   - B) $a\neq-1$: determinado. Falsa.
   - C) $a=b=-1$: es un caso de A ($b=-1\neq0$) → incompatible. Falsa (sympy: $\operatorname{rang}A=2$, $\operatorname{rang}(A\mid B)=3$).
   - Los valores correctos $a=-1,\ b=0$ no aparecen en A-C.

**Respuesta: D.**

**Receta.** Igual que en 1.32: $|A|$ para localizar dónde baja el rango; en esos valores, menores de la ampliada para decidir entre compatible e incompatible.

**Error típico.** Basarse solo en $|A|=0$ y marcar A o C sin comprobar la ampliada.

**Teoría:** U p.30 (clasificación), U p.27 (rango por menores), U p.26 (sumar a una fila un múltiplo de otra no cambia el determinante).

---

## Ejercicio 1.40 (E p.40)

> **Enunciado.** Se pide clasificar el sistema del Ejercicio 1.39 para los distintos valores de los parámetros $a$ y $b$ mediante el método de eliminación Gaussiana.

**Solución.**

1. **Escalonar** (solo reemplazos con coeficientes numéricos, así que no hay que discutir divisiones):
$$\left(\begin{array}{ccc|c}1&b&1&1\0&1&a&b\1&b-1&2&1\end{array}\right)\xrightarrow{F_3\to F_3-F_1}\left(\begin{array}{ccc|c}1&b&1&1\0&1&a&b\0&-1&1&0\end{array}\right)\xrightarrow{F_3\to F_3+F_2}\left(\begin{array}{ccc|c}1&b&1&1\0&1&a&b\0&0&1+a&b\end{array}\right).$$
2. **Sistema equivalente** (Teorema 1.5, U p.32): $x+by+z=1,\quad y+az=b,\quad (1+a)z=b$.
3. **Discusión según el último pivote** $1+a$:
   - **$a\neq-1$:** tres pivotes → $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=3$ → **compatible determinado**. Retrosustitución: $z=\dfrac{b}{1+a}$; $y=b-az=\dfrac{b(1+a)-ab}{1+a}=\dfrac{b}{1+a}$; $x=1-by-z=1-\dfrac{b^2+b}{1+a}=\dfrac{1+a-b^2-b}{1+a}$.
   - **$a=-1$:** la última fila es $(0,0,0\mid b)$.
     - $b\neq0$: la ecuación $0=b$ es imposible → $\operatorname{rang}(A)=2\neq3=\operatorname{rang}(A\mid B)$ → **incompatible**.
     - $b=0$: la última fila es nula → $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=2<3$ → **compatible indeterminado** con 1 parámetro. El sistema queda $x+z=1$, $y-z=0$; $z$ no tiene pivote, $z=\alpha$: $x=1-\alpha,\ y=\alpha,\ z=\alpha$, $\alpha\in\mathbb R$.
4. **Comprobación** (sympy `linsolve` con $a,b$ simbólicos): $\left(\frac{a-b^2-b+1}{a+1},\frac{b}{a+1},\frac{b}{a+1}\right)$ ✓; para $a=-1,b=0$: $(1-z,z,z)$ ✓.

| Valores | $\operatorname{rang}A$ | $\operatorname{rang}(A\mid B)$ | Tipo |
|---|---|---|---|
| $a\neq-1$ | 3 | 3 | Compatible determinado |
| $a=-1,\ b=0$ | 2 | 2 | Compatible indeterminado (1 parámetro) |
| $a=-1,\ b\neq0$ | 2 | 3 | Incompatible |

**Receta.** Con parámetros, escalonar preferentemente con operaciones que **no** dividan entre expresiones con parámetros; al final, discutir los pivotes que dependen de ellos (¿se anulan?) y, si se anulan, mirar el término independiente de esa fila.

**Error típico.** Dividir por $1+a$ antes de discutir el caso $a=-1$.

**Teoría:** U p.38-39 (Gauss), U p.30 (clasificación), U p.32 (Teorema 1.5).

---

## Ejercicio 1.41 (E p.41)

> **Enunciado.** Si $AX=B$, se pide elegir la opción correcta:
> A) Si el sistema tiene 5 incógnitas, 4 ecuaciones y $\operatorname{rang}A=4$, el sistema es compatible y su solución se puede hallar mediante el método de Gauss-Jordan.
> B) Si $A$ es regular, el sistema es compatible determinado.
> C) Si la matriz ampliada tiene 4 columnas, $B=(0,0,0)^t$ y $\operatorname{rang}A=2$, el sistema solo tiene la solución nula.

**Solución.**

1. **B es cierta.** «Regular» significa que existe $A^{-1}$ (U p.13), luego $A$ es cuadrada $n\times n$ y $\operatorname{rang}(A)=n$ (U p.22). La ampliada $(A\mid B)$ es $n\times(n+1)$: su rango es a lo sumo $n$ (tiene $n$ filas) y al menos $\operatorname{rang}(A)=n$. Así $\operatorname{rang}(A)=\operatorname{rang}(A\mid B)=n$ → compatible determinado (U p.30). De forma directa: multiplicando $AX=B$ por $A^{-1}$ a la izquierda, $X=A^{-1}B$, y esa es la única solución.
2. **C es falsa.** 4 columnas en la ampliada → 3 incógnitas; $B=(0,0,0)^t$ → 3 ecuaciones y sistema homogéneo, luego compatible. Como $\operatorname{rang}(A)=2<3=n$, es compatible **indeterminado** (1 parámetro): tiene infinitas soluciones, no solo la nula.
3. **A: análisis.** $A$ es $4\times5$ con $\operatorname{rang}A=4$; la ampliada es $4\times6$ y su rango es $\le4$ (4 filas) y $\ge4$: $\operatorname{rang}(A\mid B)=4$. Luego es compatible, e **indeterminado** ($4<5$, 1 parámetro). Gauss-Jordan (U p.43) sirve para cualquier sistema compatible: da la escalonada reducida y de ella la solución general, como hace E.

**Respuesta de E: B** (la única inequívocamente cierta).

**Observación crítica sobre la opción A.** E declara A falsa argumentando que el sistema es compatible *indeterminado* y «no es compatible determinado». Pero **el enunciado literal de A no dice «determinado»**: solo dice «compatible y su solución se puede hallar mediante Gauss-Jordan», lo cual, leído literalmente, es verdadero (Gauss-Jordan halla el conjunto de soluciones, que depende de un parámetro). El libro parece interpretar «su solución» como «su única solución». En un examen tipo test, con B claramente cierta, la respuesta esperada es B; pero conviene saber que la falsedad de A depende de esa lectura.

**Receta.** Contar: $n$ = columnas de $A$ (= columnas de la ampliada $-1$), $m$ = filas. Si $\operatorname{rang}A=m$ (máximo por filas), el sistema es compatible; si además $m<n$, indeterminado. Regular ⇒ cuadrada de rango máximo ⇒ determinado.

**Error típico.** Confundir el número de columnas de la ampliada con el número de incógnitas (hay una menos).

**Teoría:** U p.30, U p.13 y p.22 (regular $\Leftrightarrow$ rango $n$), U p.43 (Gauss-Jordan).

---

## Ejercicio 1.42 (E p.42)

> **Enunciado.** Teniendo en cuenta las propiedades siguientes:
> *Las matrices triangulares superiormente (resp. inferiormente) verifican que su producto es de nuevo una matriz triangular superior (resp. inferior). Si además, son regulares, sus matrices inversas también son triangulares del mismo tipo.*
> Se pide demostrar que si $A$ es regular y posee factorización $LU$, dicha factorización es única.

**Solución.**

1. **Planteamiento.** Supongamos dos factorizaciones $A=L_1U_1=L_2U_2$, con $L_1,L_2$ triangulares inferiores con unos en la diagonal y $U_1,U_2$ triangulares superiores. Hay que probar $L_1=L_2$ y $U_1=U_2$.
2. **Todas son regulares.** El determinante de una triangular es el producto de su diagonal (U p.26), así que $\det L_1=\det L_2=1\neq0$: $L_1,L_2$ son regulares (U p.27). Por $\det(AB)=\det A\det B$ (U p.26): $0\neq\det A=\det L_1\det U_1=\det U_1$, y análogamente $\det U_2=\det A\neq0$. Luego $U_1,U_2$ también son regulares.
3. **Separar las $L$ de las $U$.** De $L_1U_1=L_2U_2$, multiplicando por $L_2^{-1}$ a la izquierda y por $U_1^{-1}$ a la derecha:
$$T:=L_2^{-1}L_1=U_2U_1^{-1}.$$
4. **$T$ es triangular inferior con unos en la diagonal.** Por las propiedades del enunciado, $L_2^{-1}$ es triangular inferior y el producto $L_2^{-1}L_1$ también. Falta ver la diagonal (E lo afirma sin justificar):
   - Si $M,N$ son triangulares inferiores, $(MN)_{ii}=\sum_k m_{ik}n_{ki}$; como $m_{ik}=0$ para $k>i$ y $n_{ki}=0$ para $k<i$, solo queda $k=i$: $(MN)_{ii}=m_{ii}n_{ii}$.
   - Aplicado a $L_2L_2^{-1}=I$: $(L_2)_{ii}(L_2^{-1})_{ii}=1$, y como $(L_2)_{ii}=1$, resulta $(L_2^{-1})_{ii}=1$.
   - Entonces $T_{ii}=(L_2^{-1})_{ii}(L_1)_{ii}=1\cdot1=1$.
5. **$T$ es triangular superior.** $U_1^{-1}$ es triangular superior (enunciado) y el producto $U_2U_1^{-1}$ también.
6. **$T=I$.** Una matriz que es a la vez triangular inferior (ceros por encima de la diagonal) y superior (ceros por debajo) es diagonal; y su diagonal son unos (paso 4). Luego $T=I$.
7. **Conclusión.** $L_2^{-1}L_1=I\Rightarrow L_1=L_2$ (multiplicando por $L_2$ a la izquierda). $U_2U_1^{-1}=I\Rightarrow U_2=U_1$ (multiplicando por $U_1$ a la derecha). $\blacksquare$

**Comentario sobre E.** La demostración de E es correcta en su estructura, pero (i) no justifica por qué $L_2^{-1}L_1$ tiene unos en la diagonal (paso 4), que es precisamente lo que fuerza $T=I$ (sin eso solo se obtendría que $T$ es diagonal); (ii) escribe «$U_1=U_2$ porque $U_2^{-1}U_1=I$», cuando lo que se ha obtenido es $U_2U_1^{-1}=I$; ambas igualdades equivalen a $U_1=U_2$, pero la deducción directa es la del paso 7.

**Por qué hace falta «$A$ regular».** Si $A$ es singular la factorización puede no ser única. Ejemplo: $\begin{pmatrix}0&0\0&0\end{pmatrix}=\begin{pmatrix}1&0\ c&1\end{pmatrix}\begin{pmatrix}0&0\0&0\end{pmatrix}$ para cualquier $c\in\mathbb R$.

**Receta.** Unicidad de factorizaciones: igualar las dos, pasar los factores de un tipo a un lado y los del otro tipo al otro lado, y observar que la matriz resultante pertenece a dos clases cuya intersección es solo $\{I\}$.

**Error típico.** Escribir $U_1^{-1}$ sin haber probado antes que $U_1$ es invertible.

**Teoría:** U p.45-46 (definición de $LU$; «en el caso de que la matriz $A$ sea regular, la factorización $LU$ es única»), U p.26 (determinante del producto y de una triangular), U p.27 ($A$ regular $\Leftrightarrow\det A\neq0$).

---

## Ejercicio 1.43 (E p.43)

> **Enunciado.** La factorización $LU$ de una matriz $A$ cuadrada verifica:
> A) Siempre existe.
> B) Permite resolver sistemas de ecuaciones mediante sistemas triangulares.
> C) Permite calcular el determinante de $A$ vía el determinante de $U$.
> D) Ninguna de las anteriores.

**Solución.**

1. **A es falsa.** La factorización $LU$ (sin permutar) existe cuando $A$ se puede triangularizar solo con reemplazos $F_i\to F_i+\lambda F_j$ (U p.45, PASO 1: «si es posible»). Contraejemplo concreto: $A=\begin{pmatrix}0&1\1&0\end{pmatrix}$ (regular, $\det A=-1$). Si fuese $A=LU=\begin{pmatrix}1&0\ l&1\end{pmatrix}\begin{pmatrix}u_{11}&u_{12}\0&u_{22}\end{pmatrix}$, la entrada $(1,1)$ daría $u_{11}=0$ y la $(2,1)$ daría $l\,u_{11}=1$, es decir $0=1$: imposible. (Para estas matrices está la $LU$ permutada $PA=LU$, U p.50.)
2. **B es cierta.** Si $A=LU$, $AX=B\iff L(UX)=B$. Llamando $Y=UX$: se resuelve primero $LY=B$ (triangular inferior, por sustitución progresiva) y luego $UX=Y$ (triangular superior, por retrosustitución). Así lo hace U (Ejemplo 1.36, p.49).
3. **C es cierta.** $\det A=\det(L)\det(U)$ (U p.26) y $\det L=1$ por ser triangular con unos en la diagonal. Luego $\det A=\det U=u_{11}u_{22}\cdots u_{nn}$ (U p.51: «$\det(A)=1\cdot\det(U)$»).
4. **D es falsa**, porque B y C son ciertas.

**Respuesta: B y C** (el enunciado admite varias ciertas). Naturalmente, B y C se refieren a matrices para las que la factorización existe.

**Nota sobre E.** E escribe la operación de reemplazo como «$F_i\leftrightarrow F_i+\lambda F_j$»; la notación correcta es $F_i\to F_i+\lambda F_j$ ($\leftrightarrow$ se reserva en U para intercambios de filas).

**Receta.** Recordar los usos de $LU$ (U p.51): resolver $AX=B$ con dos sistemas triangulares, $\det A=\det U$, $A^{-1}=U^{-1}L^{-1}$; y que puede no existir sin permutar filas.

**Error típico.** Pensar que toda matriz regular tiene $LU$: el contraejemplo del paso 1 es regular.

**Teoría:** U p.45-51 (factorización $LU$, $LU$ permutada, usos), U p.26.

---

## Ejercicio 1.44 (E p.44)

> **Enunciado.** Calcúlese la factorización $LU$ de la matriz $A=\begin{pmatrix}2&-2&4\1&-3&1\3&7&5\end{pmatrix}$ para resolver el sistema $AX=\begin{pmatrix}0\-5\7\end{pmatrix}$.

**Solución.**

1. **PASO 1: $U$** (reemplazos sin normalizar, U p.45). Pivote $a_{11}=2$:
   - $F_2\to F_2-\tfrac12F_1$: $(1,-3,1)-\tfrac12(2,-2,4)=(0,-2,-1)$;
   - $F_3\to F_3-\tfrac32F_1$: $(3,7,5)-\tfrac32(2,-2,4)=(0,10,-1)$;
   - pivote $-2$: $F_3\to F_3+5F_2$: $(0,10,-1)+5(0,-2,-1)=(0,0,-6)$.
$$U=\begin{pmatrix}2&-2&4\0&-2&-1\0&0&-6\end{pmatrix}.$$
Sin intercambios, y $\det A=\det U=2\cdot(-2)\cdot(-6)=24\neq0$ → la factorización existe y es única (U p.46).
2. **PASO 2: $L$** = multiplicadores cambiados de signo en su posición (como en 1.38): $l_{21}=\tfrac12$, $l_{31}=\tfrac32$, $l_{32}=-5$:
$$L=\begin{pmatrix}1&0&0\ \tfrac12&1&0\ \tfrac32&-5&1\end{pmatrix}.$$
(sympy `LUdecomposition` da exactamente estas $L$ y $U$.)
3. **Resolver $LY=B$** (sustitución progresiva, de arriba abajo): $y_1=0$; $\tfrac12y_1+y_2=-5\Rightarrow y_2=-5$; $\tfrac32y_1-5y_2+y_3=7\Rightarrow y_3=7-25=-18$. Así $Y=(0,-5,-18)^t$.
4. **Resolver $UX=Y$** (retrosustitución): $-6z=-18\Rightarrow z=3$; $-2y-z=-5\Rightarrow -2y=-2\Rightarrow y=1$; $2x-2y+4z=0\Rightarrow 2x=2-12=-10\Rightarrow x=-5$.
$$\boxed{X=(-5,\ 1,\ 3)^t}$$
5. **Comprobación en $AX=B$:** $2(-5)-2(1)+4(3)=0$ ✓; $-5-3+3=-5$ ✓; $-15+7+15=7$ ✓.

**Receta.** $AX=B$ con $LU$: (1) $U$ por reemplazos; (2) $L$ con los multiplicadores cambiados de signo; (3) $LY=B$ de arriba abajo; (4) $UX=Y$ de abajo arriba.

**Error típico.** Resolver $UY=B$ y luego $LX=Y$ (orden cambiado): como $A=LU$, primero se «deshace» $L$.

**Teoría:** U p.45-49 (PASOS 1-2, Ejemplo 1.36).

---

# Ejemplos propios (dificultad creciente)

## Propio 1 — Gauss con pivotes normalizados, sistema 3×3 compatible determinado

**Enunciado (propio).** Resolver por Gauss $\begin{cases}2x+4y-2z=4\ x+3y+z=10\ 3x+y+2z=11\end{cases}$

1. $(A\mid B)=\left(\begin{array}{ccc|c}2&4&-2&4\1&3&1&10\3&1&2&11\end{array}\right)\xrightarrow{F_1\to\frac12F_1}\left(\begin{array}{ccc|c}1&2&-1&2\1&3&1&10\3&1&2&11\end{array}\right)$.
2. $F_2\to F_2-F_1$: $(0,1,2,8)$; $F_3\to F_3-3F_1$: $(0,-5,5,5)$.
3. El segundo pivote ya vale 1. $F_3\to F_3+5F_2$: $(0,0,15,45)$; $F_3\to\frac1{15}F_3$: $(0,0,1,3)$.
$$\left(\begin{array}{ccc|c}1&2&-1&2\0&1&2&8\0&0&1&3\end{array}\right)$$
4. Tres pivotes: $\operatorname{rang}A=\operatorname{rang}(A\mid B)=3=n$ → compatible determinado (U p.30). Retrosustitución: $z=3$; $y=8-2z=2$; $x=2-2y+z=1$.
5. Solución $(1,2,3)$. Comprobación: $2+8-6=4$ ✓, $1+6+3=10$ ✓, $3+2+6=11$ ✓ (sympy `rref`).

## Propio 2 — Sistema 2×2 con parámetro que cambia de clasificación

**Enunciado (propio).** Clasificar y resolver según $k\in\mathbb R$: $\begin{cases}x+ky=1\ kx+y=1\end{cases}$

1. $A=\begin{pmatrix}1&k\k&1\end{pmatrix}$, $|A|=1-k^2=(1-k)(1+k)$.
2. **$k\neq\pm1$:** $|A|\neq0$, $\operatorname{rang}A=\operatorname{rang}(A\mid B)=2=n$ → compatible determinado. Por Cramer (U p.33): $x=\dfrac{\begin{vmatrix}1&k\1&1\end{vmatrix}}{1-k^2}=\dfrac{1-k}{(1-k)(1+k)}=\dfrac1{1+k}$, e igualmente $y=\dfrac{\begin{vmatrix}1&1\k&1\end{vmatrix}}{1-k^2}=\dfrac1{1+k}$.
3. **$k=1$:** las dos ecuaciones son $x+y=1$; $\operatorname{rang}A=\operatorname{rang}(A\mid B)=1<2$ → compatible indeterminado: $(x,y)=(1-\lambda,\lambda)$, $\lambda\in\mathbb R$ (rectas coincidentes, U Ejemplo 1.25, p.30-31).
4. **$k=-1$:** $x-y=1$ y $-x+y=1$; sumando, $0=2$: incompatible. Con rangos: $\operatorname{rang}A=1$ y $\operatorname{rang}\left(\begin{array}{cc|c}1&-1&1\-1&1&1\end{array}\right)=2$ (menor $\begin{vmatrix}-1&1\1&1\end{vmatrix}=-2\neq0$). Rectas paralelas.
5. Verificado con sympy (`linsolve` genérico y rangos en $k=\pm1$).

**Error típico.** Simplificar $\frac{1-k}{1-k^2}=\frac{1}{1+k}$ y concluir que solo $k=-1$ es especial: en $k=1$ la fórmula de Cramer no es aplicable ($|A|=0$) y el sistema es indeterminado.

## Propio 3 — Factorización $LU$ permutada ($PA=LU$) y resolución de un sistema

**Enunciado (propio).** Sea $A=\begin{pmatrix}0&1&2\1&1&1\2&1&3\end{pmatrix}$ y $B=\begin{pmatrix}3\2\7\end{pmatrix}$. (a) Probar que $A$ no admite factorización $LU$. (b) Hallar $P$, $L$, $U$ con $PA=LU$ y resolver $AX=B$.

1. **(a) No hay $LU$.** Si $A=LU$ con $L$ de unos en la diagonal, la entrada $(1,1)$ da $u_{11}=a_{11}=0$ y la $(2,1)$ da $l_{21}u_{11}=a_{21}=1$, es decir $0=1$: imposible. (Equivalentemente: el primer pivote es 0 y solo con reemplazos no se puede triangularizar.) Sin embargo $A$ es regular: $\det A=-3$.
2. **Permutar.** $F_1\leftrightarrow F_2$, es decir, $P=\begin{pmatrix}0&1&0\1&0&0\0&0&1\end{pmatrix}$ (la identidad con esas filas intercambiadas, U p.50): $PA=\begin{pmatrix}1&1&1\0&1&2\2&1&3\end{pmatrix}$.
3. **$U$ de $PA$.** $F_3\to F_3-2F_1$: $(0,-1,1)$; $F_3\to F_3+F_2$: $(0,0,3)$. Así $U=\begin{pmatrix}1&1&1\0&1&2\0&0&3\end{pmatrix}$.
4. **$L$.** Multiplicadores: la fila 2 no se tocó → $l_{21}=0$; $-2$ en $(3,1)$ → $l_{31}=2$; $+1$ en $(3,2)$ → $l_{32}=-1$. Así $L=\begin{pmatrix}1&0&0\0&1&0\2&-1&1\end{pmatrix}$, y se comprueba $PA=LU$ (sympy: `True`).
5. **Resolver $AX=B$** con $PA=LU$ (U p.50): $AX=B\iff PAX=PB\iff LUX=PB$.
   - $PB=(2,3,7)^t$ (se intercambian las dos primeras componentes, ¡no olvidarlo!).
   - $LY=PB$: $y_1=2$, $y_2=3$, $2y_1-y_2+y_3=7\Rightarrow y_3=7-4+3=6$.
   - $UX=Y$: $3z=6\Rightarrow z=2$; $y+2z=3\Rightarrow y=-1$; $x+y+z=2\Rightarrow x=1$.
6. **Solución** $X=(1,-1,2)^t$. Comprobación en $A$: $0-1+4=3$ ✓, $1-1+2=2$ ✓, $2-1+6=7$ ✓ (sympy `A.solve(B)`). Además $\det(P)\det(A)=\det U$, con $\det P=-1$ (un intercambio cambia el signo), da $\det A=-3$ ✓.

**Error típico.** Resolver $LY=B$ en lugar de $LY=PB$.

---

## Resumen de incidencias detectadas en E (sección 1.4)

1. **Extracción de texto (no es error del libro, pero afecta al uso de `ejercicios.txt`):** los símbolos $\neq$ se pierden (aparecen como «=»). Enunciados afectados: **1.32** (A: $a=2,\ b\neq3$; B: $a\neq2,\ b=3$) y **1.39** (A: $a=-1,\ b\neq0$; B: $a\neq-1,\ b\neq0$); también en las soluciones de 1.32, 1.33 y 1.40. Leído sin los $\neq$, el 1.32 llevaría a una conclusión errónea (con $a=2,b=3$ el sistema es incompatible).
2. **1.32:** «el caso $a=2$ y $b=5$ es un caso particular de A) y de B)» — solo lo es de A).
3. **1.33:** falta la expresión explícita de la solución para $a=b=10$ (aquí: $(-2-8\mu,\,2+7\mu,\,5\mu)$) y no menciona el caso incompatible ($\varnothing$).
4. **1.38 (p.38):** «multiplicada por $-3$» debe ser «por $3$»; «multiplicada por $\tfrac74$» debe ser «por $-\tfrac74$» (las matrices son correctas).
5. **1.41 A:** el enunciado literal («es compatible y su solución se puede hallar mediante Gauss-Jordan») es verdadero; E lo da por falso interpretando que se afirma «determinado». La respuesta esperada (B) sigue siendo la única inequívoca.
6. **1.42:** no justifica que $L_2^{-1}L_1$ tenga unos en la diagonal, paso imprescindible para concluir $T=I$; y escribe $U_2^{-1}U_1=I$ donde ha obtenido $U_2U_1^{-1}=I$.
7. **1.43:** usa «$F_i\leftrightarrow F_i+\lambda F_j$» en lugar de «$F_i\to F_i+\lambda F_j$».
8. **1.31 (matiz):** $a+b=-1$ es condición necesaria, no suficiente; la única pareja válida es $a=3,\ b=-4$.
