import { Fragment, useMemo, useRef } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { IconCubeSend, IconReceiptRefund, IconShieldCheckFilled, IconStarFilled, IconThumbUp, IconUserHexagon } from '@tabler/icons-react'
import { Avatar, Button, Carousel, Divider, Flex, Progress, Rate, Select, Space, theme, Typography } from 'antd'

import dayjs from 'dayjs'
import Barcode from 'react-barcode'

import { getProductById } from '../services/productsFun'
import IconBoxDimension from '../ui-components/extended/IconBoxDimension'

import amex from '../assets/icons/amex.svg'
import hiper from '../assets/icons/hiper.svg'
import mastercard from '../assets/icons/mastercard.svg'
import paypal from '../assets/icons/paypal.svg'
import visa from '../assets/icons/visa.svg'

const { Title, Text, Paragraph, Link } = Typography
const { useToken } = theme

const Product = ({ hasDiscount }) => {
  const { id } = useParams()
  const ref = useRef()
  const { token } = useToken()

  const { isLoading, data } = useQuery(['product', id], () => getProductById(id), { refetchOnWindowFocus: false, enabled: !!id })

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

  console.log(data)

  // console.log(ref.current) para obtener current slide y dar estilos
  /*
  MEDIOS DE PAGO DE MERCADO LIBRE
  */

  if (isLoading) return null
  return (
    <Flex vertical style={{ minHeight: '100vh', height: '100%', paddingTop: '4%', paddingInline: '2%' }}>
      <Flex style={{ width: '100%', justifyContent: 'space-between', position: 'relative', height: 'max-content', minHeight: '75vh' }}>
        <Flex style={{ maxWidth: '30%', width: '100%' }}>
          <Space direction='vertical'>
            {data && data?.images && data.images.map((item, idx) => (
              <Flex key={idx} style={{ maxHeight: 50, maxWidth: 50, cursor: 'pointer', borderWidth: 1, borderStyle: 'solid', borderColor: token.colorBgBase }} onMouseEnter={() => ref.current.goTo(idx)}>
                <img src={item} alt={'Imge preview ' + idx} style={{ width: 50, objectFit: 'contain', height: 50 }} />
              </Flex>
            ))}
          </Space>
          <Flex vertical style={{ width: '100%', maxWidth: '100%' }}>
            <Carousel ref={ref} arrows autoplay infinite={false} style={{ width: '100%' }}>
              {data && data?.images && data.images.map((item, idx) => (
                <Flex key={idx} style={{ maxHeight: 500 }}>
                  <img src={item} alt={'Imge preview ' + idx} style={{ width: 'auto', objectFit: 'contain', height: 500 }} />
                </Flex>
              ))}
            </Carousel>
          </Flex>
        </Flex>
        <Flex vertical style={{ maxWidth: '40%', width: '100%' }}>
          <Title level={2} style={{ margin: 0 }}>{data.title}</Title>
          <Title level={5} style={{ margin: 0, color: token.colorPrimaryText, fontStyle: 'italic', fontWeight: 600 }}>{data.brand}</Title>
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
          <Flex vertical style={{ marginTop: 50, gap: 50 }}>
            <Title level={3}>Package dimensions</Title>
            <Flex style={{ alignItems: 'center', width: 'auto', justifyContent: 'center', position: 'relative' }}>
              <IconBoxDimension color={token.colorPrimaryText} lineColor={token.colorPrimaryBgHover} style={{ width: '80%' }} />
              <Text italic style={{ position: 'absolute', top: '40%', left: '80%', transform: 'translate(-50%, -50%)', fontWeight: 400 }}>
                {data.dimensions.height} in
              </Text>
              <Text italic style={{ position: 'absolute', top: '80%', left: '70%', transform: 'translate(-50%, -50%)', fontWeight: 400 }}>
                {data.dimensions.depth} in
              </Text>
              <Text italic style={{ position: 'absolute', top: '80%', right: '70%', transform: 'translate(-50%, -50%)', fontWeight: 400 }}>
                {data.dimensions.width} in
              </Text>
            </Flex>
          </Flex>
          <Flex vertical style={{ marginTop: 50 }}>
            <Title level={3}>Product codes in the physical shop</Title>
            <Text>If you wish, you can find this product in any of our branches, simply show at the counter any of the following codes.</Text>
            <Flex style={{ marginTop: 40, justifyContent: 'space-between' }}>
              <Flex vertical>
                <Title level={5}>QR Code</Title>
                <img src={data.meta.qrCode} alt={`QR code for product ${data.title}`} />
              </Flex>
              <Flex vertical>
                <Title level={5}>Bar Code</Title>
                <Barcode value={data.meta.barcode} />
              </Flex>
            </Flex>
            <Text type='secondary' style={{ fontSize: '0.8rem' }}>Last update: {dayjs(data.meta.updatedAt).format('DD/MM/YYYY HH:mm a')}</Text>
          </Flex>
        </Flex>
        <Flex style={{ width: '100%', maxWidth: '20%', position: 'sticky', top: '15%', right: '2%', display: 'inline-block' }}>

          <Flex vertical style={{ gap: 30 }}>
            <Flex vertical style={{ position: 'relative' }}>
              <Flex style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                <Flex style={{ alignItems: 'center' }}>
                  <Text type='secondary'>New</Text>
                  <Divider type='vertical' style={{ borderColor: token.colorPrimaryBgHover }} />
                  <Text type='secondary'>{Number(Math.random() * 10000).toFixed(0)} sold</Text>
                </Flex>
                <IconThumbUp />
              </Flex>
              {hasDiscount && <Text type='secondary' delete italic>${data.price}</Text>}
              <Flex style={{ alignItems: 'center', width: '100%' }}>
                <Title level={3} style={{ margin: 0, color: token.colorBgElevated, backgroundColor: token.colorPrimary, paddingBlock: '3%', paddingLeft: '5%', paddingRight: '13%' }} className='shadow-menu-subcategory'>${discountPrice}</Title>
                {hasDiscount && (
                  <Text style={{ margin: 0, fontSize: '1.1rem', width: 'max-content', backgroundColor: token.colorBgElevated, paddingBlock: '2%', paddingInline: '5%', translate: '-20% 0' }} className='shadow-menu-subcategory'>{Math.floor(data.discountPercentage)}% OFF</Text>
                )}
              </Flex>
            </Flex>
            <Flex vertical>
              <Text>Available in <span style={{ color: token.colorTextSecondary, fontWeight: 600 }}>up to 15 MSI</span></Text>
              <Link style={{ fontSize: '0.85rem' }}>See the different payment methods</Link>
            </Flex>
            <Text><span style={{ color: token.colorTextSecondary, fontWeight: 600 }}>Free shipping</span> nationwide</Text>
            <Text strong italic style={{ marginBlock: 10 }}>Stock available</Text>
            <Flex vertical style={{ gap: 10 }}>
              <Flex style={{ alignItems: 'center', gap: 10 }}>
                <Text>Cantidad:</Text>
                <Select
                  variant='borderless'
                  defaultValue={1}
                  options={[
                    { value: 1, label: '1 unidad' },
                    { value: 2, label: '2 unidades' },
                    { value: 3, label: '3 unidades' }
                  ]}
                />
              </Flex>
              <Button type='primary' className='shadow-menu-subcategory'>Buy</Button>
              <Button className='shadow-menu-subcategory'>Add to cart</Button>
            </Flex>
          </Flex>
          <Divider />
          <Space direction='vertical'>
            <Flex style={{ gap: 10 }}>
              <IconReceiptRefund size={22} color={token.colorPrimary} />
              <Text type='secondary'>{data.returnPolicy}.</Text>
            </Flex>
            <Flex style={{ gap: 10 }}>
              <IconCubeSend size={22} color={token.colorPrimary} />
              <Text type='secondary'>{data.shippingInformation}.</Text>
            </Flex>
            <Flex style={{ gap: 10 }}>
              <IconShieldCheckFilled size={22} color={token.colorPrimary} />
              <Text type='secondary'>{data.warrantyInformation}.</Text>
            </Flex>
          </Space>
          <Divider />
          <Flex vertical>
            <Title level={4}>Payment methods</Title>
            <Flex vertical>
              <Text style={{ fontWeight: 600 }}>Credit Card</Text>
              <Flex style={{ flexWrap: 'wrap', gap: 10 }}>
                <img src={amex} alt='American Express Icon' style={{ width: 45 }} />
                <img src={hiper} alt='Hiper Icon' style={{ width: 45 }} />
                <img src={mastercard} alt='MasterCard Icon' style={{ width: 45 }} />
                <img src={visa} alt='Visa Icon' style={{ width: 45 }} />
              </Flex>
            </Flex>
            <Flex vertical>
              <Text style={{ fontWeight: 600 }}>Debit Card</Text>
              <Flex style={{ flexWrap: 'wrap', gap: 10 }}>
                <img src={mastercard} alt='MasterCard Icon' style={{ width: 45 }} />
                <img src={visa} alt='Visa Icon' style={{ width: 45 }} />
              </Flex>
            </Flex>
            <Flex vertical>
              <Text style={{ fontWeight: 600 }}>Online Payment</Text>
              <Flex style={{ flexWrap: 'wrap', gap: 10 }}>
                <img src={paypal} alt='PayPal Icon' style={{ width: 45 }} />
              </Flex>
            </Flex>
          </Flex>

        </Flex>
      </Flex>
      <Divider />
      <Flex vertical style={{ paddingInline: '5%', paddingBottom: '5%' }}>

        <Title level={2}>Customer reviews</Title>
        <Flex style={{ position: 'relative', width: '100%', paddingInline: '5%' }}>
          <Flex vertical style={{ backgroundColor: token.colorPrimary, color: token.colorWhite, padding: '2.5%', gap: 15, paddingRight: '5%', height: 'min-content' }} className='shadow-menu-subcategory'>
            <Flex style={{ gap: 20, alignItems: 'center', color: token.colorWhite }}>
              <Title level={1} style={{ margin: 0, color: 'inherit' }}>{data.rating}</Title>
              <Flex vertical style={{ alignItems: 'center', gap: 5 }}>
                <Rate defaultValue={data.rating} allowHalf disabled style={{ color: 'inherit', fontSize: '0.9rem' }} />
                <Text style={{ fontSize: '0.8rem', color: 'inherit' }}>{data.reviews.length} reviews</Text>
              </Flex>
            </Flex>
            <Flex vertical style={{ gap: 5 }}>
              {infoReviews && infoReviews.map((item, idx) => (
                <Flex key={idx} style={{ alignItems: 'center', gap: 10 }}>
                  <Flex style={{ alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: '0.8rem', color: 'inherit' }}>{5 - idx}</Text>
                    <IconStarFilled style={{ color: token.colorBgElevated }} size={9} />
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
          <Flex vertical style={{ backgroundColor: token.colorBgElevated, paddingInline: '4%', paddingBlock: '2%', translate: '-5% 15%', maxWidth: '70%', width: '100%', gap: 20 }} className='shadow-menu-subcategory'>
            <Title level={4}>Featured reviews</Title>
            {data.reviews.map((review, idx) => (
              <Flex key={'review' + idx} vertical style={{ gap: 2 }}>
                <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Rate defaultValue={review.rating} allowHalf disabled style={{ fontSize: '0.8rem' }} />
                  <Text style={{ fontSize: '0.8rem' }} type='secondary'>{dayjs(review.date).format('D MMMM[,] YYYY')}</Text>
                </Flex>
                <Flex style={{ alignItems: 'center', gap: 5 }}>
                  <Avatar style={{ backgroundColor: token.colorPrimary }} icon={<IconUserHexagon />} />
                  <Text>{review.reviewerName}</Text>
                  <Divider type='vertical' style={{ borderColor: token.colorPrimaryBg }} />
                  <Text>{review.reviewerEmail}</Text>
                </Flex>
                <Paragraph style={{ margin: 0, marginTop: '2%' }}>{review.comment}</Paragraph>
                <Divider style={{ margin: 0, marginBlock: '1.5%', borderColor: token.colorPrimaryBg }} />
              </Flex>
            ))}
            <Button type='link'>Show all reviews...</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Product
