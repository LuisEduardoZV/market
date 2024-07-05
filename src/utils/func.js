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
