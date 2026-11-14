"""Pruebas automáticas del sitio (F8.1). Úsalo antes de cada commit grande.

    ~/venv/bin/python herramientas/tests_sitio.py

Comprueba, en Chrome (Playwright), para cada tema, `index.html` y `prioridades.html`:
  - sin errores de consola ni excepciones, en móvil (390 px), escritorio (1200 px) y modo oscuro;
  - sin scroll horizontal en móvil;
  - sin marcadores `{{…}}` sin resolver en el HTML;
  - enlaces internos válidos (`#id` y entre temas);
  - los temas con capa tienen pestañas, y todas las pestañas con contenido llevan al menos una sección visible;
  - nº de soluciones y de ejercicios de examen coincide con los datos.
Sale con código 1 si algo falla.
"""
import re, sys, glob, os, pathlib
import yaml
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parent.parent
fallos = []
def fallo(m): fallos.append(m); print('  FALLO', m)

temas = sorted(glob.glob(str(RAIZ / 'temas' / 'tema_*.html')))
ids = {os.path.basename(f): set(re.findall(r'\bid="([^"]+)"', open(f, encoding='utf8').read())) for f in temas}

# ---- estáticas
for f in temas:
    n = os.path.basename(f); s = open(f, encoding='utf8').read()
    if re.search(r'\{\{[a-z_]+(:[^}]*)?\}\}', s): fallo(f'{n}: marcadores {{…}} sin resolver')
    for h in re.findall(r'href="([^"]*)"', s):
        if h.startswith(('http', 'mailto', '../assets', '../index')): continue
        if h.startswith('#'):
            if len(h) > 1 and h[1:] not in ids[n]: fallo(f'{n}: enlace roto {h}')
        elif '.html' in h:
            fn, _, fr = h.partition('#')
            if fn not in ids: fallo(f'{n}: enlace a tema inexistente {h}')
            elif fr and fr not in ids[fn]: fallo(f'{n}: enlace roto {h}')
reg = yaml.safe_load((RAIZ / 'datos' / 'examenes.yaml').read_text(encoding='utf8'))
for d in sorted((RAIZ / 'datos').glob('[1-9]_[1-9]')):
    cod = d.name.replace('_', '.')
    ejs = yaml.safe_load((d / 'ejercicios.yaml').read_text(encoding='utf8'))
    html = next(iter(glob.glob(str(RAIZ / 'temas' / f'tema_{d.name}_*.html')))); s = open(html, encoding='utf8').read()
    if len(re.findall(r'<details class="sol"', s)) != len(ejs): fallo(f'{cod}: nº de soluciones en el HTML ≠ datos')
    nex = sum(1 for r in reg if r['tema'] == cod and r['desarrollo'] == 'completo')
    nd = sum(1 for e in ejs if e['clase'] == 'examen' and any('pasos' in b for b in e['cuerpo']))
    if nex != nd: fallo(f'{cod}: registro de exámenes ≠ datos')

# ---- navegador
paginas = temas + [str(RAIZ / 'index.html'), str(RAIZ / 'prioridades.html')]
with sync_playwright() as p:
    b = p.chromium.launch()
    for f in paginas:
        n = os.path.basename(f)
        for nombre, vp, oscuro in (('móvil', {'width': 390, 'height': 800}, False), ('escritorio', {'width': 1200, 'height': 900}, False), ('oscuro', {'width': 1200, 'height': 900}, True)):
            pg = b.new_page(viewport=vp); errs = []
            pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
            pg.goto('file://' + f)
            if oscuro: pg.evaluate("document.documentElement.setAttribute('data-theme','dark')")
            pg.wait_for_timeout(500)
            if errs: fallo(f'{n} ({nombre}): errores de consola: {errs[:2]}')
            if nombre == 'móvil' and pg.evaluate('document.documentElement.scrollWidth') > 392: fallo(f'{n}: scroll horizontal en móvil')
            if nombre == 'escritorio' and n.startswith('tema_') and pg.locator('.vistas').count():
                for v in pg.eval_on_selector_all('.vistas button', 'e=>e.map(x=>x.dataset.v)'):
                    if v == 'todo': continue
                    pg.click(f'.vistas button[data-v="{v}"]')
                    vis = pg.evaluate("[...document.querySelectorAll('main h2[data-vista]')].filter(h=>h.offsetParent).length")
                    if vis < 1: fallo(f'{n}: la pestaña «{v}» no muestra ninguna sección')
            pg.close()
    b.close()
print(f'{len(paginas)} páginas × 3 vistas; fallos: {len(fallos)}')
sys.exit(1 if fallos else 0)
