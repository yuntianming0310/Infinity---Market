import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

import Wrapper from '@/components/Wrapper'
import TransitionLink from '@/components/TransitionLink'

import './index.css'

gsap.registerPlugin(useGSAP)

const SECOND_PART_ANIMATION_DELAY = 1.8
const SECOND_PART_ANIMATION_DURATION = 2

function Contact() {
  return (
    <Wrapper
      className='absolute top-0 left-0 right-0 bottom-0 pt-0 w-full h-full bg-black text-background-primary connect-page'
      enableNav={false}
    >
      <BackLink />
      <ProfessionInfo />
      <NameText />
      <SkillInfo />
      <DecorativeImage />
    </Wrapper>
  )
}

function BackLink() {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      gsap.from(linkRef.current, {
        scale: 0,
        delay: 1,
        duration: 1,
        ease: 'power4.out',
      })
    },
    { scope: linkRef }
  )

  return (
    <TransitionLink
      to='/'
      className='absolute w-[10rem] h-[10rem] top-[6%] left-[4%]'
      ref={linkRef}
    >
      <div className='link-outline-1'></div>
      <div className='link-outline-2'></div>
      <div className='back-x'></div>
    </TransitionLink>
  )
}

function ProfessionInfo() {
  const proContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const textBelowTheLine = new SplitType('.below-line', {
        types: 'chars',
      })
      const textAboveTheLine = new SplitType('.above-line', {
        types: 'chars',
      })

      gsap.from('.line', {
        scale: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.8,
      })

      gsap.from('.above-line .char', {
        duration: SECOND_PART_ANIMATION_DURATION,
        y: '100%',
        stagger: 0.075,
        delay: SECOND_PART_ANIMATION_DELAY,
        ease: 'power4.out',
      })

      gsap.from('.below-line .char', {
        duration: SECOND_PART_ANIMATION_DURATION,
        y: '100%',
        stagger: 0.075,
        delay: SECOND_PART_ANIMATION_DELAY,
        ease: 'power4.out',
      })

      return () => {
        textBelowTheLine.revert()
        textAboveTheLine.revert()
      }
    },
    { scope: proContainerRef }
  )

  return (
    <div
      className='absolute w-3/4 flex flex-col items-end top-[6%] right-[4%] text-8xl text-right font-Cinzel font-light ml-auto'
      ref={proContainerRef}
    >
      <div className='above-line overflow-hidden'>FrontEnd</div>
      <div className='w-full h-[1px] bg-background-primary line'></div>
      <div className='below-line overflow-hidden mt-2'>Developer</div>
    </div>
  )
}

function NameText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstNameRef = useRef<HTMLDivElement>(null)
  const lastNameRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline()
      const splitedFirstNameInst = new SplitType(firstNameRef.current!, {
        types: 'chars',
      })
      const splitedLastNameInst = new SplitType(lastNameRef.current!, {
        types: 'chars',
      })

      tl.from(['.first-name .char', '.last-name .char'], {
        duration: 1,
        y: '100%',
        stagger: 0.075,
        delay: 0.8,
        ease: 'power4.out',
      })

      return () => {
        splitedFirstNameInst.revert()
        splitedLastNameInst.revert()
        tl.kill()
      }
    },
    { scope: containerRef }
  )

  return (
    <div
      className='flex flex-col font-Cinzel fixed top-4/5 left-1/6 transform -translate-x-1/2 -translate-y-2/3'
      ref={containerRef}
    >
      <div
        className='overflow-hidden text-[11.6rem] first-name'
        ref={firstNameRef}
      >
        <span className='text-primary-red'>K</span>en
      </div>
      <div
        className='overflow-hidden text-9xl last-name -mt-12 transfrom translate-x-2/3'
        ref={lastNameRef}
      >
        <span className='text-primary-red'>W</span>en
      </div>
    </div>
  )
}

function SkillInfo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const skillTextLines = gsap.utils.toArray<HTMLElement>('.skill-line')

      const splitInstances: SplitType[] = []

      skillTextLines.forEach((line: HTMLElement) => {
        const splitText = new SplitType(line, {
          types: 'words',
        })
        splitInstances.push(splitText)

        gsap.from(splitText.words, {
          duration: SECOND_PART_ANIMATION_DURATION,
          y: '100%',
          stagger: 0.075,
          delay: SECOND_PART_ANIMATION_DELAY,
          ease: 'power4.out',
        })
      })

      return () => splitInstances.forEach(instance => instance.revert())
    },
    { scope: containerRef }
  )

  const skillsTextContent = [
    'Immersive 3D Web',
    'Delightful Interfaces',
    'Modern Web Development',
    'High-Performance UI Animation',
  ]

  return (
    <div
      className='flex flex-col items-center justify-center gap-6 text-3xl font-light absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      ref={containerRef}
    >
      {skillsTextContent.map(text => (
        <div className='overflow-hidden skill-line' key={text}>
          {text}
        </div>
      ))}
    </div>
  )
}

function DecorativeImage() {
  const imgBoxRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(imgBoxRef.current, {
        scale: 0,
        duration: SECOND_PART_ANIMATION_DURATION,
        ease: 'power4.out',
        delay: SECOND_PART_ANIMATION_DELAY,
      })
    },
    { scope: imgBoxRef }
  )

  return (
    <div
      className='w-2xl aspect-square overflow-hidden absolute right-[7%] bottom-[4%] bg-[url("/cyber.jpg")] bg-cover bg-no-repeat bg-center mix-blend-lighten blob-image'
      ref={imgBoxRef}
    />
  )
}

export default Contact
