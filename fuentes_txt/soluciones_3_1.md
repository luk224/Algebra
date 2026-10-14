# Soluciones — Sección 3.1 Aplicaciones lineales: conceptos y propiedades (Ejercicios 3.1–3.14 de E, todos)

**Fuentes.** E = *Ejercicios de Álgebra para Ingenieros* (página impresa = PDF − 4); U = *Álgebra para Ingenieros* (página impresa = PDF − 6). Todos los cálculos se han comprobado con `sympy` (desarrollo simbólico de $f(x+\lambda y)-f(x)-\lambda f(y)$ en cada aplicación, evaluación de las imágenes numéricas, resolución de los sistemas de coordenadas y rangos).

**Qué ejercicios son de §3.1.** En E la sección 3.1 empieza en la p.79 (introducción, sin ejercicios) y la 3.2-3.3 (conjuntas) en la p.92. Los ejercicios entre ambas son **3.1 a 3.14** (pp.80–91); todos tratan de «¿es lineal?», propiedades de las aplicaciones lineales y determinación de $f$ por las imágenes de una base. El Ejercicio 3.15 (p.93) ya pide la matriz asociada (§3.3) y queda fuera. Se resuelven **los 14**.

**Herramientas de teoría que se usan:**

| Resultado | Dónde |
|---|---|
| **Definición 3.1** aplicación lineal: $f(v+\lambda u)=f(v)+\lambda f(u)$ $\forall v,u\in V$, $\forall\lambda\in\mathbb R$ | U §3.1 p.101 |
| Ejemplos 3.1–3.2: comprobar la definición desarrollando **por separado** los dos miembros; equivale a conservar la suma ($f(A+B)=f(A)+f(B)$) y el producto por escalares ($f(\lambda A)=\lambda f(A)$) | U pp.101–103 |
| Ejemplo 3.3: una aplicación constante $f(x)=k\neq0$ no es lineal | U p.103 |
| **Propiedades de las aplicaciones lineales** (U p.103): **P1** $f(0_V)=0_W$; **P2** $f(-v)=-f(v)$; **P3** $f(a_1v_1+\dots+a_nv_n)=a_1f(v_1)+\dots+a_nf(v_n)$; **P4** si $v,u$ son ligados, $f(v),f(u)$ también; **P5** aunque $v,u$ sean libres, $f(v),f(u)$ pueden no serlo | U p.103 |
| Ejemplo 3.4 (demostración de P1), Ejemplo 3.5 (de P4), Ejemplo 3.6 (contraejemplo de P5), Ejemplo 3.7 (**para ver que no es lineal basta $f(0)\neq0$**) | U p.104 |
| Definición 2.1 espacio vectorial; $0\cdot v=0$ y $\lambda\cdot 0=0$ (nota al margen) | U p.57, p.74 |
| Definición 2.2 subespacio; caracterización (2.2): $\lambda u+\mu v\in U$ | U p.62, p.66 |
| Definición 2.5 sistema ligado; Definición 2.6 y caracterización de sistema libre: $\lambda_1u_1+\dots+\lambda_pu_p=0\Rightarrow\lambda_i=0$ | U pp.73–74 |
| Definición 2.9 base; Definición 2.10 coordenadas (expresión única en una base) | U p.82, p.85 |
| (Adelanto, §3.3) Teorema 3.2: $f$ queda determinada por las imágenes de una base | U p.114 |
| (Adelanto, §3.2) Definición 3.2 $\mathrm{Im}(f)$ | U p.106 |

**Endomorfismo.** U **no define** «endomorfismo» en §3.1 (la palabra aparece por primera vez en la autoevaluación del tema 3, U p.138, y se usa en el cap. 4, U p.147). La definición operativa la da E en la solución del Ejercicio 3.1 C (p.80): **$f$ es endomorfismo si es lineal y el espacio inicial coincide con el final** ($f:V\to V$). Es la que usamos.

**Erratas, omisiones y avisos** (detallados en cada ejercicio):
- **Extracción**: en `ejercicios.txt` se pierden los «$\neq$» (E 3.1 B, 3.5, 3.6, 3.7, 3.9 A y C: «$=$» debe leerse «$\neq$»). En E 3.7 B la frase «Si $\lambda=1\Rightarrow\lambda f(x)=f(\lambda x)$» es «**si $\lambda\neq1$** $\Rightarrow\lambda f(x)\neq f(\lambda x)$». En E 3.9 C el enunciado es «puede ocurrir $f(0)\neq 0$». Lo mismo en U Ejemplo 3.5 («con $\lambda\neq0$ o $\mu\neq0$») y Ejemplo 3.7 («$f(0)\neq0$»).
- **E 3.1 B**: concluye «no lineal» comparando dos expresiones literales; falta decir que difieren en $\lambda$ y que basta **un** valor concreto (p. ej. $\lambda=1$, o $f(0,0)=1\neq0$) para que la igualdad falle. Se completa.
- **E 3.2 C**: errata tipográfica: en «$f$ conserva la suma» la imagen de $(x_1+y_1,x_2+y_2)$ aparece con **cuatro** componentes (la tercera repetida); debe ser $(2(x_1+y_1),\,3(x_1+y_1)+x_2+y_2,\,x_1+y_1+x_2+y_2)$.
- **E 3.3**: el enunciado no da los espacios; se sobreentiende $f:\mathbb R^4\to\mathbb R^4$. Paréntesis de más «$1))$» (errata tipográfica).
- **E 3.8**: «Es evidente que…»: falta el cálculo del segundo miembro, que se añade.
- **E 3.9 D**: trata de Maxima, **fuera de examen** (CLAUDE.md); se comenta sin desarrollar.
- **E 3.11 A**: afirma que $\{(1,1),(2,-1)\}$ es base sin justificarlo (hace falta ver que es libre: $\det=-3\neq0$). En B usa $f(1,0)$ y $f(0,1)$, que el enunciado no da (el argumento vale porque van multiplicados por 0, pero es más limpio $f(0)=f(0\cdot v)=0\cdot f(v)=0$).
- **E 3.12 B y C**: el contraejemplo (aplicación nula) es correcto, pero el libro no dice lo más importante: **B y C son falsas para toda** aplicación lineal $\mathbb R^2\to\mathbb R^3$, no solo para la nula (la imagen está generada por 2 vectores y no puede ser $\mathbb R^3$, que tiene dimensión 3).
- **E 3.13 D**: la justificación está incompleta: no dice por qué $f(x)+\lambda f(y)\in f(S)$ (porque $x+\lambda y\in S$ al ser $S$ subespacio, y $f(x+\lambda y)=f(x)+\lambda f(y)$), ni comprueba que $f(S)\neq\emptyset$ ($0=f(0)\in f(S)$).

---

## Bloque A. ¿Es lineal? Aplicar la definición

