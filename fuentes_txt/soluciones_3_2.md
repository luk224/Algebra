# Soluciones — Sección 3.2 Imagen y núcleo (Ejercicios 3.16, 3.20–3.29 de E)

**Fuentes.** E = *Ejercicios de Álgebra para Ingenieros* (página impresa = PDF − 4); U = *Álgebra para Ingenieros* (página impresa = PDF − 6). Todos los cálculos se han comprobado con `sympy` (`Matrix.rank()`, `.nullspace()`, `.columnspace()`, `.rref()`, `.det()`, y la potencia $D^2$ de la matriz de la derivada).

**Herramientas de teoría que se usan:**

| Resultado | Dónde |
|---|---|
| **Definición 3.1** aplicación lineal: $f(v+\lambda u)=f(v)+\lambda f(u)$ | U §3.1 p.101 |
| Propiedades 1–5 de las aplicaciones lineales ($f(\bar0)=\bar0$, $f(-v)=-f(v)$, $f(\sum a_iv_i)=\sum a_if(v_i)$, ligados ⇒ imágenes ligadas, libres ⇏ imágenes libres) | U §3.1 p.103 (demostraciones en Ej. 3.4–3.5, p.104) |
| **Definición 3.2** imagen $\mathrm{Im}(f)=\{w\in W\mid w=f(v)\text{ para algún }v\in V\}$; es subespacio de $W$ | U §3.2.2 p.106 |
| Ejemplos 3.9, 3.10: $\mathrm{Im}(f)$ está **generada por las imágenes de una base** del espacio inicial | U pp.107–108 |
| Ejemplo 3.11: dimensión y ecuaciones cartesianas de la imagen | U pp.108–109 |
| **Definición 3.3** núcleo $\mathrm{Nuc}(f)=\{v\in V\mid f(v)=\bar0\}=f^{-1}(\bar0)$; es subespacio de $V$ | U §3.2.3 p.109 |
| Ejemplos 3.12–3.14: cálculo del núcleo resolviendo un sistema homogéneo | U pp.110–111 |
| **Teorema 3.1** $\ \mathrm{Dim\,Im}(f)+\mathrm{Dim\,Nuc}(f)=\mathrm{Dim}\,V$ (espacio **inicial**) | U p.111 (Ej. 3.15, p.112) |
| (Tema 2) Combinación lineal (Def. 2.3), sistema generador (Def. 2.4), ecuaciones paramétricas y cartesianas | U §2.2 pp.70–71 |
| (Tema 2) Base (Def. 2.9) y coordenadas (Def. 2.10) | U pp.82, 85 |
| (Tema 2) **Teorema 2.5** $\mathrm{rang}(S)=\mathrm{Dim}\langle S\rangle$; rango de vectores = rango de la matriz de sus coordenadas | U p.88 |
| (Tema 2) **Teorema 2.6**: en un espacio de dimensión $n$, todo sistema libre (o generador) de $n$ vectores es base | U p.88 |
| (Tema 2) **Teorema 2.7** de la base incompleta | U p.89 |
| (Tema 1) Rouché–Frobenius: compatible ⇔ $\mathrm{rang}(A)=\mathrm{rang}(A\mid B)$; homogéneo con $\mathrm{rang}(A)=n$ ⇒ solo la solución nula | U §1.4 p.30 |
| (Frontera §3.3) **Definición 3.4** matriz asociada: la columna $j$ = coordenadas de $f(e_j)$; expresión matricial $Y=AX$ | U §3.3.3 pp.116–117 |
| (Frontera §3.4) **Def. 3.8** $(\lambda f)(v)=\lambda f(v)$; **Def. 3.11** composición $(f\circ g)(x)=f(g(x))$ | U p.120, p.124 |
| (Tema 2) $\wp_n$ = polinomios de grado $\le n$ es espacio vectorial (Ej. 2.6); E lo escribe $P_n$ o $P_n(x)$ | U p.62 |

**Delimitación de la sección.** En E, las secciones 3.2 y 3.3 **se tratan conjuntamente** (E p.92: «Los ejercicios de las secciones 3.2 y 3.3 se abordarán conjuntamente porque la matriz asociada es muy útil para analizar núcleo e imagen»); por eso CLAUDE.md da la p.92 para ambas (no es errata de CLAUDE.md, sino del propio E). El bloque conjunto son los **Ejercicios 3.15–3.29** (E pp.93–104); en la p.105 empieza §3.4. Repartiendo **por contenido**:

| Sección | Ejercicios | Criterio |
|---|---|---|
| **§3.2 Imagen y núcleo** (este archivo) | **3.16, 3.20, 3.21, 3.22, 3.23, 3.24, 3.25, 3.26, 3.27, 3.28, 3.29** | Piden $\mathrm{Im}(f)$, $\mathrm{Nuc}(f)$, sus bases, ecuaciones o dimensiones (algunos tienen un primer apartado de matriz asociada, que se resuelve aquí también porque es el paso previo) |
| §3.3 Ecuaciones y matriz asociada | 3.15, 3.17, 3.18, 3.19 | Solo piden la matriz asociada o las ecuaciones de $f$ |
| §3.1 (frontera, en E antes de p.92) | 3.12 C («$\mathrm{Im}(f)=\mathbb R^3$»), 3.13 D («$f(S)$ es subespacio») | Tocan la imagen, pero están en el bloque de §3.1; ver nota al final |

**Orden de estudio** (fácil → difícil): Bloque A ($\mathbb R^n\to\mathbb R^m$ con ecuaciones), Bloque B (polinomios y derivada), Bloque C (cuestiones teóricas). Se conserva la numeración de E.

**Erratas, errores u omisiones detectados en E** (detallados en cada ejercicio):
- **E 3.16**: en las ecuaciones paramétricas escribe «$y_1=\delta$»; debe ser **$y_1=\alpha+\beta$** (con $y_2=\alpha$). Además dice «ecuaciones cartesianas **de $f$**» cuando quiere decir «de $\mathrm{Im}(f)$», y concluye $\mathrm{Im}(f)=\mathbb R^2$ sin justificar que $(1,1),(1,0)$ son independientes.
- **E 3.21 B**: afirma $\mathrm{Dim\,Im}(f)=3$ sin comprobar que las tres matrices son linealmente independientes (solo se deduce después, en C, al ver $\mathrm{Nuc}(f)=\{\bar0\}$, o calculando un menor $3\times3$ no nulo).
- **E 3.24**: la «demostración» de A es incorrecta: escribe «$\lambda f(v)=f(\lambda v)=0\Leftrightarrow\lambda v\in\mathrm{Nuc}(\lambda f)$», pero $f(\lambda v)=0$ significa $\lambda v\in\mathrm{Nuc}(f)$, no $\mathrm{Nuc}(\lambda f)$ (de hecho $(\lambda f)(\lambda v)=\lambda^2 f(v)$). Además «B) y C) son falsas por ser cierta A)» no es un argumento válido: lo que las hace falsas es que $\mathrm{Nuc}(\lambda f)=\mathrm{Nuc}(f)$. La conclusión (A cierta, B y C falsas) sí es correcta.
- **E 3.28 C**: dice que no se puede formar la matriz «porque solo conocemos dos columnas»; es correcto, pero omite que sí se sabe algo más: las otras dos columnas ($f(1)$, $f(x^3)$) tienen que ser **linealmente independientes** (si no, el núcleo sería mayor).
- **E 3.29 B**: la expresión «$c(2,0,0,0,0)+d(0,6,0,0,0)x+e(0,0,12,0,0)x^2$» mezcla coordenadas y potencias de $x$; debe leerse $c\cdot 2+d\cdot 6x+e\cdot 12x^2$, es decir, coordenadas $c(2,0,0,0,0)+d(0,6,0,0,0)+e(0,0,12,0,0)$.
- **E 3.20 C** da $\mathrm{Dim\,Im}(f)=3$ pero no saca la consecuencia: $\mathrm{Im}(f)=P_2$ (todo el espacio final).
- **E 3.22 B, 3.20 D** (instrucciones de Maxima): Maxima **no entra en el examen** (CLAUDE.md §2); se resuelven aquí solo por completitud, indicando el equivalente en sympy.

