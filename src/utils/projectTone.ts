import type { ProjectType } from '@/types'

/**
 * 项目类型 -> 色相（rgb 分量，不带 `rgb()`）。
 *
 * 全站只认这一套类型色：装饰封面（CoverFrame）、左侧项目目录的点、
 * 列表页徽标都用它，避免同一个类型在不同地方颜色对不上。
 *
 * ⚠️ 用法必须是内联 CSS 变量（`style="--decor-hue: 16 185 129"`），
 *    不要拼 `cover-decor--${tone}` 这种动态类名 —— Tailwind 会对
 *    @layer components 里的类名做 tree-shaking，扫不到的类整条规则会被删掉。
 */
export const PROJECT_HUE: Record<ProjectType, string> = {
  commercial: '16 185 129', // emerald-500
  'ai-agent': '99 102 241', // brand-500
  competition: '245 158 11', // amber-500
  personal: '14 165 233', // sky-500
}
