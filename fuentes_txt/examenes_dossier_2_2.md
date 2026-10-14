# Dossier de exámenes (fuente X) — Tema 2.2: Sistemas de generadores

Alcance de U §2.2 (pp. 69-80 impresas, comprobado en `ingenieros.txt`): **ecuaciones paramétricas y cartesianas** de un subespacio y paso de unas a otras (pp. 69-71, el libro lo anuncia en los «elementos didácticos» de p. 69 y lo usa en p. 71 y p. 80); §2.2.2 **combinación lineal** (Def. 2.3), **subespacio generado / sistema generador** (Def. 2.4), sistemas equivalentes (p. 73); §2.2.3 **independencia lineal** (Defs. 2.5-2.6), **rango de un sistema de vectores** (Def. 2.7, p. 78); **Teorema 2.1** (supresión, p. 79) y **Teorema 2.2** (sustitución, p. 79). Base, dimensión y coordenadas quedan para §2.3 (p. 81); suma, intersección y suma directa, para §2.4 (p. 89).

Se han leído los 24 exámenes de `fuentes_txt/examenes/`. Todos los cálculos se han comprobado con sympy (script en el scratchpad de la sesión). Resultados de la comprobación al final.

**Recuento:** 3 NUEVOS · 6 YA EN EL TEMA (más 1 variante ya incluida) · 11 dudosos (fronterizos) · 7 descartados (son claramente de 2.4).

---

## A. YA EN EL TEMA (`temas/tema_2_2_sistemas_generadores.html`, §7)

| Fuente | Contenido | Observación |
|---|---|---|
| Feb. 2017 (2.ª sem., tipo A), ejercicio 2 | ¿Cuándo es ligado $\{(1,1,0,a),(3,-1,b,-1),(-3,5,a,-4)\}$? (test) | Correcto (sympy: rango 2 con $a=-2,b=1$). |
| Feb. 2018 (tipo A), ejercicio 2 | $\{\bar u,\bar v\}$ ¿generador, base, libre? | Correcto ($\det(\bar u,\bar v,e_3)=-5$). **Incoherencia de rótulo:** el `<summary>` dice «Feb. 2018 (tipo A)», pero el texto visible de la etiqueta `.src` dice «X Feb. 2018 (1.ª, A)», contradiciendo el commit a4ac44e («quitar 1.ª sem.»). Nota: la cabecera de las *soluciones* de ese examen pone «Feberero [1]. 2018», aunque el enunciado no indica la semana. Hay que unificarlo. |
| Feb. 2018 (tipo B), ejercicio 1 — solo la parte «$S_2$ es ligado» | Ya incluida como **variante** dentro de Feb. 2018 (tipo A). | Correcto (4 vectores de $\mathbb R^3$; sympy: rango 3). La parte «$S_1$ es base de $\mathbb R^4$» es de 2.3 (ver dudosos). |
| Feb. 2022 (tipo A), ejercicio 2 | Sistema que genere $U=\{x+y-z=0,\ x+2y=0\}$ | Correcto. |
| Feb. 2024 (1.ª sem.), pregunta 2 | $x,y$ para que $A,B,C\in\mathcal M_{2\times2}$ sean dependientes | Correcto ($x=1,\ y=5$). |
| Feb. 2025 (1.ª sem.), pregunta 3 | $t$ para que $w$ sea c.l. de $v_1,v_2,v_3$ | Correcto ($t=2$; sympy: $\det=-24(t-2)$). |
| Sept. 2023, pregunta 2 | $k$ para que $(1,1,-2,k)$ sea c.l. | Correcto ($k=-8$; sympy $D=3k+24$). La caja «Omisión en la solución oficial» está bien fundada. |

**Error a corregir en el tema (caja «Para practicar»):** dice de Feb. 2023 (2.ª sem.), problema 7, que «los apartados (ii)-(iv) son de §2.3 y Tema 5». No es así: (ii) ecuaciones paramétricas y (iii) ecuaciones implícitas del subespacio generado son de **§2.2** (U pp. 69-71). Solo (iv) es de 2.3 + Tema 5. Por eso este problema pasa a NUEVO (abajo, N3) y debería salir de «Para practicar».

