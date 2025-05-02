import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SummaryPage from '@/views/SummaryPage.vue'
import HistoryPage from '@/views/HistoryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/', component:HomePage},
    {path:'/summary', component:SummaryPage},
    {path:'/history', component:HistoryPage}
  ],
})

export default router
