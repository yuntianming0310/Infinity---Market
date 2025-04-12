import { Link, LinkProps, useNavigate, useLocation } from 'react-router-dom'
import { forwardRef } from 'react'
import { flushSync } from 'react-dom'

interface ITransitionLinkProps extends LinkProps {
  children: React.ReactNode
  to: string
}

const TransitionLink = forwardRef<HTMLAnchorElement, ITransitionLinkProps>(
  ({ children, to, ...props }, ref) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      e.preventDefault()

      if (location.pathname === to) return

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          flushSync(() => {
            navigate(to)
          })
        })
      } else {
        navigate(to)
      }
    }

    return (
      <Link to={to} ref={ref} onClick={handleClick} {...props}>
        {children}
      </Link>
    )
  }
)

export default TransitionLink
