import { AnimatePresence, motion } from 'framer-motion'
import { cloneElement, useMemo, useState } from 'react'

import { IconCaretDownFilled, IconCaretUpDown, IconCaretUpFilled } from '@tabler/icons-react'
import { Dropdown, Flex, Menu, Rate, Space, Typography } from 'antd'

const PRICES = [
  {
    key: 'def',
    label: 'Default'
  },
  {
    key: 'asc',
    label: 'Ascending'
  },
  {
    key: 'desc',
    label: 'Descending'
  }
]

const IconCaretUpDownMotion = motion.create(IconCaretUpDown)
const IconCaretUpFilledMotion = motion.create(IconCaretUpFilled)
const IconCaretDownFilledMotion = motion.create(IconCaretDownFilled)

const MovileMenuCategory = ({ categoriesInside, filters, brands, handleFilters, isLoading }) => {
  const [current, setCurrent] = useState('')
  const [orderPrice, setOrderPrice] = useState('def')

  const onClick = (e) => {
    setOrderPrice('def')
    const keys = Object.keys(filters)
    const resetFilters = {}

    keys.forEach((key) => {
      resetFilters[key] = null
    })

    if (e.keyPath.length === 2) {
      setCurrent(e.key)
      const value = isNaN(Number(e.keyPath[0])) ? e.keyPath[0] : Number(e.keyPath[0])
      handleFilters({ ...resetFilters, [e.keyPath[1]]: value })
    } else if (e.key === current) {
      setCurrent('')
      handleFilters(resetFilters)
    }
  }

  const handleSort = ({ key }) => {
    setOrderPrice(key)
    handleFilters({ ...filters, prices: key })
  }

  const items = useMemo(() => {
    return [
      {
        label: <Flex style={{ gap: 5, alignItems: 'center' }}>Subcategories <IconCaretDownFilled size={17} /></Flex>,
        key: 'subcategory',
        children: categoriesInside
          ? categoriesInside.map((op) => (
            {
              key: (op?.id),
              label: (<Typography.Text key={op.id}>{op.category}</Typography.Text>)
            }
          ))
          : null
      },
      {
        label: <Flex style={{ gap: 5, alignItems: 'center' }}>Rating <IconCaretDownFilled size={17} /></Flex>,
        key: 'rate',
        children: [1, 2, 3, 4, 5].map((op) => (
          {
            key: Number(op),
            label: (<Rate disabled defaultValue={op} />)
          }
        ))
      },
      {
        label: <Flex style={{ gap: 5, alignItems: 'center' }}>Brands <IconCaretDownFilled size={17} /></Flex>,
        key: 'brand',
        children: brands
          ? brands.map((op) => (
            {
              key: (op),
              label: (<Typography.Text key={op}>{op ?? 'Sin Marca'}</Typography.Text>)
            }
          ))
          : null
      }
    ]
  })

  if (isLoading) return null
  return (
    <Flex vertical className='movile-menu-category-container'>
      <Menu mode='horizontal' items={items} className='movile-menu-category' onClick={onClick} selectedKeys={[current]} />
      <Dropdown
        arrow
        menu={{ items: PRICES, onClick: handleSort, selectable: true, selectedKeys: [orderPrice] }}
        className='movile-menu-price-filter'
        overlayClassName='movile-menu-price-filter-dropdown'
        dropdownRender={(menu) => (
          <>
            {cloneElement(menu)}
          </>
        )}
      >
        <div onClick={e => e.preventDefault()}>
          <Space>
            Prices
            <AnimatePresence initial={false} onExitComplete={() => null}>
              {orderPrice === 'def' && <IconCaretUpDownMotion
                size={17} stroke={1.2} animate={{ opacity: orderPrice === 'def' ? 1 : 0 }}
                initial={{ opacity: orderPrice === 'def' ? 0 : 1 }}
                exit={{ opacity: orderPrice === 'def' ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                                       />}
              {orderPrice === 'asc' && <IconCaretUpFilledMotion
                size={17} stroke={1.2} animate={{ opacity: orderPrice === 'asc' ? 1 : 0 }}
                initial={{ opacity: orderPrice === 'asc' ? 0 : 1 }}
                exit={{ opacity: orderPrice === 'asc' ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                                       />}
              {orderPrice === 'desc' && <IconCaretDownFilledMotion
                size={17} stroke={1.2} animate={{ opacity: orderPrice === 'desc' ? 1 : 0 }}
                initial={{ opacity: orderPrice === 'desc' ? 0 : 1 }}
                exit={{ opacity: orderPrice === 'desc' ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                                        />}
            </AnimatePresence>
          </Space>
        </div>
      </Dropdown>
    </Flex>
  )
}

export default MovileMenuCategory
