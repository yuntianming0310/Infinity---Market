import { BadgeCheck } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { createNewOrder } from '@/api/orders'
import { useCartActions } from '@/stores/cartStore'

function OrderSection({ totalPrice }: { totalPrice: number }) {
  return (
    <div className='w-full h-[60rem] flex flex-col text-3xl px-12 py-16 rounded-2xl bg-blue-700 text-white'>
      <h2 className='text-4xl pb-12 border-b border-[#ffffff66]'>
        Order Summary
      </h2>

      <div className='flex items-center justify-between mt-8 pb-8 text-[#ffffffcc] border-b border-[#ffffff66]'>
        <span>Subtotal</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className='flex items-center justify-between mt-24'>
        <span>Add a coupon</span>
        <button className='w-12 aspect-square bg-white text-black rounded-full relative'>
          <span className='absolute top-[47%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer leading-0'>
            -
          </span>
        </button>
      </div>

      <div className='relative w-full mt-12'>
        <input
          type='text'
          placeholder='Enter your code'
          className='w-full h-16 px-4 pr-12 py-2 rounded-lg text-2xl bg-blue-600 placeholder:text-[#ffffff80] focus:outline-none'
        />
        <button className='absolute right-3 top-1/2 cursor-pointer -translate-y-1/2'>
          <BadgeCheck strokeWidth={1.5} size={28} />
        </button>
      </div>

      <div className='flex items-center justify-between mt-auto pt-12 border-t border-[#ffffff66]'>
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <CheckOutButton />
    </div>
  )
}

function CheckOutButton() {
  const emojiShapes = useRef<confetti.Shape[]>([])
  const { clearCart } = useCartActions()

  const emojis = ['🛍️', '🧸', '💐', '📚', '🏀']

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

  const handleClick = () => {
    toast
      .promise(createNewOrder(), {
        loading: 'Hang tight — placing your order...',
        success: 'Boom! Order confirmed 🎉',
        error: 'Oops, something went wrong 😢',
      })
      .then(() => {
        clearCart()

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
      className='w-full rounded-lg bg-amber-300 text-[#000000dd] mt-12 py-6 cursor-pointer'
      onClick={handleClick}
    >
      Proceed to checkout
    </button>
  )
}

export default OrderSection
