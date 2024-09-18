import { useState } from 'react'
import { useQuery } from 'react-query'

import { searchProducts } from '../services/productsFun'

export function useSearchProducts () {
  const [searching, setSearching] = useState(null)
  const { data, isLoading } = useQuery(['categories', searching], () => searchProducts(searching), { refetchOnWindowFocus: false, enabled: !!searching })

  const onSearch = (value, _e, info) => {
    if (value && info.source === 'input') {
      setSearching(value)
    } else if (info.source === 'clear') {
      setSearching(null)
    }
  }

  return { data, isLoading, searching, onSearch, setSearching }
}
