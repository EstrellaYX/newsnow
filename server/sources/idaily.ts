import { defineSource } from "#/utils/source"

// iDaily 结构
interface IDailyItem {
  id: number
  title: string
  link_share: string
  pubdate_timestamp: number // 它是秒级时间戳
  cover_thumb: string
  content: string
}

export default defineSource(async () => {
  // iDaily iPhone 接口
  const url = "http://idaily-app.com/api/list/v3/iphone/zh-hans?page=1"
  
  const rawData = await myFetch(url) as IDailyItem[]

  return rawData.map(item => ({
    id: item.id.toString(),
    title: item.title,
    url: item.link_share,
    // iDaily 给的是秒，NewsNow 需要毫秒，所以 * 1000
    pubDate: item.pubdate_timestamp * 1000, 
    extra: {
        // iDaily 的图片很精美，可以尝试放入 extra (虽然 NewsNow 列表不一定显示)
        img: item.cover_thumb 
    }
  }))
})
