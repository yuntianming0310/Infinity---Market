import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'

import LenisProvider from '@/providers/LenisProvider'

function App() {
  return (
    <LenisProvider>
      <PageWrapper>
        <Outlet />
      </PageWrapper>

      <Toaster />
    </LenisProvider>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>
}

export default App
