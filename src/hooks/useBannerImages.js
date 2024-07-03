import { useQuery } from 'react-query'
import usePexelsClient from './usePexelsClient'

import { getBannerImages } from '../services/imagesFunc'

export function useBannerImages (search) {
  const { client } = usePexelsClient()

  const query = (search && search !== '') ? `${search} products` : 'people modeling with some expensive products'

  const { data, isLoading, isError } = useQuery(['banner', query], () => getBannerImages(client, query), { refetchOnWindowFocus: false })

  return { banner: data, isLoading, isError }
}
