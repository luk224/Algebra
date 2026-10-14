# Dossier de exámenes (fuente X) — Tema 3.3: ecuaciones y matriz asociada de una aplicación lineal

**Alcance de U §3.3 (impresa p.113-117)**: introducción y objetivos (p.113: «si la aplicación es lineal … es suficiente dar las imágenes de los vectores de una base»); **Teorema 3.2** (p.114): la imagen de cualquier vector está determinada por las imágenes $f(e_1),\dots,f(e_m)$ de una base, porque $f(v_1e_1+\dots+v_me_m)=v_1f(e_1)+\dots+v_mf(e_m)$; **Ej. 3.16** (p.114-115: $f(1,0)=(1,2,1)$, $f(0,1)=(1,1,0)$ ⇒ ecuaciones $y_1=x_1+x_2,\ y_2=2x_1+x_2,\ y_3=x_1$); **Ej. 3.17** (p.115: no existe $f$ lineal con $f(2,3)=(0,1)$ y $f(-2,-3)=(1,0)$, por la propiedad 2); **Teorema 3.3** (p.115: fijadas bases $B$ de $V$ y $S$ de $W$, $f$ determina una matriz única); **Def. 3.4** matriz asociada (p.116): la columna $j$ de $A$ son las coordenadas de $f(e_j)$ en la base $S$; $A$ es $n\times m$ con $m=\operatorname{Dim}V$ (columnas) y $n=\operatorname{Dim}W$ (filas); **Ej. 3.18** (p.116: matriz $\begin{pmatrix}1&1\\2&1\\1&0\end{pmatrix}$ del Ej. 3.16); **expresión matricial** $Y=AX$ (p.117); **Ej. 3.19** (p.117: ecuaciones matricial y cartesianas).

Herramientas previas que se citan: propiedades 1-3 de las aplicaciones lineales (U §3.1 p.103); Def. 2.10 coordenadas (U §2.3 p.85; Ej. 2.28 coordenadas de un polinomio, p.86); Teor. 2.5 rango = dimensión del subespacio generado (U p.88); Ej. 3.9 «la imagen está generada por las imágenes de la base» (U §3.2 p.107). Para frontera: matrices de cambio de base regulares (U §3.5 p.135) y Def. 3.15 $A'=P^{-1}AQ$ (U §3.5 p.136). Autoevaluación del cap. 3 (U p.137-138), ítems 3, 4, 5, 6, 7, 8 y 10 (son exactamente las afirmaciones del test de Sept. 2017).

**Exámenes leídos (24/24)**: Feb. 2026 (1.ª y 2.ª sem.), Feb. 2017 (2.ª sem., tipo A), Feb. 2018 (A y B), Feb. 2019 (A y B), Ene. 2020 (tipo A; fichero `Febrero20A`), Feb. 2020 (1.ª sem., tipo B), Ene. 2022 (tipo A; fichero `Febrero22A1-v2`), Feb. 2022 (tipo A; fichero `Febrero22A2`), Feb. 2023 (1.ª y 2.ª sem.), Feb. 2024 (1.ª y 2.ª sem.), Feb. 2025 (1.ª y 2.ª sem.), Sept. 2017 (A), 2018 (A), 2019 (A), 2022, 2023, 2024, 2025. Búsqueda por «aplicaci», «asociada», «endomorf», «f (», «g (», «h (» y lectura completa de los que aparecían. El enunciado de Feb. 2026 (1.ª sem.) p.2 se ha confirmado en el PDF (las bases son $B$ y $B'$; la prima se pierde en el `.txt`).

## Resumen

| # | Fuente | Contenido | Método |
|---|---|---|---|
| 1 | Feb. 2026 (2.ª sem.), problema 7 — 1.er apartado | Matriz de $f:\mathbb R^4\to\mathbb R^3$ dada por fórmulas | A |
| 2 | Feb. 2023 (1.ª sem.), problema 7 (ii) | Expresión matricial ($2\times5$) de la derivada tercera $\wp_4\to\wp_1$ | A |
| 3 | Feb. 2018 (tipo B), ejercicio 3 | Matriz en canónicas sabiendo $f(1,2)$ y $f(2,0)$ | B |
| 4 | Ene. 2022 (tipo A), ejercicio 3 | Matriz canónica de un endomorfismo de $\mathbb R^3$ dadas las imágenes de una base no canónica | B |
| 5 | Feb. 2019 (tipo A), ejercicio 3 | Matriz en las bases $\{(1,0,1),(1,0,0),(1,1,0)\}$ y $\{(0,1),(1,0)\}$ | C |
| 6 | Feb. 2026 (2.ª sem.), problema 8 — 1.er apartado | Matriz de un endomorfismo de $\mathbb R^2$ en la base $B=\{(1,-1),(1,1)\}$ | C (alternativa 3.5) |
| 7 | Feb. 2026 (1.ª sem.), pregunta 2 | Rango de la matriz asociada dada por $f(u_i)$ en bases abstractas | D |
| 8 | Sept. 2017 (tipo A), ejercicio 3 (test) | «La matriz asociada depende de las bases» / cambio de base singular / todas son endomorfismos | D |

Métodos: **A** = de la fórmula (o de la regla) a la matriz: columnas = coordenadas de las imágenes de la base de partida; **B** = conocidas las imágenes de una base no canónica, obtener las imágenes de la canónica (Teor. 3.2) y con ellas la matriz; **C** = matriz respecto de bases no canónicas (Def. 3.4 «a pelo»: imagen de cada vector de la base inicial y sus coordenadas en la base final); **D** = leer información de la matriz (rango = $\operatorname{Dim}\operatorname{Im}$) y preguntas de teoría.

**Ya desarrollados en otros temas (no duplicar; enlazar):**

| Fuente | Qué se pide | Dónde |
|---|---|---|
| Feb. 2026 (2.ª sem.), problema 7 — 2.º apartado | Escalonada reducida de $A$ | **1.2** (dossier 1.2, X16) |
| Feb. 2026 (2.ª sem.), problema 7 — 3.er apartado | Base de $\operatorname{Nuc}f$ desde la escalonada | **3.2** (ej. 3) |
| Feb. 2023 (1.ª sem.), problema 7 (i) | Núcleo e imagen de la derivada tercera | **3.2** (ej. 13) |
| Feb. 2019 (tipo A), problema a) | Cartesianas y dimensiones de núcleo e imagen **dada la matriz** | **3.2** (ej. 10) |
| Sept. 2025, pregunta 3 | $(10,a,b)\in\operatorname{Nuc}f$ dada la matriz | **3.2** (ej. 4) |
| Sept. 2017 (tipo A), problema b) | Matriz $3\times2$ leída de las ecuaciones; núcleo; dim. imagen | **3.2** (ej. 5) |
| Sept. 2018 (tipo A), problema b) | Matriz de $f:\mathbb R^3\to\mathcal M_{2\times2}$ en canónicas; núcleo | **3.2** (ej. 15) |
| Feb. 2020 (1.ª sem., tipo B), ejercicio 3 | Rango de $A_{3\times5}$ con $\operatorname{Dim}\operatorname{Nuc}=3$ | **3.2** (ej. 16) |
| Feb. 2024 (1.ª sem.), pregunta 3 | $f(1,0)$, $f(0,1)$ dadas; ¿imagen en un plano? | **3.1** (ej. 7) y **3.2** (ej. 11) |
| Feb. 2019 (B) ej. 3; Feb. 2024 (2.ª) p.3; Feb. 2025 (2.ª) p.3; Feb. 2026 (2.ª) p.3 | $f$ de un vector a partir de imágenes de otros (Teor. 3.2 en acción, sin pedir matriz) | **3.1** (ej. 1-4) |

**Errores u omisiones en las soluciones oficiales** (detalle en cada ejercicio):
- Feb. 2018 (B) ej. 3: errata «se trata de hallar $f(0,1)$ y $f(0,1)$» (el primero es $f(1,0)$); y escribe «$f(2,0))$».
- Ene. 2022 (A) ej. 3: la cabecera de las soluciones dice «ENERO 2021» (el examen es de 2022). El cálculo es correcto, pero no muestra la resolución del sistema vectorial.
- Feb. 2026 (1.ª sem.) p.2: dice que las columnas son «las coordenadas de la base $B$ respecto de la base $B'$»; deben ser las coordenadas de las **imágenes** $f(u_1),f(u_2),f(u_3)$ respecto de $B'$. Además, «como la 1.ª y la 2.ª columna son dependientes, el rango es 1» es incompleto: hay que añadir que la 3.ª columna es nula y la 1.ª no lo es.
- Feb. 2023 (1.ª sem.) p.7 (ii): la expresión oficial iguala «$f(p)$» a un producto matriz-columna; lo correcto es igualar la **columna de coordenadas** de $f(p)$ en la base $(1,x)$. Además escribe «$a_0+a_1x+\dots+a_4x^4=6a_3+24a_4x$» olvidando el $f(\cdot)$.
- Feb. 2026 (2.ª sem.) p.8: en la vía alternativa usa la letra $B$ a la vez para la base y para la matriz de paso (confuso, no erróneo). Resultado correcto.
- Feb. 2026 (2.ª sem.) p.7 (1.er apartado) y Sept. 2017 ej. 3: correctos, pero sin justificación («véase la teoría»).

