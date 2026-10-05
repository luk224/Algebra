# DOSSIER TEMA 2.1 — Espacios vectoriales. Subespacios

**Fuente:** UNED Álgebra para Grado en Ingeniería (2026-27)
**Tema:** 2.1 Espacios vectoriales. Subespacios
**Fecha:** octubre 2026

---

## 1. SECCIÓN U (Libro oficial: Díaz, Hernández, Tejero)

### Ubicación en U
- **Sección U §2.1:** páginas impresas 55–68
- **Subsecciones:** 2.1.1 (Elementos didácticos), 2.1.2 (Espacios vectoriales), 2.1.3 (Subespacios vectoriales)
- **Límite:** La sección 2.2 comienza en página impresa 69

### §2.1.2. Espacios vectoriales (U p.55)

**Definición 2.1** — Espacio vectorial
Un conjunto V formado por elementos a, b, c, ... es **espacio vectorial** si:
1. Está definida la operación interna "*" entre sus elementos
2. Está definida la operación externa "•" entre escalares λ, µ, ... y elementos de V

Las operaciones verifican propiedades S1-S4 (cerradas en grupo conmutativo) y E1-E4 (distributividad, asociatividad, elemento unidad).

### §2.1.3. Subespacios vectoriales (U p.62)

**Definición 2.2** — Subespacio vectorial
U es **subespacio vectorial** del espacio vectorial (V, ∗, ℝ) si:
- U es subconjunto de V
- (U, ∗, ℝ) es espacio vectorial

**Caracterización:** U es subespacio ≡ U no vacío Y (∀u,v ∈ U ⇒ u∗v ∈ U) Y (∀u ∈ U, ∀λ ∈ ℝ ⇒ λ•u ∈ U)

---

## 2. SECCIÓN L (Lay: Álgebra Lineal y sus Aplicaciones, Cap. 4)

### Ubicación en L
- **Sección L §4.1** (págs. impresas 191–197): ESPACIOS Y SUBESPACIOS VECTORIALES
- **Sección L §4.2** (págs. impresas 199+): ESPACIOS NULOS, ESPACIOS COLUMNA

### L §4.1. Definición de espacio vectorial

Un espacio vectorial es conjunto no vacío V de **vectores** con dos operaciones (suma + y multiplicación por escalares ·) sujetas a 10 axiomas:

1. u + v ∈ V (cerradura)
2. u + v = v + u (conmutatividad)
3. (u + v) + w = u + (v + w) (asociatividad)
4. ∃0 ∈ V: u + 0 = u (elemento cero)
5. ∀u ∃−u ∈ V: u + (−u) = 0 (inverso aditivo)
6. cu ∈ V (cerradura escalar)
7. c(u + v) = cu + cv (distributividad)
8. (c + d)u = cu + du (distributividad)
9. c(du) = (cd)u (asociatividad escalar)
10. 1u = u (elemento escalar unidad)

**Ejemplos en Lay:** ℝⁿ, vectores como flechas en ℝ³, Pₙ(t) (polinomios de grado ≤n), funciones f: D → ℝ.

### Definición de subespacio (Lay p.194)

H es subespacio de V si:
a) Vector cero 0 ∈ H
b) H cerrado bajo suma: ∀u,v ∈ H ⇒ u+v ∈ H
c) H cerrado bajo multiplicación por escalares: ∀u ∈ H, ∀c ∈ ℝ ⇒ cu ∈ H

**Nota clave:** Si 0 ∉ H ⇒ H no es subespacio (criterio rápido).

---

## 3. EJERCICIOS (E: Díaz, Hernández, Tejero)

### Mapa de ejercicios para sección 2.1

**Rango de ejercicios:** Ejercicios 2.1–2.14
**Páginas en E:** impresas 45–55

| Ejercicio | Página E | Contenido |
|-----------|----------|-----------|
| 2.1 | 46 | Elemento neutro en operación no estándar |
| 2.2 | 47 | Propiedades de multiplicación por escalares |
| 2.3 | 48 | Operación no estándar: grupo conmutativo |
| 2.4 | 49 | Operación asociativa y elemento neutro en ℤ |
| 2.5 | 50 | Subgrupo de ℝ² |
| 2.6 | 50 | Cuál subconjunto es subespacio de ℝ⁴ |
| 2.7 | 51 | Recta x₁=x₂ en ℝ² como subespacio |
| 2.8 | 52 | Subespacios impropios: {0} y V |
| 2.9 | 52 | Rectas y planos en ℝ³ |
| 2.10 | 53 | Polinomios grado exactamente 4 (NO subespacio) |
| 2.11 | 53 | Polinomios grado ≤4 (SÍ subespacio) |
| 2.12 | 54 | Intersección U∩V de subespacios |
| 2.13 | 55 | Unión U∪V (contraejemplo) |
| 2.14 | 55 | Progresiones aritméticas en ℝⁿ |

