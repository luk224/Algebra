"""Capa pedagógica generada desde `datos/X_Y/tema.yaml`: «Lo esencial», «Qué cae», fichas por tipo con prácticas y autoevaluación.

Se activa con `capa: true` en tema.yaml. Entonces `datos_tema.construir_desde`:
  - añade a la carcasa `pedagogia.css/js` (y `practica.js` si hay series), `class="pilot"` y `data-vista` en cada <h2>;
  - inserta al principio del cuerpo las cajas «Lo esencial en 5 minutos» y «Qué cae en el examen» (si hay `esencial` / `tipos`);
  - inserta la sección «Por tipo de problema» antes de la de ejercicios;
  - añade la autoevaluación (`quiz`) al final del cuerpo.

Esquema en tema.yaml (todo HTML con LaTeX, en bloques literales):
  capa: true
  esencial:  {intro: HTML, items: [HTML, …]}
  que_cae_nota: HTML                 (opcional; párrafo pequeño bajo la tabla)
  tipos:                              (cada tipo = una fila de la tabla y una ficha)
    - id, nombre, receta              (fila de la tabla «Qué cae»)
      titulo_ficha                    (opcional; por defecto = nombre)
      senal: HTML                     «Cómo lo reconoces»
      pasos: [HTML, …]
      ejemplo: HTML                   «Ejemplo relámpago»
      fallos: HTML                    «Dónde se falla»
      series: [{tipo, titulo, n}]     (opcional) series de práctica de assets/practica.js
  quiz:      [{p: HTML, opciones: [{t: HTML, ok: true|false, why: HTML}], fb: HTML}]
"""
import pathlib, re
import yaml

RAIZ = pathlib.Path(__file__).resolve().parent.parent

VISTA = {'ejercicios': 'ejercicios', 'examenes': 'examen', 'tipos': 'tipos'}   # el resto de <h2> es teoría


def activar(cfg):
    """Devuelve una copia de cfg con la carcasa de la capa (clase, css y js)."""
    c = dict(cfg)
    c['html_class'] = 'class="pilot"'
    c['css'] = list(cfg['css']) + [x for x in ('pedagogia.css',) if x not in cfg['css']]
    js = list(cfg['js'])
    for x in ('pedagogia.js',) + (('practica.js',) if any(t.get('series') for t in cfg.get('tipos', [])) else ()):
        if x not in js: js.append(x)
    c['js'] = js
    return c


def con_vistas(cuerpo):
    def f(m):
        if 'data-vista' in m.group(0): return m.group(0)
        v = VISTA.get(m.group(1), 'teoria')
        return f'<h2 id="{m.group(1)}" data-vista="{v}"{m.group(2)}>'
    return re.sub(r'<h2 id="([^"]+)"([^>]*)>', f, cuerpo)


def atascas(cfg):
    """Caja «Si te atascas, vuelve a…» (aprendizaje en espiral): de qué temas depende este y qué temas lo usan después. Datos: datos/dependencias.yaml."""
    f = RAIZ / 'datos' / 'dependencias.yaml'
    if not f.exists(): return ''
    dep = yaml.safe_load(f.read_text(encoding='utf8'))['dep']
    cod = cfg['codigo']
    antes = dep.get(cod, [])
    despues = [c for c, ds in dep.items() if cod in ds]
    def enlace(c):
        t = yaml.safe_load((RAIZ / 'datos' / c.replace('.', '_') / 'tema.yaml').read_text(encoding='utf8'))
        return f'<a href="{pathlib.Path(t["archivo"]).name}"><b>{c}</b> {re.sub(r"^[0-9]+[.][0-9]+ ", "", t["titulo"])}</a>'
    if not antes and not despues: return ''
    o = '<div class="box tip"><span class="h">Si te atascas, vuelve a…</span>'
    if antes: o += '\n  <p><b>Este tema usa lo de:</b> ' + ' · '.join(enlace(c) for c in antes) + '. Si un paso no lo entiendes, repasa primero ese tema.</p>'
    if despues: o += '\n  <p><b>Después te servirá en:</b> ' + ' · '.join(enlace(c) for c in despues) + '.</p>'
    return o + '\n</div>\n\n'


def esencial(cfg):
    e = cfg.get('esencial')
    if not e: return ''
    li = '\n'.join(f'    <li>{x}</li>' for x in e['items'])
    return f'<div class="box esencial"><span class="h">Lo esencial en 5 minutos</span>\n  <p>{e["intro"]}</p>\n  <ol>\n{li}\n  </ol>\n</div>\n\n'