---

## Fronterizos (no se desarrollan aquí)

| Fuente | Contenido | Tema real |
|---|---|---|
| Ene. 2020 (tipo A), ejercicio 3 | Matriz de $f\circ g$ ($f:\mathbb R\to\mathbb R^3$, $g:\mathbb R^2\to\mathbb R$) | **3.4** |
| Sept. 2018 (tipo A), ejercicio 3 | Expresión de $f\circ g$ | **3.4** |
| Feb. 2023 (1.ª sem.), pregunta 3 | Matriz de $f\circ g$ | **3.4** |
| Sept. 2024, pregunta 3 | Representación matricial de $g\circ f$ y $(g\circ f)(3,2)$ | **3.4** |
| Sept. 2023, pregunta 3 | Matriz de $3g-5h$ | **3.4** |
| Feb. 2025 (1.ª sem.), problema 7 — 3.er apartado | Matriz de $h\circ g$ | **3.4** |
| Feb. 2024 (2.ª sem.), problema 7; Feb. 2026 (1.ª sem.), problema 7 | Matriz de $f\circ f$ / $g\circ f$ y su núcleo | **3.4** (el núcleo, en 3.2 ej. 18-19) |
| Feb. 2017 (2.ª sem., tipo A), ejercicio 3 | Determinante de la matriz de cambio de base $U'\to U$ (opción A: vale 1) | **3.5** |
| Feb. 2026 (2.ª sem.), problema 8 — vía alternativa del 1.er apartado ($A_B=P^{-1}AP$) y 2.º apartado (diagonalización) | Cambio de base y diagonalización | **3.5** (Def. 3.15, U p.136) y **4.3**. El 1.er apartado por la Def. 3.4 se desarrolla aquí (n.º 6); en 3.5 conviene enlazarlo y rehacerlo con $P^{-1}AP$. |
| Feb. 2018 (tipo A), ejercicio 4 | Relación entre las matrices asociadas a un endomorfismo diagonalizable (semejanza) | **4.1 / 4.3** |
| Sept. 2017 (tipo A), ejercicio 4 | ¿Ortogonal? ¿Representación diagonal? «Cualquier matriz asociada tiene rango 3» | **4.3** (la C es falsa porque $f:\mathbb R^2\to\mathbb R^2$ tiene matrices $2\times2$, rango $\le2$) |

---

## Método A — De la fórmula a la matriz: «columnas = imágenes de la base de partida»

**Idea común.** Por la Def. 3.4 (U p.116), la columna $j$ de la matriz asociada son las **coordenadas de $f(e_j)$ en la base del espacio de llegada**. Cuando las dos bases son las canónicas de $\mathbb R^m$ y $\mathbb R^n$, las coordenadas de un vector coinciden con sus componentes (U p.85), y además $f(e_j)$ se obtiene poniendo $x_j=1$ y las demás variables a 0 en la fórmula. Consecuencia práctica: **la fila $i$ de $A$ son los coeficientes de $x_1,\dots,x_m$ en la componente $i$ de $f$**. Tamaño: $n\times m$ = (dim. de llegada) × (dim. de salida). Con polinomios se hace lo mismo trabajando con las coordenadas en la base dada.

