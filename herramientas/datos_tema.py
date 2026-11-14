"""Temas como datos + plantilla (piloto: tema 2.3).

    python herramientas/datos_tema.py extraer 2.3     HTML actual  ->  datos/2_3/{tema.yaml, pagina.html, ejercicios.yaml}
    python herramientas/datos_tema.py construir 2.3   datos        ->  HTML del tema (temas/…)
    python herramientas/datos_tema.py verificar 2.3   construye en memoria y compara con el HTML actual (ida y vuelta):
                                                      1) mismas etiquetas, atributos y texto  2) mismo texto visible en Chrome (si hay Playwright)
    python herramientas/datos_tema.py validar 2.3     reglas de contenido (ids únicos, campos obligatorios, ejercicios de examen)

Cada tema se guarda en `datos/X_Y/`:
  tema.yaml        código y nombre del fichero HTML de salida
  pagina.html      el HTML del tema con cada ejercicio sustituido por un marcador {{ejercicio:ID}}
                   (la teoría sigue siendo HTML con LaTeX, como siempre)
  ejercicios.yaml  un registro por ejercicio: enunciado, pista, nivel, plan, pasos, receta… (ver ESQUEMA abajo)
El HTML de `temas/` es ahora un producto generado: se edita el dato o la plantilla y se reconstruye.

ESQUEMA de un ejercicio (ejercicios.yaml es una lista de estos registros):
  id        identificador único (ancla de enlace): ej2-23, ep1, ex-feb26…
  clase     libro | propio | examen
  nivel     1, 2 ó 3 (★☆☆ básico, ★★☆ nivel examen, ★★★ difícil)
  titulo    HTML del título (sin estrellas ni fuentes)
  fuentes   lista de {l: U|E|L|A|X|P, ref: texto del tooltip, texto: etiqueta visible}
  enunciado HTML del enunciado (sin spoilers)
  pista     HTML de la pista
  cuerpo    lista ordenada de bloques; cada bloque es UNA de estas claves:
              plan:     {titulo, filas: [[«Qué me piden», «…»], …]}
              pasos:    [HTML de cada paso]
              receta:   HTML tras «Receta:»
              resultado / error / teoria:  HTML tras la etiqueta «Resultado:» / «Error típico:» / «Teoría:»
              html:     HTML libre (cualquier otro párrafo)
"""
import re, sys, pathlib, html as _html
from html.parser import HTMLParser
import yaml

RAIZ = pathlib.Path(__file__).resolve().parent.parent
NOMBRE_NIVEL = {1: 'básico', 2: 'nivel examen', 3: 'difícil'}
ETIQUETAS = {'resultado': 'Resultado', 'error': 'Error típico', 'teoria': 'Teoría'}
TAG = re.compile(r'<(/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(/?)>')
VOID = {'br', 'img', 'hr', 'input', 'meta', 'link'}


def carpeta(codigo): return RAIZ / 'datos' / codigo.replace('.', '_')


def top_level(body):
    """Divide un fragmento HTML en sus elementos de primer nivel: [(etiqueta, atributos, html_exterior, html_interior)]."""
    out, depth, start, pos, cur = [], 0, None, 0, None
    for m in TAG.finditer(body):
        cl, name, attrs, selfc = m.groups()
        if name.lower() in VOID or selfc:
            if depth == 0: raise ValueError('elemento vacío a nivel superior: ' + m.group(0))
            continue
        if not cl:
            if depth == 0:
                if body[pos:m.start()].strip(): raise ValueError('texto suelto a nivel superior: ' + body[pos:m.start()].strip()[:60])
                start, cur, ini = m.start(), (name, attrs), m.end()
            depth += 1
        else:
            depth -= 1
            if depth == 0:
                out.append((cur[0], cur[1], body[start:m.end()], body[ini:m.start()])); pos = m.end()
    if body[pos:].strip(): raise ValueError('texto suelto al final: ' + body[pos:].strip()[:60])
    return out


