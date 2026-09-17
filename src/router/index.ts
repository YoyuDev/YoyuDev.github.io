import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

/**
 * 路由表。
 *
 * base 取自 Vite 的 BASE_URL，本地是 '/'，
 * GitHub Pages 项目站点构建时会自动变成 '/<repo>/'，两侧不需要手改。
 *
 * 项目详情统一走 /projects/:slug，页面内容全部从 src/data/projects.ts 读取，
 * 新增项目不需要新增路由。
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Java 全栈开发 · AI Agent',
    },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: '项目作品' },
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/views/ProjectDetailView.vue'),
    meta: { title: '项目详情' },
  },
  {
    path: '/open-source',
    name: 'open-source',
    component: () => import('@/views/OpenSourceView.vue'),
    meta: { title: '开源项目' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogView.vue'),
    meta: { title: '技术博客' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '关于我' },
  },
  {
    // 兜底 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 88, behavior: 'smooth' }
    // 只有路径真的变了才回到顶部，避免同页 query 变化时跳动
    if (to.path !== from.path) return { top: 0 }
    return undefined
  },
})

export default router
