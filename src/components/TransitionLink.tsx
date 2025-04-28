import { Link, LinkProps } from 'react-router-dom'
import { forwardRef } from 'react'

interface ITransitionLinkProps extends LinkProps {
  children: React.ReactNode
  to: string
}

const TransitionLink = forwardRef<HTMLAnchorElement, ITransitionLinkProps>(
  ({ children, to, ...props }, ref) => {
    return (
      <Link to={to} ref={ref} {...props} viewTransition>
        {children}
      </Link>
    )
  }
)

export default TransitionLink
