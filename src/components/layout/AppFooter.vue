<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Github, Rss } from 'lucide-vue-next'
import { navItems, profile } from '@/data/profile'
import { copyEmail } from '@/composables/useClipboard'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t hairline">
    <div class="container-page py-10">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <!-- 左侧 -->
        <div class="max-w-xs">
          <div class="flex items-center gap-2">
            <img
              :src="profile.avatar"
              alt=""
              width="24"
              height="24"
              decoding="async"
              class="h-6 w-6 shrink-0 rounded-md object-cover ring-1 ring-slate-900/10 dark:ring-white/20"
            />
            <span class="text-sm font-semibold text-slate-900 dark:text-white">
              {{ profile.brand }}
            </span>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-subtle">
            {{ profile.headline }}
          </p>
          <p class="mt-1 text-sm leading-relaxed text-subtle">
            {{ profile.headlineEn }}
          </p>
        </div>

        <!-- 中间：站点导航 -->
        <nav class="flex flex-col gap-2.5" aria-label="页脚导航">
          <span class="text-xs font-medium uppercase tracking-wider text-subtle">Navigate</span>
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="w-fit text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <!-- 右侧：外部链接 -->
        <div class="flex flex-col gap-2.5">
          <span class="text-xs font-medium uppercase tracking-wider text-subtle">Elsewhere</span>
          <a
            :href="profile.github"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-fit items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <Github :size="15" />
            GitHub
          </a>
          <a
            :href="profile.blog"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-fit items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <Rss :size="15" />
            Blog
          </a>
          <!-- 邮箱是复制不是 mailto（访客装没装邮件客户端不可控），
               所以这里必须是 button 不是 a：a 没有 href 就不可聚焦、键盘也点不到 -->
          <button
            type="button"
            title="点击复制邮箱地址"
            class="w-fit text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            @click="copyEmail"
          >
            {{ profile.email }}
          </button>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-2 border-t hairline pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ profile.name }}. All rights reserved.</p>
        <p class="font-mono">Built with Vue 3 · TypeScript · Vite · Tailwind CSS</p>
      </div>
    </div>
  </footer>
</template>
