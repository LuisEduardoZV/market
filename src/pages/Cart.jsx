import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Collapse, Divider, Flex, Input, Select, Space, Typography, theme } from 'antd'

import useNotification from '../hooks/useNotification'
import PromoBanner from '../pages/components/PromoBanner'
import { useDispatch, useSelector } from '../store'
import { addPromoCode, removeProduct, updateProduct } from '../store/cartSlice'

import { IconCreditCardPay } from '@tabler/icons-react'
import emptyBox from '../assets/icons/empty-box.svg'

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
    <Flex vertical className='cart-page'>
      <Flex>
        <Flex vertical className='list-cart-container shadow-cart-cards'>
          <Title level={4}>Shopping Cart</Title>
          <Divider />
          <Space direction='vertical'>
            {checkout.products.length === 0 && (
              <Flex vertical className='empty-cart'>
                <img src={emptyBox} alt='Empty cart icon' />
                <Title level={4}>Shopping cart is empty!</Title>
                <Text type='secondary'>Add products to cart to see the breakdown here.</Text>
                <Button type='primary' onClick={() => navigate('/')} size='large'>Discover items</Button>
              </Flex>
            )}
            {checkout.products.map((op) => (
              <Flex key={op.id} className='product-inside-cart-container'>
                <Flex>
                  <img
                    src={op.thumbnail}
                    alt={`Thumbnail of ${op.title}`}
                  />
                </Flex>
                <Flex className='product-details'>
                  <Flex vertical className='product-info'>
                    <Flex vertical>
                      <Title level={5}>{op.title}</Title>
                      <Text type='success'>In Stock</Text>
                    </Flex>
                    <Paragraph
                      ellipsis={{
                        rows: 1,
                        expandable: true,
                        symbol: 'more'
                      }}
                      className='description-product'
                    >
                      {op.description}
                    </Paragraph>
                    <Text type='secondary' italic>Product sent by MarketStore</Text>
                    <Flex className='product-actions'>
                      <Select
                        defaultValue={op.quantityAdded}
                        size='small'
                        onChange={(value) => handleUpdate(value, op)}
                        options={Array.from({ length: 10 }, (_, i) => ({
                          value: i + 1,
                          label: `${i + 1} units`
                        }))}
                      />
                      <Divider type='vertical' style={{ borderColor: token.colorPrimaryBg }} />
                      <Link onClick={() => handleDelete(op.id)}>Delete</Link>
                      <Divider type='vertical' style={{ borderColor: token.colorPrimaryBg }} />
                      <Link>Save to favs</Link>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Text>${op.price}</Text>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Space>
        </Flex>
        <Flex vertical className='summary-cart-container'>
          <Flex>
            <Title level={5}>Subtotal: </Title>
            <Title level={5}>${checkout.subtotal?.toFixed(2)}</Title>
          </Flex>
          <Flex>
            <Text italic>Import costs: </Text>
            <Text underline>$0.00</Text>
          </Flex>
          {checkout?.code && (
            <Flex>
              <Text italic>Promo code: </Text>
              <Text style={{ fontWeight: 'bold' }}>{checkout.code}</Text>
            </Flex>
          )}
          <Divider style={{ borderColor: token.colorPrimaryBg, marginBlock: 10 }} />
          <Flex className='sumary-cart-total'>
            <Title level={2} underline>Total: </Title>
            <Title level={2}>${checkout.total}</Title>
          </Flex>
          {checkout.products.length > 0 && (
            <>
              <Collapse
                items={[{
                  key: 'code',
                  label: 'Apply promo code',
                  children: (<RedemCode handleAddPromoCode={handleAddPromoCode} />)
                }]}
                size='small'
                className='promo-code-container'
              />
              <Button type='default' icon={<IconCreditCardPay />} onClick={(() => navigate('/payment'))}>
                Go to payment
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      <PromoBanner inCategory />
    </Flex>
  )
}

export default Cart
