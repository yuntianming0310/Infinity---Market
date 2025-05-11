import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'

import { useCartProducts } from '@/stores/cartStore'

import TransitionLink from '@/components/TransitionLink'
import CartItemRow from '@/pages/Cart/components/CartItemRow'
import OrderSection from '@/pages/Cart/components/OrderSection'

function Index() {
  const products = useCartProducts()

  const totalPrice = products.reduce(
    (prev, cur) => prev + cur.quantity * cur.product.price,
    0
  )

  return (
    <div className='min-h-screen w-screen px-24 py-24'>
      <div className='flex gap-24'>
        <div className='w-2/3'>
          <div className='w-full flex items-center justify-between mb-6 pb-2 border-b border-gray-300 text-gray-400'>
            <span>Product</span>
            <span>Price</span>
          </div>

          {products.length === 0 ? (
            <div className='text-center text-gray-400 py-48'>
              <div className='text-6xl mb-8'>Your cart is empty 🛒</div>
              <div className='text-3xl'>
                Start shopping and fill it with awesome items!
              </div>
            </div>
          ) : (
            <div className='mb-12'>
              {products.map(item => (
                <CartItemRow key={item.product._id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div className='w-1/3'>
          <div className='sticky top-24'>
            <TransitionLink
              to='/market'
              className='border border-gray-300 rounded-2xl mb-8 px-8 py-3 inline-flex items-center justify-center gap-4'
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={24} />
              <span>Back to shopping</span>
            </TransitionLink>

            <OrderSection totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