---

## B. NUEVOS

### N1. Feb. 2022 (tipo A), ejercicio 1 — de paramétricas a cartesianas (inventar el ejemplo)

**Enunciado (literal):** «Escríba unas ecuaciones paramétricas de un sistema y halle las ecuaciones cartesianas de dicho sistema. Considere 3 incógnitas.»

*Lectura del enunciado:* la redacción es imprecisa («ecuaciones paramétricas de un sistema»). Lo que se pide (y lo que hace la solución oficial) es: elegir un **subespacio de $\mathbb R^3$**, dar sus ecuaciones **paramétricas** y deducir sus ecuaciones **cartesianas** (implícitas). Es exactamente el paso «paramétricas → cartesianas» de U §2.2, pp. 69-71.

**Solución oficial (resumen):** $x=\alpha,\ y=-\alpha,\ z=0$, «que en cartesianas es $x+y=0,\ z=0$». No justifica la eliminación ni dice cuántas ecuaciones deben salir.

**Solución paso a paso.**

1. **Elegir el subespacio con generadores sencillos.** Tomamos $U=\langle(1,-1,0)\rangle$, la recta generada por $u=(1,-1,0)\neq\bar 0$. Por Def. 2.4 (U p. 72), $U$ está formado por todas las combinaciones lineales $\alpha u$, $\alpha\in\mathbb R$.
2. **Ecuaciones paramétricas.** $(x,y,z)\in U\iff(x,y,z)=\alpha(1,-1,0)$ para algún $\alpha$, es decir
   $$U:\ \begin{cases}x=\alpha\\ y=-\alpha\\ z=0\end{cases}\qquad\alpha\in\mathbb R.$$
3. **¿Cuántas ecuaciones cartesianas deben salir?** Hay 3 incógnitas y el sistema generador $\{u\}$ tiene rango 1 (un vector no nulo es libre, Def. 2.5); así que hay que eliminar 1 parámetro y quedarán $3-1=2$ ecuaciones independientes (es el recuento de Rouché, U p. 30: un sistema homogéneo de rango $r$ con 3 incógnitas tiene $3-r$ parámetros; aquí queremos el recíproco, $r=2$).
4. **Eliminar el parámetro.** De la 1.ª, $\alpha=x$. Sustituyendo en la 2.ª: $y=-x$, o sea $x+y=0$. La 3.ª no contiene $\alpha$: $z=0$ se queda tal cual.
   $$U:\ \begin{cases}x+y=0\\ z=0\end{cases}$$
5. **Justificación equivalente por rango** (la que sirve siempre): $(x,y,z)\in\langle u\rangle\iff$ el sistema $\alpha u=(x,y,z)$ es compatible $\iff\operatorname{rang}\begin{pmatrix}1&x\\-1&y\\0&z\end{pmatrix}=1$ (Rouché, U p. 30). Como hay un menor de orden 1 no nulo (el $1$), el rango es 1 si y solo si se anulan los menores de orden 2 que lo orlan:
   $$\begin{vmatrix}1&x\\-1&y\end{vmatrix}=y+x=0,\qquad\begin{vmatrix}1&x\\0&z\end{vmatrix}=z=0.$$
   Mismas ecuaciones.
6. **Comprobación.** $u=(1,-1,0)$ cumple $1+(-1)=0$ y $0=0$ ✓. Recíprocamente, si $x+y=0$ y $z=0$, entonces $(x,y,z)=(x,-x,0)=x(1,-1,0)\in U$ ✓. Las dos ecuaciones son independientes (rango de $\begin{pmatrix}1&1&0\\0&0&1\end{pmatrix}$ es 2), como se predijo en el paso 3.

