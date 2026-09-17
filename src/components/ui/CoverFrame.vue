<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import { Bot, Boxes, Image as ImageIcon, Store, Trophy } from 'lucide-vue-next'
import type { ProjectType, Shot } from '@/types'
import { PROJECT_HUE } from '@/utils/projectTone'

/**
 * 作品封面框。
 *
 * 三种状态：
 * 1. shot.src 有值        -> 真实图片（懒加载）
 * 2. 传了 tone 但没图     -> 装饰封面：按项目类型着色 + 细网格 + 类型图标
 * 3. 什么都没有           -> 带尺寸标注的斜纹占位框
 *
 * 为什么不直接留空：留白会让页面像没做完；用假图又是欺骗。
 * 装饰封面走的是第三条路——一眼能看出是插画而不是截图，
 * 同时比一片空白有信息量，流动起来也不空洞。
 */
const props = withDefaults(
  defineProps<{
    shot: Shot
    /** sm 用于卡片，lg 用于详情页首屏 */
    size?: 'sm' | 'lg'
    /** 嵌在卡片里时用 flush：去掉自己的边框与圆角，避免和父卡片叠成双层边框 */
    flush?: boolean
    /** 项目类型。传了就在无图时渲染装饰封面，而不是尺寸占位框 */
    tone?: ProjectType
    /** 覆盖 shot.ratio，例如卡片里想用更扁的比例 */
    ratio?: Shot['ratio']
    /**
     * 左右分栏的卡片里用 fill：放弃自身宽高比，撑满父级给的高度。
     * 这样卡片高度完全由另一侧的文字决定，两边严丝合缝，也不会因为
     * 比例换算把卡片撑高（项目流要求所有卡片严格等高）。
     */
    fill?: boolean
  }>(),
  { size: 'sm', flush: false, fill: false },
)

/** 比例 -> CSS aspect-ratio */
const aspect = computed(() => {
  const map: Record<NonNullable<Shot['ratio']>, string> = {
    '16/9': '16 / 9',
    '21/9': '21 / 9',
    '4/3': '4 / 3',
    '3/2': '3 / 2',
    '1/1': '1 / 1',
    '9/16': '9 / 16',
  }
  return map[props.ratio ?? props.shot.ratio ?? '16/9']
})

/** 占位框上标注的建议分辨率，让人知道该按什么尺寸出图 */
const suggestedSize = computed(() => {
  const map: Record<NonNullable<Shot['ratio']>, string> = {
    '16/9': '1600 × 900',
    '21/9': '2100 × 900',
    '4/3': '1440 × 1080',
    '3/2': '1500 × 1000',
    '1/1': '1080 × 1080',
    '9/16': '900 × 1600',
  }
  return map[props.ratio ?? props.shot.ratio ?? '16/9']
})

const hasImage = computed(() => Boolean(props.shot.src))
const isLarge = computed(() => props.size === 'lg')
/** 有 tone 且无图 -> 装饰封面 */
const isDecor = computed(() => Boolean(props.tone) && !hasImage.value)

const DECOR_ICON: Record<ProjectType, Component> = {
  commercial: Store,
  'ai-agent': Bot,
  competition: Trophy,
  personal: Boxes,
}
const decorIcon = computed(() => (props.tone ? DECOR_ICON[props.tone] : ImageIcon))

/**
 * 类型 -> 色相（rgb 分量，不带 rgb()）。
 *
 * ⚠️ 这里刻意用内联 CSS 变量而不是 `cover-decor--${tone}` 这种动态类名：
 *    Tailwind 会 tree-shake @layer components 里没在源码中字面出现过的类名，
 *    拼出来的类名扫不到，会导致整条样式被删掉（踩过一次）。
 *
 * 色值本身放在 utils/projectTone，左侧项目目录的点也共用同一套。
 */
const decorStyle = computed(() =>
  props.tone ? { '--decor-hue': PROJECT_HUE[props.tone] } : undefined,
)
</script>

<template>
  <figure :class="fill ? 'h-full' : ''">
    <div
      class="cover-frame"
      :class="[flush ? 'rounded-none border-0' : '', fill ? 'h-full' : '']"
      :style="fill ? undefined : { aspectRatio: aspect }"
    >
      <!-- 1. 真实图片 -->
      <img
        v-if="hasImage"
        :src="shot.src"
        :alt="shot.caption"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover"
      />

      <!-- 2. 装饰封面 -->
      <div v-else-if="isDecor" class="cover-decor h-full w-full" :style="decorStyle">
        <!-- 顶部三个圆点：暗示这是一块界面区域，比一个孤零零的图标有内容 -->
        <div class="absolute left-3.5 top-3 flex gap-1.5" aria-hidden="true">
          <span
            v-for="i in 3"
            :key="i"
            class="h-1.5 w-1.5 rounded-full"
            style="background-color: rgb(var(--decor-hue) / 0.35)"
          />
        </div>

        <!-- 居中：图标 + 这一帧的说明（+ 大尺寸时补一行建议分辨率，方便补图） -->
        <div
          class="flex h-full w-full flex-col items-center justify-center gap-2.5"
          :class="isLarge ? 'px-5' : 'px-3.5'"
        >
          <span
            class="cover-decor-accent flex items-center justify-center rounded-2xl"
            :class="isLarge ? 'h-20 w-20' : 'h-12 w-12'"
            aria-hidden="true"
          >
            <component :is="decorIcon" :size="isLarge ? 32 : 22" />
          </span>
          <!-- 卡片里的封面很窄，单行必然被截成「…」，放开两行更完整 -->
          <span
            class="font-medium text-slate-500 dark:text-slate-400"
            :class="
              isLarge
                ? 'max-w-full truncate text-[13px]'
                : 'line-clamp-2 max-w-full text-center text-[11px] leading-snug'
            "
          >
            {{ shot.caption }}
          </span>
          <span
            v-if="isLarge"
            class="font-mono text-[11px] text-slate-400 dark:text-slate-500"
          >
            待补真实截图 · 建议 {{ suggestedSize }}
          </span>
        </div>
      </div>

      <!-- 3. 尺寸占位框 -->
      <div
        v-else
        class="cover-hatch flex h-full w-full flex-col items-center justify-center gap-1.5 text-center"
      >
        <ImageIcon
          :size="isLarge ? 24 : 18"
          class="text-slate-300 dark:text-slate-600"
          aria-hidden="true"
        />
        <span
          class="px-4 font-medium text-slate-400 dark:text-slate-500"
          :class="isLarge ? 'text-[13px]' : 'text-[11px]'"
        >
          {{ shot.caption }}
        </span>
        <span
          class="font-mono text-slate-300 dark:text-slate-600"
          :class="isLarge ? 'text-[12px]' : 'text-[10px]'"
        >
          建议 {{ suggestedSize }}
        </span>
      </div>
    </div>

    <!-- 前两种状态内部已经写了 caption，只有真图才需要在下方补图注，避免重复 -->
    <figcaption
      v-if="isLarge && hasImage && shot.caption"
      class="mt-2.5 text-center text-xs text-subtle"
    >
      {{ shot.caption }}
    </figcaption>
  </figure>
</template>
