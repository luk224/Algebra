"""Valida y construye todos los temas desde `datos/` y regenera lo derivado. Úsalo antes de cada commit.

    ~/venv/bin/python herramientas/construir_todo.py [--sin-practica]

Pasos: validar cada tema → construir su HTML → comprobar que el HTML coincide con los datos → regenerar `datos/examenes.yaml`
y `prioridades.html` → (salvo --sin-practica) comprobar los generadores de práctica con sympy. Sale con código 1 si algo falla.
"""
import sys, io, contextlib, pathlib, subprocess
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import datos_tema as D

PY = sys.executable
fallos = []
temas = D.todos_los_temas()
for c in temas:
    with contextlib.redirect_stdout(io.StringIO()) as o:
        ok = D.validar(c)
    if not ok: fallos.append(f'{c}: validar'); print(o.getvalue())
    D.construir(c) if ok else None
with contextlib.redirect_stdout(io.StringIO()): ok = D.estado()
print(f'{len(temas)} temas construidos; sincronizados: {"sí" if ok else "NO"}')
if not ok: fallos.append('estado')
r = subprocess.run([PY, str(D.RAIZ / 'herramientas' / 'examenes.py')], capture_output=True, text=True)
print(r.stdout.splitlines()[0] if r.stdout else r.stderr[:200])
if r.returncode: fallos.append('examenes')
r = subprocess.run([PY, str(D.RAIZ / 'herramientas' / 'prioridades.py')], capture_output=True, text=True)
print(r.stdout.splitlines()[0] if r.stdout else r.stderr[:200])
if r.returncode: fallos.append('prioridades')
if '--sin-practica' not in sys.argv:
    r = subprocess.run([PY, str(D.RAIZ / 'herramientas' / 'probar_practica.py'), '200'], capture_output=True, text=True)
    print(r.stdout.strip().splitlines()[-1] if r.stdout else r.stderr[:200])
    if r.returncode: fallos.append('practica')
print('TODO OK' if not fallos else 'FALLOS: ' + ', '.join(fallos))
sys.exit(1 if fallos else 0)
