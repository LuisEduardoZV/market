import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { IconArrowNarrowRight, IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import { Button, Col, Flex, Row, Space, Typography } from 'antd'

import usePexelsClient from '../hooks/usePexelsClient'
import { getImageById } from '../services/imagesFunc'

const { Text, Title } = Typography

const Home = () => {
  const { client } = usePexelsClient()
  async function getTopProducts () {
    return await fetch('https://dummyjson.com/products/?select=title,price,rating,thumbnail&limit=15&sortBy=rating&order=desc')
      .then((res) => {
        if (!res.ok) throw new Error('Error')
        return res.json()
      })
      .then((data) => data.products)
  }

  const { data } = useQuery('topProducts', getTopProducts, { refetchOnWindowFocus: false })

  async function getDisscountProducts () {
    return await fetch('https://dummyjson.com/products/?select=title,price,discountPercentage,thumbnail&limit=15&sortBy=price&order=asc')
      .then((res) => {
        if (!res.ok) throw new Error('Error')
        return res.json()
      })
      .then((data) => data.products)
  }

  const { data: diss } = useQuery('disscountProducts', getDisscountProducts, { refetchOnWindowFocus: false })

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

  return (
    <Flex vertical>
      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>People's favourite products!</Title>
        <Space style={{ overflowX: 'auto', gap: 10 }}>
          {data && data?.map(({ thumbnail, id, rating, title, price }) => (
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

      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>Deeply discounted products!!</Title>
        <Space style={{ overflowX: 'auto', gap: 10 }}>
          {diss && diss?.map(({ thumbnail, id, discountPercentage, title, price }) => (
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
    </Flex>
  )
}

export default Home
