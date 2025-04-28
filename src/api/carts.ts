import { axiosInstance } from '@/api'

export async function getCartInfo() {
  const res = await axiosInstance.get('/carts')

  return res
}
