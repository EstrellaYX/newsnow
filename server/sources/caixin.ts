import { defineSource } from "#/utils/source"

interface CaixinItem {
  id: string
  title: string
  time: number // 秒级时间戳
  url: string
  summary: string
  pics: string[]
}

export default defineSource(async () => {
  // 财新金融频道的滚动数据流 (JSON)
  // 这种静态 JSON 文件抓取速度极快
  const url = "https://finance.caixin.com/json/scroll/1.json"
  
  // 财新的这个接口有时会返回带 var 的 JS，有时是纯 JSON
  // 为了保险，我们用 text() 获取然后模仿 Jin10 那样处理一下
  const rawText = await myFetch(url, { responseType: 'text' })
  
  // 清理数据，防止开头有 var null = [...]
  const jsonStr = rawText.replace(/^var\s+\w+\s*=\s*/, "").replace(/;$/, "")
  const data = JSON.parse(jsonStr) as CaixinItem[]

  return data.map(item => ({
    id: item.id,
    title: item.title,
    url: item.url,
    pubDate: item.time * 1000, // 转换为毫秒
    description: item.summary,
  }))
})
