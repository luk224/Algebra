# Dossier de exámenes (fuente X) — Tema 2.1: Espacios vectoriales. Subespacios

**Alcance de U §2.1 (p.55-68, comprobado en `ingenieros.txt`):** 2.1.2 operaciones internas/externas, propiedades S1-S4 (asociativa, neutro, simétrico, conmutativa → grupo conmutativo) y E1-E4, Definición 2.1 de espacio vectorial; ejemplos $\mathbb R^n$, funciones $F$ (Ej. 2.2-2.5), polinomios $\wp_n$ y matrices $\mathcal M_{n\times m}$ (Ej. 2.6, p.62); 2.1.3 Definición 2.2 de subespacio (p.62), subespacios impropios/propios (p.63), caracterización (2.1) (p.63) y (2.2) con forma reducida $u+\alpha v$ (p.66), Ejemplos 2.7-2.13 (ecuación homogénea sí; $x_1=1$, $x_1+x_2+x_3=1$, $x_1+x_2\le1$, $x_1x_2=1$, disco: no). **No** están en 2.1: paso paramétricas↔cartesianas (objetivo de §2.2, U p.69), intersección/suma de subespacios (§2.4.2, U p.90-91). La **unión** sí se trabaja en E Ej. 2.13 (sección 2.1 de E), por eso el tema ya incluye Sept. 2024 7(c).

Se han leído completos los 24 exámenes de `fuentes_txt/examenes/`. Dudas de maquetación confirmadas renderizando el PDF (Sept. 2017 ej. 2 y Feb. 2019 ej. 2).

## Recuento

| Estado | Nº | Preguntas |
|---|---|---|
| **YA EN EL TEMA** | 6 | Ene. 2020 (tipo A) ej. 2 · Feb. 2023 (1.ª sem.) p. 2 · Feb. 2023 (2.ª sem.) p. 2 · Feb. 2024 (2.ª sem.) p. 4 · Feb. 2026 (2.ª sem.) p. 2 · Sept. 2024 p. 7(c) |
| **NUEVOS** | 3 | Feb. 2019 (tipo A) ej. 2 · Sept. 2017 (tipo A) ej. 2 · Sept. 2017 (tipo A) problema a) |
| **Dudosos** (otro tema) | 18 | ver §3 |

---

## 1. YA EN EL TEMA (revisados; sin errores matemáticos en el HTML)

1. **Ene. 2020 (tipo A), ejercicio 2** — operación $a\circ b=ab-b+a$ en $\mathbb R$. YA EN EL TEMA (`#ex-feb20a`). Revisado con sympy: desarrollos, contraejemplos ($(0\circ0)\circ1=-1$, $0\circ(0\circ1)=1$) y $e\circ a=a\iff e=2a/(a+1)$ correctos; los dos errores señalados de la solución oficial son reales.
2. **Feb. 2023 (1.ª sem.), pregunta 2** — $x_1-x_3\ge0$ en $\mathbb R^4$. YA EN EL TEMA (`#ex-feb23a`). Correcto.
3. **Feb. 2023 (2.ª sem.), pregunta 2** — funciones con $f(4)=4$. YA EN EL TEMA (`#ex-feb23b`). Correcto ($g(x)=8-x$ cumple $g(4)=4$).
4. **Feb. 2024 (2.ª sem.), pregunta 4** — $x_5-3=-x_3$ en $\mathbb R^5$. YA EN EL TEMA (`#ex-feb24b`). Correcto; el error señalado de la oficial ($u=(0,0,2,0,3)\notin E$) es real ($v=(0,0,3,0,0)$ sí está).
5. **Feb. 2026 (2.ª sem.), pregunta 2** — V/F «cerrado para la suma ⇒ subespacio» en $\mathcal M_{2\times2}$. YA EN EL TEMA (`#ex-feb26b`). Correcto.
6. **Sept. 2024, problema 7(c)** — $U_1\cup U_2$ en $\mathbb R^4$. YA EN EL TEMA (`#ex-sep24`). Correcto (sistema incompatible $\alpha=1$, $\alpha=2$ bien justificado). Los apartados 7(a)-(b) (definición de suma e intersección, bases de $U_1+U_2$ y $U_1\cap U_2$) son de 2.4: ver dudosos.

**Observación de formato (no es error):** en el HTML el `<summary>` dice «Enero 2020 (tipo A), ejercicio 2» y el `data-ref` «Ene. 2020 (tipo A), ejercicio 2»: coherente con la regla del encargo.

---

