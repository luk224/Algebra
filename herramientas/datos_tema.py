"""Temas como datos + plantilla.

    python herramientas/datos_tema.py extraer 2.3     HTML actual  ->  datos/2_3/{tema.yaml, pagina.html, ejercicios.yaml}
    python herramientas/datos_tema.py construir 2.3   datos        ->  HTML del tema (temas/…)
    python herramientas/datos_tema.py verificar 2.3   construye en memoria y compara con el HTML actual (ida y vuelta):
                                                      1) mismas etiquetas, atributos y texto  2) mismo texto visible en Chrome (si hay Playwright)
    python herramientas/datos_tema.py validar 2.3     reglas de contenido (ids únicos, campos obligatorios, ejercicios de examen)
    python herramientas/datos_tema.py migrar 2.2      extraer + validar + verificar + construir, comprobando que no se pierde ningún ejercicio
    python herramientas/datos_tema.py estado todos    comprueba que el HTML de cada tema coincide con lo que se construye desde sus datos
    python herramientas/datos_tema.py probar 2.2|todos   extrae y reconstruye EN MEMORIA (sin escribir nada) y compara etiquetas y texto

Cada tema se guarda en `datos/X_Y/`:
  tema.yaml        código y nombre del fichero HTML de salida
  pagina.html      el HTML del tema con cada ejercicio sustituido por un marcador {{ejercicio:ID}}
                   (la teoría sigue siendo HTML con LaTeX, como siempre)
  ejercicios.yaml  un registro por ejercicio (ver ESQUEMA abajo)
El HTML de `temas/` de un tema migrado es un producto generado: se edita el dato o la plantilla y se reconstruye.

ESQUEMA de un ejercicio (ejercicios.yaml es una lista de estos registros):
  id        identificador único (ancla de enlace): ej2-23, ep1, ex-feb26… Si el HTML original no tenía id se genera `sol-X_Y-N`.
  clase     libro | propio | examen (se deduce de las fuentes: X = examen, E = libro, el resto = propio)
  titulo    HTML del título (sin estrellas ni fuentes)
  fuentes   lista de {l: U|E|L|A|X|P, ref: texto del tooltip, texto: etiqueta visible}
  cuerpo    lista ordenada de bloques; cada bloque es UNA de estas claves:
              enun:     HTML del enunciado (formato antiguo: el enunciado va dentro de la solución)
              plan:     {titulo, filas: [[«Qué me piden», «…»], …]}
              pasos:    [HTML de cada paso]
              receta:   HTML tras «Receta:»
              resultado / error / teoria:  HTML tras la etiqueta «Resultado:» / «Error típico:» / «Teoría:»
              html:     HTML libre (cualquier otro bloque, comentario o texto suelto)
  FORMATO NUEVO (capa pedagógica; solo si existen estos campos, que van juntos):
  nivel      1, 2 ó 3 (★☆☆ básico, ★★☆ nivel examen, ★★★ difícil)
  enunciado  HTML del enunciado, visible fuera de la solución (sin spoilers; no lleva bloque `enun` en el cuerpo)
  pista      HTML de la pista
  problema   (opcional) lista de tipos de problema que cubre; el primero es el principal. Alimenta la tabla «Qué cae» y los enlaces de las fichas
  etiqueta   (opcional) texto del enlace; obligatorio en los ejercicios de examen con `problema`. Los de libro y propios se deducen del título

tema.yaml puede llevar `tipos: [{id, nombre, receta}]`; las secciones usan los marcadores {{que_cae}} y {{vinculos:ID_TIPO}}.
"""
import re, sys, pathlib, html as _html
from html.parser import HTMLParser
import yaml
sys_path_fix = sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import capa

RAIZ = pathlib.Path(__file__).resolve().parent.parent
NOMBRE_NIVEL = {1: 'básico', 2: 'nivel examen', 3: 'difícil'}
ETIQUETAS = {'resultado': 'Resultado', 'error': 'Error típico', 'teoria': 'Teoría'}
TOKEN = re.compile(r'<!--.*?-->|<(/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"\']|"[^"]*"|\'[^\']*\')*?)(/?)>', re.S)
VOID = {'br', 'img', 'hr', 'input', 'meta', 'link'}


def carpeta(codigo): return RAIZ / 'datos' / codigo.replace('.', '_')
def archivo_tema(codigo): return next(p for p in sorted((RAIZ / 'temas').glob(f'tema_{codigo.replace(".", "_")}_*.html')))
def todos_los_temas(): return sorted(re.match(r'tema_(\d)_(\d)_', p.name).expand(r'\1.\2') for p in (RAIZ / 'temas').glob('tema_*.html'))