> Nota de extracción: en `ejercicios.txt` se pierde el símbolo «≠» (p. ej. U p.104 «$\lambda=0$ o $\mu=0$» debe leerse «$\lambda\neq0$ o $\mu\neq0$»; U p.30 «S. incompatible ⇔ rang(A) = rang(A|B)» debe leerse «$\neq$»).

---

## Bloque A. Imagen y núcleo de aplicaciones $\mathbb R^n\to\mathbb R^m$ (y a matrices)

### Ejercicio 3.16 (E p.93)

> **Enunciado.** Si $f$ es la aplicación del Ejercicio 3.15, se piden ecuaciones paramétricas y ecuaciones cartesianas de $\mathrm{Im}(f)$.
>
> (Ejercicio 3.15, E p.93: $f:\mathbb R^3\to\mathbb R^2$ lineal con $f(1,0,0)=(1,1)$, $f(0,1,0)=(1,1)$, $f(0,0,1)=(1,0)$.)

**Idea.** La imagen está generada por las imágenes de los vectores de una base del espacio inicial (Ejemplo 3.10, U p.108). Basta escribir $f(x_1,x_2,x_3)$ como combinación lineal de esas imágenes.

**Solución.**

1. **Imagen de un vector cualquiera.** Todo $(x_1,x_2,x_3)\in\mathbb R^3$ es $x_1(1,0,0)+x_2(0,1,0)+x_3(0,0,1)$. Como $f$ es lineal, por la propiedad 3 (U p.103):
$$f(x_1,x_2,x_3)=x_1f(1,0,0)+x_2f(0,1,0)+x_3f(0,0,1)=x_1\begin{pmatrix}1\\1\end{pmatrix}+x_2\begin{pmatrix}1\\1\end{pmatrix}+x_3\begin{pmatrix}1\\0\end{pmatrix}=\begin{pmatrix}x_1+x_2+x_3\\x_1+x_2\end{pmatrix}.$$
   (Son las ecuaciones de $f$: $y_1=x_1+x_2+x_3$, $y_2=x_1+x_2$; la matriz asociada es $A=\begin{pmatrix}1&1&1\\1&1&0\end{pmatrix}$, Ej. 3.15.)
2. **Sistema generador de $\mathrm{Im}(f)$.** Por la Definición 3.2 (U p.106), $\mathrm{Im}(f)$ es el conjunto de todos esos vectores, es decir, $\mathrm{Im}(f)=\langle(1,1),(1,1),(1,0)\rangle$. El vector repetido sobra (Teorema 2.1 de supresión, U p.79): $\mathrm{Im}(f)=\langle(1,1),(1,0)\rangle$. Agrupando, $f(x)=(x_1+x_2)(1,1)+x_3(1,0)$.
3. **Ecuaciones paramétricas.** Llamando $\alpha=x_1+x_2$, $\beta=x_3$ (que recorren todo $\mathbb R$ al variar $x$):
$$\begin{cases}y_1=\alpha+\beta\\ y_2=\alpha\end{cases}\qquad\alpha,\beta\in\mathbb R .$$
   **(E escribe «$y_1=\delta$»: errata.)**
4. **Dimensión.** $\mathrm{rang}\begin{pmatrix}1&1\\1&0\end{pmatrix}=2$ porque su determinante es $1\cdot0-1\cdot1=-1\neq0$. Por el Teorema 2.5 (U p.88), $\mathrm{Dim\,Im}(f)=2$; y por el Teorema 2.6 (U p.88), dos vectores libres de $\mathbb R^2$ forman base de $\mathbb R^2$. Luego **$\mathrm{Im}(f)=\mathbb R^2$**.
   Comprobación directa: dado cualquier $(y_1,y_2)$, basta tomar $\alpha=y_2$, $\beta=y_1-y_2$.
5. **Ecuaciones cartesianas.** Se obtienen eliminando los parámetros; aquí no queda ninguna relación entre $y_1$ e $y_2$ (ambas toman cualquier valor). **$\mathrm{Im}(f)$ no tiene ecuaciones cartesianas** (o, si se quiere, la «ecuación» es $0=0$): es todo $\mathbb R^2$.
6. **Comprobación con el Teorema 3.1** (no pedida, U p.111): $\mathrm{Nuc}(f)$: $x_1+x_2+x_3=0$, $x_1+x_2=0$ ⇒ $x_3=0$, $x_2=-x_1$ ⇒ $\mathrm{Nuc}(f)=\langle(1,-1,0)\rangle$, dimensión 1; y $2+1=3=\mathrm{Dim}\,\mathbb R^3$. ✓

**Verificación (sympy).** `A.rank()=2`, `A.columnspace()=[(1,1),(1,0)]`, `A.nullspace()=[(-1,1,0)]`.

**Receta.** $\mathrm{Im}(f)=\langle f(e_1),\dots,f(e_n)\rangle$ (imágenes de una base = **columnas de la matriz**). Su dimensión es el rango de esas columnas. Si el rango es igual a la dimensión del espacio final, $\mathrm{Im}(f)$ es todo el espacio final y **no hay ecuaciones cartesianas**.

**Error típico.** Pensar que, como hay 3 generadores, la imagen tiene dimensión 3 (imposible en $\mathbb R^2$): la dimensión es el **rango**, no el número de generadores.

**Teoría:** Def. 3.2 y Ejemplo 3.10, U §3.2.2 pp.106–108; Teoremas 2.5–2.6, U p.88.

---

### Ejercicio 3.23 (E p.100)

> **Enunciado.** Si $f$ es la aplicación lineal del Ejercicio 3.2, se pide: A) Ecuaciones y base del subespacio $\mathrm{Im}(f)$. B) Ecuaciones y base del subespacio $\mathrm{Nuc}(f)$. C) Relación entre las dimensiones de $\mathrm{Im}(f)$ y $\mathrm{Nuc}(f)$.
>
> (Ejercicio 3.2, E p.81: $f:\mathbb R^2\to\mathbb R^3$, $f(x_1,x_2)=(2x_1,\ 3x_1+x_2,\ x_1+x_2)$.)

**Solución.**

1. **Generadores de la imagen.** Separando los coeficientes de $x_1$ y $x_2$:
$$f(x_1,x_2)=x_1\begin{pmatrix}2\\3\\1\end{pmatrix}+x_2\begin{pmatrix}0\\1\\1\end{pmatrix}.$$
   Así, $\mathrm{Im}(f)=\langle(2,3,1),(0,1,1)\rangle$ (Def. 3.2, U p.106; mismo razonamiento que el Ejemplo 3.9, U p.107).
2. **Base y dimensión de $\mathrm{Im}(f)$.** Los dos vectores son independientes: el menor $\begin{vmatrix}2&0\\3&1\end{vmatrix}=2\neq0$, luego el rango es 2 (Teorema 2.5, U p.88). **Base: $\{(2,3,1),(0,1,1)\}$, $\mathrm{Dim\,Im}(f)=2$.**
3. **Ecuaciones paramétricas:** $y_1=2\alpha$, $y_2=3\alpha+\beta$, $y_3=\alpha+\beta$, $\alpha,\beta\in\mathbb R$.
4. **Ecuación cartesiana (por qué un determinante).** $(y_1,y_2,y_3)\in\mathrm{Im}(f)$ ⇔ existe $(x_1,x_2)$ con $f(x_1,x_2)=(y_1,y_2,y_3)$ ⇔ el sistema
$$\left(\begin{array}{cc|c}2&0&y_1\\3&1&y_2\\1&1&y_3\end{array}\right)$$
   es **compatible** ⇔ (Rouché–Frobenius, U p.30) $\mathrm{rang}\begin{pmatrix}2&0\\3&1\\1&1\end{pmatrix}=\mathrm{rang}$ de la ampliada. La de coeficientes tiene rango 2, así que la ampliada ($3\times3$) debe tener rango 2, es decir, determinante nulo:
