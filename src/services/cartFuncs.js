import { BASE_URL_API } from '../config'

export async function getCart () {
  return await fetch(`${BASE_URL_API}/carts/5`)
    .then((res) => {
      if (!res.ok) throw new Error('Error')
      return res.json()
    })
}
