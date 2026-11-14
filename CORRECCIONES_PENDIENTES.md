# Correcciones pendientes de la revisión de la capa pedagógica (F5.3)

Revisión con agentes `revisor-tema` (prompt: `herramientas/prompt_revision_capa.md`). **Ninguna de estas correcciones está aplicada.**
Recibidas hasta ahora: 1.4, 1.5 (sin errores), 2.4, 3.3, 3.4, 3.5. **Faltan por recibir/aplicar** (agentes lanzados, informes no recogidos al llegar al límite de uso):
1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 4.1-4.4, 5.1-5.4, 6.1-6.5. Si no llegaron, repetir la revisión de esos temas con el mismo prompt.
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
