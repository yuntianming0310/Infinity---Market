import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useLenis } from 'lenis/react'
import { createPortal } from 'react-dom'
import { useRef, useEffect, useState } from 'react'

import { logout } from '@/api/authentication'

import useMenuAnimations from '@/hooks/useMenuAnimations'

import { useAuth } from '@/providers/AuthProvider'

import LoginForm from '@/components/LoginForm'
import SignUpForm from '@/components/SignUpForm'
import TransitionLink from '@/components/TransitionLink'
import { useCartActions } from '@/stores/cartStore'

function Menu({ isOpen }: { isOpen: boolean }) {
  const [uiState, setUiState] = useState<
    'menu' | 'closed' | 'login' | 'signUp'
  >('closed')

  const menuRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)

  const lenis = useLenis()

  const { user, setUser } = useAuth()
  const { clearCart } = useCartActions()
  const animations = useMenuAnimations(menuRef)

  const menuItemList = [
    { type: 'link', name: 'Shopping', href: '/market', id: 0 },
    { type: 'link', name: 'Hot Selling', href: '/hot', id: 1 },
    { type: 'link', name: 'Contact Us', href: '/connect', id: 2 },
    { type: 'link', name: 'My Order', protected: true, href: '/order', id: 3 },
    { type: 'link', name: 'About', href: '/about', id: 4 },
    {
      type: 'button',
      name: user ? 'Log Out' : 'Sign In',
      id: 5,
      onClick: async () => {
        if (!user) {
          transitionToLoginForm()
        } else {
          toast
            .promise(logout, {
              loading: 'Logging out...',
              success: 'You have been logged out.',
              error: err => `Logout failed: ${err.message}`,
            })
            .then(() => {
              setUser(null)
              clearCart()
            })
        }
      },
    },
  ]

  useEffect(() => {
    if (isOpen) {
      openOverlay()
    } else {
      closeOverlay()
    }
  }, [isOpen])

  const openOverlay = () => {
    animations.path.play()
    overlayRef.current?.classList.remove('invisible')
    lenis?.stop()

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
    if (uiState === 'menu') {
      animations.menuItems.reverse()
    } else if (uiState === 'login') {
      animations.loginForm.reverse()
    } else if (uiState === 'signUp') {
      animations.signUpForm.reverse()
    }

    setTimeout(() => {
      animations.path.reverse()

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

      <div
        className={clsx(
          'fixed top-1/6 left-1/4 z-40',
          !isOpen && 'invisible pointer-events-none'
        )}
      >
        <ul className='menu-items flex flex-col items-start gap-6 text-6xl text-white font-light tracking-tight uppercase font-DMSans'>
          {menuItemList.map(item => (
            <li key={item.id} className='overflow-hidden'>
              {item.type === 'link' ? (
                <TransitionLink
                  to={item.href!}
                  needProtected={item.protected}
                  className={clsx(
                    'block transition-all duration-500 hover:tracking-widest hover:opacity-80'
                  )}
                >
                  {item.name}
                </TransitionLink>
              ) : (
                <button
                  className={clsx(
                    'uppercase transition-all duration-500 hover:tracking-widest hover:opacity-80'
                  )}
                  onClick={item.onClick}
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}
        </ul>

        <LoginForm
          backToMenu={backToMenu}
          transitionToSignUpForm={transitionToSignUpForm}
        />

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

function Footer() {
  return (
    <div className='footer text-white font-light absolute right-1/10 bottom-1/10 z-40'>
      <ul className='flex gap-16'>
        <li>
          <a href='https://x.com/Wn_11_11' target='_blank'>
            X
          </a>
        </li>
        <li>
          <a href='https://github.com/yuntianming0310' target='_blank'>
            GitHub
          </a>
        </li>
        <li>
          <a href='https://medium.com/me/stories/drafts' target='_blank'>
            Medium
          </a>
        </li>
        <li>
          <a
            href='https://juejin.cn/user/3243991800219339/posts'
            target='_blank'
          >
            掘金
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Menu
