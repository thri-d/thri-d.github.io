/* Shared engine for the visual explainers. Every diagram is plain SVG or HTML, sized to its container. */
const VIZ = {};
const NS = "http://www.w3.org/2000/svg";

function sv(tag, a, p) {
  const e = document.createElementNS(NS, tag);
  if (a) for (const k in a) e.setAttribute(k, a[k]);
  if (p) p.appendChild(e);
  return e;
}
function hx(tag, cls, html, p) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (p) p.appendChild(e);
  return e;
}
function tx(p, x, y, s, cls, anchor) {
  const t = sv("text", { x, y, class: cls || "vx-t", "text-anchor": anchor || "middle" }, p);
  t.textContent = s;
  return t;
}
function vw(host) { return Math.max(300, Math.min(host.clientWidth || 640, 720)); }
function fmt(s) { return window.inlineFmt ? window.inlineFmt(s) : s; }

function defs(svg) {
  const d = sv("defs", null, svg);
  [["ah", "vx-ah"], ["ah-on", "vx-ah-on"], ["ah-bad", "vx-ah-bad"], ["ah-good", "vx-ah-good"], ["ah-mute", "vx-ah-mute"]].forEach(([id, cls]) => {
    const m = sv("marker", { id: id + svg.dataset.uid, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse" }, d);
    sv("path", { d: "M0,0 L10,5 L0,10 z", class: cls }, m);
  });
  return d;
}
let _uid = 0;
function svgRoot(host, W, H, label) {
  const s = sv("svg", { viewBox: `0 0 ${W} ${H}`, class: "vx", role: "img", "aria-label": label || "diagram" }, host);
  s.dataset.uid = "u" + (++_uid);
  defs(s);
  return s;
}
function mk(svg, kind) { return `url(#${kind}${svg.dataset.uid})`; }

/* Step controls: Back / Next / Start over, plus arrow keys when focused. */
function stepper(host, n, render, opts) {
  opts = opts || {};
  const bar = hx("div", "vz-bar", null, host);
  const back = hx("button", "vz-btn", '<svg class="ic" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg><span>Back</span>', bar);
  const pos = hx("span", "vz-pos", "", bar);
  const next = hx("button", "vz-btn vz-primary", "", bar);
  back.type = next.type = "button";
  let i = 0;
  function go(k) {
    i = Math.max(0, Math.min(n - 1, k));
    render(i);
    pos.textContent = `${i + 1} / ${n}`;
    back.disabled = i === 0;
    const last = i === n - 1;
    next.innerHTML = last ? '<svg class="ic" viewBox="0 0 24 24"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4"/></svg><span>Start over</span>' : '<span>Next</span><svg class="ic" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>';
    next.classList.toggle("vz-again", last);
  }
  back.onclick = () => go(i - 1);
  next.onclick = () => go(i === n - 1 ? 0 : i + 1);
  bar.tabIndex = 0;
  bar.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") { go(i + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { go(i - 1); e.preventDefault(); }
  });
  if (n <= 1) bar.hidden = true;
  if (opts.first !== false) go(0);
  return { go, get: () => i, bar };
}

function note(host) { return hx("div", "vz-note", "", host); }
function seg(host, options, onPick, start) {
  const w = hx("div", "vz-seg", null, host);
  const btns = options.map((o, k) => {
    const b = hx("button", "", o, w); b.type = "button";
    b.onclick = () => { btns.forEach(x => x.classList.remove("on")); b.classList.add("on"); onPick(k); };
    return b;
  });
  btns[start || 0].classList.add("on");
  return w;
}

/* Sequence diagram: actors across the top, messages revealed one step at a time. */
function seqViz(host, cfg) {
  const W = vw(host), m = 10, A = cfg.actors.length, sp = (W - 2 * m) / A;
  const ax = i => m + sp * (i + 0.5);
  const idx = id => cfg.actors.findIndex(a => a.id === id);
  const rowH = 42, top = 58, Hh = top + cfg.steps.length * rowH + 14;
  const wrap = hx("div", "vz-canvas", null, host);
  const svg = svgRoot(wrap, W, Hh, cfg.label);
  cfg.actors.forEach((a, i) => {
    const bw = Math.min(sp - 10, 130);
    sv("rect", { x: ax(i) - bw / 2, y: 8, width: bw, height: 32, rx: 9, class: "vx-actor" + (a.cls ? " " + a.cls : "") }, svg);
    tx(svg, ax(i), 29, a.name, "vx-t vx-b");
    sv("line", { x1: ax(i), y1: 40, x2: ax(i), y2: Hh - 6, class: "vx-life" }, svg);
  });
  const items = cfg.steps.map((s, k) => {
    const y = top + k * rowH + 22;
    const g = sv("g", { class: "vx-step" }, svg);
    if (s.at) {
      const i = idx(s.at), bw = Math.min(Math.max(s.m.length * 6.9 + 22, sp * 0.8), W - 8);
      let x = ax(i) - bw / 2; x = Math.max(4, Math.min(W - bw - 4, x));
      sv("rect", { x, y: y - 16, width: bw, height: 26, rx: 7, class: "vx-selfnote" + (s.k ? " " + s.k : "") }, g);
      tx(g, x + bw / 2, y + 1.5, s.m, "vx-t vx-s");
    } else {
      const a = idx(s.f), b = idx(s.t), x1 = ax(a), x2 = ax(b), dir = x2 > x1 ? 1 : -1;
      sv("line", { x1: x1 + dir * 4, y1: y, x2: x2 - dir * 4, y2: y, class: "vx-msg" + (s.k ? " " + s.k : ""), "marker-end": mk(svg, s.k === "bad" ? "ah-bad" : "ah") }, g);
      tx(g, (x1 + x2) / 2, y - 7, s.m, "vx-t vx-s" + (s.k === "bad" ? " vx-badt" : ""));
    }
    if (s.ph && (k === 0 || cfg.steps[k - 1].ph !== s.ph)) {
      if (k > 0) sv("line", { x1: 4, y1: y - 24, x2: W - 4, y2: y - 24, class: "vx-phsep" }, g);
      tx(g, W - 6, y - 12, s.ph, "vx-t vx-ph", "end");
    }
    return g;
  });
  const n = note(host);
  stepper(host, cfg.steps.length, i => {
    items.forEach((g, k) => g.setAttribute("class", "vx-step " + (k < i ? "past" : k === i ? "now" : "later")));
    const s = cfg.steps[i];
    n.innerHTML = (s.ph ? `<span class="vz-ph">${s.ph}</span>` : "") + fmt(s.d || s.m);
  });
}

