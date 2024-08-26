import { theme } from 'antd'

const { useToken } = theme

export function useTokenGlobal () {
  const { token } = useToken()

  return token
}
