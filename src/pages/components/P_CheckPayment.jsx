import { Fragment, useMemo } from 'react'

import { IconCashRegister, IconMap2 } from '@tabler/icons-react'
import { Avatar, Button, Divider, Flex, Typography, message, theme } from 'antd'
import dayjs from 'dayjs'

import StepButtonsPayment from './extended/StepButtonsPayment'

import { useSelector } from '../../store'

const PCheckPayment = ({ handleBack, handleNext, handleDone, steps, handleToSpecificStep }) => {
  const { checkout } = useSelector((state) => state.cart)
  const { token } = theme.useToken()
  const [messageApi, contextHolder] = message.useMessage()

  const handleConfirmPayment = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'Making payment...',
        duration: 2.5
      })
      .then(() => {
        message.success('Payment successful1', 2.5)
        handleDone()
      })
  }

  const finalPrice = useMemo(() => {
    let totalWithDiscount = 0
    if (checkout?.code) {
      totalWithDiscount = (checkout.discount * checkout.subtotal) / 100
    }
    return { total: checkout.subtotal - totalWithDiscount + checkout.shipping, discount: totalWithDiscount }
  }, [checkout])

  return (
    <Flex style={{ width: '100%', justifyContent: 'space-between', gap: 50 }}>
      {contextHolder}
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
          <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Shipping information - {checkout.billing.shipType === 1 ? 'No Rush' : checkout.billing.shipType === 2 ? 'Standard' : 'Express'}
            </Typography.Title>
            <Typography.Text underline style={{ cursor: 'pointer' }} onClick={() => handleToSpecificStep(0)}>Editar</Typography.Text>
          </Flex>
          <Flex vertical style={{ width: '100%', backgroundColor: token.colorBgElevated, padding: '1.5%' }}>
            <Flex style={{ width: '100%' }}>
              <Flex style={{ width: '100%', marginLeft: 10 }}>
                <Avatar style={{ backgroundColor: token.colorPrimary }} icon={<IconMap2 />} size='large' />
                <Flex vertical style={{ width: '100%', justifyContent: 'space-evenly', marginLeft: 10 }}>
                  <Typography.Text>{checkout.billing.fullName} ({checkout.billing.phone})</Typography.Text>
                  <Typography.Text type='secondary' italic>
                    {checkout.billing.address}
                  </Typography.Text>
                  <Typography.Text type='secondary' italic>
                    CP: {checkout.billing.cp}
                  </Typography.Text>
                  <Typography.Paragraph type='secondary' italic ellipsis={{ rows: 1, expandable: true, symbol: '' }} style={{ margin: 0 }}>
                    {checkout.billing.more}
                  </Typography.Paragraph>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex vertical style={{ width: '100%', gap: 15 }}>
          <Flex style={{ width: '100%', justifyContent: 'space-between' }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Payment detail - <span style={{ textTransform: 'capitalize' }}>{(checkout.payment.type !== 'paypal') ? checkout.payment.type + ' Card' : checkout.payment.type}</span>
            </Typography.Title>
            <Typography.Text underline style={{ cursor: 'pointer' }} onClick={() => handleToSpecificStep(1)}>Editar</Typography.Text>
          </Flex>
          <Flex vertical style={{ width: '100%', backgroundColor: token.colorBgElevated, padding: '1.5%' }}>
            <Flex style={{ width: '100%' }}>
              <Flex style={{ width: '100%', marginLeft: 10 }}>
                <Avatar style={{ backgroundColor: token.colorPrimary }} icon={<IconCashRegister />} size='large' />
                <Flex vertical style={{ width: '100%', justifyContent: 'space-evenly', marginLeft: 10 }}>
                  {checkout.payment.type !== 'paypal'
                    ? (
                      <>
                        <Typography.Text>{checkout.payment.data.name}</Typography.Text>
                        <Typography.Text type='secondary' italic>
                          {checkout.payment.data.number}
                        </Typography.Text>
                        <Typography.Text type='secondary' italic>
                          {dayjs(checkout.payment.data.expiry).format('MM/YY')}
                        </Typography.Text>
                        <Typography.Text type='secondary' italic>
                          *Not available in interest-free months
                        </Typography.Text>
                      </>
                      )
                    : (
                      <>
                        <Typography.Text type='secondary' italic>
                          The account affiliated to <span style={{ fontWeight: 'bold' }}>{checkout.payment.data.username}</span> was entered, a login will be required when confirming and paying in order to make the payment.
                        </Typography.Text>
                        <Typography.Text type='secondary' italic>
                          *In case of error, no payment will be made.
                        </Typography.Text>
                      </>
                      )}
                </Flex>
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
            <Typography.Text>Promo code ({checkout.code}):</Typography.Text>
            <Typography.Text>- ${checkout.discount ?? 0} %</Typography.Text>
          </Flex>
          <Flex vertical style={{ justifyContent: 'end', alignItems: 'end' }}>
            <Typography.Text>Code discount:</Typography.Text>
            <Typography.Text>- ${finalPrice.discount} USD</Typography.Text>
          </Flex>
          <Divider />
          <Flex style={{ justifyContent: 'space-between' }}>
            <Typography.Text italic strong>Total:</Typography.Text>
            <Typography.Text italic strong>${finalPrice.total} USD</Typography.Text>
          </Flex>
          <Button
            type='primary'
            style={{ marginTop: 40, marginBottom: 10 }}
            onClick={handleConfirmPayment}
          >
            Confirm & Pay
          </Button>
        </Flex>
      </Flex>

    </Flex>
  )
}

export default PCheckPayment
