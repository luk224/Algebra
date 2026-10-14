# Dossier de exámenes (fuente X) — Tema 3.2: imagen y núcleo de una aplicación lineal

**Alcance de U §3.2 (impresa p.104-112)**: introducción (p.104-105); Def. 3.2 imagen $\operatorname{Im}(f)=\{w\in W\mid w=f(v)\text{ para algún }v\in V\}$, subespacio de $W$ (p.106); Ej. 3.8 (imagen en $\mathbb R^4$ de una aplicación sobre matrices, p.106-107); Ej. 3.9 (la imagen está generada por las imágenes de la base canónica, p.107); Ej. 3.10 (aplicación dada por las imágenes de la base, p.108); Ej. 3.11 (dimensión y cartesianas de la imagen, $f:\wp_2\to\mathbb R^3$, p.108-109); Def. 3.3 núcleo $\operatorname{Nuc}(f)=\{v\in V\mid f(v)=0\}=f^{-1}(0)$, subespacio de $V$ (p.109); Ej. 3.12-3.14 (cálculo de núcleos, p.110-111); **Teorema 3.1** $\operatorname{Dim}\operatorname{Im}(f)+\operatorname{Dim}\operatorname{Nuc}(f)=\operatorname{Dim}V$ (p.111); Ej. 3.15 (comprobación, convenio $\operatorname{Dim}\{0\}=0$, p.112).
Herramientas previas que se usan: Def. 3.1 aplicación lineal (p.101) y sus propiedades 1-5 (p.103: $f(0)=0$; $f(\sum a_iv_i)=\sum a_if(v_i)$; imágenes de un sistema libre pueden ser ligadas); subespacio propio = distinto de $\{0\}$ y del total (U §2.1 p.63); paramétricas ↔ cartesianas (U §2.2 p.71); Def. 2.6 sistema libre (p.74); Teor. 2.1 supresión (p.79); Teor. 2.5 rango = dimensión del subespacio generado (p.88); Teor. 2.6 (p.88). De §3.3: Teor. 3.2 (las imágenes de una base determinan $f$, p.114). Autoevaluación cap. 3, ítems 5-6 (p.138): $\operatorname{Dim}\operatorname{Im}f=\operatorname{rang}A$ y $\operatorname{Dim}\operatorname{Nuc}f=m-\operatorname{rang}A$ para $A$ de orden $n\times m$ ($m=\operatorname{Dim}V$).

**Aviso de alcance (importante para el redactor).** El encargo menciona inyectividad/sobreyectividad/isomorfismo, pero **U no usa esas palabras en todo el libro** (búsqueda en `ingenieros.txt`: 0 apariciones de «inyectiv», «sobreyectiv», «isomorfism»; tampoco en `ejercicios.txt`). Ningún examen las usa tampoco: lo que aparece es «núcleo de dimensión cero» (Feb. 2019 B) o «imagen = todo el espacio». Si el tema las introduce, hacerlo como vocabulario de apoyo con fuente **L §1.9, Teor. 11 (p.76)**: «$T$ es uno a uno si y solo si $T(x)=0$ solo tiene la solución trivial» y **Teor. 12 (p.77)**: «$T$ es sobre $\mathbb R^m$ ⇔ las columnas de $A$ generan $\mathbb R^m$; uno a uno ⇔ columnas linealmente independientes». Núcleo e imagen en L: §4.2 (p.198-205).

**Exámenes leídos (24/24)**: Feb. 2026 (1.ª y 2.ª sem.), Feb. 2017 (2.ª sem., tipo A), Feb. 2018 (A y B), Feb. 2019 (A y B), Ene. 2020 (tipo A), Feb. 2020 (1.ª sem., tipo B), Ene. 2022 (tipo A), Feb. 2022 (tipo A), Feb. 2023 (1.ª y 2.ª sem.), Feb. 2024 (1.ª y 2.ª sem.), Feb. 2025 (1.ª y 2.ª sem.), Sept. 2017 (A), 2018 (A), 2019 (A), 2022, 2023, 2024, 2025. Todos leídos completos (no solo por búsqueda de palabras, porque los acentos están mal extraídos).

**Estado en el proyecto**: el tema 3.2 no existe aún. Algunos de estos ejercicios aparecen como **mención** en «Para practicar» de temas anteriores (sin desarrollar aquí se desarrollan): Sept. 2025 p.3 (tema 1.4, resuelto como sistema), Sept. 2023 p.7 2.º apartado (tema 2.1), y la lista de `data-ref` de 2.2 (Feb. 2019 A pa, Feb. 2019 B pc, Feb. 2024 1.ª p.3). Al publicar 3.2, enlazar desde ahí.

## Resumen

| # | Fuente | Contenido | Método |
|---|---|---|---|
| 1 | Feb. 2018 (tipo A), ejercicio 3 | Base del núcleo de $f(x,y,z)=(x,y-z,0)$ | A |
| 2 | Sept. 2019 (tipo A), ejercicio 3 | Base del núcleo de $f:\mathbb R^4\to\mathbb R^4$ | A |
| 3 | Feb. 2026 (2.ª sem.), problema 7 (3.er apartado) | Base del núcleo con la escalonada reducida | A |
| 4 | Sept. 2025, pregunta 3 | $a,b$ para que $(10,a,b)\in\operatorname{Nuc}f$ | A |
| 5 | Sept. 2017 (tipo A), problema b) | Cartesianas del núcleo y dim. de la imagen, $f:\mathbb R^2\to\mathbb R^3$ | A + D |
| 6 | Feb. 2023 (2.ª sem.), pregunta 3 | Núcleo e imagen de $f(x,y)=(5x+3y,5x+3y)$ | B |
| 7 | Sept. 2022, ejercicio 3 | Imagen y dim. del núcleo de $f(x_1,x_2)=(2x_1,-x_1)$ | B |
| 8 | Feb. 2025 (1.ª sem.), problema 7 (2.º apartado) | Núcleo e imagen de $g:\mathbb R^3\to\mathbb R^2$ | B |
| 9 | Sept. 2023, problema 7 | Núcleo, imagen y un subespacio propio de la imagen (implícitas) | B |
| 10 | Feb. 2019 (tipo A), problema a) | Cartesianas y dimensiones de núcleo e imagen dada la matriz | B |
| 11 | Feb. 2024 (1.ª sem.), pregunta 3 | V/F: $\operatorname{Im}f\subset$ plano $5x-2y+10z=0$ | B |
| 12 | Feb. 2017 (2.ª sem., tipo A), problema c) | Núcleo e imagen de la derivada en $\wp_2$ | C |
| 13 | Feb. 2023 (1.ª sem.), problema 7 (i) | Núcleo e imagen de la derivada tercera $\wp_4\to\wp_1$ | C |
| 14 | Feb. 2022 (tipo A), ejercicio 3 | Núcleo e imagen de $f:\mathbb R^2\to D_{2\times2}$ | C |
| 15 | Sept. 2018 (tipo A), problema b) | Paramétricas del núcleo y dim. de la imagen, $f:\mathbb R^3\to\mathcal M_{2\times2}$ | C |
| 16 | Feb. 2020 (1.ª sem., tipo B), ejercicio 3 | Rango de $A_{3\times5}$ sabiendo $\operatorname{Dim}\operatorname{Nuc}=3$ | D |
| 17 | Sept. 2025, pregunta 2 | Dim. de la imagen de un endomorfismo de $\wp_3$ | D |
| 18 | Feb. 2026 (1.ª sem.), problema 7 | $\operatorname{Im}g$, $\operatorname{Nuc}(g\circ f)$, teorema de las dimensiones | D |
| 19 | Feb. 2024 (2.ª sem.), problema 7 | $\operatorname{Im}f$, $\operatorname{Nuc}(f\circ f)$, teorema de las dimensiones | D |
| 20 | Feb. 2019 (tipo B), problema c) | Si $\operatorname{Nuc}f=\{0\}$, $f$ conserva sistemas libres | E |

Métodos: **A** = núcleo como sistema homogéneo; **B** = núcleo e imagen a la vez en $\mathbb R^n$ (imagen generada por las columnas); **C** = núcleo e imagen en espacios de polinomios o matrices (trabajar con coordenadas); **D** = teorema de las dimensiones (Teor. 3.1) y rango; **E** = núcleo trivial (demostración).

