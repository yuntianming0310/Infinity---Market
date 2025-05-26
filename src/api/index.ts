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
    if (error.response?.status === 401 && !error.config._hasErrorHandler) {
      toast.error("You're not logged in yet! Please log in first.")
    }

    const errorResponse = error.response?.data || {
      message: error.message || 'An unexpected error occurred',
      status: 'error',
    }

    return Promise.reject(errorResponse)
  }
)

export default axiosInstance
