"""Registro global de ejercicios de examen (fuente X) y validación entre temas.

    ~/venv/bin/python herramientas/examenes.py          regenera datos/examenes.yaml y valida (código de salida 1 si hay errores)

El registro se deduce de `datos/X_Y/ejercicios.yaml` (clase «examen»): un registro por ejercicio con el tema donde se desarrolla.
No se edita a mano. Comprueba:
  - (tema, id) único; ojo: el mismo id puede repetirse en varios temas porque designa el examen y cada tema desarrolla una pregunta distinta;
  - cada ejercicio de examen tiene fuente X con convocatoria reconocible;
  - `desarrollo: completo` si la solución tiene pasos y `enlace` si solo resume y remite a otro tema (solo se cuentan los completos);
  - avisa de referencias iguales (misma convocatoria y pregunta) repartidas en más de un tema: pueden ser partes legítimas
    de un mismo ejercicio (p. ej. «apartados 1.º y 2.º» aquí y el 3.º en otro tema) o un duplicado; hay que mirarlas.
"""
import re, sys, pathlib, collections
import yaml
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import datos_tema as D

RAIZ = D.RAIZ
MES = {'Ene': 1, 'Feb': 2, 'Sept': 9}


def texto(h): return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', h)).strip()


def cargar_todo():
    out = []
    for d in sorted((RAIZ / 'datos').glob('[1-9]_[1-9]')):
        cod = d.name.replace('_', '.')
        for e in yaml.safe_load((d / 'ejercicios.yaml').read_text(encoding='utf8')):
            out.append((cod, e))
    return out


def construir_registro():
    reg, err = [], []
    for cod, e in cargar_todo():
        if e['clase'] != 'examen': continue
        x = next((f for f in e['fuentes'] if f['l'] == 'X'), None)
        if not x: err.append(f'{cod} {e["id"]}: sin fuente X'); continue
        m = re.match(r'(Ene|Feb|Sept)\.?\s*(\d{4})', x['ref'])
        if not m: err.append(f'{cod} {e["id"]}: convocatoria no reconocible en «{x["ref"]}»'); continue
        completo = any('pasos' in b or 'redaccion' in b for b in e['cuerpo'])   # con desarrollo paso a paso; si no, es un enlace o un resumen que remite a otro tema
        r = dict(id=e['id'], tema=cod, convocatoria=f'{m.group(2)}-{MES[m.group(1)]:02d}', referencia=x['ref'], titulo=texto(e['titulo']), desarrollo='completo' if completo else 'enlace')
        if e.get('problema'): r['problema'] = e['problema']
        reg.append(r)
    reg.sort(key=lambda r: (r['convocatoria'], r['referencia'], r['id']))
    return reg, err


def validar(reg, err):
    # el mismo id puede existir en varios temas (es el examen; cada tema desarrolla una pregunta distinta): la clave es (tema, id)
    claves = collections.Counter((r['tema'], r['id']) for r in reg)
    for (t, i), n in claves.items():
        if n > 1: err.append(f'id de examen repetido dentro del tema {t}: {i}')
    aviso = []
    refs = collections.defaultdict(list)
    for r in reg:
        if r['desarrollo'] != 'completo': continue
        base = re.sub(r'\s*\(.*?\)\s*$', '', r['referencia'])   # sin el «(1.º y 2.º)» final
        if re.search(r'(ejercicio|pregunta|problema)\s*\d', base): refs[base].append(r)   # solo preguntas concretas (con número)
    for base, rs in refs.items():
        temas = sorted({r['tema'] for r in rs})
        if len(temas) > 1: aviso.append(f'«{base}» aparece en los temas {", ".join(temas)} ({", ".join(r["id"] for r in rs)})')
    return aviso


if __name__ == '__main__':
    reg, err = construir_registro()
    aviso = validar(reg, err)
    (RAIZ / 'datos' / 'examenes.yaml').write_text(D.volcar(reg), encoding='utf8')
    por_tema = collections.Counter(r['tema'] for r in reg if r['desarrollo'] == 'completo')
    enl = [f'{r["tema"]} {r["id"]}' for r in reg if r['desarrollo'] != 'completo']
    print(f'{len(reg)} entradas de examen; {sum(por_tema.values())} desarrolladas paso a paso en {len(por_tema)} temas; {len(enl)} solo enlace/resumen ({", ".join(enl)}); errores: {len(err)}; referencias repartidas entre temas (revisar): {len(aviso)}')
    for e in err: print('  - ERROR', e)
    for a in aviso[:25]: print('  - aviso', a)
    sys.exit(1 if err else 0)
