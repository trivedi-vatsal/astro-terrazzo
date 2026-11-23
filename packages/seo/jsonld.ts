export type Person = {
  name: string
  alternateName?: string
  jobTitle?: string
  /** Profile URLs that identify the same person. */
  sameAs?: string[]
}

const origin = (site: URL | string) => String(site).replace(/\/$/, '')

/** WebSite + Person graph for every page. */
export function siteJsonLd(options: {
  site: URL | string
  name: string
  description: string
  person: Person
  lang?: string
}) {
  const url = origin(options.site)
  const personId = `${url}/#person`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url: `${url}/`,
        name: options.name,
        description: options.description,
        inLanguage: options.lang ?? 'en',
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        url: `${url}/`,
        ...options.person,
      },
    ],
  }
}

export function blogPostingJsonLd(options: {
  site: URL | string
  title: string
  description: string
  url: string
  datePublished: Date
  dateModified: Date
  author: string
  image?: string
}) {
  const personId = `${origin(options.site)}/#person`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: options.title,
    description: options.description,
    datePublished: options.datePublished.toISOString(),
    dateModified: options.dateModified.toISOString(),
    image: options.image,
    author: { '@type': 'Person', '@id': personId, name: options.author },
    publisher: { '@id': personId },
    mainEntityOfPage: { '@type': 'WebPage', '@id': options.url },
  }
}
