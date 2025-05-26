import { useRef } from 'react'

import ParallaxLink from '@/components/ParallaxLink'
import ParallaxImage from '@/components/ParallaxImage'
import TransitionLink from '@/components/TransitionLink'
import DividerWithTitle from '@/components/DividerWithTitle'

import useInteractiveCursor from '../hooks/useInteractiveCursor'
import { useFetchData } from '@/hooks/useFetchData'
import { getBestSellerProducts } from '@/api/products'

/**
 * Type
 */
type category = 'doll' | 'model' | 'sticker' | 'figure' | 'flower'

interface IProductItemProps {
  imgSrc: string
  imgAlt?: string
  category: category
}

type TProductItem = {
  name: string
  price: number
  imageCover: string
  category: category
  description: string
}

/**
 * Component
 */

// Main Comp
function HotProductSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  useInteractiveCursor(containerRef, cursorRef, svgRef, linkRef)

  return (
    <section className='w-full mt-32 px-48 pb-8' ref={containerRef}>
      <Cursor cursorRef={cursorRef} svgRef={svgRef} />

      <DividerWithTitle>
        <span>Buy Good</span>
        <span>Hot Selling</span>
      </DividerWithTitle>

      <BestSellerProductsList />

      <LinkToMarket linkRef={linkRef} />
    </section>
  )
}

// Child Comp
function Cursor({
  cursorRef,
  svgRef,
}: {
  cursorRef: React.RefObject<HTMLDivElement>
  svgRef: React.RefObject<SVGSVGElement>
}) {
  return (
    <div
      ref={cursorRef}
      className='w-96 aspect-square overflow-hidden fixed rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#96f2d780] will-change-contents'
    >
      <svg
        ref={svgRef}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='#333'
        className='w-2/5 aspect-square'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25'
        />
      </svg>
    </div>
  )
}

function BestSellerProductsList() {
  const { data: products, loading: isLoading } = useFetchData<TProductItem[]>(
    getBestSellerProducts
  )

  return (
    <div className='w-full flex items-center justify-center gap-12'>
      {isLoading ? (
        <div className='w-full min-h-[64rem]'></div>
      ) : (
        products?.map(({ name, imageCover, description, category }) => (
          <ProductItem
            key={name}
            imgSrc={imageCover}
            imgAlt={description}
            category={category}
          />
        ))
      )}
    </div>
  )
}

function ProductItem({ imgSrc, imgAlt, category }: IProductItemProps) {
  const CTA: Record<category, string> = {
    doll: 'Cozy Buddy',
    model: 'Build Fun',
    sticker: 'Sticky Joy',
    figure: 'Hero Figure',
    flower: 'Fresh Bloom',
  }

  return (
    <div className='flex-1 h-[64rem] overflow-hidden relative'>
      <ParallaxImage
        src={imgSrc}
        alt={imgAlt ?? 'A picture of the hot selling product'}
      />
      <ParallaxLink
        to='/'
        className='w-2/3 flex items-center justify-around absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-3 bg-cyan-50 rounded-full z-20'
      >
        {CTA[category] ?? 'Buy Now'}
      </ParallaxLink>
    </div>
  )
}

function LinkToMarket({
  linkRef,
}: {
  linkRef: React.RefObject<HTMLAnchorElement>
}) {
  return (
    <div className='flex items-center justify-center'>
      <TransitionLink
        className='text-4xl tracking-wider mt-18 px-2 py-4 relative z-20 group'
        to='/market'
        ref={linkRef}
      >
        View More Products
        <div className='absolute bottom-0 left-0 w-full h-[2px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ease-in-out'></div>
      </TransitionLink>
    </div>
  )
}

export default HotProductSection
