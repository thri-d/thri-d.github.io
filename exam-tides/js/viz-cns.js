/* CNS visual explainers */

/* ---------- Playfair ---------- */
function playfairMatrix(key) {
  const seen = new Set(), out = [];
  (key.toUpperCase().replace(/J/g, "I") + "ABCDEFGHIKLMNOPQRSTUVWXYZ").replace(/[^A-Z]/g, "").split("").forEach(c => { if (!seen.has(c)) { seen.add(c); out.push(c); } });
  return out;
}
function playfairPairs(text) {
  const t = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  const pairs = []; let i = 0;
  while (i < t.length) {
    const a = t[i], b = t[i + 1];
    if (!b) { pairs.push([a, a === "X" ? "Q" : "X"]); i += 1; }
    else if (a === b) { pairs.push([a, a === "X" ? "Q" : "X"]); i += 1; }
    else { pairs.push([a, b]); i += 2; }
  }
  return pairs;
}
function playfairEnc(M, a, b) {
  const pa = M.indexOf(a), pb = M.indexOf(b), ra = pa / 5 | 0, ca = pa % 5, rb = pb / 5 | 0, cb = pb % 5;
  if (ra === rb) return { o: [M[ra * 5 + (ca + 1) % 5], M[rb * 5 + (cb + 1) % 5]], rule: "Same row: take the letter to the right of each (wrapping around)." };
  if (ca === cb) return { o: [M[((ra + 1) % 5) * 5 + ca], M[((rb + 1) % 5) * 5 + cb]], rule: "Same column: take the letter below each (wrapping around)." };
  return { o: [M[ra * 5 + cb], M[rb * 5 + ca]], rule: "Rectangle: each letter stays in its own row and moves to the other letter's column." };
}
VIZ["cns-playfair"] = { t: "Playfair cipher, pair by pair", cap: "Type any key and message. Step through each pair and watch which rule applies.", build(host) {
  const f = hx("div", "vz-form", `<label>Key<input value="MONARCHY" maxlength="25" spellcheck="false"></label><label>Plaintext<input value="balloon instruments" spellcheck="false"></label>`, host);
  const [ki, pi] = f.querySelectorAll("input");
  const body = hx("div", null, null, host);
  function run() {
    body.innerHTML = "";
    const M = playfairMatrix(ki.value || "KEY"), P = playfairPairs(pi.value || "HELLO");
    if (!P.length) return;
    const lay = hx("div", "vz-two", null, body);
    const grid = hx("div", "vz-grid5", M.map(c => `<span>${c === "I" ? "I/J" : c}</span>`).join(""), lay);
    const pairsBox = hx("div", "vz-pairs", null, lay);
    const results = P.map(([a, b]) => playfairEnc(M, a, b));
    const chips = P.map(([a, b], k) => hx("span", "vz-chip", `${a}${b}<small>${results[k].o.join("")}</small>`, pairsBox));
    hx("p", "vz-out", `<span>Ciphertext</span> ${results.map(r => `<code>${r.o.join("")}</code>`).join(" ")}`, pairsBox);
    const n = note(body);
    const cells = grid.querySelectorAll("span");
    stepper(body, P.length, i => {
      chips.forEach((c, k) => c.className = "vz-chip" + (k === i ? " now" : k < i ? " past" : ""));
      cells.forEach(c => c.className = "");
      const [a, b] = P[i], r = results[i];
      cells[M.indexOf(a)].className = "pa"; cells[M.indexOf(b)].className = "pb";
      cells[M.indexOf(r.o[0])].classList.add("oa"); cells[M.indexOf(r.o[1])].classList.add("ob");
      n.innerHTML = `<b>${a}${b} → ${r.o.join("")}</b>. ${r.rule}` + (P[i][1] === "X" && (pi.value.toUpperCase().replace(/[^A-Z]/g, "")).length ? ` <span class="vz-dim">An X is inserted when a pair would repeat a letter, or to pad an odd length.</span>` : "");
    });
  }
  ki.oninput = pi.oninput = run; run();
}};

