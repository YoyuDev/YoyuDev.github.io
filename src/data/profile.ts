import type { ContactLink, NavItem, Profile, TimelineItem } from '@/types'
import { asset } from '@/utils/asset'

/**
 * 个人资料。
 *
 * ⚠️ 修改个人信息只需要改这个文件 + src/data/skills.ts + src/data/timeline.ts（本文件下方）。
 * 手机号等敏感信息没有放进来——公开站点建议只保留邮箱与社交主页。
 */
export const profile: Profile = {
  brand: '一只游鱼',
  // 换头像：替换 public/avatar.png 即可。导航栏 / 页脚 / About 用它，**浏览器标签页图标也是它**
  // （index.html 里的 rel="icon" 直接指这个文件），所以只换一张头像，三处一起变。
  // 建议正方形、≥300×300（页面最大 96px、favicon 最多 32px，留足 3x 余量）
  avatar: asset('avatar.png'),
  name: '赵伟',
  headline: 'Java 全栈开发 · AI Agent 应用开发',
  headlineEn: 'Software Engineering Student',
  title: '用 Java 构建业务系统，用 Agent 探索 AI 应用。',
  subtitle:
    '专注 Java 全栈开发与 AI Agent 应用工程。下面是实际交付过的系统——从已上线的商用小程序，到多智能体协作的 AI 创作工具，每个都点得进去看它怎么搭的。',
  // 首页 Hero 的作品介绍：按方向分组，**每个项目一条**，各带一句介绍。
  // 讲「这批作品覆盖哪几个方向、每个项目是什么」，不是讲「我」——
  // 自我介绍 / 技术栈 / 求职意向都归 About 页，别往这里放。
  //
  // ⚠️ 只写 slug，项目名由 HeroSection 从 projects.ts 取（shortName 优先），别在这里抄名字。
  // ⚠️ 改项目（增删、换类型）时同步这里；label 用 /projects 筛选标签的口径，别另起一套叫法。
  // ⚠️ intro 控制在 30 个全角字内（项目名右侧那列只有约 34 字宽），超了会折行、整组就不齐了。
  workGroups: [
    {
      label: '线上商用项目',
      items: [
        {
          slug: 'beiqi-care',
          intro: '微信小程序，预约 / 支付 / 订单全链路，独立交付上线',
        },
        {
          slug: 'foreign-trade-portal',
          intro: '企业门户 + 后台管理双端，Spring Boot + Vue3 独立交付',
        },
      ],
    },
    {
      label: 'AI / Agent',
      items: [
        {
          slug: 'piano-agent',
          intro: 'Multi-Agent 的 AI 音乐创作工具，已发布 npm',
        },
        {
          slug: 'soul-agent',
          intro: '长期记忆型 AI 角色，人格建模 + 向量检索',
        },
        {
          slug: 'dsh-ping',
          intro: 'DeepSeek Harness 会话事件提醒插件，已发布 npm',
        },
      ],
    },
    {
      label: '竞赛项目',
      items: [
        {
          slug: 'education-agent',
          intro: '5 类智能体协同，从学习目标生成个性化资源',
        },
      ],
    },
    {
      label: '个人项目',
      items: [
        {
          slug: 'cy-fang',
          intro: 'Spring Cloud 微服务动漫站，含弹幕与可视化大屏',
        },
      ],
    },
  ],
  location: '中国 · 辽宁',
  email: '1910693646@qq.com',
  jobTarget: 'JAVA 全栈开发',
  // ↓↓↓ 以下均为简历中提供的真实地址
  github: 'https://github.com/YoyuDev',
  blog: 'https://blog.csdn.net/hahai_',
}

/** 主导航 */
export const navItems: NavItem[] = [
  { label: '项目', to: '/projects' },
  { label: '开源', to: '/open-source' },
  { label: '博客', to: '/blog' },
  { label: '关于作者', to: '/about' },
]

/**
 * 首页数据看板已移除（2026-09-14）。
 *
 * 原来这里是一排「2+ 线上商用项目 / 5+ AI 项目 / 73 技术文章 / 100K+ 阅读」。
 * 那是简历口径——用数字证明「我做过很多」，而作品集应该直接给作品本身。
 * 篇数与阅读量已降级成技术写作区底部的一行小字，见 blogStats。
 */

/** 教育背景与实习经历 */
export const timeline: TimelineItem[] = [
  {
    period: '2025.09 - 至今',
    organization: '辽宁工程技术大学',
    role: '软件工程 · 本科',
    kind: 'education',
    tags: ['本科', '软件工程'],
  },
  {
    period: '2025.10 - 至今',
    organization: '大连云绘科技',
    role: '全栈开发',
    kind: 'work',
    description:
      '参与企业 B2B 门户系统与微信陪护小程序开发，负责 Spring Boot 后端、Vue3 前端及 RESTful API 开发，完成核心业务功能与前后端联调；负责项目部署及线上维护，使用 Nginx、阿里云 ECS、Git 完成生产环境配置、版本管理及迭代发布。',
    tags: ['Spring Boot', 'Vue3', 'RESTful API', 'Nginx', '阿里云 ECS'],
  },
  {
    period: '2022.09 - 2025.06',
    organization: '辽宁建筑职业学院',
    role: '大数据技术 · 大专',
    kind: 'education',
    tags: ['大专', '大数据技术'],
  },
]

/** 荣誉奖项 */
export const awards: { title: string; level: string; year?: string }[] = [
  { title: '一带一路暨金砖国家技能发展与技术创新大赛 · 大数据集群与运维', level: '国赛二等奖' },
  { title: '辽宁省第二十一届职业院校技能大赛 · 大数据应用开发', level: '省赛二等奖' },
  { title: '大数据应用开发省赛', level: '二等奖' },
  { title: '中国国际“互联网+”大学生创新创业大赛', level: '铜奖' },
  { title: '国家励志奖学金', level: '2023-2024 学年' },
]

/**
 * 对外联系方式（About 页使用）。
 * 只在提供了真实可用的地址时才展示。
 *
 * ⚠️ 邮箱那条带 `copy: true`：点了是**复制地址**，不跳 `mailto:`
 *    —— 访客机器上装没装邮件客户端不可控，点下去常常毫无反应
 *    （只剩 Chrome 控制台一行 `Launched external handler for 'mailto:...'`）。
 *    `url` 仍保留 mailto，万一哪天要退回跳转不用重新想。
 */
export const contactLinks: ContactLink[] = [
  { label: 'Email', value: profile.email, url: `mailto:${profile.email}`, copy: true },
  { label: 'GitHub', value: 'github.com/YoyuDev', url: profile.github },
  { label: 'Blog', value: 'blog.csdn.net/hahai_', url: profile.blog },
]
