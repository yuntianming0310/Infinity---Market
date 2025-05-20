import gsap from 'gsap'
import { useState, useRef } from 'react'

import Select from '@/components/Select'
import Empty from '@/pages/Market/components/Empty'
import ProductItem from '@/pages/Market/components/ProductItem'

import { useFetchData } from '@/hooks/useFetchData'

import { useGSAP } from '@gsap/react'
import { TProductItem } from '@/types'
import { getAllProducts } from '@/api/products'
import { options } from '@/pages/Market/utils'

function ProductList() {
  const [category, setCategory] = useState<string>('all')
  const [search, setSearch] = useState<string>('')
  const searchRef = useRef<HTMLInputElement>(null)
  const selectRef = useRef<HTMLDivElement>(null)

  const { data, loading: isLoading } = useFetchData<TProductItem[]>(() =>
    getAllProducts({
      isFeatured: false,
    })
  )

  const filteredData = data?.filter(product => {
    const matchCategory = category === 'all' || product.category === category
    const matchSearch =
      search === '' ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())

    return matchCategory && matchSearch
  })

  useGSAP(() => {
    gsap.to(searchRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay: 0.8,
      ease: 'power3.out',
    })

    gsap.fromTo(
      selectRef.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 1,
        ease: 'power3.out',
      }
    )
  })

  return (
    <div className='w-full grid grid-cols-2 px-48 py-32 gap-8'>
      <div className='w-full col-span-2 text-2xl flex items-center justify-end gap-12'>
        <input
          ref={searchRef}
          type='text'
          value={search}
          placeholder='Search...'
          onChange={e => setSearch(e.target.value)}
          className='w-1/3 bg-transparent border-b border-black py-2 px-1 
            focus:outline-none focus:border-black/20 transition-all duration-300
            opacity-0'
        />
        <div ref={selectRef} className='opacity-0'>
          <Select
            options={options}
            onChange={e => setCategory(e.target.value)}
            value={category}
          />
        </div>
      </div>

      {isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='loader'></div>
        </div>
      ) : !filteredData?.length ? (
        <Empty />
      ) : (
        filteredData?.map(product => (
          <ProductItem {...product} key={product._id} />
        ))
      )}
    </div>
  )
}

export default ProductList
