export const useSettingStore = defineStore('setting', () => {}, {
  persist: {
    storage: localStorage,
  },
})
