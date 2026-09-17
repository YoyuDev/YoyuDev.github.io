<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ToastHost from '@/components/ui/ToastHost.vue'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()

// 用 path 作为 key：同组件不同参数（如切换项目详情）时重新挂载，保证滚动与动画状态干净
const viewKey = computed(() => route.fullPath)

// 统一同步页面 title / description
useSeo({ path: route.path })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white dark:bg-ink-950">
    <AppHeader />

    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="viewKey" />
      </RouterView>
    </main>

    <AppFooter />

    <!-- 轻提示（复制邮箱后的「已复制」）：挂在最外层，一次就够全站用 -->
    <ToastHost />
  </div>
</template>
