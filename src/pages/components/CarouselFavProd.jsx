import { useMemo } from 'react'

import { Carousel, Flex } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

import BasicCardProduct from '../../ui-components/extended/BasicCardProduct'
import { dividirEnSubarreglos } from '../../utils/func'

const CarouselFavProd = ({ products }) => {
  const screens = useBreakpoint()
  console.log(screens)

  const productsTable = useMemo(() => {
    if (products) {
      if (screens.md) return dividirEnSubarreglos(products, 4)
      else if (screens.xs || screens.sm) return dividirEnSubarreglos(products, 6)
      else return dividirEnSubarreglos(products, 3)
    }
    return null
  }, [products, screens])

  // console.log(screens)

  return (
    <Flex style={{ position: 'relative' }}>
      <div style={{ width: '100%' }}>
        <Carousel arrows infinite={false} dots={false}>
          {productsTable && productsTable?.map((item, idx) => (
            <Flex key={idx} className='cardItemCarousel'>
              {item?.map((op) => (<BasicCardProduct key={op.id} {...op} typeCarousel='favProducts' />))}
            </Flex>
          ))}
        </Carousel>
      </div>
    </Flex>
  )
}

export default CarouselFavProd
