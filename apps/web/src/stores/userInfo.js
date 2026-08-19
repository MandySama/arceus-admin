const homeRoute = {
  menuId: 0,
  menuName: '首页',
  menuType: 'menu',
  icon: 'ant-design:home-outlined',
  routePath: '/index',
  children: null,
}

export const useUserInfoStore = defineStore('userInfo', () => {
  const routeList = ref([])

  const setUserInfo = (userInfo) => {
    routeList.value = [homeRoute, ...userInfo.routeList]
  }

  return {
    routeList,
    setUserInfo,
  }
})
