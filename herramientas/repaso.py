"""Genera repaso.html: repaso espaciado y test mezclado con las preguntas y fichas de todos los temas (F7.1).

    ~/venv/bin/python herramientas/repaso.py

Fuente: `datos/X_Y/tema.yaml` (campos `quiz` y `tipos`). No hay servidor: el progreso (caja de Leitner y fecha de la próxima
revisión de cada tarjeta) se guarda en `localStorage` del navegador (clave `repaso_v1`). Intervalos: 1, 2, 4, 7, 14 y 30 días.
Modos: «Repaso de hoy» (lo que toca), «Test mezclado» (10 preguntas al azar de los temas elegidos) y «Fichas» (método de cada tipo de problema).
"""
import json, pathlib, re
import yaml

RAIZ = pathlib.Path(__file__).resolve().parent.parent
tarjetas, temas = [], []
for d in sorted((RAIZ / 'datos').glob('[1-9]_[1-9]')):
    cfg = yaml.safe_load((d / 'tema.yaml').read_text(encoding='utf8'))
    cod = cfg['codigo']; nombre = re.sub(r'^\d\.\d\s+', '', cfg['titulo'])
    temas.append(dict(cod=cod, nombre=nombre, url=cfg['archivo']))
    for i, q in enumerate(cfg.get('quiz', []), 1):
        tarjetas.append(dict(id=f'q-{cod}-{i}', k='test', t=cod, p=q['p'], o=[dict(t=o['t'], ok=bool(o.get('ok')), w=o.get('why', '')) for o in q['opciones']], fb=q['fb']))
    for t in cfg.get('tipos', []):
        tarjetas.append(dict(id=f'f-{cod}-{t["id"]}', k='ficha', t=cod, n=t['nombre'], r=t['receta'], s=t['senal'], pa=t['pasos'], e=t['ejemplo'], fa=t['fallos'], a=f'{cfg["archivo"]}#tipo-{t["id"]}'))

