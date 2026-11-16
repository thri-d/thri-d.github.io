/* Agile Methodology — CS752PE (R22). Text: Shore and Warden, The Art of Agile Development. */
DATA.agile = {
name: "Agile Methodology", short: "Agile", code: "CS752PE", mark: "loop",
units: [
{ u: 1, title: "Why Agile, XP, and the Thinking practices",
topics: [
{ t: "Why Agile? Understanding success", q: "Name the three kinds of success and explain why on time and on budget is not enough.",
pts: [
"Traditional success: ==on time, on budget, as specified==. Many projects meet all three and still deliver little value.",
"Shore and Warden: success has three parts: ==organisational== (delivers value: revenue, savings, market share), ==technical== (code is maintainable and works well), ==personal== (team members are satisfied and grow).",
"'Beyond deadlines': hitting a date is not the goal; delivering value is.",
"Organisational success matters most because it is why the project is funded. Agile improves it by delivering valuable features early and often and acting on feedback."],
hook: "Success has three layers: the company wins, the code is clean, the people grow." },
{ t: "The Agile Manifesto and its principles", q: "State the four values word for word and five of the twelve principles.", viz: "ag-manifesto",
pts: [
"==Individuals and interactions== over processes and tools.",
"==Working software== over comprehensive documentation.",
"==Customer collaboration== over contract negotiation.",
"==Responding to change== over following a plan.",
"The items on the right still have value; the items on the left are valued more.",
"Twelve principles in short: satisfy the customer through early and continuous delivery; welcome changing requirements; deliver working software frequently (weeks, not months); business people and developers work together daily; build projects around motivated people; face-to-face conversation; working software is the main measure of progress; sustainable pace; technical excellence and good design; simplicity (maximise work not done); self-organising teams; regular reflection and adjustment."],
hook: "Values in order: I Will Code Right (Individuals, Working software, Customer collaboration, Responding to change).",
trap: "The manifesto does not say documentation or plans are useless. It says the left side is valued more." },
{ t: "Agile methods: Scrum and XP", q: "Give Scrum's 3 roles, 3 artifacts and 5 events.", viz: "ag-scrum",
pts: [
"==Scrum== (3-3-5): roles: ==Product Owner, Scrum Master, Development Team==; artifacts: ==Product Backlog, Sprint Backlog, Increment==; events: ==Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective==.",
"==XP (Extreme Programming)==: a set of engineering and team practices: pair programming, TDD, continuous integration, refactoring, collective ownership, short iterations.",
"Scrum focuses on managing the work; XP adds strong technical practices. Teams often combine them."] },
{ t: "Understanding XP: life cycle, team, concepts", q: "Describe the XP life cycle and list the XP team roles.", viz: "ag-xpmap",
pts: [
"XP life cycle (Shore): XP teams do ==every activity at the same time, in every iteration==: planning, analysis, design and coding, testing, deployment.",
"Beck's classic XP phases (also asked in exams): ==exploration → planning → iterations to release → productionising → maintenance → death==.",
"XP team: ==on-site customers== (product manager, domain experts, interaction designers, business analysts), ==programmers== (including designers, architects and specialists), ==testers==, ==coaches== (programmer-coach, project manager) and other members. The whole team sits together.",
"XP concepts: refactoring, technical debt, timeboxing, the last responsible moment, stories, iterations, velocity, theory of constraints, mindfulness."],
write: ["Diagram of overlapping activities per iteration", "Classic phase list", "Team roles table", "Key concepts, one line each"] },
{ t: "Adopting XP", q: "Give the six prerequisites for adopting XP.",
pts: [
"Is XP right for us? Prerequisites: ==management support, team agreement, a colocated team, on-site customers, the right team size, using all the practices==.",
"Recommendations: a brand-new codebase, strong design skills, a language that is easy to refactor, an experienced programmer-coach, a friendly and cohesive team.",
"Implementing XP: set up the workspace, gather the whole team, start iterating. Bringing XP to an existing project is harder; pay down technical debt gradually.",
"Assessing agility: a self-assessment across thinking, collaborating, releasing, planning and developing."] },
{ t: "Practising XP: Thinking", q: "Explain pair programming, energized work, informative workspace, root-cause analysis and retrospectives.",
pts: [
"==Pair programming==: two programmers at one computer. The ==driver== types; the ==navigator== reviews and thinks ahead. Swap roles often and rotate pairs. Fewer bugs, shared knowledge, better design, better focus.",
"==Energized work==: a ==sustainable pace== (about 40-hour weeks). Tired people make mistakes.",
"==Informative workspace==: big visible charts, task boards, burn-up charts and build status, so anyone can see progress at a glance.",
"==Root-cause analysis==: ask 'why' repeatedly (==five whys==) and fix the process, not just the symptom.",
"==Retrospectives==: at the end of each iteration the team reflects and improves: read the Prime Directive, brainstorm, group ideas (mute mapping), choose one retrospective objective."],
anchor: "Pair programming is a rally car: the driver handles the road right now; the navigator reads the map and warns about the next bend.",
write: ["Each practice: definition", "How it is done", "Benefits", "Objections and answers (for pairing)"] }
],
long: [
{ q: "Explain the Agile Manifesto and the principles of the agile process.", skel: ["Background", "Four values explained", "Twelve principles", "Benefits"] },
{ q: "Explain the XP life cycle and the XP team.", skel: ["Overlapping activities diagram", "Classic phases", "Team roles", "XP concepts"] },
{ q: "Explain pair programming, energized work, informative workspace and retrospectives.", skel: ["Each: definition, practice, benefits", "Sketch of a pairing station or task board"] },
{ q: "Compare Scrum and XP.", skel: ["Scrum roles, artifacts, events", "XP practices", "Comparison table", "Using both together"] },
{ q: "How do you decide whether XP suits a project, and how do you adopt it?", skel: ["Prerequisites", "Recommendations", "Implementing XP", "Assessing agility"] }
],
mcq: [
["'Working software over…'", ["Processes and tools", "Comprehensive documentation", "Contract negotiation", "Following a plan"], 1, ""],
["In pair programming, the one reviewing and thinking ahead is the…", ["Driver", "Navigator", "Coach", "Tester"], 1, ""],
["Asking 'why' repeatedly to find the real cause is…", ["A retrospective", "Root-cause analysis", "A spike", "A stand-up"], 1, ""],
["Which is NOT a Scrum role?", ["Product Owner", "Scrum Master", "Development Team", "Navigator"], 3, ""],
["Energized work means…", ["Overtime before deadlines", "A sustainable pace", "Daily meetings", "Pair rotation"], 1, ""],
["How many values are in the Agile Manifesto?", ["3", "4", "5", "12"], 1, "Four values, twelve principles."]
] },

{ u: 2, title: "Collaborating",
topics: [
{ t: "Trust", q: "List team and organisational strategies for building trust.",
pts: [
"Team strategies: ==customer–programmer empathy==, ==programmer–tester empathy==, ==eat together==, ==team continuity== (keep good teams together).",
"Organisational strategies: ==show some hustle==, deliver on commitments, manage problems openly, respect customer goals, promote the team, be honest."] },
{ t: "Sit together", q: "What is osmotic communication and why does sitting together help?",
pts: [
"The whole team, on-site customers included, shares ==one open workspace==.",
"==Osmotic communication==: people pick up useful information just by overhearing. Questions get answered in seconds, not days.",
"Making it work: a team-only space, pairing stations, whiteboards, quiet areas, and handling worries about noise and privacy."] },
{ t: "Real customer involvement", q: "How does customer involvement differ across five kinds of projects?",
pts: [
"Real customers (people who will use or pay for the software) tell the team what is valuable.",
"By project type: ==personal development== (you are the customer), ==in-house custom development== (bring real users in), ==outsourced custom development== (the client's representatives on site), ==vertical-market software== (representative customers or an advisory group), ==horizontal-market software== (product managers and user research)."] },
{ t: "Ubiquitous language and coding standards", q: "Define ubiquitous language and say how a team agrees coding standards.",
pts: [
"==Ubiquitous language==: the team uses the ==domain's own terms== in conversation, documents and code, so nothing gets lost in translation.",
"==Coding standards==: an agreement on formatting and practices that supports collective ownership. Start with the minimum everyone accepts, keep it short, and do not fight over small style points."] },
{ t: "Stand-up meetings", q: "What three questions does each person answer in a stand-up?",
pts: [
"A short daily meeting (usually 5–10 minutes, ==under 15==) where everyone stands, to keep it brief.",
"Each person answers: ==What did I do yesterday? What will I do today? What is blocking me?==",
"It is for coordination, not problem-solving. Take deeper discussions offline afterwards."],
hook: "Yesterday, today, blockers. Standing keeps it short." },
{ t: "Iteration demo and reporting", q: "Why demo every iteration? Which reports should a team avoid?",
pts: [
"==Iteration demo==: at the end of each iteration, show ==real working ('done done') software== to stakeholders. Keeps the team honest, brings feedback, builds trust.",
"==Progress reports==: vision statement, weekly demo, release and iteration plans, ==burn-up chart==. ==Management reports==: productivity, throughput, defects, time usage.",
"==Reports to avoid==: source lines of code, number of stories, ==velocity used as productivity==, code quality metrics used to judge people. They are easily gamed or misread."] }
],
long: [
{ q: "Explain stand-up meetings and iteration demos.", skel: ["Purpose", "Format and rules", "Benefits", "Common mistakes"] },
{ q: "How do agile teams build trust and involve real customers?", skel: ["Team strategies", "Organisational strategies", "Customer involvement by project type"] },
{ q: "Write short notes on ubiquitous language, sitting together and coding standards.", skel: ["Definition", "Practice", "Benefits of each"] },
{ q: "Explain reporting in an agile project.", skel: ["Progress reports", "Management reports", "Reports to avoid and why"] }
],
mcq: [
["Typical upper limit for a stand-up:", ["2 minutes", "About 15 minutes", "1 hour", "Half a day"], 1, ""],
["Using domain terms in code and conversation is…", ["A coding standard", "Ubiquitous language", "Refactoring", "A spike"], 1, ""],
["Which report is discouraged as a productivity measure?", ["Burn-up chart", "Lines of code", "Iteration demo", "Release plan"], 1, ""],
["Picking up information by overhearing teammates is…", ["Osmotic communication", "Pairing", "Reporting", "Mute mapping"], 0, ""],
["For horizontal-market software, the customer voice usually comes from…", ["The developers", "Product managers and user research", "Testers", "Auditors"], 1, ""]
] },

{ u: 3, title: "Releasing",
topics: [
{ t: "'Done done' and no bugs", q: "List what 'done done' includes and five ways to get close to zero bugs.",
pts: [
"A story is ==done done== when it is tested, coded, designed (refactored), integrated, builds, installs, migrates, reviewed, fixed and ==accepted== by the customer, i.e. ready to ship.",
"Aim for nearly zero bugs: ==write fewer bugs== (TDD, pairing, energized work); ==eliminate bug breeding grounds== (pay down technical debt); ==fix bugs now==; ==test your process== (exploratory testing); ==fix your process== (root-cause analysis)."] },
{ t: "Version control", q: "Define repository, sandbox, commit, tag and branch. What rule must the repository always meet?",
pts: [
"Concepts: ==repository==, ==sandbox== (working copy), check out, update, ==commit== (check in), revert, ==tag==, ==branch==, merge.",
"Optimistic (merge-based) concurrency is preferred over pessimistic locking.",
"Keep ==everything== in version control: code, tests, build scripts, documentation, configuration.",
"The repository must always be ==ready to ship==. Never commit broken code; avoid long-lived branches; keep a single codebase."] },
{ t: "Ten-minute build", q: "What does a ten-minute build do, and what if it takes longer?",
pts: [
"==One command== builds and tests the whole product from scratch in ==10 minutes or less==.",
"Automate everything: compile, run tests, package, even build an installer.",
"Too slow? Profile and speed it up, or split it into a fast commit build plus slower ==multistage== builds.",
"A fast build is what makes continuous integration practical."] },
{ t: "Continuous integration", q: "Explain the integration cycle, the integration token and the golden rule.", viz: "ag-ci",
pts: [
"==Integrate and build the whole system frequently==: every few hours, at least daily.",
"==Synchronous integration==: wait for the build and tests to pass before moving on. ==Asynchronous==: a CI server builds after each commit.",
"==Integration token==: only the person holding it integrates at that moment.",
"Golden rule: ==never break the build==; if it breaks, fixing it comes first.",
"Benefits: problems are found early while they are small, and the code is always releasable."],
write: ["Definition", "Steps of one integration cycle", "Synchronous vs asynchronous", "Integration token", "Benefits"] },
{ t: "Collective code ownership and documentation", q: "What is collective ownership, and which kinds of documentation does XP keep?",
pts: [
"==Collective code ownership==: everyone is responsible for ==all== the code. Anyone can improve any part; there are no personal territories.",
"Benefits: shared knowledge, no bottlenecks, better quality. Supported by pairing, coding standards and tests.",
"Documentation: ==work-in-progress== documents are mostly replaced by conversation and tests; ==product documentation== (manuals, help) is planned as stories; ==handoff documentation== is written before the team leaves a project."] }
],
long: [
{ q: "Explain the ten-minute build and continuous integration.", skel: ["Ten-minute build: definition and automation", "Speeding up a slow build", "CI cycle and integration token", "Benefits"] },
{ q: "How do agile teams achieve bug-free releases?", skel: ["'Done done' checklist", "Writing fewer bugs", "Eliminating breeding grounds", "Fixing bugs now", "Fixing the process"] },
{ q: "Explain version control, collective code ownership and documentation in XP.", skel: ["Version control concepts and rules", "Collective ownership benefits", "Kinds of documentation"] }
],
mcq: [
["Target time for an XP build:", ["1 minute", "10 minutes", "1 hour", "1 day"], 1, ""],
["Only one person integrates at a time by holding…", ["A branch", "An integration token", "A tag", "A spike"], 1, ""],
["'Everyone is responsible for all code' is…", ["Pair programming", "Collective code ownership", "A coding standard", "Refactoring"], 1, ""],
["'Done done' finally requires the story to be…", ["Estimated", "Accepted by the customer", "Assigned", "Branched"], 1, ""],
["Your working copy of the code is called the…", ["Repository", "Sandbox", "Tag", "Token"], 1, ""]
] },

{ u: 4, title: "Planning",
topics: [
{ t: "Vision and release planning", q: "Contrast scopeboxed and timeboxed releases and define an MMF.",
pts: [
"==Vision==: why the project matters, what success looks like, and who the product champion is, captured in a short vision statement.",
"==Release planning==: one project at a time; ==release early and often==; build ==Minimum Marketable Features (MMFs)==; adapt plans with feedback; keep options open.",
"==Scopeboxed== release: fixed scope, flexible date. ==Timeboxed== release: fixed date, flexible scope.",
"Plan at the ==last responsible moment==, with planning horizons: detail near-term work, keep long-term plans coarse."] },
{ t: "The planning game", q: "Who contributes what in the planning game, and what are its steps?", viz: "ag-planning",
pts: [
"==Customers know value; programmers know cost.== The planning game combines both.",
"Steps: ==anyone creates stories → programmers estimate → customers prioritise== by value and cost → repeat until the plan is good enough.",
"Result: a release plan that delivers the most value for the cost."],
hook: "Customers own value. Programmers own cost." },
{ t: "Risk management", q: "How do agile teams plan for risk?",
pts: [
"==Generic risk multipliers== stretch estimates for risks every project has, at different confidence levels (for example a 10%, 50% or 90% chance of meeting a date).",
"==Project-specific risks==: hold a ==risk census==, write each risk down, estimate its impact.",
"Plan with a ==risk-adjusted burn-up chart== and give dates as ranges, not a single promise.",
"For each risk: avoid, contain, mitigate or accept."] },
{ t: "Iteration planning, velocity and slack", q: "Define velocity and slack, and list the iteration planning steps.", viz: "ag-velocity",
pts: [
"An ==iteration== is a fixed timebox (Shore recommends ==one week==): demo → retrospective → plan the next iteration.",
"==Velocity== = story points completed in the previous iteration. It decides how many stories fit in the next one.",
"Steps: measure velocity → choose stories → brainstorm engineering tasks → estimate tasks → ==commit== as a team.",
"==Slack==: plan below full capacity (research time, paying down technical debt) so commitments are met reliably. Never get slack by working overtime."],
trap: "Velocity measures how much this team finishes per iteration. It is not a productivity score to compare teams." },
{ t: "Stories and estimating", q: "Define a story and expand INVEST.",
pts: [
"A ==story== is a small, customer-valued piece of functionality on an index card: 'a reminder to have a conversation'.",
"Good stories follow ==INVEST==: Independent, Negotiable, Valuable, Estimable, Small, Testable (Bill Wake's checklist, widely used).",
"Special stories: documentation, non-functional (for example performance), bug, ==spike==.",
"Estimating: programmers estimate in ==story points== or ideal days. Consistency matters more than accuracy because velocity corrects for bias. Re-estimate when you learn more."] }
],
long: [
{ q: "Explain the planning game and release planning.", skel: ["Value vs cost", "Planning game steps", "Release planning: MMFs, release often", "Scopeboxed vs timeboxed"] },
{ q: "Explain iteration planning, velocity and slack.", skel: ["Iteration timebox", "Velocity calculation", "Planning steps", "Slack and why it matters"] },
{ q: "Explain risk management in agile projects.", skel: ["Generic risks and multipliers", "Project-specific risks", "Risk-adjusted burn-up", "Mitigation"] },
{ q: "What are stories? Explain how agile teams estimate.", skel: ["Story definition and INVEST", "Special stories", "Estimating approach", "Link to velocity"] }
],
mcq: [
["In the planning game, customers mainly decide…", ["Cost", "Priority / value", "Code design", "Test tools"], 1, ""],
["The 'S' in INVEST stands for…", ["Simple", "Small", "Sprint", "Scope"], 1, ""],
["Velocity is…", ["Lines of code per day", "Story points completed per iteration", "Number of commits", "Bugs fixed"], 1, ""],
["Planning below full capacity to protect commitments is…", ["A spike", "Slack", "Refactoring", "An MMF"], 1, ""],
["A release with a fixed date and flexible scope is…", ["Scopeboxed", "Timeboxed", "Risk-adjusted", "Vertical"], 1, ""],
["Shore's recommended iteration length:", ["One day", "One week", "One month", "One quarter"], 1, ""]
] },

{ u: 5, title: "Developing",
topics: [
{ t: "Incremental requirements and customer tests", q: "How are requirements handled incrementally, and what are customer tests?",
pts: [
"==Incremental requirements==: on-site customers keep requirements up to date and work them out just in time: ==vision → features → details → customer tests==.",
"==Customer tests==: concrete examples of business rules written with customers. Process: ==describe → demonstrate (with examples) → develop==.",
"Tools such as Fit / FitNesse turn customer examples into automated tests."] },
{ t: "Test-driven development", q: "Describe the TDD cycle with a small example.", viz: "ag-tdd",
pts: [
"Cycle: ==Red== (write a small failing test) → ==Green== (write just enough code to pass) → ==Refactor== (clean up while tests stay green).",
"Work in tiny steps, every few minutes.",
"Benefits: fewer bugs, testable design, a safety net for refactoring, tests that document behaviour.",
"Kinds of tests: unit tests, focused integration tests, end-to-end tests (used sparingly)."],
hook: "Red, Green, Refactor. Never write production code without a failing test first." },
{ t: "Refactoring", q: "Define refactoring and name six code smells.",
pts: [
"==Changing the design of code without changing its behaviour==, in small, safe steps backed by tests.",
"Code smells (Shore): ==divergent change and shotgun surgery==, ==primitive obsession and data clumps==, ==data class and wannabe static class==, ==coddling nulls==, ==time dependencies and half-baked objects==; plus duplication and long methods.",
"Refactor continuously: many small improvements replace one big redesign."],
trap: "Refactoring never adds features. If behaviour changes, it is not refactoring." },
{ t: "Simple and incremental design and architecture", q: "Explain YAGNI and incremental design.",
pts: [
"==Simple design==: ==YAGNI== (You Aren't Gonna Need It), ==Once and Only Once== (no duplication), self-documenting code, isolate third-party components, limit published interfaces, fail fast.",
"==Incremental design==: design continuously at the method, class and architecture levels as the code grows.",
"==Incremental architecture==: start simple and evolve; use risk-driven architecture to tackle the riskiest parts early."] },
{ t: "Spike solutions and performance optimisation", q: "What is a spike? How should performance be optimised?",
pts: [
"==Spike==: a small, ==timeboxed experiment== that answers one technical question. The code is usually thrown away.",
"==Performance optimisation==: ==measure first==, write a performance story with a clear target, profile, then fix only the real bottleneck.",
"Avoid premature optimisation; keep the design clean."] },
{ t: "Exploratory testing", q: "Explain exploratory testing and its four tools.",
pts: [
"==Simultaneous learning, test design and test execution== by a skilled tester. It finds the bugs the other practices missed.",
"Tools: ==charters== (a goal for one session), ==observation==, ==notetaking==, ==heuristics== (none-some-all; zero-one-many; beginning-middle-end; too big-too small-just right).",
"What it finds feeds root-cause analysis and new automated tests."] }
],
long: [
{ q: "Explain test-driven development with an example.", skel: ["Definition", "Red-Green-Refactor diagram", "Small worked example", "Benefits and kinds of tests"] },
{ q: "What is refactoring? Explain common code smells.", skel: ["Definition", "When and how", "Six to eight smells, one line each", "Link with TDD"] },
{ q: "Explain spike solutions, incremental design and exploratory testing.", skel: ["Each: definition, how, benefit", "Continuous design levels"] },
{ q: "Explain incremental requirements and customer tests.", skel: ["Living requirements", "On-site customer role", "Describe, demonstrate, develop", "Fit / FitNesse"] }
],
mcq: [
["The TDD cycle is…", ["Green → Red → Refactor", "Red → Green → Refactor", "Refactor → Red → Green", "Code → Test → Deploy"], 1, ""],
["A timeboxed experiment to answer a technical question is a…", ["Story", "Spike", "Slack", "Demo"], 1, ""],
["Refactoring changes…", ["Behaviour", "Design, not behaviour", "Requirements", "Tests only"], 1, ""],
["YAGNI stands for…", ["You Aren't Gonna Need It", "Yet Another Generic Integration", "Your Agile Goal Now Is", "None of these"], 0, ""],
["The first rule of performance optimisation:", ["Optimise early", "Measure first", "Rewrite in C", "Add caches everywhere"], 1, ""],
["Exploratory testing sessions are guided by…", ["Charters", "Contracts", "Tokens", "Backlogs"], 0, ""]
] }
],
mixups: [
{ a: "Scrum", b: "XP", rows: [["Focus", "Managing the work", "Engineering practices"], ["Cycle", "Sprint (often 2–4 weeks)", "Iteration (Shore: 1 week)"], ["Signature items", "Product Owner, Scrum Master, backlog", "Pairing, TDD, CI, refactoring"]], tell: "Code-level practices mean XP; roles, backlogs and ceremonies mean Scrum.", quiz: [["Has a Scrum Master who removes impediments.", 0], ["Programmers write tests before code.", 1]] },
{ a: "Iteration demo", b: "Retrospective", rows: [["Looks at", "The product", "The process"], ["Audience", "Stakeholders", "The team"], ["Question", "What did we build?", "How can we work better?"]], tell: "Product means demo. Process means retrospective.", quiz: [["Customers see the new features working.", 0], ["The team picks one thing to improve.", 1]] },
{ a: "Release planning", b: "Iteration planning", rows: [["Horizon", "Months, whole release", "One iteration (a week)"], ["Unit", "Stories and MMFs", "Engineering tasks"], ["Main tool", "Planning game", "Velocity and commitment"]], tell: "Tasks and velocity mean iteration planning.", quiz: [["Brainstorm and estimate engineering tasks.", 1], ["Decide which MMFs go in the next release.", 0]] },
{ a: "Spike", b: "Story", rows: [["Purpose", "Answer a technical question", "Deliver customer value"], ["Output", "Knowledge (code thrown away)", "Working, shippable feature"]], tell: "If the code is thrown away, it was a spike.", quiz: [["Try three charting libraries for one day.", 0], ["'As a user, I can reset my password.'", 1]] },
{ a: "TDD", b: "Customer tests", rows: [["Written by", "Programmers", "Customers with programmers"], ["Checks", "That code works as programmers intend", "That business rules are right"], ["Size", "Tiny unit tests", "Business examples"]], tell: "Business rules and examples mean customer tests.", quiz: [["Red, Green, Refactor every few minutes.", 0], ["Examples of tax rules agreed with the domain expert.", 1]] },
{ a: "Scopeboxed", b: "Timeboxed", rows: [["Fixed", "Scope", "Date"], ["Flexible", "Date", "Scope"]], tell: "Ask what is fixed.", quiz: [["The release must ship on 1 March, whatever is ready.", 1], ["All five features must ship, whenever that is.", 0]] },
{ a: "Refactoring", b: "Rewriting", rows: [["Behaviour", "Unchanged", "May change"], ["Steps", "Small, tested, continuous", "Large, risky"]], tell: "Small behaviour-preserving steps mean refactoring.", quiz: [["Rename a method and extract a class, tests still green.", 0], ["Throw away the module and start again.", 1]] }
],
last: [
"Manifesto (I Will Code Right): Individuals and interactions > processes and tools; Working software > documentation; Customer collaboration > contract negotiation; Responding to change > following a plan.",
"Success = organisational + technical + personal.",
"Scrum 3-3-5: PO, SM, Dev Team | Product Backlog, Sprint Backlog, Increment | Sprint, Planning, Daily Scrum, Review, Retrospective.",
"XP life cycle: every activity in every iteration. Classic: exploration → planning → iterations → productionising → maintenance → death.",
"Units follow Shore's chapters: Thinking, Collaborating, Releasing, Planning, Developing.",
"Thinking: pair programming (driver/navigator), energized work, informative workspace, root-cause analysis (five whys), retrospectives.",
"Collaborating: trust, sit together, real customer involvement, ubiquitous language, stand-ups (yesterday / today / blockers), coding standards, iteration demo, reporting.",
"Releasing: done done, no bugs, version control, ten-minute build, CI (integration token; never break the build), collective ownership, documentation.",
"Planning: vision, release planning (MMFs), planning game (customers = value, programmers = cost), risk management, iteration planning (velocity), slack, stories (INVEST), estimating.",
"Developing: incremental requirements, customer tests, TDD (Red → Green → Refactor), refactoring (code smells), simple and incremental design (YAGNI), spikes, performance (measure first), exploratory testing (charters, heuristics)."
]
};

