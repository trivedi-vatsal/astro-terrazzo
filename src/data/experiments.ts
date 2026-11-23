import type { Experiment } from '@terrazzo/portfolio'

/** Each entry gets a card on /experiments/ and a page at /experiments/{slug}/. */
export const EXPERIMENTS: Experiment[] = [
  {
    slug: 'lumen',
    title: 'Lumen',
    kind: 'Local-first app',
    cover: '/experiments/lumen.svg',
    blurb:
      'A habit tracker that works offline, stores everything on your device, and syncs when you are back online.',
    overview:
      'Most habit apps want an account before you can tick a box. Lumen opens instantly, keeps your data in the browser, and only syncs if you ask it to.',
    built:
      'An installable web app with IndexedDB storage, a sync layer that merges edits from two devices, and a 9 KB bundle.',
    builtFor: [
      'People who like streaks',
      'Offline use',
      'Privacy-minded folks',
    ],
    capabilities: [
      'Track daily habits with one tap, even without a connection',
      'Install it to your home screen like a native app',
      'Export everything as a JSON file whenever you want',
    ],
    href: 'https://example.com',
    external: true,
    action: 'Open Lumen',
  },
  {
    slug: 'tidy-tokens',
    title: 'Tidy Tokens',
    kind: 'Developer tool',
    cover: '/experiments/tidy-tokens.svg',
    blurb:
      'A command-line tool that turns one design-token file into CSS variables, a TypeScript package, and docs.',
    overview:
      'Design tokens tend to live in three places that slowly disagree. Tidy Tokens reads one JSON file and writes every format your team needs.',
    built:
      'A zero-dependency Node.js CLI with a watch mode, plus a GitHub Action that fails the build when tokens and code drift apart.',
    builtFor: ['Design system teams', 'Frontend engineers', 'CI pipelines'],
    capabilities: [
      'Generate CSS variables and typed constants from one source',
      'Check in CI that generated files are up to date',
      'Publish a token reference page with every release',
    ],
    href: 'https://example.com',
    external: true,
    action: 'View on GitHub',
  },
  {
    slug: 'palette-lab',
    title: 'Palette Lab',
    kind: 'Design tool',
    cover: '/experiments/palette-lab.svg',
    blurb:
      'Build color palettes that pass contrast checks in light and dark mode before they reach a design file.',
    overview:
      'Pick a brand color and Palette Lab suggests a full scale, then shows which text and background pairs meet WCAG contrast.',
    built:
      'A browser tool that works in the OKLCH color space and exports the palette as CSS, JSON, or Figma styles.',
    builtFor: ['Designers', 'Design system teams'],
    capabilities: [
      'Generate an even color scale from one brand color',
      'See contrast ratios for every text and background pair',
      'Export the palette to CSS, JSON, or Figma',
    ],
    href: 'https://example.com',
    external: true,
    action: 'Try Palette Lab',
  },
  {
    slug: 'motion-studies',
    title: 'Motion Studies',
    kind: 'Visual studies',
    cover: '/experiments/motion-studies.svg',
    blurb: 'Small interface animations, each built with nothing but CSS.',
    overview:
      'A collection of hover states, loaders, and page transitions, each one a single HTML file you can copy.',
    built:
      'Twenty short studies that respect reduced-motion settings and need no JavaScript.',
    builtFor: ['Frontend developers', 'Designers who code'],
    capabilities: [
      'Browse interaction ideas with live previews',
      'Copy any study as one self-contained file',
    ],
    href: 'https://example.com',
    external: true,
    action: 'Browse studies',
  },
]
