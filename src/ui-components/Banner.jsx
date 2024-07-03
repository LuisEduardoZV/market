import { Flex, Space, Typography } from 'antd'

import { useBannerImages } from '../hooks/useBannerImages'

const { Text, Title } = Typography

const Banner = ({ category }) => {
  const { banner } = useBannerImages(category)

  return (
    <Flex style={{ width: '100%', overflowX: 'auto', position: 'relative', overflowY: 'hidden' }}>
      {banner && banner.map((img, idx) => (<img key={idx} src={img?.url} alt={img?.alt} />))}
      <Space direction='vertical' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', textAlign: 'center', paddingBlock: 25, backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
        <Title level={1}>Market Store</Title>
        <Text strong>Ropa a la moda y de tendencia de grandes diseñadores</Text>
      </Space>
    </Flex>
  )
}

export default Banner
