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
}

export type OrderItem = {
  _id: string
  product: TProductItem
  name: string
  price: number
  quantity: number
  review?: Review
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

export type Review = {
  _id: string
  user: {
    _id: string
    name: string
  }
  product: string
  order: string
  orderItem: string
  rating: number
  content: string
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}
