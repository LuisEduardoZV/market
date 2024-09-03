import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'
import { useQuery } from 'react-query'
import { Link as LinkRoute, useNavigate } from 'react-router-dom'

import { IconMenu, IconSquareRoundedXFilled, IconTruckDelivery, IconUserFilled } from '@tabler/icons-react'
import { Badge, Button, Col, Divider, Flex, Input, Layout, Popover, Row, theme, Typography } from 'antd'

import { useSelector } from '../../store'

import { searchProducts } from '../../services/productsFun'

import logo from '../../assets/img/logo.png'

const { Header } = Layout
const { Search } = Input
const { Text, Link } = Typography
const { useToken } = theme

const HeaderContainer = ({ openMenu, handleToHome, currentSubCategory }) => {
  const { checkout } = useSelector((state) => state.cart)

  const { token } = useToken()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [searching, setSearching] = useState(null)
  const [open, setOpen] = useState(false)

  const { data, isLoading } = useQuery(['categories', searching], () => searchProducts(searching), { refetchOnWindowFocus: false, enabled: !!searching })

  const onSearch = (value, _e, info) => {
    if (value) {
      setSearching(value)
      setOpen(true)
    }
  }

  const renderContentSearch = () => {
    if (!data) return <div>Loading...</div>

    let newData = []
    if (data.total > 3) newData = data.products.slice(0, 3)
    else newData = data.products

    const renderProducts = newData.map((op) => (
      <Fragment key={op.id}>
        <Flex
          className='hoverProductSearching' style={{ paddingBlock: 10, paddingRight: 10, transition: 'background-color 0.3s ease-in-out' }} onClick={() => {
            setOpen(false)
            navigate(`${op.category}/product/${op.id}`)
          }}
        >
          <img src={op.thumbnail} alt='Product image' style={{ width: 80, height: 80, objectFit: 'cover' }} />
          <Flex vertical>
            <Text id='titleProductSearch' style={{ fontWeight: 'bold' }}>{op.title}</Text>
            <Text type='secondary' italic style={{ fontSize: '0.8rem' }}>SKU: {op.sku}</Text>
            <Text>${op.price}</Text>
          </Flex>
        </Flex>
        <Divider style={{ margin: 0 }} />
      </Fragment>
    ))

    return (
      <Flex vertical>
        {renderProducts.length > 0
          ? renderProducts.map((op) => op)
          : (
            <Flex>Sin resultados...</Flex>
            )}
        {renderProducts.length > 0 && <Link style={{ paddingTop: 10 }}>Ver todos los productos</Link>}
      </Flex>
    )
  }

  return (
    <Header style={{ backgroundColor: token.colorPaper, position: 'fixed', top: 0, zIndex: 50 }}>
      <Row style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative', placeItems: 'center' }}>
        <Col span={8} style={{ alignItems: 'center' }}>
          <img src={logo} alt='Logo image' style={{ mixBlendMode: 'multiply', maxWidth: '15%', cursor: 'pointer' }} onClick={() => handleToHome()} />
        </Col>
        <Col span={16} style={{ height: 'max-content', position: 'relative' }}>
          <Flex gap={20} align='center' justify='end'>
            <Popover overlayStyle={{ marginTop: 20 }} arrow={false} placement='bottomLeft' title={<Flex style={{ justifyContent: 'space-between' }}><Text>Search results</Text><IconSquareRoundedXFilled size={20} onClick={() => setOpen(false)} style={{ cursor: 'pointer', color: token.colorPrimary }} /></Flex>} content={renderContentSearch()} open={open}>
              <Search placeholder='Buscar...' allowClear value={search} onSearch={onSearch} onChange={e => setSearch(e.target.value)} onFocus={() => setOpen(false)} style={{ maxWidth: '50%' }} loading={isLoading} />
            </Popover>
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
