<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, Lock } from 'lucide-vue-next'
import type { Project } from '@/types'
import { projectTypeStyles } from '@/data/projects'
import CoverFrame from './CoverFrame.vue'
import TechTag from './TechTag.vue'

/**
 * 作品卡片 —— 项目列表页用。
 *
 * 封面在最上面，先给「看得见的东西」，文字是注解；
 * 整张卡片就是链接，点哪儿都进得去。
 */
const props = defineProps<{ project: Project }>()

const MAX_TAGS = 4
const visibleTags = computed(() => props.project.techStack.slice(0, MAX_TAGS))
const restCount = computed(() => Math.max(props.project.techStack.length - MAX_TAGS, 0))

const typeClass = computed(() => projectTypeStyles[props.project.type])

/** 没有封面数据也要给一个位，作品墙不能出现没有视觉的卡片 */
const cover = computed(
  () => props.project.shots?.[0] ?? { caption: `${props.project.name} 界面` },
)
</script>

<template>
  <RouterLink
    :to="`/projects/${project.slug}`"
    class="card card-hover group flex h-full flex-col overflow-hidden"
  >
    <!-- 封面 -->
    <div class="relative">
      <CoverFrame :shot="cover" :tone="project.type" flush />

      <!-- 状态角标：作品集最该被一眼看到的是「它现在是什么状态」 -->
      <span
        v-if="project.status"
        class="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-slate-200/80 bg-white/95 px-2 py-0.5 text-[11px] font-medium text-slate-700 backdrop-blur dark:border-white/10 dark:bg-ink-900/90 dark:text-slate-200"
      >
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        {{ project.status }}
      </span>
    </div>

    <!-- 文字 -->
    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="min-w-0 text-[17px] font-semibold tracking-tight text-slate-900 dark:text-white">
          {{ project.name }}
        </h3>
        <span
          class="mt-0.5 shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-medium"
          :class="typeClass"
        >
          {{ project.typeLabel }}
        </span>
      </div>

      <p class="mt-1 text-[13px] text-subtle">{{ project.subtitle }}</p>

      <p class="mt-3 text-[13px] leading-relaxed text-muted">
        {{ project.tagline }}
      </p>

      <!-- 技术栈：只给个轮廓，细节在详情页 -->
      <div class="mt-4 flex flex-wrap gap-1.5">
        <TechTag v-for="tech in visibleTags" :key="tech">{{ tech }}</TechTag>
        <TechTag v-if="restCount > 0">+{{ restCount }}</TechTag>
      </div>

      <!-- 底部：入口 -->
      <div class="mt-auto pt-5">
        <div
          class="flex items-center gap-2 border-t hairline pt-4 text-[13px] font-medium text-slate-900 dark:text-white"
        >
          <Lock v-if="project.sourceNote" :size="13" class="shrink-0 text-slate-400" />
          <span>看这个项目怎么做的</span>
          <ArrowRight
            :size="14"
            class="shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </div>
  </RouterLink>
</template>
