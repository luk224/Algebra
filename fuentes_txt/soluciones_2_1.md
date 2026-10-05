# Soluciones — Sección 2.1 Espacios vectoriales. Subespacios (selección de Ejercicios 2.1–2.14 de E y preguntas de examen)

**Fuentes.** E = *Ejercicios de Álgebra para Ingenieros* (página impresa = PDF − 4); U = *Álgebra para Ingenieros* (página impresa = PDF − 6). Exámenes: `fuentes_txt/examenes/*.txt`, contrastados con `pdftotext -raw` sobre los PDF de `E:\UNED\ALGEBRA\Examenes` cuando el texto salía roto. Todos los cálculos se han comprobado con `sympy` (desarrollo simbólico de ambos miembros de cada propiedad, sustitución de contraejemplos y resolución de sistemas).

**Herramientas de teoría que se usan (todas en U §2.1, pp. 55–68):**

| Resultado | Dónde |
|---|---|
| Operación interna «suma» y externa «producto por escalares» (pueden no ser las estándar) | U §2.1.2 p.55 |
| Ejemplos de operaciones: $\mathbb R^2$ (Ej. 2.1), funciones $f:[a,b]\to\mathbb R$ (Ej. 2.2) | U p.56 |
| **Definición 2.1** espacio vectorial | U p.57 |
| Cuadro de propiedades **S1–S4** (asociativa, neutro, simétrico, conmutativa) y **E1–E4** (distributivas, asociativa de escalares, escalar unidad); grupo y grupo conmutativo | U p.58 |
| Ejemplo 2.3 ($\mathbb R^2$) y generalización a $(\mathbb R^n,+,\mathbb R)$ | U pp.58–59 |
| Ejemplo 2.4: las funciones forman espacio vectorial; la función nula es el neutro | U pp.59–60 |
| Ejemplo 2.5: $\mathbb R^2$ con $\lambda\bullet(x_1,x_2)=(\lambda^2x_1,\lambda x_2)$ **no** es espacio vectorial (falla E2) | U pp.60–61 |
| Ejemplo 2.6: $\wp_n$ (polinomios de grado $\le n$) y $\mathcal M_{n\times m}$ son espacios vectoriales | U p.62 |
| **Definición 2.2** subespacio vectorial | U §2.1.3 p.62 |
| El subespacio no puede ser vacío: $e=\bar 0\in U$; subespacios impropios $\{e\}$ y $V$ | U p.63 |
| **Condición necesaria y suficiente (2.1)**: $U\neq\emptyset$, $u*v\in U$ y $\lambda\bullet u\in U$ $\forall u,v\in U,\ \forall\lambda\in\mathbb R$ | U p.63 (continúa en p.64) |
| **Caracterización (2.2)**: $\lambda u*\mu v\in U\ \ \forall u,v\in U,\ \forall\lambda,\mu\in\mathbb R$ (forma reducida $u+\alpha v\in U$) | U p.66 |
| Ejemplos 2.7, 2.10 (ecuación lineal homogénea ⇒ subespacio); 2.8, 2.9 (término independiente ≠ 0 ⇒ no); 2.11 ($x_1+x_2\le 1$); 2.12 ($x_1x_2=1$); 2.13 (disco) | U pp.64–68 |
| «Los planos y las rectas que pasan por el origen son los únicos subespacios propios de $(\mathbb R^3,+,\mathbb R)$» | U p.68 |
| (Fuera de §2.1, solo para leer la notación de Sept. 2024) $\langle v_1,\dots,v_k\rangle$ = conjunto de combinaciones lineales | U §2.2 p.69 |
| (Fuera de §2.1) Intersección y suma de subespacios | U §2.4 p.89 |

**Selección.** De los 14 ejercicios de E (2.1–2.14, E pp.46–56) se resuelven **8**, elegidos para cubrir todos los tipos:

| Tipo | Ejercicio(s) resueltos | Para practicar (no resueltos aquí) |
|---|---|---|
| Operación interna no estándar (propiedades de grupo) | **2.3** | 2.1 (neutro de la misma operación, con $a>0$), 2.4 ($x*y=xy+1$ en $\mathbb Z$) |
| Operación externa no estándar (propiedades E1–E4) | **2.2** | — |
| ¿Es subespacio? en $\mathbb R^n$ | **2.6**, **2.5** | 2.7 (recta $x_1=x_2$), 2.9 (rectas y planos de $\mathbb R^3$) |
| Subespacios impropios | — | 2.8 ($\emptyset$, $\{e\}$, $\{1\}$) |
| Polinomios | **2.10** (con comentario de 2.11) | 2.11 |
| Progresiones aritméticas | **2.14** | — |
| Intersección / unión | **2.12**, **2.13** | — |

Preguntas de examen resueltas (**6**): Febrero 2020 A Ej. 2 (operación en $\mathbb R$), Febrero 2023 A P.2 ($x_1-x_3\ge0$), Febrero 2024 B P.4 ($x_5-3=-x_3$), Febrero 2026 B P.2 (V/F: cerrado bajo suma ⇒ subespacio), Febrero 2023 B P.2 (funciones con $f(4)=4$), Septiembre 2024 P.7(c) (unión de subespacios). **No incluida:** Febrero 2022 A2 Ej. 3 (núcleo e imagen de $f:\mathbb R^2\to D_{2\times2}$): es de §3.2; la parte de §2.1 que contiene (que las matrices diagonales forman un subespacio de $\mathcal M_{2\times2}$) se trabaja en el **Ejemplo propio 3**.

**Errores u omisiones detectados** (detallados en cada ejercicio):
- **E 2.3**: afirma sin justificar que «∗» es cerrada en $V$ y que el simétrico está en $V$ (hace falta $x_1y_1>0$ y $1/x_1>0$).
- **E 2.10 y 2.11**: dicen que $0\cdot p$ es «un polinomio de grado 0»; el polinomio nulo **no** tiene grado 0 (los de grado 0 son las constantes no nulas); por convención no tiene grado (o se le asigna $-\infty$). La conclusión no cambia.
- **E 2.13**: «A) es falsa» y «C) es falsa» deben leerse como «**no es cierta en general**»: si $U\subseteq V$ o $V\subseteq U$, la unión sí es subespacio.
- **E 2.14** está en la **p.56**, no en la p.55 (el dossier dice 55).
- **Febrero 2024 B P.4 (solución oficial)**: el contraejemplo usa $u=(0,0,2,0,3)$, que **no pertenece a $E$** ($x_5-3=0\neq-2=-x_3$). El razonamiento oficial es inválido; la conclusión (no es subespacio) es correcta.
- **Febrero 2020 A Ej. 2 (solución oficial)**: el desarrollo de $(a\circ b)\circ c$ es incorrecto (le faltan los términos $-bc+ac$), y la frase «no tiene solución para ningún valor de $e$» es imprecisa: $e=0$ **sí** es neutro por la derecha; lo que no existe es un neutro por los dos lados.
- **Dossier** (`dossier_2_1.md`): sitúa el Ej. 2.14 en la p.55 (es la p.56) y resume E 2.9 como «(si pasan por origen: A, B)», lo que puede leerse como que A y B son ciertas; E dice que A y B son **falsas** («cualquier recta/plano»: hay rectas y planos que no pasan por el origen).

