import axiosInstance from '@/api'

export async function createReview({
  productId,
  orderId,
  orderItemId,
  content = '',
  rating,
}: {
  productId: string
  orderId: string
  orderItemId: string
  content: string
  rating: number
}) {
  const res = await axiosInstance.post('/reviews', {
    product: productId,
    order: orderId,
    orderItem: orderItemId,
    rating,
    content,
  })

  return res.data.data
}
