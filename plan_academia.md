# Plan de acción — formato «academia» (noviembre 2026)

Objetivo: acercar los 26 temas al estilo de unos apuntes de academia (claros, concisos,
eficientes para estudiar y repasar) sin perder contenido. Decisiones tomadas por el
usuario el 14-11-2026 tras revisar los temas 3.5 y 4.3:

- **D1 — Redacción de examen separada, en TODOS los ejercicios de examen.** Cada
  ejercicio `clase: examen` lleva primero un bloque «✍️ Redacción de examen»: la
  solución limpia y completa tal cual se escribiría a mano en el papel (incluido el
  desarrollo del proceso lógico que exige el tribunal, pero sin digresiones). Debajo,
  en un desplegable «Comentarios y comprobaciones», va todo lo didáctico:
  comprobaciones con un vector, controles de traza/determinante, comparación de vías,
  «¿y si la pregunta significara lo contrario?», avisos, etc. No se borra nada: se
  recoloca.
- **D2 — Condensación moderada de la teoría (~30% menos texto visible).** Cajas
  `thm`/`def`/`intu` largas → enunciado/fórmula + 1-2 líneas; deducciones, «lecturas
  de Lay» y párrafos de contexto pasan a `details.ampl`. Eliminar metadiscurso
  («Qué se pide» redundante con el plan, frases de transición). Nada de información
  se pierde: lo secundario queda plegado.
- **D3 — «Qué uso» con referencia corta.** En el bloque «Antes de calcular», la fila
  «Qué uso» pasa a una línea: nombre del resultado + fórmula clave + enlace `#` a la
  caja de teoría del propio tema (p. ej. «Teor. 4.7 (U p.164): diagonalizable ⇔
  d_i=α_i — <a href="#s3">ver teoría</a>»). El enunciado completo solo vive en su
  caja de teoría.
- **D4 — Piloto y luego todo.** Primero 3.5 y 4.3; el usuario aprueba el formato;
  después el resto por módulos.

## F0 — Infraestructura (una sola vez, antes del piloto)

1. **Esquema de datos**: en `ejercicios.yaml`, el `cuerpo` admite un bloque nuevo
   `redaccion:` (lista de pasos u HTML continuo). `herramientas/datos_tema.py` lo
   renderiza como `.box redaccion` («✍️ Redacción de examen») al principio de la
   solución; el resto del cuerpo (plan, pasos comentados, receta, error) queda detrás,
   y los pasos didácticos reubicados van dentro de un `details.ampl` «Comentarios y
   comprobaciones». Estilo de la caja en `assets/resumen.css` (claro/oscuro, impresión
   con `break-inside: avoid`; en PDF debe salir abierta).
2. **Validación**: `datos_tema.py validar` avisa si un ejercicio `clase: examen` no
   tiene `redaccion`. Sigue vigente: el nº de `details.sol` y de `id="ex-…"` nunca baja.
3. **Documentación**: añadir a `CLAUDE.md` §3 las reglas D1-D3 (regla nueva 19) y
   actualizar `herramientas/prompt_capa.md` / `prompt_revision_capa.md` para que
   `redactor-tema` y `revisor-tema` las apliquen y comprueben.

## F1 — Piloto: temas 3.5 y 4.3

Por cada tema (primero 3.5, que es corto —3 ejercicios de examen—, luego 4.3, que es
el más cargado —14—):

1. Editar `datos/X_Y/` aplicando D1 (redacción en cada ejercicio de examen, verificada
   con sympy), D2 (teoría) y D3 (filas «Qué uso»).
2. `datos_tema.py validar X.Y` → `construir X.Y` → `estado x`.
3. `revisor-tema`: recalcula, comprueba cobertura (no baja el nº de ejercicios),
   citas de página y que cada redacción de examen sea completa y autónoma.
4. Playwright: sin errores de consola, bien en 390 px, modo oscuro e impresión
   (`exportar_pdf.py` del tema).
5. Métricas de aceptación: −25/−35% de palabras visibles; todo ejercicio de examen
   con bloque de redacción; «Qué uso» ≤ 2 líneas.
6. Commit por tema + push; enseñar al usuario y **esperar su aprobación** antes de F2.

## F2 — Despliegue a los 24 temas restantes (tras aprobar el piloto)

- Orden por peso en examen (ver `prioridades.html`), módulo a módulo; propuesta:
  módulo 4 (resto) → 6 → 5 → 1 → 2 → 3. El usuario puede pedir otro orden.
- Mismo procedimiento F1.1-F1.5 por tema; un commit y push por tema (regla §4b).
- Los temas con pocos ejercicios de examen (p. ej. 4.1, 3.1) son rápidos: agrupar
  varios por sesión si da tiempo.

## F3 — Cierre

- Regenerar `prioridades.html` y los PDF (`exportar_pdf.py --unir`).
- `examenes.py` (0 errores) y `datos_tema.py estado x` global.
- Actualizar `index.html` si cambia algo visible y commit final.

## Estado

- [ ] F0 infraestructura
- [ ] F1 piloto 3.5
- [ ] F1 piloto 4.3
- [ ] Aprobación del usuario
- [ ] F2 módulos 4 · 6 · 5 · 1 · 2 · 3
- [ ] F3 cierre
