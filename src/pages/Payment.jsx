import { useState } from 'react'

import { IconAddressBook, IconCreditCardFilled, IconCubeSend } from '@tabler/icons-react'
import { Button, Flex, Form, message, Steps, theme } from 'antd'

import PAddresForm from './components/P_AddresForm'
import PCheckPayment from './components/P_CheckPayment'
import PPaymentForm from './components/P_PaymentForm'

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
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

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

  return (
    <Flex style={{ paddingBlock: '4%', paddingInline: '8%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Flex vertical style={{ width: '100%' }}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>
          <Form
            name='payment-form'
            labelWrap
            labelCol={{
              span: 4
            }}
            wrapperCol={{
              flex: 1
            }}
            style={{
              maxWidth: '100%'
            }}
            initialValues={{
              shipType: 1
            }}
        /* onFinish={onFinish}
        onFinishFailed={onFinishFailed} */
            autoComplete='off'
          >
            {current === 0 && <PAddresForm />}
            {current === 1 && <PPaymentForm />}
            {current === 2 && <PCheckPayment />}
          </Form>
        </div>
        <div
          style={{
            marginTop: 24
          }}
        >
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px'
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type='primary' onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
        </div>
      </Flex>
    </Flex>
  )
}

export default Payment
