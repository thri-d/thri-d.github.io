/* Exam Tides · Agile Methodology (CS752PE) · complete answers · Unit 2: Collaborating */
window.GUIDE = (window.GUIDE || []).concat([

String.raw`
@id 2-1
@unit 2
@syl Trust
@title Trust
@q Why is trust important in an agile team? Explain team and organisational strategies to build trust.
@one Agile teams depend on trust, inside the team and with the rest of the organisation; the team builds it through empathy and continuity inside, and through hustle, delivered commitments and honesty outside.

## Why trust matters
Agile work relies on close cooperation: customers, programmers and testers make decisions together every day. Without trust, people **protect themselves**: they ask for everything in writing, hide problems, blame each other and slow down. With trust, the team moves fast and solves problems openly.

## Team strategies (trust inside the team)
1. **Customer-programmer empathy** -- customers and programmers try to understand each other's pressures. Customers learn that estimates are not promises; programmers learn the business goals.
2. **Programmer-tester empathy** -- testers are partners who help prevent bugs, not opponents who "find faults". Programmers welcome their findings.
3. **Eat together** -- shared meals and informal time build personal relationships.
4. **Team continuity** -- keep successful teams together across projects instead of breaking them up.

## Organisational strategies (trust with stakeholders)
1. **Show some hustle** -- be visibly hard-working and energetic; stakeholders trust a team that clearly cares.
2. **Deliver on commitments** -- make realistic commitments and meet them every iteration. This is the strongest builder of trust.
3. **Manage problems** -- when something goes wrong, raise it early and propose a solution; no surprises.
4. **Respect customer goals** -- work on what the customers value, not what programmers find interesting.
5. **Promote the team** -- invite stakeholders to demos, share successes, explain what the team does.
6. **Be honest** -- never hide bad news or fake progress; report the truth even when it is uncomfortable.

!dia cols: Inside the team: Customer-programmer empathy | Programmer-tester empathy | Eat together | Team continuity || With the organisation: Show hustle | Deliver on commitments | Manage problems | Respect customer goals | Promote the team | Be honest ::cap **Draw this.** Four team strategies, six organisational strategies.

!adv Benefits of trust
- Faster decisions with less paperwork
- Problems are raised early, not hidden
- Better cooperation between roles
- Stakeholders give the team more freedom
!lim Challenges
- Trust takes a long time to build and little to break
- Past bad experiences make stakeholders suspicious
- Requires consistent honesty, even with bad news

!note "Deliver on commitments" is the single most important organisational strategy: trust grows when the team does what it says, iteration after iteration.
!mem Team: **C P E T** (Customer-programmer, Programmer-tester, Eat together, Team continuity). Organisation: **H D M R P H** -- "**H**ustle, **D**eliver, **M**anage, **R**espect, **P**romote, be **H**onest."
!write Why trust matters → team strategies (4) → organisational strategies (6) → diagram → benefits → conclusion.
`,

String.raw`
@id 2-2
@unit 2
@syl Sit together
@title Sit together
@q Why should an XP team sit together? How do you design an open workspace?
@one Sitting together in one open workspace lets the whole team get answers in seconds instead of days, and lets people learn by overhearing (osmotic communication).

## The problem with separate offices
When team members sit in different rooms or buildings, communication happens through **email, documents and meetings**. A simple question can take hours or days to answer, so people **guess** instead of asking, and mistakes follow.

## A better way: the shared team room
In XP, **the whole team sits together** in one open workspace: customers, programmers, testers and coaches.
- **Fast answers**: you can turn around and ask, and get an answer in seconds.
- **Osmotic communication**: people absorb useful information by **overhearing** conversations around them, like osmosis (term from Alistair Cockburn).
- **Fewer hand-offs**: decisions are made together, on the spot.
- **Shared awareness**: big visible charts and conversations keep everyone up to date.

## Designing the workspace
!dia hub: Team room :: Pairing stations in the centre | Customers close by | Whiteboards and charts | Private and phone rooms | Break-out meeting area | Quiet space ::cap **Draw this.** A shared XP workspace.
- **Pairing stations** in the middle (wide desks, two chairs, shared screen).
- **Customers** seated near the programmers who build their features.
- **Walls and whiteboards** for big visible charts and design sketches.
- A few **private rooms** for phone calls and personal work, and a small **meeting area**.
- Keep noise manageable: talk at normal volume, take long calls elsewhere.

## Adopting an open workspace
Some people resist losing private offices. Involve the team in the design, start with a trial period, and give everyone a private space nearby for personal tasks.

!adv Advantages
- Questions answered in seconds
- Learning by overhearing (osmotic communication)
- Strong team feeling and shared ownership
- Supports pair programming and informative workspace
!lim Challenges
- Noise and interruptions
- Loss of privacy; some people dislike open rooms
- Not possible for distributed teams without workarounds
- Needs suitable office space

!note An open workspace for one team is **not** the same as a huge open-plan office for the whole company. XP's team room holds **one team** working on **one goal**, so the noise is useful information.
!mem Sit together = **fast answers + osmotic communication**.
!write Problem with separation → benefits of sitting together (4) → workspace design with diagram → adopting it → advantages and challenges → conclusion.
`,

String.raw`
@id 2-3
@unit 2
@syl Real customer involvement
@title Real customer involvement
@q Explain real customer involvement for different types of software project.
@one XP needs people who truly represent the users on the team; how you get them depends on the kind of project, from building software for yourself to selling to a whole market.

## Why real customers
On-site customers decide what to build. If they are not **real** customers (or people who genuinely represent them), the team builds the wrong product. The textbook says: involve real customers as directly as you can.

## Five kinds of project
!dia flow: Personal development ~ you are the customer | In-house custom development ~ users inside your company | Outsourced custom development ~ a client company pays you | Vertical-market software ~ sold to one industry | Horizontal-market software ~ sold to everyone ::cap **Draw this.** Customers get harder to reach as you go down.

1. **Personal development** -- you build software for yourself, so you are the customer. Easy: just follow your own priorities.
2. **In-house custom development** -- software for another department in your own organisation. Bring **actual users and their managers** onto the team; the executive sponsor is often the product manager.
3. **Outsourced custom development** -- you build for another company under contract. Ask the client to send **representatives with decision-making authority** to sit with the team, or at least to be available daily; show them working software every iteration.
4. **Vertical-market software** -- a product sold to many customers in one industry (for example, hospital software). No single customer can decide. Use a strong **product manager**, **customer review boards** or advisory groups, and invite real users to review iterations.
5. **Horizontal-market software** -- products sold to a wide market (for example, a word processor or mobile app). Customers are everywhere and nowhere. Rely on a **product manager** and domain experts, plus **market research, usability tests, beta testers and feedback data**.

| Project type | Who plays the customer |
| Personal | You |
| In-house custom | Real users and their managers from the department |
| Outsourced custom | Client's representatives with authority |
| Vertical market | Product manager plus customer review boards |
| Horizontal market | Product manager plus research, beta users and feedback |

!adv Benefits of real customer involvement
- The team builds what users actually need
- Faster feedback and fewer wrong features
- Builds trust with the people paying
!lim Challenges
- Real customers are busy and expensive to involve
- Many customers may disagree; someone must decide
- Remote clients need extra effort (calls, visits, demos)

!note In XP, "on-site customer" is a **role**. For market products, the product manager plays it, backed by real user feedback. The answer is never "no customer at all".
!mem Five types: **P I O V H** -- "**P**lease **I**nvolve **O**ur **V**aluable **H**umans."
!write Why real customers matter → the five project types with who plays the customer → table → benefits and challenges → conclusion.
`,

String.raw`
@id 2-4
@unit 2
@syl Ubiquitous language
@title Ubiquitous language
@q What is ubiquitous language? How does it help an agile team?
@one A ubiquitous language is a single set of business (domain) terms that customers and programmers both use everywhere: in conversation, in stories, in tests and in the code itself.

## The problem: two languages
Programmers think in **technical** terms (tables, classes, threads). Customers and domain experts think in **business** terms. When each side uses its own words, every conversation needs **translation**, and translation introduces mistakes. This is called the **domain expertise conundrum**: programmers must build software about a domain they do not fully understand.

## The solution: one shared language
- Learn the **domain experts' vocabulary** and use it.
- Use the **same words** in conversations, story cards, customer tests and **in the code**: class names, method names and variables.
- When a term is unclear, **ask the domain expert** and agree on one meaning.
- If the language changes, **refactor the code** to match.
The idea comes from Eric Evans' book *Domain-Driven Design*.

!dia cols: Without a shared language: Customer: "loan overdue" | Programmer: "record flag = 3" | translation errors || With a ubiquitous language: Customer: "overdue loan" | Code: class Loan, method isOverdue() | no translation ::cap **Draw this.** The same words in speech and in code.

!ex A library system. The librarian says "a **loan** becomes **overdue** after the **due date**". The code has a class **Loan**, a field **dueDate** and a method **isOverdue()**, not "record", "flag" or "status = 3". Anyone reading the code understands it in business terms.

!adv Advantages
- Fewer misunderstandings between customers and programmers
- Code is easier to read and to check against requirements
- Customer tests and code use the same words
- New team members learn the domain faster
!lim Challenges
- Programmers must invest time in learning the domain
- Domain terms can be vague or used differently by different experts
- Renaming code when terms change takes effort

!note "Ubiquitous" means "present everywhere". The point is that the language appears **everywhere**, including the code, not just in meetings.
!mem **Speak it, write it, code it: one language.**
!write Two-language problem → the domain expertise conundrum → solution (4 points) → diagram → example → advantages → conclusion.
`,

String.raw`
@id 2-5
@unit 2
@syl Stand-up meetings
@title Stand-up meetings
@q What is a daily stand-up meeting? How should it be conducted?
@one A stand-up meeting is a short daily meeting, held standing, in which each team member quickly shares what they did, what they will do and what is blocking them, so everyone stays coordinated.

## Purpose
Even a team sitting together can lose track of who is doing what. The daily stand-up keeps everyone **coordinated** and surfaces **problems early**, without long status meetings.

## How to hold one
- **Daily, at the same time and place** (often in the morning, near the iteration plan on the wall).
- **Everyone stands** -- standing keeps it short.
- The **whole team** attends, including on-site customers.
- **Short**: about 5 to 10 minutes in total, roughly **30 seconds per person**.
- Each person answers **three questions**:
!dia flow: What did I do yesterday? | What will I do today? | *What problems are in my way? ::cap **Draw this.** The three questions, answered by each person in turn.
- **No problem-solving in the meeting.** If a topic needs discussion, the people involved talk **right after** the stand-up.
- Keep it **informative**: mention what others need to know, not a detailed diary.

## Common problems and fixes
| Problem | Fix |
| Meeting runs long | Take discussions offline; strict timebox |
| Becomes a status report to a manager | Speak to the team, not to the boss |
| People arrive late | Fixed time; start without them |
| Nobody mentions problems | Coach to raise blockers early; build trust |

!adv Advantages
- Daily coordination in a few minutes
- Blockers are raised and handled quickly
- Builds commitment and team spirit
- Reduces the need for other status meetings
!lim Challenges
- Easily turns into a long discussion
- Can feel like micromanagement if used for reporting to a boss
- Less useful if the team is very small and always talking

!note In Scrum this is called the **Daily Scrum** (timebox 15 minutes). In XP it is the **stand-up meeting**. Same idea.
!mem **Yesterday, Today, Blockers.** Stand up, keep it short, solve problems later.
!write Purpose → how to conduct (6 points) → three questions with diagram → problems and fixes table → advantages → conclusion.
`,

String.raw`
@id 2-6
@unit 2
@syl Coding standards
@title Coding standards
@q What are coding standards? How does an agile team create them?
@one Coding standards are the team's agreed rules for writing code, so that all code looks like one person wrote it, which makes pair programming and collective ownership possible.

## Why coding standards
In XP, **everyone works on all the code** (collective ownership) and people switch pairs often. If each programmer writes in their own style, the code becomes hard to read and changes cause friction. A shared standard makes the code **consistent**.

## What a standard covers (beyond formatting)
- **Formatting** -- indentation, braces, line length.
- **Naming** -- classes, methods, variables (and the ubiquitous language).
- **Design conventions** -- how to structure classes, error handling, logging.
- **Testing conventions** -- how tests are named and organised.
- **Comments and documentation** -- when to comment; prefer self-explaining code.

## Example: part of a team's coding standard (Java project)
- Classes in **PascalCase** (OrderService), methods and variables in **camelCase** (calculateTotal).
- Names come from the ubiquitous language: Loan, Borrower, dueDate.
- 4-space indentation; braces on the same line; maximum 100 characters per line.
- No method longer than about 20 lines; extract smaller methods.
- Every class has unit tests named after the behaviour, for example **returnsZeroDiscountForSmallOrders**.
- Never swallow exceptions silently; log and rethrow or handle.

## How to create one
!dia flow: Start with a discussion ~ the whole team, about an hour | Agree on the minimum ~ only what everyone accepts | Write it down briefly ~ a page or two | Use tools ~ automatic formatters and checkers | Follow it and refine ~ change it in retrospectives ::cap **Draw this.** Creating a coding standard.
1. **Hold a team discussion** -- everyone contributes, including the programmers who will follow it.
2. **Agree on the minimum** -- start with what everyone already agrees on; do not fight over small details.
3. **Keep it short** -- a page or two; the code itself becomes the example.
4. **Automate** formatting where possible (formatters, linters).
5. **Adhere and evolve** -- follow it even when you would personally do otherwise; improve it over time through retrospectives.

## Dealing with disagreement
If people cannot agree on a rule, leave it out for now, or try one option for a few iterations and review. If someone refuses to follow the agreed standard, treat it as a team problem and discuss it openly; the coach can help.

!adv Advantages
- Code looks consistent and is easier to read
- Supports pair programming and collective ownership
- Fewer arguments during code changes
- New members learn the style quickly
!lim Challenges
- Arguments over personal style ("tabs vs spaces")
- Too many rules become a burden
- Needs discipline to follow consistently

!note A coding standard is created **by the team**, not imposed by a manager. That is what makes people follow it.
!mem **Agree, minimise, automate, adhere.**
!write Why standards → what they cover (5) → how to create with diagram → dealing with disagreement → advantages → conclusion.
`,

String.raw`
@id 2-7
@unit 2
@syl Iteration demo
@title Iteration demo
@q What is an iteration demo? How is it conducted and why is it important?
@one At the end of every iteration, the team demonstrates the stories it finished to stakeholders, honestly, so they can see real progress and decide whether the work is on track.

## What it is
The iteration demo is a short meeting at the **end of each iteration** (weekly in the textbook) where the team shows the **working software** it built. It keeps the team **accountable** and builds **trust** with stakeholders.

## How to conduct it
!dia flow: Invite stakeholders ~ managers, users, sponsors | Product manager introduces ~ goals of this iteration | Show finished stories ~ only "done done" work, on real software | Answer questions, take feedback | Ask the two questions ~ Is our work satisfactory? May we continue? ::cap **Draw this.** The iteration demo, in order.
- **Product manager leads**; the team helps show the features.
- Show **only "done done" stories**, running on real software, not slides.
- Keep it short, about **10 to 30 minutes**.
- Be **brutally honest**: if something is not finished, say so.
- End by asking stakeholders two questions: **"Is our work to date satisfactory?"** and **"May we continue?"**

## When the demo goes badly
If a story is not done, say so plainly and explain the plan. If stakeholders are unhappy, treat it as valuable feedback early, rather than a surprise at the end of the project.

## Deploy after the demo
The textbook recommends that the software shown is **ready to deploy**, and ideally deployed, every iteration. This proves the work is genuinely complete.

!adv Advantages
- Real progress is visible every iteration
- Early feedback from stakeholders
- Builds trust through honesty
- Motivates the team to finish stories fully
!lim Challenges
- Stakeholders may not attend regularly
- Pressure to "show something" can tempt teams to hide problems
- Needs truly finished work, which requires discipline

!note **Iteration demo vs retrospective**: the demo is about the **product**, with **stakeholders**; the retrospective is about the **process**, within the **team**.
!note In Scrum, the equivalent is the **Sprint Review**.
!mem Demo ends with: **"Satisfactory? Continue?"**
!write Definition → how to conduct with diagram → the two questions → when it goes badly → deploy after the demo → advantages → conclusion.
`,

String.raw`
@id 2-8
@unit 2
@syl Reporting
@title Reporting
@q What reports should an agile team provide? Which reports should it avoid?
@ff SLOC = Source Lines of Code
@one Agile teams report progress mainly through working software, plans and simple charts; they consider a few management reports, and avoid misleading measures such as lines of code, story counts and velocity comparisons.

## Why reporting
Stakeholders and managers need to know how the project is going. Because an agile team is highly visible (demos, wall charts), it needs fewer formal reports, but some reports are still useful.

!dia cols: Progress reports to provide: Vision statement | Weekly demo | Release and iteration plans | Burn-up chart || Management reports to consider: Productivity | Throughput | Defects | Time usage || Reports to avoid: SLOC and function points | Number of stories | Velocity | Code quality ::cap **Draw this.** Three groups of reports.

## 1. Progress reports to provide
- **Vision statement** -- reminds everyone what the project is for.
- **Weekly demo** -- the most powerful report: working software every iteration.
- **Release and iteration plans** -- show what is planned and what is done.
- **Burn-up chart** -- a graph of completed work rising towards the total scope; shows progress and scope changes over time (see the diagram in answer 1.11, Informative workspace).

## 2. Management reports to consider
- **Productivity** -- measured in **value delivered** (for example, revenue or cost savings), not effort.
- **Throughput** -- how many features reach production, and how long they take from idea to release.
- **Defects** -- number of bugs found after release; should be very low.
- **Time usage** -- how the team's time is spent (for example, time lost to meetings or support work).

## 3. Reports to avoid
- **Source Lines of Code (SLOC) and function points** -- more code is not more value; easy to game.
- **Number of stories** -- story sizes differ, so counts are meaningless.
- **Velocity** -- a planning tool for one team, not a performance measure; pushing it up just inflates estimates.
- **Code quality** metrics -- automated quality numbers are easily misread; quality is better judged by the team.

!adv Good reporting
- Builds stakeholder trust with honest data
- Shows progress without heavy paperwork
- Focuses attention on value and quality
!lim Pitfalls
- Wrong metrics encourage "gaming" the numbers
- Too many reports waste team time
- Charts must be kept current to be useful

!note The textbook warns that **any measure used to judge people will be gamed**. That is why velocity and story counts should never be used to compare teams or individuals.
!mem Provide: **V D P B** (Vision, Demo, Plans, Burn-up). Avoid: **S N V Q** (SLOC, Number of stories, Velocity, Quality metrics).
!write Why reporting → diagram of three groups → explain each report in one or two lines → why to avoid certain reports → conclusion.
`

]);
