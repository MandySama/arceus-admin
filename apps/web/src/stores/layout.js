export const useLayoutStore = defineStore(
  'layout',
  () => {
    const collapseSidebar = ref(false)

    return {
      collapseSidebar,
    }
  },
  {
    persist: true,
  },
)
