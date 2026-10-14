# Dossier de exámenes (fuente X) — Tema 2.4: operaciones entre subespacios y suma directa

**Alcance de U §2.4 (p.89-98 impresa)**: Teor. 2.8 ($\langle S\rangle$ menor subespacio que contiene a $S$, p.91); intersección de subespacios (siempre subespacio, p.91; Ej. 2.32-2.33, p.91-92); unión (en general **no** subespacio, p.92; Ej. 2.34, p.92-93); Def. 2.12 subespacio suma (p.93; Ej. 2.35-2.36, p.93-95); fórmula de Grassmann (p.95; Ej. 2.37-2.38); Def. 2.13 suma directa (p.96; Ej. 2.39-2.40); caracterización $U_1\oplus U_2\iff U_1\cap U_2=\{0\}$ (p.97); Def. 2.14 suplementario (p.97; Ej. 2.43); Teor. 2.9 $V=\langle e_1\rangle\oplus\dots\oplus\langle e_n\rangle$ (p.98). Herramientas previas usadas: Def. 2.6 sistema libre (p.74), Teor. 2.1 supresión (p.79), Teor. 2.5 rango = dimensión (p.88), Teor. 2.6 (p.88), Teor. 2.7 base incompleta (p.89).

**Exámenes leídos (24/24)**: Feb. 2026 (1.ª y 2.ª sem.), Feb. 2017 (2.ª sem., tipo A), Feb. 2018 (A y B), Feb. 2019 (A y B), Ene. 2020 (tipo A), Feb. 2020 (1.ª sem., tipo B), Ene. 2022 (tipo A), Feb. 2022 (tipo A), Feb. 2023 (1.ª y 2.ª sem.), Feb. 2024 (1.ª y 2.ª sem.), Feb. 2025 (1.ª y 2.ª sem.), Sept. 2017 (A), 2018 (A), 2019 (A), 2022, 2023, 2024, 2025.

## Resumen

| # | Fuente | Contenido | Estado |
|---|---|---|---|
| 1 | Feb. 2018 (tipo B), ejercicio 2 | $U_1\subset U_2$: suma directa / dim. intersección / suplementarios (V/F) | **YA EN EL TEMA** (desarrollado) |
| 2 | Feb. 2019 (tipo B), ejercicio 2 | Paramétricas de $U_1\cap U_2$ (cartesianas) | **YA EN EL TEMA** (desarrollado) |
| 3 | Sept. 2019 (tipo A), ejercicio 2 | $S\cap T$ con generadores | **YA EN EL TEMA** (desarrollado) |
| 4 | Feb. 2025 (2.ª sem.), pregunta 2 | Posibles $\operatorname{Dim}N$ por Grassmann | **YA EN EL TEMA** (desarrollado) |
| 5 | Sept. 2022, problema b) | Base, cartesianas, paramétricas de $F+G$ y suplementario | **YA EN EL TEMA** (desarrollado) |
| 6 | Ene. 2020 (tipo A), problema a) | Definir $U$, $U\cap V$, suplementario de $U+V$ | **YA EN EL TEMA** (desarrollado) |
| 7 | Sept. 2024, problema 7 | Definiciones; bases de $U_1+U_2$ y $U_1\cap U_2$; unión | **YA EN EL TEMA** (desarrollado) |
| 8 | Feb. 2024 (1.ª sem.), problema 7 | Grassmann en $\mathbb R^4$ ($L_1$, $L_2$, $L_1\cap L_2$, $L_1+L_2$) | **NUEVO como ejemplo desarrollado** (hoy solo en la lista «Para practicar», con resultado resumido) → solución completa abajo |
| 9 | Ene. 2022 (tipo A), ejercicio 2 | $F+G$, $F\cup G$, $F\cap G$ en polinomios ($G\subset F$) | **NUEVO como ejemplo desarrollado** (hoy solo en «Para practicar») → solución completa abajo |
| 10 | Feb. 2022 (tipo A), problema a) | Subespacio ortogonal $V$ y si es suplementario de $U$ | **DUDOSO 2.4 / 5.1** (hoy en «Para practicar»); solución completa abajo por si se queda en 2.4 |

