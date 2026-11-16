/* Ad hoc and Sensor Networks visual explainers */

VIZ["ah-taxonomy"] = { t: "Map of MANET routing protocols", cap: "Tap any protocol for its one-line identity.", build(host) {
  const D = {
    DSDV: "Proactive. Bellman-Ford tables plus destination sequence numbers to stop loops. Full and incremental dumps.",
    WRP: "Proactive. Four tables (distance, routing, link-cost, MRL); tracks the predecessor to avoid count-to-infinity.",
    DSR: "Reactive. Source routing: the full path rides in the packet header. Route cache, no hello messages.",
    AODV: "Reactive. Hop-by-hop next-hop tables; RREQ / RREP / RERR; destination sequence numbers; hello messages.",
    TORA: "Reactive. Link reversal on a destination-rooted DAG using heights; QRY / UPD / CLR.",
    ZRP: "Hybrid. Proactive IARP inside a zone of radius ρ, reactive IERP outside, bordercasting to peripheral nodes.",
    DREAM: "Location service and forwarding. Floods position updates, more often nearby (distance effect) and when moving fast; forwards inside a cone towards the destination.",
    Quorum: "Location service. Updates go to a write quorum, queries to a read quorum; the quorums always overlap.",
    GLS: "Location service. Hierarchical grid; location servers are the nodes with the closest greater ID in each sibling square.",
    Greedy: "Forwarding. Pass to the neighbour closest to the destination (MFR, NFP, compass). Can get stuck at a void.",
    LAR: "Restricted flooding. Only nodes inside the request zone around the expected zone forward the RREQ.",
    CEDAR: "QoS routing. Core extraction, link-state propagation with increase/decrease waves, QoS route computation on the core."
  };
  const tree = [
    ["Topology-based", [["Proactive (table-driven)", ["DSDV", "WRP"]], ["Reactive (on-demand)", ["DSR", "AODV", "TORA"]], ["Hybrid", ["ZRP"]]]],
    ["Position-based", [["Location services", ["DREAM", "Quorum", "GLS"]], ["Forwarding strategies", ["Greedy", "LAR"]]]],
    ["Other", [["QoS routing", ["CEDAR"]]]]];
  const t = hx("div", "vz-tax", `<div class="vz-tax-root">MANET routing</div>` + tree.map(([a, kids]) => `<div class="vz-tax-branch"><div class="vz-tax-l1">${a}</div>${kids.map(([b, leaves]) => `<div class="vz-tax-l2"><span>${b}</span><div>${leaves.map(l => `<button type="button" data-p="${l}">${l}</button>`).join("")}</div></div>`).join("")}</div>`).join(""), host);
  const n = note(host); n.innerHTML = fmt("Mnemonic: proactive ==DW== (DSDV, WRP), reactive ==DAT== (DSR, AODV, TORA), hybrid ==Z== (ZRP).");
  t.querySelectorAll("button").forEach(b => b.onclick = () => { t.querySelectorAll("button").forEach(x => x.classList.remove("on")); b.classList.add("on"); n.innerHTML = `<b>${b.dataset.p}</b>: ${D[b.dataset.p]}`; });
}};

