import { Divider, Flex, Form, Input, Radio, Space, Typography } from 'antd'

const PAddresForm = () => {
  return (
    <>
      <Form.Item
        label='Full name of recipient'
        name='fullname'
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
          }
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
          }
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
    </>
  )
}

export default PAddresForm
