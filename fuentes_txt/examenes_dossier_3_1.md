# Dossier de exámenes (fuente X) — Tema 3.1: aplicaciones lineales, conceptos y propiedades

**Alcance de U §3.1 (p.101-104 impresa)**: Def. 3.1 aplicación lineal, $f(v+\lambda u)=f(v)+\lambda f(u)$ (p.101); Ej. 3.1-3.2 ($f:M\to\mathbb R^4$ sobre matrices con $a_{22}=0$, comprobación «desarrollando los dos miembros», p.101-102); interpretación «conserva la suma y el producto por escalares» (p.103); Ej. 3.3 ($f(x)=k\neq0$ no es lineal, p.103); **Propiedades** (p.103): 1. $f(0_V)=0_W$; 2. $f(-v)=-f(v)$; 3. $f(a_1v_1+\dots+a_nv_n)=a_1f(v_1)+\dots+a_nf(v_n)$; 4. imágenes de vectores dependientes son dependientes; 5. imágenes de independientes pueden no serlo. Ej. 3.4 (demostración de $f(0)=0$, p.104), Ej. 3.5 (prop. 4, p.104), Ej. 3.6 (contraejemplo de la prop. 5: $f(x_1,x_2)=x_1$ lleva $\{(2,1),(1,3)\}$ libre a $\{2,1\}$ ligado, p.104), Ej. 3.7 («basta comprobar $f(0)\neq0$», p.104).
**No está en §3.1** (aunque se use): Teor. 3.2 «la imagen de cualquier vector está determinada por las imágenes de una base» y Ej. 3.16 → **U §3.3.2 p.114**; núcleo/imagen → §3.2 (p.104 y ss.); composición → §3.4. La palabra «endomorfismo» no se define en el cap. 3 de U (solo aparece en la autoevaluación, p.138, ítem 7, y se usa desde §4.1, p.147-148).

**Exámenes leídos (24/24)**: Feb. 2026 (1.ª y 2.ª sem.), Feb. 2017 (2.ª sem., tipo A), Feb. 2018 (A y B), Feb. 2019 (A y B), Ene. 2020 (tipo A), Feb. 2020 (1.ª sem., tipo B), Ene. 2022 (tipo A), Feb. 2022 (tipo A), Feb. 2023 (1.ª y 2.ª sem.), Feb. 2024 (1.ª y 2.ª sem.), Feb. 2025 (1.ª y 2.ª sem.), Sept. 2017 (tipo A), Sept. 2018 (tipo A), Sept. 2019 (tipo A), Sept. 2022, 2023, 2024, 2025.

## Resumen

| # | Fuente | Contenido | Método | Estado |
|---|---|---|---|---|
| 1 | Feb. 2019 (tipo B), ejercicio 3 | $f(1,2)=(2,3)$, $f(2,1)=(1,1)$ ⇒ $f(1,1)$ | A (c.l. + linealidad) | desarrollado |
| 2 | Feb. 2024 (2.ª sem.), pregunta 3 | $f:\mathbb R^2\to\mathbb R^4$, $f(1,3)$, $f(-4,2)$ ⇒ $f(0,42)$ | A | desarrollado |
| 3 | Feb. 2025 (2.ª sem.), pregunta 3 | $f:\mathbb R^2\to\mathcal M_{2\times2}$ ⇒ $f(-7,0)$ | A | desarrollado |
| 4 | Feb. 2026 (2.ª sem.), pregunta 3 | $f:\mathcal M_{2\times2}\to\mathbb R^3$ dada en 4 matrices ⇒ $f$ de otra | A | desarrollado |
| 5 | Feb. 2025 (1.ª sem.), problema 7 (1.er apartado) | ¿Es lineal $f(x)=(x,2+x,3x,4x,5x)$? | B (¿es lineal?) | desarrollado |
| 6 | Feb. 2022 (tipo A), ejercicio 3 — **solo la comprobación de linealidad** | $f(x,y)=\begin{pmatrix}x&0\\0&x-y\end{pmatrix}$ es lineal | B | desarrollado (parte 3.1; núcleo/imagen → 3.2) |
| 7 | Feb. 2024 (1.ª sem.), pregunta 3 | ¿La imagen de todo vector está en el plano $5x-2y+10z=0$? | C (imagen de c.l.) | desarrollado — **DUDOSO 3.1/3.2** |

Ninguno de estos está ya desarrollado en los temas 1.x-2.x (los dossiers 1.4, 2.1, 2.2 y 2.3 los mandaban explícitamente a 3.1; comprobado con grep en `temas/*.html`: no aparecen).

