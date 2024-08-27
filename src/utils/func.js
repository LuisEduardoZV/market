export function lightenColor (hex, amount) {
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  r = Math.min(255, r + amount)
  g = Math.min(255, g + amount)
  b = Math.min(255, b + amount)

  const newHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
  return newHex
}

export async function shuffle (array) {
  await array.sort(() => Math.random() - 0.5)
}

export function getDataForSubMenuInCategory (subcategories) {
  const prices = subcategories.map((op) => op.price)
  const brands = subcategories.map((op) => op.brand)

  const min = Math.floor(Math.min(...prices))
  const max = Math.ceil(Math.max(...prices))
  const noRepeatBrands = new Set(brands)

  return { prices: [min, max], brands: [...noRepeatBrands] }
}

export async function filteringCategoryData (data, filters) {
  let newData = [].concat(data)

  for (const type in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, type)) {
      const filter = filters[type]
      if (!filter) continue

      switch (type) {
        case 'subcategory':
          newData = newData.filter(product => product.category === filter)
          break
        case 'brand':
          newData = newData.filter(product => product.brand === filter)
          break
        case 'rate':
          newData = newData.filter(product => Math.floor(product.rating) === filter)
          break
        case 'prices':
          newData = newData.filter(product => product.price >= filter[0] && product.price <= filter[1])
          break
        default:
          newData = newData.filter(product => product[type] === filter)
          break
      }
    }
  }

  return newData
}