Fronterizos que **no** van a 2.4 (para reconciliar con los otros agentes):
- Sept. 2025, problema 7 (3.er apartado): dimensión de $\langle A,B,Y\rangle$ en $M_{2\times2}$ → **2.3** (rango/dimensión de un subespacio generado; no hay suma ni intersección).
- Feb. 2022 (tipo A), ejercicio 2: sistema generador de $U$ dado por cartesianas → **2.2/2.3**.
- Sept. 2023, problema 7 (2.º apartado): «subespacio propio de $\operatorname{Im}f$ en forma implícita» → **3.2** (subespacio contenido en otro; no es operación entre subespacios).
- Feb. 2018 (tipo A), problema a); Sept. 2019 (tipo A), problema b); Feb. 2017 (2.ª sem., tipo A), ejercicio 5; Feb. 2020 (1.ª sem., tipo B), ejercicio 5: subespacio ortogonal/proyección → **5.1** (usan «suplementario ortogonal», pero el contenido principal es el producto escalar).

**Errores detectados en lo ya publicado**: ninguno matemático. Todos los cálculos de los 7 ejemplos desarrollados se han reverificado con sympy (Feb18B rango 2 de la unión de bases; Feb19B núcleo $\langle(2,1,1,1)\rangle$; Sept19A $S\cap T=\langle(1,1,1)\rangle$, rango 3; Sept22 det $=1$; Ene20 rango $V=2$, $U\cap V=\langle(1,0,-1)\rangle$, rango $U+V=3$; Sept24 $U_1\cap U_2=\langle(0,3,1,0)\rangle$, rango suma 3, cartesiana $3x+y-3z=0$ ✓). Detalle menor: el PDF de soluciones de Ene. 2022 lleva la cabecera «ENERO [1]. 2021» (errata del documento: el enunciado dice 2022); el nombre «Ene. 2022 (tipo A)» es correcto.

---

## 8. Feb. 2024 (1.ª sem.), problema 7 (2 puntos) — NUEVO como ejemplo desarrollado

**Enunciado (literal).** Sean $L_1$ y $L_2$ los siguientes subespacios de $\mathbb R^4$:
$$L_1=\langle(3,-4,0,1),(2,2,0,-4),(1,-6,0,5)\rangle,\qquad L_2=\langle(1,0,0,0),(0,1,0,0),(0,0,1,0)\rangle.$$
Calcule de manera razonada las dimensiones de los siguientes subespacios: $L_1$ (0.5 PUNTOS), $L_2$ (0.5 PUNTOS), $L_1\cap L_2$ (0.5 PUNTOS), $L_1+L_2$ (0.5 PUNTOS).

**Solución paso a paso.** Llamamos $v_1=(3,-4,0,1)$, $v_2=(2,2,0,-4)$, $v_3=(1,-6,0,5)$.

1. **$\operatorname{Dim}L_1$: buscar dependencias.** $v_1-v_2=(3-2,\,-4-2,\,0,\,1+4)=(1,-6,0,5)=v_3$. Luego $v_3$ es combinación lineal de $v_1,v_2$ y, por el Teor. 2.1 de supresión (U p.79), $L_1=\langle v_1,v_2\rangle$. $v_1$ y $v_2$ no son proporcionales (la 1.ª coordenada daría $\lambda=2/3$ y la 2.ª $\lambda=-1/2$), luego son libres (Def. 2.6, U p.74): base de $L_1$ y **$\operatorname{Dim}L_1=2$** (Teor. 2.5, U p.88: dimensión = rango del sistema generador).
2. **$\operatorname{Dim}L_2$.** $e_1,e_2,e_3$ son tres vectores de la base canónica: libres (la matriz que forman contiene la identidad $3\times3$, rango 3). **$\operatorname{Dim}L_2=3$.**
3. **Cartesianas de $L_1$** (para poder cortar). Un vector de $L_1$ es $\alpha v_1+\beta v_2$:
   $$x_1=3\alpha+2\beta,\quad x_2=-4\alpha+2\beta,\quad x_3=0,\quad x_4=\alpha-4\beta.$$
   Como $\operatorname{Dim}L_1=2$ en $\mathbb R^4$, debe haber $4-2=2$ ecuaciones independientes. Una es $x_3=0$. Para la otra se eliminan $\alpha,\beta$: $x_1+x_2=-\alpha+4\beta=-x_4$, es decir $x_1+x_2+x_4=0$. Así
   $$L_1:\ \begin{cases}x_3=0\\x_1+x_2+x_4=0\end{cases}$$
   Comprobación: $v_1$: $3-4+1=0$ ✓; $v_2$: $2+2-4=0$ ✓ (y ambos tienen $x_3=0$).
