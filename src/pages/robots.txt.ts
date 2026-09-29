import type { APIRoute } from 'astro';
import { absolute } from '../lib/paths';

// Agents are welcome here, explicitly.
export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      '# AI crawlers and assistants are welcome. Prefer the Markdown endpoints:',
      `# ${absolute('llms.txt')}`,
      `# ${absolute('llms-full.txt')}`,
      '',
      `Sitemap: ${absolute('sitemap-index.xml')}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
