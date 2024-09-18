import { Divider, Drawer, Flex, Input, Typography, theme } from 'antd'
import { motion } from 'framer-motion'

import { useSearchProducts } from '../../hooks/useSearchProducts'
import ListSearchResult from './ListSearchResult'

const FlexMotion = motion.create(Flex)
const TextMotion = motion.create(Typography.Text)
const TitleMotion = motion.create(Typography.Title)

const MovilMenuModal = ({ open, onClose, setSelected, categories }) => {
  const { token } = theme.useToken()
  const { data, isLoading, onSearch, searching, setSearching } = useSearchProducts()

  const titleVariants = {
    hover: {
      backgroundColor: token.grey900,
      color: token.grey100,
      paddingInline: '6%',
      scale: 1.1
    },
    rest: {
      paddingInline: 0,
      backgroundColor: token.colorBgBase,
      color: token.grey900,
      scale: 1
    }
  }

  const textVariants = {
    hover: {
      backgroundColor: token.grey400,
      paddingInline: '6%',
      scale: 1.1
    },
    rest: {
      backgroundColor: token.colorBgBase,
      paddingInline: 0,
      scale: 1
    }
  }

  return (
    <Drawer title='Choose a category' onClose={onClose} open={open}>
      <Flex vertical>
        <Input.Search placeholder='Buscar...' allowClear onSearch={onSearch} loading={isLoading} style={{ marginBottom: 20 }} onFocus={() => setSearching(null)} />
        {(data && searching) && (
          <Flex vertical className='movile-menu-search-results'>
            <ListSearchResult data={data} onClick={null} />
          </Flex>
        )}
        <Flex className='movile-menu-list' vertical>
          {categories && categories.map((op) =>
            (
              <FlexMotion
                key={op.id}
                vertical
                whileHover='hover'
                initial='rest'
              >
                <TitleMotion
                  level={5}
                  onClick={() => setSelected(op.id, op.category)}
                  variants={titleVariants}
                >
                  {op.category}
                </TitleMotion>
                <Divider style={{ margin: 0, padding: 0, paddingBlock: 10 }} />
                <Flex
                  className='movile-menu-list-categories' onPointerDownCapture={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {op.subcategories.map((item) => (
                    <TextMotion
                      key={item.id}
                      style={{ width: 'fit-content', cursor: 'pointer' }}
                      variants={textVariants}
                      whileHover='hover'
                      initial='rest'
                    >{item.category}
                    </TextMotion>
                  ))}
                </Flex>
              </FlexMotion>
            )
          )}
        </Flex>
      </Flex>
    </Drawer>
  )
}

export default MovilMenuModal
