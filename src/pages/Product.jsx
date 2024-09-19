import { Fragment, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { IconCubeSend, IconReceiptRefund, IconShieldCheckFilled, IconStarFilled, IconUserHexagon } from '@tabler/icons-react'
import { Avatar, Button, Carousel, Divider, Flex, Progress, Rate, Select, Space, theme, Typography } from 'antd'

import dayjs from 'dayjs'
import Barcode from 'react-barcode'

import useNotification from '../hooks/useNotification'
import { getProductById, getProductsByCategories } from '../services/productsFun'
import { useDispatch } from '../store'
import { addProduct } from '../store/cartSlice'
import IconBoxDimension from '../ui-components/extended/IconBoxDimension'
import IconThumbUpMotion from '../ui-components/extended/IconThumbUpMotion'
import CarouselProducts from './components/CarouselProducts'
import PromoBanner from './components/PromoBanner'

import amex from '../assets/icons/amex.svg'
import hiper from '../assets/icons/hiper.svg'
import mastercard from '../assets/icons/mastercard.svg'
import paypal from '../assets/icons/paypal.svg'
import visa from '../assets/icons/visa.svg'

const { Title, Text, Paragraph, Link } = Typography
const { useToken } = theme

const Product = ({ hasDiscount }) => {
  const { id, category } = useParams()
  const dispatch = useDispatch()
  const { openNotification } = useNotification()
  const navigate = useNavigate()

  const ref = useRef()
  const { token } = useToken()

  const { isLoading, data } = useQuery(['product', id], () => getProductById(id), { refetchOnWindowFocus: false, enabled: !!id })

  const { isLoading: loadingRelated, data: relatedData } = useQuery(['relatedProducts', category], () => getProductsByCategories([{ id: category }]), { refetchOnWindowFocus: false, enabled: !!category })

  const [quantity, setQuantity] = useState(1)

  const addToCart = (product) => {
    dispatch(addProduct({ product: [{ ...product, quantityAdded: quantity }], subtotal: product.price * quantity, total: (product.price * quantity).toFixed(2) }))
    openNotification({
      message: 'Product added to cart.'
    })
    setTimeout(() => {
      navigate('/shopping-cart')
    }, 300)
  }

  const buyDirectly = (product) => {
    dispatch(addProduct({ product: [{ ...product, quantityAdded: quantity }], subtotal: product.price * quantity, total: (product.price * quantity).toFixed(2) }))
    openNotification({
      message: 'Product added. The entire cart will be purchased...',
      type: 'info'
    })
    setTimeout(() => {
      navigate('/payment')
    }, 300)
  }

  const infoReviews = useMemo(() => {
    if (data && data?.reviews) {
      return Array.from({ length: 5 }, (_, i) =>
        Number(data.reviews.filter(review => review.rating === i + 1).length * 100 / data.reviews.length).toFixed(0)
      ).reverse()
    }
    return null
  }, [data])

  const discountPrice = useMemo(() => {
    if (!data) return 0
    if (hasDiscount) {
      return (data.price - (data.price * data.discountPercentage) / 100).toFixed(2)
    }
    return data.price
  }, [data])

  if (isLoading || loadingRelated) return null
  return (
    <Flex vertical className='product-page'>
      <Flex className='product-info-container'>
        <Flex className='product-image-container'>
          <Space direction='vertical'>
            {data && data?.images && data.images.map((item, idx) => (
              <Flex key={idx} className='product-image-preview' onMouseEnter={() => ref.current.goTo(idx)}>
                <img src={item} alt={'Imge preview ' + idx} />
              </Flex>
            ))}
          </Space>
          <Flex vertical style={{ width: '100%', maxWidth: '100%' }}>
            <Carousel ref={ref} arrows autoplay infinite={false} style={{ width: '100%' }}>
              {data && data?.images && data.images.map((item, idx) => (
                <Flex key={idx} className='product-image-carousel'>
                  <img src={item} alt={'Imge preview ' + idx} />
                </Flex>
              ))}
            </Carousel>
          </Flex>
        </Flex>
        <Flex vertical className='product-info'>
          <Title level={2}>{data.title}</Title>
          <Title level={5}>{data.brand}</Title>
          <Flex style={{ alignItems: 'center' }}>
            <Text type='secondary' style={{ fontSize: '0.8rem' }}>{data.rating}</Text>
            <Divider type='vertical' />
            <Rate defaultValue={data.rating} allowHalf disabled />
            <Text type='secondary' style={{ fontSize: '0.8rem' }}>({data.reviews.length})</Text>
          </Flex>
          <Divider />
          <Paragraph>{data.description}</Paragraph>
          <Flex style={{ alignItems: 'center' }}>
            {data.tags && data.tags.map((item, idx) => (
              <Fragment key={idx}>
                <Text type='secondary'>{item}</Text>
                <Divider type='vertical' style={{ borderColor: token.colorPrimaryBgHover }} />
              </Fragment>
            ))}
          </Flex>
          <Flex vertical className='info-dimensions-product'>
            <Title level={3}>Package dimensions</Title>
            <Flex>
              <IconBoxDimension color={token.colorPrimaryText} lineColor={token.colorPrimaryBgHover} />
              <Text italic>
                {data.dimensions.height} in
              </Text>
              <Text italic>
                {data.dimensions.depth} in
              </Text>
              <Text italic>
                {data.dimensions.width} in
              </Text>
            </Flex>
          </Flex>
          <Flex vertical className='info-codes-product'>
            <Title level={3}>Product codes in the physical shop</Title>
            <Text>If you wish, you can find this product in any of our branches, simply show at the counter any of the following codes.</Text>
            <Flex>
              <Flex vertical>
                <Title level={5}>QR Code</Title>
                <img src={data.meta.qrCode} alt={`QR code for product ${data.title}`} />
              </Flex>
              <Flex vertical>
                <Title level={5}>Bar Code</Title>
                <Barcode value={data.meta.barcode} />
              </Flex>
            </Flex>
            <Text type='secondary'>Last update: {dayjs(data.meta.updatedAt).format('DD/MM/YYYY HH:mm a')}</Text>
          </Flex>
        </Flex>
        <Flex className='buy-product-container'>
          <Flex vertical className='buy-product-price-container'>
            <Flex vertical>
              <Flex className='total-sold'>
                <Flex>
                  <Text type='secondary'>New</Text>
                  <Divider type='vertical' style={{ borderColor: token.colorPrimaryBgHover }} />
                  <Text type='secondary'>{Number(Math.random() * 10000).toFixed(0)} sold</Text>
                </Flex>
                <IconThumbUpMotion />
              </Flex>
              {hasDiscount && <Text type='secondary' delete italic>${data.price}</Text>}
              <Flex className='buy-product-price'>
                <Title level={3} className='shadow-menu-subcategory'>${discountPrice}</Title>
                {hasDiscount && (
                  <Text className='shadow-menu-subcategory'>{Math.floor(data.discountPercentage)}% OFF</Text>
                )}
              </Flex>
            </Flex>
            <Flex vertical>
              <Text>Available in <span style={{ color: token.colorTextSecondary, fontWeight: 600 }}>up to 15 MSI</span></Text>
              <Link style={{ fontSize: '0.85rem' }}>See the different payment methods</Link>
            </Flex>
            <Text><span style={{ color: token.colorTextSecondary, fontWeight: 600 }}>Free shipping</span> nationwide</Text>
            <Text strong italic style={{ marginBlock: 10 }}>Stock available</Text>
            <Flex vertical className='btns-payment-container'>
              <Flex>
                <Text>Cantidad:</Text>
                <Select
                  variant='borderless'
                  defaultValue={quantity}
                  onChange={setQuantity}
                  options={[
                    { value: 1, label: '1 unidad' },
                    { value: 2, label: '2 unidades' },
                    { value: 3, label: '3 unidades' }
                  ]}
                />
              </Flex>
              <Button type='primary' className='shadow-menu-subcategory' onClick={() => buyDirectly(data)}>Buy</Button>
              <Button className='shadow-menu-subcategory' onClick={() => addToCart(data)}>Add to cart</Button>
            </Flex>
          </Flex>
          <Divider />
          <Space direction='vertical' className='guarantees-product-container'>
            <Flex>
              <IconReceiptRefund size={22} color={token.colorPrimary} />
              <Text type='secondary'>{data.returnPolicy}.</Text>
            </Flex>
            <Flex>
              <IconCubeSend size={22} color={token.colorPrimary} />
              <Text type='secondary'>{data.shippingInformation}.</Text>
            </Flex>
            <Flex>
              <IconShieldCheckFilled size={22} color={token.colorPrimary} />
              <Text type='secondary'>{data.warrantyInformation}.</Text>
            </Flex>
          </Space>
          <Divider />
          <Flex vertical className='payment-methods-product-container'>
            <Title level={4}>Payment methods</Title>
            <Flex vertical>
              <Text>Credit Card</Text>
              <Flex>
                <img src={amex} alt='American Express Icon' />
                <img src={hiper} alt='Hiper Icon' />
                <img src={mastercard} alt='MasterCard Icon' />
                <img src={visa} alt='Visa Icon' />
              </Flex>
            </Flex>
            <Flex vertical>
              <Text>Debit Card</Text>
              <Flex>
                <img src={mastercard} alt='MasterCard Icon' />
                <img src={visa} alt='Visa Icon' />
              </Flex>
            </Flex>
            <Flex vertical>
              <Text>Online Payment</Text>
              <Flex>
                <img src={paypal} alt='PayPal Icon' />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
      <Flex vertical className='related-products-container'>
        <Title level={3}>Related products</Title>
        <CarouselProducts products={relatedData} typeCarousel='relatedProducts' />
      </Flex>
      <Divider />
      <Flex vertical className='customer-reviews-container'>

        <Title level={2}>Customer reviews</Title>
        <Flex>
          <Flex className='global-rating-container shadow-menu-subcategory'>
            <Flex>
              <Title level={1}>{data.rating}</Title>
              <Flex vertical>
                <Rate defaultValue={data.rating} allowHalf disabled />
                <Text>{data.reviews.length} reviews</Text>
              </Flex>
            </Flex>
            <Flex>
              {infoReviews && infoReviews.map((item, idx) => (
                <Flex key={idx}>
                  <Flex>
                    <Text>{5 - idx}</Text>
                    <IconStarFilled size={9} />
                  </Flex>
                  <Progress
                    percent={item}
                    strokeColor={token.colorPrimaryBg}
                    showInfo={false}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex vertical className='featured-reviews-container shadow-menu-subcategory'>
            <Title level={4}>Featured reviews</Title>
            {data.reviews.map((review, idx) => (
              <Flex key={'review' + idx} vertical>
                <Flex className='review-header'>
                  <Rate defaultValue={review.rating} allowHalf disabled />
                  <Text type='secondary'>{dayjs(review.date).format('D MMMM[,] YYYY')}</Text>
                </Flex>
                <Flex className='review-info-user'>
                  <Avatar style={{ backgroundColor: token.colorPrimary }} icon={<IconUserHexagon />} />
                  <Text>{review.reviewerName}</Text>
                  <Divider type='vertical' style={{ borderColor: token.colorPrimaryBg }} />
                  <Text>{review.reviewerEmail}</Text>
                </Flex>
                <Paragraph className='review-comment'>{review.comment}</Paragraph>
                <Divider style={{ borderColor: token.colorPrimaryBg }} />
              </Flex>
            ))}
            <Button type='link'>Show all reviews...</Button>
          </Flex>
        </Flex>
      </Flex>
      <PromoBanner inCategory />
    </Flex>
  )
}

export default Product
