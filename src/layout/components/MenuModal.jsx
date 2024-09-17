import { motion } from 'framer-motion'

import { IconSquareRoundedXFilled } from '@tabler/icons-react'
import { Button, Flex, Typography } from 'antd'

import { useGsapAnim } from '../../hooks/useGsapAnim'
import ModalMenuCards from '../../ui-components/extended/ModalMenuCards'

const { Title } = Typography

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
      className='modal-menu-container'
      vertical
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <Title level={2} className='titleModalMenu'>Choose a speci<span /> </Title>
        <Button type='text' icon={<IconSquareRoundedXFilled />} onClick={close} />
        <Flex className='modal-menu-list'>
          {categories && categories.map((op) => (
            <ModalMenuCards key={op.id} item={op} setSelected={setSelected} />
          ))}
        </Flex>
      </motion.div>
    </FlexMotion>
  )
}

export default MenuModal
