import { createContext, useContext, useEffect, useState } from 'react'

import { isLoggedIn } from '@/api/authentication'
import { getCartInfo } from '@/api/carts'
import { useCartActions } from '@/stores/cartStore'

type TRes = {
  status: string
  data: {
    user: User
  }
  isAuthenticated: boolean
}

type User = {
  name: string
  email: string
  _id: string
}

type AuthContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { setProducts } = useCartActions()

  useEffect(() => {
    async function fetchUser() {
      try {
        // @ts-expect-error fuck ts
        const res: TRes = await isLoggedIn()
        setUser(res.data.user)
        if (res.status === 'success') {
          const { items } = await getCartInfo()
          setProducts(items)
        }
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) throw new Error('AuthContext was used outside of AuthProvider')

  return context
}
