import axios from 'axios'

const instance = axios.create({
  baseURL: location.protocol === 'file:' ? import.meta.env.VITE_APP_API : '/api',
  timeout: 10000,
})

instance.interceptors.response.use(({ data }) => {
  const { code, message } = data
  if (code === 0) {
    return Promise.reject(new Error(message))
  }
  return data
})

export default instance
