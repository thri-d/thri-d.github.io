/* Exam Tides · Agile Methodology (CS752PE) · complete answers · Unit 4: Planning */
window.GUIDE = (window.GUIDE || []).concat([

String.raw`
@id 4-1
@unit 4
@syl Vision (printed as "Version" in the syllabus)
@title Vision
@q What is a product vision? How is it identified, documented and promoted?
@one The vision is a short, shared statement of what the project will achieve, why it is valuable and how success will be judged; it guides every planning decision.

!note The syllabus prints this topic as "**Version**". In the textbook's Planning chapter the topic is **Vision**. If the paper says "Version", answer about the product vision, and you may add a line on version control (Unit 3) for safety.

## What a vision is
Every project starts from an idea. The **vision** captures that idea clearly so the whole team and all stakeholders pull in the **same direction**. Without a shared vision, stakeholders ask for conflicting features and the team cannot prioritise.

## Where visions come from
- Usually from **one visionary**: a person with a clear idea of the product and its value (often the product manager or a sponsor).
- Sometimes from a **group** of stakeholders; then someone must combine their goals into one vision.

## Identifying the vision
The **product manager** is responsible for the vision. They talk to the visionaries and stakeholders, clarify the goals and resolve conflicts.

## Documenting the vision
A vision statement is **short** (often one page) and answers:
!dia flow: What ~ what the project will accomplish | Why ~ why it is valuable to the organisation | Success criteria ~ how we will know it has succeeded ::cap **Draw this.** The three parts of a vision statement.
1. **What** the project should accomplish.
2. **Why** it is valuable (the benefit to the organisation and users).
3. **Success criteria**: measurable signs of success (for example "reduce order-processing time by half").

## Promoting the vision
- Share it with the whole team and stakeholders; **post it on the wall**.
- Refer to it in **release planning** and the **planning game** to decide priorities.
- Revisit it when goals change.

!ex A college canteen ordering app. **What**: students order and pay for food from their phones. **Why**: shorter queues and less wasted food. **Success**: average waiting time under 5 minutes within one semester.

!adv Advantages
- Keeps the team and stakeholders aligned
- Helps decide priorities in planning
- Gives a measure of success beyond deadlines
!lim Challenges
- Multiple visionaries may disagree
- A vague vision gives no real guidance
- Must be updated if business goals change

!mem Vision = **What, Why, Success**.
!write Definition → where visions come from → who identifies it → documenting (What, Why, Success criteria) with diagram → promoting → example → conclusion.
`,

String.raw`
@id 4-2
@unit 4
@syl Release planning
@title Release planning
@q Explain release planning in XP. What are minimum marketable features? Compare scopeboxed and timeboxed planning.
@ff MMF = Minimum Marketable Feature
@one Release planning decides which stories go into which release; XP releases early and often, groups work into minimum marketable features, and usually fixes the date (timeboxed) while letting scope adjust.

## One project at a time
Working on several projects at once wastes time in switching and delays every project's value. The textbook advises the team to **finish one project (release) at a time**.

## Release early, release often
Frequent releases deliver **value sooner**, give **real feedback** and reduce risk. If a project is cancelled, the value already released is kept.

!dia flow: Release 1 ~ most valuable features, value starts | Release 2 ~ next most valuable | Release 3 ~ and so on ^ Each release adds value; earlier releases earn returns sooner. ::cap **Draw this.** Releasing in small slices.

## Minimum Marketable Features (MMF)
An **MMF** is the **smallest set of functionality that has real value** to the market or users on its own. Plan releases as a series of MMFs, most valuable first. Each release contains one or more MMFs.

## The release plan
- Lists the **stories** (grouped into MMFs) for upcoming releases, **in priority order**.
- Created with the **planning game** (customers prioritise, programmers estimate).
- Displayed on the wall; updated as the team learns.

## Scopeboxed vs timeboxed planning
| Scopeboxed | Timeboxed |
| Scope (features) is fixed | Release date is fixed |
| Date moves if work takes longer | Scope adjusts to fit the date |
| Risk of endless delays | Predictable dates; least valuable stories drop out |
| | Preferred by the textbook |

## Planning horizons
Plan **near-term work in detail** and **later work roughly**: the vision for years, releases for months, MMFs and stories for weeks, tasks for days. This avoids wasting effort on detailed plans that will change.

## Adapt your plans
Re-plan every iteration using real **velocity** and new information. Keep options open: do not commit to details too early (last responsible moment).

!adv Advantages
- Value delivered early and continuously
- Plans stay realistic using measured velocity
- Least valuable work is dropped, not the important work
!lim Challenges
- Customers may want both fixed scope and fixed date
- Frequent releases need automated builds and "done done" quality
- Some markets or contracts expect one big release

!note **Release planning vs iteration planning**: release planning covers **months** and decides **which stories** go in each release; iteration planning covers **one week** and breaks chosen stories into **tasks**.
!mem **One project, early and often, MMF first, timebox the date.**
!write Purpose → one project at a time → release early and often (diagram) → MMF → the release plan → scopeboxed vs timeboxed table → planning horizons → conclusion.
`,

String.raw`
@id 4-3
@unit 4
@syl The planning game
@title The planning game
@q What is the planning game? Explain how it is played.
@one The planning game is a cooperative way of building the release plan: customers know value and set priorities, programmers know cost and give estimates, and together they produce a plan that maximises value.

## The key idea
!dia cols: Customers know value: Create stories | Set priorities | Decide what goes in the release || Programmers know cost: Estimate stories | Point out technical risks and dependencies | Say what is possible ::cap **Draw this.** Customers decide value; programmers decide cost.
Neither side can plan alone. Customers do not know how long things take; programmers do not know what is most valuable. The planning game combines both kinds of knowledge.

## How to play
1. **Anyone creates stories** -- mostly customers, written on cards.
2. **Programmers estimate** each story (in story points or ideal days).
3. **Customers place the stories in priority order** by value, considering the estimates.
4. **Programmers comment** on technical risks or dependencies; customers may reorder.
5. **Repeat** until the plan for the release is complete; draw the release line using **velocity** (how much fits).

!dia quad: Do first / high value, low cost | Plan carefully / high value, high cost | Cheap extras / low value, low cost | Question it / low value, high cost :: Cost (estimate) increases to the right :: Value increases upwards ::cap A quick way to see priorities: value against cost.

!viz ag-planning :: Try placing cards on the grid

## Rules of the game
- **Customers have the final say on priorities.**
- **Programmers have the final say on estimates.**
- Disagreements are discussed openly; the goal is the **most valuable plan**, not "winning".

!adv Advantages
- Uses each side's real expertise
- Most valuable features are built first
- Plans are realistic because estimates come from the builders
- Builds trust and shared ownership of the plan
!lim Challenges
- Needs customers who can make decisions
- Estimates can be poor early in a project
- Power struggles if roles are not respected

!note The planning game is **cooperative**, not competitive. "Game" just means it has clear rules and roles.
!mem **Customers: value and priority. Programmers: cost and estimate.**
!write Key idea (value vs cost) with diagram → how to play (5 steps) → rules → value-cost grid → advantages → conclusion.
`,

String.raw`
@id 4-4
@unit 4
@syl Risk management
@title Risk management
@q How does an agile team manage risk? Explain risk multipliers and how to make a release commitment.
@one XP manages risk in two ways: common risks are covered by risk multipliers on the schedule, and project-specific risks are listed and given indicators, mitigation and contingency plans.

## Two kinds of risk
1. **Generic (common) risks** -- risks that affect almost every project: changing requirements, staff turnover, poor estimates, sickness. These are handled with **risk multipliers**.
2. **Project-specific risks** -- risks unique to this project: a new technology, a third-party dependency, a key person. These are handled with a **risk census**.

## Risk multipliers
Teams finish late more often than early. Risk multipliers stretch the schedule according to how confident you need to be:
| Chance of meeting the date | Rigorous team | Risky team | Meaning |
| 10% | 1x | 1x | Almost impossible to meet; ignore |
| 50% | 1.4x | 2x | Stretch goal |
| 90% | 1.8x | 4x | Virtually certain; safe commitment |
A **rigorous** team follows the XP practices fully (done done, fixed bugs, steady velocity); a **risky** team does not, so its numbers vary more.

## Project-specific risks: the risk census
Brainstorm risks with the team, then for each important risk record:
- **Transition indicators** -- early signs that the risk is happening.
- **Mitigation activities** -- what you do now to reduce its chance or impact.
- **Contingency activities** -- what you will do if it happens.
- **Risk exposure** -- probability x impact, to decide which risks matter most.
!dia flow: Identify the risk | Estimate probability and impact ~ risk exposure | Choose a response ~ avoid, contain, mitigate or accept | Watch the transition indicators | Act on the contingency plan if needed ::cap **Draw this.** Handling one project-specific risk.
**Responses**: **avoid** (change the plan so the risk cannot happen), **contain** (set aside time or money for it), **mitigate** (reduce its probability or impact), or **accept** it if it is small.

## Making a release commitment
1. Use the team's **velocity** to see how many stories fit in the remaining iterations.
2. Apply the **risk multiplier** for the confidence you need (for example 1.8x for a 90 percent commitment).
3. Add time for **project-specific risks**.
4. Commit to the scope that fits; keep a **stretch goal** at the 50 percent level.
The textbook also stresses **success over schedule**: delivering value matters more than hitting an arbitrary date.

!adv Advantages
- Commitments are realistic and honest
- Problems are spotted early through indicators
- Stakeholders understand the uncertainty
!lim Challenges
- Multipliers can make schedules look long to managers
- Needs reliable velocity data
- Risk lists must be reviewed regularly

!note Exam answers often list risk responses as **avoid, contain, mitigate, accept**. Add the textbook terms **transition indicators, mitigation, contingency, risk exposure** for full marks.
!note Risk exposure = **probability x impact**.
!mem Risk census: **I M C E** -- Indicators, Mitigation, Contingency, Exposure.
!write Two kinds of risk → risk multipliers table → risk census (4 items) with diagram → responses → release commitment steps → conclusion.
`,

String.raw`
@id 4-5
@unit 4
@syl Iteration planning
@title Iteration planning
@q Explain iteration planning in XP, including velocity and tracking the iteration.
@one At the start of each one-week iteration, customers pick stories worth the team's velocity, programmers break them into tasks and estimate them, and the team commits to finishing them.

## The iteration timebox
XP iterations are usually **one week** long and start on the **same day** every week. The timebox never moves; scope adjusts instead.

## The iteration schedule
!dia cycle: Iteration demo | Retrospective | *Iteration planning | Develop and test all week @ one week ::cap **Draw this.** One iteration: demo, retrospective, planning, then development.

## How to plan an iteration
1. **Measure velocity** -- add up the estimates of the stories that were **done done** last iteration.
2. **Choose stories** -- customers pick the highest-priority stories whose estimates add up to the velocity.
3. **Break stories into engineering tasks** -- programmers write each technical task on a card (for example "create database table", "build payment screen").
4. **Estimate the tasks** -- programmers estimate tasks in hours; check that the total fits the team's capacity.
5. **Commit** -- the team commits to finishing all chosen stories by the end of the iteration. The plan goes on the wall.

!ex Last iteration the team finished stories worth **12 points**, so velocity = 12. Customers choose, in priority order: "Pay by UPI" (5), "Order history" (3), "Cancel order" (2), "Email receipt" (2) = 12 points. "Pay by UPI" is broken into tasks: payment screen (4 h), connect payment gateway (6 h), handle failed payments (3 h), customer tests (2 h). The team checks that all task hours fit its week, then commits.

## Tracking the iteration
- Task cards move across the **iteration plan on the wall** (to do, in progress, done).
- The **daily stand-up** shows progress and problems.

## When things go wrong
- First use **slack** time.
- If still behind, the **customers choose which story to remove**.
- **Partially done** work does **not** count towards velocity.
- **Emergency requests**: swap out an unstarted story of the same size, or give the work to "**the batman**" -- a team member who takes the interruptions so others can focus.

!adv Advantages
- Short, predictable planning every week
- Plans based on real velocity, not hopes
- Clear commitments build trust
- Problems are visible within days
!lim Challenges
- Needs disciplined estimating and done-done stories
- Long planning meetings if stories are unclear
- Emergencies can disrupt the plan

!note Velocity counts **only completed (done done) stories**. A story that is 90 percent done counts as zero.
!note Iteration planning breaks **stories into tasks**; release planning arranges **stories into releases**.
!mem Plan: **Velocity, Stories, Tasks, Estimates, Commit** -- "**V**ery **S**mart **T**eams **E**stimate **C**arefully."
!write Iteration timebox → schedule diagram → planning steps (5) → tracking → when things go wrong → advantages → conclusion.
`,

String.raw`
@id 4-6
@unit 4
@syl Slack
@title Slack
@q What is slack in iteration planning? Why and how is it used?
@one Slack is deliberately planned spare time in each iteration, used for useful but postponable work, so the team can absorb surprises and still keep its commitments without overtime.

## Why slack
Estimates are never perfect and problems always appear. If an iteration is planned at **100 percent** capacity, any surprise causes a **missed commitment** or **overtime**. Slack gives the team room to meet commitments **every iteration**.

!viz ag-velocity :: Move the sliders: velocity and slack

## How slack works
- The team plans a bit **less work** than it could do in a perfect week.
- The spare time is filled with **slack activities**: valuable work that can be dropped if needed.
- If a problem appears, the team **drops slack work first** and still finishes the committed stories.

!ex A team's task estimates show it can finish about 40 hours of planned tasks in a week. It commits to stories worth about 34 hours and keeps the rest as slack, filled with refactoring old code and research. On Wednesday a server problem eats 5 hours: the team drops the refactoring, and still finishes every committed story on time.

## Slack activities
!dia cols: Slack activities: Paying down technical debt | Research time (learning, experiments) | Improving tools and the build || When trouble comes: Drop slack work first | Committed stories still finish | No overtime needed ::cap **Draw this.** Slack absorbs surprises.
1. **Paying down technical debt** -- refactoring and cleaning up old code. Useful, and easy to postpone.
2. **Research time** -- time for programmers to learn and explore new tools and ideas (for example half a day per week).
3. **Improving the build, tests and tools.**

## Don't cross the line
Slack is **not** overtime. Using extra hours to cover problems hides them and causes burnout. If slack is regularly used up, the team should **reduce its commitments**.

!adv Advantages
- Commitments are met reliably every iteration
- Technical debt is reduced steadily
- Team keeps learning and improving
- Supports energized work (no overtime)
!lim Challenges
- Managers may see slack as wasted time
- Too much slack lowers delivered value
- Needs discipline to drop slack work when needed

!note Slack does **not** mean idle time. It is planned, useful work that can be dropped when an emergency appears.
!mem **Slack = shock absorber.** Debt and research first to go.
!write Definition → why slack → how it works → slack activities with diagram → don't cross the line → advantages → conclusion.
`,

String.raw`
@id 4-7
@unit 4
@syl Stories
@title Stories
@q What is a user story? Explain story cards, splitting stories, special stories and the INVEST criteria.
@ff INVEST = Independent, Negotiable, Valuable, Estimable, Small, Testable
@one A story is a short, customer-centred description of one piece of functionality, written on a card as a reminder to have a conversation; good stories follow INVEST.

## What a story is
A **story** describes a feature from the **customer's point of view**, in their language. It is not a full specification; it is a **placeholder for a conversation**. Details are worked out just in time with on-site customers and captured in **customer tests**.

Common format: **"As a [type of user], I want [goal] so that [benefit]."**
!ex As a student, I want to pay for my canteen order with UPI so that I do not need cash.

## Story cards
Stories are written on **index cards** with a short title, the estimate and the priority. Cards are easy to sort, move and tear up in the planning game. A useful summary is the **3 Cs**: **Card** (the written reminder), **Conversation** (the discussion), **Confirmation** (the tests that confirm it works).

## Customer-centricity
Stories describe **customer value**, not technical tasks. "Set up the database" is a task, not a story.

## Splitting and combining stories
- A story that is **too big** to finish in one iteration is **split** (for example by workflow step or data type).
- **Tiny** stories can be **combined** so planning stays manageable.

## Special stories
- **Documentation stories** -- product documentation such as user manuals.
- **"Non-functional" stories** -- performance, scalability or security goals, written with measurable targets.
- **Bug stories** -- bugs that need scheduling.
- **Spike stories** -- time-boxed research to reduce uncertainty for estimating.
- Meetings, architecture and refactoring are **not** separate stories; they are part of normal work.

## INVEST: qualities of a good story
!dia flow: Independent ~ can be built in any order | Negotiable ~ details agreed in conversation | Valuable ~ gives value to customers | Estimable ~ programmers can estimate it | Small ~ fits in one iteration | Testable ~ clear way to check it is done ::cap **Draw this.** INVEST, from Bill Wake.

!adv Advantages of stories
- Keep the focus on customer value
- Easy to prioritise and re-plan
- Encourage conversation instead of long documents
!lim Challenges
- Too little detail if conversations are skipped
- Hard to split some features
- Non-functional needs can be forgotten

!note INVEST comes from **Bill Wake**, not from the textbook, but it is widely expected in exam answers about stories.
!mem **INVEST** -- I N V E S T. And the **3 Cs**: Card, Conversation, Confirmation.
!write Definition and format → example → story cards and 3 Cs → splitting/combining → special stories → INVEST with diagram → conclusion.
`,

String.raw`
@id 4-8
@unit 4
@syl Estimating
@title Estimating
@q How are stories and tasks estimated in XP? Why are consistent estimates more important than accurate ones?
@one XP teams estimate stories in story points or ideal days, compare new stories with past ones, and rely on velocity to turn consistent estimates into an accurate schedule.

## What works: consistent, not perfect
Nobody can estimate perfectly. XP does not need accuracy; it needs **consistency**. If the team always estimates the same way, **velocity** automatically corrects the scale.
!ex If the team always under-estimates by half, it will finish about half the points it planned. Velocity then shows the real rate, and future plans use that rate. The schedule becomes accurate even though each estimate is "wrong".

## Units of estimation
- **Ideal time (ideal days)** -- how long a story would take with no interruptions or meetings.
- **Story points** -- a relative size number (for example 1, 2, 3, 5, 8); a 2-point story is about twice as big as a 1-point story.

## Estimating stories
1. The programmers **discuss the story** with the customer to understand it.
2. They **compare it with stories estimated earlier** ("this is like the login story, so about 2 points").
3. They agree on an **estimate**; if they cannot estimate, they need a **spike** or must **split** the story.
4. Large stories are split until they fit in an iteration.
A popular way to agree is **planning poker**: each programmer shows a card with their estimate at the same time, then they discuss differences.

## Estimating tasks
During iteration planning, stories are broken into tasks and estimated in **hours** to check the iteration plan fits.

!dia cycle: Estimate stories consistently | Finish iteration | Measure velocity | Plan next iteration with velocity @ self-correcting ::cap **Draw this.** Why consistent estimates are enough.

## Improving velocity (the right way)
- Pay down **technical debt**.
- Improve **customer availability** and answers.
- Support **energized work**; avoid distractions and extra duties.
- Do **not** inflate estimates or push people to work longer.

!adv Advantages
- Fast, low-effort estimation
- Velocity makes plans accurate over time
- Estimates are made by the people who will do the work
!lim Challenges
- First iterations have no velocity history
- Estimates can be pressured by managers
- New technology makes estimates uncertain (use spikes)

!note **Story points cannot be compared between teams.** Each team's points are its own scale.
!note Estimates are **not commitments**. The commitment is made after applying velocity and slack.
!mem **Consistent estimates + velocity = accurate plans.**
!write Consistency over accuracy (with example) → units (ideal time, points) → estimating stories (steps) → tasks → velocity cycle diagram → improving velocity → conclusion.
`

]);
