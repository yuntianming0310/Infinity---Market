import { TProductItem } from '@/types'
import { useFetchData } from '@/hooks/useFetchData'

import ProductItem from '@/pages/Market/components/ProductItem'

function ProductList() {
  const { data, isLoading } = useFetchData<TProductItem[]>('/products', {
    params: {
      isFeatured: false,
    },
  })

  return (
    <div className='w-full grid grid-cols-2 px-48 py-32 gap-8'>
      {isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='loader'></div>
        </div>
      ) : (
        data?.map(product => (
          <ProductItem
            _id={product._id}
            imageCover={product.imageCover}
            description={product.description}
            name={product.name}
            price={product.price}
            key={product.name}
          />
        ))
      )}
    </div>
  )
}

export default ProductList
