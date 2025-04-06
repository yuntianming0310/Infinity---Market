import { Outlet } from 'react-router'

import Nav from './components/Nav'
import LenisProvider from './providers/LenisProvider'

function App() {
  return (
    <LenisProvider>
      <PageWrapper>
        <Nav />

        <Outlet />
      </PageWrapper>
    </LenisProvider>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className='w-full px-48'>{children}</div>
}

export default App
