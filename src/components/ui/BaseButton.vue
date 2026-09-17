<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { externalAttrs } from '@/data/placeholders'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** 内部路由地址（二选一，与 href 互斥） */
    to?: string
    /** 外部链接地址（二选一） */
    href?: string
    variant?: Variant
    size?: Size
    /** 撑满宽度 */
    block?: boolean
  }>(),
  { variant: 'secondary', size: 'md', block: false },
)

const sizeClass: Record<Size, string> = {
  sm: 'h-8 gap-1.5 px-3 text-[13px]',
  md: 'h-9 gap-2 px-4 text-sm',
  lg: 'h-11 gap-2 px-5 text-[15px]',
}

const variantClass: Record<Variant, string> = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200',
  secondary:
    'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/10',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white',
}

const classes = computed(() => [
  'inline-flex select-none items-center justify-center rounded-md font-medium transition-colors duration-150',
  sizeClass[props.size],
  variantClass[props.variant],
  props.block ? 'w-full' : '',
])

const linkAttrs = computed(() => (props.href ? externalAttrs(props.href) : null))
</script>

<template>
  <!-- 内部路由 -->
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>

  <!-- 外部链接 -->
  <a v-else-if="href && linkAttrs" :href="href" :rel="linkAttrs.rel" :target="linkAttrs.target" :class="classes">
    <slot />
  </a>

  <!-- 普通按钮 -->
  <button v-else type="button" :class="classes">
    <slot />
  </button>
</template>
