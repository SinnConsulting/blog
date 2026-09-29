# CLAUDE.md (blog)

- Writing an article: follow the `write-article` skill. Creating/publishing a post: the `new-post`
  skill (`npm run new -- "Title"`). Posts are `src/content/posts/*.md`. Frontmatter must satisfy
  `src/content.config.ts`. `summary` ≤ 200 chars, `tldr` 3–5 bullets.
- If Claude wrote or co-wrote a post, `authors` includes `claude`. Never hide it.
- No H1 in the body: the title comes from frontmatter.
- `npm run build` must pass before committing. Check `dist/llms.txt` and `dist/<slug>.md` for
  new posts.
- Internal links go through `url()` from `src/lib/paths.ts` (the site may live under a base path).
- Stay clearly independent of GitHub: no GitHub logos, brand colours or fake repo buttons (see README).
- No client framework, no runtime dependencies. Plain Astro components, small inline scripts.
- Never link to or mention private repositories in anything published (posts, docs, commit messages).
- Nothing may load from third parties while reading (fonts, images, scripts are self-hosted). A new external
  service needs a matching section in `src/pages/privacy/index.astro`.
