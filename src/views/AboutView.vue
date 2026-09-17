<script setup lang="ts">
import { Award, Briefcase, Github, GraduationCap, Mail, MapPin, Rss } from 'lucide-vue-next'
import { contactLinks, awards, profile, timeline } from '@/data/profile'
import type { ContactLink } from '@/types'
import { copyEmail } from '@/composables/useClipboard'
import { skillGroups } from '@/data/skills'
import { openSourceItems } from '@/data/openSource'
import TechTag from '@/components/ui/TechTag.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  path: '/about',
  title: '关于我',
  description:
    '软件工程本科在读，方向为 Java 全栈开发与 AI Agent 应用开发。经历包含线上商用项目、开源项目与技术写作。',
})

const education = timeline.filter((t) => t.kind === 'education')
const work = timeline.filter((t) => t.kind === 'work')

/**
 * 联系方式列表里，邮箱那条点了是复制地址、其余是跳链接。
 * 判断收在这里，模板里就不必堆一长串 `contact.copy ? undefined : ...` 的三元。
 */
function onContactClick(contact: ContactLink) {
  if (contact.copy) void copyEmail()
}

/** 我做的三类事 */
const tracks = [
  {
    title: '线上商用项目',
    detail: '独立完成 2 个项目从需求分析到部署上线的完整交付，目前均已上线运行。',
    to: '/projects',
  },
  {
    title: '开源项目',
    detail: '参与 DeepSeek Harness 开源生态，并维护 PianoAgent、SoulAgent 等 Agent 方向的仓库。',
    to: '/open-source',
  },
  {
    title: '技术博客',
    detail: '持续输出 Java、Spring Boot 与 AI Agent 相关的工程实践总结，累计 73 篇文章。',
    to: '/blog',
  },
]
</script>

