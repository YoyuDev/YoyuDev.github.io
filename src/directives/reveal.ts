import type { Directive, DirectiveBinding } from 'vue'

export interface RevealOptions {
  /** 延迟多少毫秒后显示，用于做列表错峰 */
  delay?: number
}

/**
 * v-reveal 滚动揭示指令。
 *
 * 全站共用一个 IntersectionObserver，元素进入视口后加上 .is-visible。
 * 只做一次，不重复触发；不支持 IntersectionObserver 时直接显示（优雅降级）。
 *
 * 用法：
 *   <div v-reveal>...</div>
 *   <div v-reveal="{ delay: 80 }">...</div>
 */
let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        const delay = Number(el.dataset.revealDelay ?? '0')

        if (delay > 0) {
          window.setTimeout(() => el.classList.add('is-visible'), delay)
        } else {
          el.classList.add('is-visible')
        }

        sharedObserver?.unobserve(el)
      }
    },
    // 底部留 80px 提前量：元素还没完全进视口就开始显示。
    // 这样即使快速滚动 / 按 End 键跳到底部，也不会出现「划过去了还是一片空白」的情况。
    { rootMargin: '0px 0px 80px 0px', threshold: 0 },
  )

  return sharedObserver
}

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions | undefined>) {
    el.classList.add('reveal')

    const delay = binding.value?.delay
    if (delay && delay > 0) el.dataset.revealDelay = String(delay)

    // 服务端渲染 / 老旧浏览器降级：直接可见
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    getObserver().observe(el)
  },

  unmounted(el: HTMLElement) {
    sharedObserver?.unobserve(el)
  },
}
