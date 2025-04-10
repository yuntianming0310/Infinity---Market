import { useRef } from 'react'
import { Link } from 'react-router-dom'

import ParallaxImage from '@/components/ParallaxImage'
import ParallaxLink from '@/components/ParallaxLink'
import DividerWithTitle from '@/components/DividerWithTitle'

import useInteractiveCursor from '../hooks/useInteractiveCursor'

interface IProductItemProps {
  imgSrc: string
  imgAlt?: string
  btnText?: string
}

function HotProductSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const linkRef = useRef<HTMLAnchorElement>(null)

  useInteractiveCursor(containerRef, cursorRef, svgRef, linkRef)

  return (
    <section className='w-full mt-32 pb-8' ref={containerRef}>
      <Cursor cursorRef={cursorRef} svgRef={svgRef} />

      <DividerWithTitle>
        <span>Buy Good</span>
        <span>Hot Selling</span>
      </DividerWithTitle>

      <div className='w-full flex items-center justify-center gap-12'>
        <ProductItem imgSrc='flower.jpg' />
        <ProductItem imgSrc='flower.jpg' />
        <ProductItem imgSrc='flower.jpg' />
      </div>

      <LinkToMarket linkRef={linkRef} />
    </section>
  )
}

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
      className='w-3xs h-64 overflow-hidden fixed rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#96f2d780] will-change-contents'
    >
      <svg
        ref={svgRef}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='#333'
        className='w-32 h-32'
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

function ProductItem({ imgSrc, imgAlt, btnText }: IProductItemProps) {
  return (
    <div className='flex-1 overflow-hidden relative'>
      <ParallaxImage
        src={imgSrc}
        alt={imgAlt ?? 'A picture of the hot selling product'}
      />
      <ParallaxLink
        to='/'
        className='w-2/3 flex items-center justify-around absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-3 bg-cyan-50 rounded-full z-20'
      >
        {btnText ?? 'Buy Now'}
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
      <Link
        className='text-4xl tracking-wider mt-18 px-2 py-4 relative z-20 group'
        to='/market'
        ref={linkRef}
      >
        View More Products
        <div className='absolute bottom-0 left-0 w-full h-[2px] bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-600 ease-in-out'></div>
      </Link>
    </div>
  )
}

export default HotProductSection
