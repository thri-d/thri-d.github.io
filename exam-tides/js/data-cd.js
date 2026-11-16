/* Compiler Design — CS702PC (R22). Text: Aho, Lam, Sethi, Ullman, 2nd edition. */
DATA.cd = {
name: "Compiler Design", short: "CD", code: "CS702PC", mark: "tree",
units: [
{ u: 1, title: "Compiler structure and lexical analysis",
topics: [
{ t: "Structure of a compiler (phases)", q: "Name the phases in order and trace position = initial + rate * 60.", viz: "cd-phases",
pts: [
"Language processing system: ==preprocessor → compiler → assembler → linker/loader==.",
"Analysis (front end): ==lexical analysis → syntax analysis → semantic analysis → intermediate code generation==.",
"Synthesis (back end): ==machine-independent code optimisation → code generation==.",
"The ==symbol table== and the ==error handler== are shared by every phase.",
"Tokens for position = initial + rate * 60: ⟨id,1⟩ ⟨=⟩ ⟨id,2⟩ ⟨+⟩ ⟨id,3⟩ ⟨*⟩ ⟨60⟩.",
"Intermediate code: t1 = inttofloat(60); t2 = id3 * t1; t3 = id2 + t2; id1 = t3. After optimisation: t1 = id3 * 60.0; id1 = id2 + t1.",
"Compiler vs interpreter: a compiler translates the whole program first and runs faster; an interpreter runs statement by statement and gives better error diagnosis."],
hook: "Lazy Students Sometimes Invent Optimised Code: Lexical, Syntax, Semantic, Intermediate, Optimisation, Code generation.",
write: ["Phase diagram with symbol table and error handler", "One line per phase", "Trace position = initial + rate * 60 through every phase", "Front end vs back end; passes"] },
{ t: "Role of the lexical analyser", q: "Define token, lexeme and pattern with one example each.",
pts: [
"Reads characters, groups them into ==lexemes== and hands ==tokens== to the parser when it calls getNextToken.",
"==Token==: ⟨token name, attribute value⟩. ==Lexeme==: the actual characters, for example 'count'. ==Pattern==: the rule describing a token's lexemes, for example letter (letter | digit)*.",
"Also removes comments and whitespace, tracks line numbers for error messages, and may expand macros.",
"Why separate it from parsing: simpler design, better efficiency, better portability.",
"Lexical errors: ==panic mode== deletes characters until a valid token appears; other fixes delete, insert, replace or swap one character."],
anchor: "Pattern is the recipe, lexeme is the actual dish on the table, and the token is the label on the menu card (with the attribute pointing to the exact dish).",
trap: "The token name is an abstract symbol such as id; the lexeme is the concrete text such as rate." },
{ t: "Input buffering", q: "Explain the buffer pair with lexemeBegin, forward and sentinels.", viz: "cd-buffer",
pts: [
"==Buffer pair==: two halves of N characters each (N = one disk block), reloaded alternately.",
"Two pointers: ==lexemeBegin== marks the start of the current lexeme; ==forward== scans ahead until a pattern matches.",
"==Sentinels==: an eof character at the end of each half, so each character needs one test instead of two (end-of-buffer and character)."],
write: ["Buffer pair diagram with both pointers", "Lookahead code without sentinels", "Code with sentinels", "Why it is faster"] },
{ t: "Recognition of tokens and Lex", q: "Describe the three sections of a Lex program and how Lex resolves conflicts.",
pts: [
"Tokens are specified with regular expressions and recognised with ==transition diagrams== (relop, id, number, whitespace).",
"Keywords look like identifiers: install them in the symbol table first, or give them their own transition diagrams.",
"==Lex== program: declarations %% translation rules %% auxiliary functions.",
"Flow: lex.l → Lex compiler → lex.yy.c → C compiler → a.out (the lexer).",
"==yytext== holds the lexeme, ==yyleng== its length, ==yylval== the attribute value passed to the parser.",
"Conflicts: ==longest match== wins; for equal lengths, the ==rule listed first== wins."] },
{ t: "Finite automata and RE → DFA", q: "Build the DFA for (a|b)*abb using followpos.", viz: "cd-dfa",
pts: [
"==NFA==: can have ε-moves and several moves on one symbol. ==DFA==: exactly one move per symbol, no ε-moves.",
"==Thompson's construction==: RE → NFA, piece by piece for ε, a symbol, union, concatenation and star.",
"==Subset construction==: NFA → DFA using ε-closure(s), ε-closure(T) and move(T, a).",
"==Direct RE → DFA==: add # at the end, build the syntax tree, compute nullable, firstpos, lastpos and ==followpos==, then make states from followpos sets.",
"For (a|b)*abb#: followpos(1) = followpos(2) = {1,2,3}, followpos(3) = {4}, followpos(4) = {5}, followpos(5) = {6}. Start state {1,2,3}.",
"==DFA minimisation==: split states into accepting and non-accepting groups, then keep splitting groups that behave differently."],
write: ["Syntax tree for (a|b)*abb#", "nullable / firstpos / lastpos", "followpos table", "DFA states and transitions", "Final DFA diagram"] }
],
long: [
{ q: "Explain the phases of a compiler with an example.", skel: ["Diagram", "Each phase in two or three lines", "Trace one statement through every phase", "Symbol table and error handler"] },
{ q: "Explain input buffering with sentinels.", skel: ["Need for buffering", "Buffer pair diagram", "Pointers", "Code with sentinels"] },
{ q: "Construct a DFA directly from (a|b)*abb.", skel: ["Augmented RE and syntax tree", "nullable, firstpos, lastpos", "followpos", "DFA construction and diagram"] },
{ q: "Explain the structure of a Lex program with an example.", skel: ["Lex workflow", "Three sections", "Example rules", "yytext, yyleng, yylval", "Conflict resolution"] },
{ q: "Convert a given NFA to a DFA using subset construction.", skel: ["ε-closure of the start state", "move and ε-closure for each symbol", "Transition table of new states", "Mark final states", "Draw the DFA"] }
],
mcq: [
["Sentinels in input buffering reduce…", ["Buffer size", "Tests per character", "The number of tokens", "Symbol table size"], 1, "One eof test replaces two separate tests."],
["Which phase produces tokens?", ["Syntax analysis", "Lexical analysis", "Semantic analysis", "Code generation"], 1, ""],
["Two Lex rules match the same longest lexeme. Which wins?", ["The last one", "The first one", "Neither", "The shorter pattern"], 1, "Longest match first, then the earlier rule."],
["followpos is used for…", ["RE → DFA directly", "NFA → DFA", "DFA minimisation", "LL(1) parsing"], 0, ""],
["yytext holds…", ["The token name", "The current lexeme", "The line number", "The parser state"], 1, ""],
["Type checking happens in…", ["Lexical analysis", "Semantic analysis", "Code generation", "Linking"], 1, ""]
] },

{ u: 2, title: "Syntax analysis",
topics: [
{ t: "CFGs, derivations and ambiguity", q: "Show that E → E+E | E*E | id is ambiguous and fix it.",
pts: [
"A CFG has terminals, non-terminals, a start symbol and productions.",
"==Leftmost derivation== expands the leftmost non-terminal each time; ==rightmost== expands the rightmost.",
"==Ambiguous grammar==: some string has more than one parse tree (or more than one leftmost derivation).",
"E → E+E | E*E | id gives two trees for id+id*id.",
"Fix with precedence and associativity: E → E+T | T, T → T*F | F, F → (E) | id. The dangling-else problem is fixed by matching each else with the nearest unmatched then."] },
{ t: "Left recursion and left factoring", q: "Remove left recursion from E → E+T | T.",
pts: [
"Top-down parsers loop forever on left recursion, so it must be removed.",
"Rule: ==A → Aα | β becomes A → βA′, A′ → αA′ | ε==.",
"Left factoring: ==A → αβ₁ | αβ₂ becomes A → αA′, A′ → β₁ | β₂==.",
"Example: E → E+T | T becomes E → TE′, E′ → +TE′ | ε."],
anchor: "Left recursion is a person who says 'before I answer, let me first ask myself' forever. Moving the non-recursive part (β) to the front lets the parser start with something real.",
trap: "β (the part without A) moves to the front; α (what followed A) goes into the new A′ rule." },
{ t: "Top-down parsing: FIRST, FOLLOW, LL(1)", q: "Compute FIRST and FOLLOW for the expression grammar and fill the LL(1) table.", viz: "cd-ll1",
pts: [
"==Recursive descent==: one procedure per non-terminal, may backtrack. ==Predictive (LL(1))== parsing picks the production from one lookahead symbol, with no backtracking.",
"==FIRST(α)==: terminals that can start strings derived from α (plus ε if α can vanish).",
"==FOLLOW(A)==: terminals that can come right after A. Put $ in FOLLOW(start). For A → αBβ, add FIRST(β) − {ε} to FOLLOW(B). If β can vanish or B is last, add FOLLOW(A) to FOLLOW(B).",
"Table: for A → α, put it in M[A, a] for every a in FIRST(α). If ε ∈ FIRST(α), also put it in M[A, b] for every b in FOLLOW(A).",
"==LL(1)== means no table cell has two entries.",
"Expression grammar: FIRST(E) = FIRST(T) = FIRST(F) = {(, id}; FIRST(E′) = {+, ε}; FIRST(T′) = {*, ε}. FOLLOW(E) = FOLLOW(E′) = {), $}; FOLLOW(T) = FOLLOW(T′) = {+, ), $}; FOLLOW(F) = {+, *, ), $}.",
"Error recovery: panic mode with ==synch== entries taken from FOLLOW sets."],
hook: "LL(1): Left-to-right scan, Leftmost derivation, 1 symbol of lookahead. FOLLOW always contains $ for the start symbol." },
{ t: "Bottom-up parsing and shift-reduce", q: "Define a handle and the four shift-reduce actions.",
pts: [
"Builds the tree from the leaves up, tracing a ==rightmost derivation in reverse==.",
"==Handle==: a substring that matches a production body and whose reduction is one step back along the rightmost derivation. Reducing handles one by one is ==handle pruning==.",
"Actions: ==shift, reduce, accept, error==.",
"Conflicts: ==shift/reduce== and ==reduce/reduce==."] },
{ t: "LR parsing: SLR, CLR, LALR", q: "Build the SLR table for the expression grammar and parse id*id+id.", viz: "cd-slr",
pts: [
"==LR(0) item==: a production with a dot, for example E → E·+T. Build the canonical collection with ==closure== and ==goto==, starting from S′ → ·S.",
"==SLR==: in a state containing A → α·, reduce on every terminal in ==FOLLOW(A)==.",
"==CLR (canonical LR(1))==: items carry a lookahead, [A → α·β, a]. Reduce only on that lookahead. Most powerful, most states.",
"==LALR==: merge LR(1) states with the same core. Same number of states as SLR. Merging can create ==reduce/reduce== conflicts, never new shift/reduce ones.",
"Power: ==LR(0) < SLR < LALR < CLR==. YACC builds LALR parsers.",
"Ambiguous grammars can still be used by resolving conflicts with precedence and associativity."],
anchor: "SLR guesses when to reduce using FOLLOW (who can come after A anywhere). CLR remembers exactly who can come after A in this context. LALR keeps CLR's memory but packs identical-looking states into one box.",
write: ["Augment the grammar", "Item sets I0 … In with closure and goto", "DFA of item sets", "FOLLOW sets", "ACTION and GOTO table", "Parse a sample string on the stack"] },
{ t: "Parser generator YACC", q: "Give the YACC file structure and its default conflict rules.",
pts: [
"Spec: declarations %% translation rules %% supporting C routines.",
"Flow: translate.y → yacc → y.tab.c → cc → a.out.",
"%token declares tokens. ==%left== and ==%right== set associativity; later lines get higher precedence.",
"Defaults: shift/reduce → ==shift==; reduce/reduce → the production listed ==first==.",
"Gets tokens by calling yylex() (usually from Lex)."] }
],
long: [
{ q: "Compute FIRST and FOLLOW and construct the LL(1) table for the expression grammar.", skel: ["Remove left recursion", "FIRST sets", "FOLLOW sets", "Parsing table", "Parse id+id*id with the stack"] },
{ q: "Construct the SLR parsing table for E → E+T | T, T → T*F | F, F → (E) | id.", skel: ["Augmented grammar", "LR(0) items I0–I11", "goto DFA", "FOLLOW sets", "ACTION / GOTO table", "Parse id*id+id"] },
{ q: "Compare SLR, CLR and LALR parsers.", skel: ["Items used", "How reduce entries are filled", "Number of states", "Power and conflicts", "Comparison table"] },
{ q: "What is ambiguity? Eliminate left recursion and left factor a given grammar.", skel: ["Definition with two parse trees", "Removing ambiguity", "Left recursion rule and example", "Left factoring rule and example"] },
{ q: "Explain shift-reduce parsing and its conflicts.", skel: ["Handle and handle pruning", "Stack implementation with an example", "Shift/reduce and reduce/reduce conflicts", "Dangling-else example"] }
],
mcq: [
["A → Aα | β after removing left recursion:", ["A → αA′, A′ → βA′ | ε", "A → βA′, A′ → αA′ | ε", "A → βα", "A → A′β"], 1, ""],
["Most powerful LR parser:", ["SLR", "LALR", "CLR", "LR(0)"], 2, "Canonical LR(1)."],
["Merging LR(1) states in LALR can introduce…", ["shift/reduce conflicts", "reduce/reduce conflicts", "no conflicts", "ε-moves"], 1, ""],
["FOLLOW(F) in the expression grammar:", ["{+, *, ), $}", "{), $}", "{+, ), $}", "{(, id}"], 0, ""],
["YACC generates…", ["LL(1) parsers", "SLR parsers", "LALR parsers", "Recursive descent parsers"], 2, ""],
["Bottom-up parsing traces…", ["A leftmost derivation", "A rightmost derivation in reverse", "No derivation", "Both"], 1, ""],
["In the SLR table, state 2 on '*' is…", ["r2", "s7", "s6", "acc"], 1, "I2 has T → T·*F, so it shifts * (go to 7)."]
] },

{ u: 3, title: "Syntax-directed translation and intermediate code",
topics: [
{ t: "SDDs: synthesized and inherited attributes", q: "Define synthesized and inherited attributes, and S- vs L-attributed SDDs.",
pts: [
"An ==SDD== is a CFG with attributes and semantic rules.",
"==Synthesized==: computed from the children (and the node itself). ==Inherited==: computed from the parent, siblings and the node itself.",
"==S-attributed==: only synthesized attributes; evaluate bottom-up (postorder). Fits LR parsing.",
"==L-attributed==: inherited attributes depend only on the parent and siblings to the left. Evaluate in one left-to-right depth-first pass.",
"==Annotated parse tree==: shows attribute values at every node.",
"==Dependency graph==: edges show which attribute needs which. A topological sort gives an evaluation order; a cycle means there is none."],
anchor: "Synthesized attributes are like marks totalled from the students up to the class teacher (children → parent). Inherited attributes are instructions passed down from the principal or from the student sitting on your left.",
write: ["Definitions", "Desk calculator SDD (L → E n, E → E₁ + T, …)", "Annotated parse tree for 3 * 5 + 4 n", "Dependency graph and evaluation order"] },
{ t: "SDT schemes and their implementation", q: "What is a postfix SDT, and where do you put actions for inherited attributes?",
pts: [
"Main application: ==building syntax trees== with Node(op, left, right) and Leaf(id/num, entry).",
"An ==SDT scheme== puts semantic actions inside production bodies, for example E → E₁ + T { print('+') }.",
"==Postfix SDT==: every action sits at the right end of its production. Fits LR parsing; run the action on reduce.",
"Converting L-attributed SDD to SDT: put the action computing a non-terminal's inherited attribute ==just before== it; synthesized actions go at the end.",
"Ways to implement L-attributed SDDs: recursive descent (inherited attributes as parameters, synthesized as return values), on-the-fly code generation, LL parsers, or bottom-up with ==marker non-terminals==."] },
{ t: "Syntax trees, DAGs and three-address code", q: "Write quadruples, triples and indirect triples for a = b*-c + b*-c.", viz: "cd-3ac",
pts: [
"A ==DAG== is a syntax tree that ==shares common subexpressions==. For a + a*(b−c) + (b−c)*d, the nodes a and (b−c) are shared.",
"==Value-number method==: keep nodes in an array; reuse an existing node with the same ⟨op, left, right⟩ signature.",
"==Three-address code==: at most one operator on the right. Forms: x = y op z, x = op y, goto L, if x relop y goto L, param x, call p, n, x = y[i], x = &y.",
"a = b*−c + b*−c → t1 = minus c; t2 = b*t1; t3 = minus c; t4 = b*t3; t5 = t2+t4; a = t5.",
"==Quadruples==: op, arg1, arg2, result. ==Triples==: op, arg1, arg2 (results named by position). ==Indirect triples==: a list of pointers to triples, so optimisers can reorder freely.",
"==SSA==: every name is assigned exactly once; φ-functions merge values where control paths join."],
trap: "Triples have no result column. Moving a triple changes its position number and breaks every reference to it. Indirect triples fix that by reordering only the pointer list." },
{ t: "Building a DAG step by step", q: "Construct the DAG for a + a*(b−c) + (b−c)*d.", viz: "cd-dag",
pts: [
"Process the expression left to right, creating a node only if one with the same signature does not already exist.",
"Leaf a is created once and reused; leaves b and c are reused; the node (b−c) is found again and reused.",
"Result: 13 node requests but only 9 distinct nodes.",
"Inside a basic block the same DAG idea finds common subexpressions and dead code."] },
{ t: "Types, declarations and type checking", q: "Contrast structural and name equivalence, and coercion and casting.",
pts: [
"==Type expressions==: basic types, type names, and constructors (array, record, pointer, function).",
"Type equivalence: ==structural== (same structure) vs ==name== (same name).",
"Declarations: compute each type's ==width== and give each variable an ==offset== in the symbol table.",
"Type checking: ==type synthesis== (type of an expression from its parts) and ==type inference== (deduce types from how things are used).",
"Conversions: ==coercions== (implicit widening, for example int → float) inserted by the compiler; ==casts== are explicit. ==Overloading== resolves an operator by its operand types."] },
{ t: "Control flow, switch and procedures", q: "Draw the code layout for if-else and while using labels.",
pts: [
"Boolean expressions can be computed as values or translated into jumps (==short-circuit== code).",
"Short-circuit: in B₁ || B₂, if B₁ is true, jump to the true exit without testing B₂.",
"Flow of control: S → if (B) S₁ | if (B) S₁ else S₂ | while (B) S₁, using labels B.true, B.false and S.next.",
"==Backpatching== does this in one pass: makelist, merge and backpatch fill in jump targets once they are known.",
"Switch: a sequence of conditional gotos for few cases; a ==jump table== (or hash table) for many.",
"Procedure calls: param x₁ … param xₙ, then call p, n; return y."] }
],
long: [
{ q: "Differentiate S-attributed and L-attributed SDDs with examples.", skel: ["Definitions", "Example SDD for each", "Annotated parse tree", "Evaluation order and parser fit"] },
{ q: "Translate a = b*−c + b*−c into quadruples, triples and indirect triples.", skel: ["Three-address code", "Three tables", "Comparison"] },
{ q: "Construct the DAG for a + a*(b−c) + (b−c)*d and explain the value-number method.", skel: ["Node-by-node construction", "Final DAG", "Value-number array"] },
{ q: "Explain translation of flow-of-control statements.", skel: ["SDD with labels", "Code layout for if, if-else, while", "Example", "Backpatching"] },
{ q: "Explain type checking and type conversion.", skel: ["Type expressions", "Equivalence", "Synthesis vs inference", "Coercion, casting, overloading"] }
],
mcq: [
["An attribute computed from the children is…", ["Inherited", "Synthesized", "Lexical", "Static"], 1, ""],
["Which form lets statements be reordered easily?", ["Quadruples", "Triples", "Indirect triples", "Postfix"], 2, "Only the pointer list is reordered."],
["A DAG differs from a syntax tree because it…", ["Has no leaves", "Shares common subexpressions", "Cannot hold operators", "Is always binary"], 1, ""],
["S-attributed SDDs fit…", ["Bottom-up (LR) parsing", "Only recursive descent", "Lexical analysis", "Code optimisation"], 0, ""],
["In a = b*−c + b*−c, how many temporaries are used?", ["3", "4", "5", "6"], 2, "t1 to t5."],
["Implicit int → float conversion is called…", ["Casting", "Coercion", "Overloading", "Inference"], 1, ""]
] },

{ u: 4, title: "Run-time environments and code generation",
topics: [
{ t: "Storage organisation and stack allocation", q: "List the fields of an activation record from top to bottom.", viz: "cd-ar",
pts: [
"Memory layout: ==code, static data, heap, free memory, stack==. Heap and stack grow towards each other.",
"==Activation tree==: shows procedure calls. The ==control stack== holds activation records of calls still alive.",
"==Activation record== fields: actual parameters, returned values, ==control link== (to the caller's record), ==access link== (for non-local data), saved machine status, local data, temporaries.",
"Calling sequence: the caller evaluates parameters and saves the return address and old top_sp; the callee saves registers and initialises locals. The return sequence undoes this.",
"Variable-length data (arrays sized by a parameter) go on the stack after the fixed part, reached through pointers."],
hook: "Actually Rajesh Can Always Save Lunch Today: Actual params, Returned values, Control link, Access link, Saved status, Local data, Temporaries.",
write: ["Memory layout diagram", "Activation record with every field", "Calling and return sequences", "An activation tree (for example quicksort)"] },
{ t: "Access to non-local data", q: "Explain access links and displays with a nested-procedure example.", viz: "cd-ar",
pts: [
"Without nested procedures (C): a variable is local (on the stack) or global (static storage).",
"With nested procedures (Pascal, ML): use ==nesting depth==.",
"==Access links==: each record points to the record of its ==lexically enclosing== procedure. To reach a variable, follow (depth difference) links.",
"==Displays==: an array d where d[i] points to the most recent record at nesting depth i. Faster than following a chain."],
anchor: "Control link = who called me (my caller). Access link = where I live (the procedure I am written inside). They point to the same record only when the caller is also the enclosing procedure.",
trap: "Do not swap them: the control link follows the dynamic call chain; the access link follows the static nesting in the source code." },
{ t: "Heap management and garbage collection", q: "Compare reference counting with mark-and-sweep.",
pts: [
"The ==memory manager== allocates and frees chunks. Goals: space efficiency, program efficiency, low overhead.",
"==Fragmentation==: unusable holes between chunks. Strategies: best-fit, first-fit, next-fit, binning; coalesce neighbouring free chunks.",
"Manual freeing goes wrong in two ways: ==memory leaks== (never freed) and ==dangling pointers== (used after free).",
"==Garbage collection== reclaims objects not reachable from the ==root set==.",
"==Reference counting==: free an object when its count hits 0. Simple and incremental, but ==cannot free cycles== and costs work on every pointer update.",
"==Trace-based==: mark-and-sweep (mark reachable, sweep the rest), mark-and-compact (also slides live objects together), ==copying collector== (Cheney: copy live objects between two semispaces)."] },
{ t: "Code generation: issues, target language, addresses", q: "List the five design issues of a code generator.",
pts: [
"Design issues: ==input== to the code generator (IR plus symbol table), ==target program== (absolute, relocatable or assembly), ==instruction selection==, ==register allocation and assignment==, ==evaluation order==.",
"Target machine: LD, ST, ADD, SUB, MUL, BR and conditional branches. Addressing modes: register, indexed a(r), indirect *r, immediate #c.",
"Instruction cost = 1 + the costs of its addressing modes.",
"Addresses in target code: ==static allocation== (fixed at compile time) or ==stack allocation== (relative to SP)."] },
{ t: "Basic blocks, flow graphs and block optimisation", q: "State the three leader rules and what a block DAG lets you optimise.",
pts: [
"==Leaders==: (1) the first instruction; (2) any ==target of a jump==; (3) any instruction ==right after a jump==. A basic block runs from one leader up to the next.",
"==Flow graph==: blocks as nodes, with an edge B₁ → B₂ if B₂ can run right after B₁.",
"The DAG of a block enables ==local common subexpression elimination==, ==dead code elimination==, ==algebraic identities== (x + 0 = x, x * 1 = x), ==strength reduction== (x * 2 → x + x) and statement reordering.",
"Next-use and liveness information decide which registers can be reused."],
hook: "Leaders: First, Target, After-a-jump.",
write: ["Leader rules", "Mark the leaders in the given code", "Blocks and flow graph", "Loops, if asked"] },
{ t: "Simple code generator, peephole, registers, DP code generation", q: "Name six peephole optimisations with an example each.",
pts: [
"==Simple code generator==: register descriptors (what each register holds) and address descriptors (where each variable's current value is). getReg(I) picks registers.",
"==Peephole optimisation== looks at a small window of instructions: redundant load/store elimination, unreachable code removal, flow-of-control fixes (jumps to jumps), algebraic simplification, strength reduction, machine idioms (for example INC).",
"==Register allocation==: usage counts inside loops, or ==graph colouring== (interference graph coloured with k registers; spill if it fails).",
"==Dynamic programming code generation==: for an expression tree, compute the cheapest cost of each subtree with i registers available, then emit code from that table (contiguous evaluation)."],
hook: "Peephole six: Real Users Find Algebra Super Interesting (Redundant LD/ST, Unreachable, Flow of control, Algebraic, Strength reduction, Idioms)." }
],
long: [
{ q: "Explain the structure of an activation record and stack allocation.", skel: ["Storage layout", "Activation tree", "Record fields diagram", "Calling and return sequences"] },
{ q: "Partition the given code into basic blocks and draw the flow graph.", skel: ["Leader rules", "Find leaders", "Blocks", "Flow graph", "Loops"] },
{ q: "Explain peephole optimisation techniques with examples.", skel: ["Definition", "Six techniques with before/after code"] },
{ q: "Discuss the issues in the design of a code generator.", skel: ["Input", "Target program", "Instruction selection", "Register allocation", "Evaluation order"] },
{ q: "Explain heap management and garbage collection.", skel: ["Memory manager goals", "Fragmentation and fits", "Reference counting", "Mark-and-sweep, compact, copying"] }
],
mcq: [
["The control link points to…", ["The enclosing procedure's record", "The caller's activation record", "The heap", "The code segment"], 1, "The access link points to the enclosing scope."],
["Reference counting cannot reclaim…", ["Large objects", "Cyclic garbage", "Stack data", "Static data"], 1, ""],
["Which is a leader?", ["Any assignment", "The target of a jump", "The last instruction", "Every call"], 1, ""],
["Replacing x*2 with x+x is…", ["Code motion", "Strength reduction", "Constant folding", "Dead code elimination"], 1, ""],
["Cheney's algorithm is a…", ["Reference counter", "Copying collector", "Register allocator", "Peephole optimiser"], 1, ""],
["Graph colouring is used for…", ["Parsing", "Register allocation", "Type checking", "Lexing"], 1, ""]
] },

{ u: 5, title: "Machine-independent optimisation",
topics: [
{ t: "Principal sources of optimisation", q: "Name seven meaning-preserving transformations with a one-line example each.",
pts: [
"Every transformation must ==preserve the program's meaning==.",
"==Common subexpression elimination== (local within a block, global across blocks).",
"==Copy propagation==: after x = y, use y wherever x is used.",
"==Dead code elimination==: remove statements whose results are never used.",
"==Constant folding==: work out constant expressions at compile time.",
"==Code motion==: move loop-invariant computations out of the loop.",
"==Induction variables and strength reduction==: replace i * 4 inside a loop with a running addition.",
"The textbook shows all of these on a quicksort fragment."],
write: ["Name each transformation", "Before/after code for each", "Link to the flow graph example"] },
{ t: "Data-flow analysis", q: "Write the equations for reaching definitions, live variables and available expressions.", viz: "cd-dataflow",
pts: [
"Computes facts at the start (IN) and end (OUT) of each block using ==transfer functions== and a ==meet== operator.",
"==Reaching definitions== (forward, union): OUT[B] = gen[B] ∪ (IN[B] − kill[B]); IN[B] = ∪ OUT[P] over predecessors.",
"==Live variables== (backward, union): IN[B] = use[B] ∪ (OUT[B] − def[B]); OUT[B] = ∪ IN[S] over successors.",
"==Available expressions== (forward, intersection): OUT[B] = e_gen[B] ∪ (IN[B] − e_kill[B]); IN[B] = ∩ OUT[P].",
"Iterative algorithm: initialise, then keep recomputing IN and OUT until nothing changes."],
anchor: "Reaching definitions asks 'which past assignments can reach here?', so it looks back along the flow: forward analysis. Live variables asks 'will this value be used in the future?', so it starts from the end: backward analysis. Available expressions must hold on every path, so it uses intersection.",
hook: "Reaching: forward ∪. Live: backward ∪. Available: forward ∩ (all paths)." },
{ t: "Foundations of data-flow analysis", q: "Define a data-flow framework and relate MFP, MOP and the ideal solution.",
pts: [
"A ==framework==: a direction (forward or backward), a ==semilattice== of values with a meet operator ∧, and a family of transfer functions.",
"Meet must be ==idempotent, commutative and associative==. The semilattice has a top element ⊤.",
"Transfer functions should be ==monotone==; ==distributive== frameworks are better still.",
"The iterative algorithm converges if the framework is monotone and the lattice has finite height.",
"Precision: ==MFP ≤ MOP ≤ Ideal==. The iterative algorithm finds MFP; it equals MOP when the framework is distributive."] },
{ t: "Constant propagation", q: "Give the constant-propagation lattice and its meet rules.",
pts: [
"Each variable's value is ==UNDEF== (⊤), a ==constant c==, or ==NAC== (not a constant, ⊥).",
"Meet: UNDEF ∧ v = v; c ∧ c = c; c₁ ∧ c₂ = NAC if c₁ ≠ c₂; NAC ∧ v = NAC.",
"The framework is monotone but ==not distributive==, so the iterative answer can be less precise than MOP."] },
{ t: "Partial-redundancy elimination", q: "What makes an expression partially redundant, and how does PRE remove it?",
pts: [
"An expression is ==partially redundant== if it is already computed on some paths into a point but not on all.",
"PRE ==inserts the computation on the missing paths==, making it fully redundant and removable.",
"It covers ==global CSE== and ==loop-invariant code motion== as special cases.",
"==Lazy code motion== uses anticipated, available, postponable and used expressions to place computations as late as possible (less register pressure), without adding work on any path."] },
{ t: "Loops in flow graphs", q: "Find the dominators, back edges and natural loop of a flow graph.", viz: "cd-loops",
pts: [
"==Dominator==: d dom n if every path from the entry to n passes through d. Drawn as a ==dominator tree==.",
"Depth-first ordering classifies edges as advancing, retreating or cross.",
"==Back edge==: an edge a → b where ==b dominates a==.",
"==Reducible== flow graph: every retreating edge is a back edge. Structured programs always give one.",
"==Natural loop== of back edge n → d: d plus every node that can reach n without going through d. d is the ==header==.",
"Depth of a flow graph: the most retreating edges on any cycle-free path. It bounds the passes of the iterative algorithm."],
write: ["Dominator sets and tree", "Back edges", "Natural loops with headers", "Reducibility check"] }
],
long: [
{ q: "Explain the principal sources of optimisation with examples.", skel: ["Meaning-preserving transformations", "Each with an example", "Loop optimisations", "Quicksort example"] },
{ q: "Write the data-flow equations for reaching definitions and explain the iterative algorithm.", skel: ["gen and kill", "Equations", "Algorithm", "Small worked example"] },
{ q: "Find the dominators, back edges and natural loops of a given flow graph.", skel: ["Dominator sets", "Dominator tree", "Back edges", "Natural loops", "Reducibility"] },
{ q: "Explain constant propagation and partial-redundancy elimination.", skel: ["Lattice and meet", "Example", "PRE idea", "Lazy code motion steps"] }
],
mcq: [
["Live-variable analysis is…", ["Forward", "Backward", "Bidirectional", "Lexical"], 1, ""],
["Available expressions use the meet…", ["Union", "Intersection", "Difference", "Product"], 1, "It must be available on all paths."],
["Moving a loop-invariant computation out of the loop is…", ["Code motion", "Copy propagation", "Folding", "Peephole"], 0, ""],
["For a back edge a → b…", ["a dominates b", "b dominates a", "Neither dominates", "a = b always"], 1, ""],
["Constant propagation is not…", ["Monotone", "Distributive", "A forward problem", "Iterative"], 1, ""],
["NAC in constant propagation means…", ["Not a constant", "No assignment", "Null address", "Not analysed"], 0, ""]
] }
],
mixups: [
{ a: "Token", b: "Lexeme", rows: [["Is", "An abstract category with an attribute", "The actual characters in the source"], ["Example", "id", "rate"]], tell: "Lexeme is what you see in the program text; token is what the parser receives.", quiz: [["'position' in the source code", 1], ["⟨id, 1⟩ handed to the parser", 0]] },
{ a: "LL parsing", b: "LR parsing", rows: [["Builds tree", "Top-down", "Bottom-up"], ["Derivation", "Leftmost", "Rightmost, in reverse"], ["Left recursion", "Must be removed", "Handled fine"], ["Power", "Smaller class", "Larger class"]], tell: "If the question mentions handles, shift or reduce, it is LR.", quiz: [["Needs left recursion removed first.", 0], ["Reduces a handle on the stack.", 1], ["YACC generates this kind.", 1]] },
{ a: "SLR", b: "CLR / LALR", rows: [["Items", "LR(0)", "LR(1) with lookahead"], ["Reduce on", "All of FOLLOW(A)", "Only the item's lookahead"], ["States", "Few", "CLR many; LALR as few as SLR"]], tell: "FOLLOW sets mean SLR. Lookaheads inside items mean CLR or LALR.", quiz: [["Reduce entries come from FOLLOW sets.", 0], ["Items look like [A → α·β, a].", 1]] },
{ a: "Synthesized", b: "Inherited", rows: [["Value comes from", "Children", "Parent or left siblings"], ["Direction", "Up the tree", "Down or across"], ["SDD type", "S-attributed uses only these", "Allowed in L-attributed (left only)"]], tell: "Ask where the value comes from: below means synthesized; above or left means inherited.", quiz: [["E.val = E₁.val + T.val", 0], ["T′.inh = F.val (passed to the right)", 1]] },
{ a: "Control link", b: "Access link", rows: [["Points to", "The caller's record", "The lexically enclosing procedure's record"], ["Follows", "The run-time call chain", "The source code nesting"], ["Used for", "Returning", "Non-local variables"]], tell: "Control = who called me. Access = where I live.", quiz: [["Used to find a variable declared in an outer procedure.", 1], ["Restored when the procedure returns.", 0]] },
{ a: "Triples", b: "Indirect triples", rows: [["Columns", "op, arg1, arg2", "Same triples plus a pointer list"], ["Reordering", "Breaks references", "Reorder the pointer list only"]], tell: "If the question is about optimisers moving code, indirect triples win.", quiz: [["A list such as 35: (0), 36: (1)…", 1], ["Results referred to by their position, e.g. (2).", 0]] },
{ a: "Reaching definitions", b: "Live variables", rows: [["Direction", "Forward", "Backward"], ["Meet", "Union", "Union"], ["Question", "Which assignments can reach here?", "Will this variable be used later?"], ["Used for", "Constant propagation, use-def chains", "Register allocation, dead code"]], tell: "Past assignments mean forward. Future uses mean backward.", quiz: [["Helps decide if a register can be freed.", 1], ["IN[B] = ∪ OUT[pred]", 0]] },
{ a: "Reference counting", b: "Trace-based GC", rows: [["How", "Count pointers; free at zero", "Mark from roots, reclaim the rest"], ["Cycles", "Cannot free them", "Frees them"], ["Pauses", "Small, spread out", "Can pause the program"]], tell: "Cycles are the giveaway: reference counting fails on them.", quiz: [["Two objects pointing to each other are never freed.", 0], ["Starts from the root set.", 1]] }
],
last: [
"Phases: Lazy Students Sometimes Invent Optimised Code, plus the symbol table and error handler. Trace position = initial + rate * 60.",
"Token ⟨name, attribute⟩; lexeme = the text; pattern = the rule. Buffer pair with lexemeBegin, forward and eof sentinels.",
"Lex: declarations %% rules %% auxiliary; yytext, yyleng; longest match, then the first rule.",
"(a|b)*abb: followpos 1,2 → {1,2,3}; 3 → {4}; 4 → {5}; 5 → {6}. DFA states A = {1,2,3}, B = {1,2,3,4}, C = {1,2,3,5}, D = {1,2,3,6} (final).",
"Left recursion: A → Aα | β becomes A → βA′, A′ → αA′ | ε.",
"FOLLOW(E) = {), $}; FOLLOW(T) = {+, ), $}; FOLLOW(F) = {+, *, ), $}.",
"LR(0) < SLR < LALR < CLR. SLR reduces on FOLLOW; CLR on the lookahead; LALR merges same-core states (may add reduce/reduce only). YACC = LALR.",
"S-attributed: synthesized only, bottom-up. L-attributed: inherited only from the parent or left siblings.",
"Quadruples (op, a1, a2, result); triples (by position); indirect triples (pointer list).",
"Activation record: Actually Rajesh Can Always Save Lunch Today. Control link = caller; access link = enclosing scope.",
"Leaders: first, jump target, after a jump. Peephole: Real Users Find Algebra Super Interesting.",
"Reaching: forward ∪. Live: backward ∪. Available: forward ∩. Back edge a → b with b dom a; natural loop = header + nodes reaching the tail."
]
};