**Idea común.** Para demostrar que $f$ **es** lineal hay que probar la igualdad de la Definición 3.1 con vectores **genéricos** $x,y$ y un escalar genérico $\lambda$. Para demostrar que **no** lo es basta **un** contraejemplo numérico; el más rápido suele ser $f(0)\neq0$ (Ejemplo 3.7, U p.104).

### Ejercicio 3.2 (E p.81)

> **Enunciado.** Si $f:\mathbb R^2\to\mathbb R^3$ es la aplicación definida por $f(x_1,x_2)=(2x_1,\,3x_1+x_2,\,x_1+x_2)$, se pide:
> A) Describir en qué consiste la aplicación dada.
> B) Escribir con lenguaje simbólico la definición de aplicación lineal entre los espacios vectoriales $V$ y $W$.
> C) Comprobar si la aplicación dada, $f$, es lineal.
> D) Justificar si $f$ es un endomorfismo.

**Solución.**

1. **(A) Leer la aplicación.** El espacio inicial es $\mathbb R^2$ (pares $(x_1,x_2)$) y el final $\mathbb R^3$ (ternas). A cada par le asocia la terna cuya 1.ª componente es el doble de $x_1$; la 2.ª, $3x_1+x_2$; la 3.ª, $x_1+x_2$. Por ejemplo, $f(1,0)=(2,3,1)$ y $f(0,1)=(0,1,1)$. Es una **aplicación** porque cada par tiene **una única** imagen (U p.103).
2. **(B) Definición.** $f:V\to W$ ($V,W$ espacios vectoriales) es lineal si
$$f(x+\lambda y)=f(x)+\lambda f(y)\qquad\forall x,y\in V,\ \forall\lambda\in\mathbb R$$
(Definición 3.1, U p.101). Esta única igualdad engloba las dos condiciones «conserva la suma» ($\lambda=1$) y «conserva el producto por escalares» (tomando $x=0$ y usando que entonces $f(0)=f(0)+f(0)$ obliga a $f(0)=0$; o comprobándolo aparte como en el paso 5). Salvo indicación, en $\mathbb R^n$ se usan la suma y el producto por escalares estándar.
3. **(C) Vectores genéricos.** Sean $x=(x_1,x_2)$, $y=(y_1,y_2)\in\mathbb R^2$ y $\lambda\in\mathbb R$. Entonces $x+\lambda y=(x_1+\lambda y_1,\ x_2+\lambda y_2)$ (operaciones estándar de $\mathbb R^2$).
4. **Primer miembro** (se aplica la fórmula de $f$ a las componentes de $x+\lambda y$):
$$f(x+\lambda y)=\big(2(x_1+\lambda y_1),\ 3(x_1+\lambda y_1)+(x_2+\lambda y_2),\ (x_1+\lambda y_1)+(x_2+\lambda y_2)\big).$$
**Segundo miembro:**
$$f(x)+\lambda f(y)=(2x_1,\,3x_1+x_2,\,x_1+x_2)+\lambda(2y_1,\,3y_1+y_2,\,y_1+y_2)=\big(2x_1+2\lambda y_1,\ 3x_1+x_2+3\lambda y_1+\lambda y_2,\ x_1+x_2+\lambda y_1+\lambda y_2\big).$$
Desarrollando los paréntesis del primer miembro (propiedad distributiva de los reales) se obtiene **exactamente** lo mismo, componente a componente. Por la Definición 3.1, **$f$ es lineal**. (Técnica: desarrollar por separado los dos miembros y compararlos, Ejemplo 3.2, U p.102.) *Sympy: $f(x+\lambda y)-f(x)-\lambda f(y)=(0,0,0)$.*
5. **Alternativa por separado** (como hace E): *suma*: $f(x+y)=(2(x_1+y_1),\,3(x_1+y_1)+x_2+y_2,\,x_1+y_1+x_2+y_2)=f(x)+f(y)$; *escalares*: $f(\lambda x)=(2\lambda x_1,\,3\lambda x_1+\lambda x_2,\,\lambda x_1+\lambda x_2)=\lambda f(x)$. (En E, en la imagen de $x+y$ aparece una cuarta componente repetida: **errata**.)
6. **(D)** $f$ es lineal, pero el espacio inicial $\mathbb R^2$ **no** coincide con el final $\mathbb R^3$, así que **no es endomorfismo**.

**Receta.** ¿Es lineal? Escribe $x+\lambda y$ en componentes, calcula $f(x+\lambda y)$ y $f(x)+\lambda f(y)$ **por separado**, desarrolla y compara. Si todas las componentes son combinaciones lineales de las $x_i$ **sin término independiente ni productos/potencias**, la igualdad sale siempre.

**Error típico.** Escribir directamente «$f(x+\lambda y)=f(x)+\lambda f(y)$» como primer paso (eso es lo que hay que demostrar). Y confundir «lineal» con «endomorfismo»: el endomorfismo exige además $V=W$.

**Teoría:** U §3.1 Definición 3.1 p.101; Ejemplo 3.2 p.102.

---

### Ejercicio 3.8 (E p.86)

> **Enunciado.** Compruébese que la aplicación $f:\mathbb R\to\mathbb R^3$, tal que $f(x)=(x,0,-x)$, es lineal.

**Solución.**

1. **Datos genéricos.** $x,y\in\mathbb R$ (aquí los vectores del espacio inicial son números reales) y $\lambda\in\mathbb R$.
2. **Primer miembro.** $f(x+\lambda y)=\big(x+\lambda y,\ 0,\ -(x+\lambda y)\big)=(x+\lambda y,\ 0,\ -x-\lambda y)$.
3. **Segundo miembro.** $f(x)+\lambda f(y)=(x,0,-x)+\lambda(y,0,-y)=(x,0,-x)+(\lambda y,\ \lambda\cdot0,\ -\lambda y)=(x+\lambda y,\ 0,\ -x-\lambda y)$. Clave: la segunda componente es $0+\lambda\cdot 0=0$.
4. **Comparación.** Coinciden para todo $x,y,\lambda$; por la Definición 3.1 (U p.101), **$f$ es lineal**. (E dice «es evidente» y omite el paso 3; en el examen hay que escribirlo.) *Sympy: diferencia $(0,0,0)$.*

**Receta.** Un 0 fijo en una componente no estropea la linealidad ($\lambda\cdot0=0$); una constante **no nula** sí (compárese con el Ej. 3.7).

**Error típico.** Despachar con «es evidente»: en el examen «los resultados que no estén debidamente justificados no podrán ser valorados».

**Teoría:** U §3.1 Definición 3.1 p.101.

---

### Ejercicio 3.1 (E p.80)

> **Enunciado.** Si $f:\mathbb R^2\to\mathbb R$ es la aplicación definida por $f(x_1,x_2)=x_1-x_2+1$, se pide:
> A) Calcular las imágenes de algunos vectores de $\mathbb R^2$.
> B) Comprobar si la aplicación dada, $f$, es lineal.
> C) Justificar si $f$ es un endomorfismo.

