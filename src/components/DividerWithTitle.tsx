import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function DividerWithTitle({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.bottom--line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        width: 0,
        duration: 2,
        ease: 'power3.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <div
      className='w-full relative flex items-center justify-between uppercase mb-5 text-2xl'
      ref={containerRef}
    >
      {children}
      <div className='w-full h-[1px] absolute bg-black -bottom-1 bottom--line'></div>
    </div>
  )
}

export default DividerWithTitle