**Errores u omisiones en las soluciones oficiales** (detalle en cada ejercicio):
- Feb. 2026 (2.ª sem.) p.7: errata en los parámetros («$y=\lambda$, $z=\beta$» debe ser $y=\lambda$, $t=\beta$; el resultado final es correcto).
- Sept. 2018 (A) pb): las «paramétricas» oficiales del núcleo son $x=0,\ y=0,\ z=1$ (un punto, no una recta): debe ser $z=\lambda$, $\lambda\in\mathbb R$.
- Sept. 2017 (A) pb): errata en la 1.ª ecuación del núcleo ($x_1+x_2=0$ debe ser $x_1+2x_2=0$); además no simplifica: el núcleo es $\{0\}$.
- Feb. 2019 (B) pc): la demostración supone $f(\bar v_1)=\alpha f(\bar v_2)$ sin cubrir el caso $f(\bar v_2)=\bar 0$.
- Feb. 2024 (2.ª sem.) p.7: no escribe explícitamente $\operatorname{Dim}\operatorname{Nuc}(f\circ f)=0$, que es lo que se pide.
- Feb. 2024 (1.ª sem.) p.3: el «fallo recurrente» oficial pide justificar la inclusión contraria (plano ⊂ imagen), que no es lo que pregunta el enunciado.
- Feb. 2019 (A) pa): no resuelve el sistema del núcleo (no da base ni elimina la ecuación redundante).

---

## Fronterizos (no se desarrollan aquí)

| Fuente | Contenido | Tema real |
|---|---|---|
| Feb. 2019 (tipo B), ejercicio 3 | $f(1,2),f(2,1)$ dados → $f(1,1)$ | **3.1** (linealidad; propiedad 3, U p.103) |
| Feb. 2024 (2.ª sem.), pregunta 3 | $f(1,3),f(-4,2)$ → $f(0,42)$ | **3.1** |
| Feb. 2025 (2.ª sem.), pregunta 3 | $f:\mathbb R^2\to\mathcal M_{2\times2}$, hallar $f(-7,0)$ | **3.1** |
| Feb. 2026 (2.ª sem.), pregunta 3 | $f:\mathcal M_{2\times2}\to\mathbb R^3$, hallar $f\begin{pmatrix}5&0\\4&6\end{pmatrix}$ | **3.1** |
| Feb. 2025 (1.ª sem.), problema 7 (1.er apartado) | ¿$f(x)=(x,2+x,3x,4x,5x)$ es lineal? ($f(0)\ne0$) | **3.1** |
| Feb. 2018 (tipo B), ejercicio 3 | Matriz en canónicas con $f(1,2)$, $f(2,0)$ | **3.3** |
| Feb. 2019 (tipo A), ejercicio 3 | Matriz asociada en bases no canónicas | **3.3** |
| Ene. 2022 (tipo A), ejercicio 3 | Matriz de $f$ en la canónica conocidas las imágenes de una base | **3.3** |
| Feb. 2026 (1.ª sem.), pregunta 2 | Rango de la matriz asociada ($f(u_3)=0$) | **3.3** (de paso: $\operatorname{rang}=1=\operatorname{Dim}\operatorname{Im}f$ y $\operatorname{Dim}\operatorname{Nuc}f=2$; puede citarse en 3.2 como enlace) |
| Feb. 2026 (2.ª sem.), problema 7 (apartados 1 y 2) | Matriz asociada y escalonada reducida | **3.3** / **1.2** (el 3.er apartado se desarrolla aquí, ej. 3) |
| Feb. 2023 (1.ª sem.), problema 7 (ii) | Expresión matricial ($2\times5$) de la derivada tercera | **3.3** (el (i) se desarrolla aquí, ej. 13) |
| Sept. 2017 (tipo A), ejercicio 3 | V/F: matriz depende de las bases; todas las lineales son endomorfismos; matrices de cambio de base singulares | **3.3/3.5** |
| Ene. 2020 (tipo A), ejercicio 3; Sept. 2018 (tipo A), ejercicio 3; Feb. 2023 (1.ª sem.), pregunta 3; Sept. 2024, pregunta 3; Sept. 2023, pregunta 3 ($3g-5h$); Feb. 2025 (1.ª sem.), problema 7 (3.er apartado, $h\circ g$) | Composición / combinación lineal de aplicaciones y su matriz | **3.4** |
| Feb. 2026 (2.ª sem.), problema 8 | Matriz en otra base y diagonalización | **3.5 / 4.3** |
| Feb. 2018 (tipo B), problema a) | Vectores propios de la derivada en $\wp_2$ (son los del núcleo, $\lambda=0$) | **4.2** (enlazar con el ej. 12 de este dossier: misma aplicación) |
| Feb. 2020 (1.ª sem., tipo B), ejercicio 4 | Endomorfismo cuyo subespacio propio de $\lambda=0$ es el plano $x+y-2z=0$ | **4.2** (equivale a «$\operatorname{Nuc}f=$ ese plano»; buen enlace con 3.2) |
| Sept. 2017 (tipo A), ejercicio 4; Sept. 2019 (tipo A), problema a) | Diagonalización / vectores propios | **4.x** (en Sept. 2017 ej. 4 la opción C «rango 3» es falsa porque $\operatorname{rang}=\operatorname{Dim}\operatorname{Im}\le2$) |

---

## Método A — El núcleo es la solución de un sistema homogéneo

**Idea común.** Por la Def. 3.3 (U p.109), $v\in\operatorname{Nuc}f\iff f(v)=0$. Si $f$ viene dada por fórmulas (o por su matriz $A$ en las bases canónicas), eso es el sistema homogéneo $AX=0$. Se escalona, se cuentan las incógnitas libres ($=\operatorname{Dim}V-\operatorname{rang}A$, Rouché) y se escribe la solución general como combinación lineal de vectores fijos: esos vectores son una base del núcleo.

### 1. Feb. 2018 (tipo A), ejercicio 3 (1 punto)

**Enunciado (literal).** Halle una base del subespacio núcleo de la aplicación lineal $f:\mathbb R^3\to\mathbb R^3$ definida por $f(x,y,z)=(x,\ y-z,\ 0)$.

**Solución paso a paso.**
1. **Plantear la definición.** $(x,y,z)\in\operatorname{Nuc}f\iff f(x,y,z)=(0,0,0)$ (Def. 3.3, U p.109), es decir, igualar componente a componente:
   $$x=0,\qquad y-z=0,\qquad 0=0.$$
   La tercera ecuación se cumple siempre: no impone nada.
2. **Contar libertad.** Quedan 2 ecuaciones independientes (cada una contiene una incógnita que no está en la otra) en 3 incógnitas: $3-2=1$ parámetro. El núcleo es una recta.
3. **Resolver.** Tomamos $z=\lambda$ (libre); entonces $y=\lambda$, $x=0$:
   $$(x,y,z)=(0,\lambda,\lambda)=\lambda(0,1,1),\quad\lambda\in\mathbb R.$$
4. **Base.** $\operatorname{Nuc}f=\langle(0,1,1)\rangle$; un único vector no nulo es un sistema libre (Def. 2.6, U p.74), luego **$\{(0,1,1)\}$ es base** y $\operatorname{Dim}\operatorname{Nuc}f=1$.
5. **Comprobación.** $f(0,1,1)=(0,1-1,0)=(0,0,0)$ ✓. Y con el Teor. 3.1 (U p.111): $\operatorname{Im}f=\{(x,y-z,0)\}=\langle(1,0,0),(0,1,0)\rangle$ tiene dimensión 2, y $1+2=3=\operatorname{Dim}\mathbb R^3$ ✓.

*(sympy: `Matrix([[1,0,0],[0,1,-1],[0,0,0]]).nullspace()` → $[(0,1,1)]$, rango 2.)*

**Receta.** Núcleo = «imagen igual a cero»: iguala cada componente de $f$ a $0$, resuelve el sistema homogéneo y escribe la solución como $\lambda_1u_1+\dots$; los $u_i$ son base.
**Error típico.** Dar como «base» el vector $(0,0,0)$ o las ecuaciones $x=0,\ y=z$ (eso son cartesianas, no una base); o descartar la ecuación $0=0$ sin darse cuenta de que deja $z$ libre.
**Sobre la oficial.** Correcta y breve.

### 2. Sept. 2019 (tipo A), ejercicio 3 (1 punto)

**Enunciado (literal).** Dada la aplicación lineal $f:\mathbb R^4\to\mathbb R^4$ definida por $f(x,y,z,t)=(2x,\ x-y+z+t,\ 2y-z,\ x+y+t)$, se pide hallar una base del núcleo.

**Solución paso a paso.**
1. **Sistema del núcleo** (Def. 3.3):
   $$2x=0,\qquad x-y+z+t=0,\qquad 2y-z=0,\qquad x+y+t=0.$$