> Nota de extracción: en `ejercicios.txt` se pierden los símbolos «≠» (p. ej. E 2.2 D «$(1x_1,0)=(x_1,x_2)$» debe leerse «$\neq$»; E 2.5 «$1\cdot2=2=0$» debe leerse «$2\neq0$»; E 2.10 «si $\lambda=0$» debe leerse «si $\lambda\neq0$» la primera vez). En los exámenes pasa lo mismo («$h(4)=0=4$» es «$0\neq4$»).

---

## Bloque A. Operaciones no estándar y axiomas

### Ejercicio 2.3 (E p.48)

> **Enunciado.** El conjunto $V=\{(x_1,x_2)\mid x_1\in\mathbb R^+,\ x_2\in\mathbb R\}$ con la operación $(x_1,x_2)*(y_1,y_2)=(x_1y_1,\ x_2+y_2)$ verifica: A) Es asociativo. B) Existe elemento neutro. C) Todo elemento tiene un simétrico. D) Es grupo conmutativo.

**Idea.** La operación «∗» multiplica las primeras coordenadas y suma las segundas. Es una «suma» rara, pero el libro avisa de que la operación interna de un espacio vectorial no tiene por qué ser la suma estándar (U p.55). Hay que comprobar una por una las propiedades S1–S4 del cuadro de U p.58.

**Solución.**

0. **Paso previo: la operación es interna (cerrada) en $V$.** Si $(x_1,x_2),(y_1,y_2)\in V$, entonces $x_1>0$ e $y_1>0$, luego $x_1y_1>0$ (producto de positivos), y $x_2+y_2\in\mathbb R$. Por tanto $(x_1,x_2)*(y_1,y_2)\in V$. *Por qué hace falta:* la Definición 2.1 (U p.57) exige que «∗» sea una operación **entre elementos de $V$** con resultado en $V$; si el resultado se saliera de $V$ no tendría sentido hablar de grupo. (E lo afirma sin justificarlo.)
1. **A) Asociativa (S1).** Desarrollamos los dos miembros por separado (técnica de U p.59: «desarrollar independientemente los dos miembros y compararlos»):
   - $[(x_1,x_2)*(y_1,y_2)]*(z_1,z_2)=(x_1y_1,\ x_2+y_2)*(z_1,z_2)=\big((x_1y_1)z_1,\ (x_2+y_2)+z_2\big)$.
   - $(x_1,x_2)*[(y_1,y_2)*(z_1,z_2)]=(x_1,x_2)*(y_1z_1,\ y_2+z_2)=\big(x_1(y_1z_1),\ x_2+(y_2+z_2)\big)$.
   
   Coinciden porque el producto y la suma de números reales son asociativos. **A) es verdadera.**
2. **B) Elemento neutro (S2).** Buscamos $(e_1,e_2)\in V$ con $(x_1,x_2)*(e_1,e_2)=(x_1,x_2)$ para **todo** $(x_1,x_2)\in V$:
   $$x_1e_1=x_1,\quad x_2+e_2=x_2 .$$
   Como $x_1>0$ podemos dividir: $e_1=1$; y $e_2=0$. Candidato $(1,0)$. Hay que comprobar tres cosas: (i) $(1,0)\in V$ porque $1>0$; (ii) por la izquierda también funciona: $(1,0)*(x_1,x_2)=(1\cdot x_1,0+x_2)=(x_1,x_2)$ (S2 pide $a*e=e*a=a$, U p.58); (iii) no depende de $(x_1,x_2)$. **B) es verdadera; el neutro es $(1,0)$, no $(0,0)$** (que ni siquiera está en $V$).
3. **C) Simétrico (S3).** Dado $(x_1,x_2)\in V$, buscamos $(x_1',x_2')\in V$ con $(x_1,x_2)*(x_1',x_2')=(1,0)$ (¡el neutro de **esta** operación!):
   $$x_1x_1'=1\Rightarrow x_1'=\tfrac1{x_1}\ (\text{posible porque }x_1\neq0),\qquad x_2+x_2'=0\Rightarrow x_2'=-x_2 .$$
   El candidato $\left(\tfrac1{x_1},-x_2\right)$ **pertenece a $V$** porque $\tfrac1{x_1}>0$ al ser $x_1>0$, y por conmutatividad de $\cdot$ y $+$ en $\mathbb R$ también vale por la izquierda. **C) es verdadera.**
4. **D) Grupo conmutativo.** Por A), B), C) ya es grupo (S1–S3, U p.58). Falta S4: $(x_1,x_2)*(y_1,y_2)=(x_1y_1,x_2+y_2)$ y $(y_1,y_2)*(x_1,x_2)=(y_1x_1,y_2+x_2)$, iguales por la conmutatividad en $\mathbb R$. **D) es verdadera.**

**Resultado:** A, B, C y D verdaderas. Comprobado con sympy (diferencia de ambos miembros $=0$; $(x_1,x_2)*(1/x_1,-x_2)=(1,0)$).

**Por qué es importante este conjunto.** La aplicación $(x_1,x_2)\mapsto(\ln x_1,x_2)$ convierte «∗» en la suma estándar de $\mathbb R^2$; por eso todo funciona. Si $V$ incluyera pares con $x_1=0$ o $x_1<0$, fallaría S3 ($0$ no tiene inverso) o el cierre.

**Receta.** Para estudiar una operación interna rara: (0) comprueba que es **cerrada** en el conjunto; (1) asociativa y (4) conmutativa desarrollando los dos miembros por separado; (2) el neutro se **despeja** de $a*e=a$ y se comprueba que no depende de $a$, que vale por los dos lados y que **pertenece al conjunto**; (3) el simétrico se despeja de $a*a'=e$ con **ese** $e$ y se comprueba que pertenece al conjunto.

**Error típico.** Dar por hecho que el neutro es $(0,0)$ y el simétrico $(-x_1,-x_2)$ «como siempre». El neutro y el simétrico dependen de la operación. Otro error: olvidar comprobar que el neutro/simétrico pertenecen a $V$.

**Teoría:** Definición 2.1 y cuadro S1–S4, U §2.1.2 pp.57–58.

---

### Ejercicio 2.2 (E p.47)

> **Enunciado.** Compruébese si $\lambda\bullet(x_1,x_2)=(\lambda x_1,0)$ (operación de escalares con pares de $\mathbb R^2$) verifica las siguientes propiedades: A) Distributiva de los escalares respecto a los vectores. B) Distributiva de los vectores respecto a los escalares. C) Asociativa $(\lambda\mu)\bullet x=\lambda\bullet(\mu\bullet x)$. D) Existencia de escalar unidad.

Se sobrentiende que la suma de pares es la estándar $(x_1,x_2)+(y_1,y_2)=(x_1+y_1,x_2+y_2)$ (el enunciado no da otra). Las propiedades A–D son E1–E4 del cuadro de U p.58.

**Solución.** Sean $x=(x_1,x_2)$, $y=(y_1,y_2)$ y $\lambda,\mu\in\mathbb R$ arbitrarios.

