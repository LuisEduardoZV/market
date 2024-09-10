import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconAddressBook, IconCreditCardFilled, IconCubeSend } from '@tabler/icons-react'
import { Flex, Steps, theme } from 'antd'

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

  const { token } = theme.useToken()

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon
  }))

  const contentStyle = {
    minHeight: 300,
    color: token.colorTextTertiary,
    backgroundColor: token.colordivider,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
    padding: '2%'
  }

  const handleBack = () => dispatch(setBackStep())
  const handleNext = () => dispatch(setNextStep())
  const handleToSpecificStep = (step) => dispatch(setStep(step))

  const handleDone = () => {
    setTimeout(() => {
      navigate('/')
      dispatch(resetCart())
    }, 500)
  }

  useEffect(() => {
    return () => {
      dispatch(setStep(0))
    }
  }, [])

  return (
    <Flex style={{ paddingBlock: '4%', paddingInline: '8%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Flex vertical style={{ width: '100%' }}>
        <Steps current={checkout.step} items={items} />
        <div style={contentStyle}>

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