### 1. Feb. 2026 (2.ª sem.), problema 7 — 1.er apartado (0.5 puntos)

**Enunciado (literal).** Sea $f(x,y,z,t)=(x+2y-z+3t,\ 2x+4y+6t,\ -x-2y+z-3t)$ una aplicación lineal de $\mathbb R^4$ en $\mathbb R^3$. Halle la matriz $A$ asociada a $f$ (0.5 PUNTOS). *(Siguen: escalonada reducida de $A$, 1 punto → tema 1.2; base de $\operatorname{Nuc}f$, 0.5 puntos → tema 3.2.)*

**Qué se pide.** No se dan bases, así que se entiende «respecto de las bases canónicas» de $\mathbb R^4$ (salida) y $\mathbb R^3$ (llegada). Hay que escribir la matriz $A$ tal que $f(v)=Av$.

**Solución paso a paso.**
1. **Tamaño.** $V=\mathbb R^4$ ($m=4$ columnas, una por vector de la base de salida) y $W=\mathbb R^3$ ($n=3$ filas, una por coordenada de llegada) (Def. 3.4, U p.116): $A$ es $3\times4$.
2. **Imágenes de la base canónica** $e_1=(1,0,0,0),\dots,e_4=(0,0,0,1)$, sustituyendo en la fórmula:
   $$f(e_1)=(1,2,-1),\quad f(e_2)=(2,4,-2),\quad f(e_3)=(-1,0,1),\quad f(e_4)=(3,6,-3).$$
3. **Coordenadas en la base canónica de $\mathbb R^3$** = las propias componentes. Se colocan **en columnas** (Def. 3.4):
   $$A=\begin{pmatrix}1&2&-1&3\\2&4&0&6\\-1&-2&1&-3\end{pmatrix}.$$
4. **Comprobación (expresión matricial $Y=AX$, U p.117).** $A\begin{pmatrix}x\\y\\z\\t\end{pmatrix}=\begin{pmatrix}x+2y-z+3t\\2x+4y+6t\\-x-2y+z-3t\end{pmatrix}$, que es la fórmula de $f$ ✓. Se ve que cada fila de $A$ son los coeficientes de una componente.

*(sympy: `A*Matrix([x,y,z,t])` reproduce $f$; rango 2.)*

**Receta.** Fórmula en canónicas → escribe cada componente de $f$ como una fila de coeficientes, respetando el orden de las variables y poniendo 0 donde falte una variable (aquí la $z$ de la 2.ª componente).
**Error típico.** Poner las imágenes en **filas** (sale la traspuesta, $4\times3$, que no se puede multiplicar por $X\in\mathbb R^4$); olvidar el 0 de la variable ausente.
**Sobre la oficial.** Correcta, sin justificación. En el examen conviene una línea: «la columna $j$ es $f(e_j)$».

### 2. Feb. 2023 (1.ª sem.), problema 7 (ii) (1 punto)

**Enunciado (literal).** Consideremos la aplicación lineal $f:\wp_4\to\wp_1$, definida por $f(p)=p'''$ (derivada tercera) y consideremos en $\wp_n$ la base $(p_0,p_1,p_2,\dots,p_n)$, en donde $p_0(x)=1$, $p_1(x)=x$, $p_2(x)=x^2,\dots,p_n(x)=x^n$. *Nota: … si $p(x)=7+3x^2+2x^3+x^4$, entonces $(f(p))(x)=p'''(x)=12+24x$.* (i) Describa los subespacios núcleo e imagen de la aplicación lineal $f$ (1 PUNTO) *[→ tema 3.2, ej. 13]*. (ii) Dé la expresión matricial de $f$ (1 PUNTO).

**Qué se pide.** La «expresión matricial» es $Y=AX$ (U p.117), donde $X$ es la columna de coordenadas de $p$ en la base $(1,x,x^2,x^3,x^4)$ de $\wp_4$ e $Y$ la de $f(p)$ en la base $(1,x)$ de $\wp_1$. Hay que hallar $A$.

**Solución paso a paso.**
1. **Tamaño.** $\operatorname{Dim}\wp_4=5$ (columnas) y $\operatorname{Dim}\wp_1=2$ (filas): $A$ es $2\times5$ (Def. 3.4).
2. **Imagen de cada vector de la base de salida** (derivar tres veces):
   $$f(1)=0,\quad f(x)=0,\quad f(x^2)=0,\quad f(x^3)=6,\quad f(x^4)=(4\cdot3\cdot2)\,x=24x.$$
3. **Coordenadas en la base $(1,x)$ de $\wp_1$** (Def. 2.10, U p.85: los coeficientes, en el orden de la base): $0=(0,0)$, $6=6\cdot1+0\cdot x=(6,0)$, $24x=(0,24)$.
4. **Matriz (en columnas):**
   $$A=\begin{pmatrix}0&0&0&6&0\\0&0&0&0&24\end{pmatrix}.$$
5. **Expresión matricial.** Si $p=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4$ y $f(p)=b_0+b_1x$:
   $$\begin{pmatrix}b_0\\b_1\end{pmatrix}=\begin{pmatrix}0&0&0&6&0\\0&0&0&0&24\end{pmatrix}\begin{pmatrix}a_0\\a_1\\a_2\\a_3\\a_4\end{pmatrix}\iff\begin{cases}b_0=6a_3\\b_1=24a_4\end{cases}$$
6. **Comprobación con la nota del enunciado.** $p=7+3x^2+2x^3+x^4$ tiene coordenadas $(7,0,3,2,1)$; $A\,(7,0,3,2,1)^t=(12,24)^t$, es decir, $f(p)=12+24x$ ✓. Y derivando a mano: $p'=6x+6x^2+4x^3$, $p''=6+12x+12x^2$, $p'''=12+24x$ ✓.
7. **De paso (enlace con 3.2):** $\operatorname{rang}A=2=\operatorname{Dim}\operatorname{Im}f$, luego $\operatorname{Im}f=\wp_1$; $\operatorname{Dim}\operatorname{Nuc}f=5-2=3$ (los polinomios de grado $\le2$), como en el apartado (i).

