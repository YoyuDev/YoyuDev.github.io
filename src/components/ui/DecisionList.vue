<script setup lang="ts">
import { AlertCircle, ArrowRight, Scale, Target } from 'lucide-vue-next'
import type { Decision } from '@/types'

/**
 * 技术难点与决策列表 —— case study 的正文核心。
 *
 * 展示结构固定为三段：问题 -> 做法 ->（代价 / 结果）。
 * 这个顺序本身就是重点：先承认卡在哪，再说怎么解的，
 * 最后交代代价。比只写「实现了 XXX」可信得多。
 */
defineProps<{ decisions: Decision[] }>()
</script>

<template>
  <ol class="space-y-3">
    <li
      v-for="(item, index) in decisions"
      :key="item.problem"
      v-reveal="{ delay: index * 50 }"
      class="card overflow-hidden"
    >
      <!-- 问题 -->
      <div class="flex gap-3.5 p-4 sm:p-5">
        <span class="mt-0.5 shrink-0 font-mono text-xs text-slate-400 dark:text-slate-500">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <div class="min-w-0 flex-1">
          <div class="flex items-start gap-2">
            <AlertCircle :size="15" class="mt-0.5 shrink-0 text-amber-500" />
            <p class="text-[14px] font-medium leading-relaxed text-slate-900 dark:text-white">
              {{ item.problem }}
            </p>
          </div>

          <!-- 做法 -->
          <div class="mt-3.5 flex items-start gap-2 border-l-2 border-brand-200 pl-3.5 dark:border-brand-500/30">
            <ArrowRight :size="14" class="mt-1 shrink-0 text-brand-500" />
            <p class="text-[13px] leading-relaxed text-muted">
              {{ item.approach }}
            </p>
          </div>

          <!-- 代价 / 结果 -->
          <div
            v-if="item.tradeoff || item.result"
            class="mt-3.5 flex flex-wrap gap-x-5 gap-y-2"
          >
            <p
              v-if="item.tradeoff"
              class="flex items-start gap-1.5 text-[12px] leading-relaxed text-subtle"
            >
              <Scale :size="13" class="mt-0.5 shrink-0" />
              <span><span class="font-medium">代价</span> · {{ item.tradeoff }}</span>
            </p>
            <p
              v-if="item.result"
              class="flex items-start gap-1.5 text-[12px] leading-relaxed text-subtle"
            >
              <Target :size="13" class="mt-0.5 shrink-0" />
              <span><span class="font-medium">结果</span> · {{ item.result }}</span>
            </p>
          </div>
        </div>
      </div>
    </li>
  </ol>
</template>
