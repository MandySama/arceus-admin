export const useSettingStore = defineStore(
  'setting',
  () => {
    const setting = reactive({
      themeMode: 'light',
    })

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const setThemeMode = () => {
      const isDark = setting.themeMode === 'system' ? media.matches : setting.themeMode === 'dark'
      // const x = innerWidth
      // const y = 0
      // const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      // const transition = document.startViewTransition(async () => {
      document.documentElement.classList.toggle('dark', isDark)
      //   await nextTick()
      // })
      // transition.ready.then(() => {
      //   const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      //   const animate = document.documentElement.animate(
      //     {
      //       clipPath: isDark ? [...clipPath].toReversed() : clipPath,
      //     },
      //     {
      //       duration: 450,
      //       easing: 'ease-in',
      //       pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
      //     }
      //   )
      //   animate.onfinish = () => {
      //     transition.skipTransition()
      //   }
      // })
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
