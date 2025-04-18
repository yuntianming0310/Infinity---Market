import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'

interface IFloatTextProps {
  className?: string
  children: React.ReactNode
  types: 'chars' | 'words' | 'lines'
  animationOptions?: GSAPTweenVars
}

function FloatText({
  className,
  children,
  types,
  animationOptions,
}: IFloatTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const splitTextInstance = new SplitType(containerRef.current!, {
        types,
      })

      gsap.from(splitTextInstance[types], {
        ...animationOptions,
      })
    },
    { scope: containerRef }
  )

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  )
}

export default FloatText
