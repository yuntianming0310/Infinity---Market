import { useAuth } from '@/providers/AuthProvider'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

interface ProtectedRouteProps {
  children: JSX.Element
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      toast.error("You're not logged in yet...")
    }
  }, [user])

  return user ? children : null
}

export default ProtectedRoute
