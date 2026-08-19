import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
})

instance.interceptors.response.use((res) => {
  const { code, data, message } = res.data
  if (code === 500) {
    ElMessage({
      message,
      type: 'error',
    })
    return Promise.reject(new Error(message))
  }
  return data
})

export default instance
