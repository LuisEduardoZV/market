import { BASE_URL_API } from '../config'

export async function getCategories () {
  return await fetch(`${BASE_URL_API}/products/categories`)
    .then((res) => {
      if (!res.ok) throw new Error('Error en getCategories')
      return res.json()
    })
}

export async function getTopProductsByCategory (category) {
  return await fetch(`${BASE_URL_API}/products/category/${category}/?select=title,price,discountPercentage,thumbnail,tags,rating,brand&limit=15&sortBy=rating&order=desc`)
    .then((res) => {
      if (!res.ok) throw new Error('Error en getTopProductsByCategory')
      return res.json()
    })
    .then((data) => data.products)
}

export async function getTopProducts () {
  return await fetch(`${BASE_URL_API}/products/?select=title,price,rating,thumbnail&limit=15&sortBy=rating&order=desc`)
    .then((res) => {
      if (!res.ok) throw new Error('Error en getTopProducts')
      return res.json()
    })
    .then((data) => data.products)
}

export async function getDisscountProducts () {
  return await fetch(`${BASE_URL_API}/products/?select=title,price,discountPercentage,thumbnail&limit=15&sortBy=price&order=asc`)
    .then((res) => {
      if (!res.ok) throw new Error('Error')
      return res.json()
    })
    .then((data) => data.products)
}
