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

  /* ====== Generadores de los demás temas ====== */
  function pm(rows) { return '\\begin{pmatrix}' + rows.map(function (r) { return r.join('&'); }).join('\\\\') + '\\end{pmatrix}'; }
  function fr(n, d) { var g = gcd(n, d) || 1; n /= g; d /= g; if (d < 0) { n = -n; d = -d; } return d === 1 ? String(n) : (n < 0 ? '-' : '') + '\\frac{' + Math.abs(n) + '}{' + d + '}'; }
  function matmul(A, B) { return A.map(function (r) { return B[0].map(function (_, j) { var t = 0; r.forEach(function (x, k) { t += x * B[k][j]; }); return t; }); }); }
  function flat(M) { return [].concat.apply([], M); }
  function randMat(R, n, m, lo, hi) { var M = []; for (var i = 0; i < n; i++) { var r = []; for (var j = 0; j < m; j++) r.push(R.ri(lo, hi)); M.push(r); } return M; }
  function dist(a, b) { return a.some(function (x, i) { return !eq(x, b[i]); }); }
  function rmat(M) { return pm(M); }

  /* 1.2 · producto de matrices 2×2 */
  G.prod22 = function (seed) {
    var R = Rnd(seed), A, B, AB, BA, H, T;
    do { A = randMat(R, 2, 2, -3, 3); B = randMat(R, 2, 2, -3, 3); AB = matmul(A, B); BA = matmul(B, A);
      H = [[A[0][0] * B[0][0], A[0][1] * B[0][1]], [A[1][0] * B[1][0], A[1][1] * B[1][1]]]; T = [[AB[0][0], AB[1][0]], [AB[0][1], AB[1][1]]];
    } while (!dist(flat(AB), flat(BA)) || !dist(flat(AB), flat(H)) || !dist(flat(AB), flat(T)));
    return {
      tipo: 'nums', n: 4, ans: flat(AB), data: { A: A, B: B, ans: flat(AB) },
      enun: 'Calcula $AB$ con $A=' + rmat(A) + '$ y $B=' + rmat(B) + '$. Escribe las 4 entradas por filas: $(ab_{11},ab_{12},ab_{21},ab_{22})$.',
      sol: 'La entrada $(i,j)$ es la fila $i$ de $A$ por la columna $j$ de $B$: $AB=' + rmat(AB) + '$.',
      diag: function (a) {
        if (!dist(a, flat(BA))) return 'Has calculado $BA$. El producto de matrices no es conmutativo: $AB$ es filas de $A$ por columnas de $B$.';
        if (!dist(a, flat(H))) return 'Has multiplicado entrada a entrada. El producto de matrices es fila × columna (suma de productos), no entrada por entrada.';
        if (!dist(a, flat(T))) return 'Tienes la traspuesta de $AB$: la entrada $(1,2)$ es fila 1 de $A$ por columna 2 de $B$.';
        return 'Revisa cada entrada: fila $i$ de $A$ por columna $j$ de $B$ (suma de productos).';
      }
    };
  };

  /* 1.2 · inversa de una 2×2 */
  G.inv22 = function (seed) {
    var R = Rnd(seed), A, D;
    do { A = randMat(R, 2, 2, -3, 3); D = det2(A[0][0], A[0][1], A[1][0], A[1][1]); } while (!(Math.abs(D) === 1 || Math.abs(D) === 2));
    var adj = [A[1][1], -A[0][1], -A[1][0], A[0][0]], inv = adj.map(function (x) { return x / D; });
    var sinSig = [A[1][1], A[0][1], A[1][0], A[0][0]].map(function (x) { return x / D; });
    return {
      tipo: 'nums', n: 4, ans: inv, data: { A: A, det: D, ans: inv },
      enun: 'Calcula $A^{-1}$ para $A=' + rmat(A) + '$. Escribe las 4 entradas por filas (admite fracciones, p. ej. $1/2$).',
      sol: '$\\det A=' + D + '$ y $A^{-1}=\\frac{1}{\\det A}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}=\\frac{1}{' + D + '}' + rmat([[adj[0], adj[1]], [adj[2], adj[3]]]) + '=' + rmat([[fr(adj[0], D), fr(adj[1], D)], [fr(adj[2], D), fr(adj[3], D)]]) + '$.',
      diag: function (a) {
        if (!dist(a, adj)) return 'Has dado la adjunta, pero falta dividir entre $\\det A=' + D + '$.';
        if (!dist(a, sinSig)) return 'En la inversa de una $2\\times2$ se intercambian $a$ y $d$ y se <b>cambia el signo</b> de $b$ y $c$.';
        if (!dist(a, flat(A))) return 'Esa es la propia $A$, no su inversa.';
        var P = matmul(A, [[a[0], a[1]], [a[2], a[3]]]);
        return 'Comprueba: $A\\cdot(\\text{tu matriz})=' + rmat(P.map(function (r) { return r.map(function (x) { return Math.round(x * 1000) / 1000; }); })) + '$ y debería ser la identidad.';
      }
    };
  };

  /* 1.2 / 3.2 · rango de una 3×4 */
  function matRango(R, n, m, r) {
    var w, i, rows = [];
    for (;;) { w = randMat(R, r, m, -2, 2); if (rank(w) === r) break; }
    rows = w.slice();
    while (rows.length < n) { var co = []; for (i = 0; i < r; i++) co.push(R.ri(-2, 2)); if (co.every(function (x) { return x === 0; })) continue; rows.push(lin(co, w)); }
    return R.shuf(rows);
  }
  G.rango34 = function (seed) {
    var R = Rnd(seed), r = R.ri(1, 3), A = matRango(R, 3, 4, r), rk = rank(A);
    return {
      tipo: 'nums', n: 1, ans: [rk], data: { A: A, ans: rk },
      enun: '¿Cuál es el rango de $A=' + rmat(A) + '$?',
      sol: 'Al escalonar quedan $' + rk + '$ filas no nulas: $\\operatorname{rang}A=' + rk + '$ (' + (rk < 3 ? 'alguna fila es combinación de las otras' : 'las tres filas son independientes') + ').',
      diag: function (a) {
        if (eq(a[0], 3) && rk < 3) return 'Has contado las filas. El rango es el nº de filas <b>independientes</b>; aquí alguna se anula al escalonar.';
        if (eq(a[0], 4)) return 'Un rango no puede superar el nº de filas (3).';
        return 'Escalona de nuevo: ¿cuántas filas distintas de cero quedan?';
      }
    };
  };

  /* 1.3 · determinante 3×3 por Sarrus */
  G.det3 = function (seed) {
    var R = Rnd(seed), M, D, pos, neg;
    do { M = randMat(R, 3, 3, -2, 3); D = det3(M[0], M[1], M[2]);
      pos = M[0][0] * M[1][1] * M[2][2] + M[0][1] * M[1][2] * M[2][0] + M[0][2] * M[1][0] * M[2][1];
      neg = M[0][2] * M[1][1] * M[2][0] + M[0][0] * M[1][2] * M[2][1] + M[0][1] * M[1][0] * M[2][2];
    } while (D === 0 || D === pos + neg || D === -D);
    return {
      tipo: 'nums', n: 1, ans: [D], data: { M: M, ans: D },
      enun: 'Calcula $\\det\\begin{pmatrix}' + M.map(function (r) { return r.join('&'); }).join('\\\\') + '\\end{pmatrix}$ con la regla de Sarrus.',
      sol: 'Diagonales positivas: $' + pos + '$; negativas: $' + neg + '$. $\\det=' + pos + '-(' + neg + ')=' + D + '$.',
      diag: function (a) {
        if (eq(a[0], pos + neg)) return 'Has <b>sumado</b> las tres diagonales negativas. Se restan: $\\det=(\\text{positivas})-(\\text{negativas})$.';
        if (eq(a[0], -D)) return 'Tienes el signo cambiado: $\\det=(\\text{diagonales principales})-(\\text{diagonales secundarias})$.';
        return 'Revisa los seis productos: positivas $' + pos + '$ y negativas $' + neg + '$ (según Sarrus).';
      }
    };
  };

  /* 1.3 · propiedades del determinante */
  G.detprop = function (seed) {
    var R = Rnd(seed), f = R.ri(0, 3), n = R.ri(2, 4), k = R.pick([2, 3, -2, 4, -1, 5]), c = R.pick([2, 3, -2]), ans, enun, diag, sol;
    if (f === 0) { ans = Math.pow(c, n) * k; enun = 'Si $A$ es $' + n + '\\times' + n + '$ y $\\det A=' + k + '$, ¿cuánto vale $\\det(' + c + 'A)$?';
      sol = 'El factor $' + c + '$ sale de <b>cada fila</b>: $\\det(' + c + 'A)=' + c + '^{' + n + '}\\det A=' + ans + '$.';
      diag = function (a) { return eq(a[0], c * k) ? 'Has sacado el factor una sola vez. Sale una vez por cada una de las $' + n + '$ filas: $' + c + '^{' + n + '}$.' : null; }; }
    else if (f === 1) { ans = 1 / k; enun = 'Si $A$ es invertible y $\\det A=' + k + '$, ¿cuánto vale $\\det(A^{-1})$? (admite fracciones)';
      sol = '$\\det(A^{-1})=1/\\det A=' + fr(1, k) + '$ (porque $\\det(AA^{-1})=\\det I=1$).';
      diag = function (a) { return eq(a[0], -k) ? 'No es el opuesto: $\\det(A^{-1})$ es el <b>inverso</b> de $\\det A$.' : (eq(a[0], k) ? '$\\det(A^{-1})=1/\\det A$, no $\\det A$.' : null); }; }
    else if (f === 2) { ans = k * k; enun = 'Si $\\det A=' + k + '$, ¿cuánto vale $\\det(A^2)$?';
      sol = '$\\det(A^2)=\\det(A\\cdot A)=(\\det A)^2=' + ans + '$.';
      diag = function (a) { return eq(a[0], 2 * k) ? 'Has duplicado. $\\det(AB)=\\det A\\cdot\\det B$, así que $\\det(A^2)=(\\det A)^2$.' : null; }; }
    else { ans = k; enun = 'Si $\\det A=' + k + '$, ¿cuánto vale $\\det(A^t)$?';
      sol = 'La traspuesta tiene el mismo determinante: $' + k + '$.';
      diag = function (a) { return eq(a[0], -k) ? 'La traspuesta <b>no</b> cambia el signo: $\\det A^t=\\det A$.' : null; }; }
    return { tipo: 'nums', n: 1, ans: [ans], data: { f: f, n: n, k: k, c: c, ans: ans }, enun: enun, sol: sol, diag: function (a) { return diag(a); } };
  };

  /* 1.4 · sistema 2×2 */
  G.sist2 = function (seed) {
    var R = Rnd(seed), a, b, c, d, D, x, y;
    do { a = R.ri(-3, 3); b = R.ri(-3, 3); c = R.ri(-3, 3); d = R.ri(-3, 3); D = det2(a, b, c, d); } while (D === 0);
    x = R.ri(-4, 4); y = R.ri(-4, 4);
    var e1 = a * x + b * y, e2 = c * x + d * y;
    var eqs = function (u, v) { return comb([a, b], ['x', 'y']) + '=' + e1; };
    return {
      tipo: 'nums', n: 2, ans: [x, y], data: { M: [[a, b], [c, d]], rhs: [e1, e2], ans: [x, y] },
      enun: 'Resuelve $\\begin{cases}' + comb([a, b], ['x', 'y']) + '=' + e1 + '\\\\ ' + comb([c, d], ['x', 'y']) + '=' + e2 + '\\end{cases}$. Escribe $(x,y)$.',
      sol: '$\\det=' + D + '\\neq0$: solución única. Por Cramer o por Gauss: $x=' + x + ',\\ y=' + y + '$. Comprobación: ' + e1 + ' y ' + e2 + ' ✓.',
      diag: function (u) {
        if (eq(u[0], y) && eq(u[1], x)) return 'Tienes los valores cambiados de orden: $x$ va primero.';
        var r1 = a * u[0] + b * u[1], r2 = c * u[0] + d * u[1], o1 = eq(r1, e1), o2 = eq(r2, e2);
        if (o1 && !o2) return 'Cumple la 1.ª ecuación pero no la 2.ª (da $' + r2 + '$ y debe dar $' + e2 + '$).';
        if (!o1 && o2) return 'Cumple la 2.ª ecuación pero no la 1.ª (da $' + r1 + '$ y debe dar $' + e1 + '$).';
        return 'Sustituye en las dos ecuaciones: te da $' + r1 + '$ y $' + r2 + '$, y debe dar $' + e1 + '$ y $' + e2 + '$.';
      }
    };
  };

  /* 1.4 · clasificar un sistema 3×3 con Rouché–Frobenius */
  G.clasifica = function (seed) {
    var R = Rnd(seed), tipo = R.ri(0, 2), A, b, i, co, r0, r1;
    for (;;) {
      A = randMat(R, 3, 3, -2, 3); b = [R.ri(-3, 3), R.ri(-3, 3), R.ri(-3, 3)];
      if (tipo > 0) { var c = [R.ri(-2, 2), R.ri(-2, 2)]; if (c[0] === 0 && c[1] === 0) continue; A[2] = lin(c, [A[0], A[1]]); b[2] = c[0] * b[0] + c[1] * b[1] + (tipo === 2 ? R.pick([-2, -1, 1, 2]) : 0); }
      r0 = rank(A); r1 = rank(A.map(function (r, k) { return r.concat([b[k]]); }));
      if (tipo === 0 && r0 !== 3) continue; if (tipo === 1 && !(r0 === 2 && r1 === 2)) continue; if (tipo === 2 && !(r0 === 2 && r1 === 3)) continue;
      break;
    }
    var nom = ['Compatible determinado', 'Compatible indeterminado', 'Incompatible'], cat = r0 < r1 ? 2 : (r0 === 3 ? 0 : 1);
    var M = '\\left(\\begin{array}{ccc|c}' + A.map(function (r, k) { return r.concat([b[k]]).join('&'); }).join('\\\\') + '\\end{array}\\right)';
    return {
      tipo: 'choice', data: { A: A, b: b, r0: r0, r1: r1, cat: cat },
      enun: 'Clasifica el sistema de matriz ampliada $(A\\mid b)=' + M + '$.',
      opts: nom.map(function (t, i) {
        return { t: t, ok: i === cat, why: i === cat ? '' : 'Aquí $\\operatorname{rang}A=' + r0 + '$ y $\\operatorname{rang}(A\\mid b)=' + r1 + '$ con 3 incógnitas: ' + (cat === 0 ? 'los dos rangos valen 3, solución única.' : cat === 1 ? 'los rangos coinciden ($' + r0 + '<3$), hay infinitas soluciones.' : 'los rangos son distintos, no hay solución.') };
      }),
      sol: '$\\operatorname{rang}A=' + r0 + '$, $\\operatorname{rang}(A\\mid b)=' + r1 + '$, $n=3$. ' + (cat === 0 ? 'Rangos iguales a $n$: ' : cat === 1 ? 'Rangos iguales y menores que $n$: ' : 'Rangos distintos: ') + nom[cat] + '.'
    };
  };

  /* 3.2 · teorema de la dimensión: núcleo e imagen */
  G.dimnuc = function (seed) {
    var R = Rnd(seed), r = R.ri(1, 3), A = matRango(R, 3, 4, r), rk = rank(A);
    return {
      tipo: 'nums', n: 2, ans: [4 - rk, rk], data: { A: A, ans: [4 - rk, rk] },
      enun: 'Sea $f:\\mathbb R^4\\to\\mathbb R^3$ con matriz $A=' + rmat(A) + '$. Calcula $(\\operatorname{Dim}\\operatorname{Nuc}f,\\ \\operatorname{Dim}\\operatorname{Im}f)$.',
      sol: '$\\operatorname{Dim}\\operatorname{Im}f=\\operatorname{rang}A=' + rk + '$ y, por el teorema de la dimensión, $\\operatorname{Dim}\\operatorname{Nuc}f=4-' + rk + '=' + (4 - rk) + '$.',
      diag: function (a) {
        if (eq(a[0], rk) && eq(a[1], 4 - rk)) return 'Los tienes intercambiados: la imagen tiene dimensión igual al <b>rango</b> y el núcleo $n-\\operatorname{rang}$.';
        if (eq(a[0] + a[1], 3)) return 'La suma debe ser $4$ (nº de columnas, dimensión del espacio de salida de partida), no $3$.';
        return 'Calcula primero el rango de $A$ (escalona) y usa $\\operatorname{Dim}\\operatorname{Nuc}+\\operatorname{Dim}\\operatorname{Im}=4$.';
      }
    };
  };

  /* 4.2 · valores propios de una 2×2 */
  G.polcar22 = function (seed) {
    var R = Rnd(seed), l1, l2, k, m, P, Pi, A;
    do { l1 = R.ri(-3, 4); l2 = R.ri(-3, 4); } while (l1 >= l2);
    k = R.pick([-1, 0, 1, 2]); m = R.pick([-1, 1, 2]);
    P = [[1, k], [m, 1 + k * m]]; Pi = [[1 + k * m, -k], [-m, 1]];
    A = matmul(matmul(P, [[l1, 0], [0, l2]]), Pi);
    var tr = l1 + l2, dt = l1 * l2;
    return {
      tipo: 'nums', n: 2, ans: [l1, l2], data: { A: A, ans: [l1, l2] },
      enun: 'Halla los valores propios de $A=' + rmat(A) + '$. Escríbelos de menor a mayor.',
      sol: '$\\operatorname{tr}A=' + tr + '$, $\\det A=' + dt + '$. $|A-\\lambda I|=\\lambda^2-' + (tr < 0 ? '(' + tr + ')' : tr) + '\\lambda+(' + dt + ')=0\\Rightarrow\\lambda=' + l1 + ',\\ ' + l2 + '$.',
      diag: function (a) {
        if (eq(a[0], -l2) && eq(a[1], -l1)) return 'Tienes los signos cambiados: las raíces de $\\lambda^2-(\\operatorname{tr})\\lambda+\\det$ son $\\lambda$, no $-\\lambda$ (se resuelve $|A-\\lambda I|=0$).';
        if (eq(a[0], Math.min(tr, dt)) && eq(a[1], Math.max(tr, dt))) return 'Esos son la traza y el determinante, no los valores propios: estos son las raíces de $\\lambda^2-\\operatorname{tr}\\,\\lambda+\\det$.';
        if (eq(a[0], l2) && eq(a[1], l1)) return 'Escríbelos de menor a mayor.';
        return 'Comprueba: su suma debe ser la traza ($' + tr + '$) y su producto el determinante ($' + dt + '$).';
      }
    };
  };

  /* 4.3 · ¿es diagonalizable una 2×2? */
  G.diag22 = function (seed) {
    var R = Rnd(seed), caso = R.ri(0, 3), A, why;
    if (caso === 0) { var l1 = R.ri(-2, 2), l2 = l1 + R.ri(1, 3), k = R.pick([1, 2]); A = [[l1, k], [0, l2]]; }
    else if (caso === 1) { var l = R.ri(-3, 3); A = [[l, 0], [0, l]]; }
    else if (caso === 2) { var l = R.ri(-3, 3), k = R.pick([1, 2, -1]); A = [[l, k], [0, l]]; }
    else { var a = R.ri(-2, 2), b = R.pick([1, 2, 3]); A = [[a, -b], [b, a]]; }
    var tr = A[0][0] + A[1][1], dt = det2(A[0][0], A[0][1], A[1][0], A[1][1]), disc = tr * tr - 4 * dt;
    var si = disc > 0 ? true : (disc === 0 ? (A[0][1] === 0 && A[1][0] === 0) : false);
    var razon = disc > 0 ? 'Tiene dos valores propios reales distintos (discriminante $' + disc + '>0$): siempre diagonalizable.' :
      disc === 0 ? (si ? 'Es $\\lambda I$: ya es diagonal.' : 'Valor propio doble $\\lambda=' + tr / 2 + '$ con $\\alpha=2$, pero $A-\\lambda I\\neq0$ tiene rango 1, luego $d=1<\\alpha$: no diagonalizable.') :
      'Discriminante $' + disc + '<0$: los valores propios no son reales, no se puede diagonalizar en $\\mathbb R$.';
    return {
      tipo: 'choice', data: { A: A, disc: disc, si: si },
      enun: '¿Es $A=' + rmat(A) + '$ diagonalizable en $\\mathbb R$?',
      opts: [{ t: 'Sí', ok: si, why: si ? '' : razon }, { t: 'No', ok: !si, why: !si ? '' : razon }],
      sol: '$\\operatorname{tr}A=' + tr + '$, $\\det A=' + dt + '$, discriminante $' + disc + '$. ' + razon
    };
  };

  /* 5.1 · proyección ortogonal sobre una recta */
  G.proy = function (seed) {
    var R = Rnd(seed), u, v, uu, uv;
    do { u = [R.ri(-2, 3), R.ri(-2, 3), R.ri(-2, 3)]; v = [R.ri(-3, 3), R.ri(-3, 3), R.ri(-3, 3)]; uu = u[0] * u[0] + u[1] * u[1] + u[2] * u[2]; uv = u[0] * v[0] + u[1] * v[1] + u[2] * v[2]; } while (uu === 0 || uv === 0 || uu === 1 || uv === uu);
    var pr = u.map(function (x) { return x * uv / uu; });
    var sin = u.map(function (x) { return x * uv; });
    return {
      tipo: 'nums', n: 3, ans: pr, data: { u: u, v: v, ans: pr },
      enun: 'Calcula la proyección ortogonal de $v=' + V(v) + '$ sobre la recta $\\langle u\\rangle$, con $u=' + V(u) + '$ (producto escalar usual). Escribe las 3 componentes (admite fracciones).',
      sol: '$\\operatorname{proy}_u v=\\dfrac{u\\bullet v}{u\\bullet u}\\,u=\\dfrac{' + uv + '}{' + uu + '}' + V(u) + '=(' + pr.map(function (x, i) { return fr(u[i] * uv, uu); }).join(',') + ')$.',
      diag: function (a) {
        if (!dist(a, sin)) return 'Has multiplicado $(u\\bullet v)\\,u$ sin dividir entre $u\\bullet u=' + uu + '$.';
        if (!dist(a, v)) return 'Esa es $v$ entera. La proyección es el múltiplo de $u$ más cercano a $v$.';
        var p = a[0] * u[0] + a[1] * u[1] + a[2] * u[2];
        return 'La proyección debe ser múltiplo de $u$ y $v-\\operatorname{proy}$ ortogonal a $u$; con tu respuesta no se cumple.';
      }
    };
  };

  /* 6.2 · matriz simétrica de una forma cuadrática */
  G.qmat = function (seed) {
    var R = Rnd(seed), a = R.ri(-3, 3), b = R.ri(-3, 3), c = R.ri(-3, 3), d, e, f;
    do { d = R.ri(-4, 4); e = R.ri(-4, 4); f = R.ri(-4, 4); } while (d % 2 === 0 && e % 2 === 0 && f % 2 === 0);
    var S = [a, d / 2, e / 2, b, f / 2, c];
    var Q = [[a, 'x_1^2'], [b, 'x_2^2'], [c, 'x_3^2'], [d, 'x_1x_2'], [e, 'x_1x_3'], [f, 'x_2x_3']];
    var txt = comb(Q.map(function (t) { return t[0]; }), Q.map(function (t) { return t[1]; }));
    return {
      tipo: 'nums', n: 6, ans: S, data: { co: [a, b, c, d, e, f], ans: S },
      enun: 'La forma cuadrática $Q(x)=' + txt + '$ tiene matriz simétrica $S=(a_{ij})$. Escribe $(a_{11},a_{12},a_{13},a_{22},a_{23},a_{33})$ (admite decimales o fracciones).',
      sol: 'Los coeficientes de $x_i^2$ van a la diagonal y cada término cruzado $x_ix_j$ se reparte <b>a medias</b> entre $a_{ij}$ y $a_{ji}$: $(' + S.join(',') + ')$.',
      diag: function (u) {
        if (!dist(u, [a, d, e, b, f, c])) return 'No has partido los términos cruzados por la mitad: el coeficiente de $x_ix_j$ es $2a_{ij}$.';
        if (!dist(u, [a, d / 2, e / 2, c, f / 2, b])) return 'Revisa el orden: $a_{22}$ es el coeficiente de $x_2^2$ y $a_{33}$ el de $x_3^2$.';
        return 'Revisa: $a_{ii}$ = coeficiente de $x_i^2$ y $a_{ij}=\\tfrac12\\cdot(\\text{coef. de }x_ix_j)$.';
      }
    };
  };

  /* 6.3 · clasificación con Sylvester (2×2) */
  G.sylv = function (seed) {
    var R = Rnd(seed), a, b, c, D;
    do { a = R.ri(-3, 3); b = R.ri(-3, 3); c = R.ri(-3, 3); D = a * c - b * b; } while (a === 0 && c === 0 && b === 0);
    var cat = D > 0 ? (a > 0 ? 0 : 1) : D < 0 ? 2 : 3;
    var nom = ['Definida positiva', 'Definida negativa', 'Indefinida', 'Semidefinida (positiva o negativa)'];
    var rz = D > 0 ? '$\\Delta_1=' + a + '$ y $\\Delta_2=' + D + '>0$: ' + (a > 0 ? 'ambos positivos, definida positiva.' : '$\\Delta_1<0$ y $\\Delta_2>0$: definida negativa.') :
      D < 0 ? '$\\Delta_2=' + D + '<0$: autovalores de distinto signo, indefinida.' : '$\\Delta_2=0$: algún autovalor es $0$, semidefinida (o nula).';
    return {
      tipo: 'choice', data: { a: a, b: b, c: c, cat: cat },
      enun: 'Clasifica la forma cuadrática de matriz $S=' + rmat([[a, b], [b, c]]) + '$.',
      opts: nom.map(function (t, i) { return { t: t, ok: i === cat, why: i === cat ? '' : rz }; }),
      sol: rz
    };
  };

  /* ====== Generadores (lote 3) ====== */
  function opcs(lista, cat, razon) { return lista.map(function (t, i) { return { t: t, ok: i === cat, why: i === cat ? '' : razon }; }); }

  /* 2.2 · ¿libres o ligados? (tres vectores de ℝ³) */
  G.libre3 = function (seed) {
    var q = G.base3(seed), d = q.data, D = d.det, li = D !== 0, u = d.u;
    return { tipo: 'choice', data: { u: u, det: D, libre: li },
      enun: '¿Son linealmente independientes (libres) los vectores $u_1=' + V(u[0]) + '$, $u_2=' + V(u[1]) + '$, $u_3=' + V(u[2]) + '$ de $\\mathbb R^3$?',
      opts: [{ t: 'Libres', ok: li, why: li ? '' : '$\\det=0$: alguno es combinación de los otros, así que son ligados.' }, { t: 'Ligados', ok: !li, why: !li ? '' : '$\\det=' + D + '\\neq0$: la única combinación nula es la trivial, son libres.' }],
      sol: 'Tres vectores de $\\mathbb R^3$: $\\det=' + D + (li ? '\\neq0$, libres.' : '=0$, ligados.') };
  };

  /* 2.1 · ¿es subespacio? */
  G.subesp = function (seed) {
    var R = Rnd(seed), k = R.ri(0, 5), a = R.pick([1, 2, -1, 3]), b = R.pick([1, -2, 2]), c = R.pick([1, -1, 3]), ok = false, txt, why;
    var cj = function (s) { return '$W=\\{x\\in\\mathbb R^3:\\ ' + s + '\\}$'; };
    if (k === 0) { txt = cj(comb([a, b, c], ['x_1', 'x_2', 'x_3']) + '=0'); ok = true; why = 'Ecuación lineal homogénea: contiene $0$ y es cerrado para suma y producto por escalares.'; }
    else if (k === 1) { var h = R.pick([1, 2, 3]); txt = cj(comb([a, b, c], ['x_1', 'x_2', 'x_3']) + '=' + h); why = 'No contiene el vector nulo: $0$ no cumple la ecuación (vale $0\\neq' + h + '$).'; }
    else if (k === 2) { txt = cj('x_1x_2=0'); why = 'No es cerrado para la suma: $(1,0,0)$ y $(0,1,0)$ están en $W$ pero su suma $(1,1,0)$ no.'; }
    else if (k === 3) { txt = cj('x_1\\ge0'); why = 'No es cerrado para el producto por escalares: $(1,0,0)\\in W$ pero $(-1)(1,0,0)=(-1,0,0)\\notin W$.'; }
    else if (k === 4) { txt = cj('x_1=x_2,\\ x_3=0'); ok = true; why = 'Es la recta $\\langle(1,1,0)\\rangle$: contiene $0$ y es cerrado.'; }
    else { txt = cj('x_1=x_2^2'); why = 'No es cerrado para el producto: $(1,1,0)\\in W$ pero $2(1,1,0)=(2,2,0)\\notin W$ ($2\\neq4$).'; }
    return { tipo: 'choice', data: { k: k, ok: ok, c: [a, b, c] }, enun: '¿Es subespacio de $\\mathbb R^3$ el conjunto ' + txt + '?',
      opts: [{ t: 'Sí, es subespacio', ok: ok, why: ok ? '' : why }, { t: 'No es subespacio', ok: !ok, why: !ok ? '' : why }], sol: why };
  };

  /* 2.4 · fórmula de Grassmann */
  G.grass = function (seed) {
    var R = Rnd(seed), n = R.ri(4, 6), dU = R.ri(2, n - 1), dW = R.ri(2, n - 1), lo = Math.max(0, dU + dW - n), hi = Math.min(dU, dW), k = R.ri(lo, hi), s = dU + dW - k;
    return { tipo: 'nums', n: 1, ans: [s], data: { n: n, dU: dU, dW: dW, k: k, ans: s },
      enun: 'En $\\mathbb R^' + n + '$ hay subespacios $U$ y $W$ con $\\operatorname{Dim}U=' + dU + '$, $\\operatorname{Dim}W=' + dW + '$ y $\\operatorname{Dim}(U\\cap W)=' + k + '$. ¿Cuánto vale $\\operatorname{Dim}(U+W)$?',
      sol: 'Fórmula de Grassmann: $\\operatorname{Dim}(U+W)=' + dU + '+' + dW + '-' + k + '=' + s + '$ (y no puede pasar de ' + n + ').',
      diag: function (a) {
        if (eq(a[0], dU + dW)) return 'Has sumado las dimensiones sin restar la intersección: $\\operatorname{Dim}(U+W)=\\operatorname{Dim}U+\\operatorname{Dim}W-\\operatorname{Dim}(U\\cap W)$.';
        if (a[0] > n) return 'No puede superar la dimensión del espacio total ($' + n + '$).';
        return 'Aplica Grassmann: $' + dU + '+' + dW + '-' + k + '$.';
      } };
  };

  /* 3.1 · ¿es lineal? */
  G.lineal = function (seed) {
    var R = Rnd(seed), k = R.ri(0, 4), a = R.ri(1, 3), b = R.ri(-2, 2), c = R.ri(-2, 2), d = R.ri(1, 3), ok = false, f, why;
    var lin2 = function (p, q) { return comb([p, q], ['x', 'y']); };
    if (k === 0) { f = '(' + lin2(a, b) + ',\\ ' + lin2(c, d) + ')'; ok = true; why = 'Cada componente es una combinación lineal de $x,y$ sin término independiente: es lineal.'; }
    else if (k === 1) { var h = R.pick([1, 2, 3]); f = '(' + lin2(a, b) + '+' + h + ',\\ ' + lin2(c, d) + ')'; why = 'El término constante $' + h + '$ hace $f(0,0)=(' + h + ',0)\\neq(0,0)$: no es lineal.'; }
    else if (k === 2) { f = '(xy,\\ ' + lin2(c, d) + ')'; why = 'Aparece el producto $xy$: $f(2x,2y)$ da $4xy$ y no $2xy$, no conserva el producto por escalares.'; }
    else if (k === 3) { f = '(x^2,\\ ' + lin2(c, d) + ')'; why = 'Con $x^2$: $f(2,0)=(4,\\ldots)$ y $2f(1,0)=(2,\\ldots)$, no conserva el producto por escalares.'; }
    else { f = '(' + lin2(a, b) + ',\\ |y|)'; why = 'Con $|y|$: $f(0,-1)$ y $(-1)f(0,1)$ no coinciden, no es lineal.'; }
    return { tipo: 'choice', data: { k: k, ok: ok }, enun: '¿Es lineal $f:\\mathbb R^2\\to\\mathbb R^2$, $f(x,y)=' + f + '$?',
      opts: [{ t: 'Sí', ok: ok, why: ok ? '' : why }, { t: 'No', ok: !ok, why: !ok ? '' : why }], sol: why };
  };

  /* 3.3 · matriz asociada en bases canónicas (ℝ² → ℝ³) */
  G.matf = function (seed) {
    var R = Rnd(seed), M = randMat(R, 3, 2, -3, 3), f = '(' + [0, 1, 2].map(function (i) { return comb(M[i], ['x', 'y']); }).join(',\\ ') + ')';
    var Mt = [[M[0][0], M[1][0], M[2][0]], [M[0][1], M[1][1], M[2][1]]];
    return { tipo: 'nums', n: 6, ans: flat(M), data: { M: M, ans: flat(M) },
      enun: 'Para $f:\\mathbb R^2\\to\\mathbb R^3$, $f(x,y)=' + f + '$, escribe por filas la matriz asociada en las bases canónicas (3 filas, 2 columnas: $a_{11},a_{12},a_{21},a_{22},a_{31},a_{32}$).',
      sol: 'Las columnas son $f(1,0)$ y $f(0,1)$: $A=' + pm(M) + '$.',
      diag: function (a) {
        if (a.length === 6 && !dist(a, flat(Mt))) return 'Has escrito la traspuesta. Las <b>columnas</b> de $A$ son las imágenes $f(e_1)$ y $f(e_2)$, y $A$ tiene 3 filas.';
        return 'Calcula $f(1,0)$ y $f(0,1)$ y ponlos como columnas.';
      } };
  };

  /* 3.4 · matriz de una combinación λf + μg */
  G.comb22 = function (seed) {
    var R = Rnd(seed), A = randMat(R, 2, 2, -3, 3), B = randMat(R, 2, 2, -3, 3), l = R.pick([2, 3, -1, -2]), m = R.pick([2, -1, 3, -2]);
    var C = A.map(function (r, i) { return r.map(function (x, j) { return l * x + m * B[i][j] + 0; }); });
    var sinB = A.map(function (r, i) { return r.map(function (x, j) { return l * x + B[i][j]; }); });
    var sinA = A.map(function (r, i) { return r.map(function (x, j) { return x + m * B[i][j]; }); });
    var tx = function (k, s) { return (k === 1 ? '' : k === -1 ? '-' : k) + s; };
    return { tipo: 'nums', n: 4, ans: flat(C), data: { A: A, B: B, l: l, m: m, ans: flat(C) },
      enun: 'Si $f$ y $g$ tienen matrices $A=' + pm(A) + '$ y $B=' + pm(B) + '$, calcula la matriz de $' + l + 'f' + (m < 0 ? m : '+' + m) + 'g$ (por filas).',
      sol: 'La matriz de $\\lambda f+\\mu g$ es $\\lambda A+\\mu B$: $' + l + 'A+(' + m + ')B=' + pm(C) + '$.',
      diag: function (a) {
        if (!dist(a, flat(sinB))) return 'Has olvidado multiplicar $B$ por $' + m + '$: la combinación es $' + l + 'A+(' + m + ')B$.';
        if (!dist(a, flat(sinA))) return 'Has olvidado multiplicar $A$ por $' + l + '$.';
        return 'Calcula entrada a entrada $' + l + 'a_{ij}+(' + m + ')b_{ij}$.';
      } };
  };

  /* 4.1 · ¿son semejantes? (2×2 con valores propios distintos) */
  G.semej = function (seed) {
    var R = Rnd(seed), l1, l2, k, m, k2, m2, A, B, sim = R.p(0.5), mk = function (l1, l2, k, m) { return matmul(matmul([[1, k], [m, 1 + k * m]], [[l1, 0], [0, l2]]), [[1 + k * m, -k], [-m, 1]]); };
    do { l1 = R.ri(-3, 4); l2 = R.ri(-3, 4); } while (l1 >= l2);
    k = R.pick([0, 1, 2]); m = R.pick([1, -1, 2]); A = mk(l1, l2, k, m);
    do { k2 = R.pick([-1, 0, 1, 2]); m2 = R.pick([1, 2, -1]); } while (k2 === k && m2 === m);
    if (sim) B = mk(l1, l2, k2, m2);
    else { var m3 = l1 + R.pick([1, 2, 3]); B = mk(m3, l2, k2, m2); }
    var tA = A[0][0] + A[1][1], dA = det2(A[0][0], A[0][1], A[1][0], A[1][1]), tB = B[0][0] + B[1][1], dB = det2(B[0][0], B[0][1], B[1][0], B[1][1]);
    var razon = sim ? 'Tienen la misma traza ($' + tA + '$) y el mismo determinante ($' + dA + '$): mismo polinomio característico con raíces distintas $\\Rightarrow$ ambas se diagonalizan a $\\operatorname{diag}(' + l1 + ',' + l2 + ')$ y son semejantes.' :
      'No tienen el mismo polinomio característico: traza $' + tA + '$ frente a $' + tB + '$ y determinante $' + dA + '$ frente a $' + dB + '$. Matrices semejantes comparten traza y determinante.';
    return { tipo: 'choice', data: { A: A, B: B, sim: sim }, enun: '¿Son semejantes $A=' + pm(A) + '$ y $B=' + pm(B) + '$?',
      opts: [{ t: 'Sí', ok: sim, why: sim ? '' : razon }, { t: 'No', ok: !sim, why: !sim ? '' : razon }], sol: razon };
  };

  /* 4.4 · tamaños de los bloques de Jordan (3×3, un único valor propio) */
  G.jordan3 = function (seed) {
    var R = Rnd(seed), l = R.ri(-2, 3), r = R.ri(0, 2), d = 3 - r, cat = d === 3 ? 2 : d === 2 ? 1 : 0;
    var nom = ['Un bloque $3\\times3$', 'Dos bloques: uno $2\\times2$ y uno $1\\times1$', 'Tres bloques $1\\times1$ (diagonal)'];
    var razon = 'El nº de bloques es $d=n-\\operatorname{rang}(A-\\lambda I)=3-' + r + '=' + d + '$; con $\\alpha=3$ los tamaños suman 3: ' + ['una cadena de longitud 3', 'tamaños $2+1$', 'tamaños $1+1+1$'][cat] + '.';
    return { tipo: 'choice', data: { l: l, r: r, d: d, cat: cat },
      enun: '$A$ es $3\\times3$ con un único valor propio $\\lambda=' + l + '$ de multiplicidad algebraica $3$ y $\\operatorname{rang}(A-' + (l < 0 ? '(' + l + ')' : l) + 'I)=' + r + '$. ¿Cómo es su forma de Jordan?',
      opts: nom.map(function (t, i) { return { t: t, ok: i === cat, why: i === cat ? '' : razon }; }), sol: razon };
  };

  /* 5.2 · ¿es ortogonal una 2×2? */
  G.ortog2 = function (seed) {
    var R = Rnd(seed), t = R.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [20, 21, 29]]), a = t[0], b = t[1], c = t[2], caso = R.ri(0, 2), M, den = c, ok = false, razon;
    if (caso === 0) { M = [[a, -b], [b, a]]; ok = true; razon = 'Las columnas $(' + a + ',' + b + ')/' + c + '$ y $(' + (-b) + ',' + a + ')/' + c + '$ son ortogonales y de norma $1$ ($' + a + '^2+' + b + '^2=' + c + '^2$): $A^tA=I$.'; }
    else if (caso === 1) { M = [[a, b], [b, a]]; razon = 'Las columnas $(' + a + ',' + b + ')$ y $(' + b + ',' + a + ')$ no son ortogonales: su producto escalar es $' + 2 * a * b + '\\neq0$.'; }
    else { M = [[a, -b], [b, a]]; den = c + 1; razon = 'Las columnas son ortogonales, pero su norma es $' + c + '/' + den + '\\neq1$: no está normalizada.'; }
    return { tipo: 'choice', data: { M: M, den: den, ok: ok }, enun: '¿Es ortogonal $A=\\dfrac1{' + den + '}' + pm(M) + '$?',
      opts: [{ t: 'Sí', ok: ok, why: ok ? '' : razon }, { t: 'No', ok: !ok, why: !ok ? '' : razon }], sol: razon };
  };

  /* 5.3 · valores propios de una simétrica 2×2 */
  G.simet2 = function (seed) {
    var R = Rnd(seed), a = R.ri(-3, 4), b = R.pick([1, 2, 3, -1, -2]), l1 = a - Math.abs(b), l2 = a + Math.abs(b);
    return { tipo: 'nums', n: 2, ans: [l1, l2], data: { a: a, b: b, ans: [l1, l2] },
      enun: 'Halla los valores propios de la matriz simétrica $A=' + pm([[a, b], [b, a]]) + '$ (de menor a mayor). Se diagonaliza ortogonalmente con $P=\\tfrac1{\\sqrt2}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}$.',
      sol: '$(a-\\lambda)^2-b^2=0\\Rightarrow\\lambda=a\\pm|b|=' + l1 + ',\\ ' + l2 + '$ (autovectores $(1,1)$ y $(1,-1)$).',
      diag: function (u) {
        if (eq(u[0], l2) && eq(u[1], l1)) return 'Escríbelos de menor a mayor.';
        if (eq(u[0], a) && eq(u[1], b)) return 'Esos son los datos de la matriz; los valores propios son $a\\pm|b|$.';
        return 'Comprueba: su suma es la traza ($' + 2 * a + '$) y su producto el determinante ($' + (a * a - b * b) + ').';
      } };
  };

  /* 5.4 · recta de mínimos cuadrados por tres puntos (1,y1), (2,y2), (3,y3) */
  G.recta3 = function (seed) {
    var R = Rnd(seed), y, m, n;
    do { y = [R.ri(0, 6), R.ri(0, 6), R.ri(0, 6)]; } while (y[0] - 2 * y[1] + y[2] === 0);
    m = (y[2] - y[0]) / 2; n = (y[0] + y[1] + y[2]) / 3 - 2 * m;
    var m2 = (y[2] - y[0]) / 2, n2 = y[0] - m2;
    return { tipo: 'nums', n: 2, ans: [m, n], data: { y: y, ans: [m, n] },
      enun: 'Ajusta por mínimos cuadrados una recta $y=mx+n$ a los puntos $(1,' + y[0] + ')$, $(2,' + y[1] + ')$, $(3,' + y[2] + ')$. Escribe $(m,n)$ (admite fracciones).',
      sol: 'Ecuaciones normales $A^tAX=A^tB$ con $A=\\begin{pmatrix}1&1\\\\2&1\\\\3&1\\end{pmatrix}$: $14m+6n=' + (y[0] + 2 * y[1] + 3 * y[2]) + '$, $6m+3n=' + (y[0] + y[1] + y[2]) + '$ $\\Rightarrow m=' + fr(y[2] - y[0], 2) + ',\\ n=' + fr(4 * y[0] + y[1] - 2 * y[2], 3) + '$.',
      diag: function (u) {
        if (eq(u[0], m2) && eq(u[1], n2)) return 'Esa es la recta por el primer y el último punto: no usa el del medio. Por mínimos cuadrados salen las ecuaciones normales.';
        if (eq(u[0], n) && eq(u[1], m)) return 'Tienes la pendiente y el término independiente cambiados de orden.';
        return 'Plantea $A^tAX=A^tB$: $14m+6n=' + (y[0] + 2 * y[1] + 3 * y[2]) + '$ y $6m+3n=' + (y[0] + y[1] + y[2]) + '$.';
      } };
  };

  /* 6.1 · evaluar una forma bilineal x^t A y */
  G.bilin = function (seed) {
    var R = Rnd(seed), A, x, y, v, vt;
    do { A = randMat(R, 2, 2, -3, 3); x = [R.ri(-3, 3), R.ri(-3, 3)]; y = [R.ri(-3, 3), R.ri(-3, 3)];
      v = x[0] * (A[0][0] * y[0] + A[0][1] * y[1]) + x[1] * (A[1][0] * y[0] + A[1][1] * y[1]);
      vt = y[0] * (A[0][0] * x[0] + A[0][1] * x[1]) + y[1] * (A[1][0] * x[0] + A[1][1] * x[1]);
    } while (v === vt || A[0][1] === A[1][0]);
    v = v + 0;
    return { tipo: 'nums', n: 1, ans: [v], data: { A: A, x: x, y: y, ans: v },
      enun: 'La forma bilineal $f$ tiene matriz $A=' + pm(A) + '$ en la base canónica. Calcula $f(x,y)$ para $x=' + V(x) + '$, $y=' + V(y) + '$.',
      sol: '$f(x,y)=x^tAy=' + v + '$ (primero $Ay$, luego se multiplica por $x^t$).',
      diag: function (a) { return eq(a[0], vt) ? 'Has calculado $f(y,x)$: como $A$ no es simétrica, el orden importa. Es $x^tAy$.' : 'Calcula $Ay$ y luego $x^t(Ay)$.'; } };
  };

  /* 6.4 · tipo de cónica por la parte cuadrática */
  G.conica = function (seed) {
    var R = Rnd(seed), caso = R.ri(0, 2), p, q, a, b, c, d, e, f, nom = ['Elipse', 'Parábola', 'Hipérbola'], cat, txt;
    if (caso === 0) { a = R.pick([1, 2, 3]); c = R.pick([1, 2, 3]); b = R.pick([-1, 0, 1]); while (b * b - 4 * a * c >= 0) { c++; } d = 0; e = 0; f = -1; cat = 0; }
    else if (caso === 1) { p = R.pick([1, 2]); q = R.pick([1, -1, 2]); a = p * p; b = 2 * p * q; c = q * q; d = R.pick([1, 2, -1]); e = R.pick([1, -2, 3]); while (d * q - e * p === 0) e++; f = 0; cat = 1; }
    else { a = R.pick([1, 2]); c = -R.pick([1, 2]); b = R.pick([-1, 0, 1]); d = R.pick([0, 2]); e = 0; f = -1; cat = 2; }
    txt = comb([a, b, c, d, e], ['x^2', 'xy', 'y^2', 'x', 'y']) + (f === 0 ? '' : (f < 0 ? '-' : '+') + Math.abs(f)) + '=0';
    var disc = b * b - 4 * a * c, razon = 'El discriminante de la parte cuadrática es $b^2-4ac=' + b + '^2-4(' + a + ')(' + c + ')=' + disc + '$: ' + (disc < 0 ? 'negativo $\\Rightarrow$ elipse.' : disc === 0 ? 'cero $\\Rightarrow$ parábola.' : 'positivo $\\Rightarrow$ hipérbola.');
    return { tipo: 'choice', data: { co: [a, b, c, d, e, f], cat: cat }, enun: 'Clasifica la cónica $' + txt + '$ (no degenerada).',
      opts: nom.map(function (t, i) { return { t: t, ok: i === cat, why: i === cat ? '' : razon }; }), sol: razon };
  };

  /* 6.5 · nombre de una cuádrica en forma canónica */
  G.cuadrica = function (seed) {
    var R = Rnd(seed), L = [['x_1^2+x_2^2+x_3^2=1', 'Elipsoide'], ['x_1^2+x_2^2-x_3^2=1', 'Hiperboloide de una hoja'], ['x_1^2-x_2^2-x_3^2=1', 'Hiperboloide de dos hojas'], ['x_1^2+x_2^2-x_3^2=0', 'Cono'], ['x_1^2+x_2^2=1', 'Cilindro elíptico'], ['x_1^2+x_2^2+x_3^2=-1', 'Elipsoide imaginario'], ['x_1^2+x_2^2=x_3', 'Paraboloide elíptico'], ['x_1^2-x_2^2=x_3', 'Paraboloide hiperbólico']];
    var i = R.ri(0, L.length - 1), pool = R.shuf(L.filter(function (_, j) { return j !== i; })).slice(0, 3).map(function (x) { return x[1]; });
    var nombres = R.shuf([L[i][1]].concat(pool)), cat = nombres.indexOf(L[i][1]);
    var razon = '$' + L[i][0] + '$ es un ' + L[i][1].toLowerCase() + ': ' + (i === 0 ? 'tres cuadrados positivos igualados a $1$.' : i === 1 ? 'dos signos $+$ y uno $-$ con $=1$: una hoja.' : i === 2 ? 'un $+$ y dos $-$ con $=1$: dos hojas.' : i === 3 ? 'signos $(+,+,-)$ con $=0$.' : i === 4 ? 'falta $x_3$: es un cilindro sobre una elipse.' : i === 5 ? 'tres cuadrados positivos igualados a un número negativo: no hay puntos reales.' : i === 6 ? 'un término lineal y dos cuadrados del mismo signo.' : 'un término lineal y dos cuadrados de signo opuesto.');
    return { tipo: 'choice', data: { i: i, nombre: L[i][1] }, enun: '¿Qué cuádrica es $' + L[i][0] + '$?',
      opts: nombres.map(function (t, j) { return { t: t, ok: j === cat, why: j === cat ? '' : razon }; }), sol: razon };
  };

  /* 1.5 / 2.1 · elemento neutro de una operación */
  G.neutro = function (seed) {
    var R = Rnd(seed), k = R.ri(0, 2), c = R.pick([1, 2, 3, -1]), op, e;
    if (k === 0) { op = 'a*b=a+b+' + c; if (c < 0) op = 'a*b=a+b' + c; e = -c; }
    else if (k === 1) { op = 'a*b=ab-a-b+2'; e = 2; }
    else { op = 'a*b=a+b-2ab'; e = 0; }
    var comprobar = k === 0 ? '$a*e=a+e+(' + c + ')=a\\Rightarrow e=' + (-c) + '$.' : k === 1 ? '$a*e=ae-a-e+2=a\\Rightarrow e(a-1)=2(a-1)\\Rightarrow e=2$.' : '$a*e=a+e-2ae=a\\Rightarrow e(1-2a)=0\\Rightarrow e=0$.';
    return { tipo: 'nums', n: 1, ans: [e], data: { k: k, c: c, ans: e }, enun: 'En $\\mathbb R$ se define $' + op + '$. ¿Cuál es su elemento neutro $e$ (con $a*e=e*a=a$ para todo $a$)?',
      sol: comprobar, diag: function (a) { return (k === 0 && eq(a[0], c)) ? 'Tienes el signo cambiado: despeja $e$ de $a*e=a$.' : 'Resuelve $a*e=a$ para todo $a$ y despeja $e$.'; } };
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