2. **Resolver por sustitución** (las ecuaciones son muy sencillas): de la 1.ª, $x=0$. De la 3.ª, $z=2y$. De la 4.ª (con $x=0$), $t=-y$.
3. **Comprobar la ecuación que queda.** La 2.ª: $0-y+2y-y=0$, que se cumple para todo $y$. Es **redundante** (combinación de las otras), así que el rango del sistema es 3, no 4, y hay $4-3=1$ parámetro.
4. **Solución general.** Con $y=\lambda$: $(x,y,z,t)=(0,\lambda,2\lambda,-\lambda)=\lambda(0,1,2,-1)$.
5. **Base:** $\{(0,1,2,-1)\}$, $\operatorname{Dim}\operatorname{Nuc}f=1$. Comprobación: $f(0,1,2,-1)=(0,\ 0-1+2-1,\ 2-2,\ 0+1-1)=(0,0,0,0)$ ✓. Por el Teor. 3.1, $\operatorname{Dim}\operatorname{Im}f=4-1=3$.

*(sympy: rango 3, núcleo $\langle(0,-1,-2,1)\rangle$, proporcional ✓.)*

**Receta.** Si alguna ecuación da directamente una incógnita, sustituye en cascada; la ecuación que «sobra» hay que **comprobarla** (si se cumple siempre, es redundante y por eso aparece un parámetro).
**Error típico.** Contar 4 ecuaciones ⇒ «núcleo $\{0\}$» sin mirar el rango.
**Sobre la oficial.** Correcta (da $(0,\lambda,2\lambda,-\lambda)$; conviene escribir explícitamente la base $\{(0,1,2,-1)\}$, que es lo pedido).

### 3. Feb. 2026 (2.ª sem.), problema 7 — 3.er apartado (0.5 puntos)

**Enunciado (literal).** Sea $f(x,y,z,t)=(x+2y-z+3t,\ 2x+4y+6t,\ -x-2y+z-3t)$ una aplicación lineal de $\mathbb R^4$ en $\mathbb R^3$. Halle la matriz $A$ asociada a $f$ (0.5 PUNTOS). Halle la forma escalonada reducida de $A$ (1 PUNTO). Calcule una base de $\operatorname{Nuc}(f)$ (0.5 PUNTOS).

*(Los dos primeros apartados son de 3.3 y 1.2; se resumen como datos.)* $A=\begin{pmatrix}1&2&-1&3\\2&4&0&6\\-1&-2&1&-3\end{pmatrix}$ y, con $F_2\to F_2-2F_1$, $F_3\to F_3+F_1$, $F_2\to\tfrac12F_2$, $F_1\to F_1+F_2$:
$$A_e=\begin{pmatrix}1&2&0&3\\0&0&1&0\\0&0&0&0\end{pmatrix}.$$

**Solución paso a paso (apartado de 3.2).**
1. **Por qué sirve la escalonada.** $\operatorname{Nuc}f=\{v: Av=0\}$ y las operaciones elementales por filas no cambian las soluciones de un sistema (U §1.4), así que $Av=0\iff A_ev=0$:
   $$x+2y+3t=0,\qquad z=0.$$
2. **Incógnitas libres.** Las columnas con pivote son la 1.ª ($x$) y la 3.ª ($z$); las otras, $y$ y $t$, son libres: $4-\operatorname{rang}A=4-2=2$ parámetros.
3. **Solución general.** $y=\lambda$, $t=\beta$; entonces $z=0$ y $x=-2\lambda-3\beta$:
   $$(x,y,z,t)=\lambda(-2,1,0,0)+\beta(-3,0,0,1).$$
4. **Base.** Los dos vectores generan el núcleo y son libres (en la 2.ª coordenada uno tiene 1 y el otro 0, en la 4.ª al revés; ninguno es múltiplo del otro): **$\{(-2,1,0,0),(-3,0,0,1)\}$**, $\operatorname{Dim}\operatorname{Nuc}f=2$.
5. **Comprobación.** $f(-2,1,0,0)=(-2+2,\,-4+4,\,2-2)=0$ ✓; $f(-3,0,0,1)=(-3+3,\,-6+6,\,3-3)=0$ ✓. Teor. 3.1: $\operatorname{Dim}\operatorname{Im}f=4-2=2=\operatorname{rang}A$ ✓.

*(sympy: `rref` coincide; `nullspace` → $(-2,1,0,0)$, $(-3,0,0,1)$.)*

**Receta.** Con la escalonada reducida: las incógnitas **sin pivote** son los parámetros; despeja las de pivote y separa la solución por parámetros: cada parámetro da un vector de la base.
**Error típico.** Tomar como parámetro una incógnita con pivote (aquí $z$, que vale 0 obligatoriamente).
**Sobre la oficial.** Resultado correcto, pero con **errata**: escribe «haciendo $y=\lambda$, $z=\beta$ … obtenemos $x=-2\lambda-3\beta$, $z=0$» (contradictorio): el segundo parámetro es $t=\beta$.

### 4. Sept. 2025, pregunta 3 (1 punto)

**Enunciado (literal).** Sea $f:\mathbb R^3\to\mathbb R^3$ una aplicación lineal cuya matriz asociada es $M=\begin{pmatrix}1&2&1\\2&4&3\\3&6&4\end{pmatrix}$. Halle $a,b\in\mathbb R$ de manera que el vector $(10,a,b)$ pertenezca al núcleo de $f$.

**Solución paso a paso.**
1. **Condición de pertenencia.** $(10,a,b)\in\operatorname{Nuc}f\iff M\begin{pmatrix}10\\a\\b\end{pmatrix}=0$ (Def. 3.3):
   $$10+2a+b=0,\qquad 20+4a+3b=0,\qquad 30+6a+4b=0.$$
   Son 3 ecuaciones con 2 incógnitas ($a,b$): no hay garantía de solución, hay que comprobar las tres.
2. **Resolver.** 2.ª $-2\cdot$1.ª: $b=0$. Entonces $a=-5$.
3. **Comprobar la 3.ª.** $30+6(-5)+4\cdot0=0$ ✓. Solución única: **$a=-5,\ b=0$**.
4. **Vía alternativa (más «3.2»).** Hallar antes el núcleo: $M$ tiene rango 2 ($F_3=F_1+F_2$), así que $\operatorname{Dim}\operatorname{Nuc}f=3-2=1$; de $x+2y+z=0$ y $2x+4y+3z=0$ sale $z=0$, $x=-2y$: $\operatorname{Nuc}f=\langle(-2,1,0)\rangle$. Entonces $(10,a,b)=\mu(-2,1,0)$ obliga a $\mu=-5$, $a=-5$, $b=0$.

*(sympy: `solve` → $a=-5,b=0$; `nullspace` → $(-2,1,0)$.)*

**Receta.** «¿Para qué parámetros está $v$ en el núcleo?» → impón $Av=0$ y resuelve; o halla una base del núcleo y exige que $v$ sea combinación de ella.
**Error típico.** Resolver solo dos ecuaciones y no comprobar la tercera.
**Sobre la oficial.** Correcta (no comenta que la 3.ª ecuación hay que comprobarla).

### 5. Sept. 2017 (tipo A), problema b) (2 puntos)

**Enunciado (literal).** Estudie si la aplicación lineal $f:\mathbb R^2\to\mathbb R^3$ definida por las ecuaciones $y_1=x_1+2x_2,\ y_2=x_1-x_2,\ y_3=5x_1+4x_2$ es diagonalizable (1 punto). Escriba las ecuaciones cartesianas del subespacio núcleo (0.5 puntos) y halle la dimensión del subespacio imagen (0.5 puntos).

**Solución paso a paso.**
1. **¿Diagonalizable?** (tema 4) Solo tiene sentido para endomorfismos ($V=W$, matriz cuadrada). Aquí $f:\mathbb R^2\to\mathbb R^3$, con matriz $3\times2$: **la pregunta no tiene sentido; no es diagonalizable**.
2. **Núcleo** (Def. 3.3): $(x_1,x_2)\in\operatorname{Nuc}f\iff$
   $$x_1+2x_2=0,\qquad x_1-x_2=0,\qquad 5x_1+4x_2=0.$$
   Restando las dos primeras: $3x_2=0\Rightarrow x_2=0\Rightarrow x_1=0$; la 3.ª se cumple. El único vector es $(0,0)$: $\operatorname{Nuc}f=\{0\}$, $\operatorname{Dim}\operatorname{Nuc}f=0$ (convenio de U p.112). Cartesianas (simplificadas): **$x_1=0,\ x_2=0$** (equivalentes a las tres de arriba).
3. **Dimensión de la imagen** (Teor. 3.1): $\operatorname{Dim}\operatorname{Im}f=\operatorname{Dim}\mathbb R^2-\operatorname{Dim}\operatorname{Nuc}f=2-0=\mathbf 2$.
4. **Comprobación directa** (Ej. 3.9, U p.107): $f(x_1,x_2)=x_1(1,1,5)+x_2(2,-1,4)$, luego $\operatorname{Im}f=\langle(1,1,5),(2,-1,4)\rangle$, dos vectores no proporcionales ⇒ dimensión 2 ✓. (Además, su cartesiana es $3y_1+2y_2-y_3=0$.)