## 2. NUEVOS

### 2.1. Sept. 2017 (tipo A), ejercicio 2 — ¿es subespacio un conjunto de matrices? (test)

**Enunciado literal** (confirmado en el PDF; examen tipo test: +1 / −0,33):
> El conjunto de matrices $\left\{\begin{pmatrix}1&0&a\\0&a&b\\0&c&a\end{pmatrix} : a,b,c\in\mathbb R\right\}$ verifica: **A)** Es un espacio vectorial de dimensión 3; **B)** NO es un espacio vectorial; **C)** Es un subespacio vectorial del espacio vectorial de las matrices reales de orden $3\times3$; **D)** Ninguna de las anteriores.

**Solución oficial:** «La opción B) es cierta. No contiene al elemento neutro (matriz nula de orden 3×3) y por ello no es un espacio vectorial.»

**Solución paso a paso.** Llamemos $W$ al conjunto. Se entiende que lleva las operaciones habituales de $\mathcal M_{3\times3}$ (suma de matrices y producto por un número real; U Ej. 2.6, p.62), que es un espacio vectorial cuyo neutro es la matriz nula $O$.

1. **Qué hay que decidir.** Las opciones A y C dicen que $W$ «es espacio vectorial» (A, con dimensión 3) o «es subespacio de $\mathcal M_{3\times3}$» (C). Como $W\subseteq\mathcal M_{3\times3}$ y usa sus mismas operaciones, por la Definición 2.2 (U p.62) «$W$ es espacio vectorial con esas operaciones» y «$W$ es subespacio de $\mathcal M_{3\times3}$» son **la misma afirmación**. Basta, pues, estudiar si $W$ es subespacio.
2. **Filtro del cero** (U p.63: si $W$ es subespacio, $(W,+)$ es grupo y el neutro $O$ está en $W$). ¿Hay $a,b,c$ con $\begin{pmatrix}1&0&a\\0&a&b\\0&c&a\end{pmatrix}=O$? Imposible: la entrada $(1,1)$ vale **siempre 1**, y la de $O$ vale 0. Luego $O\notin W$.
3. **Conclusión.** $W$ no contiene al neutro, así que **no es subespacio de $\mathcal M_{3\times3}$** (C falsa) y **no es espacio vectorial** con esas operaciones (B verdadera). A es falsa a la fuerza (si no es espacio vectorial, no tiene dimensión). D es falsa porque B es cierta. **Respuesta: B.**
4. *(Comprobación alternativa con la caracterización (2.1), U p.63.)* Con $a=b=c=0$, $M=\begin{pmatrix}1&0&0\\0&0&0\\0&0&0\end{pmatrix}\in W$, pero $M+M$ tiene un 2 en la posición $(1,1)$, así que $M+M\notin W$: tampoco es cerrado para la suma (ni por escalares: $(-1)M$ tiene $-1$ en $(1,1)$).

**Verificación (sympy):** `solve(list(M),[a,b,c])` → `[]` (no hay $a,b,c$ que anulen $M$); $(M+M)_{11}=2$, $(-M)_{11}=-1$.

**Receta:** si una matriz (o vector, o polinomio) del conjunto tiene una entrada **fija distinta de 0** (aquí el 1 de la esquina), el cero no está y no hay subespacio; basta decirlo en una línea citando que todo subespacio contiene al neutro.

**Error típico:** fijarse en los parámetros $a,b,c$ (que aparecen de forma «lineal», sin términos independientes) y responder C sin mirar las entradas constantes; o contar 3 parámetros y elegir A («dimensión 3») sin comprobar antes que es espacio vectorial. Otro error: pensar que B y C pueden ser ciertas a la vez (B ⇔ no C, por la Definición 2.2).

**Ejemplo propio para el tema (opcional):** el conjunto $\left\{\begin{pmatrix}0&0&a\\0&a&b\\0&c&a\end{pmatrix}\right\}$ (cambiando el 1 por 0) **sí** es subespacio: $\lambda M+\mu M'$ conserva el patrón (0 en las posiciones fijas, la misma letra $\lambda a+\mu a'$ en las tres posiciones con $a$), por (2.2) de U p.66. Tiene 3 parámetros libres → dimensión 3 (se verá en §2.3).

---

### 2.2. Feb. 2019 (tipo A), ejercicio 2 — operación «producto-suma» en $\mathbb R^+\times\mathbb R$

