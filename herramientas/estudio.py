"""Genera chuletas.html, glosario.html y mapa.html desde `datos/` (F7.3).

    ~/venv/bin/python herramientas/estudio.py

- chuletas.html: la chuleta de los 26 temas agrupada por módulo (imprimible, un módulo por página).
- glosario.html: definiciones de todos los temas con buscador (término, tema y enunciado corto, enlazado al tema).
- mapa.html: mapa de dependencias entre temas (qué conviene dominar antes), coloreado por prioridad en el examen.
"""
import ast, collections, html as H, pathlib, re, json
import yaml

RAIZ = pathlib.Path(__file__).resolve().parent.parent
_dep = yaml.safe_load((RAIZ / 'datos' / 'dependencias.yaml').read_text(encoding='utf8'))
C = {'ORDEN': _dep['orden'], 'DEP': _dep['dep']}
MODS = {1: 'Herramientas', 2: 'Espacios vectoriales', 3: 'Aplicaciones lineales y matrices', 4: 'Diagonalización', 5: 'Ortogonalidad', 6: 'Formas bilineales y cuadráticas'}
reg = yaml.safe_load((RAIZ / 'datos' / 'examenes.yaml').read_text(encoding='utf8'))
n_ex = collections.Counter(r['tema'] for r in reg if r['desarrollo'] == 'completo')

temas = []
for d in sorted((RAIZ / 'datos').glob('[1-9]_[1-9]')):
    cfg = yaml.safe_load((d / 'tema.yaml').read_text(encoding='utf8'))
    h = next(re.search(r'⏱ ~([\d–]+) h', c) for c in cfg['chips'] if '⏱' in c); nums = [int(x) for x in h[1].split('–')]; hh = sum(nums) / len(nums)
    ex = n_ex.get(cfg['codigo'], 0)
    temas.append(dict(cod=cfg['codigo'], nombre=re.sub(r'^\d\.\d\s+', '', cfg['titulo']), url=cfg['archivo'], dir=d, nivel=1 if (ex >= 10 or ex / hh >= 2) else (2 if (ex >= 6 or ex / hh >= 1.3) else 3)))
temas.sort(key=lambda t: C['ORDEN'].index(t['cod']))

CABECERA = '''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<script>try{{var t=localStorage.getItem('tema');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}}catch(e){{}}</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Álgebra · {titulo}</title>
<link rel="stylesheet" href="assets/katex/katex.min.css">
<link rel="stylesheet" href="assets/resumen.css">
<script defer src="assets/katex/katex.min.js"></script>
<script defer src="assets/katex/auto-render.min.js"></script>
<script defer src="assets/resumen.js"></script>
<style>
.es main{{max-width:1000px;margin:0 auto;padding:24px 16px 60px}}
.es table{{width:100%;border-collapse:collapse;font:14.5px/1.45 var(--sans);margin:.6em 0}}
.es th,.es td{{padding:6px 8px;border:1px solid var(--bd);text-align:left;vertical-align:top}}
.es th{{background:var(--card);font-size:12.5px;text-transform:uppercase;letter-spacing:.04em;color:var(--mut)}}
.es .tema{{margin:1.6em 0 .4em;font:700 1.15rem var(--sans)}}.es .tema a{{color:var(--acc);text-decoration:none}}
.es .modulo{{margin-top:2.2em;border-bottom:3px solid var(--acc)}}
{extra}
@media print{{.es .modulo{{break-before:page}}.es .modulo:first-of-type{{break-before:auto}}.es table{{font-size:9pt}}.topbar,.es .no-print{{display:none!important}}}}
</style>
</head>
<body class="es">
<div class="topbar"><div class="in"><a href="index.html">← Índice de temas</a><span><button id="btn-tema" type="button">Claro / oscuro</button></span></div></div>
<main>
'''
PIE = '</main>\n</body>\n</html>\n'