*(sympy: rango 2, `nullspace` vacío, cartesiana de la imagen $(-3,-2,1)$ ✓.)*

**Receta.** Si te piden la dimensión de la imagen y ya tienes el núcleo, usa $\operatorname{Dim}\operatorname{Im}=\operatorname{Dim}V-\operatorname{Dim}\operatorname{Nuc}$ (¡$V$ = espacio **inicial**!).
**Error típico.** Restar de $\operatorname{Dim}W=3$ (espacio final) en lugar de $\operatorname{Dim}V=2$; contestar «diagonalizable» sin notar que no es un endomorfismo.
**Sobre la oficial.** Correcta en dimensión y en la observación «no es un endomorfismo», pero con **errata**: la primera cartesiana del núcleo aparece como $x_1+x_2=0$ (debe ser $x_1+2x_2=0$), y no concluye que el núcleo es $\{0\}$.

---

## Método B — Núcleo e imagen a la vez en $\mathbb R^n$

**Idea común.** (i) Núcleo: método A. (ii) Imagen: por linealidad, $f(x_1,\dots,x_m)=x_1f(e_1)+\dots+x_mf(e_m)$ (propiedad 3, U p.103; Ej. 3.9, U p.107), así que **las columnas de la matriz generan la imagen**; se suprimen las dependientes (Teor. 2.1, U p.79) y su número es la dimensión (Teor. 2.5, U p.88). (iii) Cartesianas de la imagen: eliminar parámetros o imponer $\det(\text{vector genérico},\text{base})=0$ / rango (U §2.2 p.71). (iv) Control: $\operatorname{Dim}\operatorname{Nuc}+\operatorname{Dim}\operatorname{Im}=\operatorname{Dim}V$ (Teor. 3.1).

### 6. Feb. 2023 (2.ª sem.), pregunta 3 (1 punto)

**Enunciado (literal).** Describa los subespacios núcleo e imagen de la aplicación lineal $f:\mathbb R^2\to\mathbb R^2$, definida por $f(x,y)=(5x+3y,\ 5x+3y)$.

**Solución paso a paso.**
1. **Núcleo.** $f(x,y)=(0,0)\iff 5x+3y=0$ (las dos componentes dan la misma ecuación). Una ecuación en $\mathbb R^2$: recta. Con $x=3\lambda$: $y=-5\lambda$. $\operatorname{Nuc}f=\{(x,y):5x+3y=0\}=\langle(3,-5)\rangle$, dimensión 1.
2. **Imagen.** $f(x,y)=(5x+3y)\,(1,1)$: toda imagen es múltiplo de $(1,1)$, y todo múltiplo $c(1,1)$ es imagen (p. ej. de $(c/5,0)$). $\operatorname{Im}f=\langle(1,1)\rangle=\{(u,v):u=v\}$, dimensión 1.
3. **Control** (Teor. 3.1): $1+1=2=\operatorname{Dim}\mathbb R^2$ ✓.

*(sympy: rango 1; núcleo $\langle(-3/5,1)\rangle$; imagen $\langle(5,5)\rangle$, cartesiana $-u+v=0$ ✓.)*

**Receta.** Si todas las componentes de $f$ son la misma expresión (o múltiplos), saca factor común: $f(v)=(\text{escalar})\cdot w$ ⇒ $\operatorname{Im}f=\langle w\rangle$.
**Error típico.** Llamar con las mismas letras $x,y$ a las coordenadas del espacio inicial (núcleo) y del final (imagen) y mezclarlas: el núcleo vive en el inicial, la imagen en el final.
**Sobre la oficial.** Correcta ($\langle(1,-5/3)\rangle$ es el mismo núcleo).

### 7. Sept. 2022, ejercicio 3 (1 punto)

**Enunciado (literal).** Si $f:\mathbb R^2\to\mathbb R^2$ es un endomorfismo de $\mathbb R^2$ definido como $f(x_1,x_2)=(2x_1,-x_1)$, hallar el subespacio imagen y la dimensión del subespacio núcleo.

**Solución paso a paso.**
1. **Núcleo.** $2x_1=0,\ -x_1=0\iff x_1=0$ ($x_2$ libre): $\operatorname{Nuc}f=\{x_1=0\}=\langle(0,1)\rangle$, **$\operatorname{Dim}\operatorname{Nuc}f=1$**.
2. **Imagen.** $f(x_1,x_2)=x_1(2,-1)+x_2(0,0)$, luego $\operatorname{Im}f=\langle(2,-1)\rangle$ (dimensión 1). Cartesiana: un vector $(y_1,y_2)=\alpha(2,-1)$ cumple $y_1=-2y_2$, es decir **$y_1+2y_2=0$**.
3. **Control.** $1+1=2$ ✓ (la oficial usa esto para deducir la dimensión de la imagen).

*(sympy: núcleo $\langle(0,1)\rangle$, imagen $\langle(2,-1)\rangle$, cartesiana $(1/2,1)\propto(1,2)$ ✓.)*

**Receta.** La imagen está generada por los vectores que multiplican a cada variable; las columnas nulas no aportan.
**Error típico.** Concluir que el núcleo es $\{0\}$ porque «$x_1=0$»: falta ver que $x_2$ queda libre.
**Sobre la oficial.** Correcta; escribe «$x_1(2,-1)=\langle(2,-1)\rangle$» (un vector igualado a un subespacio: abuso de notación; lo correcto es $\operatorname{Im}f=\{x_1(2,-1)\}=\langle(2,-1)\rangle$).

### 8. Feb. 2025 (1.ª sem.), problema 7 — 2.º apartado (1 punto)

**Enunciado (literal).** Consideremos las aplicaciones $f:\mathbb R\to\mathbb R^5$, $g:\mathbb R^3\to\mathbb R^2$ y $h:\mathbb R^2\to\mathbb R^4$ definidas por $f(x)=(x,2+x,3x,4x,5x)$, $g(x,y,z)=(x+y+z,\ -5x-5y-5z)$ y $h(x,y)=(4x-5y,\ y,\ x,\ -3x+7y)$. Indique de manera razonada si $f$ es aplicación lineal (1 PUNTO). **Calcule los subespacios núcleo e imagen asociados a $g$ e indique la dimensión de dichos subespacios (1 PUNTO).** Calcule la matriz asociada a la aplicación lineal $h\circ g$ (1 PUNTO). *(1.er apartado → 3.1; 3.er → 3.4.)*

**Solución paso a paso (2.º apartado).**
1. **Imagen.** $g(x,y,z)=(x+y+z)\,(1,-5)$. Las columnas de la matriz $\begin{pmatrix}1&1&1\\-5&-5&-5\end{pmatrix}$ son las tres $(1,-5)$: por supresión (Teor. 2.1) $\operatorname{Im}g=\langle(1,-5)\rangle$, **dimensión 1**. Cartesiana: $(u,v)=\alpha(1,-5)\Rightarrow v=-5u$, es decir $5u+v=0$.
2. **Núcleo.** $x+y+z=0$ y $-5(x+y+z)=0$: es una sola ecuación (la 2.ª es $-5$ veces la 1.ª). Plano de $\mathbb R^3$: $3-1=2$ parámetros. Con $x=\alpha$, $y=\beta$: $z=-\alpha-\beta$, $(x,y,z)=\alpha(1,0,-1)+\beta(0,1,-1)$. Base $\{(1,0,-1),(0,1,-1)\}$, **dimensión 2**.
3. **Control.** $2+1=3=\operatorname{Dim}\mathbb R^3$ ✓.

*(sympy: rango 1; núcleo $\langle(-1,1,0),(-1,0,1)\rangle$ (mismo plano); cartesiana de la imagen $(5,1)$ ✓.)*

**Receta.** Si las filas de la matriz son proporcionales, el núcleo lo da **una** ecuación y la imagen es una recta.
**Error típico.** Contar dos ecuaciones para el núcleo y decir que es una recta.
**Sobre la oficial.** Correcta.

### 9. Sept. 2023, problema 7 (2 puntos)

**Enunciado (literal).** Consideremos la aplicación lineal $f:\mathbb R^3\to\mathbb R^3$ definida por $f(x,y,z)=(5z,\ x+2y,\ 3x+6y)$. Calcule los subespacios núcleo e imagen asociados a $f$ e indique la dimensión de dichos subespacios (1 PUNTO). Calcule un subespacio propio de la imagen de $f$ y expréselo en forma implícita (1 PUNTO).

