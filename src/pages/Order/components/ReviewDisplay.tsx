import { Star } from 'lucide-react'
import { TProductItem, Review } from '@/types'
import { formatDate } from '@/pages/Order/utils'

interface ReviewDisplayProps {
  product: TProductItem
  review: Review
}

function ReviewDisplay({ product, review }: ReviewDisplayProps) {
  const StarRating = () => {
    return (
      <div className='flex items-center gap-2 mb-4'>
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={24}
            className={`${
              star <= review.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className='ml-3.5 text-[1.4rem] text-gray-600 font-medium'>
          {review.rating === 1 && 'Poor'}
          {review.rating === 2 && 'Fair'}
          {review.rating === 3 && 'Good'}
          {review.rating === 4 && 'Very Good'}
          {review.rating === 5 && 'Excellent'}
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
          <div className='absolute top-3 left-3 w-18 h-18 bg-yellow-200 rounded-full opacity-20 blur-xl'></div>
          <div className='absolute bottom-3 right-3 w-16 h-16 bg-blue-200 rounded-full opacity-20 blur-xl'></div>
        </div>
      </div>

      {/* Review Display Section */}
      <div className='w-2/3 p-8 flex flex-col'>
        <div className='space-y-7'>
          {/* Header */}
          <div className='space-y-2'>
            <h2 className='text-5xl font-bold text-gray-800'>Your Review</h2>
            <p className='text-gray-600 font-medium text-xl'>{product.name}</p>
            <p className='text-xl text-gray-500'>
              Posted on {formatDate(review.createdAt)}
            </p>
          </div>

          {/* Rating Display */}
          <div>
            <label className='block text-2xl font-semibold text-gray-700 mb-3'>
              Your Rating
            </label>
            <StarRating />
          </div>

          {/* Review Content */}
          <div>
            <label className='block text-2xl font-semibold text-gray-700 mb-3'>
              Your Comment
            </label>
            <div className='w-full min-h-[120px] px-5 py-3 border border-gray-200 rounded-lg bg-gray-50 text-xl'>
              {review.content || 'No written review provided.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewDisplay
