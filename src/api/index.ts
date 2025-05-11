import axios from 'axios'
import toast from 'react-hot-toast'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60 * 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // Handle auth errors (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      // Handle unauthorized error (e.g., redirect to login)
      toast.error("You're not logged in yet! Please log in first.")
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