VIZ["ah-aodv"] = { t: "Route discovery: AODV vs DSR on the same network", cap: "Same flood, different memory. Switch modes to compare what each node stores.", build(host) {
  const nodes = { S: { x: 6, y: 50 }, A: { x: 30, y: 22 }, B: { x: 30, y: 80 }, C: { x: 56, y: 26 }, E: { x: 56, y: 78 }, F: { x: 76, y: 60 }, D: { x: 94, y: 30 } };
  const edges = [["S", "A"], ["S", "B"], ["A", "B"], ["A", "C"], ["B", "E"], ["C", "E"], ["C", "D"], ["C", "F"], ["E", "F"], ["F", "D"]];
  let mode = 0;
  const segHost = hx("div", null, null, host);
  const net = netViz(host, { nodes, edges, ratio: 0.55, label: "network" });
  const n = note(host);
  const S = [
    { a: [["S", "A", "", "RREQ"], ["S", "B", "", "RREQ"]], on: ["S"], txt: ["S has no route to D, so it ==broadcasts an RREQ==. A and B each store a ==reverse route to S== (next hop S).", "S broadcasts an RREQ carrying a ==route record [S]==. A and B add themselves: [S, A] and [S, B]."] },
    { a: [["A", "C", "", "RREQ"], ["B", "E", "", "RREQ"], ["A", "B", "bad", "dup"]], on: ["S", "A", "B"], txt: ["A forwards to C; B forwards to E. When B hears A's copy it ==drops the duplicate== (same source and broadcast ID). C stores reverse route via A; E via B.", "A forwards [S, A] to C; B forwards [S, B] to E. Duplicates are dropped. The record grows hop by hop: C now holds [S, A, C]."] },
    { a: [["C", "D", "", "RREQ"], ["C", "F", "", "RREQ"], ["E", "F", "bad", "dup"]], on: ["S", "A", "B", "C", "E"], txt: ["C's copy reaches D (and F). D stores a reverse route via C. F drops E's later copy.", "D receives [S, A, C, D]: the ==complete path== is in the packet."] },
    { a: [["D", "C", "good", "RREP"], ["C", "A", "good", "RREP"], ["A", "S", "good", "RREP"]], on: ["S", "A", "C", "D"], txt: ["D sends an ==RREP back along the reverse path== D → C → A → S. Each node on the way now stores a ==forward route to D== (next hop only) with D's ==sequence number==.", "D sends an RREP containing the ==whole route [S, A, C, D]== back to S. S caches it."] },
    { a: [["S", "A", "good", "data"], ["A", "C", "good", "data"], ["C", "D", "good", "data"]], on: ["S", "A", "C", "D"], txt: ["Data flows ==hop by hop==: each node looks up only its next hop for D. The packet header carries just the destination.", "Data packets carry the ==full source route [S, A, C, D] in the header==; intermediate nodes simply read the next hop from it."] },
    { a: [["C", "A", "bad", "RERR"], ["A", "S", "bad", "RERR"]], on: ["S", "A", "C"], cut: true, txt: ["The link C–D breaks. C sends an ==RERR== upstream; routes through C to D are invalidated, and S starts a new discovery (or a node repairs locally).", "The link C–D breaks. An ==RERR== reaches S, which removes every cached route using C–D and tries another cached route or rediscovers."] }];
  function render(i) {
    const s = S[i];
    net.reset();
    s.on.forEach(k => net.node(k, "on")); net.node("S", "src"); net.node("D", "dst");
    if (s.cut) net.edge("C", "D", "cut");
    s.a.forEach(([x, y, c, l]) => net.arrow(x, y, c, l));
    n.innerHTML = `<span class="vz-ph">${mode ? "DSR" : "AODV"}</span>` + fmt(s.txt[mode]);
  }
  const st = stepper(host, S.length, render);
  host.appendChild(n);
  seg(segHost, ["AODV (next hop)", "DSR (source route)"], k => { mode = k; render(st.get()); }, 0);
}};

