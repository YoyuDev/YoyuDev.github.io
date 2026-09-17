<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Github, Menu, Moon, Sun, X } from 'lucide-vue-next'
import { navItems, profile } from '@/data/profile'
import { useTheme } from '@/composables/useTheme'
import StatsBadge from './StatsBadge.vue'

const route = useRoute()
const { theme, toggle } = useTheme()

const mobileOpen = ref(false)

const isDark = computed(() => theme.value === 'dark')

// 路由变化时收起移动端菜单
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)

const linkBase =
  'rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'

const linkActive = 'bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white'
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b hairline bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:bg-ink-950/80 dark:supports-[backdrop-filter]:bg-ink-950/70"
  >
    <div class="container-page flex h-14 items-center justify-between gap-3">
      <!-- 品牌 -->
      <RouterLink
        to="/"
        class="flex shrink-0 items-center gap-2 rounded-md py-1 pr-2 transition-opacity hover:opacity-80"
        aria-label="返回首页"
      >
        <img
          :src="profile.avatar"
          alt=""
          width="28"
          height="28"
          decoding="async"
          class="h-7 w-7 shrink-0 rounded-md object-cover ring-1 ring-slate-900/10 dark:ring-white/20"
        />
        <span class="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
          {{ profile.brand }}  -  作品集
        </span>
      </RouterLink>

      <!-- 桌面导航 -->
      <nav class="hidden items-center gap-0.5 md:flex" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="linkBase"
          :active-class="linkActive"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- 右侧操作区 -->
      <div class="flex shrink-0 items-center gap-0.5">
        <!-- 访问量 + 点赞。数字拉不到时它自己不渲染，这里不用管兜底 -->
        <StatsBadge />

        <a
          :href="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          class="grid h-9 w-9 place-items-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label="GitHub 主页"
          title="GitHub"
        >
          <Github :size="18" />
        </a>

        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
          :title="isDark ? '切换到浅色主题' : '切换到深色主题'"
          @click="toggle()"
        >
          <Sun v-if="isDark" :size="18" />
          <Moon v-else :size="18" />
        </button>

        <button
          type="button"
          class="grid h-9 w-9 place-items-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          :aria-label="mobileOpen ? '关闭菜单' : '打开菜单'"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" :size="18" />
          <Menu v-else :size="18" />
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <nav
        v-if="mobileOpen"
        class="border-t hairline bg-white md:hidden dark:bg-ink-950"
        aria-label="移动端导航"
      >
        <div class="container-page flex flex-col py-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
            :active-class="linkActive"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
