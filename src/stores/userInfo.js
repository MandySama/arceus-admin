const indexRoute = {
  menuId: 0,
  menuName: '首页',
  menuType: 'menu',
  icon: 'ad-HomeOutlined',
  routePath: '/index',
  children: null,
}

const viewModules = import.meta.glob('@/views/**/*.vue')

export const useUserInfoStore = defineStore('userInfo', () => {
  const user = ref(null)

  const routeList = ref([])

  const router = useRouter()

  const addRouteList = (_routeList) => {
    _routeList.forEach((item) => {
      if (item.menuType === 'dir') {
        addRouteList(item.children)
      } else {
        router.addRoute('Layout', {
          path: item.routePath,
          component: viewModules[`/src/views${item.routePath}/index.vue`],
          meta: { title: item.menuName },
        })
      }
    })
  }

  const setRouteList = (_routeList) => {
    routeList.value = [indexRoute, ..._routeList]
    addRouteList(_routeList)
  }

  return {
    user,
    routeList,
    setRouteList,
  }
})