VIZ["ah-zrp"] = { t: "ZRP: zone radius ρ and peripheral nodes", cap: "Drag the radius. Green nodes are in the zone (IARP keeps routes to them); amber nodes sit on the border and receive bordercasts.", build(host) {
  const nodes = { X: { x: 48, y: 50 }, a: { x: 30, y: 36 }, b: { x: 64, y: 32 }, c: { x: 62, y: 70 }, d: { x: 34, y: 68 }, e: { x: 14, y: 22 }, f: { x: 46, y: 12 }, g: { x: 84, y: 18 }, h: { x: 86, y: 58 }, i: { x: 74, y: 92 }, j: { x: 20, y: 90 }, k: { x: 4, y: 52 }, l: { x: 98, y: 86 }, m: { x: 98, y: 32 } };
  const edges = [["X", "a"], ["X", "b"], ["X", "c"], ["X", "d"], ["a", "e"], ["a", "f"], ["b", "f"], ["b", "g"], ["c", "h"], ["c", "i"], ["d", "j"], ["d", "k"], ["g", "m"], ["h", "l"], ["h", "m"], ["e", "k"]];
  const adj = {}; for (const k in nodes) adj[k] = []; edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
  const dist = { X: 0 }, q = ["X"]; while (q.length) { const u = q.shift(); adj[u].forEach(v => { if (dist[v] == null) { dist[v] = dist[u] + 1; q.push(v); } }); }
  const f = hx("div", "vz-form", `<label>Zone radius ρ = <b>2</b><input type="range" min="1" max="3" value="2"></label>`, host);
  const r = f.querySelector("input"), lab = f.querySelector("b");
  const net = netViz(host, { nodes, edges, ratio: 0.62, r: 13, label: "zone" });
  const n = note(host);
  function draw() {
    const rho = +r.value; lab.textContent = rho;
    net.reset();
    let z = 0, p = 0;
    for (const k in nodes) { const d = dist[k]; if (k === "X") net.node(k, "src"); else if (d < rho) { net.node(k, "zone"); z++; } else if (d === rho) { net.node(k, "periph"); p++; } }
    edges.forEach(([a, b]) => { if (dist[a] <= rho && dist[b] <= rho) net.edge(a, b, "on"); });
    n.innerHTML = fmt(`With ρ = ${rho}: X knows routes to all ==${z + p} nodes within ${rho} hop${rho > 1 ? "s" : ""}== proactively (IARP). The ==${p} peripheral node${p === 1 ? "" : "s"}== (exactly ${rho} hops) are where IERP queries are bordercast for anything farther. A bigger ρ means more proactive overhead but fewer route searches.`);
  }
  r.oninput = draw; draw();
}};

VIZ["ah-mpr"] = { t: "Flooding vs multipoint relays", cap: "Six 1-hop neighbours, six 2-hop neighbours. How many retransmissions are really needed?", build(host) {
  const nodes = { N: { x: 50, y: 50, l: "N" } }, edges = [];
  const one = [], two = [];
  for (let k = 0; k < 6; k++) {
    const a1 = k * 60 * Math.PI / 180, a2 = (k * 60 + 30) * Math.PI / 180;
    const id1 = "n" + k, id2 = "m" + k; one.push(id1); two.push(id2);
    nodes[id1] = { x: 50 + 22 * Math.cos(a1), y: 50 + 38 * Math.sin(a1), l: String(k + 1) };
    nodes[id2] = { x: 50 + 44 * Math.cos(a2), y: 50 + 46 * Math.sin(a2), l: String.fromCharCode(97 + k) };
    edges.push(["N", id1]);
  }
  for (let k = 0; k < 6; k++) { edges.push(["n" + k, "m" + k]); edges.push(["n" + ((k + 1) % 6), "m" + k]); }
  /* greedy MPR selection */
  const cover = {}; one.forEach(o => cover[o] = new Set(edges.filter(e => e[0] === o && e[1][0] === "m").map(e => e[1]).concat(edges.filter(e => e[1] === o && e[0][0] === "m").map(e => e[0]))));
  const need = new Set(two), mpr = [];
  while (need.size) { let best = null, bc = -1; one.forEach(o => { if (mpr.includes(o)) return; const c = [...cover[o]].filter(x => need.has(x)).length; if (c > bc) { bc = c; best = o; } }); mpr.push(best); cover[best].forEach(x => need.delete(x)); }
  const segHost = hx("div", null, null, host);
  const net = netViz(host, { nodes, edges, ratio: 0.8, r: 13, label: "MPR" });
  const n = note(host);
  function draw(k) {
    net.reset(); net.node("N", "src");
    two.forEach(t => net.node(t, "zone"));
    const relays = k === 0 ? one : mpr;
    relays.forEach(o => { net.node(o, "relay"); net.arrow("N", o, "", ""); cover[o].forEach(t => net.edge(o, t, "on")); });
    if (k === 1) one.filter(o => !mpr.includes(o)).forEach(o => net.node(o, "dim"));
    n.innerHTML = k === 0 ? fmt(`==Simple flooding==: all ==6== neighbours rebroadcast. Every 2-hop node hears the packet twice: redundancy, contention and collisions (the broadcast storm).`)
      : fmt(`==Multipoint relays==: N picks the fewest 1-hop neighbours that cover every 2-hop neighbour. Here ==${mpr.length} relays== (${mpr.map(m => nodes[m].l).join(", ")}) reach all 6. Only they rebroadcast. This is how OLSR floods efficiently.`);
  }
  seg(segHost, ["Simple flooding", "MPR"], draw, 0); draw(0);
}};