*(sympy: `diff(p,X,3)` $=6a_3+24a_4X$; $A(7,0,3,2,1)^t=(12,24)^t$; rango 2, núcleo $\langle e_1,e_2,e_3\rangle$.)*

**Receta.** Espacios de polinomios: aplica $f$ a cada polinomio de la base de salida, escribe el resultado en coordenadas de la base de llegada (sus coeficientes en el orden de la base) y ponlo como columna.
**Error típico.** Matriz $5\times5$ (el «fallo recurrente» oficial): eso sería la derivada tercera como endomorfismo de $\wp_4$, no $\wp_4\to\wp_1$. Otro: usar el orden $x^2,x,1$ (el de U Ej. 2.28) cuando el enunciado fija $1,x,x^2,\dots$: cambia la matriz.
**Sobre la oficial.** Matriz correcta; pero escribe «$f(p)=A\,(a_0,\dots,a_4)^t$» mezclando el polinomio con su columna de coordenadas, y la línea «$a_0+\dots+a_4x^4=6a_3+24a_4x$» le falta el $f(\cdot)$ a la izquierda.

---

## Método B — Conocidas las imágenes de una base no canónica, hallar la matriz en las canónicas

**Idea común.** Por el Teor. 3.2 (U p.114), las imágenes de los vectores de **una** base determinan $f$. Pero la matriz canónica pide las imágenes de **la canónica**. Dos maneras equivalentes:
- (i) Escribir cada vector dado como combinación de $e_1,\dots,e_m$ y aplicar la linealidad (propiedad 3, U p.103): sale un **sistema lineal cuyas incógnitas son los vectores** $f(e_1),\dots,f(e_m)$; se resuelve como un sistema normal (operando con vectores).
- (ii) Escribir cada $e_j$ como combinación de la base dada y aplicar la linealidad (como en el tema 3.1, método A).
Ambas son la misma idea. (Forma compacta, para comprobar: si $P$ tiene por columnas los vectores de la base dada y $F$ sus imágenes, entonces $AP=F$, así que $A=FP^{-1}$; usa la inversa de U §1.2 / §3.5.)

### 3. Feb. 2018 (tipo B), ejercicio 3 (1 punto)

**Enunciado (literal).** Se pide escribir la matriz de la aplicación lineal definida por $f(1,2)=(2,3)$ y $f(2,0)=(4,0)$ respecto de las bases canónicas.

**Qué se pide.** $f:\mathbb R^2\to\mathbb R^2$. Matriz $2\times2$ cuyas columnas son $f(1,0)$ y $f(0,1)$ (Def. 3.4 con bases canónicas). No las da el enunciado: hay que deducirlas.

**Solución paso a paso.**
1. **¿Está bien definida $f$?** $\{(1,2),(2,0)\}$ es base de $\mathbb R^2$: $\det\begin{pmatrix}1&2\\2&0\end{pmatrix}=-4\neq0$. Por el Teor. 3.2 (U p.114), dar sus imágenes determina una única $f$ lineal.
2. **Primera columna, $f(1,0)$.** Como $(2,0)=2(1,0)$, por linealidad (Def. 3.1, U p.101) $f(2,0)=2f(1,0)$, luego
   $$f(1,0)=\tfrac12(4,0)=(2,0).$$
3. **Segunda columna, $f(0,1)$.** Como $(1,2)=(1,0)+2(0,1)$, por la propiedad 3 (U p.103): $f(1,2)=f(1,0)+2f(0,1)$, luego
   $$f(0,1)=\tfrac12\big[f(1,2)-f(1,0)\big]=\tfrac12\big[(2,3)-(2,0)\big]=\tfrac12(0,3)=\left(0,\tfrac32\right).$$
4. **Matriz** (las imágenes en columnas, en canónicas coordenadas = componentes):
   $$A=\begin{pmatrix}2&0\\0&\tfrac32\end{pmatrix}.$$
5. **Comprobación.** $A\binom12=\binom{2}{3}$ ✓ y $A\binom20=\binom40$ ✓.

*(sympy: $A=FP^{-1}=\begin{pmatrix}2&0\\0&3/2\end{pmatrix}$, con $P=\begin{pmatrix}1&2\\2&0\end{pmatrix}$, $F=\begin{pmatrix}2&4\\3&0\end{pmatrix}$.)*

**Receta.** Busca relaciones sencillas entre los vectores dados y los canónicos (aquí $(2,0)=2e_1$); despeja $f(e_1)$, $f(e_2)$ por linealidad y colócalos en columnas. Comprueba multiplicando $A$ por los vectores originales.
**Error típico.** Poner como columnas $f(1,2)$ y $f(2,0)$: esa sería la matriz respecto de la base $\{(1,2),(2,0)\}$ en la salida y la canónica en la llegada, no la canónica.
**Sobre la oficial.** Correcta, con la errata «se trata de hallar $f(0,1)$ y $f(0,1)$» (el primero es $f(1,0)$).

### 4. Ene. 2022 (tipo A), ejercicio 3 (1 punto)

**Enunciado (literal).** Si $B=\{(1,1,0),(2,3,1),(0,-2,1)\}$ es una base de $\mathbb R^3$, y $f$ es un endomorfismo de $\mathbb R^3$, tal que en la base canónica, se verifica que:
$$f(1,1,0)=(3,2,0)\qquad f(2,3,1)=(1,-2,1)\qquad f(0,-2,1)=(4,0,1)$$
se pide, encontrar su matriz asociada (referida a la base canónica de $\mathbb R^3$).

**Qué se pide.** Endomorfismo = aplicación lineal de $\mathbb R^3$ en sí mismo (U la usa así desde §4.1, p.147; aparece en la autoevaluación del cap. 3, p.138). Matriz $3\times3$ en la canónica: columnas $f(e_1),f(e_2),f(e_3)$.

