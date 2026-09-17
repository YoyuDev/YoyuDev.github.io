import type { BlogCategory, BlogPost } from '@/types'

/**
 * 技术博客数据。
 *
 * 关于「代表文章」：
 * 三篇都是真实文章（作者本人的 CSDN），标题在原标题上做了轻度规范化
 * （原站点标题为了 SEO 会把报错原文整段塞进去，直接搬到卡片上会很乱）。
 * 卡片链接一律**去掉 ?spm=... 跟踪参数**，只留文章本体地址。
 */
export const blogStats = {
  articles: 73,
  views: '100K+',
  platform: 'CSDN',
  url: 'https://blog.csdn.net/hahai_',
}

/** 写作方向分类 */
export const blogCategories: BlogCategory[] = [
  {
    id: 'vue',
    name: 'Vue',
    description: '框架基础与实践',
    topics: ['Vue 基础', 'Vue 可视化'],
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    description: '后端业务系统的接口设计、持久化与部署实践。',
    topics: ['RESTful API', 'MyBatis-Plus', '参数校验', '部署与运维'],
  },
  {
    id: 'ai-agent',
    name: 'AI Agent',
    description: 'Agent 架构、多智能体协作与工作流编排。',
    topics: ['Multi-Agent', 'Agent Workflow', 'LangChain4j', 'LangGraph'],
  },
  {
    id: 'rag',
    name: 'RAG',
    description: '检索增强生成与向量数据库落地经验。',
    topics: ['向量检索', 'Qdrant', '知识库构建', '召回优化'],
  },
  {
    id: 'llm',
    name: 'LLM',
    description: '大模型应用工程：提示词、结构化输出与工具调用。',
    topics: ['Prompt Engineering', 'Structured Output', 'Function Calling', '上下文管理'],
  },
  {
    id: 'engineering',
    name: '工程实践',
    description: '从需求到上线的完整交付链路与项目复盘。',
    topics: ['需求分析', '数据库设计', 'Nginx', '阿里云 ECS'],
  },
]

/**
 * 代表文章。
 *
 * 挑这三篇的理由：都不是「某 API 怎么用」的用法记录，而是**遇到具体问题 → 排查 → 解决**，
 * 和作品集要展示的东西一致。
 *
 * placeholder: true 的条目在页面上会显示为「待补充」状态，不会生成假链接。
 * 补充真实文章：把 title / url 换成真实内容并删掉 placeholder 字段。
 */
export const featuredPosts: BlogPost[] = [
  {
    id: 'langchain4j-observability-phoenix',
    title: 'LangChain4j + 可观测性：第三方集成 Arize Phoenix',
    url: 'https://blog.csdn.net/hahai_/article/details/160131497',
    category: 'AI Agent',
    date: '2026-04-14',
    summary:
      '大模型应用「能跑」不难，难的是能查。用 OpenTelemetry + Arize Phoenix 把 Prompt、RAG 召回和 Token 消耗摊开看，才能定位幻觉出在哪一环。',
  },
  {
    id: 'spark3-java17-incompatible',
    title: 'Spark 3 与 Java 17 不兼容导致的 IllegalAccessError 解决方法',
    url: 'https://blog.csdn.net/hahai_/article/details/155467991',
    category: '工程实践',
    date: '2025-12-01',
    summary:
      'Java 17 的模块系统不再默认导出 sun.nio.ch，Spark 3 存算一体的老代码直接起不来。整理了一套 --add-opens 参数，附报错原文方便搜索。',
  },
  {
    id: 'idea-git-ssh-permission-denied',
    title: 'IDEA 上传 Git 报错 git@ssh.github.com: Permission denied (publickey)',
    url: 'https://blog.csdn.net/hahai_/article/details/154871624',
    category: '工程实践',
    date: '2025-11-15',
    summary:
      '22 端口被墙后 Git 走 443，SSH 认不出默认密钥。通过 ~/.ssh/config 显式指定 Host 与 IdentityFile 解决。',
  },
]

/** 写作主张（Blog 页头部展示） */
export const writingPoints = [
  { title: '持续技术输出', detail: '累计发布 73 篇技术文章，保持稳定的写作节奏。' },
  { title: '工程实践总结', detail: '内容来自真实项目：从需求分析、开发到部署上线的完整链路复盘。' },
]
