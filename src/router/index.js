import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { Cookie } from '@/utils/storage'

const router = createRouter({
  history:
    location.protocol === 'file:'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (Cookie.get('token') !== undefined) {
    if (to.path === '/login') {
      next('/index')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
