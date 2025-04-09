import gsap from 'gsap'
import { useCallback, useEffect, useRef } from 'react'

function useInteractiveCursor(
  containerRef: React.RefObject<HTMLDivElement>,
  cursorRef: React.RefObject<HTMLDivElement>,
  svgRef: React.RefObject<SVGSVGElement>,
  targetRef: React.RefObject<HTMLElement>
) {
  const animationFrameRef = useRef<number>()
  const mouse = useRef({ x: 0, y: 0 })

  const update = useCallback(() => {
    const container = containerRef.current
    const cursor = cursorRef.current
    const svg = svgRef.current
    const target = targetRef.current
    if (!container || !cursor || !svg || !target) return

    const { x, y } = mouse.current
    const inContainer = isInRect(container, x, y)
    const inTarget = isInRect(target, x, y)

    if (inContainer) {
      gsap.to(cursor, {
        left: x,
        top: y,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
      })

      gsap.to(cursor, {
        backgroundColor: inTarget ? '#38d9a9' : '#96f2d780',
        duration: 0.6,
      })

      gsap.to(svg, {
        x: inTarget ? '0' : '-150%',
        y: inTarget ? '0' : '150%',
        duration: 0.6,
      })
    } else {
      gsap.to(cursor, { scale: 0, duration: 0.6 })
      gsap.to(svg, { x: '-150%', y: '150%', duration: 0.6 })
    }

    animationFrameRef.current = requestAnimationFrame(update)
  }, [containerRef, cursorRef, svgRef, targetRef])

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    gsap.set(svgRef.current, {
      x: 0,
      y: 0,
    })

    window.addEventListener('mousemove', handle)
    animationFrameRef.current = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('mousemove', handle)
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current)
    }
  }, [update, svgRef])
}

function isInRect(el: HTMLElement, x: number, y: number) {
  const rect = el.getBoundingClientRect()
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

export default useInteractiveCursor
