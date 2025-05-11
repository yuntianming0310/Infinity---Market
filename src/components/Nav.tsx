import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag } from 'lucide-react'
import { forwardRef, useRef } from 'react'

import Logo from '@/components/Logo'
import TransitionLink from '@/components/TransitionLink'
import HamburgerButton from '@/components/HamburgerButton'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Nav() {
  const navRef = useRef(null)
  const navListRef = useRef(null)

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

      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          if (self.direction === 1 && self.scroll() > 100) {
            gsap.to(navRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.3,
              ease: 'power2.out',
              pointerEvents: 'none',
            })
          } else if (self.direction === -1) {
            gsap.to(navRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              pointerEvents: 'auto',
            })
          }
        },
      })
    },
    { scope: navRef }
  )

  return (
    <nav
      className='font-Cinzel flex items-center max-w-full fixed top-0 left-0 right-0 z-50 px-24 py-8 text-white mix-blend-difference'
      ref={navRef}
    >
      <Logo />
      <NavList ref={navListRef} />
    </nav>
  )
}

const NavList = forwardRef<HTMLUListElement>((_, ref) => {
  const navList = [
    { content: 'Market', href: '/market', id: 0 },
    { content: 'Connect', href: '/connect', id: 1 },
    { content: <HamburgerButton />, id: 2 },
    {
      content: (
        <ShoppingBag
          className='hover:rotate-12 transition-all duration-300'
          strokeWidth={1}
          size={20}
        />
      ),
      href: '/cart',
      needProtected: true,
      id: 3,
    },
  ]

  return (
    <ul
      className='flex items-center justify-center font-NotoSans-CN font-light text-2xl gap-24 ml-auto'
      ref={ref}
    >
      {navList.map(item => (
        <li key={item.id}>
          {item.href ? (
            <TransitionLink
              to={item.href}
              needProtected={item.needProtected}
              className={clsx(
                typeof item.content === 'string' &&
                  'hover:text-primary-cyan transition-colors duration-500'
              )}
            >
              {item.content}
            </TransitionLink>
          ) : (
            item.content
          )}
        </li>
      ))}
    </ul>
  )
})

export default Nav
