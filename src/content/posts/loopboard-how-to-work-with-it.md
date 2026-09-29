---
title: "Stop Prompting, Start Piloting: How to Get the Most Out of LoopBoard"
summary: A practical guide to LoopBoard, the VS Code board where Claude Code loops groom, build and deliver while you only promote, approve and send back.
tldr:
  - You have three buttons (Promote, Approve, Demote); loops never promote, approve, commit to main or merge.
  - Write stories like a colleague brief and read the groomed Goals before you promote.
  - Answer Feedback questions fast; the loop resumes right away.
  - Put standing instructions in LOOP.md; running loops pick them up on the next pass.
  - Everything is plain markdown in .loopboard/, and the board is only a view of it.
tags: [claude-code, loopboard, agents, vscode]
authors: [marcel, claude]
audience: developers using Claude Code
date: 2026-09-29
---

> "I don't prompt Claude anymore. I have loops running that prompt Claude and figure out what to do. My job is to write loops."
>
> — Boris Cherny, creator of Claude Code

Most of us don't work like that yet. We open a Claude Code session, explain the task, paste some context, type "continue" a few times, check the result, then do it all again for the next task. The AI does the building, but we're still stuck babysitting it.

LoopBoard is built to end that. It's a VS Code extension that turns a folder of plain markdown files into a Kanban board. Claude Code loops running in the background groom, build and deliver the tasks on that board. Your part comes down to three decisions: **what starts, what ships, and what goes back.**

Or in the project's own words: *Claude Code is the engine. LoopBoard is the cockpit. You're still the pilot.*

This article covers how to fly it well.

---

## The mental model: you're the gatekeeper, not the typist

First, understand what LoopBoard deliberately does *not* let the loops do:

- Loops **never promote** a story into the Backlog.
- Loops **never approve** their own work.
- Loops **never commit to `main`** and **never merge**.

Those calls stay with you. As the human, you only have three buttons: **Promote**, **Approve** and **Demote**. Everything else is a field in a markdown file that the loops read on their next pass.

That limit is the whole design. You don't need to watch every keystroke because nothing reaches your main branch without passing your gates. The loops can run on their own because they can't get past them.

Once this clicks, the workflow is straightforward:

| You | The loops |
|---|---|
| Write a story in plain words | Groom it into problem, description, goals, questions |
| **Promote** New → Backlog | Claim the top Backlog task |
| Answer questions | Resume the parked task |
| Write review feedback | Rework and deliver again |
| **Approve** Review → `DONE.md` | Nothing. It's done. |

---

## Step 0: Get set up (five minutes, tops)

You need VS Code 1.90+ and a logged-in **Claude Code CLI, version 2.1.0 or newer**. Then:

1. Install LoopBoard from the VS Code Marketplace.
2. Run **LoopBoard: Initialize Workspace**. This creates a `.loopboard/` folder.
3. Add that folder to your `.gitignore`:
   ```sh
   echo '.loopboard/' >> .gitignore
   ```
   LoopBoard won't do this for you. It never touches files outside `.loopboard/`. Do it anyway: debug logs record values verbatim, and attached screenshots land in `.loopboard/cache/`.
4. Write your first story and press **▶** on a loop in the sidebar.

**Tip:** If a loop terminal closes the moment it opens, check `claude --version`. Older CLIs reject the `--name` flag, and VS Code can't show you why.

---

## Habit 1: Write stories like you're briefing a colleague

Click **New Story** and just write. No template, no ticket syntax. Describe what you want the way you'd explain it to a smart teammate over coffee.

Then pick two roles:
- **Who grooms it.** By default that's the Opus loop, the thinker.
- **Who builds it.** By default that's the Sonnet loop, the doer.

The groomer expands your rough brief into a structured story:

- **Problem**: why the task exists.
- **Description**: the groomed story.
- **Goals**: verifiable outcomes. These matter most, because review judges the delivery against them.
- **Questions**: decisions that belong to you, often with one-click suggested answers.

**Working well means:** read the Goals before you promote. If a goal is vague, the delivery will be too. Also attach screenshots. Paste, drop or click **＋ Attach** right on the card. A picture of the broken UI beats three paragraphs describing it.

---

## Habit 2: Treat Promote as a real decision

Loops only claim work from the **Backlog**. A story sitting in **New** is safe. Nothing happens to it until you promote it.

So promote on purpose. Before you click, ask yourself:
- Are all the questions answered?
- Would I accept a delivery that meets exactly these Goals, and nothing more?

If a story isn't ready, **Demote** sends it back to New with nothing lost. That's refused once a loop has claimed it, which is one more reason to decide before you promote.

**Power move: right-click Promote.** This arms an *automatic* promote, and the checkmark turns into a spinner. LoopBoard waits until every open question is answered and folded into the story by the groomer, then promotes it once nothing has been open for 30 seconds. It's ideal when you've answered the last question and want to go get lunch.

---

## Habit 3: Answer questions quickly

A well-behaved loop doesn't guess. When it hits a decision that's yours, it parks the task in **Feedback** with a question and stops.

This is a feature, not friction. A wrong guess costs you a review round, while a quick answer costs you ten seconds.

Once you answer, LoopBoard **nudges** that loop's terminal so it picks the task up right away instead of waiting for its next scheduled pass. It does this without interrupting any work in flight.

**Working well means:** check the Feedback column the way you'd check your messages. The faster you answer, the faster the loop continues.

---

## Habit 4: Review against the Goals, then decide

Delivered work lands in **Review** with a `## Delivered` summary and a link to its PR or branch. Loops work on `task/**` branches, never on `main`.

Now you have two options:

