import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Star } from 'lucide-react'

import { Order } from '@/types'
import { formatAddress, formatDate } from '@/pages/Order/utils'
import Modal from '@/components/Modal'
import RatingReview from '@/pages/Order/components/RatingReview'
import ReviewDisplay from '@/pages/Order/components/ReviewDisplay'

interface OrderItemRowProps {
  order: Order
  onReviewSubmit: () => void
}

function OrderItemRow({ order, onReviewSubmit }: OrderItemRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const detailsRef = useRef(null)
  const contentRef = useRef(null)

  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (detailsRef.current) {
      gsap.set(detailsRef.current, { height: 0 })

      tl.current = gsap
        .timeline({ paused: true })
        .to(detailsRef.current, {
          height: 'auto',
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          detailsRef.current,
          {
            opacity: 1,
            ease: 'power2.out',
          },
          0.1
        )
    }

    return () => {
      if (tl.current) {
        tl.current.kill()
      }
    }
  }, [])

  useEffect(() => {
    if (tl.current) {
      if (isExpanded) {
        tl.current.play()
      } else {
        tl.current.reverse()
      }
    }
  }, [isExpanded])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const visibleItems = order.items.slice(0, 3)
  const hasMoreItems = order.items.length > 3

  return (
    <div className='mb-6 border-b border-gray-300'>
      <div className='flex items-center justify-between py-4'>
        <div className='flex items-center space-x-2'>
          {visibleItems.map(item => (
            <div
              key={item.name}
              className='w-64 aspect-square flex items-center justify-center'
            >
              <img
                src={item.product.imageCover}
                alt='image of product'
                className='max-w-full max-h-full object-cover'
              />
            </div>
          ))}
          {hasMoreItems && (
            <div className='text-gray-400'>
              {order.items.length - 3} more item...
            </div>
          )}
        </div>

        <div className='flex items-center space-x-4'>
          <span className=''>${order.totalAmount.toFixed(2)}</span>
          <button
            className='p-1'
            onClick={toggleExpand}
            aria-label={
              isExpanded ? 'Collapse order details' : 'Expand order details'
            }
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <div ref={detailsRef} className='overflow-hidden mt-8 opacity-0'>
        <div ref={contentRef} className='pb-4'>
          <div className='grid grid-cols-5 place-items-center text-3xl font-medium'>
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Total Price</span>
            <span>Rating & Review</span>
          </div>
          {order.items.map(item => (
            <div
              key={item.name}
              className='grid grid-cols-5 items-center place-items-center'
            >
              <div className='flex items-center space-x-4'>
                <div className='w-64 aspect-square flex items-center justify-center'>
                  <img
                    src={item.product.imageCover}
                    alt='image of product'
                    className='max-w-full max-h-full object-cover'
                  />
                </div>
              </div>

              <div>{item.quantity}</div>

              <div>${item.price.toFixed(2)}</div>

              <div>${(item.price * item.quantity).toFixed(2)}</div>

              <div>
                <Modal.Open opens={`review-${item._id}`}>
                  {({ onOpenWindow }) => (
                    <button
                      className={`
        text-[1.6rem] font-medium
        transition-all duration-300
        rounded-lg px-6 py-3
        transform hover:scale-105
        flex items-center gap-2
        ${
          item.review
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 hover:from-blue-100 hover:to-indigo-100 border border-indigo-100'
            : 'bg-gradient-to-r from-amber-300 to-orange-300 text-[#000000dd] hover:from-amber-400 hover:to-orange-400 shadow-sm hover:shadow-md'
        }
      `}
                      onClick={onOpenWindow}
                    >
                      {item.review ? (
                        <>
                          <Star className='w-5 h-5 fill-indigo-500' />
                          View Review
                        </>
                      ) : (
                        <>
                          <Star className='w-5 h-5' />
                          Leave a Review
                        </>
                      )}
                    </button>
                  )}
                </Modal.Open>
              </div>
            </div>
          ))}

          {order.items.map(item => (
            <Modal.Window key={item._id} name={`review-${item._id}`}>
              {({ onCloseModal }) =>
                item.review ? (
                  <ReviewDisplay product={item.product} review={item.review} />
                ) : (
                  <RatingReview
                    product={item.product}
                    orderId={order._id}
                    orderItemId={item._id}
                    onCloseModal={onCloseModal}
                    onReviewSubmit={onReviewSubmit}
                  />
                )
              }
            </Modal.Window>
          ))}

          <div className='mt-8 px-56'>
            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>total price</span>
              <span className='font-medium'>
                ${order.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>place time</span>
              <span>{formatDate(order.paidAt!)}</span>
            </div>

            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>address</span>
              <span>{formatAddress(order.shippingAddress!)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderItemRow
