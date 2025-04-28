import { useRef } from 'react'
import gsap, { Power2 } from 'gsap'
import { useGSAP } from '@gsap/react'

const start = 'M0 502S175 272 500 272s500 230 500 230V0H0V502Z'
const end = 'M0,1000S175,1000,500,1000s500,0,500,0V0H0V1000Z'

export default function useMenuAnimations(
  containerRef: React.MutableRefObject<HTMLDivElement | null>
) {
  // Timeline references
  const pathAnimTlRef = useRef<GSAPTimeline | null>(null)
  const menuItemsTlRef = useRef<GSAPTimeline | null>(null)
  const loginFormTlRef = useRef<GSAPTimeline | null>(null)
  const signUpFormTlRef = useRef<GSAPTimeline | null>(null)

  // Extract animation functions using contextSafe
  const { contextSafe } = useGSAP({ scope: containerRef })

  // Initialize animations
  useGSAP(
    () => {
      initPathAnimation()
      initMenuItemsAnimation()
      initLoginFormAnimation()
      initSignUpFormAnimation()
      initFooterLinksAnimation()
    },
    { scope: containerRef }
  )

  // Animation initialization functions
  const initPathAnimation = contextSafe(() => {
    pathAnimTlRef.current = gsap
      .timeline({ paused: true })
      .to('path', { attr: { fill: '#0a0a0a' } })
      .to(
        'path',
        { duration: 0.4, attr: { d: start }, ease: Power2.easeIn },
        '<'
      )
      .to(
        'path',
        { duration: 0.4, attr: { d: end }, ease: Power2.easeOut },
        '-=0.1'
      )
  })

  const initMenuItemsAnimation = contextSafe(() => {
    gsap.set(['ul.menu-items li', '.footer ul li'], {
      y: 30,
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    })

    menuItemsTlRef.current = gsap
      .timeline({ paused: true })
      .to(['ul.menu-items li', '.footer ul li'], {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        stagger: 0.04,
        duration: 0.5,
        ease: 'power2.out',
      })
  })

  const initLoginFormAnimation = contextSafe(() => {
    gsap.set('.login-form', {
      y: 30,
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    })

    loginFormTlRef.current = gsap.timeline({ paused: true }).to('.login-form', {
      y: 0,
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'auto',
      duration: 0.4,
      ease: 'power2.out',
    })
  })

  const initSignUpFormAnimation = contextSafe(() => {
    gsap.set('.signup-form', {
      y: 30,
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    })

    signUpFormTlRef.current = gsap
      .timeline({ paused: true })
      .to('.signup-form', {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'power2.out',
      })
  })

  const initFooterLinksAnimation = contextSafe(() => {
    gsap.set('.footer ul li', {
      y: 30,
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    })
  })

  // Animation control functions
  const controls = {
    path: {
      play: contextSafe(() => pathAnimTlRef.current?.play()),
      reverse: contextSafe(() => pathAnimTlRef.current?.reverse()),
    },
    menuItems: {
      play: contextSafe(() => menuItemsTlRef.current?.play()),
      reverse: contextSafe(() => menuItemsTlRef.current?.reverse()),
    },
    loginForm: {
      play: contextSafe(() => loginFormTlRef.current?.play()),
      reverse: contextSafe(() => loginFormTlRef.current?.reverse()),
    },
    signUpForm: {
      play: contextSafe(() => signUpFormTlRef.current?.play()),
      reverse: contextSafe(() => signUpFormTlRef.current?.reverse()),
    },
  }

  return controls
}
