"""Ayudantes para aplicar correcciones puntuales a `datos/X_Y/{tema,ejercicios}.yaml` (carga, modifica y vuelca con `datos_tema.volcar`).

    import parche as P
    P.setf('1.4', 'ej', 'ex-feb19pb', 'enunciado', 'texto nuevo')        # reemplaza un campo de un ejercicio
    P.rep('1.4', 'ej', 'ex-feb20b', 'texto viejo', 'texto nuevo')        # reemplaza una subcadena en cualquier texto del ejercicio (incluido el cuerpo)
    P.drop('3.1', 'ej3-3', 'Además se pierde un «≠»')                    # elimina el bloque `html` del cuerpo que contenga ese texto
    P.rep('1.4', 'tema', None, 'viejo', 'nuevo')                           # lo mismo sobre tema.yaml
    P.settema('2.1', 'que_cae_nota', 'texto')                              # campo de primer nivel de tema.yaml
Todas fallan con AssertionError si el texto viejo no existe (para no aplicar a ciegas). Después: `construir_todo.py --sin-practica`.
"""
import pathlib, sys
import yaml
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import datos_tema as D


def _cargar(t, que):
    f = D.carpeta(t) / ('tema.yaml' if que == 'tema' else 'ejercicios.yaml')
    return f, yaml.safe_load(f.read_text(encoding='utf8'))


def _guardar(f, obj): f.write_text(D.volcar(obj), encoding='utf8')


def _reemplaza(x, viejo, nuevo, cont):
    if isinstance(x, str):
        if viejo in x: cont[0] += 1; return x.replace(viejo, nuevo)
        return x
    if isinstance(x, list): return [_reemplaza(i, viejo, nuevo, cont) for i in x]
    if isinstance(x, dict): return {k: _reemplaza(v, viejo, nuevo, cont) for k, v in x.items()}
    return x


def rep(t, que, id_, viejo, nuevo):
    f, obj = _cargar(t, que)
    cont = [0]
    if que == 'tema': obj = _reemplaza(obj, viejo, nuevo, cont)
    else:
        for i, e in enumerate(obj):
            if e['id'] == id_: obj[i] = _reemplaza(e, viejo, nuevo, cont)
    assert cont[0] >= 1, f'{t} {id_}: no se encuentra «{viejo[:60]}»'
    _guardar(f, obj)


def setf(t, que, id_, campo, valor):
    f, obj = _cargar(t, que)
    e = next(x for x in obj if x['id'] == id_)
    assert campo in e, f'{t} {id_}: no existe el campo {campo}'
    e[campo] = valor
    _guardar(f, obj)


def drop(t, id_, contiene):
    f, obj = _cargar(t, 'ej')
    e = next(x for x in obj if x['id'] == id_)
    n = len(e['cuerpo'])
    e['cuerpo'] = [b for b in e['cuerpo'] if not ('html' in b and contiene in b['html'])]
    assert len(e['cuerpo']) < n, f'{t} {id_}: no hay bloque html con «{contiene[:60]}»'
    _guardar(f, obj)


def settema(t, campo, valor):
    f, obj = _cargar(t, 'tema')
    assert campo in obj, f'{t}: no existe {campo}'
    obj[campo] = valor
    _guardar(f, obj)


def quiz_why(t, q, texto_opcion, nuevo_why):
    f, obj = _cargar(t, 'tema')
    for o in obj['quiz'][q]['opciones']:
        if texto_opcion in o['t']: o['why'] = nuevo_why; _guardar(f, obj); return
    raise AssertionError(f'{t} quiz[{q}]: no hay opción con «{texto_opcion}»')


def tipo(t, id_tipo, campo, valor, idx=None):
    f, obj = _cargar(t, 'tema')
    x = next(x for x in obj['tipos'] if x['id'] == id_tipo)
    if idx is None: x[campo] = valor
    else: x[campo][idx] = valor
    _guardar(f, obj)


def repall(t, viejo, nuevo, que='ej'):
    """Reemplaza una subcadena en TODOS los registros del tema (ejercicios.yaml o tema.yaml)."""
    f, obj = _cargar(t, que)
    cont = [0]
    obj = _reemplaza(obj, viejo, nuevo, cont)
    assert cont[0] >= 1, f'{t}: no se encuentra «{viejo[:60]}»'
    _guardar(f, obj)
    return cont[0]


def quiz_opt(t, q, contiene, nueva):
    """Sustituye la opción del quiz[q] cuyo texto contiene `contiene` por el dict `nueva` ({t, ok, why})."""
    f, obj = _cargar(t, 'tema')
    ops = obj['quiz'][q]['opciones']
    i = next(i for i, o in enumerate(ops) if contiene in o['t'])
    ops[i] = nueva
    _guardar(f, obj)


def quiz_campo(t, q, campo, valor):
    f, obj = _cargar(t, 'tema'); obj['quiz'][q][campo] = valor; _guardar(f, obj)


def quiz_why_idx(t, q, i, nuevo_why):
    """Cambia el `why` de la opción número `i` (desde 0) del quiz[q]."""
    f, obj = _cargar(t, 'tema'); obj['quiz'][q]['opciones'][i]['why'] = nuevo_why; _guardar(f, obj)
