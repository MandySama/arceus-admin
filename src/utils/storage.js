import Cookies from 'js-cookie'

export const Cookie = {
  set(key, value, expires) {
    if (location.protocol === 'file:') {
      if (expires !== undefined) {
        sessionStorage.removeItem(key)
        expires = new Date(Date.now() + expires * 864e5)
        localStorage.setItem(key, JSON.stringify({ value, expires }))
      } else {
        localStorage.removeItem(key)
        sessionStorage.setItem(key, value)
      }
    } else {
      Cookies.set(key, value, { expires })
    }
  },
  get(key) {
    if (location.protocol === 'file:') {
      const item = JSON.parse(localStorage.getItem(key))
      if (item !== null) {
        const expires = new Date(item.expires).getTime()
        if (Date.now() >= expires) {
          localStorage.removeItem(key)
          return undefined
        } else {
          return item.value
        }
      } else {
        return sessionStorage.getItem(key) ?? undefined
      }
    } else {
      return Cookies.get(key)
    }
  },
  remove(key) {
    if (location.protocol === 'file:') {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  },
}