<template>
  <div class="container-page py-12 sm:py-16">
    <!-- 页头 -->
    <header class="max-w-3xl">
      <p class="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400">
        About
      </p>
      <h1 class="page-title">
        {{ profile.name }}
        <span class="ml-2 align-middle text-base font-normal text-subtle">{{ profile.brand }}</span>
      </h1>

      <p class="mt-5 text-[15px] leading-relaxed text-muted">
        软件工程本科在读，方向是 <strong class="font-medium text-slate-900 dark:text-white">Java 全栈开发</strong> 与
        <strong class="font-medium text-slate-900 dark:text-white">AI Agent 应用开发</strong>。
        熟悉 Spring Boot、Vue3、MySQL、Linux / Nginx，实践过 LangChain4j、LangGraph、RAG、向量数据库与
        Multi-Agent，具备从需求分析、方案设计、数据库设计、前后端开发到部署上线的完整工程能力。
      </p>

      <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-subtle">
        <span class="inline-flex items-center gap-1.5">
          <MapPin :size="14" />
          {{ profile.location }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          求职中 · {{ profile.jobTarget }}
        </span>
      </div>

      <div class="mt-7 flex flex-wrap gap-3">
        <!-- 点击复制邮箱而不是 mailto：访客机器上装没装邮件客户端不可控（见 useClipboard） -->
        <button
          type="button"
          title="点击复制邮箱地址"
          class="inline-flex h-9 items-center gap-2 rounded-md bg-slate-900 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          @click="copyEmail"
        >
          <Mail :size="16" />
          邮件联系
        </button>
        <a
          :href="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/10"
        >
          <Github :size="16" />
          GitHub
        </a>
        <a
          :href="profile.blog"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/25 dark:hover:bg-white/10"
        >
          <Rss :size="16" />
          Blog
        </a>
      </div>
    </header>

    <!-- 经历三条线 -->
    <section class="mt-14">
      <h2 class="section-title">我在做的事</h2>
      <div class="mt-5 grid gap-4 sm:grid-cols-3">
        <RouterLink
          v-for="(track, index) in tracks"
          :key="track.title"
          v-reveal="{ delay: index * 60 }"
          :to="track.to"
          class="card card-hover p-5"
        >
          <h3 class="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ track.title }}
          </h3>
          <p class="mt-2 text-[13px] leading-relaxed text-muted">{{ track.detail }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="mt-14">
      <h2 class="section-title">技术栈</h2>
      <p class="mt-2 text-sm text-muted">按使用场景分类，都是实际项目里用过的技术。</p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div
          v-for="(group, index) in skillGroups"
          :key="group.id"
          v-reveal="{ delay: index * 60 }"
          class="card p-5"
        >
          <div class="flex items-baseline justify-between gap-3">
            <h3 class="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              {{ group.title }}
            </h3>
            <span class="text-xs text-subtle">{{ group.summary }}</span>
          </div>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <TechTag
              v-for="item in group.items"
              :key="item"
              size="md"
              :accent="group.id === 'ai'"
            >
              {{ item }}
            </TechTag>
          </div>
        </div>
      </div>
    </section>

    <!-- 教育与实习 -->
    <section class="mt-14">
      <h2 class="section-title">教育与实习经历</h2>

      <div class="mt-6 grid gap-8 lg:grid-cols-2">
        <!-- 实习 -->
        <div>
          <h3 class="mb-4 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
            <Briefcase :size="15" class="text-brand-500" />
            实习经历
          </h3>
          <ol class="space-y-4">
            <li v-for="item in work" :key="item.period" class="card p-5">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <span class="text-[15px] font-medium text-slate-900 dark:text-white">
                  {{ item.organization }}
                </span>
                <span class="font-mono text-xs text-subtle">{{ item.period }}</span>
              </div>
              <p class="mt-1 text-[13px] text-muted">{{ item.role }}</p>
              <p v-if="item.description" class="mt-3 text-[13px] leading-relaxed text-muted">
                {{ item.description }}
              </p>
              <div v-if="item.tags" class="mt-3.5 flex flex-wrap gap-1.5">
                <TechTag v-for="tag in item.tags" :key="tag">{{ tag }}</TechTag>
              </div>
            </li>
          </ol>
        </div>

        <!-- 教育 -->
        <div>
          <h3 class="mb-4 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
            <GraduationCap :size="15" class="text-brand-500" />
            教育背景
          </h3>
          <ol class="space-y-4">
            <li v-for="item in education" :key="item.period" class="card p-5">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <span class="text-[15px] font-medium text-slate-900 dark:text-white">
                  {{ item.organization }}
                </span>
                <span class="font-mono text-xs text-subtle">{{ item.period }}</span>
              </div>
              <p class="mt-1 text-[13px] text-muted">{{ item.role }}</p>
              <div v-if="item.tags" class="mt-3.5 flex flex-wrap gap-1.5">
                <TechTag v-for="tag in item.tags" :key="tag">{{ tag }}</TechTag>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 开源 -->
    <section class="mt-14">
      <h2 class="section-title">开源</h2>
      <div class="mt-5 card divide-y hairline">
        <div
          v-for="item in openSourceItems"
          :key="item.id"
          class="flex flex-wrap items-center gap-x-4 gap-y-2 p-5"
        >
          <span class="text-[15px] font-medium text-slate-900 dark:text-white">
            {{ item.name }}
          </span>
          <span class="text-[13px] text-muted">{{ item.subtitle }}</span>
          <span class="ml-auto text-xs text-subtle">{{ item.role }}</span>
        </div>
      </div>
      <p class="mt-3 text-xs text-subtle">
        其中 dsh-ping 属于 DeepSeek Harness 开源生态的个人贡献，不代表官方身份。
      </p>
    </section>

    <!-- 获奖 -->
    <section class="mt-14">
      <h2 class="section-title">荣誉奖项</h2>
      <ul class="mt-5 grid gap-3 sm:grid-cols-2">
        <li
          v-for="award in awards"
          :key="award.title"
          class="flex items-start gap-3 rounded-card border hairline bg-white p-4 dark:bg-white/[0.03]"
        >
          <Award :size="16" class="mt-0.5 shrink-0 text-amber-500" />
          <div class="min-w-0">
            <p class="text-[13px] leading-relaxed text-slate-800 dark:text-slate-200">
              {{ award.title }}
            </p>
            <p class="mt-1 text-xs text-subtle">{{ award.level }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- 联系方式 -->
    <section class="mt-14">
      <h2 class="section-title">联系方式</h2>
      <div class="mt-5 card divide-y hairline">
        <!-- 邮箱那条渲染成 button（点了是复制），其余是真链接。
             用 <component :is> 而不是写两个分支：里面的 DOM 完全一样，
             复制一份出来只会在改样式时漏改一边。 -->
        <component
          :is="contact.copy ? 'button' : 'a'"
          v-for="contact in contactLinks"
          :key="contact.label"
          :type="contact.copy ? 'button' : undefined"
          :href="contact.copy ? undefined : contact.url"
          :target="contact.copy ? undefined : '_blank'"
          :rel="contact.copy ? undefined : 'noopener noreferrer'"
          :title="contact.copy ? '点击复制邮箱地址' : undefined"
          class="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
          @click="onContactClick(contact)"
        >
          <span class="w-16 shrink-0 text-xs font-medium uppercase tracking-wider text-subtle">
            {{ contact.label }}
          </span>
          <span class="truncate text-sm text-slate-800 dark:text-slate-200">{{ contact.value }}</span>
        </component>
      </div>
    </section>
  </div>
</template>