**Verificación sympy** (todo comprobado): coeficientes $(1/3,1/3)$, $(12,3)$, $(-2,1)$, $(1,1,1,1)$; resultados $(1,4/3)$, $(51,-75,0,90)$, $\begin{pmatrix}-2&-5\\11&-10\end{pmatrix}$, $(10,14,18)$; $\det$ de las 4 matrices de Feb. 2026 $=215\neq0$; $5x-2y+10z\equiv0$ sobre $(-2v,5u,u+v)$; $f(0)=(0,2,0,0,0)$, $f(2)\neq 2f(1)$; $f(v+\lambda u)-f(v)-\lambda f(u)=0$ para Feb. 2022.

---

# Método A — «Escribir el vector como combinación lineal de aquellos cuya imagen conozco» (propiedad 3, U p.103)

**Idea.** Si una aplicación es lineal, «respeta las combinaciones lineales»: la imagen de $a_1v_1+\dots+a_nv_n$ es $a_1f(v_1)+\dots+a_nf(v_n)$. Por tanto, para hallar $f(w)$ basta (i) encontrar escalares con $w=a_1v_1+\dots+a_nv_n$, donde los $v_i$ son los vectores cuya imagen da el enunciado, y (ii) repetir **la misma** combinación con las imágenes.

## 1. Feb. 2019 (tipo B), ejercicio 3 (1 punto)

**Enunciado (literal).** Si $f$ es una aplicación lineal tal que $f(1,2)=(2,3)$ y $f(2,1)=(1,1)$, calcular el valor de $f(1,1)$.

**Solución paso a paso.**

1. **Qué sabemos y qué no.** Solo conocemos la imagen de dos vectores, $(1,2)$ y $(2,1)$; no conocemos una fórmula para $f$. Lo único que podemos usar es que $f$ es lineal (Def. 3.1, U p.101) y su consecuencia, la propiedad 3 (U p.103).
2. **Expresar $(1,1)$ como combinación lineal de $(1,2)$ y $(2,1)$.** Buscamos $\alpha,\beta$ con $\alpha(1,2)+\beta(2,1)=(1,1)$, es decir,
   $$\begin{cases}\alpha+2\beta=1\\2\alpha+\beta=1\end{cases}$$
   Restando la 2.ª ecuación a la 1.ª: $-\alpha+\beta=0\Rightarrow\alpha=\beta$; sustituyendo, $3\alpha=1$, así que $\alpha=\beta=\tfrac13$. Comprobación: $\tfrac13(1,2)+\tfrac13(2,1)=\tfrac13(3,3)=(1,1)$ ✓.
   *(El sistema tiene solución porque $(1,2)$ y $(2,1)$ no son proporcionales, es decir, forman una base de $\mathbb R^2$: $\det\begin{pmatrix}1&2\\2&1\end{pmatrix}=-3\neq0$.)*
3. **Aplicar la linealidad.** Por la propiedad 3 (U p.103) con $n=2$:
   $$f(1,1)=f\!\left(\tfrac13(1,2)+\tfrac13(2,1)\right)=\tfrac13f(1,2)+\tfrac13f(2,1)=\tfrac13(2,3)+\tfrac13(1,1)=\tfrac13(3,4)=\left(1,\tfrac43\right).$$

**Resultado:** $f(1,1)=\left(1,\tfrac43\right)$. *(sympy: coeficientes $(1/3,1/3)$, imagen $(1,4/3)$; la matriz canónica de $f$ es $\begin{pmatrix}0&1\\-1/3&5/3\end{pmatrix}$ y da lo mismo.)*

**Sobre la solución oficial.** Correcta y con el razonamiento esencial («como $(1,1)=\tfrac13(1,2)+\tfrac13(2,1)$ y $f$ es lineal»), aunque no muestra cómo se obtienen los coeficientes $\tfrac13$. Hay una errata tipográfica en el paso intermedio del PDF («$(\tfrac23,1)+(\tfrac13,\tfrac13)$»), que es correcto: $\tfrac13(2,3)=(\tfrac23,1)$.

**Error típico.** «Sumar los datos» sin más: $f(1,2)+f(2,1)=(3,4)$ es $f(3,3)$, **no** $f(1,1)$. Otro: creer que hace falta la fórmula de $f$ (o la matriz) para contestar; no hace falta.

## 2. Feb. 2024 (2.ª sem.), pregunta 3 (1 punto)

**Enunciado (literal).** Sea $f:\mathbb R^2\to\mathbb R^4$ una aplicación lineal tal que $f(1,3)=(4,-6,0,7)$ y $f(-4,2)=(1,-1,0,2)$. Halle $f(0,42)$.

**Solución paso a paso.**

