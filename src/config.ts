/**
 * Site-wide settings: who you are, where to find you, and page copy.
 * Page content lives in src/data/ and blog posts in src/content/blog/.
 * Set your domain as `site` in astro.config.ts.
 */

export const SITE = {
  /** Your name; used as the site title. */
  title: 'Alex Morgan',
  description:
    'Product engineer in Lisbon. Design systems, web apps, and small tools that ship.',
  /** Default author on posts and in feeds. */
  author: 'Alex Morgan',
  jobTitle: 'Product Engineer',
  /** Letter in the header badge. */
  monogram: 'A',
  /** Letters on generated share images. */
  ogMonogram: 'AM',
  lang: 'en',
  /** "Source" link in the footer; empty string hides it. */
  sourceUrl: 'https://github.com/trivedi-vatsal/astro-terrazzo',
}

export const LINKS = {
  email: 'mailto:hello@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
  dribbble: 'https://dribbble.com',
  behance: 'https://behance.net',
  devto: 'https://dev.to',
}

/** Shown in the footer and as `sameAs` in structured data. */
export const SOCIALS = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Instagram', href: LINKS.instagram },
]

export const NAV = [
  { label: 'About', href: '/about/' },
  { label: 'Work', href: '/work/' },
  { label: 'Experiments', href: '/experiments/' },
  { label: 'Journal', href: '/blog/' },
]

export const PAGES = {
  about: {
    title: 'About',
    description:
      'Product engineer in Lisbon. Bio, stack, and life outside code.',
  },
  work: {
    title: 'Work',
    description:
      'I build design systems and the web apps that use them, and lead projects from the first sketch to the production release.',
  },
  experiments: {
    title: 'Experiments',
    description: 'Side projects, tools, and design studies.',
  },
  blog: {
    title: 'Journal',
    description: 'Notes on design systems, the web, and building things.',
  },
}
