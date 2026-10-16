/* Figuras 3D interactivas (three.js r147 local, assets/vendor/). Se cargan solo en las páginas que las usan.
   .d3-planos  data-n="3" data-v="1,1,1,3;1,-1,0,0;0,1,-1,1" [data-hom="1"]     sistemas de planos (ax+by+cz=d)
   .d3-vect    data-modo="span|det" data-u="1,0,0" data-v="0,1,0" data-w="0,0,1"  vectores de R3: subespacio generado / volumen
   .d3-nuc     data-m="1,0,0;0,1,0;0,0,0"                                         núcleo e imagen de f(x)=A·x, R3 -> R3
   .d3-propios data-a="1,0,3;-1,2,0;0,0,2"                                       esfera unidad frente a su imagen por A (3x3 entera editable, slider t = deformacion gradual), rectas/planos propios y cadenas de Jordan (presets: distintos, doble d=2, doble d=1, triple d=2, triple bloque 3x3, complejos); sin WebGL queda el texto
   .d3-proy    data-modo="recta|plano|gs" data-v="1,2,3" data-a="1,1,1" data-b="0,1,1" data-c="0,0,2"
               proyección ortogonal (producto estándar de R3): recta -> v sobre ⟨d=a⟩; plano -> v sobre U=⟨a,b⟩ (Gram-Schmidt interno, p = c1e1+c2e2, residuo w ⟂ U, distancia mínima y punto de prueba q con sliders α, β);
               gs -> Gram-Schmidt de (a,b,c) en 4 pasos con botones (e1, e2, e3 y normalización). Entradas editables y presets; sin WebGL queda el texto con los cálculos.
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
    if (!window.THREE) { parent.appendChild(el('p', 'sar-hint', 'No se ha podido cargar el motor 3D: se muestran solo los cálculos.')); return null; }
    var T = THREE, MW = maxW || 520, W = Math.min(parent.clientWidth || MW, MW), H = Math.round(W * (aspect || 0.8));
    var wrap = el('div', 'd3-wrap'); parent.appendChild(wrap);
    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); }
    catch (e) { wrap.appendChild(el('p', 'sar-hint', 'Tu navegador no puede mostrar gráficos 3D (WebGL).')); return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(W, H);
    renderer.domElement.className = 'd3-canvas'; renderer.domElement.setAttribute('role', 'img'); renderer.domElement.setAttribute('aria-label', 'Figura 3D interactiva (arrastra para girar, rueda o pellizco para acercar)'); wrap.appendChild(renderer.domElement);
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

  /* =====================================================================
     4. VALORES Y VECTORES PROPIOS EN R3: esfera unidad frente a su imagen, ejes propios y cadenas de Jordan
     ===================================================================== */
  function matVec(A, v) { return [dot(A[0], v), dot(A[1], v), dot(A[2], v)]; }
  function matMul3(A, B) { return A.map(function (r) { return [0, 1, 2].map(function (j) { return r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]; }); }); }
  function evalPoly(co, x) { var s = 0; co.forEach(function (c) { s = s * x + c; }); return s; }
  function propios3(A) {                         // A entera 3x3: raíces enteras (con α), raíces reales no enteras y estado
    var tr = A[0][0] + A[1][1] + A[2][2];
    var m2 = (A[0][0] * A[1][1] - A[0][1] * A[1][0]) + (A[0][0] * A[2][2] - A[0][2] * A[2][0]) + (A[1][1] * A[2][2] - A[1][2] * A[2][1]);
    var det = dot(A[0], cross(A[1], A[2]));
    var co = [1, -tr, m2, -det], roots = [], B = 1, i, r, a;
    for (i = 1; i < 4; i++) B = Math.max(B, 1 + Math.abs(co[i]));
    for (r = -B; r <= B; r++) { a = 0; while (co.length > 1 && Math.abs(evalPoly(co, r)) < 1e-9) { var q = [co[0]]; for (i = 1; i < co.length - 1; i++) q.push(co[i] + r * q[i - 1]); co = q; a++; } if (a) roots.push({ l: r, a: a }); }
    var out = { roots: roots, left: co, irr: [], status: 'ok', tr: tr, det: det };
    if (co.length > 1) {                          // factor sin raíces enteras: grado 2 o 3
      var Bd = 1; for (i = 1; i < co.length; i++) Bd = Math.max(Bd, 1 + Math.abs(co[i] / co[0]));
      var x = -Bd, fx = evalPoly(co, x), st = Bd / 8000, y, fy, lo, hi, mid, k;
      for (i = 1; i <= 16000; i++) {
        y = -Bd + i * st; fy = evalPoly(co, y);
        if (fx * fy < 0) { lo = x; hi = y; for (k = 0; k < 60; k++) { mid = (lo + hi) / 2; if (evalPoly(co, lo) * evalPoly(co, mid) <= 0) hi = mid; else lo = mid; } out.irr.push((lo + hi) / 2); }
        x = y; fx = fy;
      }
      out.status = out.irr.length === co.length - 1 ? 'irr' : 'cplx';
      if (co.length === 3) out.q2 = { b: co[1], c: co[2], disc: co[1] * co[1] - 4 * co[2] };
    }
    return out;
  }
  function eigLine(A, l) {                       // dirección propia de un valor propio simple (real, no necesariamente entero)
    var N = [0, 1, 2].map(function (i) { return [0, 1, 2].map(function (j) { return A[i][j] - (i === j ? l : 0); }); }), best = null, bn = 0;
    [[0, 1], [0, 2], [1, 2]].forEach(function (p) { var c = cross(N[p[0]], N[p[1]]), n = norm(c); if (n > bn) { bn = n; best = c; } });
    return best;
  }
  function chains3(A, ro) {                      // cadenas de Jordan (float) para un valor propio entero
    var N = [0, 1, 2].map(function (i) { return [0, 1, 2].map(function (j) { return A[i][j] - (i === j ? ro.l : 0); }); }), pw = [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]], rk = [3], k = 0, i;
    do { k++; pw.push(matMul3(pw[k - 1], N)); rk.push(rankOf(pw[k])); } while (3 - rk[k] < ro.a && k < 4);
    var c = [0], mult = [0];
    for (i = 1; i <= k; i++) c[i] = rk[i - 1] - rk[i];
    c[k + 1] = 0; for (i = 1; i <= k; i++) mult[i] = c[i] - c[i + 1];
    var chains = [];
    for (var lev = k; lev >= 1; lev--) {
      var S = lev > 1 ? nullspace(pw[lev - 1]) : [], need = mult[lev], cands = [];
      chains.forEach(function (ch) { if (ch.vecs.length > lev) S.push(ch.vecs[lev - 1]); });
      [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach(function (e) { if (norm(matVec(pw[lev], e)) < 1e-9) cands.push(e); });
      cands = cands.concat(nullspace(pw[lev]));
      for (i = 0; i < cands.length && need > 0; i++) {
        if (rankOf(S.concat([cands[i]])) > rankOf(S)) {
          S.push(cands[i]); need--;
          var vecs = [cands[i]], w = cands[i];
          for (var j = 1; j < lev; j++) { w = matVec(N, w); vecs.unshift(w); }
          chains.push({ vecs: vecs });
        }
      }
    }
    return { chains: chains, d: c[1], sizes: chains.map(function (ch) { return ch.vecs.length; }) };
  }

  function buildPropios(root) {
    var a0 = (root.getAttribute('data-a') || '1,0,3;-1,2,0;0,0,2').split(';').map(function (r) { return r.split(',').map(Number); });
    root.textContent = ''; root.classList.add('sarrus');
    var R = 4;
    root.appendChild(el('p', 'sar-text an-title', 'Una matriz A de 3×3 deforma la esfera unidad (gris) en su imagen A·esfera (azul). Las rectas y planos de colores son los subespacios propios, que A solo estira. Si faltan vectores propios (d < α) aparecen los vectores generalizados de las cadenas de Jordan. El deslizador t deforma poco a poco: M(t) = (1 ' + MINUS + ' t)·I + t·A.'));
    var box = el('div', 'an-eqs'), er = el('div', 'an-eq down'), tbl = el('div', 'd3-mat'), inp = [];
    er.appendChild(el('span', '', 'A = '));
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) { var x = numInput(a0[i][j], '2.6em'); x.setAttribute('aria-label', 'A fila ' + (i + 1) + ' columna ' + (j + 1)); x.step = 1; inp.push(x); tbl.appendChild(x); }
    er.appendChild(tbl); er.appendChild(el('span', '', '  (enteros de ' + MINUS + '9 a 9; otros valores se recortan)')); box.appendChild(er); root.appendChild(box);
    var S = makeScene(root, R, 0.85, 520);
    var sl = el('div', 'an-sliders'), srow = el('label', 'an-slrow'), st = slider(0, 1, 0.05, 1), sb = el('b');
    srow.appendChild(el('span', '', 't ')); srow.appendChild(st); srow.appendChild(sb); sl.appendChild(srow);
    var text = el('p', 'sar-text'), res = el('div', 'sar-res');
    var PRE = [['Tres valores distintos', [[2, 1, 0], [0, 3, 0], [0, 0, 1]]], ['Doble con d = 2 (diagonalizable)', [[2, 0, 0], [0, 2, 0], [1, 0, 3]]], ['Doble con d = 1 (J′, U Ej. 4.18)', [[1, 0, 3], [-1, 2, 0], [0, 0, 2]]],
      ['Triple, d = 2 (bloques 2 + 1)', [[2, 1, 0], [0, 2, 0], [0, 0, 2]]], ['Triple, d = 1 (bloque 3×3)', [[2, 1, 0], [0, 2, 1], [0, 0, 2]]], ['Complejos (giro de 90° en un plano)', [[1, 0, 0], [0, 0, -1], [0, 1, 0]]], ['Real irracional + complejos', [[0, 1, 0], [0, 0, 1], [2, 0, 0]]]];
    var pre = btnRow(PRE.map(function (p) { return p[0]; }), function (k) { PRE[k][1].forEach(function (r, i2) { r.forEach(function (v, j2) { inp[3 * i2 + j2].value = v; }); }); draw(); });
    var dots = 'abcd';
    function frm(v) { return '(' + v.map(num).join(', ') + ')'; }
    function wire(M, k, color) {                 // malla de meridianos y paralelos de la esfera de radio k, deformada por M
      var T = S.T, pts = [], a, b, lat, lon, P;
      function pt(la, lo) { var u = [Math.cos(la) * Math.cos(lo), Math.cos(la) * Math.sin(lo), Math.sin(la)], w = matVec(M, u); return new T.Vector3(k * w[0], k * w[1], k * w[2]); }
      for (lat = -60; lat <= 60; lat += 30) for (lon = 0; lon < 360; lon += 10) { pts.push(pt(lat * Math.PI / 180, lon * Math.PI / 180), pt(lat * Math.PI / 180, (lon + 10) * Math.PI / 180)); }
      for (lon = 0; lon < 360; lon += 30) for (lat = -90; lat < 90; lat += 10) { pts.push(pt(lat * Math.PI / 180, lon * Math.PI / 180), pt((lat + 10) * Math.PI / 180, lon * Math.PI / 180)); }
      S.dyn.add(new T.LineSegments(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: color, transparent: true, opacity: 0.8 })));
    }
    function draw() {
      var C = COL(), A = [0, 1, 2].map(function (r) { return [0, 1, 2].map(function (c) { var v = Math.round(parseFloat(inp[3 * r + c].value)); return isNaN(v) ? 0 : Math.max(-9, Math.min(9, v)); }); });
      var t = parseFloat(st.value); sb.textContent = num(t);
      var pr = propios3(A), cols = [C.a, C.b, C.c, '#8e44ad'], msg = '', info = [], P = [];
      // factor de escala para que A·esfera quepa en el cubo
      var mx = 1; for (var la = -90; la <= 90; la += 15) for (var lo = 0; lo < 360; lo += 15) { var u = [Math.cos(la * Math.PI / 180) * Math.cos(lo * Math.PI / 180), Math.cos(la * Math.PI / 180) * Math.sin(lo * Math.PI / 180), Math.sin(la * Math.PI / 180)]; mx = Math.max(mx, norm(matVec(A, u))); }
      var k = Math.min(1, 3.4 / mx), Mt = A.map(function (r, i2) { return r.map(function (v, j2) { return (1 - t) * (i2 === j2 ? 1 : 0) + t * v; }); });
      if (S) { S.clearDyn(); wire([[1, 0, 0], [0, 1, 0], [0, 0, 1]], k, C.m); wire(Mt, k, C.a); }
      var allD = true, nBlocks = 0, ones = 0, bl = [], ci = 0;
      pr.roots.forEach(function (ro, ri) {
        var cc = cols[ri % 4], ch = chains3(A, ro), d = ch.d;
        info.push('λ = ' + num(ro.l) + ' (α = ' + ro.a + ', d = ' + d + ')');
        if (d < ro.a) allD = false;
        ch.sizes.forEach(function (s) { bl.push('J' + ['', '₁', '₂', '₃'][s] + '(' + num(ro.l) + ')'); nBlocks++; ones += s - 1; });
        if (S) {
          if (d === 1) S.line([0, 0, 0], ch.chains[0].vecs[0], cc, 0.07);
          else if (d === 2) { var sp = nullspace([[A[0][0] - ro.l, A[0][1], A[0][2]], [A[1][0], A[1][1] - ro.l, A[1][2]], [A[2][0], A[2][1], A[2][2] - ro.l]]); S.plane(cross(sp[0], sp[1]), 0, cc, 0.25); }
          else S.space(cc);
          ch.chains.forEach(function (c2) { c2.vecs.forEach(function (v, idx) { P.push({ v: v, c: cc, eig: idx === 0 }); }); });
        }
      });
      if (pr.irr.length) {
        pr.irr.forEach(function (l, ri) { var dr = eigLine(A, l), cc = cols[(pr.roots.length + ri) % 4]; info.push('λ ≈ ' + num(l) + ' (α = 1, d = 1)'); bl.push('J₁(≈' + num(l) + ')'); nBlocks++; if (S && dr) { S.line([0, 0, 0], dr, cc, 0.07); P.push({ v: dr, c: cc, eig: true }); } });
      }
      if (pr.status === 'cplx' && S) {              // plano invariante Im(A - lI) del valor real simple (entero o irracional)
        var lam = null;
        if (pr.roots.length === 1 && pr.roots[0].a === 1 && !pr.irr.length) lam = pr.roots[0].l; else if (!pr.roots.length && pr.irr.length === 1) lam = pr.irr[0];
        if (lam !== null) {
          var Nn = [0, 1, 2].map(function (r2) { return [0, 1, 2].map(function (c2) { return A[r2][c2] - (r2 === c2 ? lam : 0); }); }), cb = colBasis(Nn);
          if (cb.length === 2) S.plane(cross(cb[0], cb[1]), 0, '#8e44ad', 0.18);
        }
      }
      if (S) {
        var big = 0; P.forEach(function (p) { big = Math.max(big, norm(p.v)); });
        P.forEach(function (p, idx) { var s = big > 0 ? 2.3 / big * 1.0 : 1, vv = p.v.map(function (q) { return q * s; }); S.arrow(vv, p.c, 'p' + (idx + 1)); });
        S.render();
      }
      var Lh = ['Esfera unidad (gris) y su imagen A·esfera (azul)' + (k < 1 ? ', reducidas a escala por ' + num(k) + ' para que quepan. ' : '. ')];
      if (pr.status === 'cplx') {
        msg = '<b>Valores propios no reales</b>: ' + (info.length ? info.join(', ') + ' y ' : '') + 'un par complejo' + (pr.q2 ? ' (λ = ' + num(-pr.q2.b / 2) + ' ± ' + (Math.abs(Math.sqrt(Math.max(0, -pr.q2.disc)) / 2 - 1) < 1e-9 ? '' : num(Math.sqrt(Math.max(0, -pr.q2.disc)) / 2)) + 'i)' : '') + '. No hay base de vectores propios reales ni forma de Jordan real (U Teor. 4.8 supone raíces reales). Geométricamente, A <b>gira</b> el plano violeta (invariante) en lugar de estirar sus direcciones: ningún vector de ese plano conserva su recta; la recta propia del valor real (fuera del plano) sí se conserva.';
      } else {
        var diag = allD;
        msg = info.join(' · ') + '. ';
        if (diag) msg += '<b>d = α en todos</b> ⇒ diagonalizable: ' + (pr.roots.some(function (ro) { return chains3(A, ro).d > 1; }) ? 'hay rectas y planos propios que bastan para una base de ℝ³' : 'tres rectas propias (p₁, p₂, p₃) forman una base') + '. J = Λ (' + bl.join(' ⊕ ') + '). En la base propia A solo estira cada eje: las rectas y planos de color no giran. La imagen de la esfera es un elipsoide, cuyos ejes principales solo coinciden con las direcciones propias si A es simétrica (tema 5.3).';
        else msg += '<b>d < α</b> en algún valor propio ⇒ <b>no diagonalizable</b>: faltan ejes propios. J = ' + bl.join(' ⊕ ') + ' (' + ones + ' uno' + (ones === 1 ? '' : 's') + '). Los vectores p con índice mayor en un bloque son <b>generalizados</b>: en cada cadena, la cabeza v cumple A·v = N·v + λ·v con N = A − λI, es decir, A la estira por λ y además la desvía hacia el eje propio, como una cizalla (en U 4.18: A·p₃ = p₂ + 2·p₃). La imagen de la esfera es un elipsoide «inclinado»; las rectas y planos propios de color siguen fijos, pero no bastan para una base.';
        if (pr.status === 'irr') msg += ' (Los valores irracionales se muestran aproximados.)';
        if (pr.det === 0) msg += ' Como A es singular (λ = 0), la imagen de la esfera es un elipsoide degenerado (aplastado).';
      }
      html(text, Lh[0] + msg + '<br><small>Vectores p₁, p₂, p₃ = columnas de P (base propia o de Jordan), dibujados a escala común' + (P.length ? '; rectas y planos de colores = subespacios propios.' : '.') + '</small>');
      res.textContent = '';
      var fin = el('div', 'sar-final'); fin.textContent = pr.status === 'cplx' ? 'Sin forma de Jordan real' : (allD ? 'Diagonalizable: J = Λ' : 'No diagonalizable: J con ' + ones + ' uno' + (ones === 1 ? '' : 's')); res.appendChild(fin);
    }
    root.appendChild(sl); root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    inp.concat([st]).forEach(function (q) { q.addEventListener('input', draw); });
    if (S) S.onTheme = draw; draw();
  }

  /* =====================================================================
     5. PROYECCIÓN ORTOGONAL y GRAM-SCHMIDT en R3 con el producto escalar estándar
        .d3-proy data-modo="recta|plano|gs"
          recta: data-v="1,2,3" (vector a proyectar) data-a="1,1,1" (director d)
          plano: data-v="2,0,3" data-a="1,0,1" data-b="0,1,1" (generadores u1, u2 del plano U)
          gs   : data-a, data-b, data-c = u1, u2, u3 (se ortogonalizan paso a paso y se normalizan)
     ===================================================================== */
  function sub3(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function mul3(k, a) { return [k * a[0], k * a[1], k * a[2]]; }
  function unit3(a) { var n = norm(a); return n < EPS ? [0, 0, 0] : mul3(1 / n, a); }
  function nc(x) { return num(x).replace('.', ','); }                       // decimales con coma en los textos
  function vtxt3(v) { return '(' + v.map(nc).join('; ') + ')'; }
  function projOn(v, e) { var d = dot(e, e); return d < EPS ? [0, 0, 0] : mul3(dot(v, e) / d, e); }
  function scaleOf(pts) { var m = 0; pts.forEach(function (p) { p.forEach(function (x) { m = Math.max(m, Math.abs(x)); }); }); return m < 1e-9 ? 1 : 3.2 / m; }   // el mayor vector mide ~3,2
  function rightAngle(S, P0, u, w, s) {            // cuadradito de ángulo recto en P0 entre las direcciones unitarias u y w
    if (!S || norm(u) < 0.5 || norm(w) < 0.5) return;
    var T = S.T, A = add(P0, mul3(s, u)), B = add(A, mul3(s, w)), C = add(P0, mul3(s, w));
    var pts = [A, B, C].map(function (p) { return new T.Vector3(p[0], p[1], p[2]); });
    S.dyn.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: '#d9434a' })));
  }
  function raSize(a, b) { return Math.max(0.22, Math.min(0.45, 0.5 * a, 0.5 * b)); }   // tamaño mínimo para que se lea
  function vecInputs(names, cls, vals) {
    var box = el('div', 'an-eqs'), inp = [];
    names.forEach(function (nm, i) {
      var d = el('div', 'an-eq ' + cls[i]), r = []; d.appendChild(el('span', '', nm + ' = ('));
      for (var j = 0; j < 3; j++) { var x = numInput(vals[i][j], '2.8em'); x.setAttribute('aria-label', nm + ' componente ' + (j + 1)); r.push(x); d.appendChild(x); if (j < 2) d.appendChild(el('span', '', ', ')); }
      d.appendChild(el('span', '', ')')); inp.push(r); box.appendChild(d);
    });
    return { box: box, inp: inp,
      get: function () { return inp.map(function (r) { return r.map(function (x) { return parseFloat(x.value) || 0; }); }); },
      set: function (M) { M.forEach(function (r, i) { r.forEach(function (x, j) { inp[i][j].value = x; }); }); } };
  }
  function buildProy(root) {
    var modo = root.getAttribute('data-modo') || 'recta';
    var g = function (k, d) { return (root.getAttribute('data-' + k) || d).split(',').map(Number); };
    var names, cls, vals;
    if (modo === 'gs') { names = ['u1', 'u2', 'u3']; cls = ['down', 'up', 'w']; vals = [g('a', '1,0,1'), g('b', '1,1,0'), g('c', '0,0,2')]; }
    else if (modo === 'plano') { names = ['v', 'u1', 'u2']; cls = ['down', 'up', 'up']; vals = [g('v', '2,0,3'), g('a', '1,0,1'), g('b', '0,1,1')]; }
    else { names = ['v', 'd']; cls = ['down', 'up']; vals = [g('v', '1,2,3'), g('a', '1,1,1')]; }
    root.textContent = ''; root.classList.add('sarrus');
    var S = makeScene(root, 4, 0.85);                    // si no hay WebGL o three.js: makeScene deja un único aviso y devolvemos solo texto
    if (S) S.renderer.domElement.setAttribute('aria-label', { recta: 'Figura 3D: un vector v, su proyección ortogonal sobre una recta y el residuo perpendicular', plano: 'Figura 3D: un vector v, su proyección ortogonal sobre un plano y el residuo perpendicular al plano', gs: 'Figura 3D: los vectores de Gram-Schmidt paso a paso' }[modo]);
    var cl = function (t) { return S ? t : ''; };         // menciones a colores o a la figura solo si hay figura
    var V = vecInputs(names, cls, vals), text = el('p', 'sar-text'), res = el('div', 'sar-res'); text.setAttribute('aria-live', 'polite');
    var sa = slider(-2, 2, 0.1, 0), sb = slider(-2, 2, 0.1, 0), la = el('b'), lb = el('b'), sl = el('div', 'an-sliders'), step = 0, NST = 4, info = el('b', 'sar-final');
    function srow(txt, s, lb2) { var r = el('label', 'an-slrow'); r.appendChild(el('span', '', txt)); r.appendChild(s); r.appendChild(lb2); sl.appendChild(r); }
    sa.setAttribute('aria-label', 'Desplazamiento del punto de prueba, dirección 1'); sb.setAttribute('aria-label', 'Desplazamiento del punto de prueba, dirección 2');
    if (modo === 'recta') srow('α ', sa, la); if (modo === 'plano') { srow('α ', sa, la); srow('β ', sb, lb); }
    var R_ = '#d9434a', GR = '#8a93a3', LG = '#7fbf9a', PU = '#7a52c7';
    function esc(K) { return Math.abs(K - 1) > 0.01 ? ' <i>(Dibujo a escala ' + nc(K) + ' para que quepa y se lea.)</i>' : ''; }

    function drawRecta(M, C) {
      var v = M[0], d = M[1];
      if (isZero(d)) return 'd = 0 no genera una recta: elige un d ≠ 0.';
      var t = dot(v, d) / dot(d, d), p = mul3(t, d), w = sub3(v, p), dh = unit3(d), al = S ? (parseFloat(sa.value) || 0) : 0; la.textContent = nc(al);
      var q = add(p, mul3(al, dh)), K = scaleOf([v, p, d, q]);
      if (S) {
        S.line([0, 0, 0], d, C.b, 0.05); S.arrow(mul3(K, d), C.b, 'd'); S.arrow(mul3(K, v), C.a, 'v');
        if (norm(p) > 1e-6) S.arrow(mul3(K, p), C.c, 'p');
        if (norm(w) > 1e-6) S.arrow(mul3(K, v), R_, '', mul3(K, p));
        var Kp = mul3(K, p);
        rightAngle(S, Kp, norm(p) > 1e-6 ? unit3(mul3(-1, p)) : dh, unit3(w), raSize(norm(Kp) || 0.45, K * norm(w)));
        S.sphere(mul3(K, q), PU, 0.13); S.tube(mul3(K, q), mul3(K, v), PU, 0.025);
      }
      var wn = norm(w), vq = Math.sqrt(wn * wn + al * al);
      return '<b>p</b> = Proy<sub>d</sub>(v) = (v•d)/(d•d)·d = (' + nc(dot(v, d)) + '/' + nc(dot(d, d)) + ')·d = <b>' + vtxt3(p) + '</b>.<br>' +
        '<b>w</b> = v − p = ' + vtxt3(w) + cl(' (rojo)') + '. Control: w•d = <b>' + nc(dot(w, d)) + '</b> ' + (Math.abs(dot(w, d)) < 1e-9 ? '(w ⟂ d ✓)' : '') + '.<br>' +
        'Pitágoras: ‖v‖² = ' + nc(dot(v, v)) + ' = ‖p‖² + ‖w‖² = ' + nc(dot(p, p)) + ' + ' + nc(wn * wn) + '.<br>' +
        '<b>Distancia mínima de v a la recta = ‖w‖ = ' + nc(wn) + '</b>.' +
        (S ? ' El punto morado q = p + α·d/‖d‖ (mueve α) está a distancia √(‖w‖² + α²) = <b>' + nc(vq) + '</b> de v: sale ≥ ‖w‖ y solo vale lo mismo con α = 0 (U Teor. 5.4).' : ' Cualquier otro punto de la recta está a distancia √(‖w‖² + α²) ≥ ‖w‖ de v (U Teor. 5.4).') + esc(K);
    }
    function drawPlano(M, C) {
      var v = M[0], a = M[1], b = M[2], n = cross(a, b);
      if (isZero(n)) return 'u1 y u2 son linealmente dependientes: no generan un plano (rango ' + rankOf([a, b]) + '). Elige dos vectores independientes.';
      var e1 = a, e2 = sub3(b, projOn(b, e1)), c1 = dot(v, e1) / dot(e1, e1), c2 = dot(v, e2) / dot(e2, e2);
      var p1 = mul3(c1, e1), p2 = mul3(c2, e2), p = add(p1, p2), w = sub3(v, p), h1 = unit3(e1), h2 = unit3(e2);
      var al = S ? (parseFloat(sa.value) || 0) : 0, be = S ? (parseFloat(sb.value) || 0) : 0; la.textContent = nc(al); lb.textContent = nc(be);
      var q = add(p, add(mul3(al, h1), mul3(be, h2))), K = scaleOf([v, p, a, b, q]);
      if (S) {
        S.plane(n, 0, C.b, 0.25); S.line([0, 0, 0], n, GR, 0.04);
        S.arrow(mul3(K, a), C.b, 'u1'); S.arrow(mul3(K, b), C.b, 'u2'); S.arrow(mul3(K, v), C.a, 'v');
        if (norm(p1) > 1e-6) S.arrow(mul3(K, p1), LG, '');
        if (norm(p2) > 1e-6) S.arrow(mul3(K, p), LG, '', mul3(K, p1));
        if (norm(p) > 1e-6) S.arrow(mul3(K, p), C.c, 'p');
        if (norm(w) > 1e-6) S.arrow(mul3(K, v), R_, '', mul3(K, p));
        var Kp = mul3(K, p);
        rightAngle(S, Kp, norm(p) > 1e-6 ? unit3(mul3(-1, p)) : h1, unit3(w), raSize(norm(Kp) || 0.45, K * norm(w)));
        S.sphere(mul3(K, q), PU, 0.13); S.tube(mul3(K, q), mul3(K, v), PU, 0.025);
      }
      var wn = norm(w), vq = Math.sqrt(wn * wn + al * al + be * be), dn = Math.abs(dot(v, n)) / norm(n);
      return 'Base ortogonal de U (Gram-Schmidt): e1 = u1 = ' + vtxt3(e1) + ', e2 = u2 − Proy<sub>e1</sub>u2 = ' + vtxt3(e2) + ' (e1•e2 = ' + nc(dot(e1, e2)) + ').<br>' +
        'Fourier (U Ec. 5.2): c1 = (v•e1)/(e1•e1) = ' + nc(c1) + ', c2 = (v•e2)/(e2•e2) = ' + nc(c2) + ' ⇒ <b>p</b> = c1·e1 + c2·e2 = <b>' + vtxt3(p) + '</b>' + cl(' (camino verde: dos tramos perpendiculares)') + '.<br>' +
        '<b>w</b> = v − p = ' + vtxt3(w) + cl(' (rojo)') + ', paralelo a la normal n = u1×u2 = ' + vtxt3(n) + cl(' (recta gris = U<sup>⊥</sup>)') + ': w•u1 = ' + nc(dot(w, a)) + ', w•u2 = ' + nc(dot(w, b)) + '.<br>' +
        '<b>Distancia mínima de v al plano = ‖w‖ = ' + nc(wn) + '</b> (otra vía: |v•n|/‖n‖ = ' + nc(dn) + ').' +
        (S ? ' El punto morado q ∈ U (mueve α, β) está a √(‖w‖² + α² + β²) = <b>' + nc(vq) + '</b> de v: nunca menos que ‖w‖ (U Teor. 5.4).' : ' Cualquier otro punto q ∈ U está a √(‖w‖² + ‖p−q‖²) ≥ ‖w‖ de v (U Teor. 5.4).') + esc(K);
    }
    function drawGS(M, C) {
      var u1 = M[0], u2 = M[1], u3 = M[2];
      var e1 = u1, p2 = projOn(u2, e1), e2 = sub3(u2, p2), pa = projOn(u3, e1), pb = projOn(u3, e2), p3 = add(pa, pb), e3 = sub3(u3, p3);
      var ok1 = norm(e1) > 1e-9, ok2 = ok1 && norm(e2) > 1e-9, ok3 = ok2 && norm(e3) > 1e-9, nMax = ok3 ? 4 : 0;
      if (step > nMax) step = nMax;
      var f = [e1, e2, e3].map(unit3), K = scaleOf([u1, u2, u3, e1, e2, e3, p2, p3, f[0], f[1], f[2]]);
      var t = '', fade = GR;
      function A(p, col, lab, from) { if (S) S.arrow(mul3(K, p), col, lab, from ? mul3(K, from) : undefined); }
      function ra(P0, dir, res2) { rightAngle(S, mul3(K, P0), dir, unit3(res2), raSize(K * (norm(P0) || 9), K * norm(res2))); }
      if (!ok3) {
        if (S) { A(u1, C.a, 'u1'); A(u2, C.b, 'u2'); A(u3, C.c, 'u3'); }
        t = !ok1 ? 'u1 = 0: no puede formar parte de una base.' : (!ok2 ? 'u2 es múltiplo de u1: al restar su proyección sobre e1 queda e2 = 0. Gram-Schmidt exige un sistema <b>libre</b> (U §5.1.5).' : 'u3 está en el plano ⟨u1, u2⟩: al restar su proyección sobre ⟨e1, e2⟩ queda e3 = 0. Gram-Schmidt exige un sistema <b>libre</b> (det = ' + nc(det3(u1, u2, u3)) + ').');
        info.textContent = 'Sistema dependiente'; html(text, t); return;
      }
      if (step === 0) {
        A(u1, C.a, 'u1'); A(u2, C.b, 'u2'); A(u3, C.c, 'u3');
        t = '<b>Paso 0 · punto de partida.</b> Base {u1, u2, u3} (det = ' + nc(det3(u1, u2, u3)) + ' ≠ 0: independientes) pero con ángulos no rectos: u1•u2 = ' + nc(dot(u1, u2)) + ', u1•u3 = ' + nc(dot(u1, u3)) + ', u2•u3 = ' + nc(dot(u2, u3)) + '. Vamos a «enderezarla».';
      } else if (step === 1) {
        A(u2, fade, ''); A(u3, fade, ''); A(e1, C.a, 'e1'); if (S) S.line([0, 0, 0], e1, C.a, 0.04);
        t = '<b>Paso 1 · e1 = u1</b> = ' + vtxt3(e1) + '. El primer vector se queda como está; fijamos su recta. e1•e1 = ' + nc(dot(e1, e1)) + '.';
      } else if (step === 2) {
        A(u3, fade, ''); A(u2, C.b, 'u2'); A(e1, C.a, 'e1'); A(p2, LG, 'proy'); A(e2, C.b, 'e2'); A(u2, R_, '', p2);
        if (S) S.plane(cross(e1, e2), 0, C.b, 0.18);
        ra(p2, norm(p2) > 1e-6 ? unit3(mul3(-1, p2)) : f[0], e2);
        t = '<b>Paso 2 · e2 = u2 − Proy<sub>e1</sub>u2.</b> Proy<sub>e1</sub>u2 = (u2•e1)/(e1•e1)·e1 = (' + nc(dot(u2, e1)) + '/' + nc(dot(e1, e1)) + ')·e1 = ' + vtxt3(p2) + cl(' (verde claro)') + '. Lo que queda, <b>e2 = ' + vtxt3(e2) + '</b>, es perpendicular a e1: e2•e1 = <b>' + nc(dot(e2, e1)) + '</b>' + cl(' (trazo rojo)') + '. Plano ⟨e1, e2⟩ = ⟨u1, u2⟩.';
      } else if (step === 3) {
        A(u3, C.c, 'u3'); A(e1, C.a, 'e1'); A(e2, C.b, 'e2'); A(p3, LG, 'proy'); A(e3, C.c, 'e3'); A(u3, R_, '', p3);
        if (S) S.plane(cross(e1, e2), 0, C.b, 0.18);
        ra(p3, norm(p3) > 1e-6 ? unit3(mul3(-1, p3)) : f[0], e3);
        t = '<b>Paso 3 · e3 = u3 − Proy<sub>e1</sub>u3 − Proy<sub>e2</sub>u3.</b> Coeficientes: (u3•e1)/(e1•e1) = ' + nc(dot(u3, e1) / dot(e1, e1)) + ', (u3•e2)/(e2•e2) = ' + nc(dot(u3, e2) / dot(e2, e2)) + '. Proyección sobre el plano = ' + vtxt3(p3) + '. <b>e3 = ' + vtxt3(e3) + '</b>: e3•e1 = ' + nc(dot(e3, e1)) + ', e3•e2 = ' + nc(dot(e3, e2)) + ' (y e3 ⟂ plano ⟨e1, e2⟩).';
      } else {
        A(f[0], C.a, "e1'"); A(f[1], C.b, "e2'"); A(f[2], C.c, "e3'");
        t = '<b>Paso 4 · normalizar.</b> ‖e1‖ = ' + nc(norm(e1)) + ', ‖e2‖ = ' + nc(norm(e2)) + ', ‖e3‖ = ' + nc(norm(e3)) + '. Base <b>ortonormal</b>: e1\' = ' + vtxt3(f[0]) + ', e2\' = ' + vtxt3(f[1]) + ', e3\' = ' + vtxt3(f[2]) + '. Comprobación: e1\'•e2\' = ' + nc(dot(f[0], f[1])) + ', e1\'•e3\' = ' + nc(dot(f[0], f[2])) + ', e2\'•e3\' = ' + nc(dot(f[1], f[2])) + ', normas 1 (matriz de Gram = I).';
      }
      t += esc(K);
      info.textContent = 'Paso ' + step + ' de ' + NST; html(text, t);
    }
    function draw() {
      var C = COL(), M = V.get(), t;
      if (S) S.clearDyn();
      if (modo === 'gs') { drawGS(M, C); }
      else { t = modo === 'plano' ? drawPlano(M, C) : drawRecta(M, C); html(text, t); }
      if (S) S.render();
    }
    var presets = modo === 'gs'
      ? [['U Ejemplo 5.21', [[1, 0, 1], [1, 1, 0], [0, 0, 2]]], ['Propio P9', [[1, 1, 0], [1, 0, 1], [0, 1, 1]]], ['Ya ortogonal', [[1, 0, 0], [0, 2, 0], [0, 0, 3]]], ['Dependiente (falla)', [[1, 0, 1], [2, 0, 2], [0, 1, 0]]]]
      : modo === 'plano'
        ? [['E 5.14: v=(1,1,0)', [[1, 1, 0], [1, -1, 0], [-1, 0, 1]]], ['Propio P11(b)', [[2, 0, 3], [1, 0, 1], [0, 1, 1]]], ['Plano z = 0', [[1, 2, 3], [1, 0, 0], [0, 1, 0]]], ['v dentro del plano', [[1, 1, 2], [1, 0, 1], [0, 1, 1]]], ['v perpendicular al plano', [[1, 1, 1], [1, -1, 0], [-1, 0, 1]]]]
        : [['Propio P11(a)', [[1, 2, 3], [1, 1, 1]]], ['v ⟂ d (proyección nula)', [[1, -1, 0], [1, 1, 1]]], ['v sobre la recta', [[2, 2, 2], [1, 1, 1]]], ['E 5.14: normal', [[1, 1, 0], [1, 1, 1]]]];
    var pre = btnRow(presets.map(function (p) { return p[0]; }), function (k) { V.set(presets[k][1]); step = 0; sa.value = 0; sb.value = 0; draw(); });
    var nav = null;
    if (modo === 'gs') {
      nav = el('div', 'sar-ctrl');
      [['◀ Anterior', function () { step = Math.max(0, step - 1); draw(); }], ['Siguiente ▶', function () { step = Math.min(NST, step + 1); draw(); }], ['↺ Reiniciar', function () { step = 0; draw(); }]].forEach(function (b) { var x = el('button', '', b[0]); x.type = 'button'; x.addEventListener('click', b[1]); nav.appendChild(x); });
      nav.appendChild(info);
    }
    var tit3 = { recta: 'Proyección ortogonal de v sobre una recta ⟨d⟩ de ℝ³ (producto estándar). La flecha verde p es la sombra de v sobre la recta; el segmento rojo w = v − p es perpendicular a ella (cuadradito rojo = ángulo recto) y mide la distancia mínima. Cambia v y d, o mueve el punto morado por la recta: ninguno está más cerca de v que p.',
      plano: 'Proyección ortogonal de v sobre un plano U = ⟨u1, u2⟩ de ℝ³. Se ortogonaliza la base (Gram-Schmidt), p = c1·e1 + c2·e2 (camino verde) y w = v − p es perpendicular al plano, paralelo a su normal (recta gris = U⊥). El punto morado q ∈ U está siempre más lejos de v que p.',
      gs: 'Gram-Schmidt en ℝ³ paso a paso: cada vector nuevo se «endereza» restándole su sombra sobre los anteriores. Recorre los 4 pasos (los dos últimos usan el plano ⟨e1, e2⟩ y terminan normalizando) o prueba otros tres vectores.' };
    var tit0 = { recta: 'Proyección ortogonal de v sobre una recta ⟨d⟩ de ℝ³ (producto estándar): p = (v•d)/(d•d)·d y w = v − p es perpendicular a d. Cambia v y d.',
      plano: 'Proyección ortogonal de v sobre un plano U = ⟨u1, u2⟩ de ℝ³: se ortogonaliza la base (Gram-Schmidt), p = c1·e1 + c2·e2 y w = v − p es perpendicular al plano. Cambia los vectores.',
      gs: 'Gram-Schmidt en ℝ³ paso a paso: cada vector nuevo se «endereza» restándole su sombra sobre los anteriores. Recorre los 4 pasos o prueba otros tres vectores.' };
    root.appendChild(el('p', 'sar-text an-title', (S ? tit3 : tit0)[modo]));
    root.appendChild(V.box); if (nav) root.appendChild(nav); if (S) root.appendChild(S.wrap);
    if (modo !== 'gs' && S) root.appendChild(sl);
    root.appendChild(text); root.appendChild(res); root.appendChild(pre);
    V.inp.forEach(function (r) { r.forEach(function (x) { x.addEventListener('input', draw); }); });
    [sa, sb].forEach(function (x) { x.addEventListener('input', draw); });
    if (S) S.onTheme = draw; draw();
  }

  var REG = [['.d3-proy', buildProy], ['.d3-planos', buildPlanos], ['.d3-vect', buildVect], ['.d3-nuc', buildNuc], ['.d3-propios', buildPropios]];
  function init() {
    var todo = []; REG.forEach(function (r) { document.querySelectorAll(r[0]).forEach(function (n) { todo.push([r[1], n, false]); }); });
    if (!todo.length) return;
    var go = function (t) { if (t[2]) return; t[2] = true; try { t[0](t[1]); } catch (e) { console.error(e); } };
    var io = null;
    window.addEventListener('beforeprint', function () { todo.forEach(function (t) { if (!t[2]) { if (io) io.unobserve(t[1]); go(t); } }); });   // al imprimir se construyen las figuras pendientes
    loadThree().then(function () {
      if (!('IntersectionObserver' in window)) { todo.forEach(go); return; }
      io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); var t = todo.filter(function (x) { return x[1] === e.target; })[0]; if (t) go(t); } }); }, { rootMargin: '300px' });
      todo.forEach(function (t) { t[1].style.minHeight = '300px'; io.observe(t[1]); });
    })
      .catch(function (e) { console.error(e); todo.forEach(go); });   // sin three.js: cada componente se construye en modo solo-texto (makeScene devuelve null)
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
