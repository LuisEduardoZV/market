import { API_KEY_IMAGES, PEXELS_API } from '../config'

export async function getBannerImages (query) {
  return await fetch(`${PEXELS_API}/search?query=${query}&per_page=4`, {
    method: 'GET',
    headers: {
      Authorization: API_KEY_IMAGES
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error en getProductsByCategory')
      return res.json()
    })
    .then((data) => {
      const { photos } = data

      if (Array.isArray(photos) && photos.length > 0) {
        return photos.map((img) => ({
          url: img?.src?.landscape,
          autor: img?.photographer ?? '',
          alt: img?.alt ?? ''
        }))
      }
      return null
    })
}

export async function getPromoImages (query) {
  return await fetch(`${PEXELS_API}/search?query=${query}&per_page=1`, {
    method: 'GET',
    headers: {
      Authorization: API_KEY_IMAGES
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error en getProductsByCategory')
      return res.json()
    })
    .then((data) => {
      const { photos } = data

      if (Array.isArray(photos) && photos.length > 0) {
        const img = photos[0]
        return {
          url: img?.src?.portrait,
          autor: img?.photographer ?? '',
          alt: img?.alt ?? '',
          color: img?.avg_color
        }
      }
      return null
    })
}
