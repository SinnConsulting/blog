import { site } from '../data/site';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Internal link that respects the deploy base path (e.g. /blog on a project page). */
export const url = (path = '/') => `${base}/${path.replace(/^\//, '')}`;

/** Absolute URL, for feeds, llms.txt and meta tags. */
export const absolute = (path = '/') => new URL(url(path), import.meta.env.SITE).toString();

const { owner, name, branch, dir } = site.repo;
const repoRoot = `https://github.com/${owner}/${name}`;
const inRepo = (file: string) => [dir, file].filter(Boolean).join('/');

export const github = {
  repo: repoRoot,
  blob: (file: string) => `${repoRoot}/blob/${branch}/${inRepo(file)}`,
  edit: (file: string) => `${repoRoot}/edit/${branch}/${inRepo(file)}`,
  commits: (file: string) => `${repoRoot}/commits/${branch}/${inRepo(file)}`,
  commit: (sha: string) => `${repoRoot}/commit/${sha}`,
};

/** Local avatar for a git author name. Never loads images from third parties. */
export function avatarFor(author: string): string {
  if (/claude/i.test(author)) return url('claude.svg');
  return url(site.gitAvatars[author] ?? 'avatar.svg');
}