**Variante con un plano** (para practicar la eliminación de dos parámetros, propio):
$U:\ x=\alpha+\beta,\ y=\alpha-\beta,\ z=2\alpha$, es decir $U=\langle(1,1,2),(1,-1,0)\rangle$. Los dos generadores son libres (no proporcionales), así que saldrá $3-2=1$ ecuación. Por rango: $(x,y,z)\in U\iff\det\begin{pmatrix}1&1&x\\1&-1&y\\2&0&z\end{pmatrix}=0$. Desarrollando: $2x+2y-2z=0$, es decir $\boxed{x+y-z=0}$. Por eliminación directa: sumando 1.ª y 2.ª, $x+y=2\alpha=z$. Comprobación: $(1,1,2)$: $1+1-2=0$ ✓; $(1,-1,0)$: $0$ ✓. (sympy: $\det=2x_1+2x_2-2x_3$.)

**Receta:** paramétricas → cartesianas: (1) cuenta el rango $r$ de los generadores; saldrán $n-r$ ecuaciones; (2) elimina los parámetros despejando y sustituyendo, **o** impón $\operatorname{rang}(\text{generadores}\mid(x,y,z)^t)=r$ anulando los menores que orlan un menor no nulo de orden $r$; (3) comprueba que los generadores cumplen las ecuaciones.

**Error típico:** (a) dar menos ecuaciones de las necesarias (p. ej. solo $x+y=0$, que es un **plano**, no la recta); (b) dar ecuaciones con término independiente ($x+y=1$): un subespacio pasa por el origen, sus ecuaciones cartesianas son **homogéneas**; (c) escribir paramétricas con generadores ligados y luego contar mal las ecuaciones (con $\langle(1,-1,0),(2,-2,0)\rangle$ siguen saliendo 2 ecuaciones, no 1).

---

### N2. Sept. 2022, ejercicio 2 — ecuaciones de un subespacio de dimensión 1 de $\mathbb R^2$

**Enunciado (literal):** «Escribir las ecuaciones cartesianas o paramétricas de un subespacio vectorial de dimensión 1 del espacio $\mathbb R^2$.»

*(Frontera con 2.3 por la palabra «dimensión»; pero lo que se evalúa es saber escribir las ecuaciones de un subespacio, U §2.2 pp. 69-71. «Dimensión 1» = generado por **un** vector no nulo; basta lo visto en 2.2: un sistema con un único vector no nulo es libre.)*

**Solución oficial (resumen):** cartesianas: una ecuación; paramétricas: un parámetro. Ejemplos: $x_1-x_2=0$; $2x_1=0$; $x_1=\lambda,\ x_2=0$; $x_1=\lambda,\ x_2=-2\lambda$.

**Solución paso a paso.**

1. **Qué objeto es.** Un subespacio de $\mathbb R^2$ generado por un único vector $u\neq\bar 0$: $U=\langle u\rangle=\{\lambda u:\lambda\in\mathbb R\}$ (Def. 2.4). Geométricamente, una **recta que pasa por el origen**. Hace falta $u\neq\bar 0$: $\langle\bar 0\rangle=\{\bar 0\}$ no es una recta. Y un solo vector no nulo es libre (Def. 2.5: $\lambda u=\bar 0$ con $u\ne\bar 0$ obliga a $\lambda=0$).
2. **Paramétricas.** Elegimos $u=(1,-2)$: $(x_1,x_2)=\lambda(1,-2)$, es decir
   $$U:\ \begin{cases}x_1=\lambda\\ x_2=-2\lambda\end{cases}\qquad\lambda\in\mathbb R.$$
3. **Cartesianas.** Un generador libre en $\mathbb R^2$: habrá $2-1=1$ ecuación. Por rango, $(x_1,x_2)\in U\iff\begin{vmatrix}1&x_1\\-2&x_2\end{vmatrix}=x_2+2x_1=0$. Es decir, $U:\ 2x_1+x_2=0$ (también se obtiene eliminando: $\lambda=x_1\Rightarrow x_2=-2x_1$).
4. **Comprobación.** $(1,-2)$: $2-2=0$ ✓; y si $2x_1+x_2=0$, $(x_1,x_2)=x_1(1,-2)\in U$ ✓.

**Resultado:** p. ej. $U=\{(x_1,x_2):2x_1+x_2=0\}=\langle(1,-2)\rangle$. Cualquier respuesta del tipo $ax_1+bx_2=0$ con $(a,b)\neq(0,0)$ es válida.

