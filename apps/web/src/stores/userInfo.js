import Layout from '@/views/layout/index.vue'

const homeRoute = {
  menuId: 0,
  menuName: '首页',
  menuType: 'menu',
  icon: 'ant-design:home-outlined',
  routePath: '/home',
  children: null,
}

const modules = import.meta.glob(['@/views/**/*.vue', '!@/views/layout/**/*.vue'])

export const useUserInfoStore = defineStore('userInfo', () => {
  const routeList = ref([])

  const router = useRouter()

  const getRouteChildren = (routeList) => {
    return routeList.flatMap((item) => {
      if (item.menuType === 'dir') {
        return getRouteChildren(item.children)
      } else {
        return {
          path: item.routePath,
          component: modules[`/src/views${item.routePath}/index.vue`],
        }
      }
    })
  }

  const addRouteList = (routeList) => {
    routeList.forEach((item) => {
      if (item.menuType === 'dir') {
        router.addRoute({
          path: item.routePath,
          component: Layout,
          children: getRouteChildren(item.children),
        })
      }
    })
  }

  const setUserInfo = (userInfo) => {
    routeList.value = [homeRoute, ...userInfo.routeList]
    addRouteList(routeList.value)
  }

  return {
    routeList,
    setUserInfo,
  }
})