/* ---------- DES round vs AES round ---------- */
VIZ["cns-rounds"] = { t: "One DES round vs one AES round", cap: "Feistel changes half the block and swaps; AES changes the whole 4×4 State with four steps.", build(host) {
  const box = hx("div", null, null, host);
  seg(host.insertBefore(hx("div"), box), ["DES round (Feistel)", "AES round"], k => draw(k), 0);
  function draw(k) {
    box.innerHTML = "";
    if (k === 0) des(box); else aes(box);
  }
  function des(h) {
    const W = vw(h), H = 330, svg = svgRoot(hx("div", "vz-canvas", null, h), W, H, "DES round");
    const bw = Math.min(W * 0.42, 190), L = Math.max(W * 0.25, bw / 2 + 8), R = Math.min(W * 0.70, W - bw / 2 - 8);
    const steps = [];
    const g = n => { const x = sv("g", { class: "vx-step" }, svg); steps.push(x); return x; };
    let s = g();
    sv("rect", { x: L - bw / 2, y: 14, width: bw, height: 34, rx: 8, class: "vx-box" }, s); tx(s, L, 36, "Lᵢ₋₁ (32 bits)", "vx-t vx-b");
    sv("rect", { x: R - bw / 2, y: 14, width: bw, height: 34, rx: 8, class: "vx-box" }, s); tx(s, R, 36, "Rᵢ₋₁ (32 bits)", "vx-t vx-b");
    s = g();
    sv("line", { x1: R, y1: 48, x2: R, y2: 120, class: "vx-flow" }, s);
    sv("rect", { x: R - 46, y: 120, width: 92, height: 40, rx: 10, class: "vx-box on" }, s); tx(s, R, 145, "F", "vx-t vx-b vx-big");
    sv("line", { x1: W - 6, y1: 140, x2: R + 50, y2: 140, class: "vx-flow", "marker-end": mk(svg, "ah") }, s); tx(s, W - 8, 112, "Kᵢ (48 bits)", "vx-t vx-s", "end");
    s = g();
    sv("line", { x1: L, y1: 48, x2: L, y2: 128, class: "vx-flow" }, s);
    sv("circle", { cx: L, cy: 140, r: 12, class: "vx-xor" }, s); tx(s, L, 145, "⊕", "vx-t vx-b");
    sv("line", { x1: R - 46, y1: 140, x2: L + 14, y2: 140, class: "vx-flow", "marker-end": mk(svg, "ah") }, s);
    s = g();
    sv("line", { x1: L, y1: 152, x2: R, y2: 250, class: "vx-flow", "marker-end": mk(svg, "ah") }, s);
    sv("line", { x1: R, y1: 60, x2: L, y2: 250, class: "vx-flow", "marker-end": mk(svg, "ah") }, s);
    tx(s, (L + R) / 2, 232, "swap", "vx-t vx-s vx-mt");
    s = g();
    sv("rect", { x: L - bw / 2, y: 256, width: bw, height: 34, rx: 8, class: "vx-box" }, s); tx(s, L, 278, "Lᵢ = Rᵢ₋₁", "vx-t vx-b");
    sv("rect", { x: R - bw / 2, y: 256, width: bw, height: 34, rx: 8, class: "vx-box" }, s); tx(s, R, 278, "Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ)", "vx-t vx-b vx-s");
    tx(s, W / 2, 312, "Repeat 16 times.", "vx-t vx-s vx-mt"); tx(s, W / 2, 327, "Decrypt: same steps, subkeys reversed.", "vx-t vx-s vx-mt");
    const notes = [
      "The 64-bit block is split into two 32-bit halves.",
      "Inside F: ==expand R from 32 to 48 bits== (E-box) → ==XOR with the 48-bit subkey Kᵢ== → ==8 S-boxes, 6 bits in, 4 out== (48 → 32) → ==P-box== permutation.",
      "F's output is XORed into the ==left== half. The right half itself is not changed in this round.",
      "The halves swap: the old R becomes the new L.",
      "Result: Lᵢ = Rᵢ₋₁ and Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ). Because only XOR touches the data, running the same structure with reversed keys decrypts, even though F cannot be inverted."];
    const n = note(h);
    stepper(h, steps.length, i => { steps.forEach((x, k) => x.setAttribute("class", "vx-step " + (k < i ? "past" : k === i ? "now" : "later"))); n.innerHTML = fmt(notes[i]); });
  }
  function aes(h) {
    const cellsBase = "abcdefghijklmnop".split("");
    const st = [0, 1, 2, 3].map(r => [0, 1, 2, 3].map(c => cellsBase[c * 4 + r])); /* column-major like AES */
    const n0 = st.map(r => r.slice());
    const stepsData = [
      { name: "Input State", d: "The 16 bytes are arranged column by column into a 4×4 matrix, the ==State==. Every step below works on the whole State.", m: n0, hl: () => "" },
      { name: "SubBytes", d: "==Each byte is replaced== using the fixed S-box. This is the only non-linear step and gives ==confusion==.", m: n0.map(r => r.map(x => x.toUpperCase())), hl: () => "sub" },
      { name: "ShiftRows", d: "Row 0 stays, row 1 shifts left by 1, row 2 by 2, row 3 by 3. Bytes from one column ==spread into four columns==: diffusion across columns.", m: n0.map((r, i) => r.map((x, c) => r[(c + i) % 4].toUpperCase())), hl: (r) => "row" + r },
      { name: "MixColumns", d: "==Each column== is multiplied by a fixed matrix in GF(2⁸), so every output byte depends on all four bytes of its column: diffusion within columns. ==Skipped in the last round.==", m: null, hl: () => "mix" },
      { name: "AddRoundKey", d: "The State is ==XORed with the round key==. This is the only step that uses the key. Rounds: 10 for a 128-bit key, 12 for 192, 14 for 256.", m: null, hl: () => "key" }];
    stepsData[3].m = stepsData[2].m; stepsData[4].m = stepsData[2].m;
    const wrap = hx("div", "vz-aes", null, h);
    const label = hx("div", "vz-aes-name", "", wrap);
    const grid = hx("div", "vz-grid4", "", wrap);
    const keyg = hx("div", "vz-grid4 vz-key", [...Array(16)].map((_, i) => `<span>k${i.toString(16)}</span>`).join(""), wrap);
    const n = note(h);
    stepper(h, stepsData.length, i => {
      const s = stepsData[i];
      label.textContent = s.name;
      grid.innerHTML = s.m.map((row, r) => row.map((x, c) => `<span class="${s.hl(r)} c${c}">${x}${i >= 3 ? (i === 3 ? "′" : "″") : ""}</span>`).join("")).join("");
      grid.className = "vz-grid4 st" + i;
      keyg.style.display = i === 4 ? "" : "none";
      n.innerHTML = fmt(s.d);
    });
  }
  draw(0);
}};