**Receta:** recta de $\mathbb R^2$ por el origen = $\langle(p,q)\rangle$ con $(p,q)\neq(0,0)$; paramétricas $x_1=p\lambda,\ x_2=q\lambda$; cartesiana $qx_1-px_2=0$ (el determinante $\begin{vmatrix}p&x_1\\q&x_2\end{vmatrix}=0$).

**Error típico:** escribir una recta que **no** pasa por el origen ($x_1+x_2=1$, o $x_1=1+\lambda,\ x_2=\lambda$): no contiene a $\bar 0$, luego no es subespacio (U §2.1). Otro: «$0x_1+0x_2=0$» (eso es todo $\mathbb R^2$, dimensión 2).

---

### N3. Feb. 2023 (2.ª sem.), problema 7, apartados (i)-(iii) [el (iv) va a dudosos]

**Enunciado (literal):** «(2 PUNTOS) Consideremos el espacio vectorial $V=\mathbb R^3$ con el producto escalar usual, la base $B$ de $V$ formada por los vectores $v_1=(1,0,0)$, $v_2=(0,1,0)$, $v_3=(0,0,1)$, el subconjunto $E\subset V$, $E=\{(1,3,1),(3,8,2),(2,9,5)\}$ y el subespacio $U$ generado por $E$ en $V$.
(i) Estudie si $E$ es linealmente independiente. (0.3 PUNTOS)
(ii) Exprese $U$ mediante ecuaciones paramétricas respecto de la base $B$. (0.5 PUNTOS)
(iii) Exprese $U$ mediante ecuaciones implícitas respecto de la base $B$. (0.5 PUNTOS)
(iv) Determine la dimensión de $U$ y extraiga una base ortonormal de $U$ entre los elementos de $E$. (0.7 PUNTOS)»

**Solución oficial (resumen):** escalona $A=\begin{pmatrix}1&3&2\\3&8&9\\1&2&5\end{pmatrix}$ (vectores en columnas) a $\begin{pmatrix}1&3&2\\0&-1&3\\0&0&0\end{pmatrix}$: rango 2, no independiente; paramétricas $x_1=\alpha+3\beta,\ x_2=3\alpha+8\beta,\ x_3=\alpha+2\beta$; implícita $-2x_1+x_2-x_3=0$.

Notación: $w_1=(1,3,1)$, $w_2=(3,8,2)$, $w_3=(2,9,5)$. Como $B$ es la base canónica, las coordenadas respecto de $B$ son las propias componentes.

**(i) ¿Es $E$ libre?**

1. **Criterio.** Por Def. 2.7 (U p. 78), un sistema de $p$ vectores es libre $\iff$ su rango es $p$. Aquí $p=3$: hay que ver si $\operatorname{rang}E=3$.
2. **Escalonar** con los vectores **por filas** (las operaciones elementales de fila no cambian el rango, U p. 22):
   $$\begin{pmatrix}1&3&1\\3&8&2\\2&9&5\end{pmatrix}\xrightarrow[F_3\to F_3-2F_1]{F_2\to F_2-3F_1}\begin{pmatrix}1&3&1\\0&-1&-1\\0&3&3\end{pmatrix}\xrightarrow{F_3\to F_3+3F_2}\begin{pmatrix}1&3&1\\0&-1&-1\\0&0&0\end{pmatrix}.$$
   ($F_2-3F_1$ anula el 3 bajo el pivote 1; $F_3-2F_1$ anula el 2; $F_3+3F_2$ anula el 3 bajo el pivote $-1$.) Dos filas no nulas: **rango 2 < 3**.
   (Equivalente: $\det\begin{pmatrix}1&3&2\\3&8&9\\1&2&5\end{pmatrix}=0$ y hay un menor de orden 2 no nulo, $\begin{vmatrix}1&3\\3&8\end{vmatrix}=-1$.)
