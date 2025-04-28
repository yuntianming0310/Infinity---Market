import { useCartActions, useCartProducts } from '@/stores/cartStore'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface IProductDescriptionProps {
  id: string
  name: string
  description: string
  price: number
  imageCover: string
}

function ProductDescription({
  id,
  name,
  description,
  price,
  imageCover,
}: IProductDescriptionProps) {
  const [count, setCount] = useState(1)
  const { addProduct } = useCartActions()
  const products = useCartProducts()

  function handleIncreaseProductCounts() {
    if (count >= 15) {
      // TODO
      return
    }

    setCount(prev => prev + 1)
  }

  function handleDecreaseProductCounts() {
    if (count <= 1) {
      // TODO
      return
    }

    setCount(prev => prev - 1)
  }

  function handleAddToCart() {
    const product = {
      id,
      name,
      price,
      quantity: count,
      imageCover,
    }

    toast.success('Successfully Added')
  }

  return (
    <div className='flex-1/4 flex flex-col justify-center items-start'>
      <span className='font-Cinzel font-semibold text-6xl mb-12'>
        {price} ¥
      </span>
      <h1 className='text-6xl font-semibold mb-12'>{name}</h1>
      <p className='leading-loose text-2xl'>{description}</p>

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
