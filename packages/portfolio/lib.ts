import type { LogEntry, Role } from './types.ts'

/** Whole years since the earliest role started. */
export function yearsOfExperience(roles: Role[], asOf = new Date()): number {
  const earliest = roles.map((role) => role.start).sort()[0]
  if (!earliest) return 0
  const [year, month] = earliest.split('-').map(Number)
  const years =
    asOf.getFullYear() - year - (asOf.getMonth() + 1 < month ? 1 : 0)
  return Math.max(years, 0)
}

/**
 * Newest five entries from posts (series collapse to their first part) and
 * role starts, dated `YYYY.MM.DD` / `YYYY.MM`.
 */
export function buildLog(
  posts: {
    title: string
    href: string
    pubDate: string
    series?: { slug: string; title: string; part: number }
  }[],
  roles: Role[],
  rolesHref = '/work/',
): LogEntry[] {
  const seen = new Set<string>()
  const entries: LogEntry[] = []

  for (const post of posts) {
    const date = post.pubDate.slice(0, 10).replaceAll('-', '.')
    const series = post.series
    if (!series) {
      entries.push({ date, label: post.title, href: post.href })
      continue
    }
    if (seen.has(series.slug)) continue
    seen.add(series.slug)
    const first = posts
      .filter((p) => p.series?.slug === series.slug)
      .sort((a, b) => a.series!.part - b.series!.part)[0]
    entries.push({ date, label: series.title, href: first.href })
  }

  for (const role of roles) {
    entries.push({
      date: role.start.replace('-', '.'),
      label: `${role.title} · ${role.company}`,
      href: rolesHref,
    })
  }

  return entries.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
}
