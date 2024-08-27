import { useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { getProductsByCategories } from '../services/productsFun'
import { filteringCategoryData, getDataForSubMenuInCategory } from '../utils/func'

export function useCategoryDataMng (categoriesInside, category, subcategory) {
  const [filters, setFilters] = useState({
    subcategory: subcategory ?? null,
    prices: null,
    brand: null,
    rate: null
  })
  const [page, setPage] = useState(1)

  const { data } = useQuery([category, categoriesInside], () => getProductsByCategories(categoriesInside), { refetchOnWindowFocus: false })

  const [currentLoadingMain, setCurrentLoadingMain] = useState(true)

  const { data: dataFiltered, isLoading: loadingFiltered } = useQuery([data, filters], () => filteringCategoryData(data, filters), { refetchOnWindowFocus: false, enabled: !!data })

  const extraInfo = useMemo(() => {
    if (data) {
      setCurrentLoadingMain(false)
      return getDataForSubMenuInCategory(data)
    } else return null
  }, [data])

  const maxPage = useMemo(() => (dataFiltered?.length ? Math.ceil(dataFiltered?.length / 6) : 0), [dataFiltered?.length])

  const { data: paginated, isLoading: loadingPaginated } = useQuery([page, dataFiltered], () => {
    if (dataFiltered) {
      return dataFiltered.slice(0, page * 6)
    } return []
  }, { refetchOnWindowFocus: false, keepPreviousData: true })

  const handleFilters = useCallback((filters) => {
    setPage(1)
    setFilters(filters)
  }, [])

  const nextPage = useCallback(() => {
    setPage(page + 1)
  }, [])

  return { filters, page, extraInfo, maxPage, paginated, isLoading: currentLoadingMain, loadingFiltered, loadingPaginated, handleFilters, nextPage }
}
