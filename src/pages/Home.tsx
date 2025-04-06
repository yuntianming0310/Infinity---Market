import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import ParallaxImage from '../components/ParallaxImage'

function Home() {
  return (
    <Wrapper>
      <Slogan />

      <PictureForShowing />

      <HotProductList />
    </Wrapper>
  )
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex flex-col items-start justify-center pt-32'>
      {children}
    </div>
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
        delay: 0.6,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const words = ['From', 'us', 'to', 'you']
  const classes = ['', 'text-primary-cyan', '', 'text-primary-red']

  return (
    <div
      className='uppercase text-[8.2rem] font-Cinzel pt-32 tracking-tight'
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
  return (
    <div className='w-full h-[54rem] overflow-hidden'>
      <ParallaxImage
        src='collections.jpg'
        alt='a picture of nice flower'
        className='w-full h-full object-cover'
      />
    </div>
  )
}

function HotProductList() {
  return (
    <div className='w-full flex-col items-start justify-center mt-32'>
      <p className='w-full uppercase border-b-[1px] mb-4 text-2xl'>Buy Good</p>

      <div className='w-full flex items-center justify-center gap-12'>
        <div className='flex-1 overflow-hidden relative'>
          <ParallaxImage src='flower.jpg' alt='' />

          <button className='w-2/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-3 cursor-pointer bg-cyan-50 rounded-full'>
            Buy Now
          </button>
        </div>

        <div className='flex-1 overflow-hidden relative'>
          <ParallaxImage src='flower.jpg' alt='' />

          <button className='w-2/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-3 cursor-pointer bg-cyan-50 rounded-full'>
            Buy Now
          </button>
        </div>

        <div className='flex-1 overflow-hidden relative'>
          <ParallaxImage src='flower.jpg' alt='' />

          <button className='w-2/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-3 cursor-pointer bg-cyan-50 rounded-full'>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
