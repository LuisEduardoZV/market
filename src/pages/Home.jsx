import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { IconArrowNarrowRight, IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import { Button, Col, Flex, Radio, Rate, Row, Space, Typography, theme } from 'antd'

import usePexelsClient from '../hooks/usePexelsClient'
import { useProductsUsage } from '../hooks/useProductsUsage'
import { getImageById } from '../services/imagesFunc'
import { getTopProductsByCategory } from '../services/productsFun'

import interesting from '../utils/interestingCards.json'

const { Text, Title } = Typography
const { useToken } = theme

const Home = () => {
  const { client } = usePexelsClient()
  const { token } = useToken()

  const { disscountProducts, topProducts } = useProductsUsage()

  const [promo, setPromo] = useState()

  useEffect(() => {
    (async () => {
      try {
        const images = await getImageById(client, 21855879)
        setPromo(images)
      } catch (error) {

      }
    })()
  }, [])

  const [selected, setSelected] = useState('mens-shoes')

  const { data } = useQuery(['topProductsBy', selected], () => getTopProductsByCategory(selected))

  return (
    <Flex vertical>
      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>People's favourite products!</Title>
        <Space style={{ overflowX: 'auto', gap: 10 }}>
          {topProducts && topProducts?.map(({ thumbnail, id, rating, title, price }) => (
            <Flex
              key={id} vertical style={{
                backgroundColor: 'white'
              }}
            >
              <Space>
                <Title level={5} style={{ fontWeight: 500, fontStyle: 'italic' }}>{title}</Title>
                <Text strong italic>{rating}</Text>
              </Space>
              <img src={thumbnail} />
              <Text strong italic>
                ${price}
              </Text>
            </Flex>
          ))}
        </Space>
      </Flex>

      {promo && (
        <Row style={{ backgroundColor: promo.color, maxHeight: 800, marginTop: 70, height: '100%', width: '100%' }}>
          <Col span={12} style={{ display: 'flex', flexDirection: 'column', alignSelf: 'end' }}>
            <Flex vertical style={{ paddingInline: '10%', paddingBottom: '10%' }}>
              <Title level={2} strong style={{ color: 'white', fontSize: '3.5rem', textTransform: 'uppercase', lineHeight: 0.7 }}>
                <IconShoppingCart size='2.5rem' stroke={1.5} color='white' />
                <IconShoppingBag size='2.5rem' stroke={1.5} color='white' style={{ marginInline: '1%' }} />
                Hot Sale
                <IconShoppingBag size='2.5rem' stroke={1.5} color='white' style={{ marginInline: '1%' }} />
                <IconShoppingCart size='2.5rem' stroke={1.5} color='white' />
              </Title>
              <Text style={{ color: 'white', fontSize: '1.1rem', lineHeight: 1.2 }}>Usa el código *MARKET15* y obtén el 15% de descuento adicional en tus compras de final de temporada</Text>
              <Button style={{ width: 'fit-content', marginTop: 30, textTransform: 'uppercase' }} icon={<IconArrowNarrowRight />} iconPosition='end'>Comprar ahora</Button>
            </Flex>
          </Col>
          <Col span={6} style={{ position: 'relative' }}>
            <Flex>
              <img src={promo.url} alt={promo.alt} style={{ width: '100%', maxHeight: 800 }} />
            </Flex>
          </Col>
          <Col span={6} style={{ alignSelf: 'start' }}>
            <Flex vertical style={{ position: 'relative', gap: 0, margin: 0, padding: 0, paddingInline: '7%', width: '100%', paddingTop: '30%' }}>
              <Text strong italic style={{ fontSize: 30, width: 'fit-content', lineHeight: 1, color: 'white', textTransform: 'uppercase' }}>hasta</Text>
              <Text strong italic style={{ fontSize: 150, width: 'fit-content', lineHeight: 1, color: 'white' }}>50%</Text>
              <Text strong italic style={{ fontSize: 30, width: 'fit-content', lineHeight: 1, color: 'white', alignSelf: 'end', textTransform: 'uppercase' }}>off</Text>
            </Flex>
          </Col>
        </Row>
      )}

      <Flex vertical style={{ marginTop: 50, paddingInline: '10%' }}>
        <Radio.Group value={selected} buttonStyle='solid' onChange={(e) => { setSelected(e.target.value) }}>
          <Radio.Button value='mens-shoes'>Man Shoes</Radio.Button>
          <Radio.Button value='womens-shoes'>Woman Shoes</Radio.Button>
        </Radio.Group>
        {data && (
          <Space style={{ marginTop: 10, width: '100%', alignItems: 'start' }} size='large'>
            {data.map((op) => (
              <Flex vertical key={op.id} style={{ position: 'relative', backgroundColor: 'white', minHeight: 310, height: '100%' }}>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={op.rating} style={{
                    position: 'absolute',
                    top: '5%',
                    borderLeftWidth: 0
                  }}
                />
                <img src={op.thumbnail} alt={op.title} style={{ width: '100%', backgroundColor: token.colorPaper }} />
                <Flex vertical style={{ minHeight: 'max-content', height: '100%' }}>
                  <Title level={5}>{op.title}</Title>
                  <Text type='secondary'>{op.tags[1]}</Text>
                </Flex>
              </Flex>
            ))}
          </Space>
        )}
      </Flex>

      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>Deeply discounted products!!</Title>
        <Space style={{ overflowX: 'auto', gap: 10 }}>
          {disscountProducts && disscountProducts?.map(({ thumbnail, id, discountPercentage, title, price }) => (
            <Flex
              key={id} vertical style={{
                backgroundColor: 'white'
              }}
            >
              <Title level={5} style={{ fontWeight: 500, fontStyle: 'italic' }}>{title}</Title>
              <img src={thumbnail} />
              <Space>
                <Text delete type='danger' strong>${discountPercentage}</Text>
                <Text strong italic>
                  ${price}
                </Text>
              </Space>
            </Flex>
          ))}
        </Space>
      </Flex>

      <Flex vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>También te puede interesar</Title>
        <Row style={{ marginTop: 10, width: '100%', alignItems: 'start', justifyContent: 'space-around', paddingInline: '10%' }}>
          {interesting.map((op, idx) => (
            <Col key={idx} span={5} style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Flex style={{ width: '100%', minHeight: 200, height: '100%', flex: 1 }} vertical>
                {(typeof op.img === 'string')
                  ? (
                    <img src={op.img} alt='Image' style={{ maxHeight: 400, width: '100%', objectFit: 'cover' }} />
                    )
                  : (
                    <Flex style={{ maxHeight: 400, width: '100%', flex: 1 }} vertical>
                      {op.img.map((img, ixd) => (
                        <img key={idx + ixd} src={img} alt='Image' style={{ maxHeight: (400 / op.img.length) - 8, width: '100%', objectFit: 'cover' }} />
                      ))}
                    </Flex>
                    )}
                <Flex vertical style={{ flex: 'none', justifyContent: 'space-between', height: 'max-content' }}>
                  <Title level={5} style={{ fontSize: '1rem', paddingBlock: 10 }}>
                    {op.title}
                  </Title>
                  <Text type='secondary' style={{ fontSize: '0.9rem' }}>{op.subtitle}</Text>
                  <Button type='text' style={{ width: 'fit-content', marginTop: 10 }}>{op.btnText}</Button>
                </Flex>
              </Flex>
            </Col>
          ))}
        </Row>
      </Flex>

    </Flex>
  )
}

export default Home