1. **Combinación lineal.** Buscamos $\alpha,\beta$ con $\alpha(1,3)+\beta(-4,2)=(0,42)$:
   $$\begin{cases}\alpha-4\beta=0\\3\alpha+2\beta=42\end{cases}$$
   De la 1.ª, $\alpha=4\beta$; en la 2.ª, $12\beta+2\beta=14\beta=42\Rightarrow\beta=3$, $\alpha=12$. Comprobación: $12(1,3)+3(-4,2)=(12-12,\,36+6)=(0,42)$ ✓.
2. **Linealidad** (propiedad 3, U p.103):
   $$f(0,42)=12f(1,3)+3f(-4,2)=12(4,-6,0,7)+3(1,-1,0,2)=(48+3,\,-72-3,\,0,\,84+6).$$

**Resultado:** $f(0,42)=(51,-75,0,90)$. *(sympy ✓.)*

**Sobre la solución oficial.** Correcta; da directamente los coeficientes 12 y 3 sin el sistema que los produce (en el examen conviene escribirlo: «lo que no se justifica no se puntúa»).

**Error típico.** Intentar «dividir»: $(0,42)$ no es múltiplo de ninguno de los dos vectores dados; hay que combinar los dos. Equivocarse de orden: los coeficientes salen de los **originales** $(1,3)$, $(-4,2)$, y se aplican a las **imágenes**.

## 3. Feb. 2025 (2.ª sem.), pregunta 3 (1 punto)

**Enunciado (literal).** Sea $f:\mathbb R^2\to\mathcal M_{2\times2}$ una aplicación lineal tal que
$$f(5,1)=\begin{pmatrix}1&3\\-2&4\end{pmatrix},\qquad f(3,2)=\begin{pmatrix}0&1\\7&-2\end{pmatrix}.$$
Halle $f(-7,0)$.

**Solución paso a paso.**

1. **Los «vectores» de llegada son matrices**, pero eso no cambia nada: $\mathcal M_{2\times2}$ es un espacio vectorial (U §2.1) y la propiedad 3 vale para cualquier $W$.
2. **Combinación lineal en $\mathbb R^2$.** $\alpha(5,1)+\beta(3,2)=(-7,0)$:
   $$\begin{cases}5\alpha+3\beta=-7\\\alpha+2\beta=0\end{cases}$$
   De la 2.ª, $\alpha=-2\beta$; en la 1.ª, $-10\beta+3\beta=-7\beta=-7\Rightarrow\beta=1$, $\alpha=-2$. Comprobación: $-2(5,1)+(3,2)=(-7,0)$ ✓.
3. **Linealidad** (propiedad 3), con suma de matrices y producto por escalar entrada a entrada:
   $$f(-7,0)=-2\begin{pmatrix}1&3\\-2&4\end{pmatrix}+\begin{pmatrix}0&1\\7&-2\end{pmatrix}=\begin{pmatrix}-2&-6\\4&-8\end{pmatrix}+\begin{pmatrix}0&1\\7&-2\end{pmatrix}=\begin{pmatrix}-2&-5\\11&-10\end{pmatrix}.$$

**Resultado:** $f(-7,0)=\begin{pmatrix}-2&-5\\11&-10\end{pmatrix}$. *(sympy ✓.)*

**Sobre la solución oficial.** Correcta; como en el n.º 2, no muestra cómo se obtienen $-2$ y $1$.

**Error típico.** Multiplicar matrices (producto matricial) en lugar de combinarlas linealmente; o aplicar el $-2$ solo a una fila.

## 4. Feb. 2026 (2.ª sem.), pregunta 3 (1 punto)

**Enunciado (literal).** Sea $f:\mathcal M_{2\times2}\to\mathbb R^3$ una aplicación lineal tal que
$$f\begin{pmatrix}1&2\\0&-1\end{pmatrix}=(1,2,3),\quad f\begin{pmatrix}3&1\\-2&4\end{pmatrix}=(2,3,4),\quad f\begin{pmatrix}-1&0\\5&2\end{pmatrix}=(3,4,5),\quad f\begin{pmatrix}2&-3\\1&1\end{pmatrix}=(4,5,6).$$
Halle $f\begin{pmatrix}5&0\\4&6\end{pmatrix}$.

**Solución paso a paso.** Llamamos $M_1,M_2,M_3,M_4$ a las cuatro matrices dadas y $N=\begin{pmatrix}5&0\\4&6\end{pmatrix}$.

1. **Planteamiento.** Buscamos $a,b,c,d$ con $aM_1+bM_2+cM_3+dM_4=N$. Igualando entrada a entrada (posiciones 11, 12, 21, 22):
   $$\begin{cases}a+3b-c+2d=5\\2a+b-3d=0\\-2b+5c+d=4\\-a+4b+2c+d=6\end{cases}$$
