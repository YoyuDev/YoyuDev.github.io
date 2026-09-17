<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, ArrowUpRight, BookOpen, ChevronDown, Github, MapPin } from 'lucide-vue-next'
import { profile } from '@/data/profile'
import { buildingProjects, getProjectBySlug } from '@/data/projects'
import { PROJECT_HUE } from '@/utils/projectTone'
import type { ProjectType } from '@/types'
import BaseButton from '@/components/ui/BaseButton.vue'
import ProjectStream from './ProjectStream.vue'

/**
 * 首页首屏：左边简介 + 作品目录，右边项目卡片上下流动。
 *
 * 右栏原来放的是 Agent Workflow 视觉图（HeroWorkflow），换成了项目流——
 * 首屏本来就应该直接出现作品，而不是先讲一遍方法论。
 *
 * 流动的卡片一次只看得到三张，看不出「总共做了几个项目」，
 * 所以左边要有一份目录：点哪个项目名，右边就滚到哪张卡并停下来。
 * ⚠️ 这份目录**不再是单独一行胶囊**（原来 ProjectDirectory 那一排），
 *    而是直接长在下面的作品介绍里——两处都在列同一份 7 个项目名单，
 *    叠在一起把首屏顶到 886px（主人 2026-09-17：还是超出去）。合并后名单只出现一次。
 */
const building = buildingProjects[0]

/**
 * 作品介绍里只写了 slug，项目名与类型在这里补上。
 *
 * 用 shortName 优先——「多智能体协同个性化教育资源生成平台」这种全名塞进固定宽度那一列会被截断。
 * 名字从 projects.ts 取（而不是抄进 profile.ts），这样改项目名时首页不会掉队；
 * type 用来给「被选中」的那个名字上色，和项目卡片、列表页的色点是同一套口径。
 */
const workGroups = computed(() =>
  profile.workGroups.map((group) => ({
    label: group.label,
    items: group.items.map((item) => {
      const project = getProjectBySlug(item.slug)
      return {
        slug: item.slug,
        name: project?.shortName ?? project?.name ?? item.slug,
        type: project?.type ?? 'personal',
        intro: item.intro,
      }
    }),
  })),
)

/** 选中的项目；null = 全部（自动流动） */
const activeSlug = ref<string | null>(null)

/** 再点一次同一个名字 = 取消选中，回到自动流动（和原来胶囊的行为一致） */
function toggleProject(slug: string) {
  activeSlug.value = activeSlug.value === slug ? null : slug
}

/**
 * 项目名的「选中 / 未选中」样式。收起态与展开态两处共用，别各写一份。
 *
 * 选中用**类型色下划线**，不用色点：色点得一直占着那 10px 才不会被点击时的位移闪一下，
 * 结果就是 7 个名字之间凭空多出十几像素的空隙，整排看着松垮（试过，难看）。
 * 下划线不占布局，颜色又和项目卡片、列表页的色点是同一套口径。
 */
function nameClass(slug: string) {
  return activeSlug.value === slug
    ? 'font-medium text-slate-900 underline decoration-2 underline-offset-[3px] dark:text-white'
    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
}

function nameStyle(slug: string, type: ProjectType) {
  return activeSlug.value === slug
    ? { textDecorationColor: `rgb(${PROJECT_HUE[type]})` }
    : undefined
}

/**
 * 作品介绍是否展开。
 *
 * 默认**收起**：7 条介绍一起摆出来会把首屏顶到 999px，一屏（约 900px）放不下——
 * 首屏最该干的事是「让人一眼看到有什么作品」，而不是把细节一次倒完。
 * 收起时每行是「方向 + 项目名」，展开才补上每个项目的介绍。
 */
const worksExpanded = ref(false)
</script>

