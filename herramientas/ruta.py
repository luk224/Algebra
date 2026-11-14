"""Genera ruta.html: plan de estudio hasta las PEC según las horas semanales que tengas (F7.2).

    ~/venv/bin/python herramientas/ruta.py

Datos: horas por tema (tema.yaml), ejercicios de examen por tema (datos/examenes.yaml), dependencias y orden (herramientas/prioridades.py).
Fechas: PEC1 (módulos 1-3) 27-30 nov 2026 y PEC2 (módulos 4-6) 15-18 ene 2027 (CLAUDE.md). Sin servidor: las horas semanales y los temas
marcados como estudiados se guardan en `localStorage` (clave `ruta_v1`).
"""
import ast, collections, json, pathlib, re
import yaml

RAIZ = pathlib.Path(__file__).resolve().parent.parent
_dep = yaml.safe_load((RAIZ / 'datos' / 'dependencias.yaml').read_text(encoding='utf8'))
const = {'ORDEN': _dep['orden'], 'DEP': _dep['dep']}
reg = yaml.safe_load((RAIZ / 'datos' / 'examenes.yaml').read_text(encoding='utf8'))
n_ex = collections.Counter(r['tema'] for r in reg if r['desarrollo'] == 'completo')
temas = []
for d in sorted((RAIZ / 'datos').glob('[1-9]_[1-9]')):
    cfg = yaml.safe_load((d / 'tema.yaml').read_text(encoding='utf8'))
    h = next(re.search(r'⏱ ~([\d–]+) h', c) for c in cfg['chips'] if '⏱' in c)
    nums = [int(x) for x in h[1].split('–')]; hh = sum(nums) / len(nums)
    ex = n_ex.get(cfg['codigo'], 0)
    nivel = 1 if (ex >= 10 or ex / hh >= 2) else (2 if (ex >= 6 or ex / hh >= 1.3) else 3)
    temas.append(dict(cod=cfg['codigo'], nombre=re.sub(r'^\d\.\d\s+', '', cfg['titulo']), h=hh, ex=ex, nivel=nivel, dep=const['DEP'].get(cfg['codigo'], []), url=cfg['archivo']))
temas.sort(key=lambda t: const['ORDEN'].index(t['cod']))
datos = json.dumps(dict(temas=temas, pec1='2026-11-27', pec2='2027-01-15'), ensure_ascii=False)