2. **Probar primero los coeficientes más sencillos.** Es un sistema $4\times4$; antes de escalonar conviene probar $a=b=c=d=1$ (la suma de las cuatro matrices): $1+3-1+2=5$ ✓, $2+1+0-3=0$ ✓, $0-2+5+1=4$ ✓, $-1+4+2+1=6$ ✓. Luego
   $$N=M_1+M_2+M_3+M_4.$$
   *(Si no se ve, se resuelve por Gauss; la solución es la misma y es única porque $\det$ de la matriz del sistema vale $215\neq0$, es decir, $\{M_1,M_2,M_3,M_4\}$ es una base de $\mathcal M_{2\times2}$. Para calcular $f(N)$ basta **una** combinación cualquiera que dé $N$; la unicidad no se necesita.)*
3. **Linealidad** (propiedad 3, U p.103):
   $$f(N)=f(M_1)+f(M_2)+f(M_3)+f(M_4)=(1,2,3)+(2,3,4)+(3,4,5)+(4,5,6)=(10,14,18).$$

**Resultado:** $f\begin{pmatrix}5&0\\4&6\end{pmatrix}=(10,14,18)$. *(sympy: coeficientes $(1,1,1,1)$, det $=215$ ✓.)*

**Sobre la solución oficial.** Correcta pero da la descomposición $N=M_1+M_2+M_3+M_4$ sin decir cómo se encuentra ni comprobarla entrada a entrada; en el examen hay que escribir esa comprobación.

**Error típico.** Aplicar $f$ entrada a entrada o «sumar las matrices dadas» y olvidar comprobar que la suma es exactamente $N$.

**Receta (método A).** (1) Plantear $w=\sum a_iv_i$ con los vectores cuya imagen se conoce y resolver el sistema (probar antes coeficientes sencillos: $\pm1$, sumas); (2) comprobar la combinación; (3) $f(w)=\sum a_if(v_i)$ (propiedad 3, U p.103). Si los $v_i$ son base, la combinación existe siempre (Teor. 3.2, U p.114).

---

# Método B — ¿Es lineal esta aplicación? (Def. 3.1 y propiedad 1, U p.101-104)

**Idea.** Para decir **sí** hay que comprobar la Def. 3.1 con vectores y escalar **genéricos** (Ej. 3.2: desarrollar los dos miembros por separado y compararlos). Para decir **no** basta un contraejemplo concreto; el más rápido suele ser $f(0)\neq0$ (propiedad 1 y Ej. 3.7, U p.103-104). Pero $f(0)=0$ **no** prueba que sea lineal.

## 5. Feb. 2025 (1.ª sem.), problema 7, 1.er apartado (1 punto)

**Enunciado (literal).** Consideremos las aplicaciones $f:\mathbb R\to\mathbb R^5$, $g:\mathbb R^3\to\mathbb R^2$ y $h:\mathbb R^2\to\mathbb R^4$ definidas por
$$f(x)=(x,\,2+x,\,3x,\,4x,\,5x),\quad g(x,y,z)=(x+y+z,\,-5x-5y-5z)$$
y $h(x,y)=(4x-5y,\,y,\,x,\,-3x+7y)$.
- Indique de manera razonada si $f$ es aplicación lineal (1 PUNTO).
- Calcule los subespacios núcleo e imagen asociados a $g$ e indique la dimensión de dichos subespacios (1 PUNTO). *[→ tema 3.2]*
- Calcule la matriz asociada a la aplicación lineal $h\circ g$ (1 PUNTO). *[→ tema 3.4]*

**Solución paso a paso (1.er apartado).**

1. **Recordar la propiedad 1** (U p.103, demostrada en el Ej. 3.4, p.104): toda aplicación lineal cumple $f(0_V)=0_W$. Leída al revés (contrarrecíproco): si $f(0_V)\neq0_W$, $f$ **no** puede ser lineal.
2. **Calcular $f(0)$.** Aquí $0_V=0\in\mathbb R$ y $0_W=(0,0,0,0,0)\in\mathbb R^5$:
   $$f(0)=(0,\,2+0,\,0,\,0,\,0)=(0,2,0,0,0)\neq(0,0,0,0,0).$$
3. **Conclusión.** $f$ no es lineal. El culpable es el término independiente «$2+$» de la 2.ª componente.
4. *(Comprobación alternativa con la Def. 3.1, por si se prefiere un contraejemplo directo:* con $v=u=1$, $\lambda=1$: $f(1+1)=f(2)=(2,4,6,8,10)$, mientras que $f(1)+f(1)=(1,3,3,4,5)+(1,3,3,4,5)=(2,6,6,8,10)$. No coinciden.)

