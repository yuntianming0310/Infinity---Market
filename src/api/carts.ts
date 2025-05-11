import axiosInstance from '@/api'

export async function getCartInfo() {
  const res = await axiosInstance.get('/carts')
  return res.data.data
}

export async function addItemToCart(productId: string, quantity: number = 1) {
  const res = await axiosInstance.post(`/carts/${productId}`, { quantity })
  return res
}

export async function updateItemInCart(productId: string, quantity: number) {
  const res = await axiosInstance.patch(`/carts/${productId}`, { quantity })
  return res
}

export async function removeItemFromCart(productId: string) {
  const res = await axiosInstance.delete(`/carts/${productId}`)
  return res
}
