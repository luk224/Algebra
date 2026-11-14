// Capa pedagógica opcional (piloto, tema 2.3): pestañas de vista, interruptor de fuentes y autoevaluación.
// Se activa con <html class="pilot">; cada h2 lleva data-vista="teoria|ejercicios|examen" (sin él, siempre visible).
(function () {
  var d = document, root = d.documentElement;
  if (!root.classList.contains('pilot')) return;
  function ready(f) { d.readyState !== 'loading' ? f() : d.addEventListener('DOMContentLoaded', f); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }

  ready(function () {
    var main = d.querySelector('main');
    if (!main) return;

    /* ---- Fuentes: ocultas por defecto, se guardan en localStorage ---- */
    var bt = d.getElementById('btn-tema');
    if (bt) {
      var bf = d.createElement('button'); bf.id = 'btn-fuentes'; bf.type = 'button';
      bf.title = 'Muestra u oculta las etiquetas de libro y página (U, E, L, X)';
      var setF = function (v) {
        root.classList.toggle('con-fuentes', v); bf.setAttribute('aria-pressed', v ? 'true' : 'false');
        bf.textContent = v ? 'Ocultar fuentes' : 'Mostrar fuentes'; store('fuentes', v ? '1' : '0');
      };
      bf.addEventListener('click', function () { setF(!root.classList.contains('con-fuentes')); });
      bt.parentNode.insertBefore(bf, bt); bt.parentNode.insertBefore(d.createTextNode(' '), bt);
      setF(store('fuentes') === '1');
    }

    /* ---- Vistas: cada elemento de main hereda la vista de su h2 ---- */
    var cur = null, cuenta = { teoria: 0, tipos: 0, ejercicios: 0, examen: 0 };
    [].forEach.call(main.children, function (el) {
      if (el.tagName === 'H2') cur = el.dataset.vista || null;
      if (cur) {
        el.classList.add('vista-' + cur);
        if (el.matches('details.sol')) cuenta[cur]++;
      }
    });
    var defs = [['teoria', '📘 Teoría'], ['tipos', '🧭 Por tipo'], ['ejercicios', '✏️ Ejercicios'], ['examen', '🎯 Examen'], ['todo', 'Todo junto']];
    var bar = d.createElement('div'); bar.className = 'vistas'; bar.setAttribute('role', 'tablist'); bar.setAttribute('aria-label', 'Vista del tema');
    defs.forEach(function (x) {
      var b = d.createElement('button'); b.type = 'button'; b.setAttribute('role', 'tab'); b.dataset.v = x[0];
      b.innerHTML = x[1] + (cuenta[x[0]] ? '<span class="cnt">(' + cuenta[x[0]] + ')</span>' : '');
      b.addEventListener('click', function () { setV(x[0]); window.scrollTo({ top: Math.max(0, bar.getBoundingClientRect().top + scrollY - (tb ? tb.offsetHeight : 45) - 4) }); });
      bar.appendChild(b);
    });
    var first = main.querySelector('.box.esencial') || main.querySelector('h2[data-vista]');
    if (first) main.insertBefore(bar, first);
    /* la barra de pestañas se pega justo debajo de la barra superior, que en móvil ocupa varias líneas */
    var tb = d.querySelector('.topbar');
    function ajustaTop() { if (tb) root.style.setProperty('--tbh', tb.offsetHeight + 'px'); }
    ajustaTop(); window.addEventListener('resize', ajustaTop);
    function setV(v) {
      root.setAttribute('data-vista', v);
      [].forEach.call(bar.children, function (b) { b.setAttribute('aria-selected', b.dataset.v === v ? 'true' : 'false'); });
    }
    function vistaDe(el) {
      var m = (el.className || '').match && el.className.match(/vista-(teoria|tipos|ejercicios|examen)/);
      if (m) return m[1];
      var p = el.closest('[class*="vista-"]'); m = p && p.className.match(/vista-(teoria|tipos|ejercicios|examen)/);
      return m ? m[1] : null;
    }
    function irA(hash) {
      var el = hash && d.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return false;
      var v = vistaDe(el), act = root.getAttribute('data-vista');
      if (v && act !== 'todo' && act !== v) setV(v);
      for (var p = el.parentElement; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true;
      return true;
    }
    setV('todo');
    if (location.hash && irA(location.hash)) setTimeout(function () { var e = d.getElementById(decodeURIComponent(location.hash.slice(1))); if (e) e.scrollIntoView(); }, 50);
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a && a.getAttribute('href').length > 1) irA(a.getAttribute('href'));
    });
    window.addEventListener('hashchange', function () { irA(location.hash); });

    /* ---- Autoevaluación ---- */
    d.querySelectorAll('.quiz').forEach(function (qz) {
      var qs = [].slice.call(qz.querySelectorAll('.qp')), score = qz.querySelector('.score');
      function pinta() {
        var h = qs.filter(function (q) { return q.classList.contains('hecha'); }), ok = h.filter(function (q) { return q.dataset.res === 'ok'; });
        score.firstChild.nodeValue = h.length ? 'Llevas ' + ok.length + ' de ' + qs.length + ' bien (' + h.length + ' contestadas). ' : 'Elige una opción en cada pregunta. ';
        if (h.length === qs.length) score.firstChild.nodeValue += ok.length === qs.length ? '¡Todas! Pasa a los ejercicios.' : 'Repasa las que fallaste y vuelve a intentarlo.';
      }
      qs.forEach(function (q) {
        var fb = q.querySelector('.fb'); if (fb) fb.hidden = true;
        [].forEach.call(q.querySelectorAll('ul.opts li'), function (li) {
          li.tabIndex = 0; li.setAttribute('role', 'button');
          function pick() {
            if (q.classList.contains('hecha')) return;
            q.classList.add('hecha'); q.dataset.res = li.hasAttribute('data-ok') ? 'ok' : 'mal';
            li.classList.add(li.hasAttribute('data-ok') ? 'ok' : 'mal');
            var good = q.querySelector('li[data-ok]'); if (good) good.classList.add('ok');
            var why = li.querySelector('.why');
            if (fb) { var old = fb.querySelector('.why-sel'); if (old) old.remove();
              if (why && !li.hasAttribute('data-ok')) { var w = d.createElement('p'); w.className = 'why-sel'; w.innerHTML = '<b>Por qué falla:</b> ' + why.innerHTML; fb.insertBefore(w, fb.firstChild); }
              fb.hidden = false; }
            pinta();
          }
          li.addEventListener('click', pick);
          li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
        });
      });
      var rs = qz.querySelector('.reset');
      if (rs) rs.addEventListener('click', function () {
        qs.forEach(function (q) { q.classList.remove('hecha'); delete q.dataset.res; var f = q.querySelector('.fb'); if (f) f.hidden = true; var ws = q.querySelector('.why-sel'); if (ws) ws.remove();
          [].forEach.call(q.querySelectorAll('li'), function (li) { li.classList.remove('ok', 'mal'); }); });
        pinta();
      });
      pinta();
    });
  });
})();