def top_level(body):
    """Divide un fragmento HTML en sus partes de primer nivel:
    ('el', etiqueta, atributos, html_exterior, html_interior) para elementos y ('raw', texto) para comentarios, texto suelto y vacíos."""
    out, depth, start, pos, cur, ini = [], 0, None, 0, None, 0
    def raw(t):
        if t.strip(): out.append(('raw', t.strip()))
    for m in TOKEN.finditer(body):
        tok = m.group(0)
        if tok.startswith('<!--'):
            if depth == 0: raw(body[pos:m.start()]); raw(tok); pos = m.end()
            continue
        cl, name, attrs, selfc = m.groups()
        if name.lower() in VOID or selfc:
            if depth == 0: raw(body[pos:m.start()]); raw(tok); pos = m.end()
            continue
        if not cl:
            if depth == 0: raw(body[pos:m.start()]); start, cur, ini = m.start(), (name, attrs), m.end()
            depth += 1
        else:
            depth -= 1
            if depth < 0: raise ValueError('cierre sin apertura: ' + tok)
            if depth == 0: out.append(('el', cur[0], cur[1], body[start:m.end()], body[ini:m.start()])); pos = m.end()
    if depth: raise ValueError('elemento sin cerrar')
    raw(body[pos:])
    return out


def bloques_sol(s):
    """Posiciones (inicio, fin, atributos) de los `details.sol` más externos, contando la anidación real."""
    out, i = [], 0
    while True:
        m = re.compile(r'<details class="sol"([^>]*)>').search(s, i)
        if not m: return out
        depth, end = 0, None
        for t in re.finditer(r'<(/?)details\b', s[m.start():]):
            depth += -1 if t.group(1) else 1
            if depth == 0: end = s.index('>', m.start() + t.end()) + 1; break
        if end is None: raise ValueError('details.sol sin cerrar')
        out.append((m.start(), end, m.group(1))); i = end


PRE_NUEVO = re.compile(r'<div class="ejer-enun"><span class="lbl">Enunciado</span><p class="enun">(.*?)</p></div>\s*'
                       r'<details class="pista"><summary>Pista \(inténtalo antes de abrir la solución\)</summary><p>(.*?)</p></details>\s*\Z', re.S)


# ------------------------------------------------------------------ extraer
def parse_cuerpo(cuerpo, id_):
    items = []
    for part in top_level(cuerpo):
        if part[0] == 'raw': items.append({'html': part[1]}); continue
        _, tag, attrs, ext, inner = part
        a = attrs.strip()
        if tag == 'div' and a == 'class="plan"':
            h = re.fullmatch(r'\s*<span class="h">(.*?)</span>\s*<dl>(.*)</dl>\s*', inner, re.S)
            filas = [[x.strip(), y.strip()] for x, y in re.findall(r'<dt>(.*?)</dt>\s*<dd>(.*?)</dd>', h.group(2), re.S)] if h else None
            if h and filas and re.sub(r'\s', '', re.sub(r'<dt>.*?</dt>\s*<dd>.*?</dd>', '', h.group(2), flags=re.S)) == '':
                items.append({'plan': {'titulo': h.group(1), 'filas': filas}}); continue
        elif tag == 'ol' and a == 'class="steps"':
            li = top_level(inner)
            if li and all(p[0] == 'el' and p[1] == 'li' and not p[2].strip() for p in li):
                items.append({'pasos': [p[4].strip() for p in li]}); continue
        elif tag == 'div' and a == 'class="recipe"':
            r = re.fullmatch(r'\s*<b>Receta:</b>\s*(.*)', inner, re.S)
            if r: items.append({'receta': r.group(1).strip()}); continue
        elif tag == 'p' and a == 'class="enun"':
            items.append({'enun': inner.strip()}); continue
        elif tag == 'p' and not a:
            lab = re.fullmatch(r'\s*<b>(Resultado|Error típico|Teoría):</b>\s*(.*)', inner, re.S)
            if lab: items.append({{v: k for k, v in ETIQUETAS.items()}[lab.group(1)]: lab.group(2).strip()}); continue
        items.append({'html': ext.strip()})
    return items


