# Instrucciones para revisar la capa pedagógica de un tema

Tu tema es el que te indique quien te llama (X.Y; carpeta `datos/X_Y/`). Proyecto: apuntes de Álgebra (UNED) en `/home/luk/UNED/ALGEBRA/claude`.
Python con sympy: `~/venv/bin/python`. **No edites ningún fichero**: solo devuelves una lista de correcciones.

## Qué revisar (SOLO la capa pedagógica, no el resto del tema)
En `datos/X_Y/tema.yaml`: `esencial`, `que_cae_nota`, `tipos` (nombre, receta, senal, pasos, ejemplo, fallos) y `quiz`.
En `datos/X_Y/ejercicios.yaml`: de cada ejercicio, `nivel`, `pista`, `problema` y `enunciado`.
Contexto: la teoría está en `datos/X_Y/secciones/*.html`; el modelo de calidad es `datos/2_3/tema.yaml`.

## Qué comprobar
1. **Corrección matemática** de cada afirmación de `esencial`, `tipos` y `quiz`, y de cada `ejemplo` (rehaz los cálculos con sympy). Hipótesis de los teoremas incluidas.
2. **Quiz:** exactamente una opción correcta por pregunta; cada `why` de una opción incorrecta es verdadero y explica el error real; `fb` correcto.
3. **Pistas:** correctas (no inducen a un método equivocado), útiles para quien no sabe por dónde empezar y **sin dar el resultado**. Léelas junto al enunciado y la solución del mismo ejercicio.
4. **`enunciado`:** es la pregunta sin la solución; no contiene «Respuesta:», resultados ni frases que revelen el método elegido de más. Comprueba que no se ha perdido ningún dato del enunciado original (compáralo con el bloque `enun` de otros ejercicios o con la solución si hace falta).
5. **Coherencia** de `tipos` y `problema`: cada ejercicio está en el tipo que le corresponde; el método de las fichas es el del libro (la teoría y las soluciones del tema).
6. **Regla 8 bis** de `CLAUDE.md`: nada sobre erratas, errores de libros o «solución oficial», ni comparativas entre fuentes.
7. **Niveles** razonables (1 directo, 2 típico de examen, 3 encadenado o con razonamiento fino): solo señala los claramente mal puestos.

## Qué devolver (máximo ~30 líneas)
Solo errores **comprobados** (no estilo ni preferencias). Para cada uno:
`fichero · id del ejercicio o campo (p. ej. quiz[3] / tipos.inversa.ejemplo) · texto actual (breve) · problema · texto de reemplazo listo para pegar (en el mismo formato YAML/HTML/LaTeX)`.
Si no hay errores, escribe «Sin errores comprobados» y di qué has verificado con sympy (una línea).
