/* Compiler Design visual explainers. Parsing tables below were checked against an independent LR/LL generator. */

VIZ["cd-phases"] = { t: "One statement through every phase", cap: "position = initial + rate * 60, exactly as in the textbook.", build(host) {
  flowViz(host, { nodes: [
    { t: "Source", s: "Character stream", code: "position = initial + rate * 60" },
    { t: "Lexical analysis", s: "Characters → tokens; names go into the symbol table", code: "<id,1> <=> <id,2> <+>\n<id,3> <*> <60>\n\nSymbol table\n1  position  float\n2  initial   float\n3  rate      float" },
    { t: "Syntax analysis", s: "Tokens → syntax tree (* binds tighter than +)", code: "        =\n      /   \\\n <id,1>    +\n         /   \\\n     <id,2>    *\n             /   \\\n         <id,3>   60" },
    { t: "Semantic analysis", s: "Type checking inserts a conversion", d: "rate is float but 60 is an integer, so the checker inserts ==inttofloat==.", code: "        =\n      /   \\\n <id,1>    +\n         /   \\\n     <id,2>    *\n             /   \\\n         <id,3>  inttofloat\n                     |\n                     60" },
    { t: "Intermediate code", s: "Three-address code", code: "t1 = inttofloat(60)\nt2 = id3 * t1\nt3 = id2 + t2\nid1 = t3" },
    { t: "Code optimisation", s: "Fold the conversion, drop the extra copy", d: "The conversion is done once at compile time (60 → 60.0) and t3 is removed.", code: "t1 = id3 * 60.0\nid1 = id2 + t1" },
    { t: "Code generation", s: "Registers and machine instructions (F = floating point)", code: "LDF  R2, id3\nMULF R2, R2, #60.0\nLDF  R1, id2\nADDF R1, R1, R2\nSTF  id1, R1" }] });
}};

VIZ["cd-buffer"] = { t: "Input buffering: lexemeBegin, forward and the sentinel", cap: "Watch why the lexer must sometimes look one character ahead.", build(host) {
  const cells = ["E", "=", "M", "*", "C", "*", "*", "2", "eof"];
  const box = hx("div", "vz-buf", cells.map((c, i) => `<span data-i="${i}">${c}</span>`).join(""), host);
  const ptr = hx("div", "vz-ptrs", "", host);
  const n = note(host);
  const S = [
    [0, 0, "Start: both pointers at E. forward reads a letter, the start of an identifier."],
    [0, 1, "forward moves to '='. That cannot continue an identifier, so the lexeme is 'E' → token ==id==. forward retracts."],
    [1, 2, "lexemeBegin moves to '='. forward peeks at 'M' to make sure this is not '=='. Token ==assign==."],
    [2, 3, "'M' is an identifier; forward stops at '*'. Token ==id==."],
    [3, 4, "'*': forward peeks at 'C'. Since it is not another '*', the token is ==multiply==."],
    [4, 5, "'C' → token ==id==."],
    [5, 6, "'*' again, but this time the peek finds another '*', so the lexeme is ==**== (exponent). This is why lookahead is needed."],
    [7, 8, "'2' → token ==number==. forward now reads ==eof==."],
    [8, 8, "With ==sentinels==, eof sits at the end of each buffer half, so the loop tests each character once. Only when it sees eof does it ask: end of this half (reload the other half) or true end of input?"]];
  stepper(host, S.length, i => {
    const [b, f, t] = S[i];
    box.querySelectorAll("span").forEach((s, k) => s.className = (k >= b && k < Math.max(f, b + 1) && i < 8 ? "lex " : "") + (k === b ? "lb " : "") + (k === f ? "fw " : "") + (cells[k] === "eof" ? "eof" : ""));
    ptr.innerHTML = `<span class="lb">lexemeBegin → ${b}</span><span class="fw">forward → ${f}</span>`;
    n.innerHTML = fmt(t);
  });
}};

