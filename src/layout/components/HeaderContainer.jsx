import PropTypes from 'prop-types'

import { IconMenu, IconTruckDelivery, IconUserFilled } from '@tabler/icons-react'
import { Button, Col, Flex, Input, Layout, Row } from 'antd'

import logo from '../../assets/img/logo.png'

const { Header } = Layout
const { Search } = Input

const HeaderContainer = ({ openMenu }) => {
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
            <Button type='text' icon={<IconUserFilled />} />
            <Button type='text' icon={<IconTruckDelivery />} />
            <Button type='text' icon={<IconMenu />} onClick={openMenu} />
          </Flex>
        </Col>
      </Row>
    </Header>
  )
}

HeaderContainer.propTypes = {
  openMenu: PropTypes.func
}

export default HeaderContainer