# ------------------------------------------------------------------ extraer
def parse_bloque(txt):
    m = re.fullmatch(r'<div class="ejer-enun"><span class="lbl">Enunciado</span><p class="enun">(.*?)</p></div>\s*'
                     r'<details class="pista"><summary>Pista \(inténtalo antes de abrir la solución\)</summary><p>(.*?)</p></details>\s*'
                     r'<details class="sol" id="([^"]+)">(<summary>.*?</summary>)(.*)\n</details>', txt, re.S)
    if not m: raise ValueError('bloque de ejercicio con formato inesperado: ' + txt[:120])
    enun, pista, id_, summ, cuerpo = m.groups()
    sm = re.fullmatch(r'<summary><span class="nivel" title="[^"]*">([★☆]+)</span>(.*?)((?:\s*<span class="src"[^>]*>[^<]*</span>)*)\s*</summary>', summ, re.S)
    if not sm: raise ValueError('summary inesperado en ' + id_)
    nivel = sm.group(1).count('★')
    fuentes = [dict(l=a, ref=_html.unescape(b) if False else b, texto=c) for a, b, c in
               re.findall(r'<span class="src" data-l="([^"]*)" data-ref="([^"]*)">([^<]*)</span>', sm.group(3))]
    items = []
    for tag, attrs, ext, inner in top_level(cuerpo):
        if tag == 'div' and 'class="plan"' in attrs:
            h = re.fullmatch(r'<span class="h">(.*?)</span><dl>(.*)</dl>', inner.strip(), re.S)
            filas = [[a.strip(), b.strip()] for a, b in re.findall(r'<dt>(.*?)</dt>\s*<dd>(.*?)</dd>', h.group(2), re.S)]
            items.append({'plan': {'titulo': h.group(1), 'filas': filas}})
        elif tag == 'ol' and attrs.strip() == 'class="steps"':
            li = top_level(inner)
            if any(t != 'li' or a.strip() for t, a, _, _ in li): raise ValueError('li con atributos en ' + id_)
            items.append({'pasos': [i.strip() for _, _, _, i in li]})
        elif tag == 'div' and 'class="recipe"' in attrs:
            r = re.fullmatch(r'\s*<b>Receta:</b>\s*(.*)', inner, re.S)
            if not r: raise ValueError('receta inesperada en ' + id_)
            items.append({'receta': r.group(1).strip()})
        elif tag == 'p' and not attrs.strip():
            lab = re.fullmatch(r'\s*<b>(Resultado|Error típico|Teoría):</b>\s*(.*)', inner, re.S)
            if lab:
                clave = {v: k for k, v in ETIQUETAS.items()}[lab.group(1)]
                items.append({clave: lab.group(2).strip()})
            else: items.append({'html': ext.strip()})
        else:
            items.append({'html': ext.strip()})
    clase = 'examen' if id_.startswith('ex-') else ('propio' if id_.startswith('ep') else 'libro')
    return dict(id=id_, clase=clase, nivel=nivel, titulo=sm.group(2).strip(), fuentes=fuentes,
                enunciado=enun.strip(), pista=pista.strip(), cuerpo=items)


def extraer(codigo):
    cfg = {'2.3': 'temas/tema_2_3_bases_dimension_coordenadas.html'}
    archivo = cfg.get(codigo) or next(str(p.relative_to(RAIZ)) for p in (RAIZ / 'temas').glob(f'tema_{codigo.replace(".", "_")}_*.html'))
    s = (RAIZ / archivo).read_text(encoding='utf8')
    bloques = list(re.finditer(r'<div class="ejer-enun">.*?\n</details>', s, re.S))
    ejs, esqueleto, ult = [], [], 0
    for m in bloques:
        e = parse_bloque(m.group(0)); ejs.append(e)
        esqueleto.append(s[ult:m.start()] + '{{ejercicio:%s}}' % e['id']); ult = m.end()
    esqueleto.append(s[ult:])
    d = carpeta(codigo); d.mkdir(parents=True, exist_ok=True)
    (d / 'pagina.html').write_text(''.join(esqueleto), encoding='utf8')
    (d / 'tema.yaml').write_text(volcar({'codigo': codigo, 'archivo': archivo}), encoding='utf8')
    (d / 'ejercicios.yaml').write_text(volcar(ejs), encoding='utf8')
    print(f'{codigo}: {len(ejs)} ejercicios -> {d.relative_to(RAIZ)}/')


def volcar(obj):
    class D(yaml.SafeDumper): pass
    def rep(dum, v):
        v = '\n'.join(l.rstrip() for l in v.split('\n'))
        # bloque literal («|-») para todo el texto salvo identificadores cortos: se edita a mano sin escapar nada
        simple = re.fullmatch(r'[A-Za-z0-9_.\-]{1,24}', v) is not None
        return dum.represent_scalar('tag:yaml.org,2002:str', v, style=None if simple else '|')
    D.add_representer(str, rep)
    return yaml.dump(obj, Dumper=D, allow_unicode=True, sort_keys=False, width=10**6)


# ------------------------------------------------------------------ construir
def render(e):
    est = '★' * e['nivel'] + '☆' * (3 - e['nivel'])
    src = ''.join(f' <span class="src" data-l="{f["l"]}" data-ref="{f["ref"]}">{f["texto"]}</span>' for f in e['fuentes'])
    o = [f'<div class="ejer-enun"><span class="lbl">Enunciado</span><p class="enun">{e["enunciado"]}</p></div>',
         f'<details class="pista"><summary>Pista (inténtalo antes de abrir la solución)</summary><p>{e["pista"]}</p></details>',
         f'<details class="sol" id="{e["id"]}"><summary><span class="nivel" title="Dificultad: {NOMBRE_NIVEL[e["nivel"]]}">{est}</span>{e["titulo"]}{src}</summary>']
    for b in e['cuerpo']:
        (k, v), = b.items()
        if k == 'plan':
            filas = ''.join(f'\n    <dt>{a}</dt><dd>{c}</dd>' for a, c in v['filas'])
            o.append(f'  <div class="plan"><span class="h">{v["titulo"]}</span><dl>{filas}\n  </dl></div>')
        elif k == 'pasos':
            o.append('  <ol class="steps">\n' + '\n'.join(f'    <li>{p}</li>' for p in v) + '\n  </ol>')
        elif k == 'receta': o.append(f'  <div class="recipe"><b>Receta:</b> {v}</div>')
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
    return cfg, (d / 'pagina.html').read_text(encoding='utf8'), ejs


