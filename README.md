# Terrazzo

Terrazzo is a portfolio and blog theme for [Astro](https://astro.build) with a bento-grid home page, a work timeline, an experiments gallery, and a journal with series, tags, search and Mermaid diagrams.

It ships no UI framework. Interactive parts are small custom elements, so most pages load almost no JavaScript.

## Features

- **Bento home page:** intro, "now", featured project, stack, tools, latest post, build log and contact tiles
- **Journal:** group posts by series, tag or date; list, grid or compact layouts; search; tag pages; drafts; RSS
- **Series:** posts that share a series slug are numbered and linked with next and previous navigation
- **Mermaid diagrams:** from a fenced code block, with zoom, pan, copy and full screen, in both color themes
- **Work page:** roles grouped by company, with expandable details and highlights
- **Experiments:** a card per side project and a detail page for each
- **About page:** bio, stack folders, a map of places, and a shelf of links
- **Share images:** a 1200×630 Open Graph image for every page, generated at build time
- **Light and dark mode:** follows the system setting until the visitor picks one
- **SEO:** canonical URLs, Open Graph and Twitter tags, JSON-LD, sitemap and robots.txt
- **Optional Google Analytics:** off unless you set a measurement ID

## Get started

```bash
npm create astro@latest -- --template trivedi-vatsal/astro-terrazzo
```

Or with pnpm:

```bash
pnpm create astro@latest --template trivedi-vatsal/astro-terrazzo
```

Then start the dev server:

```bash
npm run dev
```

and open [http://localhost:4321](http://localhost:4321).

You need Node.js 22.23.4 or newer.

## Make it yours

All the sample content belongs to a made-up person, Alex Morgan. Replace it in these files:

| What                                 | Where                          |
| ------------------------------------ | ------------------------------ |
| Your domain                          | `site` in `astro.config.ts`    |
| Name, description, links, navigation | `src/config.ts`                |
| Footer "Source" link                 | `sourceUrl` in `src/config.ts` |
| Home page tiles                      | `src/data/home.ts`             |
| About page, map and shelf            | `src/data/about.ts`            |
| Work history and highlights          | `src/data/work.ts`             |
| Side projects                        | `src/data/experiments.ts`      |
| Blog posts                           | `src/content/blog/`            |
| Portrait                             | `public/me.svg`                |
| Favicons                             | `public/`                      |
| Colors, fonts and radius             | `packages/ui/styles.css`       |

### Blog posts

Add Markdown or MDX files to `src/content/blog/`:

```yaml
---
title: 'Post title'
description: 'One or two sentences for cards, feeds and share images.'
pubDate: 2026-10-01
tags: ['design', 'css']
draft: false
---
```

Optional fields: `updatedDate`, `author`, `heroImage`, `heroAlt`, and `series` (`slug`, `title`, `part`, `description`). Drafts show in `npm run dev` and stay out of production builds and the feed.

The sample posts walk through frontmatter, series and diagrams, so read them before you delete them.

### Stack and tool icons

The stack and tools tiles look up brand icons by name in `packages/ui/brands.ts`. To add one, copy its SVG path and color from [simpleicons.org](https://simpleicons.org). Names without an icon show their first letter instead.

### Analytics

Set `PUBLIC_GOOGLE_ANALYTICS_ID` in your environment or a `.env` file (see `.env.example`). Without it, no analytics script loads.

## Commands

| Command           | Action                                   |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the dev server at `localhost:4321` |
| `npm run build`   | Build the site to `dist/`                |
| `npm run preview` | Preview the build locally                |
| `npm run check`   | Type-check the project                   |
| `npm test`        | Run the unit tests                       |
| `npm run format`  | Format the code with Prettier            |

## Project structure

```text
packages/
  ui/          Buttons, icons, theme toggle, fonts, colors, prose and tile styles
  blog/        Journal explorer, series navigation, table of contents, share menu, Mermaid, RSS
  seo/         Head tags, JSON-LD and share images
  portfolio/   Bento tiles, work timeline, experiment cards, about-page widgets
public/        Favicons, portrait and experiment covers
src/
  config.ts    Site settings
  data/        Content for the home, about, work and experiments pages
  content/     Blog posts
  layouts/     Page layouts
  pages/       Routes
tests/         Unit tests for the package logic
```

The packages are plain folders imported through path aliases (`@terrazzo/ui`, `@terrazzo/blog`, `@terrazzo/seo`, `@terrazzo/portfolio`), set in `tsconfig.json`. You can reuse any of their components in your own pages, or copy a package into another Astro project.

## Deploy

`npm run build` writes a static site to `dist/`, which any static host can serve. Set `site` in `astro.config.ts` to the URL you deploy to first, so canonical links, the sitemap, RSS and share images point at it.

- **Netlify, Vercel, Cloudflare Pages:** import the repository. The build command is `npm run build` and the output folder is `dist`.
- **GitHub Pages:** use [Astro's GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/). If the site lives under a subpath such as `/my-repo/`, also set `base`.

## Credits

Based on [astro-portfolio](https://github.com/bue221/astro-portfolio) by bue221. Some components are adapted from [chanhdai.com](https://github.com/ncdai/chanhdai.com) and [soundcn](https://github.com/kapishdima/soundcn). Icons come from [Lucide](https://lucide.dev) and [Simple Icons](https://simpleicons.org). See [LICENSE](LICENSE) for details.

## License

MIT
