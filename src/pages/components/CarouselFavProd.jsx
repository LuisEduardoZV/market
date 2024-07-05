import { useMemo } from 'react'

import { Carousel, Flex } from 'antd'

import BasicCardProduct from '../../ui-components/extended/BasicCardProduct'

const CarouselFavProd = ({ products }) => {
  const productsTable = useMemo(() => {
    if (products) {
      const uno = products.slice(0, 4)
      const dos = products.slice(4, 8)
      const tres = products.slice(8, 12)
      return [uno, dos, tres]
    }
    return null
  }, [products])

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
