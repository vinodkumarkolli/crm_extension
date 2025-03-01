import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Map',
    component: () => import('@/pages/Map.vue'),
  }
]

let router = createRouter({
  history: createWebHistory('/atlas'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }
  if(!isLoggedIn){
    window.location.href = "/login?redirect-to=atlas"
  }
  next()
})

export default router
