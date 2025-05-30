import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useLocation } from 'react-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { TProductItem } from '@/types'
import { useFetchData } from '@/hooks/useFetchData'

import BackToMarket from '@/pages/ProductView/components/BackToMarket'
import ProductDescription from '@/pages/ProductView/components/ProductDescription'
import { getProduct } from '@/api/products'
import RatingAndReviews from '@/pages/ProductView/components/RatingAndReviews'
// import { getProductReviews } from '@/api/reviews'

gsap.registerPlugin(ScrollTrigger)

function Index() {
  const containerRef = useRef(null)
  const location = useLocation()
  const { id } = location.state

  const { data: product, loading: loadingProduct } = useFetchData<TProductItem>(
    () => getProduct(id)
  )

  useGSAP(
    () => {
      if (!containerRef.current || loadingProduct || !product) return

      const tl = gsap.timeline()
      gsap.set('.reviews-section', {
        visibility: 'hidden',
        pointerEvents: 'none',
      })

      tl.to('.back-btn', {
        opacity: 0,
        x: -100,
        scale: 0.92,
        duration: 0.1,
        ease: 'power2.out',
      })
        .to(
          '.product-desc',
          {
            opacity: 0,
            x: 200,
            scale: 0.92,
            duration: 0.1,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          ['.back-btn', '.product-desc'],
          {
            visibility: 'hidden',
            pointerEvents: 'none',
          },
          0.1
        )
        .to(
          '.product-img',
          {
            left: '50%',
            scale: 1.2,
            duration: 0.2,
          },
          0
        )
        .to(
          '.product-img',
          {
            y: -130,
            scale: 0.8,
            top: '10%',
            duration: 0.5,
          },
          '-=0.1'
        )
        .to(
          '.reviews-section',
          {
            opacity: 1,
            y: 0,
            visibility: 'visible',
            pointerEvents: 'auto',
            duration: 0.3,
          },
          '-=0.4'
        )
        .to(
          `.review-card`,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: 'back.out(4)',
          },
          '<'
        )

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=1000',
        pin: true,
        anticipatePin: 1,
        scrub: 0.5,
        // markers: true,
        animation: tl,
      })
    },
    { scope: containerRef, dependencies: [loadingProduct, product] }
  )

  if (loadingProduct) return null

  return (
    <div className='w-full flex flex-col' ref={containerRef}>
      <div className='w-full h-screen flex pr-48 relative'>
        <BackToMarket />

        <div className='flex-3/4 flex justify-center items-center relative'>
          <img
            src={product?.imageCover}
            className='product-img absolute max-w-2/3 object-contain'
            alt={`View image of product ${product?.name}`}
          />
        </div>

        <ProductDescription product={product!} />
      </div>

      <RatingAndReviews />
    </div>
  )
}

export default Index
