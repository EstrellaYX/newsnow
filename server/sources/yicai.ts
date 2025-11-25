import { defineSource } from "#/utils/source"

// 定义第一财经返回的数据结构
interface YicaiItem {
  NewsID: number
  NewsTitle: string
  NewsSummary: string
  CreationDate: string // 格式如 "2023-11-25 10:00:00"
  DetailUrl: string
  ChannelName: string
}

export default defineSource(async () => {
  // 第一财经的 API 地址 (无需鉴权，公开接口)
  const url = "https://www.yicai.com/api/ajax/get_home_news?page=1&pagesize=30"
  
  // 1. 获取数据 (myFetch 自动处理 JSON 解析)
  const rawData = await myFetch(url) as YicaiItem[]

  // 2. 转换为 NewsNow 标准格式
  return rawData.map((item) => {
    return {
      id: item.NewsID.toString(),
      title: item.NewsTitle,
      // 3. 处理链接：如果是相对路径则拼接，绝对路径则直接用
      url: item.DetailUrl.startsWith("http") ? item.DetailUrl : `https://www.yicai.com${item.DetailUrl}`,
      // 4. 处理时间：使用 parseRelativeDate 转换为时间戳
      pubDate: parseRelativeDate(item.CreationDate).valueOf(),
      description: item.NewsSummary, // 可选：添加摘要
      extra: {
        source: item.ChannelName, // 额外信息：显示这是“股市”还是“宏观”
      }
    }
  })
})
