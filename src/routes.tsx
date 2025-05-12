import { createBrowserRouter } from 'react-router-dom'

import App from '@/App.tsx'
import Connect from '@/pages/Connect'
import Home from '@/pages/Home'
import ProductView from '@/pages/ProductView'
import Market from '@/pages/Market'
import Cart from '@/pages/Cart'
import Order from '@/pages/Order'
import NotFound from '@/pages/NotFound'

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
        path: 'product',
        element: <ProductView />,
      },
      {
        path: 'connect',
        element: <Connect />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'order',
        element: <Order />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router
