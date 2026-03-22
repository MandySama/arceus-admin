import { indexRoute } from '@/mock/login'

export const useUserInfoStore = defineStore('userInfo', () => {
  const user = ref(null)

  const routeList = ref([])

  const setRouteList = (_routeList) => {
    routeList.value = [indexRoute, ..._routeList]
  }

  return {
    user,
    routeList,
    setRouteList,
  }
})
