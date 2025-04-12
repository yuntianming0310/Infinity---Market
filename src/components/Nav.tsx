import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import Logo from '../components/Logo'
import TransitionLink from '@/components/TransitionLink'

gsap.registerPlugin(useGSAP)

function Nav() {
  return (
    <nav className='font-Cinzel flex items-center max-w-full fixed top-0 left-0 right-0 z-50 px-24 py-8'>
      <Logo />
      <NavList />
    </nav>
  )
}

function NavList() {
  const navListRef = useRef<HTMLUListElement | null>(null)

  const navList = [
    { name: 'Market', href: '/market' },
    { name: 'Connect', href: '/connect' },
  ]

  useGSAP(
    () => {
      gsap.set('nav ul li', {
        opacity: 0,
        y: 30,
      })

      gsap.to('nav ul li', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 1,
      })
    },
    { scope: navListRef }
  )

  return (
    <ul className='flex gap-8 ml-auto' ref={navListRef}>
      {navList.map(item => (
        <li key={item.name} className='text-3xl uppercase'>
          <TransitionLink to={item.href} viewTransition>
            {item.name}
          </TransitionLink>
        </li>
      ))}
    </ul>
  )
}

export default Nav