1. **A) = E1: $\lambda\bullet(x+y)=\lambda\bullet x+\lambda\bullet y$.**
   - Primer miembro: $\lambda\bullet(x_1+y_1,x_2+y_2)=\big(\lambda(x_1+y_1),0\big)=(\lambda x_1+\lambda y_1,0)$.
   - Segundo miembro: $(\lambda x_1,0)+(\lambda y_1,0)=(\lambda x_1+\lambda y_1,0)$.
   
   Iguales (distributiva de $\mathbb R$). **Verdadera.**
2. **B) = E2: $(\lambda+\mu)\bullet x=\lambda\bullet x+\mu\bullet x$.**
   - Primer miembro: $\big((\lambda+\mu)x_1,0\big)=(\lambda x_1+\mu x_1,0)$.
   - Segundo miembro: $(\lambda x_1,0)+(\mu x_1,0)=(\lambda x_1+\mu x_1,0)$. **Verdadera.**
3. **C) = E3: $(\lambda\mu)\bullet x=\lambda\bullet(\mu\bullet x)$.**
   - Primer miembro: $(\lambda\mu x_1,0)$.
   - Segundo miembro: $\lambda\bullet(\mu x_1,0)=(\lambda\mu x_1,0)$. **Verdadera.**
4. **D) = E4: $1\bullet x=x$ para todo $x$.** $1\bullet(x_1,x_2)=(x_1,0)$, que es distinto de $(x_1,x_2)$ en cuanto $x_2\neq0$. Para negar un «para todo» basta **un** contraejemplo concreto: $1\bullet(1,1)=(1,0)\neq(1,1)$. **Falsa.**

**Conclusión (la que interesa en examen).** $(\mathbb R^2,+,\bullet)$ **no es espacio vectorial**: aunque $(\mathbb R^2,+)$ es grupo conmutativo (U p.58–59) y se cumplen E1, E2, E3, falla E4. Este ejercicio muestra que E4 no es «decorativa»: sin ella, el producto podría «borrar» información del vector. (Compárese con el Ejemplo 2.5 de U p.60, donde lo que falla es E2.)

Comprobado con sympy: diferencias de A, B, C nulas; `dot(1,(1,1)) = (1,0)`.

**Receta.** Para cada propiedad E1–E4: escribe los dos miembros con vectores genéricos, desarróllalos por separado aplicando la definición de la operación y compáralos. Si una igualdad falla, da un **contraejemplo numérico** (con números concretos), que es lo que exige la justificación en examen.

**Error típico.** Comprobar la igualdad «con un ejemplo que sale bien» y concluir que se cumple. Para afirmar una propiedad hay que demostrarla con elementos **genéricos**; para negarla basta un contraejemplo.

**Teoría:** cuadro E1–E4, U p.58; Ejemplo 2.5, U pp.60–61.

---

### Examen Febrero 2020, tipo A, Ejercicio 2 (`Algebra_Febrero20A.txt`)

> **Enunciado.** Estudiar si la operación definida en el conjunto de los números reales $\mathbb R$, mediante $a\circ b=a\cdot b-b+a$ verifica las propiedades: asociativa, conmutativa, elemento neutro y elemento simétrico.

(En el PDF el símbolo de la operación no se extrae; lo escribimos $\circ$.)

**Solución.** Es una operación interna de $\mathbb R$ (sumas y productos de reales dan un real). Para cada propiedad: si es cierta, demostración general; si es falsa, **contraejemplo con números**.

1. **Conmutativa.** $a\circ b=ab-b+a$ y $b\circ a=ba-a+b$. Su diferencia es $(ab-b+a)-(ab-a+b)=2a-2b$, que solo es 0 si $a=b$. Contraejemplo: $0\circ1=0-1+0=-1$, pero $1\circ0=0-0+1=1$. **No es conmutativa.**
2. **Asociativa.** Desarrollamos los dos miembros:
   - $(a\circ b)\circ c=(ab-b+a)c-c+(ab-b+a)=abc-bc+ac-c+ab-b+a$.
   - $a\circ(b\circ c)=a(bc-c+b)-(bc-c+b)+a=abc-ac+ab-bc+c-b+a$.
   
   Diferencia: $(ac-c)-(-ac+c)=2ac-2c=2c(a-1)$, que no es 0 en general. Contraejemplo con $a=0,b=0,c=1$: $(0\circ0)\circ1=0\circ1=-1$, mientras que $0\circ(0\circ1)=0\circ(-1)=0-(-1)+0=1$. **No es asociativa.**
3. **Elemento neutro.** Debe existir un **único** $e\in\mathbb R$ con $a\circ e=a$ **y** $e\circ a=a$ para todo $a$ (S2, U p.58).
   - Por la derecha: $a\circ e=ae-e+a=a\iff e(a-1)=0$ para todo $a$ $\iff e=0$. Así que $e=0$ **sí** es neutro por la derecha: $a\circ0=a$.
   - Por la izquierda: $0\circ a=0\cdot a-a+0=-a$, que es distinto de $a$ si $a\neq0$ (p. ej. $0\circ1=-1\neq1$). Más en general, $e\circ a=a\iff e(a+1)=2a\iff e=\tfrac{2a}{a+1}$, que depende de $a$ ($a=0\Rightarrow e=0$; $a=1\Rightarrow e=1$): no hay un $e$ común.
   
   **No existe elemento neutro** (solo neutro por la derecha).
4. **Elemento simétrico.** La definición de simétrico, $a\circ a'=a'\circ a=e$ (S3, U p.58), **requiere** un elemento neutro $e$. Como no existe, la propiedad no se cumple (no tiene sentido).

**Resultado:** no cumple ninguna de las cuatro propiedades. Comprobado con sympy: $(a\circ b)\circ c-a\circ(b\circ c)=2ac-2c$; $a\circ0=a$, $0\circ a=-a$; `solve(e*a-a+e-a, e) = 2a/(a+1)`.

**Errores de la solución oficial.** (i) Escribe $(a\circ b)\circ c=abc-c+ab-b+a$: al multiplicar $(ab-b+a)c$ olvida $-bc+ac$. La conclusión es correcta, pero el desarrollo no. (ii) Dice que $a e-e+a=a$ «no tiene solución para ningún valor de $e$»: falso, $e=0$ la cumple; lo que falla es la condición por la izquierda.

**Receta.** Operación en $\mathbb R$: conmutativa ⇒ resta $a\circ b-b\circ a$; asociativa ⇒ desarrolla los dos miembros y resta; neutro ⇒ resuelve **las dos** ecuaciones $a\circ e=a$ y $e\circ a=a$ y exige que la solución sea la misma y no dependa de $a$; simétrico solo si hay neutro. Toda negación, con contraejemplo numérico.

**Error típico.** Comprobar solo $a\circ e=a$ y concluir que $e=0$ es neutro. En una operación no conmutativa hay que mirar los dos lados.

**Teoría:** propiedades S1–S4, U p.58; mismo tipo que E Ej. 2.4 p.49.

---

## Bloque B. ¿Es subespacio? en $\mathbb R^n$ y en $\mathcal M_{2\times2}$

**Método general (U pp.63 y 66).** Para ver si $W\subseteq V$ es subespacio:
- **Filtro rápido:** si $\bar 0\notin W$, **no** es subespacio (U p.63: todo subespacio contiene al neutro). Si $\bar0\in W$, **no se puede concluir nada todavía**.
- **Demostrar que sí:** tomar $u,v\in W$ y $\lambda,\mu\in\mathbb R$ **genéricos** y probar que $\lambda u+\mu v\in W$ (caracterización (2.2), U p.66), o probar por separado $u+v\in W$ y $\lambda u\in W$ (condición (2.1), U p.63).
- **Demostrar que no:** dar vectores **concretos** de $W$ y escalares concretos cuya combinación se salga de $W$.

