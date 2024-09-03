import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartSlice from './cartSlice'

const reducer = combineReducers({
  cart: persistReducer(
    {
      key: 'cart',
      storage
    },
    cartSlice
  )
})

export default reducer
