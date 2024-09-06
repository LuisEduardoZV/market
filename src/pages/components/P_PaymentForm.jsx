import { useEffect, useState } from 'react'

import { IconBrandPaypalFilled, IconCreditCard, IconCreditCardFilled } from '@tabler/icons-react'
import { Collapse, Flex, Form } from 'antd'

import CreditCardForm from './extended/CreditCardForm'
import StepButtonsPayment from './extended/StepButtonsPayment'

import { useDispatch, useSelector } from '../../store'

const PPaymentForm = ({ handleBack, handleNext, current, steps }) => {
  const [form] = Form.useForm()
  const { checkout } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const [paymentType, setPaymentType] = useState(checkout.payment.type)

  const items = [
    {
      key: 'credit',
      label: (
        <Flex style={{ alignItems: 'center', gap: 5 }}>
          <IconCreditCard />
          Credit Card
        </Flex>
      ),
      children: <CreditCardForm form={form} />,
      showArrow: false
    },
    {
      key: 'card',
      label: (
        <Flex style={{ alignItems: 'center', gap: 5 }}>
          <IconCreditCardFilled />
          Debit Card
        </Flex>
      ),
      children: <CreditCardForm form={form} />,
      showArrow: false
    },
    {
      key: 'paypal',
      label: (
        <Flex style={{ alignItems: 'center', gap: 5 }}>
          <IconBrandPaypalFilled />
          PayPal
        </Flex>
      ),
      showArrow: false
    }
  ]

  useEffect(() => {
    form.setFieldValue('name', '')
    form.setFieldValue('number', '')
    form.setFieldValue('expiry', '')
    form.setFieldValue('cvc', '')
  }, [paymentType, form])

  return (
    <>
      <Flex style={{ width: '100%' }}>
        <Collapse accordion items={items} defaultActiveKey={[paymentType]} style={{ width: '100%' }} onChange={key => setPaymentType(key[0])} />
      </Flex>
      <StepButtonsPayment
        handleBack={handleBack}
        handleNext={handleNext}
        current={current}
        steps={steps}
        form={form}
      />
    </>
  )
}

export default PPaymentForm
