import { createBrowserRouter } from 'react-router-dom'
import { ComponentType, lazy, Suspense } from 'react'
import Loading from '@/components/Loading'

const App = lazy(() => import('@/App.tsx'))
const Home = lazy(() => import('@/pages/Home'))
const Market = lazy(() => import('@/pages/Market'))
const ProductView = lazy(() => import('@/pages/ProductView'))
const Connect = lazy(() => import('@/pages/Connect'))
const Cart = lazy(() => import('@/pages/Cart'))
const Order = lazy(() => import('@/pages/Order'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const lazyLoad = (Component: React.LazyExoticComponent<ComponentType>) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: lazyLoad(App),
    children: [
      {
        path: '/',
        element: lazyLoad(Home),
      },
      {
        path: 'market',
        element: lazyLoad(Market),
      },
      {
        path: 'product',
        element: lazyLoad(ProductView),
      },
      {
        path: 'connect',
        element: lazyLoad(Connect),
      },
      {
        path: 'cart',
        element: lazyLoad(Cart),
      },
      {
        path: 'order',
        element: lazyLoad(Order),
      },
      {
        path: '*',
        element: lazyLoad(NotFound),
      },
    ],
  },
])

export default router