/* Flow: a sequence of stages with a detail panel (and optional code). */
function flowViz(host, cfg) {
  const track = hx("ol", "vz-track", null, host);
  const lis = cfg.nodes.map((nd, k) => {
    const li = hx("li", "", `<button type="button" aria-label="Step ${k + 1}: ${nd.t}"><span class="vz-k">${k + 1}</span><span class="vz-tl">${nd.t}</span></button>`, track);
    li.querySelector("button").onclick = () => st.go(k);
    return li;
  });
  const panel = hx("div", "vz-panel", null, host);
  const st = stepper(host, cfg.nodes.length, i => {
    lis.forEach((li, k) => li.className = k < i ? "past" : k === i ? "now" : "");
    const nd = cfg.nodes[i];
    panel.innerHTML = `<h4><span class="vz-k">${i + 1}</span>${nd.t}</h4>${nd.s ? `<p class="vz-sub">${fmt(nd.s)}</p>` : ""}${nd.d ? `<p>${fmt(nd.d)}</p>` : ""}${nd.code ? `<pre class="vz-code">${nd.code.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>` : ""}`;
    const cur = lis[i]; if (cur && track.scrollWidth > track.clientWidth) track.scrollTo({ left: cur.offsetLeft - track.offsetLeft - 12, behavior: "smooth" });
  });
}

/* Network graph: nodes at percentage coordinates, styled by class per step. */
function netViz(host, cfg) {
  const W = vw(host), H = Math.round(W * (cfg.ratio || 0.62));
  const wrap = hx("div", "vz-canvas", null, host);
  const svg = svgRoot(wrap, W, H, cfg.label);
  const X = p => 18 + (W - 36) * p / 100, Y = p => 18 + (H - 36) * p / 100;
  const gE = sv("g", null, svg), gA = sv("g", null, svg), gN = sv("g", null, svg);
  const R = cfg.r || 15;
  const E = {}, N = {};
  (cfg.edges || []).forEach(([a, b]) => {
    const A = cfg.nodes[a], B = cfg.nodes[b];
    E[a + "|" + b] = E[b + "|" + a] = sv("line", { x1: X(A.x), y1: Y(A.y), x2: X(B.x), y2: Y(B.y), class: "vx-edge" }, gE);
  });
  for (const id in cfg.nodes) {
    const nd = cfg.nodes[id], g = sv("g", { class: "vx-node" }, gN);
    sv("circle", { cx: X(nd.x), cy: Y(nd.y), r: nd.r || R }, g);
    tx(g, X(nd.x), Y(nd.y) + 4.5, nd.l != null ? nd.l : id, "vx-t vx-nl");
    if (nd.sub) tx(g, X(nd.x), Y(nd.y) + (nd.r || R) + 14, nd.sub, "vx-t vx-s vx-mt");
    if (cfg.onNode) { g.style.cursor = "pointer"; g.addEventListener("click", () => cfg.onNode(id)); }
    N[id] = g;
  }
  const api = {
    svg, W, H,
    node(id, cls) { if (N[id]) N[id].setAttribute("class", "vx-node " + (cls || "")); },
    edge(a, b, cls) { const e = E[a + "|" + b]; if (e) e.setAttribute("class", "vx-edge " + (cls || "")); },
    reset() { for (const k in N) api.node(k, ""); for (const k in E) E[k].setAttribute("class", "vx-edge"); gA.innerHTML = ""; },
    arrow(a, b, cls, lab) {
      const A = cfg.nodes[a], B = cfg.nodes[b];
      const x1 = X(A.x), y1 = Y(A.y), x2 = X(B.x), y2 = Y(B.y);
      const d = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / d, uy = (y2 - y1) / d;
      const off = 6, ox = -uy * off, oy = ux * off;
      const rA = (A.r || R) + 3, rB = (B.r || R) + 4;
      sv("line", { x1: x1 + ux * rA + ox, y1: y1 + uy * rA + oy, x2: x2 - ux * rB + ox, y2: y2 - uy * rB + oy, class: "vx-arrow " + (cls || ""), "marker-end": mk(svg, cls === "bad" ? "ah-bad" : cls === "good" ? "ah-good" : "ah-on") }, gA);
      if (lab) {
        const t = tx(gA, (x1 + x2) / 2 + ox * 2.6, (y1 + y2) / 2 + oy * 2.6 + 4, lab, "vx-t vx-s vx-albl");
        t.setAttribute("paint-order", "stroke");
      }
    },
    clearArrows() { gA.innerHTML = ""; },
    X, Y
  };
  return api;
}
