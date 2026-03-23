export const useAppStore = defineStore(
  'app',
  () => {
    const collapseSidebar = ref(false)

    const toggleSidebar = (_collapseSidebar = !collapseSidebar.value) => {
      collapseSidebar.value = _collapseSidebar
    }

    return {
      collapseSidebar,
      toggleSidebar,
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  }
)
