import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 解析部署 base。
 *
 * - 本地开发 / 自定义域名部署：`/`
 * - GitHub Pages 项目站点（https://<user>.github.io/<repo>/）：构建时注入 VITE_BASE_PATH=/<repo>/
 *
 * GitHub Actions 工作流会自动把仓库名注入到 VITE_BASE_PATH，所以正常情况无需手动修改。
 */
function resolveBase(): string {
  const raw = process.env.VITE_BASE_PATH
  if (!raw || raw === '/') return '/'
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

/**
 * 解析站点的绝对地址，用于 canonical / og:url / og:image。
 *
 * ⚠️ 为什么必须**构建期**算出来：微信、QQ 这类社交爬虫**不执行 JS**，读到的是原始 HTML。
 *    只在运行时改 DOM（`useSeo.ts` 干的事）对它们完全无效 —— 分享出去的预览会是占位符。
 *
 * 取值顺序：
 * 1. `VITE_SITE_URL` —— 显式指定（绑自定义域名时设它）
 * 2. GitHub Actions 自动注入的 `GITHUB_REPOSITORY`（形如 `owner/repo`）推导：
 *    - 仓库是 `<owner>.github.io` → `https://<owner>.github.io/`
 *    - 其他项目仓库 → `https://<owner>.github.io/<repo>/`
 *    所以正常部署**不需要设任何变量**。
 * 3. 都拿不到（本地构建）→ null：此时 og:url 整条删掉。宁可不写，也不写假地址。
 */
function resolveSiteUrl(): string | null {
  const explicit = process.env.VITE_SITE_URL?.trim()
  if (explicit && /^https?:\/\//i.test(explicit)) {
    return explicit.endsWith('/') ? explicit : `${explicit}/`
  }

  const slug = process.env.GITHUB_REPOSITORY?.trim()
  if (slug?.includes('/')) {
    const [owner, repo] = slug.split('/')
    const userSiteRepo = `${owner}.github.io`.toLowerCase()
    const host = `https://${owner.toLowerCase()}.github.io`
    return repo.toLowerCase() === userSiteRepo ? `${host}/` : `${host}/${repo}/`
  }

  return null
}

/** 构建期算一次，HTML 替换与客户端注入共用同一个值，避免两边说法不一致 */
const SITE_URL = resolveSiteUrl()

/**
 * 把 index.html 里的 SEO meta 补成绝对地址。
 *
 * - `og:url` 的 `TODO_SITE_URL` → 真实站点地址；拿不到就整条删掉
 * - `og:image` / `twitter:image`：`%BASE_URL%og-image.svg` → 绝对地址
 *   （OG 规范要求图片是绝对地址，相对路径社交平台抓不到）
 * - 补一条静态 `<link rel="canonical">`
 */
function absoluteSiteMeta(): Plugin {
  let base = '/'

  return {
    name: 'yizhi:absolute-site-meta',
    apply: 'build',
    configResolved(config) {
      // 只有项目站点的 base 才带子路径，图片的绝对地址要拼上它
      base = config.base.endsWith('/') ? config.base : `${config.base}/`
    },
    transformIndexHtml(html) {
      const url = SITE_URL

      if (!url) {
        // 本地构建：不留占位符，也不留那句会误导人的注释
        return html
          .replace(/^[ \t]*<!-- og:url 由 vite[\s\S]*?-->\n/m, '')
          .replace(/^[ \t]*<meta property="og:url".*\/>\n/m, '')
      }

      const origin = new URL(url).origin
      // %BASE_URL% 可能已被 Vite 替换过，两种形态都兜住
      const absolute = (value: string) => {
        const path = value.replace('%BASE_URL%', base)
        return `${origin}${path.startsWith('/') ? path : `/${path}`}`
      }

      return html
        .replace(
          /<meta property="og:url" content="[^"]*" \/>/,
          `<meta property="og:url" content="${url}" />`,
        )
        .replace(/(<meta property="og:image" content=")([^"]*)(")/, (_, a, v, c) => a + absolute(v) + c)
        .replace(/(<meta name="twitter:image" content=")([^"]*)(")/, (_, a, v, c) => a + absolute(v) + c)
        .replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`)
    },
  }
}

/**
 * GitHub Pages 是纯静态托管，没有服务端 rewrite 规则。
 * 直接访问 /projects/piano-agent 这类前端路由时服务器会返回 404，
 * 因此在构建产物里额外生成一个 404.html：把原始路径通过 query 交还给 index.html 还原。
 * 对应 index.html 中的还原脚本，两者必须成对存在。
 */
function spa404Fallback(): Plugin {
  let base = '/'
  let outDir = 'dist'

  return {
    name: 'yizhi:spa-404-fallback',
    apply: 'build',
    configResolved(config) {
      base = config.base
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const normalized = base.endsWith('/') ? base : `${base}/`
      const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>Redirecting…</title>
<script>
  // 把 404 的原始路径带回 index.html，由前端路由接管（SPA 回退）
  (function () {
    var BASE = "__BASE__";
    var l = window.location;
    var rest = l.pathname.indexOf(BASE) === 0 ? l.pathname.slice(BASE.length - 1) : l.pathname;
    l.replace(l.origin + BASE + "?redirect=" + encodeURIComponent(rest + l.search + l.hash));
  })();
</script>
</head>
<body></body>
</html>
`.replace('__BASE__', normalized)

      if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
      writeFileSync(resolve(outDir, '404.html'), html, 'utf8')
    },
  }
}

export default defineConfig(() => ({
  base: resolveBase(),

  plugins: [vue(), spa404Fallback(), absoluteSiteMeta()],

  // 同一个站点地址交给客户端：`useSeo.ts` 用它写子路由的 canonical / og:url。
  // 不让每一步各自推导，是为了保证静态 HTML 与运行时说的是同一个地址。
  define: {
    __SITE_URL__: JSON.stringify(SITE_URL ?? ''),
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    port: 5173,
    open: false,
  },

  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: true,
    // 静态站点体积小，这里拆分一下让首屏 JS 更小
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
          icons: ['lucide-vue-next'],
        },
      },
    },
  },
}))
