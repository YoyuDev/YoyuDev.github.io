/// <reference types="vite/client" />

/**
 * 环境变量类型声明（与 .env / GitHub Actions 注入保持一致）
 */
interface ImportMetaEnv {
  /** 站点完整地址，用于生成 canonical / og:url，例如 https://yizhi.dev */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