**Comentario sobre $g$ y $h$** (útil para los apartados 2 y 3, que son de 3.2 y 3.4). El enunciado no dice que $g$ y $h$ sean lineales, pero lo son: cada componente es una combinación $a_1x_1+\dots+a_nx_n$ sin término independiente, es decir, $g(v)=A_gv$ y $h(v)=A_hv$ con $A_g=\begin{pmatrix}1&1&1\\-5&-5&-5\end{pmatrix}$, $A_h=\begin{pmatrix}4&-5\\0&1\\1&0\\-3&7\end{pmatrix}$, y $A(v+\lambda u)=Av+\lambda Au$ por la distributividad del producto de matrices (U §1.2). (Resultado oficial de $h\circ g$, $A_hA_g$ con filas $(29,29,29)$, $(-5,-5,-5)$, $(1,1,1)$, $(-38,-38,-38)$: verificado ✓.)

**Resultado:** $f$ **no** es lineal porque $f(0)=(0,2,0,0,0)\neq0$.

**Sobre la solución oficial.** Correcta y suficiente («La aplicación $f$ no es lineal porque $f(0)=(0,2,0,0,0)$»); en un examen conviene citar la propiedad que se usa ($f$ lineal ⇒ $f(0)=0$).

**Error típico.** (a) Ver que cada componente «es de primer grado» y concluir que es lineal: $2+x$ es de grado 1 pero **no** es lineal en el sentido del álgebra lineal (es afín). (b) El error recíproco: comprobar $f(0)=0$ y concluir que sí es lineal (ver ejemplo propio P2).

## 6. Feb. 2022 (tipo A), ejercicio 3 — parte de linealidad (la pregunta pide núcleo e imagen → tema 3.2)

**Enunciado (literal).** Sea $D_{2\times2}$ el conjunto de matrices diagonales de orden 2 y $f:\mathbb R^2\to D_{2\times2}$ una aplicación tal que
$$f(x,y)=\begin{pmatrix}x&0\\0&x-y\end{pmatrix}.$$
Calcule los subespacios núcleo e imagen de $f$.

**Por qué se incluye aquí.** El enunciado dice «una aplicación», no «una aplicación lineal». Hablar de *subespacios* núcleo e imagen solo tiene sentido si $f$ es lineal (U §3.2), así que lo primero es comprobarlo. La solución oficial lo hace en una nota («No hay que comprobarlo, no se pide, pero la aplicación dada es lineal porque…»). Es el único ejercicio de examen en el que se **demuestra** que una aplicación sí es lineal: modelo del método B en sentido positivo.

**Comprobación de la linealidad (Def. 3.1, U p.101, desarrollando los dos miembros como en el Ej. 3.2, p.102).** Sean $v=(x_1,y_1)$, $u=(x_2,y_2)\in\mathbb R^2$ y $\lambda\in\mathbb R$.

1. **Primer miembro.** $v+\lambda u=(x_1+\lambda x_2,\;y_1+\lambda y_2)$, luego
   $$f(v+\lambda u)=\begin{pmatrix}x_1+\lambda x_2&0\\0&(x_1+\lambda x_2)-(y_1+\lambda y_2)\end{pmatrix}.$$
2. **Segundo miembro.**
   $$f(v)+\lambda f(u)=\begin{pmatrix}x_1&0\\0&x_1-y_1\end{pmatrix}+\lambda\begin{pmatrix}x_2&0\\0&x_2-y_2\end{pmatrix}=\begin{pmatrix}x_1+\lambda x_2&0\\0&x_1-y_1+\lambda x_2-\lambda y_2\end{pmatrix}.$$
3. **Comparar.** La entrada (2,2) del primer miembro, reordenada, es $x_1-y_1+\lambda x_2-\lambda y_2$: ambos miembros coinciden para todo $v,u,\lambda$. Además, $f(x,y)$ es diagonal, así que $f$ va de verdad a $D_{2\times2}$ (que es subespacio de $\mathcal M_{2\times2}$, U §2.1). Por tanto **$f$ es lineal**. *(sympy: diferencia idénticamente nula ✓.)*

**Resto del ejercicio (→ 3.2, resultado oficial verificado):** $\operatorname{Nuc}f=\{(0,0)\}$ ($x=0$, $x-y=0$), y como $\dim\operatorname{Nuc}f+\dim\operatorname{Im}f=2$, $\operatorname{Im}f=D_{2\times2}$ (dimensión 2).

