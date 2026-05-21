import { TinyColor } from '@ctrl/tinycolor'

export const themeColorList = [
  {
    label: '天空蓝',
    value: 'blue',
    color: '#409eff',
  },
  {
    label: '紫罗兰',
    value: 'purple',
    color: '#7166f0',
  },
  {
    label: '樱花粉',
    value: 'pink',
    color: '#e84a6c',
  },
  {
    label: '柠檬黄',
    value: 'yellow',
    color: '#efbd48',
  },
  {
    label: '薄荷绿',
    value: 'green',
    color: '#0bd092',
  },
]

export const useSettingStore = defineStore(
  'setting',
  () => {
    const setting = reactive({
      themeMode: 'light',
      themeColor: 'blue',
    })

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    media.addEventListener('change', () => {
      if (setting.themeMode === 'system') {
        setThemeMode()
      }
    })

    const setThemeMode = () => {
      const isDark = setting.themeMode === 'system' ? media.matches : setting.themeMode === 'dark'
      // const x = window.innerWidth
      // const y = 0
      // const endRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
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

    const setThemeColor = () => {
      const themeColor = themeColorList.find((item) => item.value === setting.themeColor).color
      document.documentElement.style.setProperty('--el-color-primary', themeColor)
      const tc = new TinyColor(themeColor)
      const isDark = setting.themeMode === 'system' ? media.matches : setting.themeMode === 'dark'
      const lightMixColor = isDark ? '#141414' : '#fff'
      const darkMixColor = isDark ? '#fff' : '#000'
      ;[3, 5, 7, 8, 9].forEach((level) => {
        document.documentElement.style.setProperty(
          `--el-color-primary-light-${level}`,
          tc.mix(lightMixColor, level * 10).toHexString()
        )
      })
      document.documentElement.style.setProperty('--el-color-primary-dark-2', tc.mix(darkMixColor, 20).toHexString())
    }

    watchEffect(() => {
      setThemeMode()
      setThemeColor()
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
