import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/bazooka',
    name: 'Bazooka',
    component: async () => import('@/pages/Bazooka.vue'),
  },
  {
    path:'/bazooka/:id',
    name:'POI',
    component:async () => import('@/pages/POI.vue'),
    props:true
  },
  {
    path:'/lamp',
    name:'Lamp',
    component:async () => import('@/pages/Lamp.vue')
  },
  {
    path:'/lamp/:vendorId',
    name:'Vendor',
    component:async () => import('@/pages/Vendor.vue'),
    props:true
  },
  ,
  {
    path:'/lamp/:vendorId/:batchId',
    name:'Batch',
    component:async () => import('@/pages/Batch.vue'),
    props:true
  },
  {
    path:'/lamp/:vendorId/:batchId/recce/:requestId',
    name:'Recce',
    component:async () => import('@/forms/Recce.vue'),
    props:true
  },
  // {
  //   path:'/camera',
  //   name:'Camera Modal',
  //   component:async () => import('@/components/CameraModal.vue')
  // }
  {
    path:'/lamp/:vendorId/:batchId/details/:requestId',
    name:'Request Details',
    component:async () => import('@/forms/Request.vue'),
    props:true
  }
]

let router = createRouter({
  history: createWebHistory('/romeo'),
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
    window.location.href="/login?redirect-to=romeo"
  }
  next()
})

export default router
