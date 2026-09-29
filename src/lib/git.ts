import { execFileSync } from 'node:child_process';

export interface Commit { sha: string; short: string; author: string; date: Date; subject: string }

const SEP = '\x1f';

function log(args: string[]): Commit[] {
  try {
    const out = execFileSync('git', ['log', `--format=%H${SEP}%h${SEP}%an${SEP}%aI${SEP}%s`, ...args], { encoding: 'utf8' });
    return out.trim().split('\n').filter(Boolean).map((line) => {
      const [sha, short, author, date, subject] = line.split(SEP);
      return { sha, short, author, date: new Date(date), subject };
    });
  } catch {
    return []; // not a git checkout (or git missing): the site still builds, just without history
  }
}

const cache = new Map<string, Commit[]>();

/** Commits touching one file, newest first, following renames. */
export function fileHistory(file: string): Commit[] {
  if (!cache.has(file)) cache.set(file, log(['--follow', '--', file]));
  return cache.get(file)!;
}

/** Commits touching a directory, newest first. */
export function dirHistory(dir: string): Commit[] {
  const key = `dir:${dir}`;
  if (!cache.has(key)) cache.set(key, log(['--', dir]));
  return cache.get(key)!;
}
