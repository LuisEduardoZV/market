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
    <Flex vertical ref={container} style={{ overflowX: 'hidden' }} itemType='article'>
      <Flex className='home-section' vertical itemType='section'>
        <Title level={3}>People's favourite products!</Title>
        <CarouselFavProd products={topProducts} />
      </Flex>

      <Flex className='showAsApear home-section' itemType='section'>
        <PromoBanner />
      </Flex>

      <div className='showAsApear home-section' itemType='section'>
        <ShoesByGender />
      </div>

      <Flex vertical className='showAsApear home-section' itemType='section'>
        <Title level={3}>Fashion to your taste!</Title>
        <CarouselProducts products={topClothes} typeCarousel='discProd' />
      </Flex>

      <Flex vertical className='showAsApear home-section' itemType='section'>
        <Title level={3}>Technology products</Title>
        <CarouselProducts products={techProd} typeCarousel='techProd' />
      </Flex>

      <Flex vertical className='showAsApear home-section' itemType='section'>
        <Title level={3}>You may also be interested in</Title>
        <PortraitBanner />
      </Flex>

      <Divider style={{ marginBlock: '5%' }} />

      <Flex vertical className='showAsApear home-section newsletter-section' itemType='section'>
        <Title level={2}>Get a 5% discount</Title>
        <Text type='secondary' italic>Subscribe to our newsletter and get a 5% discount on your next purchase and exclusive promotions.</Text>
        <Flex className='button-borders'>
          <button className='primary-button'>
            Subscribe
          </button>
        </Flex>
      </Flex>

    </Flex>
  )
}

export default Home
