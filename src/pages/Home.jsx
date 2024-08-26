import { Divider, Flex, Typography } from 'antd'

import { useProductsUsage } from '../hooks/useProductsUsage'
import CarouselFavProd from './components/CarouselFavProd'
import CarouselProducts from './components/CarouselProducts'
import PortraitBanner from './components/PortraitBanner'
import PromoBanner from './components/PromoBanner'
import ShoesByGender from './components/ShoesByGender'

const { Text, Title } = Typography

const Home = () => {
  const { topProducts, topClothes, techProd } = useProductsUsage()

  return (
    <Flex vertical>
      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>People's favourite products!</Title>
        <CarouselFavProd products={topProducts} />
      </Flex>

      <PromoBanner />

      <ShoesByGender />

      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>Fashion to your taste!</Title>
        <CarouselProducts products={topClothes} typeCarousel='discProd' />
      </Flex>

      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>Technology products</Title>
        <CarouselProducts products={techProd} typeCarousel='techProd' />
      </Flex>

      <Flex vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>You may also be interested in</Title>
        <PortraitBanner />
      </Flex>

      <Divider style={{ marginBlock: '5%' }} />

      <Flex vertical style={{ maxWidth: '45%', width: '100%', alignItems: 'center', alignSelf: 'center', textAlign: 'center', gap: 10, paddingBottom: '2%' }}>
        <Title level={2} style={{ fontWeight: 400 }}>Get a 5% discount</Title>
        <Text type='secondary' italic style={{ fontSize: '1.1rem' }}>Subscribe to our newsletter and get a 5% discount on your next purchase and exclusive promotions.</Text>
        <Flex className='button-borders' style={{ marginTop: 20 }}>
          <button className='primary-button'>
            Subscribe
          </button>
        </Flex>
      </Flex>

    </Flex>
  )
}

export default Home
