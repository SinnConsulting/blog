import type { APIRoute } from 'astro';
import { getPosts, toMarkdown } from '../lib/posts';
import { absolute } from '../lib/paths';
import { site } from '../data/site';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const body = [`# ${site.title}: all posts`, '', `> ${site.description}`, '', ...posts.map((p) => toMarkdown(p, absolute(`${p.id}/`)))].join('\n\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
