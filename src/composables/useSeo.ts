import { isRealUrl } from '@/data/placeholders'
import { profile } from '@/data/profile'

interface SeoOptions {
  title?: string
  description?: string
  /** 相对路径，例如 /projects/piano-agent */
  path?: string
}

const SITE_NAME = profile.brand

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * 客户端 SEO：切路由时同步 title / description / og。
 *
 * 纯静态站点没有 SSR，这里只能保证浏览器端与爬虫执行 JS 后拿到的信息一致。
 * 真正对社交平台抓取友好的是 index.html 里的静态 meta。
 */
export function useSeo(options: SeoOptions = {}) {
  const fullTitle = options.title ? `${options.title} | ${SITE_NAME}` : `${SITE_NAME} | Java 全栈开发 · AI Agent`
  const description =
    options.description ??
    '软件工程本科在读，主攻 Java 全栈开发，具备 AI Agent、LLM、RAG、Multi-Agent 应用工程实践经验。'

  document.title = fullTitle
  setMeta('meta[name="description"]', 'name', 'description', description)
  setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
  setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)

  // canonical / og:url 只在配置了真实站点地址时才写，避免生成假域名。
  // 地址来自构建期注入（vite.config.ts 的 __SITE_URL__），和 index.html 里那份静态 meta 同源 ——
  // 静态那份是给不跑 JS 的社交爬虫看的，这份是切路由时给 JS 爬虫看的。
  const siteUrl = __SITE_URL__
  if (siteUrl && isRealUrl(siteUrl) && options.path) {
    const url = `${siteUrl.replace(/\/$/, '')}${options.path}`
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
  }
}
