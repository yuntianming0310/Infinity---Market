import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import ParallaxImage from '@/components/ParallaxImage'
import TransitionLink from '@/components/TransitionLink'
import DividerWithTitle from '@/components/DividerWithTitle'

import './IntroSection.css'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

function IntroSection() {
  return (
    <section className='w-full mt-18 px-48 relative'>
      <DividerWithTitle>
        <span>About</span>
        <span>Made for you</span>
      </DividerWithTitle>

      <ShortIntroForAboutUs />
    </section>
  )
}

function ShortIntroForAboutUs() {
  const imgContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.scrollTriggerImg', {
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: imgContainerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: imgContainerRef }
  )

  return (
    <div className='w-full space-y-10 text-4xl' ref={imgContainerRef}>
      <div className='flex flex-col items-center justify-center gap-16'>
        <div className='w-full h-[48rem] overflow-hidden'>
          <ParallaxImage
            src='camera.jpg'
            alt='A image point out passion!'
            className='scrollTriggerImg'
          />
        </div>

        <ParagraphForIntro />

        <LinkToAbout />
      </div>
    </div>
  )
}

function ParagraphForIntro() {
  const pRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const textContentSplitType = new SplitType('.animate-line', {
        types: 'words',
      })

      gsap.from('.animate-line .word', {
        y: '100%',
        duration: 1,
        stagger: 0.075,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: pRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      return () => textContentSplitType.revert()
    },
    { scope: pRef }
  )

  return (
    <>
      <div
        className='w-full self-end uppercase font-light text-8xl tracking-tight text-right'
        ref={pRef}
      >
        <div className='animate-line overflow-hidden'>
          The joy of <span className='text-primary-red'>creation</span> should
        </div>
        <div className='animate-line overflow-hidden'>
          not stay on the <span className='text-primary-cyan'>screen</span>
        </div>
      </div>
      <p className='w-1/2 text-3xl self-end leading-normal text-left'>
        This website is a space we built for passion — turning the virtual into
        something tangible, crafting every little collectible with care.
      </p>
    </>
  )
}

function LinkToAbout() {
  return (
    <TransitionLink
      className='absolute overflow-hidden left-0 bottom-0 uppercase text-7xl tracking-wider leading-tight mt-8 ml-48 px-18 py-8 rounded-2xl bg-blue-200 text-[#002857] hover:text-background-primary transform transition-colors duration-500 linkToAbout'
      to='/connect'
    >
      Who <br /> We Are
    </TransitionLink>
  )
}

export default IntroSection