### Ejercicio 2.6 (E p.50)

> **Enunciado.** Se pide justificar si alguno de los siguientes subconjuntos de $\mathbb R^4$ es subespacio vectorial de $\mathbb R^4$: A) $A=\{(x_1,x_2,x_3,x_4)\in\mathbb R^4\mid x_1+x_2=1\}$. B) $B=\{(x_1,x_2,x_3,x_4)\in\mathbb R^4\mid x_1=x_2\}$. C) $C=\{(x_1,x_2,x_3,x_4)\in\mathbb R^4\mid x_1=x_2=1\}$.

**Solución.**

1. **A no es subespacio.** El neutro de $(\mathbb R^4,+)$ es $\bar0=(0,0,0,0)$ y $0+0=0\neq1$, luego $\bar0\notin A$. Como todo subespacio contiene al neutro (U p.63), $A$ no es subespacio. (Geométricamente, un «hiperplano» que no pasa por el origen; cf. Ejemplo 2.9 de U p.66.)
2. **C no es subespacio**, por el mismo motivo: $\bar0$ tiene $x_1=0\neq1$.
3. **B sí es subespacio.** Usamos la caracterización (2.2) (U p.66).
   - $B\neq\emptyset$: $\bar0\in B$ porque $0=0$.
   - Sean $\bar x=(x_1,x_2,x_3,x_4),\ \bar y=(y_1,y_2,y_3,y_4)\in B$, es decir, $x_1=x_2$ e $y_1=y_2$, y sean $\alpha,\beta\in\mathbb R$ cualesquiera. Entonces
   $$\alpha\bar x+\beta\bar y=(\alpha x_1+\beta y_1,\ \alpha x_2+\beta y_2,\ \alpha x_3+\beta y_3,\ \alpha x_4+\beta y_4).$$
   - Su primera coordenada es $\alpha x_1+\beta y_1=\alpha x_2+\beta y_2$ (sustituyendo $x_1=x_2$, $y_1=y_2$), que es su segunda coordenada. Luego $\alpha\bar x+\beta\bar y\in B$.

**Resultado:** solo $B$ es subespacio.

**Receta.** Subconjunto de $\mathbb R^n$ dado por ecuaciones: si las ecuaciones son **lineales y homogéneas** (sin término independiente), es subespacio y se demuestra con $\alpha\bar x+\beta\bar y$; si hay un término independiente no nulo, $\bar0$ no las cumple y no es subespacio.

**Error típico.** Concluir que A no es subespacio «porque no es una ecuación bonita» sin decir por qué; la justificación es «$\bar0\notin A$ porque $0+0\neq1$».

**Teoría:** U p.63 ($\bar0\in U$), caracterización (2.2) U p.66; Ejemplos 2.9 y 2.10, U pp.66–67.

---

### Examen Febrero 2023, 1.ª semana, pregunta 2 (`Algebra_Febrero23A.txt`)

> **Enunciado.** Sea $V=\mathbb R^4$ y $E=\{(x_1,x_2,x_3,x_4)\in V: x_1-x_3\ge0\}$. Determine de manera razonada si el conjunto $E$ es un subespacio vectorial del espacio vectorial $V$.

**Solución.**

1. **El filtro del cero no decide.** $\bar0\in E$ porque $0-0=0\ge0$. Que contenga al cero es necesario pero **no suficiente** (U p.63; E p.45, último punto), así que hay que seguir.
2. **Intuición.** Una desigualdad describe un «semiespacio». La suma de dos vectores de $E$ sigue en $E$ (suma de números $\ge0$ es $\ge0$), pero multiplicar por un número **negativo** cambia el signo. Ahí buscamos el contraejemplo.
3. **Contraejemplo.** $u=(1,0,0,0)\in E$ porque $1-0=1\ge0$. Tomamos $\lambda=-1$: $\lambda u=(-1,0,0,0)$ y $-1-0=-1<0$, luego $\lambda u\notin E$.
4. **Conclusión.** Falla la condición $\lambda u\in E\ \forall\lambda\in\mathbb R,\ \forall u\in E$ de (2.1) (U p.63). **$E$ no es subespacio de $\mathbb R^4$.**

(La solución oficial usa $\lambda u+\beta v$ con $v=\bar0$ y $\lambda=\beta=-1$; es el mismo contraejemplo.)

**Receta.** Conjunto definido por una **desigualdad** ($\ge$, $\le$, $>$): casi nunca es subespacio; el contraejemplo se obtiene multiplicando un vector con desigualdad estricta por $\lambda=-1$.

**Error típico.** Comprobar solo la suma (que sí funciona) y concluir que es subespacio; o decir «no es subespacio porque es una desigualdad» sin dar el contraejemplo.

**Teoría:** condición (2.1), U p.63; Ejemplo 2.11 ($x_1+x_2\le1$), U p.67.

---

### Examen Febrero 2024, 2.ª semana, pregunta 4 (`Algebra_Febrero24B.txt`)

> **Enunciado.** Sea $V=\mathbb R^5$ y $E=\{(x_1,x_2,x_3,x_4,x_5)\in V: x_5-3=-x_3\}$. Determine de manera razonada si el conjunto $E$ es un subespacio vectorial del espacio vectorial $V$.

**Solución.**

1. **Reescribimos la condición** dejando las incógnitas a un lado: $x_5-3=-x_3\iff x_3+x_5=3$. Es una ecuación lineal **con término independiente 3**: sospechamos que no es subespacio.
2. **Filtro del cero.** Para $\bar0=(0,0,0,0,0)$: $x_3+x_5=0\neq3$, luego $\bar0\notin E$.
3. **Conclusión.** Todo subespacio contiene el elemento neutro de $(V,+)$ (U p.63). Como $\bar0\notin E$, **$E$ no es subespacio de $\mathbb R^5$.**
4. *(Alternativa, si se quiere usar la caracterización.)* $u=(0,0,3,0,0)\in E$ ($3+0=3$) y $v=(0,0,0,0,3)\in E$ ($0+3=3$), pero $u+v=(0,0,3,0,3)$ cumple $x_3+x_5=6\neq3$, luego $u+v\notin E$.

**Error en la solución oficial.** Toma $u=(0,0,2,0,3)$, pero $u\notin E$: $x_3+x_5=2+3=5\neq3$ (equivalentemente, $x_5-3=0\neq-2=-x_3$). Un contraejemplo tiene que partir de vectores **que sí estén** en el conjunto; si no, no demuestra nada. La conclusión oficial es correcta, pero el razonamiento no lo es. Comprobado: `inE((0,0,2,0,3)) = False`.

**Receta.** Ecuación lineal con término independiente $\neq0$ ⇒ basta con decir «$\bar0\notin E$ porque al sustituir $\bar0$ queda $0=3$, falso; todo subespacio contiene a $\bar0$ (U p.63)». Es la justificación más corta y la más segura.

**Error típico.** El de la solución oficial: elegir vectores para el contraejemplo sin comprobar que pertenecen al conjunto.

