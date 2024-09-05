import { IconBrandPaypalFilled, IconCreditCard, IconCreditCardFilled } from '@tabler/icons-react'
import { Collapse, Flex } from 'antd'

import CreditCardForm from './extended/CreditCardForm'

const items = [
  {
    key: '1',
    label: (
      <Flex style={{ alignItems: 'center', gap: 5 }}>
        <IconCreditCard />
        Credit Card
      </Flex>
    ),
    children: <CreditCardForm />,
    showArrow: false
  },
  {
    key: '2',
    label: (
      <Flex style={{ alignItems: 'center', gap: 5 }}>
        <IconCreditCardFilled />
        Debit Card
      </Flex>
    ),
    children: <CreditCardForm />,
    showArrow: false
  },
  {
    key: '3',
    label: (
      <Flex style={{ alignItems: 'center', gap: 5 }}>
        <IconBrandPaypalFilled />
        PayPal
      </Flex>
    ),
    showArrow: false
  }
]
const PPaymentForm = () => {
  return (
    <Flex style={{ width: '100%' }}>
      <Collapse accordion items={items} defaultActiveKey={['1']} style={{ width: '100%' }} />
    </Flex>
  )
}

export default PPaymentForm
