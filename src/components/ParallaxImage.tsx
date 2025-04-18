import { useRef, useEffect } from 'react'
import { useLenis } from 'lenis/react'

interface IParallaxImageProps {
  src: string
  alt: string
  className?: string
  customClass?: boolean
}

const lerp = (start: number, end: number, factor: number): number =>
  start + (end - start) * factor

const ParallaxImage = ({
  src,
  alt,
  className,
  customClass = false,
}: IParallaxImageProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const bounds = useRef<{ top: number; bottom: number } | null>(null)
  const currentTranslateY = useRef(0)
  const targetTranslateY = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const updateBounds = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        }
      }
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)

    const animate = () => {
      if (imageRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        )

        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          imageRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(1.25)`
        }
      }
      rafId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateBounds)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  useLenis(() => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const offsetFromCenter = rect.top - windowHeight / 2

    targetTranslateY.current = offsetFromCenter * -0.15
  })

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={
        customClass ? className : `w-full h-full object-cover ${className}`
      }
      style={{
        willChange: 'transform',
        transform: 'translateY(0) scale(1.25)',
      }}
    />
  )
}

export default ParallaxImage
