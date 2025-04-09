import { useRef, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { Link } from 'react-router-dom'

interface IParallaxLinkProps {
  to: string
  children: React.ReactNode
  className?: string
}

const lerp = (start: number, end: number, factor: number): number =>
  start + (end - start) * factor

const ParallaxLink = ({ to, children, className }: IParallaxLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const bounds = useRef<{ top: number; bottom: number } | null>(null)
  const currentTranslateY = useRef(0)
  const targetTranslateY = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const updateBounds = () => {
      if (linkRef.current) {
        const rect = linkRef.current.getBoundingClientRect()
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        }
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)

    const animate = () => {
      if (linkRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        )
        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          linkRef.current.style.transform = `translateY(${currentTranslateY.current}px)`
        }
      }
      rafId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateBounds)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  useLenis(() => {
    if (!linkRef.current) return

    const rect = linkRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const offsetFromCenter = rect.top - windowHeight / 2

    targetTranslateY.current = offsetFromCenter * -0.25
  })

  return (
    <Link
      to={to}
      ref={linkRef}
      className={className}
      style={{
        willChange: 'transform',
        transform: 'translateY(0)',
      }}
    >
      {children}
    </Link>
  )
}

export default ParallaxLink
