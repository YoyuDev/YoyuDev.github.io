import type { SkillGroup } from '@/types'

/**
 * 技能清单。
 * 严格按简历内容整理，不额外添加没有实践过的技术。
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: '后端开发',
    summary: '业务系统建模、接口设计与数据持久化',
    items: ['Java', 'Spring Boot', 'MyBatis-Plus', 'MySQL', 'Redis', 'RESTful API'],
  },
  {
    id: 'frontend',
    title: '前端开发',
    summary: '管理后台、小程序与前后端联调',
    items: ['Vue3', 'Vue', 'Element Plus', 'UniApp', '微信小程序'],
  },
  {
    id: 'ai',
    title: 'AI / Agent',
    summary: 'LLM 应用工程、检索增强与多智能体协作',
    items: [
      'LangChain4j',
      'LangGraph',
      'Multi-Agent',
      'Agent Workflow',
      'RAG',
      'Qdrant',
      'Spring AI',
      'Prompt Engineering',
      'Function Calling',
      'Structured Output',
    ],
  },
  {
    id: 'devops',
    title: '工程与部署',
    summary: '从本地开发到生产环境的完整交付链路',
    items: ['Git', 'Linux', 'Nginx', 'Docker', '阿里云 ECS'],
  },
]