**Solución paso a paso.**
1. **Matriz** (columnas = $f(e_1),f(e_2),f(e_3)$): $A=\begin{pmatrix}0&0&5\\1&2&0\\3&6&0\end{pmatrix}$.
2. **Núcleo.** $5z=0$, $x+2y=0$, $3x+6y=0$ (la 3.ª es $3\cdot$ la 2.ª). Rango 2 ⇒ 1 parámetro: $z=0$, $x=-2y$; con $y=\lambda$: $\operatorname{Nuc}f=\langle(-2,1,0)\rangle$, **dimensión 1**.
3. **Imagen.** Columnas $(0,1,3)$, $(0,2,6)=2(0,1,3)$, $(5,0,0)$. Suprimiendo la 2.ª (Teor. 2.1): $\operatorname{Im}f=\langle(0,1,3),(5,0,0)\rangle$, libres (no proporcionales) ⇒ **dimensión 2**. Control: $1+2=3$ ✓.
4. **Cartesiana de la imagen** (útil para el apartado 2). $(x,y,z)\in\operatorname{Im}f\iff\operatorname{rang}\{(x,y,z),(0,1,3),(5,0,0)\}=2\iff$
   $$\det\begin{pmatrix}x&y&z\\0&1&3\\5&0&0\end{pmatrix}=15y-5z=0\iff 3y-z=0.$$
5. **Subespacio propio de $\operatorname{Im}f$.** En U (§2.1 p.63) un subespacio **propio** es uno distinto de $\{0\}$ y del total. Como $\operatorname{Dim}\operatorname{Im}f=2$, los propios son los de dimensión 1: rectas contenidas en el plano $3y-z=0$. Por ejemplo $L=\langle(1,0,0)\rangle$ ($=\langle(5,0,0)\rangle$), que está en $\operatorname{Im}f$ porque $(5,0,0)$ es un generador. **Forma implícita**: una recta de $\mathbb R^3$ necesita $3-1=2$ ecuaciones: $L:\ y=0,\ z=0$. (Otro válido: $\langle(0,1,3)\rangle:\ x=0,\ z-3y=0$.)

*(sympy: rango 2; núcleo $\langle(-2,1,0)\rangle$; imagen $\langle(0,1,3),(5,0,0)\rangle$, cartesiana $(0,-3,1)$ ✓.)*

**Receta.** Para un subespacio dentro de la imagen, toma uno (o parte) de sus generadores y pásalo a implícitas: en $\mathbb R^n$ un subespacio de dimensión $k$ lleva $n-k$ ecuaciones independientes.
**Error típico.** (a) Confundir «subespacio propio» (U p.63) con «subespacio propio asociado a un valor propio» (U Def. 4.8 p.152), que es otra cosa (tema 4). (b) Dar una recta de $\mathbb R^3$ con una sola ecuación (eso es un plano).
**Sobre la oficial.** Correcta; no da la cartesiana de $\operatorname{Im}f$ ni comprueba que la recta elegida está contenida (es inmediato porque $(5,0,0)$ es generador). Interpreta «propio» como en U p.63, que es lo correcto.

### 10. Feb. 2019 (tipo A), problema a) (1 punto)

**Enunciado (literal).** Si $\begin{pmatrix}1&2&1\\4&3&0\\5&5&1\end{pmatrix}$ es la matriz asociada a un endomorfismo, calcular las ecuaciones cartesianas y dimensiones de los subespacios núcleo e imagen.

**Solución paso a paso.**
1. **Rango.** $F_3=F_1+F_2$ ($1+4=5$, $2+3=5$, $1+0=1$) y $F_1,F_2$ no son proporcionales ⇒ $\operatorname{rang}A=2$.
2. **Dimensiones.** $\operatorname{Dim}\operatorname{Im}f=\operatorname{rang}A=2$ (las columnas generan la imagen y su rango es su dimensión: Ej. 3.9 + Teor. 2.5) y, por el Teor. 3.1, $\operatorname{Dim}\operatorname{Nuc}f=3-2=1$.
3. **Cartesianas del núcleo.** $AX=0$; quitando la ecuación redundante ($F_3$):
   $$\operatorname{Nuc}f:\ \begin{cases}x+2y+z=0\\4x+3y=0\end{cases}$$
   (dos ecuaciones independientes en $\mathbb R^3$ ⇒ recta, coherente con dimensión 1). Resolviéndolas: $y=-\tfrac43x$; con $x=3\lambda$, $y=-4\lambda$, $z=-x-2y=5\lambda$: $\operatorname{Nuc}f=\langle(3,-4,5)\rangle$.
4. **Cartesiana de la imagen.** Columnas $(1,4,5),(2,3,5),(1,0,1)$, de rango 2; $(2,3,5)$ y $(1,0,1)$ son libres ⇒ base. $(x,y,z)\in\operatorname{Im}f\iff$
   $$\det\begin{pmatrix}x&y&z\\2&3&5\\1&0&1\end{pmatrix}=x(3)-y(2-5)+z(0-3)=3x+3y-3z=0\iff x+y-z=0.$$
   Comprobación: $(1,4,5)$: $1+4-5=0$ ✓.

*(sympy: rango 2; núcleo $\langle(3/5,-4/5,1)\rangle\propto(3,-4,5)$; cartesiana de la imagen $(-1,-1,1)$ ✓.)*

**Receta.** Rango → las dos dimensiones. Núcleo: las filas independientes de $A$ **son** sus cartesianas. Imagen: base de columnas + determinante con el vector genérico.
**Error típico.** Dar las tres ecuaciones del núcleo sin quitar la redundante y concluir «núcleo $\{0\}$».
**Sobre la oficial.** Correcta en dimensiones y en la cartesiana de la imagen; para el núcleo solo dice «se deducen de $AX=0$» sin eliminar la ecuación dependiente ni dar el generador.

### 11. Feb. 2024 (1.ª sem.), pregunta 3 (1 punto)

**Enunciado (literal).** Sea $f:\mathbb R^2\to\mathbb R^3$ una aplicación lineal que verifica $f(1,0)=(0,5,1)$ y $f(0,1)=(-2,0,1)$. Justifique de manera razonada si la siguiente afirmación es verdadera o falsa: la imagen por $f$ de cualquier vector de $\mathbb R^2$ pertenece al plano $5x-2y+10z=0$.

**Solución paso a paso.**
1. **Qué se pregunta.** Si $\operatorname{Im}f\subset\Pi$, con $\Pi=\{5x-2y+10z=0\}$.
2. **Forma de las imágenes.** Por linealidad (propiedad 3, U p.103): $f(u,v)=u\,f(1,0)+v\,f(0,1)=u(0,5,1)+v(-2,0,1)$. Así $\operatorname{Im}f=\langle(0,5,1),(-2,0,1)\rangle$ (Ej. 3.10, U p.108).
3. **Los generadores están en $\Pi$.** $(0,5,1)$: $0-10+10=0$ ✓. $(-2,0,1)$: $-10-0+10=0$ ✓.
4. **Conclusión.** $\Pi$ es un subespacio (ecuación homogénea), luego contiene toda combinación lineal de vectores suyos; por el paso 2, toda imagen es combinación de esos dos: **Verdadero**.
5. **Algo más (no pedido).** Como los dos generadores son libres, $\operatorname{Dim}\operatorname{Im}f=2=\operatorname{Dim}\Pi$, así que de hecho $\operatorname{Im}f=\Pi$ (Teor. 2.6). Eliminando parámetros en $x=-2\beta,\ y=5\alpha,\ z=\alpha+\beta$: $\alpha=y/5$, $\beta=-x/2$, $z=y/5-x/2\iff 5x-2y+10z=0$.

*(sympy: cartesiana de la imagen $(1/2,-1/5,1)\cdot10=(5,-2,10)$ ✓.)*

**Receta.** «¿$\operatorname{Im}f\subset S$?» (con $S$ subespacio): basta comprobar que las imágenes de una base de $V$ están en $S$.
**Error típico.** Comprobar solo los dos vectores y no decir **por qué** basta (linealidad + $S$ subespacio).
**Sobre la oficial.** Correcta (halla la cartesiana de la imagen). Su «fallo recurrente» («no basta comprobar que $(0,5,1)$ y $(-2,0,1)$ pertenecen al plano… hay que justificar que cualquier vector del plano es c.l. de ellos») es engañoso: eso prueba $\Pi\subset\operatorname{Im}f$, que no se pregunta; lo que falta en la respuesta del alumno típico es el argumento del paso 4.

---

## Método C — Núcleo e imagen en espacios de polinomios o de matrices

