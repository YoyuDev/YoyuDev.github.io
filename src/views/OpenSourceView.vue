<script setup lang="ts">
import { Bell, CheckCircle2, Info, Radio } from 'lucide-vue-next'
import { ecosystemNote, openSourceItems } from '@/data/openSource'
import CoverFrame from '@/components/ui/CoverFrame.vue'
import FlowDiagram from '@/components/ui/FlowDiagram.vue'
import SmartLink from '@/components/ui/SmartLink.vue'
import TechTag from '@/components/ui/TechTag.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  path: '/open-source',
  title: '开源项目',
  description:
    '围绕 AI Agent 方向的开源实践：DeepSeek Harness 生态的 dsh-ping 提醒插件，以及 Multi-Agent 音乐创作、长期记忆角色系统。',
})

const [featuredItem, ...restItems] = openSourceItems
</script>

<template>
  <div class="container-page py-12 sm:py-16">
    <!-- 页头 -->
    <header class="max-w-3xl">
      <p class="mb-2 font-mono text-xs font-medium uppercase tracking-wider text-brand-600 dark:text-brand-400">
        Open Source
      </p>
      <h1 class="page-title">开源项目</h1>
      <p class="mt-4 text-[15px] leading-relaxed text-muted">
        {{ ecosystemNote.description }}
      </p>
    </header>

    <!-- 生态要点 -->
    <dl class="mt-8 grid gap-3 sm:grid-cols-3">
      <div v-for="(point, index) in ecosystemNote.points" :key="point.title" v-reveal="{ delay: index * 60 }" class="card p-4">
        <dt class="text-[13px] font-medium text-slate-900 dark:text-white">
          {{ point.title }}
        </dt>
        <dd class="mt-1.5 text-xs leading-relaxed text-muted">
          {{ point.detail }}
        </dd>
      </div>
    </dl>

    <!-- 重点项目：dsh-ping -->
    <section v-if="featuredItem" class="mt-12">
      <article class="card overflow-hidden">
        <!-- 标题区 -->
        <div class="border-b hairline p-5 sm:p-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span
              class="grid h-8 w-8 place-items-center rounded-md border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
            >
              <Bell :size="15" class="text-amber-500" />
            </span>
            <h2 class="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {{ featuredItem.name }}
              <span v-if="featuredItem.emoji" aria-hidden="true">{{ featuredItem.emoji }}</span>
            </h2>
            <span class="code-chip">Open Source</span>
            <span v-if="featuredItem.ecosystem" class="code-chip">
              {{ featuredItem.ecosystem }}
            </span>
          </div>

          <p class="mt-3 font-mono text-[13px] text-brand-600 dark:text-brand-400">
            {{ featuredItem.subtitle }}
          </p>
          <p class="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted">
            {{ featuredItem.description }}
          </p>

          <div class="mt-5 flex flex-wrap gap-1.5">
            <TechTag v-for="tag in featuredItem.tags" :key="tag" accent>{{ tag }}</TechTag>
          </div>
        </div>

        <!-- 界面截图：一张真实截图比一段描述有说服力 -->
        <CoverFrame
          v-if="featuredItem.shots?.[0]"
          :shot="featuredItem.shots[0]"
          size="lg"
          flush
          class="border-b hairline"
        />

        <!-- 支持事件 + 流程 -->
        <div class="grid gap-6 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10">
          <!-- 事件 -->
          <div>
            <h3 class="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <Radio :size="15" class="text-brand-500" />
              支持的事件
            </h3>
            <ul class="divide-y hairline">
              <li
                v-for="event in featuredItem.events"
                :key="event.name"
                class="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2.5"
              >
                <code class="font-mono text-[13px] font-medium text-slate-900 dark:text-white">
                  {{ event.name }}
                </code>
                <span class="text-[13px] text-muted">{{ event.description }}</span>
              </li>
            </ul>
          </div>

          <!-- 流程 -->
          <div>
            <h3 class="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
              <Bell :size="15" class="text-brand-500" />
              通知链路
            </h3>
            <FlowDiagram v-if="featuredItem.flow" :nodes="featuredItem.flow" />
          </div>
        </div>

        <!-- 底部：链接 + 身份说明 -->
        <div class="flex flex-wrap items-center gap-3 border-t hairline bg-slate-50/60 px-5 py-4 sm:px-6 dark:bg-white/[0.015]">
          <SmartLink v-for="link in featuredItem.links" :key="link.label" :link="link" />
          <span class="text-xs text-subtle">{{ featuredItem.role }}</span>
        </div>
      </article>

      <!-- 身份澄清（避免被误解为官方身份） -->
      <p class="mt-3 flex items-start gap-2 text-xs leading-relaxed text-subtle">
        <Info :size="14" class="mt-0.5 shrink-0" />
        以上为参与 DeepSeek Harness 开源生态的个人贡献，不代表 DeepSeek 官方身份。
      </p>
    </section>

    <!-- 其他开源项目 -->
    <section class="mt-12">
      <h2 class="mb-5 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
        其他开源项目
      </h2>

      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="(item, index) in restItems"
          :key="item.id"
          v-reveal="{ delay: index * 70 }"
          class="card card-hover flex h-full flex-col overflow-hidden"
        >
          <!-- 有截图的先给图。没图的条目只是矮一些，不会留一个空占位框 -->
          <CoverFrame
            v-if="item.shots?.[0]?.src"
            :shot="item.shots[0]"
            ratio="16/9"
            flush
            class="border-b hairline"
          />

          <div class="flex flex-1 flex-col p-5">
            <div class="flex items-center gap-2">
              <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                {{ item.name }}
              </h3>
              <span v-if="item.ecosystem" class="code-chip">{{ item.ecosystem }}</span>
            </div>

            <p class="mt-1 font-mono text-[12px] text-brand-600 dark:text-brand-400">
              {{ item.subtitle }}
            </p>

            <p class="mt-3 text-[13px] leading-relaxed text-muted">
              {{ item.description }}
            </p>

            <!-- 关键能力 -->
            <ul v-if="item.events" class="mt-4 space-y-1.5">
              <li
                v-for="event in item.events.slice(0, 3)"
                :key="event.name"
                class="flex items-start gap-2 text-xs text-subtle"
              >
                <CheckCircle2 :size="13" class="mt-0.5 shrink-0 text-emerald-500" />
                <span><code class="font-mono">{{ event.name }}</code> · {{ event.description }}</span>
              </li>
            </ul>

            <div class="mt-4 flex flex-wrap gap-1.5">
              <TechTag v-for="tag in item.tags.slice(0, 4)" :key="tag">{{ tag }}</TechTag>
            </div>

            <div class="mt-auto flex flex-wrap items-center gap-2 border-t hairline pt-4">
              <SmartLink v-for="link in item.links" :key="link.label" :link="link" size="sm" />
              <span class="ml-auto text-xs text-subtle">{{ item.role }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
