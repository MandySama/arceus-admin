import { createRouter, createWebHistory } from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
        },
      ],
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
  ],
})

router.beforeEach((to, from) => {
  NProgress.start()
  if (localStorage.getItem('token')) {
    if (to.path === '/login') {
      return '/home'
    } else {
      return true
    }
  } else {
    if (to.path === '/login') {
      return true
    } else {
      return `/login?redirect=${to.path}`
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
