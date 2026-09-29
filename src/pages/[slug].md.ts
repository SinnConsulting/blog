import type { APIRoute } from 'astro';
import { getPosts, toMarkdown, type Post } from '../lib/posts';
import { absolute } from '../lib/paths';

export async function getStaticPaths() {
  return (await getPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));
}

// The raw view: exactly what an agent should read. Served as a static .md file.
export const GET: APIRoute = ({ props }) =>
  new Response(toMarkdown((props as { post: Post }).post, absolute(`${(props as { post: Post }).post.id}/`)), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