**Idea común.** Igual que en $\mathbb R^n$, pero trabajando con los coeficientes (coordenadas en la base canónica $\{1,x,x^2,\dots\}$ o en la base de matrices elementales). El núcleo se obtiene igualando a **cero el polinomio/matriz nulo** (todos los coeficientes a 0); la imagen, escribiendo $f(v)$ como combinación lineal de polinomios/matrices fijos (Ej. 3.11, U p.108-109; Ej. 3.8 y 3.12, U p.106-110).

### 12. Feb. 2017 (2.ª sem., tipo A), problema c) (2 puntos)

**Enunciado (literal).** Hallar las ecuaciones del subespacio $\operatorname{Im}(f)$ (1 pto.) y del subespacio $\operatorname{Nuc}(f)$ (1 pto.) del endomorfismo $f$ de $\wp_2(x)$ (polinomios reales de grado menor o igual a 2) definido por la derivada, es decir, $f(a+bx+cx^2)=b+2cx$ para $a+bx+cx^2\in\wp_2(x)$.

**Solución paso a paso.** Coordenadas en la base $\{1,x,x^2\}$: $a+bx+cx^2\leftrightarrow(a,b,c)$.
1. **Núcleo.** $f(p)=0$ (polinomio nulo) $\iff b+2cx=0+0x\iff b=0,\ 2c=0$. Ecuaciones: **$b=0,\ c=0$**; $a$ libre. $\operatorname{Nuc}f=\{a: a\in\mathbb R\}=\langle1\rangle$ (los constantes), dimensión 1.
2. **Imagen.** $f(a+bx+cx^2)=b\cdot1+c\cdot(2x)$: generada por $\{1,2x\}$, libres ⇒ $\operatorname{Im}f=\langle1,x\rangle=\wp_1$, dimensión 2. Como subespacio de $\wp_2$ (espacio final) un polinomio $a'+b'x+c'x^2$ está en la imagen $\iff$ **$c'=0$** (ecuación cartesiana).
3. **Control.** $1+2=3=\operatorname{Dim}\wp_2$ ✓.

*(sympy con la matriz $\begin{pmatrix}0&1&0\\0&0&2\\0&0&0\end{pmatrix}$: rango 2, núcleo $\langle(1,0,0)\rangle$, cartesiana de la imagen $(0,0,1)$ ✓.)*

**Receta.** En polinomios: «$= 0$» significa **todos los coeficientes cero**; la imagen es el espacio generado por los polinomios que multiplican a cada parámetro.
**Error típico.** Decir que el núcleo de la derivada es $\{0\}$ (la derivada de una constante es 0) o que la imagen es todo $\wp_2$ (nunca sale $x^2$).
**Sobre la oficial.** Correcta y muy breve (no justifica).

### 13. Feb. 2023 (1.ª sem.), problema 7 (i) (1 punto)

**Enunciado (literal).** Consideremos la aplicación lineal $f:\wp_4\to\wp_1$, definida por $f(p)=p'''$ (derivada tercera) y consideremos en $\wp_n$ la base $(p_0,p_1,\dots,p_n)$, en donde $p_0(x)=1$, $p_1(x)=x$, …, $p_n(x)=x^n$. *(Nota del enunciado: si $p(x)=7+3x^2+2x^3+x^4$, entonces $p'''(x)=12+24x$.)* (i) Describa los subespacios núcleo e imagen de la aplicación lineal $f$ (1 PUNTO). (ii) Dé la expresión matricial de $f$ (1 PUNTO). *(El (ii) es de 3.3: matriz $2\times5$ $\begin{pmatrix}0&0&0&6&0\\0&0&0&0&24\end{pmatrix}$.)*

**Solución paso a paso (i).**
1. **Fórmula de $f$.** Para $p=a_0+a_1x+a_2x^2+a_3x^3+a_4x^4$: $p'=a_1+2a_2x+3a_3x^2+4a_4x^3$, $p''=2a_2+6a_3x+12a_4x^2$, $p'''=6a_3+24a_4x$.
2. **Núcleo.** $6a_3+24a_4x=0\iff a_3=0,\ a_4=0$; $a_0,a_1,a_2$ libres. $\operatorname{Nuc}f=\{a_0+a_1x+a_2x^2\}=\wp_2=\langle1,x,x^2\rangle$, dimensión 3.
3. **Imagen.** $f(p)=a_3\cdot6+a_4\cdot24x$: generada por $\{6,24x\}$, libres ⇒ $\operatorname{Im}f=\langle1,x\rangle=\wp_1$, dimensión 2: **es todo el espacio final**.
4. **Control.** $3+2=5=\operatorname{Dim}\wp_4$ ✓.

*(sympy: matriz $2\times5$ de rango 2; núcleo $\langle e_1,e_2,e_3\rangle$ = coeficientes $a_0,a_1,a_2$ ✓.)*

**Receta.** Escribe $f$ sobre el polinomio genérico con coeficientes $a_i$; núcleo = coeficientes de $f(p)$ igualados a 0; imagen = generada por los polinomios que acompañan a cada $a_i$.
**Error típico.** Dar la matriz $5\times5$ (el espacio final es $\wp_1$, de dimensión 2), como avisa la oficial; o decir $\operatorname{Dim}\operatorname{Im}=5-3$ con $V$ y $W$ cambiados.
**Sobre la oficial.** Correcta (justifica la imagen «integrando tres veces», que también vale).

### 14. Feb. 2022 (tipo A), ejercicio 3 (1 punto)

**Enunciado (literal).** Sea $D_{2\times2}$ el conjunto de matrices diagonales de orden 2 y $f:\mathbb R^2\to D_{2\times2}$ una aplicación tal que $f(x,y)=\begin{pmatrix}x&0\\0&x-y\end{pmatrix}$. Calcule los subespacios núcleo e imagen de $f$.

**Solución paso a paso.**
1. **Espacio final.** $D_{2\times2}=\left\{\begin{pmatrix}d_1&0\\0&d_2\end{pmatrix}\right\}=\left\langle\begin{pmatrix}1&0\\0&0\end{pmatrix},\begin{pmatrix}0&0\\0&1\end{pmatrix}\right\rangle$, base de 2 elementos ⇒ $\operatorname{Dim}D_{2\times2}=2$.
2. **Núcleo.** $f(x,y)=\begin{pmatrix}0&0\\0&0\end{pmatrix}\iff x=0,\ x-y=0\iff x=y=0$. $\operatorname{Nuc}f=\{(0,0)\}$, dimensión 0.
3. **Imagen.** Teor. 3.1: $\operatorname{Dim}\operatorname{Im}f=2-0=2=\operatorname{Dim}D_{2\times2}$, y un subespacio con la dimensión del total es el total (Teor. 2.6, U p.88): **$\operatorname{Im}f=D_{2\times2}$**.
4. **Comprobación directa.** $f(x,y)=x\begin{pmatrix}1&0\\0&1\end{pmatrix}+y\begin{pmatrix}0&0\\0&-1\end{pmatrix}$; las dos matrices son libres y diagonales ⇒ generan un subespacio de dimensión 2 de $D_{2\times2}$, que es todo ✓. (Se puede ver también: dada $\operatorname{diag}(d_1,d_2)$, la toma $(x,y)=(d_1,d_1-d_2)$.)

*(sympy, coordenadas $(d_1,d_2)$: matriz $\begin{pmatrix}1&0\\1&-1\end{pmatrix}$, rango 2, núcleo vacío ✓.)*

**Receta.** Si el núcleo es $\{0\}$ y $\operatorname{Dim}V=\operatorname{Dim}W$, la imagen es todo $W$.
**Error típico.** Comparar con $\operatorname{Dim}\mathcal M_{2\times2}=4$ en vez de $\operatorname{Dim}D_{2\times2}=2$.
**Sobre la oficial.** Correcta; añade la comprobación de linealidad (no pedida).

### 15. Sept. 2018 (tipo A), problema b) (1 punto)

**Enunciado (literal).** La aplicación lineal $f:\mathbb R^3\to V$, donde $V$ es el espacio vectorial de matrices reales cuadradas de orden 2, está definida por $f(x,y,z)=\begin{pmatrix}x&0\\y&x-y\end{pmatrix}$. Hallar unas ecuaciones paramétricas del subespacio núcleo (0.5 ptos.) y calcule la dimensión del subespacio imagen (0.5 ptos).

