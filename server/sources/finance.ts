import { defineSource } from "#/utils/source";

// 帮助函数：处理 RSS 数据格式
const mapRssItem = (item: any) => ({
  id: item.link || item.guid,
  title: item.title,
  url: item.link,
  date: item.pubDate || item.isoDate,
  description: item.contentSnippet || item.description,
});

export default defineSource({
  // --- 新华社 (官方源) ---
  "xinhua-world": {
    name: "新华社-国际",
    type: "rss",
    url: "http://www.news.cn/world/news_world.xml",
  },
  "xinhua-finance": {
    name: "新华社-财经",
    type: "rss",
    url: "http://www.news.cn/fortune/news_fortune.xml",
  },

  // --- 路透社 (RSSHub) ---
  "reuters-cn-finance": {
    name: "路透社-中国财经",
    type: "rss",
    url: "https://rsshub.app/reuters/channel/CN/finance",
  },
  "reuters-int-biz": {
    name: "路透社-国际财经",
    type: "rss",
    url: "https://rsshub.app/reuters/channel/CN/business",
  },
  "reuters-insight": {
    name: "路透社-深度分析",
    type: "rss",
    url: "https://rsshub.app/reuters/channel/CN/investing",
  },

  // --- 彭博社 (RSSHub) ---
  "bloomberg-news": {
    name: "Bloomberg-News",
    type: "rss",
    url: "https://rsshub.app/bloomberg/news",
  },
  "bloomberg-markets": {
    name: "Bloomberg-Markets",
    type: "rss",
    url: "https://rsshub.app/bloomberg/markets",
  },

  // --- 华尔街日报 (RSSHub) ---
  "wsj-cn-china": {
    name: "WSJ-中国实时报",
    type: "rss",
    url: "https://rsshub.app/wsj/zh-cn/china",
  },
  "wsj-cn-economy": {
    name: "WSJ-中文经济",
    type: "rss",
    url: "https://rsshub.app/wsj/zh-cn/economy",
  },

  // --- 财新网 (RSSHub) ---
  "caixin-finance": {
    name: "财新网-金融",
    type: "rss",
    url: "https://rsshub.app/caixin/finance",
  },
  "caixin-company": {
    name: "财新网-公司",
    type: "rss",
    url: "https://rsshub.app/caixin/company",
  },

  // --- 第一财经 (官方源) ---
  "yicai-headline": {
    name: "第一财经-头条",
    type: "rss",
    url: "https://www.yicai.com/rss/news.xml",
  },
  "yicai-finance": {
    name: "第一财经-金融",
    type: "rss",
    url: "https://www.yicai.com/rss/finance.xml",
  },

  // --- iDaily (RSSHub) ---
  "idaily-best": {
    name: "iDaily-每日精选",
    type: "rss",
    url: "https://rsshub.app/idaily",
  },
});
