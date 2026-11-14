"""Genera prioridades.html a partir de los datos de los temas.
Uso: ~/venv/bin/python herramientas/examenes.py && ~/venv/bin/python herramientas/prioridades.py
Datos: nº de ejercicios de examen por tema (datos/examenes.yaml; cada ejercicio de examen se desarrolla en un solo tema,
regla 14 de CLAUDE.md) y horas estimadas de la cabecera de cada tema («⏱ ~N h», en tema.yaml)."""
import re, glob, pathlib, html

RAIZ = pathlib.Path(__file__).resolve().parent.parent
import yaml, collections
_dep = yaml.safe_load((RAIZ / 'datos' / 'dependencias.yaml').read_text(encoding='utf8'))
ORDEN, DEP = _dep['orden'], _dep['dep']   # dependencias orientativas: datos/dependencias.yaml
# Datos: `datos/examenes.yaml` (registro global, lo genera herramientas/examenes.py) y `datos/X_Y/tema.yaml` (título y horas de la cabecera).
reg = yaml.safe_load((RAIZ / 'datos' / 'examenes.yaml').read_text(encoding='utf8'))
n_ex = collections.Counter(r['tema'] for r in reg if r['desarrollo'] == 'completo')   # solo las desarrolladas paso a paso
filas = []
for d in sorted((RAIZ / 'datos').glob('[1-9]_[1-9]')):
    cfg = yaml.safe_load((d / 'tema.yaml').read_text(encoding='utf8'))
    cod = cfg['codigo']
    h = next(re.search(r'⏱ ~([\d–]+) h', c) for c in cfg['chips'] if '⏱' in c)
    nums = [int(x) for x in h[1].split('–')]
    nombre = re.sub(r'^\d\.\d\s+', '', cfg['titulo'])
    filas.append(dict(cod=cod, nombre=nombre, ex=n_ex.get(cod, 0), h=sum(nums) / len(nums), url=cfg['archivo']))
filas.sort(key=lambda r: ORDEN.index(r['cod']))
TOT = sum(r['ex'] for r in filas)
for r in filas:
    r['ratio'] = r['ex'] / r['h']
    r['pct'] = 100 * r['ex'] / TOT
    r['nivel'] = 1 if (r['ex'] >= 10 or r['ratio'] >= 2) else (2 if (r['ex'] >= 6 or r['ratio'] >= 1.3) else 3)
    r['dep'] = DEP.get(r['cod'], [])
por = {r['cod']: r for r in filas}

def cierre(cods):
    out, pend = set(), list(cods)
    while pend:
        c = pend.pop()
        if c in out: continue
        out.add(c); pend += DEP.get(c, [])
    return out
rutas = []
for titulo, niv, desc in [('Imprescindible', 1, 'Los temas con más ejercicios de examen o mejor relación examen/hora, más lo que necesitan antes.'),
                          ('Recomendada', 2, 'Lo anterior más los temas de frecuencia media.'),
                          ('Completa', 3, 'Todo el temario.')]:
    base = [r['cod'] for r in filas if r['nivel'] <= niv]
    c = cierre(base)
    rutas.append(dict(t=titulo, desc=desc, n=len(c), h=sum(por[x]['h'] for x in c), ex=sum(por[x]['ex'] for x in c), cods=sorted(c, key=ORDEN.index)))
def fh(x): return f'{x:g}'.replace('.', ',')

pec1 = sum(r['ex'] for r in filas if r['cod'][0] in '123'); pec2 = TOT - pec1
h1 = sum(r['h'] for r in filas if r['cod'][0] in '123'); h2 = sum(r['h'] for r in filas if r['cod'][0] in '456')
mx = max(r['ex'] for r in filas)