**Teoría:** U p.63; Ejemplo 2.8 ($u_1=1$), U p.65.

---

### Ejercicio 2.5 (E p.50)

> **Enunciado.** Se pide demostrar que $(U,+)$ no es subgrupo de $(\mathbb R^2,+)$ si $U=\{(x_1,x_2)\mid x_1x_2=0\}\subset\mathbb R^2$.

$U$ es la unión de los dos ejes coordenados ($x_1=0$ o $x_2=0$). En el lenguaje de §2.1: probaremos que no es subespacio, y que el motivo es la suma.

**Solución.**

1. **El cero está:** $(0,0)$ cumple $0\cdot0=0$. No basta (E p.50, nota al margen: el neutro es necesario pero no suficiente).
2. **El producto por escalares sí se conserva:** si $x_1x_2=0$, $(\lambda x_1)(\lambda x_2)=\lambda^2x_1x_2=0$. Así que tampoco falla por ahí.
3. **La suma no se conserva.** En general $(x_1+y_1)(x_2+y_2)=x_1x_2+x_1y_2+y_1x_2+y_1y_2=x_1y_2+y_1x_2$, que no tiene por qué ser 0. **Contraejemplo concreto:** $(1,0)\in U$ ($1\cdot0=0$) y $(0,2)\in U$ ($0\cdot2=0$), pero $(1,0)+(0,2)=(1,2)$ y $1\cdot2=2\neq0$, luego $(1,2)\notin U$.
4. **Conclusión.** $U$ no es cerrado para la suma, luego $(U,+)$ no es grupo con la suma de $\mathbb R^2$ (no es subgrupo) y, por la condición (2.1) (U p.63), **tampoco es subespacio** de $(\mathbb R^2,+,\mathbb R)$.

Comprobado con sympy: $(1,0)+(0,2)=(1,2)$; $(\lambda x_1)(\lambda x_2)=\lambda^2x_1x_2$.

**Receta.** Condición **no lineal** (productos, cuadrados): busca dos vectores «en direcciones distintas» que cumplan la condición y súmalos. Un ejemplo numérico concreto es la justificación que se pide.

**Error típico.** Pensar que, como contiene a $\bar0$ y es cerrado por escalares, ya es subespacio. Hay que comprobar **las dos** condiciones.

**Teoría:** condición (2.1), U p.63; Ejemplo 2.12 ($x_1x_2=1$), U p.68.

---

### Examen Febrero 2026, 2.ª semana, pregunta 2 (`Algebra-Febrero2026-B.txt`)

> **Enunciado.** Razone si la siguiente afirmación es verdadera: Sea $Z$ un subconjunto de $\mathcal M_{2\times2}$ (matrices reales de orden 2). Si para todos $A,B\in Z$ se tiene que $A+B\in Z$, entonces $Z$ es subespacio vectorial de $\mathcal M_{2\times2}$.

**Solución.**

1. **Qué dice la teoría.** Por la condición (2.1) (U p.63), $Z$ es subespacio si y solo si es no vacío y cumple **dos** condiciones: cerrado para la suma **y** cerrado para el producto por escalares. La afirmación solo da la primera, así que sospechamos que es **falsa**. Para probarlo basta **un** conjunto $Z$ cerrado para la suma que no sea cerrado por escalares.
2. **Construimos el contraejemplo** (el de la solución oficial):
$$Z=\left\{\begin{pmatrix}x_1&x_2\\x_3&x_4\end{pmatrix}\in\mathcal M_{2\times2}: x_1\in\mathbb N\right\}.$$
3. **$Z$ es cerrado para la suma.** Si $A,B\in Z$, sus entradas $(1,1)$ son números naturales $a,b$, y la entrada $(1,1)$ de $A+B$ es $a+b\in\mathbb N$ (la suma de naturales es natural). Luego $A+B\in Z$.
4. **$Z$ no es cerrado por escalares.** $\begin{pmatrix}2&0\\0&0\end{pmatrix}\in Z$ (pues $2\in\mathbb N$), pero $(-1)\begin{pmatrix}2&0\\0&0\end{pmatrix}=\begin{pmatrix}-2&0\\0&0\end{pmatrix}\notin Z$ porque $-2\notin\mathbb N$.
5. **Conclusión.** **La afirmación es falsa.**

*Otro contraejemplo igual de válido* (más geométrico): en $\mathcal M_{2\times2}$, las matrices con todas las entradas $\ge0$; o, en $\mathbb R^2$, el primer cuadrante $\{x\ge0,\ y\ge0\}$.

**Receta.** Pregunta V/F «si se cumple una parte de la definición, entonces…»: compara con la definición completa; si falta una condición, construye un conjunto que cumpla la que se da y falle la otra (los conjuntos con «$\ge0$» o con «$\in\mathbb N$» son cerrados para la suma pero no por $\lambda=-1$).

**Error típico.** Contestar «verdadero, porque un subespacio es cerrado para la suma» (es el recíproco el que es cierto: subespacio ⇒ cerrado para la suma, no al revés).

**Teoría:** condición (2.1), U p.63; $\mathcal M_{n\times m}$ es espacio vectorial, Ejemplo 2.6, U p.62.

---

## Bloque C. Otros espacios: polinomios, funciones, progresiones

### Ejercicio 2.10 (E p.52) — con comentario del 2.11 (E p.53)

> **Enunciado.** Se pide justificar si el conjunto de polinomios reales de grado cuatro con las operaciones estándar de sumar polinomios y multiplicar polinomios por escalares verifica: A) La suma de dos de sus elementos pertenece al conjunto. B) Un escalar por un polinomio del conjunto pertenece al conjunto. C) Es espacio vectorial.

Sea $G_4=\{ax^4+bx^3+cx^2+dx+e:\ a,b,c,d,e\in\mathbb R,\ a\neq0\}$ (grado **exactamente** 4).

**Solución.**

1. **A) Falsa.** Para que la suma pierda el grado basta que los coeficientes de $x^4$ se cancelen. Contraejemplo de E: $(-5x^4+4x^2-x+7)+(5x^4+3x^3+x^2)=3x^3+5x^2-x+7$, de grado 3, luego no está en $G_4$ (comprobado con sympy). Un ejemplo aún más simple: $x^4+(-x^4)=0$.
2. **B) Falsa.** Si $\lambda\neq0$, $\lambda p$ tiene coeficiente principal $\lambda a\neq0$ y sigue siendo de grado 4. Pero con $\lambda=0$: $0\cdot p=0$, el **polinomio nulo**, que no tiene grado 4. Luego $0\cdot p\notin G_4$.
3. **C) Falsa.** Bastaría una de las dos razones anteriores (falla (2.1), U p.63). Lo más directo: el neutro de la suma de polinomios es el polinomio nulo, y **$0\notin G_4$**, así que $G_4$ no tiene elemento neutro (falla S2) y no puede ser espacio vectorial.

**Matiz sobre E.** E escribe que $0\cdot p$ «es un polinomio de grado 0». No es exacto: los polinomios de grado 0 son las constantes **no nulas**; el polinomio nulo no tiene grado (por convención, $-\infty$). Lo relevante es que no tiene grado 4. Lo mismo en el 2.11.

