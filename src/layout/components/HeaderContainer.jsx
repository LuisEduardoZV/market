import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'
import { Link as LinkRoute, useNavigate } from 'react-router-dom'

import { IconMenu, IconSquareRoundedXFilled, IconTruckDelivery, IconUserFilled } from '@tabler/icons-react'
import { Badge, Button, Col, Flex, Input, Layout, Popover, Row, theme, Typography } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

import { useSelector } from '../../store'

import { useSearchProducts } from '../../hooks/useSearchProducts'
import ListSearchResult from './ListSearchResult'

import logo from '../../assets/img/logo.png'

const { Header } = Layout
const { Search } = Input
const { Text } = Typography
const { useToken } = theme

const HeaderContainer = ({ openMenu, handleToHome }) => {
  const { checkout } = useSelector((state) => state.cart)
  const screens = useBreakpoint()

  const { token } = useToken()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const { data, isLoading, onSearch, setSearching } = useSearchProducts()

  const handleClose = () => {
    setOpen(false)
    setSearching(null)
  }

  const handleClickProduct = (op) => {
    setOpen(false)
    setSearching(null)
    navigate(`${op.category}/product/${op.id}`)
  }

  const onSearchProd = (value, _e, info) => {
    onSearch(value, _e, info)
    if (value && info.source === 'input') setOpen(true)
  }

  return (
    <Header className='header'>
      <Row>
        <Col span={8} className='logo'>
          <img src={logo} alt='Logo image' onClick={() => handleToHome()} />
        </Col>
        <Col span={16} className='main-actions'>
          <Flex gap={20} align='center' justify='end'>
            {(screens.md) && (
              <>
                <Popover
                  overlayStyle={{ marginTop: 20 }}
                  arrow={false}
                  placement='bottomLeft'
                  title={
                    <Flex style={{ justifyContent: 'space-between' }}><Text>Search results</Text><IconSquareRoundedXFilled size={20} onClick={handleClose} style={{ cursor: 'pointer', color: token.colorPrimary }} /></Flex>
                }
                  content={<ListSearchResult data={data} onClick={handleClickProduct} />}
                  open={open}
                >
                  <Search placeholder='Buscar...' allowClear onSearch={onSearchProd} onFocus={handleClose} style={{ maxWidth: '50%' }} loading={isLoading} />
                </Popover>
              </>
            )}
            <Button type='text' icon={<IconUserFilled />} />
            <Flex style={{ alignItems: 'center', justifyContent: 'center', height: 'fit-content' }}>
              <LinkRoute to='/shopping-cart' style={{ alignItems: 'center', justifyContent: 'center', height: 50, placeContent: 'center' }}>
                <Badge count={checkout.products.length} size='small' color={token.colorPrimary} style={{ fontSize: '0.7rem' }}>
                  <IconTruckDelivery size={25} />
                </Badge>
              </LinkRoute>
            </Flex>
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