$$\begin{vmatrix}2&0&y_1\\3&1&y_2\\1&1&y_3\end{vmatrix}=2(y_3-y_2)-0+y_1(3-1)=2y_1-2y_2+2y_3=0\iff \boxed{y_2=y_1+y_3}.$$
   (Desarrollo por la primera fila.) Comprobación: $(2,3,1)$: $3=2+1$ ✓; $(0,1,1)$: $1=0+1$ ✓. Hay $3-2=1$ ecuación, como corresponde a un subespacio de dimensión 2 en $\mathbb R^3$ (un plano por el origen).
5. **Núcleo.** Por la Definición 3.3 (U p.109), $\mathrm{Nuc}(f)=\{(x_1,x_2): f(x_1,x_2)=(0,0,0)\}$:
$$2x_1=0,\quad 3x_1+x_2=0,\quad x_1+x_2=0 .$$
   De la 1.ª, $x_1=0$; llevado a la 2.ª, $x_2=0$ (la 3.ª se cumple). **$\mathrm{Nuc}(f)=\{(0,0)\}$**, sus ecuaciones son $x_1=0$, $x_2=0$, y **no tiene base**: por convenio $\mathrm{Dim}\{\bar0\}=0$ (U p.112) y la base es el conjunto vacío ($\bar0$ no puede estar en una base porque cualquier sistema que lo contiene es ligado).
6. **C) Relación.** Teorema 3.1 (U p.111): $\mathrm{Dim\,Im}(f)+\mathrm{Dim\,Nuc}(f)=\mathrm{Dim}\,\mathbb R^2$: $2+0=2$ ✓.

**Verificación (sympy).** `Matrix([[2,0],[3,1],[1,1]]).rank()=2`, `nullspace()=[]`; determinante de la ampliada $=2y_1-2y_2+2y_3$.

**Receta (ecuación cartesiana de la imagen).** Coloca los generadores de $\mathrm{Im}(f)$ como columnas, añade la columna $(y_1,\dots,y_m)$ y exige que el rango **no aumente**: anula los menores orlados (o escalona y pide que las filas que se anulan a la izquierda tengan ceros a la derecha). Nº de ecuaciones cartesianas $=m-\mathrm{Dim\,Im}(f)$.

**Error típico.** Escribir las ecuaciones de **$f$** ($y_1=2x_1,\dots$) como si fueran las cartesianas de la imagen: estas no deben contener las $x_i$, solo relaciones entre las $y_j$. Otro: decir que la base del núcleo es $\{(0,0)\}$.

**Teoría:** Defs. 3.2–3.3 y Teorema 3.1, U §3.2 pp.106–111; Rouché–Frobenius, U §1.4 p.30.

---

### Ejercicio 3.22 (E p.99)

> **Enunciado.** Si $f$ es la aplicación lineal $f:\mathbb R^3\to\mathbb R^2$, definida por $f(x_1,x_2,x_3)=(x_1+x_2,0)$, se pide justificar si es cierta alguna de las afirmaciones siguientes: A) $\mathrm{Dim\,Im}(f)+\mathrm{Dim\,Nuc}(f)=\mathrm{Dim}\,\mathbb R^2$. B) Si $A$ es la matriz asociada a $f$, al ejecutar las instrucciones `columnspace(A)` y `nullity(A)` en MAXIMA, las salidas obtenidas son $\mathrm{Dim\,Im}(f)$ y $\mathrm{Dim\,Nuc}(f)$, respectivamente. C) Las dimensiones de $\mathrm{Nuc}(f)$ e $\mathrm{Im}(f)$ coinciden.

**Solución.**

1. **Matriz asociada** (columnas = imágenes de la base canónica, Def. 3.4, U p.116): $f(1,0,0)=(1,0)$, $f(0,1,0)=(1,0)$, $f(0,0,1)=(0,0)$, luego $A=\begin{pmatrix}1&1&0\\0&0&0\end{pmatrix}$.
2. **Imagen.** $\mathrm{Im}(f)=\langle(1,0),(1,0),(0,0)\rangle=\langle(1,0)\rangle$: $\mathrm{Dim\,Im}(f)=1$, ecuación cartesiana $y_2=0$ (el eje $y_1$).
3. **Núcleo.** $f(x)=(0,0)$ ⇔ $x_1+x_2=0$ (la segunda componente es siempre 0). Es una sola ecuación en $\mathbb R^3$; paramétricas $x_1=\alpha$, $x_2=-\alpha$, $x_3=\beta$, es decir, $\mathrm{Nuc}(f)=\langle(1,-1,0),(0,0,1)\rangle$. Los dos generadores son independientes (no son proporcionales), luego $\mathrm{Dim\,Nuc}(f)=2$.
4. **A) Falsa.** El Teorema 3.1 (U p.111) relaciona las dimensiones con el espacio **inicial**: $1+2=3=\mathrm{Dim}\,\mathbb R^3\neq\mathrm{Dim}\,\mathbb R^2=2$.
5. **B) Falsa** (cuestión de Maxima, fuera de examen). `columnspace(A)` devuelve una **base** (el subespacio generado por las columnas), no su dimensión; la dimensión se obtiene con `rank(A)` (U p.116, nota al margen). `nullity(A)` sí da $\mathrm{Dim\,Nuc}$. Equivalente en sympy: `A.columnspace()`, `A.rank()`, `len(A.nullspace())`.
6. **C) Falsa:** $\mathrm{Dim\,Nuc}(f)=2\neq1=\mathrm{Dim\,Im}(f)$.

**Verificación (sympy).** `rank=1`, `nullspace=[(-1,1,0),(0,0,1)]`.

**Receta.** Primero calcula el núcleo (resolver $AX=0$: la dimensión es el nº de parámetros libres $=n-\mathrm{rang}A$) y luego obtén $\mathrm{Dim\,Im}=\mathrm{rang}A$; comprueba que suman la dimensión del espacio **de salida**.

**Error típico.** Aplicar el Teorema 3.1 con la dimensión del espacio de **llegada** (opción A).

**Teoría:** Teorema 3.1, U p.111; Def. 3.4, U p.116.

---

### Ejercicio 3.20 (E p.97)

> **Enunciado.** Si las imágenes por una aplicación lineal $f$ de los vectores de la base canónica de $\mathbb R^4$ en $P_2$ son $(1,0,-1)$, $(2,-4,1)$, $(-1,0,-2)$, $(2,-2,-2)$, se pide: A) Matriz y ecuaciones de $f$ en las bases canónicas. B) Ecuaciones y una base de $\mathrm{Nuc}(f)$. C) Dimensión de $\mathrm{Im}(f)$. D) Escribir las instrucciones de MAXIMA que permiten encontrar una base y la dimensión del núcleo de $f$.

**Interpretación.** $P_2$ (en U, $\wp_2$) son los polinomios de grado $\le2$, con base canónica $\{1,x,x^2\}$. Las ternas son **coordenadas** en esa base: $f(e_1)=1-x^2$, $f(e_2)=2-4x+x^2$, $f(e_3)=-1-2x^2$, $f(e_4)=2-2x-2x^2$.

**Solución.**

1. **A) Matriz** (columna $j$ = coordenadas de $f(e_j)$, Def. 3.4, U p.116) y ecuaciones ($Y=AX$, U p.117):
$$A=\begin{pmatrix}1&2&-1&2\\0&-4&0&-2\\-1&1&-2&-2\end{pmatrix},\qquad\begin{cases}y_1=x_1+2x_2-x_3+2x_4\\ y_2=-4x_2-2x_4\\ y_3=-x_1+x_2-2x_3-2x_4\end{cases}$$
   donde $(y_1,y_2,y_3)$ son las coordenadas de $f(x)=y_1+y_2x+y_3x^2$.
