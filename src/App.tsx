import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'

import LenisProvider from '@/providers/LenisProvider'
import { AuthProvider } from '@/providers/AuthProvider'

function App() {
  return (
    <LenisProvider>
      <AuthProvider>
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </AuthProvider>

      <Toaster />
    </LenisProvider>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className='w-full'>{children}</div>
}

export default App