3. **Conclusión:** $E$ es **ligado** (no linealmente independiente).
4. **La dependencia explícita** (conviene darla: es la prueba más convincente). Se busca $w_3=\lambda w_1+\mu w_2$: de las dos primeras componentes, $\lambda+3\mu=2$, $3\lambda+8\mu=9$; restando 3 veces la 1.ª de la 2.ª, $-\mu=3$, $\mu=-3$, $\lambda=11$. 3.ª componente: $11\cdot1-3\cdot2=5$ ✓. Así
   $$w_3=11w_1-3w_2,\qquad 11w_1-3w_2-w_3=\bar 0,$$
   combinación nula con coeficientes no todos nulos: ligado por la Def. 2.5.

**(ii) Ecuaciones paramétricas.**

5. **Suprimir el vector que sobra.** Por el Teorema 2.1 de supresión (U p. 79), como $w_3$ es c.l. de $w_1,w_2$, $U=\langle w_1,w_2,w_3\rangle=\langle w_1,w_2\rangle$. Y $\{w_1,w_2\}$ es libre (no son proporcionales: $3/1\neq8/3$).
6. **Escribir** $(x_1,x_2,x_3)=\alpha(1,3,1)+\beta(3,8,2)$:
   $$U:\ \begin{cases}x_1=\alpha+3\beta\\ x_2=3\alpha+8\beta\\ x_3=\alpha+2\beta\end{cases}\qquad\alpha,\beta\in\mathbb R.$$
   *(Con los tres vectores y tres parámetros también serían unas paramétricas de $U$, pero redundantes: un parámetro sobra. Lo correcto y esperado es usar un sistema generador libre.)*

**(iii) Ecuaciones implícitas (cartesianas).**

7. **Cuántas.** $n-r=3-2=1$ ecuación.
8. **Imponer pertenencia.** $(x_1,x_2,x_3)\in U\iff$ es c.l. de $w_1,w_2$ $\iff$ (como $\{w_1,w_2\}$ es libre) $\{w_1,w_2,(x_1,x_2,x_3)\}$ es ligado $\iff$
   $$\begin{vmatrix}x_1&1&3\\x_2&3&8\\x_3&1&2\end{vmatrix}=0.$$
   Desarrollando por la 1.ª columna: $x_1(3\cdot2-8\cdot1)-x_2(1\cdot2-3\cdot1)+x_3(1\cdot8-3\cdot3)=-2x_1+x_2-x_3$.
   $$U:\ -2x_1+x_2-x_3=0\quad(\text{o } 2x_1-x_2+x_3=0).$$
9. **Comprobación** con los tres vectores de $E$: $w_1$: $-2+3-1=0$ ✓; $w_2$: $-6+8-2=0$ ✓; $w_3$: $-4+9-5=0$ ✓.

**Resultado:** (i) ligado, $w_3=11w_1-3w_2$; (ii) $x_1=\alpha+3\beta,\ x_2=3\alpha+8\beta,\ x_3=\alpha+2\beta$; (iii) $2x_1-x_2+x_3=0$ ($U$ es un plano).

**Receta:** sistema → rango (escalonar) → suprimir los vectores dependientes (Teor. 2.1) → paramétricas con los que quedan → implícitas imponiendo $\det(\text{generadores libres}\mid x)=0$ (o anulando los menores orlados si hay más de una ecuación) → comprobar con **todos** los vectores originales.

**Error típico:** (a) declarar «libre» porque ningún vector es múltiplo de otro: con 3 o más vectores eso **no basta** ($w_3$ no es múltiplo de $w_1$ ni de $w_2$, pero es combinación de los dos); (b) en (iii) usar los tres vectores ligados en el determinante: $\det(w_1,w_2,x)$ sí vale, pero $\det(w_1,w_2,w_3)=0$ no da ninguna ecuación; (c) olvidar comprobar $w_3$ en la ecuación.

*(sympy: rango 2; rref de la matriz con columnas $w_i$ da la relación $w_3=11w_1-3w_2$; $\det=-2x_1+x_2-x_3$.)*

---

## C. DUDOSOS (fronterizos) — tema propuesto

