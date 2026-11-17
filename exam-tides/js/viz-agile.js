/* Agile visual explainers */

VIZ["ag-manifesto"] = { t: "The four values as balance scales", cap: "Both sides have value; the left side weighs more. Tap a value.", build(host) {
  const V = [["Individuals and interactions", "processes and tools", "Good people talking to each other solve problems no process document anticipates."],
    ["Working software", "comprehensive documentation", "Progress is measured by software that runs, not pages written. Documentation still exists, just less of it."],
    ["Customer collaboration", "contract negotiation", "Work with the customer continuously instead of arguing over the wording of a fixed contract."],
    ["Responding to change", "following a plan", "Plans are made, but they bend when the customer or the market changes."]];
  const scale = '<svg class="vz-scale" viewBox="0 0 64 40" aria-hidden="true"><path d="M32 12v22M24 36h16" /><path d="M8 14 56 6" /><path d="M8 14l-5 10h10zM56 6l-5 10h10z" class="pan"/><circle cx="32" cy="10" r="2.5" class="pv"/></svg>';
  const box = hx("div", "vz-man", V.map((v, i) => `<button type="button" data-i="${i}"><span class="heavy">${v[0]}</span>${scale}<span class="light">over ${v[1]}</span></button>`).join(""), host);
  const n = note(host); n.innerHTML = fmt("Initials in order: ==I W C R== = ==I Will Code Right==.");
  box.querySelectorAll("button").forEach(b => b.onclick = () => { box.querySelectorAll("button").forEach(x => x.classList.remove("now")); b.classList.add("now"); const v = V[+b.dataset.i]; n.innerHTML = `<b>${v[0]}</b> over ${v[1]}. ` + fmt(v[2]); });
}};

VIZ["ag-xpmap"] = { t: "Your syllabus is Shore's book: five practice families", cap: "Unit 1 to Unit 5 follow the chapters Thinking, Collaborating, Releasing, Planning, Developing. Tap a practice.", build(host) {
  const M = [
    ["Thinking", "Unit 1", { "Pair programming": "Driver types, navigator reviews and thinks ahead; swap and rotate often.", "Energized work": "A sustainable pace; tired people make mistakes.", "Informative workspace": "Big visible charts and boards so anyone sees progress at a glance.", "Root-cause analysis": "Ask why repeatedly; fix the process, not the symptom.", "Retrospectives": "End of each iteration: reflect and pick one improvement." }],
    ["Collaborating", "Unit 2", { "Trust": "Empathy between roles, eat together, keep teams together, deliver on commitments, be honest.", "Sit together": "One open workspace; osmotic communication.", "Real customer involvement": "Real users or their representatives work with the team.", "Ubiquitous language": "Use the domain's own words in talk and code.", "Stand-up meetings": "Daily, short: yesterday, today, blockers.", "Coding standards": "A small agreed set of conventions.", "Iteration demo": "Show working software to stakeholders every iteration.", "Reporting": "Burn-up charts and honest progress reports; avoid misleading metrics." }],
    ["Releasing", "Unit 3", { "Done done": "Tested, coded, designed, integrated, builds, installs, migrates, reviewed, fixed, accepted.", "No bugs": "Write fewer, fix immediately, fix the process.", "Version control": "Everything in the repository; it must always be ready to ship.", "Ten-minute build": "One command builds and tests everything within 10 minutes.", "Continuous integration": "Integrate every few hours; never break the build.", "Collective code ownership": "Everyone owns all of the code.", "Documentation": "Work-in-progress, product and handoff documentation." }],
    ["Planning", "Unit 4", { "Vision": "Why the project matters and what success looks like.", "Release planning": "Release early and often; minimum marketable features.", "The planning game": "Customers bring value, programmers bring cost.", "Risk management": "Risk multipliers, risk census, date ranges.", "Iteration planning": "Use velocity to choose stories and commit.", "Slack": "Plan below capacity so commitments hold.", "Stories": "Small customer-valued features (INVEST).", "Estimating": "Consistent estimates; velocity corrects bias." }],
    ["Developing", "Unit 5", { "Incremental requirements": "Requirements worked out just in time by on-site customers.", "Customer tests": "Business examples: describe, demonstrate, develop.", "Test-driven development": "Red, Green, Refactor.", "Refactoring": "Improve design without changing behaviour.", "Simple design": "YAGNI, once and only once.", "Incremental design and architecture": "Design continuously as the code grows.", "Spike solutions": "Timeboxed experiments to answer technical questions.", "Performance optimisation": "Measure first; fix the real bottleneck.", "Exploratory testing": "Charters, observation, notes, heuristics." }]];
  const g = hx("div", "vz-xp", M.map(([fam, u, P], k) => `<section class="f${k}"><h4>${fam}</h4><span class="vz-dim">${u}</span><div>${Object.keys(P).map(p => `<button type="button" data-f="${k}" data-p="${p}">${p}</button>`).join("")}</div></section>`).join(""), host);
  const n = note(host); n.innerHTML = fmt("Order of the families: ==T C R P D== — ==Teachers Can't Release Papers Daily==.");
  g.querySelectorAll("button").forEach(b => b.onclick = () => { g.querySelectorAll("button").forEach(x => x.classList.remove("on")); b.classList.add("on"); n.innerHTML = `<b>${b.dataset.p}</b> (${M[b.dataset.f][0]}): ${M[b.dataset.f][2][b.dataset.p]}`; });
}};

