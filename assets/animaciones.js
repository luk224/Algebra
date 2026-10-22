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
   .anim-bilineal data-a="1,1,1,2" data-p="-1,-1,1,2" data-x="2,1" data-y="1,3"   (forma bilineal 2x2: A editable [matriz de f en la base B], P editable [columnas = vectores de B' en coordenadas de B], x e y con sliders enteros; stepper en 5 pasos: A·y; x^t(Ay) = suma a_ij x_i y_j con aviso de que el orden importa [f(y,x)]; base nueva B' con su rejilla; A' = P^t A P con control a'_12 = f(v1,v2); comprobacion x'^t A' y' = f(x,y) con x' = P^-1 x, que se conserva [rango, simetria, signo de det; det A' = det A (det P)^2] y la semejanza P^-1 A P por contraste; avisa si P es singular; 6 presets: U Ej. 6.7 / Sept. 2018, Feb. 2026, Feb. 2025 B, no simetrica, antisimetrica, P singular; break-inside:avoid en impresion)
   .anim-minimos data-p="2,3;4,2;5,1;7,0.5"   (recta de minimos cuadrados y = m x + n para 2 a 8 puntos editables [filas (x_i, y_i); botones +/- punto]: sistema AX=B con una fila (x_i,1) por dato, sumas, ecuaciones normales y su determinante, solucion por Cramer, residuos verticales (segmentos naranjas) con control de que son ortogonales a las columnas (sum e_i = 0, sum x_i e_i = 0), error ||AX-B||, pronostico en un x editable y recta de prueba con sliders dm, dn (discontinua) cuyo error crece por Pitagoras ||AX'-B||^2 = ||AX-B||^2 + ||A(X'-X)||^2; si todos los x coinciden AtA es singular y avisa de solucion no unica; 7 presets: U Ej. 5.41, E 5.40, Lay 6.6 Ej. 1, P2, E 5.44 D, alineados, misma x; break-inside:avoid en impresion)
   .anim-cuadratica data-m="1,4,0,3" data-p="1,0,0,1" data-x="2,1"   (forma cuadratica 2x2, tema 6.2: M editable [cualquier matriz, Q(x)=x^t M x], P editable [columnas = base nueva B'], x con sliders enteros; stepper en 4 pasos: evaluar Q(x) y su polinomio con la curva de nivel Q=Q(x); parte simetrica S=(M+M^t)/2 [el termino cruzado se reparte a medias] y antisimetrica K con x^t K x = 0, rango; homogeneidad Q(2x)=4Q(x), Q(-x)=Q(x); cambio de base S'=P^t S P con comprobacion x'^t S' x' = Q(x); 6 presets)
   .anim-lu      data-a="2,2,2;4,7,7;6,18,22" data-b="2,2,1"   (factorizacion LU n x n paso a paso: reemplazos sin normalizar, multiplicador m que pasa a L, aviso de pivote 0 [hace falta PA=LU]; despues LY=B progresiva y UX=Y retrosustitucion; A y B editables)
   .anim-clasif data-a="1,2,1"   (clasificacion de una forma cuadratica 2x2, tema 6.3: a11, a12 y a22 editables [A simetrica], 8 presets [E 6.18, E 6.19, U Ej. 6.26, U Ej. 6.24, DN, SN, D1 = 0, Q = 0]; stepper en 5 pasos: polinomio y matriz; Sylvester con la rama aplicable [definida: "<=>", semidefinida: "=>", o "no decide"] y zonas Q>0 azul / Q<0 naranja; valores propios con control de traza y determinante y ejes principales; forma canonica, signatura, rango, cuadro de invariantes y curvas Q = 1 y Q = -1 [elipse, hiperbolas, rectas]; vectores testigo y veredicto; break-inside:avoid en impresion)
   .anim-baseinc data-v="1,2,0,1;2,4,1,1"   (base incompleta en R^n: vectores libres en filas editables; escalona con pivotes resaltados, marca columnas sin pivote, anade e_j de esas columnas, reordena a n x n escalonada con n pivotes y comprueba det != 0; avisa si los vectores no son libres)
   .anim-conica data-a="1,0,4,-4,-16,19"   (conicas, tema 6.4: los 6 coeficientes enteros de a11 x1^2 + 2a12 x1x2 + a22 x2^2 + 2a01 x1 + 2a02 x2 + a00 = 0 [orden: a11, 2a12, a22, 2a01, 2a02, a00] editables y 21 presets [E 6.28, E 6.27 B, E 6.32, Feb. 2018 B, Sept. 2017 A1, U Ej. 6.31, hiperbola y parabola con giro, degeneradas, Feb. 2019 A, familia P5 con parametro k, circunferencia]; stepper en 5 pasos: matriz asociada e invariantes |A|, a11+a22, A00 y rango; clasificacion por el cuadro de U p.286 [con el criterio A11+A22 para las rectas paralelas, que corrige el uso de solo A11 del libro]; giro [valores propios de la parte cuadratica, u1 y u2 unitarios con det P = 1, angulo, nueva ecuacion]; traslacion [completar cuadrados, centro o vertice en coordenadas originales, control d = |A|/A00 o |A| = -lambda b^2/4]; ecuacion reducida con semiejes, focos, vertices, asintotas, directriz y eje; dibuja la conica original [elipse, hiperbola, parabola, rectas, punto] con los ejes de cada paso; 0 puntos reales se avisa; break-inside:avoid en impresion)
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


  /* =====================================================================
     Minimos cuadrados: recta de regresion por puntos editables (.anim-minimos)
     ===================================================================== */
  function buildMinimos(root) {
    var nd = function (x) { var v = Math.round(x * 1000) / 1000; if (Math.abs(v) < 1e-9) v = 0; return String(v).replace('-', MINUS).replace('.', ','); };
    var sg = function (v) { return v < 0 ? MINUS + ' ' + nd(-v) : '+ ' + nd(v); };
    var pts0 = (root.getAttribute('data-p') || '2,3;4,2;5,1;7,0.5').split(';').map(function (r) { return r.split(',').map(Number); });
    root.textContent = ''; root.classList.add('sarrus');
    var W = 420, H = 300, ML = 40, MB = 28, MT = 12, MR = 14;
    var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'an-svg', role: 'img', 'aria-label': 'Puntos de datos, recta de mínimos cuadrados y residuos verticales' });
    svg.style.maxWidth = '460px';
    var layer = sv('g', {}); svg.appendChild(layer);
    var eqs = el('div', 'an-eqs'), rows = [], text = el('p', 'sar-text'), res = el('div', 'sar-res'), sl = el('div', 'an-sliders');
    text.setAttribute('aria-live', 'polite');
    var sm = slider(-1, 1, 0.05, 0), sn = slider(-4, 4, 0.1, 0), lm = el('b'), ln = el('b');
    sm.setAttribute('aria-label', 'Cambio Δm de la pendiente de la recta de prueba'); sn.setAttribute('aria-label', 'Cambio Δn del término independiente de la recta de prueba');
    [['Δm ', sm, lm], ['Δn ', sn, ln]].forEach(function (q) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', q[0])); r.appendChild(q[1]); r.appendChild(q[2]); sl.appendChild(r); });
    var fx = numInput(10, 0.5, '4.2em'); fx.setAttribute('aria-label', 'valor de x para el pronóstico');
    var fr = el('label', 'an-slrow'); fr.style.justifyContent = 'center'; fr.appendChild(el('span', '', 'Pronóstico en x = ')); fr.appendChild(fx);

    function addRow(x, y) {
      var d = el('div', 'an-eq ' + (rows.length % 2 ? 'up' : 'down')), ix = numInput(x, 0.5, '3.6em'), iy = numInput(y, 0.5, '3.6em');
      ix.setAttribute('aria-label', 'x del punto ' + (rows.length + 1)); iy.setAttribute('aria-label', 'y del punto ' + (rows.length + 1));
      d.appendChild(el('span', '', 'P' + (rows.length + 1) + ' ( ')); d.appendChild(ix); d.appendChild(el('span', '', ' , ')); d.appendChild(iy); d.appendChild(el('span', '', ' )'));
      ix.addEventListener('input', draw); iy.addEventListener('input', draw);
      eqs.appendChild(d); rows.push({ d: d, x: ix, y: iy });
    }
    function setPts(P) { rows.forEach(function (r) { eqs.removeChild(r.d); }); rows = []; P.forEach(function (p) { addRow(p[0], p[1]); }); }
    var PRE = [['U Ej. 5.41', [[2, 3], [4, 2], [5, 1], [7, 0.5]]], ['E 5.40', [[1, 2], [2, 1.5], [3, 2.5], [4, 1], [5, 2]]], ['Lay §6.6 Ej. 1', [[2, 1], [5, 2], [7, 3], [8, 3]]], ['Propio P2', [[0, 1], [1, 1], [2, 2], [3, 4]]], ['E 5.44 D: (0,0), (1,1), (2,0)', [[0, 0], [1, 1], [2, 0]]], ['Alineados: error 0', [[0, 1], [1, 3], [2, 5]]], ['Misma x (AᵗA singular)', [[2, 1], [2, 3], [2, 5]]]];
    var pre = btnRow(PRE.map(function (q) { return q[0]; }), function (k) { setPts(PRE[k][1]); sm.value = 0; sn.value = 0; fx.value = 10; draw(); });
    var cnt = btnRow(['+ punto', '− punto'], function (i) {
      if (i === 0 && rows.length < 8) { var l = rows[rows.length - 1], xx = l ? (parseFloat(l.x.value) || 0) + 1 : 0; addRow(xx, l ? (parseFloat(l.y.value) || 0) : 0); }
      if (i === 1 && rows.length > 2) { var r = rows.pop(); eqs.removeChild(r.d); }
      draw();
    });
    function nice(lo, hi, n) { var span = Math.max(hi - lo, 1e-6), raw = span / n, p = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), f = raw / p, st = (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p, out = []; for (var t = Math.ceil(lo / st - 1e-9) * st; t <= hi + 1e-9; t += st) out.push(Math.round(t / st) * st); return out; }

    function draw() {
      var P = rows.map(function (r) { return [parseFloat(r.x.value) || 0, parseFloat(r.y.value) || 0]; }), N = P.length;
      var Sx = 0, Sxx = 0, Sy = 0, Sxy = 0; P.forEach(function (p) { Sx += p[0]; Sxx += p[0] * p[0]; Sy += p[1]; Sxy += p[0] * p[1]; });
      var det = N * Sxx - Sx * Sx, ok = Math.abs(det) > 1e-9, m = 0, n = N ? Sy / N : 0;
      if (ok) { m = (N * Sxy - Sx * Sy) / det; n = (Sxx * Sy - Sx * Sxy) / det; }
      var dm = parseFloat(sm.value) || 0, dn = parseFloat(sn.value) || 0; lm.textContent = nd(dm); ln.textContent = nd(dn);
      var mt = m + dm, nt = n + dn;
      var xs = P.map(function (p) { return p[0]; }), ys = P.map(function (p) { return p[1]; });
      var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys.concat([m * x0 + n, m * x1 + n])), y1 = Math.max.apply(null, ys.concat([m * x0 + n, m * x1 + n]));
      var px = Math.max((x1 - x0) * 0.12, 0.6), py = Math.max((y1 - y0) * 0.15, 0.6); x0 -= px; x1 += px; y0 -= py; y1 += py;
      var X = function (x) { return ML + (x - x0) / (x1 - x0) * (W - ML - MR); }, Y = function (y) { return H - MB - (y - y0) / (y1 - y0) * (H - MB - MT); };
      while (layer.firstChild) layer.removeChild(layer.firstChild);
      var t;
      nice(x0, x1, 7).forEach(function (v) { layer.appendChild(sv('line', { x1: X(v), y1: MT, x2: X(v), y2: H - MB, 'class': 'an-gr' })); t = sv('text', { x: X(v), y: H - MB + 14, 'class': 'an-tk', 'text-anchor': 'middle' }); t.textContent = nd(v); layer.appendChild(t); });
      nice(y0, y1, 6).forEach(function (v) { layer.appendChild(sv('line', { x1: ML, y1: Y(v), x2: W - MR, y2: Y(v), 'class': 'an-gr' })); t = sv('text', { x: ML - 5, y: Y(v) + 4, 'class': 'an-tk', 'text-anchor': 'end' }); t.textContent = nd(v); layer.appendChild(t); });
      layer.appendChild(sv('line', { x1: ML, y1: H - MB, x2: W - MR, y2: H - MB, 'class': 'an-ax' })); layer.appendChild(sv('line', { x1: ML, y1: MT, x2: ML, y2: H - MB, 'class': 'an-ax' }));
      var line = function (mm, nn, cls) { layer.appendChild(sv('line', { x1: X(x0), y1: Y(mm * x0 + nn), x2: X(x1), y2: Y(mm * x1 + nn), 'class': cls })); };
      var trial = ok && (Math.abs(dm) > 1e-9 || Math.abs(dn) > 1e-9);
      if (trial) line(mt, nt, 'an-ln up dashl');
      if (ok) line(m, n, 'an-ln down');
      var E2 = 0, Et2 = 0, sumE = 0, sumXE = 0, resid = [];
      P.forEach(function (p) {
        var e = p[1] - (m * p[0] + n); E2 += e * e; sumE += e; sumXE += p[0] * e; resid.push(e); Et2 += Math.pow(p[1] - (mt * p[0] + nt), 2);
        if (ok) { var s = sv('line', { x1: X(p[0]), y1: Y(p[1]), x2: X(p[0]), y2: Y(m * p[0] + n), 'class': 'an-vec up' }); s.style.strokeWidth = '2.2'; layer.appendChild(s); }
        layer.appendChild(sv('circle', { cx: X(p[0]), cy: Y(p[1]), r: 4.6, 'class': 'an-dot' }));
      });
      var fxv = parseFloat(fx.value); if (isNaN(fxv)) fxv = 0;
      if (ok && fxv >= x0 && fxv <= x1) layer.appendChild(sv('circle', { cx: X(fxv), cy: Y(m * fxv + n), r: 5, 'class': 'an-dot ker' }));
      var rec = 'y = ' + nd(m) + '·x ' + sg(n);
      var h = '<b>Sistema</b> AX = B: cada punto (xᵢ, yᵢ) da una ecuación m·xᵢ + n = yᵢ, así que A tiene una fila (xᵢ, 1) por dato: <b>' + N + ' ecuaciones y 2 incógnitas</b> (m, n).';
      h += '<br><b>Sumas:</b> Σx = ' + nd(Sx) + ', Σx² = ' + nd(Sxx) + ', Σy = ' + nd(Sy) + ', Σxy = ' + nd(Sxy) + ', N = ' + N + '.';
      h += '<br><b>Ecuaciones normales</b> AᵗAX = AᵗB: ' + nd(Sxx) + '·m + ' + nd(Sx) + '·n = ' + nd(Sxy) + ' ; ' + nd(Sx) + '·m + ' + N + '·n = ' + nd(Sy) + '. Determinante de AᵗA = N·Σx² − (Σx)² = <b>' + nd(det) + '</b>.';
      if (!ok) {
        h += '<br><b>AᵗA es singular</b>: todos los xᵢ son iguales (' + nd(xs[0]) + '), las columnas (xᵢ) y (1,…,1) de A son proporcionales (dependientes) y la solución por mínimos cuadrados <b>no es única</b>: sirve cualquier (m, n) con m·' + nd(xs[0]) + ' + n = ' + nd(Sy / N) + ' (la media de los yᵢ). Además, puntos con la misma x no los describe ninguna función y = mx + n.';
      } else {
        h += '<br><b>Solución</b> (Cramer): m = (N·Σxy − Σx·Σy)/det = <b>' + nd(m) + '</b>, n = (Σx²·Σy − Σx·Σxy)/det = <b>' + nd(n) + '</b>. Recta de mínimos cuadrados: <b>' + rec + '</b>.';
        h += '<br><b>Residuos</b> eᵢ = yᵢ − (m·xᵢ + n) (segmentos naranjas): ' + resid.map(nd).join('; ') + '. Control de las normales: Σeᵢ = ' + nd(sumE) + ' y Σxᵢeᵢ = ' + nd(sumXE) + ' (el vector de residuos es <b>ortogonal a las dos columnas</b> de A).';
        h += '<br><b>Error</b> ‖AX − B‖ = √Σeᵢ² = <b>' + nd(Math.sqrt(E2)) + '</b>' + (E2 < 1e-9 ? ': los puntos están alineados, AX = B es compatible y el error es 0.' : '.');
        if (trial) h += '<br><b>Tu recta de prueba</b> y = ' + nd(mt) + '·x ' + sg(nt) + ' (discontinua) tiene error √Σeᵢ² = <b>' + nd(Math.sqrt(Et2)) + '</b> ' + (Et2 >= E2 - 1e-9 ? '≥ ' : '&lt; ') + nd(Math.sqrt(E2)) + '. Pitágoras: ‖AX′ − B‖² = ‖AX − B‖² + ‖A(X′ − X)‖² = ' + nd(E2) + ' + ' + nd(Et2 - E2) + ' = ' + nd(Et2) + '; por eso nunca mejora.';
        else h += '<br>Mueve Δm y Δn para ver una recta de prueba: su error siempre es mayor, porque ‖AX′ − B‖² = ‖AX − B‖² + ‖A(X′ − X)‖².';
        h += '<br><b>Pronóstico</b> en x = ' + nd(fxv) + ': y = ' + nd(m * fxv + n) + '.';
      }
      html(text, h); res.textContent = '';
      var fin = el('div', 'sar-final'); fin.textContent = ok ? rec + ' · error ' + nd(Math.sqrt(E2)) : 'Solución no única (columnas dependientes)'; res.appendChild(fin);
    }
    root.appendChild(el('p', 'sar-text an-title', 'Cuando los datos no caen sobre una recta, el sistema AX = B de «m·xᵢ + n = yᵢ» es incompatible. La recta de mínimos cuadrados (azul) hace mínima la suma de los cuadrados de los residuos verticales (naranja). Edita los puntos o carga un ejemplo; con Δm y Δn separas la recta de prueba (discontinua) de la óptima y ves cómo crece el error.'));
    root.appendChild(eqs); root.appendChild(cnt); root.appendChild(svg); root.appendChild(sl); root.appendChild(fr); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    [sm, sn, fx].forEach(function (q) { q.addEventListener('input', draw); });
    setPts(pts0); draw();
  }



  /* =====================================================================
     Formas bilineales 2x2: f(x,y) = x^t A y y cambio de base A' = P^t A P (.anim-bilineal)
     ===================================================================== */
  function buildBilineal(root) {
    var a0 = (root.getAttribute('data-a') || '1,1,1,2').split(',').map(Number), p0 = (root.getAttribute('data-p') || '1,0,0,1').split(',').map(Number);
    var x0 = (root.getAttribute('data-x') || '2,1').split(',').map(Number), y0 = (root.getAttribute('data-y') || '1,3').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var body = el('div', 'an-body');
    var P = plane(body, 340, 340, 5);
    P.svg.setAttribute('aria-label', 'Plano con los vectores x e y, la base canónica B y la rejilla de la base nueva B′');
    var res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); ctrl.appendChild(r); }
    var ia = a0.map(function (x, k) { var i = numInput(x, 1, '3.2em'); i.setAttribute('aria-label', 'A entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); return i; });
    var ip = p0.map(function (x, k) { var i = numInput(x, 1, '3.2em'); i.setAttribute('aria-label', 'P entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); return i; });
    var eq = el('div', 'an-eqs');
    function mrow(lbl, ins, note) { var r = el('div', 'an-eq down'); r.appendChild(el('span', '', lbl + ' = ( ')); r.appendChild(ins[0]); r.appendChild(ins[1]); r.appendChild(el('span', '', ' ; ')); r.appendChild(ins[2]); r.appendChild(ins[3]); r.appendChild(el('span', '', ' )' + note)); eq.appendChild(r); }
    mrow('A', ia, '   matriz de f en la base B'); mrow('P', ip, '   columnas = vectores de B′ escritos en B');
    var sl = [x0[0], x0[1], y0[0], y0[1]].map(function (v) { return slider(-4, 4, 1, v); }), lb = sl.map(function () { return el('b'); });
    ['x₁', 'x₂', 'y₁', 'y₂'].forEach(function (t, k) { sl[k].setAttribute('aria-label', 'coordenada ' + t); row(t + ' ', sl[k], lb[k]); });
    var pre = btnRow(['U Ej. 6.7 / Sept. 2018', 'Feb. 2026', 'Feb. 2025 B (P = I)', 'No simétrica', 'Antisimétrica', 'P singular'], function (i) {
      var p = [[1, 1, 1, 2, -1, -1, 1, 2, 2, 1, 1, 3], [1, 1, 1, 1, 1, 1, 1, -1, 1, 2, 2, 1], [5, -9, 2, 1, 1, 0, 0, 1, 1, 1, 2, 3], [1, 2, 0, -1, 1, 1, 1, 2, 2, -1, 1, 3], [0, 1, -1, 0, 1, 1, 0, 1, 2, 1, 1, 3], [1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1, 3]][i];
      ia.forEach(function (q, j) { q.value = p[j]; }); ip.forEach(function (q, j) { q.value = p[4 + j]; }); sl.forEach(function (q, j) { q.value = p[8 + j]; }); recalc(true);
    });
    function mm(x, y) { return [add(mul(x[0], y[0]), mul(x[1], y[2])), add(mul(x[0], y[1]), mul(x[1], y[3])), add(mul(x[2], y[0]), mul(x[3], y[2])), add(mul(x[2], y[1]), mul(x[3], y[3]))]; }
    function tp(m) { return [m[0], m[2], m[1], m[3]]; }
    function mv(m, v) { return [add(mul(m[0], v[0]), mul(m[1], v[1])), add(mul(m[2], v[0]), mul(m[3], v[1]))]; }
    function dot(u, v) { return add(mul(u[0], v[0]), mul(u[1], v[1])); }
    function dt(m) { return sub(mul(m[0], m[3]), mul(m[1], m[2])); }
    function inv(m) { var d = dt(m); return [div(m[3], d), div(neg(m[1]), d), div(neg(m[2]), d), div(m[0], d)]; }
    function mt(m) { return '(' + ftxt(m[0]) + ' ' + ftxt(m[1]) + ' ; ' + ftxt(m[2]) + ' ' + ftxt(m[3]) + ')'; }
    function vt(v) { return '(' + ftxt(v[0]) + ', ' + ftxt(v[1]) + ')'; }
    function rd(i) { var f = parseFloat(i.value), r = Math.round(f); if (isNaN(f)) return 0; if (f !== r) i.value = r; return r; }
    var cur = null;
    function model() {
      var A = ia.map(function (i) { return F(rd(i), 1); }), Pm = ip.map(function (i) { return F(rd(i), 1); });
      var X = [F(parseInt(sl[0].value, 10), 1), F(parseInt(sl[1].value, 10), 1)], Y = [F(parseInt(sl[2].value, 10), 1), F(parseInt(sl[3].value, 10), 1)];
      return { A: A, P: Pm, x: X, y: Y, dp: dt(Pm), ok: !isz(dt(Pm)) };
    }
    function same(u, v) { return u.n === v.n && u.d === v.d; }
    function render(s, text) {
      var M = cur, A = M.A, Pm = M.P, X = M.x, Y = M.y; P.clear(); res.textContent = '';
      lb.forEach(function (l, k) { l.textContent = String([X[0], X[1], Y[0], Y[1]][k].n).replace('-', MINUS); });
      var Ay = mv(A, Y), f = dot(X, Ay), Ax = mv(A, X), fyx = dot(Y, Ax);
      if (M.ok && s >= 3) {
        var u = [Pm[0].n, Pm[2].n], w = [Pm[1].n, Pm[3].n];
        for (var k = -14; k <= 14; k++) {
          [[k * u[0], k * u[1], w[0], w[1]], [k * w[0], k * w[1], u[0], u[1]]].forEach(function (q) {
            P.layer.appendChild(sv('line', { x1: P.X(q[0] - 14 * q[2]), y1: P.Y(q[1] - 14 * q[3]), x2: P.X(q[0] + 14 * q[2]), y2: P.Y(q[1] + 14 * q[3]), stroke: '#2e9e5b', 'stroke-width': k === 0 ? 1.2 : 0.6, 'stroke-dasharray': '4 3', opacity: k === 0 ? 0.7 : 0.35 }));
          });
        }
      }
      arrow(P, 0, 0, 1, 0, 'gr', 'e₁'); arrow(P, 0, 0, 0, 1, 'gr', 'e₂');
      arrow(P, 0, 0, X[0].n, X[1].n, 'down', 'x'); arrow(P, 0, 0, Y[0].n, Y[1].n, 'up', 'y');
      if (s >= 3) { arrow(P, 0, 0, Pm[0].n, Pm[2].n, 'w', 'v₁'); arrow(P, 0, 0, Pm[1].n, Pm[3].n, 'w', 'v₂'); }
      var h = '', sym = same(A[1], A[2]);
      if (s === 0) h = '<b>Forma bilineal</b> = «producto» f(x, y) que da un <b>número</b> y es lineal en x y en y por separado. Fijada la base B, queda determinada por su matriz A = (aᵢⱼ), aᵢⱼ = f(eᵢ, eⱼ): <b>f(x, y) = xᵗAy</b> = Σ aᵢⱼ xᵢ yⱼ (U Def. 6.3). Aquí A = ' + mt(A) + ', x = ' + vt(X) + ' (azul), y = ' + vt(Y) + ' (naranja), ambos en coordenadas de B. Pasos: (1) A·y; (2) xᵗ(Ay); (3) base nueva B′; (4) A′ = PᵗAP; (5) comprobar que f no cambia (si P no es regular, se para en el paso 3).';
      else if (s === 1) h = '<b>1. Primero A·y</b> (la matriz actúa sobre el segundo vector): Ay = (' + ftxt(A[0]) + '·' + fpar(Y[0]) + ' + ' + fpar(A[1]) + '·' + fpar(Y[1]) + ',  ' + ftxt(A[2]) + '·' + fpar(Y[0]) + ' + ' + fpar(A[3]) + '·' + fpar(Y[1]) + ') = <b>' + vt(Ay) + '</b>.';
      else if (s === 2) {
        var t = [mul(mul(A[0], X[0]), Y[0]), mul(mul(A[1], X[0]), Y[1]), mul(mul(A[2], X[1]), Y[0]), mul(mul(A[3], X[1]), Y[1])];
        h = '<b>2. Después xᵗ(Ay):</b> f(x, y) = ' + fpar(X[0]) + '·' + fpar(Ay[0]) + ' + ' + fpar(X[1]) + '·' + fpar(Ay[1]) + ' = <b>' + ftxt(f) + '</b>. Es lo mismo que sumar los cuatro términos aᵢⱼxᵢyⱼ: ' + t.map(fpar).join(' + ') + ' = ' + ftxt(f) + '. ' +
          '<b>El orden importa:</b> f(y, x) = yᵗAx = <b>' + ftxt(fyx) + '</b>' + (same(f, fyx) ? (sym ? ' (iguales porque A es simétrica: a₁₂ = a₂₁)' : ' (iguales aquí por casualidad; A no es simétrica)') : ' ≠ f(x, y), porque A no es simétrica (a₁₂ ≠ a₂₁)') + '.';
      } else if (!M.ok) {
        h = '<b>3. Con estas columnas det P = 0:</b> v₁ y v₂ (flechas verdes) están alineados, no son una base de ℝ² y no hay matriz de paso. P tiene que ser <b>regular</b> (Teor. 6.1, Def. 6.4). Cambia P.';
      } else if (s === 3) {
        h = '<b>3. Base nueva B′ = {v₁, v₂}:</b> v₁ = ' + vt([Pm[0], Pm[2]]) + ', v₂ = ' + vt([Pm[1], Pm[3]]) + ' (en coordenadas de B), las <b>columnas</b> de P = ' + mt(Pm) + '. det P = ' + ftxt(M.dp) + ' ≠ 0: es base. P es la matriz de paso de B′ a B: X = P·X′ (U Teor. 6.1, p.250). La rejilla verde es la de B′.';
      } else if (s === 4) {
        var AP = mm(A, Pm), Ap = mm(tp(Pm), AP), a12 = dot([Pm[0], Pm[2]], mv(A, [Pm[1], Pm[3]]));
        h = '<b>4. A′ = PᵗAP</b> (¡no P⁻¹AP!). Primero AP = ' + mt(AP) + ' (la columna j es A·vⱼ); luego A′ = Pᵗ(AP) = <b>' + mt(Ap) + '</b>. Control por definición: a′₁₂ = f(v₁, v₂) = v₁ᵗ(Av₂) = ' + ftxt(a12) + (same(a12, Ap[1]) ? ' ✓' : ' ✗') + '.';
      } else {
        var Ap5 = mm(tp(Pm), mm(A, Pm)), Pi = inv(Pm), x2 = mv(Pi, X), y2 = mv(Pi, Y), f2 = dot(x2, mv(Ap5, y2)), d1 = dt(A), d2 = dt(Ap5), sem = mm(Pi, mm(A, Pm));
        h = '<b>5. El valor de f no depende de la base.</b> Coordenadas en B′: x′ = P⁻¹x = ' + vt(x2) + ', y′ = P⁻¹y = ' + vt(y2) + '. Entonces x′ᵗA′y′ = <b>' + ftxt(f2) + '</b> ' + (same(f2, f) ? '= f(x, y) ✓.' : '≠ f(x, y) ✗.') +
          ' <i>Qué cambia y qué no (congruencia):</i> det A′ = det A·(det P)² = ' + fpar(d1) + '·' + ftxt(mul(M.dp, M.dp)) + ' = ' + ftxt(d2) + (same(mul(M.dp, M.dp), F(1)) ? ' (aquí se conserva porque (det P)² = 1; en general solo se conserva el signo)' : ' (solo se conserva el signo)') + '; el rango se conserva; ' + (sym ? 'A simétrica ⇒ A′ simétrica; ' : '') +
          (same(add(A[0], A[3]), add(Ap5[0], Ap5[3])) ? 'la traza aquí coincide (' + ftxt(add(A[0], A[3])) + '), pero en general no se conserva. ' : 'la traza no se conserva (' + ftxt(add(A[0], A[3])) + ' → ' + ftxt(add(Ap5[0], Ap5[3])) + '). ') +
          (sem.every(function (q, i) { return same(q, Ap5[i]); }) ? 'Aquí la semejanza P⁻¹AP = PᵗAP <b>coincide</b> con la congruencia porque P es ortogonal (Pᵗ = P⁻¹).' : 'Para contrastar, la <i>semejanza</i> daría P⁻¹AP = ' + mt(sem) + ' (otra matriz: no es la de la forma bilineal).');
      }
      html(text, h);
      if (s === st.N) { var fin = el('div', 'sar-final'); fin.textContent = M.ok ? 'f(x, y) = ' + ftxt(f) + '  ·  A′ = PᵗAP = ' + mt(mm(tp(Pm), mm(A, Pm))) : 'P no es regular: no hay cambio de base'; res.appendChild(fin); }
    }
    var st = stepper(root, 5, render, null, 3400);
    function recalc(jump) { cur = model(); st.setN(cur.ok ? 5 : 3); st.go(jump ? st.N : Math.min(st.step, st.N)); }
    ia.concat(ip).forEach(function (q) { q.addEventListener('input', function () { recalc(true); }); });
    var tmr = null;
    sl.forEach(function (q) { q.addEventListener('input', function () { cur = model(); clearTimeout(tmr); tmr = setTimeout(function () { st.text.setAttribute('aria-live', 'off'); st.go(st.step); setTimeout(function () { st.text.setAttribute('aria-live', 'polite'); }, 50); }, 200); }); });
    body.appendChild(el('p', 'sar-text an-title', 'Edita la matriz A de la forma bilineal, la matriz de paso P (enteros) y los vectores x, y (deslizadores), o elige un caso. Recorre los pasos: calcular f(x, y) = xᵗAy, cambiar de base con A′ = PᵗAP y comprobar que f vale lo mismo en las dos bases.'));
    body.appendChild(eq); body.appendChild(P.svg); body.appendChild(ctrl); body.appendChild(pre);
    root.appendChild(body); st.mount(root, res);
    cur = model(); st.setN(cur.ok ? 5 : 3); st.go(0);
    window.addEventListener('beforeprint', function () { st.go(st.N); });
  }


  /* =====================================================================
     Formas cuadraticas 2x2: Q(x) = x^t M x, parte simetrica y cambio de base (.anim-cuadratica)
     ===================================================================== */
  function buildCuadratica(root) {
    var m0 = (root.getAttribute('data-m') || '1,4,0,3').split(',').map(Number), p0 = (root.getAttribute('data-p') || '1,-2,0,1').split(',').map(Number);
    var x0 = (root.getAttribute('data-x') || '2,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var body = el('div', 'an-body');
    var P = plane(body, 340, 340, 5);
    P.svg.setAttribute('aria-label', 'Plano con el vector x, su múltiplo, la curva de nivel Q = Q(x) y la rejilla de la base nueva B′');
    var res = el('div', 'sar-res'), ctrl = el('div', 'an-sliders');
    function row(txt, s, lb) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb); ctrl.appendChild(r); }
    var im = m0.map(function (x, k) { var i = numInput(x, 1, '3.2em'); i.setAttribute('aria-label', 'M entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); return i; });
    var ip = p0.map(function (x, k) { var i = numInput(x, 1, '3.2em'); i.setAttribute('aria-label', 'P entrada ' + (k < 2 ? 1 : 2) + ',' + (k % 2 + 1)); return i; });
    var eq = el('div', 'an-eqs');
    function mrow(lbl, ins, note) { var r = el('div', 'an-eq down'); r.appendChild(el('span', '', lbl + ' = ( ')); r.appendChild(ins[0]); r.appendChild(ins[1]); r.appendChild(el('span', '', ' ; ')); r.appendChild(ins[2]); r.appendChild(ins[3]); r.appendChild(el('span', '', ' )')); r.appendChild(el('span', 'an-note', note)); eq.appendChild(r); }
    mrow('M', im, '   cualquier matriz con Q(x) = xᵗMx'); mrow('P', ip, '   columnas = base nueva B′ en coordenadas de B');
    var sl = [x0[0], x0[1]].map(function (v) { return slider(-4, 4, 1, v); }), lb = sl.map(function () { return el('b'); });
    ['x₁', 'x₂'].forEach(function (t, k) { sl[k].setAttribute('aria-label', 'coordenada ' + t); row(t + ' ', sl[k], lb[k]); });
    var pre = btnRow(['E 6.15', 'No simétrica (propio)', 'Triangular', 'Antisimétrica (Q ≡ 0)', 'x₁x₂ → diagonal', 'P singular'], function (i) {
      var p = [[1, 1, 1, 1, 1, 1, 0, -1, 2, 1], [1, 4, 0, 3, 1, -2, 0, 1, 2, 1], [1, -2, 0, 0, 1, 1, 0, 1, 2, 1], [0, -1, 1, 0, 1, 0, 0, 1, 2, 1], [0, 1, 0, 0, 1, 1, 1, -1, 2, 1], [1, 1, 1, 2, 1, 2, 1, 2, 2, 1]][i];
      im.forEach(function (q, j) { q.value = p[j]; }); ip.forEach(function (q, j) { q.value = p[4 + j]; }); sl.forEach(function (q, j) { q.value = p[8 + j]; }); recalc(true);
    });
    function mm(x, y) { return [add(mul(x[0], y[0]), mul(x[1], y[2])), add(mul(x[0], y[1]), mul(x[1], y[3])), add(mul(x[2], y[0]), mul(x[3], y[2])), add(mul(x[2], y[1]), mul(x[3], y[3]))]; }
    function tp(m) { return [m[0], m[2], m[1], m[3]]; }
    function mv(m, v) { return [add(mul(m[0], v[0]), mul(m[1], v[1])), add(mul(m[2], v[0]), mul(m[3], v[1]))]; }
    function dot(u, v) { return add(mul(u[0], v[0]), mul(u[1], v[1])); }
    function dt(m) { return sub(mul(m[0], m[3]), mul(m[1], m[2])); }
    function inv(m) { var d = dt(m); return [div(m[3], d), div(neg(m[1]), d), div(neg(m[2]), d), div(m[0], d)]; }
    function mt(m) { return '(' + ftxt(m[0]) + ' ' + ftxt(m[1]) + ' ; ' + ftxt(m[2]) + ' ' + ftxt(m[3]) + ')'; }
    function vt(v) { return '(' + ftxt(v[0]) + ', ' + ftxt(v[1]) + ')'; }
    function rank(m) { return isz(dt(m)) ? (m.every(isz) ? 0 : 1) : 2; }
    function poly(a, b, c, u, v) {
      var out = '';
      [[a, u + '²'], [b, u + v], [c, v + '²']].forEach(function (t) {
        if (isz(t[0])) return;
        var neg0 = t[0].n < 0, ab = F(Math.abs(t[0].n), t[0].d), co = ise(ab, 1) ? '' : ftxt(ab);
        out += (out ? (neg0 ? ' ' + MINUS + ' ' : ' + ') : (neg0 ? MINUS : '')) + co + t[1];
      });
      return out || '0';
    }
    function rd(i) { var f = parseFloat(i.value), r = Math.round(f); if (isNaN(f)) return 0; if (f !== r) i.value = r; return r; }
    var cur = null;
    function model() {
      var M = im.map(function (i) { return F(rd(i), 1); }), Pm = ip.map(function (i) { return F(rd(i), 1); });
      return { M: M, P: Pm, x: [F(parseInt(sl[0].value, 10), 1), F(parseInt(sl[1].value, 10), 1)], dp: dt(Pm), ok: !isz(dt(Pm)) };
    }
    function same(u, v) { return u.n === v.n && u.d === v.d; }
    function render(s, text) {
      var Mm = cur.M, Pm = cur.P, X = cur.x; P.clear(); res.textContent = '';
      lb.forEach(function (l, k) { l.textContent = String(X[k].n).replace('-', MINUS); });
      var half = F(Mm[1].n * Mm[2].d + Mm[2].n * Mm[1].d, 2 * Mm[1].d * Mm[2].d);
      var S = [Mm[0], half, half, Mm[3]];
      var K = [F(0), sub(Mm[1], half), sub(Mm[2], half), F(0)];
      var Mx = mv(Mm, X), q = dot(X, Mx), qS = dot(X, mv(S, X)), cc = add(Mm[1], Mm[2]);
      var qf = q.n / q.d, a = Mm[0].n / Mm[0].d, d = Mm[3].n / Mm[3].d, b2 = half.n / half.d;
      var lam = Math.max(Math.abs(X[0].n / X[0].d), Math.abs(X[1].n / X[1].d)) * 2 <= 5 ? F(2) : F(1, 2), lamf = lam.n / lam.d;
      function curve(level, op, dash) {
        var seg = [], cur2 = [];
        for (var k = 0; k <= 720; k++) {
          var th = k * Math.PI / 360, u1 = Math.cos(th), u2 = Math.sin(th), qq = a * u1 * u1 + 2 * b2 * u1 * u2 + d * u2 * u2, ok2 = qq * level > 1e-9;
          var r = ok2 ? Math.sqrt(level / qq) : 99;
          if (r <= 9) cur2.push([r * u1, r * u2]); else { if (cur2.length > 1) seg.push(cur2); cur2 = []; }
        }
        if (cur2.length > 1) seg.push(cur2);
        seg.forEach(function (pl) { var at = { points: pl.map(function (p) { return P.X(p[0]) + ',' + P.Y(p[1]); }).join(' '), fill: 'none', stroke: '#8e5bd0', 'stroke-width': 1.6, opacity: op }; if (dash) at['stroke-dasharray'] = '6 4'; P.layer.appendChild(sv('polyline', at)); });
      }
      if (s >= 1 && Math.abs(qf) > 1e-9) { curve(qf, 0.85, false); if (s === 3) curve(qf * lamf * lamf, 0.6, true); }
      if (cur.ok && s >= 4) {
        var uu = [Pm[0].n, Pm[2].n], w = [Pm[1].n, Pm[3].n];
        for (var kk = -14; kk <= 14; kk++) {
          [[kk * uu[0], kk * uu[1], w[0], w[1]], [kk * w[0], kk * w[1], uu[0], uu[1]]].forEach(function (z) {
            P.layer.appendChild(sv('line', { x1: P.X(z[0] - 14 * z[2]), y1: P.Y(z[1] - 14 * z[3]), x2: P.X(z[0] + 14 * z[2]), y2: P.Y(z[1] + 14 * z[3]), stroke: '#2e9e5b', 'stroke-width': kk === 0 ? 1.2 : 0.6, 'stroke-dasharray': '4 3', opacity: kk === 0 ? 0.7 : 0.35 }));
          });
        }
      }
      arrow(P, 0, 0, 1, 0, 'gr', 'e₁'); arrow(P, 0, 0, 0, 1, 'gr', 'e₂');
      arrow(P, 0, 0, X[0].n, X[1].n, 'down', 'x');
      if (s === 3) { arrow(P, 0, 0, lamf * X[0].n / X[0].d, lamf * X[1].n / X[1].d, 'up', lam.d === 1 ? '2x' : '½x'); arrow(P, 0, 0, -X[0].n / X[0].d, -X[1].n / X[1].d, 'up', '−x'); }
      if (s >= 4 && cur.ok) { arrow(P, 0, 0, Pm[0].n, Pm[2].n, 'w', 'v₁'); arrow(P, 0, 0, Pm[1].n, Pm[3].n, 'w', 'v₂'); }
      var h = '', sym = same(Mm[1], Mm[2]);
      if (s === 0) h = '<b>Forma cuadrática</b> en ℝ²: Q(x) = f(x, x) = <b>xᵗSx</b> con S simétrica (U Def. 6.7-6.8). En el examen te dan Q como <b>polinomio</b> (todos sus términos de grado 2) y debes hallar S. Aquí puedes partir de <b>cualquier</b> matriz M = ' + mt(Mm) + ': Q(x) = xᵗMx = <b>' + poly(Mm[0], cc, Mm[3], 'x₁', 'x₂') + '</b>. Pasos: (1) evaluar Q(x); (2) la matriz simétrica S = ½(M + Mᵗ); (3) homogeneidad Q(λx) = λ²Q(x); (4) cambio de base S′ = PᵗSP.';
      else if (s === 1 && S.every(isz)) h = '<b>1. Q ≡ 0:</b> la parte simétrica de M es la matriz nula (M es antisimétrica), así que <b>todos los vectores dan Q(x) = 0</b>: xᵗMx = 0 para todo x. No hay curva de nivel que dibujar.';
      else if (s === 1) h = '<b>1. Evaluar Q(x).</b> Mx = ' + vt(Mx) + ' y Q(x) = xᵗ(Mx) = ' + fpar(X[0]) + '·' + fpar(Mx[0]) + ' + ' + fpar(X[1]) + '·' + fpar(Mx[1]) + ' = <b>' + ftxt(q) + '</b> (un <b>escalar</b>, no un vector). Con el polinomio ' + poly(Mm[0], cc, Mm[3], 'x₁', 'x₂') + ' en x = ' + vt(X) + ' sale lo mismo. La curva violeta es Q(z) = ' + ftxt(q) + ' (el «nivel» que pasa por x)' + (Math.abs(qf) < 1e-9 ? ': aquí Q(x) = 0 y el nivel 0 son rectas o un punto, no se dibuja' : '') + '.';
      else if (s === 2) h = '<b>2. La matriz de Q es la parte simétrica.</b> S = ½(M + Mᵗ) = <b>' + mt(S) + '</b>' + (sym ? ' (M ya era simétrica)' : '') + ': el coeficiente del término cruzado, ' + ftxt(cc) + ', se <b>reparte a medias</b> (' + ftxt(S[1]) + ' en cada posición), nunca entero en las dos. La parte antisimétrica K = ½(M − Mᵗ) = ' + mt(K) + ' no aporta nada: xᵗKx = 0. Comprobación: xᵗSx = <b>' + ftxt(qS) + '</b> ' + (same(qS, q) ? '= xᵗMx ✓.' : '≠ xᵗMx ✗.') + ' Rango de Q = rango de S = <b>' + rank(S) + '</b> (U Def. 6.9).';
      else if (s === 3) {
        var l2 = mul(lam, lam), ql = mul(l2, q), lt = lam.d === 1 ? '2' : '1/2';
        h = '<b>3. Homogeneidad de grado 2.</b> Q(' + (lam.d === 1 ? '2x' : '½x') + ') = f(' + lt + '·x, ' + lt + '·x) = ' + lt + '·' + lt + '·f(x, x) = <b>' + ftxt(l2) + '·Q(x)</b> = ' + ftxt(l2) + '·' + fpar(q) + ' = <b>' + ftxt(ql) + '</b>, no ' + lt + '·Q(x)' + (lam.d === 1 ? '' : ' (se usa ½x porque 2x se saldría del plano)') + '. Y Q(−x) = (−1)²Q(x) = <b>' + ftxt(q) + '</b>: el signo no cambia.' + (Math.abs(qf) > 1e-9 ? ' La curva violeta continua es Q = ' + ftxt(q) + ' (pasa por x) y la discontinua es Q = ' + ftxt(ql) + ' (pasa por ' + (lam.d === 1 ? '2x' : '½x') + '); ambas son simétricas respecto del origen.' : ' Aquí Q(x) = 0, luego también Q(' + (lam.d === 1 ? '2x' : '½x') + ') = 0 y no se dibujan curvas.') + ' Es la clave de E 6.10 y de X «Q(3v) = 9Q(v)».';
      } else if (!cur.ok) {
        h = '<b>4. Con estas columnas det P = 0:</b> v₁ y v₂ están alineados, no son base y no hay cambio de base. P tiene que ser <b>regular</b>. Cambia P.';
      } else {
        var Sp = mm(tp(Pm), mm(S, Pm)), Pi = inv(Pm), x2 = mv(Pi, X), q3 = dot(x2, mv(Sp, x2)), pp = poly(Sp[0], add(Sp[1], Sp[2]), Sp[3], 'x₁′', 'x₂′');
        h = '<b>4. Cambio de base.</b> Base nueva B′ = {v₁, v₂} = columnas de P = ' + mt(Pm) + ' (rejilla verde), det P = ' + ftxt(cur.dp) + ' ≠ 0. La matriz de Q en B′ es <b>S′ = PᵗSP</b> (¡no P⁻¹SP!) = <b>' + mt(Sp) + '</b>, es decir, Q = <b>' + pp + '</b> en coordenadas de B′. Coordenadas de x en B′: x′ = P⁻¹x = ' + vt(x2) + ' y x′ᵗS′x′ = <b>' + ftxt(q3) + '</b> ' + (same(q3, q) ? '= Q(x) ✓: el valor no depende de la base.' : '≠ Q(x) ✗.') + ' Se conserva el rango (' + rank(Sp) + '), la simetría y el signo del determinante; en general no se conservan det S′ = det S·(det P)² = ' + ftxt(dt(Sp)) + ' (' + (isz(dt(S)) || same(mul(cur.dp, cur.dp), F(1)) ? 'aquí coincide con det S porque ' + (isz(dt(S)) ? 'det S = 0' : '(det P)² = 1') : 'distinto de det S = ' + ftxt(dt(S))) + '), la traza ni los valores propios.' + (isz(Sp[1]) ? ' <i>Aquí S′ es diagonal: Q no tiene término cruzado en B′ (forma canónica, tema 6.3).</i>' : '');
      }
      html(text, h);
      if (s === st.N) { var fin = el('div', 'sar-final'); fin.textContent = cur.ok ? 'Q(x) = ' + ftxt(q) + '  ·  S = ' + mt(S) + '  ·  S′ = PᵗSP = ' + mt(mm(tp(Pm), mm(S, Pm))) : 'Q(x) = ' + ftxt(q) + '  ·  S = ' + mt(S) + '  ·  (P no es regular: no hay cambio de base)'; res.appendChild(fin); }
    }
    var st = stepper(root, 4, render, null, 3600);
    function recalc(jump) { cur = model(); st.go(jump ? st.N : Math.min(st.step, st.N)); }
    im.concat(ip).forEach(function (q) { q.addEventListener('input', function () { recalc(true); }); });
    var tmr = null;
    sl.forEach(function (q) { q.addEventListener('input', function () { cur = model(); clearTimeout(tmr); tmr = setTimeout(function () { st.text.setAttribute('aria-live', 'off'); st.go(st.step); setTimeout(function () { st.text.setAttribute('aria-live', 'polite'); }, 50); }, 200); }); });
    body.appendChild(el('p', 'sar-text an-title', 'Edita una matriz M cualquiera (enteros), la matriz de paso P y el vector x (deslizadores), o elige un caso. Recorre los pasos: Q(x) = xᵗMx, la matriz simétrica de Q, Q(λx) = λ²Q(x) y el cambio de base S′ = PᵗSP.'));
    body.appendChild(eq); body.appendChild(P.svg); body.appendChild(ctrl); body.appendChild(pre);
    root.appendChild(body); st.mount(root, res);
    cur = model(); st.go(0);
    window.addEventListener('beforeprint', function () { st.go(st.N); });
  }


  /* =====================================================================
     LU. FACTORIZACION A = LU Y RESOLUCION DE AX = B (tema 1.4)
     ===================================================================== */
  function buildLU(root) {
    var A0 = parseM(root.getAttribute('data-a') || '2,2,2;4,7,7;6,18,22');
    var n = A0.length;
    var B0 = (root.getAttribute('data-b') || '2,2,1').split(',').map(function (x) { return F(parseInt(x, 10) || 0, 1); });
    var steps = [];
    root.textContent = ''; root.classList.add('sarrus', 'an-lu');
    function ident() { var L = []; for (var i = 0; i < n; i++) { L.push([]); for (var j = 0; j < n; j++) L[i].push(F(i === j ? 1 : 0)); } return L; }
    function buildSteps() {
      steps = [];
      var U = cloneM(A0), L = ident(), known = [], i, j, c;
      for (i = 0; i < n; i++) { known.push([]); for (j = 0; j < n; j++) known[i].push(i <= j); }
      var Y = null, X = null, fail = false;
      function push(txt, hi, op, fin) { steps.push({ U: cloneM(U), L: cloneM(L), kn: known.map(function (r) { return r.slice(); }), Y: Y ? Y.slice() : null, X: X ? X.slice() : null, txt: txt, hi: hi || {}, op: op || '', fin: !!fin }); }
      push('Queremos escribir <b>A = L·U</b>. Partimos de U = A (se irá convirtiendo en triangular superior) y de L = I (los huecos « ? » de debajo de la diagonal se rellenarán con los multiplicadores). Regla: solo reemplazos <b>F<sub>i</sub> → F<sub>i</sub> − m·F<sub>j</sub></b> con j &lt; i, sin normalizar pivotes ni intercambiar filas.');
      for (c = 0; c < n - 1 && !fail; c++) {
        if (isz(U[c][c])) {
          fail = true;
          push('El pivote de la columna ' + (c + 1) + ' es <b>0</b> y para arreglarlo habría que intercambiar filas. Sin intercambios <b>no existe la factorización LU</b> de esta A: hay que usar la LU permutada PA = LU (§9).', { piv: [c, c] }, '', true);
          break;
        }
        for (i = c + 1; i < n; i++) {
          var m = div(U[i][c], U[c][c]);
          if (isz(m)) {
            L[i][c] = F(0); known[i][c] = true;
            push('La posición (' + (i + 1) + ',' + (c + 1) + ') de U ya vale 0: multiplicador <b>m = 0</b>, no hay que operar. Se anota <b>l<sub>' + (i + 1) + (c + 1) + '</sub> = 0</b> en L.', { piv: [c, c], lhi: [i, c] }, '');
            continue;
          }
          var old = U[i][c];
          for (j = 0; j < n; j++) U[i][j] = sub(U[i][j], mul(m, U[c][j]));
          L[i][c] = m; known[i][c] = true;
          var sg = m.n < 0 ? '+ ' + ftxt(neg(m)) : MINUS + ' ' + ftxt(m);
          push('Para anular el <b>' + ftxt(old) + '</b> de la posición (' + (i + 1) + ',' + (c + 1) + ') dividimos entre el pivote: <b>m = ' + ftxt(old) + ' / ' + fpar(U[c][c]) + ' = ' + ftxt(m) + '</b>. Operación en U: <b>F' + (i + 1) + ' → F' + (i + 1) + ' ' + sg + '·F' + (c + 1) + '</b>. Ese mismo m se guarda en L: <b>l<sub>' + (i + 1) + (c + 1) + '</sub> = ' + ftxt(m) + '</b> (en U restamos ' + fpar(m) + '·F' + (c + 1) + ' y en L guardamos ' + ftxt(m) + ': es la operación contraria, la que «deshace» el paso).', { piv: [c, c], zer: [i, c], rows: [i], lhi: [i, c] }, 'F' + (i + 1) + ' → F' + (i + 1) + ' ' + sg + '·F' + (c + 1));
        }
      }
      if (!fail) {
        if (isz(U[n - 1][n - 1])) push('U es triangular superior, pero su último pivote es 0: <b>A es singular</b>. La factorización A = LU existe, pero no se podrá despejar X de forma única.', {}, '');
        else push('<b>U ya es triangular superior</b> y L está completa. Comprobación: multiplicando L·U se recupera A (cada operación hecha sobre las filas queda guardada en L).', { all: true }, '');
        if (B0.length === n && !isz(U[n - 1][n - 1])) {
          Y = []; X = [];
          for (i = 0; i < n; i++) { Y.push(null); X.push(null); }
          push('<b>Resolver AX = B.</b> Como A = LU: AX = B ⇔ L(UX) = B. Llamamos <b>Y = UX</b> y resolvemos en dos pasos triangulares: <b>(1) LY = B</b> de arriba abajo, <b>(2) UX = Y</b> de abajo arriba. B = (' + B0.map(ftxt).join(', ') + ')ᵗ.', {}, '');
          for (i = 0; i < n; i++) {
            var s = B0[i], parts = [];
            for (j = 0; j < i; j++) { s = sub(s, mul(L[i][j], Y[j])); parts.push(fpar(L[i][j]) + '·' + fpar(Y[j])); }
            Y[i] = s;
            push('<b>LY = B, fila ' + (i + 1) + '</b> (progresiva): ' + (i === 0 ? 'la primera fila de L es (1, 0, …, 0), así que y₁ = b₁ = <b>' + ftxt(s) + '</b>.' : 'y<sub>' + (i + 1) + '</sub> = b<sub>' + (i + 1) + '</sub> ' + MINUS + ' (' + parts.join(' + ') + ') = <b>' + ftxt(s) + '</b>.'), { yi: i }, '');
          }
          for (i = n - 1; i >= 0; i--) {
            var t = Y[i], q = [];
            for (j = i + 1; j < n; j++) { t = sub(t, mul(U[i][j], X[j])); q.push(fpar(U[i][j]) + '·' + fpar(X[j])); }
            X[i] = div(t, U[i][i]);
            push('<b>UX = Y, fila ' + (i + 1) + '</b> (retrosustitución, de abajo arriba): ' + (q.length ? 'x<sub>' + (i + 1) + '</sub> = (y<sub>' + (i + 1) + '</sub> ' + MINUS + ' (' + q.join(' + ') + ')) / ' + fpar(U[i][i]) : 'x<sub>' + (i + 1) + '</sub> = y<sub>' + (i + 1) + '</sub> / ' + fpar(U[i][i])) + ' = <b>' + ftxt(X[i]) + '</b>.', { xi: i }, '');
          }
          push('<b>Solución:</b> X = (' + X.map(ftxt).join(', ') + ')ᵗ. Si llega otro B′ con la misma A, <b>no se repite la factorización</b>: solo se rehacen estos dos barridos triangulares.', {}, '', true);
        }
      }
    }
    function mtab(M, kn, hi, kind) {
      var tb = el('table', 'gj-m');
      for (var i = 0; i < n; i++) {
        var tr = el('tr');
        for (var j = 0; j < n; j++) {
          var td = el('td');
          if (kn && !kn[i][j]) { td.textContent = '?'; td.classList.add('dim'); } else html(td, fhtml(M[i][j]));
          if (j === 0) td.classList.add('lb');
          if (j === n - 1) td.classList.add('rb');
          if (kind === 'U') {
            if (hi.piv && hi.piv[0] === i && hi.piv[1] === j) td.classList.add('piv');
            if (hi.zer && hi.zer[0] === i && hi.zer[1] === j) td.classList.add('zer');
            else if (hi.rows && hi.rows.indexOf(i) >= 0) td.classList.add('chg');
          }
          if (kind === 'L' && hi.lhi && hi.lhi[0] === i && hi.lhi[1] === j) td.classList.add('hx');
          if (hi.all && ((kind === 'U' && j >= i) || (kind === 'L' && j <= i))) td.classList.add('inv');
          tr.appendChild(td);
        }
        tb.appendChild(tr);
      }
      return tb;
    }
    function ctab(v, hl) {
      var tb = el('table', 'gj-m');
      v.forEach(function (x, i) {
        var tr = el('tr'), td = el('td');
        if (x) html(td, fhtml(x)); else { td.textContent = '?'; td.classList.add('dim'); }
        td.classList.add('lb', 'rb'); if (hl === i) td.classList.add('hx');
        tr.appendChild(td); tb.appendChild(tr);
      });
      return tb;
    }
    function lab(t) { return el('span', 'lu-sym', t); }
    var wrap = el('div', 'gj-wrap lu-wrap'), wrap2 = el('div', 'gj-wrap lu-wrap');
    var opLine = el('div', 'gj-op');
    var detail = el('details', 'gj-edit');
    detail.appendChild(el('summary', '', '✎ Cambiar A y B'));
    var edGrid = el('div', 'gj-grid'), applyBtn = el('button', 'gj-apply', 'Aplicar'); applyBtn.type = 'button';
    detail.appendChild(edGrid); detail.appendChild(applyBtn);
    var inputs = [];
    edGrid.style.gridTemplateColumns = 'repeat(' + (n + 1) + ',3.2em)';
    for (var ii = 0; ii < n; ii++) for (var jj = 0; jj <= n; jj++) {
      var inp = el('input'); inp.type = 'number'; inp.step = 1; inp.value = jj < n ? A0[ii][jj].n : (B0[ii] ? B0[ii].n : 0);
      inp.setAttribute('aria-label', jj < n ? 'A fila ' + (ii + 1) + ' columna ' + (jj + 1) : 'B fila ' + (ii + 1)); edGrid.appendChild(inp); inputs.push(inp);
    }
    function render(s, text) {
      var S = steps[s];
      wrap.textContent = ''; wrap2.textContent = '';
      var a = el('div', 'lu-blk'); a.appendChild(lab('A')); a.appendChild(mtab(A0, null, {}, 'A'));
      var l = el('div', 'lu-blk'); l.appendChild(lab('L')); l.appendChild(mtab(S.L, S.kn, S.hi, 'L'));
      var u = el('div', 'lu-blk'); u.appendChild(lab('U')); u.appendChild(mtab(S.U, null, S.hi, 'U'));
      wrap.appendChild(a); wrap.appendChild(lab('=')); wrap.appendChild(l); wrap.appendChild(lab('·')); wrap.appendChild(u);
      if (S.Y) {
        var b = el('div', 'lu-blk'); b.appendChild(lab('B')); b.appendChild(ctab(B0));
        var y = el('div', 'lu-blk'); y.appendChild(lab('Y (LY = B)')); y.appendChild(ctab(S.Y, S.hi.yi));
        var x = el('div', 'lu-blk'); x.appendChild(lab('X (UX = Y)')); x.appendChild(ctab(S.X, S.hi.xi));
        wrap2.appendChild(b); wrap2.appendChild(y); wrap2.appendChild(x);
      }
      opLine.textContent = S.op ? 'Operación: ' + S.op : '';
      html(text, S.txt);
    }
    buildSteps();
    var st = stepper(root, steps.length - 1, render, null, 3200);
    root.appendChild(wrap); root.appendChild(wrap2); root.appendChild(opLine);
    st.mount(root); root.appendChild(detail);
    applyBtn.addEventListener('click', function () {
      var k = 0;
      for (var i = 0; i < n; i++) { for (var j = 0; j < n; j++) A0[i][j] = F(parseInt(inputs[k++].value, 10) || 0, 1); B0[i] = F(parseInt(inputs[k++].value, 10) || 0, 1); }
      st.stop(); buildSteps(); st.setN(steps.length - 1); st.go(0);
    });
    st.go(0);
    window.addEventListener('beforeprint', function () { st.go(steps.length - 1); });
  }

  /* =====================================================================
     Base incompleta (.anim-baseinc): completar un sistema libre de R^n con canonicos e_j
     ===================================================================== */
  function buildBaseInc(root) {
    var V0 = parseM(root.getAttribute('data-v') || '1,2,0,1;0,0,1,-1');
    var p = V0.length, n = V0[0].length;
    var steps = [];
    root.textContent = ''; root.classList.add('sarrus', 'an-gauss');
    function vtxt(v) { return '(' + v.map(ftxt).join(', ') + ')'; }
    function canon(j) { var v = []; for (var q = 0; q < n; q++) v.push(F(q === j ? 1 : 0)); return v; }
    function eIdx(v) { for (var q = 0; q < v.length; q++) if (!isz(v[q])) return q; return 0; }
    function buildSteps() {
      steps = [];
      var M = cloneM(V0), r = 0, piv = [], c, i, j, free = [], extra = [];
      function push(txt, hi, op, tag) { steps.push({ M: cloneM(M), ex: extra.slice(), txt: txt, hi: hi || {}, op: op || '', tag: tag || '' }); }
      push('Queremos <b>completar a una base de ℝ<sup>' + n + '</sup></b> el sistema formado por ' + (p === 1 ? 'el vector' : 'los ' + p + ' vectores') + ' de la tabla (cada vector es una <b>fila</b>). Faltan ' + (n - p) + ' vector' + (n - p === 1 ? '' : 'es') + ' si son libres. Primero <b>escalonamos</b> la matriz para ver en qué columnas hay pivote.');
      for (c = 0; c < n && r < p; c++) {
        var k = -1; for (i = r; i < p; i++) if (!isz(M[i][c])) { k = i; break; }
        if (k < 0) continue;
        if (k !== r) { var t = M[r]; M[r] = M[k]; M[k] = t; push('El elemento de la fila ' + (r + 1) + ' en la columna ' + (c + 1) + ' es 0: <b>intercambiamos F' + (r + 1) + ' ↔ F' + (k + 1) + '</b> para tener pivote.', { pivs: piv.concat([[r, c]]) }, 'F' + (r + 1) + ' ↔ F' + (k + 1)); }
        for (i = r + 1; i < p; i++) {
          if (isz(M[i][c])) continue;
          var f = div(M[i][c], M[r][c]), old = M[i][c];
          for (j = 0; j < n; j++) M[i][j] = sub(M[i][j], mul(f, M[r][j]));
          var sg = f.n < 0 ? '+ ' + ftxt(neg(f)) : MINUS + ' ' + ftxt(f);
          push('Anulamos el <b>' + ftxt(old) + '</b> de la columna ' + (c + 1) + ' en la fila ' + (i + 1) + ': <b>F' + (i + 1) + ' → F' + (i + 1) + ' ' + sg + '·F' + (r + 1) + '</b>.', { pivs: piv.concat([[r, c]]), rows: [i], zero: [i, c] }, 'F' + (i + 1) + ' → F' + (i + 1) + ' ' + sg + '·F' + (r + 1));
        }
        piv.push([r, c]); r++;
      }
      var rk = r;
      for (c = 0; c < n; c++) if (!piv.some(function (q) { return q[1] === c; })) free.push(c);
      var pc = piv.map(function (q) { return q[1] + 1; }), fc = free.map(function (q) { return q + 1; });
      var indep = rk === p;
      push('<b>Matriz escalonada.</b> Pivotes (resaltados) en ' + (pc.length === 1 ? 'la columna ' : 'las columnas ') + pc.join(', ') + '; <b>sin pivote</b>: ' + (fc.length === 1 ? 'la columna ' : 'las columnas ') + (fc.length ? fc.join(', ') : '—') + '. ' + (indep
        ? 'Hay ' + rk + ' filas no nulas = ' + p + ' vectores: el sistema es <b>libre</b> (rango ' + rk + '). Quedan ' + (n - rk) + ' columnas sin pivote, justo los ' + (n - p) + ' vectores que faltan.'
        : '<b>Ojo:</b> hay ' + (p - rk) + ' fila' + (p - rk === 1 ? '' : 's') + ' nula' + (p - rk === 1 ? '' : 's') + ', luego los vectores <b>no son libres</b> (rango ' + rk + ' &lt; ' + p + '). El método sigue valiendo con las ' + rk + ' filas no nulas, que sí son una base de lo que generan.'), { pivs: piv, cols: free }, '');
      if (!free.length) { push('No hay columnas sin pivote: ya tenemos ' + n + ' vectores libres, que son <b>base</b> de ℝ<sup>' + n + '</sup>. No hay que añadir nada.', { pivs: piv }, '', 'fin'); return; }
      free.forEach(function (fj, idx) {
        extra.push(fj);
        push('Columna ' + (fj + 1) + ' sin pivote ⇒ añadimos <b>e<sub>' + (fj + 1) + '</sub> = ' + vtxt(canon(fj)) + '</b> (un 1 justo en esa columna). Así la columna ' + (fj + 1) + ' tendrá su pivote' + (idx < free.length - 1 ? '; seguimos con la siguiente sin pivote.' : '.'), { pivs: piv, cols: free }, '');
      });
      var rows = []; for (i = 0; i < n; i++) rows.push(null);
      piv.forEach(function (q) { rows[q[1]] = M[q[0]]; });
      free.forEach(function (fj) { rows[fj] = canon(fj); });
      steps.push({ M: rows, ex: [], full: true, txt: '<b>Reordenamos las filas</b> para que el pivote de cada una caiga en su columna (fila j ↔ columna j). Queda una matriz ' + n + '×' + n + ' <b>escalonada con ' + n + ' pivotes</b> (todos ≠ 0 en la diagonal): rango ' + n + '. Como las operaciones de fila no cambian el rango, también tiene rango ' + n + ' la formada por los vectores <b>de partida</b> y los e<sub>j</sub>.', hi: { diag: true }, op: '', tag: '' });
      var keep = indep ? V0 : M.slice(0, rk);
      var all = keep.concat(free.map(canon));
      var d = jDet(all);
      steps.push({ M: all, ex: [], full: true, tag: 'fin', txt: '<b>Resultado.</b> La base de ℝ<sup>' + n + '</sup> es {' + all.map(vtxt).join(', ') + '}. Comprobación: su determinante vale <b>' + ftxt(d) + ' ≠ 0</b>, así que los ' + n + ' vectores son libres y, por el Teor. 2.6, <b>base</b>. (' + (indep ? 'Los ' + p + ' primeros son los dados' : 'Los primeros ' + rk + ' son las filas no nulas de la escalonada') + ' y los otros ' + free.length + ' son los canónicos añadidos.)', hi: { split: keep.length }, op: '' });
    }
    var tableWrap = el('div', 'gj-wrap'), opLine = el('div', 'gj-op');
    var detail = el('details', 'gj-edit');
    detail.appendChild(el('summary', '', '✎ Cambiar los vectores'));
    var edGrid = el('div', 'gj-grid'), applyBtn = el('button', 'gj-apply', 'Aplicar'); applyBtn.type = 'button';
    detail.appendChild(edGrid); detail.appendChild(applyBtn);
    var inputs = [];
    edGrid.style.gridTemplateColumns = 'repeat(' + n + ',3.2em)';
    for (var ii = 0; ii < p; ii++) for (var jj = 0; jj < n; jj++) {
      var inp = el('input'); inp.type = 'number'; inp.step = 1; inp.value = V0[ii][jj].n; inp.setAttribute('aria-label', 'vector ' + (ii + 1) + ' componente ' + (jj + 1)); edGrid.appendChild(inp); inputs.push(inp);
    }
    function render(s, text) {
      var S = steps[s], hi = S.hi || {}; tableWrap.textContent = '';
      var tb = el('table', 'gj-m'), all = S.M.concat(S.ex.map(canon)), i, j;
      for (i = 0; i < all.length; i++) {
        var tr = el('tr'), isEx = i >= S.M.length;
        var lab = el('th', 'gj-lab');
        if (S.tag === 'fin' && S.full) html(lab, i < (hi.split || 0) ? 'v' + (i + 1) : 'e<sub>' + (eIdx(all[i]) + 1) + '</sub>');
        else if (isEx) html(lab, 'e<sub>' + (S.ex[i - S.M.length] + 1) + '</sub>');
        else html(lab, 'F' + (i + 1));
        tr.appendChild(lab);
        for (j = 0; j < n; j++) {
          var td = el('td'); html(td, fhtml(all[i][j]));
          if (j === 0) td.classList.add('lb');
          if (j === n - 1) td.classList.add('rb');
          if (hi.rows && hi.rows.indexOf(i) >= 0) td.classList.add('chg');
          if (hi.pivs && hi.pivs.some(function (q) { return q[0] === i && q[1] === j; })) td.classList.add('piv');
          if (hi.zero && hi.zero[0] === i && hi.zero[1] === j) td.classList.add('zer');
          if (hi.cols && hi.cols.indexOf(j) >= 0 && !isEx) td.classList.add('colhi');
          if (isEx) td.classList.add('inv');
          if (hi.diag && i === j) td.classList.add('piv');
          if (S.tag === 'fin' && S.full && i >= (hi.split || 0)) td.classList.add('inv');
          tr.appendChild(td);
        }
        tb.appendChild(tr);
      }
      tableWrap.appendChild(tb);
      opLine.textContent = S.op ? 'Operación: ' + S.op : '';
      html(text, S.txt);
    }
    buildSteps();
    var st = stepper(root, steps.length - 1, render, null, 2800);
    root.appendChild(tableWrap); root.appendChild(opLine);
    st.mount(root); root.appendChild(detail);
    applyBtn.addEventListener('click', function () {
      var k = 0; for (var i = 0; i < p; i++) for (var j = 0; j < n; j++) V0[i][j] = F(parseInt(inputs[k++].value, 10) || 0, 1);
      st.stop(); buildSteps(); st.setN(steps.length - 1); st.go(0);
    });
    st.go(0);
    window.addEventListener('beforeprint', function () { st.go(steps.length - 1); });
  }

  /* =====================================================================
     Clasificacion de formas cuadraticas 2x2: Sylvester, valores propios e invariantes (.anim-clasif)
     ===================================================================== */
  function buildClasif(root) {
    var a0 = (root.getAttribute('data-a') || '1,2,1').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var body = el('div', 'an-body');
    var P = plane(body, 340, 340, 5);
    P.svg.setAttribute('aria-label', 'Plano con las zonas donde Q es positiva (azul) y negativa (naranja), las curvas de nivel Q = 1 y Q = −1 y los ejes principales');
    var res = el('div', 'sar-res'), eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
    var inp = a0.map(function (x, k) { var i = numInput(x, 0.5, '3.6em'); i.setAttribute('aria-label', ['a₁₁', 'a₁₂ = a₂₁', 'a₂₂'][k]); return i; });
    er.appendChild(el('span', '', 'A = ( ')); er.appendChild(inp[0]); er.appendChild(inp[1]); er.appendChild(el('span', '', ' ; ')); var ro = el('span', 'an-ro'); ro.setAttribute('aria-hidden', 'true'); er.appendChild(ro); er.appendChild(inp[2]); er.appendChild(el('span', '', ' )   Q = a₁₁x₁² + 2a₁₂x₁x₂ + a₂₂x₂²')); eq.appendChild(er);
    var PRE = [['E 6.18: x₁² + 4x₁x₂ + x₂²', [1, 2, 1]], ['E 6.19: matriz (1 −2; −2 3)', [1, -2, 3]], ['U Ej. 6.26 (DP)', [2, 1.5, 6]], ['U Ej. 6.24 (SP)', [1, -1, 1]], ['Definida negativa', [-1, 0, -2]], ['Semidefinida negativa', [-1, 1, -1]], ['Δ₁ = 0: Sylvester no decide', [0, 1, 1]], ['Q ≡ 0', [0, 0, 0]]];
    var pre = btnRow(PRE.map(function (p) { return p[0]; }), function (i) { PRE[i][1].forEach(function (v, k) { inp[k].value = v; }); recalc(); });
    var nd = function (x) { var v = Math.round(x * 1000) / 1000; if (Math.abs(v) < 1e-9) v = 0; return String(v).replace('-', MINUS).replace('.', ','); };
    var cur = null, EP = 1e-9;
    function model() {
      var a = parseFloat(inp[0].value) || 0, b = parseFloat(inp[1].value) || 0, c = parseFloat(inp[2].value) || 0;
      var tr = a + c, dt = a * c - b * b, ds = Math.sqrt((a - c) * (a - c) + 4 * b * b), l1 = (tr + ds) / 2, l2 = (tr - ds) / 2, tol = 1e-9 * (1 + Math.abs(l1) + Math.abs(l2));
      var sg = [l1, l2].map(function (l) { return Math.abs(l) < tol ? 0 : (l > 0 ? 1 : -1); });
      var p = sg.filter(function (s) { return s > 0; }).length, n = sg.filter(function (s) { return s < 0; }).length, z = 2 - p - n;
      var cls = z === 2 ? 'nula' : (z === 0 ? (p === 2 ? 'definida positiva' : (n === 2 ? 'definida negativa' : 'indefinida')) : (n === 0 ? 'semidefinida positiva' : (p === 0 ? 'semidefinida negativa' : 'indefinida')));
      var v1, v2;
      if (Math.abs(b) > 1e-12) { v1 = [l1 - c, b]; v2 = [l2 - c, b]; } else if (a >= c) { v1 = [1, 0]; v2 = [0, 1]; } else { v1 = [0, 1]; v2 = [1, 0]; }
      var n1 = Math.hypot(v1[0], v1[1]), n2 = Math.hypot(v2[0], v2[1]); v1 = [v1[0] / n1, v1[1] / n1]; v2 = [v2[0] / n2, v2[1] / n2];
      return { a: a, b: b, c: c, tr: tr, dt: dt, l: [l1, l2], sg: sg, p: p, n: n, z: z, cls: cls, v: [v1, v2] };
    }
    function poly(a, b2, c) {
      var out = '';
      [[a, 'x₁²'], [b2, 'x₁x₂'], [c, 'x₂²']].forEach(function (t) { if (Math.abs(t[0]) < 1e-12) return; var ng = t[0] < 0, ab = Math.abs(t[0]); out += (out ? (ng ? ' ' + MINUS + ' ' : ' + ') : (ng ? MINUS : '')) + (Math.abs(ab - 1) < 1e-12 ? '' : nd(ab)) + t[1]; });
      return out || '0';
    }
    function level(m, lev, color) {
      var seg = [], cu = [];
      for (var k = 0; k <= 720; k++) {
        var th = k * Math.PI / 360, u1 = Math.cos(th), u2 = Math.sin(th), q = m.a * u1 * u1 + 2 * m.b * u1 * u2 + m.c * u2 * u2, ok = q * lev > 1e-9, r = ok ? Math.sqrt(lev / q) : 99;
        if (r <= 9) cu.push([r * u1, r * u2]); else { if (cu.length > 1) seg.push(cu); cu = []; }
      }
      if (cu.length > 1) seg.push(cu);
      seg.forEach(function (pl) { P.layer.appendChild(sv('polyline', { points: pl.map(function (p) { return P.X(p[0]) + ',' + P.Y(p[1]); }).join(' '), fill: 'none', stroke: color, 'stroke-width': 2, opacity: 0.95 })); });
    }
    function render(s, text) {
      var m = cur; P.clear(); res.textContent = '';
      ro.textContent = nd(m.b);
      var C = 60, step = 10 / C;
      if (s >= 1) for (var i = 0; i < C; i++) for (var j = 0; j < C; j++) {
        var x = -5 + (i + 0.5) * step, y = -5 + (j + 0.5) * step, q = m.a * x * x + 2 * m.b * x * y + m.c * y * y;
        if (Math.abs(q) < 1e-9) continue;
        P.layer.appendChild(sv('rect', { x: P.X(-5 + i * step), y: P.Y(-5 + (j + 1) * step), width: P.X(-5 + step) - P.X(-5) + 0.5, height: P.Y(-5) - P.Y(-5 + step) + 0.5, fill: q > 0 ? '#2a6fd3' : '#e07b1a', opacity: 0.16 }));
      }
      if (s >= 3) { level(m, 1, '#2a6fd3'); level(m, -1, '#e07b1a'); }
      if (s >= 2 && m.z < 2) {
        [0, 1].forEach(function (k) { if (m.l[k] === undefined) return; var v = m.v[k]; P.layer.appendChild(sv('line', { x1: P.X(-9 * v[0]), y1: P.Y(-9 * v[1]), x2: P.X(9 * v[0]), y2: P.Y(9 * v[1]), stroke: m.sg[k] > 0 ? '#2a6fd3' : (m.sg[k] < 0 ? '#e07b1a' : '#8a93a3'), 'stroke-width': 1.5, 'stroke-dasharray': '6 4' })); });
        [0, 1].forEach(function (k) { arrow(P, 0, 0, 3 * m.v[k][0], 3 * m.v[k][1], 'w', 'u' + (k + 1)); });
      }
      arrow(P, 0, 0, 1, 0, 'gr', 'e₁'); arrow(P, 0, 0, 0, 1, 'gr', 'e₂');
      var h = '', pl = poly(m.a, 2 * m.b, m.c), d1 = m.a, d2 = m.dt, syl, sylc;
      if (d1 > EP && d2 > EP) { syl = 'Δ₁ &gt; 0 y |A| &gt; 0 ⇒ <b>definida positiva</b> (rama «⇔»).'; }
      else if (d1 < -EP && d2 > EP) { syl = 'Δ₁ &lt; 0 y |A| &gt; 0 (signos alternos: − , +) ⇒ <b>definida negativa</b> (rama «⇔»).'; }
      else if (Math.abs(d2) < EP && d1 > EP) { syl = '|A| = 0 y Δ₁ &gt; 0 ⇒ <b>semidefinida positiva</b> (rama «⇒»).'; }
      else if (Math.abs(d2) < EP && d1 < -EP) { syl = '|A| = 0 y Δ₁ &lt; 0 ⇒ <b>semidefinida negativa</b> (rama «⇒»).'; }
      else if (d2 < -EP) { syl = '|A| &lt; 0: <b>no encaja en ninguna rama</b> de U («en otros casos se usan los valores propios»). En 2×2 se sabe además que |A| = λ₁λ₂ &lt; 0 ⇒ signos opuestos ⇒ indefinida.'; }
      else { syl = 'Δ₁ = 0 con |A| = 0: <b>Sylvester no decide</b> (p. ej. diag(0, 1) y diag(0, −1) tienen Δ₁ = 0 = |A| y son una SP y otra SN). Hay que usar valores propios.'; }
      if (s === 0) h = '<b>Forma cuadrática</b> Q = <b>' + pl + '</b> con matriz simétrica A = (' + nd(m.a) + ' ' + nd(m.b) + ' ; ' + nd(m.b) + ' ' + nd(m.c) + ') (el cruzado se parte a medias). Clasificar Q es decidir el <b>signo de Q(x) para x ≠ 0</b>. Tres herramientas, que deben coincidir: (1) <b>Sylvester</b> (menores), (2) <b>valores propios</b>, (3) <b>invariantes</b> (rango y signatura).';
      else if (s === 1) h = '<b>1. Sylvester.</b> Δ₁ = a₁₁ = ' + nd(d1) + '; Δ₂ = |A| = ' + nd(m.a) + '·' + nd(m.c) + ' ' + MINUS + ' ' + nd(m.b) + '² = ' + nd(d2) + '. ' + syl + ' El dibujo sombrea en azul donde Q &gt; 0 y en naranja donde Q &lt; 0 (en blanco, Q = 0).';
      else if (s === 2) h = '<b>2. Valores propios.</b> |A − λI| = λ² ' + MINUS + ' ' + nd(m.tr) + 'λ + ' + nd(m.dt) + ' = 0 ⇒ λ = (' + nd(m.tr) + ' ± √' + nd((m.a - m.c) * (m.a - m.c) + 4 * m.b * m.b) + ') / 2 ⇒ <b>λ₁ = ' + nd(m.l[0]) + ', λ₂ = ' + nd(m.l[1]) + '</b> (siempre reales: A es simétrica). Control: λ₁ + λ₂ = ' + nd(m.l[0] + m.l[1]) + ' = traza y λ₁λ₂ = ' + nd(m.l[0] * m.l[1]) + ' = |A|. Signos: ' + (m.p ? m.p + ' positivo' + (m.p > 1 ? 's' : '') : 'ningún positivo') + ', ' + (m.n ? m.n + ' negativo' + (m.n > 1 ? 's' : '') : 'ningún negativo') + ', ' + m.z + ' nulo' + (m.z === 1 ? '' : 's') + ' ⇒ <b>' + m.cls + '</b>. Las rectas discontinuas son los ejes principales (vectores propios u₁ = (' + nd(m.v[0][0]) + '; ' + nd(m.v[0][1]) + ') y u₂ = (' + nd(m.v[1][0]) + '; ' + nd(m.v[1][1]) + ')), perpendiculares.';
      else if (s === 3) {
        var can = nd(m.l[0]) + '·y₁² + ' + nd(m.l[1]) + '·y₂²'; can = can.replace('+ ' + MINUS, MINUS + ' ');
        h = '<b>3. Forma canónica e invariantes.</b> En la base ortonormal {u₁, u₂}: Q = <b>' + can + '</b>. <b>Signatura</b> sig(Q) = nº de coeficientes positivos = <b>' + m.p + '</b>; <b>rango</b> = nº de no nulos = <b>' + (m.p + m.n) + '</b>; n = 2. Cuadro de U: ' + (m.cls === 'definida positiva' ? 'rg = sig = n ⇒ DP' : m.cls === 'definida negativa' ? 'rg = n y sig = 0 ⇒ DN' : m.cls === 'semidefinida positiva' ? 'rg = sig &lt; n ⇒ SP' : m.cls === 'semidefinida negativa' ? 'rg &lt; n y sig = 0 ⇒ SN' : m.cls === 'indefinida' ? 'rg ≠ sig y sig ≠ 0 ⇒ indefinida' : 'Q es la forma nula') + '. Las curvas Q = 1 (azul) y Q = −1 (naranja) son ' + (m.p === 2 ? 'una elipse (y Q = −1 vacía)' : m.n === 2 ? 'una elipse (Q = −1; Q = 1 vacía)' : (m.p === 1 && m.n === 1) ? 'dos hipérbolas conjugadas' : (m.z === 1 && m.p === 1) ? 'dos rectas paralelas (Q = 1; Q = −1 vacía)' : (m.z === 1 && m.n === 1) ? 'dos rectas paralelas (Q = −1; Q = 1 vacía)' : 'vacías') + '.';
      } else {
        var pos = null, ng = null, zr = null, cand = [[1, 0], [0, 1], [1, 1], [1, -1], [2, 1], [1, 2], [2, -1], [1, -2]].concat([m.v[0], m.v[1]].map(function (v) { return [Math.round(v[0] * 1000) / 1000, Math.round(v[1] * 1000) / 1000]; }));
        cand.forEach(function (v) { var q = m.a * v[0] * v[0] + 2 * m.b * v[0] * v[1] + m.c * v[1] * v[1]; if (q > 1e-6 && !pos) pos = [v, q]; if (q < -1e-6 && !ng) ng = [v, q]; if (Math.abs(q) < 1e-6 && !zr && (v[0] || v[1])) zr = [v, q]; });
        function tv(t) { return t ? 'Q(' + nd(t[0][0]) + '; ' + nd(t[0][1]) + ') = ' + nd(t[1]) : null; }
        var zv = m.z === 1 ? m.v[m.sg[0] === 0 ? 0 : 1] : null;
        h = '<b>4. Testigos (comprobación con la definición).</b> ' + (pos ? tv(pos) + ' &gt; 0' : 'Ningún vector probado da Q &gt; 0') + '; ' + (ng ? tv(ng) + ' &lt; 0' : 'ninguno da Q &lt; 0') + (zv ? '; y en el vector propio del valor 0, u = (' + nd(zv[0]) + '; ' + nd(zv[1]) + '), Q(u) = 0 con u ≠ 0' : '') + '. ' + (m.cls === 'indefinida' ? 'Hay vectores de ambos signos: <b>indefinida</b> (Def. 6.12).' : m.cls === 'definida positiva' ? 'Q &gt; 0 en todo x ≠ 0: la forma canónica es suma de cuadrados con coeficientes positivos.' : m.cls === 'definida negativa' ? 'Q &lt; 0 en todo x ≠ 0.' : m.cls === 'semidefinida positiva' ? 'Q ≥ 0 en todas partes y se anula en un vector no nulo: <b>semidefinida positiva</b>.' : m.cls === 'semidefinida negativa' ? 'Q ≤ 0 en todas partes y se anula en un vector no nulo: <b>semidefinida negativa</b>.' : 'Q es nula.') + ' <b>Veredicto: ' + m.cls + '</b>, por las tres vías.';
      }
      html(text, h);
      if (s === st.N) { var fin = el('div', 'sar-final'); fin.textContent = 'Q ' + m.cls + '  ·  λ = ' + nd(m.l[0]) + ', ' + nd(m.l[1]) + '  ·  sig = ' + m.p + ', rango = ' + (m.p + m.n); res.appendChild(fin); }
    }
    var st = stepper(root, 4, render, null, 3800);
    function recalc() { cur = model(); st.go(st.N); }
    inp.forEach(function (q) { q.addEventListener('input', function () { cur = model(); st.go(st.step); }); });
    body.appendChild(el('p', 'sar-text an-title', 'Escribe a₁₁, a₁₂ y a₂₂ (la matriz es simétrica) o elige un caso, y recorre los pasos: Sylvester, valores propios, forma canónica con invariantes y vectores testigo.'));
    body.appendChild(eq); body.appendChild(P.svg); body.appendChild(pre);
    root.appendChild(body); st.mount(root, res);
    cur = model(); st.go(0);
    window.addEventListener('beforeprint', function () { st.go(st.N); });
  }


  /* =====================================================================
     Conicas: clasificacion por invariantes y ecuacion reducida (.anim-conica)
     ===================================================================== */
  /*CONICA-MODEL*/
  function cnQ(x) {                                   // fraccion p/q (q <= 120), a√n/q o decimal aproximado
    if (Math.abs(x) < 1e-10) return '0';
    var q, n, ng = x < 0 ? MINUS : '', ax = Math.abs(x);
    for (q = 1; q <= 120; q++) { n = Math.round(ax * q); if (Math.abs(ax * q - n) < 1e-9 * q) return ng + n + (q > 1 ? '/' + q : ''); }
    for (q = 1; q <= 60; q++) {
      var N = Math.round(ax * q * ax * q);
      if (N > 0 && N <= 4000 && Math.abs(ax * q * ax * q - N) < 1e-8) {
        var a = 1, r = N, f;
        for (f = 2; f * f <= r; f++) while (r % (f * f) === 0) { r /= f * f; a *= f; }
        var g = gcd(a, q); a /= g; var qq = q / g;
        return ng + (a > 1 ? a : '') + '√' + r + (qq > 1 ? '/' + qq : '');
      }
    }
    var SQF = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30, 33, 34, 35], ii, kk, dd, nn, aa, ee;
    for (ii = 0; ii < SQF.length; ii++) for (dd = 1; dd <= 12; dd++) for (kk = -60; kk <= 60; kk++) {
      if (!kk) continue;
      aa = x - kk * Math.sqrt(SQF[ii]) / dd;
      for (ee = 1; ee <= 12; ee++) { nn = Math.round(aa * ee); if (nn !== 0 && Math.abs(aa * ee - nn) < 1e-9) {
        var ga = gcd(Math.abs(nn), ee), an = nn / ga, ae = ee / ga, ak = Math.abs(kk), gk = gcd(ak, dd), kn = ak / gk, kd = dd / gk;
        return (an < 0 ? MINUS : '') + Math.abs(an) + (ae > 1 ? '/' + ae : '') + (kk < 0 ? ' ' + MINUS + ' ' : ' + ') + (kn > 1 ? kn : '') + '√' + SQF[ii] + (kd > 1 ? '/' + kd : '');
      } }
    }
    return '≈' + (Math.round(x * 1000) / 1000).toString().replace('-', MINUS).replace('.', ',');
  }
  function cnDet3(B) { return B[0][0] * (B[1][1] * B[2][2] - B[1][2] * B[2][1]) - B[0][1] * (B[1][0] * B[2][2] - B[1][2] * B[2][0]) + B[0][2] * (B[1][0] * B[2][1] - B[1][1] * B[2][0]); }
  function cnRank(B) {
    var i, j, k, l;
    if (cnDet3(B) !== 0) return 3;
    for (i = 0; i < 3; i++) for (k = i + 1; k < 3; k++) for (j = 0; j < 3; j++) for (l = j + 1; l < 3; l++) if (B[i][j] * B[k][l] - B[i][l] * B[k][j] !== 0) return 2;
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) if (B[i][j] !== 0) return 1;
    return 0;
  }
  /* p = [p11, p12, p22, p1, p2, p0]: p11 x1^2 + p12 x1x2 + p22 x2^2 + p1 x1 + p2 x2 + p0 = 0   (p12 = 2a12, p1 = 2a01, p2 = 2a02) */
  function conicModel(p) {
    var p11 = p[0], p12 = p[1], p22 = p[2], p1 = p[3], p2 = p[4], p0 = p[5];
    var m = { p: p, quad: !!(p11 || p12 || p22) };
    var B = [[2 * p0, p1, p2], [p1, 2 * p11, p12], [p2, p12, 2 * p22]];     // B = 2A: entera
    m.det = cnDet3(B) / 8; m.A00 = (4 * p11 * p22 - p12 * p12) / 4; m.tr = p11 + p22;
    m.A11 = p0 * p22 - p2 * p2 / 4; m.A22 = p0 * p11 - p1 * p1 / 4; m.As = m.A11 + m.A22;
    m.rank = cnRank(B);
    if (!m.quad) { m.kind = 'noconica'; return m; }
    var k;
    if (m.rank === 3) { if (m.A00 > 0) k = (m.tr * m.det < 0) ? ((p12 === 0 && p11 === p22) ? 'circunferencia' : 'elipse') : 'elipseImag'; else if (m.A00 < 0) k = 'hiperbola'; else k = 'parabola'; }
    else if (m.rank === 2) { if (m.A00 < 0) k = 'secantes'; else if (m.A00 > 0) k = 'punto'; else k = m.As < 0 ? 'paralelas' : (m.As > 0 ? 'paralelasImag' : 'paralelasX'); }
    else k = 'doble';
    m.kind = k;
    /* --- paso 1: giro --- */
    var l1, l2, u1, u2, rot = p12 !== 0, n;
    if (rot) {
      var h = Math.sqrt((p11 - p22) * (p11 - p22) / 4 + p12 * p12 / 4), c = m.tr / 2;
      l1 = c + h; l2 = c - h;
      if (m.A00 === 0) { if (m.tr > 0) l2 = 0; else l1 = 0; }
      u1 = [p12 / 2, l1 - p11]; n = Math.hypot(u1[0], u1[1]); u1 = [u1[0] / n, u1[1] / n];
      if (u1[0] < -1e-12 || (Math.abs(u1[0]) <= 1e-12 && u1[1] < 0)) u1 = [-u1[0], -u1[1]];
      u2 = [-u1[1], u1[0]];
    } else { l1 = p11; l2 = p22; u1 = [1, 0]; u2 = [0, 1]; }
    m.rot = rot; m.l = [l1, l2]; m.u = [u1, u2]; m.theta = Math.atan2(u1[1], u1[0]) * 180 / Math.PI;
    var b = [p1 * u1[0] + p2 * u1[1], p1 * u2[0] + p2 * u2[1]]; m.b = b;
    var toX = function (y1, y2) { return [u1[0] * y1 + u2[0] * y2, u1[1] * y1 + u2[1] * y2]; };
    m.toX = toX;
    /* --- paso 2: traslacion --- */
    var l = [l1, l2], yo, d, j, kk, e;
    m.pts = []; m.lines = []; m.curves = null;
    if (m.A00 !== 0) {
      yo = [-b[0] / (2 * l1), -b[1] / (2 * l2)]; d = p0 - b[0] * b[0] / (4 * l1) - b[1] * b[1] / (4 * l2); m.d = d; m.center = true;
    } else {
      j = l1 === 0 ? 0 : 1; kk = 1 - j; m.j = j; m.k = kk;
      var yk0 = -b[kk] / (2 * l[kk]); e = p0 - b[kk] * b[kk] / (4 * l[kk]); m.e = e;
      yo = [0, 0]; yo[kk] = yk0;
      if (k === 'parabola') { yo[j] = -e / b[j]; m.twoP = -b[j] / l[kk]; }
      m.center = false;
    }
    m.yo = yo; m.O = toX(yo[0], yo[1]);
    var zx = function (z1, z2) { return toX(yo[0] + z1, yo[1] + z2); };
    var O = m.O, add2 = function (P0, v, s) { return [P0[0] + s * v[0], P0[1] + s * v[1]]; };
    var A2, B2, A, Bq, c2, t, o;
    if (k === 'elipse' || k === 'circunferencia' || k === 'elipseImag') {
      A2 = -d / l1; B2 = -d / l2; m.A2 = A2; m.B2 = B2;
      if (k !== 'elipseImag') {
        A = Math.sqrt(A2); Bq = Math.sqrt(B2); m.A = A; m.B = Bq;
        c2 = Math.abs(A2 - B2); m.c = Math.sqrt(c2); m.maj = A >= Bq ? 0 : 1;
        m.pts.push({ n: 'C', p: O });
        m.pts.push({ n: 'V', p: add2(O, u1, A) }, { n: 'V', p: add2(O, u1, -A) }, { n: 'V', p: add2(O, u2, Bq) }, { n: 'V', p: add2(O, u2, -Bq) });
        if (m.c > 1e-9) { var um = m.maj === 0 ? u1 : u2; m.pts.push({ n: 'F', p: add2(O, um, m.c) }, { n: 'F', p: add2(O, um, -m.c) }); }
        m.curves = function () { var cu = [], q; for (q = 0; q <= 240; q++) { var th = q * Math.PI / 120; cu.push(zx(A * Math.cos(th), Bq * Math.sin(th))); } return [cu]; };
      }
    } else if (k === 'hiperbola') {
      t = (-d / l1 > 0) ? 0 : 1; o = 1 - t; m.t = t; m.o = o;
      A2 = -d / l[t]; B2 = d / l[o]; A = Math.sqrt(A2); Bq = Math.sqrt(B2); m.A2 = A2; m.B2 = B2; m.A = A; m.B = Bq; m.c = Math.sqrt(A2 + B2);
      var ut = m.u[t], uo = m.u[o];
      m.pts.push({ n: 'C', p: O }, { n: 'V', p: add2(O, ut, A) }, { n: 'V', p: add2(O, ut, -A) }, { n: 'F', p: add2(O, ut, m.c) }, { n: 'F', p: add2(O, ut, -m.c) });
      m.lines.push({ a: O, d: add2(ut, uo, Bq / A), s: 'as' }, { a: O, d: add2(ut, uo, -Bq / A), s: 'as' });
      m.curves = function (R) {
        var U = Math.min(8, Math.acosh(1 + 3 * R / Math.min(A, Bq))), out = [], sg, q;
        for (sg = -1; sg <= 1; sg += 2) { var cu = []; for (q = -60; q <= 60; q++) { var uu = U * q / 60, zt = sg * A * Math.cosh(uu), zo = Bq * Math.sinh(uu), z = [0, 0]; z[t] = zt; z[o] = zo; cu.push(zx(z[0], z[1])); } out.push(cu); }
        return out;
      };
    } else if (k === 'parabola') {
      var twoP = m.twoP, pp = twoP / 2, uj = m.u[j], uk = m.u[kk];
      m.p_ = pp; m.pts.push({ n: 'V', p: O }, { n: 'F', p: add2(O, uj, pp / 2) });
      m.lines.push({ a: add2(O, uj, -pp / 2), d: uk, s: 'dir' }, { a: O, d: uj, s: 'axis' });
      m.curves = function (R) {
        var S = Math.min(80, Math.max(3 * R, Math.sqrt(6 * R * Math.abs(pp)))), cu = [], q;
        for (q = -80; q <= 80; q++) { var s = S * q / 80, z = [0, 0]; z[kk] = s; z[j] = s * s / twoP; cu.push(zx(z[0], z[1])); }
        return [cu];
      };
    } else if (k === 'secantes') {
      var mm = Math.sqrt(-l1 / l2); m.mm = mm;
      m.pts.push({ n: 'C', p: O }); m.lines.push({ a: O, d: add2(u1, u2, mm), s: 'ln' }, { a: O, d: add2(u1, u2, -mm), s: 'ln' });
    } else if (k === 'punto') { m.pts.push({ n: 'C', p: O }); }
    else if (k === 'paralelas' || k === 'paralelasImag' || k === 'doble' || k === 'paralelasX') {
      var s2 = -e / l[kk]; m.s2 = s2; var s = k === 'paralelas' ? Math.sqrt(s2) : 0; m.s = s; var uj2 = m.u[j], uk2 = m.u[kk];
      if (k === 'paralelas') { m.lines.push({ a: add2(O, uk2, s), d: uj2, s: 'ln' }, { a: add2(O, uk2, -s), d: uj2, s: 'ln' }); }
      else if (k === 'doble') { m.lines.push({ a: O, d: uj2, s: 'ln' }); }
      m.pts.push({ n: 'C', p: O });
    }
    return m;
  }
  /*FIN-CONICA-MODEL*/
  var CN_NOM = { circunferencia: 'circunferencia', elipse: 'elipse real', elipseImag: 'elipse imaginaria (sin puntos reales)', hiperbola: 'hipérbola', parabola: 'parábola', secantes: 'dos rectas secantes reales', punto: 'rectas secantes imaginarias: un único punto real', paralelas: 'dos rectas paralelas reales', paralelasImag: 'dos rectas paralelas imaginarias (sin puntos reales)', doble: 'recta doble', paralelasX: 'rectas paralelas (caso A₁₁ + A₂₂ = 0, imposible)', noconica: 'no es una cónica' };
  function buildConica(root) {
    var a0 = (root.getAttribute('data-a') || '1,0,4,-4,-16,19').split(',').map(Number);
    root.textContent = ''; root.classList.add('sarrus');
    var body = el('div', 'an-body');
    var res = el('div', 'sar-res'), eq = el('div', 'an-eqs'), er = el('div', 'an-eq down');
    var NAMES = ['a₁₁', '2a₁₂', 'a₂₂', '2a₀₁', '2a₀₂', 'a₀₀'];
    var inp = a0.map(function (x, k) { var i = numInput(x, 1, '3.4em'); i.setAttribute('aria-label', 'coeficiente ' + NAMES[k]); return i; });
    var TX = ['x₁² + ', 'x₁x₂ + ', 'x₂² + ', 'x₁ + ', 'x₂ + ', ' = 0'];
    inp.forEach(function (i, k) { er.appendChild(i); er.appendChild(el('span', '', TX[k])); });
    eq.appendChild(er);
    var PRE = [['E 6.28 (elipse)', [1, 0, 4, -4, -16, 19]], ['E 6.27 B (parábola)', [1, 2, 1, 0, -4, -1]], ['E 6.32 con a=2, b=−1', [2, -2, 2, 0, 0, -2]], ['Feb. 2018 B', [5, -3, 1, -3, 2, -5]], ['Sept. 2017 A1', [1, 2, 1, 1, -2, 1]], ['U Ej. 6.31 (secantes)', [1, -6, -7, 10, 2, 9]], ['P2 hipérbola con giro', [1, 4, 1, -6, -6, 3]], ['P3 parábola con giro', [1, 2, 1, -8, 8, 0]], ['Secantes reales', [1, 0, -4, -2, 0, 1]], ['Un punto', [1, 0, 1, -2, 0, 1]], ['Paralelas reales', [1, 2, 1, 2, 2, 0]], ['Paralelas imaginarias', [1, 2, 1, 2, 2, 2]], ['Recta doble', [1, 2, 1, 2, 2, 1]], ['Feb. 2019 A, α = 1', [1, 2, 1, 0, 2, 1]], ['Feb. 2019 A, α = 0', [1, 2, 1, 0, 0, 1]], ['P5: k = 2', [2, 0, 1, 2, 0, 1]], ['P5: k = 1', [1, 0, 1, 2, 0, 1]], ['P5: k = ½ (×2)', [1, 0, 2, 4, 0, 2]], ['P5: k = 0', [0, 0, 1, 2, 0, 1]], ['P5: k = −1', [-1, 0, 1, 2, 0, 1]], ['Circunferencia', [1, 0, 1, -2, -4, 1]]];
    var pre = btnRow(PRE.map(function (q) { return q[0]; }), function (i) { PRE[i][1].forEach(function (v, k) { inp[k].value = v; }); recalc(); });
    var P = null, cur = null, Q = cnQ;
    var bad = false;
    function readP() { bad = false; return inp.map(function (i) { var v = parseFloat(i.value) || 0; if (Math.abs(v - Math.round(v)) > 1e-9) bad = true; return Math.round(v); }); }
    function poly(terms) {
      var out = '';
      terms.forEach(function (t) {
        var c = t[0]; if (Math.abs(c) < 1e-10) return;
        var ng = c < 0, s = Q(Math.abs(c)), v = t[1];
        if (v) { if (s === '1') s = ''; else if (/[ ]/.test(s)) s = '(' + s + ')'; else if (/[\/√≈]/.test(s)) s += '·'; }
        out += (out ? (ng ? ' ' + MINUS + ' ' : ' + ') : (ng ? MINUS : '')) + s + v;
      });
      return out || '0';
    }
    function pol0(q) { return poly([[q[0], 'x₁²'], [q[1], 'x₁x₂'], [q[2], 'x₂²'], [q[3], 'x₁'], [q[4], 'x₂'], [q[5], '']]); }
    function qd(x) { var t = Q(x); return /[\/√≈ ]/.test(t) ? '(' + t + ')' : t; }
    function dec(x) { return (Math.round(x * 1000) / 1000).toString().replace('-', MINUS).replace('.', ','); }
    function pt(p) { var a = Q(p[0]), b = Q(p[1]); if (a.charAt(0) === '≈' || b.charAt(0) === '≈') return '(≈' + dec(p[0]) + '; ≈' + dec(p[1]) + ')'; return '(' + a + '; ' + b + ')'; }
    function vec(u) { return '(' + Q(u[0]) + '; ' + Q(u[1]) + ')'; }
    function shift(name, y0) { return Math.abs(y0) < 1e-10 ? name : (y0 > 0 ? name + ' ' + MINUS + ' ' + Q(y0) : name + ' + ' + Q(-y0)); }
    function ext(m) {
      var mx = 1; (m.pts || []).forEach(function (q) { mx = Math.max(mx, Math.abs(q.p[0]), Math.abs(q.p[1])); });
      (m.lines || []).forEach(function (L) { mx = Math.max(mx, Math.abs(L.a[0]), Math.abs(L.a[1])); });
      return Math.max(4, Math.min(12, Math.ceil(mx * 1.3 + 0.5)));
    }
    function newPlane(R) { var q = plane(body, 340, 340, R); q.svg.setAttribute('aria-label', 'Plano con la cónica en azul, los ejes nuevos tras el giro y la traslación y sus puntos notables'); return q; }
    function ln(x1, y1, x2, y2, col, w, dash) { var a = { x1: P.X(x1), y1: P.Y(y1), x2: P.X(x2), y2: P.Y(y2), stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }; if (dash) a['stroke-dasharray'] = dash; P.layer.appendChild(sv('line', a)); }
    function line2(a, d, L, col, w, dash) { var n = Math.hypot(d[0], d[1]) || 1; ln(a[0] - L * d[0] / n, a[1] - L * d[1] / n, a[0] + L * d[0] / n, a[1] + L * d[1] / n, col, w, dash); }
    function dot(p, col, r, lab) {
      P.layer.appendChild(sv('circle', { cx: P.X(p[0]), cy: P.Y(p[1]), r: r, fill: col, stroke: 'var(--bg)', 'stroke-width': 1 }));
      if (lab) { var t = sv('text', { x: P.X(p[0]) + 7, y: P.Y(p[1]) - 7 }); t.textContent = lab; t.setAttribute('style', 'fill:' + col + ';font:italic 700 13px var(--serif)'); P.layer.appendChild(t); }
    }
    var BLUE = '#2a6fd3', ORA = '#e07b1a', GRN = '#2e9e5b', RED = '#c0392b';
    var pre2 = el('div'); pre2.style.display = 'none';
    function render(s, text) {
      var m = cur, R = ext(m), h = '', wn = bad ? '<b>Aviso: solo enteros.</b> Se han redondeado los coeficientes no enteros; para una ecuación con fracciones, multiplícala por el denominador (como en P5, k = ½ → ×2). ' : '';
      if (!P || P.R !== R) { if (P && P.svg.parentNode) P.svg.parentNode.removeChild(P.svg); P = newPlane(R); body.insertBefore(P.svg, pre2); }
      P.clear(); res.textContent = '';
      var p = m.p, pl = pol0(p);
      if (m.kind === 'noconica') {
        html(text, '<b>Esto no es una cónica.</b> U Def. 6.16 exige que alguno de a₁₁, a₁₂, a₂₂ sea no nulo (para que la ecuación sea de segundo grado). Aquí los tres son 0: la ecuación es de primer grado o constante (' + pl + ' = 0). Cambia algún coeficiente de x₁², x₁x₂ o x₂².'); text.innerHTML = wn + text.innerHTML; return;
      }
      /* ---- dibujo ---- */
      if (m.curves) m.curves(R).forEach(function (cu) { P.layer.appendChild(sv('polyline', { points: cu.map(function (q) { return P.X(q[0]) + ',' + P.Y(q[1]); }).join(' '), fill: 'none', stroke: BLUE, 'stroke-width': 2.6, 'stroke-linejoin': 'round' })); });
      m.lines.forEach(function (L) { if (L.s === 'ln') line2(L.a, L.d, 4 * R, BLUE, 2.6); });
      if (m.kind === 'punto') dot(m.O, BLUE, 5);
      if (s === 2 && m.rot) [0, 1].forEach(function (i) { line2([0, 0], m.u[i], 4 * R, GRN, 1.6, '6 4'); arrow(P, 0, 0, 2.2 * m.u[i][0], 2.2 * m.u[i][1], 'w', ['x₁′', 'x₂′'][i]); });
      if (s >= 3) {
        [0, 1].forEach(function (i) { line2(m.O, m.u[i], 4 * R, ORA, 1.6, '6 4'); arrow(P, m.O[0], m.O[1], m.O[0] + 2 * m.u[i][0], m.O[1] + 2 * m.u[i][1], 'up', ['x₁″', 'x₂″'][i]); });
        dot(m.O, ORA, 4.5);
      }
      if (s >= 4) {
        m.lines.forEach(function (L) { if (L.s === 'as') line2(L.a, L.d, 4 * R, 'var(--mut)', 1.4, '3 4'); else if (L.s === 'dir') line2(L.a, L.d, 4 * R, RED, 1.8, '7 4'); else if (L.s === 'axis') line2(L.a, L.d, 4 * R, ORA, 1.2, '2 4'); });
        m.pts.forEach(function (q) { if (q.n === 'F') dot(q.p, RED, 4.5, 'F'); else if (q.n === 'V') dot(q.p, BLUE, 4, ''); });
      }
      /* ---- texto ---- */
      var a11 = p[0], a12 = p[1] / 2, a22 = p[2], a01 = p[3] / 2, a02 = p[4] / 2, a00 = p[5];
      var matA = '(' + [[a00, a01, a02], [a01, a11, a12], [a02, a12, a22]].map(function (r) { return r.map(Q).join('  '); }).join(' ; ') + ')';
      var invs = '|A| = ' + Q(m.det) + ',  a₁₁ + a₂₂ = ' + Q(m.tr) + ',  A₀₀ = a₁₁a₂₂ ' + MINUS + ' a₁₂² = ' + Q(m.A00);
      var kn = CN_NOM[m.kind], pr = m.rot ? '′' : '';
      var nm2 = function (i) { return ['x₁″', 'x₂″'][i]; }, xs = function (i) { return ['x₁', 'x₂'][i]; };
      var vs = function () { return m.pts.filter(function (q) { return q.n === 'V'; }).map(function (q) { return pt(q.p); }).join(', '); };
      var fs = function () { return m.pts.filter(function (q) { return q.n === 'F'; }).map(function (q) { return pt(q.p); }).join(', '); };
      if (s === 0) {
        h = '<b>Ecuación general</b> (U Def. 6.16): a₁₁x₁² + 2a₁₂x₁x₂ + a₂₂x₂² + 2a₀₁x₁ + 2a₀₂x₂ + a₀₀ = 0. Aquí <b>' + pl + ' = 0</b>, luego a₁₁ = ' + Q(a11) + ', a₁₂ = ' + Q(a12) + ', a₂₂ = ' + Q(a22) + ', a₀₁ = ' + Q(a01) + ', a₀₂ = ' + Q(a02) + ', a₀₀ = ' + Q(a00) + ' (los coeficientes de x₁x₂, x₁ y x₂ son el <b>doble</b> de a₁₂, a₀₁, a₀₂). <b>Matriz asociada</b> (Def. 6.17, con a₀₀ arriba a la izquierda): A = ' + matA + '. <b>Invariantes</b> (Def. 6.19): ' + invs + '; rang A = ' + m.rank + '. La curva azul son los puntos (x₁, x₂) que cumplen la ecuación.' + (m.curves || m.lines.length || m.kind === 'punto' ? '' : ' <i>(Esta ecuación no tiene ningún punto real: no hay nada que dibujar.)</i>');
      } else if (s === 1) {
        var why;
        if (m.rank === 3) {
          why = '|A| = ' + Q(m.det) + ' ≠ 0 ⇒ rang A = 3 ⇒ <b>no degenerada</b>. ' + (m.A00 > 0 ? 'A₀₀ = ' + Q(m.A00) + ' &gt; 0 ⇒ cónica con centro, de tipo <b>elipse</b>; que sea real o imaginaria lo decide el signo de (a₁₁ + a₂₂)·|A| = ' + Q(m.tr) + '·(' + Q(m.det) + ') = ' + Q(m.tr * m.det) + (m.tr * m.det < 0 ? ' &lt; 0 ⇒ <b>elipse real</b>' + (m.kind === 'circunferencia' ? ' (a₁₁ = a₂₂ y a₁₂ = 0: de hecho una <b>circunferencia</b>)' : '') + '.' : ' &gt; 0 ⇒ <b>elipse imaginaria</b> (ningún punto real).') : m.A00 < 0 ? 'A₀₀ = ' + Q(m.A00) + ' &lt; 0 ⇒ <b>hipérbola</b>' + (m.tr === 0 ? ' (a₁₁ + a₂₂ = 0: equilátera, asíntotas perpendiculares)' : '') + '.' : 'A₀₀ = 0 ⇒ sin centro: <b>parábola</b>.');
        } else if (m.rank === 2) {
          why = '|A| = 0 y rang A = 2 ⇒ <b>degenerada</b> (dos rectas). ' + (m.A00 < 0 ? 'A₀₀ = ' + Q(m.A00) + ' &lt; 0 ⇒ <b>dos rectas secantes reales</b>.' : m.A00 > 0 ? 'A₀₀ = ' + Q(m.A00) + ' &gt; 0 ⇒ rectas secantes <b>imaginarias</b>: lo único real es su punto de corte.' : 'A₀₀ = 0 ⇒ <b>dos rectas paralelas</b>. ¿Reales o imaginarias? A₁₁ = a₀₀a₂₂ ' + MINUS + ' a₀₂² = ' + Q(m.A11) + ' y A₂₂ = a₀₀a₁₁ ' + MINUS + ' a₀₁² = ' + Q(m.A22) + ': A₁₁ + A₂₂ = ' + Q(m.As) + (m.As < 0 ? ' &lt; 0 ⇒ <b>reales</b>.' : ' &gt; 0 ⇒ <b>imaginarias</b>.') + ' <i>(U p.286 usa solo A₁₁, que vale 0 en x₁² = ±1 y no decide; por eso se usa A₁₁ + A₂₂.)</i>');
        } else why = '|A| = 0 y rang A = 1 ⇒ <b>recta doble</b>.';
        h = '<b>1. Clasificación por invariantes</b> (cuadro de U p.286). ' + why + ' <b>Veredicto: ' + kn + '.</b>';
      } else if (s === 2) {
        if (!m.rot) h = '<b>2. Paso 1: giro.</b> a₁₂ = 0: no hay término x₁x₂, los ejes de la cónica ya son paralelos a los coordenados. <b>No hace falta giro</b> (P = I, x′ = x). La ecuación sigue siendo ' + pl + ' = 0.';
        else {
          h = '<b>2. Paso 1: giro.</b> a₁₂ ≠ 0 ⇒ hay que eliminar x₁x₂. La parte cuadrática tiene matriz simétrica M = (' + Q(a11) + ' ' + Q(a12) + ' ; ' + Q(a12) + ' ' + Q(a22) + '), diagonalizable con P ortogonal. |M ' + MINUS + ' λI| = λ² ' + MINUS + ' ' + Q(m.tr) + 'λ + ' + Q(m.A00) + ' = 0 ⇒ <b>λ₁ = ' + Q(m.l[0]) + ', λ₂ = ' + Q(m.l[1]) + '</b> (control: suma = traza, producto = A₀₀). Vectores propios unitarios <b>u₁ = ' + vec(m.u[0]) + '</b>, <b>u₂ = ' + vec(m.u[1]) + '</b> (elegidos con det P = 1, así que P es un giro de ángulo ≈ ' + (Math.round(m.theta * 100) / 100).toString().replace('.', ',').replace('-', MINUS) + '°). Con x = Px′, la parte lineal (2a₀₁, 2a₀₂) pasa a (2a₀₁, 2a₀₂)·P = (' + Q(m.b[0]) + ', ' + Q(m.b[1]) + ') y la ecuación es <b>' + poly([[m.l[0], 'x₁′²'], [m.l[1], 'x₂′²'], [m.b[0], 'x₁′'], [m.b[1], 'x₂′'], [p[5], '']]) + ' = 0</b>, sin x₁′x₂′. Las rectas verdes son los ejes nuevos x₁′, x₂′, con las direcciones de u₁, u₂.';
        }
      } else if (s === 3) {
        if (m.center) {
          h = '<b>3. Paso 2: traslación.</b> Se completan cuadrados en cada variable: λ₁(' + shift('x₁' + pr, m.yo[0]) + ')² + λ₂(' + shift('x₂' + pr, m.yo[1]) + ')² + d = 0, con d = a₀₀ ' + MINUS + ' b₁²/(4λ₁) ' + MINUS + ' b₂²/(4λ₂) = ' + Q(m.d) + ' (b₁, b₂ = coeficientes lineales). Cambio: x₁″ = ' + shift('x₁' + pr, m.yo[0]) + ', x₂″ = ' + shift('x₂' + pr, m.yo[1]) + '. El nuevo origen es el <b>centro</b> C = ' + pt(m.O) + ' (coordenadas originales). Ecuación: <b>' + poly([[m.l[0], 'x₁″²'], [m.l[1], 'x₂″²'], [m.d, '']]) + ' = 0</b>. Control con invariantes: d = |A|/A₀₀ = ' + Q(m.det) + '/' + Q(m.A00) + ' = ' + Q(m.det / m.A00) + '. Los ejes naranjas son x₁″, x₂″.';
        } else if (m.kind === 'parabola') {
          h = '<b>3. Paso 2: traslación.</b> Un valor propio es 0 (A₀₀ = 0): no hay centro, y el cuadrado se completa solo en la variable con λ ≠ 0: λ(' + shift(xs(m.k) + pr, m.yo[m.k]) + ')² = ' + MINUS + '(' + Q(m.b[m.j]) + ')(' + shift(xs(m.j) + pr, m.yo[m.j]) + '), con λ = ' + Q(m.l[m.k]) + '. El nuevo origen es el <b>vértice</b> V = ' + pt(m.O) + ' (coordenadas originales). Ecuación: <b>' + nm2(m.k) + '² = ' + Q(m.twoP) + '·' + nm2(m.j) + '</b> (de la forma x² = 2p·y con 2p = ' + Q(m.twoP) + '). Control (β = coeficiente lineal que queda en ' + nm2(m.j) + '): |A| = ' + MINUS + 'λ·β²/4 = ' + Q(-m.l[m.k] * m.b[m.j] * m.b[m.j] / 4) + ' = ' + Q(m.det) + '. Los ejes naranjas son x₁″, x₂″.';
        } else {
          h = '<b>3. Paso 2: traslación.</b> Un valor propio es 0 y la parte lineal en ' + xs(m.j) + pr + ' se anula (la cónica es degenerada): solo queda λ(' + shift(xs(m.k) + pr, m.yo[m.k]) + ')² + e = 0 con λ = ' + Q(m.l[m.k]) + ' y e = ' + Q(m.e) + '. Con ' + nm2(m.k) + ' = ' + shift(xs(m.k) + pr, m.yo[m.k]) + ': <b>' + poly([[m.l[m.k], nm2(m.k) + '²'], [m.e, '']]) + ' = 0</b>, es decir ' + nm2(m.k) + '² = ' + Q(m.s2) + ' (caso x² = p de U Def. 6.18). Los ejes naranjas son x₁″, x₂″.';
        }
      } else {
        var el1 = '', fin = '';
        if (m.kind === 'elipse' || m.kind === 'circunferencia') {
          if (m.kind === 'circunferencia') el1 = '<b>Ecuación reducida</b> (U Def. 6.18, p = 1, a = b): x₁″² + x₂″² = r² con r² = ' + Q(m.A2) + ', es decir <b>radio r = ' + Q(m.A) + '</b>. Centro C = ' + pt(m.O) + ' (el punto naranja). Una circunferencia no tiene focos distintos.';
          else el1 = '<b>Ecuación reducida</b> (U Def. 6.18, p = 1): x₁″²/a² + x₂″²/b² = 1 con a² = ' + Q(m.A2) + ' y b² = ' + Q(m.B2) + ' (semiejes a = ' + Q(m.A) + ' sobre u₁ y b = ' + Q(m.B) + ' sobre u₂). Semidistancia focal c = √|a² ' + MINUS + ' b²| = ' + Q(m.c) + ' sobre el eje mayor (' + ['u₁', 'u₂'][m.maj] + '). Centro C = ' + pt(m.O) + '; vértices ' + vs() + (m.c > 1e-9 ? '; focos (rojos) ' + fs() : '') + '. Control: la suma de distancias de cualquier punto de la elipse a los focos es 2·(semieje mayor).';
          fin = m.kind === 'circunferencia' ? 'Circunferencia de centro C = ' + pt(m.O) + ' y radio r = ' + Q(m.A) : 'Elipse real: x₁″²/' + qd(m.A2) + ' + x₂″²/' + qd(m.B2) + ' = 1';
        } else if (m.kind === 'elipseImag') {
          el1 = '<b>Ecuación reducida</b> (p = ' + MINUS + '1): x₁″²/a² + x₂″²/b² = ' + MINUS + '1, o sea ' + poly([[m.l[0], 'x₁″²'], [m.l[1], 'x₂″²'], [m.d, '']]) + ' = 0 con λ₁, λ₂ y d del mismo signo: una suma de cuadrados no puede dar un número de signo contrario. <b>Ningún punto real</b> (centro C = ' + pt(m.O) + ', pero la curva es vacía).';
          fin = 'Elipse imaginaria: ningún punto real';
        } else if (m.kind === 'hiperbola') {
          el1 = '<b>Ecuación reducida</b> (U Def. 6.18): ' + nm2(m.t) + '²/a² ' + MINUS + ' ' + nm2(m.o) + '²/b² = 1 con a² = ' + Q(m.A2) + ', b² = ' + Q(m.B2) + ' (eje transverso sobre ' + ['u₁', 'u₂'][m.t] + '). c = √(a² + b²) = ' + Q(m.c) + '. Centro C = ' + pt(m.O) + '; vértices ' + vs() + '; focos (rojos) ' + fs() + '. Asíntotas (rectas punteadas grises): ' + nm2(m.o) + ' = ±(b/a)·' + nm2(m.t) + ' = ±' + Q(m.B / m.A) + '·' + nm2(m.t) + ', por el centro.';
          fin = 'Hipérbola: ' + nm2(m.t) + '²/' + qd(m.A2) + ' ' + MINUS + ' ' + nm2(m.o) + '²/' + qd(m.B2) + ' = 1';
        } else if (m.kind === 'parabola') {
          el1 = '<b>Ecuación reducida</b> (U Def. 6.18): ' + nm2(m.k) + '² = 2p·' + nm2(m.j) + ' con 2p = ' + Q(m.twoP) + ', p = ' + Q(m.p_) + ': abre hacia el sentido ' + (m.p_ > 0 ? 'positivo' : 'negativo') + ' de ' + ['u₁', 'u₂'][m.j] + '. <b>Vértice</b> V = ' + pt(m.O) + '; <b>foco</b> F = V + (p/2)·' + ['u₁', 'u₂'][m.j] + ' = ' + fs() + '; <b>directriz</b> (recta roja discontinua): perpendicular al eje, a distancia |p|/2 = ' + Q(Math.abs(m.p_) / 2) + ' del vértice y al lado opuesto del foco. El eje de simetría es la recta naranja punteada.';
          fin = 'Parábola: ' + nm2(m.k) + '² = ' + Q(m.twoP) + '·' + nm2(m.j);
        } else if (m.kind === 'secantes') {
          el1 = '<b>Ecuación reducida</b> (p = 0 en x₁″²/a² ' + MINUS + ' x₂″²/b² = p): ' + poly([[m.l[0], 'x₁″²'], [m.l[1], 'x₂″²']]) + ' = 0 ⇒ x₂″ = ±' + Q(m.mm) + '·x₁″: <b>dos rectas reales</b> que se cortan en el centro C = ' + pt(m.O) + '.';
          fin = 'Dos rectas secantes reales por ' + pt(m.O);
        } else if (m.kind === 'punto') {
          el1 = '<b>Ecuación reducida</b> (p = 0 en x₁″²/a² + x₂″²/b² = p): ' + poly([[m.l[0], 'x₁″²'], [m.l[1], 'x₂″²']]) + ' = 0 con los dos coeficientes del mismo signo: solo se anula en x₁″ = x₂″ = 0, el punto C = ' + pt(m.O) + '. (Son dos rectas imaginarias conjugadas que se cortan en ese punto real.)';
          fin = 'Un único punto real: ' + pt(m.O);
        } else if (m.kind === 'paralelas') {
          el1 = '<b>Ecuación reducida</b> (U Def. 6.18, x² = p con p &gt; 0): ' + nm2(m.k) + '² = ' + Q(m.s2) + ' ⇒ ' + nm2(m.k) + ' = ±' + Q(m.s) + ': <b>dos rectas paralelas reales</b>, paralelas al eje ' + nm2(m.j) + ' y a distancia ' + Q(m.s) + ' de él.';
          fin = 'Dos rectas paralelas reales (separadas ' + Q(2 * m.s) + ')';
        } else if (m.kind === 'paralelasImag') {
          el1 = '<b>Ecuación reducida</b> (x² = p con p &lt; 0): ' + nm2(m.k) + '² = ' + Q(m.s2) + ' &lt; 0: <b>rectas paralelas imaginarias</b>, ningún punto real.';
          fin = 'Rectas paralelas imaginarias: ningún punto real';
        } else {
          el1 = '<b>Ecuación reducida</b> (x² = 0): ' + nm2(m.k) + '² = 0: <b>recta doble</b>, la recta ' + nm2(m.k) + ' = 0 contada dos veces, paralela a ' + ['u₁', 'u₂'][m.j] + '.';
          fin = 'Recta doble';
        }
        h = '<b>4. Ecuación reducida y elementos.</b> ' + el1;
        var f = el('div', 'sar-final'); f.textContent = fin + '  ·  |A| = ' + Q(m.det) + ', A₀₀ = ' + Q(m.A00); res.appendChild(f);
      }
      if (s > 0 && R === 12) h += ' <i>(La ventana muestra solo −12 ≤ x ≤ 12; si no ves la curva, está más lejos.)</i>';
      html(text, wn + h);
    }
    var st = stepper(root, 4, render, null, 4200);
    function recalc() { cur = conicModel(readP()); st.go(st.step); }
    inp.forEach(function (q) { q.addEventListener('input', function () { cur = conicModel(readP()); st.go(st.step); }); });
    body.appendChild(el('p', 'sar-text an-title', 'Escribe los coeficientes enteros de la ecuación general (o elige un caso) y recorre los pasos: matriz e invariantes, clasificación, giro, traslación y elementos de la cónica.'));
    body.appendChild(eq); body.appendChild(pre2); body.appendChild(pre);
    root.appendChild(body); st.mount(root, res);
    cur = conicModel(readP()); st.go(0);
    window.addEventListener('beforeprint', function () { st.go(st.N); });
  }

  var REG = [['.anim-baseinc', buildBaseInc], ['.anim-conica', buildConica], ['.anim-clasif', buildClasif], ['.anim-cuadratica', buildCuadratica], ['.anim-lu', buildLU], ['.anim-bilineal', buildBilineal], ['.anim-minimos', buildMinimos], ['.anim-simet', buildSimet], ['.anim-ortog', buildOrtog], ['.anim-gram', buildGram], ['.anim-jordan', buildJordan], ['.anim-diag', buildDiag],['.anim-propios', buildPropios], ['.anim-semej', buildSemej], ['.anim-gauss', buildGauss], ['.anim-prod', buildProd], ['.anim-adj', buildAdj], ['.anim-rectas', buildRectas], ['.anim-area', buildArea], ['.anim-combo', buildCombo], ['.anim-union', buildUnion], ['.anim-oper', buildOper], ['.anim-lineal', buildLineal], ['.anim-matriz', buildMatriz], ['.anim-cambio', buildCambio]];
  function init() { REG.forEach(function (r) { document.querySelectorAll(r[0]).forEach(function (n) { try { r[1](n); } catch (e) { console.error(r[0], e); } }); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
