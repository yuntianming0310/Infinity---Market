import { useState } from 'react'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft02Icon,
  CheckmarkBadge01Icon,
  Delete02Icon,
} from '@hugeicons/core-free-icons'
import { useCartProducts } from '@/stores/cartStore'
import TransitionLink from '@/components/TransitionLink'

interface ICartItemRowProps {
  name: string
  imageCover: string
  quantity: number
  price: number
}

function Index() {
  const products = useCartProducts()

  return (
    <div>
      <div className='fixed top-0 w-screen h-screen flex gap-24 px-24 py-24 overflow-y-scroll'>
        <div className='flex flex-col'>
          <div className='w-full flex items-center justify-between mb-24 pb-2 border-b border-gray-300 text-gray-400'>
            <span>Product</span>
            <span>Price</span>
          </div>

          {products.map(item => (
            <CartItemRow key={item.name} {...item} />
          ))}

          <TransitionLink
            to='/market'
            className='border border-gray-300 rounded-2xl mt-24 px-8 py-3 place-self-end cursor-pointer flex items-center justify-center gap-4'
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={24} />
            <span>Back to shopping</span>
          </TransitionLink>
        </div>

        <div className='w-1/2 flex flex-col text-3xl px-12 py-16 rounded-2xl bg-blue-700 text-white'>
          <h2 className='text-4xl pb-12 border-b border-[#ffffff66]'>
            Order Summary
          </h2>

          <div className='flex items-center justify-between mt-8 pb-8 text-[#ffffffcc] border-b border-[#ffffff66]'>
            <span>Subtotal</span>
            <span>$1200.00</span>
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
            <button className='absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-white'>
              <HugeiconsIcon icon={CheckmarkBadge01Icon} />
            </button>
          </div>

          <div className='flex items-center justify-between mt-auto pt-12 border-t border-[#ffffff66]'>
            <span>Total</span>
            <span>$1270.00</span>
          </div>

          <button className='w-full rounded-lg bg-amber-300 text-[#000000dd] mt-12 py-6 cursor-pointer'>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  )
}

function CartItemRow({ imageCover, name, quantity, price }: ICartItemRowProps) {
  const [qty, setQty] = useState(quantity)

  const decrease = () => {
    if (qty > 1) {
      setQty(prev => prev - 1)
    }
  }

  const increase = () => {
    setQty(prev => prev + 1)
  }

  return (
    <div className='grid grid-cols-4 px-12 py-6 place-items-center border-b border-gray-300'>
      <div className='overflow-hidden flex items-center justify-center'>
        <img
          src={imageCover}
          alt=''
          className='max-w-3/4 aspect-square object-cover'
        />
      </div>

      <div className='text-3xl font-medium'>{name}</div>

      <div className='flex items-center justify-center font-medium p-4'>
        <div className='flex items-center border border-gray-200 rounded-xl px-1 py-1'>
          <button
            onClick={decrease}
            className='w-8 h-8 flex items-center justify-center text-gray-800 cursor-pointer focus:outline-none'
          >
            <span className='text-xl'>-</span>
          </button>

          <div className='w-8 text-center text-gray-800 mx-2'>{qty}</div>

          <button
            onClick={increase}
            className='w-8 h-8 flex items-center justify-center text-gray-800 cursor-pointer focus:outline-none'
          >
            <span className='text-xl'>+</span>
          </button>
        </div>
      </div>

      <div className='flex items-center gap-12'>
        <div role='button' className='p-2 rounded-xl bg-black cursor-pointer'>
          <HugeiconsIcon icon={Delete02Icon} size={20} color='#fff' />
        </div>
        <span>${quantity * price}.00</span>
      </div>
    </div>
  )
}

export default Index
