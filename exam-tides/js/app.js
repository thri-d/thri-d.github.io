/* Exam Tides — app shell and learning engine */
(function () {
"use strict";
const ORDER = ["cns", "cd", "ahsn", "agile", "bio"];
const EXAM = new Date("2026-11-17T14:00:00+05:30");
const NOTE = { text: "Ammu, mids lo already chala chesav. Ippudu migilinavi matrame. Okka topic tarvata okka topic, anthe. Nenu ikkada unna.", sign: "Bava" };
const MODES = [["chart", "Chart"], ["learn", "Learn"], ["visuals", "Visuals"], ["mixups", "Mix-ups"], ["practice", "Practice"], ["final", "Final hour"]];
const PREFIX = { cns: "cns-", cd: "cd-", ahsn: "ah-", agile: "ag-" };

/* ---------- text formatting ---------- */
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function inlineFmt(s) {
  return esc(s).replace(/&lt;(\/?)(sub|sup|b|i|em)&gt;/g, "<$1$2>").replace(/==(.+?)==/g, "<mark>$1</mark>");
}
window.inlineFmt = inlineFmt;
const F = inlineFmt;

/* ---------- icons ---------- */
const I = {
  chart: '<svg class="ic" viewBox="0 0 24 24"><path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/></svg>',
  learn: '<svg class="ic" viewBox="0 0 24 24"><rect x="4" y="3.5" width="16" height="17" rx="3"/><path d="M8 8.5h8M8 12h8M8 15.5h5"/></svg>',
  visuals: '<svg class="ic" viewBox="0 0 24 24"><circle cx="6" cy="6.5" r="2.5"/><circle cx="18" cy="6.5" r="2.5"/><circle cx="12" cy="17.5" r="2.5"/><path d="M8.3 7.6 10.8 15M15.7 7.6 13.2 15M8.5 6.5h7"/></svg>',
  mixups: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/></svg>',
  practice: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="m8.3 12.2 2.6 2.6 5-5.3"/></svg>',
  final: '<svg class="ic" viewBox="0 0 24 24"><path d="M7 3.5h10M7 20.5h10M8 3.5v2.2a4 4 0 0 0 1.8 3.3L12 10.5l2.2-1.5A4 4 0 0 0 16 5.7V3.5M8 20.5v-2.2a4 4 0 0 1 1.8-3.3l2.2-1.5 2.2 1.5a4 4 0 0 1 1.8 3.3v2.2"/></svg>',
  home: '<svg class="ic" viewBox="0 0 24 24"><path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5"/></svg>',
  sun: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>',
  moon: '<svg class="ic" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  anchor: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><path d="M12 7v13.5M5 13a7 7 0 0 0 14 0M8.5 10.5h7M3.5 13H6.5M17.5 13h3"/></svg>',
  trap: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3.5 21.5 20h-19z"/><path d="M12 10v4.5M12 17.2v.3"/></svg>',
  hook: '<svg class="ic" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>',
  pen: '<svg class="ic" viewBox="0 0 24 24"><path d="m4 20 1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M13.5 7l3 3"/></svg>',
  chev: '<svg class="ic chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  eye: '<svg class="ic" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>'
};
const EM = {
  key: '<circle cx="19" cy="20" r="8"/><circle cx="19" cy="20" r="2.4" class="em-f"/><path d="M25 26l11 11M31 32l3.5-3.5M35 36l3-3"/>',
  tree: '<circle cx="24" cy="11" r="4"/><circle cx="14" cy="25" r="4"/><circle cx="34" cy="25" r="4"/><circle cx="9" cy="38" r="3"/><circle cx="19" cy="38" r="3"/><path d="M21.5 14 16.5 22M26.5 14l5 8M12.5 28.5 10 35M15.5 28.5 18 35"/>',
  mesh: '<circle cx="24" cy="24" r="3.6" class="em-f"/><circle cx="11" cy="14" r="3"/><circle cx="36" cy="11" r="3"/><circle cx="38" cy="32" r="3"/><circle cx="19" cy="38" r="3"/><path d="M13.7 15.7 21 22M33.5 12.7 26.6 21.8M35.4 31 27.2 25.6M20.3 35.3 22.6 27.3M13.6 15.6l3.9 19.6"/>',
  loop: '<path d="M35 18a12 12 0 1 0 2 9"/><path d="M36.5 11.5v7h-7"/><circle cx="24" cy="24" r="2.6" class="em-f"/>',
  leaf: '<path d="M11 37c0-15 10-25 27-25 0 16-10 27-25 27"/><path d="M11 37l15-15"/>'
};
function emblem(mark, cls) { return `<svg class="em ${cls || ""}" viewBox="0 0 48 48" aria-hidden="true"><rect x="1" y="1" width="46" height="46" rx="14" class="em-bg"/><g class="em-s">${EM[mark]}</g></svg>`; }
const BRAND = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="var(--tide)"/><path d="M5 15.5c2.4-2.6 4.4-2.6 6.8 0s4.4 2.6 6.8 0 4.4-2.6 6.8 0" fill="none" stroke="var(--bg)" stroke-width="2.2" stroke-linecap="round"/><path d="M5 21c2.4-2.6 4.4-2.6 6.8 0s4.4 2.6 6.8 0 4.4-2.6 6.8 0" fill="none" stroke="var(--bg)" stroke-width="2.2" stroke-linecap="round" opacity=".6"/><circle cx="21.5" cy="9.5" r="2.3" fill="var(--mark)"/></svg>';

/* ---------- state ---------- */
const KEY = "examtides.v2";
let S = { theme: null, paper: null, st: {}, best: {} };
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const kOf = (s, u, i) => `${s}.${u}.${i}`;
const stOf = k => S.st[k] || "todo";
function setSt(k, v) { S.st[k] = v; save(); }
function topics(s) { const out = []; const D = DATA[s]; if (!D.units) return out; D.units.forEach(U => U.topics.forEach((T, i) => out.push({ key: kOf(s, U.u, i), s, u: U.u, i, T, U }))); return out; }
function byKey(k) { const [s, u, i] = k.split("."); const U = DATA[s].units.find(x => x.u === +u); return { key: k, s, u: +u, i: +i, T: U.topics[+i], U }; }
function counts(s) {
  const c = { total: 0, todo: 0, mids: 0, shaky: 0, locked: 0 };
  topics(s).forEach(x => { c.total++; c[stOf(x.key)]++; });
  c.ready = c.mids + c.locked; c.pct = c.total ? Math.round(c.ready * 100 / c.total) : 0;
  return c;
}

/* ---------- theme ---------- */
function applyTheme() {
  const t = S.theme || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day");
  document.documentElement.dataset.theme = t;
  document.querySelectorAll("[data-act=theme]").forEach(b => b.innerHTML = (t === "night" ? I.sun : I.moon) + `<span class="sr">Switch theme</span>`);
}
function toggleTheme() { const cur = document.documentElement.dataset.theme; S.theme = cur === "night" ? "day" : "night"; save(); applyTheme(); }

/* ---------- toast ---------- */
let tT;
function toast(m) { const t = document.getElementById("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => t.classList.remove("show"), 2400); }

/* ---------- routing ---------- */
let view = { s: null, m: "chart" };
function parseHash() {
  const h = (location.hash || "").slice(1);
  if (!h) return { s: null, m: "chart" };
  const [s, m] = h.split("-");
  if (!DATA[s]) return { s: null, m: "chart" };
  return { s, m: MODES.some(x => x[0] === m) ? m : "chart" };
}
function go(s, m) {
  const h = s ? (m && m !== "chart" ? `${s}-${m}` : s) : "";
  if (("#" + h) === location.hash || (!h && !location.hash)) { view = { s, m: m || "chart" }; render(true); }
  else location.hash = h;
}
window.addEventListener("hashchange", () => { view = parseHash(); render(true); });

/* ---------- countdown ---------- */
function untilText() {
  const ms = EXAM - new Date();
  if (ms <= 0) return "This paper is done.";
  const h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4);
  return h >= 48 ? `in ${Math.floor(h / 24)} days` : `in ${h} h ${m} min`;
}
setInterval(() => document.querySelectorAll("[data-until]").forEach(e => e.textContent = untilText()), 30000);

/* ---------- gauge ---------- */
let gid = 0;
function gauge(s, big) {
  const D = DATA[s], soon = !!D.soon, c = soon ? { pct: 0 } : counts(s), id = "g" + (++gid);
  const h = 150, lvl = soon ? 0 : c.pct / 100;
  return `<button class="gauge${soon ? " soon" : ""}" data-open="${s}" aria-label="${esc(D.name)}: ${soon ? "in preparation" : c.pct + " percent ready"}">
    <svg viewBox="0 0 64 166"><defs><clipPath id="${id}"><rect x="14" y="6" width="36" height="${h}" rx="18"/></clipPath></defs>
      <rect x="14" y="6" width="36" height="${h}" rx="18" class="g-tube"/>
      <g clip-path="url(#${id})"><g class="g-water" data-lvl="${lvl}" style="transform:translateY(${big ? h : h * (1 - lvl)}px)">
        <rect x="0" y="10" width="64" height="${h + 10}" />
        <path class="g-wave" d="M0 10 q8 -7 16 0 t16 0 t16 0 t16 0 t16 0 v8 h-80z"/></g></g>
      ${[0.25, 0.5, 0.75].map(t => `<line x1="50" x2="56" y1="${6 + h * (1 - t)}" y2="${6 + h * (1 - t)}" class="g-tick"/>`).join("")}
    </svg>
    <span class="gauge-name">${D.short}</span><span class="gauge-pct">${soon ? "soon" : c.pct + "%"}</span></button>`;
}
function riseGauges() {
  requestAnimationFrame(() => requestAnimationFrame(() => document.querySelectorAll(".g-water[data-lvl]").forEach(g => { g.style.transform = `translateY(${150 * (1 - +g.dataset.lvl)}px)`; })));
}

/* ---------- rail ---------- */
function rail() {
  return `<button class="brand" data-act="home">${BRAND}<span>Exam Tides</span></button>
  <div class="rail-sub">4-1 semester revision</div>
  <div class="rail-list">${ORDER.map(s => { const D = DATA[s], c = D.soon ? null : counts(s); return `<button class="rail-item${view.s === s ? " on" : ""}" data-open="${s}">${emblem(D.mark)}<span><b>${esc(D.name)}</b>${c ? `<span class="rail-bar"><i style="width:${c.pct}%"></i></span><small>${c.ready} of ${c.total} topics ready</small>` : `<small>In preparation</small>`}</span></button>`; }).join("")}</div>
  <div class="rail-foot"><button class="iconbtn" data-act="theme"></button><button class="iconbtn" data-act="home">${I.home}<span>Harbour</span></button></div>`;
}

/* ---------- home ---------- */
function home() {
  const p = S.paper;
  return `<div class="page">
  <section class="hero"><h1>Revise what's left, not everything.</h1>
    <p>Mark what you already covered for mids. The water rises as each remaining topic gets locked in. Everything here sits on top of your own notes.</p></section>
  <section class="board" aria-label="Readiness by subject">
    <div class="board-head"><h2>Tide board</h2><span>Topics ready, per subject</span></div>
    <div class="gauges">${ORDER.map(s => gauge(s, true)).join("")}</div>
  </section>
  <section class="next">
    <div><p class="when">Tuesday 17 November, 2:00 PM IST. Starts <span data-until>${untilText()}</span>.</p><h2>${p ? `Next paper: ${esc(DATA[p].name)}` : "Which paper is on Tuesday?"}</h2></div>
    <div class="pick">${ORDER.map(s => `<button class="${p === s ? "on" : ""}" data-paper="${s}">${DATA[s].short}</button>`).join("")}</div>
    ${p ? `<div><button class="btn soft" data-open="${p}">Open ${esc(DATA[p].short)}</button></div>` : ""}
  </section>
  <section class="letter">${esc(NOTE.text)}<span class="sig">${esc(NOTE.sign)}</span></section>
  <h2 class="sec-title">How to use it</h2>
  <ol class="steps">
    <li><span><b>Chart your gaps</b>Tick every topic you already covered for mids. Only what is left stays in your plan.</span></li>
    <li><span><b>Learn one card at a time</b>Read it, hide it, say it from memory, then rate yourself. Shaky topics come back later.</span></li>
    <li><span><b>See it, separate it</b>Step through the visuals for hard topics; use Mix-ups for look-alike concepts.</span></li>
    <li><span><b>Practise, then the final hour</b>A mixed quiz and answer frames tonight; the one-screen sheet and your shaky list in the morning.</span></li>
  </ol>
  <h2 class="sec-title">Why this works</h2>
  <p class="sec-sub">Each feature uses a well-studied learning technique. Nothing here tracks streaks or time spent.</p>
  <div class="method">
    <div><b>Testing yourself</b><p>Recalling from memory strengthens it far more than rereading. Every card ends with a recall check.</p></div>
    <div><b>Spacing</b><p>Shaky topics return after a few other cards, and again in the morning list.</p></div>
    <div><b>Mixing topics</b><p>The quiz shuffles units the way the real paper does, so you practise choosing the right idea.</p></div>
    <div><b>Words plus pictures</b><p>Hard topics come with a diagram you can step through, so you remember both the words and the picture.</p></div>
    <div><b>Anchors and hooks</b><p>Abstract ideas get an everyday analogy and a short memory hook.</p></div>
    <div><b>Telling look-alikes apart</b><p>Mix-ups puts confusable pairs side by side with a quick which-is-it check.</p></div>
    <div><b>Knowing what you know</b><p>The quiz asks how sure you were, so confident mistakes surface before the exam does.</p></div>
    <div><b>Writing before reading</b><p>Answer frames ask you to write the headings first, then compare.</p></div>
  </div>
  <div class="calm"><b>Tonight and tomorrow</b><ul>
    <li>Sleep helps lock in what you studied today. Stop new topics an hour before bed.</li>
    <li>In the morning, use Final hour: the one-screen sheet plus your shaky list. No new chapters.</li>
    <li>In the hall, start with the question you know best. Headings and a diagram beat a blank page.</li></ul></div>
  <p class="foot">Written from the textbooks listed in the JNTUH R22 CSE syllabus and checked for accuracy, including every worked example. If your notes or your teacher say something different, go with them. Progress is saved only in this browser on this device; nothing is sent anywhere.</p>
  </div>`;
}

/* ---------- subject shell ---------- */
function subject() {
  const s = view.s, D = DATA[s];
  if (D.soon) return `<div class="page"><header class="subhead">${emblem(D.mark)}<div><h1>${esc(D.name)}</h1><div class="meta">${esc(D.code)}</div></div></header>
    <section class="soonbox"><h2>Being prepared</h2><p class="muted">This subject is next. Below is the outline from the syllabus she shared, so the shape of the paper is already clear.</p>
    <ol class="outline">${D.outline.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol></section></div>`;
  const c = counts(s), w = x => (x * 100 / c.total).toFixed(2) + "%";
  const body = { chart, learn, visuals, mixups, practice, final }[view.m](s);
  return `<div class="page">
  <header class="subhead">${emblem(D.mark)}<div><h1>${esc(D.name)}</h1><div class="meta">${D.code} · ${c.ready} of ${c.total} topics ready</div></div></header>
  <div class="levelbar" aria-hidden="true"><i class="l-mids" style="width:${w(c.mids)}"></i><i class="l-locked" style="width:${w(c.locked)}"></i><i class="l-shaky" style="width:${w(c.shaky)}"></i></div>
  <div class="legend"><span class="k-mids">From mids ${c.mids}</span><span class="k-locked">Locked in ${c.locked}</span><span class="k-shaky">Shaky ${c.shaky}</span><span class="k-todo">To revise ${c.todo}</span></div>
  <nav class="modes" aria-label="Study modes">${MODES.map(([k, l]) => `<button class="${view.m === k ? "on" : ""}" data-mode="${k}">${I[k]}<span>${l}</span></button>`).join("")}</nav>
  <div id="modebody">${body}</div></div>`;
}

/* ---------- chart ---------- */
function chart(s) {
  const c = counts(s), left = c.todo + c.shaky;
  const units = DATA[s].units.map(U => {
    const rows = U.topics.map((T, i) => {
      const k = kOf(s, U.u, i), st = stOf(k);
      const badge = st === "locked" ? `<span class="badge locked">Locked in</span>` : st === "shaky" ? `<span class="badge shaky">Shaky</span>` : "";
      return `<div class="topic"><div class="tt">${esc(T.t)}${badge}</div><div class="tog" role="group" aria-label="Status for ${esc(T.t)}"><button class="${st === "mids" ? "on mids" : ""}" data-st="${k}|mids">Did in mids</button><button class="${st === "todo" || st === "shaky" ? "on todo" : ""}" data-st="${k}|todo">To revise</button></div></div>`;
    }).join("");
    const todo = U.topics.filter((T, i) => ["todo", "shaky"].includes(stOf(kOf(s, U.u, i)))).length;
    return `<details class="unit" ${todo ? "open" : ""}><summary class="unit-h"><span class="unum">${U.u}</span><h3>${esc(U.title)}</h3><small class="${todo ? "left" : ""}">${todo ? todo + " to revise" : "all covered"}</small></summary>${rows}
      <div class="unit-foot"><button class="btn ghost sm" data-unit="${s}|${U.u}|mids">Whole unit done in mids</button><button class="btn ghost sm" data-unit="${s}|${U.u}|todo">Reset unit</button></div></details>`;
  }).join("");
  const lead = c.mids === 0 && c.locked === 0
    ? "Start by tapping Did in mids on everything you already covered. Your plan shrinks to what is actually left."
    : `About ${left * 7} minutes of focused revision at roughly 7 minutes a topic.`;
  return `<div class="summary"><div class="grow"><h2>${left} topic${left === 1 ? "" : "s"} to revise</h2><p>${lead}</p></div><button class="btn" data-mode="learn">Start learning</button></div>${units}`;
}

/* ---------- learn ---------- */
const LQ = {};
function buildQueue(s, unit) {
  const t = topics(s).filter(x => unit == null || x.u === unit);
  const q = t.filter(x => stOf(x.key) === "todo").concat(t.filter(x => stOf(x.key) === "shaky")).map(x => x.key);
  LQ[s] = { q, unit, phase: "read", total: q.length, viz: false };
}
function learn(s) {
  if (!LQ[s]) buildQueue(s, null);
  const L = LQ[s];
  L.q = L.q.filter(k => ["todo", "shaky"].includes(stOf(k)));
  const units = DATA[s].units.map(U => { const n = U.topics.filter((T, i) => ["todo", "shaky"].includes(stOf(kOf(s, U.u, i)))).length; return `<button class="chip ${L.unit === U.u ? "on" : ""}" data-lunit="${U.u}">Unit ${U.u} · ${n}</button>`; }).join("");
  const filter = `<div class="chips" style="margin-bottom:12px"><button class="chip ${L.unit == null ? "on" : ""}" data-lunit="all">All units</button>${units}</div>`;
  if (!L.q.length) return filter + `<div class="panel empty"><h3>${L.unit ? `Unit ${L.unit} is covered` : "Nothing left to revise here"}</h3><p>Check it holds: take a mixed quiz, try the answer frames, or quick-check the topics you did in mids.</p><div class="row" style="justify-content:center"><button class="btn" data-mode="practice">Practise</button><button class="btn ghost" data-mode="final">Final hour</button></div></div>`;
  const x = byKey(L.q[0]), T = x.T, done = Math.max(0, L.total - L.q.length);
  const head = `<div class="qbar"><span>${L.q.length} in queue</span><span class="prog"><i style="width:${L.total ? done * 100 / L.total : 0}%"></i></span></div>`;
  const top = `<div class="lc-top"><span class="unum">${x.u}</span><span>${esc(x.U.title)}</span></div>`;
  if (L.phase === "recall") {
    return filter + head + `<article class="lcard">${top}<div class="recall"><div class="muted">From memory</div><div class="cue">${esc(T.q)}</div><p>Say it out loud or jot the key words on paper. Getting it partly wrong still helps; the effort is what makes it stick.</p><button class="btn" data-act="reveal">Show the answer</button></div></article>`;
  }
  const content = `<ul class="pts">${T.pts.map(p => `<li>${F(p)}</li>`).join("")}</ul>
    ${T.anchor ? `<div class="callout anchor">${I.anchor}<div><b>Anchor</b>${F(T.anchor)}</div></div>` : ""}
    ${T.trap ? `<div class="callout trap">${I.trap}<div><b>Common trap</b>${F(T.trap)}</div></div>` : ""}
    ${T.hook ? `<div class="callout hook">${I.hook}<div><b>Memory hook</b>${F(T.hook)}</div></div>` : ""}
    ${T.write ? `<details class="frame"><summary>How to write it in the exam</summary><ol>${T.write.map(w => `<li>${F(w)}</li>`).join("")}</ol></details>` : ""}
    ${T.viz && VIZ[T.viz] ? `<div class="vizslot" id="vizslot"><button class="btn soft sm" data-act="showviz" data-viz="${T.viz}">${I.eye}<span>See it: ${esc(VIZ[T.viz].t)}</span></button></div>` : ""}`;
  const act = L.phase === "check"
    ? `<div style="width:100%"><div class="muted" style="font-size:14.5px;margin-bottom:8px">How much did you recall?</div><div class="rate"><button class="r0" data-rate="0">Missed it</button><button class="r1" data-rate="1">Partly</button><button class="r2" data-rate="2">Got it</button></div><p class="hint">Missed or partly: it comes back after a couple of cards and goes on your morning list.</p></div>`
    : `<button class="btn" data-act="test">Test me</button><button class="btn ghost" data-act="skip">Later</button>`;
  return filter + head + `<article class="lcard">${top}<div class="lc-body"><h2>${esc(T.t)}</h2>${content}</div><div class="lc-act">${act}</div></article>`;
}
function rate(s, r) {
  const L = LQ[s], k = L.q[0];
  if (r === 2) { setSt(k, "locked"); L.q.shift(); const c = counts(s); toast(L.q.length ? `Locked in. ${c.todo + c.shaky} left in ${DATA[s].short}.` : "Every topic in this queue is covered."); }
  else { setSt(k, "shaky"); L.q.shift(); L.q.splice(Math.min(r === 0 ? 2 : 4, L.q.length), 0, k); toast(r === 0 ? "It will come back in two cards." : "It will come back in a few cards."); }
  L.phase = "read";
}

/* ---------- visuals ---------- */
function vizList(s) {
  const ids = [];
  topics(s).forEach(x => { if (x.T.viz && VIZ[x.T.viz] && !ids.includes(x.T.viz)) ids.push(x.T.viz); });
  Object.keys(VIZ).forEach(k => { if (k.startsWith(PREFIX[s]) && !ids.includes(k)) ids.push(k); });
  return ids;
}
function visuals(s) {
  const unitOf = id => { const t = topics(s).find(x => x.T.viz === id); return t ? t.u : null; };
  return `<p class="sec-sub" style="margin-top:0">Step through these slowly. Before pressing Next, try to predict what happens.</p>` + vizList(s).map(id => `<section class="vcard" data-vcard="${id}"><button>${'<span class="vi">' + I.visuals + "</span>"}<span><b>${esc(VIZ[id].t)}</b><span>${unitOf(id) ? `Unit ${unitOf(id)} · ` : ""}${esc(VIZ[id].cap || "")}</span></span>${I.chev}</button><div class="vbody" hidden></div></section>`).join("");
}

/* ---------- mix-ups ---------- */
const MX = {};
function mixups(s) {
  const M = DATA[s].mixups || []; MX[s] = MX[s] || {};
  return `<p class="sec-sub" style="margin-top:0">These pairs look alike, which is exactly why exams use them. Read the table, then answer the quick checks.</p>` + M.map((p, pi) => `<section class="mix"><h3><span>${esc(p.a)}</span><span class="vs">vs</span><span>${esc(p.b)}</span></h3>
    <div class="vz-scroll"><table class="mtab"><thead><tr><th></th><th class="ca">${esc(p.a)}</th><th class="cb">${esc(p.b)}</th></tr></thead><tbody>${p.rows.map(r => `<tr><th>${esc(r[0])}</th><td>${F(r[1])}</td><td>${F(r[2])}</td></tr>`).join("")}</tbody></table></div>
    <p class="tell"><b>How to tell:</b> ${F(p.tell)}</p>
    <div class="wq">${p.quiz.map((q, qi) => { const a = MX[s][pi + "." + qi]; return `<p>${F(q[0])}</p><div class="row">${[p.a, p.b].map((name, k) => `<button class="btn ${a == null ? "ghost" : k === q[1] ? "soft" : "ghost"} sm" data-mx="${pi}.${qi}.${k}" ${a != null ? "disabled" : ""}>${esc(name)}</button>`).join("")}</div>${a != null ? `<div class="${a === q[1] ? "ok" : "no"}">${a === q[1] ? "Correct." : "Not quite: it is " + esc(q[1] ? p.b : p.a) + "."}</div>` : ""}`; }).join("")}</div></section>`).join("");
}

/* ---------- practice ---------- */
let PT = "quiz";
const QZ = {};
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function newQuiz(s, unit) {
  const pool = []; DATA[s].units.forEach(U => { if (unit == null || U.u === unit) U.mcq.forEach(m => pool.push({ u: U.u, m })); });
  QZ[s] = { unit, items: shuffle(pool).slice(0, 10), i: 0, pick: null, conf: null, score: 0, sureWrong: [], guessRight: [], wrongU: new Set() };
}
const MC = {};
function practice(s) {
  const tabs = `<div class="subtabs">${[["quiz", "Mixed quiz"], ["frames", "Answer frames"], ["mids", "Mids check"]].map(([k, l]) => `<button class="chip ${PT === k ? "on" : ""}" data-pt="${k}">${l}</button>`).join("")}</div>`;
  if (PT === "frames") return tabs + `<p class="sec-sub" style="margin-top:0">Pick a question. Spend two minutes writing only the headings on paper, then compare with the frame. Headings plus a diagram earn most of the structure marks.</p>` + DATA[s].units.map(U => `<section class="panel" style="margin-bottom:12px"><div class="row"><span class="unum">${U.u}</span><h3 class="grow">${esc(U.title)}</h3></div>${U.long.map(L => `<div class="lq"><p>${F(L.q)}</p><details><summary class="btn ghost sm">I have written my headings: show the frame</summary><ol>${L.skel.map(x => `<li>${F(x)}</li>`).join("")}</ol></details></div>`).join("")}</section>`).join("");
  if (PT === "mids") {
    if (!MC[s]) MC[s] = { q: shuffle(topics(s).filter(x => stOf(x.key) === "mids").map(x => x.key)), phase: "cue", n: 0, flagged: 0 };
    const M = MC[s];
    if (!topics(s).some(x => stOf(x.key) === "mids")) return tabs + `<div class="panel empty"><h3>Nothing marked from mids yet</h3><p>Mark topics as Did in mids on the Chart. This check then asks one quick question on each, in random order, to confirm they are still solid.</p><button class="btn" data-mode="chart">Open Chart</button></div>`;
    if (!M.q.length) return tabs + `<div class="panel empty"><h3>Mids check finished</h3><p>${M.n} checked, ${M.flagged} flagged. Flagged topics are now in your Learn queue.</p><button class="btn" data-act="midsagain">Check again</button></div>`;
    const x = byKey(M.q[0]);
    return tabs + `<p class="sec-sub" style="margin-top:0">No rereading: answer from memory first. This confirms your mids topics without spending time on them.</p><article class="lcard"><div class="lc-top"><span class="unum">${x.u}</span><span>${esc(x.T.t)}</span></div><div class="recall"><div class="cue">${esc(x.T.q)}</div>${M.phase === "cue" ? `<button class="btn" data-act="midsreveal">Show the answer</button>` : `<ul class="pts">${x.T.pts.map(p => `<li>${F(p)}</li>`).join("")}</ul><div class="row" style="margin-top:16px"><button class="btn ghost" data-mids="0">Needs a look</button><button class="btn" data-mids="1">Still solid</button></div>`}</div></article>`;
  }
  if (!QZ[s]) newQuiz(s, null);
  const Q = QZ[s];
  const uf = `<div class="chips" style="margin-bottom:12px"><button class="chip ${Q.unit == null ? "on" : ""}" data-quiz="all">All units mixed</button>${DATA[s].units.map(U => `<button class="chip ${Q.unit === U.u ? "on" : ""}" data-quiz="${U.u}">Unit ${U.u}</button>`).join("")}</div>`;
  if (Q.i >= Q.items.length) {
    if (!S.best[s] || Q.score > S.best[s]) { S.best[s] = Q.score; save(); }
    return tabs + uf + `<section class="panel"><div class="score">${Q.score} / ${Q.items.length}</div><p class="muted">${Q.wrongU.size ? "Units to revisit: " + [...Q.wrongU].sort().map(u => "Unit " + u).join(", ") + "." : "No misses this round."}</p>
      <div class="calib"><div class="danger"><b>Sure, but wrong (${Q.sureWrong.length})</b>${Q.sureWrong.length ? `<ul>${Q.sureWrong.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : "<span class='muted'>None. Your confidence matched your answers.</span>"}<p class="hint">These matter most: a confident mistake will not get rechecked in the exam hall.</p></div>
      <div class="lucky"><b>Right, but guessing (${Q.guessRight.length})</b>${Q.guessRight.length ? `<ul>${Q.guessRight.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : "<span class='muted'>None.</span>"}<p class="hint">Worth one more look so they become sure.</p></div></div>
      <div class="row" style="margin-top:14px"><button class="btn" data-quiz="${Q.unit == null ? "all" : Q.unit}">New quiz</button><button class="btn ghost" data-mode="final">Final hour</button></div></section>`;
  }
  const it = Q.items[Q.i], m = it.m, revealed = Q.conf != null;
  return tabs + uf + `<section class="panel"><div class="qbar"><span>Question ${Q.i + 1} of ${Q.items.length} · Unit ${it.u}</span><span class="prog"><i style="width:${Q.i * 100 / Q.items.length}%"></i></span><span>${Q.score} right</span></div>
    <h3 style="font-size:19px;line-height:1.35">${F(m[0])}</h3>
    ${m[1].map((o, j) => { let c = ""; if (revealed) { if (j === m[2]) c = "ok"; else if (j === Q.pick) c = "no"; } else if (j === Q.pick) c = "pick"; return `<button class="opt ${c}" data-pick="${j}" ${Q.pick != null ? "disabled" : ""}>${F(o)}</button>`; }).join("")}
    ${Q.pick != null && !revealed ? `<div class="conf"><p>How sure were you?</p><div class="row"><button class="btn ghost sm" data-conf="0">Partly guessing</button><button class="btn sm" data-conf="1">Sure</button></div></div>` : ""}
    ${revealed ? `<div class="why"><b>${Q.pick === m[2] ? "Correct." : "Answer: " + F(m[1][m[2]]) + "."}</b> ${F(m[3] || "")}</div><div class="row" style="margin-top:12px;justify-content:flex-end"><button class="btn" data-act="qnext">${Q.i + 1 === Q.items.length ? "See results" : "Next question"}</button></div>` : ""}
  </section>`;
}

/* ---------- final hour ---------- */
function final(s) {
  const shaky = topics(s).filter(x => stOf(x.key) === "shaky");
  return `${shaky.length ? `<section class="panel" style="margin-bottom:14px;border-color:var(--amber)"><h3>Look at these once more</h3><p class="muted" style="margin:4px 0 0">Topics you rated Missed or Partly. One more recall now is worth more than rereading a whole unit.</p><div class="shaky-list">${shaky.map(x => `<button data-relearn="${x.key}">Unit ${x.u}: ${esc(x.T.t)}</button>`).join("")}</div></section>` : ""}
  <section class="panel"><h3>The one-screen sheet</h3><ul class="sheet">${DATA[s].last.map(l => `<li>${F(l)}</li>`).join("")}</ul></section>
  <section class="calm"><b>In the exam hall</b><ul>
    <li>Read the whole paper first and mark the questions you know best.</li>
    <li>Start with your strongest long answer; it settles the nerves.</li>
    <li>Every long answer: a one-line definition, headings, a labelled diagram or table, underlined keywords.</li>
    <li>Split time by marks and keep ten minutes at the end. Never leave a question blank.</li></ul></section>`;
}

/* ---------- render + events ---------- */
function render(scroll) {
  const app = document.getElementById("view");
  document.getElementById("rail").innerHTML = rail();
  app.innerHTML = view.s ? subject() : home();
  document.title = view.s ? `${DATA[view.s].short} · Exam Tides` : "Exam Tides · 4-1";
  applyTheme();
  if (!view.s) riseGauges();
  if (scroll) window.scrollTo({ top: 0 });
}
function rerenderMode() {
  const y = window.scrollY;
  render(false);
  window.scrollTo({ top: y });
}
document.addEventListener("click", e => {
  const t = e.target.closest("button, summary");
  if (!t) return;
  const d = t.dataset, s = view.s;
  if (d.open) { if (S.paper == null && false) {} return go(d.open, "chart"); }
  if (d.act === "home") return go(null);
  if (d.act === "theme") return toggleTheme();
  if (d.paper) { S.paper = S.paper === d.paper ? null : d.paper; save(); return render(false); }
  if (d.mode) { if (d.mode === "learn" && s) buildQueue(s, LQ[s] ? LQ[s].unit : null); return go(s, d.mode); }
  if (d.st) { const [k, v] = d.st.split("|"), cur = stOf(k); if (v === cur || (v === "todo" && cur === "shaky")) return; setSt(k, v); return rerenderMode(); }
  if (d.unit) { const [ss, u, v] = d.unit.split("|"); DATA[ss].units.find(x => x.u === +u).topics.forEach((T, i) => setSt(kOf(ss, +u, i), v)); return rerenderMode(); }
  if (d.lunit) { buildQueue(s, d.lunit === "all" ? null : +d.lunit); return rerenderMode(); }
  if (d.act === "test") { LQ[s].phase = "recall"; return rerenderMode(); }
  if (d.act === "reveal") { LQ[s].phase = "check"; return rerenderMode(); }
  if (d.act === "skip") { const L = LQ[s]; L.q.push(L.q.shift()); L.phase = "read"; return render(true); }
  if (d.rate) { rate(s, +d.rate); return render(true); }
  if (d.act === "showviz") { const slot = document.getElementById("vizslot"); slot.innerHTML = `<div class="panel"><h3 style="font-size:17px">${esc(VIZ[d.viz].t)}</h3><p class="vz-sub" style="margin:4px 0 0">${esc(VIZ[d.viz].cap || "")}</p><div class="vb"></div></div>`; VIZ[d.viz].build(slot.querySelector(".vb")); return; }
  const vc = t.closest("[data-vcard]");
  if (vc && t.parentElement === vc) { const body = vc.querySelector(".vbody"); const open = !vc.classList.contains("open"); vc.classList.toggle("open", open); body.hidden = !open; if (open && !body.dataset.built) { body.dataset.built = 1; VIZ[vc.dataset.vcard].build(body); } return; }
  if (d.mx) { const [pi, qi, k] = d.mx.split(".").map(Number); MX[s][pi + "." + qi] = k; return rerenderMode(); }
  if (d.pt) { PT = d.pt; return rerenderMode(); }
  if (d.quiz) { newQuiz(s, d.quiz === "all" ? null : +d.quiz); return rerenderMode(); }
  if (d.pick) { const Q = QZ[s]; if (Q.pick == null) { Q.pick = +d.pick; } return rerenderMode(); }
  if (d.conf) { const Q = QZ[s], it = Q.items[Q.i], ok = Q.pick === it.m[2]; Q.conf = +d.conf; if (ok) Q.score++; else Q.wrongU.add(it.u); if (!ok && Q.conf === 1) Q.sureWrong.push(it.m[0]); if (ok && Q.conf === 0) Q.guessRight.push(it.m[0]); return rerenderMode(); }
  if (d.act === "qnext") { const Q = QZ[s]; Q.i++; Q.pick = null; Q.conf = null; return rerenderMode(); }
  if (d.act === "midsreveal") { MC[s].phase = "ans"; return rerenderMode(); }
  if (d.mids) { const M = MC[s], k = M.q.shift(); M.n++; if (d.mids === "0") { setSt(k, "shaky"); M.flagged++; toast("Added to your Learn queue."); } M.phase = "cue"; return rerenderMode(); }
  if (d.act === "midsagain") { delete MC[s]; return rerenderMode(); }
  if (d.relearn) { buildQueue(s, null); const L = LQ[s]; L.q = [d.relearn].concat(L.q.filter(k => k !== d.relearn)); L.total = L.q.length; return go(s, "learn"); }
});
document.addEventListener("keydown", e => {
  if (!view.s || view.m !== "learn" || e.target.closest("input,textarea")) return;
  const L = LQ[view.s]; if (!L || !L.q.length) return;
  if (e.key === " " && L.phase !== "check") { e.preventDefault(); L.phase = L.phase === "read" ? "recall" : "check"; rerenderMode(); }
  if (L.phase === "check" && ["1", "2", "3"].includes(e.key)) { rate(view.s, +e.key - 1); render(true); }
});

/* ---------- boot ---------- */
document.getElementById("topbar").innerHTML = `<button class="brand" data-act="home">${BRAND}<span>Exam Tides</span></button><div class="top-actions"><button class="iconbtn" data-act="theme"></button></div>`;
view = parseHash();
render(true);
})();
