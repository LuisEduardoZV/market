import { Button, Col, Flex, Row, Typography } from 'antd'

import { useProductsUsage } from '../hooks/useProductsUsage'
import CarouselFavProd from './components/CarouselFavProd'
import CarouselProducts from './components/CarouselProducts'
import PromoBanner from './components/PromoBanner'
import ShoesByGender from './components/ShoesByGender'

import interesting from '../utils/interestingCards.json'

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

      <Flex vertical style={{ maxWidth: '45%', width: '100%', alignItems: 'center', alignSelf: 'center', paddingBlock: '7%', textAlign: 'center', gap: 10 }}>
        <Title level={2} style={{ fontWeight: 400 }}>Consigue un 5% de descuento</Title>
        <Text type='secondary' italic style={{ fontSize: '1.1rem' }}>Ssuscirbete a nuestro newsletter y obtendrás un 5% de descuento en tu próxima compra y promociones exclusivas.</Text>
        <Button type='primary' style={{ marginTop: 20 }}>Suscribete</Button>
      </Flex>

    </Flex>
  )
}

export default Home
