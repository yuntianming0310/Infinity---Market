import Nav from '@/components/Nav'

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='w-full flex flex-col items-start justify-center pt-32'>
      <Nav />
      {children}
    </div>
  )
}
export default Wrapper
