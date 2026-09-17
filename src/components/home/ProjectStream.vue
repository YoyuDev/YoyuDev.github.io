<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { projects } from '@/data/projects'
import StreamCard from '@/components/ui/StreamCard.vue'

/**
 * 首页右侧的项目流：单列垂直无缝循环。
 *
 * 轨道里放两份等高内容，位移一半（translateY 0 -> -50%）正好首尾相接，
 * 看不出接缝。
 *
 * 几个刻意的选择：
 * - 单列大卡：卡片已经带封面了，一列给足宽度，视觉上就是一面作品墙在往上走
 * - 时长是按「速度」倒推的，不是拍的：一份内容总高 ÷ 时长决定移动快慢。
 *   卡片改成左图右文之后矮了近一半（178px），时长从 60s 压到 45s；
 *   加进 dsh-ping 后一份内容从 5 张变 6 张（971px → 1166px）→ 54s；
 *   再加进 cy-fang 变成 7 张（1359.75px）→ 63s。
 *   速度恒定在 ≈21.6px/s。加/减项目或改卡片高度时，按同样的速度重算一遍。
 * - 悬停整体暂停，否则想点某个项目时它一直在跑
 * - 上下用 mask 渐隐，卡片是淡入淡出，不是被硬边切断
 *
 * ── 被左侧作品目录点选之后（.stream-seek 那一层） ──
 * 定位和动画刻意分在两层元素上：track 只管循环动画，外面那层只管「再往哪挪一点」。
 *
 * 反过来做（去改 track 自己的 transform）是行不通的：动画一旦在跑，它就完全接管了
 * transform，写进去的值会被忽略；改用 animation-delay 去寻址也不行——那要按「一份内容
 * 占轨道高度的百分之几」换算，只要轨道实际高度和估算差一点，卡片就落不到正中间（实测差 28px），
 * 而且从流动切到暂停的那一帧浏览器会拿旧的 hold time 算进度，还要再偏一次。
 *
 * 现在这版全程只做像素加减：量出目标卡片中心离视口中心差多少，就补多少。没有换算，也就没有误差。
 */
const DURATION_SECONDS = 63

const props = defineProps<{
  /** 要定位到的项目 slug；null / 空 = 不定位，保持自动流动 */
  activeSlug?: string | null
}>()

const viewportRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

/** 定位补偿量（px）。取消选中时它会被过渡回 0，内容重新对齐循环轨道 */
const seekOffset = ref(0)

/**
 * 等两帧再量。
 *
 * 暂停是 Vue 在 nextTick 里写进 DOM 的，紧接着就测量的话，读到的是「还在流动」的那一帧，
 * 卡片早又跑了几个像素。等浏览器真的画过一帧，位置才是静止的。
 */
function afterPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

function locate(slug: string) {
  const track = trackRef.value
  const viewport = viewportRef.value
  if (!track || !viewport) return

  const index = projects.findIndex((p) => p.slug === slug)
  const groups = track.querySelectorAll<HTMLElement>('.stream-group')
  const first = groups[0]
  const second = groups[1]
  const card = first?.children[index] as HTMLElement | undefined
  if (index < 0 || !first || !second || !card) return

  // 同一次 JS 任务里连着取 rect，属于同一帧；group 之间的差值天然消掉了 track 当前的 transform
  const unit = second.getBoundingClientRect().top - first.getBoundingClientRect().top
  const vpRect = viewport.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  if (unit <= 0 || vpRect.height <= 0) return

  const vpCenter = vpRect.top + vpRect.height / 2
  const cardCenter = cardRect.top + cardRect.height / 2
  // 注意这里含了「已有的补偿量」，所以多次点标签是在此基础上增量修正，不会累积偏差
  const wanted = seekOffset.value + (vpCenter - cardCenter)

  // 夹住，别让视口越过内容的头尾露出空白。
  // base 是「把补偿归零后内容顶边在哪」——rect 里已经含了补偿，所以要减掉一次，
  // 加回去就变成算了两遍，这是第一版第二次点击定位失效的原因。
  const base = track.getBoundingClientRect().top - vpRect.top - seekOffset.value
  const total = unit * 2
  const min = -(total - vpRect.height) - base
  const max = -base
  if (min > max) {
    seekOffset.value = 0
    return
  }

  seekOffset.value = Math.max(min, Math.min(wanted, max))
}

watch(
  () => props.activeSlug,
  async (slug) => {
    // 取消选中：补偿归零，动画本身没动过，位置自然接上，继续流动
    if (!slug) {
      seekOffset.value = 0
      return
    }
    await nextTick()
    await afterPaint()
    locate(slug)
  },
)

/** 断点一变卡片尺寸全变，原来的像素补偿不再成立，重算 */
function onResize() {
  if (!props.activeSlug) return
  seekOffset.value = 0
  locate(props.activeSlug)
}
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))
</script>

<template>
  <div ref="viewportRef" class="stream-viewport">
    <div class="stream-col">
      <!-- 只负责定位补偿，带过渡，所以点标签是「滑过去」而不是瞬间跳过去 -->
      <div class="stream-seek" :style="{ '--stream-seek': `${seekOffset}px` }">
        <div
          ref="trackRef"
          class="stream-track"
          :data-active="props.activeSlug || undefined"
          :style="{
            '--stream-duration': `${DURATION_SECONDS}s`,
            animationPlayState: props.activeSlug ? 'paused' : undefined,
          }"
        >
          <!-- 第一份：真实内容 -->
          <div class="stream-group">
            <StreamCard
              v-for="project in projects"
              :key="project.slug"
              :project="project"
              :active="props.activeSlug === project.slug"
              class="mb-4"
            />
          </div>

          <!-- 第二份：只为无缝衔接存在。对辅助技术隐藏，inert 让它内部不可聚焦、不可点击。
               同样带 active 标记——定位可能把视口推到第二份上，那时高亮也得跟上。 -->
          <div class="stream-group" aria-hidden="true" :inert="true">
            <StreamCard
              v-for="project in projects"
              :key="`dup-${project.slug}`"
              :project="project"
              :active="props.activeSlug === project.slug"
              class="mb-4"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
