/* Focus timer: a small whale in the top corner. Pomodoro (25 / 5 / 15) or a plain countdown.
   Keeps running across tabs and survives a refresh (end time is stored, not a ticking counter). */
(function () {
"use strict";
const KEY = "examtides.timer";
const POMO = { focus: 25, short: 5, long: 15 };
const PHASE = { focus: "Focus", short: "Short break", long: "Long break" };
const PRESETS = [5, 10, 15, 25, 45, 60];
let T = { mode: "pomo", phase: "focus", round: 0, custom: 25, running: false, end: 0, left: 25 * 60, chime: true };
try { const r = localStorage.getItem(KEY); if (r) T = Object.assign(T, JSON.parse(r)); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(T)); } catch (e) {} };
const total = () => (T.mode === "pomo" ? POMO[T.phase] : T.custom) * 60;
const remaining = () => T.running ? Math.max(0, Math.round((T.end - Date.now()) / 1000)) : T.left;
const mmss = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

const WHALE = (cls) => `<svg class="whale ${cls || ""}" viewBox="0 0 48 40" aria-hidden="true">
  <g class="w-spout"><path d="M26 9.5c-.4-2.6-2-4.4-4-5.4"/><path d="M26 9.5c.4-2.6 2-4.4 4-5.4"/><path d="M26 9.5V3.5"/></g>
  <path class="w-body" d="M9.5 21 3 15.5c3.2-.2 6 1.4 7.6 3.8zM9.5 22.5 4 28.5c3.1.4 5.9-1 7.4-3.6z"/>
  <path class="w-body" d="M8.5 22.5c0-8.3 7.6-13.5 17-13.5 8.6 0 15 5 15 12.5S33.9 33.5 24.5 33.5H15.5c-4 0-7-4.6-7-11z"/>
  <path class="w-belly" d="M13.5 27.5c3 3.4 7 4.8 12 4.8 6 0 10.4-2.3 12.8-6.3-3.4 1.8-7.8 2.7-12.6 2.7-4.6 0-8.6-.4-12.2-1.2z"/>
  <circle class="w-eye" cx="31.5" cy="19.5" r="1.7"/><circle class="w-shine" cx="32.1" cy="18.9" r=".5"/>
  <ellipse class="w-cheek" cx="34" cy="23.6" rx="2.1" ry="1.2"/>
</svg>`;

/* ---------- DOM ---------- */
const root = document.createElement("div");
root.className = "tt";
root.innerHTML = `
  <button class="tt-pill" type="button" aria-haspopup="dialog" aria-expanded="false" aria-label="Focus timer">
    <span class="tt-ring"><svg class="tt-ringsvg" viewBox="0 0 36 36" aria-hidden="true"><circle class="tt-track" cx="18" cy="18" r="16"/><circle class="tt-prog" cx="18" cy="18" r="16" pathLength="100"/></svg>${WHALE("mini")}</span>
    <span class="tt-label">Focus</span>
  </button>
  <div class="tt-panel" role="dialog" aria-label="Focus timer" hidden>
    <div class="tt-sea">${WHALE("big")}<svg class="tt-waves" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 12c25-10 50-10 75 0s50 10 75 0 50-10 75 0 50 10 75 0V24H0z"/></svg></div>
    <div class="tt-tabs" role="tablist"><button type="button" data-tt="pomo">Pomodoro</button><button type="button" data-tt="timer">Timer</button></div>
    <div class="tt-phase"></div>
    <div class="tt-time" aria-live="off"></div>
    <div class="tt-bar"><i></i></div>
    <div class="tt-presets"></div>
    <div class="tt-actions"><button type="button" class="tt-main" data-tt="toggle">Start</button><button type="button" class="tt-ghost" data-tt="reset">Reset</button><button type="button" class="tt-ghost tt-skip" data-tt="skip">Skip</button></div>
    <div class="tt-foot"><span class="tt-dots" aria-label="Focus rounds"></span><button type="button" class="tt-chime" data-tt="chime"></button></div>
  </div>`;
document.body.appendChild(root);
const $ = s => root.querySelector(s);
const pill = $(".tt-pill"), panel = $(".tt-panel");

/* ---------- sound ---------- */
let AC = null;
function audio() { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === "suspended") AC.resume(); } catch (e) { AC = null; } return AC; }
function chime() {
  if (!T.chime) return;
  const ac = audio(); if (!ac) return;
  [[659.25, 0], [880, 0.18], [987.77, 0.36]].forEach(([f, d]) => {
    const o = ac.createOscillator(), g = ac.createGain(), t0 = ac.currentTime + d;
    o.type = "sine"; o.frequency.value = f;
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.16, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0008, t0 + 1.1);
    o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + 1.2);
  });
}

