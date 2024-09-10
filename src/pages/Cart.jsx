import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Collapse, Divider, Flex, Input, Select, Space, Typography, theme } from 'antd'

import useNotification from '../hooks/useNotification'
import PromoBanner from '../pages/components/PromoBanner'
import { useDispatch, useSelector } from '../store'
import { addPromoCode, removeProduct, updateProduct } from '../store/cartSlice'

import { IconCreditCardPay } from '@tabler/icons-react'

const { Title, Text, Link, Paragraph } = Typography
const { useToken } = theme

const RedemCode = ({ handleAddPromoCode }) => {
  const [code, setCode] = useState('')

  return (
    <>
      <Input placeholder='Enter promo code' value={code} onChange={(e) => setCode(e.target.value)} style={{ width: '100%' }} />
      <Button type='primary' disabled={!code} onClick={() => handleAddPromoCode(code)}>Add</Button>
    </>
  )
}

const Cart = () => {
  const { checkout } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { openNotification } = useNotification()

  const { token } = useToken()

  const handleDelete = (id) => {
    dispatch(removeProduct(id))
  }

  const handleUpdate = (value, product) => {
    dispatch(updateProduct({ quantityAdded: value, id: product.id, subtotal: product.price * value, total: product.price * value }))
  }

  const handleAddPromoCode = (code) => {
    dispatch(addPromoCode(code))
    openNotification({ message: 'Promo code added.', type: 'success' })
  }

  if (!checkout) return null
  return (
    <Flex vertical style={{ paddingBlock: '4%', paddingInline: '8%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Flex style={{ justifyContent: 'space-between', width: '100%' }}>
        <Flex vertical style={{ width: '100%', maxWidth: '70%', backgroundColor: token.colorBgElevated, padding: '1.5%' }} className='shadow-cart-cards'>
          <Title level={4}>Shopping Cart</Title>
          <Divider />
          <Space direction='vertical'>
            {checkout.products.map((op) => (
              <Flex key={op.id} style={{ width: '100%', gap: 20, justifyContent: 'space-between', borderBottom: `1px solid ${token.colorBorder}`, paddingBlock: '4%' }}>
                <Flex style={{ backgroundColor: token.colorBgBase }}>
                  <img
                    src={op.thumbnail}
                    alt={`Thumbnail of ${op.title}`}
                    style={{ maxHeight: 200, width: '100%', objectFit: 'contain' }}
                  />
                </Flex>
                <Flex vertical style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Flex vertical style={{ marginBlock: 5 }}>
                    <Title level={5} style={{ margin: 0 }}>{op.title}</Title>
                    <Text type='success' style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>In Stock</Text>
                  </Flex>
                  <Paragraph
                    ellipsis={{
                      rows: 1,
                      expandable: true,
                      symbol: 'more'
                    }}
                    style={{ marginBlock: 15 }}
                  >
                    {op.description}
                  </Paragraph>
                  <Text type='secondary' italic>Product sent by MarketStore</Text>
                  <Flex style={{ marginTop: 20, gap: 10, alignItems: 'center' }}>
                    <Select
                      defaultValue={op.quantityAdded}
                      style={{ width: 130 }}
                      onChange={(value) => handleUpdate(value, op)}
                      options={Array.from({ length: 10 }, (_, i) => ({
                        value: i + 1,
                        label: `${i + 1} units`
                      }))}
                    />
                    <Divider type='vertical' style={{ borderColor: token.colorPrimaryBg }} />
                    <Link style={{ fontSize: '0.8rem' }} onClick={() => handleDelete(op.id)}>Delete</Link>
                    <Divider type='vertical' style={{ borderColor: token.colorPrimaryBg }} />
                    <Link style={{ fontSize: '0.8rem' }}>Save to favs</Link>
                  </Flex>
                </Flex>
                <Flex style={{ width: 'max-content' }}>
                  <Text style={{ fontWeight: 'bold', wordBreak: 'keep-all' }}>${op.price}</Text>
                </Flex>
              </Flex>
            ))}
          </Space>
        </Flex>
        <Flex vertical style={{ width: '100%', maxWidth: '25%', backgroundColor: token.colorPrimary, height: 'fit-content', padding: '1.5%', color: token.colorWhite, position: 'sticky', top: '10%' }}>
          <Flex style={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Title level={5} style={{ color: 'inherit', margin: 0 }}>Subtotal: </Title>
            <Title level={5} style={{ color: 'inherit', margin: 0 }}>${checkout.subtotal?.toFixed(2)}</Title>
          </Flex>
          <Flex style={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Text italic style={{ color: 'inherit', margin: 0 }}>Import costs: </Text>
            <Text underline style={{ color: 'inherit', margin: 0 }}>$0.00</Text>
          </Flex>
          {checkout?.code && (
            <Flex style={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <Text italic style={{ color: 'inherit', margin: 0 }}>Promo code: </Text>
              <Text style={{ color: 'inherit', margin: 0, fontWeight: 'bold' }}>{checkout.code}</Text>
            </Flex>
          )}
          <Divider style={{ borderColor: token.colorPrimaryBg, marginBlock: 10 }} />
          <Flex style={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', paddingBlock: '5%' }}>
            <Title level={2} underline style={{ color: 'inherit', margin: 0 }}>Total: </Title>
            <Title level={2} style={{ color: 'inherit', margin: 0 }}>${checkout.total}</Title>
          </Flex>
          <Collapse
            items={[{
              key: 'code',
              label: 'Apply promo code',
              children: (<RedemCode handleAddPromoCode={handleAddPromoCode} />),
              style: { padding: 0, margin: 0, color: 'white!important' }
            }]}
            style={{ border: 'none', color: 'white!important' }}
            size='small'
            className='class'
          />
          <Button type='default' style={{ width: '100%', marginTop: 15, marginBottom: 5 }} icon={<IconCreditCardPay />} onClick={(() => navigate('/payment'))}>
            Go to payment
          </Button>
        </Flex>
      </Flex>
      <PromoBanner inCategory />
    </Flex>
  )
}

export default Cart
