import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Link } from 'react-router-dom'

import DividerWithTitle from '@/components/DividerWithTitle'
import ParallaxImage from '@/components/ParallaxImage'

import './IntroSection.css'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

function IntroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {}, { scope: containerRef })

  return (
    <section className='w-full mt-18 relative' ref={containerRef}>
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
      gsap.fromTo(
        '.scrollTriggerImg',
        {
          opacity: 0,
          scale: 1.5,
        },
        {
          opacity: 1,
          scale: 1.25,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imgContainerRef.current,
            start: 'top 75%',
          },
        }
      )
    },
    { scope: imgContainerRef }
  )

  return (
    <div className='w-full space-y-10 text-4xl'>
      <div className='flex flex-col items-center justify-center gap-16'>
        <div className='w-full h-[48rem] overflow-hidden' ref={imgContainerRef}>
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
      const paragraphs = pRef.current?.querySelectorAll('p')
      if (paragraphs) {
        const masterTL = gsap.timeline({
          scrollTrigger: {
            trigger: pRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
        paragraphs.forEach(p => {
          const spans = p.querySelectorAll('span')
          masterTL.fromTo(
            spans,
            {
              y: '100%',
            },
            {
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: 'power3.out',
            },
            0
          )
        })
      }
    },
    { scope: pRef }
  )

  const p1Text = 'The joy of creation should'
  const p2Text = 'not stay on the screen'

  function renderAnimateTextContent(
    pText: string,
    keyWord: string,
    color: string
  ) {
    return pText.split(' ').map((word, i) => {
      const isColor = word === keyWord
      const className = `inline-block ${isColor ? `text-primary-${color}` : ''}`
      return (
        <span className={className} key={i}>
          {word}&nbsp;
        </span>
      )
    })
  }

  return (
    <>
      <div
        className='w-full self-end uppercase font-light text-8xl tracking-tight text-right'
        ref={pRef}
      >
        <p className='overflow-hidden'>
          {renderAnimateTextContent(p1Text, 'creation', 'red')}
        </p>
        <p className='overflow-hidden'>
          {renderAnimateTextContent(p2Text, 'screen', 'cyan')}
        </p>
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
    <Link
      className='absolute overflow-hidden left-0 bottom-0 uppercase text-7xl tracking-wider leading-tight mt-8 hover:text-background-primary px-18 py-8 rounded-2xl bg-blue-200 text-[#002857] transform transition-colors duration-500 linkToAbout'
      to='/about'
    >
      Who <br /> We Are
    </Link>
  )
}

export default IntroSection