**Solución paso a paso.**
1. **Núcleo.** $f(x,y,z)=\begin{pmatrix}0&0\\0&0\end{pmatrix}\iff x=0,\ y=0,\ x-y=0$ (la 3.ª es consecuencia de las dos primeras); $z$ no aparece ⇒ es libre. Paramétricas: **$x=0,\ y=0,\ z=\lambda$, $\lambda\in\mathbb R$**. $\operatorname{Nuc}f=\langle(0,0,1)\rangle$, dimensión 1.
2. **Imagen.** Teor. 3.1: $\operatorname{Dim}\operatorname{Im}f=3-1=\mathbf 2$.
3. **Comprobación directa.** $f(x,y,z)=x\begin{pmatrix}1&0\\0&1\end{pmatrix}+y\begin{pmatrix}0&0\\1&-1\end{pmatrix}+z\begin{pmatrix}0&0\\0&0\end{pmatrix}$: dos matrices libres ⇒ dimensión 2 ✓. (Cartesianas de la imagen en coordenadas $(a_{11},a_{12},a_{21},a_{22})$: $a_{12}=0,\ a_{22}=a_{11}-a_{21}$.)

*(sympy: matriz en canónicas $\begin{pmatrix}1&0&0\\0&0&0\\0&1&0\\1&-1&0\end{pmatrix}$, rango 2, núcleo $\langle(0,0,1)\rangle$ ✓.)*

**Receta.** Una variable que no aparece en la fórmula de $f$ queda libre en el núcleo.
**Error típico.** Olvidar $z$ y decir que el núcleo es $\{0\}$ ⇒ $\operatorname{Dim}\operatorname{Im}=3$.
**Sobre la oficial.** Dimensión y base correctas, pero **las paramétricas que da ($x=0,\ y=0,\ z=1$) están mal**: describen un único punto. Deben llevar un parámetro: $z=\lambda$.

---

## Método D — Teorema de las dimensiones y rango

**Idea común.** Teor. 3.1 (U p.111): $\operatorname{Dim}\operatorname{Im}f+\operatorname{Dim}\operatorname{Nuc}f=\operatorname{Dim}V$ ($V$ = espacio **inicial**). Con la matriz $A$ ($n\times m$, $m=\operatorname{Dim}V$): $\operatorname{Dim}\operatorname{Im}f=\operatorname{rang}A$ y $\operatorname{Dim}\operatorname{Nuc}f=m-\operatorname{rang}A$ (autoevaluación 5-6, U p.138). Conocida una de las tres cantidades, salen las otras.

### 16. Feb. 2020 (1.ª sem., tipo B), ejercicio 3 (1 punto)

**Enunciado (literal).** Si $A$ es la matriz asociada a una aplicación lineal de orden $3\times5$ y la dimensión del núcleo es 3, se pide calcular el rango de $A$.

**Solución paso a paso.**
1. **Leer el tamaño.** En U la matriz de $f:V\to W$ tiene una **columna por cada vector de la base de $V$** (coordenadas de su imagen en la base de $W$). $3\times5$ ⇒ 5 columnas ⇒ $\operatorname{Dim}V=5$; 3 filas ⇒ $\operatorname{Dim}W=3$.
2. **Rango = dimensión de la imagen.** Las columnas generan $\operatorname{Im}f$ (Ej. 3.9), y el rango de un sistema generador es la dimensión (Teor. 2.5): $\operatorname{rang}A=\operatorname{Dim}\operatorname{Im}f$.
3. **Teorema de las dimensiones.** $\operatorname{Dim}\operatorname{Im}f=\operatorname{Dim}V-\operatorname{Dim}\operatorname{Nuc}f=5-3=2$. Luego **$\operatorname{rang}A=2$**.
4. **Coherencia.** $2\le\min(3,5)$ ✓.

**Receta.** $\operatorname{rang}A=(\text{n.º de columnas})-\operatorname{Dim}\operatorname{Nuc}f$.
**Error típico.** Restar del número de filas: $3-3=0$ (eso confundiría $V$ con $W$).
**Sobre la oficial.** Correcta (dice «subespacio final» por «espacio final»; detalle de redacción).

### 17. Sept. 2025, pregunta 2 (1 punto)

**Enunciado (literal).** Considere la aplicación lineal $f:\wp_3\to\wp_3$, definida por $f(ax^3+bx^2+cx+d)=(a+b)x^3+(b+c)x^2+(c+d)x+(a-d)$. Calcule de manera razonada la dimensión de la imagen de $f$.

**Solución paso a paso.**
1. **Estrategia.** Más corto hallar el núcleo y aplicar el Teor. 3.1.
2. **Núcleo.** $f(p)=0\iff a+b=0,\ b+c=0,\ c+d=0,\ a-d=0$. De las tres primeras: $b=-a$, $c=-b=a$, $d=-c=-a$. Sustituyendo en la 4.ª: $a-(-a)=2a=0\Rightarrow a=0$, y entonces $b=c=d=0$. $\operatorname{Nuc}f=\{0\}$, dimensión 0.
3. **Teorema de las dimensiones.** $\operatorname{Dim}\operatorname{Im}f=\operatorname{Dim}\wp_3-0=\mathbf 4$ (así $\operatorname{Im}f=\wp_3$).
4. **Comprobación alternativa.** Matriz en coordenadas $(a,b,c,d)$: $\begin{pmatrix}1&1&0&0\\0&1&1&0\\0&0&1&1\\1&0&0&-1\end{pmatrix}$, $\det=-2\neq0$ ⇒ rango 4 ✓.

*(sympy: $\det=-2$, rango 4, núcleo vacío ✓.)*

**Receta.** Para un endomorfismo: núcleo $\{0\}$ ⇔ $\det A\neq0$ ⇔ imagen = todo el espacio.
**Error típico.** Pensar que $\operatorname{Dim}\wp_3=3$ (son 4 coeficientes: $\{1,x,x^2,x^3\}$).
**Sobre la oficial.** Correcta.

### 18. Feb. 2026 (1.ª sem.), problema 7 (2 puntos)

**Enunciado (literal).** Consideremos las aplicaciones lineales $f,g:\mathbb R^3\to\mathbb R^3$ definidas por $f(x,y,z)=(x+2y,\ -y+z,\ x-z)$, $g(x,y,z)=(x+y,\ y+z,\ x+y)$. (a) Calcule el subespacio imagen asociado a $g$ e indique la dimensión de dicho subespacio (0.5 PUNTOS). (b) Calcule el subespacio $\operatorname{Nuc}(g\circ f)$ e indique la dimensión de dicho subespacio (1 PUNTO). (c) Justifique si es cierta la afirmación (0.5 PUNTOS): $\dim(\operatorname{Im}(g\circ f))+\dim(\operatorname{Nuc}(g\circ f))=3$.

**Solución paso a paso.**
1. **(a) Imagen de $g$.** $g(x,y,z)=x(1,0,1)+y(1,1,1)+z(0,1,0)$, luego $\operatorname{Im}g=\langle(1,0,1),(1,1,1),(0,1,0)\rangle$ (Ej. 3.9). Como $(1,1,1)=(1,0,1)+(0,1,0)$, se suprime (Teor. 2.1): $\operatorname{Im}g=\langle(1,0,1),(0,1,0)\rangle$, libres ⇒ **$\operatorname{Dim}\operatorname{Im}g=2$** (equivalentemente $\langle(1,0,1),(1,1,1)\rangle$, como la oficial). Cartesiana: $x=z$.
2. **(b) La composición** (herramienta de 3.4: se sustituye $f$ dentro de $g$). Con $(u,v,w)=f(x,y,z)=(x+2y,\,-y+z,\,x-z)$:
   $$(g\circ f)(x,y,z)=g(u,v,w)=(u+v,\ v+w,\ u+v)=(x+y+z,\ x-y,\ x+y+z).$$
   (Coincide con $A_gA_f=\begin{pmatrix}1&1&1\\1&-1&0\\1&1&1\end{pmatrix}$.)
3. **Núcleo de $g\circ f$.** $x+y+z=0$, $x-y=0$ (la 3.ª repite la 1.ª). Rango 2 ⇒ 1 parámetro: $y=x$, $z=-2x$; con $x=\lambda$: $\operatorname{Nuc}(g\circ f)=\langle(1,1,-2)\rangle$, **dimensión 1**. Comprobación: $(g\circ f)(1,1,-2)=(0,0,0)$ ✓.
4. **(c) Cierta.** $g\circ f$ es lineal (la composición de aplicaciones lineales es lineal, U §3.4) y va de $\mathbb R^3$ en $\mathbb R^3$; el Teor. 3.1 con $V=\mathbb R^3$ da exactamente esa igualdad. Comprobación: $\operatorname{Im}(g\circ f)=\langle(1,1,1),(1,-1,1)\rangle$ (la 3.ª columna $(1,0,1)$ es su semisuma), dimensión 2, y $2+1=3$ ✓.

*(sympy: $\operatorname{rang}A_g=2$; $A_gA_f$ como arriba; núcleo $\langle(-1/2,-1/2,1)\rangle\propto(1,1,-2)$; rango de $A_gA_f$ = 2 ✓.)*