**Solución.**

1. **(A) Imágenes.** Se sustituye en $x_1-x_2+1$:
$f(5,2)=5-2+1=4$; $f(0,0)=1$; $f(-3,-2)=-3+2+1=0$; $f(4,-2)=4+2+1=7$; $f(-2,1)=-2-1+1=-2$; $f(-7,-3)=-7+3+1=-3$. (Coinciden con E; sympy.)
2. **(B) Atajo: el neutro.** Toda aplicación lineal cumple $f(0_V)=0_W$ (propiedad P1, U p.103; demostrada en Ejemplo 3.4, U p.104). Aquí $f(0,0)=1\neq0$, luego **$f$ no es lineal** (Ejemplo 3.7, U p.104: basta $f(0)\neq0$). Ya está demostrado.
3. **(B) Por la definición** (lo que hace E). Con $x=(x_1,x_2)$, $y=(y_1,y_2)$:
$$f(x+\lambda y)=x_1+\lambda y_1-x_2-\lambda y_2+1,\qquad f(x)+\lambda f(y)=x_1-x_2+1+\lambda(y_1-y_2+1)=x_1+\lambda y_1-x_2-\lambda y_2+1+\lambda .$$
Restando: $f(x)+\lambda f(y)-f(x+\lambda y)=\lambda$, que **no es 0 si $\lambda\neq0$**. **Omisión de E:** para concluir hay que decir que la igualdad falla para algún caso concreto, p. ej. $x=y=(0,0)$, $\lambda=1$: $f(0,0)=1$ pero $f(0,0)+1\cdot f(0,0)=2$. (La definición pide la igualdad **para todos** $x,y,\lambda$; un caso que falle basta para negarla.)
4. **(C)** Endomorfismo = lineal **y** espacio inicial = final (E p.80). Aquí **fallan las dos**: no es lineal (paso 2) y $\mathbb R^2\neq\mathbb R$. No es endomorfismo.

**Receta.** Antes de nada, calcula $f(0)$: si no es el vector nulo, «no es lineal» en una línea. Si $f(0)=0$, el atajo **no decide** y hay que ir a la definición.

**Error típico.** Pensar que $f(x_1,x_2)=x_1-x_2+1$ es lineal «porque es de grado 1». En Álgebra lineal, el término independiente $+1$ la hace **afín**, no lineal. Al revés, deducir «es lineal» de $f(0)=0$ también es un error (P1 es condición necesaria, no suficiente).

**Teoría:** U §3.1 Definición 3.1 p.101; Propiedad P1 p.103; Ejemplos 3.4 y 3.7 p.104.

---

### Ejercicio 3.3 (E p.83)

> **Enunciado.** Compruébese que no es endomorfismo la aplicación $f(x_1,x_2,x_3,x_4)=(x_1,1,x_3,1)$.

**Solución.**

1. **Espacios.** Se sobreentiende $f:\mathbb R^4\to\mathbb R^4$ (el enunciado no lo dice). Los espacios coinciden, así que la única forma de que no sea endomorfismo es que **no sea lineal**.
2. **Atajo.** $f(0,0,0,0)=(0,1,0,1)\neq(0,0,0,0)$. Por P1 (U p.103) una aplicación lineal lleva el neutro al neutro; luego $f$ **no es lineal** (Ejemplo 3.7, U p.104).
3. **Por la definición** (E). $f(x+\lambda y)=(x_1+\lambda y_1,\,1,\,x_3+\lambda y_3,\,1)$, mientras que $f(x)+\lambda f(y)=(x_1,1,x_3,1)+\lambda(y_1,1,y_3,1)=(x_1+\lambda y_1,\,1+\lambda,\,x_3+\lambda y_3,\,1+\lambda)$. Las componentes 2.ª y 4.ª difieren en $\lambda$; con $\lambda=1$ (por ejemplo) no coinciden. *Sympy: diferencia $(0,-\lambda,0,-\lambda)$.*
4. **Conclusión.** Al no ser lineal, **no es endomorfismo**.

**Receta.** «No es endomorfismo» se demuestra viendo que falla **una** de las dos condiciones: linealidad o $V=W$.

**Error típico.** Creer que como $x_2$ y $x_4$ «desaparecen» la aplicación es una proyección lineal: las componentes constantes 1 la estropean.

**Teoría:** U §3.1 Definición 3.1 p.101; P1 p.103; Ejemplo 3.7 p.104; endomorfismo según E p.80.

---

### Ejercicio 3.7 (E p.85)

> **Enunciado.** Si $f:\mathbb R\to\mathbb R^3$ es la aplicación $f(x)=(x,1,-x)$, se pide comprobar si $f$ verifica:
> A) Conserva la suma de vectores. B) Conserva el producto de escalar por vector. C) Transforma el neutro de $(\mathbb R,+)$ en el neutro de $(\mathbb R^3,+)$. D) Es una aplicación lineal. E) Ninguna de las anteriores.

**Solución.**

1. **(A) Suma.** Para $x,y\in\mathbb R$: $f(x+y)=(x+y,\,1,\,-x-y)$ y $f(x)+f(y)=(x,1,-x)+(y,1,-y)=(x+y,\,2,\,-x-y)$. La 2.ª componente es 1 frente a 2: **no conserva la suma** (para ningún par $x,y$, de hecho).
2. **(B) Escalares.** $f(\lambda x)=(\lambda x,\,1,\,-\lambda x)$ y $\lambda f(x)=(\lambda x,\,\lambda,\,-\lambda x)$. Coinciden solo si $\lambda=1$; **si $\lambda\neq1$** (p. ej. $\lambda=2$) son distintos: **no conserva el producto**. (En el texto extraído de E pone «Si $\lambda=1$»: se ha perdido el «$\neq$».)
3. **(C) Neutro.** $f(0)=(0,1,0)\neq(0,0,0)$: **no** lleva el neutro al neutro.
4. **(D)** Una aplicación lineal cumple las tres anteriores (la definición 3.1 con $\lambda=1$ da la suma; P1 da el neutro, U p.103). Como falla cualquiera de ellas, **no es lineal**; para justificarlo bastaría **una** (por ejemplo C, Ejemplo 3.7, U p.104).
5. **(E)** Como A, B, C y D son falsas, **la correcta es E**.

**Receta.** En los test de «¿qué verifica $f$?», comprueba cada propiedad por separado con la fórmula; recuerda: lineal $\Rightarrow$ suma + escalares + neutro, así que fallar una basta para negar «lineal».

**Error típico.** Comprobar el producto por escalares con $\lambda=1$ y concluir que «sí se conserva»: hay que mirar **todos** los $\lambda$.

**Teoría:** U §3.1 Definición 3.1 p.101; Ejemplo 3.2 (suma y escalares) p.103; P1 p.103; Ejemplo 3.7 p.104.

