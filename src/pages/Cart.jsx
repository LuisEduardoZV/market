import { Checkbox, Divider, Flex, Select, Space, Typography, theme } from 'antd'
import { useEffect, useState } from 'react'

import { getCart } from '../services/cartFuncs'
const { Title, Text, Link } = Typography
const { useToken } = theme

const Cart = () => {
  const { token } = useToken()
  const [cart, setCart] = useState(null)

  useEffect(() => {
    getCart().then(setCart)
  }, [])

  console.log(cart)

  if (!cart) return null
  return (
    <Flex style={{ paddingBlock: '4%', paddingInline: '8%', justifyContent: 'space-between' }}>
      <Flex vertical style={{ width: '100%', maxWidth: '70%', backgroundColor: token.colorBgElevated, padding: '1.5%' }} className='shadow-cart-cards'>
        <Title level={4}>Cart</Title>
        <Space direction='vertical'>
          {cart.products.map((op) => (
            <Flex key={op.id} style={{ width: '100%', gap: 20, justifyContent: 'space-between', borderBottom: `1px solid ${token.colorBorder}`, paddingBlock: '4%' }}>
              <Flex style={{ alignItems: 'center', justifyContent: 'center', paddingInline: '3%' }}>
                <Checkbox defaultChecked />
              </Flex>
              <Flex>
                <img
                  src={op.thumbnail}
                  alt={`Thumbnail of ${op.title}`}
                  style={{ maxHeight: 200, width: '100%', objectFit: 'contain' }}
                />
              </Flex>
              <Flex vertical style={{ width: '100%', justifyContent: 'space-between' }}>
                <Title level={5}>{op.title}</Title>
                <Text type='secondary' italic>Product sent by MarketStore</Text>
                <Flex style={{ marginTop: 20, gap: 10, alignItems: 'center' }}>
                  <Select
                    defaultValue={op.quantity}
                    style={{ width: 120 }}
                    options={Array.from({ length: 10 }, (_, i) => ({
                      value: i + 1,
                      label: `${i + 1}`
                    }))}
                  />
                  <Divider type='vertical' style={{ borderColor: token.colorPrimaryBg }} />
                  <Link style={{ fontSize: '0.8rem' }}>Delete</Link>
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
        <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={2} style={{ color: 'inherit', margin: 0 }}>Subtotal: </Title>
          <Title level={3} underline style={{ color: 'inherit', margin: 0 }}>${cart.total}</Title>
        </Flex>
        <Divider style={{ borderColor: token.colorPrimaryBg }} />
      </Flex>
    </Flex>
  )
}

export default Cart
