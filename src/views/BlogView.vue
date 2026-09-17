<script setup lang="ts">
import { ArrowUpRight, ExternalLink, FileText, PenLine, Rss } from 'lucide-vue-next'
import { blogCategories, blogStats, featuredPosts, writingPoints } from '@/data/blog'
import { isRealUrl } from '@/data/placeholders'
import BaseButton from '@/components/ui/BaseButton.vue'
import TechTag from '@/components/ui/TechTag.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  path: '/blog',
  title: '技术博客',
  description:
    '持续技术输出：Java、Spring Boot、AI Agent、RAG、LLM 与工程实践相关的文章与实践总结。',
})
</script>

<template>
  <div class="container-page py-12 sm:py-16">
    <!-- 页头 -->
    <header class="max-w-3xl">
      <p class="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400">
        Technical Writing
      </p>
      <h1 class="page-title">技术博客</h1>
      <p class="mt-4 text-[15px] leading-relaxed text-muted">
        把项目里踩过的坑和沉淀下来的做法写下来，是另一种形式的复盘。
      </p>
    </header>

    <!-- 统计 + 主张 -->
    <dl class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="card p-5">
        <dt class="text-xs font-medium uppercase tracking-wider text-subtle">Published Articles</dt>
        <dd class="mt-2 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums dark:text-white">
          {{ blogStats.articles }}
        </dd>
      </div>
      <div class="card p-5">
        <dt class="text-xs font-medium uppercase tracking-wider text-subtle">Total Views</dt>
        <dd class="mt-2 text-3xl font-semibold tracking-tight text-slate-900 tabular-nums dark:text-white">
          {{ blogStats.views }}
        </dd>
      </div>
      <div
        v-for="point in writingPoints"
        :key="point.title"
        class="card p-5 sm:col-span-1 lg:col-span-1"
      >
        <dt class="flex items-center gap-1.5 text-[13px] font-medium text-slate-900 dark:text-white">
          <PenLine :size="14" class="text-brand-500" />
          {{ point.title }}
        </dt>
        <dd class="mt-2 text-xs leading-relaxed text-muted">{{ point.detail }}</dd>
      </div>
    </dl>

    <!-- 分类 -->
    <section class="mt-12">
      <h2 class="section-title">写作方向</h2>
      <p class="mt-2 text-sm text-muted">主要覆盖以下几类内容。</p>

      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(category, index) in blogCategories"
          :key="category.id"
          v-reveal="{ delay: (index % 3) * 60 }"
          class="card flex h-full flex-col p-5"
        >
          <h3 class="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
            {{ category.name }}
          </h3>
          <p class="mt-2 text-[13px] leading-relaxed text-muted">
            {{ category.description }}
          </p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <TechTag v-for="topic in category.topics" :key="topic">{{ topic }}</TechTag>
          </div>
        </article>
      </div>
    </section>

    <!-- 代表文章：整张卡可点，直接跳原文 -->
    <section class="mt-12">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 class="section-title">代表文章</h2>
          <p class="mt-2 text-sm text-muted">
            挑的都是「遇到具体问题 → 排查 → 解决」的记录，而不是 API 用法清单。
          </p>
        </div>
        <BaseButton :href="blogStats.url" variant="secondary" size="sm">
          <Rss :size="15" />
          全部文章
          <ArrowUpRight :size="15" />
        </BaseButton>
      </div>

      <div class="mt-6 grid gap-4 md:grid-cols-3">
        <template v-for="post in featuredPosts" :key="post.id">
          <a
            v-if="isRealUrl(post.url)"
            :href="post.url"
            target="_blank"
            rel="noopener noreferrer"
            class="card card-hover flex h-full flex-col p-5"
          >
            <div class="flex items-center gap-2">
              <span class="code-chip">{{ post.category }}</span>
              <span class="ml-auto font-mono text-[11px] tabular-nums text-subtle">
                {{ post.date }}
              </span>
            </div>

            <h3 class="mt-3.5 text-[15px] font-medium leading-relaxed text-slate-900 dark:text-white">
              {{ post.title }}
            </h3>

            <p v-if="post.summary" class="mt-2 text-[13px] leading-relaxed text-muted line-clamp-3">
              {{ post.summary }}
            </p>

            <span
              class="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-medium text-brand-600 dark:text-brand-400"
            >
              阅读文章
              <ExternalLink :size="13" />
            </span>
          </a>

          <!-- 链接还没提供时不生成假链接，灰显占位 -->
          <div
            v-else
            class="flex h-full flex-col rounded-card border border-dashed border-slate-300 bg-slate-50/50 p-5 dark:border-white/15 dark:bg-white/[0.02]"
          >
            <div class="flex items-center gap-2">
              <span
                class="grid h-7 w-7 place-items-center rounded-md border border-slate-200 bg-white text-slate-400 dark:border-white/10 dark:bg-white/5"
              >
                <FileText :size="14" />
              </span>
              <span class="code-chip">{{ post.category }}</span>
              <span
                class="ml-auto rounded-md bg-slate-200/70 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-white/10 dark:text-slate-400"
              >
                待补充
              </span>
            </div>

            <p class="mt-3.5 font-mono text-[13px] text-slate-400 dark:text-slate-500">
              {{ post.title }}
            </p>

            <span
              class="mt-auto inline-flex cursor-not-allowed items-center gap-1.5 pt-4 text-[13px] text-slate-400 dark:text-slate-500"
            >
              链接待补充
            </span>
          </div>
        </template>
      </div>
    </section>

    <!-- CTA -->
    <section class="mt-12 card flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 class="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
          在 {{ blogStats.platform }} 上持续更新
        </h2>
        <p class="mt-1.5 text-sm text-muted">
          博客主页地址为真实链接，可直接访问全部 {{ blogStats.articles }} 篇文章。
        </p>
      </div>
      <BaseButton :href="blogStats.url" variant="primary" size="md" class="shrink-0">
        访问博客
        <ArrowUpRight :size="16" />
      </BaseButton>
    </section>
  </div>
</template>
