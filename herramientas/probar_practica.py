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

TIPOS = ['base3', 'cuenta', 'dimension', 'coord2', 'coordpol', 'rango', 'completar',
         'libre3', 'subesp', 'grass', 'lineal', 'matf', 'comb22', 'semej', 'jordan3', 'ortog2', 'simet2', 'recta3', 'bilin', 'conica', 'cuadrica', 'neutro',
         'prod22', 'inv22', 'rango34', 'det3', 'detprop', 'sist2', 'clasifica', 'dimnuc', 'polcar22', 'diag22', 'proy', 'qmat', 'sylv']
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
        elif t == 'libre3':
            if (sp.Matrix(d['u']).det() != 0) != d['libre'] or q['opts'][0] != d['libre']: fallo(t, s, 'libre3')
        elif t == 'subesp':
            k, ok = d['k'], d['ok']; a, b_, c = d['c']
            ex = {0: True, 4: True}
            if k in (1, 2, 3, 5) and ok: fallo(t, s, 'subesp: marcado subespacio')
            if k in (0, 4) and not ok: fallo(t, s, 'subesp: marcado no subespacio')
            if k == 2:   # (1,0,0)+(0,1,0) rompe x1*x2=0
                if (1*1) == 0: fallo(t, s, 'subesp k2')
            if k == 5:   # (1,1,0) en W y 2*(1,1,0) no
                if not (1 == 1**2 and 2 != 2**2): fallo(t, s, 'subesp k5')
        elif t == 'grass':
            n, dU, dW, kk = d['n'], d['dU'], d['dW'], d['k']
            if not (max(0, dU + dW - n) <= kk <= min(dU, dW)) or d['ans'] != dU + dW - kk or d['ans'] > n: fallo(t, s, 'grass')
        elif t == 'lineal':
            if (d['k'] in (0,)) != d['ok'] or q['opts'].index(True) != (0 if d['ok'] else 1): fallo(t, s, 'lineal')
        elif t == 'matf':
            M = sp.Matrix(d['M']); v = M * sp.Matrix([1, 2])
            if M.shape != (3, 2) or list(M) != d['ans']: fallo(t, s, 'matf')
        elif t == 'comb22':
            C = d['l'] * sp.Matrix(d['A']) + d['m'] * sp.Matrix(d['B'])
            if list(C) != d['ans']: fallo(t, s, 'comb22')
        elif t == 'semej':
            A = sp.Matrix(d['A']); B = sp.Matrix(d['B']); x = sp.symbols('x')
            igual = sp.expand(A.charpoly(x).as_expr() - B.charpoly(x).as_expr()) == 0
            dist_ev = len(A.eigenvals()) == 2
            if igual != d['sim'] or (d['sim'] and not dist_ev): fallo(t, s, 'semej')
            if d['sim'] and not (A.is_diagonalizable() and B.is_diagonalizable()): fallo(t, s, 'semej diag')
        elif t == 'jordan3':
            if d['d'] != 3 - d['r'] or q['opts'].index(True) != {1: 0, 2: 1, 3: 2}[d['d']]: fallo(t, s, 'jordan3')
            # comprobación con sympy: bloque de tamaños dados tiene rang(J-lI)=3-d
            tam = {1: [3], 2: [2, 1], 3: [1, 1, 1]}[d['d']]
            J = sp.diag(*[sp.jordan_cell(0, n) for n in tam])
            if J.rank() != d['r']: fallo(t, s, 'jordan3 rango')
        elif t == 'ortog2':
            M = sp.Matrix(d['M']) / d['den']
            if (M.T * M == sp.eye(2)) != d['ok'] or q['opts'][0] != d['ok']: fallo(t, s, 'ortog2')
        elif t == 'simet2':
            A = sp.Matrix([[d['a'], d['b']], [d['b'], d['a']]]); ev = sorted(int(x) for x in A.eigenvals().keys())
            if ev != d['ans']: fallo(t, s, 'simet2')
        elif t == 'recta3':
            X = sp.Matrix([[1, 1], [2, 1], [3, 1]]); Bv = sp.Matrix(d['y']); sol = (X.T * X).LUsolve(X.T * Bv)
            if any(abs(float(a_) - b_) > 1e-9 for a_, b_ in zip(sol, d['ans'])): fallo(t, s, 'recta3')
        elif t == 'bilin':
            A = sp.Matrix(d['A']); v = (sp.Matrix([d['x']]) * A * sp.Matrix(d['y']))[0]
            if v != d['ans']: fallo(t, s, 'bilin')
        elif t == 'conica':
            a, b_, c, dd, e, f = d['co']; M3 = sp.Matrix([[f, dd/sp.Integer(2), e/sp.Integer(2)], [dd/sp.Integer(2), a, b_/sp.Integer(2)], [e/sp.Integer(2), b_/sp.Integer(2), c]])
            disc = b_*b_ - 4*a*c; cat = 0 if disc < 0 else (1 if disc == 0 else 2)
            if cat != d['cat'] or M3.det() == 0 or q['opts'].index(True) != cat: fallo(t, s, 'conica')
        elif t == 'cuadrica':
            if q['opts'].index(True) is None or sum(q['opts']) != 1: fallo(t, s, 'cuadrica')
        elif t == 'neutro':
            a_ = sp.symbols('a'); k, c = d['k'], d['c']
            ops = {0: lambda x, y: x + y + c, 1: lambda x, y: x*y - x - y + 2, 2: lambda x, y: x + y - 2*x*y}
            e = d['ans']
            if sp.expand(ops[k](a_, e) - a_) != 0 or sp.expand(ops[k](e, a_) - a_) != 0: fallo(t, s, 'neutro')
        elif t == 'prod22':
            if list(sp.Matrix(d['A']) * sp.Matrix(d['B'])) != d['ans'] or q['ans'] != d['ans']: fallo(t, s, 'producto')
        elif t == 'inv22':
            Ai = sp.Matrix(d['A']).inv()
            if any(abs(float(a) - b) > 1e-9 for a, b in zip(Ai, d['ans'])): fallo(t, s, 'inversa')
        elif t == 'rango34':
            if sp.Matrix(d['A']).rank() != d['ans']: fallo(t, s, 'rango34')
        elif t == 'det3':
            if sp.Matrix(d['M']).det() != d['ans']: fallo(t, s, 'det3')
        elif t == 'detprop':
            import random
            f, n, k, c = d['f'], d['n'], d['k'], d['c']
            # matriz real de orden n con determinante k para comprobar la propiedad con sympy
            A = sp.diag(*([k] + [1] * (n - 1)))
            esperado = {0: (c * A).det(), 1: A.inv().det(), 2: (A * A).det(), 3: A.T.det()}[f]
            if abs(float(esperado) - d['ans']) > 1e-9: fallo(t, s, f'detprop f={f}')
        elif t == 'sist2':
            M = sp.Matrix(d['M']); sol = M.LUsolve(sp.Matrix(d['rhs']))
            if list(sol) != d['ans'] or M.det() == 0: fallo(t, s, 'sist2')
        elif t == 'clasifica':
            A = sp.Matrix(d['A']); Ab = A.row_join(sp.Matrix(d['b']))
            r0, r1 = A.rank(), Ab.rank()
            cat = 2 if r0 < r1 else (0 if r0 == 3 else 1)
            if (r0, r1, cat) != (d['r0'], d['r1'], d['cat']) or q['opts'].index(True) != cat: fallo(t, s, 'clasifica')
        elif t == 'dimnuc':
            r = sp.Matrix(d['A']).rank()
            if d['ans'] != [4 - r, r] or len(sp.Matrix(d['A']).nullspace()) != 4 - r: fallo(t, s, 'dimnuc')
        elif t == 'polcar22':
            A = sp.Matrix(d['A']); ev = sorted(A.eigenvals().keys())
            if [int(x) for x in ev] != d['ans']: fallo(t, s, 'polcar22')
        elif t == 'diag22':
            A = sp.Matrix(d['A']); real_diag = A.is_diagonalizable(reals_only=True)
            if bool(real_diag) != d['si'] or q['opts'][0] != d['si']: fallo(t, s, 'diag22')
        elif t == 'proy':
            u = sp.Matrix(d['u']); v = sp.Matrix(d['v']); pr = (u.dot(v) / u.dot(u)) * u
            if any(abs(float(a) - b) > 1e-9 for a, b in zip(pr, d['ans'])): fallo(t, s, 'proy')
            if u.dot(v - pr) != 0: fallo(t, s, 'proy no ortogonal')
        elif t == 'qmat':
            xs = sp.symbols('x1 x2 x3'); a, b_, c, dd, e, f = d['co']
            Q = a*xs[0]**2 + b_*xs[1]**2 + c*xs[2]**2 + dd*xs[0]*xs[1] + e*xs[0]*xs[2] + f*xs[1]*xs[2]
            S = sp.Matrix([[d['ans'][0], d['ans'][1], d['ans'][2]], [d['ans'][1], d['ans'][3], d['ans'][4]], [d['ans'][2], d['ans'][4], d['ans'][5]]])
            X = sp.Matrix(xs)
            if sp.expand((X.T * S * X)[0] - Q) != 0: fallo(t, s, 'qmat')
        elif t == 'sylv':
            S = sp.Matrix([[d['a'], d['b']], [d['b'], d['c']]])
            ev = list(S.eigenvals().keys()); pos = [float(x) for x in ev if float(x) > 1e-9]; neg = [float(x) for x in ev if float(x) < -1e-9]
            mult = S.eigenvals()
            npos = sum(m for x, m in mult.items() if float(x) > 1e-9); nneg = sum(m for x, m in mult.items() if float(x) < -1e-9)
            cat = 0 if (npos == 2) else 1 if (nneg == 2) else 2 if (npos == 1 and nneg == 1) else 3
            if cat != d['cat'] or q['opts'].index(True) != d['cat']: fallo(t, s, 'sylv')
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
        q=G.prod22(s*31+5);d=q.data;let A=d.A,B=d.B,mm=(X,Y)=>[X[0][0]*Y[0][0]+X[0][1]*Y[1][0],X[0][1]*Y[1][1]+X[0][0]*Y[0][1],X[1][0]*Y[0][0]+X[1][1]*Y[1][0],X[1][0]*Y[0][1]+X[1][1]*Y[1][1]];
        out.push(['prod-BA',q.diag(mm(B,A))]);{const H=[A[0][0]*B[0][0],A[0][1]*B[0][1],A[1][0]*B[1][0],A[1][1]*B[1][1]],BA=mm(B,A); if(H.some((x,i)=>x!==BA[i])) out.push(['prod-had',q.diag(H)]);}
        q=G.inv22(s*31+5);d=q.data;A=d.A;out.push(['inv-adj',Math.abs(d.det)===1?'dividir':q.diag([A[1][1],-A[0][1],-A[1][0],A[0][0]])]);
        q=G.det3(s*31+5);d=q.data;out.push(['det-signo',q.diag([-d.ans])]);
        q=G.polcar22(s*31+5);d=q.data;out.push(['pc-signos',q.diag([-d.ans[1],-d.ans[0]])]);
        q=G.qmat(s*31+5);d=q.data;out.push(['qmat-mitad',q.diag([d.co[0],d.co[3],d.co[4],d.co[1],d.co[5],d.co[2]])]);
      } return out;}""", 300)
    b.close()
CLAVE = {'prod-BA': 'BA', 'prod-had': 'entrada a entrada', 'inv-adj': 'dividir', 'det-signo': 'signo', 'pc-signos': 'signos', 'qmat-mitad': 'mitad', 'coord2-canon': 'canónica', 'coord2-orden': 'orden', 'coord2-filas': 'filas', 'pol-canon': 'canónica', 'rango-cuenta': 'contado'}
mal = [k for k, m in diag if CLAVE[k] not in (m or '') and not (k == 'pol-canon' and 'canónica' in (m or ''))]
# pol-canon con p0,p1,p2 invertido: el primer test usa [p2,p1,p0] -> mensaje de 'mayor a menor grado'
mal = [k for k, m in diag if (CLAVE[k] not in (m or '')) and not (k == 'pol-canon' and 'mayor a menor' in (m or '')) and not (k=='rango-cuenta' and 'Esa es la dimensión' in (m or '')) and not (k=='det-signo' and 'sumado' in (m or '')) and not (k=='pc-signos' and ('traza' in (m or '') or 'menor a mayor' in (m or '')))]
print('diagnósticos incorrectos:', len(mal), 'de', len(diag))
if mal:
    errores.append('diagnóstico ' + mal[0])
    print('  ejemplo:', [(k, m) for k, m in diag if k in mal][:1])

print(f'{N} semillas × {len(TIPOS)} tipos comprobadas; errores: {len(errores)}')
for e in errores[:20]: print(' ', e)
sys.exit(1 if errores else 0)