VIZ["ag-scrum"] = { t: "Scrum in one picture: 3 roles, 3 artifacts, 5 events", cap: "Step through one sprint.", build(host) {
  hx("div", "vz-335", [["3 roles", ["Product Owner", "Scrum Master", "Development Team"]], ["3 artifacts", ["Product Backlog", "Sprint Backlog", "Increment"]], ["5 events", ["Sprint", "Sprint Planning", "Daily Scrum", "Sprint Review", "Sprint Retrospective"]]].map(([h, xs]) => `<section><h4>${h}</h4><div>${xs.map(x => `<span>${x}</span>`).join("")}</div></section>`).join(""), host);
  flowViz(host, { nodes: [
    { t: "Product Backlog", s: "Owned by the Product Owner", d: "An ordered list of everything the product might need, highest value first." },
    { t: "Sprint Planning", s: "What and how", d: "The team picks backlog items it can finish this sprint and plans the work." },
    { t: "Sprint Backlog", s: "Owned by the team", d: "The chosen items plus the plan for delivering them." },
    { t: "Sprint + Daily Scrum", s: "A fixed timebox, usually 2–4 weeks", d: "The team builds the increment. Every day a short Daily Scrum syncs progress and surfaces blockers; the Scrum Master removes impediments." },
    { t: "Increment", s: "Potentially shippable", d: "A working, done piece of product at the end of the sprint." },
    { t: "Sprint Review", s: "Inspect the product", d: "Stakeholders see the increment and the backlog is adjusted." },
    { t: "Sprint Retrospective", s: "Inspect the process", d: "The team decides how to work better next sprint. Then the next sprint begins." }] });
}};

