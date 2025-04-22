import clsx from 'clsx'

import Nav from '@/components/Nav'

function Wrapper({
  children,
  className,
  enableNav = true,
}: {
  children: React.ReactNode
  className?: string
  enableNav?: boolean
}) {
  return (
    <div
      className={clsx(
        'w-full flex flex-col items-start justify-center pt-32',
        enableNav && 'mt-32',
        className
      )}
    >
      {enableNav && <Nav />}
      {children}
    </div>
  )
}
export default Wrapper
