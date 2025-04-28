import { useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLenis } from 'lenis/react'
import clsx from 'clsx'

import TransitionLink from '@/components/TransitionLink'
import useMenuAnimations from '@/hooks/useMenuAnimations'
import { Link } from 'react-router-dom'

function Menu({ isOpen }: { isOpen: boolean }) {
  const [uiState, setUiState] = useState<
    'menu' | 'closed' | 'login' | 'signUp'
  >('closed')

  const menuRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const lenis = useLenis()

  const animations = useMenuAnimations(menuRef)

  const menuItemList = [
    { type: 'link', name: 'Shopping', href: '/market' },
    { type: 'link', name: 'Hot Selling', href: '/hot' },
    { type: 'link', name: 'Contact Us', href: '/connect' },
    { type: 'link', name: 'Inspiration', href: '/create' },
    { type: 'link', name: 'About', href: '/about' },
    {
      type: 'button',
      name: 'Sign In',
      onClick: () => {
        // Switch from menu to login state
        transitionToLoginForm()
      },
    },
  ]

  // Handle menu open/close based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      openOverlay()
    } else {
      closeOverlay()
    }
  }, [isOpen, lenis])

  // Control functions for UI state transitions
  const openOverlay = () => {
    animations.path.play()
    overlayRef.current?.classList.remove('invisible')
    lenis?.stop()

    // If we were showing login before, switch back to menu
    if (uiState === 'login') {
      animations.loginForm.reverse()
      setTimeout(() => {
        animations.menuItems.play()
        setUiState('menu')
      }, 300)
    } else {
      setTimeout(() => {
        animations.menuItems.play()
        setUiState('menu')
      }, 300)
    }
  }

  const closeOverlay = () => {
    // First hide whatever content is showing
    if (uiState === 'menu') {
      animations.menuItems.reverse()
    } else if (uiState === 'login') {
      animations.loginForm.reverse()
    } else if (uiState === 'signUp') {
      animations.signUpForm.reverse()
    }

    // Then close the background with a slight delay
    setTimeout(() => {
      animations.path.reverse()

      // Add overlay to invisible class after animation completes
      setTimeout(() => {
        overlayRef.current?.classList.add('invisible')
        lenis?.start()
        setUiState('closed')
      }, 1200)
    }, 400)
  }

  const transitionToLoginForm = () => {
    animations.menuItems.reverse()

    setTimeout(() => {
      animations.loginForm.play()
      setUiState('login')
    }, 500)
  }

  const transitionToSignUpForm = () => {
    animations.loginForm.reverse()

    setTimeout(() => {
      animations.signUpForm.play()
      setUiState('signUp')
    }, 300)
  }

  const transitionFromSignUpToLogin = () => {
    animations.signUpForm.reverse()

    setTimeout(() => {
      animations.loginForm.play()
      setUiState('login')
    }, 300)
  }

  const backToMenu = () => {
    if (uiState === 'login') {
      animations.loginForm.reverse()
    } else if (uiState === 'signUp') {
      animations.signUpForm.reverse()
    }

    setTimeout(() => {
      animations.menuItems.play()
      setUiState('menu')
    }, 300)
  }

  return createPortal(
    <div ref={menuRef}>
      <div
        className='fixed w-screen h-screen top-0 left-0 z-40 overflow-hidden invisible'
        ref={overlayRef}
      >
        <svg viewBox='0 0 1000 1000' preserveAspectRatio='none'>
          <path d='M0 2S175 1 500 1s500 1 500 1V0H0Z' fill='transparent' />
        </svg>
      </div>

      <div className={clsx('fixed top-1/6 left-1/4 z-40')}>
        {/* Menu Items */}
        <ul className='menu-items flex flex-col items-start gap-6 text-6xl text-white font-light tracking-tight uppercase font-DMSans'>
          {menuItemList.map(item => (
            <li key={item.name} className='overflow-hidden'>
              {item.type === 'link' ? (
                <TransitionLink to={item.href!}>{item.name}</TransitionLink>
              ) : (
                <button
                  className='uppercase cursor-pointer'
                  onClick={item.onClick}
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Login Form */}
        <LoginForm
          backToMenu={backToMenu}
          transitionToSignUpForm={transitionToSignUpForm}
        />

        {/* Sign Up Form */}
        <SignUpForm
          backToMenu={backToMenu}
          transitionFromSignUpToLogin={transitionFromSignUpToLogin}
        />
      </div>

      <Footer />
    </div>,
    document.body
  )
}

function LoginForm({
  transitionToSignUpForm,
  backToMenu,
}: {
  transitionToSignUpForm: () => void
  backToMenu: () => void
}) {
  return (
    <div className='login-form fixed left-1/4 bottom-1/6 text-white w-108'>
      <h2 className='text-6xl mb-6 font-light uppercase font-DMSans'>
        Sign In
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='block text-md mb-1'>Email</label>
          <input
            type='email'
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Password</label>
          <input
            type='password'
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div className='flex justify-between pt-4'>
          <button className='px-6 py-2 border border-white/50 hover:bg-white hover:text-black transition-colors cursor-pointer'>
            Sign In
          </button>
          <button
            className='px-6 py-2 text-white/70 hover:text-white transition-colors cursor-pointer'
            onClick={backToMenu}
          >
            Back
          </button>
        </div>

        <p className='mt-4 text-2xl'>
          Need an account?{' '}
          <button
            className='border-b border-white cursor-pointer hover:border-transparent'
            onClick={transitionToSignUpForm}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

function SignUpForm({
  transitionFromSignUpToLogin,
  backToMenu,
}: {
  transitionFromSignUpToLogin: () => void
  backToMenu: () => void
}) {
  return (
    <div className='signup-form fixed left-1/4 bottom-1/6 text-white w-108'>
      <h2 className='text-6xl mb-6 font-light uppercase font-DMSans'>
        Sign Up
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='block text-md mb-1'>Name</label>
          <input
            type='text'
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Email</label>
          <input
            type='email'
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Password</label>
          <input
            type='password'
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div>
          <label className='block text-md mb-1'>Comfirm Password</label>
          <input
            type='password'
            className='w-full bg-transparent border-b border-white/50 py-2 px-1 focus:outline-none focus:border-white'
          />
        </div>
        <div className='flex justify-between pt-4'>
          <button className='px-6 py-2 border border-white/50 hover:bg-white hover:text-black transition-colors cursor-pointer'>
            Sign Up
          </button>
          <button
            className='px-6 py-2 text-white/70 hover:text-white transition-colors cursor-pointer'
            onClick={backToMenu}
          >
            Back
          </button>
        </div>

        <p className='mt-4 text-2xl'>
          Already have an account?{' '}
          <button
            className='border-b border-white cursor-pointer hover:border-transparent'
            onClick={transitionFromSignUpToLogin}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div className='footer text-white font-light absolute right-1/10 bottom-1/10 z-40'>
      <ul className='flex gap-16'>
        <li>
          <Link to={'/'}>X</Link>
        </li>
        <li>
          <Link to={'/'}>Medium</Link>
        </li>
        <li>
          <Link to={'/'}>掘金</Link>
        </li>
      </ul>
    </div>
  )
}

export default Menu
