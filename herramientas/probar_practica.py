"""Comprueba con sympy los generadores de assets/practica.js (series de práctica).
Uso: ~/venv/bin/python herramientas/probar_practica.py [nº de semillas por tipo]
Carga practica.js en Chrome (Playwright), genera problemas con muchas semillas y verifica cada respuesta de forma independiente."""
import json, re, sys, pathlib, tempfile
import sympy as sp
from playwright.sync_api import sync_playwright

RAIZ = pathlib.Path(__file__).resolve().parent.parent
N = int(sys.argv[1]) if len(sys.argv) > 1 else 400
tmp = pathlib.Path(tempfile.mkdtemp()) / 'p.html'
tmp.write_text(f'<html><head><meta charset="utf-8"></head><body><script src="{(RAIZ/"assets/practica.js").as_uri()}"></script></body></html>')

TIPOS = ['base3', 'cuenta', 'dimension', 'coord2', 'coordpol', 'rango', 'completar']
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pg.goto(tmp.as_uri())
    datos = pg.evaluate("""(args)=>{const [tipos,N]=args,out={};
      for(const t of tipos){out[t]=[];for(let s=1;s<=N;s++){const q=window.AlgPractica.gens[t](s*977+13);
        out[t].push({seed:s,tipo:q.tipo,data:q.data,ans:q.ans||null,opts:q.opts?q.opts.map(o=>o.ok):null,enun:q.enun});}}
      return out;}""", [TIPOS, N])
    b.close()

errores = []
def fallo(t, s, msg): errores.append(f'{t} semilla {s}: {msg}')

for t, lista in datos.items():
    for q in lista:
        d, s = q['data'], q['seed']
        if t == 'base3':
            M = sp.Matrix(d['u']).T
            if M.det() != d['det']: fallo(t, s, 'det')
            if q['opts'] != [d['det'] != 0, d['det'] == 0]: fallo(t, s, 'opciones')
        elif t == 'cuenta':
            exp = 0 if d['k'] < d['dim'] else (2 if d['k'] > d['dim'] else 1)
            if d['cat'] != exp or q['opts'].index(True) != exp or sum(q['opts']) != 1: fallo(t, s, 'categoría')
        elif t == 'dimension':
            f = d['f']
            # re-derivar la respuesta a partir del texto del enunciado
            e = q['enun']
            if f == 0:
                m = int(re.search(r'\\wp_(\d+)', e).group(1)); ok = d['ans'] == m + 1
            elif f == 1:
                r, c = map(int, re.search(r'M_\{(\d)\\times(\d)\}', e).groups()); ok = d['ans'] == r * c
            elif f == 2:
                n = int(re.search(r'\\mathbb R\^(\d)', e).group(1))
                ec = re.search(r':\\ (.*)=0\\}', e).group(1)
                co = [0]*n
                for term in re.finditer(r'([+-]?)\s*(\d*)x_(\d)', ec):
                    sg = -1 if term.group(1) == '-' else 1; mag = int(term.group(2)) if term.group(2) else 1
                    co[int(term.group(3))-1] += sg*mag
                ok = d['ans'] == n - sp.Matrix([co]).rank()
            else:
                body = re.search(r'\\\{x\\in\\mathbb R\^4:\\ (.*)\\\}', e).group(1)
                eqs = [x.replace('=0', '').strip() for x in body.replace('\\ ', ' ').split(', ')]
                rows = []
                for ec in eqs:
                    co = [0]*4
                    for term in re.finditer(r'([+-]?)\s*(\d*)x_(\d)', ec):
                        sg = -1 if term.group(1) == '-' else 1; mag = int(term.group(2)) if term.group(2) else 1
                        co[int(term.group(3))-1] += sg*mag
                    rows.append(co)
                ok = d['ans'] == 4 - sp.Matrix(rows).rank()
            if not ok: fallo(t, s, f'dimensión f={f} {e}')
        elif t == 'coord2':
            B = sp.Matrix([d['b1'], d['b2']]).T
            sol = B.LUsolve(sp.Matrix(d['v']))
            if list(sol) != d['ans'] or q['ans'] != d['ans'] or B.det() == 0: fallo(t, s, 'coordenadas')
        elif t == 'coordpol':
            a, b, c = d['a'], d['b'], d['c']; x = sp.symbols('x')
            E = [sp.Integer(1), x + a, x**2 + b*x + c]; p = d['p'][0]*x**2 + d['p'][1]*x + d['p'][2]
            lam = d['ans']
            if sp.expand(sum(l*e for l, e in zip(lam, E)) - p) != 0 or q['ans'] != lam: fallo(t, s, 'polinomio')
        elif t == 'rango':
            if sp.Matrix(d['rows']).rank() != d['ans'] or q['ans'] != [d['ans']]: fallo(t, s, 'rango')
        elif t == 'completar':
            u1, u2 = d['u']
            dets = [sp.Matrix([u1, u2, o['v']]).det() for o in d['opts']]
            if dets != [o['det'] for o in d['opts']] or [x != 0 for x in dets] != q['opts'] or sum(q['opts']) != 1: fallo(t, s, 'completar')
            if sp.Matrix([u1, u2]).rank() != 2: fallo(t, s, 'u1,u2 no libres')

