import { IconThumbUp } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { theme } from 'antd'

const IconMotion = motion.create(IconThumbUp)

const IconThumbUpMotion = () => {
  const { token } = theme.useToken()

  return (
    <IconMotion
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      style={{ color: token.colorPrimary, outline: 'none' }}
      onClick={(e) => e.stopPropagation()}
    />
  )
}

export default IconThumbUpMotion
