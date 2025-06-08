import { useEffect, useState, useCallback } from 'react'

interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useFetchData<T>(
  apiFn: () => Promise<T>,
  deps: any[] = []
): FetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await apiFn()
      setData(result)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Error occurred')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [apiFn])

  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  useEffect(() => {
    let isCancelled = false

    async function initialFetch() {
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

    initialFetch()

    return () => {
      isCancelled = true
    }
  }, deps)

  return { data, loading, error, refetch }
}
