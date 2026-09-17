<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Info,
  Layers,
  Lock,
  User,
} from 'lucide-vue-next'
import type { Project } from '@/types'
import { getAdjacentProjects, getProjectBySlug, projectTypeStyles } from '@/data/projects'
import { isRealUrl } from '@/data/placeholders'
import CoverFrame from '@/components/ui/CoverFrame.vue'
import DecisionList from '@/components/ui/DecisionList.vue'
import FlowDiagram from '@/components/ui/FlowDiagram.vue'
import SmartLink from '@/components/ui/SmartLink.vue'
import TechTag from '@/components/ui/TechTag.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { copyEmail } from '@/composables/useClipboard'
import { useSeo } from '@/composables/useSeo'

/**
 * 项目详情页 —— 按 case study（作品档案）组织，不是简历里的项目条目。
 *
 * 叙述顺序刻意是这样的：
 *   封面（看得见的东西）
 *   -> 要解决什么问题
 *   -> 技术难点与决策      ← 这一段是整页的重心
 *   -> 系统架构
 *   -> 关键实现
 *   -> 功能范围
 *   -> 交付产出
 *
 * 原来的「我的角色 / 项目时间 / 项目类型」降级到右侧栏当元信息，
 * 它们不该占据正文位置。
 */
const route = useRoute()

const project = computed<Project | undefined>(() =>
  getProjectBySlug(String(route.params.slug ?? '')),
)

const adjacent = computed(() => getAdjacentProjects(String(route.params.slug ?? '')))

/** 封面：第一张图放大，其余排成缩略图 */
const cover = computed(() => project.value?.shots?.[0])
const restShots = computed(() => project.value?.shots?.slice(1) ?? [])

/** 顶部只放真实可点的链接，TODO 占位不在这里出现 */
const realLinks = computed(() => (project.value?.links ?? []).filter((l) => isRealUrl(l.url)))

/**
 * 源码说明下面那句解释。
 *
 * 原来这段是写死的「商用 / 竞赛交付内容」，个人项目一旦挂上 sourceNote
 * 就会跟着说错话——所以按项目类型分两句。
 */
const sourceNoteDetail = computed(() =>
  project.value?.type === 'commercial' || project.value?.type === 'competition'
    ? '该项目属于商用 / 竞赛交付内容，涉及客户与团队信息，不提供公开源码。想聊具体做法，欢迎邮件沟通。'
    : '这是个人项目，源码未整理公开。想聊具体做法，欢迎邮件沟通。',
)

useSeo({
  path: route.path,
  title: project.value?.name,
  description: project.value?.tagline,
})
</script>

