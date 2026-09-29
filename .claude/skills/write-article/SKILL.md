---
name: write-article
description: How to write a blog article for the SinnConsulting blog (blog.sinn.consulting) — audience, research, structure, voice, agent-first fields and the review checklist. Use when asked to write, draft, outline, rewrite or edit a blog post or article. For creating the file and filling its frontmatter, use the new-post skill.
---

# Writing an article for the SinnConsulting blog

The blog is read by developers and by their AI agents. Every article must be useful to a
person skimming it and correct enough that an agent can act on it.

## 1. Brief before writing

Settle these before drafting; ask the user only if they are genuinely unclear:

- **Reader:** who is it for, and what do they already know? (Goes into `audience`.)
- **Promise:** one sentence: what can the reader do after reading that they couldn't before?
  This becomes the `summary`. If you can't write it in under 200 characters, the topic is too broad.
- **Sources:** the primary material the article is based on (repo README, docs, code, release
  notes, the user's own notes).

## 2. Research: facts come from sources, never from memory

- Read the primary sources before writing. For a tool or repo: README, docs, config/settings
  reference, and code where the README is vague.
- Every command, flag, setting name, default value, version number and quote must be copied
  from a source you read in this session. If you can't verify something, leave it out or ask.
- Link the source the first time a tool is mentioned (repo, docs, marketplace page).
- Quotes: short, attributed, and exactly as in the source.
- Never mention or link private repositories or anything the user hasn't
  said is public. Never include other people's personal data.

## 3. Structure

- **Opening (2–4 sentences):** the reader's problem, then what the article gives them. No
  "In this article we will…", no history lesson.
- **Sections as `##` headings.** Only `##` shows in the "On this page" sidebar; use `###` sparingly,
  never deeper. No `#` H1 — the title comes from frontmatter.
- One idea per section. A reader skimming only the headings should get the argument.
- **Show, then explain:** a command, config snippet or table first, a sentence on why after.
- Tables for comparisons, numbered lists for steps, bullets for sets of equal items.
- **End** with something to do: a checklist, next step or link. Not a summary of the summary.
- Length follows the promise: a cheatsheet can be 300 words, a guide 1,500–2,500. Cut anything
  that doesn't serve the promise.

## 4. Voice

- Plain, direct English. Short sentences. Second person ("you") for guides.
- Concrete over abstract: "restarts at 35% context" beats "keeps context fresh".
- No hype or filler: "seamless", "powerful", "game-changer", "unlock", "leverage", "in today's
  fast-paced world". No exclamation marks.
- Be honest about limits, costs and risks (security, rate limits, pricing). Readers trust
  posts that name the catch.
- Title in Title Case, section headings in sentence case.
- Code blocks always name their language (```sh, ```ts, ```yaml, ```text for trees/output).
- Name products as their owners write them (Claude Code, VS Code, GitHub). Don't imitate other
  brands' logos or styles in images.

## 5. Agent-first fields (write them last, they summarize the finished article)

- `summary`: the promise, one line, ≤ 200 characters. Appears in llms.txt, RSS, link previews.
- `tldr`: 3–5 standalone takeaways. Each must make sense without the article; an agent may
  quote only these.
- `tags`: reuse existing tags (`npm run new` lists them); add a new one only for a genuinely new
  topic. Lowercase kebab-case.
- `authors`: include `claude` whenever Claude drafted or substantially wrote the text. Never hide it.

## 6. Images

- Only when they show something text can't (UI, diagram, before/after).
- Store under `public/images/<slug>/`, reference as `/images/<slug>/name.webp`. Never hotlink
  (the privacy policy promises no third-party requests). Always write alt text.
- Only use images you have rights to: your own screenshots, or ones the user supplies.

## 7. Review checklist (do this before handing over)

- [ ] The opening states the problem; the summary states the promise.
- [ ] Every command, flag, default and quote was checked against a source read this session.
- [ ] Headings alone tell the story; no H1 in the body; nothing deeper than `###`.
- [ ] No hype words, no filler, no private repos or personal data.
- [ ] Code blocks have languages; images have alt text and live in `public/images/<slug>/`.
- [ ] `summary`, `tldr`, `tags`, `authors`, `audience` are filled and honest.
- [ ] `npm run build` passes (it runs `scripts/check-posts.mjs` first).

Then follow the **new-post** skill to create the file, populate it and publish.
