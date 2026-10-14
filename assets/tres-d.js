/* Figuras 3D interactivas (three.js r147 local, assets/vendor/). Se cargan solo en las páginas que las usan.
   .d3-planos  data-n="3" data-v="1,1,1,3;1,-1,0,0;0,1,-1,1" [data-hom="1"]     sistemas de planos (ax+by+cz=d)
   .d3-vect    data-modo="span|det" data-u="1,0,0" data-v="0,1,0" data-w="0,0,1"  vectores de R3: subespacio generado / volumen
   .d3-nuc     data-m="1,0,0;0,1,0;0,0,0"                                         núcleo e imagen de f(x)=A·x, R3 -> R3
   Arrastrar = girar, rueda / pellizco = zoom. */
(function () {
  'use strict';
  var base = (function () { var s = document.currentScript; return s && s.src ? s.src.replace(/[^\/]*$/, '') : '../assets/'; })();
  var MINUS = '−', EPS = 1e-9;
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function html(e, h) { e.innerHTML = h; return e; }
  function num(x) { var v = Math.round(x * 100) / 100; return String(v).replace('-', MINUS); }
  function numInput(val, w) { var i = el('input', 'an-in'); i.type = 'number'; i.value = val; i.step = 1; if (w) i.style.width = w; return i; }
  function slider(min, max, step, val) { var s = el('input', 'an-sl'); s.type = 'range'; s.min = min; s.max = max; s.step = step; s.value = val; return s; }
  function btnRow(items, fn) { var d = el('div', 'sar-ctrl an-presets'); items.forEach(function (it, i) { var b = el('button', '', it); b.type = 'button'; b.addEventListener('click', function () { fn(i); }); d.appendChild(b); }); return d; }
  function css(name, fb) { var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim(); return v || fb; }

  /* ---------- álgebra numérica pequeña ---------- */
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function norm(a) { return Math.sqrt(dot(a, a)); }
  function isZero(a) { return norm(a) < 1e-9; }
  function det3(u, v, w) { return dot(u, cross(v, w)); }
  function rankOf(rows) {
    var M = rows.map(function (r) { return r.slice(); }), r = 0, n = M.length ? M[0].length : 0;
    for (var c = 0; c < n && r < M.length; c++) {
      var p = r; for (var i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
      if (Math.abs(M[p][c]) < 1e-9) continue;
      var t = M[r]; M[r] = M[p]; M[p] = t;
      for (var j = r + 1; j < M.length; j++) { var f = M[j][c] / M[r][c]; for (var k = c; k < n; k++) M[j][k] -= f * M[r][k]; }
      r++;
    }
    return r;
  }
  function nullspace(A) {                       // A: filas (3 columnas); devuelve base del núcleo
    var M = A.map(function (r) { return r.slice(); }), n = 3, piv = [], r = 0;
    for (var c = 0; c < n && r < M.length; c++) {
      var p = r; for (var i = r + 1; i < M.length; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
      if (Math.abs(M[p][c]) < 1e-9) continue;
      var t = M[r]; M[r] = M[p]; M[p] = t;
      var d = M[r][c]; for (var k = 0; k < n; k++) M[r][k] /= d;
      for (var j = 0; j < M.length; j++) if (j !== r) { var f = M[j][c]; for (var k2 = 0; k2 < n; k2++) M[j][k2] -= f * M[r][k2]; }
      piv.push(c); r++;
    }
    var basis = [];
    for (var fc = 0; fc < n; fc++) if (piv.indexOf(fc) < 0) {
      var v = [0, 0, 0]; v[fc] = 1;
      for (var q = 0; q < piv.length; q++) v[piv[q]] = -M[q][fc];
      basis.push(v);
    }
    return basis;
  }
  function colBasis(A) {                        // columnas independientes de A (3x3)
    var cols = [0, 1, 2].map(function (j) { return [A[0][j], A[1][j], A[2][j]]; }), out = [];
    cols.forEach(function (c) { if (rankOf(out.concat([c])) > out.length) out.push(c); });
    return out;
  }

  /* ---------- carga de three.js bajo demanda ---------- */
  var loading = null;
  function loadScript(src) { return new Promise(function (ok, ko) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = function () { ko(new Error('No se pudo cargar ' + src)); }; document.head.appendChild(s); }); }
  function loadThree() {
    if (window.THREE && THREE.OrbitControls) return Promise.resolve();
    if (!loading) loading = loadScript(base + 'vendor/three.min.js').then(function () { return loadScript(base + 'vendor/OrbitControls.js'); });
    return loading;
  }

  /* ---------- escena genérica ---------- */
  function makeScene(parent, R, aspect, maxW) {
    var T = THREE, MW = maxW || 520, W = Math.min(parent.clientWidth || MW, MW), H = Math.round(W * (aspect || 0.8));
    var wrap = el('div', 'd3-wrap'); parent.appendChild(wrap);
    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); }
    catch (e) { wrap.appendChild(el('p', 'sar-hint', 'Tu navegador no puede mostrar gráficos 3D (WebGL).')); return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(W, H);
    renderer.domElement.className = 'd3-canvas'; wrap.appendChild(renderer.domElement);
    wrap.appendChild(el('span', 'd3-help', 'Arrastra para girar · rueda/pellizco para acercar'));
    var scene = new T.Scene(), camera = new T.PerspectiveCamera(38, W / H, 0.1, 200);
    camera.up.set(0, 0, 1); camera.position.set(R * 3.0, -R * 3.4, R * 2.2);
    var controls = new T.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false; controls.minDistance = R * 1.4; controls.maxDistance = R * 12; controls.target.set(0, 0, 0);
    var stat = new T.Group(), dyn = new T.Group(); scene.add(stat); scene.add(dyn);
    var S = { T: T, R: R, scene: scene, camera: camera, renderer: renderer, controls: controls, stat: stat, dyn: dyn, wrap: wrap };
    function clear(g) { while (g.children.length) { var c = g.children[0]; g.remove(c); dispose(c); } }
    function dispose(o) { if (o.geometry) o.geometry.dispose(); if (o.material) { if (o.material.map) o.material.map.dispose(); o.material.dispose(); } o.children && o.children.slice().forEach(dispose); }
    S.clearDyn = function () { clear(dyn); };
    S.render = function () { renderer.render(scene, camera); };
    controls.addEventListener('change', S.render);
    S.buildStatic = function () {
      clear(stat);
      var fg = css('--fg', '#1c2230'), mut = css('--mut', '#5d6675');
      var box = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(2 * R, 2 * R, 2 * R)), new T.LineBasicMaterial({ color: mut, transparent: true, opacity: 0.35 })); stat.add(box);
      var grid = new T.GridHelper(2 * R, 2 * R, mut, mut); grid.rotation.x = Math.PI / 2; grid.position.z = -R; grid.material.transparent = true; grid.material.opacity = 0.25; stat.add(grid);
      [['x', [1, 0, 0], '#d9434a'], ['y', [0, 1, 0], '#2e9e5b'], ['z', [0, 0, 1], '#2a6fd3']].forEach(function (a) {
        var d = new T.Vector3(a[1][0], a[1][1], a[1][2]);
        stat.add(new T.Line(new T.BufferGeometry().setFromPoints([d.clone().multiplyScalar(-R), d.clone().multiplyScalar(R)]), new T.LineBasicMaterial({ color: fg, transparent: true, opacity: 0.55 })));
        stat.add(new T.ArrowHelper(d, d.clone().multiplyScalar(R), 0.01, a[2], 0.5, 0.25));
        stat.add(S.label(a[0], d.clone().multiplyScalar(R + 0.55), a[2], 0.8));
      });
      S.render();
    };
    S.label = function (txt, pos, color, size) {
      var c = document.createElement('canvas'); c.width = 128; c.height = 128; var g = c.getContext('2d');
      g.font = 'italic 700 80px Georgia, serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = color || '#000'; g.fillText(txt, 64, 70);
      var sp = new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(c), transparent: true, depthTest: false }));
      sp.position.copy(pos instanceof T.Vector3 ? pos : new T.Vector3(pos[0], pos[1], pos[2])); var s = size || 0.8; sp.scale.set(s, s, 1); sp.renderOrder = 10; return sp;
    };
    S.arrow = function (to, color, label, from) {
      var o = from || [0, 0, 0], d = [to[0] - o[0], to[1] - o[1], to[2] - o[2]], L = norm(d);
      if (L < 1e-6) return;
      var hl = Math.min(0.55, L * 0.3);
      dyn.add(new T.ArrowHelper(new T.Vector3(d[0] / L, d[1] / L, d[2] / L), new T.Vector3(o[0], o[1], o[2]), L, color, hl, hl * 0.5));
      if (label) dyn.add(S.label(label, [to[0] + d[0] / L * 0.55, to[1] + d[1] / L * 0.55, to[2] + d[2] / L * 0.55 + 0.1], color, 0.75));
    };
    S.sphere = function (p, color, r) { var m = new T.Mesh(new T.SphereGeometry(r || 0.17, 20, 14), new T.MeshBasicMaterial({ color: color })); m.position.set(p[0], p[1], p[2]); dyn.add(m); };
    S.tube = function (a, b, color, r) {
      var A = new T.Vector3(a[0], a[1], a[2]), B = new T.Vector3(b[0], b[1], b[2]), L = A.distanceTo(B); if (L < 1e-6) return;
      var m = new T.Mesh(new T.CylinderGeometry(r || 0.07, r || 0.07, L, 10), new T.MeshBasicMaterial({ color: color }));
      m.position.copy(A.clone().add(B).multiplyScalar(0.5)); m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), B.clone().sub(A).normalize()); dyn.add(m);
    };
    S.line = function (p, d, color, r) {            // recta p + t d recortada al cubo
      var t0 = -1e9, t1 = 1e9;
      for (var i = 0; i < 3; i++) {
        if (Math.abs(d[i]) < 1e-12) { if (Math.abs(p[i]) > R + 1e-9) return; }
        else { var a = (-R - p[i]) / d[i], b = (R - p[i]) / d[i]; if (a > b) { var t = a; a = b; b = t; } t0 = Math.max(t0, a); t1 = Math.min(t1, b); }
      }
      if (t0 > t1) return;
      S.tube([p[0] + t0 * d[0], p[1] + t0 * d[1], p[2] + t0 * d[2]], [p[0] + t1 * d[0], p[1] + t1 * d[1], p[2] + t1 * d[2]], color, r);
    };
    S.plane = function (n, d, color, opacity) {     // plano n·x = d recortado al cubo
      var N = norm(n); if (N < 1e-9) return;
      var pts = [], cv = [];
      for (var i = 0; i < 8; i++) cv.push([(i & 1 ? R : -R), (i & 2 ? R : -R), (i & 4 ? R : -R)]);
      [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]].forEach(function (e) {
        var p0 = cv[e[0]], p1 = cv[e[1]], f0 = dot(n, p0) - d, f1 = dot(n, p1) - d, p = null;
        if (Math.abs(f0) < 1e-9) p = p0; else if (Math.abs(f1) < 1e-9) p = p1; else if (f0 * f1 < 0) { var t = f0 / (f0 - f1); p = [p0[0] + t * (p1[0] - p0[0]), p0[1] + t * (p1[1] - p0[1]), p0[2] + t * (p1[2] - p0[2])]; }
        if (p && !pts.some(function (q) { return Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) + Math.abs(q[2] - p[2]) < 1e-6; })) pts.push(p);
      });
      if (pts.length < 3) return;
      var c = [0, 0, 0]; pts.forEach(function (p) { c[0] += p[0] / pts.length; c[1] += p[1] / pts.length; c[2] += p[2] / pts.length; });
      var nn = [n[0] / N, n[1] / N, n[2] / N], e1 = cross(nn, Math.abs(nn[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]); var l1 = norm(e1); e1 = [e1[0] / l1, e1[1] / l1, e1[2] / l1]; var e2 = cross(nn, e1);
      pts.sort(function (p, q) { var a = [p[0] - c[0], p[1] - c[1], p[2] - c[2]], b = [q[0] - c[0], q[1] - c[1], q[2] - c[2]]; return Math.atan2(dot(a, e2), dot(a, e1)) - Math.atan2(dot(b, e2), dot(b, e1)); });
      var pos = []; for (var k = 1; k < pts.length - 1; k++) [pts[0], pts[k], pts[k + 1]].forEach(function (p) { pos.push(p[0], p[1], p[2]); });
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
      dyn.add(new T.Mesh(g, new T.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity == null ? 0.28 : opacity, side: T.DoubleSide, depthWrite: false })));
      var lp = []; pts.concat([pts[0]]).forEach(function (p) { lp.push(new T.Vector3(p[0], p[1], p[2])); });
      dyn.add(new T.Line(new T.BufferGeometry().setFromPoints(lp), new T.LineBasicMaterial({ color: color })));
    };
    S.solid = function (u, v, w, color, opacity) {  // paralelepípedo generado por u, v, w desde el origen
      var P = [[0, 0, 0], u, v, w, add(u, v), add(u, w), add(v, w), add(add(u, v), w)];
      var faces = [[0, 1, 4, 2], [0, 1, 5, 3], [0, 2, 6, 3], [1, 4, 7, 5], [2, 4, 7, 6], [3, 5, 7, 6]], pos = [];
      faces.forEach(function (f) { [f[0], f[1], f[2], f[0], f[2], f[3]].forEach(function (i) { pos.push(P[i][0], P[i][1], P[i][2]); }); });
      var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
      dyn.add(new T.Mesh(g, new T.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity == null ? 0.22 : opacity, side: T.DoubleSide, depthWrite: false })));
      var ls = []; faces.forEach(function (f) { for (var i = 0; i < 4; i++) { var a = P[f[i]], b = P[f[(i + 1) % 4]]; ls.push(new T.Vector3(a[0], a[1], a[2]), new T.Vector3(b[0], b[1], b[2])); } });
      dyn.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(ls), new T.LineBasicMaterial({ color: color })));
    };
    S.space = function (color) { dyn.add(new T.Mesh(new T.BoxGeometry(2 * R, 2 * R, 2 * R), new T.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.1, depthWrite: false, side: T.DoubleSide }))); };
    S.resize = function () { var w = Math.min(parent.clientWidth || W, MW); renderer.setSize(w, Math.round(w * (aspect || 0.8))); camera.aspect = w / Math.round(w * (aspect || 0.8)); camera.updateProjectionMatrix(); S.render(); };
    window.addEventListener('resize', S.resize);
    S.buildStatic();
    new MutationObserver(function () { S.buildStatic(); if (S.onTheme) S.onTheme(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('beforeprint', S.render);
    return S;
  }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  var COL = function () { return { a: css('--acc', '#2a56d3'), b: css('--sec', '#c9670a'), c: '#2e9e5b', m: css('--mut', '#5d6675') }; };

  /* =====================================================================
     1. PLANOS: sistema de 2 o 3 ecuaciones ax+by+cz=d
     ===================================================================== */
  function buildPlanos(root) {
    var n = parseInt(root.getAttribute('data-n') || '3', 10), hom = root.getAttribute('data-hom') === '1';
    var rows = (root.getAttribute('data-v') || '1,1,1,3;1,-1,0,0;0,1,-1,1').split(';').map(function (r) { return r.split(',').map(Number); });
    root.textContent = ''; root.classList.add('sarrus');
    var S = makeScene(root, 5, 0.85); if (!S) return;
    var box = el('div', 'an-eqs'), inp = [], cl = ['down', 'up', 'w'];
    for (var i = 0; i < n; i++) {
      var d = el('div', 'an-eq ' + cl[i]), r = [];
      [['x + ', 0], ['y + ', 1], ['z = ', 2]].forEach(function (p) { var x = numInput(rows[i][p[1]], '3em'); d.appendChild(x); d.appendChild(el('span', '', ' ' + p[0])); r.push(x); });
      if (hom) { d.appendChild(el('span', '', '0')); r.push({ value: 0 }); } else { var dd = numInput(rows[i][3], '3em'); d.appendChild(dd); r.push(dd); }
      inp.push(r); box.appendChild(d);
    }
    var text = el('p', 'sar-text'), res = el('div', 'sar-res');
    var presets = n === 3
      ? [['Se cortan en un punto', [[1, 1, 1, 3], [1, -1, 0, 0], [0, 1, -1, 1]]], ['Haz de planos (una recta común)', [[1, 1, 1, 3], [1, -1, 0, 0], [2, 0, 1, 3]]], ['Prisma triangular (sin solución)', [[1, 1, 0, 1], [0, 1, 1, 1], [1, 0, 1, 5]]], ['Dos paralelos (sin solución)', [[1, 1, 1, 3], [2, 2, 2, 2], [1, -1, 0, 0]]], ['Los tres iguales', [[1, 1, 1, 3], [2, 2, 2, 6], [3, 3, 3, 9]]]]
      : (hom ? [['Dos planos distintos', [[1, 1, 1, 0], [1, -1, 0, 0]]], ['El mismo plano', [[1, 1, 1, 0], [2, 2, 2, 0]]]] : [['Se cortan en una recta', [[1, 1, 1, 3], [1, -1, 0, 0]]], ['Paralelos', [[1, 1, 1, 3], [2, 2, 2, 2]]], ['El mismo plano', [[1, 1, 1, 3], [2, 2, 2, 6]]]]);
    var pre = btnRow(presets.map(function (p) { return p[0]; }), function (k) { presets[k][1].forEach(function (rw, i) { rw.forEach(function (v, j) { if (!(hom && j === 3)) inp[i][j].value = v; }); }); draw(); });

    function draw() {
      var C = COL(), cols = [C.a, C.b, C.c];
      var v = inp.map(function (r) { return r.map(function (x) { return parseFloat(x.value) || 0; }); });
      var A = v.map(function (r) { return r.slice(0, 3); }), Ab = v.map(function (r) { return r.slice(); });
      S.clearDyn();
      v.forEach(function (r, i) { if (!isZero(r.slice(0, 3))) S.plane(r.slice(0, 3), r[3], cols[i], 0.26); });
      var rA = rankOf(A), rAb = rankOf(Ab), msg = '', point = null, ldir = null, lpt = null;
      // pares paralelos / coincidentes
      var par = [], coin = [];
      for (var i = 0; i < n; i++) for (var j = i + 1; j < n; j++) {
        if (!isZero(A[i]) && !isZero(A[j]) && isZero(cross(A[i], A[j]))) { if (rankOf([Ab[i], Ab[j]]) === 1) coin.push([i + 1, j + 1]); else par.push([i + 1, j + 1]); }
      }
      var sist = hom ? '<b>rango(A) = ' + rA + '</b>. ' : '<b>rango(A) = ' + rA + '</b>, <b>rango(A|b) = ' + rAb + '</b>. ';
      if (rA === rAb && rA === Math.min(n, 3) && n === 3) {
        // punto único: resolver por Cramer
        var D = det3(A[0], A[1], A[2]);
        var col = function (k) { return A.map(function (r, i) { var q = r.slice(); q[k] = v[i][3]; return q; }); };
        point = [0, 1, 2].map(function (k) { var M = col(k); return det3(M[0], M[1], M[2]) / D; });
        S.sphere(point, '#d9434a', 0.22);
        msg = sist + 'Sistema <b>compatible determinado</b>: los tres planos se cortan en un único punto <b>P = (' + point.map(num).join(', ') + ')</b> (punto rojo).';
      } else if (rA === rAb && rA === 2) {
        var ii = -1, jj = -1;
        for (var a = 0; a < n && ii < 0; a++) for (var b = a + 1; b < n; b++) if (!isZero(cross(A[a], A[b]))) { ii = a; jj = b; break; }
        ldir = cross(A[ii], A[jj]);
        var n1 = A[ii], n2 = A[jj], d1 = v[ii][3], d2 = v[jj][3], nn = dot(n1, n2), dt = dot(n1, n1) * dot(n2, n2) - nn * nn;
        var c1 = (d1 * dot(n2, n2) - d2 * nn) / dt, c2 = (d2 * dot(n1, n1) - d1 * nn) / dt;
        lpt = [c1 * n1[0] + c2 * n2[0], c1 * n1[1] + c2 * n2[1], c1 * n1[2] + c2 * n2[2]];
        S.line(lpt, ldir, '#d9434a', 0.1);
        msg = sist + 'Sistema <b>compatible indeterminado</b> (1 parámetro libre): ' + (n === 2 ? 'los dos planos se cortan en una <b>recta</b> (en rojo).' : (coin.length ? 'dos planos coinciden y el otro los corta: la intersección es una <b>recta</b> (en rojo).' : 'los tres planos comparten una <b>recta</b> (en rojo): es un «haz de planos».'));
        if (hom) msg += '<br>Dimensiones (Grassmann): Dim U₁ + Dim U₂ = Dim(U₁∩U₂) + Dim(U₁+U₂): <b>2 + 2 = 1 + 3</b>. La intersección es una recta y la suma es todo ℝ³.';
      } else if (rA === rAb && rA === 1) {
        msg = sist + 'Sistema <b>compatible indeterminado</b> (2 parámetros libres): ' + (n === 3 ? 'los tres planos son <b>el mismo plano</b>.' : 'los dos planos <b>coinciden</b>.');
        if (hom) msg += '<br>Aquí U₁ = U₂: Dim(U₁∩U₂) = 2 y Dim(U₁+U₂) = 2, y se cumple <b>2 + 2 = 2 + 2</b>.';
      } else if (rA === 0) {
        msg = sist + 'Todos los coeficientes son 0: no hay planos.';
      } else {
        // incompatible
        if (n === 3 && rA === 2) msg = sist + 'Sistema <b>incompatible</b>: ' + (par.length ? 'hay dos planos <b>paralelos</b> distintos (' + par.map(function (p) { return 'π' + p[0] + ' y π' + p[1]; }).join(', ') + ') que no se cortan.' : 'los planos se cortan dos a dos en rectas paralelas, pero no hay ningún punto común a los tres: es un <b>prisma triangular</b>.');
        else msg = sist + 'Sistema <b>incompatible</b>: ' + (n === 2 ? 'los dos planos son <b>paralelos</b> y distintos.' : 'los planos son <b>paralelos</b>; no tienen ningún punto común a todos.');
      }
      html(text, msg);
      S.render();
    }
    root.appendChild(el('p', 'sar-text an-title', hom ? 'Cada ecuación ax + by + cz = 0 es un plano que pasa por el origen (un subespacio de dimensión 2). Gira la figura y mira cómo se cortan.' : 'Cada ecuación ax + by + cz = d es un plano de ℝ³; las soluciones del sistema son los puntos comunes a todos los planos. Gira la figura y cambia los coeficientes.'));
    root.appendChild(box); root.appendChild(S.wrap); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    inp.forEach(function (r) { r.forEach(function (x) { if (x.addEventListener) x.addEventListener('input', draw); }); });
    S.onTheme = draw; draw();
  }

  /* =====================================================================
     2. VECTORES: subespacio generado y volumen (determinante 3x3)
     ===================================================================== */
  function buildVect(root) {
    var modo = root.getAttribute('data-modo') || 'span';
    var g = function (k, d) { return (root.getAttribute('data-' + k) || d).split(',').map(Number); };
    var V0 = [g('u', '1,0,0'), g('v', '0,1,0'), g('w', '0,0,1')];
    root.textContent = ''; root.classList.add('sarrus');
    var S = makeScene(root, modo === 'det' ? 6 : 4, 0.85); if (!S) return;
    var box = el('div', 'an-eqs'), inp = [], names = ['u', 'v', 'w'], cl = ['down', 'up', 'w'];
    for (var i = 0; i < 3; i++) {
      var d = el('div', 'an-eq ' + cl[i]), r = []; d.appendChild(el('span', '', names[i] + ' = ('));
      for (var j = 0; j < 3; j++) { var x = numInput(V0[i][j], '2.8em'); r.push(x); d.appendChild(x); if (j < 2) d.appendChild(el('span', '', ', ')); }
      d.appendChild(el('span', '', ')')); inp.push(r); box.appendChild(d);
    }
    var text = el('p', 'sar-text'), res = el('div', 'sar-res');
    var get = function () { return inp.map(function (r) { return r.map(function (x) { return parseFloat(x.value) || 0; }); }); };
    var set = function (M) { M.forEach(function (r, i) { r.forEach(function (x, j) { inp[i][j].value = x; }); }); draw(); };
    var presets = modo === 'span'
      ? [['Independientes (generan ℝ³)', function () { set([[1, 0, 0], [0, 1, 0], [1, 1, 1]]); }], ['w = u + v (en un plano)', function () { set([[1, 0, 0], [0, 1, 0], [1, 1, 0]]); }], ['Los tres paralelos (una recta)', function () { set([[1, 2, 1], [2, 4, 2], [-1, -2, -1]]); }], ['Un plano inclinado', function () { set([[2, 0, 1], [0, 2, 1], [2, 2, 2]]); }]]
      : [['Base canónica (volumen 1)', function () { set([[1, 0, 0], [0, 1, 0], [0, 0, 1]]); }], ['Intercambiar u y v (cambia el signo)', function () { var M = get(); set([M[1], M[0], M[2]]); }], ['Duplicar u', function () { var M = get(); set([M[0].map(function (t) { return 2 * t; }), M[1], M[2]]); }], ['w = u + v (se aplasta)', function () { var M = get(); set([M[0], M[1], add(M[0], M[1])]); }]];
    var pre = btnRow(presets.map(function (p) { return p[0]; }), function (k) { presets[k][1](); });
    function draw() {
      var C = COL(), M = get(), u = M[0], v = M[1], w = M[2];
      S.clearDyn();
      var dt = det3(u, v, w);
      if (modo === 'det') {
        S.solid(u, v, w, dt >= 0 ? C.a : C.b, 0.2);
        S.arrow(u, C.a, 'u'); S.arrow(v, C.b, 'v'); S.arrow(w, C.c, 'w');
        var t = 'Las columnas u, v, w forman un paralelepípedo. Su <b>volumen es |det| = ' + num(Math.abs(dt)) + '</b>, con <b>det = u·(v×w) = ' + num(dt) + '</b>.';
        t += Math.abs(dt) < 1e-9 ? '<br>det = 0: el paralelepípedo se <b>aplasta</b> en un plano (los tres vectores son linealmente dependientes), la matriz no es invertible.' : (dt > 0 ? '<br>det > 0: u, v, w forman un sistema <b>directo</b> (regla de la mano derecha, color azul).' : '<br>det < 0: orientación <b>inversa</b> (color naranja). Si intercambias dos vectores, el determinante cambia de signo.');
        html(text, t);
      } else {
        S.arrow(u, C.a, 'u'); S.arrow(v, C.b, 'v'); S.arrow(w, C.c, 'w');
        var r = rankOf([u, v, w]), msg = '', nz = [u, v, w].filter(function (q) { return !isZero(q); });
        if (r === 0) { S.sphere([0, 0, 0], '#d9434a', 0.2); msg = 'Los tres son el vector nulo: generan solo {0} (dimensión 0).'; }
        else if (r === 1) { S.line([0, 0, 0], nz[0], '#d9434a', 0.07); msg = 'Todos son múltiplos de un mismo vector: generan una <b>recta</b> por el origen (dimensión 1). Sistema <b>ligado</b>.'; }
        else if (r === 2) {
          var pn = null; for (var a = 0; a < 3 && !pn; a++) for (var b = a + 1; b < 3; b++) { var cc = cross(M[a], M[b]); if (!isZero(cc)) { pn = cc; break; } }
          S.plane(pn, 0, '#d9434a', 0.3);
          msg = 'Los tres vectores están en un mismo <b>plano</b> por el origen (en rojo): generan un subespacio de <b>dimensión 2</b>. El sistema es <b>ligado</b> (det = ' + num(dt) + ' = 0): uno de ellos es combinación lineal de los otros dos.';
        } else { S.space('#d9434a'); msg = 'Los tres son independientes (det = <b>' + num(dt) + '</b> ≠ 0): generan todo <b>ℝ³</b> (dimensión 3) y forman una <b>base</b>.'; }
        html(text, 'rango = <b>' + r + '</b>. ' + msg);
      }
      S.render();
    }
    root.appendChild(el('p', 'sar-text an-title', modo === 'det' ? 'El determinante de una matriz 3×3 mide el volumen (con signo) del paralelepípedo formado por sus columnas. Cambia los vectores, gira la figura y prueba los casos.' : 'El subespacio generado por u, v y w está formado por todas sus combinaciones lineales. Según el rango es el origen, una recta, un plano o todo ℝ³.'));
    root.appendChild(box); root.appendChild(S.wrap); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    inp.forEach(function (r) { r.forEach(function (x) { x.addEventListener('input', draw); }); });
    S.onTheme = draw; draw();
  }

  /* =====================================================================
     3. NÚCLEO E IMAGEN DE f(x) = A x  (R3 -> R3)
     ===================================================================== */
  function buildNuc(root) {
    var m0 = (root.getAttribute('data-m') || '1,0,0;0,1,0;0,0,0').split(';').map(function (r) { return r.split(',').map(Number); });
    root.textContent = ''; root.classList.add('sarrus');
    var pair = el('div', 'an-pair'), c1 = el('div', 'an-pcol'), c2 = el('div', 'an-pcol');
    c1.appendChild(el('b', '', 'Partida V = ℝ³: núcleo Nuc f')); c2.appendChild(el('b', '', 'Llegada W = ℝ³: imagen Im f')); pair.appendChild(c1); pair.appendChild(c2);
    var S1 = makeScene(c1, 4, 1, 330), S2 = makeScene(c2, 4, 1, 330); if (!S1 || !S2) return;
    S2.controls.addEventListener('change', function () { }); // independientes
    var box = el('div', 'an-eqs'), er = el('div', 'an-eq down'), inp = [];
    er.appendChild(el('span', '', 'A = '));
    var tbl = el('div', 'd3-mat'); for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) { var x = numInput(m0[i][j], '2.6em'); inp.push(x); tbl.appendChild(x); }
    er.appendChild(tbl); er.appendChild(el('span', '', '   f(x) = A·x')); box.appendChild(er);
    var sl = el('div', 'an-sliders'), sx = [], lx = [];
    ['x', 'y', 'z'].forEach(function (nm, k) { var s = slider(-3, 3, 0.5, [1, 1, 1][k]), b = el('b'), r = el('label', 'an-slrow'); r.appendChild(el('span', '', nm + ' ')); r.appendChild(s); r.appendChild(b); sl.appendChild(r); sx.push(s); lx.push(b); });
    var text = el('p', 'sar-text'), res = el('div', 'sar-res');
    var presets = [['Isomorfismo', [[1, 0, 1], [0, 1, 0], [0, 0, 1]]], ['Rango 2 (proyección)', [[1, 0, 0], [0, 1, 0], [0, 0, 0]]], ['Rango 1', [[1, 2, 0], [2, 4, 0], [-1, -2, 0]]], ['Aplicación nula', [[0, 0, 0], [0, 0, 0], [0, 0, 0]]]];
    var pre = btnRow(presets.map(function (p) { return p[0]; }), function (k) { presets[k][1].forEach(function (r, i) { r.forEach(function (v, j) { inp[i * 3 + j].value = v; }); }); draw(); });
    function show(S, basis, kind, color) {
      var r = basis.length;
      if (r === 0) S.sphere([0, 0, 0], color, 0.22);
      else if (r === 1) S.line([0, 0, 0], basis[0], color, 0.1);
      else if (r === 2) S.plane(cross(basis[0], basis[1]), 0, color, 0.32);
      else S.space(color);
    }
    function draw() {
      var C = COL(), A = [0, 1, 2].map(function (i) { return [0, 1, 2].map(function (j) { return parseFloat(inp[3 * i + j].value) || 0; }); });
      var x = sx.map(function (s, k) { lx[k].textContent = num(parseFloat(s.value)); return parseFloat(s.value); });
      var fx = A.map(function (r) { return dot(r, x); });
      var ns = nullspace(A), cb = colBasis(A), r = cb.length;
      S1.clearDyn(); S2.clearDyn();
      show(S1, ns, 'nuc', C.b); show(S2, cb, 'im', C.a);
      S1.arrow(x, C.c, 'x'); S2.arrow(fx, C.c, 'f(x)');
      var nm = ['el origen {0}', 'una recta', 'un plano', 'todo ℝ³'];
      html(text, 'rango(A) = <b>' + r + '</b> = Dim Im f &nbsp;·&nbsp; Dim Nuc f = 3 − ' + r + ' = <b>' + (3 - r) + '</b>. El núcleo es <b>' + nm[3 - r] + '</b> (naranja, a la izquierda) y la imagen es <b>' + nm[r] + '</b> (azul, a la derecha). Teorema de las dimensiones: <b>3 = ' + (3 - r) + ' + ' + r + '</b>.');
      res.textContent = '';
      res.appendChild(el('p', 'sar-hint', r === 3 ? 'Núcleo = {0} e imagen = ℝ³: inyectiva y sobreyectiva (isomorfismo; vocabulario de Lay).' : 'Nuc f ≠ {0}: no es inyectiva. Im f ≠ ℝ³: no es sobreyectiva (vocabulario de Lay).'));
      S1.render(); S2.render();
    }
    root.appendChild(el('p', 'sar-text an-title', 'Para f(x) = A·x en ℝ³: el núcleo son los x que f aplasta en el origen y la imagen son los valores que alcanza. Cambia la matriz, mueve x y gira las dos figuras.'));
    root.appendChild(box); root.appendChild(pair); root.appendChild(sl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    inp.concat(sx).forEach(function (x) { x.addEventListener('input', draw); });
    S1.onTheme = draw; draw();
  }

  var REG = [['.d3-planos', buildPlanos], ['.d3-vect', buildVect], ['.d3-nuc', buildNuc]];
  function init() {
    var todo = []; REG.forEach(function (r) { document.querySelectorAll(r[0]).forEach(function (n) { todo.push([r[1], n]); }); });
    if (!todo.length) return;
    var go = function (t) { try { t[0](t[1]); } catch (e) { console.error(e); } };
    loadThree().then(function () {
      if (!('IntersectionObserver' in window)) { todo.forEach(go); return; }
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); var t = todo.filter(function (x) { return x[1] === e.target; })[0]; if (t) go(t); } }); }, { rootMargin: '300px' });
      todo.forEach(function (t) { t[1].style.minHeight = '300px'; io.observe(t[1]); });
    })
      .catch(function (e) { console.error(e); todo.forEach(function (t) { t[1].textContent = 'No se pudo cargar la figura 3D.'; }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
