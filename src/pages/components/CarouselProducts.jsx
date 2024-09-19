import { useMemo } from 'react'

import { Carousel, Flex } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

import BasicCardProduct from '../../ui-components/extended/BasicCardProduct'
import { dividirEnSubarreglos } from '../../utils/func'

const CarouselProducts = ({ products, typeCarousel = 'products' }) => {
  const screens = useBreakpoint()

  const info = useMemo(() => {
    if (products) {
      console.log(products.length)

      if (screens.xs || screens.sm) return dividirEnSubarreglos(products, 6)
      else return dividirEnSubarreglos(products, 3)
    }
    return null
  }, [products, screens])

  return (
    <Flex style={{ position: 'relative' }}>
      <div style={{ width: '100%' }}>
        <Carousel arrows infinite={false} dots={false}>
          {info && info?.map((item, idx) => (
            <Flex key={idx} className='cardItemCarousel'>
              {item?.map((op) => (<BasicCardProduct key={op.id} {...op} typeCarousel={typeCarousel} />))}
            </Flex>
          ))}
        </Carousel>
      </div>
    </Flex>
  )
}

export default CarouselProducts
