import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconAddressBook, IconCreditCardFilled, IconCubeSend } from '@tabler/icons-react'
import { Flex, Steps, Typography } from 'antd'

import { useDispatch, useSelector } from '../store'

import PAddresForm from './components/P_AddresForm'
import PCheckPayment from './components/P_CheckPayment'
import PPaymentForm from './components/P_PaymentForm'

import { resetCart, setBackStep, setNextStep, setStep } from '../store/cartSlice'

const steps = [
  {
    key: 0,
    title: 'Address',
    desc: 'Enter the information of the address where you will receive the package to continue.',
    icon: <IconAddressBook size={28} />
  },
  {
    key: 1,
    title: 'Payment',
    desc: 'Select your preferred payment method and fill in all requested fields to continue.',
    icon: <IconCreditCardFilled size={28} />
  },
  {
    key: 2,
    title: 'Check & Confirm',
    desc: 'Verify all your entered data and confirm your payment.',
    icon: <IconCubeSend size={28} />
  }
]

const Payment = () => {
  const { checkout } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon
  }))

  const handleBack = () => dispatch(setBackStep())
  const handleNext = () => dispatch(setNextStep())
  const handleToSpecificStep = (step) => dispatch(setStep(step))

  const handleDone = () => {
    navigate('/')
    setTimeout(() => {
      dispatch(resetCart())
    }, 150)
  }

  const currentStep = useMemo(() => (steps.find((step) => step.key === checkout.step)), [checkout.step])

  useEffect(() => {
    return () => {
      dispatch(setStep(0))
    }
  }, [])

  return (
    <Flex className='payment-page'>
      <Flex vertical>
        <Steps current={checkout.step} items={items} />
        <Flex vertical className='payment-title'>
          <Typography.Title level={2}>
            {currentStep?.title}
          </Typography.Title>
          <Typography.Text type='secondary'>
            {currentStep?.desc}
          </Typography.Text>
        </Flex>
        <div className='payment-steps-container'>

          {checkout.step === 0 && (
            <PAddresForm
              handleBack={handleBack}
              handleNext={handleNext}
              current={checkout.step}
              steps={steps.length}
            />
          )}
          {checkout.step === 1 && (
            <PPaymentForm
              handleBack={handleBack}
              handleNext={handleNext}
              current={checkout.step}
              steps={steps.length}
            />
          )}
          {checkout.step === 2 && (
            <PCheckPayment
              handleBack={handleBack}
              handleNext={handleNext}
              handleToSpecificStep={handleToSpecificStep}
              handleDone={handleDone}
              steps={steps.length}
            />
          )}

        </div>
      </Flex>
    </Flex>
  )
}

export default Payment
