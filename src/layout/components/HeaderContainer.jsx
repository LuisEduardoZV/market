import { IconTruckDelivery, IconUserFilled } from '@tabler/icons-react'
import { Button, Col, Flex, Input, Layout, Row } from 'antd'

import logo from '../../assets/img/logo.png'

const { Header } = Layout
const { Search } = Input

const HeaderContainer = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value)

  return (
    <Header style={{ backgroundColor: 'transparent' }}>
      <Row style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <Col span={8}>
          <img src={logo} alt='Logo image' style={{ mixBlendMode: 'multiply', maxWidth: '15%' }} />
        </Col>
        <Col span={16} style={{ height: 'max-content' }}>
          <Flex gap={20} align='center' justify='end'>
            <Search placeholder='Buscar...' allowClear onSearch={onSearch} style={{ maxWidth: '50%' }} />
            <Button icon={<IconUserFilled />} />
            <Button icon={<IconTruckDelivery />} />
          </Flex>
        </Col>
      </Row>
    </Header>
  )
}

Header.propTypes = {

}

export default HeaderContainer
