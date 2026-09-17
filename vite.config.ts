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

  plugins: [vue(), spa404Fallback()],

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