VIZ["ag-tdd"] = { t: "TDD, one cycle at a time", cap: "A tiny real example: a leap-year function.", build(host) {
  const W = vw(host), H = 250, svg = svgRoot(hx("div", "vz-canvas", null, host), W, H, "TDD cycle");
  const cx = W / 2, cy = 112, R = W < 380 ? 58 : 66;
  const arcs = [["Red", "failing test", -90, 30, "red"], ["Green", "make it pass", 30, 150, "green"], ["Refactor", "clean up", 150, 270, "blue"]];
  const paths = arcs.map(([t, s, a, b, c]) => {
    const p = (ang, rr) => [cx + rr * Math.cos(ang * Math.PI / 180), cy + rr * Math.sin(ang * Math.PI / 180)];
    const [x1, y1] = p(a + 4, R), [x2, y2] = p(b - 4, R);
    const g = sv("g", { class: "vx-tdd " + c }, svg);
    sv("path", { d: `M${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`, fill: "none" }, g);
    { const e = (b - 4) * Math.PI / 180, tx_ = -Math.sin(e), ty_ = Math.cos(e), nx = Math.cos(e), ny = Math.sin(e), s = 12;
      sv("path", { d: `M${x2 + tx_ * s} ${y2 + ty_ * s} L${x2 + nx * s * .7} ${y2 + ny * s * .7} L${x2 - nx * s * .7} ${y2 - ny * s * .7} Z`, class: "vx-tip" }, g); }
    const mid = (a + b) / 2, [lx, ly] = p(mid, R + 18), c0 = Math.cos(mid * Math.PI / 180);
    const anc = c0 > 0.3 ? "start" : c0 < -0.3 ? "end" : "middle", dy = Math.sin(mid * Math.PI / 180) > 0.5 ? 14 : 0;
    tx(g, lx, ly + dy, t, "vx-t vx-b", anc); tx(g, lx, ly + dy + 15, s, "vx-t vx-s vx-mt", anc);
    return g;
  });
  tx(svg, cx, cy - 2, "minutes,", "vx-t vx-s vx-mt"); tx(svg, cx, cy + 13, "not hours", "vx-t vx-s vx-mt");
  const panel = hx("div", "vz-panel", null, host);
  const S = [
    [0, "Write a test that fails first", "assert isLeap(2024) == true\n# fails: isLeap does not exist"],
    [1, "Write just enough code to pass", "def isLeap(year):\n    return year % 4 == 0\n# test passes"],
    [2, "Nothing to clean yet", "# code is simple; all tests green"],
    [0, "Next failing test", "assert isLeap(1900) == false\n# fails: 1900 is divisible by 4"],
    [1, "Make it pass", "def isLeap(year):\n    return (year % 4 == 0 and\n            (year % 100 != 0 or\n             year % 400 == 0))\n# 2024, 1900 and 2000 all pass"],
    [2, "Clean up, tests as the safety net", "def div(y, n):\n    return y % n == 0\n\ndef isLeap(y):\n    return div(y, 4) and (\n        not div(y, 100)\n        or div(y, 400))\n# same behaviour, all tests green"]];
  stepper(host, S.length, i => {
    paths.forEach((p, k) => p.classList.toggle("now", k === S[i][0]));
    panel.innerHTML = `<h4>${arcs[S[i][0]][0]}: ${S[i][1]}</h4><pre class="vz-code wrap">${S[i][2]}</pre>`;
  });
}};

VIZ["ag-velocity"] = { t: "Velocity, slack and the burn-up chart", cap: "Move the sliders. Velocity decides how much fits; slack keeps promises safe.", build(host) {
  const f = hx("div", "vz-form vz-form2", `<label><span>Velocity (points per iteration): <b></b></span><input type="range" min="6" max="16" value="10"></label><label><span>Slack held back: <b></b></span><input type="range" min="0" max="30" step="10" value="10"></label>`, host);
  const [vi, si] = f.querySelectorAll("input"), [vl, sl] = f.querySelectorAll("b");
  const stories = [["Login", 3], ["Search", 5], ["Cart", 2], ["Payment", 8], ["Order history", 3], ["Wishlist", 1], ["Reviews", 5], ["Coupons", 2]];
  const W = vw(host), H = 220, wrap = hx("div", "vz-canvas", null, host);
  const list = hx("div", "vz-stories", null, host), n = note(host);
  const scope = stories.reduce((s, x) => s + x[1], 0);
  function draw() {
    const v = +vi.value, slack = +si.value, plan = Math.floor(v * (100 - slack) / 100);
    vl.textContent = v; sl.textContent = slack + "%";
    wrap.innerHTML = "";
    const svg = svgRoot(wrap, W, H, "burn-up");
    const iters = Math.ceil(scope / plan), maxI = Math.max(iters, 4);
    const X = i => 40 + (W - 56) * i / maxI, Y = p => H - 26 - (H - 50) * p / (scope * 1.1);
    sv("line", { x1: X(0), y1: Y(0), x2: X(maxI), y2: Y(0), class: "vx-axis" }, svg);
    sv("line", { x1: X(0), y1: Y(0), x2: X(0), y2: Y(scope * 1.1), class: "vx-axis" }, svg);
    sv("line", { x1: X(0), y1: Y(scope), x2: X(maxI), y2: Y(scope), class: "vx-scope" }, svg);
    tx(svg, X(maxI) - 2, Y(scope) - 6, `scope ${scope} pts`, "vx-t vx-s", "end");
    let d = `M${X(0)} ${Y(0)}`; for (let i = 1; i <= iters; i++) d += ` L${X(i)} ${Y(Math.min(scope, plan * i))}`;
    sv("path", { d, class: "vx-burn", fill: "none" }, svg);
    for (let i = 1; i <= iters; i++) sv("circle", { cx: X(i), cy: Y(Math.min(scope, plan * i)), r: 3.5, class: "vx-burnpt" }, svg);
    for (let i = 0; i <= maxI; i++) tx(svg, X(i), H - 8, String(i), "vx-t vx-s vx-mt");
    tx(svg, X(0) + 4, 14, "points done", "vx-t vx-s vx-mt", "start");
    let used = 0; const fit = []; for (const s of stories) { if (used + s[1] <= plan) { fit.push(s); used += s[1]; } else break; }
    list.innerHTML = `<p class="vz-dim">Next iteration, in priority order (plan ${plan} of ${v} points):</p>` + stories.map(s => `<span class="${fit.includes(s) ? "in" : ""}">${s[0]} <small>${s[1]}</small></span>`).join("");
    n.innerHTML = fmt(`Velocity ${v} with ${slack}% slack means the team ==commits to ${plan} points== per iteration. The whole release (${scope} points) takes ==⌈${scope} / ${plan}⌉ = ${iters} iterations==. Slack time goes to paying down technical debt or research; if something goes wrong, slack absorbs it instead of overtime.`);
  }
  vi.oninput = si.oninput = draw; draw();
}};