**Solución paso a paso.**
1. **Comprobar que $B$ es base** (el enunciado lo afirma; conviene verlo): $\det\begin{pmatrix}1&2&0\\1&3&-2\\0&1&1\end{pmatrix}=3\neq0$. Por el Teor. 3.2, las tres imágenes determinan $f$.
2. **Plantear el sistema con incógnitas vectoriales** $u=f(e_1)$, $v=f(e_2)$, $w=f(e_3)$. Como $(1,1,0)=e_1+e_2$, $(2,3,1)=2e_1+3e_2+e_3$, $(0,-2,1)=-2e_2+e_3$, la propiedad 3 (U p.103) da:
   $$\begin{cases}u+v=(3,2,0)\\2u+3v+w=(1,-2,1)\\-2v+w=(4,0,1)\end{cases}$$
3. **Resolver por sustitución** (se opera con vectores igual que con números, porque $\mathbb R^3$ es espacio vectorial):
   - De la 3.ª: $w=(4,0,1)+2v$.
   - De la 1.ª: $u=(3,2,0)-v$.
   - En la 2.ª: $2(3,2,0)-2v+3v+(4,0,1)+2v=(1,-2,1)\Rightarrow 3v=(1,-2,1)-(6,4,0)-(4,0,1)=(-9,-6,0)$, así que $v=(-3,-2,0)$.
   - Entonces $u=(3,2,0)-(-3,-2,0)=(6,4,0)$ y $w=(4,0,1)+(-6,-4,0)=(-2,-4,1)$.
4. **Matriz** (columnas $u,v,w$):
   $$A=\begin{pmatrix}6&-3&-2\\4&-2&-4\\0&0&1\end{pmatrix}.$$
5. **Comprobación** (lo más rápido y seguro): $A\begin{pmatrix}1\\1\\0\end{pmatrix}=\begin{pmatrix}3\\2\\0\end{pmatrix}$ ✓, $A\begin{pmatrix}2\\3\\1\end{pmatrix}=\begin{pmatrix}12-9-2\\8-6-4\\1\end{pmatrix}=\begin{pmatrix}1\\-2\\1\end{pmatrix}$ ✓, $A\begin{pmatrix}0\\-2\\1\end{pmatrix}=\begin{pmatrix}6-2\\4-4\\1\end{pmatrix}=\begin{pmatrix}4\\0\\1\end{pmatrix}$ ✓.
6. **Vía alternativa compacta** (si se domina la inversa): con $P=\begin{pmatrix}1&2&0\\1&3&-2\\0&1&1\end{pmatrix}$ (columnas = vectores de $B$) y $F=\begin{pmatrix}3&1&4\\2&-2&0\\0&1&1\end{pmatrix}$ (columnas = imágenes), $AP=F\Rightarrow A=FP^{-1}$, con $P^{-1}=\tfrac13\begin{pmatrix}5&-2&-4\\-1&1&2\\1&-1&1\end{pmatrix}$. Es la fórmula de cambio de base de §3.5 (Def. 3.15, U p.136) disfrazada; en un examen sin calculadora el sistema del paso 3 suele ser más corto.

*(sympy: $\det P=3$, $A=FP^{-1}$ coincide, $AP=F$ ✓.)*

**Receta.** «Imágenes de una base cualquiera → matriz canónica»: escribe cada vector dado como combinación de los canónicos (se lee de sus componentes), aplica linealidad y resuelve el sistema cuyas incógnitas son $f(e_1),\dots,f(e_m)$. Comprueba siempre $A\cdot(\text{vector dado})=\text{imagen dada}$.
**Error típico.** Poner directamente $(3,2,0),(1,-2,1),(4,0,1)$ como columnas: es la matriz de $f$ respecto de $B$ (salida) y la canónica (llegada), no la pedida. Otro: equivocarse en un signo al despejar y no comprobar.
**Sobre la oficial.** Resultado correcto; plantea el sistema pero no muestra cómo lo resuelve. La cabecera de las soluciones dice «ENERO [1]. 2021» (errata: el examen es de 2022).

---

## Método C — Matriz respecto de bases no canónicas (Def. 3.4 directamente)

**Idea común.** Def. 3.4 (U p.116) al pie de la letra: para cada vector $e_j$ de la base de **salida** se calcula $f(e_j)$ y se expresan sus **coordenadas en la base de llegada** $S$ (resolver $f(e_j)=a_{1j}u_1+\dots+a_{nj}u_n$, Def. 2.10, U p.85); esos $a_{ij}$ forman la columna $j$. Si $f$ es un endomorfismo y se dice «la matriz en la base $B$», se usa $B$ **a la vez** en salida y llegada. La fórmula de cambio de base ($A'=P^{-1}AQ$, U §3.5 p.136) da lo mismo, pero es materia de 3.5.

### 5. Feb. 2019 (tipo A), ejercicio 3 (1 punto)

**Enunciado (literal).** Hallar la matriz asociada, en las bases $\{(1,0,1),(1,0,0),(1,1,0)\}$ y $\{(0,1),(1,0)\}$, de la aplicación lineal $f:\mathbb R^3\to\mathbb R^2$ definida por $f(x,y,z)=(x-y-z,\ z)$.

**Qué se pide.** $B=\{(1,0,1),(1,0,0),(1,1,0)\}$ es la base de salida ($\mathbb R^3$, 3 columnas) y $S=\{(0,1),(1,0)\}$ la de llegada ($\mathbb R^2$, 2 filas): matriz $2\times3$.

**Solución paso a paso.**
1. **(Que son bases.)** $\det\begin{pmatrix}1&1&1\\0&0&1\\1&0&0\end{pmatrix}=1\neq0$ y $S$ es la canónica con el orden cambiado: ambas son bases.
2. **Imágenes de los vectores de $B$** (sustituir en la fórmula):
   $$f(1,0,1)=(1-0-1,\ 1)=(0,1),\quad f(1,0,0)=(1,0),\quad f(1,1,0)=(1-1-0,\ 0)=(0,0).$$
3. **Coordenadas en $S=\{u_1=(0,1),\,u_2=(1,0)\}$.** Para un vector $(a,b)$: $(a,b)=\alpha(0,1)+\beta(1,0)=(\beta,\alpha)\Rightarrow\alpha=b,\ \beta=a$; las coordenadas en $S$ son $(b,a)$ (se intercambian). Así:
   $$(0,1)=(1,0)_S,\qquad (1,0)=(0,1)_S,\qquad (0,0)=(0,0)_S.$$
4. **Matriz** (coordenadas en columnas, en el orden de $B$):
   $$A=\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}.$$
