#!/usr/bin/env node
// Scaffold a new post: npm run new -- "Post title" [--tags a,b] [--authors marcel,claude] [--audience "..."] [--slug x]
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import yaml from 'js-yaml';

const POSTS = 'src/content/posts';
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args.splice(i, 2)[1] : undefined; };
const slugArg = opt('slug'), tagsArg = opt('tags'), authorsArg = opt('authors'), audience = opt('audience');
const title = args.join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "Post title" [--tags a,b] [--authors marcel,claude] [--audience "..."] [--slug x]');
  process.exit(1);
}

const slugify = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60).replace(/-+$/, '');
const slug = slugArg ?? slugify(title);
const file = join(POSTS, `${slug}.md`);
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) { console.error(`Invalid slug "${slug}". Use kebab-case.`); process.exit(1); }
if (existsSync(file)) { console.error(`${file} already exists.`); process.exit(1); }

// Existing tags, so new posts reuse them instead of inventing near-duplicates.
const known = new Map();
for (const f of readdirSync(POSTS).filter((f) => f.endsWith('.md'))) {
  const fm = yaml.load(readFileSync(join(POSTS, f), 'utf8').split(/^---$/m)[1] ?? '') ?? {};
  for (const t of fm.tags ?? []) known.set(t, (known.get(t) ?? 0) + 1);
}
const tags = (tagsArg ?? '').split(',').map((t) => t.trim()).filter(Boolean);
const authors = (authorsArg ?? 'marcel').split(',').map((a) => a.trim()).filter(Boolean);
const today = new Date().toISOString().slice(0, 10);

const fm = [
  '---',
  `title: ${JSON.stringify(title)}`,
  'summary: "TODO: one sentence, max 200 characters. Shown in llms.txt, feeds and link previews."',
  'tldr:',
  '  - "TODO: first takeaway"',
  '  - "TODO: second takeaway"',
  '  - "TODO: third takeaway"',
  `tags: [${tags.join(', ')}]`,
  `authors: [${authors.join(', ')}]`,
  ...(audience ? [`audience: ${JSON.stringify(audience)}`] : ['audience: "TODO: who is this for, e.g. developers using Claude Code"']),
  `date: ${today}`,
  'status: draft',
  '---',
  '',
  'TODO: open with the reader\'s problem in two or three sentences.',
  '',
  '## TODO: first section',
  '',
].join('\n');
writeFileSync(file, fm);

console.log(`Created ${file} (status: draft)`);
const unknown = tags.filter((t) => !known.has(t));
if (unknown.length) console.log(`New tags (check these are really new): ${unknown.join(', ')}`);
console.log(`Existing tags: ${[...known].sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t} (${n})`).join(', ') || 'none'}`);
