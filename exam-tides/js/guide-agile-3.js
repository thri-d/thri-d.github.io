/* Exam Tides · Agile Methodology (CS752PE) · complete answers · Unit 3: Releasing */
window.GUIDE = (window.GUIDE || []).concat([

String.raw`
@id 3-1
@unit 3
@syl Bug-free release ("Done done" and No bugs)
@title Bug-free release: "done done" and no bugs
@q What is meant by "done done"? How can an XP team release software with almost no bugs?
@ff TDD = Test-Driven Development
@one A story is "done done" only when it is fully finished and production-ready; XP teams get close to zero bugs by writing fewer bugs, removing the places bugs breed, fixing bugs immediately, and testing and fixing their process.

## Part 1: "Done done"
Programmers often say a feature is "done" when the code is written, but testing, integration and fixes remain. XP uses **"done done"** to mean **completely finished: ready to release**. A story is done done when it is:
!dia cols: Built: Tested (all tests pass) | Coded | Designed (refactored) | Integrated || Delivered: Builds | Installs | Migrates (data, database) || Approved: Reviewed by customers | Fixed (known bugs) | Accepted by customers ::cap **Draw this.** The "done done" checklist.
- **Tested** -- unit, integration and customer tests all pass.
- **Coded** -- all the code is written.
- **Designed** -- refactored to the team's satisfaction.
- **Integrated** -- works with the rest of the system.
- **Builds** -- the automated build includes it.
- **Installs** -- the installer includes it.
- **Migrates** -- data and database changes are handled.
- **Reviewed** -- customers have reviewed it.
- **Fixed** -- all known bugs are fixed (or scheduled as stories).
- **Accepted** -- customers agree it is finished.

Only done done stories count towards **velocity** and appear in the **iteration demo**.

## Part 2: No bugs
XP teams aim to release with **almost no bugs**. This is achieved with four ingredients:
1. **Write fewer bugs** -- test-driven development (TDD), pair programming, customer tests, energized work and coding standards stop most bugs at the source.
2. **Eliminate bug breeding grounds** -- bugs gather in messy, complex code. Pay down **technical debt** and refactor so bugs have nowhere to hide.
3. **Fix bugs now** -- fix each bug as soon as it is found, before writing new features. Old bugs are harder and more expensive to fix.
4. **Test your process, and fix your process** -- testers use **exploratory testing** to find what slipped through; each escaped bug triggers **root-cause analysis** so the process changes and that kind of bug cannot happen again.

!dia cycle: Write fewer bugs | Remove breeding grounds | Fix bugs now | Test and fix the process @ near-zero bugs ::cap The four ingredients of a bug-free release.

## Invert your expectations
Traditional teams expect bugs and plan long testing phases. XP teams **expect no bugs**, so every bug is a surprise that leads to improvement.

!adv Advantages
- Software is always close to releasable
- Less time lost to bug-fixing at the end
- Higher customer confidence
- Velocity reflects truly finished work
!lim Challenges
- Requires discipline on every story
- Customers must be available to review and accept
- Existing codebases with many bugs need time to clean up

!note "Done" is not "done done". Code that is written but not tested, integrated or accepted **does not count** in velocity.
!note "No bugs" is a goal and a mindset, not a guarantee. The aim is so few bugs that each one is treated as a process problem.
!mem Done done: **T C D I / B I M / R F A**. No bugs: **Fewer, Breeding grounds, Now, Process**.
!write Definition of done done → the checklist with diagram → no-bugs ingredients (4) → invert your expectations → advantages → conclusion.
`,

String.raw`
@id 3-2
@unit 3
@syl Version control
@title Version control
@q What is version control? Explain its key concepts and how an XP team uses it.
@ff VCS = Version Control System
@one Version control stores every version of every project file in a shared repository, so the whole team can work on the same code safely, see history, go back in time and integrate continuously.

## Why version control
Many people edit the same files. Without version control, changes overwrite each other, history is lost and nobody knows which version is current. A **Version Control System (VCS)** such as **Git** or Subversion solves this.

## Key concepts
| Term | Meaning |
| Repository | The central store of all files and their full history |
| Sandbox (working copy) | Your local copy where you make changes |
| Check out | Get a copy of files from the repository |
| Update | Bring the latest changes from the repository into your sandbox |
| Lock | Reserve a file so only you can edit it |
| Check in (commit) | Save your changes into the repository |
| Revert | Throw away your local changes |
| Tip (head) | The latest version in the repository |
| Tag (label) | A name for a particular version, for example "release 1.0" |
| Roll back | Undo a check-in, returning to an earlier version |
| Branch | A separate line of development |
| Merge | Combine changes from different people or branches |

!dia flow: Repository ~ shared history | Check out or update ~ copy to your sandbox | Edit and test locally | Update again ~ merge others' changes | *Check in (commit) ~ only if build and tests pass ::cap **Draw this.** The basic version-control cycle.

## How XP uses version control
- **Concurrent editing** -- XP prefers letting several people edit the same file and **merging**, rather than **locking** files, because locking blocks collective ownership.
- **Time travel** -- any earlier version can be recovered, so experiments are safe.
- **Whole project** -- put **everything** in version control: code, tests, build scripts, database scripts, documentation, tools configuration.
- **Customers and version control** -- customer artefacts (for example customer test tables) are also stored there.
- **Keep it clean** -- check in only code that **builds and passes all tests**; never break the build.
- **Single codebase** -- one codebase for all customers; avoid copies per customer.
- **Appropriate uses of branches** -- use branches sparingly, for example to maintain an old release; merge back quickly.

!adv Advantages
- Safe teamwork on shared files
- Full history; any version can be restored
- Supports continuous integration and collective ownership
- Tags make releases reproducible
!lim Challenges
- Merge conflicts when people change the same lines
- Long-lived branches cause painful merges
- Needs discipline to commit only working code

!note Concurrent editing with merging is the XP way. **Locking** is listed as a concept, but XP avoids it because it blocks other people.
!mem Twelve terms: **R S C U L C R T T R B M** -- group them: store (repository, sandbox), move (check out, update, check in), protect (lock, revert, roll back), name (tip, tag), split (branch, merge).
!write Why version control → table of terms → cycle diagram → how XP uses it (7 points) → advantages and challenges → conclusion.
`,

String.raw`
@id 3-3
@unit 3
@syl Ten-minute build
@title The ten-minute build
@q What is a ten-minute build? How do you automate a build?
@ff CI = Continuous Integration
@one A ten-minute build is a fully automated build that compiles the code, runs all the tests and produces a releasable package with one command, in ten minutes or less.

## What it is
The **build** turns source code into working software: compile, link, run tests, package, and sometimes deploy. In XP, the build is:
- **Automated** -- a single command does everything; no manual steps.
- **Complete** -- compiles, runs **all** tests, creates the installer or package.
- **Fast** -- finishes in **ten minutes or less**.

!dia flow: One command | Compile the code | Run all tests ~ unit, integration, customer | Build the package or installer | *Report pass or fail ~ in 10 minutes or less ::cap **Draw this.** What the ten-minute build does.

## Why ten minutes?
Ten minutes is short enough that programmers **wait for the result** before moving on, and long enough to do real testing. If the build takes longer, people stop running it often, integrate less, and problems pile up. A fast build makes **continuous integration** practical.

## How to automate the build
- Use a **build tool** (for example Make, Ant, Maven or Gradle) and write a **build script** kept in version control.
- **Automate every step**, including database setup and packaging.
- Make the build run the **same way on every machine**.
- **Start automating on day one** of a new project.

## Automating a legacy project
For an existing project with a slow or manual build, automate **step by step**: first the compile, then tests, then packaging. Use slack time to improve it each iteration.

## Dealing with a slow build
- Find the slowest parts (usually tests that use databases or networks) and speed them up.
- Use faster hardware.
- Split into a **multistage build**: a fast stage on every check-in, slower tests run afterwards.

!adv Advantages
- Anyone can build and test the whole system with one command
- Fast feedback on every change
- Makes continuous integration possible
- Removes manual, error-prone release steps
!lim Challenges
- Slow tests make the ten-minute limit hard
- Automating a legacy build takes time
- The build script must be maintained like code

!note "Ten minutes" is a guideline, not magic: the point is a build **fast enough to run many times a day**.
!mem **One command, all tests, ten minutes.**
!write Definition (automated, complete, fast) → diagram → why ten minutes → how to automate (4) → legacy and slow builds → advantages → conclusion.
`,

String.raw`
@id 3-4
@unit 3
@syl Continuous integration
@title Continuous integration
@q What is continuous integration? Explain the integration process and why it works.
@ff CI = Continuous Integration
@one Continuous integration means every programmer merges their work into the shared code several times a day, running the full build each time, so the code is always working and integration problems stay small.

## The problem it solves
If programmers work separately for weeks and merge at the end ("big-bang integration"), there are huge conflicts and hidden bugs. Continuous integration (CI) avoids this by integrating **small changes, often**.

## How to integrate (the CI cycle)
!dia cycle: Update from repository | Build and test locally | Get the integration token | Check in, build on integration machine | *Build passes: release token @ every few hours ::cap **Draw this.** One continuous-integration cycle.
1. **Update** your sandbox with the latest code from the repository.
2. **Run the ten-minute build** on your machine; all tests must pass.
3. **Take the integration token** (a physical object such as a toy, or a software lock) so only one pair integrates at a time.
4. **Check in** your changes and run the build on the **integration machine**.
5. If the build passes, **release the token**. If it fails, fix it immediately or roll back.

**Golden rule: never break the build.** The code in the repository must always build and pass all tests.

## Synchronous vs asynchronous integration
| Synchronous | Asynchronous |
| You wait for the build to finish before moving on | A CI server builds after you check in and notifies you of failures |
| Problems are fixed immediately | You may have started new work when a failure arrives |
| Needs a fast (ten-minute) build | Works with slower builds |
| Preferred by the textbook | Common with CI servers |

## Why it works
- Changes are **small**, so conflicts are small and easy to fix.
- Problems are found **within hours**, while the change is fresh in mind.
- The code is **always in a releasable state**.
- Everyone works on the **latest version**, supporting collective ownership.

## Multistage integration builds
If some tests are too slow for ten minutes, run a **fast build** on every check-in and **slower tests** in a second stage afterwards.

!viz ag-ci :: Step through one CI cycle

!adv Advantages
- No painful end-of-project integration
- Bugs and conflicts found early
- Always-working, releasable code
- Supports frequent releases
!lim Challenges
- Needs a fast automated build and good tests
- Discipline: never break the build
- Large teams need integration tools or queues

!note **Continuous integration is a practice, not a tool.** A CI server helps, but the practice is about people integrating every few hours and keeping the build green.
!mem **Update, build, token, check in, release.** Golden rule: never break the build.
!write The problem (big-bang integration) → definition → CI cycle diagram and 5 steps → golden rule → synchronous vs asynchronous table → why it works → advantages → conclusion.
`,

String.raw`
@id 3-5
@unit 3
@syl Collective ownership
@title Collective code ownership
@q What is collective code ownership? How do you make it work?
@one Collective code ownership means the whole team owns all the code: anyone may improve any part of it at any time, and everyone is responsible for its quality.

## What it is
In many teams each module has an "owner", and only that person changes it. In XP, there are **no individual owners**: **every programmer can and should change any code** to finish a story or improve the design.

!dia cols: Individual ownership: Each module has one owner | Others wait for the owner | Knowledge stays with one person || Collective ownership: Whole team owns all code | Anyone fixes or improves any part | Knowledge is shared ::cap **Draw this.** Individual vs collective ownership.

## Making it work
- **Pair programming** -- pairs rotate, so everyone learns many parts of the code.
- **Coding standards** -- all code looks familiar to everyone.
- **Test-driven development** -- tests act as a safety net, so changing unfamiliar code is safe.
- **Continuous integration** -- changes merge quickly, avoiding conflicts.
- **Simple, clean design** -- easy-to-understand code invites improvement.

## Working with unfamiliar code
Pair with someone who knows that part; read the tests to understand the behaviour; make small changes and run the tests often.

## Hidden benefits
- **No bottleneck experts**: work never waits for one person.
- **Better design**: many eyes improve the code.
- **Lower risk**: if someone leaves or is ill, others can continue (higher "bus factor").
- **Flexibility**: any pair can take any story.

!adv Advantages
- No waiting for a code "owner"
- Knowledge spread across the team
- Better design through many reviewers
- Lower risk if people leave
!lim Challenges
- Needs strong tests to change code safely
- Without standards, code becomes inconsistent
- People may feel "nobody" is responsible if it is done badly

!note Collective ownership means **everyone is responsible**, not "no one is responsible". Anyone who sees a problem fixes it (or makes sure it gets fixed).
!mem Works because of **P C T C S**: Pairing, Coding standards, Tests, CI, Simple design.
!write Definition → contrast diagram → making it work (5) → unfamiliar code → hidden benefits → advantages and challenges → conclusion.
`,

String.raw`
@id 3-6
@unit 3
@syl Documentation
@title Documentation
@q What are the types of documentation in an agile project? How does XP handle documentation?
@one XP keeps documentation lean and useful: work-in-progress documentation is mostly replaced by conversation, tests and clean code; product documentation is treated as a story; handoff documentation is written when the team moves on.

## Agile view of documentation
The manifesto values **working software over comprehensive documentation**, but documentation is still written when it has real value. XP asks: **who will read it, and why?**

## Three types of documentation
!dia cols: Work-in-progress: For the team, now | Mostly replaced by talking, stories, tests, clean code || Product: For users and customers | Manuals, help, API docs | Scheduled as stories || Handoff: For future maintainers | Written when the team moves on | Overview, build, key decisions ::cap **Draw this.** Three types of documentation.

1. **Work-in-progress documentation** -- helps the team communicate while building. In XP this is mostly **face-to-face conversation**, story cards, customer tests, unit tests and **self-documenting code**. Write a document only when it truly helps (for example a short design note).
2. **Product documentation** -- delivered to users and customers: user manuals, online help, installation guides, API documentation. It is **part of the product**, so it is planned as **stories** and must be "done done".
3. **Handoff documentation** -- written when the team hands the system to another team or disbands: an **overview of the architecture**, how to build and deploy, key design decisions and where to find things. Written at the end, when it is accurate.

## Tests and code as documentation
- **Customer tests** describe the business rules with examples.
- **Unit tests** show how each part of the code should behave.
- **Clean code with meaningful names** (ubiquitous language) explains itself.

!adv Advantages
- No time wasted on documents nobody reads
- Documentation stays accurate (tests and code cannot go out of date silently)
- Product documentation is planned and finished like any feature
!lim Challenges
- Contracts or regulations may demand formal documents
- Teams may misread agile as "no documentation"
- Handoff documents must not be forgotten at the end

!note Agile is **not** "no documentation". It is **only useful documentation**, written by the right people at the right time.
!mem **W P H**: Work-in-progress, Product, Handoff.
!write Agile view (manifesto value) → three types with diagram → tests and code as documentation → advantages → conclusion.
`

]);
