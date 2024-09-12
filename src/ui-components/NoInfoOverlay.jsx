import { Flex, Typography } from 'antd'

import nodata from '../assets/img/no-data.png'

const { Title } = Typography

const NoInfoOverlay = () => (
  <Flex
    vertical
    className='no-info-overlay'
  >
    <img alt='No data icon' src={nodata} />
    <Title level={2}>Sin resultados</Title>
  </Flex>
)

export default NoInfoOverlay
