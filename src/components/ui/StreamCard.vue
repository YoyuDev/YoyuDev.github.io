<script setup lang="ts">
import { computed } from 'vue'
import type { Project, Shot } from '@/types'
import CoverFrame from '@/components/ui/CoverFrame.vue'

/**
 * 项目流里的大卡片：封面在左，信息在右。
 *
 * 为什么是左右而不是上下：卡片高度本来就由文字决定（行数全固定），
 * 封面改成「撑满这个高度」之后，封面不再额外占一行高度，整张卡矮了近一半——
 * 视口里能同时看到 3 张以上完整的卡，流动感才成立。
 *
 * ⚠️ 每张卡必须等高：无缝滚动依赖两份内容的位移严格等于内容高度的一半，
 *    所以文字行数全部固定（truncate / line-clamp），tagline 还留了最小高度兜底。
 */
const props = defineProps<{
  project: Project
  /** 左侧作品目录点选中的那张：高亮、不再淡化 */
  active?: boolean
}>()

/**
 * 封面数据。项目还没配 shots 时兜一个「只用名字当说明」的 Shot，
 * 这样 CoverFrame 会渲染成按项目类型着色的装饰封面，而不是空白。
 */
const cover = computed<Shot>(
  () => props.project.shots?.[0] ?? { caption: props.project.name },
)

/** 技术栈压成一行，多了折成 '+N' */
const MAX_TAGS = 4
const techLine = computed(() => {
  const rest = props.project.techStack.length - MAX_TAGS
  const head = props.project.techStack.slice(0, MAX_TAGS).join(' · ')
  return rest > 0 ? `${head} +${rest}` : head
})
</script>

<template>
  <RouterLink
    :to="`/projects/${props.project.slug}`"
    class="card card-hover group block overflow-hidden"
    :data-selected="props.active || undefined"
    :class="
      props.active
        ? 'border-brand-500/50 ring-2 ring-brand-500/15 dark:border-brand-400/40 dark:ring-brand-400/20'
        : ''
    "
  >
    <!-- sm 以下堆叠：窄屏左右分栏会把图和信息都挤扁 -->
    <div class="flex flex-col sm:flex-row">
      <!-- 封面：手机固定高，sm 起被拉伸到与右侧文字等高 -->
      <div class="relative h-44 w-full shrink-0 sm:h-auto sm:w-[42%]">
        <CoverFrame :shot="cover" :tone="props.project.type" flush fill />

        <!-- 状态徽标浮在封面右上角 -->
        <span
          v-if="props.project.status"
          class="absolute right-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/90 px-2 py-1 text-[10.5px] font-medium text-slate-700 backdrop-blur-sm dark:border-white/10 dark:bg-ink-900/80 dark:text-slate-200"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          {{ props.project.status }}
        </span>
      </div>

      <!-- 信息 -->
      <div class="flex min-w-0 flex-1 flex-col justify-center p-4">
        <div class="flex items-center gap-2">
          <span class="truncate text-[11px] text-subtle">{{ props.project.typeLabel }}</span>
          <span class="h-3 w-px bg-slate-200 dark:bg-white/10" aria-hidden="true" />
          <span class="truncate text-[11px] text-subtle">{{ props.project.period }}</span>
        </div>

        <p class="mt-2 truncate text-[15.5px] font-semibold tracking-tight text-slate-900 dark:text-white">
          {{ props.project.name }}
        </p>
        <p class="mt-0.5 truncate text-[12px] text-subtle">{{ props.project.subtitle }}</p>

        <!-- 一句话：最多两行 + 最小两行高，保证卡片等高 -->
        <p class="mt-2.5 line-clamp-2 min-h-[3.1em] text-[12.5px] leading-[1.55] text-muted">
          {{ props.project.tagline }}
        </p>

        <!-- 技术栈：单行截断 -->
        <p class="mt-3 truncate font-mono text-[10.5px] text-slate-400 dark:text-slate-600">
          {{ techLine }}
        </p>
      </div>
    </div>
  </RouterLink>
</template>
