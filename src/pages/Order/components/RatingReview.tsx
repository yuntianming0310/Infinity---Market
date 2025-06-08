import { useState } from 'react'
import toast from 'react-hot-toast'
import { Star, Send } from 'lucide-react'

import { createReview as createReviewApi } from '@/api/review'
import { useFetchFn } from '@/hooks/useFetchFn'
import { TProductItem } from '@/types'

interface RatingReviewProps {
  product: TProductItem
  orderId: string
  orderItemId: string
  onCloseModal: () => void
  onReviewSubmit: () => void
}

function RatingReview({
  product,
  orderId,
  orderItemId,
  onCloseModal,
  onReviewSubmit,
}: RatingReviewProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')

  const { fn: createReview, loading: isSubmitting } = useFetchFn(
    createReviewApi,
    {
      onSuccess() {
        toast.success(
          'Review submitted successfully! Thank you for your feedback!'
        )
        onReviewSubmit()
        onCloseModal()
      },
      onError() {
        toast.error('Failed to submit review. Please try again later.')
      },
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) return

    await createReview({
      productId: product._id,
      orderId,
      orderItemId,
      rating,
      content: review.trim(),
    })

    // Reset form after submission
    setRating(0)
    setReview('')
  }

  const StarRating = () => {
    return (
      <div className='flex items-center gap-2 mb-4'>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type='button'
            className='group transition-all duration-200 hover:scale-110'
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          >
            <Star
              size={24}
              className={`transition-all duration-200 ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
        <span className='ml-3.5 text-[1.4rem] text-gray-600 font-medium'>
          {rating > 0 && (
            <span>
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </span>
          )}
        </span>
      </div>
    )
  }

  return (
    <div className='flex w-full h-full'>
      {/* Product Image Section */}
      <div className='w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-l-lg p-10 flex items-center justify-center'>
        <div className='w-full h-full max-h-9/12 flex items-center justify-center relative'>
          <img
            src={product.imageCover}
            alt={product.name}
            className='max-w-full max-h-full object-contain bg-transparent transition-transform duration-300 hover:scale-110'
          />
          {/* Decorative elements */}
          <div className='absolute top-3 left-3 w-18 h-18 bg-yellow-200 rounded-full opacity-20 blur-xl'></div>
          <div className='absolute bottom-3 right-3 w-16 h-16 bg-blue-200 rounded-full opacity-20 blur-xl'></div>
        </div>
      </div>

      {/* Review Form Section */}
      <div className='w-2/3 p-8 flex flex-col justify-between'>
        <div className='space-y-7'>
          {/* Header */}
          <div className='space-y-2'>
            <h2 className='text-5xl font-bold text-gray-800'>
              Share Your Experience
            </h2>
            <p className='text-gray-600 font-medium text-xl'>{product.name}</p>
            <p className='text-xl text-gray-500'>
              Your feedback helps other customers make informed decisions
            </p>
          </div>

          {/* Rating Section */}
          <div>
            <label className='block text-2xl font-semibold text-gray-700 mb-3'>
              Rate this product
            </label>
            <StarRating />
          </div>

          {/* Review Text Area */}
          <div>
            <label
              htmlFor='review'
              className='block text-2xl font-semibold text-gray-700 mb-3'
            >
              Write your review
            </label>
            <textarea
              id='review'
              value={review}
              onChange={e => setReview(e.target.value)}
              placeholder='Tell us about your experience with this product...'
              className='w-full h-30 px-5 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white text-xl'
              maxLength={500}
            />
            <div className='flex justify-between items-center mt-2'>
              <span className='text-lg text-gray-500'>
                {review.length}/500 characters
              </span>
              <span className='text-lg text-gray-400'>
                Optional but helpful
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='space-y-5 mt-4'>
          {/* Submit Buttons */}
          <div className='flex gap-5'>
            <button
              type='button'
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
              className='flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6.5 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed! transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none text-[1.4rem]'
            >
              {isSubmitting ? (
                <>
                  <div className='w-6.5 h-6.5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Review
                </>
              )}
            </button>

            <button
              type='button'
              onClick={onCloseModal}
              className='px-6.5 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 text-[1.4rem]'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RatingReview
