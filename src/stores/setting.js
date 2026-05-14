export const useSettingStore = defineStore(
  'setting',
  () => {
    const setting = reactive({
      themeMode: 'light',
    })

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const setThemeMode = () => {
      const isDark = setting.themeMode === 'system' ? media.matches : setting.themeMode === 'dark'
      document.documentElement.classList.toggle('dark', isDark)
    }

    media.addEventListener('change', () => {
      if (setting.themeMode === 'system') {
        setThemeMode()
      }
    })

    watchEffect(() => {
      setThemeMode()
    })

    return {
      ...toRefs(setting),
    }
  },
  {
    persist: {
      storage: localStorage,
    },
  }
)
