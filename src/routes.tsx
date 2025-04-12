import { createBrowserRouter } from 'react-router-dom'

import App from '@/App.tsx'
import Connect from '@/pages/Connect'
import Home from '@/pages/Home'
import Market from '@/pages/Market'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'market',
        element: <Market />,
      },
      {
        path: 'connect',
        element: <Connect />,
      },
    ],
  },
])

export default router