| # | Fuente | Contenido | Tema propuesto | Nota / verificación |
|---|---|---|---|---|
| D1 | Feb. 2023 (2.ª sem.), problema 7 (iv) | Dimensión de $U$ y base ortonormal «entre los elementos de $E$» | **2.3** (dimensión) + **5.1** (ortonormal) | $\dim U=2$. **Enunciado imposible tal cual:** ningún par de $E$ es ortogonal ($w_1\cdot w_2=29$, $w_1\cdot w_3=34$, $w_2\cdot w_3=88$), así que no se puede *extraer* una base ortonormal de entre los elementos de $E$. La solución oficial construye $u=(-4,-1,7)\notin E$ (ortogonal a $w_1$ y en $U$, comprobado) y da $\{u/\sqrt{66},\ w_1/\sqrt{11}\}$. Señalarlo si se usa. |
| D2 | Feb. 2018 (tipo B), ejercicio 1 — parte $S_1$ | $S_1$ (filas $(4,1,-3,-4),(2,4,-4,3),(2,3,1,3),(4,0,-1,2)$) es base de $\mathbb R^4$ | **2.3** | sympy: $\det=420\ne0$. La parte $S_2$ ligado ya está en el tema (variante). |
| D3 | Feb. 2020 (1.ª sem., tipo B), ejercicio 2 | Extraer de $\{(1,2,-1),(3,1,0),(2,-1,1),(2,1,0)\}$ una base de $\mathbb R^3$ | **2.3** (usa Teor. 2.1 de 2.2) | Rango 3. Ojo: los tres primeros son **ligados** ($\det=0$); la oficial elige $\{(3,1,0),(2,-1,1),(2,1,0)\}$, $\det=-1$ ✓. Ya listado en «Para practicar» del 2.2. |
| D4 | Sept. 2018, ejercicio 2 | ¿Es $\{x,\ x^3,\ x^2-2x,\ 3x^3+2\}$ base de $\wp_3(x)$? | **2.3** | Sí: coordenadas en $\{1,x,x^2,x^3\}$, $\det=2\neq0$ (sympy). La oficial solo dice que «los cuatro vectores de la canónica están (mediante combinaciones lineales)» en el sistema; es el argumento de generador + 4 vectores en dimensión 4. |
| D5 | Feb. 2026 (1.ª sem.), pregunta 3 | ¿Es $S=\{\begin{pmatrix}1&1\\0&0\end{pmatrix},\begin{pmatrix}0&1\\0&1\end{pmatrix},\begin{pmatrix}0&0\\1&1\end{pmatrix},\begin{pmatrix}1&0\\1&0\end{pmatrix}\}$ base de $\mathcal M_{2\times2}$? | **2.3** (el núcleo es dependencia lineal, 2.2) | No: $\det=0$ (sympy) y $S_1=S_2-S_3+S_4$ (comprobado). Buen ejemplo de «ligado en un espacio de matrices». |
| D6 | Sept. 2025, problema 7 (ii)-(iii) | ¿$\{A,B,X,Y\}$ base de $\mathcal M_{2\times2}$? Dimensión de $\langle A,B,Y\rangle$ | **2.3** (dimensión = rango del sistema, Def. 2.7 de 2.2) | sympy: $\operatorname{rang}\{A,B,X,Y\}=2$, $\operatorname{rang}\{A,B,Y\}=2$, $X+Y=\begin{pmatrix}11/5&1/5\\2/5&8/5\end{pmatrix}$. El apartado (i) ($X+Y$) es de 1.2. |
| D7 | Feb. 2024 (1.ª sem.), pregunta 3 | $f(1,0)=(0,5,1)$, $f(0,1)=(-2,0,1)$: ¿la imagen de todo vector está en el plano $5x-2y+10z=0$? | **3.1/3.2** (aplicaciones lineales) | Verdadero. **Ojo con el «fallo recurrente» oficial:** dice que no basta comprobar que $(0,5,1)$ y $(-2,0,1)$ están en el plano y que hay que justificar que «cualquier vector del plano es c.l.» de ellos. Para lo que se pide ($\operatorname{Im}f\subset$ plano) basta: los dos generadores están en el plano (comprobado: $0-10+10=0$, $-10+0+10=0$), el plano es subespacio, y $f(u,v)=uf(1,0)+vf(0,1)$ es c.l. de ellos; lo que la oficial exige es la inclusión contraria (plano $\subset\operatorname{Im}f$, que también es cierta pero no se pregunta). Sí es útil como ejemplo de paramétricas → cartesiana. |
| D8 | Feb. 2019 (tipo A), problema a | Ecuaciones cartesianas de núcleo e imagen de la matriz $\begin{pmatrix}1&2&1\\4&3&0\\5&5&1\end{pmatrix}$ | **3.2** | La imagen se obtiene con la técnica de 2.2: $\det\begin{pmatrix}x&y&z\\2&3&5\\1&0&1\end{pmatrix}=0\iff x+y-z=0$. Rango 2. |
| D9 | Feb. 2019 (tipo B), problema c | Si $\operatorname{Nuc}f=\{\bar0\}$ y $\{\bar v_1,\bar v_2\}$ libre, $\{f(\bar v_1),f(\bar v_2)\}$ es libre | **3.2** | Usa la caracterización de ligado de 2.2 (dos vectores: uno múltiplo del otro). La prueba oficial supone $f(\bar v_1)=\alpha f(\bar v_2)$, lo que olvida el caso $f(\bar v_2)=\bar0$ (que también se descarta por la inyectividad); mejor partir de $\lambda f(\bar v_1)+\mu f(\bar v_2)=\bar0$. |
| D10 | Feb. 2026 (2.ª sem.), pregunta 3 | $f:\mathcal M_{2\times2}\to\mathbb R^3$ dada en 4 matrices; hallar $f$ de otra (que es su suma) | **3.1** | Exige expresar una matriz como c.l. de otras (2.2), pero el contenido principal es la linealidad. |
| D11 | Feb. 2017 (2.ª sem., tipo A), problema a; Sept. 2022, problema a | Rango por Gauss de una matriz $4\times5$ / $3\times5$ | **1.2** (rango de una matriz) | Ambos rango 2. Solo serían de 2.2 si se pidiera el rango de un *sistema de vectores*. |

