import { ShippingAddress } from '@/types'

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${month}, ${day}, ${year} - ${hours}:${minutes}:${seconds}`
}

export const formatAddress = (address: ShippingAddress) => {
  let formattedAddress = address.address
  if (address.city) formattedAddress += ` ${address.city}`
  if (address.country) formattedAddress += ` ${address.country}`
  return formattedAddress
}