VIZ["ah-multicast"] = { t: "Tree vs mesh multicast when a link breaks", cap: "Break the link and see which receivers still get the data.", build(host) {
  const nodes = { S: { x: 6, y: 50, l: "S" }, a: { x: 32, y: 30 }, b: { x: 32, y: 74 }, c: { x: 60, y: 30 }, d: { x: 60, y: 74 }, R1: { x: 92, y: 12 }, R2: { x: 94, y: 52 }, R3: { x: 90, y: 90 } };
  const tree = [["S", "a"], ["a", "c"], ["c", "R1"], ["c", "R2"], ["a", "d"], ["d", "R3"]];
  const meshExtra = [["S", "b"], ["b", "d"], ["d", "R2"], ["b", "c"]];
  const all = tree.concat(meshExtra);
  let kind = 0, broken = false;
  const segHost = hx("div", "vz-row", null, host);
  const net = netViz(host, { nodes, edges: all, ratio: 0.55, label: "multicast" });
  const n = note(host);
  const btn = hx("button", "vz-btn", "Break link a–c", host); btn.type = "button";
  function draw() {
    net.reset();
    const E = (kind ? all : tree).filter(([a, b]) => !(broken && ((a === "a" && b === "c") || (a === "c" && b === "a"))));
    const adj = {}; for (const k in nodes) adj[k] = []; E.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
    const seen = new Set(["S"]), q = ["S"]; while (q.length) { const u = q.shift(); adj[u].forEach(v => { if (!seen.has(v)) { seen.add(v); q.push(v); } }); }
    E.forEach(([a, b]) => net.edge(a, b, "on"));
    if (broken) net.edge("a", "c", "cut");
    net.node("S", "src");
    ["R1", "R2", "R3"].forEach(r => net.node(r, seen.has(r) ? "dst" : "lost"));
    const got = ["R1", "R2", "R3"].filter(r => seen.has(r));
    n.innerHTML = fmt((kind ? "==Mesh (ODMRP-style forwarding group)==: several paths to each receiver. " : "==Tree (MAODV-style)==: exactly one path to each receiver. ") + (broken ? `After the break, ==${got.length} of 3== receivers still get data${got.length < 3 ? "; the tree must be repaired first" : ", thanks to the extra paths"}.` : "Tap the button to break link a–c."));
    btn.textContent = broken ? "Restore link" : "Break link a–c";
  }
  seg(segHost, ["Tree", "Mesh"], k => { kind = k; draw(); }, 0);
  btn.onclick = () => { broken = !broken; draw(); };
  draw();
}};

