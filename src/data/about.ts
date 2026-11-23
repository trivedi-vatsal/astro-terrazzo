import {
  yearsOfExperience,
  type Folder,
  type Place,
  type ShelfItem,
} from '@terrazzo/portfolio'
import { LINKS } from '../config.ts'
import { ROLES } from './work.ts'

export const INTRO = {
  greeting: "Hey, I'm Alex!",
  /** Line drawing shown next to the bio; replace public/me.svg with yours. */
  portrait: '/me.svg',
  portraitAlt: 'Line drawing of Alex Morgan',
  paragraphs: [
    `I'm a product engineer with ${yearsOfExperience(ROLES)} years of building web apps, design systems, and internal tools. I like owning a problem the whole way: figure out what is worth building, design it, ship it, then check that it actually helped.`,
    'Right now I lead the design system at Northwind Labs, where four product teams build on the same components, tokens, and docs. Before that I built client apps at Acme Studio and wrote my first production code at Initech.',
    "Outside work I'm usually out with a camera, or tinkering with small open source tools.",
  ],
}

export const FOLDERS: Folder[] = [
  { id: '01', category: 'build', tools: ['typescript', 'react', 'node'] },
  { id: '02', category: 'data', tools: ['postgres', 'sqlite', 'duckdb'] },
  { id: '03', category: 'design', tools: ['figma', 'tokens', 'motion'] },
  { id: '04', category: 'ship', tools: ['astro', 'docker', 'ci'] },
]

/** Map embeds come from openstreetmap.org → Share → HTML. */
export const PLACES: Place[] = [
  {
    id: 'current',
    code: 'PT',
    label: 'Current',
    note: 'Based in Lisbon, Portugal.',
    coords: '38.7223° N, 9.1393° W',
    embed:
      'https://www.openstreetmap.org/export/embed.html?bbox=-9.1993%2C38.6923%2C-9.0793%2C38.7523&layer=mapnik&marker=38.7223%2C-9.1393',
    link: 'https://www.openstreetmap.org/?mlat=38.7223&mlon=-9.1393#map=13/38.7223/-9.1393',
  },
  {
    id: 'studied',
    code: 'OP',
    label: 'Studied',
    note: 'Studied in Porto, Portugal.',
    coords: '41.1579° N, 8.6291° W',
    embed:
      'https://www.openstreetmap.org/export/embed.html?bbox=-8.6691%2C41.1279%2C-8.5891%2C41.1879&layer=mapnik&marker=41.1579%2C-8.6291',
    link: 'https://www.openstreetmap.org/?mlat=41.1579&mlon=-8.6291#map=13/41.1579/-8.6291',
  },
]

export const SHELF: ShelfItem[] = [
  {
    title: 'Open Source',
    author: 'GitHub',
    category: 'build',
    href: LINKS.github,
    external: true,
  },
  {
    title: 'UI Experiments',
    author: 'Dribbble',
    category: 'craft',
    href: LINKS.dribbble,
    external: true,
  },
  {
    title: 'Design Work',
    author: 'Behance',
    category: 'craft',
    href: LINKS.behance,
    external: true,
  },
  {
    title: 'Writing',
    author: 'DEV',
    category: 'build',
    href: LINKS.devto,
    external: true,
  },
  {
    title: 'Photography',
    author: 'Instagram',
    category: 'life',
    href: LINKS.instagram,
    external: true,
  },
  {
    title: 'Travel',
    author: 'Instagram',
    category: 'life',
    href: LINKS.instagram,
    external: true,
  },
  { title: 'Journal', author: 'This site', category: 'build', href: '/blog/' },
]

export const PHOTOS = {
  title: 'Recent photos',
  link: { label: 'Instagram', href: LINKS.instagram },
  categories: [
    { label: 'All', href: LINKS.instagram },
    { label: 'Streets', href: LINKS.instagram },
    { label: 'Travel', href: LINKS.instagram },
    { label: 'Design', href: LINKS.dribbble },
  ],
  text: 'Travel photos and visual notes live on Instagram: coastlines, streets, and whatever else was worth stopping for.',
}
