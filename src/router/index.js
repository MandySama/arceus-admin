import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { Cookie } from '@/utils/storage'
import { useUserInfoStore } from '@/stores/userInfo'
import request from '@/utils/request'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Layout from '@/views/layout/index.vue'

NProgress.configure({ showSpinner: false })

export const indexRoute = {
  path: '/index',
  component: () => import('@/views/index.vue'),
  meta: { title: '首页' },
}

export const isIndexRoute = (item) => {
  return item.path === indexRoute.path
}

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
      name: 'Layout',
      component: Layout,
      redirect: '/index',
      children: [indexRoute],
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
      const { user, routeList } = storeToRefs(userInfoStore)
      // if (user.value === null) {
      if (routeList.value.length === 0) {
        request.get('/userInfo').then(({ data }) => {
          const { routeList } = data
          userInfoStore.setRouteList(routeList)
          next({ ...to, replace: true })
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