/* ---------- actions ---------- */
function start() { audio(); T.end = Date.now() + T.left * 1000; T.running = true; save(); draw(); }
function pause() { T.left = remaining(); T.running = false; save(); draw(); }
function reset() { T.running = false; T.left = total(); save(); draw(); }
function setPhase(p) { T.phase = p; T.running = false; T.left = total(); }
function finish() {
  T.running = false;
  let msg;
  if (T.mode === "pomo") {
    if (T.phase === "focus") { T.round = (T.round || 0) + 1; const longBreak = T.round % 4 === 0; setPhase(longBreak ? "long" : "short"); msg = longBreak ? "Four rounds done. Take 15 minutes." : "Focus done. Take 5 minutes."; }
    else { setPhase("focus"); msg = "Break over. Ready for the next round."; }
  } else { T.left = total(); msg = "Time's up."; }
  save(); chime();
  try { navigator.vibrate && navigator.vibrate([140, 70, 140]); } catch (e) {}
  root.classList.add("splash"); setTimeout(() => root.classList.remove("splash"), 2600);
  const toast = document.getElementById("toast"); if (toast) { toast.textContent = msg; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 3200); }
  draw();
}

/* ---------- draw ---------- */
function draw() {
  const left = remaining(), tot = total(), frac = tot ? 1 - left / tot : 0;
  const idle = !T.running && left === tot;
  pill.classList.toggle("on", T.running);
  root.classList.toggle("running", T.running);
  pill.classList.toggle("paused", !T.running && !idle);
  $(".tt-label").textContent = idle ? (T.mode === "pomo" ? PHASE[T.phase].split(" ")[0] : "Timer") : mmss(left);
  $(".tt-prog").style.strokeDasharray = `${(frac * 100).toFixed(2)} 100`;
  $(".tt-prog").style.opacity = frac > 0 ? 1 : 0;
  root.classList.toggle("is-break", T.mode === "pomo" && T.phase !== "focus");
  root.querySelectorAll(".tt-tabs button").forEach(b => { const on = b.dataset.tt === T.mode; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
  $(".tt-phase").textContent = T.mode === "pomo" ? `${PHASE[T.phase]}${T.phase === "focus" ? ` · round ${(T.round % 4) + 1} of 4` : ""}` : `${T.custom}-minute timer`;
  $(".tt-time").textContent = mmss(left);
  $(".tt-bar i").style.width = (frac * 100).toFixed(2) + "%";
  $(".tt-main").textContent = T.running ? "Pause" : idle ? "Start" : "Resume";
  $(".tt-skip").hidden = T.mode !== "pomo";
  $(".tt-presets").hidden = T.mode !== "timer";
  $(".tt-presets").innerHTML = PRESETS.map(m => `<button type="button" class="${m === T.custom ? "on" : ""}" data-min="${m}">${m}</button>`).join("") + `<span>min</span>`;
  $(".tt-dots").innerHTML = T.mode === "pomo" ? [0, 1, 2, 3].map(i => `<i class="${i < T.round % 4 ? "f" : ""}"></i>`).join("") : "";
  $(".tt-chime").innerHTML = (T.chime ? '<svg class="ic" viewBox="0 0 24 24"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2H4.5zM10 20.5a2.2 2.2 0 0 0 4 0"/></svg>' : '<svg class="ic" viewBox="0 0 24 24"><path d="M6 16.5V11a6 6 0 0 1 9.5-4.9M18 11v5.5l1.5 2H8M10 20.5a2.2 2.2 0 0 0 4 0M4 4l16 16"/></svg>') + `<span>${T.chime ? "Chime on" : "Chime off"}</span>`;
  const base = document.title.replace(/^\d+:\d\d · /, "");
  document.title = T.running ? `${mmss(left)} · ${base}` : base;
}

/* ---------- events ---------- */
function openPanel(open) { panel.hidden = !open; pill.setAttribute("aria-expanded", open); root.classList.toggle("open", open); }
pill.addEventListener("click", () => openPanel(panel.hidden));
document.addEventListener("click", e => { if (!panel.hidden && !root.contains(e.target)) openPanel(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) { openPanel(false); pill.focus(); } });
panel.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  e.stopPropagation();
  const a = b.dataset.tt;
  if (b.dataset.min) { T.custom = +b.dataset.min; if (!T.running) T.left = total(); save(); return draw(); }
  if (a === "pomo" || a === "timer") { if (T.mode !== a) { T.mode = a; T.running = false; T.left = total(); save(); } return draw(); }
  if (a === "toggle") return T.running ? pause() : start();
  if (a === "reset") return reset();
  if (a === "skip") { if (T.phase === "focus") { T.round = (T.round || 0) + 1; setPhase(T.round % 4 === 0 ? "long" : "short"); } else setPhase("focus"); save(); return draw(); }
  if (a === "chime") { T.chime = !T.chime; save(); return draw(); }
});

/* ---------- public: start a plain countdown of n minutes (used by the study plan) ---------- */
window.ExamTimer = { run(min) { T.mode = "timer"; T.custom = min; T.running = false; T.left = min * 60; start(); } };

/* ---------- loop ---------- */
if (T.left > total() || T.left < 0) T.left = total();
setInterval(() => { if (T.running) { if (remaining() <= 0) finish(); else draw(); } }, 250);
document.addEventListener("visibilitychange", () => { if (!document.hidden && T.running && remaining() <= 0) finish(); });
draw();
})();