5. **Comprobación con un vector.** $v=(2,1,1)$: en $B$, $v=\alpha(1,0,1)+\beta(1,0,0)+\gamma(1,1,0)$ da $\gamma=1$ (2.ª comp.), $\alpha=1$ (3.ª), $\beta=0$: $v=(1,0,1)_B$. Entonces $A(1,0,1)^t=(1,0)^t$, que en $S$ es $1\cdot(0,1)+0\cdot(1,0)=(0,1)$. Directamente: $f(2,1,1)=(2-1-1,\,1)=(0,1)$ ✓.
6. **Contraste.** En las bases canónicas la matriz sería $\begin{pmatrix}1&-1&-1\\0&0&1\end{pmatrix}$: **otra matriz para la misma $f$** (Teor. 3.3 dice «única *para las bases elegidas*»; ver n.º 8).

*(sympy: columnas $S^{-1}f(b_j)$ → $\begin{pmatrix}1&0&0\\0&1&0\end{pmatrix}$ ✓.)*

**Receta.** Bases no canónicas: (1) imagen de cada vector de la base de **salida**; (2) coordenadas de cada imagen en la base de **llegada**; (3) en columnas. Si la base de llegada es la canónica desordenada, las coordenadas son las componentes reordenadas.
**Error típico.** Dar las imágenes $(0,1),(1,0),(0,0)$ tal cual como columnas (eso es usar la canónica en la llegada: sale $\begin{pmatrix}0&1&0\\1&0&0\end{pmatrix}$, incorrecta); o calcular coordenadas de los vectores de $B$ en vez de las de sus imágenes.
**Sobre la oficial.** Correcta y bien explicada.

### 6. Feb. 2026 (2.ª sem.), problema 8 — 1.er apartado (1 punto)

**Enunciado (literal).** Sea $f(x_1,x_2)=(-7x_1+6x_2,\ -9x_1+8x_2)$ una aplicación lineal de $\mathbb R^2$ en $\mathbb R^2$ respecto a la base canónica. Halle la matriz asociada a $f$ con respecto a la base $B=\{(1,-1),(1,1)\}$ (1 PUNTO). *(2.º apartado: diagonalizar → tema 4.3.)*

**Qué se pide.** Es un endomorfismo; «respecto a la base $B$» significa $B$ en la salida **y** en la llegada. Columna $j$ = coordenadas en $B$ de $f(b_j)$.

**Solución paso a paso.**
1. **$B$ es base:** $\det\begin{pmatrix}1&1\\-1&1\end{pmatrix}=2\neq0$.
2. **Imágenes de los vectores de $B$:**
   $$f(1,-1)=(-7-6,\ -9-8)=(-13,-17),\qquad f(1,1)=(-7+6,\ -9+8)=(-1,-1).$$
3. **Coordenadas en $B$ de un vector genérico** (así se hace una sola vez): $(p,q)=a(1,-1)+b(1,1)=(a+b,\,-a+b)$ ⇒ sumando, $2b=p+q$; restando, $2a=p-q$:
   $$a=\tfrac{p-q}2,\qquad b=\tfrac{p+q}2.$$
4. **Aplicarlo:** $(-13,-17)$: $a=\tfrac{-13+17}2=2$, $b=\tfrac{-30}2=-15$ ⇒ $(2,-15)_B$. $(-1,-1)$: $a=0$, $b=-1$ ⇒ $(0,-1)_B$.
5. **Matriz:**
   $$A_B=\begin{pmatrix}2&0\\-15&-1\end{pmatrix}.$$
6. **Comprobación:** $2(1,-1)-15(1,1)=(-13,-17)$ ✓; $0(1,-1)-1(1,1)=(-1,-1)$ ✓. Control de invariantes (se justifica en 4.1): la traza ($1$) y el determinante ($-2$) coinciden con los de $A=\begin{pmatrix}-7&6\\-9&8\end{pmatrix}$ (traza $1$, det $-56+54=-2$) ✓.
7. **Vía alternativa (tema 3.5).** $A_B=P^{-1}AP$ con $P=\begin{pmatrix}1&1\\-1&1\end{pmatrix}$ (columnas = vectores de $B$), Def. 3.15 (U p.136). Da lo mismo.

*(sympy: $P^{-1}AP=\begin{pmatrix}2&0\\-15&-1\end{pmatrix}$; coordenadas $(2,-15)$ y $(0,-1)$ ✓.)*

**Receta.** Endomorfismo «en la base $B$»: imagen de cada $b_j$, coordenadas en la **misma** $B$, en columnas. Resolver una vez las coordenadas de un vector genérico $(p,q)$ ahorra sistemas.
**Error típico.** Dejar las imágenes en canónicas (columnas $(-13,-17)$ y $(-1,-1)$): es la matriz de $B$ a la canónica, no la pedida. O calcular $PAP^{-1}$ (orden inverso).
**Sobre la oficial.** Correcta; en la vía alternativa llama $B$ tanto a la base como a la matriz de paso (conviene llamarla $P$).

---

## Método D — Leer la matriz e interpretar (rango, dependencia de las bases)

**Idea común.** La matriz asociada guarda toda la información de $f$ en las bases elegidas: sus columnas son (las coordenadas de) los generadores $f(e_j)$ de la imagen (Ej. 3.9, U p.107), así que $\operatorname{rang}A=\operatorname{Dim}\operatorname{Im}f$ (Teor. 2.5, U p.88; autoevaluación ítem 5, p.138) y $\operatorname{Dim}\operatorname{Nuc}f=m-\operatorname{rang}A$ (ítem 6). Pero la matriz concreta **cambia si cambian las bases** (ítems 3, 4, 10).

### 7. Feb. 2026 (1.ª sem.), pregunta 2 (1 punto)

