import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function Footer() {
  return (
    <footer className='w-full flex items-center justify-between mt-[40vh] pb-[10vh]'>
      <ContactInfo />
      <FooterTextContent />
      <ContactInfo direction='R' />
    </footer>
  )
}

function FooterTextContent() {
  const [tl, setTl] = useState<GSAPTimeline | null>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      const timeline = gsap.timeline({ paused: true })
      setTl(timeline)

      timeline
        .to(
          '.topPar span',
          {
            y: '-100%',
            stagger: 0.05,
            duration: 1,
            ease: 'power3.inOut',
          },
          'start'
        )
        .to(
          '.bottomPar span',
          {
            y: '-100%',
            stagger: 0.05,
            duration: 1,
            ease: 'power3.inOut',
          },
          'start'
        )
    },
    { scope: logoContainerRef }
  )

  const onMouseEnterAnimation = contextSafe(() => {
    tl?.play()
  })

  const onMouseLeaveAnimation = contextSafe(() => {
    tl?.reverse()
  })

  const isRedColoring = (i: number) => i === 0 || i === 3 || i === 5

  const isCyanColoring = (i: number) => i === 1 || i === 4

  const logoText = 'Infinity'

  return (
    <div className='text-center'>
      <div
        className='relative overflow-hidden cursor-default'
        onMouseEnter={onMouseEnterAnimation}
        onMouseLeave={onMouseLeaveAnimation}
        ref={logoContainerRef}
      >
        <p className='font-Cinzel text-[10.2rem] topPar'>
          {logoText.split('').map((char, index) => (
            <span
              key={`top-${index}`}
              className={`inline-block mr-1 ${
                isCyanColoring(index) && 'text-primary-cyan'
              }`}
            >
              {char}
            </span>
          ))}
        </p>
        <p className='font-Cinzel text-[10.2rem] absolute bottomPar'>
          {logoText.split('').map((char, index) => (
            <span
              key={`bottom-${index}`}
              className={`inline-block mr-1 ${
                isRedColoring(index) && 'text-primary-red'
              }`}
            >
              {char}
            </span>
          ))}
        </p>
      </div>
      <p>All For What We Love 🤞</p>
      <p className='text-2xl mt-4 text-zinc-500'>By Ken Wen</p>
    </div>
  )
}

function ContactInfo({ direction = 'L' }: { direction?: 'L' | 'R' }) {
  const infoList = [
    {
      name: 'Github',
      href: '/',
    },
    {
      name: 'Medium',
      href: '/',
    },
    {
      name: 'G-Mail',
      href: '/',
    },
  ]

  return (
    <div>
      <h2 className='text-2xl uppercase text-zinc-400'>Connect</h2>

      <ul
        className={`flex flex-col ${
          direction === 'L' ? 'items-start' : 'items-end'
        } text-2xl gap-1 mt-8`}
      >
        {infoList.map(({ href, name }) => (
          <li className='w-fit hover:text-primary-cyan transition-colors duration-300'>
            <Link to={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
