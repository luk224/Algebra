# Dossier de exámenes (fuente X) — Tema 2.3: Bases. Dimensión. Coordenadas

He leído **los 24 exámenes** de `fuentes_txt/examenes/*.txt` completos. Las matrices dudosas se han comprobado en el PDF de `E:\UNED\ALGEBRA\Examenes\`, renderizando la página con PyMuPDF: Feb. 2018 (tipo B), Feb. 2017 (2.ª sem., tipo A), Feb. 2025 (1.ª sem.). Todos los cálculos están verificados con sympy (script `v23.py` en el scratchpad de la sesión).

**Recuento:** 4 NUEVOS · 6 YA EN EL TEMA · 7 dudosos (con el tema que propongo) · más una lista de excluidos con el motivo.

## Alcance de U §2.3 (p.81-89, comprobado en `ingenieros.txt`, impresa = PDF − 6)
- p.82: **Def. 2.8** (espacio finito, es decir, generado por un número finito de vectores). **Def. 2.9**: base = sistema libre que genera $V$. **Caracterización**: es base si y solo si todo vector se escribe de manera **única** como combinación lineal de sus vectores (la demostración es el Ej. 2.24, p.82-83).
- p.83-85: Ej. 2.25 (base canónica de $\mathbb R^n$) y Ej. 2.26 ($\{x^2,x^2+x,x+1\}$ es base de $\wp_2$; $\{x^2,x,1\}$ es la base canónica).
- p.85: **Def. 2.10**, coordenadas: $v=x_1e_1+\dots+x_ne_n$, se escribe $(x_1,\dots,x_n)_B$. p.86: Ej. 2.27 (coordenadas en $\mathbb R^2$) y Ej. 2.28 (coordenadas en $\wp_2$).
- p.87: **Teor. 2.3** (existencia de base). **Teor. 2.4** (todas las bases tienen el mismo número de vectores). **Def. 2.11** ($\operatorname{Dim}V$; $\operatorname{Dim}\{0\}=0$). Ej. 2.29 ($\operatorname{Dim}\mathbb R^n=n$).
- p.88: si $\operatorname{Dim}V=n$, para ver que $n$ vectores forman base **basta comprobar que son libres** (o que generan). **Teor. 2.5**: $\operatorname{rang}S=\operatorname{Dim}\langle S\rangle$. El rango de un sistema es el rango de la matriz de sus **coordenadas**, puestas por filas o por columnas. **Teor. 2.6**: con $\operatorname{Dim}V=n$, todo conjunto libre de $n$ vectores es base y todo generador de $n$ vectores es base. Consecuencia: *$n$ vectores en dimensión $n$ son base $\iff$ su rango es $n$*.
- p.89: **Teor. 2.7** (base incompleta). Ej. 2.30 (en $\wp_3$, $\operatorname{Dim}\wp_3=4$; completar $\{x^2,x^2+x,x+1\}$ con $x^3$).
- La relación entre rango y número de vectores la da U §2.2 (p.80-81): un sistema libre tiene a lo sumo tantos vectores como cualquier sistema generador. De ahí sale que, en dimensión $n$, más de $n$ vectores son ligados y menos de $n$ no generan.
- **No está en §2.3:** la **matriz de cambio de coordenadas** y su determinante. Están en U §3.5.2 p.131-132 (Def. 3.14, $x_B=Qx_{B'}$, cada columna de $Q$ son las coordenadas de un vector de $B'$ en $B$), y «las matrices de cambio de base son regulares» en p.135. Por eso esas preguntas van a «dudosos → 3.5», igual que hace ya el tema (caja «Para practicar»).

---

## Parte A. YA EN EL TEMA (en `temas/tema_2_3_bases_dimension_coordenadas.html`, §6)

He revisado los 6. Los resultados y los determinantes que se citan se han recalculado con sympy y son correctos.

1. **Sept. 2018 (tipo A), ejercicio 2**: ¿es $\{x,x^3,x^2-2x,3x^3+2\}$ base de $\wp_3$? — YA EN EL TEMA. $\det=2$ ✓. El tema acierta al señalar que la solución oficial remite a un «Ejemplo 2.20» que no corresponde.
2. **Feb. 2026 (1.ª sem.), pregunta 3**: ¿es $S$ base de $\mathcal M_{2\times2}$? — YA EN EL TEMA. Rango 3 y $S_1=S_2-S_3+S_4$ ✓.
3. **Feb. 2020 (1.ª sem., tipo B), ejercicio 2**: extraer una base de $\{(1,2,-1),(3,1,0),(2,-1,1),(2,1,0)\}$ — YA EN EL TEMA. Los determinantes de las ternas son $0,-1,-1,-1$ ✓.
4. **Feb. 2024 (1.ª sem.), problema 7, apartados 1.º y 2.º**: $\operatorname{Dim}L_1=2$, $\operatorname{Dim}L_2=3$ — YA EN EL TEMA. Los pasos de Gauss son correctos ✓. Los apartados $L_1\cap L_2$ y $L_1+L_2$ son de 2.4. La solución oficial avisa del fallo recurrente de confundir suma con unión, que también es de 2.4.
5. **Sept. 2024, pregunta 2**: coordenadas de $A$ en una base de $\mathcal M_{2\times2}$, resultado $(2,1,0,-3)_{\mathcal B}$ — YA EN EL TEMA. $\det=30$ ✓.
6. **Feb. 2024 (1.ª sem.), problema 8**: coordenadas de $Q$ en la base de derivadas, resultado $(1,2,1,1,2)$ — YA EN EL TEMA. $\det M=27648$ ✓. La errata de la solución oficial ($Q=x^4+5x^3+\dots$) está bien señalada.

No he visto errores en estos seis.

**Aviso:** tres ejercicios del tema 2.3 aparecen solo como **«Para practicar»** (una línea, sin desarrollo): Feb. 2018 (tipo B) ej. 1, Sept. 2025 problema 7 y Feb. 2023 (2.ª sem.) problema 7. Como la regla 14 ahora pide incluir todos los ejercicios con su solución completa, los trato como **NUEVOS** (N1, N3 y N4).

---

## Parte B. NUEVOS (solución completa)

Orden sugerido, de fácil a difícil: N2 → N1 → N3 → N4.

### N2. Feb. 2018 (tipo A), ejercicio 2 — ¿dos vectores pueden ser base de $\mathbb R^3$?
Fichero: `Algebra_Febrero18A.txt`. La cabecera de la solución pone «Feberero [1]», pero el enunciado no indica la semana; se sigue el criterio del tema y se cita sin semana.

**Enunciado (literal).** Si $\{\bar u=(1,2,-1);\ \bar v=(3,1,0);\ \bar w=(2,-1,1);\ \bar s=(2,1,0)\}$, razonar si son o no ciertas las siguientes afirmaciones: A) $\{\bar u,\bar v\}$ forman un sistema generador de $\mathbb R^3$; B) $\{\bar u,\bar v\}$ forman una base de $\mathbb R^3$; C) $\{\bar u,\bar v\}$ forman un sistema libre o linealmente independiente.

**Solución.**
1. *Dimensión del espacio.* La base canónica de $\mathbb R^3$ tiene 3 vectores, así que $\operatorname{Dim}\mathbb R^3=3$ (Ej. 2.29 y Def. 2.11, U p.87). Por el Teor. 2.4 (U p.87), **toda** base de $\mathbb R^3$ tiene exactamente 3 vectores.
2. *C) es cierta.* Dos vectores son libres si y solo si ninguno es múltiplo del otro. Si fuera $\bar v=\lambda\bar u$, la 3.ª componente daría $0=-\lambda$, es decir, $\lambda=0$, y entonces $\bar v=(0,0,0)$, lo cual es falso. Otra forma: el menor $\begin{vmatrix}1&2\\3&1\end{vmatrix}=1-6=-5\neq0$, luego $\operatorname{rang}\{\bar u,\bar v\}=2$ (U p.27, rango = orden del mayor menor no nulo; U p.88, el rango del sistema es el de la matriz de coordenadas). **C) cierta.**
3. *A) es falsa.* Por el Teor. 2.5 (U p.88), $\operatorname{Dim}\langle\bar u,\bar v\rangle=\operatorname{rang}\{\bar u,\bar v\}=2<3$. Un subespacio de dimensión 2 no puede ser todo $\mathbb R^3$, porque si lo fuera tendría dimensión 3. Geométricamente, $\langle\bar u,\bar v\rangle$ es un plano por el origen. Contraejemplo explícito: $(0,0,1)\notin\langle\bar u,\bar v\rangle$, ya que $\det(\bar u,\bar v,e_3)=\begin{vmatrix}1&2\\3&1\end{vmatrix}=-5\neq0$, así que $e_3$ no es combinación de $\bar u,\bar v$. **A) falsa.**
4. *B) es falsa.* Una base tiene que ser libre **y** generadora (Def. 2.9, U p.82). Falla la segunda condición (paso 3). También se ve por número: tiene 2 vectores y toda base de $\mathbb R^3$ tiene 3 (Teor. 2.4). **B) falsa.**
5. *Comentario.* Los vectores $\bar w,\bar s$ del enunciado no se usan. Pertenecen al ejercicio hermano Feb. 2020 (tipo B), ej. 2, ya en el tema. Por el Teor. 2.7, $\{\bar u,\bar v\}$ se puede completar a una base con $3-2=1$ vector, por ejemplo $\bar s$: $\det(\bar u,\bar v,\bar s)=-1\neq0$.

**Resultado:** A) falsa, B) falsa, C) cierta. *(sympy: $\operatorname{rang}(\bar u,\bar v)=2$.)*

**Omisión en la solución oficial.** Se limita a decir «Dos vectores de $\mathbb R^3$ no pueden ser generadores ni base de $\mathbb R^3$. La opción C) es cierta como se aprecia fácilmente». No cita por qué (Teor. 2.4 / 2.5: cualquier sistema generador de $\mathbb R^3$ tiene al menos 3 vectores) ni comprueba C).

**Receta.** En un espacio de dimensión $n$: con **menos** de $n$ vectores nunca se genera (ni hay base); con **más** de $n$ vectores siempre hay dependencia (ni hay base). Solo con exactamente $n$ hay que hacer cuentas (rango o determinante).

**Error típico.** Pensar que «libre» implica «base». Un sistema libre solo es base si además tiene $\operatorname{Dim}V$ vectores (Teor. 2.6).

---

### N1. Feb. 2018 (tipo B), ejercicio 1 — $S_1$ base de $\mathbb R^4$; $S_2$ ligado en $\mathbb R^3$
Fichero: `Algebra_Febrero18B.txt` (matrices confirmadas en el PDF). En el tema solo aparece en «Para practicar».

**Enunciado (literal).** Sean el sistema $S_1$ de vectores definido por las filas de $\begin{pmatrix}4&1&-3&-4\\2&4&-4&3\\2&3&1&3\\4&0&-1&2\end{pmatrix}$ y el sistema de vectores $S_2$ definido por las filas de $\begin{pmatrix}1&1&-4\\1&5&6\\4&2&3\\-2&0&-2\end{pmatrix}$. Se pide comprobar que $S_1$ es una base de $\mathbb R^4$ y que $S_2$ es un sistema ligado de $\mathbb R^3$.

**Solución.**

*Parte $S_1$.*
1. *Qué hay que comprobar.* $\operatorname{Dim}\mathbb R^4=4$ (U p.87) y $S_1$ tiene 4 vectores. Por el Teor. 2.6 (U p.88) basta ver que son **libres**, es decir, que $\operatorname{rang}S_1=4$, o lo que es lo mismo, $\det\neq0$ (la matriz es cuadrada; U p.27).
2. *Rango por Gauss con enteros.* Las filas son $F_1=(4,1,-3,-4)$, $F_2=(2,4,-4,3)$, $F_3=(2,3,1,3)$, $F_4=(4,0,-1,2)$. Primero $F_1\leftrightarrow F_2$, para tener un pivote 2 que divide a 4 y a 2 y así evitar fracciones:
$$\begin{pmatrix}2&4&-4&3\\4&1&-3&-4\\2&3&1&3\\4&0&-1&2\end{pmatrix}\xrightarrow[F_4\to F_4-2F_1]{F_2\to F_2-2F_1,\ F_3\to F_3-F_1}\begin{pmatrix}2&4&-4&3\\0&-7&5&-10\\0&-1&5&0\\0&-8&7&-4\end{pmatrix}.$$
Cuentas: $F_2-2F_1=(4-4,\ 1-8,\ -3+8,\ -4-6)=(0,-7,5,-10)$; $F_3-F_1=(0,-1,5,0)$; $F_4-2F_1=(0,-8,7,-4)$.
3. *Segundo pivote.* Se intercambian $F_2\leftrightarrow F_3$ para usar el $-1$ como pivote (divide a todo):
$$\xrightarrow{F_2\leftrightarrow F_3}\begin{pmatrix}2&4&-4&3\\0&-1&5&0\\0&-7&5&-10\\0&-8&7&-4\end{pmatrix}\xrightarrow[F_4\to F_4-8F_2]{F_3\to F_3-7F_2}\begin{pmatrix}2&4&-4&3\\0&-1&5&0\\0&0&-30&-10\\0&0&-33&-4\end{pmatrix}.$$
Cuentas: $F_3-7F_2=(0,0,5-35,-10)$; $F_4-8F_2=(0,0,7-40,-4)$.
4. *Último bloque.* $\begin{vmatrix}-30&-10\\-33&-4\end{vmatrix}=120-330=-210\neq0$. Las dos últimas filas son, por tanto, independientes: con $F_4\to 30F_4-33F_3$ queda $(0,0,0,-120+330)=(0,0,0,210)$, un cuarto pivote. Hay **4 pivotes**, así que $\operatorname{rang}S_1=4$.
5. *Determinante (comprobación).* Se han hecho dos intercambios, que dejan el signo igual, y operaciones del tipo $F_i\to F_i+\alpha F_j$, que no cambian el determinante (U p.27). Por tanto $\det=2\cdot(-1)\cdot(-210)=420\neq0$, que coincide con el valor de la solución oficial.
6. *Conclusión.* 4 vectores libres en un espacio de dimensión 4 forman **base** de $\mathbb R^4$ (Teor. 2.6).

*Parte $S_2$.*
7. *Argumento de dimensión, sin cuentas.* $S_2$ tiene 4 vectores de $\mathbb R^3$, cuya dimensión es 3. El rango de una matriz $4\times3$ es como mucho 3, porque solo tiene 3 columnas (U p.27), así que $\operatorname{rang}S_2\le3<4$ = número de vectores. Por tanto **son ligados**: un sistema libre de $\mathbb R^3$ tiene a lo sumo 3 vectores, ya que no puede tener más vectores que el sistema generador $\{e_1,e_2,e_3\}$ (U p.81).
8. *Dependencia explícita (opcional, convence al corrector).* Resolviendo $\lambda_1F_1+\dots+\lambda_4F_4=0$ sale $-5F_1-3F_2+10F_3+16F_4=0$. Comprobación por componentes: $-5-3+40-32=0$; $-5-15+20+0=0$; $20-18+30-32=0$ ✓. De paso, los tres primeros vectores son libres: $\det\begin{pmatrix}1&1&-4\\1&5&6\\4&2&3\end{pmatrix}=96\neq0$, luego $\operatorname{rang}S_2=3$.

**Resultado:** $S_1$ es base de $\mathbb R^4$ ($\det=420$). $S_2$ es ligado (4 vectores en $\mathbb R^3$; $\operatorname{rang}=3$). *(Verificado con sympy: $\det S_1=420$, forma escalonada con 4 pivotes, $\operatorname{rang}S_2=3$ y vector del núcleo de $S_2^t$ proporcional a $(-5,-3,10,16)$.)*

**Comentario sobre la solución oficial.** Es correcta, pero en la parte de $S_1$ dice «las **columnas** forman una base», cuando el enunciado habla de **filas**. No es un error de fondo, porque $\operatorname{rang}A=\operatorname{rang}A^t$ (U p.27: el rango se puede calcular por filas o por columnas) y entonces filas y columnas son a la vez base. Pero conviene escribir «filas». Además no muestra los pasos de Gauss ni el determinante. Para $S_2$ añade, con acierto: «no habría hecho falta calcular el rango».

**Receta.** ¿$n$ vectores son base de $\mathbb R^n$? Calcula $\det$ o rango (Teor. 2.6). ¿Más de $n$ vectores en $\mathbb R^n$? Ligados sin hacer cuentas.

**Error típico.** Calcular el determinante de la matriz $4\times3$ de $S_2$ (no existe: no es cuadrada) o perder tiempo con su rango cuando basta el argumento de dimensión.

---

### N3. Sept. 2025, problema 7 — ¿es $\{A,B,X,Y\}$ base de $\mathcal M_{2\times2}$? y $\operatorname{Dim}\langle A,B,Y\rangle$
Fichero: `Algebra_Septiembre25.txt`. El apartado 1.º (calcular $X+Y$) es álgebra matricial (1.2), pero hace falta para los otros dos. En el tema solo aparece en «Para practicar».

**Enunciado (literal).** Se sabe que las matrices $X,Y\in\mathcal M_{2\times2}$ satisfacen $\begin{cases}2X+3Y=A\\X-Y=B\end{cases}$, en donde $A=\begin{pmatrix}5&1\\0&4\end{pmatrix}$ y $B=\begin{pmatrix}1&-1\\2&0\end{pmatrix}$.
• Calcule $X+Y$ (1 PUNTO).
• Razone si el conjunto $\{A,B,X,Y\}$ forma o no una base de $\mathcal M_{2\times2}$ (0.5 PUNTOS).
• Calcule la dimensión del subespacio generado por $\{A,B,Y\}$ (0.5 PUNTOS).

**Solución.**
1. *Despejar $X$ e $Y$*, como un sistema lineal con incógnitas matriciales. Las propiedades de la suma y del producto por escalares (U §1.2) permiten operar igual que con números. De la 2.ª ecuación, $X=Y+B$. Sustituyendo en la 1.ª: $2(Y+B)+3Y=A\Rightarrow 5Y=A-2B\Rightarrow Y=\tfrac15(A-2B)$.
2. *Cuentas.* $A-2B=\begin{pmatrix}5-2&1+2\\0-4&4-0\end{pmatrix}=\begin{pmatrix}3&3\\-4&4\end{pmatrix}$, así que $Y=\begin{pmatrix}3/5&3/5\\-4/5&4/5\end{pmatrix}$ y $X=Y+B=\begin{pmatrix}8/5&-2/5\\6/5&4/5\end{pmatrix}$. Entonces
$$X+Y=\begin{pmatrix}11/5&1/5\\2/5&8/5\end{pmatrix}.$$
Comprobación: $2X+3Y=\begin{pmatrix}16/5+9/5&-4/5+9/5\\12/5-12/5&8/5+12/5\end{pmatrix}=\begin{pmatrix}5&1\\0&4\end{pmatrix}=A$ ✓ y $X-Y=\begin{pmatrix}1&-1\\2&0\end{pmatrix}=B$ ✓.
3. *¿Base?* $\operatorname{Dim}\mathcal M_{2\times2}=4$ (base canónica $\{E_{11},E_{12},E_{21},E_{22}\}$) y el conjunto tiene 4 elementos. Por el Teor. 2.6, es base si y solo si es libre. Pero el propio enunciado da una combinación lineal: $A=2X+3Y$, es decir, $1\cdot A+0\cdot B-2X-3Y=0$ con coeficientes no todos nulos. Por tanto $\{A,B,X,Y\}$ es **ligado** y **no es base**. También $B=X-Y$ es otra dependencia.
4. *Cuántos son independientes.* $A$ y $B$ son libres porque no son proporcionales: si $A=\lambda B$, la entrada $(2,1)$ da $0=2\lambda$, así que $\lambda=0$, y entonces $A=0$, que es falso. Además $X=\tfrac15(A+3B)$ e $Y=\tfrac15(A-2B)$: de $Y=\tfrac15(A-2B)$ y $X=Y+B=\tfrac15(A+3B)$. Así que $\langle A,B,X,Y\rangle=\langle A,B\rangle$ tiene dimensión 2 (Teor. 2.5: dimensión = rango = 2).
5. *$\operatorname{Dim}\langle A,B,Y\rangle$.* Como $Y=\tfrac15A-\tfrac25B\in\langle A,B\rangle$, por la propiedad de supresión de §2.2 se puede quitar $Y$ sin cambiar el subespacio: $\langle A,B,Y\rangle=\langle A,B\rangle$. Y $\{A,B\}$ es libre (paso 4), luego es base de ese subespacio. Por tanto $\operatorname{Dim}\langle A,B,Y\rangle=2$.
6. *Comprobación por coordenadas (U p.88, opcional).* Con las entradas por filas, $A\to(5,1,0,4)$, $B\to(1,-1,2,0)$, $Y\to(3/5,3/5,-4/5,4/5)$, que multiplicado por 5 da $(3,3,-4,4)$. $\operatorname{rang}\begin{pmatrix}5&1&0&4\\1&-1&2&0\\3&3&-4&4\end{pmatrix}=2$, porque la 3.ª fila es la 1.ª menos 2 veces la 2.ª.

**Resultado:** $X+Y=\frac15\begin{pmatrix}11&1\\2&8\end{pmatrix}$. $\{A,B,X,Y\}$ **no** es base (ligado, $A=2X+3Y$). $\operatorname{Dim}\langle A,B,Y\rangle=2$. *(Verificado con sympy: $\operatorname{rang}\{A,B,X,Y\}=2$, $\det=0$; $\operatorname{rang}\{A,B,Y\}=2$.)*

**Comentario sobre la solución oficial.** Es correcta pero escueta: «no forman una base porque justamente las ecuaciones del enunciado nos indican que A y B dependen linealmente de X e Y». Para justificar «no es base» bastaba eso, pero conviene escribir la combinación nula y citar la Def. 2.9 (base = libre + generador). En el tercer apartado no dice por qué el resultado es exactamente 2 y no 1: falta comprobar que $A,B$ son libres. La oficial lo hace con «$\lambda A=B\Rightarrow\lambda=0$», que también es correcto.

**Receta.** Si el enunciado ya da relaciones lineales entre los elementos, úsalas: cualquier igualdad «uno = combinación de otros» prueba que el conjunto es ligado. La dimensión del subespacio generado se obtiene quitando los que dependen de los demás y comprobando que los que quedan son libres.

**Error típico.** Responder «$\operatorname{Dim}=3$ porque hay 3 matrices», o «no es base porque $\det A\neq0$» (confundir el determinante de cada matriz con la independencia del conjunto).

---

### N4. Feb. 2023 (2.ª sem.), problema 7 — independencia, ecuaciones, dimensión y base extraída de $E$
Fichero: `Algebra_Febrero23B.txt` (su cabecera dice «Febrero 2023 - Segunda Semana»). En el tema solo aparece en «Para practicar». Los apartados (ii) y (iii) (ecuaciones paramétricas e implícitas) son del tema 2.2 y la base **ortonormal** de (iv) es del tema 5. Propuesta: en 2.3, desarrollar completos (i) y la dimensión y base de (iv), y dar (ii)-(iii) en dos líneas.

**Enunciado (literal).** Consideremos el espacio vectorial $V=\mathbb R^3$ con el producto escalar usual, la base $B$ de $V$ formada por los vectores $v_1=(1,0,0)$, $v_2=(0,1,0)$, $v_3=(0,0,1)$, el subconjunto $E\subset V$, $E=\{(1,3,1),(3,8,2),(2,9,5)\}$ y el subespacio $U$ generado por $E$ en $V$.
(i) Estudie si $E$ es linealmente independiente. (0.3 PUNTOS)
(ii) Exprese $U$ mediante ecuaciones paramétricas respecto de la base $B$. (0.5 PUNTOS)
(iii) Exprese $U$ mediante ecuaciones implícitas respecto de la base $B$. (0.5 PUNTOS)
(iv) Determine la dimensión de $U$ y extraiga una base ortonormal de $U$ entre los elementos de $E$. (0.7 PUNTOS)

**Solución.**
1. *(i) Rango por Gauss* (vectores por filas):
$$\begin{pmatrix}1&3&1\\3&8&2\\2&9&5\end{pmatrix}\xrightarrow[F_3\to F_3-2F_1]{F_2\to F_2-3F_1}\begin{pmatrix}1&3&1\\0&-1&-1\\0&3&3\end{pmatrix}\xrightarrow{F_3\to F_3+3F_2}\begin{pmatrix}1&3&1\\0&-1&-1\\0&0&0\end{pmatrix}.$$
Cuentas: $F_2-3F_1=(0,8-9,2-3)$; $F_3-2F_1=(0,9-6,5-2)$. Hay 2 pivotes, luego $\operatorname{rang}E=2<3$ y $E$ **no** es linealmente independiente. (Con determinantes: $\det=0$.)
2. *Dependencia explícita.* Buscamos $(2,9,5)=a(1,3,1)+b(3,8,2)$. De la 1.ª y la 3.ª componente: $a+3b=2$, $a+2b=5$, así que $b=-3$ y $a=11$. La 2.ª componente lo confirma: $33-24=9$ ✓. Es decir, $(2,9,5)=11(1,3,1)-3(3,8,2)$.
3. *(iv) Dimensión.* Por el Teor. 2.5 (U p.88), $\operatorname{Dim}U=\operatorname{rang}E=2$.
4. *(iv) Base extraída de $E$.* $(1,3,1)$ y $(3,8,2)$ no son proporcionales (con la 1.ª componente sería $\lambda=3$, pero entonces la 3.ª daría $2\ne3$), así que son libres. Generan $U$, porque el tercero es combinación de ellos (paso 2, supresión). Por tanto son base de $U$: dos vectores libres en un subespacio de dimensión 2 (Teor. 2.6 aplicado a $U$).
5. *(ii) Paramétricas* (§2.2): $(x_1,x_2,x_3)=\alpha(1,3,1)+\beta(3,8,2)$, es decir, $x_1=\alpha+3\beta$, $x_2=3\alpha+8\beta$, $x_3=\alpha+2\beta$, con $\alpha,\beta\in\mathbb R$.
6. *(iii) Implícitas.* $(x_1,x_2,x_3)\in U$ si y solo si $\operatorname{rang}\{(x_1,x_2,x_3),(1,3,1),(3,8,2)\}=2$, es decir, si $\begin{vmatrix}x_1&x_2&x_3\\1&3&1\\3&8&2\end{vmatrix}=x_1(6-8)-x_2(2-3)+x_3(8-9)=-2x_1+x_2-x_3=0$. Hay una ecuación porque $3-\operatorname{Dim}U=1$. Comprobación: $(1,3,1)$ da $-2+3-1=0$ ✓; $(3,8,2)$ da $-6+8-2=0$ ✓; $(2,9,5)$ da $-4+9-5=0$ ✓.
7. *(iv) Base ortonormal (tema 5, solo para cerrar).* Ningún par de vectores de $E$ es ortogonal: $(1,3,1)\cdot(3,8,2)=29$, $(1,3,1)\cdot(2,9,5)=34$, $(3,8,2)\cdot(2,9,5)=88$. Así que no se puede «extraer» literalmente una base ortonormal entre los elementos de $E$; hay que ortonormalizar (Gram-Schmidt) o buscar un vector de $U$ ortogonal a uno de ellos. La oficial toma $u=(-4,-1,7)$: está en $U$ ($8-1-7=0$ ✓) y es ortogonal a $(1,3,1)$ ($-4-3+7=0$ ✓). La base ortonormal es $\{\tfrac1{\sqrt{11}}(1,3,1),\tfrac1{\sqrt{66}}(-4,-1,7)\}$.

**Resultado:** (i) $E$ es ligado ($\operatorname{rang}2$; $(2,9,5)=11(1,3,1)-3(3,8,2)$). (ii) $x_1=\alpha+3\beta$, $x_2=3\alpha+8\beta$, $x_3=\alpha+2\beta$. (iii) $-2x_1+x_2-x_3=0$. (iv) $\operatorname{Dim}U=2$, con base $\{(1,3,1),(3,8,2)\}$. *(Verificado con sympy: $\det E=0$, rango 2, $a=11$, $b=-3$, implícita $-2x_1+x_2-x_3$.)*

**Errores y omisiones de la solución oficial.**
- Pone los vectores por **columnas**: $A=\begin{pmatrix}1&3&2\\3&8&9\\1&2&5\end{pmatrix}$, y da la escalonada $\begin{pmatrix}1&3&2\\0&-1&3\\0&0&0\end{pmatrix}$ sin escribir las operaciones. La escalonada es correcta: $F_2-3F_1=(0,-1,3)$, $F_3-F_1=(0,-1,3)$ y después $F_3-F_2=0$ (comprobado). En el examen hay que escribir las operaciones.
- La oficial no justifica por qué $\{(1,3,1),(3,8,2)\}$ es base: no comprueba que sean libres ni que generen.
- En (iv), la frase «extraiga una base ortonormal de $U$ entre los elementos de $E$» del enunciado es imposible en sentido literal (paso 7). La propia solución oficial usa un vector que **no** está en $E$.
- La implícita oficial $-2x_1+x_2-x_3=0$ es equivalente a la del tema ($2x_1-x_2+x_3=0$) ✓.

**Receta.** Dimensión del subespacio generado: rango de la matriz de vectores (Gauss). Base: los vectores originales que corresponden a los pivotes. Implícitas: orlar con $(x_1,\dots,x_n)$ y anular los menores (aquí, un solo determinante $3\times3$).

**Error típico.** Dar como base de $U$ las tres filas de $E$ (son ligadas), o decir «$\operatorname{Dim}U=3$ porque $E$ tiene 3 vectores».

---

## Parte C. DUDOSOS (fronterizos; tema propuesto entre paréntesis)

### D1. Feb. 2017 (2.ª sem., tipo A), ejercicio 3 — determinante de la matriz de cambio de base (→ **3.5**)
**Enunciado (literal, del PDF).** Si $U=\{\bar u_1,\bar u_2,\bar u_3\}$ y $U'=\{\bar u'_1,\bar u'_2,\bar u'_3\}$ son bases de $\mathbb R^3$, cuyos vectores están relacionados por $\bar u'_1=\bar u_1+\bar u_3$; $\bar u'_2=\bar u_1-\bar u_2$ y $\bar u'_3=\bar u_2$, es cierto que el determinante de la matriz asociada al cambio de la base $U$ a la base $U'$ es: A) 1; B) −1; C) 0; D) Otro diferente.

**Solución.**
1. Las coordenadas de cada $\bar u'_j$ en la base $U$ se leen directamente de las relaciones: $(1,0,1)$, $(1,-1,0)$ y $(0,1,0)$. Puestas por **columnas**, dan la matriz $Q$ con $x_U=Qx_{U'}$ (Def. 3.14, U p.132):
$$Q=\begin{pmatrix}1&1&0\\0&-1&1\\1&0&0\end{pmatrix}.$$
2. Desarrollando por la 3.ª fila: $\det Q=1\cdot\begin{vmatrix}1&0\\-1&1\end{vmatrix}=1$, con signo $(-1)^{3+1}=+$.
3. *Ambigüedad del sentido.* «Cambio de $U$ a $U'$» puede significar $Q$ o $Q^{-1}$, según el convenio. Aquí no importa: $\det Q^{-1}=1/\det Q=1$.

**Resultado:** **A) 1** (la oficial dice A y da la misma $Q$). *(sympy: $\det Q=\det Q^{-1}=1$.)*

**Receta.** Matriz de cambio: por columnas, las coordenadas de la base nueva en la antigua. El determinante del cambio inverso es el inverso del determinante. **Error típico:** poner las coordenadas por filas. Para el determinante da igual ($\det Q^t=\det Q$), pero la matriz pedida sería la traspuesta y quedaría mal.

### D2. Feb. 2025 (1.ª sem.), pregunta 2 — determinante de la matriz de cambio de coordenadas (→ **3.5**; el tema 2.3 ya lo remite a 3.5)
**Enunciado (literal, del PDF).** Si $\mathcal B=\{\bar v_1,\bar v_2,\bar v_3\}$ y $\mathcal B'=\{\bar u_1,\bar u_2,\bar u_3\}$ son bases de $\mathbb R^3$, cuyos vectores están relacionados por $\bar u_1=2\bar v_1-\bar v_2$, $\bar u_2=5\bar v_1-\bar v_3$, y $\bar u_3=4\bar v_2$, calcule el determinante de la matriz de cambio de coordenadas respecto de $\mathcal B'$ a coordenadas respecto de $\mathcal B$.

**Solución.**
1. Las coordenadas de los $\bar u_j$ en $\mathcal B$, puestas por columnas (Def. 3.14, U p.132), dan $x_{\mathcal B}=Qx_{\mathcal B'}$ con
$$Q=\begin{pmatrix}2&5&0\\-1&0&4\\0&-1&0\end{pmatrix}.$$
2. Desarrollando por la 3.ª fila, solo queda el $-1$ en la posición $(3,2)$, con signo $(-1)^{3+2}=-1$: $\det Q=(-1)\cdot(-1)\cdot\begin{vmatrix}2&0\\-1&4\end{vmatrix}=1\cdot8=8$.
3. Aquí el sentido **sí** importa. «De $\mathcal B'$ a $\mathcal B$» es exactamente $Q$, así que la respuesta es 8. El cambio inverso tendría determinante $1/8$.

**Resultado:** $|Q|=8$. *(sympy ✓; $\det Q^{-1}=1/8$.)* **Errata menor en la oficial:** escribe «$\beta_1\bar v_1+\beta_2\bar u_2+\beta_3\bar v_3$», cuando debería ser $\beta_2\bar v_2$.
**Error típico:** confundir el sentido del cambio y responder $1/8$, o poner las coordenadas por filas sin advertir que eso da la traspuesta (aunque el determinante coincida).

### D3. Feb. 2017 (2.ª sem., tipo A), ejercicio 2 — sistema ligado con parámetros (→ **2.2**)
**Enunciado (literal).** Los vectores $(1,1,0,a),(3,-1,b,-1),(-3,5,a,-4)$ son un sistema ligado si: A) $a=-2$ y $b=1$; B) $a=-2$ o $b=1$; C) Siempre; D) Ninguna de ellas.

**Solución breve.** Tres vectores de $\mathbb R^4$ son ligados si y solo si su rango es menor que 3, es decir, si se anulan **todos** los menores $3\times3$ de la matriz $3\times4$. Dos de esos menores son $-4(a+2b)$ (columnas 1, 2, 3) y $12(a+2)$ (columnas 1, 2, 4). Su anulación obliga a $a=-2$ y $b=1$, y con esos valores los otros dos menores también valen 0. **A).** Es la parte «ligado/rango» de 2.2, no de bases. *(sympy ✓.)*

### D4. Feb. 2024 (1.ª sem.), pregunta 2 — matrices linealmente dependientes (→ **2.2**)
**Enunciado (literal).** Halle los valores de $x$ e $y$ para que las matrices $A=\begin{pmatrix}x&y\\5&-18\end{pmatrix}$, $B=\begin{pmatrix}1&2\\-1&3\end{pmatrix}$, $C=\begin{pmatrix}0&1\\2&-7\end{pmatrix}$ sean linealmente dependientes.

**Solución breve.** $B,C$ son libres (no proporcionales), así que $\{A,B,C\}$ es ligado si y solo si $A=\alpha B+\beta C$. Las entradas $(2,1)$ y $(2,2)$ dan $5=-\alpha+2\beta$ y $-18=3\alpha-7\beta$, de donde $\alpha=1$, $\beta=3$. Entonces $x=\alpha=1$, $y=2\alpha+\beta=5$. *(sympy ✓.)* Usa coordenadas en $\mathcal M_{2\times2}$, pero el concepto principal es la dependencia lineal (2.2).

### D5. Sept. 2022, ejercicio 2 — subespacio de dimensión 1 de $\mathbb R^2$ (→ **2.2**, ecuaciones; podría ir en 2.3 como ejemplo de «dimensión = n.º de parámetros = $n$ − n.º de ecuaciones»)
**Enunciado (literal).** Escribir las ecuaciones cartesianas o paramétricas de un subespacio vectorial de dimensión 1 del espacio $\mathbb R^2$.

**Solución breve.** Basta un vector no nulo $w$: $\langle w\rangle$ tiene base $\{w\}$, luego dimensión 1 (Def. 2.11). Por ejemplo, con $w=(1,-2)$: paramétricas $x_1=\lambda$, $x_2=-2\lambda$; cartesiana $2x_1+x_2=0$. Hay una ecuación porque $2-1=1$. Ojo: una de las soluciones oficiales es «$2x_1=0$», que equivale a $x_1=0$ y es la recta $\langle(0,1)\rangle$ (válida).

### D6. Sept. 2022, problema b) — base, ecuaciones y suplementario de $F+G$ (→ **2.4**; usa el Teor. 2.7 de base incompleta para el suplementario)
**Enunciado (literal).** Consideramos en $\mathbb R^3$ los subespacios vectoriales $F=\{(x_1,x_2,x_3)\in\mathbb R^3\mid x_3=x_2,\ x_1=-x_2\}$ y $G=\{\lambda(0,1,1),\ \forall\lambda\in\mathbb R\}$. Se pide calcular una base, las ecuaciones cartesianas y paramétricas del subespacio $F+G$. Hallar un subespacio suplementario de $F+G$.

**Solución breve.** $F=\langle(-1,1,1)\rangle$ y $G=\langle(0,1,1)\rangle$. Esos dos vectores no son proporcionales, luego $\{(-1,1,1),(0,1,1)\}$ es base de $F+G$ y $\operatorname{Dim}(F+G)=2$. Paramétricas: $x_1=-\alpha$, $x_2=x_3=\alpha+\beta$. Cartesiana: $x_2-x_3=0$. Suplementario: se completa la base con $(0,1,0)$ (Teor. 2.7), porque $\det\begin{pmatrix}-1&1&1\\0&1&1\\0&1&0\end{pmatrix}=1\neq0$. Entonces $U=\langle(0,1,0)\rangle$. *(sympy ✓.)* Lo principal es suma y suplementario, de 2.4.

### D7. Ene. 2020 (tipo A), problema a) — subespacio de dimensión 2, $\operatorname{Dim}V$ por rango, $U\cap V$, suplementario de $U+V$ (→ **2.4**)
**Enunciado (literal).** En el espacio vectorial $\mathbb R^3$, con las operaciones habituales, definir un subespacio $U$ de dimensión 2 mediante unas ecuaciones paramétricas (0.5 ptos.) y calcular el subespacio intersección $U\cap V$, indicando qué dimensión tiene, siendo $V$ el subespacio generado por $\{(1,1,1),(2,1,0),(0,1,2)\}$ (0.5 ptos.). Calcular un subespacio suplementario al subespacio $U+V$. (1 pto.)

**Lo que toca a 2.3.** $\operatorname{Dim}V=\operatorname{rang}=2$, porque $(0,1,2)=2(1,1,1)-(2,1,0)$. Por eso $V$ es el plano $x-2y+z=0$. El resto (intersección, Grassmann, suplementario $\{0\}$ porque $U+V=\mathbb R^3$ con el $U$ oficial) es de 2.4. Lo dejo en 2.4.

---

## Parte D. Excluidos (revisados; el contenido principal es de otro tema)
- **2.1:** Sept. 2017 (tipo A) ej. 2 (conjunto de matrices $3\times3$ que no contiene la nula; la opción A «dimensión 3» se descarta porque no es subespacio). Feb. 2019 (tipo A) ej. 2, Ene. 2020 (tipo A) ej. 2, Sept. 2017 problema a) (leyes de composición). Feb. 2023 (1.ª sem.) p.2, Feb. 2023 (2.ª sem.) p.2, Feb. 2024 (2.ª sem.) p.4, Feb. 2026 (2.ª sem.) p.2 (¿es subespacio?).
- **2.2:** Feb. 2022 (tipo A) ej. 2 (generador de $U$ a partir de implícitas; la oficial lo llama «base»), Feb. 2025 (1.ª sem.) p.3, Sept. 2023 p.2 (combinación lineal), Feb. 2022 (tipo A) ej. 1.
- **2.4:** Feb. 2018 (tipo B) ej. 2, Feb. 2019 (tipo B) ej. 2, Sept. 2019 ej. 2, Ene. 2022 (tipo A) ej. 2, Feb. 2025 (2.ª sem.) p.2 (Grassmann), Sept. 2024 problema 7, Feb. 2024 (1.ª sem.) problema 7 apartados 3.º y 4.º.
- **3.x:** Feb. 2019 (tipo A) ej. 3 (matriz en bases no canónicas, 3.3; usa coordenadas en la base $\{(0,1),(1,0)\}$), Ene. 2022 (tipo A) ej. 3 (3.3), Feb. 2022 (tipo A) ej. 3 ($\operatorname{Dim}D_{2\times2}=2$, 3.2), Feb. 2018 (tipo A) ej. 3, Sept. 2019 ej. 3, Feb. 2026 (2.ª sem.) problema 7 (base del núcleo, 3.2), Sept. 2025 p.2 (dimensión de la imagen, 3.2), Feb. 2026 (2.ª sem.) p.3 ($f$ sobre $\mathcal M_{2\times2}$, 3.1), Feb. 2026 (1.ª sem.) p.2 (rango de la matriz asociada, 3.3), Sept. 2017 ej. 3 («las matrices de cambio de base son singulares», 3.5), Feb. 2026 (2.ª sem.) problema 8 (3.5/4).
- **1.x / 4-6:** el resto (rango por Gauss, determinantes, sistemas, diagonalización, producto escalar, formas cuadráticas, cónicas). Sept. 2018 ej. 6 (cambio de base de una forma bilineal, 6.1).
