import gsap from 'gsap'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Link } from 'react-router-dom'

function Logo() {
  const logoRef = useRef(null)

  useGSAP(() => {
    gsap.set(logoRef.current, {
      opacity: 0,
      y: -30,
    })

    gsap.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5,
    })
  }, [])

  return (
    <Link
      className='uppercase font-normal text-black text-6xl'
      to='/'
      viewTransition
      ref={logoRef}
    >
      Infinity
    </Link>
  )
}

export default Logo