def que_cae(cfg, ejs, tabla):
    if not cfg.get('tipos'): return ''
    ex = [e for e in ejs if e['clase'] == 'examen']
    lib = [e for e in ejs if e['clase'] == 'libro']
    n = len(cfg['tipos'])
    txt = (f'En los exámenes de otros años hay <b>{len(ex)} ejercicios</b> de este tema (resueltos en la pestaña <b>Examen</b>) y '
           f'{len(lib)} en el libro de ejercicios (pestaña <b>Ejercicios</b>). Se reparten en {n} tipos; '
           'cada uno tiene su ficha y su práctica en la pestaña <b>Por tipo</b>:')
    nota = f'\n  <p><small>{cfg["que_cae_nota"]}</small></p>' if cfg.get('que_cae_nota') else ''
    return f'<div class="box tip"><span class="h">Qué cae en el examen de este tema</span>\n  <p>{txt}</p>\n  {tabla}{nota}\n</div>\n\n'


def tipos(cfg):
    if not cfg.get('tipos'): return ''
    o = ['<h2 id="tipos" data-vista="tipos"><span class="n">P</span>Por tipo de problema: método y práctica</h2>\n',
         '<p>En el examen no te preguntan «el apartado ' + cfg['codigo'] + '»: te dan un problema y tienes que reconocer <b>de qué tipo es</b> y aplicar su método. '
         'Cada tipo tiene su <b>ficha</b> (cuándo se usa, pasos, error típico)'
         + (', una <b>serie de práctica</b> con ejercicios que cambian cada vez y se corrigen al instante' if any(t.get('series') for t in cfg['tipos']) else '')
         + ' y los <b>ejercicios resueltos</b> de ese tipo, del libro y de examen.</p>\n']
    for i, t in enumerate(cfg['tipos'], 1):
        pasos = '\n'.join(f'    <li>{p}</li>' for p in t['pasos'])
        ser = ''.join(f'  <div class="drill" data-tipo="{s["tipo"]}" data-titulo="{s["titulo"]}" data-n="{s.get("n", 5)}"></div>\n' for s in t.get('series', []))
        o.append(f'<section class="ficha" id="tipo-{t["id"]}">\n  <h3>Tipo {i} — {t.get("titulo_ficha", t["nombre"])}</h3>\n'
                 f'  <p class="senal"><b>Cómo lo reconoces:</b> {t["senal"]}</p>\n  <ol class="pasos">\n{pasos}\n  </ol>\n'
                 f'  <div class="rel"><b>Ejemplo relámpago.</b> {t["ejemplo"]}</div>\n  <p class="fallos"><b>Dónde se falla:</b> {t["fallos"]}</p>\n{ser}'
                 f'  {{{{vinculos:{t["id"]}}}}}\n</section>\n')
    return '\n'.join(o) + '\n'


def quiz(cfg):
    q = cfg.get('quiz')
    if not q: return ''
    o = ['<div class="quiz"><span class="h">Autoevaluación: ¿lo has entendido?</span>']
    for x in q:
        li = ''.join(f'<li data-ok>{op["t"]}</li>' if op.get('ok') else f'<li>{op["t"]}<span class="why">{op["why"]}</span></li>' for op in x['opciones'])
        o.append(f'  <div class="qp"><p>{x["p"]}</p>\n    <ul class="opts">{li}</ul>\n    <p class="fb">{x["fb"]}</p></div>')
    o.append('  <p class="score">Elige una opción en cada pregunta. </p><button type="button" class="reset">Reiniciar</button>\n</div>\n')
    return '\n'.join(o)


def ampliaciones(cuerpo):
    """Pliega en «Ampliación» los párrafos de demostración o prueba (nivel 3: se pueden saltar en una primera lectura)."""
    pat = re.compile(r'<p>(?:<i>|<b>)(Demostraci[oó]n|Prueba|Idea de la prueba)(.*?)</p>', re.S)
    def f(m):
        return '<details class="ampl"><summary>Ampliación: ' + m.group(1).lower() + ' (se puede saltar en una primera lectura)</summary>\n' + m.group(0) + '\n</details>'
    return pat.sub(f, cuerpo)


