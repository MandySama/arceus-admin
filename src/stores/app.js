export const useAppStore = defineStore(
  'app',
  () => {
    const collapseSidebar = ref(false)

    return {
      collapseSidebar,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  }
)
