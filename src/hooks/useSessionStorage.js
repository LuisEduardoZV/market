import { useEffect, useState } from 'react'

export default function useSessionStorage (key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key)
    return storedValue === null ? defaultValue : JSON.parse(storedValue)
  })

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === sessionStorage && e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : e.newValue)
      }
    }
    window.addEventListener('storage', listener)

    return () => {
      window.removeEventListener('storage', listener)
    }
  }, [key, defaultValue])

  const setValueInSessionStorage = (newValue) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? newValue(currentValue) : newValue
      sessionStorage.setItem(key, JSON.stringify(result))
      return result
    })
  }

  return [value, setValueInSessionStorage]
}