def parse_sol(s, st, en, attrs, pre, codigo, n):
    t = s[st:en]
    idm = re.search(r'id="([^"]+)"', attrs)
    id_ = idm.group(1) if idm else f'sol-{codigo.replace(".", "_")}-{n}'
    sm = re.match(r'<details class="sol"[^>]*>\s*<summary>(.*?)</summary>(.*)</details>\Z', t, re.S)
    if not sm: raise ValueError('summary inesperado en ' + id_)
    summ, cuerpo = sm.groups()
    nv = re.match(r'<span class="nivel" title="[^"]*">([★☆]+)</span>', summ)
    nivel = nv.group(1).count('★') if nv else None
    if nv: summ = summ[nv.end():]
    fm = re.fullmatch(r'(.*?)((?:\s*<span class="src"[^>]*>[^<]*</span>)*)\s*', summ, re.S)
    srcs = re.findall(r'<span class="src" data-l="([^"]*)" data-ref="([^"]*)">([^<]*)</span>', fm.group(2))
    fuentes = [dict(l=a, ref=b, texto=c) for a, b, c in srcs]
    clase = 'examen' if any(f['l'] == 'X' for f in fuentes) else ('libro' if any(f['l'] == 'E' for f in fuentes) else 'propio')
    e = dict(id=id_, clase=clase)
    if nivel: e['nivel'] = nivel
    e.update(titulo=fm.group(1).strip(), fuentes=fuentes)
    if pre: e.update(enunciado=pre.group(1).strip(), pista=pre.group(2).strip())
    e['cuerpo'] = parse_cuerpo(cuerpo, id_)
    return e


def extraer_en_memoria(codigo):
    s = archivo_tema(codigo).read_text(encoding='utf8')
    ejs, esq, ult = [], [], 0
    for n, (st, en, attrs) in enumerate(bloques_sol(s), 1):
        pre = PRE_NUEVO.search(s[ult:st]) if ult <= st else None
        ini = ult + pre.start() if pre else st
        e = parse_sol(s, st, en, attrs, pre, codigo, n)
        ejs.append(e); esq.append(s[ult:ini] + '{{ejercicio:%s}}' % e['id']); ult = en
    esq.append(s[ult:])
    cfg, cuerpo = partir_pagina(''.join(esq))
    cfg = dict(codigo=codigo, archivo=str(archivo_tema(codigo).relative_to(RAIZ)), **cfg)
    return cfg, cuerpo, ejs


# ------------------------------------------------------------------ carcasa (cabecera, hero y pie comunes) y secciones
PLANTILLA = RAIZ / 'datos' / '_plantilla' / 'tema.html'
TAIL_INI = '<h2 id="fuentes"'
LEYENDA = {'U': ('Álgebra para Ingenieros (UNED) — libro oficial', 'oficial'), 'E': ('Ejercicios de Álgebra para Ingenieros (UNED)', 'ejercicios'),
           'L': ('Lay, Álgebra Lineal y sus Aplicaciones', 'Lay'), 'A': ('Apuntes de tutoría ETSI (solo tema 1)', 'tutoría'),
           'X': ('Examen de convocatorias anteriores (Álgebra, UNED)', 'examen'), 'P': ('Explicación o ejemplo propio, sin página en los libros', 'propio')}


def leyenda_html(letras):
    return '\n'.join(f'    <span class="src" data-l="{l}" data-ref="{LEYENDA[l][0]}">{l}</span> {LEYENDA[l][1]}' for l in letras)



def partir_pagina(esq):
    """Separa el HTML de un tema (con los ejercicios ya sustituidos por marcadores) en: parámetros de la carcasa + cuerpo."""
    t = re.search(r'<title>Álgebra · (.*?)</title>', esq)
    res = esq[t.end():esq.index('</head>')]
    css = re.findall(r'<link rel="stylesheet" href="\.\./assets/([^"]+)">', res)
    js = re.findall(r'<script defer src="\.\./assets/([^"]+)"></script>', res)
    if re.sub(r'\s+', '', res) != re.sub(r'\s+', '', recursos_html(css, js)): raise ValueError('cabecera con recursos no estándar')
    cls = re.search(r'<html lang="es"([^>]*)>', esq).group(1)
    h = re.search(r'<header class="hero">\s*<div class="kick">(.*?)</div>\s*<h1>(.*?)</h1>\s*<p>(.*?)</p>\s*<div class="chips">(.*?)</div>\s*<div class="legend">(.*?)</div>\s*</header>', esq, re.S)
    if not h: raise ValueError('hero no estándar')
    letras = re.findall(r'<span class="src" data-l="([A-Z])"', h.group(5))
    if re.sub(r'\s+', '', h.group(5)) != re.sub(r'\s+', '', leyenda_html(letras) + '\n    — pasa el ratón (o toca) por cada etiqueta para ver libro y página; en pantallas anchas aparecen en el margen derecho.\n  '): raise ValueError('leyenda no estándar')
    chips = re.findall(r'<span>(.*?)</span>', h.group(4), re.S)
    if ''.join(f'<span>{c}</span>' for c in chips) != h.group(4).strip(): raise ValueError('chips no estándar')
    cuerpo = esq[h.end():esq.index(TAIL_INI)]
    cfg = dict(html_class=cls.strip(), titulo=t.group(1), css=css, js=js, kicker=h.group(1).strip(), h1=h.group(2).strip(), resumen=h.group(3).strip(), chips=[c.strip() for c in chips], leyenda=letras)
    return cfg, cuerpo


