import axios from 'axios'

import { useMessage } from '@/hooks/message'

import { Cookie } from '@/utils/storage'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: location.protocol === 'file:' ? import.meta.env.VITE_APP_API : '/api',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  if (Cookie.get('token') !== undefined) {
    config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`
  }
  return config
})

instance.interceptors.response.use(({ data }) => {
  const { code, message } = data
  if (code === 0) {
    useMessage().error(message)
    return Promise.reject(new Error(message))
  }
  return data
})

export default instance
