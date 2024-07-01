import { useContext } from 'react'
import { ConfigContext } from '../context/ConfigContext'

const useConfig = () => useContext(ConfigContext)

export default useConfig