4. **Cartesianas de $L_2$.** $\alpha e_1+\beta e_2+\gamma e_3=(\alpha,\beta,\gamma,0)$: las tres primeras coordenadas son libres y la 4.ª siempre es 0: $L_2:\ x_4=0$ ($4-3=1$ ecuación).
5. **Intersección: juntar todas las ecuaciones** (un vector de $L_1\cap L_2$ cumple las de los dos; U p.91, Ej. 2.33):
   $$L_1\cap L_2:\ x_3=0,\quad x_1+x_2+x_4=0,\quad x_4=0\iff x_3=0,\ x_4=0,\ x_1+x_2=0.$$
   Tres ecuaciones independientes (cada una contiene una incógnita que no aparece en las demás: $x_3$, $x_4$, $x_1$), rango 3, luego $4-3=1$ parámetro: con $x_1=\lambda$, $x_2=-\lambda$:
   $$L_1\cap L_2=\langle(1,-1,0,0)\rangle,\qquad \operatorname{Dim}(L_1\cap L_2)=1.$$
   *Otra vía (más corta):* un vector $\alpha v_1+\beta v_2$ de $L_1$ está en $L_2$ si su 4.ª coordenada es 0: $\alpha-4\beta=0\Rightarrow\alpha=4\beta$, y queda $\beta(4v_1+v_2)=\beta(14,-14,0,0)=14\beta(1,-1,0,0)$. Mismo resultado.
6. **Suma: fórmula de Grassmann** (U p.95), con tres de las cuatro dimensiones ya calculadas:
   $$\operatorname{Dim}(L_1+L_2)=\operatorname{Dim}L_1+\operatorname{Dim}L_2-\operatorname{Dim}(L_1\cap L_2)=2+3-1=4.$$
   Como $L_1+L_2$ es un subespacio de $\mathbb R^4$ con dimensión 4, es **todo $\mathbb R^4$** (Teor. 2.6, U p.88).
7. **Comprobación independiente.** $L_1+L_2=\langle v_1,v_2,e_1,e_2,e_3\rangle$ (Def. 2.12: se unen los generadores). $\det(e_1,e_2,e_3,v_1)$: desarrollando por la 4.ª fila $(0,0,0,1)$, vale $1\neq0$; rango 4 ✓.

**Resultado:** $\operatorname{Dim}L_1=2$, $\operatorname{Dim}L_2=3$, $\operatorname{Dim}(L_1\cap L_2)=1$, $\operatorname{Dim}(L_1+L_2)=4$ ($L_1+L_2=\mathbb R^4$). *(Verificado con sympy: rangos 2, 3, 4; intersección $\langle(-1,1,0,0)\rangle$; det $=1$.)*

**Sobre la solución oficial.** Correcta; da las cartesianas de $L_1$ sin mostrar la eliminación de parámetros y no dice por qué $L_1\cap L_2$ tiene dimensión 1 (rango 3 del sistema conjunto).

**Receta:** con dos subespacios por generadores: (i) dimensión de cada uno = rango de sus generadores (quitar los dependientes); (ii) pasar a cartesianas y **juntarlas** para la intersección (o: vector genérico de uno + ecuaciones del otro); (iii) la dimensión de la suma, por **Grassmann**; comprobar con el rango de la unión de generadores.

**Fallo recurrente (lo da el examen):** «Confundir suma de subespacios con unión de subespacios (que no es, en general, un subespacio vectorial).» Otro error típico: sumar dimensiones $2+3=5$ para $L_1+L_2$ (imposible en $\mathbb R^4$): eso solo vale si la suma es directa.

---

## 9. Ene. 2022 (tipo A), ejercicio 2 (1 punto) — NUEVO como ejemplo desarrollado

**Enunciado (literal).** Si $\{x^2,1\}$ y $\{x^2+1\}$ son los sistemas generadores de dos subespacios $F$ y $G$ respectivamente, hallar $F+G$, $F\cup G$ y $F\cap G$.

**Solución paso a paso.** (Los vectores son polinomios; trabajamos en el espacio de polinomios de grado $\le2$, $\wp_2$, con base canónica $\{1,x,x^2\}$.)

