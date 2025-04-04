import Nav from '@/components/Nav'
import LenisProvider from '@/providers/LenisProvider'

function App() {
  return (
    <LenisProvider>
      <PageWrapper>
        <Nav />
      </PageWrapper>
    </LenisProvider>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className='w-full h-full px-24 py-14'>{children}</div>
}

export default App
