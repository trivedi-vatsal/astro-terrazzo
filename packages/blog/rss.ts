export type FeedItem = {
  title: string
  description: string
  /** Site-relative or absolute URL. */
  link: string
  pubDate: Date
  author?: string
}

const esc = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;',
      })[c]!,
  )

/** RSS 2.0 document for a list of posts. */
export function rssXml(feed: {
  title: string
  description: string
  site: URL | string
  items: FeedItem[]
}): string {
  const site = String(feed.site)
  const items = feed.items
    .map((item) => {
      const link = new URL(item.link, site).href
      return `<item><title>${esc(item.title)}</title><link>${esc(link)}</link><guid isPermaLink="true">${esc(link)}</guid><description>${esc(item.description)}</description><pubDate>${item.pubDate.toUTCString()}</pubDate>${item.author ? `<dc:creator>${esc(item.author)}</dc:creator>` : ''}</item>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>${esc(feed.title)}</title><description>${esc(feed.description)}</description><link>${esc(new URL('./', site).href)}</link>${items}</channel></rss>`
}

/** Response helper for an Astro endpoint. */
export function rssResponse(feed: Parameters<typeof rssXml>[0]): Response {
  return new Response(rssXml(feed), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
