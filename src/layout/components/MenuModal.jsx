import { IconSquareRoundedXFilled } from '@tabler/icons-react'
import { Button, Flex, Typography, theme } from 'antd'

import { useGsapAnim } from '../../hooks/useGsapAnim'
import ModalMenuCards from '../../ui-components/extended/ModalMenuCards'

const { Title } = Typography
const { useToken } = theme

const MenuModal = ({ close, categories, setSelected, open }) => {
  const { token } = useToken()
  const { container, gsap, useGSAP } = useGsapAnim()

  useGSAP(() => {
    if (container.current) {
      const title = document.querySelector('.titleModalMenu span')

      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      tl.to(title, {
        text: 'fic category!',
        duration: 4,
        ease: 'expo'
      })
    }
  },
  { scope: container })

  if (!open) return null
  return (
    <Flex
      ref={container}
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: token.colorPaper,
        maxHeight: '100vh',
        height: '100%',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center'
      }}
      vertical
    >
      <Title level={2} className='titleModalMenu' style={{ marginBlock: '2.5%', paddingInline: '2%', alignSelf: 'start' }}>Choose a speci<span /> </Title>
      <Button type='text' icon={<IconSquareRoundedXFilled />} style={{ position: 'absolute', top: '4%', right: '4%' }} onClick={close} />
      <Flex
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '50% 50%',
          position: 'relative',
          gap: 30
        }}
      >
        {categories && categories.map((op) => (
          <ModalMenuCards key={op.id} item={op} setSelected={setSelected} />
        ))}
      </Flex>
    </Flex>
  )
}

export default MenuModal
