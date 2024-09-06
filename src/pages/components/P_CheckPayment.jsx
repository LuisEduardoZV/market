import { Fragment } from 'react'

import { Button, Divider, Flex, Typography, theme } from 'antd'

import StepButtonsPayment from './extended/StepButtonsPayment'

import { useSelector } from '../../store'

const PCheckPayment = ({ handleBack, handleNext, handleDone, steps }) => {
  const { checkout } = useSelector((state) => state.cart)
  const { token } = theme.useToken()

  console.log(checkout)

  return (
    <Flex style={{ width: '100%', justifyContent: 'space-between', gap: 50 }}>
      <Flex vertical style={{ width: '100%', gap: 50 }}>
        <Flex vertical style={{ width: '100%', gap: 15 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Products
          </Typography.Title>
          <Flex vertical style={{ width: '100%', backgroundColor: token.colorBgElevated, padding: '1.5%' }}>
            {checkout.products.map((op, index) => (
              <Fragment key={op.id}>
                <Flex style={{ width: '100%' }}>
                  <img src={op.thumbnail} alt='Product image' style={{ width: 80, height: 80, objectFit: 'cover' }} />
                  <Flex vertical style={{ width: '100%', justifyContent: 'space-evenly', marginLeft: 10 }}>
                    <Typography.Text>{op.title}</Typography.Text>
                    <Typography.Paragraph
                      ellipsis={{
                        rows: 1,
                        expandable: true,
                        symbol: ''
                      }}
                      type='secondary'
                      style={{ margin: 0, fontSize: '0.85rem' }}
                    >{op.description}
                    </Typography.Paragraph>
                    <Typography.Text type='secondary' italic>Quantity: {op.quantityAdded} units</Typography.Text>
                  </Flex>
                </Flex>
                {index !== checkout.products.length - 1 && <Divider />}
              </Fragment>
            ))}
          </Flex>
        </Flex>
        <Flex vertical style={{ width: '100%', gap: 15 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Shipping information
          </Typography.Title>
          <Flex vertical style={{ width: '100%', backgroundColor: token.colorBgElevated, padding: '1.5%' }}>
            <Flex style={{ width: '100%' }}>
              <Flex vertical style={{ width: '100%', justifyContent: 'space-evenly', marginLeft: 10 }}>
                <Typography.Text>Direccion</Typography.Text>
                <Typography.Text type='secondary' italic>Mas datos</Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical style={{ width: '100%', gap: 15 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Payment detail
          </Typography.Title>
          <Flex vertical style={{ width: '100%', backgroundColor: token.colorBgElevated, padding: '1.5%' }}>
            <Flex style={{ width: '100%' }}>
              <Flex vertical style={{ width: '100%', justifyContent: 'space-evenly', marginLeft: 10 }}>
                <Typography.Text>Direccion</Typography.Text>
                <Typography.Text type='secondary' italic>Mas datos</Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <StepButtonsPayment
          handleBack={handleBack}
          handleNext={handleNext}
          handleDone={handleDone}
          current={checkout.step}
          steps={steps}
        />
      </Flex>

      <Flex vertical style={{ maxWidth: '30%', width: '100%', backgroundColor: token.colorBgElevated, padding: '1.5%', position: 'relative' }}>
        <Flex vertical style={{ position: 'sticky', top: '20%', width: '100%' }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Purchase summary
          </Typography.Title>
          <Divider />
          <Flex style={{ justifyContent: 'space-between' }}>
            <Typography.Text>Subtotal ({checkout.products.length}):</Typography.Text>
            <Typography.Text>${checkout.subtotal} USD</Typography.Text>
          </Flex>
          <Flex style={{ justifyContent: 'space-between' }}>
            <Typography.Text>Shipping:</Typography.Text>
            <Typography.Text>+ ${checkout.shipping} USD</Typography.Text>
          </Flex>
          <Flex style={{ justifyContent: 'space-between' }}>
            <Typography.Text>Promo code:</Typography.Text>
            <Typography.Text>- ${checkout.code ?? 0} USD</Typography.Text>
          </Flex>
          <Divider />
          <Flex style={{ justifyContent: 'space-between' }}>
            <Typography.Text italic strong>Total:</Typography.Text>
            <Typography.Text italic strong>${checkout.total} USD</Typography.Text>
          </Flex>
          <Button
            type='primary'
            style={{ marginTop: 40, marginBottom: 10 }}
          >
            Confirm & Pay
          </Button>
        </Flex>
      </Flex>

    </Flex>
  )
}

export default PCheckPayment
