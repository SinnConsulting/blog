import { getCollection, type CollectionEntry } from 'astro:content';
import { fileHistory } from './git';

export type Post = CollectionEntry<'posts'>;

/** Published posts, newest first. Drafts only show in `astro dev`. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', (p) => import.meta.env.DEV || p.data.status === 'published');
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getDrafts(): Promise<Post[]> {
  return getCollection('posts', (p) => p.data.status === 'draft');
}

export const sourcePath = (post: Post) => post.filePath ?? `src/content/posts/${post.id}.md`;
export const history = (post: Post) => fileHistory(sourcePath(post));
export const lastUpdated = (post: Post) => post.data.updated ?? history(post)[0]?.date ?? post.data.date;

export const words = (post: Post) => (post.body ?? '').split(/\s+/).filter(Boolean).length;
export const readingTime = (post: Post) => Math.max(1, Math.round(words(post) / 220));
export const lines = (post: Post) => (post.body ?? '').split('\n').length;
/** Rough token estimate (~4 chars/token) so agents and readers see the context cost. */
export const tokens = (post: Post) => Math.round((post.body ?? '').length / 4);

export function allTags(posts: Post[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

/** The markdown an agent gets: frontmatter it needs + the body. */
export function toMarkdown(post: Post, canonical: string): string {
  const d = post.data;
  const fm = [
    '---',
    `title: ${JSON.stringify(d.title)}`,
    `summary: ${JSON.stringify(d.summary)}`,
    `url: ${canonical}`,
    `date: ${d.date.toISOString().slice(0, 10)}`,
    `updated: ${lastUpdated(post).toISOString().slice(0, 10)}`,
    `authors: [${d.authors.join(', ')}]`,
    `tags: [${d.tags.join(', ')}]`,
    ...(d.tldr.length ? ['tldr:', ...d.tldr.map((t) => `  - ${JSON.stringify(t)}`)] : []),
    '---',
    '',
    `# ${d.title}`,
    '',
    '',
  ].join('\n');
  return fm + (post.body ?? '').trim() + '\n';
}
