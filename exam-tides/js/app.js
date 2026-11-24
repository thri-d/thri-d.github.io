/* Exam Tides — app shell and learning engine (v3: minimal) */
(function () {
"use strict";
const ORDER = ["cns", "cd", "ahsn", "agile", "bio"];
const MODES = [["topics", "Topics"], ["long", "Long answers", "Answers"], ["visuals", "Visuals"], ["quiz", "Quiz"], ["final", "Final hour"]];
const PREFIX = { cns: "cns-", cd: "cd-", ahsn: "ah-", agile: "ag-" };

/* The last hour, per subject: diagrams to draw, problems to rehearse, where the marks come from. */
const FINAL = {
  cns: {
    draw: [["DES round and key schedule", "cns-rounds"], ["AES round: Sub, Shift, Mix, Add", "cns-rounds"], ["HMAC", "cns-hmac"], ["Kerberos, three exchanges", "cns-kerberos"], ["SSL handshake, four phases", "cns-ssl"], ["AH vs ESP, transport vs tunnel", "cns-ipsec"], ["PGP at the sender", "cns-pgp"], ["802.11i 4-way handshake", "cns-4way"]],
    solve: [["RSA keys, encrypt, decrypt", "cns-rsa"], ["Diffie–Hellman and MITM", "cns-dh"], ["Playfair encryption", "cns-playfair"]],
    marks: ["Numericals: write n, φ, the extended-Euclid table and every modular step. If one number slips, the method still scores.", "DES, AES, SHA-512: the block diagram is the answer. Put block size, key size and rounds in a small box beside it.", "SSL, Kerberos, IPsec, PGP: a two-column message diagram beats paragraphs."]
  },
  cd: {
    draw: [["Phases, traced on one statement", "cd-phases"], ["Input buffer with sentinels", "cd-buffer"], ["Activation record, control vs access links", "cd-ar"], ["DAG for an expression", "cd-dag"], ["Flow graph, back edge, natural loop", "cd-loops"]],
    solve: [["FIRST, FOLLOW, LL(1) table", "cd-ll1"], ["SLR items, table and parse", "cd-slr"], ["RE to DFA with followpos", "cd-dfa"], ["Quadruples, triples, indirect triples", "cd-3ac"], ["Data-flow equations", "cd-dataflow"]],
    marks: ["Parsing: augmented grammar, numbered productions, every item set, the table, then a parse trace. Each stage stands on its own.", "Translation: list every temporary in order; for a DAG, say which node is reused.", "Optimisation: before and after code for each transformation, side by side."]
  },
  ahsn: {
    draw: [["Routing protocol map", "ah-taxonomy"], ["AODV and DSR route discovery", "ah-aodv"], ["ZRP zone and peripheral nodes", "ah-zrp"], ["Flooding vs MPR", "ah-mpr"], ["Tree vs mesh multicast", "ah-multicast"], ["LAR expected and request zones", "ah-lar"], ["Sensor node block diagram", "ah-node"], ["S-MAC and T-MAC frames", "ah-smac"]],
    solve: [],
    marks: ["Protocol answers: draw a six-node network and mark RREQ, RREP or data arrows. The drawing does half the explaining.", "Comparisons (proactive vs reactive, tree vs mesh, PSFQ vs ESRT) go best in a four-row table.", "Expand every acronym once: AODV, ZRP, ODMRP, CEDAR, ESRT."]
  },
  agile: {
    draw: [["Manifesto values", "ag-manifesto"], ["The twelve principles", "ag-principles"], ["XP life cycle", "ag-xplife"], ["The five practice families", "ag-xpmap"], ["Scrum 3-3-5", "ag-scrum"], ["TDD cycle", "ag-tdd"], ["Velocity and burn-up", "ag-velocity"], ["Continuous integration cycle", "ag-ci"], ["Planning game grid", "ag-planning"]],
    solve: [],
    marks: ["Use the book's exact terms: done done, slack, velocity, ten-minute build, ubiquitous language. They are the keywords marks attach to.", "Every process answer gets a cycle diagram: TDD, CI, iteration, XP life cycle.", "Two-column tables for Scrum vs XP, release vs iteration planning, scopeboxed vs timeboxed."]
  }
};

/* ---------- text formatting ---------- */
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function inlineFmt(s) { return esc(s).replace(/&lt;(\/?)(sub|sup|b|i|em)&gt;/g, "<$1$2>").replace(/==(.+?)==/g, "<mark>$1</mark>"); }
window.inlineFmt = inlineFmt;
const F = inlineFmt;

/* ---------- icons ---------- */
const I = {
  topics: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 6.5h1M9 6.5h11M4 12h1M9 12h11M4 17.5h1M9 17.5h11"/></svg>',
  long: '<svg class="ic" viewBox="0 0 24 24"><path d="m4 20 1-4.5L15.5 5a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M13.5 7l3 3"/></svg>',
  visuals: '<svg class="ic" viewBox="0 0 24 24"><circle cx="6" cy="6.5" r="2.5"/><circle cx="18" cy="6.5" r="2.5"/><circle cx="12" cy="17.5" r="2.5"/><path d="M8.3 7.6 10.8 15M15.7 7.6 13.2 15M8.5 6.5h7"/></svg>',
  quiz: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="m8.3 12.2 2.6 2.6 5-5.3"/></svg>',
  final: '<svg class="ic" viewBox="0 0 24 24"><path d="M7 3.5h10M7 20.5h10M8 3.5v2.2a4 4 0 0 0 1.8 3.3L12 10.5l2.2-1.5A4 4 0 0 0 16 5.7V3.5M8 20.5v-2.2a4 4 0 0 1 1.8-3.3l2.2-1.5 2.2 1.5a4 4 0 0 1 1.8 3.3v2.2"/></svg>',
  sun: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>',
  moon: '<svg class="ic" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  anchor: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2"/><path d="M12 7v13.5M5 13a7 7 0 0 0 14 0M8.5 10.5h7M3.5 13H6.5M17.5 13h3"/></svg>',
  trap: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3.5 21.5 20h-19z"/><path d="M12 10v4.5M12 17.2v.3"/></svg>',
  hook: '<svg class="ic" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>',
  chev: '<svg class="ic chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  right: '<svg class="ic" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
  back: '<svg class="ic" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></svg>',
  eye: '<svg class="ic" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  check: '<svg class="ic" viewBox="0 0 24 24"><path d="m6.5 12.5 3.5 3.5 7.5-8"/></svg>',
  shape: '<svg class="ic" viewBox="0 0 24 24"><rect x="3.5" y="4" width="7" height="6" rx="1.5"/><rect x="13.5" y="14" width="7" height="6" rx="1.5"/><path d="M7 10v4.5a2 2 0 0 0 2 2h4.5"/></svg>',
  calc: '<svg class="ic" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7h7M8.5 11.5h1M12 11.5h1M15.5 11.5h0M8.5 15h1M12 15h1M15.5 15v2.5"/></svg>',
  target: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/></svg>',
  close: '<svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  facts: '<svg class="ic" viewBox="0 0 24 24"><path d="M6 3.5h9l3.5 3.5v13.5H6z"/><path d="M14.5 3.5V7.5h4M9 12h6M9 15.5h6"/></svg>'
};
const EM = {
  key: '<circle cx="19" cy="20" r="8"/><circle cx="19" cy="20" r="2.4" class="em-f"/><path d="M25 26l11 11M31 32l3.5-3.5M35 36l3-3"/>',
  tree: '<circle cx="24" cy="11" r="4"/><circle cx="14" cy="25" r="4"/><circle cx="34" cy="25" r="4"/><circle cx="9" cy="38" r="3"/><circle cx="19" cy="38" r="3"/><path d="M21.5 14 16.5 22M26.5 14l5 8M12.5 28.5 10 35M15.5 28.5 18 35"/>',
  mesh: '<circle cx="24" cy="24" r="3.6" class="em-f"/><circle cx="11" cy="14" r="3"/><circle cx="36" cy="11" r="3"/><circle cx="38" cy="32" r="3"/><circle cx="19" cy="38" r="3"/><path d="M13.7 15.7 21 22M33.5 12.7 26.6 21.8M35.4 31 27.2 25.6M20.3 35.3 22.6 27.3M13.6 15.6l3.9 19.6"/>',
  loop: '<path d="M35 18a12 12 0 1 0 2 9"/><path d="M36.5 11.5v7h-7"/><circle cx="24" cy="24" r="2.6" class="em-f"/>',
  leaf: '<path d="M11 37c0-15 10-25 27-25 0 16-10 27-25 27"/><path d="M11 37l15-15"/>'
};
function emblem(mark) { return `<svg class="em" viewBox="0 0 48 48" aria-hidden="true"><rect x="1" y="1" width="46" height="46" rx="14" class="em-bg"/><g class="em-s">${EM[mark]}</g></svg>`; }
const BRAND = '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="15" fill="var(--tide)"/><path d="M5 15.5c2.4-2.6 4.4-2.6 6.8 0s4.4 2.6 6.8 0 4.4-2.6 6.8 0" fill="none" stroke="var(--bg)" stroke-width="2.2" stroke-linecap="round"/><path d="M5 21c2.4-2.6 4.4-2.6 6.8 0s4.4 2.6 6.8 0 4.4-2.6 6.8 0" fill="none" stroke="var(--bg)" stroke-width="2.2" stroke-linecap="round" opacity=".6"/><circle cx="21.5" cy="9.5" r="2.3" fill="var(--mark-solid)"/></svg>';

/* ---------- state ---------- */
const KEY = "examtides.v2";
let S = { theme: null, paper: null, st: {}, best: {} };
try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(S, JSON.parse(raw)); } catch (e) {}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const kOf = (s, u, i) => `${s}.${u}.${i}`;
const stOf = k => S.st[k] || "todo";
const known = k => stOf(k) === "mids" || stOf(k) === "locked";
function setSt(k, v) { S.st[k] = v; save(); }
function topics(s) { const out = []; const D = DATA[s]; if (!D.units) return out; D.units.forEach(U => U.topics.forEach((T, i) => out.push({ key: kOf(s, U.u, i), s, u: U.u, i, T, U }))); return out; }
function byKey(k) { const [s, u, i] = k.split("."); const U = DATA[s].units.find(x => x.u === +u); return { key: k, s, u: +u, i: +i, T: U.topics[+i], U }; }
function counts(s) { const t = topics(s); const ready = t.filter(x => known(x.key)).length; return { total: t.length, ready, left: t.length - ready, pct: t.length ? Math.round(ready * 100 / t.length) : 0 }; }
/* Session queue: topics still to revise, unit order first, shaky ones re-inserted two places ahead after a miss. */
const SQ = {};
function sq(s) {
  const t = topics(s), base = t.filter(x => stOf(x.key) === "todo").concat(t.filter(x => stOf(x.key) === "shaky")).map(x => x.key);
  SQ[s] = (SQ[s] || []).filter(k => base.includes(k));
  base.forEach(k => { if (!SQ[s].includes(k)) SQ[s].push(k); });
  return SQ[s];
}

/* ---------- theme ---------- */
function applyTheme() {
  const t = S.theme || (window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day");
  document.documentElement.dataset.theme = t;
  document.querySelectorAll("[data-act=theme]").forEach(b => b.innerHTML = (t === "night" ? I.sun : I.moon) + `<span class="sr">Switch to ${t === "night" ? "day" : "night"} theme</span>`);
}
function toggleTheme() { S.theme = document.documentElement.dataset.theme === "night" ? "day" : "night"; save(); applyTheme(); }

/* ---------- toast ---------- */
let tT;
function toast(m) { const t = document.getElementById("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => t.classList.remove("show"), 2000); }

/* ---------- routing ---------- */
let view = { s: null, m: "topics", open: null };
function parseHash() {
  const raw = decodeURIComponent((location.hash || "").slice(1));
  /* deep links: #agile:1.2 opens a topic card, #agile:v:ag-tdd opens a visual */
  const dl = raw.match(/^([a-z]+):(?:(\d+)\.(\d+)|v:([a-z0-9-]+))$/);
  if (dl && DATA[dl[1]] && DATA[dl[1]].units) {
    if (dl[4] && VIZ[dl[4]]) { OPENVIZ = dl[4]; return { s: dl[1], m: "visuals", open: null }; }
    const k = `${dl[1]}.${dl[2]}.${dl[3]}`, U = DATA[dl[1]].units.find(x => x.u === +dl[2]);
    if (U && U.topics[+dl[3]]) { STUDY.phase = "read"; return { s: dl[1], m: "topics", open: k }; }
    return { s: dl[1], m: dl[4] ? "visuals" : "topics", open: null };
  }
  const [s, m] = raw.split("-");
  if (!DATA[s]) return { s: null, m: "topics", open: null };
  return { s, m: MODES.some(x => x[0] === m) ? m : "topics", open: null };
}
function go(s, m) {
  const h = s ? (m && m !== "topics" ? `${s}-${m}` : s) : "";
  if (("#" + h) === location.hash || (!h && !location.hash)) { view = { s, m: m || "topics", open: null }; render(true); }
  else location.hash = h;
}
window.addEventListener("hashchange", () => { view = parseHash(); render(true); });

/* ---------- gauge ---------- */
let gid = 0;
function gauge(s) {
  const D = DATA[s], soon = !!D.soon, c = soon ? { pct: 0 } : counts(s), id = "g" + (++gid), h = 150, lvl = soon ? 0 : c.pct / 100;
  return `<button class="gauge${soon ? " soon" : ""}${S.paper === s ? " next" : ""}" data-open="${s}" aria-label="${esc(D.name)}: ${soon ? "coming soon" : c.pct + " percent ready"}">
    <svg viewBox="0 0 64 166"><defs><clipPath id="${id}"><rect x="14" y="6" width="36" height="${h}" rx="18"/></clipPath></defs>
      <rect x="14" y="6" width="36" height="${h}" rx="18" class="g-tube"/>
      <g clip-path="url(#${id})"><g class="g-water" data-lvl="${lvl}" style="transform:translateY(${h}px)"><rect x="0" y="10" width="64" height="${h + 10}"/><path class="g-wave" d="M0 10 q8 -7 16 0 t16 0 t16 0 t16 0 t16 0 v8 h-80z"/></g></g>
      ${[0.25, 0.5, 0.75].map(t => `<line x1="50" x2="56" y1="${6 + h * (1 - t)}" y2="${6 + h * (1 - t)}" class="g-tick"/>`).join("")}
    </svg>
    <span class="gauge-name">${D.short}</span><span class="gauge-pct">${soon ? "soon" : c.pct + "%"}</span></button>`;
}
function riseGauges() { requestAnimationFrame(() => requestAnimationFrame(() => document.querySelectorAll(".g-water[data-lvl]").forEach(g => { g.style.transform = `translateY(${150 * (1 - +g.dataset.lvl)}px)`; }))); }

/* ---------- rail ---------- */
function rail() {
  return `<button class="brand" data-act="home">${BRAND}<span>Exam Tides</span></button>
  <nav class="rail-list" aria-label="Subjects">${ORDER.map(s => { const D = DATA[s], c = D.soon ? null : counts(s); return `<button class="rail-item${view.s === s ? " on" : ""}" data-open="${s}">${emblem(D.mark)}<span><b>${esc(D.name)}</b>${c ? `<span class="rail-bar"><i style="width:${c.pct}%"></i></span>` : `<small>Coming soon</small>`}</span></button>`; }).join("")}</nav>
  <div class="rail-foot"><button class="iconbtn" data-act="theme"></button></div>`;
}

/* ---------- home ---------- */
function home() {
  const p = S.paper;
  return `<div class="page home">
  <section class="hero">
    <h1><span>Notes are the runway.</span><span>Recall is the flight.</span></h1>
    <p>Tick what you already know. Recall the rest, one topic at a time.</p>
  </section>
  <section class="paper">
    <div class="paper-when"><b>Next paper</b></div>
    <div class="paper-pick" role="group" aria-label="Next paper">${ORDER.map(s => `<button class="${p === s ? "on" : ""}" data-paper="${s}" aria-pressed="${p === s}">${DATA[s].short}</button>`).join("")}</div>
    ${p && !DATA[p].soon ? `<button class="btn big" data-open="${p}">Revise ${esc(DATA[p].name)} ${I.right}</button>` : ""}
  </section>
  <section class="board" aria-label="Subjects"><div class="gauges">${ORDER.map(gauge).join("")}</div></section>
  </div>`;
}

/* ---------- subject ---------- */
function subjectHTML() {
  const s = view.s, D = DATA[s];
  if (D.soon) return `<div class="page"><header class="subhead">${emblem(D.mark)}<div class="grow"><h1>${esc(D.name)}</h1><div class="meta">${esc(D.code)}, coming soon</div></div></header>
    <ol class="outline">${D.outline.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join("")}</ol></div>`;
  const c = counts(s);
  const body = ({ topics: topicsMode, long: longMode, visuals: visualsMode, quiz: quizMode, final: finalMode })[view.m](s);
  return `<div class="page">
  <header class="subhead">${emblem(D.mark)}<div class="grow"><h1>${esc(D.name)}</h1><div class="meta"><b>${c.ready}</b> of ${c.total} topics ready</div><div class="levelbar"><i style="width:${c.pct}%"></i></div>${s === "agile" ? `<a class="planlink" href="agile-plan.html"><svg class="ic" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4M8 14h3M8 17h6"/></svg>One-day plan for the paper</a><a class="planlink" href="agile-guide.html"><svg class="ic" viewBox="0 0 24 24"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>Complete answers</a>` : ""}</div></header>
  <nav class="modes" aria-label="Sections">${MODES.map(([k, l, sh]) => `<button class="${view.m === k ? "on" : ""}" data-mode="${k}">${I[k]}${sh ? `<span class="l-full">${l}</span><span class="l-short">${sh}</span>` : `<span>${l}</span>`}</button>`).join("")}</nav>
  <div id="modebody">${body}</div></div>`;
}

/* ---------- topics: list and study card ---------- */
const STUDY = { phase: "read" };
function topicsMode(s) { return view.open ? studyView(s) : listView(s); }
function listView(s) {
  const q = sq(s), next = q.length ? byKey(q[0]) : null;
  const cta = next
    ? `<button class="nextup" data-study="${next.key}"><span class="nu-label">Revise next</span><span class="nu-title">${esc(next.T.t)}</span><span class="nu-meta">Unit ${next.u} · ${q.length} to go</span>${I.right}</button>`
    : `<div class="nextup done"><span class="nu-title">Every topic is ready.</span><span class="nu-meta">Test it in Quiz, then open Final hour.</span></div>`;
  const units = DATA[s].units.map(U => {
    const n = U.topics.filter((T, i) => known(kOf(s, U.u, i))).length;
    const rows = U.topics.map((T, i) => {
      const k = kOf(s, U.u, i), st = stOf(k);
      return `<div class="trow ${st}"><button class="tick" data-tick="${k}" aria-pressed="${known(k)}" aria-label="${known(k) ? "Unmark" : "Mark as known"}: ${esc(T.t)}">${I.check}</button><button class="tname" data-study="${k}"><span>${esc(T.t)}</span>${st === "shaky" ? `<em>shaky</em>` : ""}${I.right}</button></div>`;
    }).join("");
    return `<section class="tunit"><header><span class="unum">${U.u}</span><h3>${esc(U.title)}</h3><small>${n}/${U.topics.length}</small></header>${rows}</section>`;
  }).join("");
  return cta + `<p class="hintline">${I.check}<span>Tick what you already know from mids.</span></p>` + units;
}
function studyView(s) {
  const x = byKey(view.open), T = x.T, q = sq(s);
  const top = `<div class="study-top"><button class="linkbtn" data-act="list">${I.back}<span>All topics</span></button><span class="muted">Unit ${x.u} · ${q.length} to go</span></div>`;
  if (STUDY.phase === "recall") {
    return top + `<article class="lcard"><div class="recall"><div class="muted">From memory</div><div class="cue">${esc(T.q)}</div><p class="muted">Say it aloud, then check.</p><button class="btn big" data-act="reveal">Check my answer</button></div></article>`;
  }
  const content = `<ul class="pts">${T.pts.map(p => `<li>${F(p)}</li>`).join("")}</ul>
    ${T.anchor ? `<div class="callout anchor">${I.anchor}<div><b>Picture it</b>${F(T.anchor)}</div></div>` : ""}
    ${T.trap ? `<div class="callout trap">${I.trap}<div><b>Common trap</b>${F(T.trap)}</div></div>` : ""}
    ${T.hook ? `<div class="callout hook">${I.hook}<div><b>Memory hook</b>${F(T.hook)}</div></div>` : ""}
    ${T.write ? `<details class="frame"><summary>${I.long}<span>How to write it</span>${I.chev}</summary><ol>${T.write.map(w => `<li>${F(w)}</li>`).join("")}</ol></details>` : ""}
    ${T.viz && VIZ[T.viz] ? `<div class="vizslot" id="vizslot"><button class="btn soft" data-act="showviz" data-viz="${T.viz}">${I.eye}<span>See it</span></button></div>` : ""}`;
  const act = STUDY.phase === "check"
    ? `<div class="rate"><button class="r0" data-rate="0">Missed</button><button class="r1" data-rate="1">Partly</button><button class="r2" data-rate="2">Got it</button></div>`
    : `<button class="btn big" data-act="test">Test me</button>`;
  return top + `<article class="lcard"><div class="lc-body"><h2>${esc(T.t)}</h2>${content}</div><div class="lc-act">${act}</div></article>`;
}
function rate(s, r) {
  const k = view.open;
  setSt(k, r === 2 ? "locked" : "shaky");
  const q = sq(s).filter(x => x !== k);
  if (r !== 2) q.splice(Math.min(2, q.length), 0, k);
  SQ[s] = q;
  toast(r === 2 ? `Locked in. ${counts(s).left} to go.` : "Marked shaky. It comes back shortly.");
  view.open = q.length ? q[0] : null;
  STUDY.phase = "read";
}

/* ---------- long answers ---------- */
function longMode(s) {
  return DATA[s].units.map(U => `<section class="lunit"><header><span class="unum">${U.u}</span><h3>${esc(U.title)}</h3></header>${U.long.map(L => `<details class="lq"><summary><span>${F(L.q)}</span>${I.chev}</summary><ol>${L.skel.map(x => `<li>${F(x)}</li>`).join("")}</ol></details>`).join("")}</section>`).join("");
}

/* ---------- visuals ---------- */
let OPENVIZ = null;
function vizList(s) {
  const ids = [];
  topics(s).forEach(x => [x.T.viz, x.T.viz2].forEach(v => { if (v && VIZ[v] && !ids.includes(v)) ids.push(v); }));
  Object.keys(VIZ).forEach(k => { if (k.startsWith(PREFIX[s]) && !ids.includes(k)) ids.push(k); });
  return ids;
}
function visualsMode(s) {
  const unitOf = id => { const t = topics(s).find(x => x.T.viz === id || x.T.viz2 === id); return t ? t.u : null; };
  return vizList(s).map(id => `<section class="vcard" data-vcard="${id}"><button><span class="vi">${I.visuals}</span><span><b>${esc(VIZ[id].t)}</b><span>${unitOf(id) ? `Unit ${unitOf(id)}` : "Overview"}</span></span>${I.chev}</button><div class="vbody" hidden></div></section>`).join("");
}
function openViz(card) {
  const body = card.querySelector(".vbody"), V = VIZ[card.dataset.vcard];
  card.classList.add("open"); body.hidden = false;
  if (!body.dataset.built) { body.dataset.built = 1; if (V.cap) body.insertAdjacentHTML("beforeend", `<p class="vz-sub">${esc(V.cap)}</p>`); V.build(body); }
}

/* ---------- quiz: multiple choice and look-alikes ---------- */
let QT = "mcq";
const QZ = {}, MX = {};
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function newQuiz(s) { const pool = []; DATA[s].units.forEach(U => U.mcq.forEach(m => pool.push({ u: U.u, m }))); QZ[s] = { items: shuffle(pool).slice(0, 10), i: 0, pick: null, score: 0, miss: [] }; }
function quizMode(s) {
  const seg = `<div class="seg2" role="tablist"><button role="tab" aria-selected="${QT === "mcq"}" class="${QT === "mcq" ? "on" : ""}" data-qt="mcq">Quick quiz</button><button role="tab" aria-selected="${QT === "mix"}" class="${QT === "mix" ? "on" : ""}" data-qt="mix">Look-alikes</button></div>`;
  if (QT === "mix") {
    const M = DATA[s].mixups || []; MX[s] = MX[s] || {};
    return seg + M.map((p, pi) => `<section class="mix"><h3>${esc(p.a)} <span class="vs">vs</span> ${esc(p.b)}</h3>
      <div class="vz-scroll"><table class="mtab"><thead><tr><th></th><th class="ca">${esc(p.a)}</th><th class="cb">${esc(p.b)}</th></tr></thead><tbody>${p.rows.map(r => `<tr><th>${esc(r[0])}</th><td>${F(r[1])}</td><td>${F(r[2])}</td></tr>`).join("")}</tbody></table></div>
      <p class="tell">${F(p.tell)}</p>
      <div class="wq">${p.quiz.map((q, qi) => { const a = MX[s][pi + "." + qi]; return `<div class="wqi"><p>${F(q[0])}</p><div class="wqb">${[p.a, p.b].map((name, k) => `<button class="${a == null ? "" : k === q[1] ? "ok" : k === a ? "no" : ""}" data-mx="${pi}.${qi}.${k}" ${a != null ? "disabled" : ""}>${esc(name)}</button>`).join("")}</div></div>`; }).join("")}</div></section>`).join("");
  }
  if (!QZ[s]) newQuiz(s);
  const Q = QZ[s];
  if (Q.i >= Q.items.length) {
    if (!S.best[s] || Q.score > S.best[s]) { S.best[s] = Q.score; save(); }
    const units = [...new Set(Q.miss.map(m => m.u))].sort();
    return seg + `<section class="panel result"><div class="score">${Q.score}<span>/${Q.items.length}</span></div>
      ${Q.miss.length ? `<p class="muted">Revisit ${units.map(u => "Unit " + u).join(", ")}</p><ul class="misslist">${Q.miss.map(m => `<li><b>${F(m.m[0])}</b><span>${F(m.m[1][m.m[2]])}</span></li>`).join("")}</ul>` : `<p class="muted">No misses.</p>`}
      <button class="btn big" data-act="newquiz">New quiz</button></section>`;
  }
  const it = Q.items[Q.i], m = it.m, done = Q.pick != null;
  return seg + `<section class="panel"><div class="qbar"><span>${Q.i + 1} / ${Q.items.length}</span><span class="prog"><i style="width:${Q.i * 100 / Q.items.length}%"></i></span><span>Unit ${it.u}</span></div>
    <h3 class="qq">${F(m[0])}</h3>
    ${m[1].map((o, j) => `<button class="opt ${done ? (j === m[2] ? "ok" : j === Q.pick ? "no" : "") : ""}" data-pick="${j}" ${done ? "disabled" : ""}>${F(o)}</button>`).join("")}
    ${done ? `${m[3] ? `<p class="why">${F(m[3])}</p>` : ""}<div class="qnext"><button class="btn" data-act="qnext">${Q.i + 1 === Q.items.length ? "See score" : "Next"} ${I.right}</button></div>` : ""}
  </section>`;
}

/* ---------- final hour ---------- */
function finalMode(s) {
  const Fh = FINAL[s], shaky = topics(s).filter(x => stOf(x.key) === "shaky");
  const chips = list => `<div class="fchips">${list.map(([l, id]) => `<button data-goviz="${id}">${esc(l)}${I.right}</button>`).join("")}</div>`;
  return `${shaky.length ? `<section class="fsec warn"><h3>${I.trap}<span>Still shaky</span></h3><div class="fchips">${shaky.map(x => `<button data-study="${x.key}">${esc(x.T.t)}${I.right}</button>`).join("")}</div></section>` : ""}
  <section class="fsec"><h3>${I.facts}<span>Key facts</span></h3><ul class="sheet">${DATA[s].last.map(l => `<li>${F(l)}</li>`).join("")}</ul></section>
  <section class="fsec"><h3>${I.shape}<span>Diagrams to draw from memory</span></h3>${chips(Fh.draw)}</section>
  ${Fh.solve.length ? `<section class="fsec"><h3>${I.calc}<span>Problems to rehearse</span></h3>${chips(Fh.solve)}</section>` : ""}
  <section class="fsec"><h3>${I.target}<span>Where the marks are</span></h3><ul class="sheet">${Fh.marks.map(l => `<li>${F(l)}</li>`).join("")}</ul></section>`;
}


/* ---------- sheet: open a visual on top of the current page ---------- */
function openSheet(id) {
  const V = VIZ[id]; if (!V) return;
  const lastFocus = document.activeElement;
  const sh = document.createElement("div");
  sh.className = "sheet-wrap";
  sh.innerHTML = `<div class="sheet-back" data-sheet-close></div><div class="sheetbox" role="dialog" aria-modal="true" aria-label="${esc(V.t)}"><header class="sheet-h"><div><h3>${esc(V.t)}</h3>${V.cap ? `<p>${esc(V.cap)}</p>` : ""}</div><button type="button" class="iconbtn sheet-x" data-sheet-close aria-label="Close">${I.close}</button></header><div class="sheet-body"></div></div>`;
  document.body.appendChild(sh);
  document.documentElement.classList.add("noscroll");
  V.build(sh.querySelector(".sheet-body"));
  sh.querySelector(".sheet-x").focus({ preventScroll: true });
  const onKey = e => { if (e.key === "Escape") close(); };
  function close() { sh.remove(); document.documentElement.classList.remove("noscroll"); document.removeEventListener("keydown", onKey); if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true }); }
  document.addEventListener("keydown", onKey);
  sh.addEventListener("click", e => { if (e.target.closest("[data-sheet-close]")) { e.stopPropagation(); close(); } });
}

/* ---------- render ---------- */
function render(scroll) {
  document.getElementById("rail").innerHTML = rail();
  document.getElementById("view").innerHTML = view.s ? subjectHTML() : home();
  document.title = view.s ? `${DATA[view.s].short} · Exam Tides` : "Exam Tides";
  applyTheme();
  if (!view.s) riseGauges();
  if (OPENVIZ) { const c = document.querySelector(`[data-vcard="${OPENVIZ}"]`); OPENVIZ = null; if (c) { openViz(c); c.scrollIntoView({ block: "start" }); return; } }
  if (scroll) window.scrollTo({ top: 0 });
}
function rerender() { const y = window.scrollY; render(false); window.scrollTo({ top: y }); }

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const t = e.target.closest("button");
  if (!t) return;
  const d = t.dataset, s = view.s;
  if (d.open) return go(d.open, "topics");
  if (d.act === "home") return go(null);
  if (d.act === "theme") return toggleTheme();
  if (d.paper) { S.paper = S.paper === d.paper ? null : d.paper; save(); return rerender(); }
  if (d.mode) { STUDY.phase = "read"; if (d.mode === "quiz") QT = "mcq"; return go(s, d.mode); }
  if (d.tick) { setSt(d.tick, known(d.tick) ? "todo" : "mids"); return rerender(); }
  if (d.study) { if (view.m !== "topics") { history.replaceState(null, "", "#" + s); view.m = "topics"; } view.open = d.study; STUDY.phase = "read"; return render(true); }
  if (d.act === "list") { view.open = null; return render(true); }
  if (d.act === "test") { STUDY.phase = "recall"; return rerender(); }
  if (d.act === "reveal") { STUDY.phase = "check"; return rerender(); }
  if (d.rate) { rate(s, +d.rate); return render(true); }
  if (d.act === "showviz") { const slot = document.getElementById("vizslot"); slot.innerHTML = `<div class="panel"><h3 class="vt">${esc(VIZ[d.viz].t)}</h3><div class="vb"></div></div>`; VIZ[d.viz].build(slot.querySelector(".vb")); return; }
  const vc = t.closest("[data-vcard]");
  if (vc && t.parentElement === vc) { if (vc.classList.contains("open")) { vc.classList.remove("open"); vc.querySelector(".vbody").hidden = true; } else openViz(vc); return; }
  if (d.goviz) { openSheet(d.goviz); return; }
  if (d.qt) { QT = d.qt; return rerender(); }
  if (d.mx) { const [pi, qi, k] = d.mx.split(".").map(Number); MX[s][pi + "." + qi] = k; return rerender(); }
  if (d.pick) { const Q = QZ[s]; if (Q.pick == null) { Q.pick = +d.pick; const it = Q.items[Q.i]; if (Q.pick === it.m[2]) Q.score++; else Q.miss.push(it); } return rerender(); }
  if (d.act === "qnext") { const Q = QZ[s]; Q.i++; Q.pick = null; return rerender(); }
  if (d.act === "newquiz") { newQuiz(s); return rerender(); }
});
document.addEventListener("keydown", e => {
  if (!view.s || !view.open || e.target.closest("input,textarea")) return;
  if (e.key === " " && STUDY.phase !== "check") { e.preventDefault(); STUDY.phase = STUDY.phase === "read" ? "recall" : "check"; rerender(); }
  if (STUDY.phase === "check" && ["1", "2", "3"].includes(e.key)) { rate(view.s, +e.key - 1); render(true); }
});

/* ---------- boot ---------- */
document.getElementById("topbar").innerHTML = `<button class="brand" data-act="home">${BRAND}<span>Exam Tides</span></button><div class="top-actions"><button class="iconbtn" data-act="theme"></button></div>`;
view = parseHash();
render(true);
})();
