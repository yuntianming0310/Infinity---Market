import { useFetchData } from '@/hooks/useFetchData'
import { useLocation } from 'react-router'

function Index() {
  const location = useLocation()
  const {
    state: { id },
  } = location

  const { data, isLoading } = useFetchData('/products/' + id)

  if (isLoading) return null

  return <div>{JSON.stringify(data)}</div>
}

export default Index
