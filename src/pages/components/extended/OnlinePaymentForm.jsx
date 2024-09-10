import { Button, Flex, Form, Input, Typography } from 'antd'

import { useFormBtnValidate } from '../../../hooks/useFormBtnValidate'

const OnlinePaymentForm = ({ form, name, initValues, handleFinish }) => {
  const { disabled } = useFormBtnValidate(form)

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
        username: initValues?.username ? initValues.username : ''
      }}
      onFinish={(values) => {
        handleFinish(values)
      }}
      autoComplete='off'
    >
      <Flex vertical>
        <Typography.Paragraph>
          Enter the email address or username affiliated to your PayPal account and follow the steps in the pop-up window when you finish the process:
        </Typography.Paragraph>
        <Form.Item name='username' label='Username / Email' layout='vertical' labelCol={{ flex: 1 }} style={{ width: '100%' }} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type='primary' htmlType='submit' disabled={!disabled} style={{ width: 'fit-content' }}>
          Next
        </Button>
      </Flex>
    </Form>
  )
}

export default OnlinePaymentForm
