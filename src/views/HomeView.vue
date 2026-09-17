<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import WritingTeaser from '@/components/home/WritingTeaser.vue'
import ContactCta from '@/components/home/ContactCta.vue'
import { useSeo } from '@/composables/useSeo'

/**
 * 首页 = 作品集首页。
 *
 * 结构刻意保持很短：Hero（左边简介 + 右边上下流动的项目卡片）-> 技术写作 -> 联系。
 *
 * 被移除的几块：
 * - 「数字看板」「技能罗列」「Currently Building」——简历口径，用数字证明「我做过很多」
 * - 「作品墙」——Hero 右侧已经在展示同一批项目了，同一批项目出现两遍只会稀释重点。
 *   需要一格格浏览的作品墙时，走 /projects。
 *
 * 首页使用 index.html 里的默认 SEO 信息
 */
useSeo({ path: '/' })
</script>

<template>
  <div class="animate-fade-up">
    <HeroSection />
    <WritingTeaser />
    <ContactCta />
  </div>
</template>
