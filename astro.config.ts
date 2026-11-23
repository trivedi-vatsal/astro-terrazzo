import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { unified } from '@astrojs/markdown-remark'
import tailwindcss from '@tailwindcss/vite'
import { rehypeLinksNewTab, rehypeMermaidPre } from './packages/blog/rehype.ts'

// https://astro.build/config
export default defineConfig({
  // Your deployed URL. Used for canonical links, the sitemap, RSS and share images.
  site: process.env.SITE_URL || 'https://example.com',
  // Set when the site lives under a path, e.g. '/my-repo' on GitHub project pages.
  base: process.env.BASE_PATH || undefined,
  integrations: [mdx(), sitemap()],
  // Keep HTML whitespace rules: text split across lines keeps its space.
  compressHTML: true,
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    processor: unified({
      rehypePlugins: [rehypeMermaidPre, rehypeLinksNewTab],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { include: ['mermaid'] },
  },
})
