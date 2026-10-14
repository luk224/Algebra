"""Genera .gemini/agents/*.md a partir de .claude/agents/*.md (fuente única: Claude).
Cambia el modelo (opus/sonnet/haiku -> Gemini) y los nombres de las herramientas.
Uso: python herramientas/sync_gemini.py   (ejecutar tras editar un agente de .claude/agents)
"""
import pathlib, re
R = pathlib.Path(__file__).resolve().parent.parent
MODELO = {'opus': 'gemini-3.1-pro-preview', 'sonnet': 'gemini-3.1-pro-preview', 'haiku': 'gemini-3.8-flash'}
TOOLS = {'Read': 'read_file', 'Write': 'write_file', 'Edit': 'replace', 'Grep': 'grep_search',
         'Glob': 'glob', 'Bash': 'run_shell_command', 'Skill': 'activate_skill'}
NOTA = ("> **Nota para Gemini CLI.** Este agente es una copia generada de `.claude/agents/{n}.md` "
        "(`python herramientas/sync_gemini.py`). Donde el texto diga Skill/SendMessage/Agent de Claude, usa el "
        "equivalente de Gemini o lee el fichero indicado (p. ej. `.claude/skills/resumen-algebra/SKILL.md`). "
        "Trabajas aislado: no puedes llamar a otros agentes; devuelve un informe breve al agente principal.\n\n")
out = R / '.gemini' / 'agents'; out.mkdir(parents=True, exist_ok=True)
for f in sorted((R / '.claude' / 'agents').glob('*.md')):
    t = f.read_text(encoding='utf8').replace('\r\n', '\n')
    m = re.match(r'---\n(.*?)\n---\n(.*)', t, re.S)
    body = re.sub(r'<!-- CLAUDE-ONLY -->.*?<!-- /CLAUDE-ONLY -->\s*', '', m.group(2), flags=re.S)
    fm = dict(l.split(':', 1) for l in m.group(1).split('\n') if ':' in l)
    fm = {k.strip(): v.strip() for k, v in fm.items()}
    tools = [TOOLS[x.strip()] for x in fm.get('tools', '').split(',') if x.strip() in TOOLS]
    head = ['---', 'name: ' + fm['name'], 'description: ' + fm['description'], 'kind: local', 'tools:']
    head += ['  - ' + x for x in tools]
    head += ['model: ' + MODELO.get(fm.get('model', 'sonnet'), 'gemini-2.5-pro'), 'temperature: 0.3', 'max_turns: 60', 'timeout_mins: 30', '---', '']
    (out / f.name).write_text('\n'.join(head) + NOTA.format(n=fm['name']) + body.lstrip('\n'), encoding='utf8')
    print('ok', f.name, '->', MODELO.get(fm.get('model')), tools)