/* Applied Environmental Biology — Open Elective II. Content in preparation. */
DATA.bio = {
name: "Applied Environmental Biology", short: "Bio", code: "Open Elective II", mark: "leaf", soon: true,
outline: [
["Microbial energetics and diversity", "Stoichiometry and bioenergetics, oxidation-reduction, NAD, energy-rich compounds and energy storage, mathematics of microbial growth, glycolysis, citric acid cycle, catabolic alternatives: phototrophy, chemolithotrophy, anaerobic respiration (nitrate and sulfate reduction, acetogenesis, methanogenesis, metal, chlorate and organic electron acceptors)."],
["Microbial ecosystems", "Populations, guilds and communities; environments and microenvironments; microbial growth on surfaces; environmental effects on growth; environmental genomics and microbial ecology; genetic exchange: horizontal and vertical gene transfer (replication, transformation, transduction); applications of environmental microbes."],
["Investigations in environmental microbiology", "Sampling, detection, isolation, taxonomic and functional annotation, quantification; introductory bioinformatics and data analysis; culture-based and culture-independent tools; molecular biology tools: cloning, amplification, sequencing; case studies."],
["Bioremediation and wastewater microbiology", "Bioremediation and examples, acid mine drainage, enhanced metal recovery, wastewater biology, drinking water biology, drinking water microbiome and treatment, microbial instability, water-borne microbial diseases."],
["Solid waste biology and public health", "Landfills, leachate, phases of anaerobic degradation, antimicrobial resistance, epidemiology, epidemics, biosensors and their types, exposomes and their applications."]
]
};
