import { IconSquareRoundedXFilled } from '@tabler/icons-react'
import { Button, Flex, Typography, theme } from 'antd'

const { Text, Title } = Typography
const { useToken } = theme

const MenuModal = ({ close, categories, setSelected }) => {
  const { token } = useToken()

  return (
    <Flex
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: token.colorPaper,
        maxHeight: '100vh'
      }}
      vertical
    >
      <Title level={2} style={{ marginBlock: '2.5%', paddingInline: '7%' }}>Choose a specific category!</Title>
      <Button type='text' icon={<IconSquareRoundedXFilled />} style={{ position: 'absolute', top: '6.5%', right: '5%' }} onClick={close} />
      <Flex
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          justifyItems: 'center',
          rowGap: 10
        }}
        vertical
      >
        {categories && categories.map((op) => (
          <Text
            key={op.slug} style={{ paddingBlock: 5, paddingInline: 100, background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,1) 50%, transparent 100%)', backdropFilter: 'blur(10px)', width: 'fit-content', cursor: 'pointer' }} onClick={() => {
              setSelected(op.slug)
            }}
          >
            {op.label}
          </Text>
        ))}
      </Flex>
    </Flex>
  )
}

export default MenuModal
