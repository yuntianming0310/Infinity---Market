import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Footer() {
  return (
    <footer className='w-full flex flex-col items-center justify-center mt-[40vh]'>
      <LogoText />
      <FooterAndConnect />
    </footer>
  )
}

function LogoText() {
  const logoContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const timeline = gsap.timeline({ paused: true })

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

      ScrollTrigger.create({
        trigger: logoContainerRef.current,
        start: '-10% 72%',
        end: '80% 72%',
        onEnter: () => timeline.play(),
        onEnterBack: () => timeline.reverse(),
        // markers: true,
        // toggleActions: 'play none reverse none',
      })
    },
    { scope: logoContainerRef }
  )

  const isRedColoring = (i: number) => i === 0 || i === 3 || i === 5

  const isCyanColoring = (i: number) => i === 1 || i === 4

  const logoText = 'Infinity'

  return (
    <div className='self-end px-48'>
      <div
        className='font-Cinzel text-[14rem] relative overflow-hidden cursor-default select-none'
        ref={logoContainerRef}
      >
        <p className='topPar'>
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
        <p className='absolute bottomPar'>
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
    </div>
  )
}

function FooterAndConnect() {
  return (
    <div className='w-full flex justify-center px-48 pt-16 pb-48 bg-zinc-900 text-background-primary'>
      <ContactInfo />
      <div className='self-end text-center mr-auto'>
        <p>All For What We Love 🤞</p>
        <p className='text-2xl mt-4 text-zinc-500'>By Ken Wen</p>
      </div>
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
    <div className='self-end mr-auto'>
      <h2 className='text-2xl uppercase text-zinc-400'>Connect</h2>

      <ul
        className={`flex flex-col ${
          direction === 'L' ? 'items-start' : 'items-end'
        } text-2xl gap-1 mt-8`}
      >
        {infoList.map(({ href, name }) => (
          <li
            key={name}
            className='w-fit hover:text-primary-cyan transition-colors duration-300'
          >
            <Link to={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
