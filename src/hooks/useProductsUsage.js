import { useQuery } from 'react-query'

import { getDisscountProducts, getTopProducts } from '../services/productsFun'

export function useProductsUsage () {
  const { data: topProducts } = useQuery('topProducts', getTopProducts, { refetchOnWindowFocus: false })

  const { data: disscountProducts } = useQuery('disscountProducts', getDisscountProducts, { refetchOnWindowFocus: false })

  return { disscountProducts, topProducts }
}
