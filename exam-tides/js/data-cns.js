/* Cryptography and Network Security — CS701PC (R22). Text: Stallings 6e, Kahate 3e. */
DATA.cns = {
name: "Cryptography and Network Security", short: "CNS", code: "CS701PC", mark: "key",
units: [
{ u: 1, title: "Security concepts and classical ciphers",
topics: [
{ t: "Principles of security", q: "Name the six goals of security and say what each protects.",
pts: [
"==Confidentiality==: only the intended receiver can read the message (threat: interception).",
"==Integrity==: the content is not changed on the way (threat: modification).",
"==Authentication==: proves who the sender really is (threat: fabrication).",
"==Non-repudiation==: the sender cannot later deny having sent it.",
"==Access control==: decides who may access which resource, and how.",
"==Availability==: resources stay usable for authorised users (threat: interruption, DoS).",
"Security approaches (Kahate): trusted systems, security models (no security, security through obscurity, host security, network security) and security management practices."],
anchor: "Think of a sealed exam answer script. Only the examiner opens it (confidentiality), nobody can change your answers (integrity), your hall ticket proves it is yours (authentication), you cannot later say it is not your script (non-repudiation), only staff can enter the strong room (access control), and the script must reach the examiner in time (availability).",
hook: "CIA, then A-N-A: Authentication, Non-repudiation, Access control. Availability completes the six." },
{ t: "Attacks, services and mechanisms (X.800)", q: "Split attacks into passive and active types, then list the X.800 services and mechanisms.",
pts: [
"==Passive attacks== only observe: release of message contents and traffic analysis. Hard to detect, so the goal is prevention (mainly encryption).",
"==Active attacks== change or create data: masquerade, replay, modification of messages, denial of service. Hard to prevent, so the goal is detection and recovery.",
"Security services: authentication (peer entity, data origin), access control, data confidentiality, data integrity, non-repudiation, availability.",
"Security mechanisms: encipherment, digital signature, access control, data integrity, authentication exchange, traffic padding, routing control, notarization."],
trap: "Traffic analysis is passive even though the attacker learns something. Nothing in the message is changed, so it is still passive.",
hook: "Eight mechanisms: Every Dog Always Digs And Then Rolls Nearby (Encipherment, Digital signature, Access control, Data integrity, Authentication exchange, Traffic padding, Routing control, Notarization).",
write: ["Define a security attack", "Diagram: passive (opponent reads Bob's traffic)", "Diagram for each active attack: masquerade, replay, modification, DoS", "Table: passive vs active (detect vs prevent)", "List the services and mechanisms"] },
{ t: "Model for network security", q: "Draw the network security model and give its four design tasks.",
pts: [
"Sender and receiver apply a ==security-related transformation== (for example encryption) using ==secret information== (a key).",
"The message travels over an information channel where an opponent can attack it.",
"A ==trusted third party== distributes the secret information and can settle disputes.",
"Four design tasks: design the algorithm, generate the secret information, distribute and share it, and specify the protocol that uses them.",
"Network access security model: a ==gatekeeper function== guards the system against unwanted access (hackers, viruses, worms)."] },
{ t: "Substitution techniques", q: "Explain Caesar, Playfair and Hill. Encrypt a pair with Playfair.", viz: "cns-playfair",
pts: [
"==Caesar==: C = (P + k) mod 26. With k = 3, 'meet me after the toga party' becomes PHHW PH DIWHU WKH WRJD SDUWB. Only 25 keys, so brute force breaks it at once.",
"==Monoalphabetic==: any rearrangement of the alphabet gives 26! keys, but letter frequencies (e, t, a…) give it away.",
"==Playfair==: 5×5 matrix from a keyword (I and J share a cell). Encrypt in pairs. Same row: take the letter to the right. Same column: take the letter below. Otherwise: take the letter in your own row at the other letter's column (the rectangle corners). Split a repeated pair with X.",
"==Hill==: C = K·P mod 26. Example: K = [[3,3],[2,5]] turns HELP into HIAT. Decrypt with K⁻¹ mod 26, which exists only if gcd(det K, 26) = 1.",
"==Vigenère==: polyalphabetic; each letter is shifted by the matching letter of a repeating keyword.",
"==One-time pad==: random key as long as the message, used once. Unbreakable, but key distribution makes it impractical."],
trap: "In Playfair, the rectangle rule keeps each letter in its own row. A common mistake is swapping rows instead of columns.",
hook: "Playfair in three words: Right, Down, Corners." },
{ t: "Transposition, steganography, keys and attack types", q: "Contrast substitution with transposition, and list the cryptanalysis attack types.",
pts: [
"==Transposition== rearranges letters without changing them. Rail fence with depth 2: 'meet me after the toga party' becomes MEMATRHTGPRYETEFETEOAAT. Columnar (row) transposition writes in rows and reads columns in key order.",
"==Steganography== hides the fact that a message exists (invisible ink, least-significant bits of image pixels). Cryptography only hides what the message means.",
"==Symmetric== key: one shared key, fast, but sharing the key is hard. ==Asymmetric== key: public/private pair, slower, solves key distribution.",
"Key range: an n-bit key gives 2ⁿ possible keys. Brute force needs 2ⁿ⁻¹ tries on average.",
"Cryptanalysis attacks: ciphertext-only, known-plaintext, chosen-plaintext, chosen-ciphertext, chosen-text. Brute force simply tries every key."],
trap: "Substitution changes the letters; transposition only moves them. Letter frequencies stay the same in a transposition, which is how you spot one." }
],
long: [
{ q: "Explain the types of security attacks with neat diagrams.", skel: ["Definition", "Passive: release of contents and traffic analysis (diagrams)", "Active: masquerade, replay, modification, DoS (diagram each)", "Comparison table", "Conclusion: prevent passive, detect active"] },
{ q: "Encrypt a given message with the Playfair cipher using a given key.", skel: ["Build the 5×5 matrix (I/J together)", "Split the plaintext into pairs, insert X between repeated letters", "Apply the row, column and rectangle rules pair by pair", "Write the ciphertext and state the decryption rules (left, up, corners)"] },
{ q: "Explain the model for network security with a diagram.", skel: ["Diagram: sender, receiver, opponent, trusted third party", "Security-related transformation and secret information", "Four design tasks", "Network access security model (gatekeeper)"] },
{ q: "Explain substitution and transposition techniques with examples.", skel: ["Caesar with a worked line", "Monoalphabetic and Playfair", "Hill with matrix", "Rail fence and columnar", "Comparison"] }
],
mcq: [
["Traffic analysis is…", ["An active attack", "A passive attack", "A replay attack", "A DoS attack"], 1, "The attacker only observes patterns. Nothing is changed."],
["Which cipher uses a 5×5 key matrix?", ["Hill", "Vigenère", "Playfair", "Rail fence"], 2, "Playfair puts 25 letters (I/J together) in a 5×5 grid."],
["Hiding the existence of a message is…", ["Cryptanalysis", "Steganography", "Transposition", "Hashing"], 1, "Cryptography hides the meaning; steganography hides the existence."],
["A sender cannot deny sending a message. This is…", ["Integrity", "Non-repudiation", "Availability", "Access control"], 1, "Usually achieved with digital signatures."],
["Caesar cipher with k = 3 encrypts 'meet' as…", ["phhw", "nffu", "lddt", "qiix"], 0, "m→p, e→h, e→h, t→w."],
["With Hill key [[3,3],[2,5]], HELP becomes…", ["HIAT", "HELP", "IHTA", "HATI"], 0, "(3·7 + 3·4) mod 26 = 7 = H; (2·7 + 5·4) mod 26 = 8 = I; and so on."]
] },

{ u: 2, title: "Symmetric and asymmetric ciphers",
topics: [
{ t: "Block cipher principles (Feistel)", q: "Write the Feistel round equations and define confusion and diffusion.", viz: "cns-rounds",
pts: [
"A ==block cipher== encrypts a fixed-size block (for example 64 bits) at a time. A ==stream cipher== encrypts one bit or byte at a time.",
"Shannon: ==confusion== makes the link between key and ciphertext complex (substitution); ==diffusion== spreads each plaintext bit over many ciphertext bits (permutation).",
"==Feistel structure==: split the block into L and R. Each round: Lᵢ = Rᵢ₋₁ and Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ). Decryption runs the same structure with the subkeys in reverse order.",
"Design factors: block size, key size, number of rounds, subkey generation algorithm, round function F."],
anchor: "Feistel is like two people passing a notebook. Each round, one half is scrambled using the other half and then they swap. Because only half changes at a time, running the steps backwards undoes it, even if F itself cannot be reversed.",
trap: "Confusion hides the key; diffusion hides the plaintext statistics. Remember: Confusion ↔ Cipher key, Diffusion ↔ Data spread." },
{ t: "DES", q: "Give DES's block size, key size and rounds, and trace one round.", viz: "cns-rounds",
pts: [
"==64-bit block==, ==56-bit effective key== (64 bits with 8 parity bits), ==16 Feistel rounds==.",
"Flow: initial permutation (IP) → 16 rounds → 32-bit swap → inverse IP (IP⁻¹).",
"Round function F: ==expansion== of R from 32 to 48 bits (E-box) → XOR with the 48-bit subkey → ==8 S-boxes== (6 bits in, 4 bits out each) → ==P-box== permutation.",
"Key schedule: PC-1 (64 → 56 bits), split into two 28-bit halves, left circular shift by 1 or 2 bits per round, PC-2 picks 48 bits for each round's subkey.",
"Avalanche effect: changing one input bit changes about half the output bits.",
"Weakness: a 56-bit key can be brute-forced. 3DES and later AES replaced it."],
hook: "DES numbers: 64-56-16-8 (block, key, rounds, S-boxes). S-box: 6 in, 4 out.",
write: ["Overall DES block diagram (IP, 16 rounds, swap, IP⁻¹, key schedule)", "One round with the F function expanded", "Key generation", "Avalanche effect and weaknesses"] },
{ t: "AES", q: "List AES key sizes with rounds, and the four steps of a round.", viz: "cns-rounds",
pts: [
"==128-bit block==. Key of ==128 / 192 / 256 bits== gives ==10 / 12 / 14 rounds==.",
"Data is held in a 4×4 matrix of bytes called the ==State==. AES is ==not a Feistel cipher==: the whole block changes every round.",
"Each round: ==SubBytes== (S-box per byte), ==ShiftRows== (row r shifts left by r bytes), ==MixColumns== (each column multiplied by a fixed matrix in GF(2⁸)), ==AddRoundKey== (XOR with the round key).",
"An AddRoundKey step comes before round 1. The ==last round has no MixColumns==.",
"Key expansion turns a 128-bit key into 44 words (4 per round key × 11 round keys)."],
hook: "Round order S-S-M-A: Some Students Make Art.",
trap: "Only AddRoundKey uses the key. The other three steps are fixed and public." },
{ t: "Blowfish, RC5, IDEA", q: "Give one key fact about each of Blowfish, RC5 and IDEA.",
pts: [
"==Blowfish==: 64-bit block, variable key from 32 to 448 bits, 16 Feistel rounds, key-dependent S-boxes, an 18-entry P-array. Fast and compact.",
"==RC5==: written as RC5-w/r/b (word size 16, 32 or 64 bits; rounds 0–255; key bytes 0–255). Uses only addition, XOR and data-dependent rotation.",
"==IDEA==: 64-bit block, 128-bit key, 8 rounds plus an output transformation, 52 subkeys of 16 bits. Mixes three incompatible operations: XOR, addition mod 2¹⁶, multiplication mod (2¹⁶ + 1)."] },
{ t: "Block cipher modes and RC4", q: "Name the five modes and say which one leaks patterns.",
pts: [
"==ECB==: each block encrypted independently. Identical plaintext blocks give identical ciphertext, so only use it for short data such as keys.",
"==CBC==: XOR each plaintext block with the previous ciphertext block before encrypting (the first block uses an IV).",
"==CFB== and ==OFB== turn a block cipher into a stream cipher. OFB feeds back the cipher output, so a bit error does not spread.",
"==CTR==: encrypt a counter and XOR it with the plaintext. Blocks can be processed in parallel and accessed randomly.",
"==RC4==: stream cipher with a 1–256-byte key. The key scheduling algorithm (KSA) shuffles a 256-byte state array S; the pseudo-random generator (PRGA) keeps swapping and outputs keystream bytes that are XORed with the data."] },
{ t: "RSA", q: "Generate RSA keys for p = 17, q = 11, e = 7 and encrypt M = 88.", viz: "cns-rsa",
pts: [
"Choose primes p and q. Compute ==n = p·q== and ==φ(n) = (p−1)(q−1)==.",
"Choose e with gcd(e, φ) = 1. Compute ==d = e⁻¹ mod φ== (extended Euclid).",
"Public key {e, n}, private key {d, n}. Encrypt ==C = Mᵉ mod n==; decrypt ==M = Cᵈ mod n==.",
"Worked: p = 17, q = 11 → n = 187, φ = 160. e = 7 → d = 23 because 7 × 23 = 161 ≡ 1 (mod 160). M = 88 → C = 88⁷ mod 187 = 11, and 11²³ mod 187 = 88.",
"Security depends on how hard it is to ==factor n==."],
anchor: "A padlock anyone can snap shut (public key e) but only you can open (private key d). Multiplying p and q is easy; splitting n back into p and q is the hard part that keeps d secret.",
write: ["Key generation steps", "Encryption and decryption formulas", "Fully worked numeric (show φ, extended Euclid for d, and the modular exponent)", "Security: factoring problem, choice of key size"] },
{ t: "Diffie–Hellman, ElGamal, Knapsack", q: "Run Diffie–Hellman for q = 23, α = 5, Xa = 6, Xb = 15. How does man-in-the-middle break it?", viz: "cns-dh",
pts: [
"==Diffie–Hellman==: public prime q and primitive root α. A picks a secret X_A and sends Y_A = α^X_A mod q; B does the same. Both compute ==K = Y_B^X_A mod q = Y_A^X_B mod q==.",
"Worked: q = 23, α = 5, X_A = 6, X_B = 15 → Y_A = 8, Y_B = 19, and both sides get K = 2.",
"DH has ==no authentication==. A ==man-in-the-middle== runs one exchange with A and another with B and relays messages. Fix: sign or certify the public values.",
"==ElGamal encryption==: public Y_A = α^X_A mod q. Pick random k: C₁ = α^k mod q, K = Y_A^k mod q, C₂ = K·M mod q. Decrypt: K = C₁^X_A mod q, then M = C₂·K⁻¹ mod q.",
"==Knapsack (Merkle–Hellman)==: the private key is a superincreasing sequence, disguised into the public key by multiplying by w mod m. Ciphertext is the sum of public elements where the message bit is 1. It was broken by Shamir."],
anchor: "Paint mixing: both start with the same public yellow, add a secret colour each, swap the mixtures, and add their secret again. Both end with the same brown; an eavesdropper who saw only the mixtures cannot unmix them.",
trap: "Diffie–Hellman is for agreeing a key, not for encrypting messages. RSA can do both encryption and signatures.",
hook: "RSA rests on factoring. DH and ElGamal rest on the discrete log." }
],
long: [
{ q: "Explain DES with a neat diagram of one round.", skel: ["Parameters (64 / 56 / 16)", "Overall structure diagram", "Round function: expansion, XOR with subkey, S-boxes, P-box", "Key generation", "Avalanche effect and weakness"] },
{ q: "Explain AES encryption and its round transformations.", skel: ["Parameters table (key size vs rounds)", "State matrix", "SubBytes, ShiftRows, MixColumns, AddRoundKey (a small sketch each)", "Key expansion", "Why the last round differs"] },
{ q: "Explain RSA. Perform encryption and decryption for given p, q, e and M.", skel: ["Key generation", "Formulas", "Worked numeric with extended Euclid", "Security note"] },
{ q: "Explain Diffie–Hellman key exchange and the man-in-the-middle attack.", skel: ["Global public elements", "Steps for A and B", "Proof that both keys match", "Numeric example", "MITM diagram and countermeasure"] },
{ q: "Explain block cipher modes of operation.", skel: ["ECB", "CBC", "CFB", "OFB", "CTR", "Table: error propagation, parallelism, use"] }
],
mcq: [
["Rounds in AES-256:", ["10", "12", "14", "16"], 2, "128 → 10, 192 → 12, 256 → 14."],
["Each DES S-box maps…", ["4 → 6 bits", "6 → 4 bits", "8 → 8 bits", "6 → 6 bits"], 1, "Eight S-boxes, 6 bits in and 4 bits out each."],
["For RSA with p = 17, q = 11, e = 7, d is…", ["23", "27", "7", "160"], 0, "7 × 23 = 161 ≡ 1 (mod 160)."],
["Which mode makes identical plaintext blocks give identical ciphertext?", ["CBC", "CTR", "ECB", "OFB"], 2, "ECB encrypts each block on its own."],
["Diffie–Hellman's security relies on…", ["Factoring", "Discrete logarithm", "Hash collisions", "Knapsack"], 1, "Finding X from αˣ mod q is the discrete log problem."],
["Which is NOT a Feistel cipher?", ["DES", "Blowfish", "AES", "None of these"], 2, "AES is a substitution-permutation network acting on the whole State."],
["IDEA uses a key of…", ["56 bits", "128 bits", "448 bits", "64 bits"], 1, "64-bit block, 128-bit key."]
] },

{ u: 3, title: "Hashes, MACs, signatures and key management",
topics: [
{ t: "Hash functions and message authentication", q: "Give the three security properties of a hash and the three ways to authenticate a message.",
pts: [
"A hash H turns a message of any length into a fixed-length ==digest==.",
"Properties: ==preimage resistance== (one-way), ==second-preimage resistance== (weak collision resistance), ==collision resistance== (strong).",
"Authentication requirements, i.e. attacks to stop: disclosure, traffic analysis, masquerade, content modification, sequence modification, timing modification, source repudiation, destination repudiation.",
"Three ways to authenticate a message: message encryption, a MAC, or a hash function."],
trap: "A hash alone has no key, so anyone can recompute it. To prove who sent a message you need a MAC (shared key) or a signature (private key)." },
{ t: "SHA-512", q: "Walk through the five steps of SHA-512.",
pts: [
"Output: ==512-bit digest==. Works on ==1024-bit blocks==.",
"Step 1: pad so the length ≡ ==896 mod 1024== (always pad, even if already at 896: a 1 bit then 0s).",
"Step 2: append the original length as a ==128-bit== number.",
"Step 3: initialise ==eight 64-bit buffers== a–h with fixed constants.",
"Step 4: run each block through the compression function F: ==80 rounds==, each using a word Wₜ from the message schedule and a constant Kₜ.",
"Step 5: after the last block, the buffers hold the 512-bit hash."],
hook: "896 + 128 = 1024. Padding plus the length field fill one block exactly.",
write: ["Overall diagram (blocks through F, then the hash)", "Padding and length steps", "Buffer initialisation", "Round function sketch (Ch, Maj, Σ functions)", "Output"] },
{ t: "MAC, HMAC and CMAC", q: "Write the HMAC formula and give the values of ipad and opad.", viz: "cns-hmac",
pts: [
"A ==MAC== is a short tag computed from the message and a shared key: MAC = C(K, M). It gives integrity and authentication, but ==not non-repudiation== (both sides know the key).",
"==HMAC==(K, M) = H[(K⁺ ⊕ opad) ‖ H[(K⁺ ⊕ ipad) ‖ M]].",
"==ipad = 0x36== repeated, ==opad = 0x5C== repeated. K⁺ is the key padded with zeros to the hash block size b.",
"==CMAC== uses a block cipher (AES or 3DES) like CBC-MAC. Two subkeys K₁ and K₂, derived from the key, protect the last block (K₁ if complete, K₂ if padded)."],
anchor: "HMAC is a letter in an envelope inside another envelope. The inner envelope (ipad) wraps the message; the outer envelope (opad) wraps the inner hash. Both envelopes are sealed with the same key.",
hook: "Inner pad first, outer pad last. The I comes before the O, just like the alphabet." },
{ t: "Digital signatures and the ElGamal signature", q: "Give the ElGamal signing and verification equations.",
pts: [
"A signature must depend on the message, use something unique to the sender, be easy to create and check, and be infeasible to forge. It gives ==non-repudiation==.",
"ElGamal setup: global q and α. Private X_A, public Y_A = α^X_A mod q.",
"Sign hash m: random K with gcd(K, q−1) = 1. ==S₁ = α^K mod q== and ==S₂ = K⁻¹(m − X_A·S₁) mod (q−1)==.",
"Verify: V₁ = α^m mod q and V₂ = Y_A^S₁ · S₁^S₂ mod q. Valid if ==V₁ = V₂==."],
trap: "S₂ is computed mod (q−1), not mod q. Exponents work modulo q−1." },
{ t: "Key management and distribution", q: "List the four ways to distribute public keys and explain a KDC.",
pts: [
"Symmetric options: A hands the key to B physically; a third party delivers it; reuse an old key to send a new one; or a ==KDC== (Key Distribution Centre) issues session keys protected by master keys.",
"==Session keys== are short-lived and protect data. ==Master keys== are long-term and shared with the KDC.",
"Using asymmetric encryption: Merkle's simple scheme is open to man-in-the-middle; the improved scheme uses nonces to give confidentiality and authentication.",
"Public key distribution: ==public announcement==, ==publicly available directory==, ==public-key authority==, ==public-key certificates== (best)."] },
{ t: "Kerberos, X.509 and PKI", q: "Trace the three Kerberos exchanges and list the X.509 certificate fields.", viz: "cns-kerberos",
pts: [
"==Kerberos== is an authentication service built on symmetric encryption, with an ==AS== (Authentication Server), a ==TGS== (Ticket-Granting Server) and service servers V.",
"Three exchanges: (1) client ↔ AS gives a ==ticket-granting ticket (TGT)==; (2) client ↔ TGS gives a ==service-granting ticket==; (3) client ↔ V presents the ticket plus an ==authenticator==. Timestamps and lifetimes block replay. A realm is one administrative domain.",
"==X.509== certificate fields: version, serial number, signature algorithm ID, issuer name, validity period, subject name, subject public-key info, issuer and subject unique IDs (v2), extensions (v3), and the CA's signature.",
"Revoked certificates go on a ==CRL== (Certificate Revocation List).",
"==PKI== (PKIX) components: end entity, Certification Authority (CA), Registration Authority (RA), CRL issuer, repository."],
anchor: "Kerberos is an amusement park. The gate (AS) checks your ID once and gives a wristband (TGT). Each ride's booth (TGS) looks at the wristband and gives that ride's ticket. The ride (server) only checks the ticket. Your password is never shown at the rides.",
write: ["Why Kerberos (open network, password never sent)", "Diagram of the three exchanges with message contents", "Tickets vs authenticators", "Realms; v4 vs v5 differences"] }
],
long: [
{ q: "Explain HMAC with a neat diagram.", skel: ["Objectives of HMAC", "Structure (K⁺ ⊕ ipad, inner hash, K⁺ ⊕ opad, outer hash)", "Formula", "Security and efficiency"] },
{ q: "Explain the Kerberos v4 authentication dialogue.", skel: ["Motivation and threats", "Roles of AS, TGS and server", "Three exchanges with messages", "Realms", "Limitations"] },
{ q: "Explain the X.509 certificate format and PKI.", skel: ["Certificate format diagram", "Certificate chains and revocation (CRL)", "PKIX model (EE, CA, RA, repository)", "Management functions"] },
{ q: "Explain SHA-512 with block diagrams.", skel: ["Steps 1–5", "Compression function", "Round function", "Output length and security"] },
{ q: "What is a digital signature? Explain the ElGamal digital signature scheme.", skel: ["Properties and requirements", "Key generation", "Signing equations", "Verification and why it works"] }
],
mcq: [
["SHA-512 processes message blocks of…", ["512 bits", "1024 bits", "256 bits", "128 bits"], 1, "1024-bit blocks give a 512-bit digest."],
["In HMAC, ipad is the byte…", ["0x5C", "0x36", "0xFF", "0x00"], 1, "ipad = 0x36, opad = 0x5C."],
["Kerberos v4 is built on…", ["Public-key cryptography", "Symmetric encryption", "Hashing only", "Steganography"], 1, "It uses DES-based symmetric encryption."],
["A list of revoked certificates is the…", ["CA", "RA", "CRL", "TGT"], 2, "Certificate Revocation List."],
["Which gives non-repudiation?", ["MAC", "HMAC", "Digital signature", "Hash"], 2, "Only the signer holds the private key."],
["SHA-512 pads the message to a length ≡ ___ mod 1024.", ["512", "896", "960", "1024"], 1, "896 plus the 128-bit length field = 1024."]
] },

{ u: 4, title: "Transport-level and wireless security",
topics: [
{ t: "Web security considerations", q: "Name four web threat types and the three layers where security can live.",
pts: [
"Threats: ==integrity== (modifying data), ==confidentiality== (eavesdropping), ==denial of service==, ==authentication== (impersonation).",
"Where security can sit: network level (==IPsec==), transport level (==SSL/TLS==), application level (==PGP, S/MIME, Kerberos==)."] },
{ t: "SSL/TLS architecture and the Record protocol", q: "Name SSL's four protocols and the steps of the Record protocol.",
pts: [
"SSL sits on top of TCP. Four protocols: ==Handshake==, ==Change Cipher Spec==, ==Alert==, ==Record==.",
"==Connection==: a transient peer-to-peer link. ==Session==: an association created by the Handshake, shareable by many connections.",
"Record protocol: fragment (≤ 2¹⁴ bytes) → optional compression → add MAC → encrypt → add SSL record header.",
"Change Cipher Spec is a single byte that switches to the newly agreed cipher suite. Alert carries warnings and fatal errors."],
hook: "SSL's four: H-C-A-R. Record is the base everything rides on." },
{ t: "SSL Handshake protocol", q: "List the messages in each of the four handshake phases.", viz: "cns-ssl",
pts: [
"Phase 1, establish capabilities: ==client_hello== and ==server_hello== (version, random, session ID, cipher suites, compression).",
"Phase 2, server authentication and key exchange: certificate, server_key_exchange, certificate_request, ==server_hello_done==.",
"Phase 3, client authentication and key exchange: certificate, ==client_key_exchange==, certificate_verify.",
"Phase 4, finish: ==change_cipher_spec== and ==finished== from both sides.",
"TLS differs from SSL in its version number, use of HMAC, a pseudorandom function (PRF), extra alert codes, and cipher suites."],
write: ["Two-column message diagram (client and server) with all four phases", "Purpose of each message", "Pre-master secret to master secret", "TLS differences"] },
{ t: "HTTPS and SSH", q: "What does HTTPS encrypt? Name SSH's three protocols.",
pts: [
"==HTTPS== = HTTP over SSL/TLS on ==port 443== (HTTP uses 80). It encrypts the URL, the document, form contents, cookies and HTTP headers.",
"HTTPS connection: TLS handshake first, then the HTTP request. Closing sends a TLS close_notify alert before closing TCP.",
"==SSH== (==port 22==) has three protocols: ==Transport Layer== (server authentication, confidentiality, integrity), ==User Authentication== (publickey, password, hostbased), ==Connection== (multiplexes many channels).",
"SSH port forwarding (tunnelling): local and remote forwarding carry other TCP traffic through the secure connection."] },
{ t: "Wireless and mobile device security", q: "List wireless threats and the 802.11 architecture parts.",
pts: [
"Wireless is risky because of the broadcast channel, mobility, limited resources and easy physical access.",
"Threats: accidental association, malicious association, ad hoc networks, MAC spoofing (identity theft), man-in-the-middle, denial of service, network injection.",
"Mobile device concerns: no physical control, untrusted devices, untrusted networks, untrusted apps and content, interaction with other systems, location services. BYOD adds to these.",
"==IEEE 802.11== architecture: stations, ==Access Point==, ==BSS== (Basic Service Set), ==ESS== (Extended Service Set) linked by a ==Distribution System==. Layers: physical, MAC, LLC."] },
{ t: "IEEE 802.11i (RSN)", q: "Name the five phases of 802.11i and what the 4-way handshake derives.", viz: "cns-4way",
pts: [
"Robust Security Network services: ==authentication==, ==access control==, ==privacy with message integrity==.",
"Five phases: ==discovery== → ==authentication== (802.1X/EAP with an authentication server) → ==key management== → ==protected data transfer== → ==connection termination==.",
"Keys: the ==PMK== (Pairwise Master Key) leads to the ==PTK== (Pairwise Transient Key) through the ==4-way handshake==. A group key handshake delivers the ==GTK== for broadcast traffic.",
"Data protection: ==TKIP== (a stopgap for old WEP hardware) or ==CCMP== (AES-based, the strong option)."],
hook: "Phases D-A-K-P-C: Do All Keys Protect Connections?",
write: ["RSN elements", "Five phases diagram", "4-way handshake messages", "TKIP vs CCMP"] }
],
long: [
{ q: "Explain the SSL Handshake protocol with a neat diagram.", skel: ["Where SSL sits in the stack", "Four phases with messages", "Cipher suite and master secret", "Change Cipher Spec and Alert in brief"] },
{ q: "Explain the SSH protocol stack.", skel: ["Stack diagram (three protocols over TCP)", "Transport Layer packet exchange", "User authentication methods", "Connection protocol, channels, port forwarding"] },
{ q: "Explain the phases of IEEE 802.11i operation.", skel: ["RSN services", "Phase diagram", "Authentication via 802.1X/EAP", "Key hierarchy and the 4-way handshake", "TKIP vs CCMP"] },
{ q: "Explain the SSL Record protocol and HTTPS.", skel: ["Record steps diagram", "Header format", "HTTPS initiation and closure", "What HTTPS protects"] }
],
mcq: [
["HTTPS uses port…", ["80", "22", "443", "25"], 2, "HTTPS 443, SSH 22, HTTP 80."],
["Which SSL protocol is a single byte that activates the new cipher?", ["Alert", "Record", "Change Cipher Spec", "Handshake"], 2, "A single message with the value 1."],
["The 802.11i 4-way handshake derives the…", ["PMK", "PTK", "CRL", "TGT"], 1, "PMK → PTK."],
["Max SSL record fragment size:", ["2⁸ bytes", "2¹⁴ bytes", "2¹⁶ bytes", "1 KB"], 1, "16384 bytes."],
["SSH user authentication methods include…", ["publickey, password, hostbased", "ipad, opad", "AH, ESP", "TKIP, CCMP"], 0, ""]
] },

{ u: 5, title: "E-mail security, IPsec and case studies",
topics: [
{ t: "PGP", q: "Give the order of PGP operations at the sender and list its five services.", viz: "cns-pgp",
pts: [
"Services: ==authentication== (sign the hash with RSA/DSS), ==confidentiality== (one-time session key with CAST-128, IDEA or 3DES; session key encrypted with RSA), ==compression== (ZIP), ==e-mail compatibility== (radix-64), ==segmentation==.",
"Order at the sender: ==sign → compress → encrypt → radix-64==.",
"Why sign before compressing: the signature stays valid for the uncompressed message, so it can be stored and checked without recompressing.",
"Key IDs: the least significant 64 bits of a public key.",
"Each user keeps a ==private key ring== and a ==public key ring==. Trust comes from the ==web of trust==, not a central CA."],
hook: "S-C-E-R: Smart Cats Eat Rice.",
trap: "Compression comes after signing but before encryption. Compressing first would make the signature depend on the compression algorithm; encrypting first would leave nothing to compress." },
{ t: "S/MIME", q: "List the four S/MIME functions.",
pts: [
"Security added to ==MIME== (Multipurpose Internet Mail Extensions), based on RSA technology.",
"Functions: ==enveloped data== (encrypted content plus encrypted keys), ==signed data== (signature then base64), ==clear-signed data== (only the signature is base64, so non-S/MIME readers can still read the text), ==signed and enveloped data==.",
"Uses ==X.509 v3 certificates==. That is the main difference from PGP's web of trust."] },
{ t: "IPsec: AH, ESP, transport and tunnel", q: "Compare AH and ESP, and transport and tunnel mode.", viz: "cns-ipsec",
pts: [
"IPsec secures traffic at the IP layer, so applications do not need to change. Uses: VPNs, remote access, router security.",
"==AH== (Authentication Header): integrity, data-origin authentication, anti-replay. Fields: next header, payload length, reserved, SPI, sequence number, ICV. ==No confidentiality==.",
"==ESP== (Encapsulating Security Payload): ==confidentiality== plus optional authentication. Fields: SPI, sequence number, payload, padding, pad length, next header, ICV.",
"==Transport mode== protects the payload (host to host). ==Tunnel mode== wraps the whole original packet in a new IP header (gateway to gateway, VPN).",
"==Security Association (SA)==: a one-way relationship identified by ==SPI, destination IP address and protocol (AH/ESP)==. Stored in the SAD; the SPD decides which traffic gets which SA."],
anchor: "AH is a wax seal: anyone can read the letter, but tampering shows. ESP is a locked box: nobody can read it. Transport mode locks the letter and keeps the original address on the envelope; tunnel mode puts the whole envelope, address and all, inside a new envelope addressed to the other office.",
write: ["IPsec services table (AH vs ESP)", "Transport and tunnel packet diagrams for both", "Header formats", "SA, SAD, SPD"] },
{ t: "Combining SAs and IKE", q: "Name the two ways to combine SAs and the two parts of IKE.",
pts: [
"Combining SAs (an SA bundle): ==transport adjacency== (several protocols on one packet without tunnelling) and ==iterated tunnelling== (tunnels inside tunnels).",
"==IKE== automates key management. It builds on ==Oakley== (an authenticated Diffie–Hellman exchange) and ==ISAKMP== (the message framework).",
"Oakley adds ==cookies== against clogging attacks, ==nonces== against replay, and authentication of the DH exchange against man-in-the-middle.",
"IKEv2: IKE_SA_INIT and IKE_AUTH set up the IKE SA and the first IPsec SA; CREATE_CHILD_SA adds more."] },
{ t: "Case studies", q: "Explain XSS and one other case study in a few lines each.",
pts: [
"==Secure multiparty calculation==: parties compute a joint result (for example an average salary) without revealing their own inputs.",
"==Virtual elections==: only authorised voters vote, each votes once, votes stay secret, and results can be verified. Uses blind signatures and a central tabulating facility.",
"==Single sign-on==: one login gives access to many systems (Kerberos, SAML, tokens). Convenient, but a single point of failure.",
"==Secure inter-branch payment==: branches transfer money with PKI, digital signatures, encrypted messages and timestamps against replay.",
"==Cross-site scripting (XSS)==: an attacker injects script into a trusted site, and it runs in other users' browsers (stealing cookies, for example). Types: stored, reflected, DOM-based. Prevent with input validation, output encoding, Content Security Policy and HttpOnly cookies."] }
],
long: [
{ q: "Explain how PGP works, with diagrams.", skel: ["Services table", "Authentication-only diagram", "Confidentiality-only diagram", "Both together", "Compression, radix-64 and key rings"] },
{ q: "Compare AH and ESP in transport and tunnel modes.", skel: ["IPsec architecture", "AH and ESP formats", "Transport vs tunnel diagrams", "Comparison table", "Security Associations"] },
{ q: "Explain IKE (Oakley and ISAKMP).", skel: ["Need for key management", "Oakley features", "ISAKMP role", "IKEv2 exchanges"] },
{ q: "Write short notes on XSS, single sign-on and virtual elections.", skel: ["Definition of each", "How it works (steps)", "Risks and prevention"] }
],
mcq: [
["In PGP, compression happens…", ["Before signing", "After signing, before encryption", "After encryption", "Never"], 1, "Sign → compress → encrypt → radix-64."],
["Which IPsec protocol gives confidentiality?", ["AH", "ESP", "IKE", "SAD"], 1, "AH gives only integrity and authentication."],
["An SA is identified by the SPI, destination IP and…", ["Port number", "Security protocol identifier", "MAC address", "TTL"], 1, "AH or ESP."],
["Which mode wraps the whole original IP packet?", ["Transport", "Tunnel", "Both", "Neither"], 1, "Tunnel mode adds a new outer IP header."],
["S/MIME trusts keys through…", ["Web of trust", "X.509 certificates", "Kerberos tickets", "Cookies"], 1, "PGP uses the web of trust."],
["Oakley uses cookies to stop…", ["Replay", "Clogging attacks", "XSS", "Traffic analysis"], 1, "Nonces stop replay."]
] }
],
mixups: [
{ a: "Passive attack", b: "Active attack", rows: [["What happens", "Opponent only listens or studies traffic", "Opponent changes, creates or blocks data"], ["Examples", "Release of contents, traffic analysis", "Masquerade, replay, modification, DoS"], ["Defence", "Prevent (encrypt)", "Detect and recover"]], tell: "If anything is modified, replayed or blocked, it is active.", quiz: [["Eve records a login and sends it again later.", 1], ["Eve only notes how often two servers talk.", 0], ["Eve floods the server so nobody can log in.", 1]] },
{ a: "Confusion", b: "Diffusion", rows: [["Hides", "The relation between key and ciphertext", "The statistics of the plaintext"], ["Achieved by", "Substitution (S-boxes)", "Permutation / mixing (P-box, MixColumns)"]], tell: "Confusion ↔ key, Diffusion ↔ data spread.", quiz: [["DES S-boxes mainly provide…", 0], ["AES ShiftRows and MixColumns mainly provide…", 1]] },
{ a: "DES", b: "AES", rows: [["Structure", "Feistel (half the block per round)", "SPN (whole State every round)"], ["Block / key", "64 / 56 bits", "128 / 128, 192 or 256 bits"], ["Rounds", "16", "10, 12 or 14"], ["Decryption", "Same structure, reversed subkeys", "Inverse operations needed"]], tell: "Two halves and a swap means DES (Feistel). A 4×4 byte State means AES.", quiz: [["Uses a 4×4 byte State.", 1], ["Has 8 S-boxes mapping 6 bits to 4.", 0], ["Decryption reuses the same structure with reversed keys.", 0]] },
{ a: "MAC", b: "Digital signature", rows: [["Key", "One shared secret key", "Private key signs, public key verifies"], ["Gives", "Integrity and authentication", "Integrity, authentication and non-repudiation"], ["Example", "HMAC, CMAC", "RSA, ElGamal, DSS"]], tell: "If the question says 'cannot deny', the answer is a signature.", quiz: [["The receiver could have created the tag too.", 0], ["A judge can verify it using a public key.", 1]] },
{ a: "AH", b: "ESP", rows: [["Confidentiality", "No", "Yes"], ["Integrity and authentication", "Yes (covers most of the IP header too)", "Optional (payload only, not the outer header)"], ["Analogy", "Wax seal", "Locked box"]], tell: "Need encryption? ESP. AH never encrypts.", quiz: [["A VPN must hide packet contents.", 1], ["Only proves the packet was not altered.", 0]] },
{ a: "Transport mode", b: "Tunnel mode", rows: [["Protects", "The IP payload", "The entire original IP packet"], ["New IP header", "No", "Yes"], ["Typical use", "Host to host", "Gateway to gateway (VPN)"]], tell: "A new outer IP header means tunnel mode.", quiz: [["Two office firewalls link their LANs.", 1], ["A laptop talks securely to one server, original header kept.", 0]] },
{ a: "PGP", b: "S/MIME", rows: [["Trust model", "Web of trust (users sign keys)", "X.509 certificates from CAs"], ["Used by", "Individuals, open source", "Organisations, mail clients"], ["Encoding", "Radix-64", "MIME types, base64"]], tell: "Web of trust means PGP. CA certificates mean S/MIME.", quiz: [["Keys are trusted because friends signed them.", 0], ["Built into enterprise mail with CA certificates.", 1]] },
{ a: "TGT", b: "Service ticket", rows: [["Issued by", "AS", "TGS"], ["Used to get", "Service tickets from the TGS", "Access to a specific server"], ["Lifetime", "Longer (for example a work day)", "Per service"]], tell: "Wristband vs ride ticket.", quiz: [["Shown to the file server.", 1], ["Received right after login.", 0]] }
],
last: [
"Goals: CIA plus Authentication, Non-repudiation, Access control. Passive: contents, traffic analysis. Active: masquerade, replay, modification, DoS.",
"Mechanisms: Every Dog Always Digs And Then Rolls Nearby.",
"Playfair: Right, Down, Corners. Hill: C = KP mod 26 (HELP → HIAT with [[3,3],[2,5]]). Caesar: C = (P + k) mod 26.",
"DES: 64-bit block, 56-bit key, 16 rounds, 8 S-boxes (6 → 4). AES: 128-bit block, 10/12/14 rounds, Sub-Shift-Mix-Add, no MixColumns in the last round.",
"IDEA: 64/128, 8 rounds + output transform, 52 subkeys. Blowfish: 64-bit block, 32–448-bit key. RC5-w/r/b. RC4: KSA + PRGA.",
"RSA: n = pq, φ = (p−1)(q−1), d = e⁻¹ mod φ. 17, 11, e = 7 → d = 23; M = 88 → C = 11.",
"DH: K = Y_B^X_A mod q. q = 23, α = 5, 6 and 15 → K = 2. Weak against man-in-the-middle.",
"SHA-512: 1024-bit blocks, pad to 896 mod 1024, 128-bit length, 80 rounds, 512-bit output.",
"HMAC = H[(K⁺⊕opad) ‖ H[(K⁺⊕ipad) ‖ M]], ipad 0x36, opad 0x5C.",
"ElGamal signature: S₁ = α^K mod q, S₂ = K⁻¹(m − X_A S₁) mod (q−1).",
"Kerberos: AS → TGT → TGS → service ticket → server. X.509 revocation via CRL.",
"SSL: Handshake (4 phases), Change Cipher Spec, Alert, Record. HTTPS 443, SSH 22.",
"802.11i: discovery, authentication, key management, data transfer, termination. PMK → PTK by the 4-way handshake.",
"PGP: Sign → Compress → Encrypt → Radix-64. AH has no encryption; ESP does. SA = (SPI, destination IP, protocol)."
]
};