**Sobre la solución oficial.** Correcta. Comprueba por separado aditividad y homogeneidad ($f(v)+f(u)=f(v+u)$, $\lambda f(v)=f(\lambda v)$), lo que equivale a la Def. 3.1 de U (que lo junta en una sola condición: con $\lambda=1$ sale la aditividad y con $v=0$, usando $f(0)=0$, la homogeneidad).

**Receta (método B).** ¿Lineal? Mirar primero $f(0)$: si $\neq0$, **no** (propiedad 1). Si $f(0)=0$, sospechar de productos, potencias, valores absolutos, $\det$…: probar un contraejemplo con números ($f(2v)$ frente a $2f(v)$). Si todo es «combinación de coordenadas sin término independiente», demostrar la Def. 3.1 con vectores genéricos desarrollando los dos miembros por separado.

---

# Método C — Imagen de una combinación lineal arbitraria

## 7. Feb. 2024 (1.ª sem.), pregunta 3 (1 punto) — DUDOSO 3.1 / 3.2

*(Lo que se pregunta es, en el fondo, «$\operatorname{Im}f\subset$ plano», concepto de §3.2; pero se resuelve solo con la propiedad 3 de §3.1 y sin usar la definición de imagen. Si el tema 3.2 lo prefiere, moverlo allí; no duplicar.)*

**Enunciado (literal).** Sea $f:\mathbb R^2\to\mathbb R^3$ una aplicación lineal que verifica $f(1,0)=(0,5,1)$ y $f(0,1)=(-2,0,1)$. Justifique de manera razonada si la siguiente afirmación es verdadera o falsa: la imagen por $f$ de cualquier vector de $\mathbb R^2$ pertenece al plano $5x-2y+10z=0$.

**Solución paso a paso.**

1. **Imagen de un vector genérico.** Todo $(u,v)\in\mathbb R^2$ es $(u,v)=u(1,0)+v(0,1)$. Por la propiedad 3 (U p.103):
   $$f(u,v)=u\,f(1,0)+v\,f(0,1)=u(0,5,1)+v(-2,0,1)=(-2v,\;5u,\;u+v).$$
2. **Sustituir en la ecuación del plano** con $x=-2v$, $y=5u$, $z=u+v$:
   $$5(-2v)-2(5u)+10(u+v)=-10v-10u+10u+10v=0.$$
   Se cumple para **todo** $u,v$.
3. **Conclusión.** La afirmación es **verdadera**.
4. *(Vía alternativa equivalente:* $f(1,0)$ y $f(0,1)$ están en el plano — $5\cdot0-2\cdot5+10\cdot1=0$ y $5(-2)-0+10\cdot1=0$ —; el plano $5x-2y+10z=0$ es un subespacio de $\mathbb R^3$ (ecuación homogénea, U §2.1), luego contiene cualquier combinación lineal de esos dos vectores; y por el paso 1 toda imagen $f(u,v)$ es una de esas combinaciones. **Las tres frases son necesarias**: solo la primera no basta.)*

**Resultado:** Verdadero; $f(u,v)=(-2v,5u,u+v)$ satisface $5x-2y+10z=0$. *(sympy: $5x-2y+10z\equiv0$ ✓. De hecho la imagen es todo el plano: $f(1,0)$, $f(0,1)$ son independientes, rango 2.)*

**Sobre la solución oficial.** El resultado es correcto, pero:
- escribe «$\Leftrightarrow$» entre las paramétricas $x=-2\beta$, $y=5\alpha$, $z=\alpha+\beta$ y la ecuación del plano; eso afirma además que todo punto del plano es imagen (cierto, porque los dos vectores son independientes y el plano tiene dimensión 2, pero **no se pregunta** y la oficial no lo justifica);
- su «fallo recurrente» está mal redactado: dice que hay que «justificar que cualquier vector del plano es combinación lineal de los vectores dados $\{(1,0),(0,1)\}$». Lo que hay que justificar es que **cualquier imagen** $f(u,v)$ es combinación lineal de $f(1,0)$ y $f(0,1)$ (y que el plano, por ser subespacio, es cerrado para combinaciones lineales). Comprobar solo que $(0,5,1)$ y $(-2,0,1)$ están en el plano es insuficiente si no se añaden esas dos razones; con ellas, es una demostración completa (ya se avisó en el dossier 2.2, D7).

**Error típico.** Comprobar los dos vectores y parar (falta la linealidad y que el plano sea subespacio). Para un plano que **no** pase por el origen el argumento fallaría: por eso importa que el plano sea homogéneo.

**Receta (método C).** Para afirmaciones sobre «la imagen de cualquier vector»: escribir $f(\text{vector genérico})$ como combinación lineal de las imágenes de una base (propiedad 3) y sustituir en la condición pedida.

---