html = '''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<script>try{var t=localStorage.getItem('tema');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Álgebra · Ruta de estudio</title>
<link rel="stylesheet" href="assets/resumen.css">
<style>
.ru main{max-width:980px;margin:0 auto;padding:24px 16px 60px}
.ru .ctl{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin:1em 0;font:15px var(--sans)}
.ru input[type=number]{font:16px var(--sans);width:5em;padding:5px 8px;border:1px solid var(--bd);border-radius:8px;background:var(--bg);color:var(--fg)}
.ru .pec{border:1px solid var(--bd);border-radius:12px;padding:6px 16px 12px;margin:1em 0;background:var(--card);font-family:var(--sans)}
.ru .pec h2{margin:.5em 0 .1em;font-size:1.25rem}.ru .res{color:var(--mut);font-size:14.5px}
.ru table{width:100%;border-collapse:collapse;font:15px/1.4 var(--sans);margin:.6em 0}
.ru th,.ru td{padding:7px 9px;border-bottom:1px solid var(--bd);text-align:left;vertical-align:top}
.ru th{font-size:12.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--mut)}
.ru tr.hecho td{opacity:.5;text-decoration:line-through}
.ru .fuera{color:#b5701a}.ru a{color:var(--acc)}
.ru .tag{font:700 11.5px var(--sans);padding:2px 8px;border-radius:99px;border:1px solid currentColor;margin-left:6px}
.ru .t1{color:#c0392b}.ru .t2{color:#b5701a}.ru .t3{color:var(--mut)}
</style>
</head>
<body class="ru">
<div class="topbar"><div class="in"><a href="index.html">← Índice de temas</a><span><button id="btn-tema" type="button">Claro / oscuro</button></span></div></div>
<main>
<h1>Ruta de estudio hasta las PEC</h1>
<p>Dime cuántas horas por semana puedes dedicar y calculo qué temas te caben antes de cada PEC, empezando por los que más rinden en el examen (ver <a href="prioridades.html">prioridades</a>) y respetando lo que cada tema necesita antes. Marca lo que ya has estudiado y el plan se recalcula. Todo se guarda solo en este navegador.</p>
<div class="ctl"><label>Horas por semana: <input type="number" id="hs" min="1" max="60" value="5"></label><span id="hoy"></span></div>
<div id="out"></div>
<p class="res">Las horas por tema son estimaciones de la cabecera de cada tema y las dependencias son orientativas. Fechas: PEC1 (módulos 1-3) del 27 al 30 de noviembre de 2026; PEC2 (módulos 4-6) del 15 al 18 de enero de 2027.</p>
</main>
<script type="application/json" id="datos">__DATOS__</script>
<script>
(function(){
  var D=JSON.parse(document.getElementById("datos").textContent), KEY="ruta_v1", S={hs:5,hecho:{}};
  try{var g=JSON.parse(localStorage.getItem(KEY));if(g){S.hs=g.hs||5;S.hecho=g.hecho||{}}}catch(e){}
  function guarda(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
  var hs=document.getElementById('hs');hs.value=S.hs;
  function f(d){return d.toLocaleDateString('es-ES',{day:'numeric',month:'short'})}
  function dias(a,b){return Math.round((b-a)/86400000)}
  function cierre(cods,por){var o={},p=cods.slice();while(p.length){var c=p.pop();if(o[c])continue;o[c]=1;(por[c].dep||[]).forEach(function(x){p.push(x)})}return o}
  function plan(grupo,ini,fin){ // temas del grupo, sin hechos; ini y fin = fechas
    var por={};D.temas.forEach(function(t){por[t.cod]=t});
    var rest=D.temas.filter(function(t){return grupo.test(t.cod)&&!S.hecho[t.cod]});
    var cap=Math.max(0,dias(ini,fin))/7*S.hs, sel=[], usada=0, elegidos={};
    function mete(t){ if(elegidos[t.cod]||S.hecho[t.cod]) return; // primero sus requisitos del mismo grupo
      (t.dep||[]).forEach(function(d){if(grupo.test(d)&&!S.hecho[d])mete(por[d])});
      if(usada+t.h<=cap+0.01){elegidos[t.cod]=1;usada+=t.h;sel.push(t)} }
    [1,2,3].forEach(function(nv){rest.filter(function(t){return t.nivel===nv}).forEach(mete)});
    sel.sort(function(a,b){return D.temas.indexOf(a)-D.temas.indexOf(b)});
    var fuera=rest.filter(function(t){return !elegidos[t.cod]});
    return {sel:sel,fuera:fuera,cap:cap,usada:usada,total:rest.reduce(function(s,t){return s+t.h},0)};
  }
  function fechas(sel,ini,hsem){ var ac=0,out=[]; sel.forEach(function(t){var a=new Date(ini.getTime()+ac/hsem*7*86400000);ac+=t.h;var b=new Date(ini.getTime()+ac/hsem*7*86400000-86400000);out.push([t,a,b])});return out}
  function fila(t,a,b){var chk='<input type="checkbox" data-c="'+t.cod+'"'+(S.hecho[t.cod]?' checked':'')+' aria-label="Estudiado">';
    return '<tr class="'+(S.hecho[t.cod]?'hecho':'')+'"><td>'+chk+'</td><td><a href="'+t.url+'"><b>'+t.cod+'</b> '+t.nombre+'</a><span class="tag t'+t.nivel+'">'+['','Imprescindible','Importante','Después'][t.nivel]+'</span></td><td>'+(a?f(a)+' – '+f(b):'—')+'</td><td>'+t.h.toString().replace('.',',')+' h</td></tr>'}
  function bloque(tit,reg,ini,fin){
    var p=plan(reg,ini,fin), fs=fechas(p.sel,ini,S.hs);
    var h='<div class="pec"><h2>'+tit+'</h2><p class="res">Hasta el '+f(fin)+' (en '+Math.max(0,dias(ini,fin))+' días) te caben ~<b>'+p.cap.toFixed(0)+' h</b> de estudio con '+S.hs+' h/semana; pendiente en estos módulos: <b>'+p.total.toFixed(0)+' h</b>. '+
      (p.fuera.length?'<span class="fuera">No cabe todo: se han elegido primero los temas que más puntúan.</span>':'<b>Te da tiempo de todo.</b>')+'</p>';
    h+='<table><thead><tr><th></th><th>Tema</th><th>Cuándo</th><th>Horas</th></tr></thead><tbody>'+fs.map(function(x){return fila(x[0],x[1],x[2])}).join('')+(D.temas.filter(function(t){return reg.test(t.cod)&&S.hecho[t.cod]}).map(function(t){return fila(t)}).join(''))+'</tbody></table>';
    if(p.fuera.length)h+='<p class="res"><b>Para después</b> (si sobra tiempo, o tras la PEC): '+p.fuera.map(function(t){return '<a href="'+t.url+'">'+t.cod+'</a> <label><input type="checkbox" data-c="'+t.cod+'"> ya lo he estudiado</label>'}).join(' · ')+'</p>';
    return h+'</div>'}
  function pinta(){
    var hoy=new Date();hoy.setHours(0,0,0,0);document.getElementById('hoy').textContent='Hoy: '+hoy.toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
    var p1=new Date(D.pec1+'T00:00:00'),p2=new Date(D.pec2+'T00:00:00'),fin1=new Date(p1.getTime()+3*86400000);
    var ini2=hoy>fin1?hoy:new Date(fin1.getTime()+86400000), ini1=hoy;
    var h='';
    h+=(hoy<=fin1?bloque('PEC 1 · módulos 1-3 (27-30 nov)',/^[123]\\./,ini1,p1):'<div class="pec"><h2>PEC 1</h2><p class="res">Ya ha pasado.</p></div>');
    h+=bloque('PEC 2 · módulos 4-6 (15-18 ene)',/^[456]\\./,ini2>p2?p2:ini2,p2);
    document.getElementById('out').innerHTML=h}
  hs.onchange=function(){S.hs=Math.max(1,parseInt(hs.value,10)||5);guarda();pinta()};
  document.getElementById('out').addEventListener('change',function(e){if(e.target.dataset.c){S.hecho[e.target.dataset.c]=e.target.checked;guarda();pinta()}});
  document.getElementById('btn-tema').onclick=function(){var r=document.documentElement,d=r.getAttribute('data-theme')==='dark';r.setAttribute('data-theme',d?'light':'dark');try{localStorage.setItem('tema',d?'light':'dark')}catch(e){}};
  pinta();
})();
</script>
</body>
</html>
'''.replace('__DATOS__', datos)
(RAIZ / 'ruta.html').write_text(html, encoding='utf8')
print('ruta.html:', len(temas), 'temas')