**Enunciado literal** (confirmado en el PDF):
> En el conjunto $V=\{(x_1,x_2)\mid x_1\in\mathbb R^+,\ x_2\in\mathbb R\}$ y considerando la operación interna definida por $(x_1,x_2)*(y_1,y_2)=(x_1y_1,\ x_2+y_2)$, razonar si se cumplen o no las propiedades: Asociativa, Elemento neutro y Conmutativa.

**Solución oficial:** «Véase la solución en el Ejercicio 2.3 del libro *Ejercicios resueltos de Álgebra para Ingenieros*. Se cumplen las tres propiedades. La conmutativa es trivial por ser la suma y producto en $\mathbb R$ conmutativas.» (Sin errores, pero sin desarrollo: el examen dice que lo no justificado no puntúa.)

**Nota para el redactor:** es **el mismo conjunto y la misma operación que E Ej. 2.3** (p.48), ya resuelto en el tema (`#ej2-3`). Opciones: (a) entrada X corta que remita a `#ej2-3` y solo destaque lo que cambia (aquí no se pide el simétrico); (b) fusionarla en una sola entrada con Sept. 2017 problema a) (§2.3 de este dossier), que pide además el simétrico. Se da la solución completa por si se prefiere autocontenida.

**Solución paso a paso** (propiedades S1, S2, S4 de U p.57-58):

1. **Paso previo: la operación es interna en $V$.** Si $x_1>0$ e $y_1>0$, entonces $x_1y_1>0$ (producto de positivos), y $x_2+y_2\in\mathbb R$. Por tanto $(x_1,x_2)*(y_1,y_2)\in V$. *Por qué:* las propiedades solo tienen sentido si el resultado no se sale del conjunto. (Además, este es el motivo de exigir $x_1>0$: con $x_1=0$ no habría simétrico, ver §2.3.)
2. **Asociativa** (S1: $(u*v)*w=u*(v*w)$ para todos $u,v,w\in V$). Con $u=(x_1,x_2)$, $v=(y_1,y_2)$, $w=(z_1,z_2)$:
   - $(u*v)*w=(x_1y_1,\ x_2+y_2)*(z_1,z_2)=\big((x_1y_1)z_1,\ (x_2+y_2)+z_2\big)$;
   - $u*(v*w)=(x_1,x_2)*(y_1z_1,\ y_2+z_2)=\big(x_1(y_1z_1),\ x_2+(y_2+z_2)\big)$.
   
   Son iguales componente a componente por la asociatividad del producto y de la suma de números reales. **Se cumple.**
3. **Elemento neutro** (S2: existe $e\in V$ con $u*e=e*u=u$ para todo $u\in V$). Buscamos $e=(e_1,e_2)$:
   $(x_1,x_2)*(e_1,e_2)=(x_1e_1,\ x_2+e_2)=(x_1,x_2)\iff x_1e_1=x_1$ y $x_2+e_2=x_2$. Como $x_1\neq0$ (es positivo) se puede dividir: $e_1=1$; y $e_2=0$. El candidato es $e=(1,0)$, que **está en $V$** ($1>0$) y no depende de $u$. Por el otro lado: $(1,0)*(x_1,x_2)=(1\cdot x_1,\ 0+x_2)=(x_1,x_2)$. **Se cumple, con neutro $e=(1,0)$.**
4. **Conmutativa** (S4: $u*v=v*u$). $(x_1,x_2)*(y_1,y_2)=(x_1y_1,\ x_2+y_2)$ y $(y_1,y_2)*(x_1,x_2)=(y_1x_1,\ y_2+x_2)$, iguales por la conmutatividad del producto y la suma en $\mathbb R$. **Se cumple.**
5. **Resultado:** se cumplen las tres propiedades.

**Verificación (sympy):** diferencias de los dos miembros de la asociativa y de la conmutativa = `[0, 0]`; `solve([x1*e1-x1, x2+e2-x2],[e1,e2])` → `{e1: 1, e2: 0}`; $(1,0)*X-X=(0,0)$.

**Receta:** (i) comprobar que la operación es interna; (ii) asociativa y conmutativa: desarrollar los dos miembros por separado y compararlos componente a componente; (iii) neutro: **despejar** $e$ de $u*e=u$ (no suponer que es $(0,0)$), comprobar que $e$ no depende de $u$, que está en el conjunto y que también vale por la izquierda.

**Error típico:** dar como neutro $(0,0)$ «porque el neutro es el cero»: aquí $(0,0)$ ni siquiera está en $V$ ($0\notin\mathbb R^+$) y $(x_1,x_2)*(0,0)=(0,x_2)\neq(x_1,x_2)$. El neutro de la primera componente, que se opera multiplicando, es 1.