- **Not right?** Write review feedback. The loop reworks the task and delivers it again. Be specific, and point at the Goal that wasn't met.
- **Right?** Click **Approve**. The task moves to `DONE.md`, and its task file stays in `tasks/` for the record.

Merging the PR is still your call. LoopBoard deliberately stays out of it.

**Want a second pair of eyes?** Turn on `loopBoard.delegateReview`. A review subagent then checks the implementer's PR against the Goals *before* it reaches you. It's off by default, and worth switching on once you trust your Goals.

---

## Habit 5: Run your loops like a small team

Each **▶** in the sidebar opens a VS Code terminal named `Claude <Model>` running a real `claude` command on a `/loop`. There's one terminal per model slot: `opus`, `sonnet` and `fable`.

A few things make this setup work well over a long day:

**Split thinking from doing.** The defaults (Opus grooms, Sonnet builds) are a good start. Tune each slot's `--model` and `--effort` in the settings grid, and pay for deep reasoning only where it matters.

**Keep context fresh.** A context bar under each loop shows how full its session is. By default, a loop restarts at **35%** context (`loopBoard.contextLimit.percent`). A loop that holds the In Progress task is never interrupted; the restart waits. Fresh context means sharper work, so leave this on.

**Schedule instead of hovering.** Right-click ▶, ♻ or ■ to schedule a start, restart or stop, anywhere from 15 minutes to 4 hours, with an optional **Repeat**. Want the loops to stop before your laptop goes in your bag? Schedule it. Restarts and stops politely wait for running work unless you choose **Force**.

**Let idle loops sleep.** `loopBoard.idleStop.enabled` stops a loop after it has had nothing to do for a set time (60 minutes by default), with a 30-second warning first.

**Only one task is In Progress at a time**, across the whole board. That's deliberate. The sidebar always shows you which one.

---

## Habit 6: Put your rules in LOOP.md, not in your head

Every loop re-reads `.loopboard/LOOP.md` on every pass. That makes it the place for standing instructions.

Add a custom section for your workspace:

```markdown
<!-- loopboard:custom:begin -->
## Custom rules (workspace)
1. Open a PR before moving a task to Review.
2. Run `make check` before every delivery.
3. Never touch files under `legacy/`.
<!-- loopboard:custom:end -->
```

What makes this useful:
- **It's live.** Running loops pick up your rules on their next pass. No restart needed.
- **Your rules win.** Where a custom rule contradicts a built-in one, the loops follow yours.
- **It survives updates.** Template sync only rewrites LoopBoard's own `loopboard:sync:` blocks and leaves your section alone.

Each time you catch yourself writing the same review feedback twice, turn it into a rule here.

**Advanced:** the LoopBoard repo ships three effort-tiered agents (`loop-medium`, `loop-high`, `loop-xhigh`) in `.claude/agents/`. Copy them into your project and add a delegation rule, and your loops pick the effort level per task instead of using one setting for everything. Remember to restart the loop (♻) after adding agent files, because they're read at session start.

---

## Habit 7: Remember it's all just markdown

This is quietly LoopBoard's best feature. **The markdown is the source of truth.** The board is a live view of `.loopboard/`, never a second database.

```text
.loopboard/
  TODO.md          task index: one entry per active task
  DONE.md          approved tasks, newest first
  LOOP.md          workflow rules + loop instructions
  tasks/<id>.md    per task: problem, description, goals, worklog, delivered
  cache/<id>/      attached images
```

- Click on the board and the file changes. Edit the file and the board repaints.
- Saves are field-level and atomic (temp file + rename), so you, the board and several loops can safely share the same file.
- If you uninstall LoopBoard, only `.loopboard/` remains: plain files you own.

**Working well means:** don't be afraid to open `TODO.md` directly. Bulk-edit tasks in your editor, grep your task history, or diff a task file to see what a loop changed.

---

## The fine print you should actually read

**Security.** A loop is an autonomous `claude` session that follows whatever `LOOP.md` and your task files say, with your configured permission mode. That makes a `.loopboard/` folder you didn't write, such as one in a cloned repo, a prompt-injection risk. **Read `LOOP.md` before pressing ▶ in a repo you didn't author.** LoopBoard helps here: every `loopBoard.*` setting is user-scoped only, so a repo's `.vscode/settings.json` can never raise how much authority your agent gets.

**Usage volume.** Several loops running around the clock at the default 5-minute interval can exceed what Pro and Max plans consider "ordinary, individual usage" and get you rate-limited. Use the idle stop, scheduling and sensible intervals.

---

## Your first day with LoopBoard: a checklist

- [ ] Install, initialize, add `.loopboard/` to `.gitignore`
- [ ] Write one small, well-scoped story, like a bug you already understand
- [ ] Start the Opus and Sonnet loops
- [ ] Read the groomed Goals and answer the Questions
- [ ] Promote it
- [ ] Watch it land in Review, then read the PR against the Goals
- [ ] Approve or send it back
- [ ] Write your first custom rule in `LOOP.md` based on what you noticed

Then do it again with two stories. Then five.

---

## Final thought

LoopBoard doesn't make Claude smarter. It changes where your attention goes. Instead of typing prompts all day, you write good stories, make clear decisions, and set rules that make every future loop a bit better.

That's the shift Boris was talking about. The job isn't prompting anymore. It's writing loops, and LoopBoard gives you a cockpit to fly them from.

*Less prompting. No babysitting. More building.*

---

**Get LoopBoard:** [GitHub](https://github.com/SinnConsulting/LoopBoard) · [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=SinnConsulting.loopboard-todo) · Community: [r/LoopBoard](https://www.reddit.com/r/LoopBoard/)
