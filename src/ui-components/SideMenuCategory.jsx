import { useEffect, useState } from 'react'

import { IconSquareRoundedX } from '@tabler/icons-react'
import { Divider, Flex, Radio, Rate, Slider, Space, theme, Typography } from 'antd'

import ButtonCardMenu from './extended/ButtonCardMenu'

const { Text, Title } = Typography
const { useToken } = theme

const SideMenuCategory = ({ categoriesInside, filters, brands, prices, handleFilters, isLoading }) => {
  const { token } = useToken()

  const [selected, setSelected] = useState(filters.subcategory)
  const [sliderValue, setSliderValue] = useState(filters.prices ?? prices)
  const [brand, setBrand] = useState(filters.brand ?? null)
  const [rate, setRate] = useState(filters.brand ?? 4)

  const handleChangeFilters = (type, value) => {
    handleFilters({ ...filters, [type]: value })
  }

  useEffect(() => {
    if (filters?.prices) setSliderValue(filters.prices)
    else if (prices) setSliderValue(prices)
  }, [filters, prices])

  if (isLoading) return null
  return (
    <Flex
      vertical
      className='shadow-menu-subcategory other-scrollbar aside-menu-category'
    >
      <Flex vertical>
        <Flex className='submenu-category-container'>
          <Title level={5}>Subcategories</Title>
          {filters.subcategory && <IconSquareRoundedX
            size={18} color={token.colorPrimaryTextActive} style={{ cursor: 'pointer' }} onClick={() => {
              handleChangeFilters('subcategory', null)
              setSelected(null)
            }}
                                  />}
        </Flex>
        <Divider className='divider-aside-menu-category' />
        <Radio.Group
          onChange={(e) => {
            handleChangeFilters('subcategory', e.target.value)
            setSelected(e.target.value)
          }} value={selected}
        >
          <Space direction='vertical'>
            {categoriesInside && categoriesInside.map((op) => <ButtonCardMenu key={op.id} {...op} />)}
          </Space>
        </Radio.Group>
      </Flex>
      <Flex vertical>
        <Flex className='submenu-category-container'>
          <Title level={5}>Rating</Title>
          {filters.rate && <IconSquareRoundedX
            size={18} color={token.colorPrimaryTextActive} style={{ cursor: 'pointer' }} onClick={() => {
              handleChangeFilters('rate', null)
              setRate(null)
            }}
                           />}
        </Flex>
        <Divider className='divider-aside-menu-category' />
        <Rate
          value={rate} onChange={(value) => {
            handleChangeFilters('rate', value)
            setRate(value)
          }}
        />
      </Flex>
      <Flex vertical>
        <Flex className='submenu-category-container'>
          <Title level={5}>Price</Title>
          {filters.prices && <IconSquareRoundedX
            size={18} color={token.colorPrimaryTextActive} style={{ cursor: 'pointer' }} onClick={() => {
              handleChangeFilters('prices', null)
              setSliderValue(prices)
            }}
                             />}
        </Flex>
        <Divider className='divider-aside-menu-category' />
        <Text>${sliderValue[0]}.00 - ${sliderValue[1]}.00</Text>
        <Slider
          range
          tooltip={{
            formatter: null
          }}
          min={prices[0]}
          max={prices[1]}
          value={sliderValue}
          onChange={(value) => {
            setSliderValue(value)
          }}
          onChangeComplete={(value) => {
            handleChangeFilters('prices', value)
          }}
        />
      </Flex>
      {brands && brands.length > 0 && (
        <Flex vertical>
          <Flex className='submenu-category-container'>
            <Title level={5}>Brands</Title>
            {filters.brand && <IconSquareRoundedX
              size={18} color={token.colorPrimaryTextActive} style={{ cursor: 'pointer' }} onClick={() => {
                handleChangeFilters('brand', null)
                setBrand(null)
              }}
                              />}
          </Flex>
          <Divider className='divider-aside-menu-category' />
          <Radio.Group
            onChange={(e) => {
              handleChangeFilters('brand', e.target.value)
              setBrand(e.target.value)
            }} value={brand}
          >
            <Space direction='vertical'>
              {brands && brands.map((op) => <ButtonCardMenu key={op} id={op} category={op ?? 'Sin Marca'} />)}
            </Space>
          </Radio.Group>
        </Flex>
      )}
    </Flex>
  )
}

export default SideMenuCategory
