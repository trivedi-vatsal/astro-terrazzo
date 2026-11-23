import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { rssResponse } from '@terrazzo/blog'
import { withBase } from '@terrazzo/ui'
import { SITE } from '../config.ts'

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  )

  return rssResponse({
    title: SITE.title,
    description: SITE.description,
    site: new URL(withBase('/'), site),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      link: withBase(`/blog/${post.id}/`),
      pubDate: post.data.pubDate,
      author: post.data.author,
    })),
  })
}