VIZ["ah-lar"] = { t: "LAR: expected zone and request zone", cap: "The longer since D's last known position, the bigger the circle, and the more nodes join the flood.", build(host) {
  const f = hx("div", "vz-form", `<label>Time since D was last seen (radius v·(t₁ − t₀)) <b></b><input type="range" min="6" max="30" value="14"></label>`, host);
  const r = f.querySelector("input"), lab = f.querySelector("b");
  const W = vw(host), H = Math.round(W * 0.6), svg = svgRoot(hx("div", "vz-canvas", null, host), W, H, "LAR zones");
  const P = (x, y) => [12 + (W - 24) * x / 100, 12 + (H - 24) * y / 100];
  const pts = [[14, 18], [26, 40], [40, 22], [38, 64], [52, 44], [58, 16], [66, 58], [76, 30], [86, 46], [24, 80], [48, 86], [72, 80], [90, 14], [92, 76], [12, 58], [60, 34], [30, 12], [80, 64]];
  const S = [10, 88], D = [74, 26];
  const g = sv("g", null, svg);
  const n = note(host);
  function draw() {
    const R = +r.value; lab.textContent = R;
    g.innerHTML = "";
    const x0 = Math.min(S[0], D[0] - R), x1 = Math.max(S[0], D[0] + R), y0 = Math.min(S[1], D[1] - R), y1 = Math.max(S[1], D[1] + R);
    const [ax, ay] = P(x0, y0), [bx, by] = P(x1, y1);
    sv("rect", { x: ax, y: ay, width: bx - ax, height: by - ay, class: "vx-zone-req" }, g);
    const [cx, cy] = P(...D), rx = (W - 24) * R / 100, ry = (H - 24) * R / 100;
    sv("ellipse", { cx, cy, rx, ry, class: "vx-zone-exp" }, g);
    let inside = 0;
    pts.forEach(p => { const ok = p[0] >= x0 && p[0] <= x1 && p[1] >= y0 && p[1] <= y1; if (ok) inside++; const [x, y] = P(...p); sv("circle", { cx: x, cy: y, r: 7, class: "vx-dot" + (ok ? " in" : "") }, g); });
    const [sx, sy] = P(...S); sv("circle", { cx: sx, cy: sy, r: 11, class: "vx-dot src" }, g); tx(g, sx, sy + 4, "S", "vx-t vx-nl");
    sv("circle", { cx, cy, r: 11, class: "vx-dot dst" }, g); tx(g, cx, cy + 4, "D", "vx-t vx-nl");
    tx(g, cx, cy - ry - 6, "expected zone", "vx-t vx-s"); tx(g, ax + 6, ay + 14, "request zone (scheme 1)", "vx-t vx-s", "start");
    n.innerHTML = fmt(`D was at the centre and moves at most v, so it is now inside the ==expected zone== of radius v·(t₁ − t₀). The ==request zone== is the smallest rectangle holding S and that circle. Only the ==${inside} of ${pts.length}== nodes inside it forward the RREQ; the rest drop it. Scheme 2 instead forwards only if a node is closer to D than the node it heard from.`);
  }
  r.oninput = draw; draw();
}};

