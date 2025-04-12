import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<Array<HTMLDivElement | null>>([])

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set(wordsRef.current, {
        y: 30,
        opacity: 0,
      })

      gsap.to(wordsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const words = ['From', 'us', 'to', 'you']
  const classes = ['', 'text-primary-cyan', '', 'text-primary-red']

  return (
    <div
      className='uppercase text-[8.2rem] font-Cinzel tracking-tight'
      ref={containerRef}
    >
      <div className='flex overflow-hidden'>
        {words.map((word, index) => (
          <div
            key={index}
            className={`overflow-hidden ${index > 0 ? 'ml-5' : ''}`}
          >
            <div
              className={classes[index]}
              ref={el => (wordsRef.current[index] = el)}
            >
              {word}
            </div>
          </div>
        ))}
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
        ease: 'power3.out',
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
