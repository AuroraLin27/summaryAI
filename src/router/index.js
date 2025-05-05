import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SummaryPage from '@/views/SummaryPage.vue'
import HistoryPage from '@/views/HistoryPage.vue'

// 创建路由实例
const router = createRouter({
  // 配置路由模式
  history: createWebHistory(import.meta.env.BASE_URL),

  // 路由配置
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/summary',
      component: SummaryPage
    },
    {
      path: '/history',
      component: HistoryPage
    }
  ],
})

// 导出路由实例
export default router
