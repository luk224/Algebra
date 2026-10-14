# Dossier de exámenes (fuente X) — Tema 1.3: Determinantes

Revisados **los 24 exámenes** de `fuentes_txt/examenes/*.txt` (lectura completa). Los enunciados con matrices se han confirmado sobre el PDF de `E:\UNED\ALGEBRA\Examenes\` (renderizado de la página con PyMuPDF), porque el `.txt` desordena las matrices. Todos los cálculos se han verificado con sympy (script en el scratchpad de la sesión: razones de determinantes con parámetros simbólicos, signos de permutaciones, determinantes 4×4, LU).

**Recuento:** 10 ejercicios del tema 1.3 (núcleo) + 5 ejercicios «frontera» (se resuelven solo con propiedades del determinante, pero el objeto pertenece a otro tema; el redactor decide si los usa) + lista de excluidos con motivo.

Teoría de U citada (comprobada en `ingenieros.txt`, impresa = PDF − 6):
- U §1.3.1 p.23-24: fórmulas de orden 2 y 3; **desarrollo por adjuntos** de una fila $|A|=a_{i1}A_{i1}+\dots+a_{in}A_{in}$ (nota 11: igual por columnas).
- U §1.3.2 p.24-25: permutaciones, paridad por número de **intercambios**, $\operatorname{sig}(p)$, **Definición 1.6** $\det A=\sum_{p\in S_n}\operatorname{sig}(p)\,a_{1p_1}\cdots a_{np_n}$ (Ejemplos 1.18-1.20).
- U §1.3.3 p.26: fila de ceros ⇒ $\det=0$; **triangular ⇒ producto de la diagonal**; $\det A=\det A^t$; $\det(\alpha A)=\alpha^n\det A$; $\det(AB)=\det A\det B$; en general $\det(A+B)\neq\det A+\det B$.
- U §1.3.3 p.27: **operaciones elementales por filas**: $F_i\leftrightarrow F_j$ cambia el signo; $F_i\to\alpha F_i$ ($\alpha\ne0$) multiplica por $\alpha$; $F_i\to F_i+\alpha F_j$ no cambia. Aplicaciones: **$A$ regular ⇔ $\det A\neq 0$**; $A^{-1}=\frac1{|A|}(\operatorname{Adj}A)^t$; rango = mayor orden de un menor no nulo.
- U §1.4 p.45-46, p.49-51: factorización $A=LU$ ($L$ triangular inferior **con unos en la diagonal**; si $A$ es regular, es única) y «$\det(A)=1\cdot\det(U)$».
- U §4.1.3 p.148, Definición 4.5: $A'$ semejante a $A$ si $A'=P^{-1}AP$ con $P$ regular. U §4.1 p.147, Definición 4.4: $B$ congruente con $A$ si $B=P^tAP$ con $P$ regular.

Dos propiedades que **no** están enunciadas literalmente en U §1.3 y que conviene deducir en la solución (en el examen se pide justificar):
- **$\det(A^{-1})=1/\det A$**: de $AA^{-1}=I$ y $\det(AB)=\det A\det B$ (U p.26) sale $\det A\cdot\det A^{-1}=\det I=1$ ($I$ es triangular, U p.26).
- **Operaciones por columnas** tienen el mismo efecto que por filas: hacer una operación sobre las columnas de $A$ es hacerla sobre las filas de $A^t$, y $\det A=\det A^t$ (U p.26).

---

## Parte I. Ejercicios del tema 1.3 (ordenados de fácil a difícil)

### X1. Feb. 2019 (tipo B), ejercicio 4 — determinante de una matriz semejante
Fichero: `Algebra_Febrero19B.txt`, Ejercicio 4.

**Enunciado.** Si $A$ es una matriz cuadrada de orden 2 que es semejante a $\begin{pmatrix}2&0\\0&-1\end{pmatrix}$, se pide calcular, si es posible, el valor del determinante de $A$.

**Solución.**
1. *Qué significa «semejante».* Por la Definición 4.5 (U §4.1.3 p.148), existe una matriz regular $P$ (matriz de paso) tal que $A=P^{-1}DP$, con $D=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$. (Da igual escribir $A=P^{-1}DP$ o $D=P^{-1}AP$: si una se cumple con $P$, la otra se cumple con $P^{-1}$.)
2. *Determinante del producto.* Por $\det(XY)=\det X\det Y$ (U p.26), aplicado dos veces: $\det A=\det(P^{-1})\,\det D\,\det P$.
3. *Determinante de la inversa.* Como $PP^{-1}=I$, $\det P\cdot\det P^{-1}=\det I=1$; $P$ es regular, luego $\det P\neq0$ (U p.27) y $\det P^{-1}=\dfrac1{\det P}$.
4. *Se cancela $P$.* $\det A=\dfrac1{\det P}\cdot\det D\cdot\det P=\det D$. ¡No hace falta conocer $P$! Por eso «sí es posible».
5. *Determinante de $D$.* $D$ es diagonal (en particular triangular), así que su determinante es el producto de la diagonal (U p.26): $\det D=2\cdot(-1)=-2$.

**Resultado:** $\det A=-2$.

Verificación (sympy): con $P=\begin{pmatrix}1&2\\1&3\end{pmatrix}$, $\det(P^{-1}DP)=-2$.

**Receta.** Matrices semejantes tienen el mismo determinante: $\det(P^{-1}DP)=\det D$. Si $D$ es diagonal (o triangular), $\det D$ = producto de la diagonal = producto de los autovalores contados con su multiplicidad.

**Error típico.** Intentar hallar una $P$ concreta (no se pide y no hace falta), o escribir $\det(P^{-1})=-\det P$ en vez de $1/\det P$.

---

### X2. Sept. 2024, pregunta 4 — determinante de una matriz de orden 5 semejante a una diagonal
Fichero: `Algebra_Septiembre24.txt`, pregunta 4.

**Enunciado.** Calcule el determinante de una matriz $A$ de orden 5 que es semejante a una matriz diagonal $D$ cuyos valores propios son $-5$ y $-2$ con multiplicidades algebraicas 1 y 4, respectivamente.

**Solución.**
1. *Semejanza.* Existe $P$ regular con $A=PDP^{-1}$ (Definición 4.5, U p.148).
2. *Mismo determinante.* Por $\det(XY)=\det X\det Y$ y $\det P^{-1}=1/\det P$ (deducido de $PP^{-1}=I$): $|A|=|P|\,|D|\,|P^{-1}|=|D|$.
3. *Quién es $D$.* $D$ es diagonal de orden 5 y sus valores propios son sus elementos diagonales (los autovalores de una matriz triangular son los elementos de su diagonal, porque $|D-\lambda I|=\prod(d_{ii}-\lambda)$). Con las multiplicidades dadas, la diagonal contiene una vez $-5$ y cuatro veces $-2$ (en algún orden; el orden no afecta al producto):
$$D=\begin{pmatrix}-5&0&0&0&0\\0&-2&0&0&0\\0&0&-2&0&0\\0&0&0&-2&0\\0&0&0&0&-2\end{pmatrix}.$$
4. *Producto de la diagonal* (U p.26): $|D|=(-5)\cdot(-2)^4=(-5)\cdot16=-80$.

**Resultado:** $|A|=-80$.

**Receta.** $\det A=\prod \lambda_i^{\,m_i}$ (cada autovalor elevado a su multiplicidad algebraica). Cuidado con el signo: $(-2)^4>0$.

**Error típico.** Multiplicar los autovalores sin elevarlos a su multiplicidad ($(-5)(-2)=10$) o sumar las multiplicidades en el exponente equivocado.

---

### X3. Feb. 2026 (2.ª sem.), pregunta 4 — determinante de una matriz de orden 7 semejante a una diagonal
Fichero: `Algebra-Febrero2026-B.txt`, pregunta 4.

**Enunciado.** Calcule el determinante de una matriz $A$ de orden 7, sabiendo que es semejante a una matriz diagonal $D$ cuyos valores propios son $-1$ y $5$ con multiplicidades algebraicas 3 y 4, respectivamente.

**Solución.**
1. $A$ semejante a $D$ ⇒ existe $P$ regular con $D=P^{-1}AP$ (U p.148).
2. $|D|=|P^{-1}|\,|A|\,|P|=\dfrac1{|P|}|A|\,|P|=|A|$ (U p.26 + $\det P^{-1}=1/\det P$).
3. $D$ es diagonal de orden $3+4=7$ con diagonal $(-1,-1,-1,5,5,5,5)$ (en algún orden).
4. $|A|=|D|=(-1)^3\cdot5^4=(-1)\cdot625=-625$.

**Resultado:** $|A|=-625$. (Comprobado con sympy construyendo $A=PDP^{-1}$ con una $P$ regular de orden 7: $\det A=-625$.)

**Receta.** Igual que X2: comprobar que la suma de multiplicidades es el orden ($3+4=7$) y multiplicar $\lambda^{m}$.

**Error típico.** $(-1)^3=-1$ (exponente impar): olvidar el signo.

---

### X4. Sept. 2025, pregunta 1 — operaciones por columnas y determinante de la traspuesta
Fichero: `Algebra_Septiembre25.txt`, pregunta 1.

**Enunciado.** Sea $A\in\mathcal M_{6\times6}$ una matriz de orden 6 en cuyas columnas se realizan las siguientes transformaciones (en el orden indicado): se intercambia la primera columna con la sexta, se multiplica la tercera columna por 7, se le suma a la segunda columna la cuarta y la quinta. Llamamos $B$ a la matriz resultante. Sabiendo que $\det A=4$, calcule de manera razonada el determinante de la traspuesta de $B$.

**Solución.**
1. *Por qué valen para columnas las reglas de filas.* U p.27 enuncia el efecto de las operaciones elementales **por filas**. Una operación sobre las columnas de $A$ es la misma operación sobre las filas de $A^t$, y $\det A=\det A^t$ (U p.26). Por tanto las tres reglas valen igual para columnas.
2. *$C_1\leftrightarrow C_6$.* Intercambio de dos columnas: el determinante cambia de signo. Tras este paso: $4\cdot(-1)=-4$.
3. *$C_3\to7C_3$.* Multiplicar una columna por $7\neq0$ multiplica el determinante por 7: $-4\cdot7=-28$.
4. *$C_2\to C_2+C_4+C_5$.* Es la composición de dos reemplazos, $C_2\to C_2+C_4$ y después $C_2\to C_2+C_5$ (la columna 4 y la 5 no han cambiado). Cada reemplazo $C_i\to C_i+\alpha C_j$ con $j\neq i$ deja el determinante igual: sigue siendo $-28$. Así $\det B=-28$.
5. *Traspuesta.* $\det B^t=\det B$ (U p.26).

**Resultado:** $\det B^t=-28$. (Sympy: con una $A$ regular aleatoria de orden 6, $\det(B^t)/\det A=-7$.)

**Receta.** Recorre las operaciones en orden y acumula un factor: intercambio $\to\times(-1)$; escalar $\alpha\to\times\alpha$; sumar a una fila/columna múltiplos de **otras** $\to\times1$. La traspuesta no cambia nada.

**Error típico.** Creer que la traspuesta cambia el signo o invierte el determinante; o pensar que «sumar dos columnas» multiplica por 2 (eso solo pasaría con $C_2\to 2C_2+\dots$, es decir, si se multiplica la propia columna que se sustituye).

---

### X5. Feb. 2023 (1.ª sem.), pregunta 1 — determinante de orden 5 a partir de operaciones por filas
Fichero: `Algebra_Febrero23A.txt`, pregunta 1 (matrices confirmadas en el PDF).

**Enunciado.** Sean $a,b\in\mathbb R$ y
$$A=\begin{pmatrix}3&-1&0&5&4\\7&0&-3&8&2\\1&2&9&3&a\\1&4&2&-2&6\\-5&4&1&0&b\end{pmatrix}\in\mathcal M_{5\times5}.$$
Sabiendo que $\det A=15$, calcule el siguiente determinante:
$$\det\begin{pmatrix}1&4&2&-2&6\\21&0&-9&24&6\\1&2&9&3&a\\3&-1&0&5&4\\-4&6&10&3&a+b\end{pmatrix}.$$

**Solución.** Llamemos $F_1,\dots,F_5$ a las filas de $A$ y $M$ a la matriz pedida. La idea es **reconocer cada fila de $M$ como una fila de $A$ modificada** (no se calcula ningún determinante de orden 5).
1. *Identificar filas.*
   - Fila 1 de $M$: $(1,4,2,-2,6)=F_4$.
   - Fila 2 de $M$: $(21,0,-9,24,6)=3\cdot(7,0,-3,8,2)=3F_2$.
   - Fila 3 de $M$: $(1,2,9,3,a)=F_3$.
   - Fila 4 de $M$: $(3,-1,0,5,4)=F_1$.
   - Fila 5 de $M$: $(-4,6,10,3,a+b)=(-5+1,\,4+2,\,1+9,\,0+3,\,b+a)=F_5+F_3$.
2. *Construir $M$ desde $A$ con operaciones elementales (U p.27).*
   - $F_1\leftrightarrow F_4$: el determinante cambia de signo → $15\cdot(-1)=-15$.
   - $F_2\to3F_2$: se multiplica por 3 → $-45$.
   - $F_5\to F_5+F_3$: reemplazo, no cambia → $-45$.
   (Tras el intercambio la fila 3 sigue siendo $F_3$, así que el reemplazo es correcto en ese orden.)
3. Se obtiene exactamente $M$.

**Resultado:** $\det M=15\cdot(-1)\cdot3=-45$. (Sympy, con $a,b$ simbólicos: $\det M/\det A=-3$ idénticamente.)

**Receta.** (1) Escribe cada fila nueva como combinación de las antiguas; (2) tradúcelo a operaciones elementales; (3) multiplica $\det A$ por $(-1)^{\#\text{intercambios}}$ y por los escalares; los reemplazos no cuentan.

**Error típico.** Contar $F_5\to F_5+F_3$ como «multiplica por 2», o no ver que la fila 2 es un múltiplo (×3) de la original. Si se escribiera $F_5\to F_3+F_5$ *sustituyendo la fila 3* (y no la 5), la matriz sería otra.

---

### X6. Feb. 2025 (2.ª sem.), pregunta 1 — determinante de orden 4 a partir de operaciones por filas
Fichero: `Algebra_Febrero25B.txt`, pregunta 1 (matrices confirmadas en el PDF).

**Enunciado.** Sean $a,b\in\mathbb R$ y
$$A=\begin{pmatrix}a&1&4&-7\\0&b&2&4\\1&5&a&0\\-9&-2b&1&1\end{pmatrix}\in\mathcal M_{4\times4}.$$
Sabiendo que $\det A=7$, calcule el siguiente determinante:
$$\det\begin{pmatrix}a-9&1-2b&5&-6\\1&5&a&0\\0&10b&20&40\\-9&-2b&1&1\end{pmatrix}.$$

**Solución.** Filas de $A$: $F_1,\dots,F_4$; $M$ la matriz pedida.
1. *Identificar filas.*
   - Fila 1 de $M$: $(a-9,\,1-2b,\,5,\,-6)=(a+(-9),\,1+(-2b),\,4+1,\,-7+1)=F_1+F_4$.
   - Fila 2 de $M$: $(1,5,a,0)=F_3$.
   - Fila 3 de $M$: $(0,10b,20,40)=10\cdot(0,b,2,4)=10F_2$.
   - Fila 4 de $M$: $F_4$.
2. *Operaciones (U p.27).*
   - $F_1\to F_1+F_4$: reemplazo → sigue valiendo 7.
   - $F_2\to10F_2$: ×10 → 70.
   - $F_2\leftrightarrow F_3$: cambio de signo → $-70$.
3. Se obtiene $M$.

**Resultado:** $\det M=7\cdot10\cdot(-1)=-70$. (Sympy: $\det M/\det A=-10$ con $a,b$ simbólicos.)

**Receta.** La misma que X5.

**Error típico.** Olvidar el intercambio de las filas 2 y 3 (las filas «están» pero en otro orden: eso ya es un intercambio).

---

### X7. Feb. 2024 (2.ª sem.), pregunta 2 — $\det(ABA^t)$
Fichero: `Algebra_Febrero24B.txt`, pregunta 2 (matrices confirmadas en el PDF).

**Enunciado.** Sea $a\in\mathbb R$ y
$$A=\begin{pmatrix}2&-1&0\\-1&a&9\\0&9&7\end{pmatrix}\in\mathcal M_{3\times3}.$$
Sabiendo que $\det A=5$, calcule el determinante de la matriz $ABA^t$, donde
$$B=\begin{pmatrix}0&9&7\\-3&3a&27\\2&-1&0\end{pmatrix}.$$
Nota: La matriz $A^t$ denota la matriz traspuesta de $A$.

**Solución.**
1. *Determinante de un producto.* Por U p.26, $\det(ABA^t)=\det A\cdot\det B\cdot\det A^t$.
2. *Traspuesta.* $\det A^t=\det A=5$ (U p.26; vale para **cualquier** matriz cuadrada, no hace falta que $A$ sea simétrica, aunque aquí lo sea).
3. *Relacionar $B$ con $A$.* Filas de $A$: $F_1=(2,-1,0)$, $F_2=(-1,a,9)$, $F_3=(0,9,7)$. Filas de $B$: $(0,9,7)=F_3$; $(-3,3a,27)=3F_2$; $(2,-1,0)=F_1$. Luego $B$ se obtiene de $A$ con $F_1\leftrightarrow F_3$ (×$(-1)$) y $F_2\to3F_2$ (×3) (U p.27): $\det B=5\cdot(-1)\cdot3=-15$.
4. *Juntar.* $\det(ABA^t)=5\cdot(-15)\cdot5=-375$.

**Resultado:** $-375$. (Sympy: $\det A=14a-169$, $\det B=507-42a=-3\det A$; con $a=87/7$, $\det(ABA^t)=-375$.)

**Fallo recurrente (indicado en el examen):** «Decir que el determinante de un producto de matrices es la suma de los determinantes. Decir que el determinante de la matriz traspuesta de $A$ es el inverso del determinante de $A$.»

**Receta.** $\det$ de un producto = producto de $\det$; $\det A^t=\det A$; para $\det B$ busca qué operaciones elementales llevan $A$ a $B$.

**Error típico.** Despejar $a$ de $\det A=5$ y calcular todo a mano (posible, pero largo y propenso a errores: $a=87/7$).

---

### X8. Feb. 2019 (tipo B), ejercicio 1 — signo de un término del desarrollo de un determinante
Fichero: `Algebra_Febrero19B.txt`, Ejercicio 1. (La solución oficial remite al Ejercicio 1.22 de E, p.23.)

**Enunciado.** Si $a_{15}a_{2i}a_{3j}a_{42}a_{53}$ es un término del desarrollo de un determinante de orden 5 de una matriz $A=(a_{ij})$ tal que el signo de la permutación asociada $p$, $\operatorname{sig}(p)$, es negativo, calcular el valor de $(i,j)$.

**Solución.**
1. *Forma de los términos.* Por la Definición 1.6 (U p.25), $\det A=\sum_{p\in S_5}\operatorname{sig}(p)\,a_{1p_1}a_{2p_2}a_{3p_3}a_{4p_4}a_{5p_5}$: cada término tiene **un factor de cada fila** (primer subíndice $1,\dots,5$) y **los segundos subíndices forman una permutación** de $\{1,\dots,5\}$ (un factor de cada columna).
2. *Permutación asociada.* Leyendo los segundos subíndices en orden de filas: $p=\{5,i,j,2,3\}$. Ya están usadas las columnas 5, 2, 3; faltan 1 y 4. Como $i\neq j$, solo hay dos posibilidades: $(i,j)=(1,4)$ o $(i,j)=(4,1)$.
3. *Paridad de $\{5,1,4,2,3\}$* (contando intercambios hasta la identidad, como en U p.25):
   $\{5,1,4,2,3\}\to\{3,1,4,2,5\}\to\{3,1,2,4,5\}\to\{1,3,2,4,5\}\to\{1,2,3,4,5\}$: 4 intercambios, **par**, signo $+1$.
4. *Paridad de $\{5,4,1,2,3\}$:*
   $\{5,4,1,2,3\}\to\{3,4,1,2,5\}\to\{1,4,3,2,5\}\to\{1,2,3,4,5\}$: 3 intercambios, **impar**, signo $-1$.
5. *Comprobación alternativa (inversiones).* Contar pares desordenados: $\{5,1,4,2,3\}$ tiene $4+0+2+0=6$ inversiones (par); $\{5,4,1,2,3\}$ tiene $4+3+0+0=7$ (impar). Coincide. (La paridad no depende de qué intercambios se elijan, U p.25, nota al margen.)

**Resultado:** $(i,j)=(4,1)$. (Sympy, `Permutation.signature()`: $+1$ y $-1$ respectivamente.)

**Receta.** (1) Escribe los segundos subíndices ordenando por filas; (2) completa con las columnas que faltan; (3) cuenta intercambios (o inversiones) hasta la identidad: par → $+$, impar → $-$.

**Error típico.** Leer la permutación por columnas en lugar de por filas, o pensar que el signo depende del valor de los $a_{ij}$ (el signo es solo de la permutación).

---

### X9. Sept. 2017 (tipo A), ejercicio 1 — factorización LU y determinante
Fichero: `Algebra_Septiembre17A1.txt`, Ejercicio 1 (pregunta tipo test).

**Enunciado.** La factorización $LU$ de una matriz $A$ cuadrada de orden $n$: A) Siempre es única; B) NO se puede utilizar en la resolución de un sistema de ecuaciones lineales del tipo $AX=B$; C) Permite calcular el determinante de $A$ ya que coincide con el determinante de $U$; D) Ninguna de las anteriores es cierta.

**Solución.**
1. *Qué es $A=LU$ en U* (§1.4 p.45): $L$ triangular inferior **con unos en la diagonal** y $U$ triangular superior obtenida de $A$ con reemplazos $F_i\to F_i+\lambda F_j$.
2. *Opción C (cierta).* Por $\det(LU)=\det L\det U$ (U p.26) y porque el determinante de una triangular es el producto de su diagonal (U p.26): $\det L=1\cdot1\cdots1=1$. Luego $\det A=\det U$ (U lo dice explícitamente en p.51: «$\det(A)=1\cdot\det(U)$»). Otra forma de verlo: $U$ se obtiene de $A$ solo con reemplazos, que no cambian el determinante (U p.27).
   Ejemplo (U-tipo, Feb. 2020 B): $A=\begin{pmatrix}1&0&2\\4&3&5\\2&0&1\end{pmatrix}=\begin{pmatrix}1&0&0\\4&1&0\\2&0&1\end{pmatrix}\begin{pmatrix}1&0&2\\0&3&-3\\0&0&-3\end{pmatrix}$, y $\det A=1\cdot3\cdot(-3)=-9=\det U$ (sympy).
3. *Opción A (falsa).* U p.46 solo garantiza la unicidad **si $A$ es regular** (y la factorización ni siquiera existe siempre sin permutar filas). Contraejemplos $2\times2$: escribiendo $L=\begin{pmatrix}1&0\\ \ell&1\end{pmatrix}$, $U=\begin{pmatrix}u_{11}&u_{12}\\0&u_{22}\end{pmatrix}$, $LU=\begin{pmatrix}u_{11}&u_{12}\\ \ell u_{11}&\ell u_{12}+u_{22}\end{pmatrix}$.
   - $A=\begin{pmatrix}0&0\\0&1\end{pmatrix}$ (singular): $u_{11}=u_{12}=0$, $u_{22}=1$ y $\ell$ **cualquiera** ⇒ infinitas factorizaciones.
   - $A=\begin{pmatrix}0&1\\1&0\end{pmatrix}$: haría falta $u_{11}=0$ y $\ell u_{11}=1$, imposible ⇒ no existe $LU$ (hace falta la $PA=LU$ permutada, U p.50).
4. *Opción B (falsa).* U §1.4 p.49 presenta precisamente la «Resolución de un sistema $AX=B$ mediante la factorización $LU$» ($LY=B$, luego $UX=Y$).
5. *D* es falsa porque C es cierta.

**Resultado:** C.

**Receta.** Si $A=LU$ con $L$ de diagonal unitaria, $\det A=$ producto de los pivotes de $U$.

**Error típico.** Creer que $\det A=\det L\cdot\det U$ exige calcular $\det L$: con la convención de U es siempre 1. (Si se usase otra convención con $L$ no unitaria, la afirmación C dejaría de ser cierta en general.)

---

### X10. Feb. 2018 (tipo B), ejercicio 1 — regularidad por determinante (4×4) — *frontera con el tema 2.3*
Fichero: `Algebra_Febrero18B.txt`, Ejercicio 1 (matrices confirmadas en el PDF). Se incluye porque la solución oficial lo resuelve calculando un determinante de orden 4 («su determinante vale 420»), que es la destreza del tema 1.3; el objeto (base de $\mathbb R^4$, sistema ligado) es del tema 2.

**Enunciado.** Sean el sistema $S_1$ de vectores definido por las filas de $\begin{pmatrix}4&1&-3&-4\\2&4&-4&3\\2&3&1&3\\4&0&-1&2\end{pmatrix}$ y el sistema de vectores $S_2$ definido por las filas de $\begin{pmatrix}1&1&-4\\1&5&6\\4&2&3\\-2&0&-2\end{pmatrix}$. Se pide comprobar que $S_1$ es una base de $\mathbb R^4$ y que $S_2$ es un sistema ligado de $\mathbb R^3$.

**Solución.**
1. *Por qué un determinante basta.* $S_1$ tiene 4 vectores de $\mathbb R^4$ (de dimensión 4). Son base ⇔ son linealmente independientes ⇔ la matriz $S$ que los tiene por filas tiene rango 4 ⇔ $\det S\neq0$ (U p.27: rango = mayor orden de un menor no nulo; regular ⇔ $\det\neq0$).
2. *Hacer ceros en la columna 2* usando el 1 de la posición $(1,2)$ como pivote (reemplazos: no cambian el determinante, U p.27):
   $F_2\to F_2-4F_1$: $(2-16,\;0,\;-4+12,\;3+16)=(-14,0,8,19)$;
   $F_3\to F_3-3F_1$: $(2-12,\;0,\;1+9,\;3+12)=(-10,0,10,15)$;
   $F_4$ ya tiene 0 en la columna 2.
   $$\det S=\det\begin{pmatrix}4&1&-3&-4\\-14&0&8&19\\-10&0&10&15\\4&0&-1&2\end{pmatrix}.$$
3. *Desarrollar por la columna 2* (U p.24 y nota 11): solo queda $a_{12}=1$, con signo $(-1)^{1+2}=-1$:
   $$\det S=-1\cdot\det\begin{pmatrix}-14&8&19\\-10&10&15\\4&-1&2\end{pmatrix}.$$
4. *Sacar factor 5 de la fila 2* ($F_2\to\frac15F_2$ divide el determinante por 5, U p.27, así que hay que multiplicar fuera por 5):
   $$\det\begin{pmatrix}-14&8&19\\-10&10&15\\4&-1&2\end{pmatrix}=5\det\begin{pmatrix}-14&8&19\\-2&2&3\\4&-1&2\end{pmatrix}.$$
5. *Sarrus* (U p.26): términos positivos $(-14)(2)(2)+8\cdot3\cdot4+19\cdot(-2)(-1)=-56+96+38=78$; negativos $19\cdot2\cdot4+(-14)\cdot3\cdot(-1)+8\cdot(-2)\cdot2=152+42-32=162$. Determinante $=78-162=-84$.
6. *Juntar:* $\det S=-1\cdot5\cdot(-84)=420\neq0$ ⇒ rango 4 ⇒ $S_1$ es libre y, al tener 4 vectores en un espacio de dimensión 4, es base de $\mathbb R^4$.
7. *$S_2$:* son 4 vectores de $\mathbb R^3$; el rango de una matriz $4\times3$ es como mucho 3 < 4, luego son linealmente dependientes (ligados). No hace falta ningún cálculo (la propia solución oficial lo señala). (Sympy: rango 3.)

**Resultado:** $\det S=420$ (sympy) ⇒ $S_1$ base; $S_2$ ligado por tener más vectores que la dimensión.

**Receta.** $n$ vectores de $\mathbb R^n$ son base ⇔ el determinante de la matriz que forman es $\neq0$. Para un $4\times4$: elegir una fila/columna con un 1 (o ceros), hacer ceros con reemplazos y desarrollar por adjuntos; acabar con Sarrus.

**Error típico.** Calcular un determinante para $S_2$ (no es cuadrada: el determinante no está definido, U p.23 al margen).

---

## Parte II. Ejercicios «frontera» (solo usan propiedades del determinante, pero el tema del enunciado es otro)

Se resuelven por si el redactor quiere usarlos como aplicación; en el HTML del 1.3 convendría avisar de qué concepto de otro tema aparece (semejanza/congruencia: tema 4.1; matriz de Gram: 5.1; base/combinación lineal: 2.2-2.3; polinomio característico: 4.2).

### F1. Sept. 2023, pregunta 5 — ¿dos matrices congruentes tienen el mismo determinante?
Fichero: `Algebra_Septiembre23.txt`, pregunta 5. (Congruencia: Definición 4.4, U p.147.)

**Enunciado.** Estudie si la siguiente proposición es verdadera: si dos matrices son congruentes, entonces tienen que tener el mismo determinante.

**Solución.**
1. $A$ y $B$ congruentes: existe $P$ regular con $B=P^tAP$ (U p.147).
2. $|B|=|P^t|\,|A|\,|P|$ (U p.26, producto) y $|P^t|=|P|$ (U p.26), luego $|B|=|P|^2|A|$.
3. Como $|P|$ puede ser cualquier número no nulo, en general $|P|^2\neq1$. Contraejemplo: $A=I_2$, $P=\begin{pmatrix}2&0\\0&1\end{pmatrix}$: $B=P^tAP=\begin{pmatrix}4&0\\0&1\end{pmatrix}$, $|A|=1$, $|B|=4$ (sympy).

**Resultado:** Falsa. (Lo que sí se conserva es el **signo** del determinante, porque $|P|^2>0$.)

**Receta.** Para «¿se conserva el determinante?» escribe la relación matricial, aplica $\det$ del producto y mira si los factores se cancelan ($P^{-1}\dots P$ sí; $P^t\dots P$ no).

**Error típico.** Confundir congruencia ($P^tAP$) con semejanza ($P^{-1}AP$), que sí conserva el determinante (X1).

### F2. Enero 2022 [1] (tipo A), ejercicio 5 (primera afirmación) — determinantes de dos matrices de Gram
Fichero: `Algebra_Febrero22A1-v2.txt`, Ejercicio 5 (cabecera del examen: «TIPO A. ENERO [1]. 2022»). La segunda afirmación (congruentes y equivalentes) es del tema 4.1/5.1.

**Enunciado.** Si $G$ y $G'$ son dos matrices de Gram del mismo producto escalar en bases diferentes, razonar si son o no ciertas las siguientes afirmaciones: *los dos determinantes son iguales* y *ambas matrices son congruentes y equivalentes*.

**Solución (parte de determinantes).**
1. Al cambiar de base con matriz de paso $Q$ (regular), $G=Q^tG'Q$ (la solución oficial cita U p.198).
2. $|G|=|Q^t|\,|G'|\,|Q|=|Q|^2|G'|$ (U p.26).
3. En general $|Q|^2\neq1$, así que **los determinantes no son iguales** en general. Ejemplo: producto escalar usual de $\mathbb R^2$; en la base canónica $G'=I$; en la base $\{(2,0),(0,1)\}$, $G=\begin{pmatrix}4&0\\0&1\end{pmatrix}$, $|G|=4\neq1$.
4. (Segunda afirmación, otro tema) $G$ y $G'$ son congruentes por la relación del paso 1, y la congruencia implica equivalencia (U p.147) → cierta.

**Resultado:** primera afirmación falsa, segunda cierta.

**Receta.** Igual que F1.

### F3. Feb. 2026 (1.ª sem.), pregunta 3 — ¿es $S$ base de $\mathcal M_{2\times2}$? (determinante 4×4)
Fichero: `Algebra-Febrero2026-A.txt`, pregunta 3 (confirmado en el PDF).

**Enunciado.** Determine si el conjunto $S$ es base de $\mathcal M_{2\times2}$:
$$S=\left\{\begin{pmatrix}1&1\\0&0\end{pmatrix},\begin{pmatrix}0&1\\0&1\end{pmatrix},\begin{pmatrix}0&0\\1&1\end{pmatrix},\begin{pmatrix}1&0\\1&0\end{pmatrix}\right\}.$$

**Solución.**
1. Coordenadas en la base canónica $\{E_{11},E_{12},E_{21},E_{22}\}$: $(1,1,0,0)$, $(0,1,0,1)$, $(0,0,1,1)$, $(1,0,1,0)$. Son 4 vectores en un espacio de dimensión 4: base ⇔ $\det\neq0$ (U p.27).
2. Matriz con esas coordenadas como columnas (la del examen):
   $$C=\begin{pmatrix}1&0&0&1\\1&1&0&0\\0&0&1&1\\0&1&1&0\end{pmatrix}.$$
3. Reemplazos (no cambian el determinante, U p.27): $F_2\to F_2-F_1$: $(0,1,0,-1)$; $F_4\to F_4-F_2$: $(0,0,1,1)$; $F_4\to F_4-F_3$: $(0,0,0,0)$. Aparece una **fila de ceros** ⇒ $\det C=0$ (U p.26).
4. Por tanto $S$ no es libre y no es base. La dependencia explícita (sympy, núcleo de $C$: $(-1,1,-1,1)$): $\begin{pmatrix}1&1\\0&0\end{pmatrix}=\begin{pmatrix}0&1\\0&1\end{pmatrix}-\begin{pmatrix}0&0\\1&1\end{pmatrix}+\begin{pmatrix}1&0\\1&0\end{pmatrix}$ (coincide con la solución oficial).

**Resultado:** $\det C=0$; $S$ no es base.

**Receta.** Pasar a coordenadas, formar la matriz cuadrada y estudiar su determinante; si al escalonar sale una fila de ceros, $\det=0$.

### F4. Sept. 2023, pregunta 2 — valor de $k$ con un determinante de orden 4 con parámetro
Fichero: `Algebra_Septiembre23.txt`, pregunta 2 (confirmado en el PDF). Objetivo de tema 2.2 (combinación lineal); se usa el determinante como herramienta.

**Enunciado.** Determine el valor de $k\in\mathbb R$ para que el vector $(1,1,-2,k)$ sea combinación lineal de los vectores $(0,3,0,-2)$, $(1,2,-1,-5)$ y $(1,0,0,0)$.

**Solución.**
1. Los tres vectores dados son linealmente independientes (sympy: rango 3; a mano, el tercero es el único con primera componente no nula y $(0,3,0,-2)$, $(1,2,-1,-5)$ no son proporcionales). Entonces $w$ es combinación lineal de ellos ⇔ los cuatro son linealmente dependientes ⇔ el determinante de la matriz $4\times4$ que forman es 0. (Este matiz —que los tres primeros sean independientes— no lo menciona la solución oficial y es necesario para la equivalencia.)
2. Matriz con los vectores como columnas (orden del examen: $w$, $v_1$, $v_2$, $v_3$):
   $$N=\begin{pmatrix}1&0&1&1\\1&3&2&0\\-2&0&-1&0\\k&-2&-5&0\end{pmatrix}.$$
3. Desarrollo por la columna 4 (U p.24): solo $a_{14}=1$, signo $(-1)^{1+4}=-1$:
   $$\det N=-\det\begin{pmatrix}1&3&2\\-2&0&-1\\k&-2&-5\end{pmatrix}.$$
4. Desarrollo del $3\times3$ por la fila 1: $1\cdot(0\cdot(-5)-(-1)(-2))-3\cdot((-2)(-5)-(-1)k)+2\cdot((-2)(-2)-0\cdot k)=-2-3(10+k)+8=-24-3k$.
5. $\det N=3k+24=0\iff k=-8$.
6. Comprobación: $(1,1,-2,-8)=-1\cdot(0,3,0,-2)+2\cdot(1,2,-1,-5)-1\cdot(1,0,0,0)$ (sympy).

**Resultado:** $k=-8$.

**Receta.** «$w$ combinación lineal de $v_1,\dots,v_{n-1}$ (independientes) en $\mathbb R^n$» ⇔ $\det(w,v_1,\dots,v_{n-1})=0$. Desarrollar por la fila/columna con más ceros.

### F5. Feb. 2026 (1.ª sem.), pregunta 4 — $|A+8I|$ y $|A-3I|$ a partir del polinomio característico
Fichero: `Algebra-Febrero2026-A.txt`, pregunta 4. Objeto del tema 4.2 (polinomio característico).

**Enunciado.** Si el polinomio característico de $A$ es $(\lambda+8)^2(\lambda-3)^2$, justifique si es cierto o no que $|A+8I|=|A-3I|$, donde $I$ es la matriz identidad de orden 4.

**Solución.**
1. Por definición, $p(\lambda)=|A-\lambda I|=(\lambda+8)^2(\lambda-3)^2$ para todo $\lambda$.
2. $|A+8I|=|A-(-8)I|=p(-8)=0$.
3. $|A-3I|=p(3)=0$.
4. Ambos valen 0: la igualdad es **cierta**. (Sympy con $A=\operatorname{diag}(-8,-8,3,3)$: ambos 0.)

**Receta.** $|A-cI|=p(c)$: basta sustituir en el polinomio característico.

---

## Parte III. Excluidos (con motivo) y dudosos

Sobre los candidatos de la lista previa que **no** se han incluido:
- **Feb23B «det con parámetro»**: en Feb. 2023 (2.ª sem.) la única pregunta con determinante y parámetro es la **6** (rango de la forma cuadrática $3x_1^2+ax_1x_2+3x_2^2$, $\det=9-a^2/4$) → **tema 6**, excluida por la regla «rango de forma cuadrática = 6». La pregunta 1 de ese examen (matriz $M$ con $MA=B$) es de matrices elementales → **1.2**. La 8 (sistema con parámetro) → **1.4**.
- **Sept24 «det con parámetro»**: la pregunta 6 de Sept. 2024 (rango de $Q=ax_1^2+10x_1x_2+ax_2^2$, $|A|=a^2-25$) → **tema 6**, excluida. Sí se incluye la pregunta 4 (X2).

Lista completa de apartados donde aparece un determinante pero el contenido principal es otro tema:

| Examen (fichero) | Pregunta | Qué usa | Tema | Motivo |
|---|---|---|---|---|
| Feb. 2017 [2] tipo A (`Algebra_Febrero17A2`) | Ej. 3 | det de la matriz de cambio de base | 2.3 / 3.5 | Det de matriz de cambio de coordenadas (regla del encargo). |
| Feb. 2025 (1.ª sem.) (`Algebra_Febrero25A`) | P. 2 | det de la matriz de cambio de coordenadas ($|A|=8$) | 2.3 / 3.5 | Ídem. |
| Feb. 2025 (1.ª sem.) | P. 5 | $|A|=-a^2$ para el rango de $Q$ | 6.2 | Rango de forma cuadrática. |
| Feb. 2023 (2.ª sem.) (`Algebra_Febrero23B`) | P. 6 | $\det=9-a^2/4$ | 6.2 | Rango de forma cuadrática. |
| Sept. 2024 (`Algebra_Septiembre24`) | P. 6 | $|A|=a^2-25$ | 6.2 | Rango de forma cuadrática. |
| Sept. 2019 tipo A (`Algebra_Septiembre19A`) | Ej. 6 | rango de $Q$ | 6.2 | Rango de forma cuadrática. |
| Feb. 2025 (2.ª sem.) (`Algebra_Febrero25B`) | P. 8 | menores principales (Sylvester) | 6.3 | Clasificación de formas cuadráticas. |
| Feb. 2026 (2.ª sem.) (`Algebra-Febrero2026-B`) | P. 6 | $\det=12-a^2/4$ (Sylvester) | 6.3 | Ídem. |
| Feb. 2019 tipo A (`Algebra_Febrero19A`) | Ej. 6 | det de la matriz de la cónica con parámetro $\alpha$ | 6.4 | Cónicas (invariantes). |
| Feb. 2019 tipo A | Problema a) | ecuación de la imagen con $\det(x,y,z;2,3,5;1,0,1)=0$ | 3.2 | Imagen de una aplicación lineal. |
| Feb. 2020 tipo B (`Algebra_Febrero20B`) | Ej. 6 | invariantes de una cónica ($\det A$, $A_{00}$) | 6.4 | Cónicas. |
| Feb. 2018 tipo B (`Algebra_Febrero18B`) | Problema b) | invariantes de una cónica | 6.4 | Cónicas. |
| Sept. 2017 tipo A (`Algebra_Septiembre17A1`) | Ej. 6 | clasificación de una cónica | 6.4 | Cónicas. |
| Feb. 2020 tipo B | Ej. 2 | «buscamos un menor de orden 3 no nulo» para extraer una base | 2.3 | **Dudoso**: el menor no nulo es herramienta; el objetivo es extraer una base. |
| Feb. 2020 tipo A (`Algebra_Febrero20A`) | Ej. 1 | sistema homogéneo con parámetro $m$ (det $=(m-1)^2(m+2)$, no aparece explícito) | 1.4 | Discusión/resolución de sistemas. |
| Feb. 2020 tipo A | Problema b) | inversa de simétrica es simétrica; 2.ª prueba con $A^{-1}=\frac1{|A|}(\operatorname{Adj}A)^t$ y $|A^t|=|A|$ | 1.2 | **Dudoso**: la prueba principal usa solo traspuesta/inversa (1.2); la alternativa usa la adjunta (1.3). Podría citarse en 1.3 como aplicación de la fórmula de la inversa por adjuntos. |
| Ene. 2022 [1] tipo A (`Algebra_Febrero22A1-v2`) | Ej. 1 | $A$ regular y $A^2=A$ ⇒ $A=I$ | 1.2 | Se resuelve multiplicando por $A^{-1}$ (con determinantes solo se obtiene $\det A=1$, que no basta). |
| Ene. 2022 [1] tipo A | Ej. 4 | polinomio característico (Jordan) | 4.2 / 4.4 | Diagonalización. |
| Feb. 2020 tipo A | Ej. 4 | polinomio característico (Jordan) | 4.4 | Ídem. |
| Feb. 2023 (2.ª sem.) | P. 1 | matriz $M$ tal que $MA=B$ (producto de elementales) | 1.2 | Matrices elementales, sin determinantes. |
| Feb. 2025 (1.ª sem.) | P. 1 | ídem | 1.2 | Ídem. |
| Feb. 2017 [2] tipo A, Sept. 2022, Feb. 2026 (1.ª sem.) P.1, Feb. 2019 tipo A Ej.1 | — | rango por Gauss / forma escalonada | 1.2 | Sin determinantes. |
| Todos los ejercicios de diagonalización (Feb19B pb a, Feb24B P8, Feb25A P8, Feb26A P8, Sept23 P8, Sept24 P8, etc.) | — | $|A-\lambda I|$ | 4.2-4.4 | El determinante es el paso de cálculo del polinomio característico; tema 4. |

Exámenes sin ningún apartado de determinantes: Feb. 2018 tipo A, Feb. 2022 [1] tipo A (A2), Feb. 2024 (1.ª sem.), Sept. 2018 tipo A, Sept. 2019 tipo A (salvo el Ej. 6 excluido), Sept. 2022.

### Notas para el redactor
- **Tipos de pregunta del tema 1.3 en examen** (por frecuencia): (a) «sabiendo $\det A$, calcula el determinante de una matriz obtenida por operaciones de filas/columnas» (X4, X5, X6, X7: 4 veces, todas recientes 2023-2025); (b) determinante de una matriz semejante a una diagonal (X1, X2, X3); (c) términos del desarrollo/permutaciones (X8, como el Ej. 1.22 de E); (d) LU y determinante (X9); (e) determinante como test de regularidad/base (X10, F3, F4).
- Las soluciones oficiales son muy escuetas (una línea en X4, X5, X6); aquí se ha desarrollado la identificación fila a fila, que es lo que el corrector exige («lo que no se justifica no se puntúa»).
- Posibles erratas/omisiones de las soluciones oficiales detectadas: X7 justifica $\det A^t=\det A$ «como $A$ es simétrica», cuando vale siempre; F4 no menciona que los tres vectores dados deben ser independientes para que «det = 0 ⇔ combinación lineal»; en X1 la solución oficial es correcta.