**Enunciado (literal).** Consideremos en $\mathbb R^3$ la base $B=\{u_1,u_2,u_3\}$ y consideremos en $\mathbb R^4$ la base $B'=\{v_1,v_2,v_3,v_4\}$. Determine de manera razonada el rango de la matriz asociada a la aplicación lineal $f:\mathbb R^3\to\mathbb R^4$ definida por
$$f(u_1)=-v_1+v_2+v_3,\qquad f(u_2)=v_1-v_2-v_3,\qquad\text{y}\qquad f(u_3)=(0,0,0,0).$$

**Qué se pide.** Construir la matriz de $f$ en las bases $B$ (salida) y $B'$ (llegada) y calcular su rango. No hace falta saber quiénes son los $u_i$, $v_j$: basta con las coordenadas.

**Solución paso a paso.**
1. **Tamaño:** $4\times3$ ($\operatorname{Dim}\mathbb R^4=4$ filas, $\operatorname{Dim}\mathbb R^3=3$ columnas).
2. **Coordenadas en $B'$ de cada imagen** (los coeficientes de $v_1,\dots,v_4$; Def. 2.10):
   $f(u_1)=(-1,1,1,0)_{B'}$, $f(u_2)=(1,-1,-1,0)_{B'}$, $f(u_3)=0=(0,0,0,0)_{B'}$ (el vector nulo tiene coordenadas nulas en cualquier base).
3. **Matriz (en columnas, Def. 3.4):**
   $$A=\begin{pmatrix}-1&1&0\\1&-1&0\\1&-1&0\\0&0&0\end{pmatrix}.$$
4. **Rango.** La 3.ª columna es nula; la 2.ª es $-1$ por la 1.ª ($C_2=-C_1$); la 1.ª no es nula. Por tanto el subespacio generado por las columnas es $\langle C_1\rangle$, de dimensión 1, y $\operatorname{rang}A=1$ (Teor. 2.5, U p.88). (Equivalente: hay un menor $1\times1$ no nulo, $a_{11}=-1$, y todos los $2\times2$ son nulos porque cualquier par de columnas es proporcional o contiene la nula.)
5. **Interpretación.** $\operatorname{Dim}\operatorname{Im}f=1$ ($\operatorname{Im}f=\langle -v_1+v_2+v_3\rangle$) y $\operatorname{Dim}\operatorname{Nuc}f=3-1=2$ (Teor. 3.1, U p.111); de hecho $\operatorname{Nuc}f=\langle u_1+u_2,\ u_3\rangle$, porque $f(u_1+u_2)=f(u_1)+f(u_2)=0$.

*(sympy: rango 1; `nullspace` → $(1,1,0)$, $(0,0,1)$ ✓.)*

**Receta.** Si $f$ se da sobre bases abstractas, las columnas de la matriz son los **coeficientes** de cada $f(u_j)$; el rango se calcula como siempre y coincide con $\operatorname{Dim}\operatorname{Im}f$ (no depende de las bases elegidas).
**Error típico.** Escribir las coordenadas en **filas** (da la traspuesta: mismo rango, pero matriz mal construida; en otro ejercicio te costaría el resultado); creer que, como $f(u_3)=0$, la matriz «no tiene 3.ª columna»; concluir rango 2 por haber dos columnas no nulas sin ver que son proporcionales.
**Sobre la oficial.** Resultado correcto, pero (a) dice que las columnas son «las coordenadas de la base $B$ respecto de la base $B'$»: deben ser las coordenadas de las **imágenes** $f(u_j)$; (b) «como la 1.ª y 2.ª columnas son dependientes, el rango es 1» necesita añadir que la 3.ª es nula y la 1.ª no.

### 8. Sept. 2017 (tipo A), ejercicio 3 (test, 1 punto)

**Enunciado (literal).** Es cierto: A) Las matrices de cambio de base son singulares; B) La matriz asociada a una aplicación lineal depende de las bases fijadas; C) Todas las aplicaciones lineales son endomorfismos; D) Ninguna de las anteriores.

**Qué se pide.** Elegir la afirmación verdadera, justificándolo (aunque sea test, hay que saber por qué las otras fallan). Son los ítems 8, 10 y 7 de la autoevaluación del cap. 3 (U p.138).

**Solución paso a paso.**
1. **B) Verdadera.** La Def. 3.4 (U p.116) construye la matriz con las coordenadas de $f(e_j)$ **en la base $S$**, a partir de los $e_j$ **de la base $B$**: si cambia $B$ o $S$, cambian las columnas. El Teor. 3.3 (U p.115) dice que la matriz es única **para las bases elegidas**. Ejemplo concreto: la misma $f(x_1,x_2)=(-7x_1+6x_2,-9x_1+8x_2)$ tiene matriz $\begin{pmatrix}-7&6\\-9&8\end{pmatrix}$ en la canónica y $\begin{pmatrix}2&0\\-15&-1\end{pmatrix}$ en $B=\{(1,-1),(1,1)\}$ (n.º 6). Otro: Feb. 2019 A (n.º 5).
2. **A) Falsa.** Una matriz de cambio de base es **regular** (tiene inversa): U §3.5, p.135, «Las matrices de cambio de base son regulares (tienen inversa)». Motivo: sus columnas son coordenadas de los vectores de una base, que son linealmente independientes, así que su rango es máximo. Singular significaría determinante 0.
3. **C) Falsa.** Endomorfismo = aplicación lineal de un espacio en sí mismo ($V=W$; U §4.1, p.147). Contraejemplo: $f:\mathbb R^2\to\mathbb R^3$, $f(x_1,x_2)=(x_1,x_2,0)$ es lineal y no es endomorfismo (su matriz es $3\times2$, ni siquiera cuadrada).
4. **D) Falsa**, porque B es cierta. **Respuesta: B.**

**Receta.** Matriz asociada = (aplicación) + (base de salida) + (base de llegada): cambiar cualquiera de los tres cambia la matriz. Lo que **no** cambia es el rango (= $\operatorname{Dim}\operatorname{Im}f$).
**Error típico.** Elegir A confundiendo «matriz de cambio de base» con «matriz asociada a una aplicación no invertible»; o creer que la matriz «es» la aplicación.
**Sobre la oficial.** Correcta («véase la teoría y los ejercicios de autoevaluación»), sin justificar.

