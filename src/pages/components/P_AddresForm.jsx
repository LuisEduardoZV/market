import { Divider, Flex, Form, Input, Radio, Space, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'
import { useDispatch, useSelector } from '../../store'

import { setBillingAddress } from '../../store/cartSlice'
import StepButtonsPayment from './extended/StepButtonsPayment'

import { SHIPPINGS } from '../../utils/contants'

const PAddresForm = ({ handleBack, handleNext, current, steps }) => {
  const screens = useBreakpoint()
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
        span: (screens.xs || screens.lg) ? 4 : 6
      }}
      wrapperCol={{
        flex: 1
      }}
      className='paypage-addres-form'
      initialValues={checkout.billing}
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
      <Form.Item name='shipType' label='Type of shipment' className='paypage-ship-type-container'>
        <Radio.Group>
          <Space direction='vertical'>
            {SHIPPINGS.map(({ id, name, deliveryTime, desc, price, subtitle }) => (
              <Radio.Button key={`shipping-${id}`} value={id} className='paypage-ship-type'>
                <Flex>
                  <Flex vertical className='paypage-ship-type-info'>
                    <Flex>
                      <Typography.Title level={5}>{name}</Typography.Title>
                      <Typography.Text>{' ' + subtitle}</Typography.Text>
                    </Flex>
                    <Divider />
                    <Typography.Text type='secondary'>{desc}</Typography.Text>
                    <Flex>
                      <Typography.Text style={{ fontWeight: 500 }}>Estimated delivery time: </Typography.Text>
                      <Typography.Text>{deliveryTime}</Typography.Text>
                    </Flex>
                  </Flex>
                  <Divider type='vertical' style={{ height: 'auto', marginBlock: '1%' }} />
                  <Flex className='paypage-ship-type-price'>
                    <Typography.Title level={5} italic>{price}</Typography.Title>
                  </Flex>
                </Flex>
              </Radio.Button>
            ))}
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
