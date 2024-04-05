import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  }
  // You can add more routes here
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
