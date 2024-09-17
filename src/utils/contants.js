export const CARDS_PER_PAGE = 6
export const DATE_FORMAT_CARD = 'MM/YYYY'
export const SPECIAL_PROMO_CODES = ['ALIBB', 'ALITZEL', 'ALGODON', 'GATO', 'ALIHERMOSA']

export const SHIPPINGS = [
  {
    id: 1,
    name: 'No Rush',
    subtitle: '(Economy Shipping)',
    desc: "Save on shipping cost if you are not in a hurry. Ideal for orders you don't need right away.",
    deliveryTime: '7 to 10 business days.',
    price: 'FREE'
  },
  {
    id: 2,
    name: 'Standard',
    subtitle: '',
    desc: 'The most balanced option between cost and speed. Receive your order in a reasonable time.',
    deliveryTime: '3 to 5 business days.',
    price: '+5 USD'
  },
  {
    id: 3,
    name: 'Express',
    subtitle: '',
    desc: 'Need your order fast? This is the fastest shipping for urgent deliveries.',
    deliveryTime: '1 to 2 business days.',
    price: '+10 USD'
  }
]
