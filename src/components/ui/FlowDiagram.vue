<script setup lang="ts">
import { computed } from 'vue'
import type { FlowNode } from '@/types'
import { ArrowDown, ArrowRight } from 'lucide-vue-next'

/**
 * Agent Workflow / 系统架构流程图。
 *
 * 方向按节点数量自适应：
 * - 节点 <= 4：桌面端横向排列（短链路，横排更好看）
 * - 节点 >  4：始终纵向管线（长链路横排会被容器裁切，竖向永远放得下）
 * 移动端一律纵向。
 *
 * 只用边框与色块区分节点类型，没有连线动画，保持克制。
 */
const props = withDefaults(
  defineProps<{
    nodes: FlowNode[]
    /** 是否显示步骤序号 */
    numbered?: boolean
    /** 手动指定方向，不传则按节点数量自适应 */
    orientation?: 'horizontal' | 'vertical'
  }>(),
  { numbered: true },
)

const isVertical = computed(() =>
  props.orientation ? props.orientation === 'vertical' : props.nodes.length > 4,
)

/** 节点类型 -> 容器 / 标题 / 描述 / 端点样式 */
const nodeStyles: Record<
  FlowNode['kind'],
  { box: string; label: string; detail: string; dot: string; pulse?: boolean }
> = {
  input: {
    box: 'border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]',
    label: 'text-slate-800 dark:text-slate-100',
    detail: 'text-slate-500 dark:text-slate-500',
    dot: 'bg-slate-300 dark:bg-slate-600',
  },
  agent: {
    box: 'border-brand-200 bg-brand-50/70 dark:border-brand-500/30 dark:bg-brand-500/10',
    label: 'text-brand-800 dark:text-brand-200',
    detail: 'text-brand-600/90 dark:text-brand-300/70',
    dot: 'bg-brand-500',
    pulse: true,
  },
  data: {
    box: 'border-dashed border-slate-300 bg-slate-50/70 dark:border-white/15 dark:bg-white/[0.02]',
    label: 'text-slate-700 dark:text-slate-300',
    detail: 'text-slate-500 dark:text-slate-500',
    dot: 'bg-slate-400 dark:bg-slate-500',
  },
  output: {
    box: 'border-slate-900 bg-slate-900 dark:border-white dark:bg-white',
    label: 'text-white dark:text-slate-900',
    detail: 'text-slate-300 dark:text-slate-600',
    dot: 'bg-emerald-400',
  },
}

const pad = (index: number) => String(index + 1).padStart(2, '0')
</script>

<template>
  <!-- 纵向管线：长链路 / 移动端 -->
  <ol v-if="isVertical" class="flex flex-col" role="list" aria-label="架构流程">
    <li v-for="(node, index) in nodes" :key="node.id" class="flex gap-3.5">
      <!-- 左侧导轨 -->
      <div class="flex shrink-0 flex-col items-center">
        <span
          class="grid h-7 w-7 shrink-0 place-items-center rounded-md border"
          :class="nodeStyles[node.kind].box"
        >
          <span
            class="h-1.5 w-1.5 rounded-full"
            :class="[nodeStyles[node.kind].dot, nodeStyles[node.kind].pulse ? 'animate-flow-pulse' : '']"
            aria-hidden="true"
          />
        </span>
        <span
          v-if="index < nodes.length - 1"
          class="w-px flex-1 bg-slate-200 dark:bg-white/10"
          aria-hidden="true"
        />
      </div>

      <!-- 内容 -->
      <div class="min-w-0 flex-1 pb-4">
        <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span v-if="numbered" class="font-mono text-[10px] leading-5 text-slate-400 dark:text-slate-500">
            {{ pad(index) }}
          </span>
          <span
            class="text-[13px] font-medium leading-5"
            :class="nodeStyles[node.kind].label"
          >
            {{ node.label }}
          </span>
        </div>
        <p
          v-if="node.detail"
          class="mt-0.5 font-mono text-[11px] leading-tight"
          :class="nodeStyles[node.kind].detail"
        >
          {{ node.detail }}
        </p>
      </div>
    </li>
  </ol>

  <!-- 横向链路：短链路，窄屏时退化为纵向 -->
  <ol v-else class="flex flex-col md:flex-row md:items-stretch" role="list" aria-label="架构流程">
    <li
      v-for="(node, index) in nodes"
      :key="node.id"
      class="flex flex-col md:min-w-0 md:flex-1 md:flex-row md:items-stretch"
    >
      <!-- ⚠️ 节点必须 flex-1 + min-w-0，不能写 md:flex-none。
           写成 flex-none 时节点宽度由内容决定，一旦某个 label / detail 比较长
           （比如 "SSE /dsh-ping/events"），整排就会超出容器——
           而且父容器不报错、页面也不出横向滚动条，只是最后一个节点被静静裁掉。
           交给 flex 平分宽度，长文案自己 truncate 掉。 -->
      <div
        class="flex min-w-0 flex-1 flex-col justify-center rounded-card border px-3.5 py-2.5 md:min-w-0"
        :class="nodeStyles[node.kind].box"
      >
        <div class="flex items-center gap-2">
          <span
            class="h-1.5 w-1.5 shrink-0 rounded-full"
            :class="[nodeStyles[node.kind].dot, nodeStyles[node.kind].pulse ? 'animate-flow-pulse' : '']"
            aria-hidden="true"
          />
          <span
            v-if="numbered"
            class="shrink-0 font-mono text-[10px] leading-none text-slate-400 dark:text-slate-500"
          >
            {{ pad(index) }}
          </span>
          <span
            class="truncate text-[13px] font-medium leading-tight"
            :class="nodeStyles[node.kind].label"
          >
            {{ node.label }}
          </span>
        </div>
        <p
          v-if="node.detail"
          class="mt-1 truncate pl-3.5 font-mono text-[11px] leading-tight"
          :class="nodeStyles[node.kind].detail"
        >
          {{ node.detail }}
        </p>
      </div>

      <div
        v-if="index < nodes.length - 1"
        class="flex shrink-0 items-center justify-center py-1 md:px-1.5 md:py-0"
        aria-hidden="true"
      >
        <ArrowDown :size="15" class="text-slate-300 md:hidden dark:text-slate-600" />
        <ArrowRight :size="15" class="hidden text-slate-300 md:block dark:text-slate-600" />
      </div>
    </li>
  </ol>
</template>
