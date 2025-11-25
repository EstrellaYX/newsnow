// Vercel Edge/Node API 反向代理：HTTPS → HTTP
export default async function handler(req, res) {
  try {
    const url = "http://idaily-app.com/api/list/v3/iphone/zh-hans?page=1"

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "NewsNow-Agent"
      }
    })

    if (!response.ok) {
      return res.status(500).json({ error: "iDaily fetch failed" })
    }

    const data = await response.json()

    // 允许跨域（以防你的前端需要）
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.toString() })
  }
}
