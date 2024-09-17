import { Divider, Drawer, Flex, Typography, theme } from 'antd'
import { motion } from 'framer-motion'

const FlexMotion = motion.create(Flex)
const TextMotion = motion.create(Typography.Text)
const TitleMotion = motion.create(Typography.Title)

const MovilMenuModal = ({ open, onClose, setSelected, categories }) => {
  const { token } = theme.useToken()

  const titleVariants = {
    hover: {
      backgroundColor: token.grey900,
      color: token.grey100,
      paddingInline: '6%',
      scale: 1.1
    },
    rest: {
      paddingInline: 0,
      backgroundColor: token.colorPaper,
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
      <Flex>
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
                    console.log('entro')
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
