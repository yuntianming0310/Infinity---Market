import { axiosInstance } from '@/api'
import { useEffect, useState } from 'react'

export function useFetchData<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isUnmount = false
    if (isUnmount) return

    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await axiosInstance.get(url)
        if (res.data.status === 'success') setData(res.data.data.data)
      } catch (err: unknown) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      isUnmount = true
    }
  }, [])

  return { data, isLoading, error }
}