2. **B) Ecuaciones del núcleo.** $x\in\mathrm{Nuc}(f)$ ⇔ $f(x)$ es el polinomio nulo ⇔ $y_1=y_2=y_3=0$ (Def. 3.3, U p.109). Ecuaciones: $AX=0$.
3. **Resolución por Gauss.** $F_3\to F_3+F_1$ (para anular el $-1$ de la primera columna):
$$\begin{pmatrix}1&2&-1&2\\0&-4&0&-2\\0&3&-3&0\end{pmatrix}\ \Rightarrow\ \begin{cases}x_1+2x_2-x_3+2x_4=0\\ -4x_2-2x_4=0\ \Rightarrow\ x_4=-2x_2\\ 3x_2-3x_3=0\ \Rightarrow\ x_3=x_2\end{cases}$$
   Con $x_2=\alpha$: $x_3=\alpha$, $x_4=-2\alpha$ y, de la 1.ª, $x_1=-2\alpha+\alpha+4\alpha=3\alpha$. (Hay un parámetro libre porque el rango es 3 y hay 4 incógnitas.)
$$\begin{pmatrix}x_1\\x_2\\x_3\\x_4\end{pmatrix}=\alpha\begin{pmatrix}3\\1\\1\\-2\end{pmatrix}.$$
   **Base de $\mathrm{Nuc}(f)$: $\{(3,1,1,-2)\}$**, $\mathrm{Dim\,Nuc}(f)=1$. Ecuaciones cartesianas reducidas: $x_1=3x_2$, $x_3=x_2$, $x_4=-2x_2$. Comprobación: $A(3,1,1,-2)^T=(3+2-1-4,\ -4+4,\ -3+1-2+4)=(0,0,0)$ ✓.
4. **C) Dimensión de la imagen.** Teorema 3.1 (U p.111): $\mathrm{Dim\,Im}(f)=\mathrm{Dim}\,\mathbb R^4-\mathrm{Dim\,Nuc}(f)=4-1=3$. (Coincide con el rango de $A$, 3 pivotes.) **Consecuencia que E no dice:** $\mathrm{Im}(f)$ es un subespacio de dimensión 3 de $P_2$, que tiene dimensión 3; una base suya es un sistema libre de 3 vectores de $P_2$, luego base de $P_2$ (Teorema 2.6, U p.88): **$\mathrm{Im}(f)=P_2$**.
5. **D) Maxima** (fuera de examen): `nullspace(A)` (base del núcleo) y `nullity(A)` (dimensión). En sympy: `A.nullspace()`, `len(A.nullspace())`.

**Verificación (sympy).** `rank=3`; `nullspace=[(-3/2,-1/2,-1/2,1)]` $=-\tfrac12(3,1,1,-2)$ (mismo subespacio).

**Receta.** Núcleo = soluciones de $AX=0$: escalona, despeja en función de los parámetros libres y saca un vector por parámetro. $\mathrm{Dim\,Im}=n-\mathrm{Dim\,Nuc}=\mathrm{rang}A$; si coincide con la dimensión del espacio final, la imagen es todo ese espacio.

**Error típico.** Olvidar que la base del núcleo está en el espacio **inicial** ($\mathbb R^4$, 4 coordenadas), mientras que la imagen está en $P_2$ (3 coordenadas). Otro: dar como base de la imagen las 4 columnas (son ligadas: el rango es 3).

**Teoría:** Def. 3.3, Teorema 3.1, U §3.2.3 pp.109–111; Def. 3.4, U p.116.

---

### Ejercicio 3.21 (E p.98)

> **Enunciado.** Si $f:\mathbb R^3\to\mathcal M_{2\times2}$ es la aplicación lineal, tal que
> $$f(1,0,0)=\begin{pmatrix}2&-1\\3&0\end{pmatrix};\quad f(0,1,0)=\begin{pmatrix}1&0\\4&2\end{pmatrix};\quad f(0,0,1)=\begin{pmatrix}5&1\\0&1\end{pmatrix},$$
> se pide calcular: A) La matriz asociada a $f$. B) Base de Imagen de $f$. C) Núcleo de $f$.

**Solución.**

1. **Coordenadas en $\mathcal M_{2\times2}$.** Con la base canónica $\left\{\begin{pmatrix}1&0\\0&0\end{pmatrix},\begin{pmatrix}0&1\\0&0\end{pmatrix},\begin{pmatrix}0&0\\1&0\end{pmatrix},\begin{pmatrix}0&0\\0&1\end{pmatrix}\right\}$, la matriz $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ tiene coordenadas $(a,b,c,d)$ (Def. 2.10, U p.85).
2. **A) Matriz asociada** ($4\times3$: 3 columnas porque $\mathrm{Dim}\,\mathbb R^3=3$, 4 filas porque $\mathrm{Dim}\,\mathcal M_{2\times2}=4$; Def. 3.4, U p.116):
$$A=\begin{pmatrix}2&1&5\\-1&0&1\\3&4&0\\0&2&1\end{pmatrix}.$$
3. **Imagen de un vector cualquiera.** $f(x_1,x_2,x_3)=x_1f(e_1)+x_2f(e_2)+x_3f(e_3)=\begin{pmatrix}2x_1+x_2+5x_3&-x_1+x_3\\3x_1+4x_2&2x_2+x_3\end{pmatrix}$. Por tanto $\mathrm{Im}(f)=\langle f(e_1),f(e_2),f(e_3)\rangle$ (Def. 3.2, U p.106).
4. **B) ¿Son independientes los tres generadores?** (Paso que E omite.) El rango de $\{f(e_1),f(e_2),f(e_3)\}$ es el de $A$ (Teorema 2.5 y relación rango-matriz, U p.88). El menor formado por las tres primeras filas es
$$\begin{vmatrix}2&1&5\\-1&0&1\\3&4&0\end{vmatrix}=2(0-4)-1(0-3)+5(-4-0)=-8+3-20=-25\neq0,$$
   así que $\mathrm{rang}A=3$: los tres generadores son libres. **Base de $\mathrm{Im}(f)$: $\left\{\begin{pmatrix}2&-1\\3&0\end{pmatrix},\begin{pmatrix}1&0\\4&2\end{pmatrix},\begin{pmatrix}5&1\\0&1\end{pmatrix}\right\}$**, $\mathrm{Dim\,Im}(f)=3$. ($\mathrm{Im}(f)\neq\mathcal M_{2\times2}$: le falta una dimensión.)
5. **C) Núcleo.** $f(x)=\begin{pmatrix}0&0\\0&0\end{pmatrix}$ ⇔
$$2x_1+x_2+5x_3=0,\quad -x_1+x_3=0,\quad 3x_1+4x_2=0,\quad 2x_2+x_3=0 .$$
   De la 2.ª, $x_3=x_1$; de la 3.ª, $x_2=-\tfrac34x_1$; en la 4.ª: $-\tfrac32x_1+x_1=-\tfrac12x_1=0\Rightarrow x_1=0$, y entonces $x_2=x_3=0$. **$\mathrm{Nuc}(f)=\{(0,0,0)\}$.** (Alternativa: sistema homogéneo con $\mathrm{rang}A=3=$ nº de incógnitas ⇒ solo la solución nula, U p.30.)
6. **Coherencia (Teorema 3.1):** $3+0=3=\mathrm{Dim}\,\mathbb R^3$ ✓.

**Verificación (sympy).** `A.rank()=3`, `A.nullspace()=[]`, menor $=-25$.

**Receta.** Si el espacio final son matrices (o polinomios), **pásalas a coordenadas** y trabaja con la matriz de columnas; al final, traduce los vectores de vuelta a matrices. Para afirmar que unos generadores son base hay que **comprobar su independencia** (rango).

**Error típico.** Dar como base de la imagen los generadores sin comprobar que son libres (E lo hace en B). Otro: confundir el orden de las coordenadas $(a,b,c,d)$ (por filas) con $(a,c,b,d)$ (por columnas): cualquiera vale si se usa siempre la misma base.

**Teoría:** Def. 3.2–3.3, U pp.106–109; Teorema 2.5, U p.88; Rouché, U p.30.

