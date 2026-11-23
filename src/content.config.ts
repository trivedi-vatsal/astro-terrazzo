import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'
import { SITE } from './config.ts'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    /** Drafts show in the dev server only. */
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    author: z.string().default(SITE.author),
    /** Image path or URL; replaces the generated share image and card cover. */
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    /** Posts with the same `slug` are grouped and linked as one series. */
    series: z
      .object({
        slug: z.string(),
        title: z.string(),
        part: z.number().int().positive(),
        description: z.string().optional(),
      })
      .optional(),
  }),
})

export const collections = { blog }