<template>
  <!-- 找不到项目 -->
  <div v-if="!project" class="container-page py-24">
    <p class="font-mono text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400">404</p>
    <h1 class="mt-3 page-title">没有找到这个项目</h1>
    <p class="mt-4 text-sm text-muted">
      链接可能已经失效，或者项目尚未收录。返回列表看看其他项目吧。
    </p>
    <div class="mt-8">
      <BaseButton to="/projects" variant="primary">
        <ArrowLeft :size="16" />
        返回作品列表
      </BaseButton>
    </div>
  </div>

  <div v-else class="container-page py-10 sm:py-14">
    <RouterLink
      to="/projects"
      class="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-slate-900 dark:hover:text-white"
    >
      <ArrowLeft :size="15" />
      全部作品
    </RouterLink>

    <!-- ============================ 头部 ============================ -->
    <header class="mt-6 max-w-3xl">
      <div class="flex flex-wrap items-center gap-2">
        <span
          class="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium"
          :class="projectTypeStyles[project.type]"
        >
          {{ project.typeLabel }}
        </span>
        <span v-if="project.status" class="code-chip">{{ project.status }}</span>
      </div>

      <h1
        class="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white"
      >
        {{ project.name }}
      </h1>
      <p class="mt-2 text-[15px] text-muted sm:text-base">
        {{ project.subtitle }}
      </p>

      <!-- 一句话：这个作品是什么 -->
      <p class="mt-5 text-[15px] leading-relaxed text-slate-800 sm:text-base dark:text-slate-200">
        {{ project.tagline }}
      </p>

      <!-- 可直接验证的入口 -->
      <div v-if="realLinks.length" class="mt-6 flex flex-wrap gap-3">
        <BaseButton
          v-for="link in realLinks"
          :key="link.label"
          :href="link.url"
          variant="secondary"
          size="sm"
        >
          {{ link.label }}
        </BaseButton>
      </div>
    </header>

    <!-- ============================ 封面 ============================ -->
    <div v-if="cover" class="mt-9" v-reveal>
      <CoverFrame :shot="cover" :tone="project.type" size="lg" />

      <!-- 补充截图。
           用多栏流（columns）而不是 grid：截图比例天然不统一，遇到竖图（手机截图）
           grid 会把整行撑到竖图的高度，同排的横图下面留一大片空白。 -->
      <div v-if="restShots.length" class="mt-4 columns-1 gap-4 sm:columns-2">
        <CoverFrame
          v-for="shot in restShots"
          :key="shot.caption"
          :shot="shot"
          :tone="project.type"
          size="lg"
          class="mb-4 break-inside-avoid"
        />
      </div>
    </div>

    <!-- ============================ 主体 ============================ -->
    <div class="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_286px] lg:gap-12">
      <!-- 左：case study 正文 -->
      <div class="min-w-0 space-y-12">
        <!-- 01 要解决的问题 -->
        <section>
          <h2 class="mb-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            <span class="step-index">01</span>
            要解决的问题
          </h2>
          <p class="text-[15px] leading-[1.8] text-muted">
            {{ project.summary }}
          </p>
        </section>

        <!-- 02 技术难点与决策 —— 整页重心 -->
        <section v-if="project.decisions?.length">
          <h2 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            <span class="step-index">02</span>
            技术难点与决策
          </h2>
          <p class="mb-4 mt-2 text-[13px] leading-relaxed text-subtle">
            每条都是「卡在哪 → 怎么处理 → 代价或结果」。这些才是一个项目真正的信息量。
          </p>
          <DecisionList :decisions="project.decisions" />
        </section>

        <!-- 03 系统架构 -->
        <section>
          <h2 class="mb-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            <span class="step-index">03</span>
            系统架构
          </h2>

          <div class="space-y-6">
            <div v-for="group in project.architecture" :key="group.title" class="card p-4 sm:p-5">
              <div class="mb-3.5">
                <h3 class="text-sm font-medium text-slate-900 dark:text-white">
                  {{ group.title }}
                </h3>
                <p v-if="group.caption" class="mt-0.5 text-xs text-subtle">
                  {{ group.caption }}
                </p>
              </div>
              <FlowDiagram :nodes="group.nodes" />
            </div>
          </div>

          <p
            v-if="project.architectureNote"
            class="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-subtle"
          >
            <Info :size="15" class="mt-0.5 shrink-0" />
            {{ project.architectureNote }}
          </p>
        </section>

        <!-- 04 关键实现 -->
        <section>
          <h2 class="mb-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            <span class="step-index">04</span>
            关键实现
          </h2>
          <ol class="space-y-3">
            <li
              v-for="(item, index) in project.implementations"
              :key="item.title"
              class="card flex gap-4 p-4 sm:p-5"
            >
              <span class="mt-0.5 shrink-0 font-mono text-xs text-slate-400 dark:text-slate-500">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <div class="min-w-0">
                <h3 class="text-sm font-medium text-slate-900 dark:text-white">
                  {{ item.title }}
                </h3>
                <p class="mt-1.5 text-[13px] leading-relaxed text-muted">
                  {{ item.description }}
                </p>
              </div>
            </li>
          </ol>
        </section>

        <!-- 05 功能范围 -->
        <section>
          <h2 class="mb-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            <span class="step-index">05</span>
            功能范围
          </h2>
          <ul class="grid gap-3 sm:grid-cols-2">
            <li v-for="feature in project.features" :key="feature.title" class="card p-4">
              <h3 class="text-sm font-medium text-slate-900 dark:text-white">
                {{ feature.title }}
              </h3>
              <p class="mt-1.5 text-[13px] leading-relaxed text-muted">
                {{ feature.description }}
              </p>
            </li>
          </ul>
        </section>

        <!-- 06 交付与产出 -->
        <section>
          <h2 class="mb-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            <span class="step-index">06</span>
            交付与产出
          </h2>
          <ul class="space-y-2.5">
            <li
              v-for="outcome in project.outcomes"
              :key="outcome"
              class="flex items-start gap-2.5 text-[14px] leading-relaxed text-muted"
            >
              <CheckCircle2 :size="16" class="mt-0.5 shrink-0 text-emerald-500" />
              {{ outcome }}
            </li>
          </ul>
        </section>

        <!-- 源码说明 -->
        <section
          v-if="project.sourceNote"
          class="flex items-start gap-3 rounded-card border border-dashed border-slate-300 bg-slate-50/60 p-4 dark:border-white/15 dark:bg-white/[0.02]"
        >
          <Lock :size="16" class="mt-0.5 shrink-0 text-slate-400" />
          <div>
            <p class="text-[13px] font-medium text-slate-700 dark:text-slate-300">
              {{ project.sourceNote }}
            </p>
            <p class="mt-1 text-xs leading-relaxed text-subtle">
              {{ sourceNoteDetail }}
            </p>
          </div>
        </section>
      </div>

      <!-- 右：元信息（简历字段降级到这里） -->
      <aside class="lg:sticky lg:top-20 lg:self-start">
        <div class="card divide-y hairline">
          <div class="p-4">
            <p class="mb-3 text-xs font-medium uppercase tracking-wider text-subtle">
              Project Info
            </p>
            <dl class="space-y-3">
              <div class="flex items-start gap-2.5">
                <Layers :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div class="min-w-0">
                  <dt class="text-[11px] text-subtle">项目类型</dt>
                  <dd class="text-[13px] text-slate-700 dark:text-slate-300">
                    {{ project.typeLabel }}
                  </dd>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <Calendar :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div class="min-w-0">
                  <dt class="text-[11px] text-subtle">项目时间</dt>
                  <dd class="text-[13px] text-slate-700 dark:text-slate-300">
                    {{ project.period }}
                  </dd>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <User :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div class="min-w-0">
                  <dt class="text-[11px] text-subtle">我的角色</dt>
                  <dd class="text-[13px] text-slate-700 dark:text-slate-300">
                    {{ project.role }}
                  </dd>
                </div>
              </div>
              <div v-if="project.status" class="flex items-start gap-2.5">
                <Clock :size="14" class="mt-0.5 shrink-0 text-slate-400" />
                <div class="min-w-0">
                  <dt class="text-[11px] text-subtle">项目状态</dt>
                  <dd class="text-[13px] text-slate-700 dark:text-slate-300">
                    {{ project.status }}
                  </dd>
                </div>
              </div>
            </dl>

            <!-- 重点标签：从正文头部降到侧栏，不再抢视觉 -->
            <div v-if="project.highlights.length" class="mt-4 flex flex-wrap gap-1.5 border-t hairline pt-3.5">
              <TechTag v-for="item in project.highlights" :key="item">{{ item }}</TechTag>
            </div>
          </div>

          <div class="p-4">
            <p class="mb-3 text-xs font-medium uppercase tracking-wider text-subtle">Tech Stack</p>
            <div class="flex flex-wrap gap-1.5">
              <TechTag v-for="tech in project.techStack" :key="tech">{{ tech }}</TechTag>
            </div>
          </div>

          <div class="p-4">
            <p class="mb-3 text-xs font-medium uppercase tracking-wider text-subtle">Links</p>

            <div v-if="project.links.length" class="flex flex-col gap-2">
              <SmartLink v-for="link in project.links" :key="link.label" :link="link" />
              <p
                v-if="project.links.some((l) => l.note)"
                class="text-[11px] leading-relaxed text-subtle"
              >
                {{ project.links.find((l) => l.note)?.note }}
              </p>
            </div>

            <p v-else class="text-[13px] leading-relaxed text-subtle">
              {{ project.sourceNote ?? '暂无公开链接。' }}
            </p>
          </div>
        </div>

        <div class="mt-4">
          <!-- 点击复制邮箱而不是 mailto：访客机器上装没装邮件客户端不可控（见 useClipboard） -->
          <BaseButton
            variant="secondary"
            size="sm"
            block
            title="点击复制邮箱地址"
            @click="copyEmail"
          >
            邮件聊技术细节
          </BaseButton>
        </div>
      </aside>
    </div>

    <!-- 上一个 / 下一个 -->
    <nav class="mt-14 grid gap-3 border-t hairline pt-8 sm:grid-cols-2">
      <RouterLink
        v-if="adjacent.prev"
        :to="`/projects/${adjacent.prev.slug}`"
        class="card card-hover group flex items-center gap-3 p-4"
      >
        <ArrowLeft
          :size="16"
          class="shrink-0 text-slate-400 transition-transform group-hover:-translate-x-0.5"
        />
        <span class="min-w-0">
          <span class="block text-[11px] text-subtle">上一个作品</span>
          <span class="block truncate text-sm font-medium text-slate-900 dark:text-white">
            {{ adjacent.prev.name }}
          </span>
        </span>
      </RouterLink>
      <span v-else class="hidden sm:block" />

      <RouterLink
        v-if="adjacent.next"
        :to="`/projects/${adjacent.next.slug}`"
        class="card card-hover group flex items-center justify-end gap-3 p-4 text-right"
      >
        <span class="min-w-0">
          <span class="block text-[11px] text-subtle">下一个作品</span>
          <span class="block truncate text-sm font-medium text-slate-900 dark:text-white">
            {{ adjacent.next.name }}
          </span>
        </span>
        <ArrowRight
          :size="16"
          class="shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5"
        />
      </RouterLink>
    </nav>
  </div>
</template>
