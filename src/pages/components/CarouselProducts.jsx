import { useMemo } from 'react'

import { Carousel, Flex } from 'antd'

import BasicCardProduct from '../../ui-components/extended/BasicCardProduct'

const CarouselProducts = ({ products, typeCarousel = 'products' }) => {
  const info = useMemo(() => {
    if (products) {
      const uno = products.slice(0, 4)
      const dos = products.slice(4, 8)
      return [uno, dos]
    }
    return null
  }, [products])

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
