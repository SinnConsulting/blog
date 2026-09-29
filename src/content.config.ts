import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every post's frontmatter is checked against this schema; `npm run build` fails on a bad post.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    tldr: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    authors: z.array(z.string()).min(1),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    status: z.enum(['published', 'draft']).default('published'),
    audience: z.string().optional(),
  }),
});

export const collections = { posts };
