<script setup lang="ts">
import { computed, ref } from 'vue'
import { projects, projectTypeStyles } from '@/data/projects'
import type { ProjectType } from '@/types'
import ProjectCard from '@/components/ui/WorkCard.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  path: '/projects',
  title: '作品',
  description:
    '线上商用项目、AI / Agent 项目、竞赛作品与个人实践项目的完整 case study：要解决什么问题、架构怎么搭、难点怎么破。',
})

/** 筛选标签：全部 + 各类项目 */
const filters: { value: 'all' | ProjectType; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'commercial', label: '线上商用项目' },
  { value: 'ai-agent', label: 'AI / Agent' },
  { value: 'competition', label: '竞赛项目' },
  { value: 'personal', label: '个人项目' },
]

const activeFilter = ref<'all' | ProjectType>('all')

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter((p) => p.type === activeFilter.value),
)

function countOf(value: 'all' | ProjectType): number {
  return value === 'all' ? projects.length : projects.filter((p) => p.type === value).length
}

/** 底部图例 */
const legend: { type: ProjectType; label: string; description: string }[] = [
  { type: 'commercial', label: '线上商用项目', description: '已上线运行，源码不公开' },
  { type: 'ai-agent', label: 'AI / Agent 项目', description: 'LLM 应用工程实践' },
  { type: 'competition', label: '竞赛项目', description: '软件杯等竞赛作品' },
  { type: 'personal', label: '个人项目', description: '自学实践与技术验证' },
]
</script>

<template>
  <div class="container-page py-12 sm:py-16">
    <!-- 页头 -->
    <header class="max-w-3xl">
      <p class="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400">
        Projects
      </p>
      <h1 class="page-title">作品</h1>
      <p class="mt-4 text-[15px] leading-relaxed text-muted">
        每个作品都是一份完整的 case study：它要解决什么问题、系统怎么搭的、卡在哪儿、怎么解的、最后交付了什么。
      </p>
    </header>

    <!-- 筛选 -->
    <div class="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="项目类型筛选">
      <button
        v-for="filter in filters"
        :key="filter.value"
        type="button"
        role="tab"
        :aria-selected="activeFilter === filter.value"
        class="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors"
        :class="
          activeFilter === filter.value
            ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900'
            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-400 dark:hover:border-white/25 dark:hover:bg-white/10'
        "
        @click="activeFilter = filter.value"
      >
        {{ filter.label }}
        <span
          class="font-mono text-[11px]"
          :class="activeFilter === filter.value ? 'text-white/70 dark:text-slate-900/60' : 'text-slate-400'"
        >
          {{ countOf(filter.value) }}
        </span>
      </button>
    </div>

    <!-- 作品列表 -->
    <div class="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6">
      <div
        v-for="(project, index) in filtered"
        :key="project.slug"
        v-reveal="{ delay: (index % 2) * 70 }"
        class="h-full"
      >
        <ProjectCard :project="project" />
      </div>
    </div>

    <!-- 空状态 -->
    <p v-if="filtered.length === 0" class="py-16 text-center text-sm text-subtle">
      该分类下暂无作品。
    </p>

    <!-- 说明 -->
    <div class="mt-10 border-t hairline pt-6">
      <p class="mb-3 text-xs text-subtle">作品类型</p>
      <dl class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="item in legend" :key="item.type" class="flex items-start gap-2.5">
          <span
            class="mt-0.5 inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[11px] font-medium"
            :class="projectTypeStyles[item.type]"
          >
            {{ item.label }}
          </span>
          <span class="text-xs leading-5 text-subtle">{{ item.description }}</span>
        </div>
      </dl>
    </div>
  </div>
</template>
