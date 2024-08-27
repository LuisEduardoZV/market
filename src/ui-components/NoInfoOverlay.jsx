import { Flex, Typography } from 'antd'

import nodata from '../assets/img/no-data.png'

const { Title } = Typography

const NoInfoOverlay = () => (
  <Flex
    vertical style={{
      width: '100%',
      height: '100%',
      justifyContent: 'start',
      alignItems: 'center',
      gap: 1,
      gridColumn: 'span 3'
    }}
  >
    <img alt='No data icon' src={nodata} />
    <Title level={2}>Sin resultados</Title>
  </Flex>
)

export default NoInfoOverlay
