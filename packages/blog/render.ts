/**
 * HTML for the blog explorer's lanes. The same functions run at build time
 * (BlogExplorer.astro) and in the browser (when view, layout or filters
 * change), so the markup lives in one place. Every value is escaped.
 */
import {
  buildDateLanes,
  buildLabelLanes,
  buildSeriesLanes,
  clubPosts,
  filterPosts,
  formatPartIndex,
  formatPostDate,
  formatReadingTime,
  seriesPartTitle,
  tagHref,
  type BlogLane,
  type BlogPostSummary,
  type BlogSeries,
} from './lib.ts'

export type BlogView = 'series' | 'category' | 'date'
export type BlogLayout = 'list' | 'grid' | 'compact'

export type ExplorerState = {
  view: BlogView
  layout: BlogLayout
  search: string
  tag?: string
}

const esc = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ')

export function buildLanes(
  posts: BlogPostSummary[],
  state: Pick<ExplorerState, 'view' | 'search' | 'tag'>,
): BlogLane[] {
  const filtered = filterPosts(posts, { search: state.search, tag: state.tag })
  if (state.view === 'date') return buildDateLanes(filtered)
  if (state.view === 'series') return buildSeriesLanes(filtered)
  return buildLabelLanes(filtered)
}

function cover(post: BlogPostSummary): string {
  if (post.heroImage) {
    return `<img src="${esc(post.heroImage)}" alt="${esc(post.heroAlt ?? '')}" loading="lazy" class="mb-3 aspect-[16/9] w-full rounded object-cover grayscale transition duration-500 group-hover:grayscale-0 motion-reduce:transition-none" />`
  }
  const monogram = post.tags[0]?.charAt(0).toUpperCase() || '▸'
  return `<div class="bg-muted mb-3 flex aspect-[16/9] w-full items-center justify-center rounded" aria-hidden="true"><span class="text-muted-foreground/40 font-mono text-4xl sm:text-5xl">${esc(monogram)}</span></div>`
}

const time = (iso: string, className = '') =>
  `<time datetime="${esc(iso)}"${className ? ` class="${className}"` : ''}>${esc(formatPostDate(iso))}</time>`

export function renderPost(post: BlogPostSummary, layout: BlogLayout): string {
  const href = esc(post.href)
  const title = esc(post.title)

  if (layout === 'compact') {
    return `<article class="border-border/40 group hover:border-foreground/15 grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-3 border-b py-2.5 transition-colors last:border-b-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
      ${time(post.pubDate, 'text-muted-foreground font-mono text-xs tabular-nums')}
      <h3 class="text-sm font-medium tracking-tight"><a href="${href}" class="group-hover:text-primary transition-colors">${title}</a></h3>
    </article>`
  }

  if (layout === 'list') {
    const tag = post.tags[0]
    const updated =
      post.updatedDate && post.updatedDate !== post.pubDate
        ? `<span>Updated ${esc(formatPostDate(post.updatedDate))}</span>`
        : ''
    return `<article class="border-border/60 group hover:border-foreground/18 border-b py-5 transition-colors last:border-b-0">
      <div class="text-muted-foreground mb-2 flex flex-wrap items-center gap-2 text-xs">
        ${tag ? `<a href="${esc(tagHref(tag))}" class="hover:text-primary font-medium tracking-wide uppercase">${esc(tag)}</a>` : ''}
        ${time(post.pubDate)}
        <span aria-hidden="true">·</span>
        <span>${esc(formatReadingTime(post.readingTime))}</span>
        ${updated}
      </div>
      <h3 class="text-lg font-semibold tracking-tight"><a href="${href}" class="group-hover:text-primary transition-colors">${title}</a></h3>
      <p class="text-muted-foreground mt-2 text-sm leading-relaxed">${esc(post.description)}</p>
      <a href="${href}" class="bento-arrow text-primary mt-3 text-sm" tabindex="-1" aria-hidden="true">Read more <span>→</span></a>
    </article>`
  }

  const tags = post.tags
    .map(
      (tag) =>
        `<a href="${esc(tagHref(tag))}" class="bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary rounded-md px-2 py-0.5 text-[11px] transition-colors">${esc(tag)}</a>`,
    )
    .join('')
  return `<article class="bento-tile group flex h-full flex-col p-4">
    ${cover(post)}
    <h3 class="text-base font-semibold tracking-tight"><a href="${href}" class="hover:text-primary transition-colors">${title}</a></h3>
    <p class="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">${esc(post.description)}</p>
    <div class="text-muted-foreground mt-2 flex flex-wrap items-center gap-2 text-xs">
      ${time(post.pubDate)}
      <span aria-hidden="true">·</span>
      <span>${esc(formatReadingTime(post.readingTime))}</span>
    </div>
    ${tags ? `<div class="mt-3 flex flex-wrap gap-1.5">${tags}</div>` : ''}
  </article>`
}

