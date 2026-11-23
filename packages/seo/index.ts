export { default as Analytics } from './Analytics.astro'
export { default as Head } from './Head.astro'
export { blogPostingJsonLd, siteJsonLd, type Person } from './jsonld.ts'
export {
  OG_HEIGHT,
  OG_WIDTH,
  ogImageUrl,
  ogPathFor,
  renderOgPng,
  type OgBrand,
  type OgImage,
} from './og.ts'

/** `Post` → `Post | Site`; leaves titles that already contain the site name. */
export function formatTitle(title: string | undefined, siteName: string) {
  if (!title) return siteName
  return title.includes(siteName) ? title : `${title} | ${siteName}`
}
