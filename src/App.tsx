import { Outlet } from 'react-router'

import LenisProvider from '@/providers/LenisProvider'

function App() {
  return (
    <LenisProvider>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </LenisProvider>
  )
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className='w-full pt-32'>{children}</div>
}

export default App
