export async function getBannerImages (client, query) {
  const images = await client.photos.search({ query, per_page: 4 }).then(async (images) => {
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

export async function getImageByDesc (client, query, size = 'small') {
  const images = await Promise.all(query.map(async (op) => {
    const { name, slug } = op
    const img = await client.photos.search({ query: name, per_page: 1 }).then((images) => {
      const { photos } = images
      if (Array.isArray(photos) && photos.length > 0) {
        return photos.map((img) => ({
          url: img?.src[size],
          label: name,
          slug
        }))
      }
      return null
    }).then((data) => (data))
    return img
  })
  )

  return images.flatMap(op => op)
}

export async function getImageById (client, id) {
  const images = await client.photos.show({ id }).then(async (img) => {
    return ({
      url: img?.src?.portrait,
      autor: img?.photographer ?? '',
      alt: img?.alt ?? '',
      color: img?.avg_color
    })
  })
  return images
}
