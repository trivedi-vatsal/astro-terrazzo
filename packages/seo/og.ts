import sharp from 'sharp'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

export type OgImage = {
  /** Route path without slashes, e.g. `blog/hello-world`. Home is `home`. */
  path: string
  title: string
  description: string
  /** Small uppercase label above the title. */
  eyebrow: string
}

export type OgBrand = {
  /** Two or three letters for the badge, e.g. `AM`. */
  monogram: string
  /** Shown in the footer, e.g. `example.com`. */
  host: string
  colors?: Partial<typeof DEFAULT_COLORS>
}

const DEFAULT_COLORS = {
  background: 'hsl(36, 18%, 97%)',
  foreground: 'hsl(24, 10%, 8%)',
  muted: 'hsl(25, 6%, 38%)',
  primary: 'hsl(22, 74%, 48%)',
  border: 'hsl(30, 8%, 86%)',
  card: 'hsl(40, 25%, 99%)',
}

const SANS = 'ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif'
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'

/** `/blog/post/` → `blog/post`, `/` → `home`. */
export function ogPathFor(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, '') || 'home'
}

/** Absolute URL of the generated PNG for an OG path. */
export function ogImageUrl(site: URL | string, path: string): string {
  const encoded = path.split('/').map(encodeURIComponent).join('/')
  return `${String(site).replace(/\/$/, '')}/og/${encoded}.png`
}

export function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** Greedy word wrap; the last allowed line gets an ellipsis if text remains. */
export function wrapLines(
  text: string,
  maxChars: number,
  maxLines: number,
): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length <= maxChars) {
      current = next
      continue
    }
    if (current) lines.push(current)
    current = word
    if (lines.length >= maxLines - 1) break
  }
  if (current && lines.length < maxLines) lines.push(current)

  const shown = lines.join(' ').length
  if (lines.length === maxLines && words.join(' ').length > shown) {
    const last = lines[maxLines - 1]
    lines[maxLines - 1] = `${last.replace(/\s+\S+$/, '')}…`
  }
  return lines
}

export function ogSvg(image: OgImage, brand: OgBrand): string {
  const c = { ...DEFAULT_COLORS, ...brand.colors }
  const titleLines = wrapLines(image.title, 34, 3).map(escapeXml)
  const descriptionLines = wrapLines(image.description, 52, 2).map(escapeXml)
  const titleY = 248
  const descriptionY = titleY + titleLines.length * 72 + 36

  const title = titleLines
    .map(
      (line, i) =>
        `<text x="96" y="${titleY + i * 72}" fill="${c.foreground}" font-family="${SANS}" font-size="56" font-weight="600" letter-spacing="-0.02em">${line}</text>`,
    )
    .join('\n')
  const description = descriptionLines
    .map(
      (line, i) =>
        `<text x="96" y="${descriptionY + i * 34}" fill="${c.muted}" font-family="${SANS}" font-size="26">${line}</text>`,
    )
    .join('\n')

  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${c.border}" stroke-width="1" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="${c.background}"/>
  <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5"/>
  <circle cx="1040" cy="120" r="220" fill="url(#glow)"/>
  <rect x="72" y="72" width="72" height="72" rx="12" fill="${c.card}" stroke="${c.border}" stroke-width="2"/>
  <text x="108" y="124" text-anchor="middle" fill="${c.foreground}" font-family="${MONO}" font-size="24" font-weight="500">${escapeXml(brand.monogram)}</text>
  <text x="168" y="108" fill="${c.muted}" font-family="${MONO}" font-size="18" letter-spacing="0.08em">${escapeXml(image.eyebrow.toUpperCase())}</text>
  <rect x="72" y="148" width="120" height="3" fill="${c.primary}" rx="1.5"/>
  ${title}
  ${description}
  <text x="96" y="566" fill="${c.muted}" font-family="${MONO}" font-size="20">${escapeXml(brand.host)}</text>
</svg>`
}

export function renderOgPng(image: OgImage, brand: OgBrand): Promise<Buffer> {
  return sharp(Buffer.from(ogSvg(image, brand)))
    .png()
    .toBuffer()
}
