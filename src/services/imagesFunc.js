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

export async function getImageByDesc (client, query) {
  const images = await Promise.all(query.map(async (op) => {
    const img = await client.photos.search({ query: op, per_page: 1 }).then((images) => {
      const { photos } = images
      if (Array.isArray(photos) && photos.length > 0) {
        return photos.map((img) => ({
          url: img?.src?.small,
          label: op
        }))
      }
      return null
    }).then((data) => (data))
    return img
  })
  )

  return images.flatMap(op => op)
}
