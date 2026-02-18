import { getMeta } from './get-page-meta'

type RSSConfig = {
    title?: string
    siteUrl?: string
    description?: string
    lang?: string
}

export async function getRSSXML(route: string, config: RSSConfig) {
    const allPosts = await getMeta(route)
    const posts = allPosts
        .map(
            post => `    <item>
          <title>${post.title}</title>
          <description>${post.frontMatter.description}</description>
          <link>${config.siteUrl}${post.route}</link>
          <pubDate>${new Date(post.frontMatter.date).toUTCString()}</pubDate>
      </item>`
        )
        .join('\n')
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      ${config.title ? `<title>${config.title}</title>` : ''}
      ${config.siteUrl ? `<link>${config.siteUrl}</link>` : ''}
      ${config.description ? `<description>${config.description}</description>` : ''}
      ${config.lang ? `<language>${config.lang}</language>` : ''}
  ${posts}
    </channel>
  </rss>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml'
        }
    })
}