VIZ["ag-ci"] = { t: "One continuous-integration cycle", cap: "Every few hours, the same loop.", build(host) {
  flowViz(host, { nodes: [
    { t: "Update", s: "Get the latest code", d: "Start from what is in the repository, which is always ready to ship." },
    { t: "Small change + tests", s: "Usually with TDD and a pair", d: "Make a change small enough to integrate in a few hours." },
    { t: "Ten-minute build locally", s: "One command", d: "Compile and run every test. Fix anything red before going further." },
    { t: "Take the integration token", s: "One integrator at a time", d: "Prevents two people integrating at once and confusing whose change broke what." },
    { t: "Commit and build on the integration machine", s: "Synchronous integration", d: "Wait for it to pass. With an asynchronous CI server, the server builds after the commit and reports back." },
    { t: "Green: release the token", s: "Red: fix immediately", d: "==Never leave the build broken.== If it fails, fixing it is the team's top priority, or the change is reverted." }] });
}};

VIZ["ag-planning"] = { t: "The planning game on one grid", cap: "Customers place cards by value; programmers say what each costs.", build(host) {
  const C = [["Login", 76, 18], ["Payment", 70, 74], ["Wishlist", 22, 20], ["3D product view", 22, 72], ["Search", 62, 34], ["Coupons", 36, 32]];
  const W = vw(host), H = Math.round(W * 0.62), svg = svgRoot(hx("div", "vz-canvas", null, host), W, H, "value vs cost");
  const X = c => 30 + (W - 44) * c / 100, Y = v => H - 26 - (H - 44) * v / 100;
  sv("line", { x1: X(50), y1: Y(0), x2: X(50), y2: Y(100), class: "vx-axis dash" }, svg);
  sv("line", { x1: X(0), y1: Y(50), x2: X(100), y2: Y(50), class: "vx-axis dash" }, svg);
  sv("line", { x1: X(0), y1: Y(0), x2: X(100), y2: Y(0), class: "vx-axis" }, svg);
  sv("line", { x1: X(0), y1: Y(0), x2: X(0), y2: Y(100), class: "vx-axis" }, svg);
  tx(svg, X(100), H - 6, "cost (programmers estimate) →", "vx-t vx-s vx-mt", "end");
  tx(svg, X(0) + 6, 14, "value (customers decide) ↑", "vx-t vx-s vx-mt", "start");
  [["Do first", 2, 95, "start"], ["Plan carefully", 98, 95, "end"], ["Cheap extras", 2, 4, "start"], ["Question it", 98, 4, "end"]].forEach(([l, c, v, a]) => tx(svg, X(c), Y(v) + 4, l, "vx-t vx-s vx-quad", a));
  C.forEach(([l, v, c]) => { const g = sv("g", { class: "vx-card" }, svg); const w = l.length * 6.6 + 16; sv("rect", { x: X(c) - w / 2, y: Y(v) - 12, width: w, height: 24, rx: 6 }, g); tx(g, X(c), Y(v) + 4, l, "vx-t vx-s vx-b"); });
  note(host).innerHTML = fmt("Steps: ==anyone writes stories → programmers estimate cost → customers order them by value== → repeat. High value at low cost goes first. Neither side can make the plan alone, which is the whole point of the game.");
}};
