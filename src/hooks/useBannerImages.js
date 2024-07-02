import { useQuery } from 'react-query'
import usePexelsClient from './usePexelsClient'

import { getBannerImages } from '../services/imagesFunc'

export function useBannerImages () {
  const { client } = usePexelsClient()

  const { data, isLoading, isError } = useQuery('banner', () => getBannerImages(client), { refetchOnWindowFocus: false })

  return { banner: data, isLoading, isError }
}
