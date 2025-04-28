import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import { TProductItem } from '@/types'

import FloatText from '@/components/FloatText'
import TransitionLink from '@/components/TransitionLink'

function ProductItem({
  imageCover,
  description,
  name,
  price,
  _id,
}: TProductItem) {
  const containerRef = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: containerRef }
  )

  return (
    <TransitionLink
      ref={containerRef}
      className='cursor-pointer'
      to={'/product'}
      state={{
        id: _id,
        imageCover,
      }}
    >
      <div className='flex-1 h-[56rem] flex items-center justify-center bg-transparent'>
        <img
          src={imageCover}
          alt={description ?? 'A picture of the hot selling product'}
          className='max-w-[90%] max-h-[90%] object-contain'
        />
      </div>

      <FloatText
        className='flex flex-col items-center gap-2 mt-2'
        types='chars'
        animationOptions={{
          duration: 1,
          ease: 'power4.out',
        }}
      >
        <div className='overflow-hidden text-2xl tracking-widest'>{name}</div>
        <div className='overflow-hidden text-lg tracking-wider'>¥{price}</div>
      </FloatText>
    </TransitionLink>
  )
}

export default ProductItem
