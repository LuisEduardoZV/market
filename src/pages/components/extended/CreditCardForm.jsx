import { DatePicker, Flex, Form, Input, theme } from 'antd'
import dayjs from 'dayjs'

import customParseFormat from 'dayjs/plugin/customParseFormat'

import { DATE_FORMAT_CARD } from '../../../utils/contants'

dayjs.extend(customParseFormat)

const CreditCardForm = () => {
  const { token } = theme.useToken()
  return (
    <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
      <Flex style={{ flexWrap: 'wrap', maxWidth: '50%', gap: 15, justifyContent: 'space-between', paddingRight: 30 }}>
        <Form.Item name='name' label='Full Name' layout='vertical' labelCol={{ flex: 1 }} style={{ width: '100%' }}>
          <Input />
        </Form.Item>
        <Form.Item name='number' label='Card Number' layout='vertical' labelCol={{ flex: 1 }} style={{ width: '100%' }}>
          <Input />
        </Form.Item>
        <Form.Item name='expiry' label='Expiration Date' labelCol={{ flex: 1 }}>
          <DatePicker defaultValue={dayjs('01/2015', DATE_FORMAT_CARD)} format={DATE_FORMAT_CARD} picker='month' />
        </Form.Item>
        <Form.Item name='cvc' label='CVC' labelCol={{ flex: 1 }}>
          <Input />
        </Form.Item>
      </Flex>
      <Flex style={{ maxWidth: '50%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Flex style={{ padding: '2%', maxWidth: '70%', width: '100%', height: '80%', backgroundColor: token.colorWhite, borderRadius: 10 }} className='shadow-card-payment'>
          Card
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CreditCardForm