---

### Ejercicio 3.9 (E p.86)

> **Enunciado.** Sin hacer operaciones, se pide responder verdadero o falso a las siguientes afirmaciones:
> A) La aplicación $f:\mathbb R^2\to\mathbb R^2$, tal que $f(x_1,x_2)=(x_1+2,\,x_2)$, es lineal.
> B) $f$ es un endomorfismo de $\mathbb R^2$.
> C) En algún endomorfismo de $\mathbb R^2$ puede ocurrir $f(0)\neq 0$.
> D) Con MAXIMA se puede saber si una aplicación dada es lineal.

(En el texto extraído, C aparece como «$f(0)=(0)$»: se ha perdido el «$\neq$».)

**Solución.**

1. **(A) Falsa.** $f(0,0)=(2,0)\neq(0,0)$; por P1 (U p.103) y Ejemplo 3.7 (U p.104), $f$ no es lineal. (Es una **traslación** de vector $(2,0)$: mueve el origen.) *Sympy: $f(x+\lambda y)-f(x)-\lambda f(y)=(-2\lambda,0)$.*
2. **(B) Falsa.** Aunque $V=W=\mathbb R^2$, un endomorfismo debe ser lineal, y por A no lo es.
3. **(C) Falsa.** Un endomorfismo es, en particular, lineal, y **toda** aplicación lineal cumple $f(0)=0$ (P1, U p.103). Por tanto en **ningún** endomorfismo ocurre $f(0)\neq0$.
4. **(D)** E la da por cierta (encadenando instrucciones; U p.104 al margen: «Maxima no tiene ninguna instrucción que determine si una aplicación es lineal»). **Maxima está fuera de examen**: no se desarrolla.

**Receta.** «Sin hacer operaciones» = usa las propiedades: $f(0)\neq0\Rightarrow$ no lineal $\Rightarrow$ no endomorfismo.

**Error típico.** Pensar que una traslación $x\mapsto x+c$ es lineal porque «conserva la forma» de las figuras: no conserva el origen.

**Teoría:** U §3.1 P1 p.103; Ejemplo 3.7 p.104; endomorfismo según E p.80.

---

## Bloque B. Propiedades de las aplicaciones lineales

### Ejercicio 3.4 (E p.83)

> **Enunciado.** Siendo $f$ cualquier aplicación lineal de $\mathbb R^2$ en $\mathbb R^3$, se pide:
> A) Demostrar que $f(0,0)=(0,0,0)$.
> B) Comprobar si es cierta alguna de las igualdades: $5f(3,2)=f(15,2)$; $5f(3,2)=f(3,10)$; $5f(3,2)=f(15,10)$.

**Solución.**

1. **(A) Idea.** Solo sabemos que $f$ es lineal (no su fórmula), así que hay que usar la definición. Truco: el neutro es suma de sí mismo, $(0,0)=(0,0)+(0,0)$.
2. **Aplicar linealidad.** Por la Definición 3.1 con $\lambda=1$ (conservar la suma): $f(0,0)=f\big((0,0)+(0,0)\big)=f(0,0)+f(0,0)$.
3. **Despejar.** $f(0,0)$ es un vector de $\mathbb R^3$; sumamos a ambos lados su opuesto $-f(0,0)$ (existe por ser $\mathbb R^3$ espacio vectorial, propiedad S3, U p.58):
$f(0,0)-f(0,0)=f(0,0)+f(0,0)-f(0,0)\ \Rightarrow\ (0,0,0)=f(0,0)$. Es la demostración del Ejemplo 3.4 (U p.104).
   *Alternativa:* $f(0,0)=f(0\cdot(1,1))=0\cdot f(1,1)=(0,0,0)$, usando que $0\cdot v=0$ (U p.74, al margen).
4. **(B) Qué dice la linealidad.** Con $x=0$ en la definición, $f(\lambda y)=\lambda f(y)$. Así $5f(3,2)=f\big(5\cdot(3,2)\big)=f(15,10)$: **la tercera igualdad es siempre cierta**.
5. **Las otras dos.** $5(3,2)=(15,10)$ es distinto de $(15,2)$ y de $(3,10)$; la linealidad no obliga a que $f(15,2)$ o $f(3,10)$ valgan $5f(3,2)$. **No son ciertas en general** (el Ejercicio 3.5 da un $f$ concreto en que fallan). Matiz: para alguna $f$ particular podrían cumplirse (p. ej. la aplicación nula, donde todo vale $(0,0,0)$), por eso se dice «en general».

**Receta.** Un escalar «sale fuera» multiplicando **todas** las componentes del vector: $\lambda f(a,b)=f(\lambda a,\lambda b)$, nunca $f(\lambda a,b)$.

**Error típico.** Multiplicar por el escalar solo una componente del vector original, como si $f$ fuera «lineal en cada variable por separado».

**Teoría:** U §3.1 Definición 3.1 p.101; P1 p.103; Ejemplo 3.4 p.104; S3 p.58.

---

### Ejercicio 3.5 (E p.84)

> **Enunciado.** Si $f$ es la aplicación lineal definida en el Ejercicio 3.2, se pide: comprobar que se verifican las respuestas dadas en el Ejercicio 3.4.

**Solución.** $f(x_1,x_2)=(2x_1,\,3x_1+x_2,\,x_1+x_2)$, que es lineal por el Ejercicio 3.2.

1. **(A)** $f(0,0)=(2\cdot0,\ 3\cdot0+0,\ 0+0)=(0,0,0)$. ✓ (concuerda con P1).
2. **(B)** $f(3,2)=(6,\ 9+2,\ 3+2)=(6,11,5)$, luego $5f(3,2)=(30,55,25)$.
3. $f(15,2)=(30,\ 45+2,\ 17)=(30,47,17)\neq(30,55,25)$.
4. $f(3,10)=(6,\ 9+10,\ 13)=(6,19,13)\neq(30,55,25)$.
5. $f(15,10)=(30,\ 45+10,\ 25)=(30,55,25)=5f(3,2)$. ✓ Solo la tercera, como se predijo. *(Sympy confirma los cuatro vectores.)* En E los «$\neq$» de los pasos 3–4 aparecen como «$=$» por la extracción del texto.

**Receta.** Para comprobar una propiedad general en un caso concreto, calcula los dos miembros por separado con la fórmula y compáralos componente a componente.

**Error típico.** Con un solo caso numérico que cumple la igualdad no se demuestra linealidad: un ejemplo **confirma**, pero solo un contraejemplo **refuta**.

**Teoría:** U §3.1 Definición 3.1 p.101; P1 p.103.

---

### Ejercicio 3.6 (E p.84)

