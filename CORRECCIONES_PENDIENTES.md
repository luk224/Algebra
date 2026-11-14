# Correcciones de la revisión de la capa pedagógica (F5.3) — APLICADAS

> **Estado (14-nov-2026, tarde):** revisados los 26 temas salvo 6.4 y 6.5 (en curso). Aplicadas todas las correcciones de los informes de 1.2-6.3 (commits «Correcciones de la revisión de la capa…»). Lo que sigue es el registro de lo que se corrigió; no hace falta volver a aplicarlo. Quedan solo los avisos de la última sección (sin verificar).

## Registro original

Revisión con agentes `revisor-tema` (prompt: `herramientas/prompt_revision_capa.md`). Todas aplicadas (salvo `ex-feb20b` de 1.4, que usa una convención equivalente y coherente consigo misma, y `ex-feb18a-4` de 4.1, pendiente de revisar).
Recibidas: 1.2, 1.3, 1.4, 1.5 (sin errores), 2.1, 2.2, 2.4, 3.1, 3.3, 3.4, 3.5. **Faltan por revisar** (los agentes fallaron por el límite de uso): 2.3, 3.2, 4.1-4.4, 5.1-5.4, 6.1-6.5; repetir la revisión de esos temas con el mismo prompt.
Cómo aplicar: editar el campo en `datos/X_Y/{tema,ejercicios}.yaml` (bloques `|-`), `datos_tema.py validar X.Y`, `construir X.Y`, `estado x`, commit.

## 1.4
- `tema.yaml · tipos.lu.fallos`: decía «Poner en L el multiplicador con el signo cambiado» (contradice la teoría: en L va −λ). Nuevo: «Poner en $L$ el multiplicador $\lambda$ de $F_i\to F_i+\lambda F_j$ sin cambiarle el signo · Resolver primero $UX=Y$ y luego $LY=B$ (el orden es primero $L$) · Olvidar permutar también $B$ cuando hay $PA=LU$ · Decir que $\det A=\det L$ en vez de $\det U$».
- `tipos.lu.pasos[0]`: «Escalona $A$ solo con reemplazos $F_i\to F_i+\lambda F_j$ ($i>j$), sin normalizar ni intercambiar filas: el resultado es $U$.» `pasos[1]`: «En la posición $(i,j)$ de $L$ coloca el multiplicador usado con el signo cambiado, $-\lambda$, con $1$ en la diagonal y $0$ encima.»
- `esencial.items[4]`: terminar con «$\det L=1$, luego sin intercambios $\det A=\det U$ (con $PA=LU$, $\det A=\pm\det U$, signo según el número de intercambios).»
- `quiz[2]`, opción «Solo tiene la solución nula», `why`: «Solo la nula exigiría $\operatorname{rang}A=n$; aquí $n=3$ (la ampliada tiene $n+1=4$ columnas) y $\operatorname{rang}A=2<3$, así que hay infinitas soluciones.»
- `ex-feb19pb.enunciado`: «Enunciar algún método numérico para resolver un sistema de ecuaciones lineales y mostrar sus pasos, es decir, cómo se aplica.»
- Menores (cuerpo): `ex-feb20b` (regla práctica y error sobre el signo en L, mismo problema); `ej1-41` html «Respuesta (según E)…» → «<p><b>Respuesta: B.</b> A no sirve como respuesta: el sistema es compatible <i>indeterminado</i> (1 parámetro), no tiene una única solución.</p>»; quitar los comentarios HTML «Aviso de extracción…» de `ej1-32` y `ej1-39`.

## 2.4
- `ej2-34.pista`: «Para A), comprueba que cada vector de $B_1$ cumple $x_4=-x_3$, que son libres y cuántos hacen falta ($\operatorname{Dim}U_1$). Para B)–D), mira si $(0,0,0,1)$ está en $U_1$ (intersección nula) y si las dimensiones suman 4.»
- `ej2-33.problema`: `[suma]` (quitar `inter`).

## 3.3
- `ej3-18.enunciado`: sustituir «(Hay que elegir entre cuatro matrices $4\times4$.)» por «(Hay que elegir entre tres matrices $4\times4$, A, B y C, o la opción D, «Ninguna de las anteriores».)»
- `ex-feb26-1p2.problema`: `[usar, bases]` (no `canon`).
- `quiz[4]`, opción `(2,5,0)`, `why`: «Has copiado los dos primeros coeficientes de $p$ sin derivar; hay que aplicar $D$: $D(2+5x+x^2)=5+2x$.»
- `tipos.usar.fallos`: cambiar «Confundir filas con columnas al contar el rango de Im» por «Tomar las filas de $A$ como generadores de $\operatorname{Im}f$ (son las columnas; el rango coincide, los vectores no)».
- `ej3-19.enunciado`: «(polinomios reales de grado $\le2$)».
- `ex-feb26-2p8.nivel`: 2.