/* ---------- RSA lab ---------- */
function isPrime(n) { if (n < 2n) return false; for (let i = 2n; i * i <= n; i++) if (n % i === 0n) return false; return true; }
function gcd(a, b) { while (b) { [a, b] = [b, a % b]; } return a; }
function modpow(b, e, m) { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; }
VIZ["cns-rsa"] = { t: "RSA lab: generate keys, encrypt, decrypt", cap: "Change p, q, e and M. Every number is worked out step by step, including extended Euclid for d.", build(host) {
  const f = hx("div", "vz-form vz-form4", `<label>p<input value="17" inputmode="numeric"></label><label>q<input value="11" inputmode="numeric"></label><label>e<input value="7" inputmode="numeric"></label><label>Message M<input value="88" inputmode="numeric"></label>`, host);
  const ins = f.querySelectorAll("input");
  const out = hx("div", "vz-rsa", null, host);
  function run() {
    let p, q, e, M;
    try { [p, q, e, M] = [...ins].map(i => BigInt(i.value.trim() || "0")); } catch (x) { out.innerHTML = `<p class="vz-err">Use whole numbers only.</p>`; return; }
    const errs = [];
    if (p > 5000n || q > 5000n) errs.push("Keep p and q below 5000 for this lab.");
    if (!isPrime(p) || !isPrime(q)) errs.push("p and q must both be prime.");
    if (p === q) errs.push("p and q must be different.");
    const n = p * q, phi = (p - 1n) * (q - 1n);
    if (!errs.length && gcd(e, phi) !== 1n) errs.push(`gcd(e, φ) must be 1, but gcd(${e}, ${phi}) = ${gcd(e, phi)}. Try another e.`);
    if (!errs.length && (M < 0n || M >= n)) errs.push(`M must be between 0 and n − 1 = ${n - 1n}.`);
    if (errs.length) { out.innerHTML = errs.map(x => `<p class="vz-err">${x}</p>`).join(""); return; }
    /* extended Euclid on (phi, e) */
    const rows = []; let r0 = phi, r1 = e, t0 = 0n, t1 = 1n;
    rows.push([r0, "", t0]); rows.push([r1, "", t1]);
    while (r1 !== 0n) { const qq = r0 / r1; [r0, r1] = [r1, r0 - qq * r1]; [t0, t1] = [t1, t0 - qq * t1]; rows.push([r1, qq, t1]); }
    let d = t0 % phi; if (d < 0n) d += phi;
    const C = modpow(M, e, n), back = modpow(C, d, n);
    /* square and multiply trace for C */
    const bits = e.toString(2); let acc = 1n; const trace = [];
    for (const b of bits) { acc = acc * acc % n; let line = `square → ${acc}`; if (b === "1") { acc = acc * M % n; line += `, × M → ${acc}`; } trace.push(`bit ${b}: ${line}`); }
    out.innerHTML = `
      <ol class="vz-steps">
        <li><b>n = p × q</b> = ${p} × ${q} = <mark>${n}</mark></li>
        <li><b>φ(n) = (p − 1)(q − 1)</b> = ${p - 1n} × ${q - 1n} = <mark>${phi}</mark></li>
        <li><b>Check e</b>: gcd(${e}, ${phi}) = 1, so e is valid.</li>
        <li><b>d = e⁻¹ mod φ</b> by extended Euclid:
          <table class="vz-tbl"><tr><th>remainder</th><th>quotient</th><th>t</th></tr>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>
          When the remainder reaches 1, its t value gives d (made positive mod φ): <mark>d = ${d}</mark>. Check: ${e} × ${d} = ${e * d} = ${(e * d) / phi} × ${phi} + 1.</li>
        <li><b>Keys</b>: public {e, n} = {${e}, ${n}}; private {d, n} = {${d}, ${n}}.</li>
        <li><b>Encrypt</b> C = M<sup>e</sup> mod n = ${M}<sup>${e}</sup> mod ${n} = <mark>${C}</mark>
          <details><summary>Show square-and-multiply (e = ${bits} in binary)</summary><ul>${trace.map(t => `<li>${t}</li>`).join("")}</ul></details></li>
        <li><b>Decrypt</b> M = C<sup>d</sup> mod n = ${C}<sup>${d}</sup> mod ${n} = <mark>${back}</mark> ${back === M ? "(matches the original message)" : ""}</li>
      </ol>`;
  }
  ins.forEach(i => i.oninput = run); run();
}};

