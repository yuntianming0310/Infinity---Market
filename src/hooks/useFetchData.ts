import { useEffect, useState } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetchData<T>(
  apiFn: () => Promise<T>,
  deps: any[] = []
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false

    async function fetchData() {
      setLoading(true)
      try {
        const result = await apiFn()
        if (!isCancelled) {
          setData(result)
          setError(null)
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(
            err?.response?.data?.message || err?.message || 'Error occurred'
          )
          setData(null)
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isCancelled = true
    }
  }, deps)

  return { data, loading, error }
}
