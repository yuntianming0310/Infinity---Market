import { TProductItem } from '@/types'
import { useFetchData } from '@/hooks/useFetchData'
import ProductItem from '@/pages/Market/components/ProductItem'
import { getAllProducts } from '@/api/products'

function ProductList() {
  const { data, loading: isLoading } = useFetchData<TProductItem[]>(() =>
    getAllProducts({
      isFeatured: false,
    })
  )

  return (
    <div className='w-full grid grid-cols-2 px-48 py-32 gap-8'>
      {isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='loader'></div>
        </div>
      ) : (
        data?.map(product => (
          <ProductItem
            {...product}
            imageCover={product.imageCover}
            description={product.description}
            name={product.name}
            price={product.price}
            key={product._id}
          />
        ))
      )}
    </div>
  )
}

export default ProductList
