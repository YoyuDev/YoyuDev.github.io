<script setup lang="ts">
import { Github, Mail } from 'lucide-vue-next'
import { profile } from '@/data/profile'
import { copyEmail } from '@/composables/useClipboard'
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <section class="container-page pb-16 pt-4 sm:pb-20">
    <div class="card flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div class="max-w-xl">
        <h2 class="section-title">欢迎交流</h2>
        <p class="mt-2.5 text-sm leading-relaxed text-muted">
          目前正在寻找 Java 全栈开发方向的校招 / 社招机会。项目、开源、技术写作相关内容都欢迎交流。
        </p>
      </div>
      <div class="flex shrink-0 flex-wrap gap-3">
        <!-- 点击复制邮箱而不是 mailto：访客机器上装没装邮件客户端不可控（见 useClipboard） -->
        <BaseButton
          variant="primary"
          size="md"
          title="点击复制邮箱地址"
          @click="copyEmail"
        >
          <Mail :size="16" />
          邮件联系
        </BaseButton>
        <BaseButton :href="profile.github" variant="secondary" size="md">
          <Github :size="16" />
          GitHub
        </BaseButton>
      </div>
    </div>
  </section>
</template>