## 3.4
- `tipos.potencias.pasos[2]`: «Para la inversa, saca $f$ factor común: $f\circ(a\,i-f)=b\,i$ y, si $b\neq0$, divide entre $b$: la inversa es $\tfrac1b(a\,i-f)$.»
- `ej3-31.pista`: «Traduce cada afirmación a matrices. Una afirmación general («es conmutativa») se refuta con un contraejemplo $2\times2$; una de existencia («puede ser nula») se prueba con un ejemplo: busca dos matrices no nulas con producto nulo. Para la C, piensa qué aplicación deja cada vector como está.»

## 3.5
- `que_cae_nota`: «En los exámenes de 2017-2026 este tema sale poco y con dos formatos: el determinante de una matriz de cambio de base (test: Feb. 2017 y Feb. 2025) y la matriz de un endomorfismo en otra base, $Q^{-1}AQ$ (Feb. 2026); otros exámenes piden esa matriz por la Def. 3.4 (tema 3.3). El resto aparece en el libro de ejercicios.»
- Regla 8 bis (cuerpo, quitar comparativas con E): `ej3-40` error (c) → «(c) llamar a $Q^{-1}$ «cambio de $V$ a la canónica»: con la Def. 3.14 ese cambio es $Q$ ($x_C=Q\,x_V$).» y quitar «las combinaciones que da E» y «Es el producto «$AB$» de E p.118…»; `ej3-37` pasos[1]: quitar «(En E: $Q_{BB'}\,A\,Q_{B'B}$.)»; `ej3-38` html: quitar «Es la versión de E del Ej. 3.31 de U…» y en `error` (c) dejar «(c) copiar el $A'$ de U Ej. 3.31, que corresponde a otro dato.»; `ex-feb17a-3` pasos[3] → «<b>¿Y si se pide el cambio en el otro sentido?</b> «De $U$ a $U'$» es $x_{U'}=R\,x_U$ con $R=Q^{-1}$, y $\det R=1/\det Q=1$.»

## Otros avisos de los redactores (sin verificar)
- 3.1 `ex-feb22a-e3`: enunciado reescrito a «Demuestre que f es lineal» (el resto es del 3.2). 3.1 `ej3-9`, 3.2 `ej3-20/22`, 4.4 `ej4-36/38`, 4.2 `ej4-17/23`: apartados de Maxima (fuera de examen).
- 4.4 `ej-propio-14`: comprobar que «formas posibles» y la pista («tres tamaños») coinciden. 4.3 `ej4-30`: salida de Maxima peculiar. 5.1 `ex-feb24b-5`: G no es definida positiva (Δ₂<0): comprobar el enunciado.
- 3.5 `ej3-38` y la teoría 05_s4 (Ej. 3.31): comprobar coherencia del dato (1,0,1) frente a (1,0,−1).

## 1.2
- `ex-feb18a.pista`: «$A^2-B^2$ no es $(A+B)(A-B)$ en general. Halla primero $A$ y $B$ sumando y restando los datos (o usa que $(A+B)(A-B)+(A-B)(A+B)=2(A^2-B^2)$).»
- `tipos.elementales.pasos[0]`: «Una elemental sale de $I_n$ con <b>una sola</b> operación (intercambiar dos filas, multiplicar una fila por un número $\alpha\neq0$, o sumar a una fila un múltiplo de otra) y siempre es regular.» y `ej1-13.pista`: «Para cada matriz, pregúntate si se obtiene de la identidad con <i>una sola</i> operación (intercambiar dos filas, multiplicar una fila por $\alpha\neq0$ o sumar a una fila un múltiplo de otra). Primero mira si es cuadrada.»
- `ej1-8.pista`: «No uses identidades notables (el producto no conmuta): halla primero $A$ y $B$ a partir de la suma y la diferencia, y luego prueba cada opción.»
- `ej1-11.enunciado`: «$A,B$ cuadradas de orden $n$ con $AB=A$ y $BA=B$. ¿Cuáles de estas afirmaciones son ciertas? A) Si $A$ es regular, $B=I_n$. B) $A^2=A$ y $B^2=B$.» `ej1-12.enunciado`: «Elíjanse las respuestas correctas: A) Las matrices elementales son cuadradas. B) Son regulares. C) Permiten calcular la inversa de una matriz regular.»

