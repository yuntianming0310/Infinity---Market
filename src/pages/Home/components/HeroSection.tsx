import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

import ParallaxImage from '@/components/ParallaxImage'

function HeroSection() {
  return (
    <section className='w-full px-48'>
      <Slogan />
      <PictureForShowing />
    </section>
  )
}

function Slogan() {
  const sloganRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const sloganSplitType = new SplitType(sloganRef.current!, {
        types: 'words',
      })

      gsap.from('.word', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 1,
      })

      return () => sloganSplitType.revert()
    },
    { scope: sloganRef }
  )

  return (
    <div className='text-[8.2rem] font-Cinzel'>
      <div ref={sloganRef}>
        From <span className='text-primary-red'>Us</span> To{' '}
        <span className='text-primary-cyan'>You</span>
      </div>
    </div>
  )
}

function PictureForShowing() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.hero--image', {
        opacity: 0,
        duration: 2.2,
        delay: 1.5,
        ease: 'power4.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <div className='w-full h-[54rem] overflow-hidden' ref={containerRef}>
      <ParallaxImage
        src='collections.jpg'
        alt='a picture of nice flower'
        className='hero--image'
      />
    </div>
  )
}

export default HeroSection
