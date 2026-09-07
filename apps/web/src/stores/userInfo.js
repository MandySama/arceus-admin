import Layout from '@/views/layout/index.vue'

const homeMenu = {
  menuId: 0,
  menuName: '首页',
  menuType: 'menu',
  icon: 'ant-design:home-outlined',
  routePath: '/home',
  children: null,
}

const modules = import.meta.glob(['@/views/**/*.vue', '!@/views/layout/**/*.vue'])

export const useUserInfoStore = defineStore('userInfo', () => {
  const menuList = ref([])

  const router = useRouter()

  const getRouteChildren = (menuList) => {
    return menuList.flatMap((item) => {
      if (item.menuType === 'dir') {
        return getRouteChildren(item.children)
      } else {
        return {
          path: item.routePath,
          component: modules[`/src/views${item.routePath}/index.vue`],
          meta: { title: item.menuName },
        }
      }
    })
  }

  const addRouteList = (menuList) => {
    menuList.forEach((item) => {
      if (item.menuType === 'dir') {
        router.addRoute({
          path: item.routePath,
          component: Layout,
          children: getRouteChildren(item.children),
          meta: { title: item.menuName },
        })
      } else {
        router.addRoute('Layout', {
          path: item.routePath,
          component: modules[`/src/views${item.routePath}/index.vue`],
          meta: { title: item.menuName },
        })
      }
    })
  }

  const setUserInfo = (userInfo) => {
    menuList.value = [homeMenu, ...userInfo.menuList]
    addRouteList(userInfo.menuList)
  }

  return {
    menuList,
    setUserInfo,
  }
})
