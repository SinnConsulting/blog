import type { APIRoute } from 'astro';
import { getPosts, lastUpdated, readingTime, tokens, history } from '../lib/posts';
import { absolute } from '../lib/paths';
import { site, authors } from '../data/site';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const data = {
    site: { title: site.title, description: site.description, url: absolute('/') },
    posts: posts.map((p) => ({
      id: p.id,
      title: p.data.title,
      summary: p.data.summary,
      tldr: p.data.tldr,
      tags: p.data.tags,
      audience: p.data.audience ?? null,
      authors: p.data.authors.map((a) => ({ id: a, name: authors[a]?.name ?? a, kind: authors[a]?.kind ?? 'human' })),
      published: p.data.date.toISOString(),
      updated: lastUpdated(p).toISOString(),
      revisions: history(p).length,
      reading_minutes: readingTime(p),
      tokens_estimate: tokens(p),
      url: absolute(`${p.id}/`),
      markdown_url: absolute(`${p.id}.md`),
    })),
  };
  return new Response(JSON.stringify(data, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