## D. Descartados (claramente de otro tema; no son de 2.2)

- §2.4 (suma/intersección): Feb. 2019 (tipo B), ej. 2; Sept. 2019, ej. 2; Ene. 2020 (tipo A), problema a; Ene. 2022 (tipo A), ej. 2; Sept. 2022, problema b; Feb. 2024 (1.ª sem.), problema 7; Sept. 2024, problema 7. Todos usan paramétricas/cartesianas de subespacios generados como herramienta (útil citarlo en 2.2 como «se usa en…»), pero lo que se pide es suma/intersección.
- §2.1 (¿es subespacio?): Feb. 2023 (1.ª sem.), p. 2; Feb. 2023 (2.ª sem.), p. 2; Feb. 2024 (2.ª sem.), p. 4; Feb. 2026 (2.ª sem.), p. 2; Sept. 2017, ej. 2 y problema a; Feb. 2019 (tipo A), ej. 2; Ene. 2020 (tipo A), ej. 2.
- §2.3 (coordenadas): Feb. 2024 (1.ª sem.), problema 8; Sept. 2024, p. 2.
- Feb. 2017 (2.ª sem., tipo A), ej. 3; Feb. 2025 (1.ª sem.), p. 2: cambio de base (3.5).

## E. Comprobaciones sympy (resumen de salida)

```
feb18  det(u,v,e3) = -5          feb25  det = -24*(t-2)        sep23  D = 3k+24
feb17  rango (a=-2,b=1) = 2      S2 rango 3; S1 det 420
N1     det((1,1,2),(1,-1,0),x) = 2x1+2x2-2x3
N3     rango E = 2; rref -> w3 = 11 w1 - 3 w2; det(x,w1,w2) = -2x1+x2-x3
       productos escalares en E: 29, 34, 88; u=(-4,-1,7): u·w1=0, en U
D7     (0,5,1),(-2,0,1) cumplen 5x-2y+10z=0
D6     X+Y = [[11/5,1/5],[2/5,8/5]]; rang{A,B,Y}=2; rang{A,B,X,Y}=2
D5     det = 0      D3 rango 3, det elegido = -1, det tres primeros = 0      D4 det = 2
```
