import { getRSSXML } from '@/common/get-rss-xml'

const CONFIG = {
  title: 'Jan\'s Site',
  siteUrl: 'https://jangao.top',
  description: 'Latest blog posts',
  lang: 'zh-cn'
}

export const dynamic = 'force-static'

export async function GET() {
  return getRSSXML('/posts', CONFIG)
}