# blog

The SinnConsulting blog: laid out like a GitHub repository, built agent-first.
Astro, static output, published to GitHub Pages at https://blog.sinn.consulting by
`.github/workflows/pages.yml` on every push to `master`.

```sh
npm install
npm run dev      # http://localhost:4321 (drafts visible)
npm run build    # dist/ (drafts excluded); fails on invalid frontmatter
```

## Writing a post

1. `npm run new -- "Post Title" --tags a,b --authors marcel` creates `src/content/posts/<slug>.md` as a draft.
2. Write it and fill in the frontmatter (schema: `src/content.config.ts`, rules: `scripts/check-posts.mjs`).
3. `npm run build` runs the checks and builds. Set `status: published`, commit to `master`; the workflow deploys.

Claude Code skills in `.claude/skills/`: **write-article** (how to write a post) and **new-post**
(scaffold, populate, check, publish).

## What gets published

| Path | For |
|---|---|
| `/<slug>/` | the post (Preview tab) |
| `/<slug>.md` | the post as Markdown with frontmatter (Raw tab) |
| `/<slug>/history/` | every git commit that touched the post |
| `/tags/`, `/tags/<tag>/` | topics |
| `/agents/` | how agents should read the site |
| `/llms.txt`, `/llms-full.txt` | [llms.txt](https://llmstxt.org) index and full dump |
| `/posts.json`, `/rss.xml`, `/sitemap-index.xml`, `/robots.txt` | machines |

## Customising

- Profile, pinned repos, sponsor card, source repo: `src/data/site.ts`.
- Authors (humans and agents): `authors` in `src/data/site.ts`.
- Colours, light/dark: tokens at the top of `src/styles/global.css`.
- Domain / base path: `SITE_URL` and `BASE_PATH` env vars (set by the Pages workflow).

## Credits and independence

The layout borrows the *idea* of a repository page. It uses its own colours, logo and wording, and
the footer states it is not affiliated with GitHub. Keep it that way: no GitHub logos or Octocat, no
"Public"/"Fork"/"Watch" buttons, no GitHub brand colours. Icons are [Octicons](https://github.com/primer/octicons)
(MIT); the license ships as `public/LICENSE-octicons.txt`.

## Design

Colours, fonts and logo follow the corporate identity of [sinn.consulting](https://sinn.consulting): dark
"warm night" by default (`#0c1412`, teal `#2a9d8f` / `#3cc4b4`, sand `#d9c9a3`), Cormorant Garamond for
headings, Outfit for text, JetBrains Mono for labels. Fonts (SIL Open Font License, `src/fonts/OFL.txt`), logo and portrait are
self-hosted, so reading the blog sends nothing to third parties.

## Legal

The legal notice is sinn.consulting's (`legalNoticeUrl` in `src/data/legal.ts`; footer link, and `/impressum`
and `/legal-notice` redirect there). The privacy policy is the blog's own at `/privacy/` (English; `/datenschutz`
redirects). Operator details in `src/data/legal.ts` match sinn.consulting and render from data attributes so the
address is never plain text in the HTML. Update `legal.ts` and the privacy page whenever you add a third-party service.

## Publishing

Pages must use **Settings → Pages → Source: GitHub Actions**. `public/CNAME` holds `blog.sinn.consulting`.
Each push to `master` builds (with full git history, for the History tabs) and deploys.
