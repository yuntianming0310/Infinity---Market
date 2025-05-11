import { useState } from 'react'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import { addItemToCart } from '@/api/carts'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { useCartActions } from '@/stores/cartStore'
import { TProductItem } from '@/types'

function ProductDescription({ product }: { product: TProductItem }) {
  const [count, setCount] = useState(1)
  const { addProduct } = useCartActions()

  function handleIncreaseProductCounts() {
    setCount(prev => prev + 1)
  }

  function handleDecreaseProductCounts() {
    setCount(prev => (prev > 1 ? prev - 1 : prev))
  }

  const handleAddToCart = useDebouncedCallback(async () => {
    try {
      await addItemToCart(product._id, count)
      addProduct({
        product,
        quantity: count,
      })
      toast.success('Successfully Added')
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status !== 401) {
          toast.error(err.message)
        }
      } else {
        toast.error('An unexpected error occurred.')
      }
    }
  }, 500)

  return (
    <div className='flex-1/4 flex flex-col justify-center items-start product-desc'>
      <span className='font-Cinzel font-semibold text-6xl mb-12'>
        {product.price} $
      </span>
      <h1 className='text-6xl font-semibold mb-12'>{product.name}</h1>
      <p className='leading-loose text-2xl'>{product.description}</p>

      <span className='mt-18 text-2xl text-zinc-400 tracking-wide'>Amount</span>
      <div className='flex items-center justify-center mt-2'>
        <span className='w-[3ch] font-Cinzel font-semibold text-3xl mr-8'>
          {String(count).padStart(2, '0')}
        </span>

        <button
          className='cursor-pointer w-10 aspect-square rounded-full mr-4'
          style={{
            boxShadow: '0 4px 9px rgba(0, 0, 0, 0.2)',
          }}
          onClick={handleIncreaseProductCounts}
        >
          +
        </button>
        <button
          className='cursor-pointer w-10 aspect-square rounded-full'
          style={{
            boxShadow: '0 4px 9px rgba(0, 0, 0, 0.2)',
          }}
          onClick={handleDecreaseProductCounts}
        >
          -
        </button>
      </div>

      <button
        className='uppercase cursor-pointer font-semibold rounded-full px-24 py-4 bg-amber-300 mt-18'
        style={{
          boxShadow: '0 4px 9px rgb(229, 193, 65)',
        }}
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  )
}

export default ProductDescription
