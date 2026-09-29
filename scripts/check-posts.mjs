#!/usr/bin/env node
// Editorial checks the Astro schema can't express. Runs before every build (npm run build).
// Drafts only get warnings; published posts must pass everything.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const POSTS = 'src/content/posts';
const AUTHORS = ['marcel', 'claude']; // keep in sync with `authors` in src/data/site.ts
let errors = 0, warnings = 0;

const allTags = new Map();
const posts = readdirSync(POSTS).filter((f) => f.endsWith('.md')).map((f) => {
  const raw = readFileSync(join(POSTS, f), 'utf8');
  const [, fmRaw = '', ...rest] = raw.split(/^---$/m);
  const fm = yaml.load(fmRaw) ?? {};
  for (const t of fm.tags ?? []) allTags.set(t, (allTags.get(t) ?? 0) + 1);
  return { f, slug: f.replace(/\.md$/, ''), fm, body: rest.join('---') };
});

for (const { f, slug, fm, body } of posts) {
  const published = fm.status !== 'draft';
  const problems = [];
  const fail = (msg) => problems.push(msg);

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail('file name must be kebab-case (it is the URL)');
  if (/TODO(?!\.md)/.test(JSON.stringify(fm)) || /TODO(?!\.md)/.test(body)) fail('contains TODO placeholders');
  if (typeof fm.summary === 'string' && fm.summary.length > 200) fail(`summary is ${fm.summary.length} chars (max 200)`);
  if (typeof fm.summary === 'string' && fm.summary.includes('\n')) fail('summary must be one line');
  const tldr = fm.tldr ?? [];
  if (tldr.length < 3 || tldr.length > 5) fail(`tldr has ${tldr.length} items (use 3–5)`);
  if (!(fm.tags ?? []).length) fail('needs at least one tag');
  for (const t of fm.tags ?? []) if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(t)) fail(`tag "${t}" must be lowercase kebab-case`);
  for (const a of fm.authors ?? []) if (!AUTHORS.includes(a)) fail(`unknown author "${a}" (add it to src/data/site.ts and this script)`);
  if (/^# /m.test(body.replace(/```[\s\S]*?```/g, ''))) fail('body has an H1; the title comes from frontmatter, start sections at ##');
  if (/^#### /m.test(body.replace(/```[\s\S]*?```/g, ''))) fail('headings deeper than ### are not shown in the table of contents; restructure');
  if (/```\s*\n/.test(body.replace(/```\w[\w+-]*\n[\s\S]*?```/g, ''))) fail('code block without a language (```sh, ```ts, ...)');
  for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    if (!m[1].trim()) fail(`image ${m[2]} has no alt text`);
    if (m[2].startsWith('/') && !existsSync(join('public', m[2]))) fail(`image ${m[2]} not found in public/`);
    if (/^https?:/.test(m[2])) fail(`image ${m[2]} is hotlinked; store it in public/images/${slug}/ (no third-party requests)`);
  }
  if (published && fm.date && new Date(fm.date) > new Date()) fail('published post has a future date');

  for (const p of problems) {
    console[published ? 'error' : 'warn'](`${published ? '✗' : '!'} ${f}: ${p}`);
    published ? errors++ : warnings++;
  }
}
for (const [t, n] of allTags) if (n === 1 && posts.length > 5) console.warn(`! tag "${t}" is used once; reuse an existing tag if one fits`);

console.log(`check-posts: ${posts.length} posts, ${errors} errors, ${warnings} draft warnings`);
process.exit(errors ? 1 : 0);
