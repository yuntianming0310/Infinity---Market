import gsap from 'gsap'
import { LenisRef, ReactLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'

interface LenisProviderProps {
  children: React.ReactNode
}

function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<LenisRef | null>(null)

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

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
