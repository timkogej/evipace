/*
 * Evipace — hero animation scene ("zgodba za številko")
 * Self-contained: no external assets. Renders one SVG scene that can be
 * driven to any time t (0–8 s) with render(t).
 *
 * Usage:
 *   const scene = EvipaceHero.create(containerEl, { layout: 'desktop' | 'mobile' | 'auto', lang: 'en' | 'de' });
 *   scene.render(3.2);      // draw the frame at 3.2 s
 *   scene.setLang('de');
 *   EvipaceHero.play(containerEl, opts)  // mount + play once, respects prefers-reduced-motion
 */
(function (global) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';
  var DURATION = 8;
  var ACCENT = '#FE7001';
  var INK = '#151515';
  var FONT = "Inter, 'Helvetica Neue', 'Segoe UI', Roboto, Arial, sans-serif";

  /* ------------------------------------------------------------------ copy */
  var COPY = {
    en: {
      invoiceTitle: 'Electricity invoice',
      invoiceRow: 'Active energy (kWh)',
      sheetTitle: 'Energy data',
      sheetH: ['Site', 'Month', 'kWh', 'Source'],
      qHeader: 'Supplier questionnaire',
      qSection: 'Energy & emissions',
      question: ['How was your Scope 2', 'figure calculated?'],
      answerLabel: 'DRAFT ANSWER',
      answer: ['Metered electricity use (kWh)', '\u00D7 documented emission factor'],
      sources: 'Sources: electricity invoice \u00B7 energy data sheet',
      footer: 'Illustrative example \u00B7 not client data'
    },
    de: {
      invoiceTitle: 'Stromrechnung',
      invoiceRow: 'Wirkenergie (kWh)',
      sheetTitle: 'Energiedaten',
      sheetH: ['Standort', 'Monat', 'kWh', 'Quelle'],
      qHeader: 'Lieferantenfragebogen',
      qSection: 'Energie & Emissionen',
      question: ['Wie wurde Ihre', 'Scope-2-Kennzahl berechnet?'],
      answerLabel: 'ANTWORTENTWURF',
      answer: ['Gemessener Stromverbrauch (kWh)', '\u00D7 dokumentierter Emissionsfaktor'],
      sources: 'Quellen: Stromrechnung \u00B7 Energiedatenblatt',
      footer: 'Illustratives Beispiel \u00B7 keine Kundendaten'
    }
  };

  /* --------------------------------------------- documents (local coords) */
  var DOCS = {
    invoice: { w: 280, h: 396, anchors: { rowLeft: [12, 234], rowRight: [268, 234] } },
    sheet: { w: 360, h: 240, anchors: { cellTop: [238.5, 96], cellBottom: [238.5, 120], cellLeft: [198, 108], cellRight: [279, 108] } },
    quest: { w: 440, h: 500, anchors: { answerLeft: [28, 300] } }
  };

  /* ------------------------------------------------------------- layouts
   * Positions are [x, y, scale] in world units.
   * cam: [time, centerX, centerY, width]; height = width / aspect.
   * path: four anchors (source → sheet in → sheet out → answer) with tangent directions.
   */
  var LAYOUTS = {
    desktop: {
      aspect: 1,
      factory: [0, 0, 1],
      invoice: [160, 190, 1],
      sheet: [200, 560, 1],
      quest: [500, 250, 1],
      path: [
        ['invoice', 'rowRight', [1, 0]],
        ['sheet', 'cellTop', [0, 1]],
        ['sheet', 'cellRight', [1, 0]],
        ['quest', 'answerLeft', [1, 0]]
      ],
      cam: [
        [0.0, 520, 520, 1060],
        [1.0, 535, 512, 1000],
        [2.4, 565, 500, 900],
        [3.75, 712, 478, 470],
        [4.6, 655, 505, 600],
        [6.3, 600, 505, 740],
        [7.9, 558, 500, 845]
      ]
    },
    mobile: {
      aspect: 3 / 4,
      factory: [-250, -40, 0.9],
      invoice: [250, 30, 0.62],
      sheet: [20, 120, 0.62],
      quest: [40, 250, 0.98],
      path: [
        ['invoice', 'rowLeft', [-1, 0]],
        ['sheet', 'cellRight', [-1, 0]],
        ['sheet', 'cellLeft', [-1, 0]],
        ['quest', 'answerLeft', [1, 0]]
      ],
      cam: [
        [0.0, 260, 390, 660],
        [1.0, 258, 372, 610],
        [2.4, 246, 265, 505],
        [3.75, 256, 470, 420],
        [4.6, 250, 440, 505],
        [6.3, 248, 405, 550],
        [7.9, 246, 388, 555]
      ]
    }
  };

  /* ------------------------------------------------------------- timing */
  var T = {
    veil: [1.0, 2.3],
    invoiceIn: [1.0, 1.95],
    sheetIn: [1.3, 2.25],
    invHi: [1.7, 2.1],
    sheetHi: [2.0, 2.35],
    questIn: [2.45, 3.3],
    focus: [3.0, 3.6],
    line1: [4.35, 5.0],
    line2: [5.0, 5.6],
    answerBox: [5.5, 5.85],
    typing: [5.65, 6.8],
    sources: [6.8, 7.35],
    caretOff: 7.3
  };

  /* ------------------------------------------------------------ helpers */
  function clamp(v, a, b) { return Math.min(b === undefined ? 1 : b, Math.max(a === undefined ? 0 : a, v)); }
  function prog(t, r) { return clamp((t - r[0]) / (r[1] - r[0])); }
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }
  function easeInOut(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function lerp(a, b, p) { return a + (b - a) * p; }
  function f(n) { return Math.round(n * 1000) / 1000; }

  // Monotone cubic (Fritsch–Butland) spline — one continuous, overshoot-free camera move.
  function spline(ts, ys) {
    var n = ts.length, d = [], m = new Array(n), i;
    for (i = 0; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i]) / (ts[i + 1] - ts[i]);
    m[0] = 0; m[n - 1] = 0;
    for (i = 1; i < n - 1; i++) {
      if (d[i - 1] * d[i] <= 0) { m[i] = 0; continue; }
      var h0 = ts[i] - ts[i - 1], h1 = ts[i + 1] - ts[i];
      var w1 = 2 * h1 + h0, w2 = h1 + 2 * h0;
      m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
    }
    return function (t) {
      if (t <= ts[0]) return ys[0];
      if (t >= ts[n - 1]) return ys[n - 1];
      var k = 0;
      while (t > ts[k + 1]) k++;
      var h = ts[k + 1] - ts[k], s = (t - ts[k]) / h, s2 = s * s, s3 = s2 * s;
      return (2 * s3 - 3 * s2 + 1) * ys[k] + (s3 - 2 * s2 + s) * h * m[k] +
        (-2 * s3 + 3 * s2) * ys[k + 1] + (s3 - s2) * h * m[k + 1];
    };
  }

  // Deterministic pseudo-random for placeholder bar widths.
  function rng(seed) {
    var s = seed;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }

  /* ------------------------------------------------------------ markup */
  function factorySVG() {
    var s = '', x, i;
    s += '<rect x="-800" y="-800" width="2600" height="2600" fill="#F8F8F6"/>';
    s += '<rect x="-800" y="150" width="2600" height="490" fill="#FBFBFA"/>';
    for (x = -800; x <= 1700; x += 160) {
      s += '<polygon points="' + x + ',150 ' + (x + 120) + ',96 ' + (x + 120) + ',150" fill="#F2F2EF" stroke="#DADAD5" stroke-width="1.2" stroke-linejoin="round"/>';
      s += '<line x1="' + (x + 120) + '" y1="98" x2="' + (x + 160) + '" y2="98" stroke="#E4E4E0"/>';
    }
    s += '<line x1="-800" y1="150" x2="1800" y2="150" stroke="#D2D2CD" stroke-width="2"/>';
    for (x = -440; x <= 1400; x += 160) {
      s += '<rect x="' + x + '" y="215" width="112" height="170" fill="#F1F1EE" stroke="#DEDED9"/>' +
        '<line x1="' + (x + 56) + '" y1="215" x2="' + (x + 56) + '" y2="385" stroke="#E3E3DE"/>' +
        '<line x1="' + x + '" y1="300" x2="' + (x + 112) + '" y2="300" stroke="#E3E3DE"/>';
    }
    // cable tray
    s += '<rect x="-800" y="186" width="1640" height="9" fill="#EDEDEA" stroke="#D6D6D1"/>';
    // floor
    s += '<rect x="-800" y="640" width="2600" height="1200" fill="#F1F1EE"/>';
    s += '<line x1="-800" y1="640" x2="1800" y2="640" stroke="#DCDCD7" stroke-width="1.5"/>';
    for (i = -8; i <= 14; i++) {
      var xb = 500 + i * 170, xt = 500 + i * 170 * 0.22;
      s += '<line x1="' + f(xt) + '" y1="640" x2="' + f(xb + (xb - xt) * 0.6) + '" y2="1300" stroke="#E6E6E2"/>';
    }
    [668, 708, 764, 846, 960, 1120].forEach(function (y) {
      s += '<line x1="-800" y1="' + y + '" x2="1800" y2="' + y + '" stroke="#E9E9E5"/>';
    });

    // machine 2 (far)
    s += '<path d="M505 195 V512" stroke="#DCDCD7" stroke-width="2.5" fill="none"/>' +
      '<rect x="430" y="636" width="176" height="8" rx="4" fill="#E7E7E3"/>' +
      '<polygon points="430,530 580,530 604,512 454,512" fill="#F6F6F4" stroke="#D6D6D1"/>' +
      '<polygon points="580,530 604,512 604,622 580,640" fill="#EDEDEA" stroke="#D6D6D1"/>' +
      '<rect x="430" y="530" width="150" height="110" fill="#FFFFFF" stroke="#D6D6D1"/>' +
      '<rect x="444" y="546" width="80" height="58" rx="3" fill="#F2F2EF" stroke="#DADAD5"/>' +
      '<rect x="534" y="546" width="34" height="46" rx="2" fill="#F7F7F5" stroke="#DADAD5"/>' +
      '<rect x="540" y="553" width="22" height="12" rx="1.5" fill="#E4E4E0"/>';

    // machine 1 (near)
    s += '<path d="M230 195 V440" stroke="#D9D9D4" stroke-width="3" fill="none"/>' +
      '<rect x="84" y="664" width="306" height="12" rx="6" fill="#E5E5E1"/>' +
      '<polygon points="90,470 340,470 380,440 130,440" fill="#F6F6F4" stroke="#D3D3CE"/>' +
      '<polygon points="340,470 380,440 380,640 340,670" fill="#ECECE9" stroke="#D3D3CE"/>' +
      '<rect x="90" y="470" width="250" height="200" fill="#FFFFFF" stroke="#D3D3CE"/>' +
      '<rect x="112" y="494" width="134" height="104" rx="4" fill="#F2F2EF" stroke="#D6D6D1"/>' +
      '<rect x="170" y="494" width="18" height="40" fill="#E3E3DF"/>' +
      '<path d="M173 534 h12 l-6 14 z" fill="#D5D5D0"/>' +
      '<rect x="128" y="576" width="102" height="8" fill="#E0E0DB"/>' +
      '<rect x="262" y="494" width="58" height="86" rx="3" fill="#F7F7F5" stroke="#D6D6D1"/>' +
      '<rect x="270" y="503" width="42" height="26" rx="2" fill="#E4E4E0"/>' +
      '<circle cx="279" cy="546" r="5" fill="#DEDED9"/><circle cx="303" cy="546" r="5" fill="#DEDED9"/>' +
      '<rect x="272" y="562" width="38" height="6" rx="3" fill="#E6E6E2"/>' +
      '<line x1="112" y1="640" x2="320" y2="640" stroke="#E2E2DE"/>';

    // electricity meter cabinet (foreground)
    s += '<path d="M735 195 V380 M760 195 V380" stroke="#D3D3CE" stroke-width="4" fill="none"/>' +
      '<rect x="728" y="260" width="40" height="8" rx="2" fill="#E3E3DF"/>' +
      '<rect x="650" y="776" width="250" height="14" rx="7" fill="#E4E4E0"/>' +
      '<rect x="660" y="380" width="230" height="400" rx="6" fill="#FFFFFF" stroke="#CDCDC8" stroke-width="1.5"/>' +
      '<rect x="674" y="394" width="202" height="372" rx="3" fill="none" stroke="#E8E8E4"/>' +
      '<rect x="705" y="428" width="140" height="156" rx="10" fill="#F7F7F5" stroke="#C8C8C3"/>' +
      '<rect x="724" y="450" width="102" height="38" rx="4" fill="#1D1D1C"/>';
    for (i = 0; i < 5; i++) s += '<rect x="' + (733 + i * 17.5) + '" y="461" width="12" height="16" rx="1.5" fill="#2F2F2D"/>';
    s += '<rect x="724" y="500" width="58" height="5" rx="2" fill="#DADAD5"/>' +
      '<rect x="724" y="510" width="40" height="5" rx="2" fill="#E3E3DF"/>' +
      '<circle cx="804" cy="507" r="3" fill="#D7D7D2"/>' +
      '<circle data-r="led" cx="818" cy="507" r="4.5" fill="' + ACCENT + '"/>' +
      '<rect x="724" y="530" width="102" height="36" rx="3" fill="#ECECE9"/>';
    [742, 767, 792, 817].forEach(function (cx) { s += '<circle cx="' + cx + '" cy="548" r="4" fill="#D9D9D4"/>'; });
    s += '<path d="M752 584 V605 M775 584 V605 M798 584 V605" stroke="#CFCFCA" stroke-width="2"/>';
    s += '<line x1="680" y1="605" x2="870" y2="605" stroke="#DCDCD7"/><line x1="680" y1="672" x2="870" y2="672" stroke="#DCDCD7"/>';
    for (i = 0; i < 8; i++) {
      var bx = 684 + i * 23;
      s += '<rect x="' + bx + '" y="612" width="18" height="52" rx="2" fill="#F5F5F3" stroke="#D2D2CD"/>' +
        '<rect x="' + (bx + 5) + '" y="628" width="8" height="14" rx="1.5" fill="#BEBEB9"/>';
    }
    s += '<rect x="862" y="690" width="6" height="40" rx="3" fill="#DADAD5"/>';
    return s;
  }

  function shadowSVG(w, h, uid, lightweight) {
    if (lightweight) {
      return '<g data-sh="1">' +
        '<rect data-amb="1" x="4" y="7" width="' + (w - 8) + '" height="' + (h - 4) + '" rx="6" fill="' + INK + '" opacity="0.08"/>' +
        '</g>';
    }
    return '<g data-sh="1">' +
      '<rect data-amb="1" x="10" y="16" width="' + (w - 20) + '" height="' + (h - 10) + '" rx="6" fill="' + INK + '" opacity="0.09" filter="url(#' + uid + '-blur-l)"/>' +
      '<rect x="1" y="2" width="' + (w - 2) + '" height="' + h + '" rx="4" fill="' + INK + '" opacity="0.06" filter="url(#' + uid + '-blur-s)"/>' +
      '</g>';
  }

  function invoiceSVG() {
    var s = '', i;
    s += '<rect width="280" height="396" rx="3" fill="#FFFFFF" stroke="#E4E4E0"/>';
    s += '<circle cx="33" cy="35" r="11" fill="none" stroke="' + INK + '" stroke-width="1.2"/>' +
      '<path d="M34.6 28 L29.4 36 H33 L31.6 42 L36.8 34 H33.2 Z" fill="' + INK + '"/>';
    s += '<text data-k="invoiceTitle" data-maxw="140" data-fs="13" x="52" y="39.5" font-size="13" font-weight="600" fill="' + INK + '"></text>';
    s += '<rect x="196" y="27" width="62" height="6" rx="2" fill="#E3E3DF"/><rect x="214" y="39" width="44" height="6" rx="2" fill="#EBEBE8"/>';
    s += '<line x1="22" y1="62" x2="258" y2="62" stroke="#ECECE8"/>';
    [[22, 80, 90], [22, 92, 70], [22, 104, 80], [150, 80, 80], [150, 92, 100], [150, 104, 60]].forEach(function (b) {
      s += '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="6" rx="2" fill="#EBEBE8"/>';
    });
    s += '<rect x="22" y="126" width="60" height="5" rx="2" fill="#D9D9D5"/>';
    [26, 30, 34, 28, 22, 18, 16, 18, 24, 30, 36, 32].forEach(function (hh, k) {
      s += '<rect x="' + (22 + k * 20) + '" y="' + (184 - hh) + '" width="12" height="' + hh + '" rx="1.5" fill="#E6E6E2"/>';
    });
    s += '<line x1="22" y1="184.5" x2="258" y2="184.5" stroke="#DADAD6"/>';
    s += '<line x1="12" y1="194" x2="268" y2="194" stroke="#ECECE8"/>';
    var lw = [110, 0, 96, 120, 84], rw = [44, 0, 38, 50, 36];
    for (i = 0; i < 5; i++) {
      var cy = 206 + i * 28;
      if (i === 1) {
        s += '<rect data-r="invWash" x="12" y="223" width="0" height="22" rx="3" fill="' + ACCENT + '" opacity="0.2"/>';
        s += '<text data-k="invoiceRow" data-maxw="170" data-fs="10.5" x="22" y="237.8" font-size="10.5" font-weight="500" fill="#3A3A37"></text>';
        s += '<rect data-r="invKey" x="206" y="231" width="52" height="6" rx="2" fill="' + INK + '" opacity="0.45"/>';
      } else {
        s += '<rect x="22" y="' + (cy - 3) + '" width="' + lw[i] + '" height="6" rx="2" fill="#E6E6E2"/>';
        s += '<rect x="' + (258 - rw[i]) + '" y="' + (cy - 3) + '" width="' + rw[i] + '" height="6" rx="2" fill="#DDDDD9"/>';
      }
      s += '<line x1="12" y1="' + (cy + 14) + '" x2="268" y2="' + (cy + 14) + '" stroke="#F1F1ED"/>';
    }
    s += '<line x1="12" y1="338" x2="268" y2="338" stroke="#DCDCD8"/>';
    s += '<rect x="22" y="350" width="70" height="7" rx="2" fill="#D5D5D1"/>';
    s += '<rect x="196" y="349" width="62" height="9" rx="2" fill="' + INK + '" opacity="0.8"/>';
    s += '<rect x="22" y="372" width="150" height="4" rx="2" fill="#EFEFEC"/><rect x="22" y="380" width="110" height="4" rx="2" fill="#EFEFEC"/>';
    return s;
  }

  function sheetSVG() {
    var s = '', cols = [36, 117, 198, 279, 360], r, c, R = rng(7);
    s += '<rect width="360" height="240" rx="3" fill="#FFFFFF" stroke="#E4E4E0"/>';
    s += '<path d="M0.5 26 V3.5 a3 3 0 0 1 3 -3 H356.5 a3 3 0 0 1 3 3 V26 Z" fill="#F8F8F6"/>';
    s += '<rect x="14" y="9" width="9" height="9" rx="1.5" fill="none" stroke="' + INK + '" stroke-width="1"/>' +
      '<line x1="14" y1="13.5" x2="23" y2="13.5" stroke="' + INK + '" stroke-width="0.8"/><line x1="18.5" y1="9" x2="18.5" y2="18" stroke="' + INK + '" stroke-width="0.8"/>';
    s += '<text data-k="sheetTitle" data-maxw="200" data-fs="11" x="30" y="17.5" font-size="11" font-weight="600" fill="' + INK + '"></text>';
    s += '<rect x="290" y="11" width="56" height="5" rx="2" fill="#E6E6E2"/>';
    s += '<rect x="0.5" y="26" width="359" height="22" fill="#FBFBFA"/>';
    for (c = 0; c < 4; c++) {
      s += '<text data-k="sheetH" data-i="' + c + '" data-maxw="66" data-fs="9.5" x="' + (cols[c] + 8) + '" y="40.5" font-size="9.5" font-weight="600" fill="#6E6E69"></text>';
    }
    for (c = 0; c < 5; c++) {
      if (c > 0 && c < 4) s += '<line x1="' + cols[c] + '" y1="26" x2="' + cols[c] + '" y2="240" stroke="#EDEDEA"/>';
    }
    s += '<line x1="36" y1="26" x2="36" y2="240" stroke="#EDEDEA"/>';
    for (r = 0; r <= 8; r++) {
      var ly = 26 + (r === 0 ? 0 : 22 + 24 * (r - 1));
      s += '<line x1="0" y1="' + ly + '" x2="360" y2="' + ly + '" stroke="#EDEDEA"/>';
    }
    for (r = 0; r < 8; r++) {
      var y = 48 + 24 * r, cy = y + 12;
      s += '<rect x="13" y="' + (cy - 2) + '" width="10" height="4" rx="2" fill="#E6E6E2"/>';
      var total = r === 7;
      s += '<rect x="44" y="' + (cy - 3) + '" width="' + Math.round(34 + R() * 18) + '" height="6" rx="2" fill="' + (total ? '#D5D5D1' : '#E8E8E5') + '"/>';
      if (!total) s += '<rect x="125" y="' + (cy - 3) + '" width="' + Math.round(28 + R() * 14) + '" height="6" rx="2" fill="#E8E8E5"/>';
      var kw = Math.round(30 + R() * 22);
      if (r === 2) {
        s += '<rect data-r="sheetWash" x="198" y="96" width="0" height="24" fill="' + ACCENT + '" opacity="0.22"/>';
        s += '<rect data-r="sheetKey" x="' + (271 - 40) + '" y="' + (cy - 3) + '" width="40" height="6" rx="2" fill="' + INK + '" opacity="0.45"/>';
      } else {
        s += '<rect x="' + (271 - kw) + '" y="' + (cy - 3) + '" width="' + kw + '" height="6" rx="2" fill="' + (total ? INK : '#D9D9D5') + '" opacity="' + (total ? 0.7 : 1) + '"/>';
      }
      if (!total) s += '<rect x="287" y="' + (cy - 3) + '" width="' + Math.round(24 + R() * 22) + '" height="6" rx="2" fill="#ECECE9"/>';
    }
    s += '<line x1="36" y1="216" x2="360" y2="216" stroke="' + INK + '" stroke-opacity="0.3"/>';
    s += '<rect data-r="sheetOutline" x="198" y="96" width="81" height="24" fill="none" stroke="' + INK + '" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity="0"/>';
    return s;
  }

  function questSVG() {
    var s = '';
    s += '<rect width="440" height="500" rx="4" fill="#FFFFFF" stroke="#E4E4E0"/>';
    s += '<text data-k="qHeader" data-maxw="260" data-fs="11.5" x="28" y="38" font-size="11.5" fill="#6E6E69"></text>';
    s += '<g data-r="dimTop"><rect x="330" y="29" width="82" height="6" rx="2" fill="#ECECE9"/>' +
      '<rect x="330" y="41" width="82" height="3" rx="1.5" fill="#EFEFEC"/><rect x="330" y="41" width="52" height="3" rx="1.5" fill="' + INK + '" opacity="0.7"/></g>';
    s += '<text data-k="qSection" data-maxw="380" data-fs="15" x="28" y="74" font-size="15" font-weight="600" fill="' + INK + '"></text>';
    s += '<line x1="28" y1="90" x2="412" y2="90" stroke="#ECECE8"/>';
    s += '<g data-r="q1"><rect x="28" y="106" width="250" height="7" rx="2" fill="#E3E3DF"/>' +
      '<rect x="28" y="119" width="170" height="7" rx="2" fill="#E3E3DF"/>' +
      '<rect x="28" y="136" width="384" height="22" rx="4" fill="#FAFAF8" stroke="#EDEDEA"/>' +
      '<rect x="38" y="144" width="150" height="6" rx="2" fill="#E6E6E2"/></g>';
    s += '<rect data-r="marker" x="14" y="180" width="3" height="56" rx="1.5" fill="' + INK + '" opacity="0"/>';
    s += '<text data-k="question" data-i="0" data-fit="question" data-maxw="384" data-fs="23" x="28" y="200" font-size="23" font-weight="600" letter-spacing="-0.2" fill="' + INK + '"></text>';
    s += '<text data-k="question" data-i="1" data-fit="question" data-maxw="384" data-fs="23" x="28" y="229" font-size="23" font-weight="600" letter-spacing="-0.2" fill="' + INK + '"></text>';
    s += '<rect x="28" y="250" width="384" height="100" rx="6" fill="#FCFCFB" stroke="#E4E4E0"/>';
    s += '<rect data-r="boxAccent" x="28" y="250" width="384" height="100" rx="6" fill="none" stroke="' + ACCENT + '" stroke-width="1.2" vector-effect="non-scaling-stroke" opacity="0"/>';
    s += '<text data-k="answerLabel" data-maxw="300" data-fs="9.5" x="44" y="273" font-size="9.5" font-weight="600" letter-spacing="1" fill="#8A8A85"></text>';
    s += '<text data-r="ans0" data-fit="answer" data-maxw="352" data-fs="18" x="44" y="305" font-size="18" font-weight="600" fill="' + ACCENT + '"></text>';
    s += '<text data-r="ans1" data-fit="answer" data-maxw="352" data-fs="18" x="44" y="331" font-size="18" font-weight="600" fill="' + ACCENT + '"></text>';
    s += '<rect data-r="caret" x="44" y="290" width="2" height="19" fill="' + ACCENT + '" opacity="0"/>';
    s += '<text data-k="sources" data-r="sources" data-maxw="384" data-fs="11.5" x="28" y="376" font-size="11.5" fill="#6E6E69" opacity="0"></text>';
    s += '<g data-r="q3"><rect x="28" y="402" width="230" height="7" rx="2" fill="#E3E3DF"/>' +
      '<rect x="28" y="415" width="150" height="7" rx="2" fill="#E3E3DF"/>' +
      '<rect x="28" y="432" width="384" height="22" rx="4" fill="#FAFAF8" stroke="#EDEDEA"/></g>';
    s += '<line x1="28" y1="470" x2="412" y2="470" stroke="#ECECE8"/>';
    s += '<text data-k="footer" data-maxw="300" data-fs="10" x="28" y="488" font-size="10" fill="#9A9A95"></text>';
    s += '<rect x="372" y="483" width="40" height="5" rx="2" fill="#EFEFEC"/>';
    return s;
  }

  var counter = 0;

  function markup(L, uid, lightweight) {
    function doc(name, inner) {
      var d = DOCS[name];
      return '<g data-r="' + name + '" opacity="0">' + shadowSVG(d.w, d.h, uid, lightweight) + inner + '</g>';
    }
    return '' +
      (lightweight ? '' : '<defs>' +
      '<filter id="' + uid + '-blur-l" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>' +
      '<filter id="' + uid + '-blur-s" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="1.6"/></filter>' +
      '</defs>') +
      '<g font-family="' + FONT.replace(/"/g, "'") + '" text-rendering="' + (lightweight ? 'auto' : 'geometricPrecision') + '">' +
      '<g data-r="factory">' + factorySVG() + '</g>' +
      '<rect data-r="veil" x="-3000" y="-3000" width="7000" height="7000" fill="#F8F8F6" opacity="0"/>' +
      doc('invoice', invoiceSVG()) +
      doc('sheet', sheetSVG()) +
      doc('quest', questSVG()) +
      '<g data-r="trace" fill="none" stroke="' + ACCENT + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<path data-r="seg1" vector-effect="non-scaling-stroke"/>' +
      '<path data-r="seg2" vector-effect="non-scaling-stroke"/>' +
      '</g>' +
      '<g data-r="dots" fill="' + ACCENT + '" stroke="#FFFFFF" stroke-width="1.5">' +
      '<circle data-r="dotA" r="0" vector-effect="non-scaling-stroke"/>' +
      '<circle data-r="dotB" r="0" vector-effect="non-scaling-stroke"/>' +
      '<circle data-r="dotC" r="0" vector-effect="non-scaling-stroke"/>' +
      '<circle data-r="dotD" r="0" vector-effect="non-scaling-stroke"/>' +
      '</g>' +
      '</g>';
  }

  /* ------------------------------------------------------------- scene */
  function create(container, opts) {
    opts = opts || {};
    var lang = COPY[opts.lang] ? opts.lang : 'en';
    var layoutPref = opts.layout || 'auto';
    var uid = 'evh' + (++counter);
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('xmlns', NS);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Illustrative animation: electricity invoice and energy data feed a traceable draft answer to a customer ESG question.');
    svg.style.display = 'block';
    svg.style.width = '100%';
    svg.style.height = '100%';
    container.appendChild(svg);

    var L, layoutName, refs, cam, lens = [0, 0], anchors = [], answerLines = ['', ''], lastT = 0;
    var size = { w: 0, h: 0 };

    function measure() {
      var r = container.getBoundingClientRect();
      size.w = r.width || 1; size.h = r.height || 1;
    }

    function chooseLayout() {
      if (layoutPref !== 'auto') return layoutPref;
      return size.w / size.h < 0.9 ? 'mobile' : 'desktop';
    }

    function docTransform(name, dx, dy, k) {
      var p = L[name], d = DOCS[name];
      var cx = d.w / 2, cy = d.h / 2, s = p[2];
      return 'translate(' + f(p[0] + dx + cx * s) + ' ' + f(p[1] + dy + cy * s) + ') scale(' + f(s * k) + ') translate(' + (-cx) + ' ' + (-cy) + ')';
    }

    function world(name, key) {
      var p = L[name], a = DOCS[name].anchors[key];
      return [p[0] + a[0] * p[2], p[1] + a[1] * p[2]];
    }

    function cubic(p0, d0, p1, d1) {
      var dist = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      var k = Math.min(dist * 0.45, 120);
      return 'M' + f(p0[0]) + ' ' + f(p0[1]) +
        ' C' + f(p0[0] + d0[0] * k) + ' ' + f(p0[1] + d0[1] * k) +
        ' ' + f(p1[0] - d1[0] * k) + ' ' + f(p1[1] - d1[1] * k) +
        ' ' + f(p1[0]) + ' ' + f(p1[1]);
    }

    function build() {
      layoutName = chooseLayout();
      L = LAYOUTS[layoutName];
      svg.setAttribute('data-layout', layoutName);
      svg.innerHTML = markup(L, uid, layoutName === 'mobile');
      refs = {};
      Array.prototype.forEach.call(svg.querySelectorAll('[data-r]'), function (el) { refs[el.getAttribute('data-r')] = el; });
      var ts = L.cam.map(function (k) { return k[0]; });
      cam = {
        x: spline(ts, L.cam.map(function (k) { return k[1]; })),
        y: spline(ts, L.cam.map(function (k) { return k[2]; })),
        w: spline(ts, L.cam.map(function (k) { return k[3]; }))
      };
      var fp = L.factory;
      refs.factory.setAttribute('data-base', fp.join(','));
      anchors = L.path.map(function (a) { return { p: world(a[0], a[1]), d: a[2] }; });
      refs.seg1.setAttribute('d', cubic(anchors[0].p, anchors[0].d, anchors[1].p, anchors[1].d));
      refs.seg2.setAttribute('d', cubic(anchors[2].p, anchors[2].d, anchors[3].p, anchors[3].d));
      ['dotA', 'dotB', 'dotC', 'dotD'].forEach(function (id, i) {
        refs[id].setAttribute('cx', f(anchors[i].p[0]));
        refs[id].setAttribute('cy', f(anchors[i].p[1]));
      });
      applyLang();
    }

    function fitGroup(els, maxw) {
      var base = parseFloat(els[0].getAttribute('data-fs'));
      els.forEach(function (el) { el.setAttribute('font-size', base); });
      var widest = 0;
      els.forEach(function (el) { widest = Math.max(widest, el.getComputedTextLength()); });
      if (widest > maxw) {
        var fs = Math.floor(base * (maxw / widest) * 10) / 10;
        els.forEach(function (el) { el.setAttribute('font-size', fs); });
      }
    }

    function applyLang() {
      var c = COPY[lang];
      Array.prototype.forEach.call(svg.querySelectorAll('[data-k]'), function (el) {
        var v = c[el.getAttribute('data-k')];
        if (Array.isArray(v)) v = v[+el.getAttribute('data-i')];
        el.textContent = v;
        if (!el.getAttribute('data-fit')) fitGroup([el], parseFloat(el.getAttribute('data-maxw')));
      });
      fitGroup([svg.querySelector('[data-k="question"][data-i="0"]'), svg.querySelector('[data-k="question"][data-i="1"]')], 384);
      // fit answer on the full strings, then typing reveals substrings
      refs.ans0.textContent = c.answer[0];
      refs.ans1.textContent = c.answer[1];
      fitGroup([refs.ans0, refs.ans1], 352);
      answerLines = c.answer.slice();
      try { lens = [refs.seg1.getTotalLength(), refs.seg2.getTotalLength()]; } catch { lens = [600, 400]; }
      refs.seg1.setAttribute('stroke-dasharray', f(lens[0]) + ' ' + f(lens[0] + 2));
      refs.seg2.setAttribute('stroke-dasharray', f(lens[1]) + ' ' + f(lens[1] + 2));
      render(lastT);
    }

    function setOpacity(el, v) { el.setAttribute('opacity', f(clamp(v))); }

    function enterDoc(name, t, range, from) {
      var p = easeOut(prog(t, range));
      var el = refs[name];
      el.setAttribute('transform', docTransform(name, from[0] * (1 - p), from[1] * (1 - p), 1 + 0.035 * (1 - p)));
      setOpacity(el, prog(t, [range[0], range[0] + (range[1] - range[0]) * 0.45]));
      var amb = el.querySelector('[data-amb]');
      amb.setAttribute('transform', 'translate(0 ' + f(14 * (1 - p)) + ')');
      amb.setAttribute('opacity', f(lerp(0.035, 0.09, p)));
    }

    function render(t) {
      lastT = t = clamp(t, 0, DURATION);
      if (!refs) return;

      /* camera — one continuous push-in and pull-back */
      var a = size.w / size.h || L.aspect;
      var lightweight = layoutName === 'mobile';
      // On phones the camera stays calm. Moving the viewBox forces the whole
      // detailed factory scene to repaint and is the main source of stutter in
      // mobile Safari; the documents and trace still carry the full story.
      var cameraX = lightweight ? 246 : cam.x(t);
      var cameraY = lightweight ? 388 : cam.y(t);
      var w = lightweight ? 555 : cam.w(t), hReq = w / L.aspect, vw, vh;
      if (a > L.aspect) { vh = hReq; vw = vh * a; } else { vw = w; vh = vw / a; }
      var viewBox = f(cameraX - vw / 2) + ' ' + f(cameraY - vh / 2) + ' ' + f(vw) + ' ' + f(vh);
      if (svg.getAttribute('viewBox') !== viewBox) svg.setAttribute('viewBox', viewBox);

      /* source of the data: factory + meter */
      var fp = L.factory, fk = lightweight ? 1 : 1 + 0.025 * easeInOut(prog(t, [0, 2.4]));
      var factoryTransform = 'translate(' + f(fp[0] + 500 * fp[2]) + ' ' + f(fp[1] + 560 * fp[2]) + ') scale(' + f(fp[2] * fk) + ') translate(-500 -560)';
      if (refs.factory.getAttribute('transform') !== factoryTransform) refs.factory.setAttribute('transform', factoryTransform);
      if (!lightweight || refs.led.getAttribute('opacity') !== '0.9') {
        setOpacity(refs.led, lightweight ? 0.9 : 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(t * Math.PI * 2 / 1.3)));
      }
      setOpacity(refs.veil, 0.8 * easeInOut(prog(t, T.veil)));

      /* documents placed calmly into the workspace */
      enterDoc('invoice', t, T.invoiceIn, [0, 34]);
      enterDoc('sheet', t, T.sheetIn, [0, 34]);
      enterDoc('quest', t, T.questIn, [44, 22]);

      /* momentary highlight of the two relevant values */
      var hi1 = easeInOut(prog(t, T.invHi));
      refs.invWash.setAttribute('width', f(256 * hi1));
      setOpacity(refs.invWash, lerp(0.22, 0.12, prog(t, [2.15, 2.8])));
      setOpacity(refs.invKey, lerp(0.45, 0.85, hi1));
      var hi2 = easeInOut(prog(t, T.sheetHi));
      refs.sheetWash.setAttribute('width', f(81 * hi2));
      setOpacity(refs.sheetWash, lerp(0.24, 0.13, prog(t, [2.45, 3.0])));
      setOpacity(refs.sheetKey, lerp(0.45, 0.85, hi2));
      setOpacity(refs.sheetOutline, 0.85 * prog(t, [2.15, 2.5]));

      /* the question becomes the focus */
      var fo = easeInOut(prog(t, T.focus));
      setOpacity(refs.marker, fo);
      setOpacity(refs.q1, 1 - 0.55 * fo);
      setOpacity(refs.q3, 1 - 0.55 * fo);
      setOpacity(refs.dimTop, 1 - 0.4 * fo);

      /* traceability line: source → calculation → answer */
      var l1 = easeInOut(prog(t, T.line1)), l2 = easeInOut(prog(t, T.line2));
      refs.seg1.setAttribute('stroke-dashoffset', f(lens[0] * (1 - l1)));
      refs.seg2.setAttribute('stroke-dashoffset', f(lens[1] * (1 - l2)));
      refs.seg1.style.visibility = l1 > 0 ? 'visible' : 'hidden';
      refs.seg2.style.visibility = l2 > 0 ? 'visible' : 'hidden';
      var R = 3.4;
      refs.dotA.setAttribute('r', f(R * easeOut(prog(t, [T.line1[0] - 0.05, T.line1[0] + 0.2]))));
      refs.dotB.setAttribute('r', f(R * easeOut(prog(t, [T.line1[1] - 0.05, T.line1[1] + 0.15]))));
      refs.dotC.setAttribute('r', f(R * easeOut(prog(t, [T.line1[1], T.line1[1] + 0.2]))));
      refs.dotD.setAttribute('r', f(R * easeOut(prog(t, [T.line2[1] - 0.05, T.line2[1] + 0.2]))));
      setOpacity(refs.boxAccent, 0.55 * prog(t, T.answerBox));

      /* answer is written */
      var n0 = answerLines[0].length, n1 = answerLines[1].length;
      var chars = Math.round(prog(t, T.typing) * (n0 + n1));
      var s0 = answerLines[0].slice(0, Math.min(chars, n0));
      var s1 = chars > n0 ? answerLines[1].slice(0, chars - n0) : '';
      if (refs.ans0.textContent !== s0) refs.ans0.textContent = s0;
      if (refs.ans1.textContent !== s1) refs.ans1.textContent = s1;
      var onSecond = chars > n0;
      var lineEl = onSecond ? refs.ans1 : refs.ans0;
      var cw = lineEl.textContent ? lineEl.getComputedTextLength() : 0;
      var fs = parseFloat(lineEl.getAttribute('font-size'));
      refs.caret.setAttribute('x', f(44 + cw + 2));
      refs.caret.setAttribute('y', f(parseFloat(lineEl.getAttribute('y')) - fs * 0.82));
      refs.caret.setAttribute('height', f(fs * 1.05));
      var caretOn = t >= T.typing[0] - 0.1 && t < T.caretOff;
      var blink = t > T.typing[1] ? (Math.floor((t - T.typing[1]) / 0.45) % 2 === 0 ? 1 : 0.15) : 1;
      setOpacity(refs.caret, caretOn ? blink * (1 - prog(t, [T.caretOff - 0.2, T.caretOff])) : 0);
      var so = easeInOut(prog(t, T.sources));
      setOpacity(refs.sources, so);
      refs.sources.setAttribute('transform', 'translate(0 ' + f(4 * (1 - so)) + ')');
    }

    function setLang(l) {
      if (!COPY[l]) return;
      lang = l;
      applyLang();
    }

    measure();
    build();
    var ro = null;
    if (global.ResizeObserver) {
      ro = new ResizeObserver(function () {
        measure();
        if (chooseLayout() !== layoutName) build(); else render(lastT);
      });
      ro.observe(container);
    }

    var destroyed = false;
    return {
      render: render,
      setLang: setLang,
      get layout() { return layoutName; },
      duration: DURATION,
      destroy: function () { destroyed = true; if (ro) ro.disconnect(); svg.remove(); },
      get destroyed() { return destroyed; }
    };
  }

  /* Convenience for the real hero: mount and play once (no loop). */
  function play(container, opts) {
    var scene = create(container, opts);
    var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { scene.render(DURATION); return scene; }
    var start = null;
    var lastFrame = -Infinity;
    scene.render(0);
    function tick(now) {
      if (scene.destroyed) return;
      if (start === null) start = now;
      var t = (now - start) / 1000;
      // The mobile composition is deliberately rendered at a film-like 30fps.
      // Combined with its lighter shadows this avoids overloaded, uneven frames
      // on mobile Safari while keeping the full eight-second story and timing.
      var frameInterval = scene.layout === 'mobile' ? 1000 / 30 : 0;
      if (now - lastFrame >= frameInterval || t >= DURATION) {
        scene.render(t);
        lastFrame = now;
      }
      if (t < DURATION) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    return scene;
  }

  global.EvipaceHero = { create: create, play: play, DURATION: DURATION, COPY: COPY, LAYOUTS: LAYOUTS, TIMING: T };
})(window);