> **Enunciado.** Si $f$ es la aplicación del Ejercicio 3.3, se pide responder verdadero o falso a las siguientes cuestiones:
> A) Se tiene que verificar $f(0,0,0,0)=(0,0,0,0)$.
> B) Se tiene que verificar $f(5(2,3,1,0))=5f(2,3,1,0)$.
> C) Se tiene que verificar $f(2,3,1,0)=f(1,2,1,0)+f(1,1,0,0)$.

**Solución.** $f(x_1,x_2,x_3,x_4)=(x_1,1,x_3,1)$, que **no es lineal** (Ejercicio 3.3). Por tanto no hay ninguna propiedad que «se tenga que verificar»; se comprueba calculando.

1. **(A) Falsa.** $f(0,0,0,0)=(0,1,0,1)\neq(0,0,0,0)$.
2. **(B) Falsa.** $f(5(2,3,1,0))=f(10,15,5,0)=(10,1,5,1)$, mientras que $5f(2,3,1,0)=5(2,1,1,1)=(10,5,5,5)$. Distintos.
3. **(C) Falsa.** Observa que $(2,3,1,0)=(1,2,1,0)+(1,1,0,0)$. Pero $f(2,3,1,0)=(2,1,1,1)$ y $f(1,2,1,0)+f(1,1,0,0)=(1,1,1,1)+(1,1,0,1)=(2,2,1,2)$. Distintos.
4. **Lectura.** Las tres igualdades son las de P1, «conserva escalares» y «conserva la suma»; si $f$ fuera lineal, las tres serían ciertas. Cada una de ellas, por sí sola, demuestra que $f$ no es lineal. *(Sympy.)*

**Receta.** Si $f$ no es lineal, ninguna de las propiedades de U p.103 está garantizada: hay que calcular.

**Error típico.** Responder «verdadero» por reflejo porque «las aplicaciones cumplen $f(0)=0$»: eso solo vale para las **lineales**.

**Teoría:** U §3.1 Definición 3.1 p.101; P1 p.103.

---

### Ejercicio 3.13 (E p.90)

> **Enunciado.** Si $f$ es un endomorfismo de $V$, se pide justificar si son ciertas o falsas las afirmaciones siguientes:
> A) Es falso que $f(0)=0$, con $0\in V$.
> B) Es falso que $f(-x)=-f(x)$, con $x\in V$.
> C) Es falso que $f(x)=f(y)\Rightarrow f(x-y)=0$, con $x,y,0\in V$.
> D) Si $S$ es subespacio de $V$, entonces $f(S)$ es subespacio de $V$.

**Solución.** Ojo con la lógica: A, B y C afirman «**es falso que** …». Si lo de dentro es cierto, la afirmación es **falsa** (negación de una verdad).

1. **(A) Falsa**, porque $f(0)=0$ **es cierto**: $f(0)=f(0\cdot x)=0\cdot f(x)=0$, usando $0\cdot x=0$ en $V$ (U p.74, al margen) y que $f$ conserva el producto por escalares (Definición 3.1 con el primer vector nulo, o Ejemplo 3.2, U p.103). Es la propiedad P1 (U p.103).
2. **(B) Falsa**, porque $f(-x)=-f(x)$ **es cierto**: $f(-x)=f((-1)x)=(-1)f(x)=-f(x)$. Se usa que $(-1)x=-x$ en un espacio vectorial (el opuesto) y que $f$ conserva escalares. Es P2 (U p.103).
3. **(C) Falsa**, porque la implicación **es cierta**: $x-y=x+(-1)y$, y por la Definición 3.1 con $\lambda=-1$: $f(x-y)=f(x)+(-1)f(y)=f(x)-f(y)$. Si $f(x)=f(y)$, esto vale $0$.
4. **(D) Cierta.** Por definición $f(S)=\{f(s): s\in S\}$ (conjunto de imágenes, nota al margen de E p.90), y como $f:V\to V$, $f(S)\subseteq V$. Usamos la caracterización de subespacio (2.2) (U p.66): no vacío y cerrado para $w_1+\lambda w_2$.
   - **No vacío:** $0\in S$ (todo subespacio contiene al neutro, U p.63), luego $f(0)=0\in f(S)$.
   - **Cerrado:** sean $w_1,w_2\in f(S)$ y $\lambda\in\mathbb R$. Por definición de $f(S)$ existen $x,y\in S$ con $w_1=f(x)$, $w_2=f(y)$. Entonces
   $$w_1+\lambda w_2=f(x)+\lambda f(y)=f(x+\lambda y),$$
   y $x+\lambda y\in S$ **porque $S$ es subespacio**. Por tanto $w_1+\lambda w_2$ es imagen de un vector de $S$: está en $f(S)$.
   Luego $f(S)$ es subespacio de $V$. **Omisión de E:** el libro escribe solo «$f(x+\lambda y)=f(x)+\lambda f(y)\in f(S)$» sin decir que $x+\lambda y\in S$ ni comprobar que $f(S)\neq\emptyset$.

**Receta.** Las propiedades P1, P2 y $f(x-y)=f(x)-f(y)$ salen de la definición eligiendo bien el escalar ($0$, $-1$). Para «$f(S)$ es subespacio»: escribe los vectores de $f(S)$ como $f(x)$, $f(y)$ con $x,y\in S$ y usa que $S$ es cerrado.

**Error típico.** Contestar «verdadero» a «es falso que $f(0)=0$» por leer solo la fórmula. Y, en D, olvidar decir que $x+\lambda y\in S$: es justo ahí donde se usa que $S$ es subespacio (si $S$ no lo fuera, el argumento cae).

**Teoría:** U §3.1 Definición 3.1 p.101; P1, P2 p.103; U §2.1 Definición 2.2 p.62, caracterización (2.2) p.66; $0\cdot v=0$ U p.74.

---

## Bloque C. Una aplicación lineal queda determinada por las imágenes de una base

**Idea común.** Si conozco $f(e_1),\dots,f(e_n)$ para una base $\{e_1,\dots,e_n\}$ de $V$, todo $v\in V$ se escribe (de forma única, Definición 2.10, U p.85) como $v=a_1e_1+\dots+a_ne_n$ y, por **P3** (U p.103), $f(v)=a_1f(e_1)+\dots+a_nf(e_n)$. (Es el Teorema 3.2 de U p.114, que se formaliza en §3.3.)

### Ejercicio 3.10 (E p.87)

> **Enunciado.** Si $f:\mathbb R^2\to\mathbb R^3$ es una aplicación lineal que verifica $f(1,0)=(1,2,0)$ y $f(0,1)=(0,3,1)$, se pide comprobar si es cierto que:
> A) $f(5,7)=(5,31,7)$. B) $f(1,1)=(1,0,1)$. C) Las imágenes de todos los vectores de $\mathbb R^2$ están en el plano de ecuación $2x_1-x_2+3x_3=0$. D) Ninguna de las anteriores.

**Solución.**