---

## Bloque B. Polinomios y derivada

### Ejercicio 3.25 (E p.101)

> **Enunciado.** Si $P_3(x)$ es el espacio vectorial de los polinomios reales de una variable y grado $\le3$, y $f$ es el endomorfismo de $P_3(x)$ que asigna a cada polinomio su primera derivada, se pide: Matriz de la aplicación, una base y dimensión de $\mathrm{Im}(f)$.

**Solución.**

1. **¿Es lineal?** (E lo da por supuesto.) Por las reglas de derivación, $(p+\lambda q)'=p'+\lambda q'$: cumple la Def. 3.1 (U p.101). Además la derivada de un polinomio de grado $\le3$ tiene grado $\le2\le3$, luego está en $P_3(x)$: es un endomorfismo.
2. **Imágenes de la base canónica $\{1,x,x^2,x^3\}$:** $f(1)=0$, $f(x)=1$, $f(x^2)=2x$, $f(x^3)=3x^2$. En coordenadas: $(0,0,0,0)$, $(1,0,0,0)$, $(0,2,0,0)$, $(0,0,3,0)$.
3. **Matriz** (esas coordenadas en columnas, Def. 3.4, U p.116):
$$D=\begin{pmatrix}0&1&0&0\\0&0&2&0\\0&0&0&3\\0&0&0&0\end{pmatrix}.$$
   Comprobación: $p=a+bx+cx^2+dx^3\mapsto D(a,b,c,d)^T=(b,2c,3d,0)$, que son las coordenadas de $b+2cx+3dx^2=p'$ ✓.
4. **Imagen.** $\mathrm{Im}(f)=\langle f(1),f(x),f(x^2),f(x^3)\rangle=\langle0,\,1,\,2x,\,3x^2\rangle=\langle1,x,x^2\rangle$ (se suprime el $0$ y se dividen los generadores por $2$ y $3$, lo que no cambia el subespacio generado: Teoremas 2.1–2.2, U p.79).
5. **Base y dimensión.** $\{1,x,x^2\}$ es libre (es parte de la base canónica de $P_3$; $\alpha+\beta x+\gamma x^2=0$ para todo $x$ ⇒ $\alpha=\beta=\gamma=0$). **Base: $\{1,x,x^2\}$; $\mathrm{Dim\,Im}(f)=3$; $\mathrm{Im}(f)=P_2(x)$.** (Sentido: todo polinomio de grado $\le2$ es la derivada de alguno de grado $\le3$, su primitiva.)

**Verificación (sympy).** `D.rank()=3`, `D.columnspace()=[(1,0,0,0),(0,2,0,0),(0,0,3,0)]`.

**Receta.** En espacios de polinomios: calcula la imagen de cada elemento de la base canónica, escribe sus coordenadas en columna (matriz) y trata la imagen como en $\mathbb R^n$; al final, vuelve a escribir los vectores como polinomios.

**Error típico.** Poner las coordenadas de las imágenes **en filas** (sale la traspuesta, que es la matriz de otra aplicación). Otro: decir que $\mathrm{Im}(f)=P_3$ porque «es un endomorfismo».

**Teoría:** Def. 3.1, U p.101; Def. 3.2 y Ejemplo 3.11 (imagen en $\wp_2$), U pp.106–109.

---

### Ejercicio 3.26 (E p.102)

> **Enunciado.** Si $f$ es el endomorfismo de $P_3(x)$ del Ejercicio 3.25, se pide: A) Subespacio $\mathrm{Nuc}(f)$. B) Una base de $\mathrm{Nuc}(f)$. C) Dimensión de $\mathrm{Nuc}(f)$.

**Solución.**

1. **A)** Por la Def. 3.3 (U p.109): $p=a+bx+cx^2+dx^3\in\mathrm{Nuc}(f)$ ⇔ $p'=b+2cx+3dx^2$ es el polinomio nulo ⇔ $b=0$, $2c=0$, $3d=0$ (un polinomio es nulo si y solo si todos sus coeficientes son 0) ⇔ $p=a$. **$\mathrm{Nuc}(f)=\{a: a\in\mathbb R\}=P_0(x)$**, los polinomios constantes. (Matricialmente: $D(a,b,c,d)^T=(b,2c,3d,0)^T=0$.)
2. **B)** Todo elemento es $a\cdot1$ y $\{1\}$ es libre ($1\neq0$): **base $\{1\}$**.
3. **C)** **$\mathrm{Dim\,Nuc}(f)=1$.** Comprobación con el Teorema 3.1 (U p.111) y el Ej. 3.25: $3+1=4=\mathrm{Dim}\,P_3(x)$ ✓.

**Verificación (sympy).** `D.nullspace()=[(1,0,0,0)]` (= el polinomio 1).

**Receta.** Núcleo de una aplicación entre polinomios: iguala la imagen al polinomio nulo, es decir, **cada coeficiente a 0**, y resuelve el sistema en los coeficientes del original.

**Error típico.** Responder $\mathrm{Nuc}(f)=\{0\}$ (confundiendo «derivada nula» con «polinomio nulo»): las constantes no nulas también tienen derivada 0.

**Teoría:** Def. 3.3, U p.109; Teorema 3.1, U p.111.

---

### Ejercicio 3.27 (E p.102)

> **Enunciado.** Si $f$ es el endomorfismo de $P_3(x)$ del Ejercicio 3.25, se pide: A) Subespacio $\mathrm{Im}(f\circ f)$. B) Subespacio $\mathrm{Nuc}(f\circ f)$. C) Relación entre las dimensiones de los subespacios anteriores.

**Solución.**

1. **Qué es $f\circ f$.** Por la Def. 3.11 (U p.124, §3.4), $(f\circ f)(p)=f(f(p))=(p')'=p''$: la derivada segunda. Es lineal (composición de lineales, o directamente $(p+\lambda q)''=p''+\lambda q''$). Para $p=a+bx+cx^2+dx^3$: $p'=b+2cx+3dx^2$, $p''=2c+6dx$.
2. **A) Imagen.** $\mathrm{Im}(f\circ f)=\{2c+6dx: c,d\in\mathbb R\}=\langle2,6x\rangle=\langle1,x\rangle$. Como $c,d$ son arbitrarios, $2c$ y $6d$ toman cualquier valor: **$\mathrm{Im}(f\circ f)=P_1(x)$** (polinomios de grado $\le1$), base $\{1,x\}$, dimensión 2.
3. **B) Núcleo.** $p''=0$ ⇔ $2c=0$ y $6d=0$ ⇔ $c=d=0$ ⇔ $p=a+bx$. **$\mathrm{Nuc}(f\circ f)=P_1(x)$**, base $\{1,x\}$, dimensión 2.
4. **C)** $\mathrm{Dim\,Im}(f\circ f)+\mathrm{Dim\,Nuc}(f\circ f)=2+2=4=\mathrm{Dim}\,P_3(x)$ (Teorema 3.1, U p.111) ✓. Curiosidad: aquí **imagen y núcleo coinciden**; nada lo impide, porque en un endomorfismo ambos son subespacios del mismo espacio.

**Verificación (sympy).** $D^2=\begin{pmatrix}0&0&2&0\\0&0&0&6\\0&0&0&0\\0&0&0&0\end{pmatrix}$, `rank=2`, `nullspace=[(1,0,0,0),(0,1,0,0)]`, `columnspace=[(2,0,0,0),(0,6,0,0)]`.

**Receta.** Para $f\circ f$ calcula primero la fórmula de la composición (o la matriz $A^2$, §3.4) y luego aplica el método habitual de imagen y núcleo.

**Error típico.** Pensar que imagen y núcleo son siempre «complementarios» (que no comparten vectores no nulos): el Teorema 3.1 solo habla de **dimensiones**.

**Teoría:** Def. 3.11, U p.124; Defs. 3.2–3.3 y Teorema 3.1, U §3.2.

---

### Ejercicio 3.29 (E p.104)

