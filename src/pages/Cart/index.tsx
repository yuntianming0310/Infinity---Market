import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowLeft02Icon,
  CheckmarkBadge01Icon,
  Delete02Icon,
} from '@hugeicons/core-free-icons'

import { removeItemFromCart, updateItemInCart } from '@/api/carts'

import TransitionLink from '@/components/TransitionLink'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useCartActions, useCartProducts } from '@/stores/cartStore'

function Index() {
  const products = useCartProducts()

  const totalPrice = products.reduce(
    (prev, cur) => prev + cur.quantity * cur.product.price,
    0
  )

  return (
    <div className='min-h-screen w-screen px-24 py-24'>
      <div className='flex gap-24'>
        {/* Left column for products */}
        <div className='w-2/3'>
          <div className='w-full flex items-center justify-between mb-6 pb-2 border-b border-gray-300 text-gray-400'>
            <span>Product</span>
            <span>Price</span>
          </div>

          <div className='mb-12'>
            {products?.map(item => (
              <CartItemRow key={item.product._id} item={item} />
            ))}
          </div>
        </div>

        {/* Right column with sticky sidebar */}
        <div className='w-1/3'>
          <div className='sticky top-24'>
            <TransitionLink
              to='/market'
              className='border border-gray-300 rounded-2xl mb-8 px-8 py-3 inline-flex items-center justify-center gap-4'
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={24} />
              <span>Back to shopping</span>
            </TransitionLink>

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
                <button className='absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-white'>
                  <HugeiconsIcon icon={CheckmarkBadge01Icon} />
                </button>
              </div>
              <div className='flex items-center justify-between mt-auto pt-12 border-t border-[#ffffff66]'>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className='w-full rounded-lg bg-amber-300 text-[#000000dd] mt-12 py-6 cursor-pointer'>
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CartItemRow({
  item,
}: {
  item: {
    product: {
      category: string
      createdAt: string
      description: string
      imageCover: string
      images: string[]
      isFeatured: boolean
      name: string
      price: number
      tags: string[]
      __v: number
      _id: string
    }
    quantity: number
    updatedAt: string
  }
}) {
  const [qty, setQty] = useState(item.quantity)
  const { updateProductQuantity, removeProduct } = useCartActions()

  const debouncedQty = useDebouncedValue(qty)

  useEffect(() => {
    const update = async () => {
      try {
        await updateItemInCart(item.product._id, debouncedQty)
        updateProductQuantity(item.product._id, debouncedQty)
      } catch {
        setQty(item.quantity)
        toast.error('Failed to update. Please try again later.')
      }
    }

    update()
  }, [debouncedQty])

  const decrease = async () => {
    setQty(prev => (prev > 1 ? prev - 1 : prev))
  }

  const increase = async () => {
    setQty(prev => prev + 1)
  }

  const handleDelete = async () => {
    await removeItemFromCart(item.product._id)
    removeProduct(item.product._id)
  }

  return (
    <div className='grid grid-cols-4 px-12 py-6 place-items-center border-b border-gray-300'>
      <div className='overflow-hidden flex items-center justify-center'>
        <img
          src={item.product.imageCover}
          alt=''
          className='max-w-3/4 aspect-square object-cover'
        />
      </div>

      <div className='w-full text-3xl font-medium text-left'>
        {item.product.name}
      </div>

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

      <div className='flex-1 flex items-center gap-12'>
        <div
          role='button'
          className='p-2 rounded-xl bg-black cursor-pointer'
          onClick={handleDelete}
        >
          <HugeiconsIcon icon={Delete02Icon} size={20} color='#fff' />
        </div>
        <span className='w-[7ch]'>
          ${(qty * item.product.price).toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default Index