**Receta.** Núcleo de una composición: primero la fórmula (o la matriz producto, **en el orden** $A_gA_f$ para $g\circ f$), después el método A. El Teor. 3.1 vale para **cualquier** aplicación lineal, también para composiciones.
**Error típico.** Calcular $A_fA_g$ (orden equivocado) o hacer (b)-(c) con $g$ en lugar de $g\circ f$.
**Sobre la oficial.** Correcta. Escribe «$\operatorname{Nuc}(g\circ f)=\{(1,1,-2)\}$» (probablemente $\langle\{(1,1,-2)\}\rangle$ con los $\langle\ \rangle$ perdidos en la extracción; literalmente $\{(1,1,-2)\}$ sería un conjunto de un solo vector, no un subespacio). En (c) no comprueba numéricamente, pero el argumento teórico es suficiente.

### 19. Feb. 2024 (2.ª sem.), problema 7 (2 puntos)

**Enunciado (literal).** Consideremos la aplicación lineal $f:\mathbb R^3\to\mathbb R^3$ definida por $f(x,y,z)=(x+3y,\ -x,\ y-z)$. Calcule el subespacio imagen asociado a $f$ e indique la dimensión de dicho subespacio (0.5 PUNTOS). Calcule el subespacio $\operatorname{Nuc}(f\circ f)$ e indique la dimensión de dicho subespacio (1 PUNTO). Justifique si es cierta la siguiente afirmación (0.5 PUNTOS): $\dim(\operatorname{Im}(f\circ f))+\dim(\operatorname{Nuc}(f\circ f))=3$.

**Solución paso a paso.**
1. **Imagen de $f$.** Matriz $A=\begin{pmatrix}1&3&0\\-1&0&0\\0&1&-1\end{pmatrix}$; sus columnas $(1,-1,0),(3,0,1),(0,0,-1)$ generan $\operatorname{Im}f$. $\det A$ (desarrollo por la 3.ª columna): $-1\cdot\begin{vmatrix}1&3\\-1&0\end{vmatrix}=-1\cdot3=-3\neq0$ ⇒ rango 3 ⇒ **$\operatorname{Im}f=\mathbb R^3$, dimensión 3** (Teor. 2.6). Por el Teor. 3.1, $\operatorname{Nuc}f=\{0\}$.
2. **$f\circ f$.** Sustituyendo $(u,v,w)=f(x,y,z)=(x+3y,-x,y-z)$ en $f$: $(u+3v,\,-u,\,v-w)=(-2x+3y,\ -x-3y,\ -x-y+z)$ (= $A^2$).
3. **Núcleo de $f\circ f$.** $-2x+3y=0$, $-x-3y=0$, $-x-y+z=0$. Sumando las dos primeras: $-3x=0\Rightarrow x=0$; entonces $y=0$ y $z=0$. **$\operatorname{Nuc}(f\circ f)=\{0\}$, dimensión 0.**
4. **Atajo sin calcular $f\circ f$** (solo con la Def. 3.3): si $f(f(v))=0$, entonces $f(v)\in\operatorname{Nuc}f=\{0\}$, es decir $f(v)=0$, y otra vez $v\in\operatorname{Nuc}f=\{0\}$. Luego $\operatorname{Nuc}(f\circ f)=\{0\}$.
5. **(c) Cierta**, por el Teor. 3.1 aplicado a la aplicación lineal $f\circ f:\mathbb R^3\to\mathbb R^3$: $3+0=3$ ($\det A^2=(\det A)^2=9\neq0$, imagen de dimensión 3).

*(sympy: $\det A=-3$, $A^2=\begin{pmatrix}-2&3&0\\-1&-3&0\\-1&-1&1\end{pmatrix}$, $\det A^2=9$ ✓.)*

**Receta.** Si $\operatorname{Nuc}f=\{0\}$, también $\operatorname{Nuc}(f\circ f)=\{0\}$ (y en general $\operatorname{Nuc}f\subset\operatorname{Nuc}(g\circ f)$).
**Error típico.** Hacer (b) y (c) con $f$ en vez de $f\circ f$ (lo avisa la oficial).
**Sobre la oficial.** Correcta, pero **no escribe la dimensión del núcleo** ($0$, por el convenio $\operatorname{Dim}\{0\}=0$, U p.112), que el enunciado pide explícitamente; tampoco justifica la independencia de las columnas (basta el determinante).

---

## Método E — Núcleo trivial: demostración

### 20. Feb. 2019 (tipo B), problema c) (1 punto)

**Enunciado (literal).** Si $f$ es una aplicación lineal, tal que el subespacio núcleo asociado tiene dimensión cero, probar que: si $\{\bar v_1,\bar v_2\}$ es un sistema libre o linealmente independiente, entonces también lo es $\{f(\bar v_1),f(\bar v_2)\}$.

**Solución paso a paso.**
1. **Traducir la hipótesis.** $\operatorname{Dim}\operatorname{Nuc}f=0\iff\operatorname{Nuc}f=\{\bar0\}$ (el único subespacio de dimensión 0; convenio U p.112).
2. **Qué hay que probar** (Def. 2.6, U p.74): si $\lambda f(\bar v_1)+\mu f(\bar v_2)=\bar0$, entonces $\lambda=\mu=0$.
3. **Usar la linealidad** (Def. 3.1 / propiedad 3, U p.103): $\lambda f(\bar v_1)+\mu f(\bar v_2)=f(\lambda\bar v_1+\mu\bar v_2)$. Así que $f(\lambda\bar v_1+\mu\bar v_2)=\bar0$.
4. **Usar el núcleo** (Def. 3.3): eso dice que $\lambda\bar v_1+\mu\bar v_2\in\operatorname{Nuc}f=\{\bar0\}$, es decir, $\lambda\bar v_1+\mu\bar v_2=\bar0$.
5. **Usar la hipótesis de libertad**: como $\{\bar v_1,\bar v_2\}$ es libre, $\lambda=\mu=0$. Por tanto $\{f(\bar v_1),f(\bar v_2)\}$ es libre. ∎
6. **Por qué hace falta la hipótesis.** U p.103, propiedad 5 (y Ej. 3.6, p.104): en general una aplicación lineal **puede** convertir un sistema libre en ligado (p. ej. $f(x_1,x_2)=x_1$ manda $\{(2,1),(1,3)\}$ a $\{2,1\}$, ligado). Lo que lo impide es precisamente que el núcleo sea $\{\bar0\}$. (En el lenguaje de L §1.9, Teor. 11, p.76: $f$ es «uno a uno».) La misma prueba vale para $k$ vectores.

**Receta.** Demostraciones con núcleo trivial: parte de una combinación lineal de imágenes igual a $\bar0$, métela dentro de $f$ por linealidad y usa $\operatorname{Nuc}f=\{\bar0\}$ para «quitar» la $f$.
**Error típico.** Escribir «ligado ⇒ $f(\bar v_1)=\alpha f(\bar v_2)$» sin más: si $f(\bar v_2)=\bar0$ y $f(\bar v_1)\neq\bar0$ el sistema es ligado pero $f(\bar v_1)$ no es múltiplo de $f(\bar v_2)$.
**Sobre la oficial.** La idea es correcta, pero supone que, si $\{f(\bar v_1),f(\bar v_2)\}$ es ligado, existe $\alpha$ con $f(\bar v_1)=\alpha f(\bar v_2)$: **olvida el caso $f(\bar v_2)=\bar0$** (que también lleva a contradicción, porque daría $\bar v_2\in\operatorname{Nuc}f$, $\bar v_2=\bar0$, imposible en un sistema libre). La prueba con $\lambda,\mu$ de arriba evita el problema.

---

## Errores frecuentes del tema (para la chuleta)
1. Restar dimensiones del espacio **final** en el Teor. 3.1 (es $\operatorname{Dim}V$, el inicial). Ej. 5, 13, 16.
2. Confundir dónde vive cada subespacio: $\operatorname{Nuc}f\subset V$, $\operatorname{Im}f\subset W$ (y usar letras distintas para sus coordenadas). Ej. 6.
3. No eliminar ecuaciones redundantes y concluir «núcleo $\{0\}$». Ej. 2, 8, 10.
4. Paramétricas sin parámetro (un punto) o una recta de $\mathbb R^3$ con una sola ecuación. Ej. 9, 15.
5. Tomar la imagen como generada por las **filas** de la matriz (son las **columnas**).
6. En polinomios/matrices: equivocarse en la dimensión del espacio ($\operatorname{Dim}\wp_n=n+1$, $\operatorname{Dim}D_{2\times2}=2$). Ej. 14, 17.
7. «Subespacio propio» (U p.63, ≠ $\{0\}$ y ≠ total) frente a «subespacio propio de un valor propio» (U p.152). Ej. 9.
