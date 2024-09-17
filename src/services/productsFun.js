import { BASE_URL_API } from '../config'
import { shuffle } from '../utils/func'

export async function searchProducts (query) {
  return await fetch(`${BASE_URL_API}/products/search?q=${query}`, {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*'
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error en searchProducts')
      return res.json()
    })
}

export async function getCategories () {
  return await fetch(`${BASE_URL_API}/products/categories`, {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*'
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error en getCategories')
      return res.json()
    })
}

export async function getProductsByCategories (categories) {
  const images = await Promise.all(categories.map(async (op) => {
    const { id } = op
    return await fetch(`${BASE_URL_API}/products/category/${id}/`, {
      headers: new Headers({
        'Access-Control-Allow-Origin': '*'
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error en getProductsByCategory')
        return res.json()
      })
      .then((data) => {
        const res = data.products
        return res
      })
  })
  )

  const data = images.flatMap(op => op)
  return data
}

export async function getTopProductsByCategory (category) {
  return await fetch(`${BASE_URL_API}/products/category/${category}/?limit=4&sortBy=rating&order=desc`, {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*'
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error en getTopProductsByCategory')
      return res.json()
    })
    .then((data) => {
      return data.products
    })
}

export async function getTopProducts () {
  return await fetch(`${BASE_URL_API}/products/?limit=12&sortBy=rating&order=desc`, {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*'
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error en getTopProducts')
      return res.json()
    })
    .then((data) => {
      const res = data.products
      shuffle(res)
      return res
    })
}

export async function getClothesProducts () {
  const woman = await getTopProductsByCategory('womens-dresses')
  const man = await getTopProductsByCategory('mens-shirts')
  const tops = await getTopProductsByCategory('tops')

  const res = [...woman, ...man, ...tops]
  shuffle(res)

  return res
}

export async function getTechProducts () {
  const laptops = await getTopProductsByCategory('laptops')
  const mobAcc = await getTopProductsByCategory('mobile-accessories')
  const smartphones = await getTopProductsByCategory('smartphones')
  const tablets = await getTopProductsByCategory('tablets')

  const res = [...laptops, ...mobAcc, ...smartphones, ...tablets]
  const data = res.splice(0, 12)
  shuffle(data)

  return data
}

export async function getDisscountProducts () {
  return await fetch(`${BASE_URL_API}/products/?limit=12&sortBy=price&order=asc`, {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*'
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error')
      return res.json()
    })
    .then((data) => {
      const res = data.products
      shuffle(res)
      return res
    })
}

export async function getProductById (id) {
  return await fetch(`${BASE_URL_API}/products/${id}`, {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*'
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error')
      return res.json()
    })
}