---

### 2.3. Sept. 2017 (tipo A), problema a) — misma operación, ahora con simétrico (2 puntos)

**Enunciado literal** (confirmado en el PDF):
> a) (2 puntos) Estudie si el conjunto $V=\{(x_1,x_2)\mid x_1\in\mathbb R^+,\ x_2\in\mathbb R\}$ con la operación $(x_1,x_2)*(y_1,y_2)=(x_1y_1,\ x_2+y_2)$ verifica la propiedad asociativa, elemento neutro, elemento simétrico y propiedad conmutativa.

**Solución oficial:** «Véase la solución en el Ejercicio 2.3 del libro *Ejercicios resueltos de Álgebra para Ingenieros*.» (Nada más.)

**Solución paso a paso.** Los pasos 1-4 son idénticos a §2.2 (operación interna; asociativa sí; neutro $e=(1,0)\in V$; conmutativa sí). Se añade:

5. **Elemento simétrico** (S3: para cada $u\in V$ existe $u'\in V$ con $u*u'=u'*u=e$). Solo tiene sentido porque ya sabemos que existe el neutro $e=(1,0)$. Dado $u=(x_1,x_2)\in V$, buscamos $u'=(x_1',x_2')$:
   $(x_1x_1',\ x_2+x_2')=(1,0)\iff x_1x_1'=1$ y $x_2+x_2'=0\iff x_1'=\dfrac1{x_1}$, $x_2'=-x_2$.
   - Se puede dividir entre $x_1$ porque $x_1>0$ (aquí es donde importa que $V$ excluya $x_1=0$).
   - **Hay que comprobar que $u'\in V$:** $\frac1{x_1}>0$ por ser $x_1>0$, y $-x_2\in\mathbb R$. Sí está.
   - Por el otro lado: $u'*u=\big(\tfrac1{x_1}x_1,\ -x_2+x_2\big)=(1,0)$ (o directamente por la conmutativa).
   
   **Se cumple:** el simétrico de $(x_1,x_2)$ es $\left(\frac1{x_1},-x_2\right)$.
6. **Conclusión:** se cumplen las cuatro propiedades, es decir, $(V,*)$ es un **grupo conmutativo** (U p.58).

**Verificación (sympy):** $X*(1/x_1,-x_2)=(1,0)$ y $(1/x_1,-x_2)*X=(1,0)$.

**Receta:** simétrico ⇒ resolver $u*u'=e$ con el neutro ya hallado, comprobar que la solución **pertenece al conjunto** y que vale por los dos lados (o invocar la conmutativa ya probada). Orden recomendado: interna → asociativa → neutro → simétrico → conmutativa.

**Error típico:** (i) dar como simétrico $(-x_1,-x_2)$ «el opuesto de siempre»: $(-x_1)$ es negativo y no está en $V$, y además $(x_1,x_2)*(-x_1,-x_2)=(-x_1^2,0)\neq(1,0)$; (ii) olvidar comprobar que $1/x_1>0$, es decir, que $u'\in V$.

**Comentario didáctico (útil para el tema):** si se cambiara $V$ por $\mathbb R\times\mathbb R$ (permitiendo $x_1=0$ o negativo), la operación seguiría siendo asociativa y conmutativa con neutro $(1,0)$, pero $(0,x_2)$ **no tendría simétrico** ($0\cdot x_1'=1$ es imposible): dejaría de ser grupo. Es la razón de la restricción $x_1\in\mathbb R^+$.

---

## 3. DUDOSOS / de otros temas (con el tema propuesto)

| Examen y pregunta | Contenido | Tema propuesto | Nota |
|---|---|---|---|
| **Ene. 2022 (tipo A), ejercicio 2** | $F=\langle x^2,1\rangle$, $G=\langle x^2+1\rangle$: hallar $F+G$, $F\cup G$, $F\cap G$ | **2.4** (con guiño a 2.1) | Fronterizo: el apartado $F\cup G$ conecta con E Ej. 2.13 (unión, sección 2.1 de E). Verificado: $x^2+1=1\cdot x^2+1\cdot1\in F$, luego $G\subseteq F$ y $F\cap G=G$, $F+G=F$, $F\cup G=F$ (que **sí** es subespacio, porque uno contiene al otro: criterio de E Ej. 2.13). La oficial solo da el resultado. Si el redactor quiere un ejemplo X de «unión que SÍ es subespacio» en 2.1, es este. |
| Feb. 2018 (tipo B), ejercicio 2 | $U_1=\{x_1=x_2=x_3=x_4\}$, $U_2=\{x_1=x_2,x_3=x_4\}$: suma directa, $\dim(U_1\cap U_2)$, suplementarios | 2.4 | |
| Feb. 2019 (tipo B), ejercicio 2 | paramétricas de $U_1\cap U_2$ | 2.4 | |
| Ene. 2020 (tipo A), problema a) | $U$ de dim. 2 en paramétricas, $U\cap V$, suplementario de $U+V$ | 2.4 | |
| Sept. 2019 (tipo A), ejercicio 2 | $S\cap T$ con generadores | 2.4 | |
| Sept. 2022, problema b) | base, cartesianas y paramétricas de $F+G$; suplementario | 2.4 | |
| Feb. 2024 (1.ª sem.), problema 7 | $\dim L_1$, $\dim L_2$, $\dim(L_1\cap L_2)$, $\dim(L_1+L_2)$ | 2.4 | «Fallo recurrente: confundir suma con unión» — útil como aviso en 2.1. |
| Feb. 2025 (2.ª sem.), pregunta 2 | posibles $\dim N$ dados $\dim M$, $\dim(M\cap N)$ | 2.4 | Fallo recurrente: usar $M\cup N$ (no es subespacio) en vez de $M+N$. |
| Sept. 2024, problema 7(a)-(b) | definir $U_1+U_2$, $U_1\cap U_2$; sus bases | 2.4 | El 7(c) ya está en 2.1. |
| Feb. 2022 (tipo A), ejercicio 1 | escribir paramétricas de un «sistema» y pasar a cartesianas (3 incógnitas) | 2.2 | Paso paramétricas↔cartesianas es objetivo de U §2.2 (p.69). |
| Feb. 2022 (tipo A), ejercicio 2 | sistema generador de $U=\{x+y-z=0,\ x+2y=0\}$ | 2.2 | |
| Sept. 2022, ejercicio 2 | ecuaciones cartesianas o paramétricas de un subespacio de dim. 1 de $\mathbb R^2$ | 2.2 (o 2.3 por «dimensión») | |
| Feb. 2017 (2.ª sem., tipo A), ejercicio 2 | sistema ligado según $a,b$ | 2.2 | |
| Feb. 2024 (1.ª sem.), pregunta 2 | matrices linealmente dependientes | 2.2 | |
| Feb. 2023 (2.ª sem.), problema 7 | independencia, paramétricas/implícitas de $U=\langle E\rangle$, base ortonormal | 2.2 / 2.3 (y 5.1) | |
| Sept. 2023, problema 7 (2.º apartado) | «subespacio **propio** de la imagen de $f$» en forma implícita | 3.2 | Usa la noción de subespacio propio de U p.63 (≠ $\{0\}$ y ≠ el total). La oficial es correcta: los propios de $\mathrm{Im}f$ (plano) son las rectas que contiene; $\{y=z=0\}=\langle(1,0,0)\rangle\subset\mathrm{Im}f=\langle(0,1,3),(5,0,0)\rangle$. Podría citarse en 2.1 como aplicación de «propio/impropio». |
| Feb. 2025 (1.ª sem.), problema 7 (1.er apartado) | $f(x)=(x,2+x,3x,4x,5x)$ no es lineal porque $f(0)\neq0$ | 3.1 | Mismo «filtro del cero» que en subespacios. |
| Feb. 2024 (1.ª sem.), pregunta 4 | V/F: $u,v$ autovectores de $\lambda=5$ ⇒ $u+v$ autovector de $\lambda=5$ | 4.2 | Es «cierre para la suma» del subespacio propio. **Aviso para 4.2:** la oficial dice «Verdadero» sin matices, pero si $v=-u$ entonces $u+v=\bar0$, que **no** es autovector (por definición un autovector es no nulo); lo correcto es «$u+v$ es autovector **si $u+v\neq\bar0$**» (o: $u+v$ está en el subespacio propio $V_5$). |

**Sin preguntas de 2.1** (leídos y descartados): Feb. 2018 (tipo A), Feb. 2020 (1.ª sem., tipo B), Feb. 2022 (tipo A) salvo lo listado, Feb. 2023 (1.ª sem.) salvo p. 2, Feb. 2025 (1.ª/2.ª sem.) salvo lo listado, Feb. 2026 (1.ª sem.), Sept. 2018 (tipo A), Sept. 2023 salvo lo listado, Sept. 2025.