1. **Qué son $F$ y $G$.** Por definición de subespacio generado, $F=\langle x^2,1\rangle=\{a x^2+b:\ a,b\in\mathbb R\}$ (polinomios sin término en $x$) y $G=\langle x^2+1\rangle=\{c(x^2+1):\ c\in\mathbb R\}$.
2. **Dimensiones.** $\{x^2,1\}$ es libre: $a x^2+b\cdot1=0$ (polinomio nulo) obliga a $a=b=0$ (Def. 2.6, U p.74). Luego $\operatorname{Dim}F=2$. $\{x^2+1\}$ es un vector no nulo: $\operatorname{Dim}G=1$.
3. **Observación clave: $G\subset F$.** $x^2+1=1\cdot x^2+1\cdot1$ es combinación lineal de los generadores de $F$, así que $x^2+1\in F$; y como $F$ es subespacio, también $c(x^2+1)\in F$ para todo $c$. Es decir, $G\subset F$. (En coordenadas respecto de $\{1,x,x^2\}$: $(1,0,1)=(1,0,0)+(0,0,1)$.)
4. **Intersección.** Si $G\subset F$, todo vector de $G$ está en los dos, y todo vector de $F\cap G$ está en $G$: $F\cap G=G=\langle x^2+1\rangle$, de dimensión 1.
5. **Suma** (Def. 2.12, U p.93). $F+G=\{f+g:\ f\in F,\ g\in G\}$. Por un lado $F\subset F+G$ (tomar $g=0$). Por otro, si $f\in F$ y $g\in G\subset F$, $f+g\in F$ porque $F$ es subespacio. Luego $F+G=F=\langle x^2,1\rangle$, de dimensión 2.
6. **Comprobación con Grassmann** (U p.95): $\operatorname{Dim}(F+G)+\operatorname{Dim}(F\cap G)=2+1=3=\operatorname{Dim}F+\operatorname{Dim}G=2+1$ ✓.
7. **Unión.** $F\cup G$ = vectores que están en $F$ o en $G$. Como $G\subset F$, $F\cup G=F$. Aquí la unión **sí** es un subespacio (es $F$): es la excepción a «la unión, en general, no es subespacio» (U p.92), que se da precisamente cuando uno de los dos contiene al otro.

**Resultado:** $F\cap G=G=\langle x^2+1\rangle$; $F+G=F=\langle x^2,1\rangle$; $F\cup G=F$. *(Verificado con sympy en coordenadas: rango de $\{(0,0,1),(1,0,0)\}$ = rango con $(1,0,1)$ añadido = 2; intersección $\langle(1,0,1)\rangle$.)*

**Sobre la solución oficial.** Solo dice «La intersección es $G$, la suma es $F$ y la unión es $F$», sin justificar $G\subset F$ (paso 3), que es lo que hace funcionar todo. El examen avisa que «lo que no se justifica no se puntúa».

**Receta:** antes de operar, **mira si uno está contenido en el otro** (basta comprobar que los generadores del pequeño son combinación de los del grande). Si $G\subset F$: $F\cap G=G$, $F+G=F$, $F\cup G=F$.

**Error típico:** decir «$F\cap G=\{0\}$ porque los generadores son distintos», o afirmar que la unión «nunca» es subespacio.

---

## 10. Feb. 2022 (tipo A), problema a) (1,5 puntos) — DUDOSO (2.4 / 5.1)

*Propuesta:* si se queda en 2.4, presentarlo como «mixto con el tema 5»: la parte de 2.4 es razonar si es suplementario (Def. 2.14 y caracterización de suma directa); «ortogonal» es del §5.1 (Def. 5.8 p.203, Def. 5.10 p.209, suplementario ortogonal). Hoy está en «Para practicar».

**Enunciado (literal).** Encuentre un subespacio $V$ de $\mathbb R^3$ ortogonal al subespacio $U$ definido por las ecuaciones $x+z=0;\ y=0$. Razone si $V$ es subespacio suplementario de $U$.

**Solución paso a paso** (producto escalar usual de $\mathbb R^3$).

