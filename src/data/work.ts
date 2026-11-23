import type { Highlight, Role } from '@terrazzo/portfolio'

/** Shown under the Work page title. */
export const FOCUS_AREAS =
  'Design systems, data-heavy web apps, performance, and accessibility.'

/** Newest first. Roles at the same company are grouped on the Work page. */
export const ROLES: Role[] = [
  {
    company: 'Northwind Labs',
    companyUrl: 'https://example.com',
    title: 'Senior Product Engineer',
    start: '2023-03',
    type: 'Full-time',
    summary:
      'I lead the design system that four product teams build on, and still ship product features every week.',
    sections: [
      {
        title: 'Design system',
        items: [
          'Built the token pipeline: one JSON source for color, type, and spacing, published as CSS variables and a typed package.',
          'Wrote 40 accessible components with docs and visual tests, and moved two products onto them.',
          'Set up the review process that keeps new components consistent across teams.',
        ],
      },
      {
        title: 'Product',
        items: [
          'Rebuilt the analytics dashboard with server rendering, cutting the time to first chart from 4.1 s to 1.2 s.',
          'Added keyboard navigation and screen reader support to the data tables.',
        ],
      },
    ],
    skills: ['TypeScript', 'React', 'Astro', 'CSS', 'Storybook', 'Playwright'],
  },
  {
    company: 'Acme Studio',
    companyUrl: 'https://example.com',
    title: 'Frontend Engineer',
    start: '2020-06',
    end: '2023-02',
    type: 'Full-time',
    summary:
      'I built client web apps for a small product studio, from prototypes to production.',
    sections: [
      {
        title: 'Client work',
        items: [
          'Shipped six web apps for clients in retail, travel, and education.',
          'Introduced a shared component kit that halved the setup time for new projects.',
        ],
      },
    ],
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
  },
  {
    company: 'Initech',
    companyUrl: 'https://example.com',
    title: 'Software Engineer',
    start: '2018-07',
    end: '2020-05',
    type: 'Full-time',
    summary:
      'My first engineering job: internal tools for the support team, and a lot of learning in public.',
    skills: ['JavaScript', 'Python', 'MySQL'],
    collapsed: true,
  },
]

export const HIGHLIGHTS: Highlight[] = [
  {
    title: 'Token pipeline',
    context: 'Northwind Labs',
    problem:
      'Four teams kept their own copies of colors and spacing, so the products drifted apart a little more with every release.',
    approach:
      'Moved every design decision into one JSON file and generated CSS variables, a TypeScript package, and Figma styles from it in CI.',
    result:
      'A color change now lands in all four products from one pull request, and the visual tests catch anything it breaks.',
    stack: ['TypeScript', 'CSS', 'GitHub Actions'],
  },
  {
    title: 'Faster dashboards',
    context: 'Northwind Labs',
    problem:
      'The analytics dashboard loaded every chart in the browser, so people waited on a blank screen before seeing any data.',
    approach:
      'Rendered the first view on the server, streamed the rest, and cached the expensive queries for five minutes.',
    result:
      'The first chart appears in 1.2 s instead of 4.1 s, and the support tickets about slow dashboards stopped.',
    stack: ['React', 'Node.js', 'PostgreSQL'],
  },
]
