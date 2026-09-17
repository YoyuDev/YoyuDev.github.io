<script setup lang="ts">
import { ArrowUpRight, FileText, Rss } from 'lucide-vue-next'
import { blogCategories, blogStats, featuredPosts } from '@/data/blog'
import { isPlaceholder } from '@/data/placeholders'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import TechTag from '@/components/ui/TechTag.vue'

/**
 * 技术写作。
 *
 * 改法：原来这段的主体是「73 篇 / 100K+ 阅读」两个大数字——那是简历口径。
 * 现在主体换成代表文章本身，篇数与阅读量降级成底部一行小字。
 * 写作也是「作品」，所以先拿作品说话。
 */
</script>

<template>
  <section class="container-page border-t hairline py-16 sm:py-20">
    <SectionHeading
      eyebrow="Technical Writing"
      title="技术写作"
      description="把项目里踩过的坑写下来，是另一种形式的复盘。下面挑了几篇代表文章。"
    >
      <template #action>
        <BaseButton :href="blogStats.url" variant="secondary" size="sm">
          <Rss :size="15" />
          访问博客
          <ArrowUpRight :size="15" />
        </BaseButton>
      </template>
    </SectionHeading>

    <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="(post, index) in featuredPosts"
        :key="post.id"
        v-reveal="{ delay: index * 60 }"
        class="card card-hover overflow-hidden"
      >
        <a
          v-if="!isPlaceholder(post.url)"
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-full flex-col p-5"
        >
          <span class="code-chip w-fit">{{ post.category }}</span>
          <h3 class="mt-3.5 text-[15px] font-medium leading-relaxed text-slate-900 dark:text-white">
            {{ post.title }}
          </h3>
          <p v-if="post.summary" class="mt-2 text-[13px] leading-relaxed text-muted line-clamp-2">
            {{ post.summary }}
          </p>
          <span class="mt-auto pt-4 text-xs text-subtle">{{ post.date }}</span>
        </a>

        <!-- 链接还没提供时不生成假链接，灰显占位 -->
        <div v-else class="flex h-full flex-col p-5">
          <span class="code-chip w-fit">{{ post.category }}</span>
          <h3 class="mt-3.5 text-[15px] font-medium leading-relaxed text-slate-400 dark:text-slate-500">
            文章标题待补充
          </h3>
          <span class="mt-auto flex items-center gap-1.5 pt-4 text-xs text-subtle">
            <FileText :size="13" />
            还没有文章链接
          </span>
        </div>
      </li>
    </ul>

    <!-- 写作方向 + 量级，降级为小字 -->
    <div class="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
      <div class="flex flex-wrap gap-1.5">
        <TechTag v-for="category in blogCategories" :key="category.id">
          {{ category.name }}
        </TechTag>
      </div>
      <p class="text-[13px] text-subtle">
        累计 <span class="font-medium text-slate-700 tabular-nums dark:text-slate-300">{{ blogStats.articles }}</span> 篇 ·
        <span class="font-medium text-slate-700 tabular-nums dark:text-slate-300">{{ blogStats.views }}</span> 阅读
      </p>
    </div>
  </section>
</template>