1. **Base conocida.** $\{(1,0),(0,1)\}$ es la base canónica de $\mathbb R^2$ (U §2.3) y conocemos las imágenes de sus dos vectores.
2. **(A)** $(5,7)=5(1,0)+7(0,1)$. Por P3 (U p.103):
$$f(5,7)=5f(1,0)+7f(0,1)=5(1,2,0)+7(0,3,1)=(5,\ 10+21,\ 7)=(5,31,7).\ \ \textbf{Cierta.}$$
3. **(B)** $(1,1)=1(1,0)+1(0,1)$, luego $f(1,1)=(1,2,0)+(0,3,1)=(1,5,1)\neq(1,0,1)$. **Falsa.**
4. **(C) Fórmula general.** Para $(a,b)\in\mathbb R^2$: $f(a,b)=a(1,2,0)+b(0,3,1)=(a,\ 2a+3b,\ b)$. Llamamos $(x_1,x_2,x_3)$ a la imagen: $x_1=a$, $x_2=2a+3b$, $x_3=b$.
5. **Sustituir en el plano.** $2x_1-x_2+3x_3=2a-(2a+3b)+3b=0$ para **todos** $a,b$. Luego toda imagen está en el plano: **Cierta.** *(Sympy: $(2,-1,3)\,A\,(a,b)^t=0$, con $A$ la matriz de columnas $f(1,0)$, $f(0,1)$.)*
6. **(D) Falsa**, porque A y C son ciertas.

**Receta.** Conocidas las imágenes de la base canónica, $f(a,b)=a\,f(1,0)+b\,f(0,1)$: escribe esa fórmula general y úsala para todo (imágenes concretas y ecuaciones que cumplen las imágenes).

**Error típico.** En C, comprobar solo con uno o dos vectores: hay que verificarlo para el vector genérico $(a,b)$.

**Teoría:** U §3.1 P3 p.103; base canónica y coordenadas U §2.3 pp.82–85 (Definiciones 2.9, 2.10); Teorema 3.2 U p.114.

---

### Ejercicio 3.11 (E p.88)

> **Enunciado.** Si $f$ es un endomorfismo de $\mathbb R^2$, tal que $f(1,1)=(1,4)$ y $f(2,-1)=(-2,3)$, se pide:
> A) Calcular la imagen de $(3,-1)$.
> B) Comprobar que $f(0,0)=(0,0)$.

**Solución.**

1. **¿Es $B=\{(1,1),(2,-1)\}$ base de $\mathbb R^2$?** (E lo afirma sin justificar.) Son 2 vectores en un espacio de dimensión 2; basta ver que son libres (Teorema 2.6, U p.88). Si $\alpha(1,1)+\beta(2,-1)=(0,0)$: $\alpha+2\beta=0$, $\alpha-\beta=0$ $\Rightarrow$ $\beta=0$, $\alpha=0$. Libres (U p.74) $\Rightarrow$ base. Equivalente: $\det\begin{pmatrix}1&2\\1&-1\end{pmatrix}=-1-2=-3\neq0$.
2. **Coordenadas de $(3,-1)$ en $B$.** Buscamos $\alpha,\beta$ con $(3,-1)=\alpha(1,1)+\beta(2,-1)$:
$$\begin{cases}\alpha+2\beta=3\\ \alpha-\beta=-1\end{cases}$$
Restando la 2.ª a la 1.ª: $3\beta=4\Rightarrow\beta=\tfrac43$; entonces $\alpha=\beta-1=\tfrac13$. Comprobación: $\tfrac13+\tfrac83=3$ ✓, $\tfrac13-\tfrac43=-1$ ✓. Son únicas por ser $B$ base (Definición 2.10, U p.85).
3. **Aplicar P3** (U p.103):
$$f(3,-1)=\tfrac13 f(1,1)+\tfrac43 f(2,-1)=\tfrac13(1,4)+\tfrac43(-2,3)=\left(\tfrac13-\tfrac83,\ \tfrac43+4\right)=\left(-\tfrac73,\ \tfrac{16}3\right).$$
*(Sympy: coordenadas $(1/3,4/3)$ e imagen $(-7/3,16/3)$.)*
   *Comprobación independiente:* de la misma forma se obtiene $f(1,0)=\left(-\tfrac13,\tfrac73\right)$ y $f(0,1)=\left(\tfrac43,\tfrac53\right)$, y $3f(1,0)-f(0,1)=\left(-1-\tfrac43,\ 7-\tfrac53\right)=\left(-\tfrac73,\tfrac{16}3\right)$ ✓.
4. **(B)** $f$ es lineal (es endomorfismo), luego por P1 (U p.103) $f(0,0)=(0,0)$. Directamente: $(0,0)=0\cdot(1,1)$, así que $f(0,0)=0\cdot f(1,1)=0\cdot(1,4)=(0,0)$. (E escribe $(0,0)=0(1,0)+0(0,1)$ y usa $f(1,0)$, $f(0,1)$, que el enunciado no da: el resultado es correcto porque van multiplicados por 0, pero es más limpio usar un vector cuya imagen se conoce.)

**Receta.** Si conoces las imágenes de una base **no canónica**: (1) comprueba que es base; (2) halla las coordenadas del vector en esa base resolviendo un sistema; (3) $f(v)=\sum(\text{coordenada})\cdot f(\text{vector de la base})$.

**Error típico.** Usar las componentes $3,-1$ como coeficientes: $3f(1,1)-f(2,-1)$ **está mal** (eso sería si la base fuera la canónica). Primero hay que pasar a coordenadas en $B$.

**Teoría:** U §3.1 P1, P3 p.103; U §2.2 independencia p.74; Teorema 2.6 p.88; Definición 2.10 coordenadas p.85.

---

### Ejercicio 3.12 (E p.89)

> **Enunciado.** Si $f:\mathbb R^2\to\mathbb R^3$ es una aplicación lineal en la que se conocen las imágenes de los elementos de una base de $\mathbb R^2$, se pide analizar si es correcta alguna de las afirmaciones siguientes:
> A) Es posible obtener la imagen de cualquier vector de $\mathbb R^2$.
> B) Cualquier vector de $\mathbb R^3$ tiene un original en $\mathbb R^2$.
> C) $\mathrm{Im}(f)$ es $\mathbb R^3$.
> D) Ninguna de las anteriores.

**Solución.**