/* ---------- Diffie–Hellman with optional man-in-the-middle ---------- */
VIZ["cns-dh"] = { t: "Diffie–Hellman, and how a man-in-the-middle breaks it", cap: "Same numbers as the exam example. Switch on the attacker to see two different keys appear.", build(host) {
  const f = hx("div", "vz-form vz-form4", `<label>q (prime)<input value="23"></label><label>α<input value="5"></label><label><span>Alice's secret X<sub>A</sub></span><input value="6"></label><label><span>Bob's secret X<sub>B</sub></span><input value="15"></label>`, host);
  const ins = f.querySelectorAll("input");
  const segHost = hx("div", null, null, host);
  const body = hx("div", null, null, host);
  let mitm = 0;
  seg(segHost, ["Normal exchange", "With a man-in-the-middle"], k => { mitm = k; run(); }, 0);
  function run() {
    body.innerHTML = "";
    let q, a, xa, xb;
    try { [q, a, xa, xb] = [...ins].map(i => BigInt(i.value.trim())); } catch (e) { return; }
    if (q < 3n || !isPrime(q) || q > 100000n) { body.innerHTML = `<p class="vz-err">q must be a prime below 100000.</p>`; return; }
    const ya = modpow(a, xa, q), yb = modpow(a, xb, q), k = modpow(yb, xa, q);
    const paint = `<p class="vz-dim">Picture it as paint: both start with the same public colour α, each adds a secret colour, they swap the mixtures, then add their own secret again. Both end with the same colour; the mixtures alone cannot be unmixed.</p>`;
    if (!mitm) {
      seqViz(body, { label: "Diffie-Hellman", actors: [{ id: "A", name: "Alice" }, { id: "B", name: "Bob" }], steps: [
        { at: "A", m: `public: q = ${q}, α = ${a}`, d: `Both sides agree on the ==public== prime q = ${q} and primitive root α = ${a}. Anyone may know these.` },
        { at: "A", m: `X_A = ${xa}, Y_A = ${ya}`, d: `Alice picks a secret X<sub>A</sub> = ${xa} and computes Y<sub>A</sub> = α<sup>X<sub>A</sub></sup> mod q = ${a}<sup>${xa}</sup> mod ${q} = ==${ya}==.` },
        { at: "B", m: `X_B = ${xb}, Y_B = ${yb}`, d: `Bob picks X<sub>B</sub> = ${xb} and computes Y<sub>B</sub> = ${a}<sup>${xb}</sup> mod ${q} = ==${yb}==.` },
        { f: "A", t: "B", m: `Y_A = ${ya}`, d: "Alice sends Y<sub>A</sub> in the open. Recovering X<sub>A</sub> from it is the ==discrete logarithm problem==." },
        { f: "B", t: "A", m: `Y_B = ${yb}`, d: "Bob sends Y<sub>B</sub> in the open." },
        { at: "A", m: `K = ${yb}^${xa} mod ${q} = ${k}`, d: `Alice computes K = Y<sub>B</sub><sup>X<sub>A</sub></sup> mod q = ${yb}<sup>${xa}</sup> mod ${q} = ==${k}==.` },
        { at: "B", m: `K = ${ya}^${xb} mod ${q} = ${k}`, d: `Bob computes K = Y<sub>A</sub><sup>X<sub>B</sub></sup> mod q = ${ya}<sup>${xb}</sup> mod ${q} = ==${k}==. Same key, and it never travelled on the network.` }] });
    } else {
      const xd1 = 3n, xd2 = 7n, yd1 = modpow(a, xd1, q), yd2 = modpow(a, xd2, q);
      const k1 = modpow(yd1, xb, q), k2 = modpow(yd2, xa, q);
      seqViz(body, { label: "Man in the middle", actors: [{ id: "A", name: "Alice" }, { id: "D", name: "Darth", cls: "evil" }, { id: "B", name: "Bob" }], steps: [
        { at: "D", m: `X_D1 = 3, X_D2 = 7 → ${yd1}, ${yd2}`, k: "bad", d: `Darth prepares two secrets of his own: X<sub>D1</sub> = 3 and X<sub>D2</sub> = 7, giving Y<sub>D1</sub> = ${yd1} and Y<sub>D2</sub> = ${yd2}.` },
        { f: "A", t: "D", m: `Y_A = ${ya}`, d: "Alice sends Y<sub>A</sub>, but ==Darth intercepts it==." },
        { f: "D", t: "B", m: `Y_D1 = ${yd1}`, k: "bad", d: "Darth forwards his own Y<sub>D1</sub> to Bob, ==pretending to be Alice==." },
        { f: "B", t: "D", m: `Y_B = ${yb}`, d: "Bob replies with Y<sub>B</sub>; Darth intercepts it too." },
        { f: "D", t: "A", m: `Y_D2 = ${yd2}`, k: "bad", d: "Darth sends Y<sub>D2</sub> to Alice, pretending to be Bob." },
        { at: "A", m: `K2 = ${yd2}^${xa} mod ${q} = ${k2}`, d: `Alice computes K2 = ${k2}. Darth can compute the same: Y<sub>A</sub><sup>X<sub>D2</sub></sup> = ${ya}<sup>7</sup> mod ${q} = ${modpow(ya, xd2, q)}.` },
        { at: "B", m: `K1 = ${yd1}^${xb} mod ${q} = ${k1}`, d: `Bob computes K1 = ${k1}. Darth also gets it: Y<sub>B</sub><sup>X<sub>D1</sub></sup> = ${modpow(yb, xd1, q)}.` },
        { at: "D", m: "decrypt, read, re-encrypt", k: "bad", d: "Alice and Bob each think they share a key with the other. In fact ==each shares a key with Darth==, who reads and relays everything. Fix: ==authenticate== the exchange (sign the public values or use certificates)." }] });
    }
    body.insertAdjacentHTML("beforeend", paint);
  }
  ins.forEach(i => i.oninput = run); run();
}};

