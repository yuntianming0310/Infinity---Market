export type TProductItem = {
  _id: string
  name: string
  description: string
  category: string
  price: number
  imageCover: string
  images: string[]
  tags: string[]
  isFeatured: boolean
  createdAt: string
  __v: number
}

export type OrderItem = {
  product: TProductItem
  name: string
  price: number
  quantity: number
}

export type ShippingAddress = {
  address: string
  city: string
  postalCode: string
  country: string
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export type Order = {
  _id: string
  user: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  shippingAddress?: ShippingAddress
  paymentMethod: string
  paidAt?: string
  createdAt: string
}
