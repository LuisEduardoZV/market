import { useContext } from 'react'
import { PexelsContext } from '../context/PexelsContext'

const usePexelsClient = () => useContext(PexelsContext)

export default usePexelsClient
