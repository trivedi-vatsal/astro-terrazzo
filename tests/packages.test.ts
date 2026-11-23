// Checks for the package logic that makes decisions. Run with `pnpm test`.
import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  buildSeriesLanes,
  clubPosts,
  filterPosts,
  getAllTags,
  getReadingTime,
  seriesPartTitle,
  slugifyTag,
  type BlogPostSummary,
} from '../packages/blog/lib.ts'
import { buildLanes, renderLanes, renderPost } from '../packages/blog/render.ts'
import { rehypeLinksNewTab } from '../packages/blog/rehype.ts'
import { rssXml } from '../packages/blog/rss.ts'
import { buildLog, yearsOfExperience } from '../packages/portfolio/lib.ts'
import { ogPathFor, wrapLines } from '../packages/seo/og.ts'
import { stripBase, withBase } from '../packages/ui/url.ts'

const post = (
  id: string,
  pubDate: string,
  extra: Partial<BlogPostSummary> = {},
): BlogPostSummary => ({
  id,
  title: id,
  description: `About ${id}`,
  href: `/blog/${id}/`,
  pubDate,
  tags: [],
  readingTime: 1,
  ...extra,
})

const series = (part: number) => ({ slug: 'ds', title: 'Design system', part })
const posts = [
  post('a', '2026-10-01', { tags: ['CSS', 'Design'] }),
  post('b', '2026-09-01', { tags: ['css'], series: series(2) }),
  post('c', '2026-08-01', { tags: ['Design'], series: series(1) }),
]

test('tags are counted by slug and sorted by count', () => {
  assert.equal(slugifyTag('  Design Systems! '), 'design-systems')
  assert.deepEqual(['C', 'C#', 'C++', 'Café', '日本語'].map(slugifyTag), [
    'c',
    'c-sharp',
    'c-plus-plus',
    'cafe',
    '日本語',
  ])
  assert.deepEqual(
    getAllTags(posts).map((t) => [t.tag, t.count]),
    [
      ['CSS', 2],
      ['Design', 2],
    ],
  )
})

test('filtering by tag slug and search text', () => {
  assert.deepEqual(
    filterPosts(posts, { tag: 'design' }).map((p) => p.id),
    ['a', 'c'],
  )
  assert.deepEqual(
    filterPosts(posts, { search: 'DESIGN SYSTEM' }).map((p) => p.id),
    ['b', 'c'],
  )
})

test('series lanes list parts in order and standalone posts last', () => {
  const lanes = buildSeriesLanes(posts)
  assert.deepEqual(
    lanes.map((lane) => [lane.kind, lane.posts.map((p) => p.id)]),
    [
      ['series', ['c', 'b']],
      ['standalone', ['a']],
    ],
  )
  const items = clubPosts(posts)
  assert.deepEqual(
    items.map((i) => i.type),
    ['post', 'series'],
  )
})

test('series part titles drop the series prefix', () => {
  const p = post('x', '2026-01-01', {
    title: 'Design system, part 2: Components',
    series: series(2),
  })
  assert.equal(seriesPartTitle(p), 'Components')
})

test('reading time ignores code blocks and has a 1 minute floor', () => {
  assert.equal(getReadingTime('```\n' + 'word '.repeat(5000) + '\n```'), 1)
  assert.equal(getReadingTime('word '.repeat(401)), 3)
})

test('rendered HTML escapes post content', () => {
  const html = renderPost(
    post('x', '2026-01-01', { title: '<img src=x onerror=alert(1)>' }),
    'list',
  )
  assert.ok(!html.includes('<img src=x'))
  assert.ok(html.includes('&#60;img'))
  const empty = renderLanes(
    buildLanes(posts, { view: 'date', search: 'zzz' }),
    'list',
    [],
  )
  assert.match(empty, /No posts match/)
})

test('RSS escapes text and makes links absolute', () => {
  const xml = rssXml({
    title: 'A & B',
    description: '<desc>',
    site: 'https://example.com',
    items: [
      {
        title: 'Tom "&" Jerry',
        description: 'd',
        link: '/blog/x/',
        pubDate: new Date('2026-01-02T00:00:00Z'),
      },
    ],
  })
  assert.ok(xml.includes('<title>A &amp; B</title>'))
  assert.ok(xml.includes('Tom &quot;&amp;&quot; Jerry'))
  assert.ok(xml.includes('<link>https://example.com/blog/x/</link>'))
})

test('share image text wraps and ends with an ellipsis', () => {
  assert.deepEqual(wrapLines('one two three four', 9, 3), [
    'one two',
    'three',
    'four',
  ])
  const lines = wrapLines('aaaa bbbb cccc dddd eeee', 9, 2)
  assert.equal(lines.length, 2)
  assert.ok(lines[1].endsWith('…'))
  assert.equal(ogPathFor('/'), 'home')
  assert.equal(ogPathFor('/blog/x/'), 'blog/x')
})

test('build log merges posts and roles, newest first, five max', () => {
  const roles = [
    { company: 'Acme', title: 'Engineer', start: '2020-06' },
    { company: 'Initech', title: 'Intern', start: '2018-07', end: '2020-05' },
  ]
  const log = buildLog(posts, roles)
  assert.deepEqual(
    log.map((e) => e.label),
    ['a', 'Design system', 'Engineer · Acme', 'Intern · Initech'],
  )
  // A series links to its first part.
  assert.equal(log[1].href, '/blog/c/')
  assert.equal(yearsOfExperience(roles, new Date('2026-07-01')), 8)
  assert.equal(yearsOfExperience(roles, new Date('2026-06-01')), 7)
})

test('external links open in a new tab and keep their rel', () => {
  const a = (href: string, rel?: string[]) => ({
    type: 'element',
    tagName: 'a',
    properties: { href, ...(rel && { rel }) },
    children: [],
  })
  const tree = {
    type: 'root',
    children: [a('HTTPS://x.dev', ['me']), a('/blog/')],
  }
  rehypeLinksNewTab()(tree)
  const [external, local] = tree.children as any[]
  assert.equal(external.properties.target, '_blank')
  assert.deepEqual(external.properties.rel, ['me', 'noopener', 'noreferrer'])
  assert.equal(local.properties.target, undefined)
})

test('withBase prefixes site-root paths once and leaves URLs alone', () => {
  const b = '/repo/'
  assert.equal(withBase('/blog/', b), '/repo/blog/')
  assert.equal(withBase('/', b), '/repo/')
  assert.equal(withBase(withBase('/blog/', b), b), '/repo/blog/')
  for (const href of ['https://x.dev/', '//cdn.dev/a', '#top', 'mailto:a@b.c'])
    assert.equal(withBase(href, b), href)
  assert.equal(withBase('/blog/'), '/blog/')
  assert.equal(stripBase('/repo/blog/x/', b), '/blog/x/')
  assert.equal(stripBase('/other/', b), '/other/')
})