---

## Ejemplos propios (dificultad creciente; todos verificados con sympy)

**P1 (propio, fácil — método A).** Sea $f:\mathbb R^3\to\mathbb R^3$, $f(x,y,z)=(x-2y,\ 3z,\ x+y+z)$. Escriba su matriz en la base canónica, sus ecuaciones y calcule $f(1,1,1)$ con la matriz.
1. Columnas $f(e_1)=(1,0,1)$, $f(e_2)=(-2,0,1)$, $f(e_3)=(0,3,1)$: $A=\begin{pmatrix}1&-2&0\\0&0&3\\1&1&1\end{pmatrix}$ (fila $i$ = coeficientes de la componente $i$; ojo con los ceros).
2. Ecuaciones: $y_1=x_1-2x_2$, $y_2=3x_3$, $y_3=x_1+x_2+x_3$ (U p.117, Ej. 3.19).
3. $A(1,1,1)^t=(-1,3,3)^t$; directamente $f(1,1,1)=(1-2,\,3,\,3)$ ✓. *(Además $\det A=-9\neq0$: rango 3, $\operatorname{Im}f=\mathbb R^3$.)*

**P2 (propio, medio — método B).** $f:\mathbb R^2\to\mathbb R^2$ lineal con $f(1,1)=(2,3)$ y $f(1,2)=(1,1)$. Halle su matriz canónica y $f(3,4)$.
1. $\det\begin{pmatrix}1&1\\1&2\end{pmatrix}=1\neq0$: es base, $f$ queda determinada (Teor. 3.2).
2. $e_2=(1,2)-(1,1)$ ⇒ $f(e_2)=(1,1)-(2,3)=(-1,-2)$. $e_1=(1,1)-e_2=2(1,1)-(1,2)$ ⇒ $f(e_1)=2(2,3)-(1,1)=(3,5)$.
3. $A=\begin{pmatrix}3&-1\\5&-2\end{pmatrix}$. Comprobación: $A(1,1)^t=(2,3)^t$ ✓, $A(1,2)^t=(1,1)^t$ ✓.
4. $f(3,4)=A(3,4)^t=(9-4,\,15-8)=(5,7)$. Por otra vía: $(3,4)=2(1,1)+(1,2)$ ⇒ $f(3,4)=2(2,3)+(1,1)=(5,7)$ ✓.

**P3 (propio, medio-alto — método A con polinomios).** Sea $f:\wp_2\to\wp_2$, $f(p)(x)=p(x+1)$. Halle su matriz en la base $\{1,x,x^2\}$ y úsela para calcular $f(2-x+3x^2)$.
1. Lineal: $(p+\lambda q)(x+1)=p(x+1)+\lambda q(x+1)$.
2. Imágenes de la base: $f(1)=1$, $f(x)=1+x$, $f(x^2)=(x+1)^2=1+2x+x^2$; coordenadas $(1,0,0)$, $(1,1,0)$, $(1,2,1)$.
3. $A=\begin{pmatrix}1&1&1\\0&1&2\\0&0&1\end{pmatrix}$ ($3\times3$: $\operatorname{Dim}\wp_2=3$).
4. $p=2-x+3x^2$ tiene coordenadas $(2,-1,3)$; $A(2,-1,3)^t=(4,5,3)^t$ ⇒ $f(p)=4+5x+3x^2$. Comprobación: $2-(x+1)+3(x+1)^2=2-x-1+3x^2+6x+3=4+5x+3x^2$ ✓.

**P4 (propio, examen — método C).** $f:\mathbb R^3\to\mathbb R^2$, $f(x,y,z)=(x+y,\ y-z)$. Halle su matriz respecto de $B=\{(1,1,0),(0,1,1),(1,0,1)\}$ y $S=\{(1,0),(1,1)\}$, y compruébela con $v=(1,2,1)$.
1. Bases: $\det$ de $B$ (columnas) $=2\neq0$; $\det\begin{pmatrix}1&1\\0&1\end{pmatrix}=1\neq0$.
2. Imágenes: $f(1,1,0)=(2,1)$, $f(0,1,1)=(1,0)$, $f(1,0,1)=(1,-1)$.
3. Coordenadas en $S$: $(p,q)=a(1,0)+b(1,1)=(a+b,\,b)$ ⇒ $b=q$, $a=p-q$. Así $(2,1)=(1,1)_S$, $(1,0)=(1,0)_S$, $(1,-1)=(2,-1)_S$.
4. $A=\begin{pmatrix}1&1&2\\1&0&-1\end{pmatrix}$.
5. Comprobación: $v=(1,2,1)=(1,1,0)+(0,1,1)$, es decir, $v=(1,1,0)_B$. $A(1,1,0)^t=(2,1)^t$ ⇒ $f(v)=2(1,0)+1(1,1)=(3,1)$. Directamente: $f(1,2,1)=(3,\,1)$ ✓. *(sympy: también $S^{-1}A_{can}P_B$ da la misma matriz; esa fórmula es la de 3.5.)*

---

## Errores frecuentes del tema (para la chuleta)
- Imágenes en **filas** en vez de columnas (sale la traspuesta). Tamaño correcto: (dim. llegada) × (dim. salida).
- Usar las imágenes de una base no canónica como columnas de la «matriz canónica» (Feb. 2018 B, Ene. 2022).
- En bases no canónicas, olvidar pasar las imágenes a coordenadas de la base de **llegada** (Feb. 2019 A, Feb. 2026 2.ª p.8).
- Ordenar mal la base de polinomios ($1,x,x^2$ frente a $x^2,x,1$) o dar una matriz cuadrada cuando los espacios tienen dimensiones distintas (Feb. 2023 1.ª p.7).
- Pensar que la matriz no depende de las bases (Sept. 2017 ej. 3); sí depende, pero su **rango** no.
- No comprobar: multiplicar $A$ por los vectores dados y ver que salen las imágenes dadas detecta casi todos los errores.
