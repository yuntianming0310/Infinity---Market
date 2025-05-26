import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

import { Order } from '@/types'
import { getAllOrders } from '@/api/orders'
import { useFetchData } from '@/hooks/useFetchData'
import OrderItemRow from '@/pages/Order/components/OrderItemRow'

function Index() {
  const lenis = useLenis()
  const { data: orders, loading } = useFetchData<Order[]>(getAllOrders)

  useEffect(() => {
    lenis?.start()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen w-full px-6 py-8 flex items-center justify-center bg-gray-50 md:px-24 md:py-24'>
        <div className='text-xl text-gray-500'>Loading your orders...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full px-6 py-8 bg-gray-50 md:px-24 md:py-24'>
      <div className='w-full flex items-center justify-between mb-6 pb-2 border-b border-gray-300 text-gray-400'>
        <span>Order</span>
        <span>Price</span>
      </div>

      {orders?.length === 0 ? (
        <div className='text-center text-gray-400 py-48'>
          <div className='text-6xl mb-8'>Your order is empty 🛒</div>
          <div className='text-3xl'>
            Start shopping and fill it with awesome items!
          </div>
        </div>
      ) : (
        <div className='mb-12'>
          {orders?.map(order => (
            <OrderItemRow key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Index
