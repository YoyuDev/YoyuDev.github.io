import { ref } from 'vue'

export interface ToastItem {
  id: number
  message: string
}

/**
 * 全站共用的轻提示。
 *
 * 为什么不引第三方 toast 库：全站目前只有「复制邮箱」一处需要提示，
 * 引一个库要带进一堆样式、依赖和配置项，而这里要的就是一句话浮一下。
 * 真到了提示满天飞的时候再换也不迟——`showToast` 这个入口不用动。
 *
 * 状态挂在模块作用域而不是 `provide/inject`：调用点分散在页脚、详情页侧栏这些
 * 互不相干的组件里，靠组件树传太绕；单页应用里模块本来就是单例。
 */
export const toasts = ref<ToastItem[]>([])

let seq = 0
const timers = new Map<number, number>()

/**
 * 弹一条提示，到时间自己消失。
 *
 * @param duration 停留毫秒数。内容需要人看清 / 记下时（比如复制失败）传长一点。
 */
export function showToast(message: string, duration = 2200): number {
  const id = ++seq
  toasts.value = [...toasts.value, { id, message }]
  timers.set(
    id,
    window.setTimeout(() => dismissToast(id), duration),
  )
  return id
}

export function dismissToast(id: number): void {
  const timer = timers.get(id)
  if (timer !== undefined) {
    clearTimeout(timer)
    timers.delete(id)
  }
  toasts.value = toasts.value.filter((t) => t.id !== id)
}
