<script setup lang="ts">
/**
 * 技术栈标签。
 */
withDefaults(
  defineProps<{
    /** 高亮为 Accent 色（用于重点技术） */
    accent?: boolean
    size?: 'sm' | 'md'
  }>(),
  { accent: false, size: 'sm' },
)
</script>

<template>
  <span
    class="inline-flex shrink-0 items-center whitespace-nowrap rounded-md border font-mono"
    :class="[
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
      accent
        ? 'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/25 dark:bg-brand-500/10 dark:text-brand-300'
        : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400',
    ]"
  >
    <slot />
  </span>
</template>
