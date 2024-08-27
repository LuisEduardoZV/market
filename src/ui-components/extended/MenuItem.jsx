import { Typography } from 'antd'

import { useGsapAnim } from '../../hooks/useGsapAnim'
import { useTokenGlobal } from '../../hooks/useTokenGlobal'
const { Text } = Typography

const MenuItem = ({ item, id, setSelected, category }) => {
  const token = useTokenGlobal()
  const { container, gsap, useGSAP } = useGsapAnim()

  useGSAP(() => {
    if (container.current) {
      const hover = gsap.to(container.current, {
        backgroundColor: token.colorBgBase,
        paused: true,
        paddingInline: '6%',
        scale: 1.1,
        ease: 'power2.out'
      })

      container.current.addEventListener('mouseenter', () => hover.play())
      container.current.addEventListener('mouseleave', () => hover.reverse())
    }
  }, { scope: container })

  return (
    <Text
      className={`${item.id}-submenu-item`}
      ref={container}
      style={{ cursor: 'pointer', fontSize: '0.9rem', backgroundColor: token.colorPaper }}
      onClick={() => {
        setSelected(item.id, item.category, id)
      }}
    >{category}
    </Text>
  )
}

export default MenuItem
