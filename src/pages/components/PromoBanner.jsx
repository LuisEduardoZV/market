import { useEffect, useMemo, useState } from 'react'

import { IconArrowNarrowRight, IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import { Col, Flex, Row, Typography } from 'antd'

import usePexelsClient from '../../hooks/usePexelsClient'
import { getImageById } from '../../services/imagesFunc'
import { lightenColor } from '../../utils/func'

const { Text, Title } = Typography

const PromoBanner = () => {
  const { client } = usePexelsClient()

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

  const colorLight = useMemo(() => (lightenColor(promo?.color ?? '', 20)), [promo])

  if (!promo) return null
  return (
    <Row style={{
      background: `radial-gradient(50% 50% at 100% 0,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50% at 0 100%,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50%,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50%,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%) 16px 16px`,
      backgroundSize: '32px 32px',
      backgroundColor: `${promo.color}`,
      maxHeight: 800,
      marginTop: 70,
      height: '100%',
      width: '100%'
    }}
    >
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
          <Flex className='button-borders'>
            <button className='primary-button'>
              Comprar ahora <IconArrowNarrowRight />
            </button>
          </Flex>
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
  )
}

export default PromoBanner
