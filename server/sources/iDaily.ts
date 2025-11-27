import type { NewsItem } from "@shared/types"

// iDaily 官方 API
const API_URL = "https://radar.idaily-app.com/api/list/v3/iphone/zh-hans?page=1&ver=iphone"

export default defineSource(async () => {
  // myFetch 会自动解析 JSON 响应
  const res: any = await myFetch(API_URL)
  
  // 确保数据存在
  if (!res || !Array.isArray(res)) {
    return []
  }

  return res.map((item: any) => ({
    id: item.guid || item.link_share,
    title: item.title,
    url: item.link_share, // 分享链接通常是网页版
    pubDate: item.pubdate_timestamp * 1000, // API 返回的是秒级时间戳
    extra: {
      // iDaily 图片质量很高，可以提取作为封面
      icon: item.cover_thumb, 
      info: item.ui_tag_text || (item.content ? item.content.substring(0, 20) + "..." : undefined)
    }
  }))
})
