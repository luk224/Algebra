"""Aplica a un tema la capa pedagógica a partir de `datos/X_Y/capa_propuesta.yaml`.

    ~/venv/bin/python herramientas/aplicar_capa.py 3.2 [--parcial] [--solo-validar]

`--solo-validar` comprueba la propuesta sin escribir nada (es lo que debe usar quien la redacta).

La propuesta la redacta una persona o un agente. Esquema (todo el texto en bloques literales `|-`):

  ejercicios:                       # uno por cada ejercicio del tema (id = el de ejercicios.yaml)
    - id: ej3-12
      nivel: 2                      # 1 básico, 2 nivel examen, 3 difícil
      pista: |-                     # 1-2 frases con la IDEA del primer paso; sin dar el resultado
        …
      problema: [tipo_id, …]        # tipos de problema que cubre (el primero es el principal); ids de `tipos`
      etiqueta: Feb. 24 p. 8        # opcional (se deduce del título o de la referencia X)
      enunciado: |-                 # opcional: solo si el bloque `enun` actual falta o contiene la solución
        …
  esencial: {intro: …, items: [ … ]}        # 3-5 ideas
  que_cae_nota: |-                  # opcional
  tipos:                            # 2-5 tipos de problema del tema
    - {id, nombre, receta, titulo_ficha?, senal, pasos: [ … ], ejemplo, fallos}
  quiz:                             # 5-6 preguntas
    - p: …
      opciones: [{t: …, ok: true}, {t: …, ok: false, why: …}, …]
      fb: …

Qué hace: mueve el bloque `enun` de cada ejercicio al campo `enunciado` (visible fuera de la solución), añade nivel, pista,
problema y etiqueta, copia esencial/tipos/quiz a tema.yaml, pone `capa: true` y reconstruye el HTML. Si algo no cuadra,
no escribe nada. Con --parcial admite ejercicios sin propuesta (se quedan en el formato antiguo).
"""
import re, sys, pathlib
import yaml
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import datos_tema as D

SPOILER = re.compile(r'\b(Respuesta|Resultado|Soluci[oó]n)\s*:', re.I)


