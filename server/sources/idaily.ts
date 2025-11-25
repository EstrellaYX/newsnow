import { defineSource } from "#/utils/source"
import { myFetch } from "#/utils/request"

interface IDailyItem {
  id: number
  title: string
  link_share: string
  pubdate_timestamp: number
  cover_thumb: string
  content: string
}

interface IDailyResponse {
  list: IDailyItem[]
}

export default defineSource(async () => {
  // 用你的 Vercel API 来反代 HTTP 接口
  const url = "/api/idaily"

  const rawData = await myFetch(url) as IDailyResponse

  const list = rawData.list ?? []

  return list.map(item => ({
    id: item.id.toString(),
    title: item.title,
    url: item.link_share,
    pubDate: item.pubdate_timestamp * 1000,
    extra: {
      img: item.cover_thumb
    }
  }))
})