def recursos_html(css, js):
    return '\n'.join([f'<link rel="stylesheet" href="../assets/{c}">' for c in css] + [f'<script defer src="../assets/{j}"></script>' for j in js])


def render_pagina(cfg, cuerpo):
    pl = PLANTILLA.read_text(encoding='utf8')
    cls = ' ' + cfg['html_class'] if cfg.get('html_class') else ''
    chips = ''.join(f'<span>{c}</span>' for c in cfg['chips'])
    for k, v in (('{{carpeta}}', 'datos/' + cfg['codigo'].replace('.', '_') + '/'), ('{{html_class}}', cls), ('{{titulo}}', cfg['titulo']), ('{{recursos}}', recursos_html(cfg['css'], cfg['js'])), ('{{kicker}}', cfg['kicker']),
                 ('{{h1}}', cfg['h1']), ('{{resumen}}', cfg['resumen']), ('{{chips}}', chips), ('{{leyenda}}', leyenda_html(cfg['leyenda']))):
        pl = pl.replace(k, v)
    return pl.replace('{{cuerpo}}', cuerpo)    # el cuerpo va el último: puede contener llaves de LaTeX


def crear_plantilla(codigo='4.2'):
    """Genera datos/_plantilla/tema.html a partir de un tema de referencia. Ya existe y se edita a mano (lleva el aviso «GENERADO»): NO volver a ejecutar."""
    s = archivo_tema(codigo).read_text(encoding='utf8')
    cfg, cuerpo, _ = extraer_en_memoria(codigo)
    h = re.search(r'<header class="hero">\s*<div class="kick">(.*?)</div>\s*<h1>(.*?)</h1>\s*<p>(.*?)</p>\s*<div class="chips">(.*?)</div>', s, re.S)
    pl = s[:h.start()] + '<header class="hero">\n  <div class="kick">{{kicker}}</div>\n  <h1>{{h1}}</h1>\n  <p>{{resumen}}</p>\n  <div class="chips">{{chips}}</div>' + s[h.end():]
    pl = re.sub(r'(<div class="legend">\n)(?:    <span class="src".*?</span> [^\n]*\n)+', r'\1{{leyenda}}\n', pl, count=1)
    pl = pl.replace(f'<html lang="es">', '<html lang="es"{{html_class}}>', 1).replace(f'<title>Álgebra · {cfg["titulo"]}</title>', '<title>Álgebra · {{titulo}}</title>')
    i = pl.index('</title>') + 8; j = pl.index('</head>')
    pl = pl[:i] + '\n{{recursos}}\n' + pl[j:]
    a = pl.index('</header>') + 9; b = pl.index(TAIL_INI)
    pl = pl[:a] + '\n{{cuerpo}}' + pl[b:]
    PLANTILLA.parent.mkdir(parents=True, exist_ok=True); PLANTILLA.write_text(pl, encoding='utf8')
    print('plantilla escrita:', PLANTILLA.relative_to(RAIZ))


def dividir_secciones(cuerpo):
    """Corta el cuerpo en fragmentos, uno por cada <h2> (con el comentario separador que lo precede, si lo hay). Sin pérdida: ''.join(...) == cuerpo."""
    cortes = []
    for m in re.finditer(r'<h2\b[^>]*>', cuerpo):
        ini = m.start()
        c = re.search(r'<!--[^\n]*?-->[ \t]*\n(?:[ \t]*\n)*\Z', cuerpo[:ini])
        cortes.append((c.start() if c else ini, m.group(0)))
    pos = [0] + [c[0] for c in cortes] + [len(cuerpo)]
    nombres = ['inicio'] + [re.search(r'id="([^"]+)"', c[1]).group(1) if 'id="' in c[1] else f'h2_{i}' for i, c in enumerate(cortes, 1)]
    return [(f'{i:02d}_{n}.html', cuerpo[pos[i]:pos[i + 1]]) for i, n in enumerate(nombres)]


def volcar(obj):
    class D(yaml.SafeDumper): pass
    def rep(dum, v):
        v = '\n'.join(l.rstrip() for l in v.split('\n'))
        # bloque literal («|-») para todo el texto salvo identificadores cortos: se edita a mano sin escapar nada
        simple = re.fullmatch(r'[A-Za-z0-9_.\-]{1,24}', v) is not None
        return dum.represent_scalar('tag:yaml.org,2002:str', v, style=None if simple else '|')
    D.add_representer(str, rep)
    return yaml.dump(obj, Dumper=D, allow_unicode=True, sort_keys=False, width=10**6)


