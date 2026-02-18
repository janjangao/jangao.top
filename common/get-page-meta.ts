import { normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'

export type Filter = {
  tags?: string[];
  excludeByTitle?: string;
  limit?: number;
}

export async function getMeta(route: string, filter?: Filter) {
  const { directories } = normalizePages({
    list: await getPageMap(route),
    route: route
  })
  let items = directories
    .filter(post => post.name !== 'index')
    .sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime())

  if (filter?.tags) {
    items = items.filter(item => item.frontMatter.tags?.some((tag: string) => filter.tags?.includes(tag)))
  }

  if (filter?.excludeByTitle) {
    items = items.filter(item => item.frontMatter.title !== filter.excludeByTitle)
  }

  if (filter?.limit) {
    items = items.slice(0, filter.limit)
  }

  return items;
}

export async function getTags(route: string) {
  const items = await getMeta(route)
  const tags: string[] = items.flatMap(item => item.frontMatter?.tags)
  return [...new Set(tags)];
}

export async function getTagCountMap(route: string) {
  const items = await getMeta(route)
  const tags: string[] = items.flatMap(item => item.frontMatter?.tags)

  // Count occurrences of each tag
  return tags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}