def _cajas(sec):
    """Posiciones (inicio, fin, clase, encabezado) de las <div class="box …"> de primer nivel de un fragmento (con anidación real de <div>)."""
    out, i = [], 0
    while True:
        m = re.compile(r'<div class="box (\w+)"[^>]*>').search(sec, i)
        if not m: return out
        depth, fin = 0, None
        for x in re.finditer(r'<(/?)div\b', sec[m.start():]):
            depth += -1 if x.group(1) else 1
            if depth == 0: fin = sec.index('>', m.start() + x.end() - 1) + 1; break
        if fin is None: return out
        h = re.search(r'<span class="h">(.*?)</span>', sec[m.start():fin], re.S)
        out.append((m.start(), fin, m.group(1), re.sub(r'<[^>]+>', '', h.group(1)) if h else ''))
        i = fin


def tarjetas(cuerpo):
    """Primera lectura más corta: en cada apartado de teoría se mantienen visibles la intuición, las definiciones, los teoremas, los errores
    típicos, las animaciones y el primer ejemplo; los demás ejemplos y los «trucos» se pliegan en «Más ejemplos y trucos»."""
    partes = re.split(r'(?=<h2 id=")', cuerpo)
    res = []
    for p in partes:
        m = re.match(r'<h2 id="([^"]+)"', p)
        if not m or m.group(1) in ('prereq', 'chuleta', 'ejercicios', 'examenes', 'tipos', 'fuentes'): res.append(p); continue
        cajas = _cajas(p); vistos_ex = 0; plegar = []
        for (a, b, k, h) in cajas:
            es_anim = bool(re.search(r'anim-|d3-|sarrus-demo|<figure|<svg', p[a:b])) or bool(re.search(r'animaci|interactivo|laboratorio', h, re.I))
            if k == 'ex' and not es_anim:
                vistos_ex += 1
                if vistos_ex > 1: plegar.append((a, b))
            elif k == 'tip' and not es_anim: plegar.append((a, b))
        # agrupar cajas contiguas (solo espacio entre ellas)
        grupos = []
        for a, b in plegar:
            if grupos and p[grupos[-1][1]:a].strip() == '': grupos[-1][1] = b; grupos[-1][2] += 1
            else: grupos.append([a, b, 1])
        for a, b, n in reversed(grupos):
            p = p[:a] + f'<details class="ampl"><summary>Más ejemplos y trucos ({n})</summary>\n' + p[a:b] + '\n</details>' + p[b:]
        res.append(p)
    return ''.join(res)


def motivacion(cfg, cuerpo):
    """Pregunta motivadora tras cada <h2> de teoría (`motivacion: {id_seccion: texto}`) y consigna tras el encabezado de cada animación
    (`consignas: [{animacion: texto del encabezado, consigna: …, pregunta: …}]`)."""
    for sid, txt in (cfg.get('motivacion') or {}).items():
        pat = re.compile(r'(<h2 id="%s"[^>]*>.*?</h2>)' % re.escape(sid), re.S)
        assert pat.search(cuerpo), f'motivacion: no existe la sección {sid}'
        cuerpo = pat.sub(lambda m: m.group(1) + f'\n<p class="motiva"><b>❓ Para empezar:</b> {txt}</p>', cuerpo, count=1)
    for c in cfg.get('consignas') or []:
        pat = re.compile(r'(<span class="h">[^<]*' + re.escape(c['animacion']) + r'[^<]*</span>)')
        assert len(pat.findall(cuerpo)) == 1, f'consignas: «{c["animacion"]}» aparece {len(pat.findall(cuerpo))} veces'
        extra = f' <b>Responde observando:</b> {c["pregunta"]}' if c.get('pregunta') else ''
        cuerpo = pat.sub(lambda m: m.group(1) + f'\n  <p class="consigna"><b>🔎 Qué mirar:</b> {c["consigna"]}{extra}</p>', cuerpo, count=1)
    return cuerpo


def aplicar(cfg, cuerpo, ejs, tabla):
    """Devuelve (cfg con carcasa de la capa, cuerpo con las piezas insertadas)."""
    cuerpo = ampliaciones(motivacion(cfg, cuerpo))
    if cfg.get('tarjetas'): cuerpo = tarjetas(cuerpo)
    cuerpo = con_vistas(cuerpo)
    pre = atascas(cfg) + esencial(cfg) + que_cae(cfg, ejs, tabla)
    t = tipos(cfg)
    if t:
        m = re.search(r'(?:<!--[^\n]*-->[ \t]*\n(?:[ \t]*\n)*)?<h2 id="ejercicios"', cuerpo)
        cuerpo = cuerpo[:m.start()] + t + cuerpo[m.start():]
    return activar(cfg), pre + cuerpo + quiz(cfg)
