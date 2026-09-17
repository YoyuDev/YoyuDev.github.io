import type { Project } from '@/types'
import { asset } from '@/utils/asset'

/**
 * 全部项目数据。
 *
 * 新增项目：直接往数组里加一条即可，列表页 / 详情页 / 首页都会自动带上，
 * 不需要改任何组件。slug 就是路由地址，例如 slug: 'my-app' -> /projects/my-app
 *
 * 链接规则：
 * - 有真实地址就直接写 URL
 * - 没有就填 PLACEHOLDERS.* ，UI 会自动渲染成「待补充」而不是假链接
 */
export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  /* 01 北芪陪护小程序                                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: 'beiqi-care',
    name: '北芪陪护小程序',
    shortName: '北芪陪护',
    subtitle: '微信陪护服务预约平台',
    tagline: '从需求分析到上线运营的完整商用交付，独立负责全流程。',
    type: 'commercial',
    typeLabel: '线上商用项目',
    period: '2026.03 - 2026.04',
    role: '全栈开发工程师',
    status: '已上线',
    highlights: ['独立完成', '商用版本交付', '已上线'],
    summary:
      '陪护服务的预约、支付、订单是三条互相咬合的链路：用户在小程序下单，运营在后台处理，资金与订单状态必须始终对得上。这个项目要做的是把这三段做成一条能真实上线运营的业务线——从需求分析、数据库设计，一直做到部署上线。',
    techStack: ['UniApp', 'Vue', 'Spring Boot', 'MySQL', 'Nginx', '阿里云 ECS', 'Git'],
    shots: [
      { caption: '小程序端 · 服务浏览与在线预约' },
      { caption: '管理后台 · 订单处理与运营' },
    ],
    decisions: [
      {
        problem: '「支付成功但订单状态未更新」——微信支付回调与订单状态流转之间容易出现不一致。',
        approach:
          '把支付回调收敛到统一入口处理，在回调里集中完成订单状态流转，不让状态更新逻辑散落在多个业务分支里。',
      },
      {
        problem:
          '小程序端和管理后台是两套前端，但业务数据同源，分开处理容易出数据不一致。',
        approach: '两端共用同一套 Spring Boot 服务，由 Nginx 统一做反向代理与请求分发。',
      },
      {
        problem:
          '业务围绕用户、陪护服务、预约、订单四类实体，接口和数据模型一开始没理清，后期改起来代价很大。',
        approach: '先把这四类核心实体和数据模型定下来，再基于它们设计 RESTful API 与业务模块。',
      },
    ],
    features: [
      {
        title: 'RESTful API 服务',
        description:
          '基于 Spring Boot 构建 RESTful API，实现用户、陪护服务、预约及订单等核心业务模块。',
      },
      {
        title: '微信支付 / 退款流程',
        description:
          '集成微信支付与退款流程，完成支付回调及订单状态处理，保证资金链路与订单状态一致。',
      },
      {
        title: '微信小程序端',
        description:
          '使用 UniApp + Vue 完成微信小程序开发，实现服务展示、在线预约、订单查询、个人中心等核心功能。',
      },
      {
        title: '管理后台',
        description: '配套管理后台，支撑服务内容维护与订单处理等日常运营操作。',
      },
      {
        title: '生产环境部署',
        description:
          '基于阿里云 ECS + Nginx 完成生产环境部署及反向代理配置，使用 Git 进行版本管理与线上维护。',
      },
    ],
    architecture: [
      {
        title: '整体链路',
        caption: '客户端到数据层的完整请求链路',
        nodes: [
          { id: 'user', label: '用户', kind: 'input' },
          { id: 'miniapp', label: '微信小程序端', detail: 'UniApp + Vue', kind: 'agent' },
          { id: 'admin', label: '管理后台', detail: 'Vue', kind: 'agent' },
          { id: 'nginx', label: 'Nginx', detail: '反向代理', kind: 'data' },
          { id: 'api', label: 'Spring Boot', detail: 'RESTful API', kind: 'agent' },
          { id: 'db', label: 'MySQL', detail: '业务数据', kind: 'data' },
        ],
      },
      {
        title: '支付链路',
        caption: '支付回调与订单状态处理',
        nodes: [
          { id: 'order', label: '提交订单', kind: 'input' },
          { id: 'pay', label: '微信支付', kind: 'agent' },
          { id: 'callback', label: '支付回调', detail: '签名校验', kind: 'data' },
          { id: 'status', label: '订单状态更新', kind: 'output' },
        ],
      },
    ],
    architectureNote:
      '小程序端与管理后台共用同一套 Spring Boot 服务，由 Nginx 统一做反向代理与请求分发。',
    implementations: [
      {
        title: '独立完成全流程交付',
        description:
          '独立完成需求分析、技术选型、数据库设计、前后端开发及部署上线，完成商用版本交付。',
      },
      {
        title: 'Spring Boot 业务建模',
        description:
          '围绕用户、陪护服务、预约、订单四类核心实体设计接口与数据模型，构建 RESTful API。',
      },
      {
        title: '支付回调与状态一致性',
        description: '处理微信支付回调逻辑与订单状态流转，避免出现支付成功但订单状态未更新的情况。',
      },
      {
        title: '部署与线上维护',
        description:
          '使用阿里云 ECS + Nginx 完成生产环境部署、反向代理配置，配合 Git 做版本管理与迭代发布。',
      },
    ],
    outcomes: [
      '项目已上线并稳定运行，完成商用版本交付',
      '独立负责需求分析、技术选型、数据库设计、前后端开发及部署上线全流程',
      '沉淀了从开发到生产环境部署、线上维护的完整工程经验',
    ],
    links: [],
    sourceNote: '商业项目｜源码不公开',
  },

  /* ---------------------------------------------------------------- */
  /* 02 对外贸易公司门户网站                                            */
  /* ---------------------------------------------------------------- */
  {
    slug: 'foreign-trade-portal',
    name: '对外贸易公司门户网站',
    shortName: '外贸门户网站',
    subtitle: '企业门户与后台管理系统',
    tagline: 'Spring Boot + Vue3 的企业级门户，独立负责完整交付与线上维护。',
    type: 'commercial',
    typeLabel: '线上商用项目',
    period: '2026.05 - 2026.06',
    role: '全栈开发工程师',
    status: '已上线',
    highlights: ['独立完成', '完整交付', '线上部署'],
    summary:
      '企业门户看着是「对外展示 + 对内管理」两件事，真正的难点在于两套前端要共用同一套数据和权限模型，同时让运营能自己改内容、不用每次都找开发。项目从需求分析、技术选型一直做到部署上线。',
    techStack: [
      'Spring Boot',
      'MyBatis-Plus',
      'Vue3',
      'Element Plus',
      'MySQL',
      'Nginx',
      '阿里云 ECS',
      'Git',
    ],
    shots: [
      { caption: '门户首页 · 商品展示' },
      { caption: '管理后台 · 商品与订单管理' },
    ],
    decisions: [
      {
        problem: '用户端和管理后台的访问范围不同，只做「登录 / 未登录」两态不够用。',
        approach: '在登录态校验之外补一层基于角色的权限控制，区分普通用户与管理端功能。',
      },
      {
        problem: '后台是大量标准增删改查，手写 SQL 和样板代码会吃掉大部分开发时间。',
        approach: '数据访问层用 MyBatis-Plus，把通用 CRUD 交给框架，自己只写业务特有的查询。',
      },
      {
        problem: '用户端和管理后台是两个前端工程，接口不统一会导致联调反复返工。',
        approach: '两端走同一套后端服务与接口约定，前后端并行开发后再集中联调。',
      },
    ],
    features: [
      {
        title: '商品管理',
        description: '商品信息的增删改查与上下架管理，支撑门户对外展示。',
      },
      {
        title: '订单处理',
        description: '订单创建、状态流转与查询，覆盖业务侧日常处理流程。',
      },
      {
        title: '用户认证',
        description: '登录鉴权与身份校验，区分普通用户与管理端访问权限。',
      },
      {
        title: '权限控制',
        description: '基于角色控制后台功能与数据访问范围。',
      },
      {
        title: 'Vue3 用户端 + Element Plus 管理后台',
        description:
          '使用 Vue3 搭建用户端页面，Element Plus 构建管理后台，完成核心页面、业务交互及前后端接口联调。',
      },
      {
        title: '部署与线上维护',
        description:
          '基于阿里云 ECS + Nginx 完成生产环境部署及反向代理配置，并负责后续线上维护。',
      },
    ],
    architecture: [
      {
        title: '整体链路',
        caption: '用户端 / 管理后台共用一个后端服务',
        nodes: [
          { id: 'visitor', label: '访问用户', kind: 'input' },
          { id: 'portal', label: '用户端', detail: 'Vue3', kind: 'agent' },
          { id: 'console', label: '管理后台', detail: 'Element Plus', kind: 'agent' },
          { id: 'nginx', label: 'Nginx', detail: '反向代理', kind: 'data' },
          { id: 'api', label: 'Spring Boot', detail: 'MyBatis-Plus', kind: 'agent' },
          { id: 'db', label: 'MySQL', detail: '业务数据', kind: 'data' },
        ],
      },
      {
        title: '认证与权限',
        caption: '登录态与角色权限校验',
        nodes: [
          { id: 'login', label: '登录', kind: 'input' },
          { id: 'auth', label: '用户认证', detail: '登录态校验', kind: 'agent' },
          { id: 'role', label: '权限控制', detail: '角色权限', kind: 'data' },
          { id: 'access', label: '接口访问', kind: 'output' },
        ],
      },
    ],
    architectureNote:
      '用户端与管理后台通过统一入口访问后端服务，由认证与权限模块控制接口可用范围。',
    implementations: [
      {
        title: '独立完成项目交付',
        description: '独立完成需求分析、技术选型、前后端开发及部署上线，负责项目完整交付。',
      },
      {
        title: 'RESTful API 与数据访问',
        description:
          '基于 Spring Boot + MyBatis-Plus 开发 RESTful API，实现商品管理、订单处理、用户认证及权限控制等核心业务。',
      },
      {
        title: '前后端联调',
        description:
          '使用 Vue3 + Element Plus 开发用户端及管理后台，完成核心页面、业务交互及前后端接口联调。',
      },
      {
        title: '生产环境与线上维护',
        description: '基于阿里云 ECS + Nginx 完成部署与反向代理配置，并负责后续线上维护。',
      },
    ],
    outcomes: [
      '项目已上线，完成完整交付',
      '独立承担需求分析 → 技术选型 → 开发 → 部署上线全链路',
      '建立了企业门户类项目的可复用后端骨架与部署方案',
    ],
    links: [],
    sourceNote: '商业项目｜源码不公开',
  },

  /* ---------------------------------------------------------------- */
  /* 03 PianoAgent                                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'piano-agent',
    name: 'PianoAgent',
    subtitle: '基于 Multi-Agent 的 AI 音乐创作系统',
    tagline: '用自然语言创作完整的钢琴曲——LLM 负责规划，乐理引擎负责执行。',
    type: 'ai-agent',
    typeLabel: 'AI Agent 项目',
    period: '2026.08 - 至今',
    role: '独立开发者 & 维护者',
    status: '开源 · 已发布 npm 包',
    featured: true,
    building: true,
    highlights: ['Multi-Agent', 'RAG', '乐理引擎', '开源'],
    summary:
      '用一句话描述想要的感觉，就能得到一首完整的钢琴曲。难点在两头：模型对音乐理论这类专业知识并不可靠，输出的格式又不稳定。核心取舍是「LLM 不直接生成 MIDI」——它只负责理解与规划，音符交给乐理引擎执行；同时用 RAG 把 15 篇音乐理论文档喂进上下文，补上专业领域的短板。',
    techStack: [
      'Multi-Agent',
      'Agent Pipeline',
      'LLM',
      'RAG',
      'Qdrant',
      'Structured Output',
      'Web Audio',
      'MIDI',
    ],
    shots: [
      {
        src: asset('shots/piano-agent-compose.jpg'),
        caption: '输入「晴天、开心」生成《晴天》旋律 · 左侧钢琴卷帘与演奏进度，右侧 AI 对话与创作草稿',
      },
    ],
    decisions: [
      {
        problem: 'LLM 输出格式不稳定，直接让它生成 MIDI 事件序列经常解析失败。',
        approach:
          '用 Structured Output 约束模型，让它产出标准化的 MIDI Event 结构，而不是自由文本再靠事后解析。',
        result: '生成结果可以直接进入下游处理，不再依赖对自由文本做容错解析。',
      },
      {
        problem: 'LLM 生成带有随机性，单次生成的质量并不稳定。',
        approach:
          '引入多轮 Agent 评审机制：生成 → 评审 → 修正，结果经过检查环节之后才输出。',
        result: '不稳定的结果在评审环节被挡住，不直接暴露给用户。',
      },
      {
        problem: '模型对音乐理论、曲风、和弦这类专业领域知识并不可靠，容易生成「听起来不对劲」的内容。',
        approach: '基于 RAG + Qdrant 构建音乐知识库，在生成之前先做知识检索，给模型补领域知识。',
      },
      {
        problem: '一个 Agent 很难同时把知识检索、作曲规划、音符生成、演奏优化、质量评价都做好。',
        approach:
          '拆成 KnowledgeAgent、ComposerAgent、GeneratorAgent、PerformanceAgent、CriticAgent 五个 Agent 分工协作，同时把检索层与生成层解耦，模型或知识库可以单独替换。',
        tradeoff:
          '链路变长，调用成本与调试复杂度都上去了，所以各环节之间必须靠结构化输出锁死数据契约。',
      },
    ],
    features: [
      {
        title: '三种工作模式',
        description:
          '常规（闲聊 + 演奏已有乐谱）、创造（AI 生成带 intro / theme / climax / ending 结构的完整曲目）、协同（AI 创作 + 可编辑草稿）。',
      },
      {
        title: '音乐知识检索',
        description:
          '基于 RAG + Qdrant 构建 Music Wiki 知识库（15 篇音乐理论文档），为作曲、和声、演奏、风格提供知识增强。',
      },
      {
        title: '交互式钢琴键盘',
        description:
          '三层音频引擎（d-piano 真实采样 → SoundFont2 → 振荡器兜底），支持电脑键盘弹奏与延音踏板。',
      },
      {
        title: '协同草稿编辑',
        description:
          '文本格式音符编辑（@0ms: C4(800ms)），可录制弹奏、回放、导出 MIDI 文件，也能上传已有乐谱分析演奏。',
      },
      {
        title: '五线谱实时渲染',
        description: 'Canvas 实时渲染五线谱，演奏中的音符同步高亮。',
      },
      {
        title: '语音交互',
        description: 'Web Speech API 语音输入 + TTS 播报，不用打字也能点歌。',
      },
    ],
    architecture: [
      {
        title: '创作主链路',
        caption: '五个 Agent 串成的 Pipeline，从用户输入到钢琴曲渲染',
        nodes: [
          { id: 'user', label: 'User', detail: '自然语言需求', kind: 'input' },
          { id: 'knowledge', label: 'KnowledgeAgent', detail: 'LLM Wiki RAG · Qdrant 检索', kind: 'agent' },
          { id: 'composer', label: 'ComposerAgent', detail: 'LLM 规划 · MusicPlan', kind: 'agent' },
          { id: 'generator', label: 'GeneratorAgent', detail: '乐理引擎逐段生成音符', kind: 'agent' },
          { id: 'performance', label: 'PerformanceAgent', detail: 'velocity / timing 人性化', kind: 'agent' },
          { id: 'critic', label: 'CriticAgent', detail: 'LLM 评分 0-100', kind: 'agent' },
          { id: 'final', label: '钢琴曲渲染', detail: '三层音频引擎播放', kind: 'output' },
        ],
      },
    ],
    architectureNote:
      '核心取舍是「LLM 不直接生成 MIDI」：LLM 只负责理解与规划，音符由乐理引擎执行，避免模型在专业领域瞎猜。CriticAgent 评分低于阈值会把结果退回重新规划。每个 Agent 都能单独替换模型或知识库。',
    implementations: [
      {
        title: 'Multi-Agent 协作',
        description:
          '设计 5-Agent Pipeline，把知识检索、作曲规划、音符生成、演奏优化、质量评价拆成独立智能体，实现复杂音乐创作任务的拆解与协同执行。',
      },
      {
        title: 'RAG 音乐知识增强',
        description:
          '基于 LLM + RAG + Qdrant 构建音乐知识库，为音乐理论、曲风、和弦等内容提供知识增强，降低模型在专业领域的事实性问题。',
      },
      {
        title: 'Structured Output 约束输出',
        description:
          '采用结构化输出约束模型生成标准化 MIDI 事件序列，降低 LLM 输出格式不稳定导致的解析失败问题。',
      },
      {
        title: 'Multi-round Review 机制',
        description:
          '针对 LLM 生成结果的随机性，引入多轮 Agent 评审机制，通过「生成 → 评审 → 修正」的循环提升输出稳定性。',
      },
    ],
    outcomes: [
      '完成从用户 Prompt 到钢琴曲渲染的完整 AI 创作闭环',
      '已开源并发布 npm 包（piano-agent-ai），可 npm install -g 一键安装',
      '首发周 npm 下载量 164 次，累计 344 次',
      'Music Wiki 知识库 15 篇文档 + Qdrant 向量检索，支持 RAG 知识增强',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/YoyuDev/PianoAgent', kind: 'github' },
      { label: 'NPM', url: 'https://www.npmjs.com/package/piano-agent-ai', kind: 'npm' },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 04 SoulAgent                                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: 'soul-agent',
    name: 'SoulAgent',
    subtitle: '长期记忆型 AI 角色系统',
    tagline: '让 AI 角色真正记住你——人格建模 + 长期记忆 + 向量检索。',
    type: 'ai-agent',
    typeLabel: 'AI Agent 项目',
    period: '2026.05 - 2026.06',
    role: '独立开发者 & 维护者',
    status: '开源',
    featured: true,
    highlights: ['长期记忆', '向量检索', 'LangChain4j', '开源'],
    summary:
      '大多数 AI 角色聊几轮就开始「失忆」——每轮独立生成，人设和之前说过的话都留不住。这个项目要解决的是让角色真的记住人、记住事：导入聊天记录做人格建模，配合长期记忆与向量检索，让它在多轮交互之间保持一致。',
    techStack: ['LangChain4j', 'LLM', 'Vector Database', 'RAG', 'Agent'],
    // shots[0] 是首屏大封面（也用于首页流卡 / 列表卡 / 开源页）；
    // 选「聊天」而不是「创建人物」，是因为那张弹窗遮住了半屏对话，
    // 放大了像是「正在操作中」，不如完整界面能一眼看出这是个什么产品。
    shots: [
      {
        src: asset('shots/soul-agent-chat.png'),
        caption: '角色对话 · 左侧角色列表，右侧与人设标签的角色多轮对话，底部为输入区',
      },
      {
        src: asset('shots/soul-agent-create.png'),
        caption:
          '创建人物 · 填写名字与性格描述、可选头像，并支持导入聊天记录 txt 做人格建模（随机事件可开关）',
      },
    ],
    decisions: [
      {
        problem: '多轮对话里角色会「失忆」、人设漂移——每轮独立生成，前后对不上。',
        approach:
          '做长期记忆机制：把历史交互结构化存储，让角色状态持续演化，而不是每轮从零开始生成。',
      },
      {
        problem: '上下文窗口有限，不可能把所有历史记录都塞进 prompt。',
        approach:
          '用向量检索按当前对话动态召回相关记忆，再连同人格设定与近期对话一起交给 LLM 生成回复。',
        tradeoff: '召回质量直接决定回复质量，检索层成了新的瓶颈点。',
      },
      {
        problem: '人格、记忆、检索、生成如果耦合在一起，想换向量库或换模型就得大改。',
        approach: '按职责拆成独立模块，人格设定、记忆读写、向量检索、对话生成各自分离。',
        result: '替换向量库或模型时只需要动对应模块。',
      },
    ],
    features: [
      {
        title: 'AI Persona 人格建模',
        description: '通过导入聊天记录构建角色人格，支持自定义角色设定。',
      },
      {
        title: 'Long-term Memory 长期记忆',
        description: '将历史交互信息结构化存储，实现角色状态持续演化。',
      },
      {
        title: 'Vector Retrieval 向量检索',
        description: '结合向量数据库进行语义检索，根据当前对话动态召回相关历史记忆。',
      },
      {
        title: 'Multi-turn Conversation 多轮对话',
        description: '提升多轮对话一致性，避免角色「失忆」或人设漂移。',
      },
      {
        title: 'Context Management 上下文管理',
        description: '在有限上下文窗口内组织人格设定、近期对话与召回记忆。',
      },
    ],
    architecture: [
      {
        title: '对话与记忆链路',
        caption: '每一轮对话都会经过记忆管理与向量召回',
        nodes: [
          { id: 'user', label: 'User', detail: '用户输入', kind: 'input' },
          { id: 'conv', label: 'Conversation', detail: '多轮对话', kind: 'agent' },
          { id: 'memory', label: 'Memory Manager', detail: '记忆写入 / 读取', kind: 'agent' },
          { id: 'vector', label: 'Vector Retrieval', detail: '向量数据库', kind: 'data' },
          { id: 'relevant', label: 'Relevant Memories', detail: '相关记忆召回', kind: 'data' },
          { id: 'llm', label: 'LLM', detail: '人格 + 上下文', kind: 'agent' },
          { id: 'response', label: 'Response', detail: '角色回复', kind: 'output' },
        ],
      },
    ],
    architectureNote:
      '记忆管理与对话生成解耦：对话结束后写入记忆，下一轮对话开始时召回记忆再交给 LLM 生成回复。',
    implementations: [
      {
        title: 'LangChain4j Agent 应用框架',
        description:
          '基于 LangChain4j 搭建 Agent 应用框架，实现角色规划、对话生成及记忆管理等核心能力。',
      },
      {
        title: '长期记忆机制',
        description:
          '设计长期记忆机制，将历史交互信息结构化存储，实现角色状态持续演化，而不是每轮对话独立生成。',
      },
      {
        title: '向量语义检索',
        description:
          '结合向量数据库进行语义检索，根据当前对话动态召回相关历史记忆，提高多轮对话一致性。',
      },
      {
        title: '模块化 Agent 架构',
        description: '人格、记忆、检索、生成各模块职责分离，便于替换向量库或模型。',
      },
    ],
    outcomes: [
      '实现 AI 角色人格动态变化，支持自定义角色、长期记忆及多轮上下文对话',
      '完成项目开源部署，并提供接口文档与使用示例',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/YoyuDev/SoulAgent', kind: 'github' },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 05 dsh-ping                                                       */
  /* ---------------------------------------------------------------- */
  {
    slug: 'dsh-ping',
    name: 'dsh-ping',
    subtitle: 'DeepSeek Harness 提醒插件',
    tagline: '让 Agent 需要你的时候叫一声，而不是让你一直盯着屏幕等。',
    type: 'ai-agent',
    typeLabel: '开源工具 · Agent 插件',
    period: '2026.08 - 至今',
    role: '插件开发者 · 开源维护',
    status: '开源 · 已发布 npm',
    featured: true,
    highlights: ['开源', 'Agent 插件', '双端声音播放', 'TypeScript'],
    summary:
      '跑长任务时人不可能一直盯着终端，但 Agent 卡在「等你确认」这一步时又必须有人回来——一边是注意力空转，一边是响应延迟。这个插件监听 Agent 的会话事件流，只在真正需要人的几个节点上给声音和桌面通知，把「等」这件事从人身上卸下来。',
    techStack: [
      'TypeScript',
      'Cordis 插件',
      'SSE',
      'EventSource',
      'HTML5 Audio',
      'node-notifier',
      'npm',
    ],
    shots: [
      {
        src: asset('shots/dsh-ping-settings.png'),
        caption: '设置面板 · 全局音量、免打扰时段、邮件 / Webhook 多通道通知与语音播报，各项可独立开关',
      },
    ],
    decisions: [
      {
        problem:
          '声音该由谁来播：浏览器标签页在后台时音频会被限制，而 headless 运行时干脆没有浏览器。',
        approach:
          '按运行环境分流。浏览器在线（含后台标签页）时由 host 通过 SSE 推送提醒帧，浏览器用 HTML5 Audio 播放当前铃声；headless 或浏览器已关闭时退回 host，用系统播放器兜底。桌面通知则始终由 host 发出，不依赖浏览器在不在。',
        tradeoff:
          '同一件事要维护两套播放路径，而且能力不对等——浏览器能播任意格式，host 兜底只支持 WAV。',
      },
      {
        problem:
          '底层事件流比「需要提醒的时刻」密得多：一个 turn 结束前会先发 step/end，approval 之后跟着的 blocked 结束也会再触发一次，照直映射就会连响两三声。',
        approach:
          '在映射层做归并：step/end 延迟 300ms 再提醒，如果 turn 紧接着结束就交给 turn 级提醒接管；同一个 turn 里已经因为 approval 提醒过，blocked 结束就不再重复。',
        result: '五类事件各响一次，一轮里有多个阶段也不会连着轰炸。',
      },
      {
        problem: '系统提示音要跨平台，为此引一个音频库等于给插件白白加重依赖。',
        approach:
          '播放直接调各平台自带的命令行播放器（Windows PowerShell SoundPlayer、macOS afplay、Linux paplay），依赖列表里只留一个 node-notifier。',
      },
    ],
    features: [
      {
        title: '五类事件提醒',
        description:
          'stage（阶段完成，轻微短音）、approval（请求批准，明显双音）、input（等待输入，三连音）、complete（完成，上行琶音）、error（出错，下行低沉音），各有各的提示音。',
      },
      {
        title: '免打扰模式',
        description:
          '支持定时静音时段和临时静音（按分钟），并可为「确认提醒 / 错误提醒」单独开例外——静音期间这两类仍然穿得过去。',
      },
      {
        title: '多通道通知',
        description: '桌面通知之外，还支持邮件通知与 Webhook 通知，适合离开电脑时把提醒转到手机上。',
      },
      {
        title: '自定义铃声与语音播报',
        description:
          '每类提醒可上传自己的铃声（wav / mp3 / ogg / flac / m4a / webm），可试听、可恢复默认；也可配置语音播报的内容与音色，留空则不播报。',
      },
      {
        title: '独立设置面板',
        description:
          '在宿主设置里单独一栏，各项开关保存后立即生效、可单独重置；样式使用宿主设计 token，自动跟随系统深浅色。',
      },
      {
        title: '也能当普通库用',
        description: '不装 dsh 也能直接 import 调用 ping()，在任意 Node 项目里发提醒。',
      },
      {
        title: 'CLI 调试入口',
        description: 'dsh-ping test / stage / approval / input / complete / error，逐个试听并验证通知。',
      },
    ],
    architecture: [
      {
        title: '事件链路',
        caption: '从 Agent 会话事件到「该提醒哪一类」',
        nodes: [
          {
            id: 'session',
            label: 'Agent Session',
            detail: 'session/event',
            kind: 'input',
          },
          {
            id: 'map',
            label: '事件映射',
            detail: 'session/event 事件流',
            kind: 'agent',
          },
          {
            id: 'dedupe',
            label: '归并去重',
            detail: '延迟 300ms',
            kind: 'agent',
          },
          { id: 'notify', label: '提醒分发', detail: '声音 + 桌面通知', kind: 'output' },
        ],
      },
      {
        title: '播放链路',
        caption: '按运行环境分流的两条声音路径',
        nodes: [
          { id: 'ping', label: '提醒帧', detail: 'host 侧产生', kind: 'input' },
          { id: 'sse', label: 'SSE 推送', detail: '/dsh-ping/events', kind: 'data' },
          { id: 'browser', label: '浏览器播放', detail: 'HTML5 Audio', kind: 'output' },
          { id: 'host', label: 'host 兜底', detail: '系统播放器 WAV', kind: 'output' },
        ],
      },
    ],
    architectureNote:
      '插件分 host 与浏览器两半：host 半注册设置命名空间、上传路由、SSE 事件流与声音文件路由；浏览器半是一个自包含的客户端 bundle，注册独立设置栏和 EventSource 播放器。桌面通知不走浏览器，两边能播的格式也不对等——浏览器任意格式，host 兜底只支持 WAV。',
    implementations: [
      {
        title: 'Cordis 标准插件入口',
        description:
          '按 Cordis 规范导出 name + apply(ctx, config)，并声明 dsh.bundle 元数据，接入后不需要使用者手改配置。',
      },
      {
        title: 'SSE 事件流 + 资源路由',
        description:
          'host 侧提供 /dsh-ping/events 事件流、/dsh-ping/sound/<type> 声音文件路由，以及 POST /dsh-ping/upload 上传路由，上传的铃声存在 DSH_HOME 下。',
      },
      {
        title: '零依赖跨平台播放',
        description:
          'Windows 走 PowerShell SoundPlayer、macOS 走 afplay、Linux 走 paplay，不引入音频库。',
      },
      {
        title: '事件映射验证脚本',
        description:
          '在真实 Cordis + dsh-session 环境上把全部事件映射跑一遍（DSH_PING_DRY_RUN=1），避免只在 mock 上验证通过。',
      },
    ],
    outcomes: [
      '已发布 npm 包（v1.9.0，MIT 协议），累计下载 600 次（2026-08 发布至今）',
      '在 DeepSeek Harness 开源生态中开发并开源，已发布到 npm，可直接用 dsh plugin add dsh-ping 接入',
      '同时提供插件、npm 库、CLI 三种使用方式',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/YoyuDev/dsh-ping', kind: 'github' },
      { label: 'NPM', url: 'https://www.npmjs.com/package/dsh-ping', kind: 'npm' },
    ],
  },

  /* ---------------------------------------------------------------- */
  /* 06 个性化教育 Agent                                                */
  /* ---------------------------------------------------------------- */
  {
    slug: 'education-agent',
    name: '多智能体协同个性化教育资源生成平台',
    shortName: '教育多智能体平台',
    subtitle: '面向个性化学习场景的 Multi-Agent 平台',
    tagline: '5 类智能体协同，完成从学习目标到个性化资源的全链路生成。',
    type: 'competition',
    typeLabel: '软件杯竞赛项目',
    period: '2026.05 - 2026.07',
    role: '核心开发者',
    status: '竞赛项目',
    featured: true,
    highlights: ['Multi-Agent', 'Agent Workflow', 'RAG', 'Qdrant'],
    summary:
      '个性化学习规划本身是多环节任务：先要知道学习者现在是什么水平，才能规划路径，才能生成合适的资源，还得有人评估效果。一次模型调用做不完，所以才拆成多个智能体协同——画像、路径、资源、评估、辅导各管一段，由 Agent Workflow 统一编排。',
    techStack: ['Spring Boot', 'Vue3', 'RAG', 'Qdrant', 'Multi-Agent'],
    shots: [
      {
        src: asset('shots/education-agent-assistant.png'),
        caption:
          'AI 学习助手 · 对话式采集注意力时长与编程基础，画像分析完成后直接在右侧生成个性化学习路径',
      },
      {
        src: asset('shots/education-agent-dashboard.png'),
        caption: '学习仪表盘 · 学习进度、时长与画像四项指标，下方是学习雷达图与学习素质维度',
      },
      {
        src: asset('shots/education-agent-library.png'),
        caption:
          '学习资源库 · 按视频教程 / 电子文档 / 代码示例 / 思维导图 / 练习题 / 拓展阅读六类归集',
      },
      {
        src: asset('shots/education-agent-mindmap.png'),
        caption: '资源库内直接打开「思维导图：Java 编程基础」，知识点按层级展开',
      },
      {
        src: asset('shots/education-agent-video.jpg'),
        caption: '视频播放页 · 「JDK 安装与环境变量配置」的配套讲解视频，底部同步字幕',
      },
      {
        src: asset('shots/education-agent-knowledge.png'),
        caption: '个人知识库 · 上传资料建立私有知识库，文件列表带类型、大小、状态与上传时间',
      },
      {
        src: asset('shots/education-agent-login.png'),
        caption:
          '登录页 · 左侧是 AI 智能辅导 / 个性化学习路径 / 丰富学习资源 / 智能评估反馈四项能力说明',
      },
    ],
    decisions: [
      {
        problem:
          '个性化学习规划是复杂任务，一个 Agent 很难同时覆盖画像、路径、资源、评估、辅导这几件事。',
        approach:
          '拆成 5 类智能体（画像 / 路径 / 资源 / 评估 / 辅导），由 Agent Workflow 统一编排，把复杂任务拆成可编排的子任务。',
      },
      {
        problem: '模型对教育领域知识掌握不足，生成的资源和路径容易脱离知识点体系。',
        approach: '基于 RAG + Qdrant 构建教育知识库，用向量检索为各 Agent 补充领域知识。',
      },
      {
        problem: 'Agent 编排的结果是给学习者用的，纯后端流程没法验证效果。',
        approach:
          '基于 Spring Boot + Vue3 做可视化学习管理界面，把目标输入、知识检索、路径规划、资源生成串成一条看得见的流程。',
      },
    ],
    features: [
      {
        title: '资源 Agent',
        description: '根据学习目标与知识缺口生成个性化学习资源。',
      },
      {
        title: '评估 Agent',
        description: '对学习效果与资源质量进行评估反馈。',
      },
      {
        title: '辅导 Agent',
        description: '面向学习过程中的问题提供针对性辅导。',
      },
      {
        title: '路径 Agent',
        description: '规划学习路径，把学习目标拆解为可执行的阶段任务。',
      },
      {
        title: '画像 Agent',
        description: '构建学习者画像，为个性化推荐提供依据。',
      },
      {
        title: '可视化学习管理界面',
        description:
          '基于 Spring Boot + Vue3 完成可视化学习管理界面，实现学习目标输入、知识检索、路径规划及资源生成等核心流程。',
      },
    ],
    architecture: [
      {
        title: 'Agent Workflow',
        caption: '5 类智能体协同的学习资源生成流程',
        nodes: [
          { id: 'goal', label: '学习目标输入', kind: 'input' },
          { id: 'analyze', label: '目标分析', detail: '画像 Agent', kind: 'agent' },
          { id: 'retrieval', label: '知识检索', detail: 'RAG + Qdrant', kind: 'data' },
          { id: 'path', label: '学习路径规划', detail: '路径 Agent', kind: 'agent' },
          { id: 'generate', label: '资源生成', detail: '资源 Agent', kind: 'agent' },
          { id: 'recommend', label: '个性化推荐', detail: '评估 + 辅导 Agent', kind: 'output' },
        ],
      },
    ],
    architectureNote:
      '画像、路径、资源、评估、辅导 5 类智能体由 Agent Workflow 统一编排，知识库层通过向量检索为各 Agent 提供领域知识支撑。',
    implementations: [
      {
        title: 'Agent Workflow 多智能体协作体系',
        description:
          '组织资源、评估、辅导、路径、画像 5 类智能体，完成学习目标分析与任务协同，把复杂的学习规划任务拆解为可编排的子任务。',
      },
      {
        title: 'RAG + Qdrant 教育知识库',
        description:
          '基于 RAG + Qdrant 构建教育知识库，通过向量检索增强模型领域知识能力，支持知识检索与个性化资源推荐。',
      },
      {
        title: 'Spring Boot 后端服务',
        description: '基于 Spring Boot 完成后端服务开发，承载 Agent 编排接口与业务数据管理。',
      },
      {
        title: 'Vue3 可视化界面',
        description:
          '基于 Vue3 实现可视化学习管理界面，串起学习目标输入、知识检索、路径规划及资源生成等核心流程。',
      },
    ],
    outcomes: [
      '完成多智能体 Workflow 及系统原型开发',
      '支持课程规划、学习资源推荐等个性化学习功能',
      '作为软件杯竞赛项目完成整体设计与实现',
    ],
    links: [],
    sourceNote: '竞赛项目｜源码不公开',
  },

  /* ---------------------------------------------------------------- */
  /* 07 Cy-fang 次元坊                                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: 'cy-fang',
    name: 'Cy-fang 次元坊',
    shortName: '次元坊',
    subtitle: 'Spring Cloud 微服务动漫站',
    tagline: '十个微服务拼起来的动漫站——用户搜什么，站里就长什么。',
    type: 'personal',
    typeLabel: '个人项目 · 微服务实践',
    period: '2025.10 - 2025.12',
    role: '独立开发 · 全栈',
    status: '个人项目',
    highlights: ['Spring Cloud 微服务', 'AI 内容审核', 'Spark 离线计算', 'Docker 部署'],
    summary:
      '这是一次把 Spring Cloud 完整走一遍的实践：注册发现、负载均衡、熔断降级、分布式事务，全部落在一个真能用的动漫站上——搜索、播放、弹幕、评论、收藏、后台，外加一块可视化大屏。难的不是把服务拆开，而是拆开之后每个服务都得有真实的活干；同时手上只有一台 4 核 8G 的服务器，海量动漫资源不可能全量存下来，「资源从哪来、到底存什么」成了第一个要先想清楚的问题。',
    techStack: [
      'Spring Cloud',
      'Spring Boot 3',
      'Nacos',
      'Sentinel',
      'Seata',
      'MyBatis-Plus',
      'MySQL',
      'Redis',
      'Vue 3',
      'Element Plus',
      'DPlayer',
      'Spark',
      'Dify · Qwen',
      'Docker Compose',
    ],
    shots: [
      {
        src: asset('shots/cy-fang-home.png'),
        caption: '首页 · 顶栏搜索与用户区、左侧导航；Banner 位轮播新番，下方是新番简介与「热门推荐」卡片行',
      },
      {
        src: asset('shots/cy-fang-detail.png'),
        caption: '动漫详情页 · 顶部横幅与评分，海报区给出简介和「立即播放 / 收藏」入口，下方是剧集列表',
      },
      {
        src: asset('shots/cy-fang-screen.png'),
        caption: '可视化大屏（山海鲸）· 基本信息、资源处理进度、热门搜索词、用户性别分布与 TOP10 番剧榜',
      },
      {
        src: asset('shots/cy-fang-dify.jpg'),
        caption: 'Dify 审核工作流 · 开始 → LLM（Qwen3-8B）→ 代码执行，判定弹幕与评论是否放行',
      },
      {
        src: asset('shots/cy-fang-email.png'),
        ratio: '9/16',
        caption: '登录验证码邮件（移动端）· 邮件模板按站点视觉单独定制，验证码 5 分钟内有效',
      },
    ],
    decisions: [
      {
        problem:
          '注册登录要把密码和验证码送到后端，但加密方式不好选：对称加密快，密钥却要跟着数据一起传，等于没保护；非对称加密安全，可它慢，逐字段加解密并不划算。',
        approach:
          '两者套着用。前端生成一把 AES 密钥加密业务数据，后端下发 RSA 公钥；前端拿公钥把这把 AES 密钥加密后一并回传，后端用 RSA 私钥解出密钥，再还原数据。落到库里时密码加盐存储。',
        tradeoff: '加解密链路变长、前后端要各实现一套，接口调试时得先解密才看得懂报文。',
      },
      {
        problem:
          '服务器只有 4 核 8G，动漫资源全量抓下来既存不下，频繁请求源站还会被拉黑 IP；可每次搜索都现抓，用户又要等很久。',
        approach:
          '本站不保存资源本体，只保存资源地址——第一次搜索从网络获取，之后命中同一个资源就直接读库。获取逻辑按粒度拆成三层：搜关键字拿资源列表、搜单部动漫拿详情、搜单集拿播放地址。',
        tradeoff:
          '播放可用性押在了外部源站上，源失效本站就播不了；而且首次搜索必须等抓取跑完，体验不如缓存命中。',
        result:
          '用户搜得越多，站里已索引的资源就越多——用一个「成长型网站」的思路，让资源覆盖随使用量自然长大。',
      },
      {
        problem:
          '弹幕和评论必须过审，否则站内环境很快没法看。原本把 Qwen3 用 Ollama 部署在服务器本地跑，但机器只有 CPU、配置又低，速度和效果都不达标。',
        approach:
          '审核流程照旧搭在 Dify 工作流里（开始 → LLM → 代码执行），只把模型后端换成第三方硅基流动 API，工作流结构与判定逻辑都不动。',
        tradeoff:
          '审核效果和稳定性从此依赖外部服务，也多了一笔调用成本；换来的是在低配机器上真的能跑起来。',
      },
      {
        problem:
          '可视化大屏最初打算用 ECharts 自己写，但数据堆上去之后视觉始终不理想，而重做一套大屏组件又要额外花不少时间。',
        approach:
          '改用零代码平台「山海鲸可视化」搭大屏，数据仍由 calculate-service 配合 Spark 离线计算产出，平台只负责呈现。',
        tradeoff: '省下的是时间，让出去的是自由度——样式与交互受平台能力限制，没法完全自定义。',
      },
      {
        problem:
          '十几个服务加 Nacos、Redis、MySQL 一大堆中间件，手工逐个启动既慢又容易漏，换台机器就得整个重来一遍。',
        approach:
          '给每个服务打 Docker 镜像，用 docker-compose.yml 统一编排服务与中间件，一条命令拉起整套环境。',
        tradeoff:
          '服务都跑在同一台 4 核 8G 的机器上，拆分更多是为了把整条链路走通，还谈不上真正的分布式。',
      },
    ],
    features: [
      {
        title: 'QQ 邮箱验证码注册 / 登录',
        description:
          '走 QQ 邮箱服务收发验证码，Redis 管验证码过期与发送频率限制，邮件模板按站点视觉单独定制。',
      },
      {
        title: '动漫搜索与播放',
        description: '按关键字搜番剧，详情页给剧集列表，用 DPlayer 播放并记录观看进度。',
      },
      {
        title: '弹幕 / 评论 / 评分',
        description: '三类互动各自独立成服务，播放页发弹幕，详情页评论与打分。',
      },
      {
        title: 'AI 内容审核',
        description: '弹幕和评论入库前先过一遍 Dify 工作流，由大模型判定是否放行。',
      },
      {
        title: '历史记录与收藏',
        description: '记录看过的番剧与收藏列表，登录后跨端可查。',
      },
      {
        title: '用户行为计算与可视化大屏',
        description:
          '把浏览、收藏等行为交给 Spark 离线计算，结果既回流站内展示，也供给山海鲸大屏做看板。',
      },
      {
        title: '喇叭与实时通知',
        description: '由 websocket-service 推送站内公告和用户通知。',
      },
      {
        title: '管理后台',
        description: '独立的 Layout 与管理页，管理员操作由 log-service 留痕。',
      },
      {
        title: '一套代码适配多端',
        description:
          '用 flex 弹性布局、媒体查询配合 Element Plus 的响应式组件，同时适配移动端、平板和 PC。',
      },
    ],
    architecture: [
      {
        title: '资源获取链路',
        caption: '为什么要在搜索链路上拆出三个服务',
        nodes: [
          { id: 'front', label: '前端搜索', detail: 'Vue 3', kind: 'input' },
          { id: 'search', label: 'search-service', detail: '聚合 spider + anime', kind: 'agent' },
          { id: 'spider', label: 'spider-service', detail: '从网络抓取资源', kind: 'agent' },
          { id: 'anime', label: 'anime-service', detail: '落库资源地址', kind: 'data' },
        ],
      },
      {
        title: '互动与 AI 审核',
        caption: '弹幕和评论在入库前先过一遍工作流',
        nodes: [
          { id: 'post', label: '弹幕 / 评论', detail: 'danmaku + comment', kind: 'input' },
          { id: 'workflow', label: 'workflow-service', detail: '对接 Dify 工作流', kind: 'agent' },
          { id: 'llm', label: 'Dify · Qwen', detail: 'LLM + 代码节点', kind: 'agent' },
          { id: 'verdict', label: '放行 / 拦截', detail: '写回对应服务', kind: 'output' },
        ],
      },
      {
        title: '用户与鉴权',
        caption: 'AES + RSA 的登录链路',
        nodes: [
          { id: 'login', label: '注册 / 登录', detail: 'QQ 邮箱验证码', kind: 'input' },
          { id: 'user', label: 'user-service', detail: 'RSA 解出 AES 密钥', kind: 'agent' },
          { id: 'redis', label: 'Redis', detail: '验证码 · 限频', kind: 'data' },
          { id: 'jwt', label: 'JWT 签发', detail: 'Common 切面校验', kind: 'output' },
        ],
      },
      {
        title: '数据计算与大屏',
        caption: '离线算好，再给两侧用',
        nodes: [
          { id: 'behavior', label: '用户行为', detail: '浏览 · 收藏 · 播放', kind: 'input' },
          { id: 'calculate', label: 'calculate-service', detail: '配合 Spark 取数', kind: 'agent' },
          { id: 'spark', label: 'Spark 离线计算', detail: '统计与特征', kind: 'data' },
          { id: 'screen', label: '山海鲸大屏', detail: '可视化看板', kind: 'output' },
        ],
      },
    ],
    architectureNote:
      '十个服务按职责横向拆开：anime / search / spider 管资源，danmaku / comment / workflow 管互动与审核，user 管鉴权，calculate 配 Spark 出数据，log 记管理员操作，websocket 推喇叭与通知；Model 与 Common 单独成模块，向所有服务提供实体封装、全局异常、统一 Result、AOP 切面、JWT 与 IP 工具。服务之间靠 Nacos 做注册发现、Sentinel 做熔断降级与兜底返回，跨服务的写操作交给 Seata 保证一致性。',
    implementations: [
      {
        title: '服务注册发现与治理',
        description:
          'Nacos 负责注册发现与配置，Sentinel 负责熔断降级和兜底返回，跨服务的写操作由 Seata 处理分布式事务。',
      },
      {
        title: 'AES + RSA 混合加密',
        description:
          '前端生成 AES 密钥加密业务数据，再用后端下发的 RSA 公钥加密这把密钥；后端解出密钥后还原数据，密码加盐入库。',
      },
      {
        title: '多层级的资源获取策略',
        description:
          '把获取拆成「关键字 → 资源列表」「动漫 → 详情」「剧集 → 播放地址」三层，spider-service 只管抓取，anime-service 只管资源与地址的落库。',
      },
      {
        title: 'Dify 工作流 + LLM 审核',
        description:
          '审核逻辑做成 Dify 工作流由服务侧调用，换模型后端只需要改工作流里的模型节点，业务流程代码不用动。',
      },
      {
        title: 'Spark 离线计算',
        description:
          'calculate-service 调用 Spark 对用户行为做离线统计，产出的数据同时给站内展示和可视化大屏使用。',
      },
      {
        title: 'Docker Compose 一键部署',
        description:
          '每个服务打成镜像，用 docker-compose.yml 统一编排应用与中间件，把部署从一长串手工步骤收敛成一条命令。',
      },
      {
        title: '公共模块与分层规范',
        description:
          'Model 放实体、全局异常与统一 Result，Common 放 AOP 切面、JWT 与 IP 工具，独立成模块供所有微服务引用；服务内部严格按控制层 / 服务层 / 数据访问层 / XML 分层。',
      },
    ],
    outcomes: [
      '独立完成 10 个微服务的拆分与实现，覆盖注册发现、负载均衡、熔断降级、兜底返回与分布式事务等 Spring Cloud 核心能力',
      '用 docker-compose 打包整套服务与中间件，部署在阿里云 ECS（4 核 8G）上',
      '弹幕与评论审核接进 Dify 工作流，由 Qwen 模型自动判定是否放行',
      'Spark 离线计算产出的数据同时支撑站内展示与山海鲸可视化大屏',
      '前端一套代码适配移动端 / 平板 / PC 三种尺寸',
    ],
    links: [
      {
        label: '项目介绍（CSDN）',
        url: 'https://blog.csdn.net/hahai_/article/details/155776574',
        kind: 'article',
      },
    ],
    sourceNote: '个人学习实践项目｜源码未公开',
  },
]

/* ------------------------------------------------------------------ */
/* 便利方法                                                            */
/* ------------------------------------------------------------------ */

/** 按 slug 取项目 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

/** 首页重点展示的项目 */
export const featuredProjects: Project[] = projects.filter((p) => p.featured)

/** 首页 Currently Building 区块 */
export const buildingProjects: Project[] = projects.filter((p) => p.building)

/** 商用项目 */
export const commercialProjects: Project[] = projects.filter((p) => p.type === 'commercial')

/** 上一个 / 下一个项目，用于详情页底部导航 */
export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

/** 项目类型 -> 徽标样式（Tailwind class） */
export const projectTypeStyles: Record<Project['type'], string> = {
  commercial:
    'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300',
  'ai-agent':
    'border-brand-200 bg-brand-50 text-brand-700 dark:border-brand-500/25 dark:bg-brand-500/10 dark:text-brand-300',
  competition:
    'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300',
  personal:
    'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300',
}
