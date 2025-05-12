import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitType from 'split-type'
import TransitionLink from '@/components/TransitionLink'

function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null)
  const errorTextRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const errorTextSplit = new SplitType(errorTextRef.current!, {
        types: 'chars',
      })

      const messageSplit = new SplitType(messageRef.current!, {
        types: 'words',
      })

      const tl = gsap.timeline({ delay: 0.8 })

      tl.from(errorTextSplit.chars, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
      })
        .from(
          messageSplit.words,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.back-button',
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        )

      return () => {
        errorTextSplit.revert()
        messageSplit.revert()
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className='w-full h-screen flex flex-col items-center justify-center bg-background-primary px-4'
    >
      <div ref={errorTextRef} className='font-Cinzel text-[20rem] leading-none'>
        <span className='text-primary-red'>4</span>
        <span>0</span>
        <span className='text-primary-cyan'>4</span>
      </div>

      <div
        ref={messageRef}
        className='text-4xl text-zinc-600 text-center mt-8 mb-16 max-w-2xl'
      >
        Oops! Looks like you've ventured into uncharted territory. Let's get you
        back to familiar ground.
      </div>

      <TransitionLink
        to='/'
        className='back-button px-12 py-6 text-2xl uppercase tracking-wider border-2 border-black hover:bg-black hover:text-background-primary transition-colors duration-300'
      >
        Return Home
      </TransitionLink>
    </div>
  )
}

export default NotFound
