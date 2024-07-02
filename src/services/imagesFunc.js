export async function getBannerImages (client) {
  const images = await client.photos.search({ query: 'people modeling in beach', per_page: 4 }).then(async (images) => {
    const { photos } = images
    if (Array.isArray(photos) && photos.length > 0) {
      return photos.map((img) => ({
        url: img?.src?.landscape,
        autor: img?.photographer ?? '',
        alt: img?.alt ?? ''
      }))
    }
    return null
  })
  return images
}
