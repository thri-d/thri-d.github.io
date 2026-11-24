/* Exam Tides · Agile Methodology (CS752PE) · complete answers · Unit 1
   Textbook: James Shore and Shane Warden, The Art of Agile Development (O'Reilly). */
window.GUIDE = (window.GUIDE || []).concat([

String.raw`
@id 1-1
@unit 1
@syl Why Agile? · Understanding success · Beyond deadlines · Importance of organisational success
@title Why Agile? Understanding success
@q Why do we need Agile? Explain the three types of success and the importance of organisational success.
@ff ROI = Return on Investment; CHAOS report = The Standish Group's survey of software project outcomes
@one Agile exists because "on time, on budget, as specified" is too narrow a definition of success; real success has three parts: organisational, technical and personal.

## Why Agile?
Traditional software projects plan everything up front and deliver once, at the end. Surveys such as the Standish Group's ==CHAOS report== found that a large share of projects were late, over budget, cancelled, or delivered features nobody used. Agile development responds to this by delivering working software in **short cycles**, getting **feedback early**, and **changing course** cheaply. The question "Why Agile?" is really "What does a successful project look like, and how do we get there more often?"

## Understanding success
The traditional definition of success is: **delivered on time, on budget, and according to specification.** Shore calls this incomplete. A project can meet all three and still fail, for example if the software is never used, or the team is exhausted and quits. A project can also miss a deadline and still be a big success if it delivers great value.

## Beyond deadlines: the three types of success
!dia hub: Real success :: Organisational success / value to the business | Technical success / code that lasts | Personal success / people who care ::cap **Draw this.** Success is three-sided, not just a deadline.

1. **Organisational success** -- the software delivers **value** to the organisation that paid for it: more revenue, lower costs, happier customers, a good ==Return on Investment (ROI)==.
2. **Technical success** -- the code is **well-designed, maintainable and has few defects**, so it can keep changing safely for years.
3. **Personal success** -- the people involved are satisfied: **executives and sponsors** get ROI, **users** get software that helps them, **managers** get a predictable, healthy project, **developers** get pride and learning, **testers** get software that works.

## Importance of organisational success
Organisational success matters most, because it is the reason the project exists. Without it, the project gets cancelled no matter how clean the code is. Agile methods support organisational success by:
- releasing the **most valuable features first**, so value starts arriving early;
- releasing **frequently**, so the organisation earns returns sooner and can change direction;
- making progress **visible**, so poor projects can be **cancelled early** and cheaply;
- involving **real customers**, so the team builds what is actually needed;
- cutting **waste**: unused features, rework and long hand-offs.

## How Agile supports technical and personal success
- **Technical**: practices such as pair programming, test-driven development, refactoring and continuous integration keep code clean and defects low.
- **Personal**: a sustainable pace, close teamwork and visible progress make the work satisfying for everyone involved.

!adv Why the wider view helps
- Focuses the team on **value**, not just on hitting a date
- Encourages **early release** of the most valuable features
- Keeps the codebase healthy, so future changes stay cheap
- Keeps people motivated, which reduces turnover
!lim Things to keep in mind
- Value is harder to measure than a deadline
- Needs active business involvement, which some organisations resist
- Personal success differs for each role, so it needs balancing

!note "Beyond deadlines" is a heading in the textbook, not a separate concept. It simply means: look beyond the deadline to the three types of success.
!tip Name the three types in the first lines of your answer and draw the three-part diagram. Examiners look for those three words.
!mem **O T P**: Organisational, Technical, Personal. Organisational comes first because it is why the project exists.
!write Traditional definition of success (on time, on budget, as specified) → why it is not enough → diagram → three types with one example each → importance of organisational success (5 points) → how agile helps → conclusion.
`,

String.raw`
@id 1-2
@unit 1
@syl Introduction to agility · Agile methods: Scrum and XP
@title Introduction to agility, and the agile methods Scrum and XP
@q What is agility? Explain Scrum and XP and compare them.
@ff XP = Extreme Programming; PO = Product Owner; SM = Scrum Master
@one Agility is the ability to respond to change quickly; an agile method is a set of practices built on the Agile Manifesto, and the two best known are Scrum (a project-management framework) and XP (a set of engineering practices).

## Introduction to agility
**Agility** means a team can **respond to change quickly and cheaply** while still delivering value. Agile teams:
- work in **short iterations** (usually 1 to 4 weeks);
- deliver **working software** at the end of every iteration;
- **collaborate closely** with customers instead of relying only on documents;
- use **feedback** from each iteration to adjust plans.

Agile is a **philosophy**, described by the Agile Manifesto. An **agile method** is a concrete set of practices that puts that philosophy into action. Examples: **Scrum, XP, Crystal, FDD (Feature-Driven Development), DSDM (Dynamic Systems Development Method)** and Lean. The textbook advises teams to start with an existing method and follow it fully before changing it, rather than mixing their own method from scratch.

## Scrum
Scrum is a lightweight **framework for managing work**. It does not prescribe engineering practices.
!dia cols: 3 roles: Product Owner | Scrum Master | Development Team || 3 artifacts: Product Backlog | Sprint Backlog | Increment || 5 events: Sprint | Sprint Planning | Daily Scrum | Sprint Review | Sprint Retrospective ::cap **Draw this.** Scrum 3-3-5: three roles, three artifacts, five events.
- **Product Owner (PO)** -- owns the Product Backlog and decides priorities.
- **Scrum Master (SM)** -- coaches the team, removes impediments, protects the process.
- **Development Team** -- cross-functional, self-organising, builds the increment.
- A **Sprint** is a fixed timebox of **one month or less** (often 2 weeks). It starts with **Sprint Planning**, has a 15-minute **Daily Scrum** every day, and ends with the **Sprint Review** (show the increment) and **Sprint Retrospective** (improve the process).
!viz ag-scrum :: Step through one sprint

## XP (Extreme Programming)
XP was created by **Kent Beck** in the late 1990s. It takes good practices to the "extreme": if code review is good, review all the time (pair programming); if testing is good, test all the time (test-driven development); if integration is good, integrate many times a day (continuous integration).
- **Five values**: Communication, Simplicity, Feedback, Courage, Respect.
- **Practices** (as in this syllabus): Thinking, Collaborating, Releasing, Planning, Developing.
- **Short iterations** of one week (in the textbook) with the whole team sitting together.

## Scrum vs XP
| Point | Scrum | XP |
| Focus | Managing the work | Engineering practices and code quality |
| Iteration | Sprint, up to 1 month (often 2 weeks) | Iteration, usually 1 week (1 to 2 weeks) |
| Roles | PO, SM, Development Team | Whole team: customers, programmers, testers, coaches |
| Engineering practices | Not prescribed | Pair programming, TDD, CI, refactoring |
| Change during iteration | Sprint goal protected | Unstarted work of equal size can be swapped |

!adv Advantages of agile methods
- Early and frequent delivery of working software
- Easy to respond to changing requirements
- Close customer feedback reduces wrong features
- Visible progress every iteration
!lim Limitations
- Needs committed, available customers
- Harder for very large or distributed teams
- Less up-front documentation, which some contracts require
- Discipline is required; "agile" without practices fails

!note Scrum and XP are not competitors. Many teams use **Scrum for project management and XP for engineering practices** together.
!note Do not write "Sprint" for XP. XP calls it an **iteration**; Scrum calls it a **sprint**.
!mem Scrum is **3-3-5**. XP values are **C S F C R**: "Can Simple Feedback Create Respect?"
!write Define agility → features of agile (4 points) → agile method examples → Scrum with the 3-3-5 diagram → XP with values and practices → comparison table → conclusion.
`,

String.raw`
@id 1-3
@unit 1
@syl Manifesto for Agile Software Development
@title The Agile Manifesto: four values
@q Explain the Manifesto for Agile Software Development.
@one In 2001, seventeen software practitioners wrote the Agile Manifesto: four value statements of the form "we value X over Y", where both sides matter but the left side matters more.

## Background
In **February 2001**, seventeen software developers (including Kent Beck, Ward Cunningham, Martin Fowler and others) met at **Snowbird, Utah**. They were leaders of different "lightweight" methods (XP, Scrum, DSDM, Crystal and others) and agreed on common ground: the **Manifesto for Agile Software Development**.

The manifesto begins: *We are uncovering better ways of developing software by doing it and helping others do it.* Through this work they came to value:

## The four values
!dia cols: Valued more: Individuals and interactions | Working software | Customer collaboration | Responding to change || Valued less: processes and tools | comprehensive documentation | contract negotiation | following a plan ::cap **Draw this.** Left column over right column. Both have value; the left has more.
1. **Individuals and interactions over processes and tools** -- skilled people who talk to each other solve problems that no process document can foresee. Tools help, but people come first.
2. **Working software over comprehensive documentation** -- progress is measured by software that runs. Documentation still exists, but only what is actually useful.
3. **Customer collaboration over contract negotiation** -- work with the customer continuously, instead of arguing about the wording of a fixed contract.
4. **Responding to change over following a plan** -- plans are made, but they are expected to change as the team and customer learn.

The manifesto ends: *That is, while there is value in the items on the right, we value the items on the left more.*

!viz ag-manifesto :: Open the balance-scale version

!adv Why the values matter
- Shift the focus from paperwork to **delivering value**
- Make teams **adaptable** to change
- Build **trust** between customers and developers
- Encourage **communication** and teamwork
!lim Common misunderstandings
- It does **not** say "no documentation" or "no planning"
- Needs mature, self-disciplined teams
- Values alone do not tell you what to do daily; practices (like XP) do

!note The right-hand items are **not worthless**. The exact wording is "while there is value in the items on the right, we value the items on the left more." Write this sentence; it shows you understand the manifesto.
!mem **I W C R**: "**I** **W**ill **C**ode **R**ight" = Individuals, Working software, Customer collaboration, Responding to change.
!write Background (2001, Snowbird, 17 people) → opening line → the four values with one line of meaning each → the closing line about the right side still having value → link to the 12 principles.
`,

String.raw`
@id 1-4
@unit 1
@syl Principles of the agile process
@title The twelve principles of the agile process
@q List and explain the principles behind the Agile Manifesto.
@one The twelve principles explain how to put the four values into practice: deliver early and often, welcome change, work with the business daily, trust motivated people, keep a sustainable pace, keep it simple and keep improving.

## The twelve principles (grouped to remember)
**A. The customer and change**
1. **Customer satisfaction** -- our highest priority is to satisfy the customer through **early and continuous delivery** of valuable software.
2. **Welcome change** -- welcome changing requirements, **even late in development**; agile processes use change for the customer's competitive advantage.
3. **Deliver frequently** -- deliver working software frequently, from **a couple of weeks to a couple of months**, with a preference for the shorter timescale.

**B. People**
4. **Work together daily** -- business people and developers must work together **daily** throughout the project.
5. **Motivated individuals** -- build projects around motivated individuals; give them the environment and support they need, and **trust** them to get the job done.
6. **Face-to-face conversation** -- the most efficient and effective way to convey information to and within a team is **face-to-face** conversation.

**C. Progress and pace**
7. **Working software is the measure** -- working software is the **primary measure of progress**.
8. **Sustainable pace** -- sponsors, developers and users should be able to maintain a **constant pace indefinitely**.

**D. Quality**
9. **Technical excellence** -- continuous attention to technical excellence and good design **enhances agility**.
10. **Simplicity** -- simplicity, **the art of maximising the amount of work not done**, is essential.

**E. The team improves itself**
11. **Self-organising teams** -- the best architectures, requirements and designs emerge from **self-organising** teams.
12. **Reflect and adjust** -- at regular intervals, the team reflects on how to become more effective, then **tunes and adjusts** its behaviour.

!dia cols: Customer and change: 1 Satisfy | 2 Welcome change | 3 Deliver often || People: 4 Daily together | 5 Motivated people | 6 Face-to-face ::cap Groups A and B
!dia cols: Pace: 7 Working software | 8 Sustainable pace || Quality: 9 Excellence | 10 Simplicity || Team: 11 Self-organising | 12 Reflect ::cap Groups C, D and E. Group sizes 3, 3, 2, 2, 2.

!viz ag-principles :: Self-test: hide the lines

!adv What the principles achieve
- Turn the four values into **daily behaviour**
- Keep quality high through **excellence and simplicity**
- Prevent burnout with a **sustainable pace**
- Build in **continuous improvement** (principle 12)

!note Principle 3 says "a couple of weeks to a couple of months". Some notes write "weeks, not months"; that is not the exact principle.
!note Principle 10's definition of simplicity, "the art of maximising the amount of work **not done**", is a favourite one-mark question.
!tip In a long answer, write all twelve with a short line each. If time is short, write the group headings first so the structure is visible, then fill the points.
!mem Group sizes **3-3-2-2-2**: Customer, People, Pace, Quality, Team.
!write One-line intro (principles behind the manifesto) → twelve numbered principles under the five group headings → one line on how XP practices implement them.
`,

String.raw`
@id 1-5
@unit 1
@syl Understanding XP: XP life cycle
@title The XP life cycle
@q Explain the XP life cycle with a neat diagram.
@ff XP = Extreme Programming
@one In Beck's XP life cycle a project moves through six phases (Exploration, Planning, Iterations to release, Productionising, Maintenance, Death); the textbook adds that inside every iteration an XP team does all activities at once.

## Beck's six phases
!dia flow: Exploration ~ stories written, technology tried out | Planning ~ stories prioritised and estimated | *Iterations to release ~ 1 to 4 week iterations of tested stories | Productionising ~ extra testing, performance checks | Maintenance ~ live system, more iterations | Death ~ no more stories, or too costly ::cap **Draw this.** The six phases from top to bottom. Iterations repeat until the release is ready.
1. **Exploration** -- customers write **story cards** for the first release. Programmers try out the tools, technology and architecture (often with **spike solutions**). This can take weeks to a few months.
2. **Planning** -- customers **prioritise** the stories and programmers **estimate** them. Together they agree the smallest, most valuable set of stories for the first release.
3. **Iterations to release** -- the release is built in **iterations of 1 to 4 weeks**. Each iteration delivers tested, working stories. The first iteration sets up the system's skeleton (architecture). Customers write **functional (customer) tests** and check every iteration.
4. **Productionising** -- extra **testing and performance checks** before the software goes live. Iterations may get shorter. New ideas are either taken in now or noted for later.
5. **Maintenance** -- the system runs in production while **new iterations keep adding features**. Development slows a little because the team also supports the live system; new people may join.
6. **Death** -- the project ends either because the customer has **no more stories** (a happy ending), or because the system can no longer deliver what is needed at a sensible cost. Final documentation is written.

## The textbook's view: everything, every iteration
In a traditional (waterfall) project, requirements, design, coding, testing and deployment happen one after another. Shore and Warden point out that in XP the team does **all of these activities in every iteration, at the same time**:
!dia cycle: Planning | Analysis | Design and coding | Testing | Deployment @ every week ::cap All activities happen in every (usually one-week) iteration.
- **Planning** -- every iteration starts with iteration planning; releases are planned with the planning game.
- **Analysis** -- on-site customers work out requirements just in time, story by story.
- **Design and coding** -- test-driven development, refactoring and incremental design.
- **Testing** -- programmers write unit tests, customers write customer tests, testers do exploratory testing.
- **Deployment** -- software is ready to deploy at the end of each iteration ("done done").

!viz ag-xplife :: Step through the six phases

!adv Advantages of the XP life cycle
- Working software from the **first iteration**
- Feedback every 1 to 2 weeks reduces risk
- Changes are cheap because design evolves gradually
- Testing is continuous, so bugs are found early
!lim Limitations
- Needs an on-site customer for the whole project
- Hard to give a fixed price and scope up front
- Works best with small, co-located teams

!note Exam answers usually expect **Beck's six phases**. Write them first, then add one paragraph on the textbook's "all activities every iteration" view for extra marks.
!mem **E P I P M D**: "**E**very **P**rogrammer **I**s **P**retty **M**uch **D**one."
!write Define XP briefly → diagram of six phases → explain each phase in 2 to 3 lines → the "everything every iteration" view with the cycle diagram → advantages → conclusion.
`,

String.raw`
@id 1-6
@unit 1
@syl Understanding XP: XP team
@title The XP team
@q Explain the roles in an XP team.
@ff XP = Extreme Programming; PM = Project Manager
@one An XP team is a cross-functional "whole team" that sits together: on-site customers decide what to build, programmers build it, testers check it, and coaches guide the process.

## The whole team
XP uses a **whole team** approach: everyone needed to deliver the software is on the team and works together in one room. No one throws work "over the wall" to another department.
!dia hub: XP whole team :: On-site customers | Programmers | Testers | Coaches | Other members ::cap **Draw this.** The whole team sits together.

## Roles
**1. On-site customers** -- they decide **what** to build and in what order.
- **Product manager** (product owner) -- has the vision, sets priorities, makes the final call on features.
- **Domain experts** (subject-matter experts) -- know the business rules in detail, help write customer tests.
- **Interaction designers** -- design the user interface and user experience.
- **Business analysts** -- help customers clarify and document requirements.

**2. Programmers** -- they decide **how** to build it: design, code, unit tests (test-driven development), estimates, technical risks. Includes designers, architects and technical specialists (for example a database expert).

**3. Testers** -- help customers define **customer tests** and do **exploratory testing** to find gaps in the team's thinking. In XP, testers help the team prevent bugs rather than just catching them at the end.

**4. Coaches** -- guide the team in XP.
- **Programmer-coach** -- an experienced programmer who helps the team learn XP practices and good design.
- **Project manager** -- handles the outside world: stakeholders, reporting, removing obstacles, logistics.

**5. Other team members** -- technical writers, user-interface artists, operations staff and so on, as needed.

## Team size and full-time members
- The textbook's guidance works best for a team of roughly **4 to 10 programmers**, plus customers and testers.
- Team members should be **full-time** on the project. Splitting people across projects slows everyone down.

!adv Advantages of the whole-team approach
- Fast decisions because customers are in the room
- Fewer misunderstandings and hand-offs
- Shared responsibility for quality
- Knowledge spreads across the team
!lim Challenges
- Customers find it hard to be available full-time
- Needs a shared open workspace
- Does not scale easily to very large teams

!note "Customer" in XP is a **role**, not necessarily the buyer. It can be a product manager from inside the company.
!note Customers decide **what** and **in what order** (value). Programmers decide **how** and **how long** (cost). This split appears again in the planning game.
!mem **C P T C**: Customers, Programmers, Testers, Coaches.
!write Whole-team idea → diagram → each role with its duties (customers in four sub-roles) → team size and full-time → advantages → conclusion.
`,

String.raw`
@id 1-7
@unit 1
@syl Understanding XP: XP concepts
@title XP concepts
@q Explain the key concepts of XP: refactoring, technical debt, timeboxing, the last responsible moment, stories, iterations, velocity, theory of constraints and mindfulness.
@ff XP = Extreme Programming; TOC = Theory of Constraints
@one XP relies on a small vocabulary: keep code clean (refactoring, avoid technical debt), work in fixed time (timeboxing, iterations), decide late (last responsible moment), plan with stories and velocity, fix the bottleneck (theory of constraints), and pay attention (mindfulness).

## The concepts
1. **Refactoring** -- changing the **structure** of code **without changing its behaviour**, to make it easier to understand and change.
2. **Technical debt** -- the cost of quick-and-dirty work. Like money borrowed, it charges **interest**: every later change takes longer until the debt is paid back by cleaning up the code.
3. **Timeboxing** -- fixing the **time** for an activity in advance (for example, a 1-week iteration or a 15-minute stand-up). When the time is up, you stop and decide what to do next, instead of letting work drag on.
4. **The last responsible moment** -- make decisions **as late as possible but no later**, when you have the most information, while still leaving time to act. This avoids guessing early and having to undo it.
5. **Stories** -- short descriptions of a feature from the customer's point of view, usually written on index cards, that represent **customer value**. They are placeholders for conversation, not full specifications.
6. **Iterations** -- fixed-length cycles (usually **one week** in the textbook) in which the team plans, builds, tests and delivers a set of stories.
7. **Velocity** -- the amount of work (in estimate points) the team **actually finished** in the last iteration. It is used to plan how much to take on next time.
8. **Theory of Constraints (TOC)** -- every system has **one bottleneck** that limits its output. Improving anything else does not help; find the constraint and improve it. In XP, programmers are usually treated as the constraint, so the rest of the team supports them.
9. **Mindfulness** -- being **aware** of how you work and why, so you can notice problems and keep improving. Agile practices are not followed blindly.

!dia cycle: Plan with stories | Build in a timeboxed iteration | Refactor, avoid technical debt | Measure velocity @ XP concepts in one loop ::cap How the concepts connect in every iteration.

## XP values (often asked with concepts)
**Communication, Simplicity, Feedback, Courage, Respect.**

## Beck's twelve XP practices (older exam favourite)
| Planning and release | Programming | Team |
| The planning game | Simple design | Pair programming |
| Small releases | Testing (TDD) | Collective ownership |
| Metaphor | Refactoring | Continuous integration |
| On-site customer | Coding standards | Sustainable pace (40-hour week) |

!adv Why these concepts help
- Keep the code **easy to change** (refactoring, no debt)
- Make planning **predictable** (stories, velocity, iterations)
- Avoid early guesses (**last responsible moment**)
- Focus improvement where it matters (**theory of constraints**)

!note **Velocity is not productivity.** It is only a planning number for one team. Comparing velocity between teams, or pushing a team to "raise velocity", is a mistake.
!note Refactoring **never adds features**. If behaviour changes, it is not refactoring.
!note If a question asks for "XP practices", write Beck's twelve practices table; if it asks for "XP concepts", write the nine concepts above.
!mem Nine concepts: **R T T L S I V T M** -- "**R**eal **T**eams **T**ake **L**ots of **S**mall **I**terations, **V**ery **T**houghtful **M**oves."
!write One-line intro → each concept with a definition and an example → small diagram → values → conclusion.
`,

String.raw`
@id 1-8
@unit 1
@syl Adopting XP: Knowing whether XP is suitable · Implementing XP · Assessing agility
@title Adopting XP: is it suitable, implementing it, assessing agility
@q What are the prerequisites for adopting XP? How do you implement XP and assess your agility?
@ff XP = Extreme Programming
@one Before adopting XP, check the six prerequisites and five recommendations; then start with all the practices at once, and regularly assess your agility in the five practice areas.

## 1. Knowing whether XP is suitable
**Prerequisites** (needed for XP to work):
1. **Management support** -- managers must agree to the team's way of working (for example, a shared workspace and changed reporting).
2. **Team agreement** -- the team itself must want to try XP.
3. **A colocated team** -- everyone sits together in one shared workspace.
4. **On-site customers** -- people with authority to decide requirements are available to the team.
5. **The right team size** -- small enough to sit together and communicate (roughly 4 to 10 programmers).
6. **Use all the practices** -- XP practices support each other; picking only some of them usually fails.

**Recommendations** (helpful, not mandatory):
- a **brand-new codebase** (legacy code is harder);
- **strong design skills** on the team;
- a **language that is easy to refactor**;
- an **experienced programmer-coach**;
- a **friendly and cohesive team**.

!dia cols: Prerequisites (must have): Management support | Team agreement | Colocated team | On-site customers | Right team size | Use all practices || Recommendations (good to have): New codebase | Strong design skills | Easy-to-refactor language | Experienced coach | Cohesive team ::cap **Draw this.** Six prerequisites, five recommendations.

## 2. Implementing XP ("Go!")
- **The challenge of change**: expect a few months of discomfort while the team learns. Productivity may dip before it rises.
- **Final preparation**: set up the shared workspace, version control, an automated build, and agree how to start.
- **Applying XP to a new project** (recommended): start all practices from the first iteration.
- **Applying XP to an existing project**: the main problem is **legacy code** with technical debt; improve it gradually, using slack time to pay down the debt.
- **Applying XP in a phase-based organisation**: if the company works in phases (requirements, design, coding, testing), the team still runs XP iterations inside the project and adapts its reporting.
- **Extremities**: taking only bits of XP is possible but risky; the practices depend on each other.

## 3. Assessing your agility
The textbook gives a **self-assessment quiz** that scores the team out of 100 in the same five areas as the practice chapters:
!dia cycle: Thinking | Collaborating | Releasing | Planning | Developing @ score each out of 100 ::cap Plot the five scores on a radar (spider) chart.
- Score each area, then plot the scores on a **radar chart**.
- Low scores show where to improve first. Repeat the assessment every few months to track progress.

!adv Benefits of adopting XP carefully
- Avoids starting XP where it cannot work
- Sets realistic expectations about the learning dip
- Gives a measurable way to track improvement
!lim Difficulties
- Prerequisites like on-site customers are hard to get
- Legacy code slows adoption
- Partial adoption often fails

!note "Assessing agility" in this syllabus means the textbook's **self-assessment** across Thinking, Collaborating, Releasing, Planning and Developing. These are exactly Units 1 to 5's practice chapters.
!mem Prerequisites: **M T C O R U** -- "**M**y **T**eam **C**an **O**nly **R**eally **U**nite."
!write Three headings: Is XP suitable (6 prerequisites + 5 recommendations, diagram) → Implementing (5 points) → Assessing agility (5 areas, radar chart) → conclusion.
`,

String.raw`
@id 1-9
@unit 1
@syl Practicing XP: Thinking · Pair programming
@title Pair programming
@q What is pair programming? Explain how it works, with its advantages and challenges.
@one Pair programming is two programmers working together at one computer: the driver types and thinks tactically, the navigator reviews and thinks strategically, and they switch roles often.

## What it is
In pair programming, **two programmers share one computer** (one keyboard, one screen) and work on the same task. All production code in XP is written in pairs.

## The two roles
!dia cols: Driver: has the keyboard | writes the code | thinks tactically (this line, this method) || Navigator: reviews each line | thinks strategically (design, edge cases, next tests) | keeps track of the bigger picture ::cap **Draw this.** Driver and navigator, switching every few minutes.
- **Driver** -- types, focuses on the code being written right now.
- **Navigator** -- watches, reviews, thinks ahead about design, missing tests and problems.
- Pairs **switch roles frequently** (every few minutes) and **switch partners** regularly (for example, every day or every task), so knowledge spreads.

## How to pair well
- Use a **pairing station**: a wide desk, one big screen or two mirrored screens, two chairs side by side, two keyboards if possible.
- **Talk constantly** -- think aloud, explain ideas, ask questions.
- Agree on **coding standards** and tools in advance.
- Take **breaks**; pairing is intense.
- Use TDD with pairing: one writes a test, the other makes it pass ("ping-pong pairing").

## Why it works
- **Pair pressure** keeps both people focused; fewer distractions like email and social media.
- Two brains catch mistakes **as they happen** -- continuous code review.
- The navigator has time to think about design while the driver handles details.

!adv Advantages
- Higher **code quality**, fewer defects
- Continuous **code review** at no extra step
- **Knowledge sharing**; no single expert who "owns" a part
- Faster learning for new or junior members
- Better **focus** and fewer interruptions
- Supports collective code ownership
!lim Challenges
- Tiring; needs breaks and a sustainable pace
- Personality or skill mismatches
- Needs a suitable workspace
- Managers may think it "halves productivity"

!note Pair programming does **not** halve productivity. Studies and the textbook report that pairs produce better code with fewer defects, saving time later; total output is close to two solo programmers, and quality is higher.
!note Pairing is **not** one person coding while the other watches silently. Both are active.
!mem **Driver = Tactical (D-T), Navigator = Strategic (N-S)**.
!write Definition → diagram of driver and navigator → how to pair (4 to 5 points) → why it works → advantages and challenges → conclusion.
`,

String.raw`
@id 1-10
@unit 1
@syl Practicing XP: Thinking · Energized work
@title Energized work
@q Explain energized work in XP.
@one Energized work means working at a pace you can sustain indefinitely, about 40 hours a week, because tired people make mistakes and burnt-out teams slow down.

## What it is
Energized work (Beck's older name: **sustainable pace** or the **40-hour week**) means the team works only as many hours as it can keep up **week after week** while staying productive and alert. It directly applies Agile principle 8 (sustainable pace).

## How to work in an energized way
- **Go home on time.** Long hours are a warning sign, not a badge of honour.
- **Take care of yourself**: sleep, food, exercise and time off.
- **Be fully present** at work: focus during work hours, avoid distractions.
- **Take breaks** when tired; stop pairing when you can no longer concentrate.
- **Avoid heroics**: one person staying all night to save the project hides problems.
- The organisation should **support** energized work: realistic plans, a calm workspace, no constant pressure.

## Overtime
Occasional overtime in an emergency is acceptable. **Regular overtime** is a sign of a planning problem. XP fixes the plan (using velocity and slack) instead of asking people to work longer.

!dia flow: Long hours | Tiredness | More mistakes and bugs | More rework | Even longer hours ::cap **The overtime trap.** A loop that energized work breaks.

!adv Advantages
- Fewer mistakes and better decisions
- Higher quality code
- Lower burnout and turnover
- Predictable, steady progress
!lim Challenges
- Managers may expect long hours near deadlines
- Requires honest planning instead of pressure
- Personal discipline to stop and rest

!note Energized work is about **productivity**, not comfort. Tired programmers introduce bugs that cost more time than the extra hours saved.
!mem **Energized work = Agile principle 8 = sustainable pace = 40-hour week.**
!write Definition → link to principle 8 → how (5 points) → overtime trap diagram → advantages → conclusion.
`,

String.raw`
@id 1-11
@unit 1
@syl Practicing XP: Thinking · Informative workspace
@title Informative workspace
@q What is an informative workspace? Explain big visible charts.
@one An informative workspace broadcasts the project's status: anyone walking in can see in seconds how the team is doing, through big visible charts and the buzz of the room.

## What it is
The team's workspace should be its **"cockpit"**: it shows the project's state at a glance. Information is placed where everyone can see it, on walls and whiteboards, instead of hidden in tools.

## Elements of an informative workspace
1. **Subtle cues** -- the energy of the room tells a lot: a buzzing room with pairs talking is healthy; silence or tension shows trouble.
2. **Big visible charts** -- large, hand-drawn charts on the wall, for example:
- the **release plan** and **iteration plan** (story cards on the wall);
- a **burn-up chart** of progress;
- a chart of **build status** or test results.
3. **Hand-drawn charts** -- preferred over computer printouts because they are quick to change, and the team owns them.
4. **Process improvement charts** -- temporary charts to track a specific problem, for example "number of times we broke the build this week". Remove them when the problem is solved.
5. **Avoid gaming** -- charts are for the team's learning, not for judging individuals; otherwise people will "game" the numbers.

!dia hub: Team workspace :: Release plan | Iteration plan | Burn-up chart | Build status | Process charts | Whiteboards ::cap **Draw this.** What hangs on the walls.

!adv Advantages
- Status is visible to the team and managers instantly
- Problems are noticed early
- Encourages accountability and focus
- Reduces status meetings and reports
!lim Challenges
- Needs wall space and a shared room
- Hard for distributed teams
- Charts lose value if not kept current or used to blame people

!note Informative workspace is in the **Thinking** chapter because its purpose is to help the team **notice and think about** its situation, not just to decorate the room.
!mem "**Walls talk.**" If a visitor can tell the project status in 30 seconds, the workspace is informative.
!write Definition (cockpit idea) → five elements → diagram → advantages and challenges → conclusion.
`,

String.raw`
@id 1-12
@unit 1
@syl Practicing XP: Thinking · Root-cause analysis
@title Root-cause analysis
@q What is root-cause analysis? Explain the five whys technique.
@one Root-cause analysis means fixing the cause of a mistake rather than its symptom, usually by asking "why?" about five times until you reach something in the process you can change.

## Idea
When something goes wrong, the natural reaction is to fix the immediate problem or blame a person. XP instead treats every mistake as a sign of a **process problem** and asks how to stop it from **happening again**.

## The five whys
Ask "Why?" repeatedly, about five times, until you reach the fundamental cause.
!dia flow: Problem ~ a bug reached the customer | Why? ~ the feature was not tested | Why? ~ the tester did not know it had changed | Why? ~ changes are not shown to testers | Why? ~ no shared list of finished stories | *Root cause ~ add finished stories to the iteration plan on the wall ::cap **Draw this.** Each "why" goes one level deeper.

## Steps
1. **Describe the problem** clearly and factually.
2. **Ask why** it happened; then ask why about that answer; repeat about five times.
3. **Stop at a cause the team can change** (usually something in the process, not a person).
4. **Fix the root cause** -- change the process, add a test, automate a step.
5. **Check** later that the problem has not come back.

## When not to fix the root cause
If the fix costs more than the problem (for example a rare, cheap mistake), the team may decide to **accept** it. The decision is made consciously.

!adv Advantages
- Problems stop repeating
- Improves the process, not just the code
- Focuses on systems, not blame
- Builds a learning culture
!lim Challenges
- Can drift into blaming people if not careful
- Some causes are outside the team's control
- Takes time; not every small issue needs it

!note Root-cause analysis looks for **process causes, not people to blame**. "Ravi made a mistake" is never the root cause; "nothing stopped the mistake" is.
!mem **Five whys, then fix the process.**
!write Definition → five-whys example diagram → steps (5) → when not to fix → advantages → conclusion.
`,

String.raw`
@id 1-13
@unit 1
@syl Practicing XP: Thinking · Retrospectives
@title Retrospectives
@q What is a retrospective? Explain how to conduct an iteration retrospective.
@one A retrospective is a regular, timeboxed meeting in which the team looks back at how it worked and chooses one improvement for the next iteration.

## Types of retrospective
- **Iteration retrospective** -- at the end of every iteration (most common).
- **Release retrospective** -- after a release.
- **Project retrospective** -- at the end of a project (often longer, with a facilitator).
- **Surprise retrospective** -- after an unexpected event or crisis.

## How to conduct an iteration retrospective
The textbook suggests about **one hour**, with the whole team, in five steps:
!dia flow: The Prime Directive ~ no blame | Brainstorming ~ what went well, what didn't | Mute mapping ~ group ideas silently | Retrospective objective ~ choose one improvement | Follow through ~ act on it next iteration ::cap **Draw this.** Five steps of an iteration retrospective.

1. **The Prime Directive** (Norm Kerth) -- start by reminding everyone: *regardless of what we discover, we believe everyone did the best job they could, given what they knew, their skills and abilities, the resources available, and the situation.* This keeps the meeting blame-free.
2. **Brainstorming** -- everyone writes ideas on cards under headings such as **Enjoyable, Frustrating, Puzzling, Same, More, Less**.
3. **Mute mapping** -- the team silently groups related cards on the wall and votes on the most important group.
4. **Retrospective objective** -- choose **one** improvement to focus on in the next iteration, often after a root-cause analysis.
5. **After the retrospective** -- write the objective somewhere visible and follow through.

!adv Advantages
- Continuous improvement (Agile principle 12)
- Gives everyone a voice
- Problems are addressed early
- Builds trust and team spirit
!lim Challenges
- Can become a complaint session without a clear objective
- Needs a safe, blame-free atmosphere
- Too many improvements at once lead to none being done

!note **Retrospective vs iteration demo**: the demo looks at the **product** with stakeholders; the retrospective looks at the **process** within the team.
!note Pick only **one** objective. The point is steady, small improvements, not a long wish list.
!mem Brainstorm headings: **E F P / S M L** -- Enjoyable, Frustrating, Puzzling / Same, More, Less.
!write Definition → types (4) → how to conduct with the five-step diagram → the Prime Directive in one sentence → advantages → conclusion.
`

]);
