import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { Cookie } from '@/utils/storage'
import { useUserInfoStore } from '@/stores/userInfo'
import request from '@/utils/request'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/views/layout/index.vue'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history:
    location.protocol === 'file:'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/',
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/index.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: Layout,
      children: [
        {
          path: '/admin/user',
          component: () => import('@/views/index.vue'),
        },
        {
          path: '/admin/role',
          component: () => import('@/views/index.vue'),
        },
        {
          path: '/admin/menu',
          component: () => import('@/views/index.vue'),
        },
      ],
    },
    {
      path: '/system',
      component: Layout,
      children: [
        {
          path: '/system/dict',
          component: () => import('@/views/index.vue'),
        },
        {
          path: '/system/param',
          component: () => import('@/views/index.vue'),
        },
        {
          path: '/system/loginLog',
          component: () => import('@/views/index.vue'),
        },
        {
          path: '/system/operLog',
          component: () => import('@/views/index.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Cookie.get('token') !== undefined) {
    if (to.path === '/login') {
      next('/index')
    } else {
      const userInfoStore = useUserInfoStore()
      const { user } = storeToRefs(userInfoStore)
      if (user.value === null) {
        request.get('/userInfo').then(({ data }) => {
          const { routeList } = data
          userInfoStore.setRouteList(routeList)
          next()
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