# Ejemplos propios (dificultad creciente; todos verificados con sympy)

**P1 (propio, fácil).** ¿Son lineales $f(x,y)=(x+y,\,2x-1)$ y $g(x,y)=(x+y,\,3x)$ de $\mathbb R^2$ en $\mathbb R^2$?
1. $f(0,0)=(0,-1)\neq(0,0)$ ⇒ $f$ no es lineal (propiedad 1, U p.103).
2. Para $g$, sean $v=(x_1,y_1)$, $u=(x_2,y_2)$, $\lambda\in\mathbb R$. Primer miembro: $g(v+\lambda u)=(x_1+\lambda x_2+y_1+\lambda y_2,\;3x_1+3\lambda x_2)$. Segundo: $g(v)+\lambda g(u)=(x_1+y_1,3x_1)+\lambda(x_2+y_2,3x_2)=(x_1+y_1+\lambda x_2+\lambda y_2,\;3x_1+3\lambda x_2)$. Iguales ⇒ $g$ es lineal (Def. 3.1).

**P2 (propio, medio — el error típico «$f(0)=0$ ⇒ lineal»).** ¿Es lineal $f(x,y)=(xy,\,x)$?
1. $f(0,0)=(0,0)$: la prueba del cero **no decide**.
2. Contraejemplo con $v=(1,1)$, $\lambda=2$ (y $v=0$ en la Def. 3.1, es decir, comparar $f(2v)$ con $2f(v)$): $f(2,2)=(4,2)$, pero $2f(1,1)=2(1,1)=(2,2)$. No coinciden ⇒ **no** es lineal. El producto $xy$ «escala» con $\lambda^2$.
3. Igual ocurre con matrices: $\det:\mathcal M_{2\times2}\to\mathbb R$ cumple $\det(0)=0$, pero $\det(2I)=4\neq2\det(I)=2$; no es lineal. En cambio $T(A)=A^t$ sí lo es: $(A+\lambda B)^t=A^t+\lambda B^t$ (propiedades de la traspuesta, U §1.2).

