import { BASE_URL_API } from '../config'

export async function getCategories () {
  return await fetch(`${BASE_URL_API}/products/categories`)
    .then((res) => {
      if (!res.ok) throw new Error('Error en getCategories')
      return res.json()
    })
}
