import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeView.vue'
import dailyView from '../views/dailyView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
 {
    path : '/daily',
    name : 'daily',
    component : dailyView
 }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
