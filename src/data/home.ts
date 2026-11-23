import { yearsOfExperience, type IconLink } from '@terrazzo/portfolio'
import { LINKS, SITE } from '../config.ts'
import { ROLES } from './work.ts'

export const IDENTITY = {
  eyebrow: 'Engineer in Lisbon',
  name: SITE.title,
  statement:
    'I build calm, fast web products: design systems, data-heavy dashboards, and the small tools that keep teams shipping.',
  primary: { label: 'See the work', href: '/work/' },
  secondary: { label: 'About me', href: '/about/' },
  location: { label: 'Based in Lisbon, Portugal', href: '/about/#place' },
  meta: [
    { label: 'Experience', value: `${yearsOfExperience(ROLES)} years` },
    { label: 'Focus', value: 'Web / Design systems' },
    { label: 'Based', value: 'Lisbon, PT' },
  ],
}

export const NOW = {
  role: 'Senior Product Engineer · Northwind Labs',
  building:
    'A design system and component library shared by four product teams.',
  exploring: ['Design tokens', 'Edge rendering', 'Local-first apps'],
  updated: 'October 2026',
}

export const FEATURED = {
  name: 'Lumen',
  description:
    'A small habit tracker that works offline and syncs when you are back online. No account, no tracking.',
  tags: ['Local-first', 'PWA', 'IndexedDB', 'Open source'],
  caption: 'Side project, open source',
  href: 'https://example.com',
  external: true,
}

export const BUILDING = {
  status: 'Exploring',
  title: 'Design system experiments',
  summary:
    'Tokens, components, and docs that stay in sync with the code they describe.',
  tags: ['Tokens', 'Components', 'Docs', 'Accessibility'],
  href: '/experiments/',
}

export const SELECTED_WORK = {
  title: 'Selected work',
  themes: [
    { label: 'Design Systems', icon: 'layers' },
    { label: 'Web Apps', icon: 'network' },
    { label: 'Dashboards', icon: 'chart' },
    { label: 'Developer Tools', icon: 'terminal' },
  ] as const,
  href: '/work/',
  action: 'View work',
}

/** Names match brand icons in packages/ui/brands.ts; others get a monogram. */
export const STACK = [
  { name: 'TypeScript', useCases: ['Product apps', 'Typed APIs', 'Tooling'] },
  { name: 'React', useCases: ['Interfaces', 'Design systems'] },
  { name: 'Node.js', useCases: ['APIs', 'Build scripts', 'Automation'] },
  { name: 'Python', useCases: ['Data work', 'Scripts'] },
  { name: 'PostgreSQL', useCases: ['Product data', 'Analytics'] },
  { name: 'Docker', useCases: ['Local dev', 'Deploys'] },
  { name: 'Figma', useCases: ['Design', 'Prototypes', 'Handoff'] },
  { name: 'Astro', useCases: ['Content sites', 'Docs', 'This site'] },
]

export const TOOLS = {
  title: 'Current rotation',
  description: 'Apps I keep open for design, planning, and writing.',
  tools: ['Figma', 'Linear', 'Notion', 'Raycast'],
}

export const LIFE = {
  title: 'Life outside code',
  interests: [
    {
      label: 'Photography',
      href: LINKS.instagram,
      external: true,
      icon: 'camera',
    },
    { label: 'Travel', href: LINKS.instagram, external: true, icon: 'compass' },
    { label: 'Design', href: LINKS.dribbble, external: true, icon: 'triangle' },
    { label: 'Open Source', href: LINKS.github, external: true, icon: 'spark' },
  ] satisfies IconLink[],
  caption: 'Photography and long walks when I am away from the keyboard.',
}

export const CONTACT = {
  href: LINKS.email,
  heading: 'Have an interesting problem?',
  subheading: "Let's build something.",
  action: 'Get in touch',
}
