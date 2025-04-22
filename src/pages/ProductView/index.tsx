import { useLocation, useNavigate } from 'react-router'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'

import { TProductItem } from '@/types'
import { useFetchData } from '@/hooks/useFetchData'

import ProductDescription from '@/pages/ProductView/components/ProductDescription'

function Index() {
  const location = useLocation()
  const navigate = useNavigate()
  const { id, imageCover } = location.state

  const { data } = useFetchData<TProductItem>('/products/' + id)
  const { name, description, price } = data || {}

  return (
    <div className='w-full h-screen flex pr-48 relative'>
      <div className='absolute top-1/12 left-[8%]'>
        <span className='text-2xl text-zinc-400 tracking-wide'>
          Back to Market
        </span>
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          width={64}
          size={52}
          className='cursor-pointer'
          onClick={() => navigate(-1)}
        />
      </div>

      <div className='flex-3/4 flex justify-center items-center'>
        <img
          src={imageCover}
          className='max-w-2/3 object-contain'
          alt={`View image of product ${name}`}
        />
      </div>

      <ProductDescription
        id={id}
        name={name ?? ''}
        description={description ?? ''}
        price={price ?? 0}
      />
    </div>
  )
}

export default Index
