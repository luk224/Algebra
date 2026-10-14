"""Delega la redacción de un tema al modelo de Gemini mediante el CLI `agy` (Antigravity).
Uso:  python herramientas/agy_redactor.py <fichero_encargo.md> [--model ID] [--timeout SEG]
El encargo (fichero .md) lo escribe el agente redactor: qué tema, qué dossiers leer, ruta de salida y las
correcciones a aplicar. agy trabaja en la raíz del proyecto, lee CLAUDE.md y escribe el HTML.
Modelo por defecto: ver MODELO (agy models lista los disponibles).
"""
import argparse, os, pathlib, subprocess, sys
R = pathlib.Path(__file__).resolve().parent.parent
MODELO = 'gemini-3.8-flash-high'   # 'gemini-3.1-pro-preview' no figura en `agy models` (v1.3.5); cambiar aquí si aparece
AGY = os.path.join(os.environ.get('LOCALAPPDATA', ''), 'agy', 'bin', 'agy.exe')
if not os.path.exists(AGY): AGY = 'agy'
PRE = ("Eres el redactor de resúmenes HTML de Álgebra (UNED) de este proyecto. Trabaja en el directorio actual. "
       "Lee primero CLAUDE.md y GEMINI.md, y sigue exactamente el siguiente encargo. Reglas críticas de herramientas: "
       "la doble barra invertida se colapsa al escribir ficheros, así que en aligned/cases usa la macro KaTeX backslash+cr seguida de un espacio "
       "o genera con Python usando chr(92). Al terminar, valida KaTeX y consola con Playwright y resume lo hecho.\n\n=== ENCARGO ===\n")
ap = argparse.ArgumentParser(); ap.add_argument('encargo'); ap.add_argument('--model', default=MODELO)
ap.add_argument('--timeout', type=int, default=3000)
a = ap.parse_args()
prompt = PRE + pathlib.Path(a.encargo).read_text(encoding='utf8')
cmd = [AGY, '--model', a.model, '--mode', 'accept-edits', '--print-timeout', '%ds' % a.timeout, '-p', prompt]
print('agy:', a.model, flush=True)
r = subprocess.run(cmd, cwd=str(R), capture_output=True, text=True, encoding='utf8', errors='replace')
sys.stdout.write(r.stdout); sys.stderr.write(r.stderr); sys.exit(r.returncode)
