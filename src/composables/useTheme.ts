import { readonly, ref } from 'vue'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'yizhi-theme'

/** 读取当前实际生效的主题（<html class="dark"> 为准） */
function readCurrentTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const current = ref<ThemeMode>(readCurrentTheme())

function apply(mode: ThemeMode) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', mode === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    /* 隐私模式下 localStorage 不可用，忽略即可 */
  }
  current.value = mode
}

/**
 * 主题切换。
 *
 * 首屏的 class 已经在 index.html 的内联脚本里设置好了（避免闪白），
 * 这里只负责后续的切换动作，所以不需要在 onMounted 里再初始化一次。
 */
export function useTheme() {
  function toggle() {
    apply(current.value === 'dark' ? 'light' : 'dark')
  }

  function set(mode: ThemeMode) {
    apply(mode)
  }

  return {
    theme: readonly(current),
    isDark: readonly(current),
    toggle,
    set,
  }
}
