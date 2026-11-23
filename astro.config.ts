import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { unified } from '@astrojs/markdown-remark'
import tailwindcss from '@tailwindcss/vite'
import { rehypeLinksNewTab, rehypeMermaidPre } from './packages/blog/rehype.ts'

// https://astro.build/config
export default defineConfig({
  // Your deployed URL. Used for canonical links, the sitemap, RSS and share images.
  site: 'https://example.com',
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
