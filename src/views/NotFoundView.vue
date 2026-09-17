<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  path: '/404',
  title: '页面不存在',
  description: '没有找到这个页面。',
})
</script>

<template>
  <div class="container-page flex min-h-[60vh] flex-col justify-center py-20">
    <p class="font-mono text-sm font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400">
      404
    </p>
    <h1 class="mt-3 page-title">这个页面不存在</h1>
    <p class="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
      链接可能输入有误，或者页面已经被移动。可以回到首页，或者直接看看项目列表。
    </p>
    <div class="mt-8 flex flex-wrap gap-3">
      <BaseButton to="/" variant="primary" size="md">
        <ArrowLeft :size="16" />
        回到首页
      </BaseButton>
      <BaseButton to="/projects" variant="secondary" size="md">查看项目</BaseButton>
    </div>
  </div>
</template>