**P3 (propio, medio — polinomios).** Sea $f:\wp_2\to\mathbb R^2$, $f(p)=(p(0),\,p'(1))$. Pruebe que es lineal y calcule $f(1+x+x^2)$.
1. Para $p,q\in\wp_2$ y $\lambda\in\mathbb R$: $(p+\lambda q)(0)=p(0)+\lambda q(0)$ (evaluar respeta sumas y escalares) y $(p+\lambda q)'(1)=p'(1)+\lambda q'(1)$ (la derivada es lineal). Luego $f(p+\lambda q)=f(p)+\lambda f(q)$: lineal.
2. $p=1+x+x^2$: $p(0)=1$, $p'(x)=1+2x$, $p'(1)=3$ ⇒ $f(p)=(1,3)$.

**P4 (propio, examen — método A + propiedades 4 y 5).** Sea $f:\mathbb R^2\to\mathbb R^3$ lineal con $f(1,1)=(1,0,2)$ y $f(1,-1)=(3,2,0)$.
(a) Halle $f(3,1)$. (b) Halle $f(0,1)$. (c) Verdadero o falso: «si $\{v_1,v_2\}$ es libre, $\{f(v_1),f(v_2)\}$ también lo es, para cualquier aplicación lineal».
1. (a) $\alpha(1,1)+\beta(1,-1)=(3,1)$: $\alpha+\beta=3$, $\alpha-\beta=1$ ⇒ $\alpha=2$, $\beta=1$. $f(3,1)=2(1,0,2)+(3,2,0)=(5,2,4)$.
2. (b) $(0,1)=\tfrac12(1,1)-\tfrac12(1,-1)$ ⇒ $f(0,1)=\tfrac12\big[(1,0,2)-(3,2,0)\big]=(-1,-1,1)$.
3. (c) **Falso** (propiedad 5, U p.103; Ej. 3.6, p.104). Contraejemplo: $g:\mathbb R^3\to\mathbb R^2$, $g(x,y,z)=(x+y,\,x+y)$ es lineal (cada componente es combinación de coordenadas sin término independiente), $\{(1,0,0),(0,1,0)\}$ es libre y sus imágenes son $(1,1)$ y $(1,1)$, ligadas. Lo que sí es siempre cierto es lo contrario: imágenes de vectores **dependientes** son dependientes (propiedad 4, Ej. 3.5). Para que lo libre se conserve hace falta $\operatorname{Nuc}f=\{0\}$ (tema 3.2; ver Feb. 2019 B, problema c, en la lista de fronterizos).

---

# Fronterizos (no se desarrollan aquí; van a su tema real)

| Fuente | Contenido | Tema real | Nota |
|---|---|---|---|
| Feb. 2019 (tipo B), problema c) | $\operatorname{Dim}\operatorname{Nuc}f=0$ ⇒ imágenes de un sistema libre son libres | **3.2** | **La solución oficial tiene un hueco:** de «$\{f(v_1),f(v_2)\}$ ligado» deduce «existe $\alpha$ con $f(v_1)=\alpha f(v_2)$», lo que falla si $f(v_2)=0$ y $f(v_1)\neq0$. Prueba correcta: si $af(v_1)+bf(v_2)=0$, por linealidad $f(av_1+bv_2)=0$, luego $av_1+bv_2\in\operatorname{Nuc}f=\{0\}$ y, como $\{v_1,v_2\}$ es libre, $a=b=0$. Además, la oficial tiene la errata «$f(\bar v_1)-\alpha\bar v_2)$». |
| Feb. 2022 (tipo A), ejercicio 3 (núcleo e imagen) | $\operatorname{Nuc}f$, $\operatorname{Im}f$ de $f:\mathbb R^2\to D_{2\times2}$ | **3.2** | Aquí solo se ha desarrollado la comprobación de linealidad (n.º 6). |
| Feb. 2025 (1.ª sem.), problema 7, apartados 2.º y 3.º | Núcleo e imagen de $g$; matriz de $h\circ g$ | **3.2** y **3.4** | Resultados oficiales verificados. |
| Feb. 2018 (tipo B), ejercicio 3 | Matriz canónica de $f$ con $f(1,2)=(2,3)$, $f(2,0)=(4,0)$ | **3.3** | Usa linealidad para despejar $f(1,0)=(2,0)$, $f(0,1)=(0,\tfrac32)$. La oficial dice «hallar $f(0,1)$ y $f(0,1)$» (errata: el primero es $f(1,0)$). |
| Ene. 2022 (tipo A), ejercicio 3 | Matriz canónica de un endomorfismo dado en una base no canónica | **3.3** | |
| Feb. 2019 (tipo A), ejercicio 3 | Matriz en bases no canónicas | **3.3** | |
| Feb. 2026 (1.ª sem.), pregunta 2 | Rango de la matriz asociada dada por $f(u_i)$ | **3.3** | |
| Sept. 2017 (tipo A), ejercicio 3 | Test: cambio de base singular / la matriz depende de las bases / «todas las lineales son endomorfismos» | **3.3** (B es la correcta; A → 3.5) | Es la autoevaluación del cap. 3 de U, p.138, ítems 7-8 y 10. C es falsa: $f:\mathbb R^2\to\mathbb R^3$ es lineal y no es endomorfismo ($V\neq W$). |
| Feb. 2024 (1.ª sem.), pregunta 3 | (desarrollado arriba como n.º 7) | **3.1/3.2** | Decidir en el tema 3.2 si se mueve. |
| Feb. 2018 (tipo A), ej. 3; Sept. 2019 (tipo A), ej. 3; Feb. 2023 (2.ª sem.), p.3; Sept. 2022, ej. 3; Feb. 2020 (1.ª sem., tipo B), ej. 3; Sept. 2025, p.2 y p.3; Feb. 2026 (2.ª sem.), problema 7 (base del núcleo); Feb. 2023 (1.ª sem.), problema 7 (i); Feb. 2017 (2.ª sem., tipo A), problema c); Sept. 2018 (tipo A), problema b); Sept. 2017 (tipo A), problema b) (núcleo/imagen); Feb. 2019 (tipo A), problema a); Sept. 2023, problema 7; Feb. 2026 (1.ª sem.), problema 7 (a) | Núcleo, imagen, dimensiones | **3.2** | |
| Ene. 2020 (tipo A), ej. 3; Feb. 2023 (1.ª sem.), p.3; Sept. 2018 (tipo A), ej. 3; Sept. 2024, p.3; Sept. 2023, p.3 ($3g-5h$); Feb. 2024 (2.ª sem.), problema 7 y Feb. 2026 (1.ª sem.), problema 7 (b)-(c) ($f\circ f$, $g\circ f$) | Composición / combinación de aplicaciones y sus matrices | **3.4** | |
| Feb. 2023 (1.ª sem.), problema 7 (ii) | Matriz $2\times5$ de la derivada tercera $\wp_4\to\wp_1$ | **3.3** | |
| Feb. 2026 (2.ª sem.), problemas 7 (matriz y escalonada) y 8 (matriz en otra base) | | **3.3** / **3.5** | |
| Sept. 2017 (tipo A), ej. 4; Feb. 2018 (tipo B), problema a) | Diagonalización de una aplicación lineal / vectores propios de la derivada | **4.x** | |