# ---------------- chuletas
o = [CABECERA.format(titulo='Chuletas por módulo', extra='')]
o.append('<h1>Chuletas por módulo</h1>\n<p class="no-print">La chuleta de cada tema (fórmulas con sus hipótesis). Se imprime un módulo por página: usa «Imprimir / PDF» del navegador.</p>')
mod_prev = None
for t in temas:
    m = int(t['cod'][0])
    if m != mod_prev: o.append(f'<h2 class="modulo">Módulo {m} · {MODS[m]}</h2>'); mod_prev = m
    f = next((t['dir'] / 'secciones').glob('*chuleta*.html'))
    s = f.read_text(encoding='utf8')
    tb = re.search(r'<table>.*?</table>', s, re.S)
    o.append(f'<div class="tema"><a href="{t["url"]}">{t["cod"]} · {H.escape(t["nombre"])}</a></div>')
    o.append(tb.group(0) if tb else '<p><i>Sin tabla de chuleta.</i></p>')
o.append(PIE)
o[-1] = '<script>document.addEventListener("DOMContentLoaded",function(){});</script>\n' + o[-1] if False else o[-1]
(RAIZ / 'chuletas.html').write_text('\n'.join(o), encoding='utf8')

# ---------------- glosario
GENERICOS = re.compile(r'^(definici[oó]n(es)?|def\.?|propiedades?)\s*[\d.]*$', re.I)
def plano(h): return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', h)).strip()
entradas = []
for t in temas:
    for f in sorted((t['dir'] / 'secciones').glob('*.html')):
        s = f.read_text(encoding='utf8')
        for m in re.finditer(r'<div class="box def"><span class="h">(.*?)</span>(.*?)</div>', s, re.S):
            cab, cuerpo = plano(m.group(1)), m.group(2)
            cuerpo = re.sub(r'<span class="src".*?</span>', '', cuerpo, flags=re.S)
            termino = cab.split('—')[-1].strip() if '—' in cab else cab
            if GENERICOS.match(termino):
                b = re.search(r'<b>(.*?)</b>', cuerpo, re.S); termino = plano(b.group(1)) if b else ''
            p = re.search(r'<p>(.*?)</p>', cuerpo, re.S)
            texto = plano(p.group(1)) if p else plano(cuerpo)
            if not termino or len(texto) < 15: continue
            entradas.append(dict(t=termino[:90], c=t['cod'], u=t['url'], x=texto[:420] + ('…' if len(texto) > 420 else '')))
entradas.sort(key=lambda e: e['t'].lower())
g = [CABECERA.format(titulo='Glosario', extra='.es input#q{font:16px var(--sans);width:100%;padding:8px 12px;border:1px solid var(--bd);border-radius:8px;background:var(--bg);color:var(--fg)}.es .ent{border-bottom:1px solid var(--bd);padding:8px 0;font:15px/1.5 var(--sans)}.es .ent b{font-size:1.02rem}.es .ent a{color:var(--acc);font-size:13px;margin-left:6px}')]
g.append('<h1>Glosario</h1>\n<p>Definiciones de los 26 temas, con su enunciado corto. Escribe para filtrar y pulsa el tema para ir a la teoría completa.</p>\n<input id="q" type="search" placeholder="Buscar: base, núcleo, forma cuadrática…" aria-label="Buscar">\n<p id="n" class="no-print" style="color:var(--mut);font:13.5px var(--sans)"></p>\n<div id="lista">')
for e in entradas:
    g.append(f'<div class="ent" data-k="{H.escape((e["t"] + " " + e["x"]).lower())}"><b>{H.escape(e["t"])}</b> <a href="{e["u"]}">tema {e["c"]}</a><br>{H.escape(e["x"])}</div>')