> **Enunciado.** El endomorfismo $f$ de $P_4$ que asigna a cada polinomio su derivada, verifica: A) Las filas de la matriz asociada a $f\circ f$ en la base canónica son: $(0,0,2,0,0)$, $(0,0,0,6,0)$, $(0,0,0,0,12)$, $(0,0,0,0,0)$, $(0,0,0,0,0)$. B) $\mathrm{Im}(f\circ f)=P_2$. C) $\mathrm{Nuc}(f\circ f)=P_1$. D) $\mathrm{Nuc}(f\circ f)\subset\mathrm{Im}(f\circ f)$.

**Solución.** Base canónica de $P_4$: $\{1,x,x^2,x^3,x^4\}$ ($\mathrm{Dim}\,P_4=5$). $f\circ f$ = derivada segunda (Def. 3.11, U p.124).

1. **A) Cierta.** Imágenes por $f\circ f$: $1\mapsto0$, $x\mapsto0$, $x^2\mapsto2$, $x^3\mapsto6x$, $x^4\mapsto12x^2$; coordenadas $(0,0,0,0,0)$, $(0,0,0,0,0)$, $(2,0,0,0,0)$, $(0,6,0,0,0)$, $(0,0,12,0,0)$. Puestas **en columnas** (Def. 3.4, U p.116):
$$C=\begin{pmatrix}0&0&2&0&0\\0&0&0&6&0\\0&0&0&0&12\\0&0&0&0&0\\0&0&0&0&0\end{pmatrix},$$
   cuyas filas son exactamente las del enunciado.
2. **B) Cierta.** $C(a,b,c,d,e)^T=(2c,6d,12e,0,0)^T$, es decir, $(f\circ f)(p)=2c+6dx+12ex^2$. Como $c,d,e$ son libres, se obtiene cualquier polinomio de grado $\le2$: $\mathrm{Im}(f\circ f)=\langle2,6x,12x^2\rangle=\langle1,x,x^2\rangle=P_2$, dimensión 3 (son libres: parte de la base canónica).
   *(E escribe aquí «$c(2,0,0,0,0)+d(0,6,0,0,0)x+e(0,0,12,0,0)x^2$», mezclando coordenadas y potencias: léase $c\cdot2+d\cdot6x+e\cdot12x^2$.)*
3. **C) Cierta.** $C(a,b,c,d,e)^T=0$ ⇔ $2c=6d=12e=0$ ⇔ $c=d=e=0$; los elementos del núcleo son $a+bx$: $\mathrm{Nuc}(f\circ f)=\langle1,x\rangle=P_1$, dimensión 2. Comprobación (Teorema 3.1): $3+2=5$ ✓.
4. **D) Cierta.** Para que la inclusión tenga sentido ambos deben estar en el mismo espacio: lo están, porque $f\circ f$ es un endomorfismo de $P_4$. Y $P_1\subset P_2$: todo polinomio de grado $\le1$ tiene grado $\le2$.

**Resultado:** A, B, C y D ciertas.

**Verificación (sympy).** Con $D$ la matriz $5\times5$ de la derivada, $D^2=C$, `rank=3`, `nullspace=[(1,0,0,0,0),(0,1,0,0,0)]`.

**Receta.** Matriz de un operador en polinomios: «imagen de cada $x^k$ → coordenadas → **columna** $k$». Imagen: los generadores no nulos que salen; núcleo: anular los coeficientes de la imagen.

**Error típico.** Escribir las imágenes como filas y concluir que A es falsa (o al revés); fíjate en si el enunciado habla de **filas** o de **columnas**.

**Teoría:** Defs. 3.2–3.4, 3.11; Teorema 3.1 (U pp.106–124).

---

## Bloque C. Cuestiones teóricas sobre el núcleo

### Ejercicio 3.24 (E p.101)

> **Enunciado.** Si $f$ es una aplicación lineal entre los espacios vectoriales $V$ y $W$, y $\lambda$ cualquier número real no nulo, se pide elegir las correctas de entre las opciones siguientes: A) $\mathrm{Nuc}(\lambda f)=\lambda\,\mathrm{Nuc}(f)$. B) $\mathrm{Dim\,Nuc}(\lambda f)>\mathrm{Dim\,Nuc}(f)$ cuando $\lambda>1$. C) $\mathrm{Dim\,Nuc}(\lambda f)<\mathrm{Dim\,Nuc}(f)$ cuando $\lambda<1$.

**Notación.** $(\lambda f)(v)=\lambda f(v)$ (Def. 3.8, U p.120); $\lambda\,\mathrm{Nuc}(f)=\{\lambda v: v\in\mathrm{Nuc}(f)\}$.

**Solución.**

1. **$\mathrm{Nuc}(\lambda f)=\mathrm{Nuc}(f)$.** Para $v\in V$:
$$v\in\mathrm{Nuc}(\lambda f)\iff(\lambda f)(v)=\bar0\iff\lambda f(v)=\bar0\iff f(v)=\bar0\iff v\in\mathrm{Nuc}(f).$$
   El paso central usa $\lambda\neq0$: multiplicando por $\tfrac1\lambda$, $\lambda f(v)=\bar0\Rightarrow f(v)=\tfrac1\lambda\bar0=\bar0$ (y el recíproco es obvio).
2. **$\lambda\,\mathrm{Nuc}(f)=\mathrm{Nuc}(f)$.** «$\subseteq$»: $\mathrm{Nuc}(f)$ es subespacio (Def. 3.3, U p.109), luego cerrado por producto por escalares: $v\in\mathrm{Nuc}(f)\Rightarrow\lambda v\in\mathrm{Nuc}(f)$. «$\supseteq$»: si $u\in\mathrm{Nuc}(f)$, entonces $u=\lambda\cdot\big(\tfrac1\lambda u\big)$ con $\tfrac1\lambda u\in\mathrm{Nuc}(f)$.
3. **A) Cierta**, por 1 y 2: $\mathrm{Nuc}(\lambda f)=\mathrm{Nuc}(f)=\lambda\,\mathrm{Nuc}(f)$.
4. **B) y C) Falsas**, porque, por el paso 1, $\mathrm{Dim\,Nuc}(\lambda f)=\mathrm{Dim\,Nuc}(f)$ para todo $\lambda\neq0$: nunca es mayor ni menor. (Contraejemplo concreto: $f(x_1,x_2)=(x_1,0)$, $\lambda=2$: $\mathrm{Nuc}(f)=\mathrm{Nuc}(2f)=\langle(0,1)\rangle$, ambas de dimensión 1.)

**Sobre la solución de E.** La cadena «$v\in\mathrm{Nuc}(f)\Leftrightarrow f(v)=0\Leftrightarrow\lambda f(v)=f(\lambda v)=0\Leftrightarrow\lambda v\in\mathrm{Nuc}(\lambda f)$» es **incorrecta** en el último paso: $f(\lambda v)=0$ dice que $\lambda v\in\mathrm{Nuc}(f)$, no que $\lambda v\in\mathrm{Nuc}(\lambda f)$; además $(\lambda f)(\lambda v)=\lambda^2f(v)$, no $\lambda f(v)$. Y «B y C falsas por ser cierta A» no es una deducción válida en general (que A sea cierta no excluye otras opciones); el motivo real es la igualdad de los núcleos.

**Receta.** Para igualdades entre conjuntos (núcleos, imágenes), demuestra la doble pertenencia «$v\in X\iff v\in Y$» partiendo de la **definición** y señalando dónde se usa cada hipótesis ($\lambda\neq0$, ser subespacio…).

**Error típico.** Creer que multiplicar la aplicación por un número «agranda» o «encoge» el núcleo: el núcleo depende de **dónde** se anula $f$, y $\lambda f$ se anula exactamente en los mismos vectores.

**Teoría:** Def. 3.3, U p.109; Def. 3.8, U p.120.

---

### Ejercicio 3.28 (E p.103)

