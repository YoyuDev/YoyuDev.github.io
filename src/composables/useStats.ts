import { computed, readonly, ref } from 'vue'
import { SITE_STATS } from '@/data/stats'
import { showToast } from './useToast'

/**
 * 站点计数：访问量 + 点赞。
 *
 * 为什么状态挂在模块作用域：导航栏现在要用，以后页脚 / 关于页想加一处也不用重复请求。
 * 单页应用里模块本来就是单例，比 provide/inject 省事。
 *
 * ⚠️ **所有失败路径都是「不显示」，不是「显示 0」**。
 *    计数服务挂了、被广告拦截插件拦了、访客离线、隐私模式禁了 storage ——
 *    导航栏那块直接不出现。冷冰冰一个假 0 比没有更糟。
 */

/** 本会话是否已计过这次访问。同一标签页刷新、切路由都不重复计数 */
const VISITED_FLAG = 'yizhi-stats-visited'
/** 本机是否已点过赞。点赞是一次性的：Abacus 只能加不能减，所以做不了「取消赞」 */
const LIKED_FLAG = 'yizhi-stats-liked'

const visits = ref<number | null>(null)
const likes = ref<number | null>(null)
const liked = ref(false)
/** 首次拉取是否结束（成功失败都算）。结束前不渲染，避免数字从无到有跳一下 */
const settled = ref(false)

let started = false

/* ------------------------------------------------------------------ */
/* storage 读写：隐私模式下访问会抛错，一律降级成「没标记过」             */
/* ------------------------------------------------------------------ */

function readFlag(store: Storage, key: string): boolean {
  try {
    return store.getItem(key) === '1'
  } catch {
    return false
  }
}

function writeFlag(store: Storage, key: string): void {
  try {
    store.setItem(key, '1')
  } catch {
    /* 写不进去就算了，最多多计一次访问、或下次还能再点一次赞 */
  }
}

/* ------------------------------------------------------------------ */
/* 计数服务                                                            */
/* ------------------------------------------------------------------ */

/**
 * 调一次计数服务，返回数字；任何异常一律返回 null。
 *
 * ⚠️ **404 要当成 0，不能当成失败**：Abacus 对「还没被创建过的 key」返回 404，
 *    而一个刚上线的站，点赞数天生就是没被创建过的状态。
 *    第一版把这判成「拿不到」→ 点赞按钮整个不渲染 → **永远没人能点出第一个赞**（死锁）。
 *    对计数来说，「key 不存在」的语义就是 0。
 *
 * 超时用 AbortController 手写而不是 `AbortSignal.timeout()`：
 * 后者要 Safari 16.4+，这里多三行换来的是不用惦记浏览器版本。
 */
async function request(path: string): Promise<number | null> {
  const ctl = new AbortController()
  const timer = window.setTimeout(() => ctl.abort(), SITE_STATS.timeout)

  try {
    const res = await fetch(`${SITE_STATS.endpoint}/${path}`, {
      signal: ctl.signal,
      headers: { accept: 'application/json' },
    })
    if (res.status === 404) return 0
    if (!res.ok) return null
    const value = Number((await res.json())?.value)
    return Number.isFinite(value) ? value : null
  } catch {
    // 超时、断网、被拦截插件干掉、返回体不是 JSON —— 都不该让页面出问题
    return null
  } finally {
    clearTimeout(timer)
  }
}

/**
 * 拉一次计数。挂载时调，重复调无效。
 *
 * 访问量分两条路：**本会话没记过就 `hit`（+1），记过就只 `get`**。
 * 这样同一标签页里刷新、来回切路由都不会反复 +1 ——
 * 数字才像「来过多少人」，而不是「这个页面被加载了多少次」。
 */
export async function initStats(): Promise<void> {
  if (started) return
  started = true

  liked.value = readFlag(localStorage, LIKED_FLAG)

  const visited = readFlag(sessionStorage, VISITED_FLAG)
  const ns = SITE_STATS.namespace

  const visitsTask = request(`${visited ? 'get' : 'hit'}/${ns}/${SITE_STATS.visitsKey}`)
  // 标记写在发请求之后、等结果之前：万一请求超时，本会话也不该再补记一次
  if (!visited) writeFlag(sessionStorage, VISITED_FLAG)

  const [v, l] = await Promise.all([
    visitsTask,
    request(`get/${ns}/${SITE_STATS.likesKey}`),
  ])

  visits.value = v
  likes.value = l
  settled.value = true
}

/**
 * 点个赞。
 *
 * **先发请求、成功了再改本地状态**，不能反过来：先改界面再发请求，
 * 一旦失败就是界面显示「已赞」而服务上根本没记上 —— 那种骗人的反馈比没反应还糟。
 */
async function addLike(): Promise<void> {
  if (liked.value) return

  const next = await request(`hit/${SITE_STATS.namespace}/${SITE_STATS.likesKey}`)
  if (next === null) {
    showToast('点赞没成功，稍后再试')
    return
  }

  likes.value = next
  liked.value = true
  writeFlag(localStorage, LIKED_FLAG)
  showToast('已点赞，谢谢')
}

/**
 * 数大了就缩写，别让导航栏被数字撑宽。
 * 1000 → 1k，1200 → 1.2k，12000 → 1.2w（中文站用 w 比 10k 顺眼）。
 * 缩到 4 个字符以内，位数变化时宽度基本不跳。
 */
function formatCount(n: number): string {
  const trim = (v: number) => v.toFixed(1).replace(/\.0$/, '')
  if (n < 1000) return String(n)
  if (n < 10000) return `${trim(n / 1000)}k`
  return `${trim(n / 10000)}w`
}

export function useStats() {
  return {
    /** 访问量。没到显示门槛（`visitsMinDisplay`）时为 null，调用方据此隐藏 */
    visits: computed(() =>
      visits.value !== null && visits.value >= SITE_STATS.visitsMinDisplay
        ? visits.value
        : null,
    ),
    likes: computed(() => likes.value),
    liked: readonly(liked),
    settled: readonly(settled),
    formatCount,
    addLike,
  }
}
