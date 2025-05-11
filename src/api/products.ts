import axiosInstance from '@/api'

type category = 'doll' | 'model' | 'sticker' | 'figure' | 'flower'

type TProductItem = {
  name: string
  price: number
  imageCover: string
  category: category
  description: string
}

export async function getBestSellerProducts(): Promise<TProductItem[]> {
  const res = await axiosInstance.get('/products/best-seller')
  return res.data.data
}

export async function getAllProducts(params = {}) {
  const res = await axiosInstance.get('/products', { params })
  return res.data.data
}

export async function getProduct(id: string) {
  const res = await axiosInstance.get('/products/' + id)
  return res.data.data
}
