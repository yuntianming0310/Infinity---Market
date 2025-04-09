import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Link } from 'react-router-dom'

import DividerWithTitle from '../../../components/DividerWithTitle'
import ParallaxImage from '../../../components/ParallaxImage'

import './IntroSection.css'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

function IntroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useGSAP(
    () => {
      paragraphRefs.current.forEach((el, index) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      className='w-full flex-col items-start justify-center mt-18 relative'
      ref={containerRef}
    >
      <DividerWithTitle>
        <span>About</span>
        <span>Made for you</span>
      </DividerWithTitle>

      <div className='mt-16 max-w-full space-y-10 text-4xl'>
        <div
          ref={el => (paragraphRefs.current[0] = el)}
          className='flex flex-col items-center justify-center gap-16'
        >
          <div className='w-full h-[48rem] overflow-hidden'>
            <ParallaxImage src='camera.jpg' alt='A image point out passion!' />
          </div>
          <div className='w-full self-end uppercase font-light text-8xl tracking-tight text-right'>
            <p>
              The joy of <span className='text-primary-red'>creation</span>{' '}
              should
            </p>
            <p>
              not stay on the <span className='text-primary-cyan'>screen</span>.
            </p>
          </div>
          <p className='w-1/2 text-3xl self-end leading-normal text-left'>
            This website is a space we built for passion — turning the virtual
            into something tangible, crafting every little collectible with
            care.
          </p>
          <Link
            className='absolute overflow-hidden left-0 bottom-0 uppercase text-7xl tracking-wider leading-tight mt-8 hover:text-background-primary px-18 py-8 rounded-2xl bg-blue-200 text-primary transform transition-colors duration-500 linkToAbout'
            to='/about'
            style={{
              maskImage:
                'radial-gradient(circle 8rem at top right, transparent 8rem, black 8rem)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'destination-out',
            }}
          >
            Who <br /> We Are
          </Link>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
