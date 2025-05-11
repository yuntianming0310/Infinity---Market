import gsap from 'gsap'
import { LenisRef, ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

interface LenisProviderProps {
  children: React.ReactNode
}

function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<LenisRef | null>(null)

  const location = useLocation()

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  useEffect(() => {
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true })
  }, [location.pathname])

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 2,
        easing: t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  )
}

export default LenisProvider
