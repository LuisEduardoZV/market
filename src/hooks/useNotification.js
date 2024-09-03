import { useContext } from 'react'
import { NotifyContext } from '../context/NotifyContext'

const useNotification = () => useContext(NotifyContext)

export default useNotification
