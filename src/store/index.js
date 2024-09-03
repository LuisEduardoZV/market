import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'

import reducer from './reducer'

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
})

const persister = persistStore(store)

const { dispatch } = store

const useDispatch = () => useAppDispatch()
const useSelector = useAppSelector

export { dispatch, persister, store, useDispatch, useSelector }
