import { createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import About from './pages/About.tsx'
import Market from './pages/Market.tsx'
import Contact from './pages/Contact.tsx'
import Home from './pages/Home.tsx'

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
        path: 'about',
        element: <About />,
      },
      {
        path: 'market',
        element: <Market />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
])

export default router
