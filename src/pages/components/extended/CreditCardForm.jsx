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
      style={{
        maxWidth: '100%'
      }}
      initialValues={{
        ...initValues,
        expiry: initValues?.expiry ? dayjs(initValues.expiry) : null
      }}
      onFinish={(values) => {
        handleFinish(values)
      }}
      autoComplete='off'
    >
      <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
        <Flex style={{ flexWrap: 'wrap', maxWidth: '50%', gap: 15, justifyContent: 'space-between', paddingRight: 30 }}>
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
        <Flex style={{ maxWidth: '50%', width: '100%' }}>

          <Flex style={{ width: '100%', height: '100%' }}>
            <Flex
              className='flip-card'
              style={{ width: '100%', height: '100%' }}
            >
              <FlexMotion
                className='flip-card-inner'
                style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 360 }}
                transition={{ duration: 0.4, animationDirection: 'normal' }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <Flex vertical style={{ padding: '3%', maxWidth: '70%', width: '100%', height: '70%', backgroundColor: token.colorWhite, borderRadius: 10, justifyContent: 'space-between', transition: 'all 0.3s ease-in-out' }} className={`shadow-card-payment ${logoCard.color} flip-card-front`}>
                  <Flex style={{ justifyContent: 'end', width: '100%' }}>
                    {logoCard.logo ? <img src={logoCard.logo} alt='Card logo' style={{ width: 50, height: 50 }} /> : <IconCreditCardFilled size={50} color={token.grey600} />}
                  </Flex>
                  <Flex style={{ width: '100%' }}>
                    <Typography.Title level={3} style={{ color: token.colorWhite }}>{values?.number ? values.number : '0000 0000 0000 0000'}</Typography.Title>
                  </Flex>
                  <Flex style={{ width: '100%', justifyContent: 'space-between', color: token.colorWhite }}>
                    <Flex vertical>
                      <Typography.Text style={{ color: token.grey500, fontSize: '0.7rem' }}>Card Holder</Typography.Text>
                      <Typography.Text style={{ color: 'inherit' }}>{values?.name ? values.name : 'Full Name'}</Typography.Text>
                    </Flex>
                    <Flex vertical>
                      <Typography.Text style={{ color: token.grey500, fontSize: '0.7rem' }}>Expires</Typography.Text>
                      <Typography.Text style={{ color: 'inherit' }}>{values?.expiry ? dayjs(values.expiry).format('MM/YY') : 'MM/YY'}</Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Flex vertical style={{ maxWidth: '70%', width: '100%', height: '70%', backgroundColor: token.colorWhite, borderRadius: 10, position: 'relative', justifyContent: 'space-evenly', transition: 'all 0.3s ease-in-out' }} className={`shadow-card-payment ${logoCard.color} flip-card-back`}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: 'black', minHeight: 40, maxHeight: 40 }} />
                  <Flex vertical style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', color: token.colorWhite, padding: '3%' }}>
                    <Typography.Text style={{ color: token.grey500, fontSize: '0.7rem' }}>CVC</Typography.Text>
                    <Flex style={{ width: '100%', height: '100%', backgroundColor: 'white', minHeight: 30, maxHeight: 30, color: 'black', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 5 }}>
                      {values?.cvc ? values.cvc : ''}
                    </Flex>
                  </Flex>
                  <Flex style={{ justifyContent: 'end', width: '100%', padding: '3%' }}>
                    {logoCard.logo ? <img src={logoCard.logo} alt='Card logo' style={{ width: 40, height: 40 }} /> : <IconCreditCardFilled size={40} color={token.grey600} />}
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