/* ---------- HMAC ---------- */
VIZ["cns-hmac"] = { t: "HMAC: a hash inside a hash", cap: "Follow the key through the inner pad and the outer pad.", build(host) {
  const W = vw(host), H = 360, svg = svgRoot(hx("div", "vz-canvas", null, host), W, H, "HMAC structure");
  const cx = W / 2, bw = Math.min(W - 40, 420);
  const steps = [];
  const box = (y, label, cls, g) => { sv("rect", { x: cx - bw / 2, y, width: bw, height: 36, rx: 9, class: "vx-box " + (cls || "") }, g); tx(g, cx, y + 23, label, "vx-t vx-b"); };
  const down = (y1, y2, g) => sv("line", { x1: cx, y1, x2: cx, y2: y2 - 2, class: "vx-flow", "marker-end": mk(svg, "ah") }, g);
  let g = sv("g", { class: "vx-step" }, svg); steps.push(g);
  box(10, "K⁺ = key padded with zeros to b bits", "", g);
  g = sv("g", { class: "vx-step" }, svg); steps.push(g); down(46, 66, g);
  box(66, "Sᵢ = K⁺ ⊕ ipad   (ipad = 0x36 repeated)", "on", g);
  g = sv("g", { class: "vx-step" }, svg); steps.push(g); down(102, 122, g);
  box(122, "Inner hash: H(Sᵢ ‖ M)", "on", g);
  g = sv("g", { class: "vx-step" }, svg); steps.push(g); down(158, 178, g);
  box(178, "S₀ = K⁺ ⊕ opad   (opad = 0x5C repeated)", "hot", g);
  g = sv("g", { class: "vx-step" }, svg); steps.push(g); down(214, 234, g);
  box(234, "Outer hash: H(S₀ ‖ inner hash)", "hot", g);
  g = sv("g", { class: "vx-step" }, svg); steps.push(g); down(270, 290, g);
  box(290, "HMAC(K, M)", "good", g);
  tx(g, cx, 348, "HMAC = H[(K⁺ ⊕ opad) ‖ H[(K⁺ ⊕ ipad) ‖ M]]", "vx-t vx-s vx-mt");
  const notes = [
    "Pad the key K with zeros on the left to the hash's block size b (for SHA-512, b = 1024 bits). If K is longer than b, hash it first.",
    "XOR K⁺ with ==ipad (0x36 repeated)== to get Sᵢ. This makes the first half of the key material.",
    "Append the message M after Sᵢ and hash it. This is the ==inner envelope==.",
    "XOR K⁺ with ==opad (0x5C repeated)== to get S₀, a second key derived from the same K.",
    "Append the inner hash after S₀ and hash again. This is the ==outer envelope==.",
    "The output is the MAC. Any hash (SHA-1, SHA-256, SHA-512) can be plugged in without changing the design."];
  const n = note(host);
  stepper(host, steps.length, i => { steps.forEach((x, k) => x.setAttribute("class", "vx-step " + (k < i ? "past" : k === i ? "now" : "later"))); n.innerHTML = fmt(notes[i]); });
}};