VIZ["cd-dfa"] = { t: "DFA for (a|b)*abb: run any string", cap: "Built from followpos. Type a string of a's and b's and step through it.", build(host) {
  hx("div", "vz-mini", `<table class="vz-tbl"><tr><th>position</th><th>symbol</th><th>followpos</th></tr>${[[1,"a","{1,2,3}"],[2,"b","{1,2,3}"],[3,"a","{4}"],[4,"b","{5}"],[5,"b","{6}"],[6,"#","—"]].map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>
  <p class="vz-dim">States: A = {1,2,3} start, B = {1,2,3,4}, C = {1,2,3,5}, D = {1,2,3,6} accepting (contains position 6, the # marker).</p>`, host);
  const f = hx("div", "vz-form", `<label>Input string<input value="babb" spellcheck="false" autocapitalize="off"></label>`, host);
  const inp = f.querySelector("input");
  const T = { A: { a: "B", b: "A" }, B: { a: "B", b: "C" }, C: { a: "B", b: "D" }, D: { a: "B", b: "A" } };
  const W = vw(host), H = 210, wrap = hx("div", "vz-canvas", null, host), svg = svgRoot(wrap, W, H, "DFA");
  const xs = { A: W * 0.12, B: W * 0.38, C: W * 0.63, D: W * 0.88 }, y = 105, r = 22;
  const E = {};
  const edge = (from, sym, d, lx, ly) => { const p = sv("path", { d, class: "vx-dedge", fill: "none", "marker-end": mk(svg, "ah") }, svg); const t = tx(svg, lx, ly, sym, "vx-t vx-s vx-b"); E[from + sym] = [p, t]; };
  edge("A", "a", `M${xs.A + r} ${y} L${xs.B - r - 2} ${y}`, (xs.A + xs.B) / 2, y - 7);
  edge("B", "b", `M${xs.B + r} ${y} L${xs.C - r - 2} ${y}`, (xs.B + xs.C) / 2, y - 7);
  edge("C", "b", `M${xs.C + r} ${y} L${xs.D - r - 2} ${y}`, (xs.C + xs.D) / 2, y - 7);
  edge("A", "b", `M${xs.A - 10} ${y - r + 2} C ${xs.A - 40} ${y - 75}, ${xs.A + 40} ${y - 75}, ${xs.A + 10} ${y - r}`, xs.A, y - 62);
  edge("B", "a", `M${xs.B - 10} ${y - r + 2} C ${xs.B - 40} ${y - 75}, ${xs.B + 40} ${y - 75}, ${xs.B + 10} ${y - r}`, xs.B, y - 62);
  edge("C", "a", `M${xs.C - 8} ${y + r} C ${xs.C - 30} ${y + 55}, ${xs.B + 30} ${y + 55}, ${xs.B + 8} ${y + r + 2}`, (xs.B + xs.C) / 2, y + 52);
  edge("D", "a", `M${xs.D - 6} ${y + r} C ${xs.D - 40} ${y + 98}, ${xs.B + 20} ${y + 98}, ${xs.B} ${y + r + 2}`, (xs.C + xs.D) / 2 + 10, y + 90);
  edge("D", "b", `M${xs.D - 6} ${y - r} C ${xs.D - 60} ${y - 95}, ${xs.A + 60} ${y - 95}, ${xs.A + 8} ${y - r - 1}`, (xs.B + xs.C) / 2, y - 84);
  const NN = {};
  for (const s in xs) {
    const g = sv("g", { class: "vx-node" }, svg);
    sv("circle", { cx: xs[s], cy: y, r }, g);
    if (s === "D") sv("circle", { cx: xs[s], cy: y, r: r - 5, class: "vx-acc" }, g);
    tx(g, xs[s], y + 5, s, "vx-t vx-nl");
    NN[s] = g;
  }
  sv("line", { x1: 4, y1: y, x2: xs.A - r - 2, y2: y, class: "vx-dedge", "marker-end": mk(svg, "ah") }, svg);
  const tape = hx("div", "vz-tape", "", host), n = note(host);
  let ctl = null;
  function run() {
    const s = (inp.value || "").toLowerCase().replace(/[^ab]/g, "");
    const path = ["A"]; for (const c of s) path.push(T[path[path.length - 1]][c]);
    if (ctl) ctl.bar.remove();
    ctl = stepper(host, s.length + 1, i => {
      for (const k in NN) NN[k].setAttribute("class", "vx-node" + (k === path[i] ? " now" : ""));
      for (const k in E) { E[k][0].setAttribute("class", "vx-dedge"); }
      if (i > 0) { const k = path[i - 1] + s[i - 1]; E[k][0].setAttribute("class", "vx-dedge now"); }
      tape.innerHTML = s.split("").map((c, k) => `<span class="${k < i ? "done" : k === i ? "next" : ""}">${c}</span>`).join("") || "<em>empty string</em>";
      const end = i === s.length;
      n.innerHTML = fmt(i === 0 ? "Start in ==A== = {1,2,3}." : `Read '${s[i - 1]}': ${path[i - 1]} → ==${path[i]}==.` + (end ? (path[i] === "D" ? " The string ends in D, so it is ==accepted==: it ends with abb." : ` The string ends in ${path[i]}, not D, so it is ==rejected==.`) : ""));
    });
    host.appendChild(n);
  }
  inp.oninput = run; run();
}};

