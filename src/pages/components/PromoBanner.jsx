import { memo, useMemo } from 'react'

import { IconArrowNarrowRight, IconShoppingBag, IconShoppingCart } from '@tabler/icons-react'
import { Col, Flex, Row, Skeleton, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

import { useBannerImages } from '../../hooks/useBannerImages'
import { lightenColor } from '../../utils/func'
import MarqueePromo from './MarqueePromo'

const { Text, Title } = Typography

// 21855879

const PromoBanner = memo(({ inCategory, promoBanner = 'shoes' }) => {
  const screens = useBreakpoint()

  const { promo, isLoadingPromo } = useBannerImages(null, promoBanner)

  const colorLight = useMemo(() => (lightenColor(promo?.color ?? '', 20)), [promo])

  const colSpanByScreen = useMemo(() => {
    if (screens.xl && !inCategory) return { left: 11, center: 6, right: 7 }
    if (screens.lg && !inCategory) return { left: 11, center: 7, right: 6 }
    return { left: 15, center: 8, right: 8 }
  }, [screens])

  if (isLoadingPromo) {
    return (
      <Row className={`promo-banner ${inCategory ? 'promo-banner-inCategory' : 'promo-banner-default'}`}>
        <Col span={24}>
          <Skeleton active />
        </Col>
      </Row>
    )
  }
  return (
    <Row
      style={{
        backgroundImage: `radial-gradient(50% 50% at 100% 0, ${promo.color} 0% 5%, ${colorLight} 6% 15%, ${promo.color} 16% 25%, ${colorLight} 26% 35%, ${promo.color} 36% 45%, ${colorLight} 46% 55%, ${promo.color} 56% 65%, ${colorLight} 66% 75%, ${promo.color} 76% 85%, ${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50% at 0 100%, ${promo.color} 0% 5%, ${colorLight} 6% 15%, ${promo.color} 16% 25%, ${colorLight} 26% 35%, ${promo.color} 36% 45%, ${colorLight} 46% 55%, ${promo.color} 56% 65%, ${colorLight} 66% 75%, ${promo.color} 76% 85%, ${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50%, ${promo.color} 0% 5%, ${colorLight} 6% 15%, ${promo.color} 16% 25%, ${colorLight} 26% 35%, ${promo.color} 36% 45%, ${colorLight} 46% 55%, ${promo.color} 56% 65%, ${colorLight} 66% 75%, ${promo.color} 76% 85%, ${colorLight} 86% 95%, #0000 96%), radial-gradient(50% 50%, ${promo.color} 0% 5%, ${colorLight} 6% 15%, ${promo.color} 16% 25%, ${colorLight} 26% 35%, ${promo.color} 36% 45%, ${colorLight} 46% 55%, ${promo.color} 56% 65%, ${colorLight} 66% 75%, ${promo.color} 76% 85%, ${colorLight} 86% 95%, #0000 96%)`,
        backgroundSize: '42px 42px',
        backgroundColor: `${promo.color}`
      }}
      className={`promo-banner ${inCategory ? 'promo-banner-inCategory' : 'promo-banner-default'}`}
    >
      <MarqueePromo position='top' direction='left' />
      <Col span={colSpanByScreen.left} className='left-side'>
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
      <Col span={colSpanByScreen.center} style={{ position: 'relative' }}>
        <Flex>
          <img src={promo.url} alt={promo.alt} className={`${inCategory ? 'promo-banner-inCategory' : 'promo-banner-default'}`} style={{ width: '100%' }} />
        </Flex>
      </Col>
      <Col span={colSpanByScreen.right} className='right-side'>
        <Flex vertical>
          <Text strong italic>Up to</Text>
          <Text strong italic>50%</Text>
          <Text strong italic>off</Text>
        </Flex>
      </Col>
      <MarqueePromo position='bottom' />
    </Row>
  )
})

PromoBanner.displayName = 'PromoBanner'

export default PromoBanner
