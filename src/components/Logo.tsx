import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'

import TransitionLink from '@/components/TransitionLink'

function Logo() {
  const logoRef = useRef(null)

  useGSAP(() => {
    gsap.set(logoRef.current, {
      opacity: 0,
      y: 30,
    })

    gsap.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 1,
    })
  }, [])

  return (
    <TransitionLink
      className='uppercase font-normal text-black text-6xl'
      to='/'
      ref={logoRef}
    >
      Infinity
    </TransitionLink>
  )
}

export default Logo
