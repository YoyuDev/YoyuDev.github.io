/**
 * 全站类型定义。
 *
 * 约定：
 * - 所有页面展示内容都来自 src/data/，组件只负责渲染，不硬编码业务文案。
 * - 没有真实链接的位置统一使用 TODO_* 占位符（见 src/data/placeholders.ts），
 *   不允许伪造 URL。UI 层会自动把 TODO_* 渲染成「待补充」状态而不是可点击链接。
 */

/* ------------------------------------------------------------------ */
/* 链接                                                                */
/* ------------------------------------------------------------------ */

export type LinkKind = 'github' | 'demo' | 'npm' | 'blog' | 'article' | 'external'

export interface ExternalLink {
  /** 按钮文案 */
  label: string
  /** 真实 URL；未提供时填 TODO_* 占位符 */
  url: string
  kind: LinkKind
  /** 补充说明，例如「商业项目｜源码不公开」 */
  note?: string
}

/* ------------------------------------------------------------------ */
/* 技能                                                                */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  id: string
  title: string
  summary: string
  items: string[]
}

/* ------------------------------------------------------------------ */
/* 项目                                                                */
/* ------------------------------------------------------------------ */

/**
 * 项目类型。
 *
 * `personal` 用于自学实践 / 技术验证类项目：既不是交付给客户的商业项目，
 * 也不是参赛作品，硬塞进另外两类会让「线上商用项目」这个标签失去意义。
 */
export type ProjectType = 'commercial' | 'ai-agent' | 'competition' | 'personal'

/** 架构流程图上的一个节点 */
export interface FlowNode {
  id: string
  label: string
  /** 节点副标题，例如 "LLM + Qdrant" */
  detail?: string
  /** 视觉类型：输入 / 智能体 / 数据 / 输出 */
  kind: 'input' | 'agent' | 'data' | 'output'
}

/** 架构分组：一张架构图可能有多条并行链路 */
export interface ArchitectureGroup {
  title: string
  caption?: string
  nodes: FlowNode[]
}

export interface FeatureItem {
  title: string
  description: string
}

/* ------------------------------------------------------------------ */
/* 作品集：封面与决策                                                   */
/* ------------------------------------------------------------------ */

/**
 * 作品封面 / 截图。
 *
 * 作品集靠「能看见的东西」立住，所以每个项目至少一张封面。
 * src 为空时 UI 会渲染成带尺寸标注的占位框，而不是留白或假图。
 * 有图后把图片放到 public/shots/ 下，src 写 '/shots/xxx.png' 即可。
 */
export interface Shot {
  /** 图片地址；未提供时渲染占位框 */
  src?: string
  /** 图注，同时也是占位框上的提示文案 */
  caption: string
  /**
   * 画面比例，默认 16/9。21/9 用于首屏流动卡片这类偏扁的封面位；
   * 9/16 给手机截图（邮件、App 界面）这类竖图，否则会被裁得只剩中间一条。
   */
  ratio?: '16/9' | '21/9' | '4/3' | '3/2' | '1/1' | '9/16'
}

/**
 * 技术难点与决策 —— case study 的核心。
 *
 * 作品集和简历的分水岭就在这一段：简历写「做了什么」，
 * 这里写「卡在哪、怎么想的、为什么选这条、代价是什么」。
 *
 * ⚠️ 只写真实发生过的事。没想清楚的宁可不写，也不要编。
 */
export interface Decision {
  /** 卡住的问题 / 约束条件 */
  problem: string
  /** 实际怎么处理的 */
  approach: string
  /** 这么做的代价 / 放弃了什么（可选，但写了最加分） */
  tradeoff?: string
  /** 结果或怎么验证有效（可选） */
  result?: string
}

export interface Project {
  /** 路由 slug，对应 /projects/:slug */
  slug: string
  /** 项目名称 */
  name: string
  /**
   * 短名，用于空间紧张的地方（首页左侧的作品目录 —— 就是作品介绍里那一列可点的项目名）。
   * 不填就退回 name —— 「多智能体协同个性化教育资源生成平台」这种全长名字
   * 塞进那一列会把整排排版撑歪。
   */
  shortName?: string
  /** 副标题 */
  subtitle: string
  /** 卡片上的一句话描述 */
  tagline: string
  type: ProjectType
  /** 项目类型的中文标签 */
  typeLabel: string
  /** 项目时间 */
  period: string
  /** 我的角色 */
  role: string
  /** 状态徽标，例如「已上线」「开源」 */
  status?: string
  /** 卡片上的重点标签 */
  highlights: string[]
  /** 项目简介 */
  summary: string
  /** 技术栈 */
  techStack: string[]
  /** 作品封面 / 截图 —— 作品集的视觉证据，建议每个项目 1-3 张 */
  shots?: Shot[]
  /** 技术难点与决策 —— case study 的正文核心 */
  decisions?: Decision[]
  /** 核心功能 / 核心能力 */
  features: FeatureItem[]
  /** 系统架构 */
  architecture: ArchitectureGroup[]
  /** 架构图说明 */
  architectureNote?: string
  /** 核心技术实现 */
  implementations: FeatureItem[]
  /** 项目成果 */
  outcomes: string[]
  /** GitHub / Demo / NPM 等链接 */
  links: ExternalLink[]
  /** 源码可见性说明，例如「商业项目｜源码不公开」 */
  sourceNote?: string
  /** 是否在首页重点展示 */
  featured?: boolean
  /** 首页 Currently Building 展示 */
  building?: boolean
}