1. **(A) Correcta.** Sea $\{e_1,e_2\}$ la base cuyas imágenes conocemos. Todo $v\in\mathbb R^2$ se escribe $v=a_1e_1+a_2e_2$ (Definición 2.9: la base es generadora; las coordenadas son únicas, Definición 2.10, U pp.82–85). Por P3 (U p.103), $f(v)=a_1f(e_1)+a_2f(e_2)$: calculable con los datos. Vale para **cualquier** base (Ejercicio 3.11 lo hace con una no canónica). Es el Teorema 3.2 (U p.114).
2. **(B) Falsa.** Por el paso 1, toda imagen es combinación lineal de **dos** vectores $f(e_1),f(e_2)$ de $\mathbb R^3$. El conjunto de esas combinaciones tiene dimensión $\le2$ (su rango es $\le2$, Teorema 2.5, U p.88), y $\mathbb R^3$ tiene dimensión 3. Por tanto **siempre** hay vectores de $\mathbb R^3$ sin original. Contraejemplo concreto (el de E): la aplicación nula $f(x_1,x_2)=(0,0,0)$, que es lineal, y en la que solo $(0,0,0)$ tiene original.
3. **(C) Falsa.** $\mathrm{Im}(f)=\{w\in\mathbb R^3: w=f(v)\text{ para algún }v\}$ (Definición 3.2, U p.106). Decir $\mathrm{Im}(f)=\mathbb R^3$ es lo mismo que B, y ya vimos que es imposible. **Matiz que E omite:** el contraejemplo de la aplicación nula basta para decir «falsa», pero la afirmación no es que falle «a veces»: **falla para toda** $f:\mathbb R^2\to\mathbb R^3$ lineal.
4. **(D) Falsa**, porque A es correcta.

**Receta.** Una aplicación lineal queda **totalmente** determinada por las imágenes de una base. La imagen es el conjunto de combinaciones de esas imágenes, y no puede tener más dimensión que el espacio inicial.

**Error típico.** Confundir «conocer $f$ en todo $V$» (A, cierto) con «$f$ llega a todo $W$» (B/C): son cosas distintas.

**Teoría:** U §3.1 P3 p.103; U §2.3 Definiciones 2.9, 2.10 pp.82–85; Teorema 2.5 p.88; (adelanto) Definición 3.2 p.106 y Teorema 3.2 p.114.

---

## Bloque D. Independencia lineal e imágenes

### Ejercicio 3.14 (E p.91)

> **Enunciado.** Si $f$ es la aplicación lineal $f(x_1,x_2,x_3)=(x_1,x_2)$, se pide decir si son ciertas o falsas las implicaciones siguientes:
> A) $\{x,y\}$ libre $\Rightarrow\{f(x),f(y)\}$ libre.
> B) $\{f(x),f(y)\}$ ligado $\Rightarrow\{x,y\}$ ligado.
> C) $\{f(x),f(y)\}$ libre $\Rightarrow\{x,y\}$ libre.
> D) Ninguna de las anteriores.

**Solución.** ($f$ es la proyección de $\mathbb R^3$ sobre el plano $x_1x_2$, «olvida» la tercera coordenada.)

1. **(A) Falsa.** Contraejemplo: $x=(0,1,0)$, $y=(0,1,1)$. Son libres: $\lambda x+\mu y=(0,\ \lambda+\mu,\ \mu)=0\Rightarrow\mu=0,\ \lambda=0$ (caracterización de libre, U p.74). Sus imágenes $f(x)=(0,1)$, $f(y)=(0,1)$ son **iguales**, luego ligadas ($1\cdot f(x)-1\cdot f(y)=0$ con coeficientes no nulos, Definición 2.5, U p.73). Es la propiedad P5 (U p.103): libres pueden ir a ligados (como en el Ejemplo 3.6, U p.104). *(Sympy: rango 2 antes, rango 1 después.)*
2. **(B) Falsa.** El mismo ejemplo: $\{f(x),f(y)\}$ ligado y $\{x,y\}$ libre. (B es la **recíproca** de P4, y la recíproca de una implicación cierta no tiene por qué serlo.)
3. **(C) Cierta, para cualquier aplicación lineal.** C es la **contrarrecíproca** de P4 («$x,y$ ligados $\Rightarrow f(x),f(y)$ ligados», U p.103), luego es equivalente a ella. Demostración directa: supongamos $\{f(x),f(y)\}$ libre y sea $\lambda x+\mu y=0$. Aplicando $f$ y usando la linealidad y P1:
$$\lambda f(x)+\mu f(y)=f(\lambda x+\mu y)=f(0)=0 .$$
Como $\{f(x),f(y)\}$ es libre, $\lambda=\mu=0$. Por la caracterización de libre (U p.74), $\{x,y\}$ es libre. (E lo hace con coordenadas: de las tres ecuaciones de $\lambda x+\mu y=0$ se quedan las dos primeras, que son $\lambda f(x)+\mu f(y)=0$; el argumento con linealidad es más general y no depende de la fórmula de $f$.)
4. **(D) Falsa**, porque C es cierta.

**Receta.** Ligado $\to$ ligado siempre (P4) y, equivalente, imágenes libres $\Rightarrow$ originales libres. Pero libre $\to$ libre puede fallar (P5): busca dos vectores que solo difieran en lo que $f$ «olvida».

**Error típico.** Creer que una aplicación lineal conserva la independencia (solo lo hacen las inyectivas, §3.2). Y confundir la recíproca (B) con la contrarrecíproca (C) de P4.

**Teoría:** U §3.1 P1, P4, P5 p.103; Ejemplos 3.5, 3.6 p.104; U §2.2 Definiciones 2.5, 2.6 pp.73–74.

---

## Ejemplos propios (dificultad creciente)

### Ejemplo propio 1 (fácil) — ¿lineal o no?

> ¿Son lineales $g:\mathbb R^2\to\mathbb R^2$, $g(x,y)=(x+y,\ 2x-y)$, y $h:\mathbb R^2\to\mathbb R^2$, $h(x,y)=(x+y,\ xy)$?

1. **$g$.** Con $u=(x,y)$, $v=(x',y')$: $g(u+\lambda v)=\big(x+\lambda x'+y+\lambda y',\ 2(x+\lambda x')-(y+\lambda y')\big)$ y $g(u)+\lambda g(v)=(x+y,\,2x-y)+\lambda(x'+y',\,2x'-y')$. Desarrollando, coinciden. **Lineal** (Definición 3.1, U p.101). Es además endomorfismo ($\mathbb R^2\to\mathbb R^2$).
2. **$h$.** $h(0,0)=(0,0)$: el atajo de P1 **no decide**. Probamos escalares con $\lambda=2$, $u=(1,1)$: $h(2,2)=(4,4)$, pero $2h(1,1)=2(2,1)=(4,2)$. Distintos: **no lineal**. El culpable es el producto $xy$ (al multiplicar por $\lambda$ sale $\lambda^2xy$).
*(Sympy: $g$ da diferencia 0; $h(2,2)=(4,4)$, $2h(1,1)=(4,2)$.)*

### Ejemplo propio 2 (medio) — determinar $f$ por una base no canónica

> $f:\mathbb R^2\to\mathbb R^3$ es lineal con $f(1,1)=(2,0,2)$ y $f(1,-1)=(0,2,4)$. Halla $f(x,y)$ y $f(2,4)$.

