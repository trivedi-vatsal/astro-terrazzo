/**
 * Astro's `base` (e.g. `/my-repo/` on GitHub project pages), always with a
 * trailing slash. `/` when no base is set, and in plain Node (tests).
 */
const BASE = (import.meta.env?.BASE_URL ?? '/').replace(/\/?$/, '/')

/**
 * Site-root path → path under `base`: `/blog/` → `/my-repo/blog/`.
 * Full URLs, `#anchors`, relative paths and already-prefixed paths pass
 * through, so it is safe on any href, more than once.
 */
export function withBase(path: string, base = BASE): string {
  if (!path.startsWith('/') || path.startsWith('//') || path.startsWith(base))
    return path
  return base + path.slice(1)
}

/** Request pathname → site-root path: `/my-repo/blog/` → `/blog/`. */
export function stripBase(pathname: string, base = BASE): string {
  return pathname.startsWith(base)
    ? `/${pathname.slice(base.length)}`
    : pathname
}
