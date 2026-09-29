---
name: new-post
description: Create, populate, preview and publish a post in the SinnConsulting blog — scaffold with `npm run new`, fill every frontmatter field correctly, run the checks, verify the agent outputs and commit. Use when adding a new article, importing a draft into the blog, or switching a draft to published. For how to write the text itself, use the write-article skill.
---

# Creating and publishing a post

Run everything from the blog's root (the folder with `package.json`). Posts live in
`src/content/posts/<slug>.md`; the file name is the URL (`/<slug>/`, raw at `/<slug>.md`).

## 1. Scaffold

```sh
npm run new -- "Post Title in Title Case" --tags claude-code,agents --authors marcel,claude --audience "developers using Claude Code"
```

- Creates `src/content/posts/<slug>.md` with `status: draft`, today's `date` and TODO placeholders.
- The slug comes from the title (kebab-case, max 60 chars). Pass `--slug short-name` for a
  shorter, stable URL. Slugs never change after publishing (links and history depend on them).
- The script prints existing tags. Reuse them; it flags new ones.
- Importing an existing draft: scaffold first, then paste the body below the frontmatter.

## 2. Populate the frontmatter

Schema: `src/content.config.ts`. Editorial rules: `scripts/check-posts.mjs`.

| Field | Rule |
|---|---|
| `title` | Title Case, quoted. Specific, promises an outcome. |
| `summary` | One line, ≤ 200 chars, no TODO. The article's promise. Used in llms.txt, RSS, previews, `<meta description>`. |
| `tldr` | 3–5 quoted items, each a standalone takeaway. |
| `tags` | ≥ 1, lowercase kebab-case, reuse existing ones. |
| `authors` | Ids from `src/data/site.ts` (`marcel`, `claude`). Include `claude` if Claude wrote or co-wrote it. |
| `audience` | Who it's for, e.g. `"developers using Claude Code"`. |
| `date` | Publication date `YYYY-MM-DD`. Set it to the actual publish day when switching to published. Never in the future. |
| `updated` | Optional. Only for a meaningful revision; otherwise the History tab shows edits. |
| `status` | `draft` until the user approves; then `published`. Drafts are never built into the site. |

Adding a new author: add them to `authors` in `src/data/site.ts` (with a local avatar in `public/`)
and to `AUTHORS` in `scripts/check-posts.mjs`.

## 3. Body rules the checker enforces

- No `#` H1 (title comes from frontmatter); sections start at `##`, nothing deeper than `###`.
- Every fenced code block names a language.
- Images: `/images/<slug>/…` files that exist in `public/`, with alt text, never `http(s)` URLs.
- No `TODO` left anywhere in a published post.

## 4. Check and preview

```sh
npm run check:posts   # editorial checks; drafts only warn
npm run dev           # http://localhost:4321/<slug>/ (drafts are visible in dev)
npm run build         # checks + full build; must pass before committing
```

After switching to `published` and building, verify the agent outputs:

```sh
cat dist/<slug>.md                         # frontmatter + body exactly as agents get it
grep '<slug>' dist/llms.txt                # listed with its summary
node -e "const p=require('./dist/posts.json').posts.find(p=>p.id==='<slug>');console.log(p)"
```

## 5. Commit and publish

- Ask the user before switching `status` to `published` unless they already said to publish.
- Commit to `master` in `SinnConsulting/blog`; the Pages workflow deploys.
- **The commit subject is public:** it appears on the home page and the post's History tab.
  Write it for readers: `Add post: How to get the most out of LoopBoard`, `Fix typo in setup
  section`. No internal jargon, ticket numbers or `wip`.
- Never reference private repositories in posts, commit messages or links.