VIZ["ah-node"] = { t: "Inside a sensor node", cap: "Tap a block. The radio is the hungriest part.", build(host) {
  const B = [
    ["Sensing unit", "Sensor + ADC", "Turns a physical quantity (temperature, light, vibration) into an analogue signal, then the ADC converts it to digital.", 8, 18],
    ["Processing unit", "Microcontroller + memory", "Runs the protocols and local processing (filtering, aggregation). Small memory, low clock speed.", 38, 18],
    ["Transceiver", "Radio", "Sends and receives over the wireless link. ==The largest energy consumer==: even idle listening drains the battery.", 68, 18],
    ["Power unit", "Battery", "Feeds every block; often never replaced. This is why energy efficiency drives every WSN design decision.", 38, 62],
    ["Location finder", "Optional", "GPS or localisation algorithms when position matters.", 8, 62],
    ["Mobiliser / power generator", "Optional", "Moves the node, or harvests energy (for example solar).", 68, 62]];
  const W = vw(host), H = Math.round(W * 0.55), svg = svgRoot(hx("div", "vz-canvas", null, host), W, H, "sensor node");
  const n = note(host); n.innerHTML = fmt("Four core units: ==sense, process, transmit, power==. Tap any block.");
  const bw = (W - 24) * 0.26, bh = H * 0.24;
  const P = (x, y) => [12 + (W - 24) * x / 100, 12 + (H - 24) * y / 100];
  const gs = B.map((b, k) => {
    const [x, y] = P(b[3], b[4]); const g = sv("g", { class: "vx-blk" + (k > 3 ? " opt" : "") }, svg);
    sv("rect", { x, y, width: bw, height: bh, rx: 10 }, g);
    tx(g, x + bw / 2, y + bh / 2 - 3, b[0], "vx-t vx-b vx-s"); tx(g, x + bw / 2, y + bh / 2 + 13, b[1], "vx-t vx-s vx-mt");
    g.style.cursor = "pointer"; g.addEventListener("click", () => { gs.forEach(x => x.classList.remove("now")); g.classList.add("now"); n.innerHTML = `<b>${b[0]}</b>: ` + fmt(b[2]); });
    return g;
  });
  const [x1, y1] = P(8, 18), [x2] = P(38, 18), [x3] = P(68, 18), [, py] = P(38, 62), [px] = P(38, 62);
  sv("line", { x1: x1 + bw, y1: y1 + bh / 2, x2: x2 - 2, y2: y1 + bh / 2, class: "vx-flow", "marker-end": mk(svg, "ah") }, svg);
  sv("line", { x1: x2 + bw, y1: y1 + bh / 2, x2: x3 - 2, y2: y1 + bh / 2, class: "vx-flow", "marker-end": mk(svg, "ah") }, svg);
  sv("line", { x1: px + bw / 2, y1: py, x2: px + bw / 2, y2: y1 + bh + 2, class: "vx-flow vx-power", "marker-end": mk(svg, "ah") }, svg);
}};

VIZ["ah-smac"] = { t: "Duty cycling: always on vs S-MAC vs T-MAC", cap: "Same three frames, light traffic. Filled = radio on.", build(host) {
  const W = vw(host), rows = [["Always on", "on"], ["S-MAC", "smac"], ["T-MAC", "tmac"]], H = 40 + rows.length * 54;
  const svg = svgRoot(hx("div", "vz-canvas", null, host), W, H, "duty cycles");
  const x0 = 92, fw = (W - x0 - 10) / 3;
  rows.forEach(([name, k], r) => {
    const y = 26 + r * 54;
    tx(svg, 6, y + 22, name, "vx-t vx-b vx-s", "start");
    for (let f = 0; f < 3; f++) {
      const fx = x0 + f * fw;
      sv("rect", { x: fx, y, width: fw - 4, height: 32, rx: 6, class: "vx-sleep" }, svg);
      let on = fw - 4;
      if (k === "smac") on = (fw - 4) * 0.4;
      if (k === "tmac") on = (fw - 4) * (f === 1 ? 0.3 : 0.13);
      sv("rect", { x: fx, y, width: on, height: 32, rx: 6, class: "vx-awake" }, svg);
      if (k !== "on") { tx(svg, fx + on / 2, y + 21, f === 1 && k !== "on" ? "data" : "listen", "vx-t vx-s vx-on"); if (on < fw - 30) tx(svg, fx + on + (fw - 4 - on) / 2, y + 21, "sleep", "vx-t vx-s vx-mt"); }
      else tx(svg, fx + on / 2, y + 21, "idle listening", "vx-t vx-s vx-on");
    }
  });
  tx(svg, x0 + 1.5 * fw, 16, "frame 1 · frame 2 (has data) · frame 3", "vx-t vx-s vx-mt");
  note(host).innerHTML = fmt("==Always on==: the radio wastes energy on idle listening. ==S-MAC==: a fixed listen period (SYNC, then RTS/CTS and data) followed by sleep, with neighbours sharing schedules. ==T-MAC==: the listen period ==ends early== once nothing is heard for a timeout TA, so light traffic costs even less. Widths are illustrative, not measured.");
}};
