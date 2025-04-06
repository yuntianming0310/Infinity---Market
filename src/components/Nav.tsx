import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

import Logo from '../components/Logo'
import { useGSAP } from '@gsap/react'

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
    { name: 'About', href: '/about' },
    { name: 'Market', href: '/market' },
    { name: 'Contact', href: '/contact' },
  ]

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set('nav ul li', {
        opacity: 0,
        y: -30,
      })

      gsap.to('nav ul li', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.6,
      })
    }, navListRef)

    return () => ctx.revert()
  }, [])

  return (
    <ul className='flex gap-8 ml-auto' ref={navListRef}>
      {navList.map(item => (
        <li key={item.name} className='text-3xl uppercase'>
          <Link to={item.href} viewTransition>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Nav
