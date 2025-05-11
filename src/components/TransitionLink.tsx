import { useAuth } from '@/providers/AuthProvider'
import { forwardRef } from 'react'
import toast from 'react-hot-toast'
import { Link, LinkProps, useLocation } from 'react-router-dom'

interface ITransitionLinkProps extends LinkProps {
  children: React.ReactNode
  to: string
  needProtected?: boolean
}

const TransitionLink = forwardRef<HTMLAnchorElement, ITransitionLinkProps>(
  ({ children, to, needProtected = false, ...props }, ref) => {
    const location = useLocation()
    const { user } = useAuth()

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
      if (location.pathname === to) {
        e.preventDefault()
      }

      if (needProtected && !user) {
        e.preventDefault()
        toast.error('Please sign in to enter the page.')
      }
    }

    return (
      <Link to={to} ref={ref} onClick={handleClick} {...props} viewTransition>
        {children}
      </Link>
    )
  }
)

export default TransitionLink
