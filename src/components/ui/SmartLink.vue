<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { Github, Globe, Link2, Package } from 'lucide-vue-next'
import type { ExternalLink } from '@/types'
import { externalAttrs, isRealUrl } from '@/data/placeholders'

/**
 * 链接按钮：自动识别真实地址与 TODO 占位符。
 *
 * - 真实地址 -> 可点击的外链
 * - TODO_* 占位符 -> 灰显的「待补充」状态，附编辑提示，不会产生假链接
 */
const props = withDefaults(
  defineProps<{
    link: ExternalLink
    size?: 'sm' | 'md'
  }>(),
  { size: 'md' },
)

const iconMap: Record<ExternalLink['kind'], Component> = {
  github: Github,
  npm: Package,
  demo: Globe,
  blog: Globe,
  article: Globe,
  external: Link2,
}

const icon = computed(() => iconMap[props.link.kind])
const usable = computed(() => isRealUrl(props.link.url))

const sizeClass = computed(() =>
  props.size === 'sm' ? 'h-8 gap-1.5 px-3 text-[13px]' : 'h-9 gap-2 px-3.5 text-sm',
)

const baseClass =
  'inline-flex max-w-full items-center rounded-md font-medium transition-colors duration-150'

const activeClass =
  'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/10'

const disabledClass =
  'cursor-not-allowed border border-dashed border-slate-300 bg-slate-50/60 text-slate-400 dark:border-white/15 dark:bg-white/[0.02] dark:text-slate-500'
</script>

<template>
  <a
    v-if="usable"
    :href="link.url"
    :rel="externalAttrs(link.url).rel"
    :target="externalAttrs(link.url).target"
    :class="[baseClass, sizeClass, activeClass]"
  >
    <component :is="icon" :size="15" class="shrink-0" />
    <span class="truncate">{{ link.label }}</span>
  </a>

  <span
    v-else
    :class="[baseClass, sizeClass, disabledClass]"
    :title="`链接待补充：请在 src/data 中替换 ${link.url}`"
  >
    <component :is="icon" :size="15" class="shrink-0" />
    <span class="truncate">{{ link.label }}</span>
    <span class="ml-1 shrink-0 text-[11px]">待补充</span>
  </span>
</template>
