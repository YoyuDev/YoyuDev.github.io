/**
 * 未提供真实链接时统一使用的占位符。
 *
 * 这些字符串会被 UI 层识别：凡是等于占位符的链接，
 * 都不会渲染成可点击的 <a>，而是显示为「待补充」状态 + 修改提示。
 * 这样既能保证站点不出现假链接，也不会漏掉待办。
 */
export const PLACEHOLDERS = {
  GITHUB: 'TODO_GITHUB_URL',
  DEMO: 'TODO_DEMO_URL',
  NPM: 'TODO_NPM_URL',
  BLOG: 'TODO_BLOG_URL',
  ARTICLE: 'TODO_ARTICLE_URL',
  SITE: 'TODO_SITE_URL',
} as const

export type PlaceholderValue = (typeof PLACEHOLDERS)[keyof typeof PLACEHOLDERS]

const PLACEHOLDER_SET = new Set<string>(Object.values(PLACEHOLDERS))

/** 判断某个链接是否为未替换的占位符 */
export function isPlaceholder(url: string | undefined | null): boolean {
  if (!url) return true
  return PLACEHOLDER_SET.has(url.trim()) || url.trim().startsWith('TODO_')
}

/** 判断链接是否为可安全跳转的真实地址 */
export function isRealUrl(url: string | undefined | null): url is string {
  if (!url) return false
  if (isPlaceholder(url)) return false
  return /^https?:\/\//i.test(url.trim()) || url.trim().startsWith('mailto:')
}

/** 若是外链则自动补 rel，保证安全 */
export function externalAttrs(url: string): { rel: string; target: string } {
  const isInternal = url.startsWith('mailto:')
  return isInternal
    ? { rel: 'noopener', target: '_self' }
    : { rel: 'noopener noreferrer', target: '_blank' }
}
