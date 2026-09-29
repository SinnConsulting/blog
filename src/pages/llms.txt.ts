import type { APIRoute } from 'astro';
import { getPosts, allTags } from '../lib/posts';
import { absolute } from '../lib/paths';
import { site } from '../data/site';

// https://llmstxt.org: an index an agent can read in one request.
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const body = [
    `# ${site.title}`,
    '',
    `> ${site.description}`,
    '',
    `Author: ${site.profile.name}. Every post is available as clean Markdown by appending \`.md\` to its slug`,
    `(e.g. ${absolute(`${posts[0]?.id ?? 'post'}.md`)}). No JavaScript, no login.`,
    '',
    '## Posts',
    '',
    ...posts.map((p) => `- [${p.data.title}](${absolute(`${p.id}.md`)}): ${p.data.summary}`),
    '',
    '## Machine-readable',
    '',
    `- [All posts in one file](${absolute('llms-full.txt')}): full Markdown of every post`,
    `- [posts.json](${absolute('posts.json')}): metadata for every post (title, summary, tldr, tags, dates, URLs, token estimate)`,
    `- [RSS](${absolute('rss.xml')}): feed for readers`,
    '',
    '## Optional',
    '',
    `- Topics: ${allTags(posts).map(([t]) => t).join(', ')}`,
    `- Source repository: https://github.com/${site.repo.owner}/${site.repo.name}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
