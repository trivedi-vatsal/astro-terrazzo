/** Share images for every page, rendered at build time: /og/{path}.png */
import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import { getAllTags, isListedPost, toBlogPostSummary } from '@terrazzo/blog'
import { renderOgPng, type OgImage } from '@terrazzo/seo'
import { PAGES, SITE } from '../../config.ts'
import { EXPERIMENTS } from '../../data/experiments.ts'

export const getStaticPaths = (async () => {
  const page = (path: string, title: string, description: string): OgImage => ({
    path,
    title,
    description,
    eyebrow: SITE.title,
  })

  const images: OgImage[] = [
    page('home', SITE.title, SITE.description),
    ...Object.entries(PAGES).map(([path, { title, description }]) =>
      page(path, title, description),
    ),
    page('404', 'Page not found', 'This page does not exist.'),
  ]

  const posts = await getCollection('blog', isListedPost)
  for (const post of posts) {
    images.push({
      path: `blog/${post.id}`,
      title: post.data.title,
      description: post.data.description,
      eyebrow: post.data.series?.title ?? PAGES.blog.title,
    })
  }
  for (const { tag, slug } of getAllTags(posts.map(toBlogPostSummary))) {
    images.push({
      path: `blog/tags/${slug}`,
      title: tag,
      description: `Posts about ${tag}`,
      eyebrow: 'Topic',
    })
  }
  for (const experiment of EXPERIMENTS) {
    images.push({
      path: `experiments/${experiment.slug}`,
      title: experiment.title,
      description: experiment.blurb,
      eyebrow: 'Experiment',
    })
  }

  return images.map((image) => ({
    params: { path: image.path },
    props: { image },
  }))
}) satisfies GetStaticPaths

export const GET: APIRoute = async ({ props, site }) => {
  const png = await renderOgPng(props.image as OgImage, {
    monogram: SITE.ogMonogram,
    host: site?.host ?? '',
  })
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  })
}