function partRows(series: BlogSeries, dense: boolean): string {
  const rows = series.posts
    .map(
      (post) => `<li>
        <a href="${esc(post.href)}" class="${cx('group/part hover:bg-foreground/[0.03] -mx-2 flex items-baseline gap-3 rounded-md px-2 transition-colors', dense ? 'py-1.5' : 'py-2.5')}">
          <span class="text-muted-foreground w-6 shrink-0 font-mono text-xs tabular-nums">${formatPartIndex(post.series?.part ?? 0)}</span>
          <span class="${cx('min-w-0 flex-1 tracking-tight', dense ? 'text-sm' : 'text-sm sm:text-base')}"><span class="group-hover/part:text-primary font-medium transition-colors">${esc(seriesPartTitle(post))}</span></span>
          <span class="text-muted-foreground hidden shrink-0 font-mono text-[11px] tabular-nums sm:inline">${esc(formatReadingTime(post.readingTime))}</span>
        </a>
      </li>`,
    )
    .join('')
  return `<ol class="flex flex-col">${rows}</ol>`
}

export function renderSeries(
  series: BlogSeries,
  layout: BlogLayout,
  hideHeader = false,
): string {
  const visible = series.posts.length
  const total = series.totalParts
  const parts = esc(
    visible === total
      ? `${total} part${total === 1 ? '' : 's'}`
      : `${visible} of ${total} parts`,
  )
  const title = `<a href="${esc(series.href)}" class="hover:text-primary transition-colors">${esc(series.title)}</a>`
  const description = series.description ? esc(series.description) : ''

  if (layout === 'compact') {
    const header = hideHeader
      ? ''
      : `<div class="mb-1.5 flex flex-wrap items-baseline gap-x-3"><h3 class="text-sm font-semibold tracking-tight">${title}</h3><span class="text-muted-foreground font-mono text-xs tabular-nums">${parts}</span></div>`
    return `<article class="${cx('border-border/40 py-3', !hideHeader && 'border-b last:border-b-0')}">${header}${partRows(series, true)}</article>`
  }

  if (layout === 'grid') {
    const header = hideHeader
      ? ''
      : `<header class="mb-3">
          <h3 class="text-base font-semibold tracking-tight">${title}</h3>
          ${description ? `<p class="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-relaxed">${description}</p>` : ''}
          <p class="text-muted-foreground mt-2 font-mono text-xs tabular-nums">${parts}<span aria-hidden="true"> · </span>${esc(formatReadingTime(series.readingTime))}</p>
        </header>`
    return `<article class="bento-tile flex h-full flex-col p-4 sm:col-span-2">${header}${partRows(series, true)}</article>`
  }

  const header = hideHeader
    ? ''
    : `<header class="mb-3">
        <div class="text-muted-foreground mb-2 flex flex-wrap items-center gap-2 text-xs">${time(series.pubDate)}<span aria-hidden="true">·</span><span>${parts}</span></div>
        <h3 class="text-lg font-semibold tracking-tight">${title}</h3>
        ${description ? `<p class="text-muted-foreground mt-2 text-sm leading-relaxed">${description}</p>` : ''}
      </header>`
  return `<article class="${cx('border-border/60 py-5', !hideHeader && 'border-b last:border-b-0')}">
    ${header}
    <div class="${hideHeader ? '' : 'border-border/50 mt-4 border-t pt-2'}">${partRows(series, false)}</div>
  </article>`
}

export function renderLane(
  lane: BlogLane,
  layout: BlogLayout,
  catalog: BlogSeries[],
): string {
  const items = clubPosts(lane.posts, catalog)
  const seriesLane = lane.kind === 'series'
  const first = items[0]
  const intro =
    seriesLane &&
    first?.type === 'series' &&
    first.series.description &&
    layout !== 'compact'
      ? `<p class="text-muted-foreground mb-1 text-sm leading-relaxed sm:col-span-2">${esc(first.series.description)}</p>`
      : ''
  const body = items
    .map((item) =>
      item.type === 'series'
        ? renderSeries(item.series, layout, seriesLane)
        : renderPost(item.post, layout),
    )
    .join('')
  const id = `lane-${esc(lane.key)}`

  return `<section aria-labelledby="${id}" class="${cx('lane-in border-border/50 border-b last:border-b-0', layout === 'compact' ? 'py-4' : 'py-6')}">
    <div class="md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-8">
      <header class="mb-4 md:sticky md:top-24 md:mb-0 md:self-start">
        <h2 id="${id}" class="${cx('text-foreground font-semibold tracking-tight text-balance', layout === 'compact' ? 'text-base' : 'text-lg')}">
          ${esc(lane.label)}<span class="text-muted-foreground ml-2 text-sm font-normal">(${lane.count})</span>
        </h2>
      </header>
      <div class="${layout === 'grid' ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'flex flex-col'}">${intro}${body}</div>
    </div>
  </section>`
}

export function renderLanes(
  lanes: BlogLane[],
  layout: BlogLayout,
  catalog: BlogSeries[],
): string {
  if (lanes.length === 0) {
    return '<p class="text-muted-foreground">No posts match these filters.</p>'
  }
  return lanes.map((lane) => renderLane(lane, layout, catalog)).join('')
}