### Enunciados y soluciones clave

**Ej. 2.1 (p.46):** V={x∈ℝ²:a>0}, (a,b)∗(c,d)=(ac,b+d). Elemento neutro: **B) (1,0), pertenece a V**

**Ej. 2.2 (p.47):** λ•(x₁,x₂)=(λx₁,0). Verifica: **A,B,C verdaderas; D falsa**

**Ej. 2.3 (p.48):** V={x∈ℝ⁺×ℝ}, (x₁,x₂)∗(y₁,y₂)=(x₁y₁,x₂+y₂). **A,B,C,D verdaderas**

**Ej. 2.4 (p.49):** x∗y=xy+1 en ℤ. **C y D verdaderas; A y B falsas**

**Ej. 2.5 (p.50):** U={(x₁,x₂):x₁x₂=0}. **NO subgrupo:** (1,0)+(0,2)=(1,2), pero 1·2≠0

**Ej. 2.6 (p.50):** Subsets ℝ⁴. **Sólo B={x:x₁=x₂} es subespacio** (A,C no tienen 0)

**Ej. 2.7 (p.51):** U={(x₁,x₂):x₁=x₂}. **C verdadera:** (U,+,ℝ) es subespacio de (ℝ²,+,ℝ)

**Ej. 2.8 (p.52):** Subespacios cualquier V. **B) {e} (elemento neutro)** verdadero

**Ej. 2.9 (p.52):** Subespacios ℝ³. **C){(0,0,0)} y D)(ℝ³,+,ℝ)** (si pasan por origen: A,B)

**Ej. 2.10 (p.53):** Polinomios grado exactamente 4. **Todas falsas** (suma reduce grado, λ·0=0)

**Ej. 2.11 (p.53):** Polinomios grado ≤4. **Todas verdaderas: A,B,C,D**

**Ej. 2.12 (p.54):** U∩V subespacio. **Demostración:** 0∈U∩V; suma y producto escalar cerrados

**Ej. 2.13 (p.55):** U∪V subespacio. **A falsa (contraejemplo)**, **B verdadera**, **C falsa**

**Ej. 2.14 (p.55):** Progresiones aritméticas P={(a,a+d,...,a+(n-1)d)}. **A,B,D verdaderas; C falsa**

---

## 4. EXÁMENES (X)

### Preguntas relacionadas con Tema 2.1

**Febrero 2024 (Sem. 1), Pregunta 2:** Matrices linealmente dependientes (anticipo de 2.2)

**Febrero 2024, Pregunta 7:** Subespacios L₁, L₂ de ℝ⁴. Calcular dim(L₁), dim(L₂), dim(L₁∩L₂), dim(L₁+L₂).
- Respuestas: dim(L₁)=2, dim(L₂)=3, dim(L₁∩L₂)=1, dim(L₁+L₂)=4
- Método: ecuaciones cartesianas, fórmula Grassmann

---

## 5. Correspondencia L ↔ U

| Tema U | Capítulo Lay | Contenido |
|--------|-----|-----------|
| 2.1.2 Espacios vect. | L §4.1 | Definición, axiomas, ejemplos |
| 2.1.3 Subespacios | L §4.1 (cont.) | Definición, caracterización, subespacios generados |
| Subespacios por ecuaciones | L §4.2 | Espacio nulo (Nul A), espacio columna (Col A) |

---

## 6. Faltas o dudas

- ✓ U §2.1: secciones 2.1.2–2.1.3 completas (p.55–68 impresas)
- ✓ L §4.1–4.2: completas (p.191–202 impresas)
- ✓ E Ejercicios 2.1–2.14: enunciados y soluciones verificados
- ✓ X Exámenes: preguntas sobre subespacios en varios años identificadas
- **Acentos en examenes.txt:** extraídos con pdftotext, algunos rotos

---

## 7. Resumen para aprender

**Estructura mental clave:**

1. Un espacio vectorial es un conjunto con dos operaciones que verifican 10 propiedades
2. Un subespacio es un subconjunto que tiene estructura de espacio vectorial
3. Para probar que H es subespacio: verificar 0∈H, luego ∀u,v∈H (u+v∈H) Y ∀λ∈ℝ,u∈H (λu∈H)
4. Contraejemplo es suficiente para mostrar que NO es subespacio

**Errores frecuentes:**
- Olvidar que 0 ∈ H es necesario (conjunto no vacío no basta)
- Confundir U∪V con U+V
- Creer que "grado exactamente n" es subespacio (no: la suma baja grado)

**Ejemplos clave que siempre funcionan:**
- ℝⁿ, Pₙ (polinomios grado ≤n), rectas/planos por origen
- Nunca funcionan: conjuntos sin 0, grado fijo, planos sin origen
