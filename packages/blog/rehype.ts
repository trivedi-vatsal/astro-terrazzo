/** Rehype plugins for blog Markdown. Register them in astro.config.ts. */

type HastNode = {
  type?: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

function collectText(node: HastNode | undefined): string {
  if (!node) return ''
  if (node.type === 'text') return node.value ?? ''
  return node.children?.map(collectText).join('') ?? ''
}

function classList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String)
  if (typeof value === 'string') return value.split(/\s+/)
  return []
}

function languageOf(node: HastNode | undefined): string {
  if (!node?.properties) return ''
  const fromData =
    node.properties.dataLanguage ?? node.properties['data-language']
  if (typeof fromData === 'string') return fromData
  return (
    classList(node.properties.className).find(
      (name) => name === 'mermaid' || name.startsWith('language-'),
    ) ?? ''
  )
    .replace(/^language-/, '')
    .trim()
}

function isMermaidPre(node: HastNode): boolean {
  if (node.tagName !== 'pre') return false
  if (languageOf(node) === 'mermaid') return true
  return (
    languageOf(node.children?.find((c) => c.tagName === 'code')) === 'mermaid'
  )
}

function toMermaidFigures(node: HastNode): void {
  if (isMermaidPre(node)) {
    const source = collectText(node).replace(/^\n+|\n+$/g, '')
    node.tagName = 'figure'
    node.properties = { className: ['mermaid-figure'] }
    node.children = [
      {
        type: 'element',
        tagName: 'pre',
        properties: { className: ['mermaid'], dataSource: source },
        children: [],
      },
    ]
    return
  }
  node.children?.forEach(toMermaidFigures)
}

/**
 * Turns ```mermaid code blocks into `<figure class="mermaid-figure">` with the
 * source in `data-source`, for Mermaid.astro to render in the browser.
 * Exclude `mermaid` from syntax highlighting so the source arrives as text.
 */
export function rehypeMermaidPre() {
  return (tree: HastNode) => toMermaidFigures(tree)
}

function openExternalInNewTab(node: HastNode): void {
  const href = node.properties?.href
  if (
    node.tagName === 'a' &&
    typeof href === 'string' &&
    /^https?:\/\//i.test(href)
  ) {
    const rel = node.properties!.rel
    const existing = Array.isArray(rel)
      ? rel.map(String)
      : typeof rel === 'string'
        ? rel.split(/\s+/)
        : []
    node.properties!.target = '_blank'
    node.properties!.rel = [...new Set([...existing, 'noopener', 'noreferrer'])]
  }
  node.children?.forEach(openExternalInNewTab)
}

/** Opens absolute http(s) links in a new tab; site-relative links stay put. */
export function rehypeLinksNewTab() {
  return (tree: HastNode) => openExternalInNewTab(tree)
}
