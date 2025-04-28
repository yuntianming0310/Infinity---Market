export type TProductItem = {
  _id: string
  name: string
  description: string
  category?: string
  price: number
  imageCover: string
  images?: string[]
  tags?: string[]
  isFeatured?: boolean
  createdAt?: Date
  __v?: number
}
