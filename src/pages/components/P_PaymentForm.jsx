import { useState } from 'react'

import { IconBrandPaypalFilled, IconCreditCard, IconCreditCardFilled } from '@tabler/icons-react'
import { Collapse, Flex, Form } from 'antd'

import CreditCardForm from './extended/CreditCardForm'
import OnlinePaymentForm from './extended/OnlinePaymentForm'
import StepButtonsPayment from './extended/StepButtonsPayment'

import { useDispatch, useSelector } from '../../store'
import { setPaymentData } from '../../store/cartSlice'

const PPaymentForm = ({ handleBack, handleNext, current, steps }) => {
  const [debit] = Form.useForm()
  const [credit] = Form.useForm()
  const [paypal] = Form.useForm()

  const { checkout } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const [paymentType, setPaymentType] = useState(checkout.payment.type ?? '')
  const [initValues] = useState(checkout.payment?.data ?? {})

  const handleSetPayment = (data) => {
    dispatch(setPaymentData({ type: paymentType, data }))
    handleNext()
  }

  const items = [
    {
      key: 'credit',
      label: (
        <Flex className='payment-type'>
          <IconCreditCard />
          Credit Card
        </Flex>
      ),
      children: <CreditCardForm form={credit} initValues={initValues} handleFinish={handleSetPayment} name='credit-payment-form' />,
      showArrow: false
    },
    {
      key: 'debit',
      label: (
        <Flex className='payment-type'>
          <IconCreditCardFilled />
          Debit Card
        </Flex>
      ),
      children: <CreditCardForm form={debit} initValues={initValues} handleFinish={handleSetPayment} name='debit-payment-form' />,
      showArrow: false
    },
    {
      key: 'paypal',
      label: (
        <Flex className='payment-type'>
          <IconBrandPaypalFilled />
          PayPal
        </Flex>
      ),
      children: (<OnlinePaymentForm form={paypal} initValues={initValues} handleFinish={handleSetPayment} name='paypal-payment-form' />),
      showArrow: false
    }
  ]

  return (
    <>
      <Flex className='paypage-payment-form'>
        <Collapse accordion items={items} defaultActiveKey={[paymentType]} style={{ width: '100%' }} onChange={key => setPaymentType(key[0])} />
      </Flex>
      <StepButtonsPayment
        handleBack={handleBack}
        handleNext={handleSetPayment}
        current={current}
        steps={steps}
        noNext
      />
    </>
  )
}

export default PPaymentForm
