import { Carousel, Flex, Skeleton, Space, Typography, theme } from 'antd'

import { useBannerImages } from '../hooks/useBannerImages'

const { Text, Title } = Typography

const Banner = ({ category }) => {
  const { token } = theme.useToken()
  const { banner, isLoading } = useBannerImages(category)

  return (
    <Flex style={{ position: 'relative' }}>
      <div style={{ width: '100%' }}>
        {!banner && isLoading && <Skeleton.Image active style={{ height: category ? '45vh' : '85vh', width: '100vw', visibility: 'visible', opacity: 1 }} />}
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
                <img key={idx} src={img?.url} alt={img?.alt} style={{ width: '100%', objectFit: 'cover', maxHeight: category ? '45vh' : '85vh' }} />
              </Flex>
            ))}
          </Carousel>
        )}
      </div>
      <Space direction='vertical' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', textAlign: 'center', paddingBlock: 25, backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <Title level={1} style={{ color: token.colorPaper }}>SimuShop</Title>
        <Text style={{ color: token.colorPaper }}>Simulate, Experiment, Shop!</Text>
        <Text style={{ color: token.colorPaper }}>Explore our store, simulate your favorite shopping and have fun creating the shopping cart of your dreams, all without compromise!</Text>
      </Space>
    </Flex>
  )
}

export default Banner
