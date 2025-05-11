export type TReview = {
  id: number
  username: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

const reviews: TReview[] = [
  {
    id: 1,
    username: 'XiaoMing',
    rating: 5,
    comment:
      'Great quality, feels nice to the touch, and the packaging was very thoughtful. Worth buying!',
    date: '2025-05-05',
  },
  {
    id: 2,
    username: 'Alice88',
    rating: 4,
    comment:
      'Looks very delicate, but the delivery was a bit slow. Everything else was great.',
    date: '2025-05-04',
  },
  {
    id: 3,
    username: 'LaoWang',
    rating: 3,
    comment:
      "It's average and not quite what I expected, but fair for the price.",
    date: '2025-05-03',
  },
  {
    id: 4,
    username: 'TechCat',
    rating: 5,
    comment:
      'Really love the design. It looks even better in person than in the pictures! Highly recommended!',
    date: '2025-05-02',
  },
]

function RatingAndReviews() {
  return (
    <div className='reviews-section fixed bottom-20 w-full opacity-0 transform translate-y-10'>
      <div className='w-full mx-auto px-4'>
        <div className='text-left relative flex flex-col mb-12  mr-auto px-12'>
          <h2 className='text-6xl font-bold text-slate-800 mb-3'>
            What Our Customers Say
          </h2>
          <p className='text-slate-500 max-w-2xl'>
            Hear from people who have experienced our product and service
            firsthand.
          </p>
        </div>

        <div className='pb-8 -mx-4 px-12'>
          <div className='flex gap-6 w-max min-w-full'>
            {reviews.map(review => (
              <div key={review.id} className='w-80 flex-1 px-4'>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          xmlns='http://www.w3.org/2000/svg'
          className={`h-8 w-8 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-200'
          } `}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 15.934l-6.18 3.245 1.18-6.874L.167 7.7l6.903-1.003L10 .577l2.93 6.12L19.834 7.7l-4.834 4.605 1.18 6.874z'
            clipRule='evenodd'
          />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: TReview }) {
  return (
    <div className='review-card opacity-0 transform translate-y-10 bg-white rounded-2xl shadow-lg p-6 border border-slate-100 h-full flex flex-col'>
      <div className='flex items-start gap-4 mb-4'>
        {/* User Avatar */}
        <div className='avatar h-12 w-12 rounded-full bg-indigo-100 overflow-hidden flex-shrink-0'>
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.username}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center bg-amber-300 text-black font-medium text-2xl'>
              {review.username.charAt(0)}
            </div>
          )}
        </div>

        {/* User Info and Rating */}
        <div className='flex-1'>
          <h4 className='font-semibold text-slate-800 text-2xl'>
            {review.username}
          </h4>
          <div className='flex items-center justify-between mt-1'>
            <RatingStars rating={review.rating} />
            <span className='text-slate-400 text-2xl'>
              {new Date(review.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Quotation Mark */}
      <div className='text-indigo-100 mb-2'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.749.562-1.051.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z' />
        </svg>
      </div>

      {/* Review Comment */}
      <p className='text-slate-600 leading-relaxed mb-6 flex-grow'>
        {review.comment}
      </p>

      {/* Verified Badge if 5 stars */}
      {review.rating === 5 && (
        <div className='flex items-center text-green-600 text-2xl font-medium mt-auto'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 mr-1'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
              clipRule='evenodd'
            />
          </svg>
          Verified Purchase
        </div>
      )}
    </div>
  )
}

export default RatingAndReviews