def aplicar(codigo, parcial=False, escribir=True):
    d = D.carpeta(codigo)
    pf = d / 'capa_propuesta.yaml'
    if not pf.exists(): sys.exit(f'{codigo}: falta {pf.relative_to(D.RAIZ)}')
    prop = yaml.safe_load(pf.read_text(encoding='utf8'))
    cfg, cuerpo, ejs = D.cargar(codigo)
    err, avisos = [], []
    tipos = prop.get('tipos') or []
    ids_tipo = [t.get('id') for t in tipos]
    if not 2 <= len(tipos) <= 6: err.append(f'se esperan entre 2 y 6 tipos, hay {len(tipos)}')
    if len(ids_tipo) != len(set(ids_tipo)): err.append('ids de tipo repetidos')
    for t in tipos:
        for c in ('id', 'nombre', 'receta', 'senal', 'pasos', 'ejemplo', 'fallos'):
            if not t.get(c): err.append(f'tipo {t.get("id")}: falta «{c}»')
        if t.get('pasos') and not (3 <= len(t['pasos']) <= 6): avisos.append(f'tipo {t.get("id")}: {len(t["pasos"])} pasos (lo normal son 3-5)')
        t.pop('series', None) if not t.get('series') else None
    es = prop.get('esencial') or {}
    if not es.get('intro') or not 3 <= len(es.get('items', [])) <= 6: err.append('«esencial» necesita intro y de 3 a 6 ideas')
    quiz = prop.get('quiz') or []
    if not 4 <= len(quiz) <= 8: err.append(f'el quiz necesita entre 4 y 8 preguntas, hay {len(quiz)}')
    for i, q in enumerate(quiz, 1):
        ops = q.get('opciones', [])
        if len(ops) < 3 or sum(1 for o in ops if o.get('ok')) != 1: err.append(f'quiz {i}: necesita ≥3 opciones y exactamente una correcta')
        for o in ops:
            if not o.get('ok') and not o.get('why'): err.append(f'quiz {i}: opción incorrecta sin «why»')
        if not q.get('p') or not q.get('fb'): err.append(f'quiz {i}: falta «p» o «fb»')
    por = {e['id']: e for e in ejs}
    dadas = {p['id']: p for p in prop.get('ejercicios', [])}
    for i in dadas:
        if i not in por: err.append(f'la propuesta incluye un id que no existe: {i}')
    faltan = [i for i in por if i not in dadas]
    if faltan and not parcial: err.append('faltan ejercicios en la propuesta: ' + ', '.join(faltan[:20]) + (' …' if len(faltan) > 20 else ''))
    nuevos = []
    for e in ejs:
        p = dadas.get(e['id'])
        if not p: nuevos.append(e); continue
        if p.get('nivel') not in (1, 2, 3): err.append(f'{e["id"]}: nivel debe ser 1, 2 ó 3')
        if not (p.get('pista') or '').strip(): err.append(f'{e["id"]}: falta la pista')
        elif len(p['pista']) > 600: avisos.append(f'{e["id"]}: pista muy larga ({len(p["pista"])} caracteres)')
        cuerpo_e = list(e['cuerpo'])
        enun = [b for b in cuerpo_e if 'enun' in b]
        if p.get('enunciado'): texto = p['enunciado'].strip()
        elif enun: texto = enun[0]['enun']
        else: err.append(f'{e["id"]}: no tiene bloque `enun`; la propuesta debe traer `enunciado`'); continue
        if SPOILER.search(texto): avisos.append(f'{e["id"]}: el enunciado parece contener la solución («Respuesta:», «Resultado:»…)')
        cuerpo_e = [b for b in cuerpo_e if 'enun' not in b]
        for t in p.get('problema', []):
            if t not in ids_tipo: err.append(f'{e["id"]}: tipo de problema desconocido «{t}»')
        if not p.get('problema'): avisos.append(f'{e["id"]}: sin `problema` (no saldrá en «Qué cae» ni en las fichas)')
        n = {}
        for k, v in e.items():
            if k in ('titulo', 'cuerpo'): continue
            n[k] = v
        n['clase'] = e['clase']
        if p.get('problema'): n['problema'] = list(p['problema'])
        if p.get('etiqueta'): n['etiqueta'] = p['etiqueta']
        n['nivel'] = p['nivel']; n['titulo'] = e['titulo']; n['fuentes'] = e['fuentes']
        n['enunciado'] = texto; n['pista'] = p['pista'].strip(); n['cuerpo'] = cuerpo_e
        nuevos.append(n)
    # cada tipo debe tener al menos un ejercicio
    usados = {t for p in dadas.values() for t in p.get('problema', [])}
    for t in ids_tipo:
        if t not in usados: avisos.append(f'el tipo «{t}» no lo usa ningún ejercicio')
    for a in avisos[:25]: print('  - aviso', a)
    if err:
        print(f'{codigo}: NO SE APLICA ({len(err)} errores)')
        for x in err[:30]: print('  - ERROR', x)
        return False
    if not escribir:
        print(f'{codigo}: PROPUESTA VÁLIDA (0 errores, {len(avisos)} avisos); no se ha escrito nada'); return True
    cfg.update(esencial=es, tipos=tipos, quiz=quiz, capa=True)
    if prop.get('que_cae_nota'): cfg['que_cae_nota'] = prop['que_cae_nota']
    (d / 'ejercicios.yaml').write_text(D.volcar(nuevos), encoding='utf8')
    (d / 'tema.yaml').write_text(D.volcar(cfg), encoding='utf8')
    D.construir(codigo)
    ok = D.validar(codigo)
    print(f'{codigo}: capa aplicada ({len(dadas)} ejercicios con nivel y pista, {len(tipos)} tipos, {len(quiz)} preguntas)')
    return ok


if __name__ == '__main__':
    a = [x for x in sys.argv[1:] if not x.startswith('--')]
    if len(a) != 1: sys.exit(__doc__)
    sys.exit(0 if aplicar(a[0], '--parcial' in sys.argv, '--solo-validar' not in sys.argv) else 1)
