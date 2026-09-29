// Everything a human edits to rebrand or re-point the blog lives here.
export const site = {
  name: 'blog',
  owner: 'sinnconsulting',
  title: 'SinnConsulting Blog',
  description: 'Agent-first engineering: Claude Code, loops, DevOps and tools. Readable by humans, parseable by agents.',
  // The public repo the blog is published from. `dir` is the blog's folder inside it ('' at the root).
  repo: { owner: 'SinnConsulting', name: 'blog', branch: 'master', dir: '' },
  profile: {
    name: 'Marcel Sinn',
    handle: 'ArgonQQ',
    avatar: 'portrait.webp',
    bio: 'Architecture, DevOps & agentic workflows. Writing loops, not prompts.',
    links: [
      { label: 'sinn.consulting', href: 'https://sinn.consulting' },
      { label: 'GitHub', href: 'https://github.com/ArgonQQ' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/marcel-sinn-398a3a11a' },
    ],
  },
  // Git author name → local avatar (in public/). Unknown authors get avatar.svg; nothing loads from third parties.
  gitAvatars: { 'Marcel Sinn': 'portrait.webp', ArgonQQ: 'portrait.webp' } as Record<string, string>,
  pinned: [
    { owner: 'SinnConsulting', name: 'LoopBoard', description: 'The missing UI for Claude Code loops.', language: 'TypeScript', color: '#3178c6' },
    { owner: 'ArgonQQ', name: 'ClockClock', description: 'Self-hosted time tracking for billable hours.' },
  ],
  // One sponsor card. Set to null to hide it.
  sponsor: {
    label: 'Sponsored',
    title: 'LoopBoard for VS Code',
    text: 'Promote, approve, send back. Let Claude Code loops do the rest.',
    cta: 'Install free',
    href: 'https://marketplace.visualstudio.com/items?itemName=SinnConsulting.loopboard-todo',
  } as null | { label: string; title: string; text: string; cta: string; href: string },
};

export const authors: Record<string, { name: string; avatar: string; href: string; kind: 'human' | 'agent' }> = {
  marcel: { name: 'Marcel Sinn', avatar: 'portrait.webp', href: 'https://github.com/ArgonQQ', kind: 'human' },
  claude: { name: 'Claude', avatar: 'claude.svg', href: 'https://claude.ai/code', kind: 'agent' },
};
