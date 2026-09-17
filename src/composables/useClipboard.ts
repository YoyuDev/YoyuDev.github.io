import { profile } from '@/data/profile'
import { showToast } from './useToast'

/**
 * 复制纯文本到剪贴板，返回是否成功。
 *
 * ⚠️ 两条路都要留着，缺一条会在真实环境里静默失败：
 *
 * 1. `navigator.clipboard` 需要**安全上下文**（https 或 localhost）**且文档处于聚焦状态**，
 *    不满足时不是「返回 false」而是**抛 NotAllowedError**——页面切到后台、
 *    或跑在自动化环境里就是这种情况。
 * 2. 退化用 `document.execCommand('copy')`：虽然已被标记废弃，但兼容面最广，
 *    靠一个临时 textarea + 选中来实现。
 *
 * 返回布尔值而不是抛出：调用方要据此选提示文案，不该在按钮的点击处理里炸掉。
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* 落到下面 execCommand 那条路 */
  }

  try {
    const area = document.createElement('textarea')
    area.value = text
    // readonly 防止移动端弹键盘；移出视口且透明，避免闪一下或把页面撑出滚动条
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.top = '0'
    area.style.left = '-9999px'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(area)
    return ok
  } catch {
    return false
  }
}

/**
 * 复制邮箱地址，并弹一条提示。
 *
 * ⚠️ **邮箱刻意不走 `mailto:`**（主人 2026-09-17 定的）：
 * 国内电脑大多没设默认邮件客户端，`mailto:` 点下去常常毫无反应，
 * 只在控制台留下一条 `Launched external handler for 'mailto:...'`——
 * 访客的感受就是「点了没动静」。复制到剪贴板是更可靠的一步，
 * 他拿到地址自己粘到邮箱里去发。
 *
 * 失败时**把地址原样显示出来**：复制这条路断了，至少让他能手动选中。
 */
export async function copyEmail(): Promise<void> {
  const email = profile.email
  const ok = await copyText(email)
  showToast(ok ? `邮箱已复制：${email}` : `复制失败，请手动复制：${email}`, ok ? 2200 : 5000)
}