**Comparación con el Ejercicio 2.11 (para practicar).** Si se cambia «grado 4» por «grado $\le4$», el conjunto es $\wp_4$ y **sí** es espacio vectorial (Ejemplo 2.6 de U p.62, notación $\wp_n$): la suma y el producto por escalares solo cambian coeficientes, y un coeficiente principal que se anula deja un polinomio de grado menor, que sigue en $\wp_4$; el polinomio nulo está en $\wp_4$. Es además subespacio del espacio de todos los polinomios.

**Receta.** «Grado exactamente $n$», «determinante $\neq0$», «primera coordenada $\neq0$»… son condiciones de tipo «$\neq$»: el cero no las cumple, así que **nunca** son subespacios. «Grado $\le n$» sí.

**Error típico.** Confundir «grado 4» con «grado $\le4$». El primero no contiene al polinomio nulo.

**Teoría:** Ejemplo 2.6 ($\wp_n$), U p.62; U p.63 (el neutro pertenece al subespacio).

---

### Examen Febrero 2023, 2.ª semana, pregunta 2 (`Algebra_Febrero23B.txt`)

> **Enunciado.** Sea $V$ el espacio vectorial de las funciones $f:\mathbb R\to\mathbb R$ y consideramos $E=\{f\in V: f(4)=4\}$. Determine de manera razonada si el conjunto $E$ es un subespacio vectorial del espacio vectorial $V$.

**Solución.**

1. **Quién es el «cero» de $V$.** Las operaciones son $(f+g)(x)=f(x)+g(x)$ y $(\lambda f)(x)=\lambda f(x)$ (Ejemplo 2.2, U p.56). El elemento neutro es la **función nula** $h(x)=0$ para todo $x$ (Ejemplo 2.4, U p.59; allí con dominio $[a,b]$, aquí con dominio $\mathbb R$, el razonamiento es idéntico).
2. **Filtro del cero.** $h(4)=0\neq4$, luego $h\notin E$.
3. **Conclusión.** Como todo subespacio contiene al neutro (U p.63), **$E$ no es subespacio de $V$.**
4. *(Alternativa con la caracterización, como en la solución oficial.)* $f(x)=4$ (constante) cumple $f(4)=4$, y $g(x)=8-x$ cumple $g(4)=4$; ambas están en $E$. Su suma $(f+g)(x)=12-x$ vale $8\neq4$ en $x=4$, luego $f+g\notin E$.

**Receta.** En espacios de funciones, una condición «$f(\text{punto})=c$» define un subespacio **si y solo si** $c=0$ (si $c=0$: $(\lambda f+\mu g)(4)=\lambda\cdot0+\mu\cdot0=0$). Para $c\neq0$, basta con la función nula.

**Error típico.** Pensar que el neutro es «la función $f(x)=x$» o «la constante 1». El neutro de la suma de funciones es la función que vale 0 en todo punto.

**Teoría:** Ejemplos 2.2 y 2.4, U pp.56 y 59–60; U p.63.

---

### Ejercicio 2.14 (E p.56)

> **Enunciado.** Se pide comprobar si el subconjunto $P$ de $\mathbb R^n$ formado por todas las $n$-uplas de números reales tales que los elementos de cada una de ellas forman una progresión aritmética de $n$ términos verifica: A) La suma de dos elementos de $P$ pertenece a $P$. B) El producto de un escalar por un elemento de $P$ pertenece a $P$. C) $(P,+)$ no tiene elemento neutro. D) $(P,+,\mathbb R)$ es subespacio vectorial de $(\mathbb R^n,+,\mathbb R)$.

**Traducción.** Una progresión aritmética de primer término $a$ y diferencia (razón) $d$ es $a,\ a+d,\ a+2d,\dots$. Por tanto
$$P=\{(a,\ a+d,\ a+2d,\ \dots,\ a+(n-1)d):\ a,d\in\mathbb R\}.$$
Ejemplo con $n=4$: $(1,3,5,7)\in P$ ($a=1,d=2$); $(1,2,4,8)\notin P$ (las diferencias no son constantes).

**Solución.**

1. **A) Verdadera.** Sean $p=(a,a+d,\dots,a+(n-1)d)$ y $q=(a',a'+d',\dots,a'+(n-1)d')$. La coordenada $k$-ésima de $p+q$ ($k=0,\dots,n-1$) es
$$(a+kd)+(a'+kd')=(a+a')+k(d+d'),$$
luego $p+q$ es la progresión de primer término $a+a'$ y diferencia $d+d'$: $p+q\in P$.
2. **B) Verdadera.** La coordenada $k$-ésima de $\lambda p$ es $\lambda(a+kd)=\lambda a+k(\lambda d)$: progresión de primer término $\lambda a$ y diferencia $\lambda d$. $\lambda p\in P$.
3. **C) Falsa.** El neutro de $(\mathbb R^n,+)$ es $\bar0=(0,\dots,0)$, que es la progresión con $a=0$, $d=0$; luego $\bar0\in P$ y $(P,+)$ sí tiene neutro.
4. **D) Verdadera.** $P$ es no vacío (paso 3) y cumple A) y B), que es la condición necesaria y suficiente (2.1) (U p.63).

Comprobado con sympy para $n=5$: $P(a,d)+P(a',d')-P(a+a',d+d')=\bar0$ y $\lambda P(a,d)-P(\lambda a,\lambda d)=\bar0$.

**Otra forma de verlo (útil en §2.2).** $(x_1,\dots,x_n)\in P\iff x_{i+1}-x_i$ es constante $\iff x_{i+2}-2x_{i+1}+x_i=0$ para $i=1,\dots,n-2$: un sistema de ecuaciones **lineales homogéneas**, y por eso es subespacio (como en el Ejemplo 2.7 de U p.64). Además $P$ es el conjunto de combinaciones $a(1,1,\dots,1)+d(0,1,2,\dots,n-1)$.

**Receta.** Si un conjunto viene dado por **parámetros** que aparecen de forma lineal ($a$, $d$), suma dos elementos genéricos y comprueba que el resultado tiene la misma forma con parámetros $a+a'$, $d+d'$; igual con $\lambda$.

**Error típico.** Sumar progresiones concretas (p. ej. dos ejemplos) y concluir que «siempre» funciona; hay que hacerlo con $a,d,a',d'$ genéricos.

**Teoría:** condición (2.1), U p.63; Ejemplo 2.7, U p.64.

---

## Bloque D. Intersección y unión de subespacios

### Ejercicio 2.12 (E p.54)

> **Enunciado.** Si $U$ y $V$ son subespacios vectoriales de $(\mathbb R^n,+,\mathbb R)$. Se pide demostrar que $U\cap V$ es un subespacio vectorial de $(\mathbb R^n,+,\mathbb R)$.

**Solución.** Recordemos: $w\in U\cap V$ significa $w\in U$ **y** $w\in V$. Aplicamos la condición (2.1) (U p.63): no vacío, cerrado para la suma, cerrado por escalares.

1. **$U\cap V\neq\emptyset$.** $U$ y $V$ son subespacios, luego ambos contienen el neutro $\bar0$ de $(\mathbb R^n,+)$ (U p.63; es el **mismo** $\bar0$ porque los dos usan las operaciones de $\mathbb R^n$). Por tanto $\bar0\in U\cap V$.
2. **Cerrado para la suma.** Sean $x,y\in U\cap V$.
   - Como $x,y\in U$ y $U$ es subespacio, $x+y\in U$.
   - Como $x,y\in V$ y $V$ es subespacio, $x+y\in V$.
   - Luego $x+y\in U\cap V$.