datos = json.dumps(dict(temas=temas, tarjetas=tarjetas), ensure_ascii=False).replace('</', '<\\/')
html = '''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<script>try{var t=localStorage.getItem('tema');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Álgebra · Repaso espaciado</title>
<link rel="stylesheet" href="assets/katex/katex.min.css">
<link rel="stylesheet" href="assets/resumen.css">
<script defer src="assets/katex/katex.min.js"></script>
<script defer src="assets/katex/auto-render.min.js"></script>
<style>
.rp main{max-width:900px;margin:0 auto;padding:24px 16px 60px;font-family:var(--serif,Georgia,serif)}
.rp .ctl,.rp .modos{display:flex;gap:8px;flex-wrap:wrap;margin:.8em 0}
.rp button,.rp .chk label{font:600 14.5px var(--sans);border:1px solid var(--bd);background:var(--card);color:var(--fg);border-radius:99px;padding:6px 14px;cursor:pointer}
.rp button[aria-pressed="true"]{background:var(--acc);border-color:var(--acc);color:#fff}
.rp .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:1em 0}
.rp .stats div{border:1px solid var(--bd);border-radius:10px;padding:8px 12px;background:var(--card);font:14px var(--sans)}.rp .stats b{display:block;font-size:1.5rem}
.rp details.sel{margin:.6em 0;font:14px var(--sans)}.rp details.sel summary{cursor:pointer;color:var(--acc);font-weight:600}
.rp .chk{display:flex;flex-wrap:wrap;gap:6px;margin:.5em 0}.rp .chk label{padding:4px 10px;font-weight:500}.rp .chk input{margin-right:4px}
.rp .card{border:2px solid var(--acc);border-radius:12px;padding:12px 18px 16px;background:var(--card);margin:1em 0}
.rp .card .meta{font:12.5px var(--sans);color:var(--mut);display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}
.rp .card .meta a{color:var(--acc)}
.rp .opts{list-style:none;margin:.6em 0;padding:0;display:grid;gap:6px}
.rp .opts li{border:1px solid var(--bd);border-radius:8px;padding:7px 12px;cursor:pointer;background:var(--bg);font-family:var(--sans)}
.rp .opts li.ok{border-color:#2e9e5b;background:color-mix(in srgb,#2e9e5b 14%,var(--bg))}.rp .opts li.mal{border-color:#d4542a;background:color-mix(in srgb,#d4542a 12%,var(--bg))}
.rp .fb{border-left:3px solid var(--acc);background:color-mix(in srgb,var(--acc) 7%,transparent);padding:8px 12px;border-radius:0 8px 8px 0;font:15px/1.5 var(--sans);margin:.6em 0}
.rp .ficha-rev{font:15px/1.55 var(--sans)}.rp .ficha-rev h3{margin:.2em 0;font-size:1.15rem}
.rp .nota{color:var(--mut);font:13.5px var(--sans)}
</style>
</head>
<body class="rp">
<div class="topbar"><div class="in"><a href="index.html">← Índice de temas</a><span><button id="btn-tema" type="button">Claro / oscuro</button></span></div></div>
<main>
<h1>Repaso espaciado</h1>
<p>Las preguntas de autoevaluación y las fichas de método de los 26 temas, en un solo sitio. Lo que aciertas vuelve a aparecer cada vez más tarde (1, 2, 4, 7, 14 y 30 días); lo que fallas, mañana. El progreso se guarda <b>solo en este navegador</b>.</p>
<div class="stats"><div><b id="n-hoy">–</b>toca hoy</div><div><b id="n-vistas">–</b>ya vistas</div><div><b id="n-dom">–</b>dominadas (caja ≥ 4)</div><div><b id="n-tot">–</b>tarjetas</div></div>
<div class="modos" role="group" aria-label="Modo"><button type="button" data-m="hoy" aria-pressed="true">Repaso de hoy</button><button type="button" data-m="test" aria-pressed="false">Test mezclado (10)</button><button type="button" data-m="ficha" aria-pressed="false">Fichas de método</button></div>
<details class="sel"><summary>Elegir temas</summary><div class="chk" id="temas"></div><div class="ctl"><button type="button" id="todos">Todos</button><button type="button" id="ninguno">Ninguno</button></div></details>
<div id="zona"></div>
<p class="nota"><button type="button" id="reset" style="font-size:12.5px">Borrar mi progreso</button></p>
</main>
<script type="application/json" id="datos">__DATOS__</script>
<script>
(function(){
  var D=JSON.parse(document.getElementById('datos').textContent), T=D.tarjetas, KEY='repaso_v1', INT=[1,2,4,7,14,30];
  var st={}, sel={}, modo='hoy', cola=[], cur=null, acert=0, hechas=0;
  try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
  function guarda(){try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}}
  function hoy(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function mas(dias){var d=new Date();d.setDate(d.getDate()+dias);return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
  function math(el){try{if(window.renderMathInElement)renderMathInElement(el,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false})}catch(e){}}
  function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
  D.temas.forEach(function(t){sel[t.cod]=true});
  var ct=document.getElementById('temas');
  D.temas.forEach(function(t){var l=document.createElement('label');l.innerHTML='<input type="checkbox" checked data-c="'+t.cod+'">'+t.cod;l.title=t.nombre;ct.appendChild(l)});
  ct.addEventListener('change',function(e){sel[e.target.dataset.c]=e.target.checked;arranca()});
  document.getElementById('todos').onclick=function(){[].forEach.call(ct.querySelectorAll('input'),function(i){i.checked=true;sel[i.dataset.c]=true});arranca()};
  document.getElementById('ninguno').onclick=function(){[].forEach.call(ct.querySelectorAll('input'),function(i){i.checked=false;sel[i.dataset.c]=false});arranca()};
  document.getElementById('reset').onclick=function(){if(confirm('¿Borrar todo el progreso de repaso de este navegador?')){st={};guarda();arranca()}};
  [].forEach.call(document.querySelectorAll('.modos button'),function(b){b.onclick=function(){modo=b.dataset.m;[].forEach.call(document.querySelectorAll('.modos button'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});arranca()}});
  function activas(){return T.filter(function(c){return sel[c.t]})}
  function stats(){var h=hoy(),v=0,d=0,toca=0;T.forEach(function(c){var s=st[c.id];if(s){v++;if(s.box>=4)d++;if(s.due<=h)toca++}else toca++});
    document.getElementById('n-hoy').textContent=toca;document.getElementById('n-vistas').textContent=v;document.getElementById('n-dom').textContent=d;document.getElementById('n-tot').textContent=T.length}
  function arranca(){stats();acert=0;hechas=0;var h=hoy(),a=activas();
    if(modo==='hoy')cola=shuf(a.filter(function(c){var s=st[c.id];return !s||s.due<=h})).slice(0,20);
    else if(modo==='test')cola=shuf(a.filter(function(c){return c.k==='test'})).slice(0,10);
    else cola=shuf(a.filter(function(c){return c.k==='ficha'})).slice(0,12);
    siguiente()}
  function registra(c,ok){var s=st[c.id]||{box:0};s.box=ok?Math.min(s.box+1,INT.length-1):0;s.due=mas(ok?INT[s.box]:1);st[c.id]=s;guarda();stats()}
  function siguiente(){var z=document.getElementById('zona');
    if(!cola.length){z.innerHTML='<div class="card"><p><b>'+(hechas?'Sesión terminada: '+acert+' de '+hechas+' bien.':'No hay nada que repasar con esta selección.')+'</b> '+(modo==='hoy'&&hechas?'Vuelve mañana: lo fallado reaparece pronto y lo acertado, más tarde.':'')+'</p><button type="button" onclick="location.reload()">Otra sesión</button></div>';return}
    cur=cola.shift();var c=cur,tm=D.temas.filter(function(t){return t.cod===c.t})[0];
    var meta='<div class="meta"><span>Tema '+c.t+' · '+tm.nombre+'</span><span>'+cola.length+' más · <a href="'+(c.a||tm.url)+'">ir al tema</a></span></div>';
    if(c.k==='test'){
      var h=meta+'<p><b>'+c.p+'</b></p><ul class="opts">'+shuf(c.o).map(function(o,i){return '<li data-ok="'+(o.ok?1:0)+'" tabindex="0"'+(o.ok?'':' data-w="'+i+'"')+'>'+o.t+'<span class="w" hidden>'+(o.w||'')+'</span></li>'}).join('')+'</ul><div class="fb" hidden></div>';
      z.innerHTML='<div class="card">'+h+'</div>';
      var fin=false;[].forEach.call(z.querySelectorAll('.opts li'),function(li){function pick(){if(fin)return;fin=true;var ok=li.dataset.ok==='1';[].forEach.call(z.querySelectorAll('.opts li'),function(x){if(x.dataset.ok==='1')x.classList.add('ok')});if(!ok)li.classList.add('mal');
        var w=li.querySelector('.w');var fb=z.querySelector('.fb');fb.hidden=false;fb.innerHTML=(ok?'<b>✓ Correcto.</b> ':'<b>✗ No.</b> '+(w&&w.innerHTML?w.innerHTML+' ':''))+c.fb+'<p><button type="button" id="sig">Siguiente</button></p>';math(fb);
        hechas++;if(ok)acert++;registra(c,ok);document.getElementById('sig').onclick=siguiente;document.getElementById('sig').focus()}
        li.onclick=pick;li.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}}});
    }else{
      z.innerHTML='<div class="card">'+meta+'<div class="ficha-rev"><h3>'+c.n+'</h3><p><i>¿Cómo se resuelve? Piénsalo antes de mirar.</i></p><button type="button" id="ver">Ver el método</button><div id="res" hidden><p><b>Receta:</b> '+c.r+'</p><p><b>Cómo se reconoce:</b> '+c.s+'</p><ol>'+c.pa.map(function(p){return '<li>'+p+'</li>'}).join('')+'</ol><p><b>Ejemplo:</b> '+c.e+'</p><p><b>Dónde se falla:</b> '+c.fa+'</p><p>¿Lo sabías?</p><button type="button" id="si">Sí</button> <button type="button" id="no">No del todo</button></div></div></div>';
      document.getElementById('ver').onclick=function(){this.hidden=true;var r=document.getElementById('res');r.hidden=false;math(r)};
      function fin(ok){hechas++;if(ok)acert++;registra(c,ok);siguiente()}
      document.getElementById('si').onclick=function(){fin(true)};document.getElementById('no').onclick=function(){fin(false)};
    }
    math(z)}
  document.getElementById('btn-tema').onclick=function(){var r=document.documentElement,d=r.getAttribute('data-theme')==='dark';r.setAttribute('data-theme',d?'light':'dark');try{localStorage.setItem('tema',d?'light':'dark')}catch(e){}};
  window.addEventListener('load',arranca);
  if(document.readyState==='complete')arranca();
})();
</script>
</body>
</html>
'''.replace('__DATOS__', datos)
(RAIZ / 'repaso.html').write_text(html, encoding='utf8')
print(f'repaso.html: {len(tarjetas)} tarjetas ({sum(1 for t in tarjetas if t["k"] == "test")} preguntas, {sum(1 for t in tarjetas if t["k"] == "ficha")} fichas) de {len(temas)} temas')