/* ---------- Kerberos ---------- */
VIZ["cns-kerberos"] = { t: "Kerberos v4: three exchanges", cap: "Wristband from the gate, ride ticket from the booth, then the ride.", build(host) {
  seqViz(host, { label: "Kerberos", actors: [{ id: "C", name: "Client" }, { id: "AS", name: "AS" }, { id: "T", name: "TGS" }, { id: "V", name: "Server V" }], steps: [
    { f: "C", t: "AS", m: "ID_C ‖ ID_tgs ‖ TS1", ph: "Exchange 1", d: "The client asks the ==Authentication Server== for a ticket-granting ticket. The password is ==never sent==." },
    { f: "AS", t: "C", m: "E(K_c,[K_c,tgs … Ticket_tgs])", ph: "Exchange 1", d: "The AS replies encrypted with a key derived from the user's password. Inside: a session key K<sub>c,tgs</sub> and the ==TGT== (Ticket<sub>tgs</sub>), which the client cannot read. Only the real user can decrypt this reply." },
    { f: "C", t: "T", m: "ID_V ‖ Ticket_tgs ‖ Authenticator", ph: "Exchange 2", d: "The client shows the TGT to the ==Ticket-Granting Server== plus an ==authenticator== (its ID and a timestamp, encrypted with K<sub>c,tgs</sub>). The authenticator proves freshness and stops replay." },
    { f: "T", t: "C", m: "E(K_c,tgs,[K_c,v … Ticket_v])", ph: "Exchange 2", d: "The TGS returns a ==service-granting ticket== for server V and a new session key K<sub>c,v</sub>." },
    { f: "C", t: "V", m: "Ticket_v ‖ Authenticator", ph: "Exchange 3", d: "The client presents the service ticket and a fresh authenticator to the server." },
    { f: "V", t: "C", m: "E(K_c,v,[TS5 + 1])", ph: "Exchange 3", d: "Optional ==mutual authentication==: the server proves itself by returning the timestamp plus one, encrypted with the session key." }] });
}};

