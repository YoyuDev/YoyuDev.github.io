<script setup lang="ts">
/**
 * 区块标题：统一的 eyebrow + 标题 + 描述结构。
 */
withDefaults(
  defineProps<{
    /** 小标签，例如 "Projects" */
    eyebrow?: string
    title: string
    description?: string
    /** 标题栏下方是否显示细分隔线 */
    divider?: boolean
  }>(),
  { divider: false },
)
</script>

<template>
  <div class="mb-8 sm:mb-10">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="max-w-2xl">
        <p
          v-if="eyebrow"
          class="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400"
        >
          {{ eyebrow }}
        </p>
        <h2 class="section-title">
          {{ title }}
        </h2>
        <p v-if="description" class="mt-2.5 text-sm leading-relaxed text-muted sm:text-[15px]">
          {{ description }}
        </p>
      </div>
      <div v-if="$slots.action" class="shrink-0">
        <slot name="action" />
      </div>
    </div>
    <div v-if="divider" class="mt-6 border-t hairline" />
  </div>
</template>
