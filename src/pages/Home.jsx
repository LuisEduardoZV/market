import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

import { Divider, Flex, Typography } from 'antd'

import { useProductsUsage } from '../hooks/useProductsUsage'
import CarouselFavProd from './components/CarouselFavProd'
import CarouselProducts from './components/CarouselProducts'
import PortraitBanner from './components/PortraitBanner'
import PromoBanner from './components/PromoBanner'
import ShoesByGender from './components/ShoesByGender'

const { Text, Title } = Typography

gsap.registerPlugin(useGSAP, ScrollTrigger)

ScrollTrigger.config({
  autoRefreshEvents: 'DOMContentLoaded,load,resize'
})

const Home = () => {
  const { topProducts, topClothes, techProd, loading } = useProductsUsage()
  const container = useRef()

  useGSAP(() => {
    const sections = gsap.utils.toArray('.showAsApear')
    sections.forEach((element, i) => {
      gsap.from(element, {
        opacity: 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 40%',
          onEnter: () => {
            gsap.to(element, {
              duration: 1,
              opacity: 1,
              x: 0
            })
          },
          onLeave: () => {
            gsap.to(element, {
              duration: 1,
              opacity: 0
            })
          },
          onEnterBack: () => {
            gsap.to(element, {
              duration: 1,
              opacity: 1,
              x: 0
            })
          },
          onLeaveBack: () => {
            gsap.to(element, {
              duration: 1,
              opacity: 0,
              x: i % 2 === 0 && i !== 0 ? '100%' : 0
            })
          }
        }
      })
    })
  }, {
    scope: container
  })

  useEffect(() => {
    if (!loading) {
      gsap.delayedCall(0.5, () => {
        ScrollTrigger.refresh()
      })
    }
  }, [loading])

  return (
    <Flex vertical ref={container} style={{ overflowX: 'hidden' }}>
      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>People's favourite products!</Title>
        <CarouselFavProd products={topProducts} />
      </Flex>

      <Flex className='showAsApear'>
        <PromoBanner />
      </Flex>

      <div className='showAsApear'>
        <ShoesByGender />
      </div>

      <Flex vertical className='showAsApear' style={{ width: '100%', overflowX: 'hidden' }}>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>Fashion to your taste!</Title>
        <CarouselProducts products={topClothes} typeCarousel='discProd' />
      </Flex>

      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical className='showAsApear'>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>Technology products</Title>
        <CarouselProducts products={techProd} typeCarousel='techProd' />
      </Flex>

      <Flex vertical className='showAsApear' style={{ overflow: 'hidden' }}>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>You may also be interested in</Title>
        <PortraitBanner />
      </Flex>

      <Divider style={{ marginBlock: '5%' }} />

      <Flex vertical style={{ maxWidth: '45%', width: '100%', alignItems: 'center', alignSelf: 'center', textAlign: 'center', gap: 10, paddingBottom: '2%' }} className='showAsApear'>
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