## 1.3
- `ex-feb19b1.enunciado` (quitar etiqueta de fuente y enlace al 1.22): «Si $a_{15}a_{2i}a_{3j}a_{42}a_{53}$ es un término del desarrollo de un determinante de orden 5 de una matriz $A=(a_{ij})$ tal que el signo de la permutación asociada $p$, $\operatorname{sig}(p)$, es negativo, calcular el valor de $(i,j)$.»
- `ej1-27.pista`: «Compara cada columna de la matriz nueva con las filas de la matriz dada: ¿qué columna es cada fila, y por qué número está multiplicada? Recuerda que $\det A^t=\det A$ y que un factor común de una sola columna sale fuera una sola vez.»
- Convención de U ($A=P^{-1}DP$): `quiz[2].fb` → «$A=P^{-1}DP$, luego $\det A=\frac1{\det P}\cdot\det D\cdot\det P=\det D=2\cdot(-1)=-2$.»; `why` de «No se puede saber sin conocer $P$» → «Semejantes tienen el mismo determinante: $\det(P^{-1}DP)=\det D$, sin importar $P$.»; `ex-feb19b4.pista` → «Semejante a una diagonal significa $A=P^{-1}DP$ con $P$ regular. ¿Qué pasa con el determinante de un producto y con el de $P^{-1}$?»

## 2.1
- `tema.yaml · que_cae_nota`: «Lo más frecuente en examen es «¿es subespacio?» con un conjunto de $\mathbb R^n$, de matrices, de polinomios o de funciones; las preguntas con una operación inventada (asociativa, neutro, simétrico, conmutativa) salen como cuestión razonada o como apartado de un problema, y se trabajan en el tema 1.5.»
- `ex-sep24.pista`: «La unión solo es subespacio si un subespacio contiene al otro. Mira si los generadores de $U_1$ cumplen las ecuaciones de $U_2$; luego saca generadores de $U_2$ y mira si son combinación de los de $U_1$. Si en cada sentido falla al menos uno, ninguno contiene al otro: suma un vector de cada uno que no esté en el otro.»
- `ex-sep17a.pista`: «Mira la entrada fija igual a 1 en la primera fila: ¿puede la matriz nula ser de esa forma? Piensa qué opciones exigen que $W$ contenga a la matriz nula.»

## 2.2
- `ej2-17`, bloque html tras los pasos (regla 8 bis): «<p><i>(sympy: $x_1+x_2+x_3$ vale $0$ en los vectores de B y $1$ en $(0,1,0)$; $\operatorname{rang}(S)=2$ y $\operatorname{rang}(S\cup\{(0,1,0)\})=3$, luego $(0,1,0)\notin\langle S\rangle=U$.)</i> En C la razón decisiva es que el propio generador $(0,1,0)\notin U$.</p>»
- `tipos.rango.pasos[1]`: «Escalona con operaciones elementales por filas (intercambiar filas, multiplicar una fila por un número $\ne0$, sumar a una fila un múltiplo de otra): no cambian el rango.»
- `ej2-18.enunciado`: «Se pide justificar si son generadores del subespacio $U:\ x_1+x_2+x_3=0$ del Ejercicio 2.17 (generado por $S=\{(1,0,-1),(0,1,-1)\}$) los conjuntos: A) $S_1=\{(1,0,-1),(0,2,-2)\}$. B) $S_2=\{(1,0,-1),(0,1,-1),(1,1,-2)\}$. C) $S_3=\{(1,0,-1),(0,1,-1),(1,1,-2),(3,0,-3)\}$. D) $S_4=\{(1,1,-2),(3,0,-3)\}$. E) $S,S_1,S_2,S_3$ y $S_4$ son equivalentes.»
- `ex-feb24.nivel`: 2.

## 3.1
- `ej3-12.pista`: «Para A, escribe un vector cualquiera como combinación de esa base y aplica la linealidad. Para B y C, pregúntate qué vectores de $\mathbb R^3$ pueden ser imagen: ¿de qué vectores son combinación?»
- `ex-propio-a45.pista`: «Para (a) y (b), escribe el vector como combinación de $(1,1)$ y $(1,-1)$ (resuelve un sistema $2\times2$). Para (c), piensa si alguna aplicación lineal puede mandar dos vectores distintos al mismo vector.»
- `ej3-13.pista`: «Ojo: A, B y C afirman «es falso que…»; decide primero si lo de dentro es cierto (usa $f(0)=0$, $f(-x)=-f(x)$ y $f(x-y)=f(x)-f(y)$) y luego niega. Para D, toma $w_1=f(x)$, $w_2=f(y)$ con $x,y\in S$ y mira si $w_1+\lambda w_2$ está en $f(S)$.»
- `ex-feb22a-e3.enunciado`: añadir al final «<i>(El examen pide calcular los subespacios núcleo e imagen de $f$, tema 3.2; aquí solo se demuestra la linealidad, que es el paso previo.)</i>»
- Regla 8 bis: `ej3-3`, eliminar el bloque `html` «Además se pierde un «≠»…»; `ej3-9` paso (D) → «<b>(D)</b> Trata de Maxima, que <b>no entra en examen</b>. No se desarrolla.»
