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
      className={`w-full flex flex-col items-start justify-center pt-32 ${className}`}
    >
      {enableNav && <Nav />}
      {children}
    </div>
  )
}
export default Wrapper
