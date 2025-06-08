import { useState } from 'react'

interface MutationOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  onSettled?: () => void
}

export function useFetchFn<T, P = void>(
  mutationFn: (params: P) => Promise<T>,
  options: MutationOptions<T> = {}
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<T | null>(null)

  const fn = async (params: P) => {
    setLoading(true)
    setError(null)

    try {
      const result = await mutationFn(params)
      setData(result)
      options.onSuccess?.(result)
      return result
    } catch (err: any) {
      const error = new Error(err?.message || 'Error occurred')
      setError(error)
      options.onError?.(error)
      throw error
    } finally {
      setLoading(false)
      options.onSettled?.()
    }
  }

  return {
    fn,
    loading,
    error,
    data,
  }
}
