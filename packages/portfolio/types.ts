import type { IconName } from '@terrazzo/ui'

export type Link = { label: string; href: string; external?: boolean }

export type Identity = {
  eyebrow: string
  name: string
  statement: string
  primary: Link
  secondary: Link
  location: Link
  meta: { label: string; value: string }[]
}

export type Now = {
  role: string
  building: string
  exploring: string[]
  updated: string
}

export type Featured = {
  name: string
  description: string
  tags: string[]
  caption: string
  href: string
  external?: boolean
}

export type Building = {
  status: string
  title: string
  summary: string
  tags: string[]
  href: string
}

export type StackItem = { name: string; useCases: string[] }

export type IconLink = Link & { icon: IconName }

export type Experiment = {
  slug: string
  title: string
  kind: string
  blurb: string
  overview: string
  /** "What I built" paragraph on the detail page. */
  built: string
  builtFor: string[]
  capabilities: string[]
  href: string
  external?: boolean
  action: string
  /** Image under public/, e.g. `/experiments/aurora.svg`. */
  cover?: string
}

export type RoleSection = { title: string; items: string[] }

export type Role = {
  company: string
  companyUrl?: string
  title: string
  /** `YYYY-MM`; the timeline shows the year. */
  start: string
  /** Leave out for a current role. */
  end?: string
  type?: string
  summary?: string
  sections?: RoleSection[]
  skills?: string[]
  /** Start collapsed instead of open. */
  collapsed?: boolean
}

export type Highlight = {
  title: string
  context: string
  problem: string
  approach: string
  result: string
  stack: string[]
}

export type Folder = { id: string; category: string; tools: string[] }

export type Place = {
  id: string
  code: string
  label: string
  note: string
  coords: string
  /** OpenStreetMap export/embed URL. */
  embed: string
  link: string
}

export type ShelfItem = {
  title: string
  author: string
  category: 'build' | 'craft' | 'life'
  href: string
  external?: boolean
}

export type LogEntry = { date: string; label: string; href?: string }
