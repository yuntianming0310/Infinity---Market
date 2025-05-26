import confetti from 'canvas-confetti'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { createNewOrder } from '@/api/orders'
import { useCartActions } from '@/stores/cartStore'
import { ShippingAddress } from '@/types'

function OrderSection({ totalPrice }: { totalPrice: number }) {
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  })
  const { isCartEmpty } = useCartActions()

  function handleAddressChange(field: keyof ShippingAddress, value: string) {
    setShippingAddress((prev: ShippingAddress) => ({
      ...prev,
      [field]: value,
    }))
  }

  function clearShippingAddress() {
    setShippingAddress({
      address: '',
      city: '',
      postalCode: '',
      country: '',
    })
  }

  return (
    <div className='w-full h-[60rem] flex flex-col text-3xl px-12 py-16 rounded-2xl bg-blue-700 text-white'>
      <h2 className='text-4xl pb-12 border-b border-[#ffffff66]'>
        Order Summary
      </h2>

      <div className='flex items-center justify-between mt-8 pb-8 text-[#ffffffcc] border-b border-[#ffffff66]'>
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      {/* Shipping Address Section */}
      <div className='mt-12 pb-8'>
        <div className='flex items-center mb-6'>
          <span>Shipping Address</span>
        </div>

        <div className='space-y-4'>
          <input
            type='text'
            placeholder='Street Address'
            disabled={isCartEmpty}
            value={shippingAddress.address}
            onChange={e => handleAddressChange('address', e.target.value)}
            className='w-full h-14 px-4 py-2 rounded-lg text-2xl bg-blue-600 placeholder:text-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed'
          />

          <div className='grid grid-cols-2 gap-4'>
            <input
              type='text'
              placeholder='City'
              disabled={isCartEmpty}
              value={shippingAddress.city}
              onChange={e => handleAddressChange('city', e.target.value)}
              className='w-full h-14 px-4 py-2 rounded-lg text-2xl bg-blue-600 placeholder:text-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed'
            />
            <input
              type='text'
              placeholder='Postal Code'
              disabled={isCartEmpty}
              value={shippingAddress.postalCode}
              onChange={e => handleAddressChange('postalCode', e.target.value)}
              className='w-full h-14 px-4 py-2 rounded-lg text-2xl bg-blue-600 placeholder:text-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed'
            />
          </div>

          <input
            type='text'
            placeholder='Country'
            disabled={isCartEmpty}
            value={shippingAddress.country}
            onChange={e => handleAddressChange('country', e.target.value)}
            className='w-full h-14 px-4 py-2 rounded-lg text-2xl bg-blue-600 placeholder:text-[#ffffff80] focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed'
          />
        </div>
      </div>

      <div className='flex items-center justify-between mt-auto pt-12 border-t border-[#ffffff66]'>
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <CheckOutButton
        isCartEmpty={isCartEmpty}
        shippingAddress={shippingAddress}
        onClearAddress={clearShippingAddress}
      />
    </div>
  )
}

function CheckOutButton({
  isCartEmpty,
  shippingAddress,
  onClearAddress,
}: {
  isCartEmpty: boolean
  shippingAddress: ShippingAddress
  onClearAddress: () => void
}) {
  const emojiShapes = useRef<confetti.Shape[]>([])
  const { clearCart } = useCartActions()

  const emojis = ['🛍️', '🧸', '💐', '📚', '👔']

  useEffect(() => {
    emojiShapes.current = emojis.map(emoji =>
      confetti.shapeFromText({ text: emoji, scalar: 1.6 })
    )
  }, [])

  const fireEmoji = (side: 'left' | 'right') => {
    emojiShapes.current.forEach(shape => {
      confetti({
        particleCount: 20,
        angle: side === 'left' ? 60 : 120,
        origin: { x: side === 'left' ? 0 : 1, y: 0.8 },
        shapes: [shape],
        spread: 80,
        startVelocity: 50,
        ticks: 300,
        gravity: 0.7,
        decay: 0.9,
        drift: side === 'left' ? 1 : -1,
        scalar: 1.6,
      })
    })
  }

  const fireConfetti = (side: 'left' | 'right') => {
    confetti({
      particleCount: 110,
      angle: side === 'left' ? 60 : 120,
      origin: { x: side === 'left' ? 0 : 1, y: 0.8 },
      shapes: ['square', 'circle'],
      spread: 80,
      startVelocity: 50,
      ticks: 300,
      gravity: 0.7,
      decay: 0.88,
      scalar: 1.2,
      colors: ['#FFC107', '#03A9F4', '#E91E63', '#4CAF50', '#FF5722'],
      drift: side === 'left' ? 1 : -1,
    })
  }

  const isAddressComplete = () => {
    return (
      shippingAddress.address?.trim() !== '' &&
      shippingAddress.city?.trim() !== '' &&
      shippingAddress.postalCode?.trim() !== '' &&
      shippingAddress.country?.trim() !== ''
    )
  }

  const handleClick = () => {
    if (!isAddressComplete()) {
      toast.error('Please fill in all shipping address fields')
      return
    }

    toast
      .promise(createNewOrder(shippingAddress), {
        loading: 'Hang tight — placing your order...',
        success: 'Boom! Order confirmed 🎉',
        error: err => err.message || 'Oops, something went wrong 😢',
      })
      .then(() => {
        clearCart()
        onClearAddress()

        fireConfetti('left')
        fireConfetti('right')
        setTimeout(() => {
          fireEmoji('left')
          fireEmoji('right')
        }, 350)
      })
  }

  return (
    <button
      className='w-full rounded-lg mt-12 py-6 transition-all duration-200 bg-amber-300 text-[#000000dd] cursor-pointer hover:bg-amber-400 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed'
      onClick={handleClick}
      disabled={isCartEmpty || !isAddressComplete()}
    >
      Proceed to checkout
    </button>
  )
}

export default OrderSection
