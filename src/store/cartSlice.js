// third-party
import { createSlice } from '@reduxjs/toolkit'

// project imports
import { dispatch } from '.'
import { SPECIAL_PROMO_CODES } from '../utils/contants'

// ----------------------------------------------------------------------

const initialState = {
  error: null,
  checkout: {
    step: 0,
    products: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: {
      fullName: '',
      address: '',
      cp: '',
      phone: '',
      shipType: 1
    },
    code: '',
    payment: {
      type: '',
      data: {

      }
    }
  }
}

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // HAS ERROR
    hasError (state, action) {
      state.error = action.payload
    },

    // ADD PRODUCT
    addProductSuccess (state, action) {
      state.checkout.products = state.checkout.products.concat(action.payload.product)
      state.checkout.subtotal += action.payload.subtotal
      state.checkout.total = (Number(state.checkout.total) + Number(action.payload.total)).toFixed(2)
    },

    // REMOVE PRODUCT
    removeProductSuccess (state, action) {
      const id = action.payload

      const currentProduct = state.checkout.products.find((op) => op.id === id)

      const lastSubtotal = currentProduct.quantityAdded * currentProduct.price

      state.checkout.subtotal = state.checkout.subtotal - lastSubtotal
      state.checkout.total = Number((state.checkout.total - lastSubtotal).toFixed(2))

      state.checkout.products = state.checkout.products.filter((op) => op.id !== id)
    },

    // UPDATE PRODUCT
    updateProductSuccess (state, action) {
      const { quantityAdded, id, subtotal, total } = action.payload
      const productIndex = state.checkout.products.findIndex((op) => op.id === id)
      const currentProduct = state.checkout.products[productIndex]
      const lastSubtotal = currentProduct.quantityAdded * currentProduct.price

      state.checkout.subtotal = state.checkout.subtotal - lastSubtotal + subtotal
      state.checkout.total = (Number(state.checkout.total) - lastSubtotal + total).toFixed(2)

      state.checkout.products[productIndex].quantityAdded = quantityAdded
    },

    // ADD PROMO CODE
    addPromoCodeSuccess (state, action) {
      state.checkout.code = action.payload
      const randomDiscount = Math.floor(Math.random() * 20) + 5
      const code = String(state.checkout.code).toUpperCase()
      if (SPECIAL_PROMO_CODES.includes(code)) state.checkout.discount = 100
      else state.checkout.discount = randomDiscount
    },

    // SET STEP
    setStepSuccess (state, action) {
      state.checkout.step = action.payload
    },

    // SET NEXT STEP
    setNextStepSuccess (state) {
      state.checkout.step += 1
    },

    // SET BACK STEP
    setBackStepSuccess (state) {
      state.checkout.step -= 1
    },

    // SET BILLING ADDRESS
    setBillingAddressSuccess (state, action) {
      state.checkout.billing = action.payload.data
      state.checkout.shipping = action.payload.shipping
    },

    // SET PAYMENT METHOD
    setPaymentSuccess (state, action) {
      state.checkout.payment = action.payload
    },

    resetCardSuccess (state) {
      state.checkout = initialState.checkout
    }
  }
})

// Reducer
export default slice.reducer

// ----------------------------------------------------------------------

export function addProduct (product) {
  return async () => {
    try {
      dispatch(slice.actions.addProductSuccess(product))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function removeProduct (productId) {
  return async () => {
    try {
      dispatch(slice.actions.removeProductSuccess(productId))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function updateProduct (product) {
  return async () => {
    try {
      dispatch(slice.actions.updateProductSuccess(product))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function addPromoCode (code) {
  return async () => {
    try {
      dispatch(slice.actions.addPromoCodeSuccess(code))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function setStep (step) {
  return () => {
    dispatch(slice.actions.setStepSuccess(step))
  }
}

export function setNextStep () {
  return () => {
    dispatch(slice.actions.setNextStepSuccess({}))
  }
}

export function setBackStep () {
  return () => {
    dispatch(slice.actions.setBackStepSuccess({}))
  }
}

export function setBillingAddress (billing) {
  return async () => {
    try {
      dispatch(slice.actions.setBillingAddressSuccess(billing))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function setPaymentData (data) {
  return async () => {
    try {
      dispatch(slice.actions.setPaymentSuccess(data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function resetCart () {
  return async () => {
    try {
      dispatch(slice.actions.resetCardSuccess())
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

/*
export function setDiscount (code, total) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/discount', { code, total })
      dispatch(slice.actions.setDiscountSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function setShippingCharge (charge, shipping) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/shipping-charge', { charge, shipping })
      dispatch(slice.actions.setShippingChargeSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

export function setPaymentCard (card) {
  return async () => {
    try {
      const response = await axios.post('/api/cart/payment-card', { card })
      dispatch(slice.actions.setPaymentCardSuccess(response.data))
    } catch (error) {
      dispatch(slice.actions.hasError(error))
    }
  }
}

 */
