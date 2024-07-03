import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { getImageByDesc } from '../services/imagesFunc'
import { getCategories } from '../services/productsFun'
import usePexelsClient from './usePexelsClient'

export function useGetCategories (catSelected) {
  const { client } = usePexelsClient()
  const { data } = useQuery('getCategories', getCategories, { refetchOnWindowFocus: false })

  const { data: categories } = useQuery('imgCategories', () => getImageByDesc(client, data), { enabled: data?.length > 0 })

  const categoriesInside = useMemo(() => (categories?.slice(0, 4)), [catSelected, categories])

  return { categories, categoriesInside }
}