def construir_texto(codigo):
    cfg, pag, ejs = cargar(codigo)
    por = {e['id']: e for e in ejs}
    usados = set()
    def sub(m):
        usados.add(m.group(1)); return render(por[m.group(1)])
    out = re.sub(r'\{\{ejercicio:([^}]+)\}\}', sub, pag)
    sobran = set(por) - usados
    if sobran: raise ValueError('ejercicios en el YAML que la plantilla no usa: ' + ', '.join(sorted(sobran)))
    return cfg, out


# ------------------------------------------------------------------ verificar (ida y vuelta)
class Norm(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.t = []
    def handle_starttag(self, tag, attrs): self.t.append(('<' + tag, tuple(sorted((k, v or '') for k, v in attrs))))
    def handle_startendtag(self, tag, attrs): self.handle_starttag(tag, attrs)
    def handle_endtag(self, tag): self.t.append(('</' + tag, ()))
    def handle_comment(self, d): self.t.append(('#', d.strip()))
    def handle_data(self, d):
        d = re.sub(r'\s+', ' ', d)
        if d.strip(): self.t.append(('txt', d.strip() if False else d))


def normalizar(s):
    n = Norm(); n.feed(s); n.close()
    out = []
    for k, v in n.t:   # el espacio al borde de un nodo de texto solo importa pegado a otro texto o a etiquetas en línea; se recorta
        out.append((k, v.strip() if k == 'txt' else v))
    return [x for x in out if not (x[0] == 'txt' and x[1] == '')]


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
    if ok:
        print(f'{codigo}: 1) etiquetas, atributos y texto idénticos ({len(a)} nodos)')
    else:
        for i, (x, y) in enumerate(zip(a, b)):
            if x != y:
                print(f'{codigo}: DIFERENCIA en el nodo {i}\n  actual : {a[max(0,i-2):i+3]}\n  nuevo  : {b[max(0,i-2):i+3]}'); break
        else: print(f'{codigo}: distinta longitud {len(a)} vs {len(b)}')
    try:
        tmp = actual_p.with_name('_verificar_tmp.html'); tmp.write_text(nuevo, encoding='utf8')
        try: ta, tb = texto_visible([actual_p, tmp])
        finally: tmp.unlink()
        if ta == tb: print(f'{codigo}: 2) texto visible en Chrome idéntico ({len(ta)} caracteres)')
        else:
            i = next(k for k, (x, y) in enumerate(zip(ta, tb)) if x != y) if any(x != y for x, y in zip(ta, tb)) else min(len(ta), len(tb))
            print(f'{codigo}: 2) DIFERENCIA de texto visible en {i}: «{ta[i-40:i+40]}» vs «{tb[i-40:i+40]}»'); ok = False
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
    err = []
    ids = [e['id'] for e in ejs]
    if len(ids) != len(set(ids)): err.append('ids repetidos: ' + ', '.join(i for i in set(ids) if ids.count(i) > 1))
    marc = re.findall(r'\{\{ejercicio:([^}]+)\}\}', pag)
    if sorted(marc) != sorted(ids): err.append('marcadores de la plantilla y registros no coinciden')
    for e in ejs:
        w = e['id']
        for c in ('id', 'clase', 'nivel', 'titulo', 'fuentes', 'enunciado', 'pista', 'cuerpo'):
            if not e.get(c): err.append(f'{w}: falta «{c}»')
        if e.get('nivel') not in (1, 2, 3): err.append(f'{w}: nivel fuera de 1-3')
        tipos = [next(iter(b)) for b in e.get('cuerpo', [])]
        for t in ('plan', 'pasos') if e.get('clase') != 'examen' or w != 'ex-feb18a' else ('plan',):
            if t not in tipos: err.append(f'{w}: falta el bloque «{t}»')
        if e.get('clase') == 'examen' and not any(f['l'] == 'X' for f in e.get('fuentes', [])): err.append(f'{w}: un ejercicio de examen necesita fuente X')
        if re.search(r'errata|solucionario|la oficial', ' '.join(str(v) for v in e.values()), re.I): err.append(f'{w}: menciona erratas o la solución oficial (regla 8 bis)')
    n = {c: sum(1 for e in ejs if e['clase'] == c) for c in ('libro', 'propio', 'examen')}
    print(f'{codigo}: {len(ejs)} ejercicios {n}; errores: {len(err)}')
    for x in err: print('  -', x)
    return not err


if __name__ == '__main__':
    if len(sys.argv) != 3 or sys.argv[1] not in ('extraer', 'construir', 'verificar', 'validar'):
        sys.exit(__doc__)
    ok = {'extraer': extraer, 'construir': construir, 'verificar': verificar, 'validar': validar}[sys.argv[1]](sys.argv[2])
    sys.exit(0 if ok in (None, True) else 1)
