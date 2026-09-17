<script setup lang="ts">
import { toasts } from '@/composables/useToast'
</script>

<template>
  <!--
    轻提示容器。挂在 App 根部一次，谁来调用都往这里冒。
    Teleport 到 body：免得被祖先的 overflow / transform / backdrop-filter 裁掉或压住。
    z-[60] 要高于吸顶导航（z-50）——复制邮箱的按钮在页脚，滚到底时提示也在下面，
    但导航在顶部吸着，层级低一点就会被切掉一半。
    pointer-events-none：提示浮在两秒，不该顺手挡住底下的点击。
    aria-live="polite"：屏幕阅读器会把这句话读出来，不然这次点击对读屏用户等于没发生。
  -->
  <Teleport to="body">
    <div
      class="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex flex-col items-center gap-2 px-4"
      role="status"
      aria-live="polite"
    >
      <TransitionGroup
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-2 opacity-0"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="translate-y-1 opacity-0"
      >
        <p
          v-for="toast in toasts"
          :key="toast.id"
          class="max-w-[92vw] rounded-md bg-slate-900 px-3.5 py-2 text-center text-[13px] font-medium text-white shadow-lg dark:bg-white dark:text-slate-900"
        >
          {{ toast.message }}
        </p>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