1. **Base.** $\det\begin{pmatrix}1&1\\1&-1\end{pmatrix}=-2\neq0$: $\{(1,1),(1,-1)\}$ es libre, y al ser 2 vectores en $\mathbb R^2$, base (Teorema 2.6, U p.88).
2. **Coordenadas.** $(x,y)=a(1,1)+b(1,-1)$: $a+b=x$, $a-b=y$ $\Rightarrow$ $a=\tfrac{x+y}2$, $b=\tfrac{x-y}2$.
3. **P3.** $f(x,y)=\tfrac{x+y}2(2,0,2)+\tfrac{x-y}2(0,2,4)=\big(x+y,\ x-y,\ (x+y)+2(x-y)\big)=(x+y,\ x-y,\ 3x-y)$.
4. **Comprobación.** $f(1,1)=(2,0,2)$ ✓, $f(1,-1)=(0,2,4)$ ✓. Y $f(2,4)=(6,-2,2)$. *(Sympy.)*

### Ejemplo propio 3 (tipo examen) — matrices y datos incompatibles

> (a) ¿Son lineales $t,d:\mathcal M_{2\times2}\to\mathbb R$, $t(A)=a_{11}+a_{22}$ (traza) y $d(A)=\det A$?
> (b) ¿Existe una aplicación lineal $f:\mathbb R^2\to\mathbb R^2$ con $f(1,2)=(1,0)$ y $f(2,4)=(3,1)$?

1. **(a) Traza: sí.** $\mathcal M_{2\times2}$ es espacio vectorial (U p.62). Para $A,B$ y $\lambda$: la diagonal de $A+\lambda B$ es $a_{11}+\lambda b_{11}$, $a_{22}+\lambda b_{22}$, luego $t(A+\lambda B)=(a_{11}+a_{22})+\lambda(b_{11}+b_{22})=t(A)+\lambda t(B)$. **Lineal.**
2. **(a) Determinante: no.** $d(0)=0$, así que P1 no decide. Escalares: $d(2I_2)=\det\begin{pmatrix}2&0\\0&2\end{pmatrix}=4$, pero $2\,d(I_2)=2$. **No lineal** (en orden 2, $\det(\lambda A)=\lambda^2\det A$). *(Sympy: $\det(A+\lambda B)-\det A-\lambda\det B$ no es idénticamente 0.)*
3. **(b) No existe.** $(2,4)=2(1,2)$: los dos vectores son **ligados**. Si $f$ fuera lineal, $f(2,4)=f(2\cdot(1,2))=2f(1,2)=(2,0)$, que **no** es $(3,1)$. Los datos son incompatibles con la linealidad. *Moraleja:* las imágenes solo se pueden elegir libremente sobre una **base**; sobre vectores ligados la linealidad las fija (P3, P4, U p.103).

---

## Receta global de la sección (para la chuleta)

1. **¿Es lineal?** Primero $f(0)$: si $\neq0$, **no** (una línea, U p.104). Si $f(0)=0$: con fórmula lineal (sin constantes, productos, potencias, valores absolutos…) se demuestra con la definición $f(x+\lambda y)=f(x)+\lambda f(y)$ desarrollando **los dos miembros por separado**; si hay productos o potencias, contraejemplo con $\lambda=2$ o con una suma.
2. **¿Es endomorfismo?** Lineal **y** espacio inicial = final.
3. **Propiedades (U p.103):** $f(0)=0$, $f(-v)=-f(v)$, $f(\sum a_iv_i)=\sum a_if(v_i)$; ligados $\to$ ligados; libres $\to$ pueden ser ligados; imágenes libres $\Rightarrow$ originales libres.
4. **Imágenes de una base $\Rightarrow f$ entera:** coordenadas del vector en esa base (sistema) y combinación de las imágenes con esas coordenadas.

---

## Tabla de ejercicios cubiertos (E §3.1, pp.80–91)

| Ejercicio | Página E | Tema | Bloque | Teoría U principal | Erratas/avisos |
|---|---|---|---|---|---|
| 3.1 | p.80 | $x_1-x_2+1$: imágenes, no lineal, no endomorfismo | A | Def. 3.1 p.101; P1 p.103; Ej. 3.7 p.104 | falta concluir con un caso concreto; «$\neq$» perdido |
| 3.2 | p.81 | $(2x_1,3x_1+x_2,x_1+x_2)$ lineal, no endomorfismo | A | Def. 3.1 p.101; Ej. 3.2 p.102 | componente repetida en $f(x+y)$ |
| 3.3 | p.83 | $(x_1,1,x_3,1)$ no endomorfismo | A | Def. 3.1; P1 p.103 | espacios no indicados; paréntesis de más |
| 3.4 | p.83 | $f(0)=0$; $5f(3,2)=f(15,10)$ | B | Def. 3.1; P1 p.103; Ej. 3.4 p.104 | — |
| 3.5 | p.84 | Comprobación numérica del 3.4 con el $f$ del 3.2 | B | Def. 3.1; P1 p.103 | «$\neq$» perdido |
| 3.6 | p.84 | V/F con el $f$ no lineal del 3.3 | B | Def. 3.1; P1 p.103 | «$\neq$» perdido |
| 3.7 | p.85 | $(x,1,-x)$: suma, escalares, neutro, lineal | A | Def. 3.1; P1 p.103; Ej. 3.7 p.104 | «Si $\lambda=1$» debe ser «$\lambda\neq1$» |
| 3.8 | p.86 | $(x,0,-x)$ lineal | A | Def. 3.1 p.101 | «es evidente»: falta el cálculo |
| 3.9 | p.86 | Traslación; endomorfismo y $f(0)$; Maxima | A | P1 p.103; Ej. 3.7 p.104 | C: «$\neq$» perdido; D fuera de examen |
| 3.10 | p.87 | Imágenes de la base canónica; plano que contiene la imagen | C | P3 p.103; Def. 2.9–2.10 pp.82–85 | — |
| 3.11 | p.88 | Imágenes de una base no canónica | C | P1, P3 p.103; Def. 2.10 p.85; Teor. 2.6 p.88 | no justifica que sea base; B usa datos no dados |
| 3.12 | p.89 | Determinación por una base; $\mathrm{Im}(f)\neq\mathbb R^3$ | C | P3 p.103; Teor. 2.5 p.88; Def. 3.2 p.106 | B y C son falsas para **toda** $f$, no solo la nula |
| 3.13 | p.90 | $f(0)=0$, $f(-x)=-f(x)$, $f(x-y)$, $f(S)$ subespacio | B | P1, P2 p.103; (2.2) p.66 | D: justificación incompleta |
| 3.14 | p.91 | Libre/ligado e imágenes por la proyección | D | P4, P5 p.103; Ej. 3.5–3.6 p.104; Def. 2.5–2.6 pp.73–74 | — |

**Total: 14 de 14 ejercicios** de la sección 3.1 de E (3.1–3.14). El Ejercicio 3.15 (p.93) pertenece a §3.2–3.3 (matriz asociada e imagen).
