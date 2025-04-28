import { useLocation } from 'react-router'

import { TProductItem } from '@/types'
import { useFetchData } from '@/hooks/useFetchData'

import BackToMarket from '@/pages/ProductView/components/BackToMarket'
import ProductDescription from '@/pages/ProductView/components/ProductDescription'

function Index() {
  const location = useLocation()
  const { id, imageCover } = location.state

  const { data } = useFetchData<TProductItem>('/products/' + id)
  const { name, description, price } = data || {}

  return (
    <div className='w-full h-screen flex pr-48 relative'>
      <BackToMarket />

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
        imageCover={imageCover}
      />
    </div>
  )
}

export default Index
