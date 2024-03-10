import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import HallOfHeroes from '../components/HallOfHeroes.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/knights',
    name: 'Knights',
    component: Dashboard
  },
  {
    path: '/hall-hero/',
    name: 'hall-hero',
    component: HallOfHeroes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
