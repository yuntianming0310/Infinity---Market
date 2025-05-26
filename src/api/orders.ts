import axiosInstance from '@/api'
import { ShippingAddress } from '@/types'

export async function createNewOrder(shippingAddress: ShippingAddress) {
  const res = await axiosInstance.post('/orders', {
    shippingAddress,
  })
  return res.data
}

export async function getAllOrders() {
  const res = await axiosInstance.get('/orders')
  return res.data.orders
}
