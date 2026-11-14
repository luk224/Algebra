// Series de práctica con ejercicios generados al azar, corrección exacta y diagnóstico del error.
// Uso: <div class="drill" data-tipo="coord2" data-titulo="Coordenadas en ℝ²" data-n="5"></div>
// Los generadores son puros (semilla -> problema) y están expuestos en window.AlgPractica para poder
// comprobarlos con sympy desde un script (herramientas/probar_practica.py).
(function () {
  var d = document;

  /* ---------- utilidades ---------- */
  function mulberry32(a) {
    return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  }
  function Rnd(seed) {
    var r = mulberry32(seed);
    return {
      ri: function (a, b) { return a + Math.floor(r() * (b - a + 1)); },
      pick: function (x) { return x[Math.floor(r() * x.length)]; },
      shuf: function (x) { x = x.slice(); for (var i = x.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = x[i]; x[i] = x[j]; x[j] = t; } return x; },
      p: function (q) { return r() < q; }
    };
  }
  function gcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return Math.abs(a); }
  function det2(a, b, c, e) { return a * e - b * c; }
  function det3(u, v, w) { /* vectores como columnas (o filas: el determinante es el mismo) */
    return (u[0] * (v[1] * w[2] - v[2] * w[1]) - u[1] * (v[0] * w[2] - v[2] * w[0]) + u[2] * (v[0] * w[1] - v[1] * w[0])) || 0;
  }
  function rank(M) {
    M = M.map(function (r) { return r.slice(); });
    var rk = 0, rows = M.length, cols = M[0].length;
    for (var c = 0; c < cols && rk < rows; c++) {
      var p = -1; for (var i = rk; i < rows; i++) if (M[i][c] !== 0) { p = i; break; }
      if (p < 0) continue;
      var t = M[p]; M[p] = M[rk]; M[rk] = t;
      for (i = rk + 1; i < rows; i++) {
        if (M[i][c] === 0) continue;
        var a = M[rk][c], b = M[i][c], g = 0, j;
        for (j = 0; j < cols; j++) M[i][j] = M[i][j] * a - M[rk][j] * b;
        for (j = 0; j < cols; j++) g = gcd(g, M[i][j]);
        if (g > 1) for (j = 0; j < cols; j++) M[i][j] /= g;
      }
      rk++;
    }
    return rk;
  }
  function V(v) { return '(' + v.join(',') + ')'; }
  function lin(coefs, vecs) { return vecs[0].map(function (_, i) { var s = 0; coefs.forEach(function (c, k) { s += c * vecs[k][i]; }); return s; }); }
  function poly(c) { /* c = [c_n, ..., c_0] */
    var n = c.length - 1, s = '';
    c.forEach(function (k, i) {
      var e = n - i; if (k === 0) return;
      var a = Math.abs(k), m = e === 0 ? String(a) : (a === 1 ? '' : String(a)) + (e === 1 ? 'x' : 'x^' + e);
      s += s === '' ? (k < 0 ? '-' : '') + m : (k < 0 ? ' - ' : ' + ') + m;
    });
    return s === '' ? '0' : s;
  }
  function comb(coefs, names) { /* texto de a·e1 + b·e2 ... */
    var s = '';
    coefs.forEach(function (k, i) {
      if (k === 0) return; var a = Math.abs(k), m = (a === 1 ? '' : a) + names[i];
      s += s === '' ? (k < 0 ? '-' : '') + m : (k < 0 ? ' - ' : ' + ') + m;
    });
    return s === '' ? '0' : s;
  }
  function plus(k, sym) { return (k < 0 ? '-' : '+') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + sym; }
  function eq(a, b) { return Math.abs(a - b) < 1e-6; }
  function parseNums(str) {
    var t = String(str).replace(/[()\[\]{}]/g, ' ').replace(/−/g, '-').trim();
    if (!t) return [];
    return t.split(/[,;\s]+/).filter(Boolean).map(function (x) {
      var m = x.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
      return m ? parseFloat(m[1]) / parseFloat(m[2]) : parseFloat(x);
    });
  }
  function ok(msg) { return { ok: true, msg: msg || '' }; }

  /* ---------- generadores ---------- */
  var G = {};

  /* 1. Con exactamente n vectores: ¿det ≠ 0? */
  G.base3 = function (seed) {
    var R = Rnd(seed), u1, u2, u3, singular = R.p(0.5), co = null;
    do { u1 = [R.ri(-3, 3), R.ri(-3, 3), R.ri(-3, 3)]; u2 = [R.ri(-3, 3), R.ri(-3, 3), R.ri(-3, 3)]; } while (rank([u1, u2]) < 2);
    if (singular) {
      do { co = [R.ri(-2, 2), R.ri(-2, 2)]; } while (co[0] === 0 && co[1] === 0);
      u3 = lin(co, [u1, u2]);
    } else { do { u3 = [R.ri(-3, 3), R.ri(-3, 3), R.ri(-3, 3)]; } while (det3(u1, u2, u3) === 0); }
    var D = det3(u1, u2, u3), isBase = D !== 0;
    var rel = singular ? 'Aquí $u_3=' + comb(co, ['u_1', 'u_2']) + '$.' : '';
    return {
      tipo: 'choice', data: { u: [u1, u2, u3], det: D },
      enun: '¿Forman una base de $\\mathbb R^3$ los vectores $u_1=' + V(u1) + '$, $u_2=' + V(u2) + '$, $u_3=' + V(u3) + '$?',
      opts: [{ t: 'Sí, son base', ok: isBase, why: isBase ? '' : 'Con 3 vectores en $\\mathbb R^3$ lo que decide es el determinante: aquí vale $0$, así que son ligados y no generan $\\mathbb R^3$. ' + rel },
             { t: 'No, no son base', ok: !isBase, why: !isBase ? '' : 'Son 3 vectores y $\\operatorname{Dim}\\mathbb R^3=3$; el determinante vale $' + D + '\\neq0$, así que son libres y, por el Teor. 2.6, también generan: son base.' }],
      sol: 'Son $3=\\operatorname{Dim}\\mathbb R^3$ vectores: basta el determinante de la matriz con ellos por columnas. $\\det=' + D + (isBase ? '\\neq0$: base.' : '=0$: no son base. ' + rel)
    };
  };

  /* 2. Contar: ¿pueden ser base? (sin calcular nada) */
  var ESP = [
    function (R) { var n = R.ri(2, 5); return { t: '\\mathbb R^' + n, dim: n, tag: 'R' }; },
    function (R) { var m = R.ri(1, 4); return { t: '\\wp_' + m + '\\ (\\text{polinomios de grado}\\le ' + m + ')', dim: m + 1, tag: 'P', m: m }; },
    function (R) { var r = R.ri(2, 3), c = R.ri(2, 3); return { t: '\\mathcal M_{' + r + '\\times' + c + '}', dim: r * c, tag: 'M', r: r, c: c }; }
  ];
  G.cuenta = function (seed) {
    var R = Rnd(seed), e = R.pick(ESP)(R), k;
    do { k = e.dim + R.pick([-2, -1, -1, 0, 1, 1, 2]); } while (k < 1);
    var cat = k < e.dim ? 0 : (k > e.dim ? 2 : 1);
    var base = 'Una base de $V$ tiene exactamente $' + e.dim + '$ vectores. ';
    var extra = '';
    if (e.tag === 'P' && k === e.m) extra = 'Ojo: $\\operatorname{Dim}\\wp_m=m+1$ (cuenta el término independiente), no $m$. ';
    if (e.tag === 'M' && k === e.r + e.c) extra = 'Ojo: $\\operatorname{Dim}\\mathcal M_{r\\times c}=r\\cdot c$, no $r+c$. ';
    var why = [
      { t: 'No: son pocos, no pueden generar $V$', ok: cat === 0 },
      { t: 'Puede serlo: hay que comprobar el determinante o el rango', ok: cat === 1 },
      { t: 'No: son demasiados, serían ligados', ok: cat === 2 }
    ];
    why.forEach(function (o, i) { o.why = i === cat ? '' : base + extra + 'Tú tienes $' + k + '$: ' + (cat === 0 ? 'faltan vectores para generar $V$.' : cat === 2 ? 'sobran, y más vectores que la dimensión son siempre ligados.' : 'coincide el número, así que sí puede serlo (hay que comprobarlo).'); });
    return {
      tipo: 'choice', data: { dim: e.dim, k: k, cat: cat },
      enun: 'En $V=' + e.t + '$ tienes $' + k + '$ ' + (k === 1 ? 'vector' : 'vectores') + '. Sin hacer ninguna cuenta, ¿pueden formar una base de $V$?',
      opts: why,
      sol: '$\\operatorname{Dim}V=' + e.dim + '$ y tienes $' + k + '$ ' + (k === 1 ? 'vector' : 'vectores') + '. ' + (cat === 0 ? 'Menos que la dimensión: no generan $V$.' : cat === 2 ? 'Más que la dimensión: son ligados.' : 'Coincide: serán base si $\\det\\neq0$ (rango $' + e.dim + '$).')
    };
  };

  /* 3. Dimensión de espacios típicos y de subespacios dados por ecuaciones */
  G.dimension = function (seed) {
    var R = Rnd(seed), f = R.ri(0, 3), ans, enun, diag, sol, tx;
    if (f === 0) {
      var m = R.ri(2, 6); ans = m + 1; enun = '¿Cuál es la dimensión del espacio $\\wp_' + m + '$ de los polinomios de grado menor o igual que $' + m + '$?';
      sol = 'Base $\\{1,x,\\dots,x^' + m + '\\}$: $' + (m + 1) + '$ vectores.';
      diag = function (a) { return eq(a, m) ? 'Te falta el término independiente: la base es $\\{1,x,\\dots,x^' + m + '\\}$, con $' + (m + 1) + '$ polinomios.' : null; };
    } else if (f === 1) {
      var r = R.ri(2, 4), c = R.ri(2, 4); if (r === c && R.p(0.5)) c = r === 4 ? 3 : r + 1; ans = r * c;
      enun = '¿Cuál es la dimensión de $\\mathcal M_{' + r + '\\times' + c + '}$ (matrices reales de ' + r + ' filas y ' + c + ' columnas)?';
      sol = 'Una base son las $' + r + '\\cdot' + c + '$ matrices con un único $1$: $' + ans + '$.';
      diag = function (a) { return eq(a, r + c) ? 'Se multiplican, no se suman: hay una matriz básica por cada posición, $' + r + '\\cdot' + c + '$.' : null; };
    } else if (f === 2) {
      var n = R.ri(3, 6); var co = []; for (var i = 0; i < n; i++) co.push(R.ri(-3, 3)); if (co.every(function (x) { return x === 0; })) co[0] = 1;
      var eqn = comb(co, ['x_1', 'x_2', 'x_3', 'x_4', 'x_5', 'x_6'].slice(0, n)); ans = n - 1;
      enun = '¿Cuál es la dimensión del subespacio $W=\\{x\\in\\mathbb R^' + n + ':\\ ' + eqn + '=0\\}$?';
      sol = 'Una ecuación no nula impone una condición: $\\operatorname{Dim}W=' + n + '-1=' + ans + '$.';
      diag = function (a) { return eq(a, n) ? 'Esa es la dimensión de todo $\\mathbb R^' + n + '$. Cada ecuación independiente quita una dimensión: $' + n + '-1$.' : (eq(a, 1) ? 'Has contado las ecuaciones. Los parámetros libres son $n-\\text{(nº de ecuaciones independientes)}$.' : null); };
    } else {
      var A = [R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2)], B;
      do { A = [R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2)]; B = [R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2)]; } while (rank([A, B]) < 2);
      var nm = ['x_1', 'x_2', 'x_3', 'x_4']; ans = 2;
      enun = '¿Cuál es la dimensión de $W=\\{x\\in\\mathbb R^4:\\ ' + comb(A, nm) + '=0,\\ ' + comb(B, nm) + '=0\\}$?';
      sol = 'Las dos ecuaciones son independientes (rango $2$): $\\operatorname{Dim}W=4-2=2$.';
      diag = function (a) { return eq(a, 4) ? 'Esa es la dimensión de $\\mathbb R^4$; hay que restar el rango del sistema ($2$).' : (eq(a, 3) ? 'Has restado una sola ecuación, pero son dos y no proporcionales: rango $2$.' : null); };
    }
    return { tipo: 'nums', n: 1, ans: [ans], data: { f: f, ans: ans }, enun: enun, sol: sol, diag: function (a) { return diag(a[0]); } };
  };

  /* 4. Coordenadas en ℝ² */
  G.coord2 = function (seed) {
    var R = Rnd(seed), b1, b2, x, y, D;
    do { b1 = [R.ri(-3, 3), R.ri(-3, 3)]; b2 = [R.ri(-3, 3), R.ri(-3, 3)]; D = det2(b1[0], b2[0], b1[1], b2[1]); } while (D === 0 || Math.abs(D) > 4);
    do { x = R.ri(-4, 4); y = R.ri(-4, 4); } while (x === y || (x === 0 && y === 0));
    var v = lin([x, y], [b1, b2]);
    var alt = [(v[0] * b2[1] - b1[1] * v[1]) / D, (b1[0] * v[1] - v[0] * b2[0]) / D]; /* vectores de B puestos en FILAS */
    return {
      tipo: 'nums', n: 2, ans: [x, y], data: { b1: b1, b2: b2, v: v, ans: [x, y] },
      enun: 'Calcula las coordenadas de $v=' + V(v) + '$ respecto de la base $B=\\{' + V(b1) + ',' + V(b2) + '\\}$. Escribe $x_1,x_2$ con $v=x_1b_1+x_2b_2$.',
      sol: 'Se resuelve $x_1' + V(b1) + '+x_2' + V(b2) + '=' + V(v) + '$, con los vectores de $B$ por <b>columnas</b>: $x_1=' + x + ',\\ x_2=' + y + '$. Comprobación: $' + x + V(b1) + '+(' + y + ')' + V(b2) + '=' + V(v) + '$.',
      diag: function (a) {
        if (eq(a[0], v[0]) && eq(a[1], v[1])) return 'Esas son las componentes de $v$ en la base canónica, no en $B$.';
        if (eq(a[0], y) && eq(a[1], x)) return 'Tienes los números bien pero en orden cambiado: la primera coordenada acompaña a $b_1$.';
        if (eq(a[0], alt[0]) && eq(a[1], alt[1])) return 'Has puesto los vectores de $B$ por <b>filas</b> en el sistema; deben ir por <b>columnas</b>.';
        var w = lin(a, [b1, b2]);
        return 'Con tu respuesta, $x_1b_1+x_2b_2=' + V(w.map(function (t) { return Math.round(t * 1000) / 1000; })) + '$, y debía salir $' + V(v) + '$. Comprueba siempre sustituyendo.';
      }
    };
  };

  /* 5. Coordenadas de un polinomio de ℘₂ en una base {1, x+a, x²+bx+c} */
  G.coordpol = function (seed) {
    var R = Rnd(seed), a = R.ri(-3, 3), b = R.ri(-3, 3), c = R.ri(-3, 3), p2, p1, p0;
    if (a === 0) a = R.pick([-2, 1, 2]); if (b === 0) b = R.pick([-1, 2]);
    p2 = R.ri(-4, 4); p1 = R.ri(-4, 4); p0 = R.ri(-4, 4); if (p2 === 0) p2 = 3;
    var l3 = p2, l2 = p1 - b * p2, l1 = p0 - a * l2 - c * p2;
    var ee = [[0, 0, 1], [0, 1, a], [1, b, c]].map(poly);
    return {
      tipo: 'nums', n: 3, ans: [l1, l2, l3], data: { a: a, b: b, c: c, p: [p2, p1, p0], ans: [l1, l2, l3] },
      enun: 'En $\\wp_2$ se toma la base $B=\\{e_1,e_2,e_3\\}$ con $e_1=' + ee[0] + '$, $e_2=' + ee[1] + '$, $e_3=' + ee[2] + '$. Calcula las coordenadas $(x_1,x_2,x_3)_B$ de $p(x)=' + poly([p2, p1, p0]) + '$.',
      sol: 'Se iguala $x_1e_1+x_2e_2+x_3e_3=p$ coeficiente a coeficiente. En $x^2$: $x_3=' + p2 + '$; en $x$: $x_2' + plus(b, 'x_3') + '=' + p1 + '\\Rightarrow x_2=' + l2 + '$; término independiente: $x_1' + plus(a, 'x_2') + plus(c, 'x_3') + '=' + p0 + '\\Rightarrow x_1=' + l1 + '$.',
      diag: function (u) {
        if (eq(u[0], p0) && eq(u[1], p1) && eq(u[2], p2)) return 'Esos son los coeficientes de $p$ respecto de $\\{1,x,x^2\\}$ (base canónica), no respecto de $B$.';
        if (eq(u[0], p2) && eq(u[1], p1) && eq(u[2], p0)) return 'Son los coeficientes de $p$ de mayor a menor grado: tampoco son las coordenadas en $B$.';
        var q = [u[2], u[1] * 1 + u[2] * b, u[0] + u[1] * a + u[2] * c];
        return 'Con tu respuesta $x_1e_1+x_2e_2+x_3e_3=' + poly(q.map(function (t) { return Math.round(t * 1000) / 1000; })) + '$, y debía salir $p=' + poly([p2, p1, p0]) + '$.';
      }
    };
  };

  /* 6. Dimensión del subespacio generado = rango */
  G.rango = function (seed) {
    var R = Rnd(seed), n = R.pick([3, 4, 4]), r = R.ri(1, n === 3 ? 2 : 3), k = 4, w, i, j, rows;
    for (;;) {
      w = []; for (i = 0; i < r; i++) { var t = []; for (j = 0; j < n; j++) t.push(R.ri(-2, 2)); w.push(t); }
      if (rank(w) === r) break;
    }
    rows = w.slice(); var rel = [];
    while (rows.length < k) { var co = []; for (i = 0; i < r; i++) co.push(R.ri(-2, 2)); if (co.every(function (x) { return x === 0; })) continue; rows.push(lin(co, w)); }
    rows = R.shuf(rows);
    var rk = rank(rows);
    var names = rows.map(function (_, i) { return 'u_' + (i + 1); });
    return {
      tipo: 'nums', n: 1, ans: [rk], data: { rows: rows, n: n, ans: rk },
      enun: 'Calcula la dimensión del subespacio $\\langle ' + rows.map(function (u, i) { return V(u); }).join(',\\ ') + '\\rangle\\subset\\mathbb R^' + n + '$.',
      sol: 'Dim $=$ rango de la matriz con esos vectores por filas. Al escalonar quedan $' + rk + '$ filas no nulas, luego $\\operatorname{Dim}=' + rk + '$ (los otros ' + (k - rk) + ' vectores son combinación lineal de los demás).',
      diag: function (a) {
        var x = a[0];
        if (eq(x, k)) return 'Has contado los vectores. La dimensión es el <b>rango</b>: cuántos son independientes, no cuántos hay.';
        if (eq(x, n)) return 'Esa es la dimensión del espacio $\\mathbb R^' + n + '$, no la del subespacio generado.';
        return 'Revisa el escalonado: ¿qué filas se anulan? Las que son combinación de otras no cuentan. (Pista: el rango es $' + (x > rk ? 'menor' : 'mayor') + '$.)';
      }
    };
  };

  /* 7. Completar a una base de ℝ³ */
  G.completar = function (seed) {
    var R = Rnd(seed), u1, u2, w, i, opts = [], tries = 0;
    do { u1 = [R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2)]; u2 = [R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2)]; } while (rank([u1, u2]) < 2);
    do { w = [R.ri(-2, 2), R.ri(-2, 2), R.ri(-2, 2)]; } while (det3(u1, u2, w) === 0);
    opts.push({ v: w, det: det3(u1, u2, w), co: null });
    var seen = {}; seen[w.join()] = 1;
    while (opts.length < 4 && tries++ < 400) {
      var co = [R.ri(-2, 2), R.ri(-2, 2)]; if (co[0] === 0 && co[1] === 0) continue;
      var z = lin(co, [u1, u2]); if (seen[z.join()]) continue;
      seen[z.join()] = 1; opts.push({ v: z, det: 0, co: co });
    }
    if (opts.length < 4) return G.completar(seed + 1);
    opts = R.shuf(opts);
    return {
      tipo: 'choice', data: { u: [u1, u2], opts: opts.map(function (o) { return { v: o.v, det: o.det }; }) },
      enun: 'Los vectores $u_1=' + V(u1) + '$ y $u_2=' + V(u2) + '$ son libres. ¿Cuál de estos vectores permite completarlos hasta una base de $\\mathbb R^3$?',
      opts: opts.map(function (o) {
        return { t: '$' + V(o.v) + '$', ok: o.det !== 0,
                 why: o.det !== 0 ? '' : 'Este es combinación de $u_1,u_2$: $' + V(o.v) + '=' + comb(o.co, ['u_1', 'u_2']) + '$. Con él el sistema sigue siendo ligado ($\\det=0$).' };
      }),
      sol: 'Hay que añadir un vector <b>fuera de $\\langle u_1,u_2\\rangle$</b>. Se comprueba con $\\det(u_1,u_2,w)$: ' + opts.map(function (o) { return '$' + V(o.v) + '\\to' + o.det + '$'; }).join(', ') + '. Solo el que da $\\neq0$ completa la base.'
    };
  };

  /* ---------- interfaz ---------- */
  var DELIM = [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }];
  function math(el) { try { if (window.renderMathInElement) renderMathInElement(el, { delimiters: DELIM, throwOnError: false }); } catch (e) {} }
  function html(s) { var t = d.createElement('div'); t.innerHTML = s; return t.firstElementChild; }

  function init(box) {
    var tipo = box.dataset.tipo, gen = G[tipo];
    if (!gen) return;
    var N = parseInt(box.dataset.n || '5', 10), titulo = box.dataset.titulo || 'Serie de práctica';
    var seed, i, aciertos, hechos, prob, resp;
    box.innerHTML = '<div class="dr-head"><b></b><span class="dr-prog" aria-live="polite"></span></div><div class="dr-body"></div>';
    box.querySelector('b').textContent = '🏋️ ' + titulo;
    var prog = box.querySelector('.dr-prog'), body = box.querySelector('.dr-body');

    function nueva() { seed = (Date.now() + Math.floor(Math.random() * 1e6)) | 0; i = 0; aciertos = 0; hechos = []; pinta(); }
    function puntos() {
      var s = ''; for (var k = 0; k < N; k++) s += (k < hechos.length ? (hechos[k] ? '<span class="pt ok">●</span>' : '<span class="pt mal">●</span>') : '<span class="pt">○</span>');
      prog.innerHTML = s;
    }
    function pinta() {
      puntos();
      if (i >= N) {
        body.innerHTML = '<p class="dr-fin"><b>Serie terminada: ' + aciertos + ' de ' + N + '.</b> ' +
          (aciertos === N ? 'Perfecto: pasa al siguiente tipo.' : aciertos >= N - 1 ? 'Muy bien. Repasa el fallo y sigue.' : 'Relee la ficha de arriba y repite la serie: salen problemas distintos.') + '</p><button type="button" class="dr-btn">Nueva serie</button>';
        body.querySelector('button').addEventListener('click', nueva); return;
      }
      prob = gen(seed + i * 7919); resp = false;
      body.innerHTML = '<p class="dr-enun"><span class="dr-n">' + (i + 1) + '/' + N + '</span> ' + prob.enun + '</p><div class="dr-ans"></div><div class="dr-fb" hidden></div>';
      var ans = body.querySelector('.dr-ans');
      if (prob.tipo === 'choice') {
        prob.opts.forEach(function (o, k) {
          var b = d.createElement('button'); b.type = 'button'; b.className = 'dr-opt'; b.innerHTML = o.t;
          b.addEventListener('click', function () { responder(o.ok, o.ok ? '' : o.why, k, b); }); ans.appendChild(b);
        });
      } else {
        ans.innerHTML = '<input type="text" inputmode="decimal" autocomplete="off" aria-label="Tu respuesta" placeholder="' + (prob.n === 1 ? 'un número' : prob.n + ' números separados por comas') + '"> <button type="button" class="dr-btn">Comprobar</button>';
        var inp = ans.querySelector('input'), bt = ans.querySelector('button');
        function comprobar() {
          if (resp) return; var a = parseNums(inp.value);
          if (a.length !== prob.n || a.some(function (x) { return isNaN(x); })) { inp.classList.add('err'); inp.placeholder = 'Escribe ' + (prob.n === 1 ? 'un número' : prob.n + ' números separados por comas'); return; }
          var good = a.every(function (x, k) { return eq(x, prob.ans[k]); });
          responder(good, good ? '' : (prob.diag(a) || 'No es esa. Revisa los pasos de la solución.'));
          inp.disabled = true; bt.disabled = true;
        }
        bt.addEventListener('click', comprobar); inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') comprobar(); });
        inp.focus({ preventScroll: true });
      }
      math(body);
    }
    function responder(good, msg, k, btn) {
      if (resp) return; resp = true; hechos.push(good); if (good) aciertos++; puntos();
      if (prob.tipo === 'choice') {
        [].forEach.call(body.querySelectorAll('.dr-opt'), function (b, j) { b.disabled = true; if (prob.opts[j].ok) b.classList.add('ok'); });
        if (!good && btn) btn.classList.add('mal');
      }
      var fb = body.querySelector('.dr-fb'); fb.hidden = false; fb.className = 'dr-fb ' + (good ? 'ok' : 'mal');
      fb.innerHTML = '<p><b>' + (good ? '✓ Correcto.' : '✗ No es correcto.') + '</b> ' + msg + '</p><details' + (good ? '' : ' open') + '><summary>Solución</summary><p>' + prob.sol + '</p></details>' +
        '<button type="button" class="dr-btn dr-next">' + (i + 1 < N ? 'Siguiente' : 'Ver resultado') + '</button>';
      fb.querySelector('.dr-next').addEventListener('click', function () { i++; pinta(); });
      math(fb); fb.querySelector('.dr-next').focus({ preventScroll: true });
    }
    nueva();
  }

  window.AlgPractica = { gens: G, rank: rank, det3: det3, parseNums: parseNums };
  function ready(f) { d.readyState !== 'loading' ? f() : d.addEventListener('DOMContentLoaded', f); }
  ready(function () { [].forEach.call(d.querySelectorAll('.drill'), init); });
})();
