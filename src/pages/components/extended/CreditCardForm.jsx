import { useMemo, useState } from 'react'

import { IconCreditCardFilled } from '@tabler/icons-react'
import { Button, DatePicker, Flex, Form, Input, theme, Typography } from 'antd'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useFormBtnValidate } from '../../../hooks/useFormBtnValidate'

import { DATE_FORMAT_CARD } from '../../../utils/contants'

import amex from '../../../assets/icons/amex.svg'
import mastercard from '../../../assets/icons/mastercard-logo.svg'
import visa from '../../../assets/icons/visa-logo.svg'

dayjs.extend(customParseFormat)

const FlexMotion = motion.create(Flex)

const CreditCardForm = ({ form, name, initValues, handleFinish }) => {
  const { token } = theme.useToken()
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const { disabled, values } = useFormBtnValidate(form)

  const logoCard = useMemo(() => {
    if (values?.number) {
      const firstNumber = values.number.slice(0, 1)
      switch (firstNumber) {
        case '4':
          return { logo: visa, color: 'visa-bg-card' }
        case '5':
          return { logo: mastercard, color: 'mc-bg-card' }
        case '3':
          return { logo: amex, color: 'amex-bg-card' }
        default:
          return { logo: null, color: 'default-bg-card' }
      }
    }
    return { logo: null, color: 'default-bg-card' }
  }, [values?.number])

  function handleFlip () {
    if (!isAnimating) {
      setIsFlipped(!isFlipped)
      setIsAnimating(true)
    }
  }

  return (
    <Form
      form={form}
      name={name}
      labelWrap
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        flex: 1
      }}
      className='credit-card-form'
      initialValues={{
        ...initValues,
        expiry: initValues?.expiry ? dayjs(initValues.expiry) : null
      }}
      onFinish={(values) => {
        handleFinish(values)
      }}
      autoComplete='off'
    >
      <Flex>
        <Flex className='credit-card-form-container'>
          <Form.Item name='name' label='Full Name' layout='vertical' labelCol={{ flex: 1 }} style={{ width: '100%' }} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='number' type='number' label='Card Number' layout='vertical' labelCol={{ flex: 1 }} style={{ width: '100%' }} rules={[{ required: true, message: 'Card number is required' },
              {
                pattern: /^[0-9]{16}$/, message: 'Invalid card number'
              }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='expiry' label='Expiration Date' labelCol={{ flex: 1 }} rules={[{ required: true }]}>
            <DatePicker format={DATE_FORMAT_CARD} picker='month' />
          </Form.Item>
          <Form.Item
            name='cvc' type='number' label='CVC' labelCol={{ flex: 1 }} rules={[{ required: true, message: 'CVC is required' },
              {
                pattern: /^[0-9]{3,4}$/, message: 'Invalid CVC'
              }]}
          >
            <Input
              onBlur={handleFlip} onFocus={handleFlip}
            />
          </Form.Item>
          <Button type='primary' htmlType='submit' disabled={!disabled}>
            Validate
          </Button>
        </Flex>
        <Flex className='credit-card-interactive-container'>
          <Flex>
            <Flex
              className='flip-card'
            >
              <FlexMotion
                className='flip-card-inner'
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 360 }}
                transition={{ duration: 0.4, animationDirection: 'normal' }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <Flex vertical className={`shadow-card-payment ${logoCard.color} flip-card-front`}>
                  <Flex className='card-logo'>
                    {logoCard.logo ? <img src={logoCard.logo} alt='Card logo' /> : <IconCreditCardFilled color={token.grey600} />}
                  </Flex>
                  <Flex className='card-number'>
                    <Typography.Title level={3}>{values?.number ? values.number : '0000 0000 0000 0000'}</Typography.Title>
                  </Flex>
                  <Flex className='card-info'>
                    <Flex vertical className='card-holder'>
                      <Typography.Text>Card Holder</Typography.Text>
                      <Typography.Text>{values?.name ? values.name : 'Full Name'}</Typography.Text>
                    </Flex>
                    <Flex vertical className='card-expiry'>
                      <Typography.Text>Expires</Typography.Text>
                      <Typography.Text>{values?.expiry ? dayjs(values.expiry).format('MM/YY') : 'MM/YY'}</Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex vertical className={`shadow-card-payment ${logoCard.color} flip-card-back`}>
                  <div className='card-sensor' />
                  <Flex vertical className='card-cvc'>
                    <Typography.Text>CVC</Typography.Text>
                    <Flex>
                      {values?.cvc ? values.cvc : ' '}
                    </Flex>
                  </Flex>
                  <Flex>
                    {logoCard.logo ? <img src={logoCard.logo} alt='Card logo' /> : <IconCreditCardFilled color={token.grey600} />}
                  </Flex>
                </Flex>
              </FlexMotion>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Form>
  )
}

export default CreditCardForm
