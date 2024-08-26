import { useMemo } from 'react'

import categories from '../utils/allCategories.json'

export function useGetCategories (catSelected) {
  const categoriesInside = useMemo(() => {
    if (!catSelected) return categories.slice(0, 4)
    const filtered = categories.filter(e => e.id === catSelected)[0]?.subcategories
    return filtered.map((op) => ({ ...op, inside: true }))
  }, [catSelected])

  return { categoriesInside, categories }
}
