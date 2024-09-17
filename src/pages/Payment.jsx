import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconAddressBook, IconCreditCardFilled, IconCubeSend } from '@tabler/icons-react'
import { Flex, Steps } from 'antd'

import { useDispatch, useSelector } from '../store'

import PAddresForm from './components/P_AddresForm'
import PCheckPayment from './components/P_CheckPayment'
import PPaymentForm from './components/P_PaymentForm'

import { resetCart, setBackStep, setNextStep, setStep } from '../store/cartSlice'

const steps = [
  {
    title: 'Address',
    content: 'First-content',
    icon: <IconAddressBook size={28} />
  },
  {
    title: 'Payment',
    content: 'Second-content',
    icon: <IconCreditCardFilled size={28} />
  },
  {
    title: 'Check & Confirm',
    content: 'Last-content',
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

  useEffect(() => {
    return () => {
      dispatch(setStep(0))
    }
  }, [])

  return (
    <Flex className='payment-page'>
      <Flex vertical>
        <Steps current={checkout.step} items={items} />
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