def extraer(codigo):
    cfg, pag, ejs = extraer_en_memoria(codigo)
    d = carpeta(codigo); d.mkdir(parents=True, exist_ok=True)
    sec = d / 'secciones'
    if sec.exists():
        for f in sec.glob('*.html'): f.unlink()
    sec.mkdir(exist_ok=True)
    partes = dividir_secciones(pag)
    assert ''.join(t for _, t in partes) == pag
    for nombre, texto in partes: (sec / nombre).write_text(texto, encoding='utf8')
    if (d / 'pagina.html').exists(): (d / 'pagina.html').unlink()
    (d / 'tema.yaml').write_text(volcar(cfg), encoding='utf8')
    (d / 'ejercicios.yaml').write_text(volcar(ejs), encoding='utf8')
    print(f'{codigo}: {len(ejs)} ejercicios y {len(partes)} secciones -> {d.relative_to(RAIZ)}/')


# ------------------------------------------------------------------ construir
def render(e):
    nuevo = bool(e.get('pista'))
    src = ''.join(f' <span class="src" data-l="{f["l"]}" data-ref="{f["ref"]}">{f["texto"]}</span>' for f in e['fuentes'])
    o = []
    if nuevo:
        est = '★' * e['nivel'] + '☆' * (3 - e['nivel'])
        o += [f'<div class="ejer-enun"><span class="lbl">Enunciado</span><p class="enun">{e["enunciado"]}</p></div>',
              f'<details class="pista"><summary>Pista (inténtalo antes de abrir la solución)</summary><p>{e["pista"]}</p></details>']
        nv = f'<span class="nivel" title="Dificultad: {NOMBRE_NIVEL[e["nivel"]]}">{est}</span>'
    else: nv = ''
    o.append(f'<details class="sol" id="{e["id"]}"><summary>{nv}{e["titulo"]}{src}</summary>')
    # el resultado va PRIMERO (el estudiante ve adónde se llega y luego cómo): los bloques `resultado` se colocan antes del plan
    cuerpo = sorted(e['cuerpo'], key=lambda b: 0 if 'resultado' in b else 1)
    for b in cuerpo:
        (k, v), = b.items()
        if k == 'plan':
            filas = ''.join(f'\n    <dt>{a}</dt><dd>{c}</dd>' for a, c in v['filas'])
            o.append(f'  <div class="plan"><span class="h">{v["titulo"]}</span><dl>{filas}\n  </dl></div>')
        elif k == 'pasos': o.append('  <ol class="steps">\n' + '\n'.join(f'    <li>{p}</li>' for p in v) + '\n  </ol>')
        elif k == 'receta': o.append(f'  <div class="recipe"><b>Receta:</b> {v}</div>')
        elif k == 'enun': o.append(f'  <p class="enun">{v}</p>')
        elif k == 'resultado': o.append(f'  <p class="res-first"><b>Resultado:</b> {v}</p>')
        elif k in ETIQUETAS: o.append(f'  <p><b>{ETIQUETAS[k]}:</b> {v}</p>')
        elif k == 'html': o.append('  ' + v)
        else: raise ValueError('bloque desconocido: ' + k)
    o.append('</details>')
    return '\n'.join(o)


def cargar(codigo):
    d = carpeta(codigo)
    cfg = yaml.safe_load((d / 'tema.yaml').read_text(encoding='utf8'))
    try: ejs = yaml.safe_load((d / 'ejercicios.yaml').read_text(encoding='utf8'))
    except yaml.YAMLError as e:
        raise SystemExit(f'YAML mal formado en {d / "ejercicios.yaml"}: {e}\nConsejo: todo el texto va en bloques literales («campo: |-» y el texto indentado debajo), sin comillas ni escapes.')
    cuerpo = ''.join(f.read_text(encoding='utf8') for f in sorted((d / 'secciones').glob('*.html')))
    return cfg, cuerpo, ejs


# ------------------------------------------------------------------ tablas y enlaces generados desde los datos
MES = {'Ene': 1, 'Feb': 2, 'Sept': 9}


def clave_cronologica(e):
    x = next((f['ref'] for f in e['fuentes'] if f['l'] == 'X'), '')
    m = re.match(r'(Ene|Feb|Sept)\.?\s*(\d{4})', x)
    return (int(m.group(2)), MES[m.group(1)], x) if m else (0, 0, x)


