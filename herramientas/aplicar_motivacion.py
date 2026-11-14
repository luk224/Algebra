"""Aplica a un tema las preguntas motivadoras y las consignas de animación desde `datos/X_Y/motivacion_propuesta.yaml`.

    ~/venv/bin/python herramientas/aplicar_motivacion.py 3.2 [--solo-validar]

Esquema de la propuesta (texto en bloques literales `|-`):
  motivacion:                        # una pregunta por sección de teoría (clave = id del <h2>: s1, s2, …; no prereq ni ejercicios)
    s1: |-
      ¿…?  (1-2 frases con una situación concreta o una pregunta que la sección va a responder; sin dar la respuesta)
  consignas:                         # una por cada animación del tema
    - animacion: Interactivo: …      # texto del encabezado de la caja (basta un trozo que aparezca una sola vez)
      consigna: |-
        Mueve … y fíjate en …
      pregunta: |-                   # opcional
        ¿…?
Valida que las secciones y las animaciones existen y escribe en tema.yaml (`motivacion`, `consignas`); luego `construir`.
"""
import re, sys, pathlib
import yaml
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import datos_tema as D, capa


def aplicar(codigo, escribir=True):
    d = D.carpeta(codigo)
    f = d / 'motivacion_propuesta.yaml'
    if not f.exists(): sys.exit(f'{codigo}: falta {f.relative_to(D.RAIZ)}')
    txt = f.read_text(encoding='utf8')
    # `animacion: Interactivo: …` sin comillas rompe el YAML (dos puntos): se convierte en bloque literal
    txt = re.sub(r'^(\s*)- animacion: (?![|>"\'])(.+)$', lambda m: f'{m.group(1)}- animacion: |-\n{m.group(1)}    {m.group(2).rstrip()}', txt, flags=re.M)
    prop = yaml.safe_load(txt)
    cfg = yaml.safe_load((d / 'tema.yaml').read_text(encoding='utf8'))
    cuerpo = ''.join(x.read_text(encoding='utf8') for x in sorted((d / 'secciones').glob('*.html')))
    err = []
    secs = re.findall(r'<h2 id="([^"]+)"', cuerpo)
    teoria = [s for s in secs if s not in ('ejercicios', 'examenes', 'fuentes', 'tipos')]
    mot = prop.get('motivacion') or {}
    for k, v in mot.items():
        if k not in secs: err.append(f'motivacion: sección inexistente «{k}»')
        if not isinstance(v, str) or not 20 <= len(v.strip()) <= 420: err.append(f'motivacion[{k}]: entre 20 y 420 caracteres')
    falta = [s for s in teoria if s not in mot and s not in ('prereq', 'chuleta')]
    if falta: err.append('faltan preguntas para las secciones: ' + ', '.join(falta))
    anim = re.findall(r'<span class="h">([^<]*(?:animaci|interactivo|laboratorio)[^<]*)</span>', cuerpo, re.I)
    anim = [x for x in anim if not re.match(r'\s*Qué mirar', x)]   # las cajas «Qué mirar en la animación» son guías, no animaciones
    cons = [c for c in (prop.get('consignas') or []) if not str(c.get('animacion', '')).lstrip().startswith('Qué mirar')]
    prop['consignas'] = cons
    for c in cons:
        n = sum(1 for a in anim if c.get('animacion', '\0') in a)
        if n != 1: err.append(f'consigna «{str(c.get("animacion"))[:40]}»: coincide con {n} encabezados de animación (debe ser 1)')
        if not c.get('consigna'): err.append('consigna vacía')
    sin = [a for a in anim if not any(c.get('animacion', '\0') in a for c in cons)]
    if sin: err.append('animaciones sin consigna: ' + '; '.join(a[:50] for a in sin))
    if err:
        print(f'{codigo}: NO VÁLIDA'); [print('  -', e) for e in err]; return False
    if not escribir: print(f'{codigo}: PROPUESTA VÁLIDA ({len(mot)} preguntas, {len(cons)} consignas); no se ha escrito nada'); return True
    cfg['motivacion'] = mot; cfg['consignas'] = cons
    (d / 'tema.yaml').write_text(D.volcar(cfg), encoding='utf8')
    D.construir(codigo); print(f'{codigo}: aplicada ({len(mot)} preguntas, {len(cons)} consignas)'); return True


if __name__ == '__main__':
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    if len(a) != 1: sys.exit(__doc__)
    sys.exit(0 if aplicar(a[0], '--solo-validar' not in sys.argv) else 1)
