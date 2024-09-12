import { motion } from 'framer-motion'

import { IconSquareRoundedXFilled } from '@tabler/icons-react'
import { Button, Flex, Typography, theme } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

import { useGsapAnim } from '../../hooks/useGsapAnim'
import ModalMenuCards from '../../ui-components/extended/ModalMenuCards'

const { Title } = Typography
const { useToken } = theme

const FlexMotion = motion.create(Flex)

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
}

const MenuModal = ({ close, categories, setSelected, open }) => {
  const { token } = useToken()
  const screens = useBreakpoint()
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
    <FlexMotion
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
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{ position: 'relative', width: '100%', height: '100%' }}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <Title level={2} className='titleModalMenu' style={{ marginBlock: '2.5%', paddingInline: '2%', alignSelf: 'start' }}>Choose a speci<span /> </Title>
        <Button type='text' icon={<IconSquareRoundedXFilled />} style={{ position: 'absolute', top: '4%', right: '4%' }} onClick={close} />
        <Flex
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: screens.xs ? '1fr' : '1fr 1fr 1fr',
            gridTemplateRows: screens.xs ? '1fr' : '50% 50%',
            position: 'relative',
            overflowY: screens.xs ? 'auto' : 'hidden',
            paddingTop: 40,
            gap: 30,
            paddingBottom: screens.xs && '20%'
          }}
        >
          {categories && categories.map((op) => (
            <ModalMenuCards key={op.id} item={op} setSelected={setSelected} />
          ))}
        </Flex>
      </motion.div>
    </FlexMotion>
  )
}

export default MenuModal