3. **Cerrado por escalares.** Sean $\lambda\in\mathbb R$ y $x\in U\cap V$. $x\in U\Rightarrow\lambda x\in U$; $x\in V\Rightarrow\lambda x\in V$. Luego $\lambda x\in U\cap V$.
4. **Conclusión.** Por (2.1), $U\cap V$ es subespacio vectorial de $\mathbb R^n$ (y, por la Definición 2.2, $(U\cap V,+,\mathbb R)$ es espacio vectorial).

**Observación.** La demostración no usa nada propio de $\mathbb R^n$: vale para dos subespacios de cualquier espacio vectorial $V$ (U lo usa en §2.4, p.89). Y, en la práctica, si $U$ y $V$ vienen dados por ecuaciones cartesianas, $U\cap V$ son **todas las ecuaciones juntas**.

**Receta.** Para demostrar una propiedad «general» de subespacios: escribe qué significa pertenecer al conjunto (aquí: estar en ambos), y aplica la hipótesis de subespacio a **cada** uno por separado. No basta un ejemplo (E p.54, nota al margen).

**Error típico.** «Demostrarlo» con dos rectas concretas de $\mathbb R^2$. Un ejemplo ilustra, no demuestra.

**Teoría:** condición (2.1) y $\bar0\in U$, U p.63; Definición 2.2, U p.62.

---

### Ejercicio 2.13 (E p.55)

> **Enunciado.** Si $U$ y $V$ son subespacios de $(\mathbb R^n,+,\mathbb R)$ se pide demostrar si se verifica: A) La suma de dos elementos de $U\cup V$ está en $U\cup V$. B) Un número real por un elemento de $U\cup V$ está en $U\cup V$. C) $U\cup V$ es un subespacio de $(\mathbb R^n,+,\mathbb R)$.

Ahora $w\in U\cup V$ significa $w\in U$ **o** $w\in V$ (o en ambos).

**Solución.**

1. **A) No es cierta en general (contraejemplo).** En $\mathbb R^2$, sean $U=\{(x_1,x_2): x_1=0\}$ (eje vertical) y $V=\{(x_1,x_2): x_1=x_2\}$ (diagonal); ambos son subespacios (ecuación lineal homogénea, como en E 2.6 B). Entonces $(0,5)\in U\subseteq U\cup V$ y $(3,3)\in V\subseteq U\cup V$, pero
$$(0,5)+(3,3)=(3,8),$$
que no está en $U$ ($3\neq0$) ni en $V$ ($3\neq8$), luego $(3,8)\notin U\cup V$.
2. **B) Verdadera (demostración general).** Sea $x\in U\cup V$ y $\lambda\in\mathbb R$. Hay dos casos: si $x\in U$, como $U$ es subespacio, $\lambda x\in U\subseteq U\cup V$; si $x\in V$, análogamente $\lambda x\in V\subseteq U\cup V$. En los dos casos $\lambda x\in U\cup V$.
3. **C) No es cierta en general**, porque falla A) en el ejemplo del paso 1, y la condición (2.1) (U p.63) exige que la suma se quede dentro.

**Matiz sobre E.** E dice «A) es falsa» y «C) es falsa». Más exactamente: **no son ciertas para todo par** $U,V$. Si uno está contenido en el otro (p. ej. $U\subseteq V$), entonces $U\cup V=V$, que sí es subespacio. De hecho se cumple:

> $U\cup V$ es subespacio $\iff U\subseteq V$ o $V\subseteq U$.

*Demostración del «⇒»* (por reducción al absurdo; solo usa (2.1)): si no, existen $u\in U$ con $u\notin V$ y $v\in V$ con $v\notin U$. Si $U\cup V$ fuera subespacio, $u+v\in U\cup V$. Si $u+v\in U$, entonces $v=(u+v)+(-1)u\in U$ (cerrado en $U$), contradicción. Si $u+v\in V$, entonces $u=(u+v)+(-1)v\in V$, contradicción.

**Intuición geométrica.** Dos rectas distintas por el origen forman una «cruz»; al sumar un vector de cada recta (regla del paralelogramo, Figura 2.1 de U p.56) se sale de la cruz. Lo que sí es subespacio es la **suma** $U+V$ (§2.4), que en este ejemplo es todo $\mathbb R^2$.

**Receta.** Unión de subespacios: toma un vector de cada uno **que no esté en el otro** y súmalos; comprueba que el resultado no cumple las ecuaciones de ninguno.

**Error típico.** Confundir $U\cup V$ (unión: los vectores de uno o de otro) con $U+V$ (suma: todas las sumas $u+v$). La unión casi nunca es subespacio; la suma siempre lo es.

**Teoría:** condición (2.1), U p.63; suma de subespacios en U §2.4 p.89.

---

### Examen Septiembre 2024, problema 7, apartado (c) (`Algebra_Septiembre24.txt`)

> **Enunciado.** (b) Sean $U_1$ y $U_2$ los siguientes subespacios de $\mathbb R^4$: $U_1=\langle(2,0,2,1),(0,3,1,0)\rangle$; $U_2=\{(x,y,z,t)\in\mathbb R^4: x=0,\ y-3z=0\}$. […] (c) Considere el conjunto $U_1\cup U_2$, es decir, la unión de los subespacios $U_1$ y $U_2$, donde $U_1$ y $U_2$ son los definidos en el apartado (b). Determine de manera razonada si $U_1\cup U_2$ es o no un subespacio vectorial de $\mathbb R^4$. (0.5 PUNTOS)

**Lectura de la notación.** $\langle v_1,v_2\rangle$ es el conjunto de las combinaciones lineales $\alpha v_1+\beta v_2$ (U §2.2 p.69). Así, $w\in U_1\iff w=\alpha(2,0,2,1)+\beta(0,3,1,0)=(2\alpha,\ 3\beta,\ 2\alpha+\beta,\ \alpha)$ para algunos $\alpha,\beta\in\mathbb R$.

**Solución.** Seguimos la receta del Ej. 2.13: un vector de cada subespacio que no esté en el otro, y los sumamos.

1. **Un vector de $U_1$ que no está en $U_2$:** $u=(2,0,2,1)\in U_1$ ($\alpha=1,\beta=0$). No está en $U_2$ porque $x=2\neq0$.
2. **Un vector de $U_2$:** $v=(0,0,0,1)$: $x=0$ y $y-3z=0-0=0$, luego $v\in U_2$.
3. **Su suma:** $u+v=(2,0,2,2)$.
   - ¿Está en $U_2$? No: $x=2\neq0$.
   - ¿Está en $U_1$? Habría que tener $(2\alpha,3\beta,2\alpha+\beta,\alpha)=(2,0,2,2)$. La 1.ª coordenada da $\alpha=1$ y la 4.ª da $\alpha=2$: **contradicción**. El sistema es incompatible, así que $(2,0,2,2)\notin U_1$. (Comprobado con sympy: `solve` devuelve `[]`.)