1. **Base de $U$.** Dos ecuaciones independientes en $\mathbb R^3$: $\operatorname{Dim}U=3-2=1$. Con $x=\lambda$: $z=-\lambda$, $y=0$, luego $U=\langle(1,0,-1)\rangle$ (una recta).
2. **Qué es «ortogonal a $U$».** Un vector $v$ es ortogonal a $U$ si lo es a un sistema generador de $U$ (Def. 5.8, U p.203); aquí basta $(x,y,z)\cdot(1,0,-1)=x-z=0$. El conjunto de **todos** los vectores ortogonales a $U$ es el plano $U^\perp:\ x-z=0=\langle(1,0,1),(0,1,0)\rangle$ (dimensión $3-1=2$).
3. **Elección de $V$.** El enunciado pide «un» subespacio ortogonal: valen $U^\perp$ o cualquier subespacio suyo (p. ej. la recta $\langle(0,1,0)\rangle$). Para que además pueda ser suplementario se elige $V=U^\perp:\ x-z=0$.
4. **¿Es suplementario?** Por Def. 2.14 (U p.97) hay que ver $\mathbb R^3=U\oplus V$:
   - *Suma directa* (caracterización, U p.97): $U\cap V=\{0\}$. Un vector de $U$ es $\lambda(1,0,-1)$; cumple $x-z=0$ si $\lambda-(-\lambda)=2\lambda=0$, es decir $\lambda=0$. ✓
   - *La suma es todo $\mathbb R^3$*: por Grassmann, $\operatorname{Dim}(U+V)=1+2-0=3$, luego $U+V=\mathbb R^3$ (Teor. 2.6). Equivalentemente $\det\begin{pmatrix}1&0&-1\\1&0&1\\0&1&0\end{pmatrix}=-2\neq0$. ✓
   
   **Sí**, $V=U^\perp$ es suplementario de $U$ (de hecho, es su *suplementario ortogonal*, Def. 5.10, U p.209).
5. **Por qué una recta ortogonal no sirve.** Si se hubiera elegido $V'=\langle(0,1,0)\rangle$ (ortogonal a $U$: $(0,1,0)\cdot(1,0,-1)=0$), la suma sería directa (vectores no proporcionales) pero $\operatorname{Dim}(U\oplus V')=1+1=2<3$: no es $\mathbb R^3$, **no** es suplementario. En general, si $V\subset U^\perp$, entonces $U\cap V\subset U\cap U^\perp=\{0\}$ (la suma siempre es directa), y $V$ es suplementario $\iff\operatorname{Dim}V=2\iff V=U^\perp$.

**Resultado:** $V=\{(x,y,z):\ x-z=0\}=\langle(1,0,1),(0,1,0)\rangle$ es ortogonal a $U$ y suplementario suyo; un subespacio ortogonal de dimensión 1 no lo sería. *(Verificado con sympy: núcleo de $(1,0,-1)$, det $=-2$, rango de $U+\langle(0,1,0)\rangle$ = 2.)*

**Sobre la solución oficial.** Es correcta en el fondo pero **intercambia los nombres**: llama $V$ a la recta dada (que en el enunciado es $U$). Además no justifica la suma directa ni la dimensión.

**Receta:** suplementario $\iff$ intersección $\{0\}$ **y** dimensiones que suman $\operatorname{Dim}V$. Un subespacio ortogonal siempre corta en $\{0\}$; solo falta que tenga la dimensión complementaria.

**Error típico:** creer que «ortogonal» implica «suplementario» (falla con la recta $\langle(0,1,0)\rangle$), o que «suplementario» implica «ortogonal»: el plano $z=0$ es suplementario de $U$ ($(1,0,-1)$ no cumple $z=0$, así que la intersección es $\{0\}$, y $1+2=3$) pero no es ortogonal a $U$ ($(1,0,0)\cdot(1,0,-1)=1\neq0$). Un subespacio tiene muchos suplementarios y **un solo** suplementario ortogonal.

---

## Ya presentes (una línea cada uno)

1. **Feb. 2018 (tipo B), ejercicio 2** — YA EN EL TEMA (`#ex-feb18b`). Correcto. Las tres afirmaciones son falsas porque $U_1\subset U_2$.
2. **Feb. 2019 (tipo B), ejercicio 2** — YA EN EL TEMA (`#ex-feb19b`). Correcto: $U_1\cap U_2=\langle(2,1,1,1)\rangle$.
3. **Sept. 2019 (tipo A), ejercicio 2** — YA EN EL TEMA (`#ex-sep19a`). Correcto: $S\cap T=\langle(1,1,1)\rangle$.
4. **Feb. 2025 (2.ª sem.), pregunta 2** — YA EN EL TEMA (`#ex-feb25`). Correcto: $\operatorname{Dim}N\in\{3,\dots,7\}$; incluye los «fallos recurrentes» oficiales.
5. **Sept. 2022, problema b)** — YA EN EL TEMA (`#ex-sep22`). Correcto.
6. **Ene. 2020 (tipo A), problema a)** — YA EN EL TEMA (`#ex-feb20a`). Correcto (suplementario $\{0\}$ porque $U+V=\mathbb R^3$).
7. **Sept. 2024, problema 7** — YA EN EL TEMA (`#ex-sep24`). Correcto.