/* ---------- SSL handshake ---------- */
VIZ["cns-ssl"] = { t: "SSL/TLS Handshake: four phases", cap: "Dashed messages are optional or depend on the key exchange method.", build(host) {
  seqViz(host, { label: "SSL handshake", actors: [{ id: "C", name: "Client" }, { id: "S", name: "Server" }], steps: [
    { f: "C", t: "S", m: "client_hello", ph: "Phase 1", d: "Version, client random, session ID, ==list of cipher suites==, compression methods." },
    { f: "S", t: "C", m: "server_hello", ph: "Phase 1", d: "Server picks the version and ==one cipher suite==, and sends its own random value." },
    { f: "S", t: "C", m: "certificate", ph: "Phase 2", d: "Server's X.509 certificate chain, so the client can authenticate it." },
    { f: "S", t: "C", m: "server_key_exchange", ph: "Phase 2", k: "opt", d: "Only needed for some methods (for example ephemeral Diffie–Hellman)." },
    { f: "S", t: "C", m: "certificate_request", ph: "Phase 2", k: "opt", d: "Only if the server wants the client to authenticate too." },
    { f: "S", t: "C", m: "server_hello_done", ph: "Phase 2", d: "Server has finished its part of the hello." },
    { f: "C", t: "S", m: "certificate", ph: "Phase 3", k: "opt", d: "Client certificate, only if requested." },
    { f: "C", t: "S", m: "client_key_exchange", ph: "Phase 3", d: "Client sends the ==pre-master secret== (for example encrypted with the server's RSA public key). Both sides now derive the ==master secret==." },
    { f: "C", t: "S", m: "certificate_verify", ph: "Phase 3", k: "opt", d: "Proves the client owns its certificate's private key." },
    { f: "C", t: "S", m: "change_cipher_spec", ph: "Phase 4", d: "From now on the client uses the agreed cipher suite." },
    { f: "C", t: "S", m: "finished", ph: "Phase 4", d: "First message protected with the new keys; checks the handshake was not tampered with." },
    { f: "S", t: "C", m: "change_cipher_spec", ph: "Phase 4", d: "The server switches too." },
    { f: "S", t: "C", m: "finished", ph: "Phase 4", d: "Handshake complete. Application data now flows through the ==Record protocol==." }] });
}};

/* ---------- 802.11i 4-way handshake ---------- */
VIZ["cns-4way"] = { t: "802.11i 4-way handshake", cap: "Both sides prove they hold the PMK and derive a fresh PTK, without sending it.", build(host) {
  seqViz(host, { label: "4-way handshake", actors: [{ id: "S", name: "Station" }, { id: "AP", name: "Access point" }], steps: [
    { at: "S", m: "both already hold the PMK", d: "After 802.1X/EAP authentication (or a pre-shared key), both sides hold the ==Pairwise Master Key (PMK)==." },
    { f: "AP", t: "S", m: "1. ANonce", d: "The AP sends a random number, ANonce. The station can now compute the ==PTK== from PMK, ANonce, SNonce and both MAC addresses." },
    { f: "S", t: "AP", m: "2. SNonce + MIC", d: "The station sends its own nonce plus a MIC (integrity code) made with the new PTK. The AP derives the same PTK and checks the MIC." },
    { f: "AP", t: "S", m: "3. Install PTK, GTK + MIC", d: "The AP tells the station to install the keys and delivers the ==Group Temporal Key (GTK)==, encrypted, for broadcast traffic." },
    { f: "S", t: "AP", m: "4. ACK + MIC", d: "The station confirms. Protected data transfer begins (CCMP or TKIP)." }] });
}};

