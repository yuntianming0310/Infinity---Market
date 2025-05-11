import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Delete02Icon } from '@hugeicons/core-free-icons'

import { useCartActions } from '@/stores/cartStore'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { removeItemFromCart, updateItemInCart } from '@/api/carts'

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

export default CartItemRow
