import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 60 * 1000,
})
