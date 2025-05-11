import axiosInstance from '@/api'

export async function createNewOrder() {
  const res = await axiosInstance.post('/orders')
  return res.data
}

export async function getAllOrders() {
  const res = await axiosInstance.get('/orders')
  return res.data.orders
}