> **Enunciado.** Si $f$ es una aplicación lineal de $P_3(x)$ en $\mathbb R^4$ cuyo núcleo es $\mathrm{Nuc}(f)=\{ax+bx^2\}$, se pide: A) Una base de $\mathrm{Nuc}(f)$. B) Completar la base elegida para el núcleo hasta obtener una base de $P_3(x)$. C) Matriz asociada a $f$, si es posible.

**Solución.**

1. **A) Base del núcleo.** Todo elemento es $ax+bx^2=a\cdot x+b\cdot x^2$ ($a,b\in\mathbb R$), luego $\{x,x^2\}$ genera $\mathrm{Nuc}(f)$ (Def. 2.4, U p.71). Es libre: $ax+bx^2=0$ (polinomio nulo) ⇒ $a=b=0$. **Base: $\{x,x^2\}$**, en coordenadas de la base canónica $\{(0,1,0,0),(0,0,1,0)\}$. $\mathrm{Dim\,Nuc}(f)=2$.
2. **B) Completar.** Por el Teorema 2.7 de la base incompleta (U p.89), se pueden añadir vectores hasta una base de $P_3(x)$ ($\mathrm{Dim}=4$). Añadiendo $\{1,x^3\}$ se obtiene $\{1,x,x^2,x^3\}$, la base canónica: libre y con 4 elementos, luego base (Teorema 2.6, U p.88). Cualquier otra elección de 2 vectores que deje el conjunto libre también vale.
3. **C) No es posible determinar la matriz.** La matriz en las bases canónicas tiene por columnas las coordenadas de $f(1)$, $f(x)$, $f(x^2)$, $f(x^3)$ (Def. 3.4, U p.116). Sabemos $f(x)=f(x^2)=(0,0,0,0)$ (están en el núcleo), así que las columnas 2.ª y 3.ª son nulas; pero **$f(1)$ y $f(x^3)$ no están determinadas** por los datos (Teorema 3.2, U p.114: hacen falta las imágenes de todos los vectores de una base).
4. **Lo que sí se sabe** (E no lo dice). Por el Teorema 3.1 (U p.111), $\mathrm{Dim\,Im}(f)=4-2=2$. Además $f(1)$ y $f(x^3)$ son **linealmente independientes**: si $\alpha f(1)+\beta f(x^3)=\bar0$, entonces $f(\alpha+\beta x^3)=\bar0$, es decir, $\alpha+\beta x^3\in\mathrm{Nuc}(f)=\langle x,x^2\rangle$, lo que solo ocurre si $\alpha=\beta=0$. Por tanto, la matriz es de la forma
$$A=\begin{pmatrix}u_1&0&0&w_1\\u_2&0&0&w_2\\u_3&0&0&w_3\\u_4&0&0&w_4\end{pmatrix}\quad\text{con }u=f(1),\ w=f(x^3)\text{ independientes en }\mathbb R^4,$$
   y hay **infinitas** posibilidades.

**Receta.** Una aplicación lineal queda determinada por las imágenes de **todos** los vectores de una base (Teorema 3.2). Conocer el núcleo solo fija las columnas correspondientes a los vectores del núcleo (nulas) y obliga a que las restantes sean independientes.

**Error típico.** Poner ceros en las columnas desconocidas (eso daría una aplicación cuyo núcleo es todo $P_3$, contradiciendo el dato).

**Teoría:** Defs. 2.4, 2.9; Teoremas 2.6–2.7 (U pp.71–89); Teoremas 3.1–3.2 y Def. 3.4 (U pp.111–116).

---

## Nota sobre los ejercicios de frontera de §3.1 (E pp.89–90)

- **E 3.12 C** («$\mathrm{Im}(f)$ es $\mathbb R^3$», con $f:\mathbb R^2\to\mathbb R^3$): falsa siempre, no solo para la aplicación nula que usa E de contraejemplo: $\mathrm{Im}(f)$ está generada por las 2 imágenes de una base de $\mathbb R^2$, así que $\mathrm{Dim\,Im}(f)\le2<3$ (Teorema 3.1: $\mathrm{Dim\,Im}(f)=2-\mathrm{Dim\,Nuc}(f)\le2$).
- **E 3.13 D** («si $S$ es subespacio de $V$, $f(S)$ es subespacio»): cierta. El argumento de E («$f(x+\lambda y)=f(x)+\lambda f(y)\in f(S)$») se lee mejor al revés: si $w_1=f(x)$, $w_2=f(y)$ con $x,y\in S$, entonces $w_1+\lambda w_2=f(x+\lambda y)$ y $x+\lambda y\in S$ por ser $S$ subespacio; además $f(S)\neq\emptyset$ porque $\bar0=f(\bar0)$. Es la misma demostración que la de «$\mathrm{Im}(f)$ es subespacio» (U p.106) con $S$ en lugar de $V$.

Se resolverán con detalle en §3.1.

---

## Ejemplos propios (dificultad creciente)

### Ejemplo propio 1 (fácil) — de $\mathbb R^3$ a $\mathbb R^2$

> Sea $f:\mathbb R^3\to\mathbb R^2$, $f(x,y,z)=(x-y,\ y-z)$. Halla $\mathrm{Nuc}(f)$ e $\mathrm{Im}(f)$ con bases y dimensiones.

1. **Matriz** (columnas $f(1,0,0)=(1,0)$, $f(0,1,0)=(-1,1)$, $f(0,0,1)=(0,-1)$): $A=\begin{pmatrix}1&-1&0\\0&1&-1\end{pmatrix}$.
2. **Núcleo:** $x-y=0$, $y-z=0$ ⇒ $x=y=z=\alpha$. $\mathrm{Nuc}(f)=\langle(1,1,1)\rangle$, dimensión 1 (una recta por el origen).
3. **Imagen:** por el Teorema 3.1, $\mathrm{Dim\,Im}(f)=3-1=2=\mathrm{Dim}\,\mathbb R^2$, luego $\mathrm{Im}(f)=\mathbb R^2$ (Teorema 2.6). Base: por ejemplo $\{(1,0),(-1,1)\}$ (menor $\begin{vmatrix}1&-1\\0&1\end{vmatrix}=1\neq0$). Sin ecuaciones cartesianas.
4. *Verificado con sympy:* `rank=2`, `nullspace=[(1,1,1)]`.

### Ejemplo propio 2 (medio, con parámetro) — endomorfismo de $\mathbb R^3$

> Sea $f_a:\mathbb R^3\to\mathbb R^3$ con matriz $A=\begin{pmatrix}1&1&0\\0&1&a\\1&2&1\end{pmatrix}$ en la base canónica. Estudia $\mathrm{Nuc}(f_a)$ e $\mathrm{Im}(f_a)$ según $a$; para el valor especial, da una base del núcleo y la ecuación cartesiana de la imagen.

1. **Determinante** (por la 1.ª fila): $\det A=1\cdot(1-2a)-1\cdot(0-a)+0=1-a$.
2. **Si $a\neq1$:** $\mathrm{rang}A=3$ ⇒ el sistema homogéneo $AX=0$ solo tiene la solución nula (U p.30): $\mathrm{Nuc}(f_a)=\{\bar0\}$, y por el Teorema 3.1 $\mathrm{Dim\,Im}=3$: $\mathrm{Im}(f_a)=\mathbb R^3$.
3. **Si $a=1$:** $\det A=0$ y el menor $\begin{vmatrix}1&1\\0&1\end{vmatrix}=1\neq0$ ⇒ $\mathrm{rang}A=2$.
   - **Núcleo:** $x+y=0$, $y+z=0$ (la 3.ª fila $(1,2,1)$ es la suma de las dos primeras, sobra). Con $y=-\alpha$: $x=\alpha$, $z=\alpha$. $\mathrm{Nuc}(f_1)=\langle(1,-1,1)\rangle$, dimensión 1. Comprobación: $A(1,-1,1)^T=(0,0,0)^T$ ✓.
   - **Imagen:** generada por las columnas $(1,0,1)$, $(1,1,2)$, $(0,1,1)$; la tercera es $(1,1,2)-(1,0,1)$, así que $\mathrm{Im}(f_1)=\langle(1,0,1),(1,1,2)\rangle$, dimensión 2 ($=3-1$ ✓).
   - **Ecuación cartesiana:** $\begin{vmatrix}1&1&y_1\\0&1&y_2\\1&2&y_3\end{vmatrix}=1\cdot(y_3-2y_2)-1\cdot(0-y_2)+y_1(0-1)=-y_1-y_2+y_3=0$, es decir, **$y_3=y_1+y_2$**.
