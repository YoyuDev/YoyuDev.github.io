<script setup lang="ts">
import { onMounted } from 'vue'
import { Eye, Heart } from 'lucide-vue-next'
import { initStats, useStats } from '@/composables/useStats'

/**
 * 导航栏右侧的站点计数：访问量 + 点赞。
 *
 * 两个约束决定了这里的形态：
 * 1. **数字拿不到就整块不出现**（服务挂了 / 被拦截插件拦了 / 离线）。
 *    宁可没有，也不摆一个假的 0。
 * 2. **手机端只留点赞**。390px 宽的导航栏里，品牌名 + 三个图标已经占满，
 *    再塞两个数字必然横向溢出；而访问量本来就是给「这站有人看」当个注脚，
 *    手机上价值最低。点赞是互动件，留着。
 */
const { visits, likes, liked, settled, formatCount, addLike } = useStats()

// 计数在导航栏挂载时就开始拉。异步的，不挡首屏渲染
onMounted(() => {
  void initStats()
})
</script>

<template>
  <!-- 两样都没拿到就什么都不渲染，导航栏保持原样 -->
  <div v-if="settled && (visits !== null || likes !== null)" class="flex items-center">
    <!-- 访问量。md 起才显示（手机上挤不下），且没到门槛时 visits 本身就是 null -->
    <span
      v-if="visits !== null"
      data-stats-visits
      class="hidden h-9 items-center gap-1.5 px-2 text-[13px] font-medium text-slate-500 md:inline-flex dark:text-slate-400"
      title="本站访问量"
    >
      <Eye :size="15" aria-hidden="true" />
      <span class="tabular-nums">{{ formatCount(visits) }}</span>
      <span class="sr-only">次访问</span>
    </span>

    <button
      v-if="likes !== null"
      type="button"
      data-stats-like
      :data-liked="liked ? 'true' : 'false'"
      class="group inline-flex h-9 items-center gap-1.5 rounded-md px-1.5 text-[13px] font-medium transition-colors sm:px-2"
      :class="
        liked
          ? 'text-rose-500 disabled:cursor-default'
          : 'text-slate-600 hover:bg-slate-100 hover:text-rose-500 dark:text-slate-400 dark:hover:bg-white/5'
      "
      :disabled="liked"
      :aria-pressed="liked"
      :title="liked ? '已经赞过了' : '点个赞'"
      @click="addLike"
    >
      <!-- 按下时心形缩一下。motion-safe 前缀：系统开了「减少动态效果」就不动 -->
      <Heart
        :size="15"
        :fill="liked ? 'currentColor' : 'none'"
        class="transition-transform motion-safe:group-active:scale-75"
        aria-hidden="true"
      />
      <span class="tabular-nums">{{ formatCount(likes) }}</span>
      <span class="sr-only">个赞</span>
    </button>
  </div>
</template>
