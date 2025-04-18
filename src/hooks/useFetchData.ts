import { axiosInstance } from '@/api'
import { useEffect, useState } from 'react'

export function useFetchData<T>(
  url: string,
  options?: { params?: Record<string, string | number | boolean> }
): { data: T | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isUnmount = false
    if (isUnmount) return

    async function fetchData() {
      setIsLoading(true)
      try {
        const res = await axiosInstance.get(url, options)
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
