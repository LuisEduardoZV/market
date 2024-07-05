import { useQuery } from 'react-query'

import { getClothesProducts, getDisscountProducts, getTechProducts, getTopProducts } from '../services/productsFun'

export function useProductsUsage () {
  const { data: topProducts } = useQuery('topProducts', getTopProducts, { refetchOnWindowFocus: false })

  const { data: disscountProducts } = useQuery('disscountProducts', getDisscountProducts, { refetchOnWindowFocus: false })

  const { data: topClothes } = useQuery('topClothes', getClothesProducts, {
    refetchOnWindowFocus: false
  })

  const { data: techProd } = useQuery('techProd', getTechProducts, {
    refetchOnWindowFocus: false
  })

  return { disscountProducts, topProducts, topClothes, techProd }
}
