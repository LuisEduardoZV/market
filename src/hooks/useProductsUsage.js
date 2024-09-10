import { useQuery } from 'react-query'

import { getClothesProducts, getDisscountProducts, getTechProducts, getTopProducts } from '../services/productsFun'

export function useProductsUsage () {
  const { data: topProducts, isLoading: topProductsLoading } = useQuery('topProducts', getTopProducts, { refetchOnWindowFocus: false })

  const { data: disscountProducts, isLoading: disscountProductsLoading } = useQuery('disscountProducts', getDisscountProducts, { refetchOnWindowFocus: false })

  const { data: topClothes, isLoading: topClothesLoading } = useQuery('topClothes', getClothesProducts, {
    refetchOnWindowFocus: false
  })

  const { data: techProd, isLoading: techProdLoading } = useQuery('techProd', getTechProducts, {
    refetchOnWindowFocus: false
  })

  return { disscountProducts, topProducts, topClothes, techProd, loading: topProductsLoading || disscountProductsLoading || topClothesLoading || techProdLoading }
}