def etiqueta(e):
    """Texto del enlace a un ejercicio: el campo `etiqueta` si existe; si no, se deduce del título (libro, propios) o de la referencia X (examen)."""
    if e.get('etiqueta'): return e['etiqueta']
    t = re.sub(r'<[^>]+>', '', e['titulo'])
    m = re.match(r'(Ejercicio \S+|Ejemplo propio \d+)', t)
    if e['clase'] != 'examen':
        if m: return m.group(1).replace('Ejercicio ', '') if e['clase'] == 'libro' else m.group(1)
        return re.split(r'\s+[—–-]\s+', t)[0][:32]
    x = next((f['ref'] for f in e['fuentes'] if f['l'] == 'X'), t)
    r = re.match(r'(Ene|Feb|Sept)\.?\s*(\d{4})\s*(?:\(([^)]*)\))?,?\s*(.*)', x)
    if not r: return x[:32]
    mes, anio, par, resto = r.groups()
    tipo = re.search(r'tipo ([A-Z]\d?)', par or '')
    sem = re.search(r'(\d)\.ª sem', par or '')
    out = f'{mes}. {anio[2:]}' + (f' {tipo.group(1)}' if tipo else '') + (f' ({sem.group(1)}.ª)' if sem else '')
    resto = re.sub(r'\s*\(.*?\)\s*$', '', resto)
    resto = re.sub(r'^(problema|ejercicio|pregunta)\s*(\d+)', lambda q: {'problema': 'p.', 'ejercicio': 'ej.', 'pregunta': 'preg.'}[q.group(1)] + ' ' + q.group(2), resto)
    return (out + ' ' + resto).strip()


def enlaces(lista): return ' · '.join(f'<a href="#{e["id"]}">{etiqueta(e)}</a>' for e in lista) or '—'


def tabla_que_cae(cfg, ejs):
    ex = [e for e in ejs if e['clase'] == 'examen']
    filas = []
    for t in cfg['tipos']:
        n = [e for e in ex if e.get('problema', [None])[0] == t['id']]
        libro = [e for e in ejs if e['clase'] == 'libro' and t['id'] in e.get('problema', [])]
        filas.append(f'    <tr><td>{t["nombre"]} <small>({len(n)} de {len(ex)})</small></td><td>{t["receta"]}</td>\n      <td>{enlaces(libro)}</td>\n'
                     f'      <td>{enlaces(sorted(n, key=clave_cronologica))}</td></tr>')
    return ('<table class="queCae">\n    <tr><th>Tipo de pregunta</th><th>Receta en una línea</th><th>Libro E</th><th>Examen</th></tr>\n'
            + '\n'.join(filas) + '\n  </table>')


def vinculos(tipo, ejs):
    prop = [e for e in ejs if e['clase'] in ('libro', 'propio') and tipo in e.get('problema', [])]
    prop.sort(key=lambda e: e['clase'] != 'libro')     # primero los del libro, luego los propios (orden de aparición)
    ex = sorted((e for e in ejs if e['clase'] == 'examen' and tipo in e.get('problema', [])), key=clave_cronologica)
    return f'<p class="vinculos"><b>Resueltos del libro:</b> {enlaces(prop)} &nbsp;|&nbsp; <b>De examen:</b> {enlaces(ex)}</p>'


def construir_desde(cfg, pag, ejs):
    por = {e['id']: e for e in ejs}
    usados = set()
    def sub(m):
        usados.add(m.group(1)); return render(por[m.group(1)])
    cuerpo = re.sub(r'\{\{ejercicio:([^}]+)\}\}', sub, pag)
    tabla = tabla_que_cae(cfg, ejs) if cfg.get('tipos') else ''
    if cfg.get('capa'): cfg, cuerpo = capa.aplicar(cfg, cuerpo, ejs, tabla)
    cuerpo = cuerpo.replace('{{que_cae}}', tabla)
    cuerpo = re.sub(r'\{\{vinculos:([^}]+)\}\}', lambda m: vinculos(m.group(1), ejs), cuerpo)
    sobran = set(por) - usados
    if sobran: raise ValueError('ejercicios en el YAML que las secciones no usan: ' + ', '.join(sorted(sobran)))
    return render_pagina(cfg, cuerpo)


def construir_texto(codigo):
    cfg, pag, ejs = cargar(codigo)
    return cfg, construir_desde(cfg, pag, ejs)


