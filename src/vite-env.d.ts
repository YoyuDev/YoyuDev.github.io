/// <reference types="vite/client" />

/**
 * 构建期注入的全局常量（见 vite.config.ts 的 define）
 */

/**
 * 站点绝对地址，带结尾斜杠；拿不到时是空串。
 *
 * 由 `vite.config.ts` 在一处解析（`VITE_SITE_URL` 优先，其次从 `GITHUB_REPOSITORY` 推导），
 * 同时喂给 index.html 的静态 meta 和客户端 `useSeo.ts`。
 * **别在别处再推导一遍**，否则静态 HTML 与运行时会各说各话。
 */
declare const __SITE_URL__: string

/**
 * 环境变量类型声明（与 .env / GitHub Actions 注入保持一致）
 */
interface ImportMetaEnv {
  /** 部署 base（`/` 或 `/<仓库名>/`），GitHub Actions 注入；HTML 里用 `%BASE_URL%` */
  readonly VITE_BASE_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