4. **Conclusión.** $u,v\in U_1\cup U_2$ pero $u+v\notin U_1\cup U_2$: falla el cierre para la suma (condición (2.1), U p.63). **$U_1\cup U_2$ no es subespacio de $\mathbb R^4$.**

(Consistente con la caracterización del Ej. 2.13: $U_1\not\subseteq U_2$ por el paso 1, y $U_2\not\subseteq U_1$ porque $v=(0,0,0,1)\notin U_1$: igualando, $2\alpha=0$ y $\alpha=1$, imposible.)

**Receta.** Igual que en 2.13; para justificar que un vector **no** está en un $\langle\dots\rangle$, plantea la combinación lineal y muestra que el sistema es incompatible.

**Error típico.** Afirmar «$(2,0,2,2)\notin U_1$» sin comprobarlo. La solución oficial lo da por evidente; en examen conviene escribir la línea del sistema incompatible (son 0,5 puntos).

**Teoría:** U p.63; $\langle\ \rangle$ en U §2.2 p.69.

---

## Ejemplos propios (dificultad creciente)

### Ejemplo propio 1 (fácil) — planos de $\mathbb R^3$

> ¿Son subespacios de $\mathbb R^3$ los conjuntos $S_1=\{(x,y,z): x-2y+z=0\}$ y $S_2=\{(x,y,z): x-2y+z=1\}$?

1. **$S_2$ no.** $\bar0=(0,0,0)$ da $0-0+0=0\neq1$; como todo subespacio contiene a $\bar0$ (U p.63), $S_2$ no lo es.
2. **$S_1$ sí.** $\bar0\in S_1$. Sean $u=(x,y,z)$, $v=(x',y',z')\in S_1$ (es decir, $x-2y+z=0$ y $x'-2y'+z'=0$) y $\lambda,\mu\in\mathbb R$. El vector $\lambda u+\mu v=(\lambda x+\mu x',\ \lambda y+\mu y',\ \lambda z+\mu z')$ cumple
$$(\lambda x+\mu x')-2(\lambda y+\mu y')+(\lambda z+\mu z')=\lambda(x-2y+z)+\mu(x'-2y'+z')=\lambda\cdot0+\mu\cdot0=0 .$$
Por la caracterización (2.2) (U p.66), $S_1$ es subespacio.
3. **Geometría.** $S_1$ es un plano por el origen; $S_2$, el plano paralelo que no pasa por él (U p.68: los planos y rectas por el origen son los subespacios propios de $\mathbb R^3$).

### Ejemplo propio 2 (medio) — dos trampas en $\mathbb R^2$

> ¿Son subespacios de $\mathbb R^2$: (a) la parábola $T_1=\{(x,y): y=x^2\}$; (b) el primer cuadrante $T_2=\{(x,y): x\ge0,\ y\ge0\}$?

1. **(a)** $\bar0\in T_1$ ($0=0^2$), así que el filtro no decide. Producto por escalar: $(1,1)\in T_1$ ($1=1^2$), pero $2(1,1)=(2,2)$ y $2\neq2^2=4$, luego $(2,2)\notin T_1$. **No es subespacio.** (También falla la suma: $(1,1)+(1,1)$ es el mismo vector.)
2. **(b)** $\bar0\in T_2$. **Suma:** si $x,y,x',y'\ge0$, entonces $x+x'\ge0$ e $y+y'\ge0$: es cerrado para la suma (¡es el tipo de conjunto de Feb. 2026 B!). **Escalares:** $(1,0)\in T_2$ pero $(-1)(1,0)=(-1,0)\notin T_2$. **No es subespacio.**
3. **Moraleja.** Contener al cero y ser cerrado para la suma **no basta**: hay que comprobar también el producto por escalares, incluidos los negativos.

### Ejemplo propio 3 (tipo examen) — matrices y polinomios

> (a) ¿Es $D_{2\times2}=\left\{\begin{pmatrix}a&0\\0&b\end{pmatrix}: a,b\in\mathbb R\right\}$ (matrices diagonales) subespacio de $\mathcal M_{2\times2}$? (b) ¿Y $N=\{A\in\mathcal M_{2\times2}:\det A=0\}$? (c) ¿Es $W=\{p\in\wp_2: p(1)=0\}$ subespacio de $\wp_2$?

1. **(a) Sí.** $\mathcal M_{2\times2}$ es espacio vectorial (Ejemplo 2.6, U p.62). La matriz nula es diagonal ($a=b=0$), luego $D_{2\times2}\neq\emptyset$. Para $\lambda,\mu\in\mathbb R$:
$$\lambda\begin{pmatrix}a&0\\0&b\end{pmatrix}+\mu\begin{pmatrix}a'&0\\0&b'\end{pmatrix}=\begin{pmatrix}\lambda a+\mu a'&0\\0&\lambda b+\mu b'\end{pmatrix}\in D_{2\times2},$$
porque las entradas fuera de la diagonal siguen siendo $\lambda\cdot0+\mu\cdot0=0$. Por (2.2) (U p.66), es subespacio. (Es el espacio de llegada del Ej. 3 de Febrero 2022 A2.)
2. **(b) No**, aunque la matriz nula está en $N$. $A=\begin{pmatrix}1&0\\0&0\end{pmatrix}$ y $B=\begin{pmatrix}0&0\\0&1\end{pmatrix}$ tienen $\det A=\det B=0$, pero $A+B=I_2$ y $\det I_2=1\neq0$. Falla la suma. (Comprobado con sympy.) *Moraleja:* el determinante no es «lineal»: $\det(A+B)\neq\det A+\det B$ en general.
3. **(c) Sí.** Sea $p(x)=a+bx+cx^2$; $p(1)=a+b+c$, así que $W=\{a+bx+cx^2: a+b+c=0\}$. El polinomio nulo cumple $0(1)=0$. Si $p,q\in W$ y $\lambda,\mu\in\mathbb R$: $(\lambda p+\mu q)(1)=\lambda p(1)+\mu q(1)=0$ (la suma y el producto por escalares de polinomios se evalúan término a término, como las funciones del Ejemplo 2.2 de U p.56). Por (2.2), $W$ es subespacio de $\wp_2$. *Contraste:* $\{p\in\wp_2: p(1)=1\}$ no lo es, porque el polinomio nulo da $0\neq1$ (mismo razonamiento que Febrero 2023 B).

---

## Receta global de la sección (para la chuleta)

1. **¿Es espacio vectorial con operaciones raras?** Cierre ⇒ S1–S4 ⇒ E1–E4 (U p.58). Neutro y simétrico se **despejan**, se comprueban **por los dos lados** y **dentro del conjunto**. Negar = contraejemplo numérico.
2. **¿Es subespacio?**
   - $\bar0\notin W$ ⇒ **no** (una línea: «al sustituir $\bar0$ sale $0=c$, falso»).
   - Ecuaciones **lineales homogéneas** ⇒ **sí**, demostrando $\lambda u+\mu v\in W$ con vectores genéricos (U p.66).
   - Desigualdades ⇒ contraejemplo con $\lambda=-1$. Productos/cuadrados ⇒ contraejemplo con suma o con $\lambda=2$. «$\neq$», «grado exactamente $n$», «$\det=0$», uniones ⇒ suelen fallar.
3. **Intersección** de subespacios: siempre subespacio. **Unión**: solo si uno contiene al otro.