# ---- diagnóstico: cada error típico debe producir su mensaje ----
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(); pg.goto(tmp.as_uri())
    diag = pg.evaluate("""(N)=>{const out=[];const G=window.AlgPractica.gens;
      for(let s=1;s<=N;s++){
        let q=G.coord2(s*31+5),d=q.data,x=d.ans[0],y=d.ans[1],v=d.v;
        out.push(['coord2-canon',q.diag(v.slice())]);if(!(y===v[0]&&x===v[1])) out.push(['coord2-orden',q.diag([y,x])]);
        const D=d.b1[0]*d.b2[1]-d.b1[1]*d.b2[0];
        const alt=[(v[0]*d.b2[1]-d.b1[1]*v[1])/D,(d.b1[0]*v[1]-v[0]*d.b2[0])/D];
        const igual=(a,b)=>Math.abs(a[0]-b[0])<1e-9&&Math.abs(a[1]-b[1])<1e-9;
        if(!igual(alt,[x,y])&&!igual(alt,v)&&!igual(alt,[y,x])) out.push(['coord2-filas',q.diag(alt)]);
        q=G.coordpol(s*31+5);d=q.data;out.push(['pol-canon',q.diag([d.p[2],d.p[1],d.p[0]])]);
        q=G.rango(s*31+5);d=q.data;out.push(['rango-cuenta',q.diag([4])]);
      } return out;}""", 300)
    b.close()
CLAVE = {'coord2-canon': 'canónica', 'coord2-orden': 'orden', 'coord2-filas': 'filas', 'pol-canon': 'canónica', 'rango-cuenta': 'contado'}
mal = [k for k, m in diag if CLAVE[k] not in (m or '') and not (k == 'pol-canon' and 'canónica' in (m or ''))]
# pol-canon con p0,p1,p2 invertido: el primer test usa [p2,p1,p0] -> mensaje de 'mayor a menor grado'
mal = [k for k, m in diag if (CLAVE[k] not in (m or '')) and not (k == 'pol-canon' and 'mayor a menor' in (m or '')) and not (k=='rango-cuenta' and 'Esa es la dimensión' in (m or ''))]
print('diagnósticos incorrectos:', len(mal), 'de', len(diag))
if mal:
    errores.append('diagnóstico ' + mal[0])
    print('  ejemplo:', [(k, m) for k, m in diag if k in mal][:1])

print(f'{N} semillas × {len(TIPOS)} tipos comprobadas; errores: {len(errores)}')
for e in errores[:20]: print(' ', e)
sys.exit(1 if errores else 0)