g.append('''</div>
<script>
(function(){var q=document.getElementById('q'),L=[].slice.call(document.querySelectorAll('.ent')),n=document.getElementById('n');
function f(){var s=q.value.toLowerCase().trim(),k=0;L.forEach(function(e){var ok=!s||e.dataset.k.indexOf(s)>=0;e.hidden=!ok;if(ok)k++});n.textContent=k+' de '+L.length+' definiciones'}
q.addEventListener('input',f);f();
window.addEventListener('load',function(){try{renderMathInElement(document.getElementById('lista'),{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false})}catch(e){}});})();
</script>''')
g.append(PIE)
(RAIZ / 'glosario.html').write_text('\n'.join(g), encoding='utf8')

# ---------------- mapa de dependencias (SVG)
col = {m: [t for t in temas if int(t['cod'][0]) == m] for m in MODS}
W, HH, X0, DX, Y0, DY, NW, NH = 1180, 0, 20, 190, 70, 62, 150, 44
pos = {}
for m, ts in col.items():
    for i, t in enumerate(ts): pos[t['cod']] = (X0 + (m - 1) * DX, Y0 + i * DY)
HH = Y0 + max(len(v) for v in col.values()) * DY + 20
color = {1: '#c0392b', 2: '#b5701a', 3: '#7b8494'}
s = [f'<svg viewBox="0 0 {W} {HH}" role="img" aria-label="Mapa de dependencias entre temas" style="width:100%;height:auto;font-family:var(--sans)">',
     '<defs><marker id="f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#8a93a6"/></marker></defs>']
for m in MODS:
    s.append(f'<text x="{X0 + (m - 1) * DX}" y="30" font-weight="700" font-size="14" fill="currentColor">Módulo {m}</text><text x="{X0 + (m - 1) * DX}" y="48" font-size="11" fill="#7b8494">{H.escape(MODS[m])[:26]}</text>')
for t in temas:
    for d in C['DEP'].get(t['cod'], []):
        (x1, y1), (x2, y2) = pos[d], pos[t['cod']]
        if x1 == x2: a, b = (x1 + NW / 2, y1 + NH), (x2 + NW / 2, y2)
        else: a, b = (x1 + NW, y1 + NH / 2), (x2, y2 + NH / 2)
        mid = (a[0] + b[0]) / 2
        s.append(f'<path d="M{a[0]} {a[1]} C{mid} {a[1]} {mid} {b[1]} {b[0]} {b[1]}" fill="none" stroke="#8a93a6" stroke-width="1.2" marker-end="url(#f)" opacity=".7"/>' if x1 != x2 else f'<path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" stroke="#8a93a6" stroke-width="1.2" marker-end="url(#f)" opacity=".7"/>')
for t in temas:
    x, y = pos[t['cod']]
    s.append(f'<a href="{t["url"]}"><rect x="{x}" y="{y}" width="{NW}" height="{NH}" rx="8" fill="var(--card)" stroke="{color[t["nivel"]]}" stroke-width="2"/><text x="{x + 8}" y="{y + 18}" font-size="13" font-weight="700" fill="currentColor">{t["cod"]}</text><text x="{x + 8}" y="{y + 34}" font-size="10.5" fill="currentColor">{H.escape(t["nombre"])[:27]}</text></a>')
s.append('</svg>')
m = [CABECERA.format(titulo='Mapa de temas', extra='')]
m.append('<h1>Mapa de dependencias</h1>\n<p>Cada flecha va del tema que conviene dominar antes al que lo usa (orientativo). El color del borde es la prioridad en el examen: <b style="color:#c0392b">imprescindible</b>, <b style="color:#b5701a">importante</b>, <b style="color:#7b8494">después</b> (ver <a href="prioridades.html">prioridades</a>). Pulsa un tema para abrirlo; si te atascas en uno, sigue las flechas hacia atrás.</p>')
m.append(''.join(s)); m.append(PIE)
(RAIZ / 'mapa.html').write_text('\n'.join(m), encoding='utf8')
print(f'chuletas.html ({len(temas)} temas), glosario.html ({len(entradas)} definiciones), mapa.html')
