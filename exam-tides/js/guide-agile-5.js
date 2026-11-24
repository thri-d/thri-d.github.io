/* Exam Tides · Agile Methodology (CS752PE) · complete answers · Unit 5: Developing */
window.GUIDE = (window.GUIDE || []).concat([

String.raw`
@id 5-1
@unit 5
@syl Incremental requirements
@title Incremental requirements
@q How are requirements handled incrementally in XP?
@one XP does not write a big requirements document up front; on-site customers act as a living requirements document and work out details just in time, story by story, captured in mock-ups and customer tests.

## The traditional approach and its problem
Traditional projects write a large **requirements specification** before development. By the time it is finished, requirements have changed, and much of the document is never used or is misunderstood.

## The living requirements document
In XP, the **on-site customers** are the requirements document. They are always available to answer questions, so details do not need to be written in advance. Written artefacts are kept small: **vision, stories, mock-ups and customer tests**.

## Work incrementally
!dia flow: Vision ~ the big picture, months ahead | Release plan and features ~ weeks ahead | Stories ~ chosen for the iteration | *Details ~ worked out just before and during development | Customer tests and review ~ confirm it is right ::cap **Draw this.** Requirements get detailed only when they are needed.
- **Vision** first, then **features** and **stories**, then details **just in time**.
- **Rough expectations** -- before an iteration, customers prepare enough detail for programmers to estimate.
- **Mock-ups** -- sketches of screens help discuss the user interface.
- **Customer tests** -- concrete examples of business rules become the precise requirement.
- **Completion criteria** -- customers say what "finished" looks like for each story.
- **Customer review** -- customers check each story as it is built and in the iteration demo.

!adv Advantages
- Requirements stay current as needs change
- Less wasted effort on unused documents
- Fast answers from on-site customers
- Precise rules captured as tests
!lim Challenges
- Needs customers available all the time
- Harder for contracts that demand a full specification
- Knowledge can be lost if customers leave and nothing is written

!note Incremental requirements does **not** mean "no requirements". It means requirements are detailed **at the last responsible moment**, then fixed precisely in customer tests.
!mem **Vision → stories → details just in time → customer tests.**
!write Problem with big up-front requirements → living requirements document → incremental flow diagram → the six techniques → advantages → conclusion.
`,

String.raw`
@id 5-2
@unit 5
@syl Customer tests
@title Customer tests
@q What are customer tests? Explain describe, demonstrate and develop.
@ff Fit = Framework for Integrated Test; TDD = Test-Driven Development
@one Customer tests are concrete examples of business rules, written with the customers, that are automated to confirm the software does what customers want.

## What they are
Customer tests (also called **acceptance tests**) check **business rules** from the customer's point of view. Unlike unit tests, which programmers write to check code, customer tests are **defined by customers and domain experts**.

## Describe, demonstrate, develop
!dia flow: Describe ~ customers explain the rule in their own words | Demonstrate ~ customers give concrete examples, often as a table | Develop ~ programmers automate the examples as tests and make them pass ::cap **Draw this.** The three Ds of customer tests.
1. **Describe** -- the domain expert explains the business rule, for example how a discount works.
2. **Demonstrate** -- the expert gives **concrete examples** with inputs and expected results. Examples are clearer than abstract descriptions and reveal hidden cases.
3. **Develop** -- programmers turn the examples into **automated tests** and write code until they pass. The tests stay in the build forever.

!ex A canteen discount rule.
| Order total (Rs) | Student has a meal card? | Discount (Rs) |
| 80 | No | 0 |
| 150 | No | 10 |
| 150 | Yes | 25 |
| 300 | Yes | 50 |
Each row becomes an automated check.

## Tools
Tables like the one above can be run directly by tools such as **Fit (Framework for Integrated Test)** and **FitNesse**, created by Ward Cunningham. Today, tools like Cucumber are also common.

## Focus on business rules
Customer tests should test **business logic**, not the user interface. Screen tests are slow and break easily.

!adv Advantages
- Requirements become precise and unambiguous
- Customers can read and trust the tests
- Regression protection: rules keep working after changes
- Clear definition of "done" for each story
!lim Challenges
- Customers must invest time in writing examples
- Automating some tests needs tooling effort
- Poor examples lead to wrong tests

!note **Customer tests vs unit tests**: customer tests check **what** the business needs, in customer language; unit tests (from TDD) check **how** the code works, written by programmers.
!mem **Describe, Demonstrate, Develop** -- the three Ds.
!write Definition → three Ds with diagram → example table → tools (Fit, FitNesse) → focus on business rules → advantages → conclusion.
`,

String.raw`
@id 5-3
@unit 5
@syl Test-driven development
@title Test-driven development (TDD)
@q Explain test-driven development with an example. What are its benefits?
@ff TDD = Test-Driven Development
@one In TDD, programmers write a small failing test first, then just enough code to pass it, then clean up, repeating this red-green-refactor cycle every few minutes.

## The TDD cycle
!dia cycle: *Think ~ what is the next small step? | Red ~ write a failing test | Green ~ write just enough code to pass | Refactor ~ clean up, tests still pass @ every few minutes ::cap **Draw this.** Think, red, green, refactor, repeat.
1. **Think** -- decide the next very small piece of behaviour (a few lines of code).
2. **Red bar** -- write a test for it and run it; it **fails** (red), proving the test works.
3. **Green bar** -- write the **simplest code** that makes the test pass (green).
4. **Refactor** -- improve the design of the code and tests; run the tests again; they must stay green.
5. **Repeat** -- each cycle takes about **one to five minutes**.

## Example: a leap-year function
Rule: a year is a leap year if divisible by 4, except years divisible by 100, unless also divisible by 400.
| Cycle | Test (red) | Code to pass (green) |
| 1 | isLeap(1996) is true | return y % 4 == 0 |
| 2 | isLeap(1900) is false | add: and y % 100 != 0 |
| 3 | isLeap(2000) is true | add: or y % 400 == 0 |
| Refactor | All tests stay green | extract a helper divisible(y, n) |

!viz ag-tdd :: Step through the cycles

## Kinds of tests in TDD
- **Unit tests** -- test one class or method in isolation; very fast.
- **Focused integration tests** -- test the connection to one external thing, such as the database.
- **End-to-end tests** -- test the whole system; slow, so use few.
Speed matters: the whole unit test suite should run in **seconds**, so it can be run after every small change.

## TDD with legacy code
Code without tests is hard to change safely. Add tests around the part you need to change first, then use TDD for the change.

!adv Advantages
- Very few defects; bugs caught within minutes
- Tests document how the code should behave
- Encourages simple, decoupled design
- Safe refactoring with a full test safety net
- Confidence to change code later
!lim Challenges
- Feels slow at first; needs practice
- Hard to apply to user interfaces and legacy code
- Badly written tests become a maintenance burden

!note TDD is a **design technique**, not just testing. Writing the test first forces you to decide how the code will be used.
!note The test **must fail first**. A test that passes before you write the code proves nothing.
!mem **Red, Green, Refactor.** Small steps, run the tests every time.
!write Definition → cycle diagram and 5 steps → worked example (leap year) → kinds of tests → TDD with legacy code → advantages and challenges → conclusion.
`,

String.raw`
@id 5-4
@unit 5
@syl Refactoring
@title Refactoring
@q What is refactoring? Explain code smells and how to refactor safely.
@ff TDD = Test-Driven Development
@one Refactoring is improving the design of existing code in small steps without changing its behaviour; code smells are the warning signs that tell you where to refactor.

## Definition
**Refactoring** means changing the **internal structure** of code to make it easier to understand and change, **without changing what it does**. The term was popularised by Martin Fowler's book *Refactoring*. In XP, refactoring is done **continuously**, as the third step of the TDD cycle.

## Reflective design
Instead of designing everything up front, XP programmers **look at the existing code**, notice where the design is weak, and improve it. This is called **reflective design**.

## Code smells (signs that code needs refactoring)
| Smell | What it means |
| Divergent change and shotgun surgery | One class changes for many reasons; or one change needs edits in many classes |
| Primitive obsession and data clumps | Using basic types (strings, numbers) instead of small classes; the same group of values always passed together |
| Data class and wannabe static class | A class with only data and no behaviour; a class with only static methods |
| Coddling nulls | Checking for null everywhere instead of handling it once |
| Time dependencies and half-baked objects | Methods must be called in a special order; objects not usable until extra setup |

## How to refactor
!dia flow: Notice a smell | Make one small change ~ for example rename, extract method | Run the tests ~ they must stay green | Repeat ~ many tiny steps | Check in ~ improved design, same behaviour ::cap **Draw this.** Refactoring in small, safe steps.
Common refactorings: **Rename** (clear names), **Extract Method** (pull out a block into a named method), **Move Method** (to the class that uses its data), **Introduce Parameter Object** (replace a data clump with a class).

!ex A 60-line method calculates a bill, applies discounts and prints a receipt. Refactor by extracting **calculateTotal()**, **applyDiscount()** and **printReceipt()**. Behaviour is the same, tests still pass, but each part is now easy to read and change.

!adv Advantages
- Code stays clean and easy to change
- Pays down technical debt
- Finds hidden bugs while reading code
- Makes adding features faster later
!lim Challenges
- Needs a good test suite to be safe
- Large refactorings are risky; must be split into small steps
- Managers may see it as "no visible progress"

!note Refactoring **never adds features and never fixes bugs on purpose**; those change behaviour. If behaviour changes, it is not refactoring.
!mem Smell pairs: **Divergent/Shotgun, Primitive/Clumps, Data/Static, Nulls, Time/Half-baked.**
!write Definition → reflective design → code smells table → how to refactor (diagram, common refactorings) → example → advantages → conclusion.
`,

String.raw`
@id 5-5
@unit 5
@syl Incremental design and architecture
@title Incremental design and architecture (with simple design)
@q Explain simple design and incremental design and architecture in XP.
@ff YAGNI = You Aren't Gonna Need It; DRY = Don't Repeat Yourself; TDD = Test-Driven Development
@one XP builds the simplest design that works today and improves it continuously, at the level of methods, classes and the whole architecture, instead of designing everything up front.

## Simple design
XP code should be as **simple** as possible for today's needs. Principles:
1. **You Aren't Gonna Need It (YAGNI)** -- do not build features or flexibility "for the future"; build them when they are actually needed.
2. **Once and only once** (similar to **DRY, Don't Repeat Yourself**) -- every idea appears in exactly one place in the code; remove duplication.
3. **Self-documenting code** -- clear names and structure, so comments are rarely needed.
4. **Isolate third-party components** -- wrap external libraries behind your own interface so they can be replaced.
5. **Limit published interfaces** -- interfaces that others depend on are hard to change, so publish few.
6. **Fail fast** -- detect errors early and stop with a clear message instead of continuing with bad data.

## Incremental design
Design happens **continuously**, a little at a time, as the code grows:
!dia flow: Simple design today ~ just enough for current stories | New story arrives | Code grows and duplication appears | Refactor to a better design | *Design improves step by step ^ Design improves continuously, never all at once. ::cap **Draw this.** Incremental design.
- **Methods** -- designed in minutes using TDD and refactoring.
- **Classes** -- improve as patterns appear; split or merge classes when needed.
- **Architecture** -- the large-scale structure also evolves; programmers improve it bit by bit, often using slack time.

## Risk-driven architecture
Some architectural decisions are risky (for example scalability). Address the **riskiest** ones early, using **spike solutions** if needed, but still avoid building more than the current stories require.

!adv Advantages
- No time wasted on unused designs
- Design fits real needs, discovered over time
- Code stays easy to change
- Lower cost of change throughout the project
!lim Challenges
- Needs strong refactoring skill and good tests
- Hard for teams used to big up-front design
- Some decisions (platform, language) are expensive to change later

!note XP does **not** mean "no design". It means design **every day**, in small steps, instead of all at the start.
!mem Simple design: **Y O S I L F** -- YAGNI, Once and only once, Self-documenting, Isolate, Limit interfaces, Fail fast.
!write Simple design (6 principles) → incremental design with diagram (methods, classes, architecture) → risk-driven architecture → advantages → conclusion.
`,

String.raw`
@id 5-6
@unit 5
@syl Spike solutions
@title Spike solutions
@q What is a spike solution? When and how is it used?
@ff TDD = Test-Driven Development
@one A spike solution is a small, quick, throw-away experiment that answers one technical question, so the team can estimate or design with confidence.

## What a spike is
When the team does not know how to do something (a new library, a hard algorithm, an unknown API), it writes a **spike**: a tiny program that explores **just that question**. The name suggests driving a spike straight through a problem to see what is on the other side.

## Performing the experiment
!dia flow: A technical question ~ "Can this payment API handle refunds?" | Write a tiny program ~ separate from production code | Get the answer ~ yes or no, and how | *Throw the code away ~ keep the knowledge ::cap **Draw this.** A spike answers one question.
- Keep it **small and focused**: only enough code to answer the question.
- Do it **outside the production code**, for example in a separate folder.
- **Timebox** it: an hour or a day, not weeks.
- **Throw the code away** afterwards; rewrite properly with TDD if the idea is used.

## When to spike
- When programmers **cannot estimate** a story because of technical uncertainty.
- Before choosing between **design or technology options**.
- To test a **risky** assumption early (performance, compatibility).

## Scheduling spikes
Small spikes are done during normal work. Larger ones become **spike stories** in the planning game, with their own estimate and timebox.

!adv Advantages
- Reduces technical risk early
- Makes estimates possible and more reliable
- Cheap: small time investment
- Keeps experimental code out of production
!lim Challenges
- Temptation to keep spike code in production
- Can expand beyond the timebox
- Answers only the specific question asked

!note Spike code is **thrown away**. It was written quickly without tests, so it is not production quality.
!mem **One question, small code, timeboxed, thrown away.**
!write Definition → performing the experiment with diagram → when to spike → spike stories → advantages → conclusion.
`,

String.raw`
@id 5-7
@unit 5
@syl Performance optimisation
@title Performance optimisation
@q How should an XP team approach performance optimisation?
@one XP optimises only when there is a real, measurable performance need: measure first, find the actual bottleneck, fix it, and measure again.

## The principle: measure, don't guess
Programmers often guess which code is slow, and are usually wrong. Optimising the wrong code wastes time and makes the code complex. XP optimises **only with measurements** and only when there is a **business need**.

## How to optimise
!dia cycle: Define the target ~ performance story | Measure ~ profile the real system | Find the bottleneck | *Optimise that part only | Measure again @ repeat until target met ::cap **Draw this.** The optimisation loop.
1. **Define the target** in a **performance story**, with measurable criteria.
2. **Measure** the current performance using a **profiler** or timing tests under realistic conditions.
3. **Find the bottleneck** -- the single part that limits performance (Theory of Constraints).
4. **Optimise** that part only.
5. **Measure again** to confirm the improvement; repeat until the target is met, then stop.

## When to optimise
- When a **performance story** in the plan requires it.
- **Not** "just in case" during normal coding; that is **premature optimisation**. Keep code simple and clean first; clean code is easier to optimise later.

## Writing a performance story
Performance goals must be **specific and measurable**:
!ex "The search results page loads in under 1 second for 100 simultaneous users on our standard server." Not: "The page should be fast."

!adv Advantages
- Effort goes where it actually helps
- Code stays simple until speed is truly needed
- Measurable targets avoid endless tuning
!lim Challenges
- Needs realistic test environments and data
- Some performance problems are architectural and costly to fix late
- Profiling tools need skill

!note "Premature optimisation is the root of all evil" (Donald Knuth). XP's version: **measure first, then optimise the bottleneck only**.
!mem **Target, Measure, Bottleneck, Fix, Measure again.**
!write The principle (measure, don't guess) → optimisation loop diagram and steps → when to optimise → performance stories with example → advantages → conclusion.
`,

String.raw`
@id 5-8
@unit 5
@syl Exploratory testing
@title Exploratory testing
@q What is exploratory testing? Explain the tools and heuristics used.
@one Exploratory testing is skilled, unscripted testing in which the tester learns about the software, designs tests and runs them at the same time, to find the problems that the team's other tests missed.

## What it is
In XP, programmers and customers already write automated unit and customer tests. **Exploratory testing** is done by **testers** to find what those tests **missed**. It is **simultaneous learning, test design and test execution**: the tester explores the software, notices something odd, and immediately tries new tests around it.

Its purpose in XP is to **test the process**: if exploratory testing finds a bug, the team does **root-cause analysis** and fixes the process that let it through.

## The four tools of exploratory testing
!dia cols: 1 Charters: a short mission for a session | e.g. "explore checkout with invalid cards" || 2 Observation: watch closely | notice anything unusual || 3 Notetaking: record what was tried | and what was found || 4 Heuristics: rules of thumb | for choosing test ideas ::cap **Draw this.** Four tools of exploratory testing.
1. **Charters** -- a short statement of what to explore in a timeboxed session (for example 60 to 90 minutes).
2. **Observation** -- paying close attention to everything the software does, not just the expected result.
3. **Notetaking** -- recording what was tested, ideas and issues, so findings can be reported and repeated.
4. **Heuristics** -- rules of thumb that suggest good test ideas.

## Heuristics (test ideas)
| Heuristic | Try |
| None, some, all | No items, a few items, every item (for example an empty cart, one item, full cart) |
| Goldilocks | Too big, too small, just right (for example name length) |
| Position | Beginning, middle, end (for example of a list or text) |
| Count | Zero, one, many |

!adv Advantages
- Finds bugs that scripted tests miss
- Adapts quickly to what the tester learns
- Little preparation needed
- Exposes gaps in the team's process
!lim Challenges
- Depends heavily on the tester's skill
- Harder to repeat exactly than scripted tests
- Coverage is hard to measure

!note Exploratory testing is **not random clicking**. It is guided by charters, careful observation, notes and heuristics.
!mem Tools: **C O N H** -- Charters, Observation, Notetaking, Heuristics. Heuristics: **None-Some-All, Goldilocks, Position, Count**.
!write Definition (learn, design and run at once) → purpose in XP → four tools with diagram → heuristics table → advantages → conclusion.
`

]);
