import { Divider, Flex, Form, Input, Radio, Space, Typography } from 'antd'
import { useDispatch, useSelector } from '../../store'

import { setBillingAddress } from '../../store/cartSlice'
import StepButtonsPayment from './extended/StepButtonsPayment'

const PAddresForm = ({ handleBack, handleNext, current, steps }) => {
  const [form] = Form.useForm()
  const { checkout } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleSaveAddress = () => {
    dispatch(setBillingAddress({
      data: form.getFieldsValue(),
      shipping: form.getFieldValue('shipType') === 1 ? 0 : form.getFieldValue('shipType') === 2 ? 5 : 10
    }))
    handleNext()
  }

  return (
    <Form
      form={form}
      name='address-form'
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
      initialValues={checkout.billing}
        /* onFinishFailed={onFinishFailed} */
      autoComplete='off'
    >
      <Form.Item
        label='Full name of recipient'
        name='fullName'
        rules={[
          {
            required: true,
            message: 'Please input your fullname!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Address'
        name='address'
        rules={[
          {
            required: true,
            message: 'Please input your address!'
          }
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='C.P.'
        name='cp'
        rules={[
          {
            required: true,
            message: 'Please input your CP!'
          },
          { pattern: /^\d{3,4}$/, message: 'Please input a valid CP!' }
        ]}
      >
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item
        label='Contact Phone'
        name='phone'
        rules={[
          {
            required: true,
            message: 'Please input your phone!'
          },
          { pattern: /^\d/, message: 'Please input a valid phone!' }
        ]}
      >
        <Input style={{ width: '50%' }} />
      </Form.Item>
      <Form.Item
        label='Additional information'
        name='more'
        rules={[{ required: false }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Divider />
      <Form.Item name='shipType' label='Type of shipment'>
        <Radio.Group style={{ width: '100%' }}>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Radio.Button value={1} style={{ width: '100%', height: 'auto' }}>
              <Flex style={{ width: '100%' }}>
                <Flex vertical style={{ width: '100%' }}>
                  <Flex style={{ alignItems: 'center', gap: 5 }}>
                    <Typography.Title level={5} style={{ margin: 0 }}>No Rush</Typography.Title>
                    <Typography.Text style={{ margin: 0 }}> (Economy Shipping)</Typography.Text>
                  </Flex>
                  <Divider style={{ margin: 0, marginBlock: '1%' }} />
                  <Typography.Text type='secondary'>Save on shipping cost if you are not in a hurry. Ideal for orders you don't need right away.</Typography.Text>
                  <Flex style={{ alignItems: 'center', gap: 5, marginTop: '1%' }}>
                    <Typography.Text style={{ fontWeight: 500 }}>Estimated delivery time: </Typography.Text>
                    <Typography.Text>7 to 10 business days.</Typography.Text>
                  </Flex>
                </Flex>
                <Divider type='vertical' style={{ height: 'auto', marginBlock: '1%' }} />
                <Flex style={{ minWidth: '15%', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography.Title level={5} italic style={{ fontWeight: 700 }}>FREE</Typography.Title>
                </Flex>
              </Flex>
            </Radio.Button>
            <Radio.Button value={2} style={{ width: '100%', height: 'auto' }}>
              <Flex style={{ width: '100%' }}>
                <Flex vertical style={{ width: '100%' }}>
                  <Flex style={{ alignItems: 'center', gap: 5 }}>
                    <Typography.Title level={5} style={{ margin: 0 }}>Standard</Typography.Title>
                  </Flex>
                  <Divider style={{ margin: 0, marginBlock: '1%' }} />
                  <Typography.Text type='secondary'>The most balanced option between cost and speed. Receive your order in a reasonable time.</Typography.Text>
                  <Flex style={{ alignItems: 'center', gap: 5, marginTop: '1%' }}>
                    <Typography.Text style={{ fontWeight: 500 }}>Estimated delivery time: </Typography.Text>
                    <Typography.Text>3 to 5 business days.</Typography.Text>
                  </Flex>
                </Flex>
                <Divider type='vertical' style={{ height: 'auto', marginBlock: '1%' }} />
                <Flex style={{ minWidth: '15%', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography.Title level={5} italic style={{ fontWeight: 700 }}>+5 USD</Typography.Title>
                </Flex>
              </Flex>
            </Radio.Button>
            <Radio.Button value={3} style={{ width: '100%', height: 'auto' }}>
              <Flex style={{ width: '100%' }}>
                <Flex vertical style={{ width: '100%' }}>
                  <Flex style={{ alignItems: 'center', gap: 5 }}>
                    <Typography.Title level={5} style={{ margin: 0 }}>Express</Typography.Title>
                  </Flex>
                  <Divider style={{ margin: 0, marginBlock: '1%' }} />
                  <Typography.Text type='secondary'>Need your order fast? This is the fastest shipping for urgent deliveries.</Typography.Text>
                  <Flex style={{ alignItems: 'center', gap: 5, marginTop: '1%' }}>
                    <Typography.Text style={{ fontWeight: 500 }}>Estimated delivery time: </Typography.Text>
                    <Typography.Text>1 to 2 business days.</Typography.Text>
                  </Flex>
                </Flex>
                <Divider type='vertical' style={{ height: 'auto', marginBlock: '1%' }} />
                <Flex style={{ minWidth: '15%', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography.Title level={5} italic style={{ fontWeight: 700 }}>+10 USD</Typography.Title>
                </Flex>
              </Flex>
            </Radio.Button>
          </Space>
        </Radio.Group>
      </Form.Item>

      <StepButtonsPayment
        handleBack={handleBack}
        handleNext={handleSaveAddress}
        current={current}
        steps={steps}
        form={form}
      />
    </Form>
  )
}

export default PAddresForm
