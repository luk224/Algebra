/* Componentes interactivos y animaciones de los resúmenes de Álgebra.
   Cada componente se activa por su clase y se configura con atributos data-*:
   .anim-gauss   data-m="1,2,3;4,5,6" data-n="2" data-modo="gj|gauss|rango|inversa" data-vars="x,y,z"
   .anim-prod    data-a="1,2;3,4" data-b="5,6;7,8"
   .anim-adj     data-m="2,1,3;0,-1,4;1,2,1"
   .anim-rectas  data-v="1,1,3,1,-1,1"                 (a1,b1,c1,a2,b2,c2)
   .anim-area    data-v="2,1,0,2"                       (u=(a,c), v=(b,d))
   .anim-combo   data-modo="combo|coord" data-u="2,1" data-v="-1,2"
   .anim-union   data-d1="1,0" data-d2="0,1"
   .anim-oper    data-op="0|1|2|3"
   .anim-lineal  data-modo="lineal|nucimg" data-u="2,1" data-v="-1,2" data-m="1,2,2,4"   (aplicaciones lineales R2->R2)
   .anim-matriz  data-f1="1,2" data-f2="3,-1" data-x="2,1"   (matriz asociada: columnas = f(e1), f(e2); f(x) = x f(e1) + y f(e2))
   .anim-cambio  data-u="1,1" data-v="-1,1" data-x="3,1"   (cambio de base en R2: columnas de Q = base nueva; x_B = Q x_B′; rejilla de la base nueva)
   .anim-propios data-a="3,-2,1,0" data-x="2,1"   (A 2x2 y vector x deslizable: x frente a Ax, polinomio característico, valores propios y subespacios propios; presets sin valores reales y doble con d=1)
   .anim-semej   data-a="1,1,0,2" data-q="1,0,1,1"   (A 2x2 y Q regular: A'=Q^-1 A Q frente a Q^t A Q; det, traza e invariantes)
   .anim-diag    data-a="4,1,2,3" data-x="2,1"   (diagonalizar A 2x2 paso a paso: valores propios, d y alfa, veredicto, P y Lambda en el mismo orden, comprobacion P*Lambda = A*P y rejilla de la base propia con x_B' = P^-1 x; presets: distintos, doble d=2, doble d=1, giro 90, singular, irracionales)
   .anim-jordan  data-a="1,0,3;-1,2,0;0,0,2"   (forma de Jordan de A de 2x2 a 4x4, entradas enteras editables y presets: polinomio caracteristico y valores propios (reales; si hay complejas avisa de que no hay J real), rangos de (A-lI)^k, tamanos de bloques, J, cadenas y matriz de paso P paso a paso, comprobacion AP = PJ en fracciones exactas)
   .anim-gram    data-g="1,0,1" data-u="2,1" data-v="-1,2"   (producto escalar de R2 con matriz de Gram G=(a b; b c) editable [data-g = a,b,c; simetrica por construccion] y dos vectores u, v con sliders (coordenadas en la base de G): u.v = u^t G v, normas, coseno, angulo, ortogonalidad, distancia; dibujo fiel con Cholesky (los angulos que se ven son los de el producto); avisa si G no es definida positiva (Sylvester) con un vector testigo x.x<=0; presets: estandar, U Ej. 5.5, propios, no definida positiva, semidefinida)
   .anim-ortog   data-a="1,0,0,1" data-x="2,1" data-y="0.5,1.5"   (matriz A 2x2 [a b; c d] editable, deslizador de angulo theta con botones Giro R_theta / Simetria S_theta y presets: muestra A^tA, si es ortogonal (tolerancia 0,005), det, el cuadrado unidad y su imagen, dos vectores x, y con sliders y sus imagenes Ax, Ay (se conservan normas, producto escalar y angulo solo si A es ortogonal) y el tipo: giro de angulo theta o simetria respecto de la recta de angulo theta/2; si no es ortogonal indica que condicion de las columnas falla)
   .anim-simet   data-a="3,1,3"   (matriz 2x2 de filas (a b; d c) con a, b, c editables y casilla "simetrica" [d = b]; deslizador de angulo phi para un punto x de la circunferencia unidad: x frente a Ax, la elipse imagen de la circunferencia unidad y presets. Si es simetrica: discriminante (a-c)^2+4b^2 >= 0 (valores propios siempre reales), valores propios l1 >= l2, ejes principales u1, u2 perpendiculares (rectas punteadas) con los semiejes |l1|, |l2| de la elipse, angulo theta = 1/2 atan2(2b, a-c) de la matriz de paso P (giro de det 1), P^t A P = diag(l1, l2) calculado numericamente y aviso cuando x esta sobre un eje principal. Si se desmarca la casilla: valores y vectores propios de una A cualquiera, angulo entre los ejes propios (distinto de 90 grados) y por que no hay P ortogonal; presets: matrices del tema 5.3, singular, diagonal, valor doble, contrastes no simetricos)
*/
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function sv(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }
  function html(e, h) { e.innerHTML = h; return e; }
  var MINUS = '−';

  /* ---------- fracciones exactas ---------- */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function F(n, d) { d = d == null ? 1 : d; if (d < 0) { n = -n; d = -d; } var g = gcd(n, d); return { n: n / g, d: d / g }; }
  function add(a, b) { return F(a.n * b.d + b.n * a.d, a.d * b.d); }
  function sub(a, b) { return F(a.n * b.d - b.n * a.d, a.d * b.d); }
  function mul(a, b) { return F(a.n * b.n, a.d * b.d); }
  function div(a, b) { return F(a.n * b.d, a.d * b.n); }
  function isz(a) { return a.n === 0; }
  function ise(a, k) { return a.n === k * a.d; }
  function neg(a) { return F(-a.n, a.d); }
  function ftxt(a) { return a.d === 1 ? (a.n < 0 ? MINUS + (-a.n) : String(a.n)) : (a.n < 0 ? MINUS : '') + Math.abs(a.n) + '/' + a.d; }
  function fhtml(a) {
    if (a.d === 1) return a.n < 0 ? MINUS + (-a.n) : String(a.n);
    return (a.n < 0 ? MINUS : '') + '<span class="fr"><i>' + Math.abs(a.n) + '</i><i>' + a.d + '</i></span>';
  }
  function fpar(a) { return (a.n < 0) ? '(' + ftxt(a) + ')' : ftxt(a); }
  function num(x, dec) { var v = Math.round(x * 100) / 100; var s = String(v); if (dec) s = v.toFixed(dec); return s.replace('-', MINUS); }

  /* ---------- barra de control común ---------- */
  function stepper(root, N, render, hint, speed) {
    var st = { step: 0, N: N, timer: null };
    var text = el('p', 'sar-text'); text.setAttribute('aria-live', 'polite');
    var prog = el('div', 'sar-prog'), bar = el('i'); prog.appendChild(bar);
    var ctrl = el('div', 'sar-ctrl');
    function btn(label, fn, cls) { var b = el('button', cls || '', label); b.type = 'button'; b.addEventListener('click', fn); ctrl.appendChild(b); return b; }
    var bPrev = btn('◀ Anterior', function () { stop(); go(st.step - 1); });
    var bPlay = btn('▶ Reproducir', function () { st.timer ? stop() : play(); }, 'play');
    var bNext = btn('Siguiente ▶', function () { stop(); go(st.step + 1); });
    btn('↺ Reiniciar', function () { stop(); go(0); });
    function refresh() {
      bar.style.width = (st.N ? st.step / st.N * 100 : 0) + '%';
      bPrev.disabled = st.step === 0; bNext.disabled = st.step >= st.N;
      bPlay.textContent = st.timer ? '⏸ Pausa' : (st.step >= st.N ? '↺ Repetir' : '▶ Reproducir');
    }
    function go(s) { st.step = Math.max(0, Math.min(st.N, s)); render(st.step, text); refresh(); }
    function stop() { if (st.timer) { clearInterval(st.timer); st.timer = null; } refresh(); }
    function play() {
      if (st.step >= st.N) st.step = 0; go(st.step);
      st.timer = setInterval(function () { if (st.step >= st.N) { stop(); return; } go(st.step + 1); if (st.step >= st.N) stop(); }, speed || 2200);
      refresh();
    }
    st.go = go; st.stop = stop; st.text = text; st.setN = function (n) { st.N = n; };
    st.mount = function (parent, before) {
      var first = parent.firstChild;                       // botones y barra ARRIBA: no se mueven al crecer el contenido
      if (first) { parent.insertBefore(ctrl, first); parent.insertBefore(prog, first); } else { parent.appendChild(ctrl); parent.appendChild(prog); }
      parent.appendChild(text);
      if (before) parent.appendChild(before);
      if (hint) parent.appendChild(el('p', 'sar-hint', hint));
    };
    return st;
  }

  function parseM(str) { return str.split(';').map(function (r) { return r.split(',').map(function (x) { return F(parseInt(x, 10) || 0, 1); }); }); }
  function cloneM(M) { return M.map(function (r) { return r.slice(); }); }

  /* =====================================================================
     1. GAUSS / GAUSS-JORDAN / RANGO / INVERSA
     ===================================================================== */
  function buildGauss(root) {
    var modo = root.getAttribute('data-modo') || 'gj';
    var A0 = parseM(root.getAttribute('data-m') || '1,2,-1,3;2,1,1,4;1,-1,2,1');
    var ncol = A0[0].length;
    var n = parseInt(root.getAttribute('data-n') || (modo === 'rango' ? ncol : (modo === 'inversa' ? ncol : ncol - 1)), 10);
    var vars = (root.getAttribute('data-vars') || (n <= 3 ? 'x,y,z' : 'x1,x2,x3,x4,x5,x6')).split(',');
    var steps = [];
    root.textContent = ''; root.classList.add('sarrus', 'an-gauss');

    function buildSteps() {
      steps = [];
      var M = cloneM(A0), rows = M.length;
      if (modo === 'inversa') {
        for (var i = 0; i < rows; i++) for (var j = 0; j < rows; j++) M[i].push(F(i === j ? 1 : 0));
      }
      var tot = M[0].length;
      var full = (modo === 'gj' || modo === 'inversa' || modo === 'rango');
      steps.push({ M: cloneM(M), txt: modo === 'inversa'
        ? 'Escribimos la matriz ampliada <b>(A | I)</b>: a la izquierda A y a la derecha la identidad. Vamos a convertir A en I con operaciones por filas; la identidad se transformará en A⁻¹.'
        : (modo === 'rango' ? 'Matriz de partida. Vamos a escalonarla con operaciones elementales por filas; el rango será el número de filas no nulas.'
          : 'Matriz ampliada <b>(A | b)</b> del sistema. Aplicamos operaciones elementales por filas (no cambian las soluciones) hasta que quede ' + (full ? 'reducida (Gauss-Jordan)' : 'escalonada (Gauss)') + '.'),
        hi: {}, op: '' });
      var r = 0;
      for (var c = 0; c < n && r < rows; c++) {
        var k = -1;
        for (var q = r; q < rows; q++) if (!isz(M[q][c])) { k = q; break; }
        if (k < 0) {
          steps.push({ M: cloneM(M), txt: 'Columna ' + (c + 1) + ': a partir de la fila ' + (r + 1) + ' todos son 0, así que no hay pivote en esta columna y pasamos a la siguiente.', hi: { col: c }, op: '' });
          continue;
        }
        if (k !== r) {
          var t = M[r]; M[r] = M[k]; M[k] = t;
          steps.push({ M: cloneM(M), txt: 'El pivote de la columna ' + (c + 1) + ' no puede ser 0: <b>intercambiamos F' + (r + 1) + ' ↔ F' + (k + 1) + '</b> para subir una fila con un elemento distinto de 0.', hi: { pivot: [r, c], rows: [r, k] }, op: 'F' + (r + 1) + ' ↔ F' + (k + 1) });
        }
        var p = M[r][c];
        if (full && !ise(p, 1)) {
          for (var j2 = 0; j2 < tot; j2++) M[r][j2] = div(M[r][j2], p);
          steps.push({ M: cloneM(M), txt: 'Dividimos la fila del pivote entre <b>' + ftxt(p) + '</b> para que el pivote valga 1: <b>F' + (r + 1) + ' → (1/' + fpar(p) + ')·F' + (r + 1) + '</b>.', hi: { pivot: [r, c], rows: [r] }, op: 'F' + (r + 1) + ' → F' + (r + 1) + ' / ' + fpar(p) });
          p = M[r][c];
        }
        for (var i2 = (full ? 0 : r + 1); i2 < rows; i2++) {
          if (i2 === r || isz(M[i2][c])) continue;
          var f = div(M[i2][c], p);
          var old = M[i2][c];
          for (var j3 = 0; j3 < tot; j3++) M[i2][j3] = sub(M[i2][j3], mul(f, M[r][j3]));
          var signo = f.n < 0 ? '+ ' + ftxt(neg(f)) : MINUS + ' ' + ftxt(f);
          steps.push({ M: cloneM(M), txt: 'Hacemos 0 el <b>' + ftxt(old) + '</b> de la fila ' + (i2 + 1) + ' (columna ' + (c + 1) + '): <b>F' + (i2 + 1) + ' → F' + (i2 + 1) + ' ' + signo + '·F' + (r + 1) + '</b>. Se ' + (f.n < 0 ? 'suma' : 'resta') + ' a la fila ' + (i2 + 1) + ' un múltiplo de la fila del pivote.', hi: { pivot: [r, c], rows: [i2], zero: [i2, c] }, op: 'F' + (i2 + 1) + ' → F' + (i2 + 1) + ' ' + signo + '·F' + (r + 1) });
        }
        r++;
      }
      // mensaje final
      var rankA = 0, rankAb = 0;
      for (var i3 = 0; i3 < rows; i3++) {
        var nzA = false, nzAll = false;
        for (var j4 = 0; j4 < n; j4++) if (!isz(M[i3][j4])) nzA = true;
        for (var j5 = 0; j5 < tot; j5++) if (!isz(M[i3][j5])) nzAll = true;
        if (nzA) rankA++; if (nzAll) rankAb++;
      }
      var fin = '';
      if (modo === 'rango') fin = '<b>Matriz escalonada.</b> Tiene ' + rankA + ' fila' + (rankA === 1 ? '' : 's') + ' no nula' + (rankA === 1 ? '' : 's') + ': <b>rango = ' + rankA + '</b>.';
      else if (modo === 'inversa') {
        var isI = rankA === rows && n === rows;
        if (isI) {
          fin = '<b>A se ha convertido en I</b>, así que la parte derecha es <b>A⁻¹</b>.';
        } else fin = '<b>A no se puede convertir en I</b> (rango ' + rankA + ' < ' + rows + '): A <b>no es invertible</b>.';
      } else {
        var inc = false;
        for (var i4 = 0; i4 < rows; i4++) { var zz = true; for (var j6 = 0; j6 < n; j6++) if (!isz(M[i4][j6])) zz = false; if (zz && !isz(M[i4][n])) inc = true; }
        if (inc) fin = 'Una fila ha quedado <b>0 = número distinto de 0</b>: imposible. rango(A) = ' + rankA + ' ≠ rango(A|b) = ' + rankAb + ' ⇒ sistema <b>incompatible</b> (no tiene solución).';
        else if (rankA === n) fin = 'rango(A) = rango(A|b) = ' + rankA + ' = n.º de incógnitas ⇒ sistema <b>compatible determinado</b>. ' + solucion(M, n, full, vars, rows);
        else fin = 'rango(A) = rango(A|b) = ' + rankA + ' < ' + n + ' incógnitas ⇒ sistema <b>compatible indeterminado</b> (' + (n - rankA) + ' parámetro' + (n - rankA > 1 ? 's' : '') + ' libre' + (n - rankA > 1 ? 's' : '') + '). ' + solucion(M, n, full, vars, rows);
      }
      steps.push({ M: cloneM(M), txt: fin, hi: { fin: true }, op: '', final: true });
    }

    // solución a partir de la forma final (se re-reduce internamente para leer parámetros)
    function solucion(M, n, full, vars, rows) {
      var R = cloneM(M), r = 0, piv = [];
      for (var c = 0; c < n && r < rows; c++) {
        var k = -1; for (var q = r; q < rows; q++) if (!isz(R[q][c])) { k = q; break; }
        if (k < 0) continue;
        var t = R[r]; R[r] = R[k]; R[k] = t;
        var p = R[r][c]; for (var j = 0; j < R[r].length; j++) R[r][j] = div(R[r][j], p);
        for (var i = 0; i < rows; i++) if (i !== r && !isz(R[i][c])) { var f = R[i][c]; for (var j2 = 0; j2 < R[i].length; j2++) R[i][j2] = sub(R[i][j2], mul(f, R[r][j2])); }
        piv.push(c); r++;
      }
      var free = []; for (var cc = 0; cc < n; cc++) if (piv.indexOf(cc) < 0) free.push(cc);
      var greek = ['α', 'β', 'γ', 'δ'];
      var out = [];
      for (var pi = 0; pi < piv.length; pi++) {
        var rowi = pi, s = ftxt(R[rowi][n]);
        var parts = [];
        if (!isz(R[rowi][n]) || free.length === 0) parts.push(ftxt(R[rowi][n]));
        for (var fi = 0; fi < free.length; fi++) {
          var co = neg(R[rowi][free[fi]]);
          if (isz(co)) continue;
          var term = (ise(co, 1) ? '' : (ise(co, -1) ? MINUS : ftxt(co) + '·')) + greek[fi];
          parts.push(term);
        }
        var expr = parts.length ? parts.join(' + ').replace(/\+ −/g, MINUS + ' ') : '0';
        out.push({ c: piv[pi], t: vars[piv[pi]] + ' = ' + expr });
      }
      for (var fj = 0; fj < free.length; fj++) out.push({ c: free[fj], t: vars[free[fj]] + ' = ' + greek[fj] });
      out.sort(function (a, b) { return a.c - b.c; });
      return (full ? 'Se lee directamente: ' : 'Resolviendo de abajo hacia arriba (sustitución hacia atrás): ') + '<b>' + out.map(function (o) { return o.t; }).join(', ') + '</b>' + (free.length ? ' (' + free.map(function (_, i) { return greek[i]; }).join(', ') + ' ∈ ℝ).' : '.');
    }

    // ---- DOM ----
    var tableWrap = el('div', 'gj-wrap');
    var opLine = el('div', 'gj-op');
    var detail = el('details', 'gj-edit');
    detail.appendChild(el('summary', '', '✎ Cambiar la matriz'));
    var edGrid = el('div', 'gj-grid');
    var applyBtn = el('button', 'gj-apply', 'Aplicar'); applyBtn.type = 'button';
    detail.appendChild(edGrid); detail.appendChild(applyBtn);
    var inputs = [];
    function mkInputs() {
      edGrid.textContent = ''; inputs = [];
      edGrid.style.gridTemplateColumns = 'repeat(' + ncol + ',3.2em)';
      for (var i = 0; i < A0.length; i++) for (var j = 0; j < ncol; j++) {
        var inp = el('input'); inp.type = 'number'; inp.step = 1; inp.value = A0[i][j].n; inp.setAttribute('aria-label', 'fila ' + (i + 1) + ' columna ' + (j + 1)); edGrid.appendChild(inp); inputs.push(inp);
      }
    }
    var st;
    function render(s, text) {
      var S = steps[s]; tableWrap.textContent = '';
      var M = S.M, tot = M[0].length, hi = S.hi || {};
      var tb = el('table', 'gj-m');
      for (var i = 0; i < M.length; i++) {
        var tr = el('tr');
        var lab = el('th', 'gj-lab', 'F' + (i + 1)); tr.appendChild(lab);
        var changed = hi.rows && hi.rows.indexOf(i) >= 0;
        for (var j = 0; j < tot; j++) {
          var td = el('td'); html(td, fhtml(M[i][j]));
          if (j === 0) td.classList.add('lb');
          if (j === tot - 1) td.classList.add('rb');
          if ((modo !== 'rango') && j === n) td.classList.add('bar');
          if (changed) td.classList.add('chg');
          if (hi.pivot && hi.pivot[0] === i && hi.pivot[1] === j) td.classList.add('piv');
          if (hi.zero && hi.zero[0] === i && hi.zero[1] === j) td.classList.add('zer');
          if (hi.col === j) td.classList.add('colhi');
          if (modo === 'inversa' && S.final && j >= n && steps[s].M && true) td.classList.add('inv');
          tr.appendChild(td);
        }
        tb.appendChild(tr);
      }
      tableWrap.appendChild(tb);
      opLine.textContent = S.op ? 'Operación: ' + S.op : '';
      html(text, S.txt);
    }
    buildSteps(); mkInputs();
    st = stepper(root, steps.length - 1, render, null, 2600);
    root.appendChild(tableWrap); root.appendChild(opLine);
    st.mount(root);
    root.appendChild(detail);
    applyBtn.addEventListener('click', function () {
      var k = 0; for (var i = 0; i < A0.length; i++) for (var j = 0; j < ncol; j++) A0[i][j] = F(parseInt(inputs[k++].value, 10) || 0, 1);
      st.stop(); buildSteps(); st.setN(steps.length - 1); st.go(0);
    });
    st.go(0);
    window.addEventListener('beforeprint', function () { st.go(steps.length - 1); });
  }

  /* =====================================================================
     2. PRODUCTO DE MATRICES (fila x columna)
     ===================================================================== */
  function buildProd(root) {
    var A = parseM(root.getAttribute('data-a') || '1,2;3,4;5,6'), B = parseM(root.getAttribute('data-b') || '7,8,9;10,11,12');
    var m = A.length, k = A[0].length, p = B[0].length;
    root.textContent = ''; root.classList.add('sarrus');
    var C = []; for (var i = 0; i < m; i++) { C[i] = []; for (var j = 0; j < p; j++) { var s = F(0); for (var q = 0; q < k; q++) s = add(s, mul(A[i][q], B[q][j])); C[i][j] = s; } }
    var wrap = el('div', 'pm-wrap');
    function grid(M, cls) { var t = el('table', 'gj-m pm ' + cls); M.forEach(function (row, i) { var tr = el('tr'); row.forEach(function (v, j) { var td = el('td'); html(td, fhtml(v)); if (j === 0) td.classList.add('lb'); if (j === row.length - 1) td.classList.add('rb'); tr.appendChild(td); }); t.appendChild(tr); }); return t; }
    var tA = grid(A, 'pa'), tB = grid(B, 'pb'), tC = grid(C.map(function (r) { return r.map(function () { return F(0); }); }), 'pc');
    var op1 = el('span', 'pm-sym', '×'), op2 = el('span', 'pm-sym', '='), lA = el('div', 'pm-col'), lB = el('div', 'pm-col'), lC = el('div', 'pm-col');
    lA.appendChild(tA); lA.appendChild(el('small', '', 'A (' + m + '×' + k + ')'));
    lB.appendChild(tB); lB.appendChild(el('small', '', 'B (' + k + '×' + p + ')'));
    lC.appendChild(tC); lC.appendChild(el('small', '', 'C = A·B (' + m + '×' + p + ')'));
    wrap.appendChild(lA); wrap.appendChild(op1); wrap.appendChild(lB); wrap.appendChild(op2); wrap.appendChild(lC);
    var res = el('div', 'sar-res');
    function render(s, text) {
      var cells = function (t) { return t.querySelectorAll('td'); };
      [tA, tB, tC].forEach(function (t) { cells(t).forEach(function (td) { td.classList.remove('hr', 'hc', 'hx'); }); });
      var done = s - 1, ci = Math.floor((s - 1) / p), cj = (s - 1) % p;
      cells(tC).forEach(function (td, idx) { var ii = Math.floor(idx / p), jj = idx % p; var filled = s > 0 && (ii * p + jj) <= (s - 1); html(td, filled ? fhtml(C[ii][jj]) : '<span class="q">?</span>'); });
      res.textContent = '';
      if (s === 0) { text.textContent = 'Para multiplicar A·B, cada elemento de C se obtiene multiplicando una FILA de A por una COLUMNA de B, elemento a elemento, y sumando. Hace falta que A tenga tantas columnas como filas tiene B (' + k + ' = ' + k + ').'; return; }
      cells(tA).forEach(function (td, idx) { if (Math.floor(idx / k) === ci) td.classList.add('hr'); });
      cells(tB).forEach(function (td, idx) { if (idx % p === cj) td.classList.add('hc'); });
      cells(tC).forEach(function (td, idx) { if (idx === ci * p + cj) td.classList.add('hx'); });
      var terms = [], vals = [];
      for (var q2 = 0; q2 < k; q2++) { terms.push(fpar(A[ci][q2]) + '·' + fpar(B[q2][cj])); vals.push(ftxt(mul(A[ci][q2], B[q2][cj]))); }
      text.textContent = 'Elemento c' + (ci + 1) + (cj + 1) + ' = (fila ' + (ci + 1) + ' de A) · (columna ' + (cj + 1) + ' de B).';
      var line = el('div', 'sar-final'); line.textContent = 'c' + (ci + 1) + (cj + 1) + ' = ' + terms.join(' + ') + ' = ' + vals.join(' + ').replace(/\+ −/g, MINUS + ' ') + ' = ' + ftxt(C[ci][cj]);
      res.appendChild(line);
    }
    var st = stepper(root, m * p, render, null, 2400);
    root.appendChild(wrap); st.mount(root, res);
    st.go(0);
    window.addEventListener('beforeprint', function () { st.go(m * p); });
  }

  /* =====================================================================
     3. DESARROLLO POR ADJUNTOS (3x3)
     ===================================================================== */
  function buildAdj(root) {
    var M = parseM(root.getAttribute('data-m') || '2,1,3;0,-1,4;1,2,1');
    var line = { tipo: 'f', idx: 0 };
    root.textContent = ''; root.classList.add('sarrus');
    var ctrlSel = el('div', 'adj-sel');
    var selT = el('select'); [['f', 'una fila'], ['c', 'una columna']].forEach(function (o) { var op = el('option', '', o[1]); op.value = o[0]; selT.appendChild(op); });
    var selI = el('select'); [0, 1, 2].forEach(function (i) { var op = el('option', '', 'n.º ' + (i + 1)); op.value = i; selI.appendChild(op); });
    ctrlSel.appendChild(el('span', '', 'Desarrollar por ')); ctrlSel.appendChild(selT); ctrlSel.appendChild(selI);
    ctrlSel.appendChild(el('span', 'adj-tip', ' (consejo: elige la línea con más ceros)'));
    var wrap = el('div', 'pm-wrap');
    var tbl = el('table', 'gj-m pm');
    for (var i = 0; i < 3; i++) { var tr = el('tr'); for (var j = 0; j < 3; j++) { var td = el('td'); td.textContent = ftxt(M[i][j]); if (j === 0) td.classList.add('lb'); if (j === 2) td.classList.add('rb'); tr.appendChild(td); } tbl.appendChild(tr); }
    var signT = el('table', 'gj-m pm sg');
    for (var i2 = 0; i2 < 3; i2++) { var tr2 = el('tr'); for (var j2 = 0; j2 < 3; j2++) { var t2 = el('td'); t2.textContent = ((i2 + j2) % 2 === 0) ? '+' : MINUS; if (j2 === 0) t2.classList.add('lb'); if (j2 === 2) t2.classList.add('rb'); tr2.appendChild(t2); } signT.appendChild(tr2); }
    var cA = el('div', 'pm-col'); cA.appendChild(tbl); cA.appendChild(el('small', '', 'Matriz A'));
    var cS = el('div', 'pm-col'); cS.appendChild(signT); cS.appendChild(el('small', '', 'Signos (−1)^(i+j): tablero de ajedrez'));
    wrap.appendChild(cA); wrap.appendChild(cS);
    var res = el('div', 'sar-res');
    function terms() {
      var out = [];
      for (var t = 0; t < 3; t++) {
        var r = line.tipo === 'f' ? line.idx : t, c = line.tipo === 'f' ? t : line.idx;
        var rs = [0, 1, 2].filter(function (x) { return x !== r; }), cs = [0, 1, 2].filter(function (x) { return x !== c; });
        var a = M[rs[0]][cs[0]], b = M[rs[0]][cs[1]], cc = M[rs[1]][cs[0]], d = M[rs[1]][cs[1]];
        var minor = sub(mul(a, d), mul(b, cc));
        var sg = ((r + c) % 2 === 0) ? 1 : -1;
        out.push({ r: r, c: c, el: M[r][c], a: a, b: b, cc: cc, d: d, minor: minor, sg: sg, val: mul(F(sg), mul(M[r][c], minor)) });
      }
      return out;
    }
    function render(s, text) {
      var tds = tbl.querySelectorAll('td'); tds.forEach(function (td) { td.className = td.className.replace(/\b(hl|dim|mn|el)\b/g, '').trim(); });
      signT.querySelectorAll('td').forEach(function (td) { td.classList.remove('hl'); });
      var T = terms(); res.textContent = '';
      var nombre = line.tipo === 'f' ? 'la fila ' + (line.idx + 1) : 'la columna ' + (line.idx + 1);
      if (s === 0) {
        for (var t0 = 0; t0 < 3; t0++) { tds[T[t0].r * 3 + T[t0].c].classList.add('hl'); signT.querySelectorAll('td')[T[t0].r * 3 + T[t0].c].classList.add('hl'); }
        text.textContent = 'Elegimos desarrollar por ' + nombre + '. El determinante es la suma de (signo)·(elemento)·(menor) para cada elemento de esa línea. El menor de a_ij es el determinante 2×2 que queda al tachar su fila y su columna.';
        return;
      }
      var sumTo = Math.min(s, 3);
      for (var t = 0; t < sumTo; t++) {
        var X = T[t];
        var row = el('div', 'sar-row');
        var chip = el('span', 'sar-chip ' + (X.sg > 0 ? 'down' : 'up') + (t === s - 1 ? ' now' : ''));
        chip.textContent = (X.sg > 0 ? '+' : MINUS) + ' ' + fpar(X.el) + ' \u00B7 (' + fpar(X.a) + '\u00B7' + fpar(X.d) + ' \u2212 ' + fpar(X.b) + '\u00B7' + fpar(X.cc) + ') = ' + (X.sg > 0 ? '+' : MINUS) + ' ' + fpar(X.el) + ' \u00B7 (' + ftxt(X.minor) + ') = ' + ftxt(X.val);
        row.appendChild(chip); res.appendChild(row);
      }
      if (s <= 3) {
        var X2 = T[s - 1];
        for (var i3 = 0; i3 < 3; i3++) for (var j3 = 0; j3 < 3; j3++) {
          var td3 = tds[i3 * 3 + j3];
          if (i3 === X2.r && j3 === X2.c) td3.classList.add('el');
          else if (i3 === X2.r || j3 === X2.c) td3.classList.add('dim');
          else td3.classList.add('mn');
        }
        signT.querySelectorAll('td')[X2.r * 3 + X2.c].classList.add('hl');
        text.textContent = 'Término ' + s + ': elemento a' + (X2.r + 1) + (X2.c + 1) + ' = ' + ftxt(X2.el) + '. Se tacha su fila y su columna (gris); el menor es el determinante 2×2 que queda (azul): ' + ftxt(X2.a) + '·' + fpar(X2.d) + ' − ' + fpar(X2.b) + '·' + fpar(X2.cc) + ' = ' + ftxt(X2.minor) + '. Signo: ' + (X2.sg > 0 ? '+' : MINUS) + ' (casilla ' + (X2.r + 1) + ',' + (X2.c + 1) + ' del tablero).';
      } else {
        var tot = T[0].val; tot = add(add(T[0].val, T[1].val), T[2].val);
        var f = el('div', 'sar-final'); f.textContent = '|A| = ' + T.map(function (x) { return ftxt(x.val); }).join(' + ').replace(/\+ −/g, MINUS + ' ') + ' = ' + ftxt(tot);
        res.appendChild(f);
        text.textContent = 'Se suman los tres términos. Se obtiene el mismo valor que con Sarrus: el determinante no depende de la línea elegida.';
      }
    }
    var st = stepper(root, 4, render, 'Prueba a cambiar la línea: el resultado siempre es el mismo.', 2800);
    root.appendChild(ctrlSel); root.appendChild(wrap); st.mount(root, res);
    function onSel() { line.tipo = selT.value; line.idx = parseInt(selI.value, 10); st.stop(); st.go(0); }
    selT.addEventListener('change', onSel); selI.addEventListener('change', onSel);
    st.go(0);
    window.addEventListener('beforeprint', function () { st.go(4); });
  }

  /* =====================================================================
     helpers para planos SVG
     ===================================================================== */
  function plane(root, W, H, R) {
    var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'an-svg', role: 'img' });
    var sx = W / (2 * R), sy = H / (2 * R);
    var X = function (x) { return W / 2 + x * sx; }, Y = function (y) { return H / 2 - y * sy; };
    for (var g = -R; g <= R; g++) {
      svg.appendChild(sv('line', { x1: X(g), y1: 0, x2: X(g), y2: H, 'class': g === 0 ? 'an-ax' : 'an-gr' }));
      svg.appendChild(sv('line', { x1: 0, y1: Y(g), x2: W, y2: Y(g), 'class': g === 0 ? 'an-ax' : 'an-gr' }));
    }
    for (var t = -R + 1; t < R; t += (R > 5 ? 2 : 1)) if (t !== 0) {
      var a = sv('text', { x: X(t), y: Y(0) + 13, 'class': 'an-tk', 'text-anchor': 'middle' }); a.textContent = t.toString().replace('-', MINUS); svg.appendChild(a);
      var b = sv('text', { x: X(0) - 5, y: Y(t) + 4, 'class': 'an-tk', 'text-anchor': 'end' }); b.textContent = t.toString().replace('-', MINUS); svg.appendChild(b);
    }
    var layer = sv('g', {}); svg.appendChild(layer);
    return { svg: svg, X: X, Y: Y, layer: layer, W: W, H: H, R: R, clear: function () { while (layer.firstChild) layer.removeChild(layer.firstChild); } };
  }
  function arrow(P, x1, y1, x2, y2, cls, label) {
    var X = P.X, Y = P.Y, L = P.layer;
    var ax = X(x2), ay = Y(y2), bx = X(x1), by = Y(y1);
    var dx = ax - bx, dy = ay - by, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
    L.appendChild(sv('line', { x1: bx, y1: by, x2: ax - ux * 2, y2: ay - uy * 2, 'class': 'an-vec ' + cls }));
    if (len > 6) L.appendChild(sv('polygon', { points: ax + ',' + ay + ' ' + (ax - ux * 11 - uy * 5) + ',' + (ay - uy * 11 + ux * 5) + ' ' + (ax - ux * 11 + uy * 5) + ',' + (ay - uy * 11 - ux * 5), 'class': 'an-head ' + cls }));
    if (label) { var lx = ax + (ux >= 0 ? 8 : -8), anc = ux >= 0 ? 'start' : 'end', ly = ay - (uy >= 0 ? -14 : 8), w0 = label.length * 9; if (anc === 'start' && lx + w0 > P.W - 4) { lx = ax - 8; anc = 'end'; } if (anc === 'end' && lx - w0 < 4) { lx = ax + 8; anc = 'start'; } if (ly < 14) ly = 14; if (ly > P.H - 6) ly = P.H - 6; var tx = sv('text', { x: lx, y: ly, 'class': 'an-lb ' + cls, 'text-anchor': anc }); tx.textContent = label; L.appendChild(tx); }
  }
  function numInput(val, step, w) { var i = el('input', 'an-in'); i.type = 'number'; i.value = val; i.step = step || 1; if (w) i.style.width = w; return i; }
  function slider(min, max, step, val) { var s = el('input', 'an-sl'); s.type = 'range'; s.min = min; s.max = max; s.step = step; s.value = val; return s; }
  function btnRow(items, fn) { var d = el('div', 'sar-ctrl an-presets'); items.forEach(function (it, i) { var b = el('button', '', it); b.type = 'button'; b.addEventListener('click', function () { fn(i); }); d.appendChild(b); }); return d; }

  /* =====================================================================
     4. SISTEMA 2x2 COMO DOS RECTAS
     ===================================================================== */
  function buildRectas(root) {
    var v0 = (root.getAttribute('data-v') || '1,1,3,1,-1,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 360, 360, 6);
    var inp = [];
    var box = el('div', 'an-eqs');
    function eqRow(k) {
      var d = el('div', 'an-eq ' + (k ? 'up' : 'down'));
      var a = numInput(v0[3 * k], .5, '3.6em'), b = numInput(v0[3 * k + 1], .5, '3.6em'), c = numInput(v0[3 * k + 2], .5, '3.6em');
      d.appendChild(a); d.appendChild(el('span', '', ' x + ')); d.appendChild(b); d.appendChild(el('span', '', ' y = ')); d.appendChild(c);
      inp.push(a, b, c); box.appendChild(d);
    }
    eqRow(0); eqRow(1);
    var text = el('p', 'sar-text'), info = el('div', 'sar-res');
    var pre = btnRow(['Se cortan en un punto', 'Paralelas (sin solución)', 'La misma recta (infinitas)'], function (i) {
      var p = [[1, 1, 3, 1, -1, 1], [1, 1, 3, 2, 2, 2], [1, 2, 4, 2, 4, 8]][i]; inp.forEach(function (x, j) { x.value = p[j]; }); draw();
    });
    function line(a, b, c, cls) {
      var R = P.R, pts = [];
      if (Math.abs(b) > 1e-9) { [-R, R].forEach(function (x) { pts.push([x, (c - a * x) / b]); }); }
      else if (Math.abs(a) > 1e-9) { [-R, R].forEach(function (y) { pts.push([c / a, y]); }); }
      else return;
      P.layer.appendChild(sv('line', { x1: P.X(pts[0][0]), y1: P.Y(pts[0][1]), x2: P.X(pts[1][0]), y2: P.Y(pts[1][1]), 'class': 'an-ln ' + cls }));
    }
    function draw() {
      var v = inp.map(function (x) { return parseFloat(x.value) || 0; });
      var a1 = v[0], b1 = v[1], c1 = v[2], a2 = v[3], b2 = v[4], c2 = v[5];
      P.clear(); line(a1, b1, c1, 'down'); line(a2, b2, c2, 'up');
      var det = a1 * b2 - a2 * b1, eps = 1e-9, rA, rAb;
      var nz = function (x) { return Math.abs(x) > eps; };
      if (nz(det)) { rA = 2; rAb = 2; } else { rA = (nz(a1) || nz(b1) || nz(a2) || nz(b2)) ? 1 : 0; rAb = (nz(a1 * c2 - a2 * c1) || nz(b1 * c2 - b2 * c1)) ? 2 : ((rA || nz(c1) || nz(c2)) ? 1 : 0); }
      var msg;
      if (rA === 2) {
        var x = (c1 * b2 - c2 * b1) / det, y = (a1 * c2 - a2 * c1) / det;
        P.layer.appendChild(sv('circle', { cx: P.X(x), cy: P.Y(y), r: 6, 'class': 'an-dot' }));
        msg = '<b>Compatible determinado.</b> Las rectas se cortan en un único punto <b>(' + num(x) + ', ' + num(y) + ')</b>. rango(A) = rango(A|b) = 2 = n.º de incógnitas. (det A = ' + num(det) + ' ≠ 0.)';
      } else if (rA === rAb) msg = '<b>Compatible indeterminado.</b> Las dos ecuaciones describen la <b>misma recta</b>: infinitas soluciones. rango(A) = rango(A|b) = ' + rA + ' < 2 incógnitas.';
      else msg = '<b>Incompatible.</b> Las rectas son <b>paralelas</b> y distintas: no hay solución. rango(A) = ' + rA + ' ≠ rango(A|b) = ' + rAb + '.';
      html(text, msg);
    }
    inp.forEach(function (x) { x.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Cada ecuación a·x + b·y = c es una recta; resolver el sistema es buscar los puntos comunes a las dos rectas.'));
    root.appendChild(box); root.appendChild(P.svg); root.appendChild(text); root.appendChild(pre);
    root.appendChild(el('p', 'sar-hint', 'Cambia los coeficientes (puedes usar decimales) o pulsa un caso.'));
    draw();
  }

  /* =====================================================================
     5. DETERMINANTE 2x2 COMO ÁREA ORIENTADA
     ===================================================================== */
  function buildArea(root) {
    var v0 = (root.getAttribute('data-v') || '2,1,0,2').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 360, 360, 5);
    var names = ['a', 'b', 'c', 'd'], sl = [], lab = [];
    var grid = el('div', 'an-sliders');
    var order = [0, 2, 1, 3];   // u=(a,c), v=(b,d)
    var titles = ['u₁', 'u₂', 'v₁', 'v₂'];
    order.forEach(function (idx, k) {
      var row = el('label', 'an-slrow'); var s = slider(-4, 4, 0.5, v0[idx]); var lb = el('b', '', '');
      row.appendChild(el('span', '', titles[k] + ' ')); row.appendChild(s); row.appendChild(lb); grid.appendChild(row); sl[idx] = s; lab[idx] = lb;
    });
    var text = el('p', 'sar-text'), fin = el('div', 'sar-res');
    var pre = btnRow(['u=(1,0), v=(0,1)', 'Intercambiar u y v', 'Duplicar u', 'v paralelo a u', 'Sumar u a v'], function (i) {
      var cur = sl.map(function (s) { return parseFloat(s.value); });  // [a,b,c,d]
      var set = function (a, b, c, d) { [a, b, c, d].forEach(function (x, j) { sl[j].value = x; }); };
      if (i === 0) set(1, 0, 0, 1);
      if (i === 1) set(cur[1], cur[0], cur[3], cur[2]);
      if (i === 2) set(Math.max(-4, Math.min(4, cur[0] * 2)), cur[1], Math.max(-4, Math.min(4, cur[2] * 2)), cur[3]);
      if (i === 3) set(2, 4, 1, 2);
      if (i === 4) set(cur[0], Math.max(-4, Math.min(4, cur[1] + cur[0])), cur[2], Math.max(-4, Math.min(4, cur[3] + cur[2])));
      draw();
    });
    function draw() {
      var v = sl.map(function (s) { return parseFloat(s.value); }), a = v[0], b = v[1], c = v[2], d = v[3];
      lab.forEach(function (l, j) { l.textContent = num(v[j]); });
      P.clear();
      var det = a * d - b * c, pos = det >= 0;
      var poly = [[0, 0], [a, c], [a + b, c + d], [b, d]].map(function (p) { return P.X(p[0]) + ',' + P.Y(p[1]); }).join(' ');
      P.layer.appendChild(sv('polygon', { points: poly, 'class': 'an-poly ' + (Math.abs(det) < 1e-9 ? 'zero' : (pos ? 'down' : 'up')) }));
      arrow(P, 0, 0, a, c, 'down', 'u'); arrow(P, 0, 0, b, d, 'up', 'v');
      html(text, 'Matriz con columnas u y v: <b>A = (u | v) = (' + num(a) + ' ' + num(b) + '; ' + num(c) + ' ' + num(d) + ')</b>. El paralelogramo que forman u y v tiene área <b>|det A| = ' + num(Math.abs(det)) + '</b>.');
      fin.textContent = '';
      var f = el('div', 'sar-final'); f.textContent = 'det A = a·d − b·c = ' + num(a) + '·' + num(d) + ' − ' + num(b) + '·' + num(c) + ' = ' + num(det); fin.appendChild(f);
      var note = el('p', 'sar-hint');
      note.textContent = Math.abs(det) < 1e-9 ? 'det = 0: u y v están alineados, el paralelogramo se aplasta (área 0) y la matriz no es invertible.' : (pos ? 'det > 0: al girar de u a v se va en sentido antihorario (orientación positiva, color azul).' : 'det < 0: al girar de u a v se va en sentido horario (orientación negativa, color naranja). Si intercambias u y v, el determinante cambia de signo.');
      fin.appendChild(note);
    }
    sl.forEach(function (s) { s.addEventListener('input', draw); });
    root.appendChild(P.svg); root.appendChild(grid); root.appendChild(text); root.appendChild(fin); root.appendChild(pre);
    draw();
  }

  /* =====================================================================
     6. COMBINACIÓN LINEAL / COORDENADAS EN UNA BASE (R2)
     ===================================================================== */
  function buildCombo(root) {
    var modo = root.getAttribute('data-modo') || 'combo';
    var u0 = (root.getAttribute('data-u') || '2,1').split(',').map(Number), v0 = (root.getAttribute('data-v') || '-1,2').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 380, 380, 6);
    var uin = [numInput(u0[0], .5, '3.4em'), numInput(u0[1], .5, '3.4em')], vin = [numInput(v0[0], .5, '3.4em'), numInput(v0[1], .5, '3.4em')];
    var top = el('div', 'an-eqs');
    var ru = el('div', 'an-eq down'); ru.appendChild(el('span', '', 'u = (')); ru.appendChild(uin[0]); ru.appendChild(el('span', '', ', ')); ru.appendChild(uin[1]); ru.appendChild(el('span', '', ')'));
    var rv = el('div', 'an-eq up'); rv.appendChild(el('span', '', 'v = (')); rv.appendChild(vin[0]); rv.appendChild(el('span', '', ', ')); rv.appendChild(vin[1]); rv.appendChild(el('span', '', ')'));
    top.appendChild(ru); top.appendChild(rv);
    var s1, s2, l1, l2;
    var sl = el('div', 'an-sliders');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); sl.appendChild(r); }
    l1 = el('b'); l2 = el('b');
    if (modo === 'combo') { s1 = slider(-3, 3, 0.5, 1); s2 = slider(-3, 3, 0.5, 1); row('α ', s1, l1); row('β ', s2, l2); }
    else { s1 = slider(-5, 5, 0.5, 3); s2 = slider(-5, 5, 0.5, 4); row('x ', s1, l1); row('y ', s2, l2); }
    var text = el('p', 'sar-text'), res = el('div', 'sar-res');
    function draw() {
      var u = uin.map(function (i) { return parseFloat(i.value) || 0; }), v = vin.map(function (i) { return parseFloat(i.value) || 0; });
      var det = u[0] * v[1] - u[1] * v[0], dep = Math.abs(det) < 1e-9;
      var A = parseFloat(s1.value), B = parseFloat(s2.value), w, al, be;
      l1.textContent = num(A); l2.textContent = num(B);
      P.clear();
      // cuadrícula de combinaciones enteras
      if (!dep) {
        for (var k = -6; k <= 6; k++) {
          var p1 = [k * u[0] - 8 * v[0], k * u[1] - 8 * v[1]], p2 = [k * u[0] + 8 * v[0], k * u[1] + 8 * v[1]];
          P.layer.appendChild(sv('line', { x1: P.X(p1[0]), y1: P.Y(p1[1]), x2: P.X(p2[0]), y2: P.Y(p2[1]), 'class': 'an-sk down' }));
          var q1 = [k * v[0] - 8 * u[0], k * v[1] - 8 * u[1]], q2 = [k * v[0] + 8 * u[0], k * v[1] + 8 * u[1]];
          P.layer.appendChild(sv('line', { x1: P.X(q1[0]), y1: P.Y(q1[1]), x2: P.X(q2[0]), y2: P.Y(q2[1]), 'class': 'an-sk up' }));
        }
      } else {
        var dir = (Math.abs(u[0]) + Math.abs(u[1]) > 1e-9) ? u : v;
        if (Math.abs(dir[0]) + Math.abs(dir[1]) > 1e-9) P.layer.appendChild(sv('line', { x1: P.X(-8 * dir[0]), y1: P.Y(-8 * dir[1]), x2: P.X(8 * dir[0]), y2: P.Y(8 * dir[1]), 'class': 'an-ln zero' }));
      }
      if (modo === 'combo') { al = A; be = B; w = [al * u[0] + be * v[0], al * u[1] + be * v[1]]; }
      else { w = [A, B]; if (!dep) { al = (w[0] * v[1] - w[1] * v[0]) / det; be = (u[0] * w[1] - u[1] * w[0]) / det; } }
      if (modo === 'combo' || !dep) {
        arrow(P, 0, 0, al * u[0], al * u[1], 'down dash', ''); arrow(P, al * u[0], al * u[1], w[0], w[1], 'up dash', '');
      }
      arrow(P, 0, 0, u[0], u[1], 'down', 'u'); arrow(P, 0, 0, v[0], v[1], 'up', 'v');
      arrow(P, 0, 0, w[0], w[1], 'w', 'w');
      res.textContent = '';
      var t;
      if (modo === 'combo') {
        t = '<b>w = α·u + β·v</b> = ' + num(al) + '·(' + num(u[0]) + ', ' + num(u[1]) + ') + ' + num(be) + '·(' + num(v[0]) + ', ' + num(v[1]) + ') = <b>(' + num(w[0]) + ', ' + num(w[1]) + ')</b>.';
        if (dep) t += '<br><b>Aquí u y v son linealmente dependientes</b> (det = 0): todas las combinaciones caen sobre una misma recta, así que {u, v} <b>no genera ℝ²</b>.';
        else t += '<br>Como u y v son independientes (det = ' + num(det) + ' ≠ 0), moviendo α y β se alcanza <b>cualquier</b> punto del plano: {u, v} genera ℝ². La cuadrícula inclinada muestra las combinaciones con α, β enteros.';
      } else {
        if (dep) t = '<b>u y v son dependientes</b> (det = 0): no forman base de ℝ², no hay coordenadas respecto de ellos.';
        else t = 'El vector <b>w = (' + num(w[0]) + ', ' + num(w[1]) + ')</b> en la base canónica tiene, en la base B = {u, v}, las coordenadas <b>(' + num(al) + ', ' + num(be) + ')</b>, porque w = ' + num(al) + '·u + ' + num(be) + '·v.';
        if (!dep) {
          var f = el('div', 'sar-final'); f.textContent = '[w]_B = (' + num(al) + ', ' + num(be) + ')    frente a    [w]_can = (' + num(w[0]) + ', ' + num(w[1]) + ')'; res.appendChild(f);
        }
      }
      html(text, t);
    }
    [s1, s2].concat(uin, vin).forEach(function (x) { x.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', modo === 'combo' ? 'Una combinación lineal de u y v es w = α·u + β·v. Mueve α y β y mira dónde cae w. Prueba con u y v paralelos (p. ej. u = (1, 2), v = (2, 4)).' : 'Dado un vector w, sus coordenadas respecto de la base {u, v} son los números (α, β) que cumplen w = α·u + β·v. Mueve x e y (las coordenadas canónicas de w) y mira cómo cambian (α, β).'));
    root.appendChild(top); root.appendChild(P.svg); root.appendChild(sl); root.appendChild(text); root.appendChild(res);
    draw();
  }

  /* =====================================================================
     7. UNIÓN DE SUBESPACIOS (dos rectas de R2)
     ===================================================================== */
  function buildUnion(root) {
    var d1 = (root.getAttribute('data-d1') || '1,0').split(',').map(Number), d2 = (root.getAttribute('data-d2') || '0,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 380, 380, 6);
    var i1 = [numInput(d1[0], .5, '3.4em'), numInput(d1[1], .5, '3.4em')], i2 = [numInput(d2[0], .5, '3.4em'), numInput(d2[1], .5, '3.4em')];
    var top = el('div', 'an-eqs');
    var r1 = el('div', 'an-eq down'); r1.appendChild(el('span', '', 'L₁ = ⟨(')); r1.appendChild(i1[0]); r1.appendChild(el('span', '', ', ')); r1.appendChild(i1[1]); r1.appendChild(el('span', '', ')⟩'));
    var r2 = el('div', 'an-eq up'); r2.appendChild(el('span', '', 'L₂ = ⟨(')); r2.appendChild(i2[0]); r2.appendChild(el('span', '', ', ')); r2.appendChild(i2[1]); r2.appendChild(el('span', '', ')⟩'));
    top.appendChild(r1); top.appendChild(r2);
    var sl = el('div', 'an-sliders'), s1 = slider(-3, 3, 0.5, 2), s2 = slider(-3, 3, 0.5, 1.5), l1 = el('b'), l2 = el('b');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); sl.appendChild(r); }
    row('t ', s1, l1); row('s ', s2, l2);
    var text = el('p', 'sar-text');
    function draw() {
      var a = i1.map(function (i) { return parseFloat(i.value) || 0; }), b = i2.map(function (i) { return parseFloat(i.value) || 0; });
      var t = parseFloat(s1.value), s = parseFloat(s2.value); l1.textContent = num(t); l2.textContent = num(s);
      P.clear();
      var cross = a[0] * b[1] - a[1] * b[0], same = Math.abs(cross) < 1e-9;
      function full(d, cls) { if (Math.abs(d[0]) + Math.abs(d[1]) < 1e-9) return; P.layer.appendChild(sv('line', { x1: P.X(-9 * d[0]), y1: P.Y(-9 * d[1]), x2: P.X(9 * d[0]), y2: P.Y(9 * d[1]), 'class': 'an-ln ' + cls })); }
      full(a, 'down'); full(b, 'up');
      var u = [t * a[0], t * a[1]], w = [s * b[0], s * b[1]], z = [u[0] + w[0], u[1] + w[1]];
      P.layer.appendChild(sv('polygon', { points: [[0, 0], u, z, w].map(function (p) { return P.X(p[0]) + ',' + P.Y(p[1]); }).join(' '), 'class': 'an-poly zero' }));
      arrow(P, 0, 0, u[0], u[1], 'down', 'u'); arrow(P, 0, 0, w[0], w[1], 'up', 'w'); arrow(P, 0, 0, z[0], z[1], 'w', 'u+w');
      var onL1 = Math.abs(z[0] * a[1] - z[1] * a[0]) < 1e-6, onL2 = Math.abs(z[0] * b[1] - z[1] * b[0]) < 1e-6;
      var msg = 'u = ' + num(t) + '·d₁ ∈ L₁ y w = ' + num(s) + '·d₂ ∈ L₂ están los dos en la unión L₁ ∪ L₂. Su suma es <b>u + w = (' + num(z[0]) + ', ' + num(z[1]) + ')</b>. ';
      if (same) msg += '<br>Las dos rectas <b>coinciden</b> (d₁ y d₂ paralelos): entonces L₁ ∪ L₂ = L₁ sí es un subespacio. Es el caso especial L₁ ⊂ L₂.';
      else if (onL1 || onL2 || (Math.abs(t) < 1e-9 || Math.abs(s) < 1e-9)) msg += '<br>Con estos valores u + w <b>sigue en la unión</b> (porque u = 0 o w = 0). Mueve t y s a valores distintos de 0.';
      else msg += '<br><b>u + w NO está en L₁ ∪ L₂</b> (no cae sobre ninguna de las dos rectas): la unión <b>no es cerrada para la suma, no es subespacio</b>. En cambio la <b>suma</b> L₁ + L₂ (todo el paralelogramo, y moviendo t y s, todo el plano) sí lo es.';
      html(text, msg);
    }
    [s1, s2].concat(i1, i2).forEach(function (x) { x.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Dos subespacios (rectas por el origen) y un vector de cada uno. ¿Qué pasa con su suma?'));
    root.appendChild(top); root.appendChild(P.svg); root.appendChild(sl); root.appendChild(text);
    draw();
  }

  /* =====================================================================
     8. LABORATORIO DE OPERACIONES (contraejemplos)
     ===================================================================== */
  var OPS = [
    { n: 'a ⋄ b = a·b − b + a  (en ℝ)', f: function (a, b) { return a * b - b + a; }, e: [0, 1] },
    { n: 'a ∗ b = a + b + a·b  (en ℝ)', f: function (a, b) { return a + b + a * b; }, e: [0] },
    { n: 'x ∗ y = x·y + 1  (en ℤ)', f: function (a, b) { return a * b + 1; }, e: [0, 1] },
    { n: 'a ∗ b = a  (en ℝ)', f: function (a, b) { return a; }, e: [0] }
  ];
  function buildOper(root) {
    var k = parseInt(root.getAttribute('data-op') || '0', 10);
    root.textContent = ''; root.classList.add('sarrus');
    var sel = el('select'); OPS.forEach(function (o, i) { var op = el('option', '', o.n); op.value = i; sel.appendChild(op); }); sel.value = k;
    var top = el('div', 'adj-sel'); top.appendChild(el('span', '', 'Operación: ')); top.appendChild(sel);
    var ins = el('div', 'an-eqs'); var ia = numInput(2, 1, '3.4em'), ib = numInput(3, 1, '3.4em'), ic = numInput(2, 1, '3.4em'), ie = numInput(0, 1, '3.4em');
    var r1 = el('div', 'an-eq down'); [['a = ', ia], ['  b = ', ib], ['  c = ', ic]].forEach(function (p) { r1.appendChild(el('span', '', p[0])); r1.appendChild(p[1]); });
    var r2 = el('div', 'an-eq up'); r2.appendChild(el('span', '', 'candidato a neutro e = ')); r2.appendChild(ie);
    ins.appendChild(r1); ins.appendChild(r2);
    var tab = el('table', 'oper-t'); var text = el('p', 'sar-text');
    function draw() {
      var o = OPS[parseInt(sel.value, 10)], a = parseFloat(ia.value) || 0, b = parseFloat(ib.value) || 0, c = parseFloat(ic.value) || 0, e = parseFloat(ie.value) || 0;
      var f = o.f, fm = function (x) { return num(x); };
      var rows = [
        ['Conmutativa', 'a ∗ b = ' + fm(f(a, b)), 'b ∗ a = ' + fm(f(b, a)), f(a, b) === f(b, a)],
        ['Asociativa', '(a ∗ b) ∗ c = ' + fm(f(f(a, b), c)), 'a ∗ (b ∗ c) = ' + fm(f(a, f(b, c))), f(f(a, b), c) === f(a, f(b, c))],
        ['Neutro por la derecha', 'a ∗ e = ' + fm(f(a, e)), 'a = ' + fm(a), f(a, e) === a],
        ['Neutro por la izquierda', 'e ∗ a = ' + fm(f(e, a)), 'a = ' + fm(a), f(e, a) === a]
      ];
      tab.textContent = '';
      var th = el('tr'); ['Propiedad', 'Un lado', 'El otro', 'Con estos números'].forEach(function (h) { th.appendChild(el('th', '', h)); }); tab.appendChild(th);
      rows.forEach(function (r) { var tr = el('tr'); tr.appendChild(el('td', '', r[0])); tr.appendChild(el('td', '', r[1])); tr.appendChild(el('td', '', r[2])); tr.appendChild(el('td', r[3] ? 'ok' : 'ko', r[3] ? '✓ coinciden' : '✗ distintos ⇒ contraejemplo')); tab.appendChild(tr); });
      text.textContent = 'Un contraejemplo (una sola terna a, b, c que no coincida) basta para probar que una propiedad NO se cumple. En cambio, que coincidan con unos números concretos no demuestra nada: para probar que se cumple hay que hacerlo con letras.';
    }
    [ia, ib, ic, ie].forEach(function (x) { x.addEventListener('input', draw); }); sel.addEventListener('change', draw);
    root.appendChild(top); root.appendChild(ins); root.appendChild(tab); root.appendChild(text);
    root.appendChild(el('p', 'sar-hint', 'Cambia los números a, b, c y el candidato e para buscar contraejemplos.'));
    draw();
  }


  /* =====================================================================
     9. APLICACIONES LINEALES  R2 -> R2   (modo lineal / modo nucimg)
     ===================================================================== */
  var FUNS = [
    { n: 'f(x, y) = (x + y, x − y)   → lineal', f: function (x, y) { return [x + y, x - y]; } },
    { n: 'f(x, y) = (2x − y, x)   → lineal', f: function (x, y) { return [2 * x - y, x]; } },
    { n: 'g(x, y) = (x + 1, y)   → traslación, NO lineal', f: function (x, y) { return [x + 1, y]; } },
    { n: 'h(x, y) = (x², y)   → NO lineal', f: function (x, y) { return [x * x, y]; } },
    { n: 'k(x, y) = (x · y, y)   → NO lineal', f: function (x, y) { return [x * y, y]; } }
  ];
  function buildLineal(root) {
    var modo = root.getAttribute('data-modo') || 'lineal';
    root.textContent = ''; root.classList.add('sarrus');
    var pair = el('div', 'an-pair');
    var P1 = plane(root, 300, 300, 5), P2 = plane(root, 300, 300, 5);
    var c1 = el('div', 'an-pcol'), c2 = el('div', 'an-pcol');
    c1.appendChild(el('b', '', modo === 'lineal' ? 'Espacio de partida V = ℝ²' : 'Partida V = ℝ² (núcleo Nuc f)')); c1.appendChild(P1.svg);
    c2.appendChild(el('b', '', modo === 'lineal' ? 'Espacio de llegada W = ℝ²' : 'Llegada W = ℝ² (imagen Im f)')); c2.appendChild(P2.svg);
    pair.appendChild(c1); pair.appendChild(c2);
    var text = el('p', 'sar-text'), res = el('div', 'sar-res');
    var ctrl = el('div', 'an-sliders');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); ctrl.appendChild(r); }
    function fill(P, cls) { P.layer.appendChild(sv('rect', { x: 0, y: 0, width: P.W, height: P.H, 'class': 'an-fill ' + cls })); }
    function fullLine(P, d, cls) { var k = 9 / Math.max(Math.abs(d[0]), Math.abs(d[1])); P.layer.appendChild(sv('line', { x1: P.X(-k * d[0]), y1: P.Y(-k * d[1]), x2: P.X(k * d[0]), y2: P.Y(k * d[1]), 'class': 'an-ln ' + cls })); }

    if (modo === 'lineal') {
      var u = (root.getAttribute('data-u') || '2,1').split(',').map(Number), v = (root.getAttribute('data-v') || '-1,2').split(',').map(Number);
      var sel = el('select'); FUNS.forEach(function (o, i) { var op = el('option', '', o.n); op.value = i; sel.appendChild(op); });
      var top = el('div', 'adj-sel'); top.appendChild(el('span', '', 'Aplicación: ')); top.appendChild(sel);
      var sa = slider(-2, 2, 0.5, 1), sb = slider(-2, 2, 0.5, 1), la = el('b'), lb = el('b');
      row('α ', sa, la); row('β ', sb, lb);
      var draw = function () {
        var f = FUNS[parseInt(sel.value, 10)].f, a = parseFloat(sa.value), b = parseFloat(sb.value);
        la.textContent = num(a); lb.textContent = num(b);
        P1.clear(); P2.clear();
        var w = [a * u[0] + b * v[0], a * u[1] + b * v[1]];
        var fu = f(u[0], u[1]), fv = f(v[0], v[1]), fw = f(w[0], w[1]), comb = [a * fu[0] + b * fv[0], a * fu[1] + b * fv[1]];
        arrow(P1, 0, 0, u[0], u[1], 'down', 'u'); arrow(P1, 0, 0, v[0], v[1], 'up', 'v'); arrow(P1, 0, 0, w[0], w[1], 'w', 'w');
        arrow(P2, 0, 0, fu[0], fu[1], 'down', 'f(u)'); arrow(P2, 0, 0, fv[0], fv[1], 'up', 'f(v)');
        arrow(P2, 0, 0, comb[0], comb[1], 'pur dash', ''); arrow(P2, 0, 0, fw[0], fw[1], 'w', 'f(w)');
        var f0 = f(0, 0), ok = Math.abs(fw[0] - comb[0]) < 1e-9 && Math.abs(fw[1] - comb[1]) < 1e-9;
        html(text, 'w = αu + βv = ' + num(a) + '·(' + num(u[0]) + ', ' + num(u[1]) + ') + ' + num(b) + '·(' + num(v[0]) + ', ' + num(v[1]) + ') = <b>(' + num(w[0]) + ', ' + num(w[1]) + ')</b>.<br>' +
          '<span style="color:#2e9e5b"><b>f(w) = f(αu + βv) = (' + num(fw[0]) + ', ' + num(fw[1]) + ')</b></span> &nbsp;·&nbsp; <span style="color:#8e44ad"><b>αf(u) + βf(v) = (' + num(comb[0]) + ', ' + num(comb[1]) + ')</b></span> (flecha morada discontinua).');
        res.textContent = '';
        var fin = el('div', 'sar-final');
        fin.textContent = ok ? '✓ f(αu + βv) = αf(u) + βf(v) con estos valores' : '✗ f(αu + βv) ≠ αf(u) + βf(v)  ⇒  f NO es lineal';
        fin.style.color = ok ? '#1f8a4c' : '#c0392b'; res.appendChild(fin);
        var nt = el('p', 'sar-hint');
        nt.textContent = 'f(0) = (' + num(f0[0]) + ', ' + num(f0[1]) + ')' + ((Math.abs(f0[0]) + Math.abs(f0[1]) > 1e-9) ? '  ≠ 0: una aplicación lineal siempre cumple f(0) = 0, así que esta no puede ser lineal.' : '  (f(0) = 0 es necesario, pero no suficiente para ser lineal).') + (ok ? ' Si cambias α y β, una aplicación lineal cumple SIEMPRE la igualdad; si hay una pareja que falla, ya no es lineal.' : '');
        res.appendChild(nt);
      };
      [sa, sb].forEach(function (s) { s.addEventListener('input', draw); }); sel.addEventListener('change', draw);
      root.appendChild(el('p', 'sar-text an-title', 'Una aplicación es lineal si respeta las combinaciones lineales: f(αu + βv) = αf(u) + βf(v). Elige una aplicación y mueve α y β: la flecha verde (aplicar f a la combinación) y la morada (combinar las imágenes) deben coincidir.'));
      root.appendChild(top); root.appendChild(pair); root.appendChild(ctrl); root.appendChild(text); root.appendChild(res);
      draw();
    } else {
      var m0 = (root.getAttribute('data-m') || '1,2,2,4').split(',').map(Number);
      var mi = m0.map(function (x) { return numInput(x, 1, '3.2em'); });
      var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
      er.appendChild(el('span', '', 'A = (')); [0, 1].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ' ; ')); [2, 3].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ')   f(x) = A·x'));
      eq.appendChild(er);
      var sx = slider(-4, 4, 0.5, 2), sy = slider(-4, 4, 0.5, 1), lx = el('b'), ly = el('b');
      row('x ', sx, lx); row('y ', sy, ly);
      var pre = btnRow(['Isomorfismo (det ≠ 0)', 'Rango 1', 'Aplicación nula'], function (i) { var p = [[1, 1, 0, 1], [1, 2, 2, 4], [0, 0, 0, 0]][i]; mi.forEach(function (x, j) { x.value = p[j]; }); draw(); });
      var draw = function () {
        var a = parseFloat(mi[0].value) || 0, b = parseFloat(mi[1].value) || 0, c = parseFloat(mi[2].value) || 0, d = parseFloat(mi[3].value) || 0;
        var x = parseFloat(sx.value), y = parseFloat(sy.value); lx.textContent = num(x); ly.textContent = num(y);
        P1.clear(); P2.clear();
        var det = a * d - b * c, nz = function (t) { return Math.abs(t) > 1e-9; };
        var r = nz(det) ? 2 : ((nz(a) || nz(b) || nz(c) || nz(d)) ? 1 : 0);
        var fw = [a * x + b * y, c * x + d * y], kdir = null, idir = null;
        if (r === 1) {
          var rowv = (nz(a) || nz(b)) ? [a, b] : [c, d]; kdir = [-rowv[1], rowv[0]];
          idir = (nz(a) || nz(c)) ? [a, c] : [b, d];
        }
        if (r === 0) fill(P1, 'ker'); else if (r === 1) fullLine(P1, kdir, 'up'); else P1.layer.appendChild(sv('circle', { cx: P1.X(0), cy: P1.Y(0), r: 6, 'class': 'an-dot ker' }));
        if (r === 2) fill(P2, 'im'); else if (r === 1) fullLine(P2, idir, 'down'); else P2.layer.appendChild(sv('circle', { cx: P2.X(0), cy: P2.Y(0), r: 6, 'class': 'an-dot' }));
        if (r === 1) { // fibra w + Ker
          var k = 9 / Math.max(Math.abs(kdir[0]), Math.abs(kdir[1]));
          P1.layer.appendChild(sv('line', { x1: P1.X(x - k * kdir[0]), y1: P1.Y(y - k * kdir[1]), x2: P1.X(x + k * kdir[0]), y2: P1.Y(y + k * kdir[1]), 'class': 'an-ln w dashl' }));
        }
        arrow(P1, 0, 0, x, y, 'w', 'x');
        arrow(P2, 0, 0, a, c, 'down dash', 'f(e₁)'); arrow(P2, 0, 0, b, d, 'up dash', 'f(e₂)'); arrow(P2, 0, 0, fw[0], fw[1], 'w', 'f(x)');
        var kn = 2 - r;
        var t = 'rango(A) = <b>' + r + '</b> = dim Im f &nbsp;·&nbsp; dim Nuc f = 2 − ' + r + ' = <b>' + kn + '</b>. ' +
          (r === 2 ? '<b>Nuc f = {0}</b> (solo el origen va al origen) e <b>Im f = ℝ²</b> (todo el plano).' :
            r === 1 ? '<b>Nuc f</b> es la <b>recta naranja</b> de la izquierda (todo lo que se aplasta sobre 0) e <b>Im f</b> es la <b>recta azul</b> de la derecha. Todos los puntos de la recta verde discontinua x + Nuc f tienen la <b>misma</b> imagen f(x).' :
              '<b>Nuc f = ℝ²</b> (todo va a 0) e <b>Im f = {0}</b>.');
        html(text, t);
        res.textContent = '';
        var fin = el('div', 'sar-final');
        fin.textContent = 'dim V = dim Nuc f + dim Im f :   2 = ' + kn + ' + ' + r;
        res.appendChild(fin);
        var nt = el('p', 'sar-hint');
        nt.textContent = (r === 2 ? 'Inyectiva (Nuc = {0}) y sobreyectiva (Im = W): es un isomorfismo.' : (r === 1 ? 'No es inyectiva (Nuc ≠ {0}) ni sobreyectiva (Im ≠ W).' : 'No es inyectiva ni sobreyectiva.'));
        res.appendChild(nt);
      };
      [sx, sy].concat(mi).forEach(function (s) { s.addEventListener('input', draw); });
      root.appendChild(el('p', 'sar-text an-title', 'Para f(x) = A·x: el núcleo son los x que f aplasta en el origen y la imagen son todos los valores que f alcanza. Cambia la matriz y mueve el vector x.'));
      root.appendChild(eq); root.appendChild(pair); root.appendChild(ctrl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
      draw();
    }
  }

  /* =====================================================================
     Matriz asociada: las columnas son las imágenes de la base
     ===================================================================== */
  function buildMatriz(root) {
    var f1 = (root.getAttribute('data-f1') || '1,2').split(',').map(Number), f2 = (root.getAttribute('data-f2') || '3,-1').split(',').map(Number);
    var x0 = (root.getAttribute('data-x') || '2,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var pair = el('div', 'an-pair');
    var P1 = plane(root, 300, 300, 5), P2 = plane(root, 300, 300, 5);
    var c1 = el('div', 'an-pcol'), c2 = el('div', 'an-pcol');
    c1.appendChild(el('b', '', 'Partida: base canónica e₁, e₂ y el vector x')); c1.appendChild(P1.svg);
    c2.appendChild(el('b', '', 'Llegada: f(e₁), f(e₂) y f(x)')); c2.appendChild(P2.svg);
    pair.appendChild(c1); pair.appendChild(c2);
    var text = el('p', 'sar-text'), res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); ctrl.appendChild(r); }
    var mi = [f1[0], f2[0], f1[1], f2[1]].map(function (x) { return numInput(x, 1, '3.2em'); });
    var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
    er.appendChild(el('span', '', 'A = (')); [0, 1].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ' ; ')); [2, 3].forEach(function (i) { er.appendChild(mi[i]); });
    er.appendChild(el('span', '', ')   columna 1 = f(e₁), columna 2 = f(e₂)')); eq.appendChild(er);
    var sx = slider(-3, 3, 0.5, x0[0]), sy = slider(-3, 3, 0.5, x0[1]), lx = el('b'), ly = el('b');
    row('x ', sx, lx); row('y ', sy, ly);
    var pre = btnRow(['Ejemplo', 'Giro 90°', 'Simetría y = x', 'Proyección sobre OX'], function (i) { var p = [[f1[0], f2[0], f1[1], f2[1]], [0, -1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 0]][i]; mi.forEach(function (q, j) { q.value = p[j]; }); draw(); });
    function draw() {
      var a = parseFloat(mi[0].value) || 0, b = parseFloat(mi[1].value) || 0, c = parseFloat(mi[2].value) || 0, d = parseFloat(mi[3].value) || 0;
      var x = parseFloat(sx.value), y = parseFloat(sy.value); lx.textContent = num(x); ly.textContent = num(y);
      P1.clear(); P2.clear();
      arrow(P1, 0, 0, 1, 0, 'down', 'e₁'); arrow(P1, 0, 0, 0, 1, 'up', 'e₂'); arrow(P1, 0, 0, x, y, 'w', 'x');
      arrow(P2, 0, 0, a, c, 'down', 'f(e₁)'); arrow(P2, 0, 0, b, d, 'up', 'f(e₂)');
      arrow(P2, 0, 0, x * a, x * c, 'down dash', ''); arrow(P2, x * a, x * c, x * a + y * b, x * c + y * d, 'up dash', '');
      arrow(P2, 0, 0, x * a + y * b, x * c + y * d, 'w', 'f(x)');
      var fx = [a * x + b * y, c * x + d * y];
      html(text, 'Como x = ' + num(x) + '·e₁ + ' + num(y) + '·e₂ y f es lineal: <b>f(x) = ' + num(x) + '·f(e₁) + ' + num(y) + '·f(e₂)</b> = ' + num(x) + '·(' + num(a) + ', ' + num(c) + ') + ' + num(y) + '·(' + num(b) + ', ' + num(d) + ') = <b>(' + num(fx[0]) + ', ' + num(fx[1]) + ')</b>. ' +
        'Es lo mismo que el producto A·x: la primera componente es ' + num(a) + '·' + num(x) + ' + ' + num(b) + '·' + num(y) + ' y la segunda ' + num(c) + '·' + num(x) + ' + ' + num(d) + '·' + num(y) + '. Las flechas discontinuas son los dos sumandos x·f(e₁) e y·f(e₂).');
      res.textContent = '';
      var fin = el('div', 'sar-final'); fin.textContent = 'f(x) = A·x = (' + num(fx[0]) + ', ' + num(fx[1]) + ')'; res.appendChild(fin);
    }
    [sx, sy].concat(mi).forEach(function (s) { s.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'La matriz asociada de f: ℝ² → ℝ² en las bases canónicas se construye poniendo en columnas las imágenes f(e₁) y f(e₂). Cambia las entradas de A (o pulsa un caso) y mueve x: la flecha verde f(x) es siempre x·f(e₁) + y·f(e₂).'));
    root.appendChild(eq); root.appendChild(pair); root.appendChild(ctrl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    draw();
  }


  /* =====================================================================
     Cambio de base en R2: un mismo vector, dos nombres
     ===================================================================== */
  function buildCambio(root) {
    var u0 = (root.getAttribute('data-u') || '1,1').split(',').map(Number), v0 = (root.getAttribute('data-v') || '-1,1').split(',').map(Number);
    var x0 = (root.getAttribute('data-x') || '3,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 340, 340, 5);
    var text = el('p', 'sar-text'), res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); ctrl.appendChild(r); }
    var mi = [u0[0], v0[0], u0[1], v0[1]].map(function (x) { return numInput(x, 1, '3.2em'); });
    var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
    er.appendChild(el('span', '', 'Q = (')); [0, 1].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ' ; ')); [2, 3].forEach(function (i) { er.appendChild(mi[i]); });
    er.appendChild(el('span', '', ')   columnas = vectores u, v de la base nueva B′ escritos en la canónica')); eq.appendChild(er);
    var sx = slider(-4, 4, 1, x0[0]), sy = slider(-4, 4, 1, x0[1]), lx = el('b'), ly = el('b');
    row('x₁ ', sx, lx); row('x₂ ', sy, ly);
    var pre = btnRow(['Ejemplo', 'Base canónica', 'Base girada', 'Base no ortogonal', 'Base singular (u ∥ v)'], function (i) { var p = [[u0[0], v0[0], u0[1], v0[1]], [1, 0, 0, 1], [0, -1, 1, 0], [2, 1, 0, 1], [1, 2, 1, 2]][i]; mi.forEach(function (q, j) { q.value = p[j]; }); draw(); });
    function draw() {
      var a = parseInt(mi[0].value, 10) || 0, b = parseInt(mi[1].value, 10) || 0, c = parseInt(mi[2].value, 10) || 0, d = parseInt(mi[3].value, 10) || 0;
      var x = parseInt(sx.value, 10), y = parseInt(sy.value, 10); lx.textContent = x; ly.textContent = y;
      P.clear();
      var det = a * d - b * c;
      if (det !== 0) { // rejilla de la base nueva
        for (var k = -14; k <= 14; k++) {
          [[k * a, k * c, b, d], [k * b, k * d, a, c]].forEach(function (s) {
            P.layer.appendChild(sv('line', { x1: P.X(s[0] - 14 * s[2]), y1: P.Y(s[1] - 14 * s[3]), x2: P.X(s[0] + 14 * s[2]), y2: P.Y(s[1] + 14 * s[3]), stroke: '#c0842b', 'stroke-width': k === 0 ? 1.6 : 0.8, opacity: k === 0 ? 0.8 : 0.4 }));
          });
        }
      }
      arrow(P, 0, 0, 1, 0, 'down', 'e₁'); arrow(P, 0, 0, 0, 1, 'down', 'e₂');
      arrow(P, 0, 0, a, c, 'up', 'u'); arrow(P, 0, 0, b, d, 'up', 'v');
      arrow(P, 0, 0, x, y, 'w', 'x');
      res.textContent = '';
      if (det === 0) {
        html(text, 'Con estas columnas <b>det Q = 0</b>: u y v están alineados, no son una base de ℝ² y no hay matriz de cambio de base. Una matriz de cambio de base siempre es <b>regular</b> (det ≠ 0).');
        return;
      }
      var c1 = F(d * x - b * y, det), c2 = F(-c * x + a * y, det);
      html(text, 'En la base canónica x = (<b>' + x + ', ' + y + '</b>). Para escribirlo en B′ buscamos α, β con x = α·u + β·v, es decir Q·(α, β)ᵗ = (' + x + ', ' + y + ')ᵗ. Se resuelve con Q⁻¹ (det Q = ' + det + '): ' +
        '<b>(α, β) = (' + ftxt(c1) + ', ' + ftxt(c2) + ')</b>. Comprobación: ' + ftxt(c1) + '·(' + a + ', ' + c + ') + ' + ftxt(c2) + '·(' + b + ', ' + d + ') = (' + x + ', ' + y + '). ' +
        'Las rectas naranjas son la rejilla de B′: el mismo vector x, pero contado en pasos de u y de v en vez de e₁ y e₂.');
      var fin = el('div', 'sar-final'); fin.textContent = 'x_B = (' + x + ', ' + y + ')   ⇄   x_B′ = Q⁻¹·x_B = (' + ftxt(c1) + ', ' + ftxt(c2) + ')'; res.appendChild(fin);
    }
    [sx, sy].concat(mi).forEach(function (s) { s.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Un vector es el mismo aunque cambie la base con la que lo describimos. Elige una base nueva B′ = {u, v} (columnas de Q) y mueve x: las coordenadas en B′ son x_B′ = Q⁻¹·x_B, y x_B = Q·x_B′.'));
    root.appendChild(eq); root.appendChild(P.svg); root.appendChild(ctrl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    draw();
  }
  /* =====================================================================
     Semejanza y congruencia 2x2: A' = Q^-1 A Q frente a Q^t A Q; invariantes
     ===================================================================== */
  function buildSemej(root) {
    var a0 = (root.getAttribute('data-a') || '1,1,0,2').split(',').map(Number), q0 = (root.getAttribute('data-q') || '1,0,1,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var text = el('p', 'sar-text'), res = el('div', 'sar-res');
    var ia = a0.map(function (x) { return numInput(x, 1, '3.2em'); }), iq = q0.map(function (x) { return numInput(x, 1, '3.2em'); });
    ia.forEach(function (i, k) { i.setAttribute('aria-label', 'A entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); });
    iq.forEach(function (i, k) { i.setAttribute('aria-label', 'Q entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); });
    var eq = el('div', 'an-eqs');
    function mrow(lbl, ins) { var r = el('div', 'an-eq down'); r.appendChild(el('span', '', lbl + ' = ( ')); r.appendChild(ins[0]); r.appendChild(ins[1]); r.appendChild(el('span', '', ' ; ')); r.appendChild(ins[2]); r.appendChild(ins[3]); r.appendChild(el('span', '', ' )')); eq.appendChild(r); }
    mrow('A', ia); mrow('Q', iq);
    var pre = btnRow(['Ejemplo', 'Q = I', 'Q diagonal', 'A diagonalizada', 'Q singular'], function (i) {
      var p = [a0.concat(q0), [1, 1, 0, 2, 1, 0, 0, 1], [1, 1, 0, 2, 2, 0, 0, 1], [1, 1, 0, 2, 1, 1, 0, 1], [1, 1, 0, 2, 1, 2, 1, 2]][i];
      ia.forEach(function (q, j) { q.value = p[j]; }); iq.forEach(function (q, j) { q.value = p[4 + j]; }); draw();
    });
    function M2(m) { return m[0] + ',' + m[1] + ' ; ' + m[2] + ',' + m[3]; }
    function mt(m) { return '(' + ftxt(m[0]) + ' ' + ftxt(m[1]) + ' ; ' + ftxt(m[2]) + ' ' + ftxt(m[3]) + ')'; }
    function mm(x, y) { return [add(mul(x[0], y[0]), mul(x[1], y[2])), add(mul(x[0], y[1]), mul(x[1], y[3])), add(mul(x[2], y[0]), mul(x[3], y[2])), add(mul(x[2], y[1]), mul(x[3], y[3]))]; }
    function inv(q) { var d = sub(mul(q[0], q[3]), mul(q[1], q[2])); return [div(q[3], d), div(neg(q[1]), d), div(neg(q[2]), d), div(q[0], d)]; }
    function detTr(m) { var d = sub(mul(m[0], m[3]), mul(m[1], m[2])), t = add(m[0], m[3]); return { d: d, t: t }; }
    function draw() {
      var A = ia.map(function (i) { return F(parseInt(i.value, 10) || 0, 1); }), Q = iq.map(function (i) { return F(parseInt(i.value, 10) || 0, 1); });
      var dq = sub(mul(Q[0], Q[3]), mul(Q[1], Q[2])), da = detTr(A); res.textContent = '';
      if (isz(dq)) { html(text, 'Con estas columnas <b>det Q = 0</b>: Q no es regular y no hay matriz de paso. Ni la semejanza ni la congruencia admiten matrices singulares.'); return; }
      var Qi = inv(Q), S = mm(mm(Qi, A), Q), Qt = [Q[0], Q[2], Q[1], Q[3]], C = mm(mm(Qt, A), Q), s = detTr(S), c = detTr(C);
      function poly(d) { return 'λ²' + (d.t.n > 0 ? ' ' + MINUS + ' ' + ftxt(d.t) + 'λ' : (d.t.n < 0 ? ' + ' + ftxt(neg(d.t)) + 'λ' : '')) + (d.d.n < 0 ? ' ' + MINUS + ' ' + ftxt(neg(d.d)) : (d.d.n > 0 ? ' + ' + ftxt(d.d) : '')); }
      function same(x, y) { return x.n === y.n && x.d === y.d; }
      var ct = same(c.t, da.t) ? 'la traza aquí coincide (casualidad: en general no se conserva)' : 'la traza cambia (' + ftxt(da.t) + ' → <b>' + ftxt(c.t) + '</b>)';
      var cd = same(c.d, da.d) ? 'el determinante aquí coincide (casualidad: en general se multiplica por (det Q)² = ' + ftxt(mul(dq, dq)) + ')' : 'el determinante se multiplica por (det Q)² = ' + ftxt(mul(dq, dq)) + ' (' + ftxt(da.d) + ' → <b>' + ftxt(c.d) + '</b>)';
      html(text, '<b>Semejante</b> (U Def. 4.5, con Q = P, la matriz de paso): A′ = Q⁻¹AQ = ' + mt(S) + '. Mismo determinante (' + ftxt(da.d) + ' → <b>' + ftxt(s.d) + '</b>), misma traza (' + ftxt(da.t) + ' → <b>' + ftxt(s.t) + '</b>) y mismo polinomio característico ' + poly(da) + '.<br>' +
        '<b>Congruente</b> (U Def. 4.4): QᵗAQ = ' + mt(C) + '. En este caso ' + cd + '; ' + ct + ' (solo se conserva si Q es ortogonal).');
      var fin = el('div', 'sar-final'); fin.textContent = 'det Q = ' + ftxt(dq) + '  ·  semejante: det ' + ftxt(s.d) + ', tr ' + ftxt(s.t) + '  ·  congruente: det ' + ftxt(c.d) + ', tr ' + ftxt(c.t); res.appendChild(fin);
    }
    ia.concat(iq).forEach(function (s) { s.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Dada A y una matriz regular Q (entradas enteras), se calculan las dos transformaciones «de cambio de base»: la semejanza Q⁻¹AQ (endomorfismos) y la congruencia QᵗAQ (formas bilineales). Compara qué invariantes sobreviven.'));
    root.appendChild(eq); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    draw();
  }

  /* =====================================================================
     Valores y vectores propios 2x2: x frente a Ax, polinomio caracteristico, subespacios propios
     ===================================================================== */
  function buildPropios(root) {
    var a0 = (root.getAttribute('data-a') || '3,-2,1,0').split(',').map(Number), x0 = (root.getAttribute('data-x') || '2,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 340, 340, 5);
    P.svg.setAttribute('aria-label', 'Plano con el vector x, su imagen Ax y los subespacios propios de A');
    var text = el('p', 'sar-text'), res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders');
    text.setAttribute('aria-live', 'polite');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); ctrl.appendChild(r); }
    var mi = a0.map(function (x) { return numInput(x, 1, '3.2em'); });
    mi.forEach(function (i, k) { i.setAttribute('aria-label', 'A entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); });
    var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
    er.appendChild(el('span', '', 'A = (')); [0, 1].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ' ; ')); [2, 3].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ')')); eq.appendChild(er);
    var sx = slider(-4, 4, 0.5, x0[0]), sy = slider(-4, 4, 0.5, x0[1]), lx = el('b'), ly = el('b');
    sx.setAttribute('aria-label', 'x primera componente'); sy.setAttribute('aria-label', 'x segunda componente');
    row('x₁ ', sx, lx); row('x₂ ', sy, ly);
    var pre = btnRow(['Ejemplo U 4.6', 'Dos valores propios', 'Simétrica', 'Giro 90° (sin valores propios)', 'Doble con d = 1', 'Doble con d = 2', 'Singular (λ = 0)'], function (i) {
      var p = [a0, [4, 1, 2, 3], [2, 1, 1, 2], [0, -1, 1, 0], [3, 1, -1, 1], [2, 0, 0, 2], [1, 2, 2, 4]][i];
      mi.forEach(function (q, j) { q.value = p[j]; }); draw();
    });
    function eigvec(a, b, c, d, l) { // vector no nulo de Nuc(A - l I) cuando rang = 1
      var r1 = [a - l, b], r2 = [c, d - l], n1 = Math.abs(r1[0]) + Math.abs(r1[1]), n2 = Math.abs(r2[0]) + Math.abs(r2[1]);
      if (n1 >= n2 && n1 > 1e-9) return [r1[1], -r1[0]];
      if (n2 > 1e-9) return [r2[1], -r2[0]];
      return null;
    }
    function full(P0, d, cls) { var n = Math.sqrt(d[0] * d[0] + d[1] * d[1]); if (n < 1e-9) return; var k = 14 / n; P0.layer.appendChild(sv('line', { x1: P0.X(-k * d[0]), y1: P0.Y(-k * d[1]), x2: P0.X(k * d[0]), y2: P0.Y(k * d[1]), 'class': 'an-ln ' + cls, opacity: 0.45 })); }
    function vtxt(v) { var m = Math.max(Math.abs(v[0]), Math.abs(v[1])); return '(' + num(v[0] / m) + ', ' + num(v[1] / m) + ')'; }
    function draw() {
      var a = parseFloat(mi[0].value) || 0, b = parseFloat(mi[1].value) || 0, c = parseFloat(mi[2].value) || 0, d = parseFloat(mi[3].value) || 0;
      var x = parseFloat(sx.value), y = parseFloat(sy.value); lx.textContent = num(x); ly.textContent = num(y);
      var tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det;
      var ax = a * x + b * y, ay = c * x + d * y, cross = x * ay - y * ax, zero = Math.abs(x) + Math.abs(y) < 1e-9;
      var prop = !zero && Math.abs(cross) < 1e-9;
      var ls = [], info = '';
      if (disc > 1e-9) { var s = Math.sqrt(disc); ls = [(tr + s) / 2, (tr - s) / 2]; }
      else if (Math.abs(disc) <= 1e-9) ls = [tr / 2];
      P.clear();
      var dirs = ls.map(function (l) { return eigvec(a, b, c, d, l); });
      dirs.forEach(function (v, i) { if (v) full(P, v, i === 0 ? 'down' : 'up'); });
      arrow(P, 0, 0, x, y, 'w', 'x');
      var kk = Math.min(1, 4.7 / Math.max(Math.abs(ax), Math.abs(ay), 1e-9));
      arrow(P, 0, 0, ax * kk, ay * kk, prop ? 'down' : 'pur', kk < 1 ? 'Ax (a escala)' : 'Ax');
      function cf(v) { return Math.abs(Math.abs(v) - 1) < 1e-9 ? '' : num(Math.abs(v)); }
      function aml(l) { var q = num(l); if (q === '0') return 'A'; if (q === '1') return 'A ' + MINUS + ' I'; return l < 0 ? 'A + ' + cf(l) + 'I' : 'A ' + MINUS + ' ' + q + 'I'; }
      var poly = 'λ²' + (tr > 0 ? ' ' + MINUS + ' ' + cf(tr) + 'λ' : (tr < 0 ? ' + ' + cf(tr) + 'λ' : '')) + (det > 0 ? ' + ' + num(det) : (det < 0 ? ' ' + MINUS + ' ' + num(-det) : ''));
      var m1;
      if (zero) m1 = 'x = 0: el vector nulo <b>nunca</b> es vector propio (U Def. 4.6 exige x ≠ 0), aunque A·0 = λ·0 se cumpla para todo λ. Mueve x.';
      else if (prop) { var lam = Math.abs(x) > 1e-9 ? ax / x : ay / y; m1 = '<b>Ax = ' + num(lam) + '·x</b>: x y Ax son proporcionales, así que <b>x es vector propio</b> y su valor propio es λ = ' + num(lam) + (Math.abs(lam) < 1e-9 ? ' (Ax = 0: x está en el núcleo de A)' : '') + '.'; }
      else m1 = 'Ax = (' + num(ax) + ', ' + num(ay) + ') no es proporcional a x = (' + num(x) + ', ' + num(y) + ') (x₁·(Ax)₂ − x₂·(Ax)₁ = ' + num(cross) + ' ≠ 0): <b>x no es vector propio</b>, A lo desvía de su recta.';
      if (ls.length === 0) info = 'Polinomio característico |A − λI| = ' + poly + ' con discriminante tr² − 4·det = ' + num(disc) + ' < 0: <b>no tiene raíces reales</b>, luego A no tiene valores propios (en U, λ ∈ ℝ) y ningún x es propio.';
      else {
        info = 'Polinomio característico |A − λI| = ' + poly + ' (tr = ' + num(tr) + ', det = ' + num(det) + '). ';
        if (ls.length === 2) info += 'Raíces <b>λ₁ = ' + num(ls[0]) + '</b>, <b>λ₂ = ' + num(ls[1]) + '</b> (α = 1 cada una). ';
        else info += 'Raíz doble <b>λ = ' + num(ls[0]) + '</b> (α = 2). ';
        ls.forEach(function (l, i) {
          var v = dirs[i];
          info += '<br>' + (ls.length === 2 ? 'L' + (i + 1) : 'L') + ' = Nuc(' + aml(l) + '): ' + (v ? 'recta ⟨' + vtxt(v) + '⟩ (d = 1' + (ls.length === 1 ? ' < α = 2: no hay base de vectores propios' : '') + ')' : 'todo ℝ² (A − λI = 0, d = 2 = α)') + '.';
        });
        info += '<br>Comprobación: suma de raíces = traza y producto = det' + (ls.length === 1 ? ' (contando la raíz doble dos veces)' : '') + '.';
      }
      if (kk < 1) m1 += ' (Ax se dibuja reducido a escala para caber en el lienzo.)';
      html(text, m1 + '<br>' + info);
      res.textContent = '';
      var fin = el('div', 'sar-final'); fin.textContent = ls.length ? 'Valores propios: ' + ls.map(function (l) { return num(l); }).join(' , ') : 'Sin valores propios reales'; res.appendChild(fin);
    }
    [sx, sy].concat(mi).forEach(function (q) { q.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Un vector propio es un vector x ≠ 0 cuya imagen Ax queda en su misma recta. Cambia A y mueve x: la flecha verde es x y la otra es Ax (azul cuando x es propio). Las rectas finas son los subespacios propios.'));
    root.appendChild(eq); root.appendChild(P.svg); root.appendChild(ctrl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    draw();
  }

  /* =====================================================================
     Diagonalizacion 2x2 paso a paso: valores propios, d y alfa, P y Lambda, rejilla de la base propia
     ===================================================================== */
  function buildDiag(root) {
    var a0 = (root.getAttribute('data-a') || '4,1,2,3').split(',').map(Number), x0 = (root.getAttribute('data-x') || '2,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var body = el('div', 'an-body');
    var P = plane(body, 340, 340, 5);
    P.svg.setAttribute('aria-label', 'Plano con los vectores propios de A, la rejilla de la base propia y un vector x');
    var res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); ctrl.appendChild(r); }
    var mi = a0.map(function (x) { return numInput(x, 1, '3.2em'); });
    mi.forEach(function (i, k) { i.setAttribute('aria-label', 'A entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); });
    var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
    er.appendChild(el('span', '', 'A = (')); [0, 1].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ' ; ')); [2, 3].forEach(function (i) { er.appendChild(mi[i]); }); er.appendChild(el('span', '', ')   (enteros)')); eq.appendChild(er);
    var sx = slider(-4, 4, 1, x0[0]), sy = slider(-4, 4, 1, x0[1]), lx = el('b'), ly = el('b');
    sx.setAttribute('aria-label', 'x primera componente'); sy.setAttribute('aria-label', 'x segunda componente');
    row('x₁ ', sx, lx); row('x₂ ', sy, ly);
    var pre = btnRow(['Ejemplo (λ distintos)', 'Doble con d = 2', 'Doble con d = 1', 'Giro 90°', 'Singular (λ = 0)', 'Raíces irracionales'], function (i) {
      var p = [a0, [2, 0, 0, 2], [3, 1, -1, 1], [0, -1, 1, 0], [1, 2, 2, 4], [1, 1, 1, 0]][i];
      mi.forEach(function (q, j) { q.value = p[j]; }); recalc(true);
    });
    var cur = null;
    /* formato: fraccion si es racional con denominador <= 12; si no, 2 decimales */
    function pf(x) {
      if (Math.abs(x) < 1e-9) return '0';
      for (var q = 1; q <= 12; q++) { var n = Math.round(x * q); if (Math.abs(x * q - n) < 1e-9) return (n < 0 ? MINUS : '') + Math.abs(n) + (q === 1 ? '' : '/' + q); }
      return '≈' + num(x, 2);
    }
    function pm(m) { return '(' + pf(m[0]) + ' ' + pf(m[1]) + ' ; ' + pf(m[2]) + ' ' + pf(m[3]) + ')'; }
    function eig(a, b, c, d, l, sq) {
      var r1 = [a - l, b], r2 = [c, d - l], n1 = Math.abs(r1[0]) + Math.abs(r1[1]), n2 = Math.abs(r2[0]) + Math.abs(r2[1]), r;
      if (n1 >= n2 && n1 > 1e-9) r = r1; else if (n2 > 1e-9) r = r2; else return null;
      var v = [r[1], -r[0]];
      if (v[0] < -1e-12 || (Math.abs(v[0]) <= 1e-12 && v[1] < 0)) v = [-v[0], -v[1]];
      if (v[0] === 0) v[0] = 0;
      if (v[1] === 0) v[1] = 0;
      var m = Math.max(Math.abs(v[0]), Math.abs(v[1]));
      if (sq) {
        for (var k = 1; k <= 24; k++) { if (Math.abs(k * v[0] - Math.round(k * v[0])) < 1e-9 && Math.abs(k * v[1] - Math.round(k * v[1])) < 1e-9) { v = [Math.round(k * v[0]), Math.round(k * v[1])]; break; } }
        var g = gcd(v[0], v[1]); v = [v[0] / g, v[1] / g];
      } else v = [v[0] / m, v[1] / m];
      return v;
    }
    function model() {
      var q4 = mi.map(function (i) { var f = parseFloat(i.value), r = Math.round(f); if (isNaN(f)) return 0; if (f !== r) i.value = r; return r; });
      var a = q4[0], b = q4[1], c = q4[2], d = q4[3];
      var tr = a + d, det = a * d - b * c, disc = tr * tr - 4 * det;
      var M = { a: a, b: b, c: c, d: d, tr: tr, det: det, disc: disc, ls: [], al: [], dm: [], vs: [], ok: false, irr: false };
      if (disc < 0) return M;
      var s = Math.sqrt(disc), sq = Math.abs(s - Math.round(s)) < 1e-12; M.irr = !sq;
      if (disc === 0) {
        var l0 = tr / 2, v = eig(a, b, c, d, l0, true); M.ls = [l0]; M.al = [2];
        if (!v) { M.dm = [2]; M.vs = [[1, 0], [0, 1]]; M.ok = true; } else { M.dm = [1]; M.vs = [v]; }
      } else {
        M.ls = [(tr + s) / 2, (tr - s) / 2]; M.al = [1, 1]; M.dm = [1, 1];
        M.vs = M.ls.map(function (l) { return eig(a, b, c, d, l, sq); }); M.ok = true;
      }
      return M;
    }
    function zn(n) { return String(n).replace('-', MINUS); }
    function poly(M) { return 'λ²' + (M.tr > 0 ? ' ' + MINUS + ' ' + (M.tr === 1 ? '' : M.tr) + 'λ' : (M.tr < 0 ? ' + ' + (M.tr === -1 ? '' : -M.tr) + 'λ' : '')) + (M.det > 0 ? ' + ' + M.det : (M.det < 0 ? ' ' + MINUS + ' ' + (-M.det) : '')); }
    function full(P0, d, cls) { var n = Math.sqrt(d[0] * d[0] + d[1] * d[1]); if (n < 1e-9) return; var k = 14 / n; P0.layer.appendChild(sv('line', { x1: P0.X(-k * d[0]), y1: P0.Y(-k * d[1]), x2: P0.X(k * d[0]), y2: P0.Y(k * d[1]), 'class': 'an-ln ' + cls, opacity: 0.45 })); }
    function lam2(M) { return M.ls.length === 2 ? M.ls[1] : M.ls[0]; }
    function render(s, text) {
      var M = cur; P.clear(); res.textContent = '';
      var A = [M.a, M.b, M.c, M.d];
      ctrl.style.display = (M.ok && s >= 5) ? '' : 'none';
      var x = parseInt(sx.value, 10), y = parseInt(sy.value, 10); lx.textContent = x; ly.textContent = y;
      if (M.ok && s >= 5) { // rejilla de la base propia B' = columnas de P
        var u = M.vs[0], w = M.vs[1];
        for (var k = -14; k <= 14; k++) {
          [[k * u[0], k * u[1], w[0], w[1]], [k * w[0], k * w[1], u[0], u[1]]].forEach(function (q) {
            P.layer.appendChild(sv('line', { x1: P.X(q[0] - 14 * q[2]), y1: P.Y(q[1] - 14 * q[3]), x2: P.X(q[0] + 14 * q[2]), y2: P.Y(q[1] + 14 * q[3]), stroke: '#2e9e5b', 'stroke-width': k === 0 ? 1.2 : 0.6, 'stroke-dasharray': '4 3', opacity: k === 0 ? 0.8 : 0.5 }));
          });
        }
      }
      if (s >= 2 && M.ls.length && M.dm[0] === 1) M.vs.forEach(function (v, i) { if (v) full(P, v, i === 0 ? 'down' : 'up'); });
      if (s >= 4 && M.ok) M.vs.forEach(function (v, i) {
        var m = Math.max(Math.abs(v[0]), Math.abs(v[1])), kk = M.irr ? 3 / m : Math.min(1, 4.5 / m);
        arrow(P, 0, 0, v[0] * kk, v[1] * kk, i === 0 ? 'down' : 'up', 'v' + (i + 1));
      });
      if (M.ok && s >= 5) arrow(P, 0, 0, x, y, 'w', 'x');
      var h = '';
      if (s === 0) h = '<b>Diagonalizar</b> A (U Def. 4.12) es hallar una base de ℝ² formada por <b>vectores propios</b>: en esa base la aplicación solo estira cada eje y su matriz es diagonal, Λ = P⁻¹AP, donde las columnas de P son los vectores de la base. Aquí A = ' + pm(A) + '. Pasos: (1) valores propios y α; (2) subespacios propios y d; (3) comparar d con α; (4) P y Λ <b>en el mismo orden</b>; (5) comprobar PΛ = AP. Pulsa «Siguiente».';
      else if (s === 1) {
        h = '<b>1. Valores propios.</b> |A − λI| = ' + poly(M) + ' (tr = ' + zn(M.tr) + ', det = ' + zn(M.det) + '); discriminante D = tr² − 4·det = ' + zn(M.disc) + '. ';
        if (M.disc < 0) h += 'D < 0: <b>no hay raíces reales</b>, luego no hay valores propios (en U, λ ∈ ℝ). Σα = 0 < 2.';
        else if (M.disc === 0) h += 'D = 0: raíz doble <b>λ = ' + pf(M.ls[0]) + '</b>, α = 2.';
        else h += 'D > 0: dos raíces reales distintas, <b>λ₁ = ' + pf(M.ls[0]) + '</b> y <b>λ₂ = ' + pf(M.ls[1]) + '</b>' + (M.irr ? ' (irracionales, (' + zn(M.tr) + ' ± √' + M.disc + ')/2; se escriben aproximadas)' : '') + ', α₁ = α₂ = 1.';
      } else if (s === 2) {
        if (!M.ls.length) h = '<b>2. Subespacios propios.</b> Sin valores propios no hay vectores propios: ningún subespacio propio. (Un giro de 90° no deja ninguna recta fija.)';
        else {
          h = '<b>2. Subespacios propios</b> L = Nuc(A − λI) y d = 2 − rang(A − λI).';
          M.ls.forEach(function (l, i) {
            var Al = [M.a - l, M.b, M.c, M.d - l], zero = M.dm[i] === 2;
            h += '<br>λ = ' + pf(l) + ': A − λI = ' + pm(Al) + ', rango ' + (zero ? 0 : 1) + ', <b>d = ' + (zero ? 2 : 1) + '</b>; ' + (zero ? 'L = todo ℝ².' : 'L = ⟨(' + pf(M.vs[i][0]) + ', ' + pf(M.vs[i][1]) + ')⟩, una recta' + (M.dm[i] < M.al[i] ? ' (d = 1 < α = 2)' : '') + '.');
          });
          if (M.irr) h += '<br>(Vectores con componentes aproximadas.)';
        }
      } else if (s === 3) {
        h = '<b>3. Comparar d con α</b> (U Teor. 4.7). ';
        if (M.disc < 0) h += 'Sin raíces reales no existe ninguna base de vectores propios de ℝ²: <b>A no es diagonalizable en ℝ</b>. (El criterio «d = α» solo vale si todas las raíces son reales, es decir, Σα = n; U lo reconoce en p.167.)';
        else if (M.disc > 0) h += 'd₁ = α₁ = 1 y d₂ = α₂ = 1. Dos valores propios distintos en orden 2 ⇒ <b>diagonalizable</b> (U p.163).' + (M.det === 0 ? ' Aquí λ = 0 es valor propio (A es singular) y, aun así, diagonalizable: «singular» y «diagonalizable» son independientes.' : '');
        else if (M.dm[0] === 2) h += 'α = d = 2: <b>diagonalizable</b>. De hecho A = λI ya es diagonal (P = I sirve; cualquier base es de vectores propios).';
        else h += 'α = 2 pero d = 1: <b>d < α ⇒ NO diagonalizable</b>. Solo hay una dirección propia y para una base de ℝ² harían falta dos (Teor. 4.6).';
      } else if (s === 4) {
        var D4 = M.vs[0][0] * M.vs[1][1] - M.vs[1][0] * M.vs[0][1];
        h = '<b>4. P y Λ.</b> Las columnas de P son los vectores propios y Λ lleva sus valores propios <b>en el mismo orden</b>: P = ' + pm([M.vs[0][0], M.vs[1][0], M.vs[0][1], M.vs[1][1]]) + ', Λ = diag(' + pf(M.ls[0]) + ', ' + pf(lam2(M)) + '). det P = ' + pf(D4) + ' ≠ 0: P es regular. Si intercambias las columnas de P, hay que intercambiar los elementos de Λ; P no es única.';
      } else {
        var v1 = M.vs[0], v2 = M.vs[1], l1 = M.ls[0], l2 = lam2(M), Pm = [v1[0], v2[0], v1[1], v2[1]], D5 = Pm[0] * Pm[3] - Pm[1] * Pm[2];
        var AP = [M.a * Pm[0] + M.b * Pm[2], M.a * Pm[1] + M.b * Pm[3], M.c * Pm[0] + M.d * Pm[2], M.c * Pm[1] + M.d * Pm[3]], PL = [Pm[0] * l1, Pm[1] * l2, Pm[2] * l1, Pm[3] * l2];
        var eqok = AP.every(function (q, i) { return Math.abs(q - PL[i]) < 1e-9; });
        var al = (x * Pm[3] - Pm[1] * y) / D5, be = (-Pm[2] * x + Pm[0] * y) / D5;
        h = '<b>5. Comprobación sin invertir P:</b> AP = ' + pm(AP) + ' y PΛ = ' + pm(PL) + (eqok ? ': <b>coinciden ✓</b>, luego P⁻¹AP = Λ.' : ': ¡no coinciden!') +
          ' La rejilla fina de trazos verdes es la de la base propia B′ = {v₁, v₂}: el vector x = (' + zn(x) + ', ' + zn(y) + ') tiene coordenadas <b>x_B′ = P⁻¹x = (' + pf(al) + ', ' + pf(be) + ')</b>, y en esa base A solo multiplica: Ax tiene coordenadas (' + pf(l1 * al) + ', ' + pf(l2 * be) + ') en B′ (= Λ·x_B′).';
      }
      html(text, h);
      if (s === st.N) { var fin = el('div', 'sar-final'); fin.textContent = M.ok ? 'Diagonalizable: Λ = diag(' + pf(M.ls[0]) + ', ' + pf(lam2(M)) + ') = P⁻¹AP' : 'NO diagonalizable en ℝ' + (M.disc < 0 ? ' (sin valores propios reales)' : ' (d < α)'); res.appendChild(fin); }
    }
    var st = stepper(root, 5, render, null, 3400);
    function recalc(jump) { cur = model(); st.setN(cur.ok ? 5 : 3); st.go(jump ? st.N : Math.min(st.step, st.N)); }
    mi.forEach(function (q) { q.addEventListener('input', function () { recalc(true); }); });
    var tmr = null;
    [sx, sy].forEach(function (q) { q.addEventListener('input', function () { lx.textContent = sx.value; ly.textContent = sy.value; clearTimeout(tmr); tmr = setTimeout(function () { st.text.setAttribute('aria-live', 'off'); st.go(st.step); setTimeout(function () { st.text.setAttribute('aria-live', 'polite'); }, 50); }, 250); }); });
    body.appendChild(el('p', 'sar-text an-title', 'Edita A (2×2, entradas enteras) o elige un caso y recorre los cinco pasos de la receta. Al cambiar A se muestra el resultado completo; «↺ Reiniciar» vuelve al principio.'));
    body.appendChild(eq); body.appendChild(P.svg); body.appendChild(ctrl); body.appendChild(pre);
    root.appendChild(body); st.mount(root, res);
    cur = model(); st.setN(cur.ok ? 5 : 3); st.go(0);
    window.addEventListener('beforeprint', function () { st.go(st.N); });
  }
  /* =====================================================================
     Forma de Jordan (A de 2x2 a 4x4 con entradas enteras): rangos de (A-lI)^k -> bloques -> J -> P por cadenas -> AP = PJ
     ===================================================================== */
  var SUBN = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈'], SUPN = ['⁰', '', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸'];
  function jz(n) { return String(n).replace('-', MINUS); }
  function jvec(v) { return '(' + v.map(ftxt).join(', ') + ')'; }
  function jMul(A, B) { var C = [], i, j, q, s; for (i = 0; i < A.length; i++) { C[i] = []; for (j = 0; j < B[0].length; j++) { s = F(0); for (q = 0; q < B.length; q++) s = add(s, mul(A[i][q], B[q][j])); C[i][j] = s; } } return C; }
  function jId(n) { var I = [], i, j; for (i = 0; i < n; i++) { I[i] = []; for (j = 0; j < n; j++) I[i][j] = F(i === j ? 1 : 0); } return I; }
  function jSubL(A, l) { return A.map(function (r, i) { return r.map(function (x, j) { return i === j ? sub(x, F(l)) : x; }); }); }
  function jApply(M, v) { return M.map(function (r) { var s = F(0); r.forEach(function (x, j) { s = add(s, mul(x, v[j])); }); return s; }); }
  function jRref(rows) {                                  // devuelve {R, piv}
    var R = rows.map(function (r) { return r.slice(); }), piv = [], r = 0, c, q, k, nc = R.length ? R[0].length : 0;
    for (c = 0; c < nc && r < R.length; c++) {
      k = -1; for (q = r; q < R.length; q++) if (!isz(R[q][c])) { k = q; break; }
      if (k < 0) continue;
      var t = R[r]; R[r] = R[k]; R[k] = t;
      var p = R[r][c]; R[r] = R[r].map(function (x) { return div(x, p); });
      for (q = 0; q < R.length; q++) if (q !== r && !isz(R[q][c])) { var f = R[q][c], rr = R[r]; R[q] = R[q].map(function (x, j) { return sub(x, mul(f, rr[j])); }); }
      piv.push(c); r++;
    }
    return { R: R, piv: piv };
  }
  function jRank(rows) { return rows.length ? jRref(rows).piv.length : 0; }
  function jNull(M) {                                      // base de {x : Mx = 0}
    var nc = M[0].length, g = jRref(M), out = [], fc, qi, v;
    for (fc = 0; fc < nc; fc++) if (g.piv.indexOf(fc) < 0) { v = []; for (qi = 0; qi < nc; qi++) v.push(F(0)); v[fc] = F(1); for (qi = 0; qi < g.piv.length; qi++) v[g.piv[qi]] = neg(g.R[qi][fc]); out.push(v); }
    return out;
  }
  function jDet(M) {
    var A = cloneM(M), n = A.length, d = F(1), c, q, k;
    for (c = 0; c < n; c++) {
      k = -1; for (q = c; q < n; q++) if (!isz(A[q][c])) { k = q; break; }
      if (k < 0) return F(0);
      if (k !== c) { var t = A[c]; A[c] = A[k]; A[k] = t; d = neg(d); }
      d = mul(d, A[c][c]);
      for (q = c + 1; q < n; q++) { var f = div(A[q][c], A[c][c]); for (k = c; k < n; k++) A[q][k] = sub(A[q][k], mul(f, A[c][k])); }
    }
    return d;
  }
  function jCharPoly(A) {                                  // Faddeev-LeVerrier: coeficientes de det(lI - A), de grado n a 0
    var n = A.length, M = A.map(function (r) { return r.map(function () { return F(0); }); }), co = [F(1)], k, AM, tr, i;
    for (k = 1; k <= n; k++) {
      M = jMul(A, M); for (i = 0; i < n; i++) M[i][i] = add(M[i][i], co[k - 1]);
      AM = jMul(A, M); tr = F(0); for (i = 0; i < n; i++) tr = add(tr, AM[i][i]);
      co.push(neg(div(tr, F(k))));
    }
    return co.map(function (f) { return f.n; });
  }
  function jEval(co, x) { var s = 0; co.forEach(function (c) { s = s * x + c; }); return s; }
  function jSynth(co, r) { var out = [co[0]], i; for (i = 1; i < co.length - 1; i++) out.push(co[i] + r * out[i - 1]); return out; }
  function jGcdDeg(co) {                                   // grado de mcd(q, q') (0 si q es libre de cuadrados)
    var a = co.map(function (x) { return F(x); }), b = a.slice(0, -1).map(function (x, i) { return mul(x, F(a.length - 1 - i)); }), r, f, i;
    while (b.length && isz(b[0])) b.shift();
    while (b.length) {
      r = a.slice();
      while (r.length >= b.length) { f = div(r[0], b[0]); for (i = 0; i < b.length; i++) r[i] = sub(r[i], mul(f, b[i])); r.shift(); }
      while (r.length && isz(r[0])) r.shift();
      a = b; b = r;
    }
    return a.length - 1;
  }
  function jRealRoots(co) {                                // raíces reales (simples) por barrido + bisección
    var B = 1, i, out = [], x, y, fx, fy, lo, hi, m, st, mid;
    for (i = 1; i < co.length; i++) B = Math.max(B, 1 + Math.abs(co[i] / co[0]));
    st = B / 6000; x = -B; fx = jEval(co, x);
    for (i = 1; i <= 12000; i++) {
      y = -B + i * st; fy = jEval(co, y);
      if (fx === 0) out.push(x);
      else if (fx * fy < 0) { lo = x; hi = y; for (m = 0; m < 60; m++) { mid = (lo + hi) / 2; if (jEval(co, lo) * jEval(co, mid) <= 0) hi = mid; else lo = mid; } out.push((lo + hi) / 2); }
      x = y; fx = fy;
    }
    return out;
  }
  function jPolyStr(cs, v) {
    var deg = cs.length - 1, out = '';
    cs.forEach(function (c, i) { if (!c) return; var p = deg - i, a = Math.abs(c), t = (a === 1 && p > 0 ? '' : a) + (p > 0 ? v + (p > 1 ? '<sup>' + p + '</sup>' : '') : ''); out += out ? (c < 0 ? ' ' + MINUS + ' ' : ' + ') + t : (c < 0 ? MINUS : '') + t; });
    return out || '0';
  }
  function jLin(l) { return l === 0 ? 'λ' : (l > 0 ? '(λ ' + MINUS + ' ' + l + ')' : '(λ + ' + (-l) + ')'); }
  function jAl(l) { return l === 0 ? 'A' : (l > 0 ? 'A ' + MINUS + ' ' + (l === 1 ? '' : l) + 'I' : 'A + ' + (l === -1 ? '' : -l) + 'I'); }
  function jBlk(s, l) { return 'J' + SUBN[s] + '(' + jz(l) + ')'; }
  function jNp(k) { return 'N' + SUPN[k]; }                // N, N², N³ ...

  function jModel(A) {
    var n = A.length, co = jCharPoly(A), coef = co.slice(), roots = [], B = 1, i, r, a;
    for (i = 1; i < co.length; i++) B = Math.max(B, 1 + Math.abs(co[i]));
    for (r = -B; r <= B; r++) { a = 0; while (co.length > 1 && jEval(co, r) === 0) { co = jSynth(co, r); a++; } if (a) roots.push({ l: r, a: a }); }
    var M = { A: A, n: n, coef: coef, roots: roots, left: co, status: 'ok', irr: [] };
    if (co.length > 1) {
      var deg = co.length - 1, real = jRealRoots(co);
      if (jGcdDeg(co) > 0) M.status = 'rep';
      else if (real.length === deg) { M.status = 'irr'; M.irr = real; } else M.status = 'cplx';
      if (deg === 2) M.q2 = { b: co[1], c: co[2], disc: co[1] * co[1] - 4 * co[2] };
    }
    roots.forEach(function (ro) {
      var N = jSubL(A, ro.l), pw = [jId(n)], rk = [n], k = 0, cur = jId(n), q;
      do { k++; cur = jMul(cur, N); pw.push(cur); rk.push(jRank(cur)); } while (n - rk[k] < ro.a && k <= n);
      ro.N = N; ro.pw = pw; ro.rk = rk; ro.m = k; ro.c = []; ro.mult = []; ro.sizes = [];
      for (i = 1; i <= k; i++) ro.c[i] = rk[i - 1] - rk[i];
      ro.c[k + 1] = 0;
      for (i = 1; i <= k; i++) ro.mult[i] = ro.c[i] - ro.c[i + 1];
      for (i = k; i >= 1; i--) for (q = 0; q < ro.mult[i]; q++) ro.sizes.push(i);
      ro.d = ro.c[1];
    });
    if (M.status === 'ok') {
      roots.forEach(function (ro) {
        var Kb = [[]], k, chains = [];
        for (k = 1; k <= ro.m; k++) Kb[k] = jNull(ro.pw[k]);
        for (k = ro.m; k >= 1; k--) {
          var S = Kb[k - 1].slice(), cands = [], need = ro.mult[k], e, q;
          chains.forEach(function (ch) { if (ch.len > k) S.push(ch.vecs[k - 1]); });
          for (e = 0; e < n; e++) { var u = []; for (q = 0; q < n; q++) u.push(F(q === e ? 1 : 0)); if (jApply(ro.pw[k], u).every(isz)) cands.push(u); }
          cands = cands.concat(Kb[k]);
          for (q = 0; q < cands.length && need > 0; q++) {
            if (jRank(S.concat([cands[q]])) > jRank(S)) {
              S.push(cands[q]); need--;
              var vecs = [cands[q]], w = cands[q], j;
              for (j = 1; j < k; j++) { w = jApply(ro.N, w); vecs.unshift(w); }
              chains.push({ len: k, vecs: vecs, head: cands[q] });
            }
          }
        }
        ro.chains = chains;
      });
      var cols = [], blocks = [], J = [], r0, c0, pos = 0;
      roots.forEach(function (ro) { ro.chains.forEach(function (ch) { ch.vecs.forEach(function (v, idx) { cols.push({ v: v, eig: idx === 0 }); }); blocks.push({ l: ro.l, s: ch.len }); }); });
      for (r0 = 0; r0 < n; r0++) { J[r0] = []; for (c0 = 0; c0 < n; c0++) J[r0][c0] = F(0); }
      blocks.forEach(function (b) { for (var t = 0; t < b.s; t++) { J[pos + t][pos + t] = F(b.l); if (t < b.s - 1) J[pos + t][pos + t + 1] = F(1); } pos += b.s; });
      var P = []; for (r0 = 0; r0 < n; r0++) P[r0] = cols.map(function (c) { return c.v[r0]; });
      M.P = P; M.J = J; M.cols = cols; M.blocks = blocks; M.detP = jDet(P);
      M.AP = jMul(A, P); M.PJ = jMul(P, J);
      M.okAP = M.AP.every(function (rw, i2) { return rw.every(function (x, j2) { var y = M.PJ[i2][j2]; return x.n === y.n && x.d === y.d; }); });
    } else if (M.status === 'irr') {
      var bl = [];
      roots.forEach(function (ro) { ro.sizes.forEach(function (s) { bl.push({ l: ro.l, s: s }); }); });
      M.irr.forEach(function (x) { bl.push({ l: x, s: 1, irr: true, t: '≈' + num(x, 2) }); });
      M.blocks = bl;
    }
    return M;
  }

  function buildJordan(root) {
    var def = (root.getAttribute('data-a') || '1,0,3;-1,2,0;0,0,2');
    root.textContent = ''; root.classList.add('sarrus', 'an-jordan');
    var rows0 = def.split(';').map(function (r) { return r.split(',').map(function (x) { return parseInt(x, 10) || 0; }); });
    var nn = rows0.length, inputs = [];
    var body = el('div', 'an-body'), eq = el('div', 'an-eqs'), er = el('div', 'an-eq down'), grid = el('div', 'jd-grid'), res = el('div', 'sar-res');
    var sel = el('select'); [2, 3, 4].forEach(function (k) { var o = el('option', '', k + '×' + k); o.value = k; sel.appendChild(o); });
    sel.setAttribute('aria-label', 'Tamaño de A'); sel.value = nn;
    er.appendChild(el('span', '', 'A ')); er.appendChild(sel); er.appendChild(el('span', '', ' = ')); er.appendChild(grid); er.appendChild(el('span', '', '  (enteros)')); eq.appendChild(er);
    function mkGrid(m) {
      grid.textContent = ''; inputs = []; grid.style.gridTemplateColumns = 'repeat(' + m + ',3.2em)';
      for (var i = 0; i < m; i++) for (var j = 0; j < m; j++) {
        var inp = numInput((rows0[i] && rows0[i][j]) || 0, 1, '3.2em'); inp.min = -9; inp.max = 9; inp.setAttribute('aria-label', 'A fila ' + (i + 1) + ' columna ' + (j + 1));
        inp.addEventListener('input', function () { recalc(true); }); grid.appendChild(inp); inputs.push(inp);
      }
    }
    var PRE = [['2×2 (E 4.36): λ doble, d = 1', '3,1;-1,1'], ['2×2: A = 2I', '2,0;0,2'], ['2×2: λ distintos', '4,1;2,3'], ['2×2: giro 90°', '0,-1;1,0'],
      ['U 4.17: tres distintos', '1,2,3;0,4,5;0,0,6'], ['U 4.18: bloques 1 y 2', '1,0,3;-1,2,0;0,0,2'], ['U 4.19: λ triple, d = 2', '-1,3,0;0,-1,0;0,2,-1'], ['U 4.20: bloque 3×3', '0,1,2;0,0,1;0,0,0'], ['U 4.21: λ triple, d = 2', '0,-3,-1;2,5,1;-2,-3,1'], ['3×3: raíces complejas', '1,0,0;0,1,-2;0,1,3'], ['3×3: raíces irracionales', '1,1,0;1,0,1;0,1,2'],
      ['E 4.39: bloques 3 y 1', '2,0,3,0;1,2,0,3;0,0,2,0;0,0,1,2'], ['4×4: bloques 2 y 2', '2,0,1,0;0,2,0,1;0,0,2,0;0,0,0,2'], ['4×4: dos λ dobles', '1,1,1,0;0,1,0,1;0,0,2,0;0,0,0,2']];
    var pre = btnRow(PRE.map(function (p) { return p[0]; }), function (i) { rows0 = PRE[i][1].split(';').map(function (r) { return r.split(',').map(Number); }); sel.value = rows0.length; mkGrid(rows0.length); recalc(true); });
    function readA() {
      var m = parseInt(sel.value, 10), A = [], k = 0, i, j, v;
      for (i = 0; i < m; i++) { A[i] = []; for (j = 0; j < m; j++) { v = Math.round(parseFloat(inputs[k].value)); if (isNaN(v)) v = 0; v = Math.max(-9, Math.min(9, v)); A[i][j] = F(v); k++; } }
      return A;
    }
    function jtab(rowsS, cellCls) {
      var t = el('table', 'gj-m pm');
      rowsS.forEach(function (r, i) { var tr = el('tr'); r.forEach(function (s, j) { var td = el('td'); html(td, s); if (j === 0) td.classList.add('lb'); if (j === r.length - 1) td.classList.add('rb'); var cc = cellCls && cellCls(i, j); if (cc) td.classList.add(cc); tr.appendChild(td); }); t.appendChild(tr); });
      return t;
    }
    function fm(M) { return M.map(function (r) { return r.map(fhtml); }); }
    function labelled(tab, cap) { var c = el('div', 'pm-col'); c.appendChild(tab); c.appendChild(el('small', '', cap)); return c; }
    var cur = null, steps = [], st;
    function build() {
      var M = cur, n = M.n, S = [], A = M.A;
      S.push({ t: '<b>Forma de Jordan</b> (U Teor. 4.8). Si A no es diagonalizable (faltan vectores propios), se busca una matriz <b>casi diagonal</b> J = P⁻¹AP: bloques con λ en la diagonal y unos justo encima. Pasos: (1) valores propios y α; (2) rangos de (A ' + MINUS + ' λI)ᵏ ⇒ nº y tamaño de los bloques; (3) matriz J; (4) vectores de P por <b>cadenas</b>; (5) comprobar AP = PJ. Pulsa «Siguiente».', out: function (o) { o.appendChild(labelled(jtab(fm(A)), 'A (' + n + '×' + n + ')')); } });
      var sg = (n % 2) ? MINUS : '', cs = M.coef.map(function (c) { return (n % 2 ? -c : c); }), fac = '';
      M.roots.forEach(function (ro) { fac += jLin(ro.l) + (ro.a > 1 ? '<sup>' + ro.a + '</sup>' : ''); });
      if (M.left.length > 1) fac += '(' + jPolyStr(M.left, 'λ') + ')';
      var t1 = '<b>1. Valores propios.</b> |A ' + MINUS + ' λI| = ' + jPolyStr(cs, 'λ') + ' = ' + sg + fac + '. ';
      if (M.status === 'ok') {
        t1 += 'Valores propios: ' + M.roots.map(function (ro) { return '<b>λ = ' + jz(ro.l) + '</b> (α = ' + ro.a + ')'; }).join(', ') + '. Comprobación: Σ α·λ = ' + jz(M.roots.reduce(function (s, ro) { return s + ro.l * ro.a; }, 0)) + ' = traza de A. Todas las raíces son reales: existe J real.';
      } else if (M.status === 'irr') {
        t1 += (M.roots.length ? 'Además de los enteros, hay raíces' : 'Hay raíces') + ' <b>irracionales y distintas</b>: ' + M.irr.map(function (x) { return '≈' + num(x, 3); }).join(' , ') + (M.q2 ? ' (= (' + jz(-M.q2.b) + ' ± √' + M.q2.disc + ')/2)' : '') + '. Son reales, así que existe J real; como son simples, sus bloques son 1×1.';
      } else if (M.status === 'cplx') {
        t1 += 'El factor <b>' + jPolyStr(M.left, 'λ') + '</b> no tiene todas sus raíces reales' + (M.q2 ? ' (discriminante ' + jz(M.q2.disc) + ' < 0; λ = ' + num(-M.q2.b / 2, 2) + ' ± ' + num(Math.sqrt(-M.q2.disc) / 2, 2) + 'i)' : '') + '. <b>No hay forma de Jordan real</b>: U Teor. 4.8 supone, sin decirlo, que todas las raíces del polinomio característico son reales (U p.167: «no se puede diagonalizar»). Sobre ℂ sí existiría. Fin de la receta en ℝ.';
      } else {
        t1 += 'El factor <b>' + jPolyStr(M.left, 'λ') + '</b> tiene raíces irracionales <b>repetidas</b>: caso fuera del alcance de esta animación (la receta de rangos es la misma, pero los vectores llevarían radicales).';
      }
      S.push({ t: t1, out: null });
      if (M.status === 'cplx' || M.status === 'rep') return S;
      S.push({ t: '<b>2. Cuántos bloques y de qué tamaño.</b> Para cada λ sea N = A ' + MINUS + ' λI y r<sub>k</sub> = rang Nᵏ (r₀ = n). El nº de bloques de tamaño <b>≥ k</b> es <b>r<sub>k−1</sub> ' + MINUS + ' r<sub>k</sub></b>; se para cuando dim Nuc Nᵏ = n ' + MINUS + ' r<sub>k</sub> = α. Los bloques de tamaño exactamente k son (nº de ≥ k) ' + MINUS + ' (nº de ≥ k+1). El nº de bloques de ese λ es d = n ' + MINUS + ' rang N. (Las matrices semejantes tienen el mismo rango: U Teor. 4.1, p.146 y p.176.)' + (M.status === 'irr' ? ' Los valores irracionales son simples: un bloque 1×1 cada uno.' : '') + M.roots.map(function (ro) { return '<br>λ = ' + jz(ro.l) + ': d = ' + ro.d + ' bloque' + (ro.d > 1 ? 's' : '') + ', tamaños <b>(' + ro.sizes.join(', ') + ')</b>' + (ro.d === ro.a ? ' (d = α: todos 1×1)' : '') + '.'; }).join(''),
        out: function (o) {
          M.roots.forEach(function (ro) {
            var t = el('table', 'jd-t'), h = '<tr><th colspan="4">λ = ' + jz(ro.l) + ', N = ' + jAl(ro.l) + ', α = ' + ro.a + '</th></tr><tr><th>k</th><th>rang Nᵏ</th><th>dim Nuc Nᵏ</th><th>nº de bloques de tamaño ≥ k</th></tr>', k;
            for (k = 0; k <= ro.m; k++) h += '<tr><td>' + k + '</td><td>' + ro.rk[k] + '</td><td>' + (n - ro.rk[k]) + (k === ro.m ? ' = α' : '') + '</td><td>' + (k ? ro.c[k] : '—') + '</td></tr>';
            html(t, h); o.appendChild(t);
          });
        } });
      var JS, bl = M.blocks.map(function (b) { return b.irr ? 'J₁(' + b.t + ')' : jBlk(b.s, b.l); }).join(' ⊕ '), nb = M.blocks.length, ones = n - nb;
      if (M.status === 'ok') JS = M.J.map(function (r) { return r.map(fhtml); });
      else { JS = []; var pos = 0, i, j; for (i = 0; i < n; i++) { JS[i] = []; for (j = 0; j < n; j++) JS[i][j] = '0'; } M.blocks.forEach(function (b) { for (var t = 0; t < b.s; t++) { JS[pos + t][pos + t] = b.irr ? b.t : jz(b.l); if (t < b.s - 1) JS[pos + t][pos + t + 1] = '1'; } pos += b.s; }); }
      S.push({ t: '<b>3. Matriz J.</b> Un bloque J<sub>s</sub>(λ) = λI + N, con N nilpotente (unos justo encima de la diagonal). Se colocan juntos los de un mismo λ, de mayor a menor. Aquí J = <b>' + bl + '</b>: ' + nb + ' bloque' + (nb > 1 ? 's' : '') + ' (= nº de vectores propios independientes) y ' + ones + ' uno' + (ones === 1 ? '' : 's') + ' (= n ' + MINUS + ' nº de bloques = vectores no propios que faltan para una base).' + (ones === 0 ? ' Como no hay unos, J = Λ: <b>A es diagonalizable</b>.' : ' Hay unos, luego A <b>no</b> es diagonalizable.') + (M.status === 'irr' ? ' (Valores irracionales aproximados; el orden de los bloques es libre.)' : ''),
        out: function (o) { o.appendChild(labelled(jtab(JS, function (i2, j2) { return (j2 === i2 + 1 && JS[i2][j2] === '1') ? 'piv' : ''; }), 'J (unos resaltados)')); }, final: 'J = ' + bl });
      if (M.status === 'irr') { S[S.length - 1].t += ' La matriz de paso con valores irracionales lleva radicales y U no la pide: la animación se detiene aquí.'; return S; }
      M.roots.forEach(function (ro) {
        var h = '<b>4. Vectores de P para λ = ' + jz(ro.l) + '</b> (N = ' + jAl(ro.l) + '). ';
        if (ro.sizes.every(function (s) { return s === 1; })) h += 'Todos los bloques son 1×1: basta una base de Nuc N (vectores propios): ' + ro.chains.map(function (ch) { return jvec(ch.vecs[0]); }).join(', ') + '.';
        else {
          h += 'Guion de U p.173: por cada bloque de tamaño k se elige v ∈ Nuc Nᵏ <b>que no esté</b> en Nuc Nᵏ⁻¹ y se forman v, Nv, …, Nᵏ⁻¹v (esta última es vector propio). En el bloque, las columnas van con el <b>vector propio primero</b>: (Nᵏ⁻¹v, …, Nv, v); los vectores se calculan de derecha a izquierda.';
          ro.chains.forEach(function (ch) {
            var k = ch.len;
            if (k === 1) { h += '<br>• Bloque 1×1: vector propio independiente de los anteriores: <b>' + jvec(ch.vecs[0]) + '</b>.'; return; }
            h += '<br>• Bloque ' + k + '×' + k + ': v = <b>' + jvec(ch.head) + '</b>, con ' + jNp(k) + 'v = 0 (v ∈ Nuc ' + jNp(k) + ') y ' + jNp(k - 1) + 'v ≠ 0 (v ∉ Nuc ' + jNp(k - 1) + '). Cadena: ' + ch.vecs.slice().reverse().map(function (v, idx) { return (idx === 0 ? 'v' : (idx === 1 ? 'Nv' : jNp(idx) + 'v')) + ' = ' + jvec(v); }).join('; ') + '.';
          });
        }
        S.push({ t: h, out: function (o) { var w = el('div', 'pm-wrap'); w.appendChild(labelled(jtab(fm(ro.N)), 'N = ' + jAl(ro.l))); if (ro.m > 1) w.appendChild(labelled(jtab(fm(ro.pw[2])), 'N²')); if (ro.m > 2) w.appendChild(labelled(jtab(fm(ro.pw[3])), 'N³')); if (ro.m > 3) w.appendChild(labelled(jtab(fm(ro.pw[4])), 'N⁴')); o.appendChild(w); } });
      });
      S.push({ t: '<b>5. Matriz de paso y comprobación.</b> P = (columnas de cada cadena, bloque a bloque, en el mismo orden que J). det P = <b>' + ftxt(M.detP) + '</b> ≠ 0: P es regular. Comprobación <b>sin invertir</b>: AP ' + (M.okAP ? '= PJ ✓, es decir, <b>J = P⁻¹AP</b>.' : '≠ PJ (¡revisar!).') + ' Columnas azules = vectores propios; naranjas = vectores generalizados (no propios). P <b>no es única</b> (se puede escalar, cambiar v por otro vector de Nuc Nᵏ ∖ Nuc Nᵏ⁻¹ o reordenar los bloques junto con J).' + (ones ? ' Con el orden contrario dentro de un bloque saldrían los unos <b>debajo</b> de la diagonal.' : ''),
        out: function (o) {
          var w = el('div', 'pm-wrap');
          w.appendChild(labelled(jtab(fm(M.P), function (i2, j2) { return M.cols[j2].eig ? 'hr' : 'hc'; }), 'P'));
          w.appendChild(labelled(jtab(fm(M.J)), 'J')); o.appendChild(w);
          var w2 = el('div', 'pm-wrap'); w2.appendChild(labelled(jtab(fm(M.AP)), 'A·P')); w2.appendChild(el('span', 'pm-sym', M.okAP ? '=' : '≠')); w2.appendChild(labelled(jtab(fm(M.PJ)), 'P·J')); o.appendChild(w2);
        }, final: 'J = ' + bl + (M.okAP ? ' = P⁻¹AP' : ' (¡AP ≠ PJ, revisar!)') });
      return S;
    }
    function render(s, text) {
      var S = steps[s]; html(text, S.t); res.textContent = '';
      if (S.out) S.out(res);
      if (s === st.N) {
        var fin = el('div', 'sar-final');
        fin.textContent = cur.status === 'cplx' ? 'No hay forma de Jordan real (raíces no reales)' : (cur.status === 'rep' ? 'Caso no tratado (irracionales repetidos)' : steps[steps.length - 1].final || '');
        res.appendChild(fin);
      }
    }
    function recalc(jump) { cur = jModel(readA()); steps = build(); st.setN(steps.length - 1); st.go(jump ? st.N : 0); }
    st = stepper(root, 1, render, null, 4200);
    sel.addEventListener('change', function () { var m = parseInt(sel.value, 10), i, j; rows0 = []; for (i = 0; i < m; i++) { rows0[i] = []; for (j = 0; j < m; j++) rows0[i][j] = (i === j ? 1 : 0); } mkGrid(m); recalc(true); });
    mkGrid(nn);
    body.appendChild(el('p', 'sar-text an-title', 'Escribe una matriz A (2×2 a 4×4, enteros de ' + MINUS + '9 a 9; otros valores se recortan a ese intervalo) o elige un caso, y recorre la receta: valores propios, rangos de (A ' + MINUS + ' λI)ᵏ, bloques, J, cadenas y P. Al cambiar A se muestra el resultado completo; «↺ Reiniciar» vuelve al principio.'));
    body.appendChild(eq); body.appendChild(pre);
    root.appendChild(body); st.mount(root, res);
    cur = jModel(readA()); steps = build(); st.setN(steps.length - 1); st.go(0);
    window.addEventListener('beforeprint', function () { st.go(st.N); });
  }

  /* =====================================================================
     Producto escalar con matriz de Gram 2x2 editable (.anim-gram)
     ===================================================================== */
  function buildGram(root) {
    var nc = function (x) { return num(x).replace('.', ','); };
    var g0 = (root.getAttribute('data-g') || '1,0,1').split(',').map(Number), u0 = (root.getAttribute('data-u') || '2,1').split(',').map(Number), v0 = (root.getAttribute('data-v') || '-1,2').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 340, 340, 5);
    P.svg.setAttribute('aria-label', 'Plano con los vectores u y v dibujados con las longitudes y ángulos reales del producto escalar');
    var text = el('p', 'sar-text'), res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders'); text.setAttribute('aria-live', 'polite');
    var gi = g0.map(function (x, k) { var i = numInput(x, 0.5, '3.8em'); i.setAttribute('aria-label', ['g11', 'g12 (= g21)', 'g22'][k]); return i; });
    var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down'), bsp = el('span', '', '');
    er.appendChild(el('span', '', 'G = ( ')); er.appendChild(gi[0]); er.appendChild(el('span', '', ' ')); er.appendChild(gi[1]); er.appendChild(el('span', '', ' ; ')); er.appendChild(bsp); er.appendChild(el('span', '', ' ')); er.appendChild(gi[2]); er.appendChild(el('span', '', ' )'));
    eq.appendChild(er);
    var sl = [u0[0], u0[1], v0[0], v0[1]].map(function (x) { return slider(-8, 8, 0.5, x); }), lb = sl.map(function () { return el('b'); });
    function row(txt, s, l) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(l); ctrl.appendChild(r); }
    ['u₁', 'u₂', 'v₁', 'v₂'].forEach(function (t, k) { sl[k].setAttribute('aria-label', 'coordenada ' + t); row(t + ' ', sl[k], lb[k]); });
    var pre = btnRow(['Estándar G = I', 'U Ejemplo 5.5: (4,1,9)', 'e₁, e₂ a 60°: (1,½,1)', 'Propio: (2,1,1) con u ⟂ v', 'No definida positiva (1,2,1)', 'Semidefinida (1,1,1)'], function (i) {
      var p = [[1, 0, 1, 2, 1, -1, 2], [4, 1, 9, 2, 1, 7, 0], [1, 0.5, 1, 1, 0, 0, 1], [2, 1, 1, 1, 0, -1, 2], [1, 2, 1, 1, 0, 0, 1], [1, 1, 1, 1, -1, 1, 0]][i];
      gi.forEach(function (q, j) { q.value = p[j]; }); sl.forEach(function (q, j) { q.value = p[3 + j]; }); draw();
    });
    function draw() {
      var a = parseFloat(gi[0].value) || 0, b = parseFloat(gi[1].value) || 0, c = parseFloat(gi[2].value) || 0, X = sl.map(function (q) { return parseFloat(q.value); });
      X.forEach(function (x, k) { lb[k].textContent = nc(x); }); bsp.textContent = nc(b);
      var u = [X[0], X[1]], v = [X[2], X[3]], det = a * c - b * b, eps = 1e-9;
      function ip(p, q) { return p[0] * (a * q[0] + b * q[1]) + p[1] * (b * q[0] + c * q[1]); }
      var pd = a > eps && det > eps, uv = ip(u, v), uu = ip(u, u), vv = ip(v, v), h = '', std = u[0] * v[0] + u[1] * v[1];
      h += '<b>G</b> = (' + nc(a) + ' ' + nc(b) + '; ' + nc(b) + ' ' + nc(c) + '), Δ₁ = ' + nc(a) + ', Δ₂ = |G| = ' + nc(det) + '. ';
      P.clear();
      if (pd) {
        var s = Math.sqrt(a), r12 = b / s, r22 = Math.sqrt(det / a);       // G = R^t R con R = (s r12; 0 r22): R x = coordenadas en una base ortonormal
        var T = function (p) { return [s * p[0] + r12 * p[1], r22 * p[1]]; };
        var U2 = T(u), V2 = T(v), m = 0;
        [U2, V2, [s, 0], [r12, r22]].forEach(function (q) { m = Math.max(m, Math.abs(q[0]), Math.abs(q[1])); });
        var k = Math.min(1, 4.6 / Math.max(m, eps));
        arrow(P, 0, 0, k * s, 0, 'gr', 'e₁'); arrow(P, 0, 0, k * r12, k * r22, 'gr', 'e₂');
        arrow(P, 0, 0, k * U2[0], k * U2[1], 'down', 'u'); arrow(P, 0, 0, k * V2[0], k * V2[1], 'up', 'v');
        var nu = Math.sqrt(Math.max(uu, 0)), nv = Math.sqrt(Math.max(vv, 0)), co = (nu > eps && nv > eps) ? uv / (nu * nv) : NaN, dd = [u[0] - v[0], u[1] - v[1]], d2 = ip(dd, dd), sm = [u[0] + v[0], u[1] + v[1]];
        h += '<b>G es definida positiva</b> (Δ₁ > 0, Δ₂ > 0, criterio de Sylvester): es un producto escalar.<br>';
        h += '<b>u•v = uᵗGv = ' + nc(uv) + '</b>; ‖u‖ = √' + nc(uu) + ' = ' + nc(nu) + ', ‖v‖ = √' + nc(vv) + ' = ' + nc(nv) + ', d(u,v) = √' + nc(d2) + ' = ' + nc(Math.sqrt(Math.max(d2, 0))) + '.<br>';
        if (isNaN(co)) h += 'Alguno de los vectores es nulo: el coseno no está definido.';
        else if (Math.abs(uv) < 1e-9) h += 'cos = 0: <b>u ⟂ v</b> (ángulo 90°). Pitágoras: ‖u+v‖² = ' + nc(ip(sm, sm)) + ' = ‖u‖² + ‖v‖² = ' + nc(uu) + ' + ' + nc(vv) + '.';
        else h += 'cos(u,v) = ' + nc(co) + ' ⇒ ángulo ≈ ' + nc(Math.acos(Math.max(-1, Math.min(1, co))) * 180 / Math.PI) + '°. No son ortogonales.';
        h += '<br>Con el producto estándar u·v valdría ' + nc(std) + ': «ortogonal», «norma» y «ángulo» dependen del producto escalar elegido. <i>El dibujo es fiel: los ángulos y longitudes que ves son los de • (se muestra la base e₁, e₂ de G' + (k < 1 ? ', a escala ' + nc(k) : '') + ').</i>';
      } else {
        var cl = function (x) { return Math.max(-4.8, Math.min(4.8, x)); };
        arrow(P, 0, 0, cl(u[0]), cl(u[1]), 'down', 'u'); arrow(P, 0, 0, cl(v[0]), cl(v[1]), 'up', 'v');
        var w = a <= eps ? [1, 0] : [-b, a], ww = ip(w, w);
        h += '<b>G NO es definida positiva</b> ' + (a <= eps ? '(Δ₁ = ' + nc(a) + ' ≤ 0)' : '(Δ₂ = ' + nc(det) + ' ≤ 0)') + ': no es un producto escalar. Vector testigo x = (' + nc(w[0]) + ', ' + nc(w[1]) + ') ≠ 0 con x•x = <b>' + nc(ww) + ' ≤ 0</b>: ' + (ww < -eps ? 'falla la propiedad 4 (x•x < 0)' : 'falla la propiedad 5 (x•x = 0 con x ≠ 0)') + ' de U Def. 5.1.<br>';
        h += 'Si insistes: «u•v» = ' + nc(uv) + ', «u•u» = ' + nc(uu) + (uu < 0 ? ' (¡negativo: no hay norma real!)' : '') + '. <i>(Dibujo en coordenadas; no representa ángulos reales porque no hay geometría euclídea.)</i>';
      }
      html(text, h); res.textContent = '';
      var fin = el('div', 'sar-final'); var nul = Math.abs(u[0]) + Math.abs(u[1]) < eps || Math.abs(v[0]) + Math.abs(v[1]) < eps;
      fin.textContent = pd ? 'u•v = ' + nc(uv) + (nul ? '  (un vector es nulo)' : (Math.abs(uv) < 1e-9 ? '  (ortogonales)' : '')) : 'G no define un producto escalar'; res.appendChild(fin);
    }
    gi.concat(sl).forEach(function (q) { q.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Un producto escalar de ℝ² queda fijado por su matriz de Gram G = (gᵢⱼ), gᵢⱼ = eᵢ•eⱼ: u•v = uᵗGv. Cambia G (simétrica: g₁₂ se escribe una sola vez) y mueve las coordenadas de u y v. Mira cómo cambian norma, ángulo y ortogonalidad, y qué pasa cuando G deja de ser definida positiva.'));
    root.appendChild(eq); root.appendChild(P.svg); root.appendChild(ctrl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    draw();
  }

  /* =====================================================================
     Matrices ortogonales 2x2: giros y simetrias (.anim-ortog)
     ===================================================================== */
  function buildOrtog(root) {
    var nc = function (x) { return num(x).replace('.', ','); };
    var nd = function (x) { var v = Math.round(x * 1000) / 1000; if (Math.abs(v) < 1e-9) v = 0; return String(v).replace('-', MINUS).replace('.', ','); };
    var a0 = (root.getAttribute('data-a') || '1,0,0,1').split(',').map(Number), x0 = (root.getAttribute('data-x') || '2,1').split(',').map(Number), y0 = (root.getAttribute('data-y') || '0.5,1.5').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 340, 340, 4);
    P.svg.setAttribute('aria-label', 'Plano con el cuadrado unidad, su imagen por la matriz A y dos vectores con sus imágenes');
    var text = el('p', 'sar-text'), res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders'); text.setAttribute('aria-live', 'polite');
    var mode = null, rd = function (v) { return Math.round(v * 10000) / 10000; };
    var inp = a0.map(function (v, k) { var i = numInput(v, 0.01, '5em'); i.setAttribute('aria-label', ['a (fila 1, columna 1)', 'b (fila 1, columna 2)', 'c (fila 2, columna 1)', 'd (fila 2, columna 2)'][k]); return i; });
    var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
    er.appendChild(el('span', '', 'A = ( ')); er.appendChild(inp[0]); er.appendChild(el('span', '', ' ')); er.appendChild(inp[1]); er.appendChild(el('span', '', ' ; ')); er.appendChild(inp[2]); er.appendChild(el('span', '', ' ')); er.appendChild(inp[3]); er.appendChild(el('span', '', ' )'));
    eq.appendChild(er);
    var st = slider(0, 360, 5, 45), lt = el('b'), sl = [x0[0], x0[1], y0[0], y0[1]].map(function (v) { return slider(-3, 3, 0.5, v); }), lb = sl.map(function () { return el('b'); });
    function row(txt, s, l) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(l); ctrl.appendChild(r); }
    st.setAttribute('aria-label', 'ángulo theta en grados'); row('θ ', st, lt);
    ['x₁', 'x₂', 'y₁', 'y₂'].forEach(function (t, k) { sl[k].setAttribute('aria-label', 'coordenada ' + t); row(t + ' ', sl[k], lb[k]); });
    function setM(m) { m.forEach(function (v, k) { inp[k].value = rd(v); }); }
    function apply() {
      var t = parseFloat(st.value) * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
      if (mode === 'giro') setM([c, -s, s, c]); else if (mode === 'sim') setM([c, s, s, -c]);
    }
    var bm = btnRow(['Giro R_θ = (cosθ −senθ; senθ cosθ)', 'Simetría S_θ = (cosθ senθ; senθ −cosθ)'], function (i) { mode = i === 0 ? 'giro' : 'sim'; apply(); draw(); });
    var pre = btnRow(['Giro 45° (U Ej. 5.28)', 'Giro 90°', 'Simetría respecto de OX', 'Simetría respecto de y = x', 'Columnas ⟂ pero no unitarias (1 −1; 1 1)', 'Cizalla (1 1; 0 1)', 'Unitarias pero no ⟂ (1 .71; 0 .71)'], function (i) {
      var p = [[0.7071, -0.7071, 0.7071, 0.7071], [0, -1, 1, 0], [1, 0, 0, -1], [0, 1, 1, 0], [1, -1, 1, 1], [1, 1, 0, 1], [1, 0.7071, 0, 0.7071]][i];
      mode = null; setM(p); draw();
    });
    function draw() {
      var A = inp.map(function (q) { return parseFloat(q.value) || 0; }), a = A[0], b = A[1], c = A[2], d = A[3];
      var X = sl.map(function (q) { return parseFloat(q.value); });
      lt.textContent = nc(parseFloat(st.value)) + '°'; X.forEach(function (x, k) { lb[k].textContent = nc(x); });
      var x = [X[0], X[1]], y = [X[2], X[3]], ap = function (v) { return [a * v[0] + b * v[1], c * v[0] + d * v[1]]; };
      var Ax = ap(x), Ay = ap(y), n1 = a * a + c * c, n2 = b * b + d * d, p = a * b + c * d, det = a * d - b * c, eps = 5e-3;
      var orth = Math.abs(n1 - 1) < eps && Math.abs(n2 - 1) < eps && Math.abs(p) < eps;
      var dt = function (u, v) { return u[0] * v[0] + u[1] * v[1]; }, nr = function (u) { return Math.sqrt(dt(u, u)); };
      var cosA = function (u, v) { var q = nr(u) * nr(v); return q < 1e-9 ? NaN : dt(u, v) / q; };
      var pts = [[0, 0], [a, c], [a + b, c + d], [b, d], x, y, Ax, Ay], m = 0;
      pts.forEach(function (q) { m = Math.max(m, Math.abs(q[0]), Math.abs(q[1])); });
      var K = m > 3.7 ? 3.7 / m : 1, T = function (q) { return [K * q[0], K * q[1]]; };
      P.clear();
      function poly(ps, cls) { P.layer.appendChild(sv('polygon', { points: ps.map(function (q) { q = T(q); return P.X(q[0]) + ',' + P.Y(q[1]); }).join(' '), 'class': 'an-poly ' + cls })); }
      poly([[0, 0], [1, 0], [1, 1], [0, 1]], 'gr'); poly([[0, 0], [a, c], [a + b, c + d], [b, d]], orth ? '' : 'bad');
      var h = '<b>AᵗA</b> = (' + nd(n1) + ' ' + nd(p) + '; ' + nd(p) + ' ' + nd(n2) + '): ‖c₁‖² = ' + nd(n1) + ', ‖c₂‖² = ' + nd(n2) + ', c₁•c₂ = ' + nd(p) + ' (las columnas de A son los lados del cuadrado imagen). det A = <b>' + nd(det) + '</b>.<br>';
      var kind = '';
      if (orth) {
        var th = Math.atan2(c, a) * 180 / Math.PI; if (th < 0) th += 360;
        h += '<b>AᵗA = I: A es ortogonal</b> (columnas ortonormales; tolerancia por redondeo). ';
        if (det > 0) {
          var triv = th < 0.5 || th > 359.5 || Math.abs(th - 180) < 0.5;
          kind = th < 0.5 || th > 359.5 ? 'identidad (giro de 0°)' : 'giro de ' + nc(th) + '°';
          h += 'det = +1 ⇒ <b>giro</b> de ángulo θ = atan2(c, a) = ' + nc(th) + '° (antihorario). Valores propios: cosθ ± i·senθ' + (triv ? ' (reales: ' + (th < 90 || th > 270 ? '1' : '−1') + ' doble)' : ' = ' + nd(Math.cos(th * Math.PI / 180)) + ' ± ' + nd(Math.sin(th * Math.PI / 180)) + 'i: <b>no hay valores propios reales</b>') + '.';
        } else {
          var ang = th / 2; kind = 'simetría respecto de la recta de ángulo ' + nc(ang) + '°';
          h += 'det = −1 ⇒ <b>simetría</b> respecto de la recta por el origen de ángulo θ/2 = ' + nc(ang) + '° (θ = atan2(c, a) = ' + nc(th) + '°). Valores propios 1 (los puntos de la recta, que quedan fijos: línea verde) y −1 (su perpendicular).';
          var ux = Math.cos(ang * Math.PI / 180), uy = Math.sin(ang * Math.PI / 180);
          P.layer.appendChild(sv('line', { x1: P.X(-9 * ux), y1: P.Y(-9 * uy), x2: P.X(9 * ux), y2: P.Y(9 * uy), 'class': 'an-vec w dash' }));
        }
      } else {
        var why = [];
        if (Math.abs(n1 - 1) >= eps) why.push('‖c₁‖² = ' + nd(n1) + ' ≠ 1');
        if (Math.abs(n2 - 1) >= eps) why.push('‖c₂‖² = ' + nd(n2) + ' ≠ 1');
        if (Math.abs(p) >= eps) why.push('c₁•c₂ = ' + nd(p) + ' ≠ 0');
        kind = 'no ortogonal'; h += '<b>AᵗA ≠ I: A NO es ortogonal</b> (falla: ' + why.join('; ') + '). El cuadrado se deforma (' + (Math.abs(det) < 1e-9 ? 'det = 0: se aplasta sobre una recta' : 'área ' + nd(Math.abs(det)) + ' en vez de 1') + ').';
      }
      arrow(P, 0, 0, T(x)[0], T(x)[1], 'gr', 'x'); arrow(P, 0, 0, T(y)[0], T(y)[1], 'gr', 'y');
      arrow(P, 0, 0, T(Ax)[0], T(Ax)[1], 'down', 'Ax'); arrow(P, 0, 0, T(Ay)[0], T(Ay)[1], 'up', 'Ay');
      var c1 = cosA(x, y), c2 = cosA(Ax, Ay), same = Math.abs(dt(x, y) - dt(Ax, Ay)) < 1e-9 && Math.abs(nr(x) - nr(Ax)) < 1e-9 && Math.abs(nr(y) - nr(Ay)) < 1e-9;
      h += '<br>Vectores (punteados: x e y; de color: Ax y Ay): ‖x‖ = ' + nd(nr(x)) + ' → ‖Ax‖ = ' + nd(nr(Ax)) + '; ‖y‖ = ' + nd(nr(y)) + ' → ‖Ay‖ = ' + nd(nr(Ay)) + '; x•y = ' + nd(dt(x, y)) + ' → Ax•Ay = ' + nd(dt(Ax, Ay)) + (isNaN(c1) || isNaN(c2) ? '' : '; cos∠ = ' + nd(c1) + ' → ' + nd(c2)) + '. ' + (orth ? '<b>Se conservan</b> normas, producto escalar y ángulo (U p.217).' : (same ? 'Aquí coinciden por casualidad para estos x, y; cambia los vectores.' : 'Aquí <b>no</b> se conservan.')) + (K < 1 ? ' <i>(Dibujo a escala ' + nc(K) + '.)</i>' : '');
      html(text, h); res.textContent = '';
      var fin = el('div', 'sar-final'); fin.textContent = orth ? 'Ortogonal: ' + kind : 'No ortogonal'; res.appendChild(fin);
    }
    inp.forEach(function (q) { q.addEventListener('input', function () { mode = null; draw(); }); });
    st.addEventListener('input', function () { if (!mode) mode = 'giro'; apply(); draw(); });
    sl.forEach(function (q) { q.addEventListener('input', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Una matriz A de 2×2 transforma el cuadrado unidad (gris) en un paralelogramo cuyos lados son sus columnas. Si A es ortogonal (AᵗA = I) ese paralelogramo sigue siendo un cuadrado de lado 1, girado o reflejado: nada se deforma. Escribe tu matriz, usa θ con los botones de giro o simetría, o carga un ejemplo; mueve x e y para ver que Ax y Ay conservan longitudes y ángulo.'));
    root.appendChild(eq); root.appendChild(bm); root.appendChild(P.svg); root.appendChild(ctrl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    draw();
  }


  /* =====================================================================
     Matrices simetricas 2x2: ejes principales perpendiculares (.anim-simet)
     ===================================================================== */
  function buildSimet(root) {
    var nc = function (x) { return num(x).replace('.', ','); };
    var nd = function (x) { var v = Math.round(x * 1000) / 1000; if (Math.abs(v) < 1e-9) v = 0; return String(v).replace('-', MINUS).replace('.', ','); };
    var mt = function (rows) { var ent = rows.every(function (r) { return r.every(function (x) { return Math.abs(x - Math.round(x)) < 1e-9; }); }); return '(' + rows.map(function (r) { return r.map(nd).join(ent ? ' ' : ' ; '); }).join(' / ') + ')'; };
    var simpl = function (u) { var m = 0; u.forEach(function (x) { if (Math.abs(x) > 1e-9 && (m === 0 || Math.abs(x) < m)) m = Math.abs(x); }); if (!m) return null; for (var k = 1; k <= 12; k++) { var w = u.map(function (x) { return x / m * k; }); if (w.every(function (x) { return Math.abs(x - Math.round(x)) < 1e-6; })) { var g = w.map(Math.round); if (g[0] < 0 || (g[0] === 0 && g[1] < 0)) g = g.map(function (x) { return -x; }); return g; } } return null; };
    var poly = function (tr, dt) { var t = -tr, s = 'λ²'; if (Math.abs(t) > 1e-9) s += (t < 0 ? ' ' + MINUS + ' ' : ' + ') + (Math.abs(Math.abs(t) - 1) < 1e-9 ? '' : nd(Math.abs(t)) + '·') + 'λ'; if (Math.abs(dt) > 1e-9) s += (dt < 0 ? ' ' + MINUS + ' ' : ' + ') + nd(Math.abs(dt)); return s; };
    var axes = null;
    var a0 = (root.getAttribute('data-a') || '3,1,3').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var P = plane(root, 340, 340, 4);
    P.svg.setAttribute('aria-label', 'Plano con la circunferencia unidad, su imagen (una elipse) por la matriz A, los ejes propios y un punto x con su imagen Ax');
    var text = el('p', 'sar-text'), res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders'); text.setAttribute('aria-live', 'polite');
    var mk = function (v, lab) { var i = numInput(v, 0.5, '3.8em'); i.setAttribute('aria-label', lab); return i; };
    var ia = mk(a0[0], 'a (fila 1, columna 1)'), ib = mk(a0[1], 'b (fila 1, columna 2)'), ic = mk(a0[2], 'c (fila 2, columna 2)'), id = mk(a0[1], 'd (fila 2, columna 1)');
    var chk = document.createElement('input'); chk.type = 'checkbox'; chk.checked = true; chk.setAttribute('aria-label', 'Matriz simétrica (d = b)');
    var eq = el('div', 'an-eqs'), er = el('div', 'an-eq down'), tg = el('label', 'an-slrow');
    [el('span', '', 'A = ( '), ia, el('span', '', ' '), ib, el('span', '', ' ; '), id, el('span', '', ' '), ic, el('span', '', ' )')].forEach(function (n) { er.appendChild(n); });
    eq.appendChild(er); tg.appendChild(chk); tg.appendChild(el('span', '', 'simétrica (d = b)')); tg.style.justifyContent = 'center'; eq.appendChild(tg);
    var sp = slider(0, 360, 0.5, 30), lp = el('b'), r1 = el('label', 'an-slrow');
    sp.setAttribute('aria-label', 'ángulo φ del vector x sobre la circunferencia unidad'); r1.appendChild(el('span', '', 'φ ')); r1.appendChild(sp); r1.appendChild(lp); ctrl.appendChild(r1);
    function sync() { if (chk.checked) { id.value = ib.value; id.disabled = true; } else id.disabled = false; }
    var PRE = [['(3 1; 1 3)  [Propio 1]', [3, 1, 3, 1]], ['(1 2; 2 −2)  [Propio 2]', [1, 2, -2, 2]], ['E 5.29: (1 1; 1 0)', [1, 1, 0, 1]], ['E 5.30: (1 2; 2 4), singular', [1, 2, 4, 2]], ['Ene. 2020: (2 2; 2 −1)', [2, 2, -1, 2]], ['Diagonal (2 0; 0 1)', [2, 0, 1, 0]], ['Valor doble: 2·I', [2, 0, 2, 0]], ['Contraste: (1 2; 0 3) NO simétrica', [1, 2, 3, 0, 1]], ['Contraste: (0 1; −1 0), giro, sin valores reales', [0, 1, 0, -1, 1]]];
    var pre = btnRow(PRE.map(function (q) { return q[0]; }), function (k) { var q = PRE[k][1]; chk.checked = q.length < 5; ia.value = q[0]; ib.value = q[1]; ic.value = q[2]; id.value = q[3]; sync(); draw(); });
    var bx = btnRow(['x = u₁', 'x = u₂'], function (i) { if (!axes) return; var v = ((axes[i] % 360) + 360) % 360; sp.value = Math.round(v * 2) / 2; draw(); });
    bx.classList.add('an-axbtn');
    function draw() {
      sync();
      var a = parseFloat(ia.value) || 0, b = parseFloat(ib.value) || 0, c = parseFloat(ic.value) || 0, d = chk.checked ? b : (parseFloat(id.value) || 0), sym = Math.abs(b - d) < 1e-9, phi = parseFloat(sp.value);
      lp.textContent = nc(phi) + '°';
      var disc = (a - c) * (a - c) + 4 * b * d, img = function (t) { return [a * Math.cos(t) + b * Math.sin(t), d * Math.cos(t) + c * Math.sin(t)]; };
      var m = 0, k, pts = [], pc = [];
      for (k = 0; k < 90; k++) { var q = img(k * Math.PI / 45); pts.push(q); m = Math.max(m, Math.abs(q[0]), Math.abs(q[1])); pc.push([Math.cos(k * Math.PI / 45), Math.sin(k * Math.PI / 45)]); }
      var K = m > 3.7 ? 3.7 / m : 1, T = function (q) { return [K * q[0], K * q[1]]; }, tp = function (ps) { return ps.map(function (q) { q = T(q); return P.X(q[0]) + ',' + P.Y(q[1]); }).join(' '); };
      P.clear();
      P.layer.appendChild(sv('polygon', { points: tp(pc), 'class': 'an-poly gr' })); P.layer.appendChild(sv('polygon', { points: tp(pts), 'class': 'an-poly' }));
      var ph = phi * Math.PI / 180, x = [Math.cos(ph), Math.sin(ph)], Ax = [a * x[0] + b * x[1], d * x[0] + c * x[1]];
      var h = '<b>A</b> = ' + mt([[a, b], [d, c]]) + (sym ? ' es <b>simétrica</b> (A = Aᵗ)' : ' <b>no es simétrica</b> (d ≠ b)') + '. Polinomio característico: ' + poly(a + c, a * c - b * d) + ' (traza ' + nd(a + c) + ', determinante ' + nd(a * c - b * d) + '). ';
      var kind = ''; axes = null;
      if (sym) {
        h += 'Discriminante Δ = (a ' + MINUS + ' c)² + 4b² = <b>' + nd(disc) + ' ≥ 0</b>: suma de cuadrados, <b>siempre</b> hay raíces reales (U p.221). ';
        if (disc < 1e-9) {
          kind = 'A = ' + nd(a) + '·I, valor doble, cualquier base ortonormal sirve'; h += '<br>Aquí a = c y b = 0: <b>A = ' + nd(a) + '·I</b>, un único valor propio λ = ' + nd(a) + ' doble con todo ℝ² como subespacio propio (d = α = 2). Todo vector es propio, la imagen de la circunferencia es una circunferencia de radio ' + nd(Math.abs(a)) + ' y puedes tomar P = I (o cualquier giro).';
        } else {
          var s = Math.sqrt(disc), l1 = (a + c + s) / 2, l2 = (a + c - s) / 2, th = 0.5 * Math.atan2(2 * b, a - c), u1 = [Math.cos(th), Math.sin(th)], u2 = [-Math.sin(th), Math.cos(th)], thd = th * 180 / Math.PI;
          var Pm = [[u1[0], u2[0]], [u1[1], u2[1]]], AP = [[a * Pm[0][0] + b * Pm[1][0], a * Pm[0][1] + b * Pm[1][1]], [b * Pm[0][0] + c * Pm[1][0], b * Pm[0][1] + c * Pm[1][1]]];
          var L = [[Pm[0][0] * AP[0][0] + Pm[1][0] * AP[1][0], Pm[0][0] * AP[0][1] + Pm[1][0] * AP[1][1]], [Pm[0][1] * AP[0][0] + Pm[1][1] * AP[1][0], Pm[0][1] * AP[0][1] + Pm[1][1] * AP[1][1]]];
          kind = 'λ₁ = ' + nd(l1) + ', λ₂ = ' + nd(l2) + ', ejes perpendiculares'; axes = [thd, thd + 90];
          var s1 = simpl(u1), s2 = simpl(u2), vt = function (u, sv2) { return '(' + nd(u[0]) + '; ' + nd(u[1]) + ')' + (sv2 ? ' ∝ (' + sv2[0] + '; ' + sv2[1] + ')' : ''); };
          [u1, u2].forEach(function (u, i) { P.layer.appendChild(sv('line', { x1: P.X(-9 * u[0]), y1: P.Y(-9 * u[1]), x2: P.X(9 * u[0]), y2: P.Y(9 * u[1]), 'class': 'an-vec dash ' + (i ? 'up' : 'w') })); });
          h += '<br>Valores propios <b>λ₁ = ' + nd(l1) + '</b> y <b>λ₂ = ' + nd(l2) + '</b> (λ = (a+c)/2 ± ½√Δ). Vectores propios unitarios <b>u₁ = ' + vt(u1, s1) + '</b> y <b>u₂ = ' + vt(u2, s2) + '</b>, con u₁•u₂ = ' + nd(u1[0] * u2[0] + u1[1] * u2[1]) + ': los ejes (rectas punteadas) son <b>perpendiculares</b>.';
          h += '<br>La matriz de paso P = (u₁ u₂) es el <b>giro de θ = ' + nc(thd) + '°</b> (det P = 1, PᵗP = I, P⁻¹ = Pᵗ), y PᵗAP = ' + mt(L) + ' = diag(λ₁, λ₂): los números de fuera de la diagonal salen 0.';
          h += '<br>La circunferencia unidad (gris) se convierte en una <b>elipse</b> cuyos semiejes, medidos sobre los ejes propios, son |λ₁| = ' + nd(Math.abs(l1)) + ' y |λ₂| = ' + nd(Math.abs(l2)) + (Math.abs(l2) < 1e-9 || Math.abs(l1) < 1e-9 ? ' (uno vale 0: la elipse se aplasta sobre un segmento, A es singular)' : '') + (l1 < -1e-9 || l2 < -1e-9 ? '; como ' + (l1 < -1e-9 && l2 < -1e-9 ? 'λ₁ y λ₂ son negativos, A invierte el sentido de los ejes u₁ y u₂' : (l2 < -1e-9 ? 'λ₂ es negativo, A invierte el sentido del eje u₂' : 'λ₁ es negativo, A invierte el sentido del eje u₁')) : '') + '.';
          P.layer.appendChild(sv('circle', { cx: P.X(K * l1 * u1[0]), cy: P.Y(K * l1 * u1[1]), r: 4.5, 'class': 'an-dot' })); P.layer.appendChild(sv('circle', { cx: P.X(K * l2 * u2[0]), cy: P.Y(K * l2 * u2[1]), r: 4.5, 'class': 'an-dot' }));
          var cr = Math.abs(x[0] * Ax[1] - x[1] * Ax[0]) / Math.max(Math.hypot(Ax[0], Ax[1]), 0.5);
          h += '<br>' + (cr < 0.026 ? '<b>El vector x apunta a un eje principal</b>: Ax es paralelo a x (Ax = λx, con λ = ' + nd(x[0] * Ax[0] + x[1] * Ax[1]) + ').' : 'Mueve φ (o pulsa «x = u₁», «x = u₂»): Ax es paralelo a x solo cuando x cae sobre una de las dos rectas punteadas (' + nc(thd) + '° y ' + nc(thd + 90) + '°).');
        }
      } else if (disc < -1e-9) {
        kind = 'sin valores propios reales'; h += 'Δ = (a ' + MINUS + ' c)² + 4bd = <b>' + nd(disc) + ' &lt; 0</b>: no hay raíces reales, <b>no hay vectores propios reales</b> (ninguna recta se conserva). Sin simetría esto sí puede ocurrir (giros).';
      } else {
        var sq = Math.sqrt(Math.max(0, disc)), l1b = (a + c + sq) / 2, l2b = (a + c - sq) / 2;
        var vec = function (l) { if (Math.abs(b) > 1e-9) return [b, l - a]; if (Math.abs(d) > 1e-9) return [l - c, d]; return Math.abs(l - a) < 1e-9 ? [1, 0] : [0, 1]; };
        if (disc < 1e-9) {
          var lam = (a + c) / 2, triv = Math.abs(b) < 1e-9 && Math.abs(d) < 1e-9;
          kind = triv ? 'A = λI' : 'no diagonalizable'; h += 'Δ = 0: valor propio doble λ = ' + nd(lam) + (triv ? '.' : ', pero A − λI ≠ 0 tiene rango 1: solo una recta propia (d = 1 &lt; α = 2), <b>no es diagonalizable</b>.');
        } else {
          var v1 = vec(l1b), v2 = vec(l2b), w1 = simpl(v1) || v1, w2 = simpl(v2) || v2, n1 = Math.hypot(v1[0], v1[1]), n2 = Math.hypot(v2[0], v2[1]), cs = (v1[0] * v2[0] + v1[1] * v2[1]) / (n1 * n2), ang = Math.acos(Math.min(1, Math.abs(cs))) * 180 / Math.PI;
          kind = 'diagonalizable, pero ejes no perpendiculares';
          [v1, v2].forEach(function (u, i) { var nn = Math.hypot(u[0], u[1]); P.layer.appendChild(sv('line', { x1: P.X(-9 * u[0] / nn), y1: P.Y(-9 * u[1] / nn), x2: P.X(9 * u[0] / nn), y2: P.Y(9 * u[1] / nn), 'class': 'an-vec dash ' + (i ? 'up' : 'w') })); });
          h += 'Δ = ' + nd(disc) + ' &gt; 0: λ₁ = ' + nd(l1b) + ', λ₂ = ' + nd(l2b) + ' (distintos, así que A sí es diagonalizable), con vectores propios (' + nd(w1[0]) + '; ' + nd(w1[1]) + ') y (' + nd(w2[0]) + '; ' + nd(w2[1]) + '). <br>Los ejes propios forman <b>' + nc(ang) + '°</b> (cos = ' + nd(cs) + '), no 90°.  No hay ninguna P <b>ortogonal</b> que diagonalice esta A (E 5.27: si la hubiera, A sería simétrica). Los ejes de la elipse no están sobre las rectas propias.';
        }
      }
      arrow(P, 0, 0, T(x)[0], T(x)[1], 'gr', 'x'); arrow(P, 0, 0, T(Ax)[0], T(Ax)[1], 'down', 'Ax');
      if (K < 1) h += ' <i>(Dibujo a escala ' + nc(K) + '.)</i>';
      html(text, h); res.textContent = '';
      var fin = el('div', 'sar-final'); fin.textContent = (sym ? 'Simétrica: ' : 'No simétrica: ') + kind; res.appendChild(fin);
    }
    [ia, ib, ic, id, sp, chk].forEach(function (q) { q.addEventListener('input', draw); q.addEventListener('change', draw); });
    root.appendChild(el('p', 'sar-text an-title', 'Una matriz simétrica de 2×2 deforma la circunferencia unidad (gris, discontinua) en una elipse (azul). Sus dos ejes están justo en las direcciones de los vectores propios y son siempre perpendiculares: por eso se diagonaliza con una matriz de paso ortogonal (un giro). Cambia a, b, c, mueve φ para ver cuándo Ax es paralelo a x, y desmarca «simétrica» para ver qué se pierde.'));
    root.appendChild(eq); root.appendChild(P.svg); root.appendChild(ctrl); root.appendChild(bx); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    draw();
  }


  var REG = [['.anim-simet', buildSimet], ['.anim-ortog', buildOrtog], ['.anim-gram', buildGram], ['.anim-jordan', buildJordan], ['.anim-diag', buildDiag],['.anim-propios', buildPropios], ['.anim-semej', buildSemej], ['.anim-gauss', buildGauss], ['.anim-prod', buildProd], ['.anim-adj', buildAdj], ['.anim-rectas', buildRectas], ['.anim-area', buildArea], ['.anim-combo', buildCombo], ['.anim-union', buildUnion], ['.anim-oper', buildOper], ['.anim-lineal', buildLineal], ['.anim-matriz', buildMatriz], ['.anim-cambio', buildCambio]];
  function init() { REG.forEach(function (r) { document.querySelectorAll(r[0]).forEach(function (n) { try { r[1](n); } catch (e) { console.error(r[0], e); } }); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
