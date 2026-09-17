/**
 * public/ 下静态资源的地址拼接。
 *
 * **为什么必须有这一层**：`public/` 里的文件在本地是 `/avatar.png`，
 * 但部署到 GitHub Pages 子路径后是 `/<仓库名>/avatar.png`。
 * 路径写死的话线上直接 404，而 `<img>` 加载失败**既不抛错、也不影响构建、
 * 连日志都没有**，页面上只留一个空框——满屏布局里极容易漏看。
 *
 * 所以凡是引用 public/ 里的东西，一律走这里，不要手写 `/xxx.png`。
 *
 * 用法：
 *   asset('avatar.png')            -> '/avatar.png'（本地） / '/yizhi/avatar.png'（子路径）
 *   asset('shots/piano-agent.jpg') -> '/shots/piano-agent.jpg' / '/yizhi/shots/...'
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}
