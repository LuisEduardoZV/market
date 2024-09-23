import { useQuery } from 'react-query'

import { getBannerImages, getPromoImages } from '../services/imagesFunc'

export function useBannerImages (search, promoSearch) {
  const query = (search && search !== '') ? `${search} products` : 'modeling'

  const { data: banner, isLoading: isLoadingBanner, isError: isErrorBanner } = useQuery(['banner', query], () => getBannerImages(query), { refetchOnWindowFocus: false })

  const { data: promo, isLoading: isLoadingPromo, isError: isErrorPromo } = useQuery(['promo'], () => getPromoImages(promoSearch), { refetchOnWindowFocus: false })

  return {
    banner,
    isLoadingBanner,
    isErrorBanner,
    promo,
    isLoadingPromo,
    isErrorPromo
  }
}