/* ---------- IPsec packet layouts ---------- */
VIZ["cns-ipsec"] = { t: "AH vs ESP, transport vs tunnel", cap: "Pick a protocol and a mode. Shaded bars show what is encrypted and what is authenticated.", build(host) {
  const ctl = hx("div", "vz-row", null, host);
  let proto = 0, mode = 0;
  seg(ctl, ["AH", "ESP"], k => { proto = k; draw(); }, 0);
  seg(ctl, ["Transport mode", "Tunnel mode"], k => { mode = k; draw(); }, 0);
  const out = hx("div", null, null, host), n = note(host);
  function draw() {
    const P = [];
    if (mode === 1) P.push(["New IP hdr", "ip2"]);
    else P.push(["Orig IP hdr", "ip"]);
    if (proto === 0) P.push(["AH", "sec"]); else P.push(["ESP hdr", "sec"]);
    if (mode === 1) P.push(["Orig IP hdr", "ip"]);
    P.push(["TCP", "tcp"], ["Data", "data"]);
    if (proto === 1) P.push(["ESP trailer", "sec"], ["ESP auth", "sec"]);
    const encFrom = proto === 1 ? (mode === 1 ? 2 : 2) : -1, encTo = proto === 1 ? P.length - 2 : -1;
    const authFrom = proto === 0 ? 0 : 1, authTo = proto === 0 ? P.length - 1 : P.length - 2;
    out.innerHTML = `<div class="vz-pkt">${P.map(([t, c]) => `<span class="${c}">${t}</span>`).join("")}</div>
      <div class="vz-span" style="--a:${authFrom};--b:${authTo + 1};--n:${P.length}"><i class="auth"></i><b>Authenticated${proto === 0 ? " (except mutable IP fields)" : ""}</b></div>
      ${proto === 1 ? `<div class="vz-span" style="--a:${encFrom};--b:${encTo + 1};--n:${P.length}"><i class="enc"></i><b>Encrypted</b></div>` : `<div class="vz-span none"><b>Nothing is encrypted</b></div>`}`;
    const text = [
      ["==AH, transport==: AH sits between the original IP header and TCP. It authenticates the ==whole packet, including most of the IP header== (mutable fields such as TTL are set to zero for the calculation). Nothing is hidden.",
       "==AH, tunnel==: the whole original packet is wrapped in a ==new IP header==; AH authenticates everything including the new header's fixed fields. Still nothing is encrypted."],
      ["==ESP, transport==: TCP, data and the ESP trailer are ==encrypted==. The ESP auth field covers ESP header to trailer, but ==not the IP header==.",
       "==ESP, tunnel==: the ==entire original packet, inner IP header included, is encrypted==, then given a new outer IP header. This is the usual VPN setup: an eavesdropper sees only the two gateways."]];
    n.innerHTML = fmt(text[proto][mode]);
  }
  draw();
}};

/* ---------- PGP ---------- */
VIZ["cns-pgp"] = { t: "PGP at the sender: Sign, Compress, Encrypt, Radix-64", cap: "Smart Cats Eat Rice. Each step and the reason it comes in that order.", build(host) {
  flowViz(host, { nodes: [
    { t: "Hash the message", s: "Authentication starts", d: "Compute a hash (SHA-1 in the classic description) of the message M." },
    { t: "Sign", s: "Sender's private key", d: "Encrypt the hash with the ==sender's private RSA key== and attach this signature to M. Signing happens ==before compression== so the signature can be stored and checked against the original message." },
    { t: "Compress", s: "ZIP", d: "Compress the message plus signature. Doing it ==after signing== keeps the signature independent of the compression version; doing it ==before encryption== removes redundancy and makes the ciphertext stronger and shorter." },
    { t: "Encrypt", s: "One-time session key", d: "Generate a random 128-bit ==session key== and encrypt the compressed data with CAST-128, IDEA or 3DES. Then encrypt the session key with the ==receiver's public RSA key== and attach it." },
    { t: "Radix-64", s: "E-mail compatibility", d: "Convert the binary result to printable ASCII so mail systems accept it (and segment large messages)." },
    { t: "Receiver reverses it", s: "Radix-64 → decrypt → decompress → verify", d: "Decode, recover the session key with the private key, decrypt, decompress, then check the signature with the sender's public key." }] });
}};