/* ------------------------------------------------------------------ */
/* 开源项目                                                            */
/* ------------------------------------------------------------------ */

export interface OpenSourceItem {
  id: string
  /** 名称，含 emoji 前缀（如 dsh-ping 🔔）时可拆开写 */
  name: string
  emoji?: string
  subtitle: string
  description: string
  role: string
  /** 归属生态，例如 DeepSeek Harness */
  ecosystem?: string
  tags: string[]
  /**
   * 界面截图。有图才渲染，没图就不占位——
   * 开源页是列表结构，一个空占位框比什么都不放更碍眼。
   */
  shots?: Shot[]
  /** 支持的事件 / 特性 */
  events?: { name: string; description: string }[]
  /** 流程可视化，可复用项目的 FlowNode */
  flow?: FlowNode[]
  links: ExternalLink[]
  /** 是否重点展示 */
  featured?: boolean
}

/* ------------------------------------------------------------------ */
/* 博客                                                                */
/* ------------------------------------------------------------------ */

export interface BlogCategory {
  id: string
  name: string
  description: string
  /** 该分类下的关键词 */
  topics: string[]
}

export interface BlogPost {
  id: string
  title: string
  /** 文章链接；未提供时用 TODO_ARTICLE_URL 占位 */
  url: string
  category: string
  date?: string
  /** 一句话说明这篇解决了什么问题——卡片上直接展示，方便读者判断要不要点 */
  summary?: string
  /** 是否只是占位，等待替换成真实文章 */
  placeholder?: boolean
}

/* ------------------------------------------------------------------ */
/* 导航 / 个人资料                                                     */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string
  to: string
  /** 是否为外部链接 */
  external?: boolean
}

/**
 * 对外联系方式（About 页的联系方式列表）。
 *
 * ⚠️ `copy` 是给邮箱用的：邮箱点了是**复制地址**而不是跳 `mailto:`
 *    （访客机器上装没装邮件客户端不可控，点了常常毫无反应）。
 *    组件按它决定渲染成 `<button>` 还是 `<a>`——这是个「行为」字段，不只是样式开关。
 */
export interface ContactLink {
  label: string
  /** 展示文本（邮箱就是地址本身） */
  value: string
  url: string
  /** 点击复制 `value`，而不是跳转 `url` */
  copy?: boolean
}

export interface TimelineItem {
  /** 时间区间 */
  period: string
  /** 机构 / 公司 / 学校 */
  organization: string
  /** 角色或专业 */
  role: string
  /** 补充说明 */
  description?: string
  /** 标签 */
  tags?: string[]
  kind: 'education' | 'work'
}

/**
 * 首页作品介绍里的一个项目条目。
 *
 * ⚠️ 这里**只写 slug**，项目名由 HeroSection 从 projects.ts 派生（`shortName` 优先，退回 `name`）。
 * 名称抄一份到这里，改项目名时就会漏改，首页和列表页会冒出两个叫法。
 */
export interface WorkItem {
  /** projects.ts 里的 slug */
  slug: string
  /** 这个项目做了什么。一句话说完，控制在 30 个全角字内，超了会在左栏折行 */
  intro: string
}

/**
 * 首页作品介绍里的一个方向：方向名 + 该方向下的项目。
 *
 * 做成分组而不是一段话，是因为「方向 → 有哪些项目」扫一眼就完；
 * HeroSection 用一条左侧竖线把它们箍成整体，与上面的副标题分开。
 */
export interface WorkGroup {
  /** 方向名。口径跟 /projects 的筛选标签保持一致，免得同一站出现两套叫法 */
  label: string
  items: WorkItem[]
}

export interface Profile {
  /** 站点品牌名（导航栏左上角） */
  brand: string
  /**
   * 头像图片地址（导航栏 / 页脚 / About 页共用）。
   * 图片本体放 public/ 下，地址已带上 BASE_URL，兼容 GitHub Pages 的子路径部署。
   */
  avatar: string
  /** 真实姓名 */
  name: string
  /** 一句话身份 */
  headline: string
  /** 英文身份 */
  headlineEn: string
  /** Hero 主标题 */
  title: string
  /** Hero 副标题 */
  subtitle: string
  /**
   * Hero 里的作品介绍：按方向分组，**每个项目一条**，各带一句介绍。
   *
   * 和 subtitle 分工不同——subtitle 是一句导航（下面是些什么、点得进去看），
   * 这里交代全貌，让访客不必先点开项目就知道每个作品是什么。
   * ⚠️ 首页讲的是**作品**不是「我」：自我介绍、技术栈清单、求职意向都归 About 页，别往这里放。
   * ⚠️ 项目名不在这里写，只写 slug，名字由组件从 projects.ts 取，见 `WorkItem`。
   */
  workGroups: WorkGroup[]
  /** 所在地 */
  location: string
  /** 邮箱 */
  email: string
  /** 求职意向 */
  jobTarget: string
  github: string
  blog: string
}
