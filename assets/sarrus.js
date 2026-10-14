/* Animación paso a paso de la regla de Sarrus.
   Uso: <div class="sarrus-demo" data-m="2,1,3,0,-1,4,1,2,1"></div>  (9 números, por filas) */
(function () {
  'use strict';
  var S = 56, X0 = 26, Y0 = 14, NS = 'http://www.w3.org/2000/svg';
  var DOWN = [[[0,0],[1,1],[2,2]], [[0,1],[1,2],[2,3]], [[0,2],[1,3],[2,4]]];   // ↘ (signo +): [fila, columna ampliada]
  var UP   = [[[2,0],[1,1],[0,2]], [[2,1],[1,2],[0,3]], [[2,2],[1,3],[0,4]]];   // ↗ (signo −)

  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function sv(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function fmt(n) { return n < 0 ? '(' + n + ')' : String(n); }
  function sgn(n) { return n < 0 ? '−' + (-n) : String(n); }

  function build(root) {
    var vals = (root.getAttribute('data-m') || '2,1,3,0,-1,4,1,2,1').split(',').map(Number);
    var m = [vals.slice(0, 3), vals.slice(3, 6), vals.slice(6, 9)];
    var step = 0, timer = null, N = 10;

    root.textContent = '';
    root.classList.add('sarrus');
    var board = el('div', 'sar-board');
    board.style.width = (X0 + 5 * S + 14) + 'px';
    board.style.height = (3 * S + 2 * Y0) + 'px';
    var svg = sv('svg', { 'class': 'sar-svg', width: X0 + 5 * S + 14, height: 3 * S + 2 * Y0, 'aria-hidden': 'true' });
    board.appendChild(svg);

    // corchetes y separador de copias
    function path(d, cls) { var p = sv('path', { d: d, 'class': cls }); svg.appendChild(p); return p; }
    var top = Y0 + 2, bot = Y0 + 3 * S - 2, L = X0 - 6, R = X0 + 3 * S + 6;
    path('M' + (L + 8) + ' ' + top + 'H' + L + 'V' + bot + 'H' + (L + 8), 'sar-br');
    path('M' + (R - 8) + ' ' + top + 'H' + R + 'V' + bot + 'H' + (R - 8), 'sar-br');
    var sep = path('M' + (R + 6) + ' ' + (top - 4) + 'V' + (bot + 4), 'sar-sep');

    // líneas de diagonales
    function center(rc) { return [X0 + rc[1] * S + S / 2, Y0 + rc[0] * S + S / 2]; }
    var lines = { down: [], up: [] };
    function mkLine(cells, kind) {
      var a = center(cells[0]), b = center(cells[2]);
      var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.sqrt(dx * dx + dy * dy), ux = dx / len, uy = dy / len, ext = S * 0.42;
      var x1 = a[0] - ux * ext, y1 = a[1] - uy * ext, x2 = b[0] + ux * ext, y2 = b[1] + uy * ext;
      var tot = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      var ln = sv('line', { x1: x1, y1: y1, x2: x2, y2: y2, 'class': 'sar-line ' + kind });
      ln.style.strokeDasharray = tot; ln.style.strokeDashoffset = tot; ln._tot = tot;
      svg.appendChild(ln); return ln;
    }
    DOWN.forEach(function (c) { lines.down.push(mkLine(c, 'down')); });
    UP.forEach(function (c) { lines.up.push(mkLine(c, 'up')); });

    // celdas
    var cells = [];
    for (var r = 0; r < 3; r++) {
      cells[r] = [];
      for (var c = 0; c < 5; c++) {
        var box;
        if (c < 3) {
          box = el('div', 'sar-cell');
          var inp = el('input'); inp.type = 'number'; inp.value = m[r][c]; inp.step = 1;
          inp.setAttribute('aria-label', 'fila ' + (r + 1) + ', columna ' + (c + 1));
          (function (rr, cc, ii) { ii.addEventListener('input', function () {
            var v = parseInt(ii.value, 10); m[rr][cc] = isNaN(v) ? 0 : v; sync(); render(); }); })(r, c, inp);
          box.appendChild(inp);
        } else {
          box = el('div', 'sar-cell copy'); box.textContent = m[r][c - 3];
        }
        box.style.left = (X0 + c * S + 4) + 'px'; box.style.top = (Y0 + r * S + 4) + 'px';
        box.style.width = (S - 8) + 'px'; box.style.height = (S - 8) + 'px';
        board.appendChild(box); cells[r][c] = box;
      }
    }
    function sync() { for (var r2 = 0; r2 < 3; r2++) for (var c2 = 3; c2 < 5; c2++) cells[r2][c2].textContent = m[r2][c2 - 3]; }

    var text = el('p', 'sar-text'); text.setAttribute('aria-live', 'polite');
    var res = el('div', 'sar-res');
    var ctrl = el('div', 'sar-ctrl');
    function btn(label, fn, cls) { var b = el('button', cls || '', label); b.type = 'button'; b.addEventListener('click', fn); ctrl.appendChild(b); return b; }
    var bPrev = btn('◀ Anterior', function () { stop(); go(step - 1); });
    var bPlay = btn('▶ Reproducir', function () { timer ? stop() : play(); }, 'play');
    var bNext = btn('Siguiente ▶', function () { stop(); go(step + 1); });
    btn('↺ Reiniciar', function () { stop(); go(0); });
    var prog = el('div', 'sar-prog'); var bar = el('i'); prog.appendChild(bar);

    root.appendChild(board); root.appendChild(text); root.appendChild(res); root.appendChild(prog); root.appendChild(ctrl);
    root.appendChild(el('p', 'sar-hint', 'Puedes escribir tus propios números en la matriz (las columnas grises se copian solas) y volver a pulsar «Reproducir».'));

    function prods(list) { return list.map(function (cs) { var v = cs.map(function (p) { return m[p[0]][p[1] % 3]; }); return { v: v, p: v[0] * v[1] * v[2] }; }); }

    function chip(o, kind) {
      var s = el('span', 'sar-chip ' + kind);
      s.appendChild(document.createTextNode(o.v.map(fmt).join(' · ') + ' = '));
      s.appendChild(el('b', '', sgn(o.p)));
      return s;
    }

    function render() {
      var D = prods(DOWN), U = prods(UP);
      var P = D[0].p + D[1].p + D[2].p, Q = U[0].p + U[1].p + U[2].p, det = P - Q;
      var msg = '';
      var dI = -1, uI = -1;                      // diagonal activa
      if (step >= 2 && step <= 4) dI = step - 2;
      if (step >= 6 && step <= 8) uI = step - 6;
      var copied = step >= 1;
      cells.forEach(function (row) { row.forEach(function (cl, c) { cl.classList.remove('hp', 'hn'); if (c >= 3) cl.classList.toggle('show', copied); }); });
      sep.classList.toggle('show', copied);

      lines.down.forEach(function (l, i) {
        l.style.strokeDashoffset = (step >= 2 + i) ? 0 : l._tot;
        l.classList.toggle('done', i !== dI && step !== 5);
        l.classList.toggle('hide', step >= 6 && step <= 9);
      });
      lines.up.forEach(function (l, i) {
        l.style.strokeDashoffset = (step >= 6 + i) ? 0 : l._tot;
        l.classList.toggle('done', i !== uI && step !== 9);
      });
      if (dI >= 0) DOWN[dI].forEach(function (p) { cells[p[0]][p[1]].classList.add('hp'); });
      if (uI >= 0) UP[uI].forEach(function (p) { cells[p[0]][p[1]].classList.add('hn'); });
      if (step === 5) DOWN.forEach(function (d) { d.forEach(function (p) { cells[p[0]][p[1]].classList.add('hp'); }); });
      if (step === 9) UP.forEach(function (d) { d.forEach(function (p) { cells[p[0]][p[1]].classList.add('hn'); }); });

      if (step === 0) msg = 'Partimos de una matriz de orden 3. Sarrus solo sirve para matrices 3×3. Pulsa «Siguiente» (o «Reproducir») para ver el procedimiento.';
      else if (step === 1) msg = 'Paso 1 · Copia a la derecha las dos primeras columnas (en gris). Así las diagonales no tienen que «dar la vuelta» por el borde de la matriz.';
      else if (step <= 4) msg = 'Paso 2 · Diagonal descendente ↘ n.º ' + (step - 1) + ' de 3: se multiplican los tres números que toca la línea azul. Las tres diagonales ↘ llevan signo +.';
      else if (step === 5) msg = 'Suma de las tres diagonales \u2198 (signo +): P = ' + D.map(function (o) { return fmt(o.p); }).join(' + ') + ' = ' + sgn(P) + '.';
      else if (step <= 8) msg = 'Paso 3 · Diagonal ascendente ↗ n.º ' + (step - 5) + ' de 3: se multiplican los tres números que toca la línea naranja. Estas tres llevan signo −: se calculan igual, pero después se restan.';
      else if (step === 9) msg = 'Suma de las tres diagonales ↗: Q = ' + U.map(function (o) { return fmt(o.p); }).join(' + ') + ' = ' + sgn(Q) + '. Esta suma es la que se va a restar.';
      else msg = 'Resultado · |A| = P − Q = ' + sgn(P) + ' − ' + fmt(Q) + ' = ' + sgn(det) + '.' + (det === 0 ? ' Determinante 0: la matriz es singular (no tiene inversa).' : ' Como es distinto de 0, la matriz es regular (tiene inversa).');
      text.textContent = msg;

      res.textContent = '';
      var rowP = el('div', 'sar-row'); rowP.appendChild(el('span', 'sar-tag down', '↘ signo +'));
      var rowQ = el('div', 'sar-row'); rowQ.appendChild(el('span', 'sar-tag up', '↗ signo −'));
      D.forEach(function (o, i) { if (step >= 2 + i) rowP.appendChild(chip(o, 'down' + (i === dI ? ' now' : ''))); });
      U.forEach(function (o, i) { if (step >= 6 + i) rowQ.appendChild(chip(o, 'up' + (i === uI ? ' now' : ''))); });
      if (step >= 5) { var tp = el('span', 'sar-sum down'); tp.textContent = 'P = ' + sgn(P); rowP.appendChild(tp); }
      if (step >= 9) { var tq = el('span', 'sar-sum up'); tq.textContent = 'Q = ' + sgn(Q); rowQ.appendChild(tq); }
      if (step >= 2) res.appendChild(rowP);
      if (step >= 6) res.appendChild(rowQ);
      if (step >= 10) { var f = el('div', 'sar-final'); f.textContent = '|A| = P − Q = ' + sgn(P) + ' − ' + fmt(Q) + ' = ' + sgn(det); res.appendChild(f); }

      bar.style.width = (step / N * 100) + '%';
      bPrev.disabled = step === 0; bNext.disabled = step === N;
      bPlay.textContent = timer ? '⏸ Pausa' : (step === N ? '↺ Repetir' : '▶ Reproducir');
    }

    function go(s) { step = Math.max(0, Math.min(N, s)); render(); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } render(); }
    function play() {
      if (step === N) step = 0;
      render();
      timer = setInterval(function () { if (step >= N) { stop(); return; } go(step + 1); if (step >= N) stop(); }, 1900);
      render();
    }
    window.addEventListener('beforeprint', function () { step = N; render(); });
    render();
  }

  function init() { document.querySelectorAll('.sarrus-demo').forEach(build); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