4. *Verificado con sympy:* `det=1-a`; para $a=1$: `rank=2`, `nullspace=[(1,-1,1)]`, determinante orlado $=-y_1-y_2+y_3$.

### Ejemplo propio 3 (tipo examen) — polinomios evaluados

> Sea $f:\wp_2\to\mathbb R^2$, $f(p)=\big(p(0),\,p(1)\big)$. (a) Comprueba que $f$ es lineal. (b) Halla $\mathrm{Nuc}(f)$ con una base. (c) ¿Es $f$ sobre todo $\mathbb R^2$? Encuentra un polinomio $p$ con $f(p)=(1,3)$. ¿Es único?

1. **(a) Linealidad** (Def. 3.1, U p.101): $(p+\lambda q)(0)=p(0)+\lambda q(0)$ y lo mismo en $1$ (los polinomios se suman y multiplican por escalares punto a punto), así que $f(p+\lambda q)=f(p)+\lambda f(q)$.
2. **Ecuaciones.** Para $p=a+bx+cx^2$: $p(0)=a$, $p(1)=a+b+c$. Matriz en bases canónicas: imágenes $f(1)=(1,1)$, $f(x)=(0,1)$, $f(x^2)=(0,1)$, luego $A=\begin{pmatrix}1&0&0\\1&1&1\end{pmatrix}$.
3. **(b) Núcleo:** $a=0$ y $a+b+c=0$ ⇒ $a=0$, $b=-c$: $p=c(x^2-x)$. $\mathrm{Nuc}(f)=\langle x-x^2\rangle$ (los polinomios de grado $\le2$ que se anulan en 0 y en 1), dimensión 1.
4. **(c) Imagen:** $\mathrm{Dim\,Im}(f)=3-1=2$ (Teorema 3.1) $=\mathrm{Dim}\,\mathbb R^2$, luego $\mathrm{Im}(f)=\mathbb R^2$: sí. Para $(1,3)$: $a=1$, $1+b+c=3\Rightarrow b+c=2$; por ejemplo $c=0$, $b=2$: $p=1+2x$ (comprobación: $p(0)=1$, $p(1)=3$ ✓).
5. **No es único:** si $f(p)=f(q)$, entonces $f(p-q)=\bar0$, es decir, $p-q\in\mathrm{Nuc}(f)$. Todas las soluciones son $p=1+2x+t(x-x^2)$, $t\in\mathbb R$ (una solución particular más el núcleo, como en los sistemas lineales).
6. *Verificado con sympy:* `Matrix([[1,0,0],[1,1,1]]).rank()=2`, `nullspace=[(0,-1,1)]` ($=-(x-x^2)$).

---

## Receta global de la sección (para la chuleta)

1. **Imagen:** $\mathrm{Im}(f)=\langle f(e_1),\dots,f(e_n)\rangle$ = espacio generado por las **columnas** de la matriz. Dimensión = **rango**. Base = columnas pivote (o las que den un menor no nulo de orden máximo). Ecuaciones cartesianas: exigir que la columna $(y_1,\dots,y_m)$ no aumente el rango (menores orlados = 0); hay $m-\mathrm{rang}$ ecuaciones; si $\mathrm{rang}=m$, la imagen es todo el espacio final.
2. **Núcleo:** resolver $AX=0$ (Gauss). Dimensión = nº de parámetros libres $=n-\mathrm{rang}A$. Base: un vector por parámetro. Si $\mathrm{rang}A=n$, $\mathrm{Nuc}=\{\bar0\}$ (dimensión 0, base vacía).
3. **Control:** $\mathrm{Dim\,Im}+\mathrm{Dim\,Nuc}=\mathrm{Dim}$ del espacio **inicial** (Teorema 3.1).
4. **Polinomios / matrices:** pasar a coordenadas en la base canónica, trabajar en $\mathbb R^n$ y traducir el resultado de vuelta.
5. **Ubicación:** $\mathrm{Nuc}(f)\subseteq V$ (vectores con $n$ coordenadas), $\mathrm{Im}(f)\subseteq W$ (vectores con $m$ coordenadas).

---

## Tabla de ejercicios cubiertos

| Ejercicio de E | Página impresa | Contenido | Teoría de U usada | Errata / omisión de E |
|---|---|---|---|---|
| 3.16 | p.93 | Paramétricas y cartesianas de $\mathrm{Im}(f)$, $\mathbb R^3\to\mathbb R^2$ | Def. 3.2 p.106; Ej. 3.10 p.108; Teor. 2.5–2.6 p.88 | «$y_1=\delta$» → $y_1=\alpha+\beta$; «cartesianas de $f$» → de $\mathrm{Im}(f)$; falta justificar la independencia |
| 3.20 | p.97 | Matriz, núcleo (base) y $\mathrm{Dim\,Im}$, $\mathbb R^4\to P_2$ | Def. 3.3 p.109; Teor. 3.1 p.111; Def. 3.4 p.116 | No concluye $\mathrm{Im}(f)=P_2$; apartado D es Maxima (fuera de examen) |
| 3.21 | p.98 | Matriz, base de la imagen y núcleo, $\mathbb R^3\to\mathcal M_{2\times2}$ | Defs. 3.2–3.4; Teor. 2.5 p.88; Rouché p.30 | B: no comprueba la independencia de los generadores |
| 3.22 | p.99 | V/F sobre dimensiones de Im y Nuc | Teor. 3.1 p.111; Def. 3.4 p.116 | — (apartado B es Maxima) |
| 3.23 | p.100 | Ecuaciones y bases de Im y Nuc, $\mathbb R^2\to\mathbb R^3$ | Defs. 3.2–3.3; Teor. 3.1; Rouché p.30 | — |
| 3.24 | p.101 | $\mathrm{Nuc}(\lambda f)$ | Def. 3.3 p.109; Def. 3.8 p.120 | Demostración de A incorrecta; «B, C falsas por ser cierta A» no es argumento |
| 3.25 | p.101 | Matriz de la derivada en $P_3$ e $\mathrm{Im}(f)$ | Defs. 3.1, 3.2, 3.4 | No justifica la linealidad (menor) |
| 3.26 | p.102 | $\mathrm{Nuc}$ de la derivada en $P_3$ | Def. 3.3; Teor. 3.1 | — |
| 3.27 | p.102 | Im y Nuc de la derivada segunda en $P_3$ | Def. 3.11 p.124; Teor. 3.1 | — |
| 3.28 | p.103 | Base del núcleo, base incompleta, matriz no determinada | Teor. 2.6–2.7 pp.88–89; Teor. 3.1–3.2 pp.111–114 | C: omite que $f(1)$, $f(x^3)$ deben ser independientes |
| 3.29 | p.104 | Matriz de $f\circ f$ en $P_4$, Im, Nuc, inclusión | Defs. 3.2–3.4, 3.11; Teor. 3.1 | B: notación que mezcla coordenadas y potencias |
| (3.15, 3.17, 3.18, 3.19) | pp.93–96 | Solo matriz asociada / ecuaciones | — | Pertenecen a §3.3 |
| (3.12 C, 3.13 D) | pp.89–90 | Imagen de $f$ / de un subespacio | Def. 3.2 p.106 | Frontera con §3.1; nota breve arriba |
| Ejemplos propios 1–3 | — | $\mathbb R^3\to\mathbb R^2$; endomorfismo con parámetro; $\wp_2\to\mathbb R^2$ por evaluación | Defs. 3.1–3.3; Teor. 3.1 | — |