tr = []
for r in filas:
    deps = ', '.join(r['dep']) or '—'
    tr.append(f'<tr data-i="{ORDEN.index(r["cod"])}" data-ex="{r["ex"]}" data-ratio="{r["ratio"]:.3f}" data-h="{r["h"]}" class="n{r["nivel"]}">'
              f'<td><a href="{r["url"]}"><b>{r["cod"]}</b> {html.escape(r["nombre"])}</a></td>'
              f'<td class="bar"><span class="fill" style="width:{100*r["ex"]/mx:.0f}%"></span><span class="num">{r["ex"]} <small>({r["pct"]:.0f} %)</small></span></td>'
              f'<td>{fh(r["h"])} h</td><td>{r["ratio"]:.1f}</td>'
              f'<td><span class="tag t{r["nivel"]}">{["", "Imprescindible", "Importante", "Después"][r["nivel"]]}</span></td><td class="dep">{deps}</td></tr>')
cards = ''.join(f'<div class="ruta"><h3>{x["t"]}</h3><p class="big">{fh(round(x["h"]))} h <small>· {x["n"]} temas · {x["ex"]} ejercicios de examen</small></p><p>{x["desc"]}</p><p class="lst">{" · ".join(x["cods"])}</p></div>' for x in rutas)

doc = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<script>try{{var t=localStorage.getItem('tema');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}}catch(e){{}}</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Álgebra · Prioridades de estudio</title>
<link rel="stylesheet" href="assets/resumen.css">
<script defer src="assets/resumen.js"></script>
<style>
.prio main{{max-width:980px;margin:0 auto;padding:24px 16px 60px}}
.prio table{{width:100%;border-collapse:collapse;font:15px/1.4 var(--sans)}}
.prio th,.prio td{{padding:8px 10px;border-bottom:1px solid var(--bd);text-align:left;vertical-align:middle}}
.prio th{{font-size:12.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}}
.prio td a{{color:var(--fg);text-decoration:none}}.prio td a:hover{{color:var(--acc)}}
.prio td.bar{{position:relative;min-width:150px}}
.prio .fill{{position:absolute;left:10px;top:50%;height:60%;transform:translateY(-50%);background:color-mix(in srgb,var(--acc) 28%,transparent);border-radius:4px;max-width:calc(100% - 20px)}}
.prio .num{{position:relative;font-weight:700}}
.prio .tag{{font:700 12px var(--sans);padding:3px 9px;border-radius:99px;border:1px solid currentColor;white-space:nowrap}}
.prio .t1{{color:#c0392b}}.prio .t2{{color:#b5701a}}.prio .t3{{color:var(--mut)}}
.prio td.dep{{color:var(--mut);font-size:13.5px}}
.prio .rutas{{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin:1em 0}}
.prio .ruta{{border:1px solid var(--bd);border-radius:12px;padding:6px 16px 12px;background:var(--card);font-family:var(--sans)}}
.prio .ruta h3{{margin:.5em 0 .1em}}.prio .big{{font:800 1.6rem var(--sans);margin:.1em 0}}.prio .big small{{font:500 .8rem var(--sans);color:var(--mut)}}
.prio .lst{{color:var(--mut);font-size:14px}}
.prio .ctl{{display:flex;gap:8px;flex-wrap:wrap;margin:.8em 0}}
.prio .ctl button{{font:600 14px var(--sans);background:var(--card);color:var(--fg);border:1px solid var(--bd);border-radius:99px;padding:6px 14px;cursor:pointer}}
.prio .ctl button[aria-pressed="true"]{{background:var(--acc);border-color:var(--acc);color:#fff}}
.prio .pecs{{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}}
.prio .tablewrap{{overflow-x:auto}}
.prio small.nota{{color:var(--mut)}}
@media (max-width:640px){{.prio td.dep,.prio th.dep{{display:none}}}}
@media print{{.ctl{{display:none}}}}
</style>
</head>
<body class="prio">
<div class="topbar"><div class="in">
  <a href="index.html">← Índice de temas</a>
  <span><button id="btn-tema" type="button">Claro / oscuro</button></span>
</div></div>
<main>
<h1>¿Por dónde empiezo? Prioridades de estudio</h1>
<p>El examen tiene <b>6 cuestiones cortas y 2 problemas</b> (90 % de la nota; hasta 1 punto de las PEC). No todos los temas «pagan» lo mismo: unos aparecen en el examen una y otra vez y otros casi nunca. Esta tabla cruza <b>cuánto cae</b> con <b>cuánto cuesta estudiarlo</b>, y te propone un orden.</p>
<div class="box tip"><span class="h">Cómo se ha calculado</span>
<p><b>Cuánto cae:</b> número de ejercicios (o apartados) de los 24 exámenes de otros años (feb. 2017 – feb. 2026) que se desarrollan en cada tema: {TOT} en total. Cada ejercicio se cuenta una sola vez, en el tema al que pertenece. No son puntos ni probabilidades: es una medida de frecuencia histórica. <b>Cuánto cuesta:</b> las horas estimadas de la cabecera de cada tema. <b>Ejerc./hora</b> = ejercicios de examen divididos entre horas: cuanto mayor, más rentable. Las dependencias son orientativas.</p></div>

<h2>Tres rutas según tu tiempo</h2>
<div class="rutas">{cards}</div>
<p><small class="nota">Las horas de cada ruta incluyen los temas previos que hacen falta para entender los elegidos. «Imprescindible» es lo que más rinde, no lo que se puede dejar para el final: si un tema de una ruta te pide otro anterior, ese anterior también cuenta.</small></p>

<h2>Por PEC</h2>
<div class="pecs">
<div class="ruta"><h3>PEC 1 · módulos 1-3</h3><p class="big">{pec1} <small>ejercicios de examen · {pec1*100//TOT} % del total</small></p><p>{fh(h1)} h de estudio estimadas.</p></div>
<div class="ruta"><h3>PEC 2 · módulos 4-6</h3><p class="big">{pec2} <small>ejercicios de examen · {pec2*100//TOT} % del total</small></p><p>{fh(h2)} h de estudio estimadas.</p></div>
</div>

<h2>Tema a tema</h2>
<div class="ctl" role="group" aria-label="Ordenar la tabla">
  <button type="button" data-o="i" aria-pressed="true">Orden del temario</button>
  <button type="button" data-o="ex" aria-pressed="false">Más cae primero</button>
  <button type="button" data-o="ratio" aria-pressed="false">Más rentable primero</button>
</div>
<div class="tablewrap"><table id="tp">
<thead><tr><th>Tema</th><th>Ejercicios de examen</th><th>Horas</th><th>Ejerc./hora</th><th>Prioridad</th><th class="dep">Necesitas antes</th></tr></thead>
<tbody>
{chr(10).join(tr)}
</tbody></table></div>

<h2>Cómo leerlo</h2>
<ul>
<li><b>Imprescindible</b> ({sum(1 for r in filas if r['nivel']==1)} temas): ≥ 10 ejercicios de examen o ≥ 2 por hora. Aquí se gana o se pierde el aprobado.</li>
<li><b>Importante</b>: frecuencia media. Se estudian después, en el orden del temario.</li>
<li><b>Después</b>: caen poco, pero <b>no son prescindibles</b> si otro tema los necesita (por ejemplo, 3.5, el cambio de base, sostiene la diagonalización de 4.3). 6.5 (cuádricas) no ha caído nunca en estos 24 exámenes, pero sigue siendo materia.</li>
<li>La frecuencia es histórica: sirve para ordenar el esfuerzo, no para dejar temas sin ver.</li>
</ul>
</main>
<script>
(function(){{
  var tb=document.querySelector('#tp tbody'),rows=[].slice.call(tb.rows);
  document.querySelectorAll('.ctl button').forEach(function(b){{b.addEventListener('click',function(){{
    var o=b.dataset.o;document.querySelectorAll('.ctl button').forEach(function(x){{x.setAttribute('aria-pressed',x===b?'true':'false')}});
    rows.slice().sort(function(a,c){{return o==='i'?a.dataset.i-c.dataset.i:c.dataset[o]-a.dataset[o]||a.dataset.i-c.dataset.i}}).forEach(function(r){{tb.appendChild(r)}});
  }})}});
}})();
</script>
</body>
</html>
'''
(RAIZ / 'prioridades.html').write_text(doc, encoding='utf8')
print('prioridades.html:', len(filas), 'temas,', TOT, 'ejercicios de examen')
for x in rutas: print(x['t'], round(x['h']), 'h', x['n'], 'temas', x['ex'], 'ej')
