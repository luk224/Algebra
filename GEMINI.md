# GEMINI.md — Álgebra UNED

Este proyecto se trabaja con Claude Code y con Gemini CLI. **Las instrucciones son las mismas** y están en `CLAUDE.md`; se importan aquí:

@./CLAUDE.md

## Adaptaciones para Gemini CLI
- Donde `CLAUDE.md` habla de subagentes (`fuentes-algebra`, `resolutor-ejercicios`, `redactor-tema`, `revisor-tema`), existen sus equivalentes en `.gemini/agents/` (generados con `python herramientas/sync_gemini.py` desde `.claude/agents/`; la fuente de verdad es la carpeta de Claude). Invócalos con `@nombre-del-agente tarea…` y sigue el pipeline de `CLAUDE.md` §4. Un subagente de Gemini no puede llamar a otro: el agente principal coordina y pasa los ficheros (dossiers en `fuentes_txt/`).
- El skill del proyecto está en `.claude/skills/resumen-algebra/SKILL.md`: léelo con `read_file` cuando haga falta.
- Las referencias a `SendMessage`/«reanudar el agente» no existen aquí: para corregir un tema, vuelve a invocar al redactor con la lista de correcciones y dile que parta del fichero HTML existente.
- **Trampas conocidas de las herramientas de escritura:** la doble barra invertida `\` puede colapsarse a `\` al escribir ficheros. En `aligned`/`cases` usa `\cr ` (con un espacio detrás) en vez de `\`, o genera el fichero con Python usando `chr(92)`. Valida siempre con KaTeX (`renderToString` con `throwOnError`) y mira el resultado con Playwright (consola limpia, sin scroll horizontal a 390 y 1280 px) antes de dar un tema por bueno.
- Al terminar un cambio: `git add -A`, commit en español con la línea `Co-Authored-By: Gemini <noreply@google.com>` (en lugar de la de Claude), `git push origin main`. Nunca `--force`.
- No subir a git los dossiers de trabajo (`fuentes_txt/dossier_*`, `soluciones_*`, `examenes_dossier_*`): están en `.gitignore`.

8 bis. **Sin erratas ni comparativas entre fuentes en el temario.** En los HTML no se escribe nada sobre erratas de libros, solucionarios o exámenes («errata de E», «la oficial se equivoca/omite», «E dice… pero…»), ni sobre incoherencias o diferencias de notación, definición o enfoque entre fuentes (U frente a Lay/Stewart/Larson/Academia_Tec…): nada de cajas «Erratas…», «Aviso sobre el libro», «Cómo lo cuenta Lay», «Tabla Lay ↔ U», ni apartados «Erratas y avisos», ni frases sueltas del tipo «X escribe… debe ser…». Si una fuente falla o difiere de U, se escribe directamente lo correcto (manda U) y no se menciona. Una explicación alternativa de otro libro se integra como explicación normal, sin contrastarla con U. El generador de PDF filtra además los restos que pudieran quedar.
