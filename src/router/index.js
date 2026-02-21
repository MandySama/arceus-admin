import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history:
    location.protocol === 'file:'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/auth/login.vue'),
    },
  ],
})

export default router