<template>
  <section class="relative overflow-hidden border-b hairline">
    <!-- 网格底纹，向下渐隐 -->
    <div class="pointer-events-none absolute inset-0 bg-grid mask-fade-b" aria-hidden="true" />

    <!-- 竖向留白跟着视口高度走。
         写死 py-20（80px）时，一屏（约 750px 高的笔记本视口）装不下整个首屏——
         首屏的职责是「不用滚动就能看完有什么作品」，所以矮屏要自动收紧。 -->
    <div class="container-page relative py-12 sm:py-14 lg:py-[clamp(2.75rem,6vh,5rem)]">
      <div
        class="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-14"
      >
        <!-- 左：简介 -->
        <div class="max-w-2xl">
          <!-- 身份行 -->
          <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span class="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">
              {{ profile.brand }}
            </span>
            <span class="h-3.5 w-px bg-slate-300 dark:bg-white/15" aria-hidden="true" />
            <span class="text-[13px] text-muted">
              {{ profile.headline }}
            </span>
          </div>

          <p class="mt-1.5 text-[13px] text-subtle">
            {{ profile.headlineEn }}
          </p>

          <!-- 主标题 -->
          <h1
            class="mt-6 text-[28px] font-semibold leading-[1.25] tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.2] lg:text-[38px] dark:text-white"
          >
            {{ profile.title }}
          </h1>

          <!-- 副标题 -->
          <p class="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
            {{ profile.subtitle }}
          </p>

          <!-- 作品介绍 + 作品目录（合并）：按方向分组，有哪些项目一眼扫完，项目名本身就是目录，点了右侧就定位过去。
               为什么要折叠：7 条介绍全摆出来会把首屏顶到 999px，一屏放不下（主人 2026-09-17 提的）。
               左侧竖线把整块箍成「补充说明」，与上面的副标题分开阅读——
               只靠字号、颜色区分会糊成副标题的延长段（试过，会误读）。
               列宽交给 grid 的 max-content，别写死像素——写死会把「教育多智能体平台」截断（踩过）。
               data-hero-works / data-hero-works-toggle / data-hero-works-name 是给验收脚本的挂点。 -->
          <div
            data-hero-works
            class="mt-5 max-w-xl border-l-2 border-slate-200 pl-4 dark:border-white/10"
          >
            <div
              class="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-2.5 gap-y-1 text-[13.5px] leading-relaxed"
            >
              <!-- 展开态：每个项目单独一条，右侧是它做了什么 -->
              <template v-if="worksExpanded">
                <template v-for="group in workGroups" :key="group.label">
                  <p
                    data-hero-works-label
                    class="col-span-2 text-[11.5px] font-medium tracking-wide text-slate-500 [&:not(:first-child)]:mt-2.5 dark:text-slate-400"
                  >
                    {{ group.label }}
                  </p>
                  <template v-for="item in group.items" :key="item.slug">
                    <button
                      type="button"
                      data-hero-works-name
                      :data-slug="item.slug"
                      :title="`点击在右侧定位到「${item.name}」`"
                      class="inline whitespace-nowrap text-left transition-colors"
                      :class="nameClass(item.slug)"
                      :style="nameStyle(item.slug, item.type)"
                      @click="toggleProject(item.slug)"
                    >
                      {{ item.name }}
                    </button>
                    <span data-hero-works-intro class="text-subtle">{{ item.intro }}</span>
                  </template>
                </template>
              </template>

              <!-- 收起态：一行一个方向，项目名可点，用 · 串在右侧 -->
              <template v-else>
                <template v-for="group in workGroups" :key="group.label">
                  <span
                    data-hero-works-label
                    class="whitespace-nowrap text-slate-600 dark:text-slate-300"
                  >
                    {{ group.label }}
                  </span>
                  <span data-hero-works-names class="text-subtle">
                    <template v-for="(item, i) in group.items" :key="item.slug">
                      <span
                        v-if="i > 0"
                        class="px-1 text-slate-300 dark:text-slate-600"
                        aria-hidden="true"
                        >·</span
                      >
                      <button
                        type="button"
                        data-hero-works-name
                        :data-slug="item.slug"
                        :title="`点击在右侧定位到「${item.name}」`"
                        class="inline whitespace-nowrap transition-colors"
                        :class="nameClass(item.slug)"
                        :style="nameStyle(item.slug, item.type)"
                        @click="toggleProject(item.slug)"
                      >
                        {{ item.name }}
                      </button>
                    </template>
                  </span>
                </template>
              </template>
            </div>

            <div class="mt-2 flex items-center gap-4">
              <button
                type="button"
                data-hero-works-toggle
                class="inline-flex items-center gap-1 py-0.5 text-[12.5px] text-slate-400 transition-colors hover:text-slate-700 dark:hover:text-slate-200"
                :aria-expanded="worksExpanded"
                @click="worksExpanded = !worksExpanded"
              >
                {{ worksExpanded ? '收起项目介绍' : '展开项目介绍' }}
                <ChevronDown
                  :size="13"
                  class="transition-transform duration-200"
                  :class="worksExpanded ? 'rotate-180' : ''"
                />
              </button>

              <!-- 恢复自动流动。没选中时也留着——按钮位置的稳定比省这一行重要，
                   而且它是「点名字能定位」这件事唯一的提示 -->
              <button
                type="button"
                class="py-0.5 text-[12.5px] transition-colors"
                :class="
                  activeSlug === null
                    ? 'cursor-default text-slate-300 dark:text-slate-600'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                "
                :aria-pressed="activeSlug === null"
                @click="activeSlug = null"
              >
                全部
              </button>
            </div>
          </div>

          <!-- 按钮 -->
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <BaseButton to="/projects" variant="primary" size="lg">
              查看项目
              <ArrowUpRight :size="17" />
            </BaseButton>
            <BaseButton :href="profile.github" variant="secondary" size="lg">
              <Github :size="17" />
              GitHub
            </BaseButton>
            <BaseButton :href="profile.blog" variant="secondary" size="lg">
              <BookOpen :size="17" />
              博客
            </BaseButton>
          </div>

          <!-- 元信息 -->
          <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-subtle">
            <span class="inline-flex items-center gap-1.5">
              <MapPin :size="14" />
              {{ profile.location }}
            </span>
            <RouterLink
              v-if="building"
              :to="`/projects/${building.slug}`"
              class="group inline-flex items-center gap-1.5 transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              正在做 {{ building.name }}
              <ArrowRight :size="13" class="transition-transform group-hover:translate-x-0.5" />
            </RouterLink>
          </div>
        </div>

        <!-- 右：项目卡片上下流动。悬停会暂停，方便点进去 -->
        <div class="w-full">
          <!-- lg 以下整页单列，宽度不限死在窄屏会把单张卡撑得过高（封面按比例跟着变高），
               所以限一下最大宽度；lg 起归位到右栏自己的宽度。

               ⚠️ lg 的高度用 vh 夹出来，不写死 620px。写死的话矮屏上光这一栏加内边距就超过一屏了
                  （620 + 2×80 = 780，再加上 57px 的导航 → 838）。夹到 62vh 后：
                  1440×900 时是 558px（恰好露出约 3 张卡），750 高的屏自动收到 465px。 -->
          <ProjectStream
            :active-slug="activeSlug"
            class="mx-auto h-[480px] max-w-[560px] sm:h-[560px] lg:mx-0 lg:h-[clamp(440px,62vh,620px)] lg:max-w-none"
          />
        </div>
      </div>
    </div>
  </section>
</template>