# ------------------------------------------------------------------ comparar
class Norm(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.t = []
    def handle_starttag(self, tag, attrs):
        a = [(k, v or '') for k, v in attrs]
        if tag == 'details':   # los ids generados (`sol-…`) no existían en el original
            a = [(k, v) for k, v in a if not (k == 'id' and v.startswith('sol-'))]
        self.t.append(('<' + tag, tuple(sorted(a))))
    def handle_startendtag(self, tag, attrs): self.handle_starttag(tag, attrs)
    def handle_endtag(self, tag): self.t.append(('</' + tag, ()))
    def handle_comment(self, d):
        if not d.strip().startswith('GENERADO'): self.t.append(('#', d.strip()))   # el aviso de «archivo generado» no existía en el original
    def handle_data(self, d): self.t.append(('txt', re.sub(r'\s+', ' ', d).strip()))


def normalizar(s):
    n = Norm(); n.feed(s); n.close()
    return [x for x in n.t if not (x[0] == 'txt' and x[1] == '')]


def primera_diferencia(a, b):
    for i, (x, y) in enumerate(zip(a, b)):
        if x != y: return f'nodo {i}\n  actual : {a[max(0,i-2):i+3]}\n  nuevo  : {b[max(0,i-2):i+3]}'
    return f'distinta longitud {len(a)} vs {len(b)}'


def probar(codigo):
    """Extrae y reconstruye en memoria (no escribe nada) y compara con el HTML actual."""
    try:
        cfg, pag, ejs = extraer_en_memoria(codigo)
        nuevo = construir_desde(cfg, pag, ejs)
    except Exception as e:
        print(f'{codigo}: ERROR al extraer/construir: {e}'); return False
    actual = archivo_tema(codigo).read_text(encoding='utf8')
    a, b = normalizar(actual), normalizar(nuevo)
    if a == b:
        print(f'{codigo}: OK  ({len(ejs)} ejercicios, {len(a)} nodos idénticos)'); return True
    print(f'{codigo}: DIFERENCIA en {primera_diferencia(a, b)}'); return False


def estado(_=None):
    """¿El HTML de cada tema es exactamente lo que se construye desde sus datos? (detecta ediciones a mano del HTML o datos sin reconstruir)"""
    mal = []
    for c in todos_los_temas():
        if not carpeta(c).exists(): print(f'{c}: sin datos (aún editado a mano)'); continue
        cfg, nuevo = construir_texto(c)
        if normalizar((RAIZ / cfg['archivo']).read_text(encoding='utf8')) != normalizar(nuevo): mal.append(c); print(f'{c}: el HTML NO coincide con lo que se construye desde datos/ (¿falta `construir`?)')
    print(f'estado: {len(todos_los_temas()) - len(mal)} de {len(todos_los_temas())} temas sincronizados' + (f'; DESINCRONIZADOS: {", ".join(mal)}' if mal else ''))
    return not mal


def probar_todos(_=None):
    res = {c: probar(c) for c in todos_los_temas()}
    mal = [c for c, v in res.items() if not v]
    print(f'\n{len(res) - len(mal)} de {len(res)} temas pasan sin intervención. Fallan: {", ".join(mal) or "ninguno"}')
    return not mal


def texto_visible(rutas):
    """innerText de cada página tras cargarla en Chrome (KaTeX incluido, todas las pestañas visibles)."""
    from playwright.sync_api import sync_playwright
    out = []
    with sync_playwright() as p:
        br = p.chromium.launch()
        for r in rutas:
            pg = br.new_page(); pg.goto(r.as_uri()); pg.wait_for_timeout(1200)
            pg.evaluate("document.documentElement.setAttribute('data-vista','todo'); document.querySelectorAll('.drill').forEach(e=>e.remove())")  # las series de práctica son aleatorias
            out.append(re.sub(r'\s+', ' ', pg.evaluate('document.body.innerText')).strip()); pg.close()
        br.close()
    return out


def verificar(codigo):
    cfg, nuevo = construir_texto(codigo)
    actual_p = RAIZ / cfg['archivo']
    actual = actual_p.read_text(encoding='utf8')
    a, b = normalizar(actual), normalizar(nuevo)
    ok = a == b
    if ok: print(f'{codigo}: 1) etiquetas, atributos y texto idénticos ({len(a)} nodos)')
    else: print(f'{codigo}: 1) DIFERENCIA en {primera_diferencia(a, b)}')
    try:
        tmp = actual_p.with_name('_verificar_tmp.html'); tmp.write_text(nuevo, encoding='utf8')
        try: ta, tb = texto_visible([actual_p, tmp])
        finally: tmp.unlink()
        if ta == tb: print(f'{codigo}: 2) texto visible en Chrome idéntico ({len(ta)} caracteres)')
        else:
            i = next((k for k, (x, y) in enumerate(zip(ta, tb)) if x != y), min(len(ta), len(tb)))
            print(f'{codigo}: 2) DIFERENCIA de texto visible en {i}: «{ta[max(0,i-40):i+40]}» vs «{tb[max(0,i-40):i+40]}»'); ok = False
    except ImportError:
        print(f'{codigo}: 2) (sin Playwright: omitido)')
    print(f'{codigo}: IDA Y VUELTA ' + ('OK' if ok else 'FALLA'))
    return ok


def construir(codigo):
    cfg, out = construir_texto(codigo)
    (RAIZ / cfg['archivo']).write_text(out, encoding='utf8'); print(f'{codigo}: escrito {cfg["archivo"]}')


# ------------------------------------------------------------------ validar
def validar(codigo):
    cfg, pag, ejs = cargar(codigo)
    err, avisos = [], []
    ids = [e['id'] for e in ejs]
    if len(ids) != len(set(ids)): err.append('ids repetidos: ' + ', '.join(i for i in set(ids) if ids.count(i) > 1))
    marc = re.findall(r'\{\{ejercicio:([^}]+)\}\}', pag)
    if sorted(marc) != sorted(ids): err.append('marcadores de las secciones y registros no coinciden')
    for e in ejs:
        w = e['id']
        for c in ('id', 'clase', 'titulo', 'cuerpo'):
            if not e.get(c): err.append(f'{w}: falta «{c}»')
        nuevo = bool(e.get('pista'))
        if nuevo:
            for c in ('nivel', 'enunciado'):
                if not e.get(c): err.append(f'{w}: formato nuevo sin «{c}»')
            if e.get('nivel') not in (1, 2, 3): err.append(f'{w}: nivel fuera de 1-3')
        elif e.get('nivel') or e.get('enunciado'): err.append(f'{w}: «nivel»/«enunciado» sin «pista» (van juntos)')
        tipos = [next(iter(b)) for b in e.get('cuerpo', [])]
        if nuevo and 'enun' in tipos: err.append(f'{w}: formato nuevo con bloque «enun» en el cuerpo')
        if not nuevo and 'enun' not in tipos: avisos.append(f'{w}: sin enunciado')
        if 'pasos' not in tipos: avisos.append(f'{w}: sin bloque «pasos»')
        if e.get('clase') == 'examen' and not any(f['l'] == 'X' for f in e.get('fuentes', [])): err.append(f'{w}: un ejercicio de examen necesita fuente X')
        if not e.get('fuentes'): avisos.append(f'{w}: sin fuentes')
        if re.search(r'errata|solucionario|la oficial', ' '.join(str(v) for v in e.values()), re.I): avisos.append(f'{w}: menciona erratas o la solución oficial (regla 8 bis)')
    n = {c: sum(1 for e in ejs if e['clase'] == c) for c in ('libro', 'propio', 'examen')}
    print(f'{codigo}: {len(ejs)} ejercicios {n}; errores: {len(err)}; avisos: {len(avisos)}')
    for x in err: print('  - ERROR', x)
    for x in avisos[:15]: print('  - aviso', x)
    return not err


def contar(s): return dict(sol=len(re.findall(r'<details class="sol"', s)), ex=len(set(re.findall(r'id="(ex-[^"]+)"', s))), ids=len(re.findall(r'<details class="sol"[^>]* id=', s)))


def migrar(codigo):
    """extraer → validar → verificar (con Chrome) → construir → comprobar que no se pierde ningún ejercicio. Si algo falla restaura el HTML."""
    ruta = archivo_tema(codigo); antes = ruta.read_text(encoding='utf8'); c0 = contar(antes)
    extraer(codigo)
    if not validar(codigo) or not verificar(codigo): print(f'{codigo}: MIGRACIÓN ABORTADA (el HTML no se ha tocado)'); return False
    construir(codigo)
    c1 = contar(ruta.read_text(encoding='utf8'))
    if c1['sol'] != c0['sol'] or c1['ex'] != c0['ex']:
        ruta.write_text(antes, encoding='utf8'); print(f'{codigo}: SE PERDERÍAN EJERCICIOS {c0} -> {c1}; HTML restaurado'); return False
    print(f'{codigo}: MIGRADO. details.sol {c0["sol"]}→{c1["sol"]}, ejercicios de examen {c0["ex"]}→{c1["ex"]}, soluciones con id {c0["ids"]}→{c1["ids"]}')
    return True


ORDENES = {'estado': estado, 'plantilla': crear_plantilla, 'migrar': migrar, 'extraer': extraer, 'construir': construir, 'verificar': verificar, 'validar': validar, 'probar': lambda c: probar_todos() if c == 'todos' else probar(c)}

if __name__ == '__main__':
    if len(sys.argv) != 3 or sys.argv[1] not in ORDENES: sys.exit(__doc__)
    ok = ORDENES[sys.argv[1]](sys.argv[2])
    sys.exit(0 if ok in (None, True) else 1)