const LLT = { "E": { id: ["T", "E'"], "(": ["T", "E'"] }, "E'": { "+": ["+", "T", "E'"], ")": [], "$": [] }, "T": { id: ["F", "T'"], "(": ["F", "T'"] }, "T'": { "+": [], "*": ["*", "F", "T'"], ")": [], "$": [] }, "F": { id: ["id"], "(": ["(", "E", ")"] } };
function toks(s) { const t = []; const re = /\s*(id|[+*()])/y; let m, i = 0; s = s.trim(); while (i < s.length) { re.lastIndex = i; m = re.exec(s); if (!m) return null; t.push(m[1]); i = re.lastIndex; while (s[i] === " ") i++; } return t; }
VIZ["cd-ll1"] = { t: "LL(1) parsing of the expression grammar", cap: "FIRST, FOLLOW and the table, then a live parse. Try your own input using id, +, *, ( and ).", build(host) {
  hx("div", "vz-mini", `<div class="vz-scroll"><table class="vz-tbl"><tr><th></th><th>FIRST</th><th>FOLLOW</th></tr>
    <tr><th>E</th><td>( id</td><td>) $</td></tr><tr><th>E′</th><td>+ ε</td><td>) $</td></tr><tr><th>T</th><td>( id</td><td>+ ) $</td></tr><tr><th>T′</th><td>* ε</td><td>+ ) $</td></tr><tr><th>F</th><td>( id</td><td>+ * ) $</td></tr></table></div>
    <div class="vz-scroll"><table class="vz-tbl vz-ptab"><tr><th></th><th>id</th><th>+</th><th>*</th><th>(</th><th>)</th><th>$</th></tr>
    ${Object.keys(LLT).map(A => `<tr><th>${A.replace("'", "′")}</th>${["id", "+", "*", "(", ")", "$"].map(a => `<td>${LLT[A][a] ? A.replace("'", "′") + "→" + (LLT[A][a].length ? LLT[A][a].join("").replace(/'/g, "′") : "ε") : ""}</td>`).join("")}</tr>`).join("")}</table></div>`, host);
  const f = hx("div", "vz-form", `<label>Input<input value="id+id*id" spellcheck="false" autocapitalize="off"></label>`, host);
  const inp = f.querySelector("input"), out = hx("div", null, null, host);
  function run() {
    out.innerHTML = "";
    const tk = toks(inp.value);
    if (!tk) { out.innerHTML = `<p class="vz-err">Use only id, +, *, ( and ).</p>`; return; }
    const inpt = tk.concat("$"), st = ["$", "E"], rows = []; let ip = 0, guard = 0;
    while (guard++ < 200) {
      const X = st[st.length - 1], a = inpt[ip];
      const row = [st.slice().reverse().join(" ").replace(/'/g, "′"), inpt.slice(ip).join(" ")];
      if (X === "$" && a === "$") { rows.push(row.concat("accept")); break; }
      if (X === a) { st.pop(); ip++; rows.push(row.concat(`match ${a}`)); continue; }
      if (!LLT[X]) { rows.push(row.concat(`error: expected ${X}`)); break; }
      const body = LLT[X][a];
      if (!body) { rows.push(row.concat(`error: no entry M[${X.replace("'", "′")}, ${a}]`)); break; }
      st.pop(); for (let k = body.length - 1; k >= 0; k--) st.push(body[k]);
      rows.push(row.concat(`${X} → ${body.length ? body.join(" ") : "ε"}`.replace(/'/g, "′")));
    }
    const tbl = hx("div", "vz-scroll", `<table class="vz-tbl vz-trace"><tr><th>Stack (top first)</th><th>Input</th><th>Action</th></tr>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>`, out);
    const trs = tbl.querySelectorAll("tr");
    stepper(out, rows.length, i => trs.forEach((tr, k) => tr.className = k === 0 ? "" : k - 1 < i ? "past" : k - 1 === i ? "now" : "later"));
  }
  inp.oninput = run; run();
}};

const SLR = { A: [{ id: "s5", "(": "s4" }, { "+": "s6", $: "acc" }, { "+": "r2", "*": "s7", ")": "r2", $: "r2" }, { "+": "r4", "*": "r4", ")": "r4", $: "r4" }, { id: "s5", "(": "s4" }, { "+": "r6", "*": "r6", ")": "r6", $: "r6" }, { id: "s5", "(": "s4" }, { id: "s5", "(": "s4" }, { "+": "s6", ")": "s11" }, { "+": "r1", "*": "s7", ")": "r1", $: "r1" }, { "+": "r3", "*": "r3", ")": "r3", $: "r3" }, { "+": "r5", "*": "r5", ")": "r5", $: "r5" }],
  G: [{ E: 1, T: 2, F: 3 }, {}, {}, {}, { E: 8, T: 2, F: 3 }, {}, { T: 9, F: 3 }, { F: 10 }, {}, {}, {}, {}],
  P: [null, ["E", 3, "E → E + T"], ["E", 1, "E → T"], ["T", 3, "T → T * F"], ["T", 1, "T → F"], ["F", 3, "F → ( E )"], ["F", 1, "F → id"]] };
VIZ["cd-slr"] = { t: "SLR parsing table and a live shift-reduce parse", cap: "The canonical table for E → E+T | T, T → T*F | F, F → (E) | id.", build(host) {
  const cols = ["id", "+", "*", "(", ")", "$"];
  hx("div", "vz-mini", `<p class="vz-dim">Productions: (1) E → E+T (2) E → T (3) T → T*F (4) T → F (5) F → (E) (6) F → id. sN = shift and go to state N; rN = reduce by production N.</p>
  <div class="vz-scroll"><table class="vz-tbl vz-ptab"><tr><th>State</th>${cols.map(c => `<th>${c}</th>`).join("")}<th>E</th><th>T</th><th>F</th></tr>
  ${SLR.A.map((r, i) => `<tr data-s="${i}"><th>${i}</th>${cols.map(c => `<td data-c="${c}">${r[c] || ""}</td>`).join("")}${["E", "T", "F"].map(X => `<td>${SLR.G[i][X] != null ? SLR.G[i][X] : ""}</td>`).join("")}</tr>`).join("")}</table></div>`, host);
  const tab = host.querySelector(".vz-ptab");
  const f = hx("div", "vz-form", `<label>Input<input value="id*id+id" spellcheck="false" autocapitalize="off"></label>`, host);
  const inp = f.querySelector("input"), out = hx("div", null, null, host);
  function run() {
    out.innerHTML = "";
    const tk = toks(inp.value);
    if (!tk) { out.innerHTML = `<p class="vz-err">Use only id, +, *, ( and ).</p>`; return; }
    const w = tk.concat("$"); const st = [0], sym = []; let ip = 0; const rows = []; let g = 0;
    while (g++ < 300) {
      const s = st[st.length - 1], a = w[ip], act = SLR.A[s][a];
      const row = [st.join(" "), sym.join(" "), w.slice(ip).join(" "), s, a];
      if (!act) { rows.push(row.concat("error (empty cell)")); break; }
      if (act === "acc") { rows.push(row.concat("accept")); break; }
      if (act[0] === "s") { st.push(+act.slice(1)); sym.push(a); ip++; rows.push(row.concat(`shift ${act.slice(1)}`)); continue; }
      const p = SLR.P[+act.slice(1)];
      for (let k = 0; k < p[1]; k++) { st.pop(); sym.pop(); }
      st.push(SLR.G[st[st.length - 1]][p[0]]); sym.push(p[0]);
      rows.push(row.concat(`reduce ${p[2]}`));
    }
    const t = hx("div", "vz-scroll", `<table class="vz-tbl vz-trace"><tr><th>Stack</th><th>Symbols</th><th>Input</th><th>Action</th></tr>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[5]}</td></tr>`).join("")}</table>`, out);
    const trs = t.querySelectorAll("tr");
    stepper(out, rows.length, i => {
      trs.forEach((tr, k) => tr.className = k === 0 ? "" : k - 1 < i ? "past" : k - 1 === i ? "now" : "later");
      tab.querySelectorAll("td.hit").forEach(x => x.classList.remove("hit"));
      const c = tab.querySelector(`tr[data-s="${rows[i][3]}"] td[data-c="${rows[i][4] === "$" ? "$" : rows[i][4]}"]`); if (c) c.classList.add("hit");
    });
  }
  inp.oninput = run; run();
}};

VIZ["cd-3ac"] = { t: "Quadruples, triples, indirect triples", cap: "a = b * −c + b * −c in all three representations.", build(host) {
  const box = hx("div", null, null, host), n = note(host);
  const views = [
    ["Code", `<pre class="vz-code">t1 = minus c\nt2 = b * t1\nt3 = minus c\nt4 = b * t3\nt5 = t2 + t4\na  = t5</pre>`, "Each line has at most ==one operator== on the right. Temporaries t1 to t5 hold intermediate results."],
    ["Quadruples", `<table class="vz-tbl"><tr><th></th><th>op</th><th>arg1</th><th>arg2</th><th>result</th></tr><tr><th>0</th><td>minus</td><td>c</td><td></td><td>t1</td></tr><tr><th>1</th><td>*</td><td>b</td><td>t1</td><td>t2</td></tr><tr><th>2</th><td>minus</td><td>c</td><td></td><td>t3</td></tr><tr><th>3</th><td>*</td><td>b</td><td>t3</td><td>t4</td></tr><tr><th>4</th><td>+</td><td>t2</td><td>t4</td><td>t5</td></tr><tr><th>5</th><td>=</td><td>t5</td><td></td><td>a</td></tr></table>`, "Four fields. Results have ==explicit names==, so instructions can be moved freely, at the cost of many temporaries in the symbol table."],
    ["Triples", `<table class="vz-tbl"><tr><th></th><th>op</th><th>arg1</th><th>arg2</th></tr><tr><th>0</th><td>minus</td><td>c</td><td></td></tr><tr><th>1</th><td>*</td><td>b</td><td><mark>(0)</mark></td></tr><tr><th>2</th><td>minus</td><td>c</td><td></td></tr><tr><th>3</th><td>*</td><td>b</td><td><mark>(2)</mark></td></tr><tr><th>4</th><td>+</td><td><mark>(1)</mark></td><td><mark>(3)</mark></td></tr><tr><th>5</th><td>=</td><td>a</td><td><mark>(4)</mark></td></tr></table>`, "No result column: a result is named by its ==position== in brackets. Saves space, but moving an instruction changes its number and ==breaks every reference==."],
    ["Indirect", `<div class="vz-two"><table class="vz-tbl"><tr><th>instruction</th></tr><tr><td>35: (0)</td></tr><tr><td>36: (1)</td></tr><tr><td>37: (2)</td></tr><tr><td>38: (3)</td></tr><tr><td>39: (4)</td></tr><tr><td>40: (5)</td></tr></table><table class="vz-tbl"><tr><th></th><th>op</th><th>arg1</th><th>arg2</th></tr><tr><th>0</th><td>minus</td><td>c</td><td></td></tr><tr><th>1</th><td>*</td><td>b</td><td>(0)</td></tr><tr><th>2</th><td>minus</td><td>c</td><td></td></tr><tr><th>3</th><td>*</td><td>b</td><td>(2)</td></tr><tr><th>4</th><td>+</td><td>(1)</td><td>(3)</td></tr><tr><th>5</th><td>=</td><td>a</td><td>(4)</td></tr></table></div>`, "A separate ==list of pointers== gives the execution order. An optimiser reorders that list and leaves the triples untouched. Best of both."]];
  seg(host.insertBefore(hx("div"), box), views.map(v => v[0]), k => { box.innerHTML = `<div class="vz-scroll">${views[k][1]}</div>`; n.innerHTML = fmt(views[k][2]); }, 0);
  box.innerHTML = `<div class="vz-scroll">${views[0][1]}</div>`; n.innerHTML = fmt(views[0][2]);
}};

VIZ["cd-dag"] = { t: "Building the DAG for a + a*(b−c) + (b−c)*d", cap: "13 node requests, 9 distinct nodes. Reused nodes flash.", build(host) {
  const nodes = { p1: { x: 12, y: 80, l: "a" }, p3: { x: 44, y: 96, l: "b" }, p4: { x: 70, y: 96, l: "c" }, p5: { x: 57, y: 72, l: "−" }, p6: { x: 38, y: 52, l: "*" }, p7: { x: 26, y: 28, l: "+" }, p11: { x: 90, y: 72, l: "d" }, p12: { x: 76, y: 44, l: "*" }, p13: { x: 52, y: 6, l: "+" } };
  const edges = [["p7", "p1"], ["p7", "p6"], ["p6", "p1"], ["p6", "p5"], ["p5", "p3"], ["p5", "p4"], ["p12", "p5"], ["p12", "p11"], ["p13", "p7"], ["p13", "p12"]];
  const net = netViz(host, { nodes, edges, ratio: 0.7, label: "DAG" });
  const S = [["p1", "p1 = Leaf(id, a)", 0], ["p1", "p2 = Leaf(id, a) = p1: ==reused==", 1], ["p3", "p3 = Leaf(id, b)", 0], ["p4", "p4 = Leaf(id, c)", 0], ["p5", "p5 = Node('−', p3, p4)", 0], ["p6", "p6 = Node('*', p1, p5)", 0], ["p7", "p7 = Node('+', p1, p6)", 0], ["p3", "p8 = Leaf(id, b) = p3: ==reused==", 1], ["p4", "p9 = Leaf(id, c) = p4: ==reused==", 1], ["p5", "p10 = Node('−', p3, p4) = p5: ==the whole (b−c) node is reused==", 1], ["p11", "p11 = Leaf(id, d)", 0], ["p12", "p12 = Node('*', p5, p11)", 0], ["p13", "p13 = Node('+', p7, p12). Done: 9 distinct nodes.", 0]];
  const n = note(host);
  stepper(host, S.length, i => {
    const seen = new Set(S.slice(0, i + 1).map(s => s[0]));
    for (const id in nodes) net.node(id, seen.has(id) ? (id === S[i][0] ? (S[i][2] ? "reuse" : "now") : "on") : "hide");
    edges.forEach(([a, b]) => net.edge(a, b, seen.has(a) && seen.has(b) ? "on" : "hide"));
    n.innerHTML = fmt(S[i][1]) + (S[i][2] ? " <span class='vz-dim'>The value-number table already has a node with this signature, so no new node is made.</span>" : "");
  });
}};

VIZ["cd-ar"] = { t: "Control links vs access links on the stack", cap: "sort calls quicksort, which calls partition, which calls exchange (textbook example with nested procedures).", build(host) {
  hx("pre", "vz-code vz-nest", "sort                     depth 1\n├── readArray            depth 2\n├── exchange             depth 2\n└── quicksort            depth 2\n    └── partition        depth 3", host);
  const ctl = hx("div", null, null, host);
  const R = [{ n: "sort", d: 1 }, { n: "quicksort(1,9)", d: 2, a: 0 }, { n: "quicksort(1,3)", d: 2, a: 0 }, { n: "partition(1,3)", d: 3, a: 2 }, { n: "exchange(1,3)", d: 2, a: 0 }];
  const W = vw(host), rh = 40, gap = 12, H = R.length * (rh + gap) + 40;
  const svg = svgRoot(hx("div", "vz-canvas", null, host), W, H, "activation records");
  const bw = Math.min(W * 0.5, 240), cx = W / 2;
  const yOf = i => H - 26 - (i + 1) * (rh + gap) + gap;
  R.forEach((r, i) => {
    sv("rect", { x: cx - bw / 2, y: yOf(i), width: bw, height: rh, rx: 8, class: "vx-box" }, svg);
    tx(svg, cx, yOf(i) + 25, `${r.n}   (depth ${r.d})`, "vx-t vx-b vx-s");
  });
  tx(svg, cx, H - 8, "stack grows upward ↑", "vx-t vx-s vx-mt");
  const gC = sv("g", { class: "vx-links ctrl" }, svg), gA = sv("g", { class: "vx-links acc" }, svg);
  R.forEach((r, i) => {
    if (i > 0) {
      const y1 = yOf(i) + rh / 2, y2 = yOf(i - 1) + rh / 2, x = cx + bw / 2;
      sv("path", { d: `M${x} ${y1} C ${x + 34} ${y1}, ${x + 34} ${y2}, ${x + 2} ${y2}`, fill: "none", class: "vx-clink", "marker-end": mk(svg, "ah-on") }, gC);
    }
    if (r.a != null) {
      const y1 = yOf(i) + rh / 2, y2 = yOf(r.a) + rh / 2, x = cx - bw / 2, bend = 26 + (i - r.a) * 14;
      sv("path", { d: `M${x} ${y1} C ${x - bend} ${y1}, ${x - bend} ${y2}, ${x - 2} ${y2}`, fill: "none", class: "vx-alink", "marker-end": mk(svg, "ah-bad") }, gA);
    }
  });
  tx(svg, cx + bw / 2 + 30, 14, "control", "vx-t vx-s vx-ctrlt"); tx(svg, cx - bw / 2 - 30, 14, "access", "vx-t vx-s vx-acct");
  const n = note(host);
  const texts = ["==Control links== (right) point to the ==caller's== record: each record points to the one directly below it, because that is who called it. Used to return and pop the stack.",
    "==Access links== (left) point to the ==lexically enclosing== procedure's most recent record. partition is written inside quicksort, so its access link goes to quicksort(1,3). exchange is written inside sort, so its access link ==skips over== quicksort and partition and goes straight to sort.",
    "Both together: they coincide only when the caller is also the enclosing procedure. To reach a variable k levels out, follow k access links (depth difference)."];
  seg(ctl, ["Control links", "Access links", "Both"], k => { gC.style.display = k !== 1 ? "" : "none"; gA.style.display = k !== 0 ? "" : "none"; n.innerHTML = fmt(texts[k]); }, 0);
  gA.style.display = "none"; n.innerHTML = fmt(texts[0]);
  hx("div", "vz-mini", `<p><b>Inside one activation record</b>, top to bottom: actual parameters · returned values · control link · access link · saved machine status · local data · temporaries.</p>`, host);
}};

VIZ["cd-dataflow"] = { t: "The three data-flow problems side by side", cap: "Direction and meet are the two things examiners test most.", build(host) {
  const A = [
    ["Reaching definitions", "Which assignments might reach this point?", "Forward ↓", "Union ∪", "OUT[B] = gen[B] ∪ (IN[B] − kill[B])", "IN[B] = ∪ OUT[P], P a predecessor", "OUT[ENTRY] = ∅", "Constant propagation, use-def chains"],
    ["Live variables", "Will this variable's value be used later?", "Backward ↑", "Union ∪", "IN[B] = use[B] ∪ (OUT[B] − def[B])", "OUT[B] = ∪ IN[S], S a successor", "IN[EXIT] = ∅", "Register allocation, dead-code elimination"],
    ["Available expressions", "Has this expression already been computed on every path?", "Forward ↓", "Intersection ∩", "OUT[B] = e_gen[B] ∪ (IN[B] − e_kill[B])", "IN[B] = ∩ OUT[P], P a predecessor", "OUT[ENTRY] = ∅; others start as U (all)", "Global common subexpression elimination"]];
  hx("div", "vz-df", A.map(r => `<section><h4>${r[0]}</h4><p class="vz-sub">${r[1]}</p><div class="vz-df-tags"><span>${r[2]}</span><span>${r[3]}</span></div><code>${r[4]}</code><code>${r[5]}</code><p class="vz-dim">Boundary: ${r[6]}. Used for: ${r[7]}.</p></section>`).join(""), host);
  hx("div", "vz-note", fmt("Memory trick: ==past → forward==, ==future → backward==. Use ==∩ only when the fact must hold on all paths== (available expressions); otherwise ∪ (any path is enough)."), host);
}};

VIZ["cd-loops"] = { t: "Dominators, back edges and the natural loop", cap: "Tap any node to see its dominators.", build(host) {
  const nodes = { 1: { x: 50, y: 4 }, 2: { x: 50, y: 28 }, 3: { x: 22, y: 52 }, 4: { x: 78, y: 52 }, 5: { x: 50, y: 76 }, 6: { x: 50, y: 98 } };
  const E = [[1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [5, 2], [5, 6]];
  const pred = {}; for (const k in nodes) pred[k] = []; E.forEach(([a, b]) => pred[b].push(String(a)));
  const all = Object.keys(nodes), dom = {}; all.forEach(k => dom[k] = new Set(k === "1" ? ["1"] : all));
  let ch = true; while (ch) { ch = false; for (const k of all) { if (k === "1") continue; let s = null; pred[k].forEach(p => { s = s ? new Set([...s].filter(x => dom[p].has(x))) : new Set(dom[p]); }); s.add(k); if (s.size !== dom[k].size) { dom[k] = s; ch = true; } } }
  const n = note(host);
  const net = netViz(host, { nodes, edges: [], ratio: 0.85, r: 16, label: "flow graph", onNode: id => { show(id); } });
  function arrows(cls) { net.clearArrows(); E.forEach(([a, b]) => net.arrow(String(a), String(b), (cls && cls(a, b)) || "")); }
  function show(id) { net.reset(); arrows(); [...dom[id]].forEach(d => net.node(d, d === id ? "now" : "on")); n.innerHTML = fmt(`Dominators of ${id}: ==${[...dom[id]].sort().join(", ")}==. Every path from 1 to ${id} passes through these.`); }
  const S = [
    () => { net.reset(); arrows(); n.innerHTML = fmt("A flow graph with entry node 1. Tap any node to see its dominators."); },
    () => { show("5"); },
    () => { net.reset(); arrows((a, b) => a === 5 && b === 2 ? "bad" : ""); net.node("2", "on"); net.node("5", "on"); n.innerHTML = fmt("5 → 2 is a ==back edge== because its head, 2, ==dominates== its tail, 5."); },
    () => { net.reset(); arrows((a, b) => a === 5 && b === 2 ? "bad" : ""); ["2", "3", "4", "5"].forEach(k => net.node(k, k === "2" ? "now" : "on")); n.innerHTML = fmt("Natural loop of 5 → 2: the header ==2== plus every node that can reach 5 without passing through 2: ==3, 4, 5==. Loop = {2, 3, 4, 5}."); }];
  stepper(host, S.length, i => S[i]());
  host.appendChild(n);
}};
