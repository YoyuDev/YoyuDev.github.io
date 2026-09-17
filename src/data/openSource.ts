import type { OpenSourceItem } from '@/types'
import { asset } from '@/utils/asset'

/**
 * 开源项目数据。
 *
 * ⚠️ 表述注意：dsh-ping 是「参与 DeepSeek Harness 开源生态并开发的插件」，
 * 不代表 DeepSeek 官方身份。文案里不要写成官方成员 / 官方维护者。
 */
export const openSourceItems: OpenSourceItem[] = [
  {
    id: 'dsh-ping',
    name: 'dsh-ping',
    emoji: '🔔',
    subtitle: 'DeepSeek Harness Agent Reminder Plugin',
    description:
      '参与 DeepSeek Harness 开源生态，开发并开源 dsh-ping Agent 提醒插件，为 Agent 的等待输入、审批、完成、异常等状态提供声音及桌面通知。',
    role: '插件开发者 · 开源贡献',
    ecosystem: 'DeepSeek Harness',
    tags: ['Open Source', 'Agent Plugin', 'DeepSeek Harness', 'Notification'],
    featured: true,
    events: [
      { name: 'stage', description: 'Agent 进入新的执行阶段' },
      { name: 'approval', description: '需要人工审批 / 确认' },
      { name: 'input', description: '等待用户输入' },
      { name: 'complete', description: '任务执行完成' },
      { name: 'error', description: '执行异常需要关注' },
    ],
    flow: [
      { id: 'harness', label: 'DeepSeek Harness', detail: 'Agent 运行环境', kind: 'input' },
      { id: 'session', label: 'Agent Session', detail: '监听状态事件', kind: 'agent' },
      { id: 'dshping', label: 'dsh-ping', detail: '事件订阅与分发', kind: 'agent' },
      { id: 'notify', label: '提醒输出', detail: '声音 + 桌面通知', kind: 'output' },
    ],
    shots: [
      {
        src: asset('shots/dsh-ping-settings.png'),
        caption: '设置面板 · 全局音量、免打扰时段、邮件 / Webhook 多通道通知，以及阶段提醒的铃声与语音播报',
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/YoyuDev/dsh-ping', kind: 'github' },
      { label: 'NPM', url: 'https://www.npmjs.com/package/dsh-ping', kind: 'npm' },
    ],
  },
  {
    id: 'piano-agent',
    name: 'PianoAgent',
    subtitle: '基于 Multi-Agent 的 AI 音乐创作系统',
    description:
      '用自然语言创作完整钢琴曲的 AI 作曲系统：知识检索 → 作曲规划 → 音符生成 → 演奏优化 → 质量评价，由五个 Agent 分工完成，再由三层音频引擎渲染播放。项目已开源并发布 npm 包。',
    role: '独立开发者 & 维护者',
    ecosystem: 'Multi-Agent / RAG',
    tags: ['Multi-Agent', 'RAG', 'Qdrant', 'LLM', 'MIDI', 'npm'],
    // Agent 名称与职责以 npm README 的 5-Agent Pipeline 为准，别改回
    // 「Music Planning / MIDI Generator / Reviewer」那套旧叫法（项目页已对齐过一轮）。
    events: [
      { name: 'KnowledgeAgent', description: 'Wiki RAG 检索 15 篇音乐理论文档' },
      { name: 'ComposerAgent', description: 'LLM 规划调性 / 速度 / 曲式，产出 MusicPlan' },
      { name: 'GeneratorAgent', description: '乐理引擎逐段生成 MIDI 音符序列' },
      { name: 'PerformanceAgent', description: 'velocity 动态与 timing 人性化偏移' },
      { name: 'CriticAgent', description: 'LLM 评分，低于 70 分反馈重新规划' },
    ],
    shots: [
      {
        src: asset('shots/piano-agent-compose.jpg'),
        caption: '输入「晴天、开心」生成《晴天》旋律 · 左侧钢琴卷帘，右侧 AI 对话与创作草稿',
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/YoyuDev/PianoAgent', kind: 'github' },
      { label: 'NPM', url: 'https://www.npmjs.com/package/piano-agent-ai', kind: 'npm' },
    ],
  },
  {
    id: 'soul-agent',
    name: 'SoulAgent',
    subtitle: '长期记忆型 AI 角色系统',
    description:
      '基于 LLM Agent 构建的长期记忆型 AI 角色系统，通过导入聊天记录进行人格建模、记忆管理与上下文理解，实现具有持续交互能力的智能角色。',
    role: '独立开发者 & 维护者',
    ecosystem: 'LangChain4j / Vector Database',
    tags: ['LangChain4j', 'Long-term Memory', 'Vector Retrieval', 'Agent'],
    events: [
      { name: '人格建模', description: '导入聊天记录构建角色人格' },
      { name: '记忆写入', description: '交互信息结构化存储' },
      { name: '向量召回', description: '按当前对话召回相关记忆' },
      { name: '上下文管理', description: '组织上下文并生成回复' },
    ],
    // 2026-09-17 补上真实截图。此前这张卡没有 shots，是纯文字的
    // （列表里宁可矮一点，也不放空占位框）；现在它和 PianoAgent 卡等高。
    shots: [
      {
        src: asset('shots/soul-agent-chat.png'),
        caption: '角色对话 · 左侧角色列表，右侧与人设标签的角色多轮对话',
      },
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/YoyuDev/SoulAgent', kind: 'github' },
    ],
  },
]

/** 开源生态说明（用于 Open Source 页面头部） */
export const ecosystemNote = {
  title: 'Open Source',
  description:
    '围绕 AI Agent 方向持续做开源实践：从 Agent 运行时的状态提醒插件，到 Multi-Agent 音乐创作、长期记忆角色系统。',
  points: [
    { title: 'DeepSeek Harness Ecosystem', detail: '参与开源生态，开发 dsh-ping Agent 提醒插件' },
    { title: 'Agent Plugin', detail: '围绕 Agent 运行状态提供声音与桌面通知能力' },
    { title: 'Open Source', detail: '项目开源并持续维护，提供使用说明与示例' },
  ],
}
