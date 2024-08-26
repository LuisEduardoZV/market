import { Carousel, Flex, Skeleton, Space, Typography } from 'antd'

import { useBannerImages } from '../hooks/useBannerImages'

const { Text, Title } = Typography

const Banner = ({ category }) => {
  const { banner, isLoading } = useBannerImages(category)

  return (
    <Flex style={{ position: 'relative' }}>
      <div style={{ width: '100%' }}>
        {!banner && isLoading && <Skeleton.Image active style={{ height: '85vh', width: '100vw', visibility: 'visible', opacity: 1 }} />}
        {banner && (
          <Carousel autoplay style={{ width: '100%' }}>
            {banner?.map((img, idx) => (
              <Flex
                key={idx}
                vertical style={{
                  width: '100%',
                  height: '100%'
                }}
              >
                <img key={idx} src={img?.url} alt={img?.alt} style={{ width: '100%', objectFit: 'cover', maxHeight: '85vh' }} />
              </Flex>
            ))}
          </Carousel>
        )}
      </div>
      <Space direction='vertical' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', textAlign: 'center', paddingBlock: 25, backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: 'black', zIndex: 10 }}>
        <Title level={1}>Market Store</Title>
        <Text strong>Ropa a la moda y de tendencia de grandes diseñadores</Text>
      </Space>
    </Flex>
  )
}

export default Banner
