import { useEffect, useMemo, useState } from 'react'

import { IconArrowNarrowRight, IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import { Col, Flex, Row, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

import usePexelsClient from '../../hooks/usePexelsClient'
import { getImageById } from '../../services/imagesFunc'
import { lightenColor } from '../../utils/func'
import MarqueePromo from './MarqueePromo'

const { Text, Title } = Typography

const PromoBanner = ({ inCategory = false }) => {
  const { client } = usePexelsClient()
  const screens = useBreakpoint()

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
    <Row
      style={{
        background: `radial-gradient(50% 50% at 100% 0,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50% at 0 100%,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50%,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50%,${promo.color} 0%  5% ,${colorLight} 6%  15%,${promo.color} 16% 25%,${colorLight} 26% 35%,${promo.color} 36% 45%, ${colorLight} 46% 55%,${promo.color} 56% 65%,${colorLight} 66% 75%,${promo.color} 76% 85%,${colorLight} 86% 95%, #0000 96%) 16px 16px`,
        backgroundSize: '32px 32px',
        backgroundColor: `${promo.color}`
      }}
      className={`promo-banner ${inCategory ? 'promo-banner-inCategory' : 'promo-banner-default'}`}
    >
      <MarqueePromo position='top' direction='left' />
      <Col span={screens.xs ? 15 : 11} className='left-side'>
        <Flex vertical>
          <Title level={2} strong>
            <IconShoppingCart stroke={1.5} color='white' className='promo-icons' />
            <IconShoppingBag stroke={1.5} color='white' style={{ marginInline: '1%' }} className='promo-icons' />
            Hot Sale
            <IconShoppingBag stroke={1.5} color='white' style={{ marginInline: '1%' }} className='promo-icons' />
            <IconShoppingCart stroke={1.5} color='white' className='promo-icons' />
          </Title>
          <Text>Use the code *MARKET15* and get an additional 15% discount on your end of season purchases.</Text>
          <Flex className='button-borders'>
            <button className='primary-button'>
              Buy now <IconArrowNarrowRight />
            </button>
          </Flex>
        </Flex>
      </Col>
      <Col span={screens.xs ? 8 : inCategory ? 6 : 7} style={{ position: 'relative' }}>
        <Flex>
          <img src={promo.url} alt={promo.alt} className={`${inCategory ? 'promo-banner-inCategory' : 'promo-banner-default'}`} style={{ width: '100%' }} />
        </Flex>
      </Col>
      <Col span={screens.xs ? 8 : inCategory ? 7 : 6} className='right-side'>
        <Flex vertical>
          <Text strong italic>Up to</Text>
          <Text strong italic>50%</Text>
          <Text strong italic>off</Text>
        </Flex>
      </Col>
      <MarqueePromo position='bottom' />
    </Row>
  )
}

export default PromoBanner
