// server/sources/idaily.ts
import { myFetch } from "#/utils/fetch"
import { defineSource } from "#/utils/source"

/**
 * iDaily 返回的单条结构
 */
interface IDailyItem {
  id: number
  title: string
  link_share: string
  pubdate_timestamp: number
  cover_thumb?: string
  content?: string
}

/**
 * iDaily 返回的整体结构
 * 不同接口格式不一，所以我们兼容几种常见格式
 */
type IDailyResponse =
  | IDailyItem[]
  | { list?: IDailyItem[] }
  | { data?: { list?: IDailyItem[] } }

/**
 * 统一抽取 list
 */
function extractList(raw: IDailyResponse | undefined): IDailyItem[] {
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  if ("list" in raw && Array.isArray(raw.list)) return raw.list
  if ("data" in raw && raw.data?.list && Array.isArray(raw.data.list)) return raw.data.list
  return []
}

/**
 * iDaily 源
 */
const idailySource = defineSource(async () => {
  const api = "http://idaily-app.com/api/list/v3/iphone/zh-hans?page=1"

  /**
   * 因为 iDaily 返回 http:// （非 https）
   * 很多平台（包括 Vercel Edge）会拒绝请求
   * 所以这里必须 try/catch，防止模块加载失败
   */
  let data: IDailyResponse | undefined
  try {
    data = await myFetch(api, {
      headers: {
        Referer: "http://idaily-app.com/",
        Accept: "application/json, text/plain, */*",
      },
    })
  } catch (e) {
    // 不抛出错误，避免导致整个源加载失败
    return []
  }

  const list = extractList(data)
  if (!list.length) return []

  return list.map((item) => ({
    id: String(item.id),
    title: item.title,
    url: item.link_share,
    pubDate: item.pubdate_timestamp * 1000,
    extra: {
      img: item.cover_thumb,
      hover: item.content,
    },
  }))
})

export default defineSource({
  idaily: idailySource,
})
