import { Divider, Flex, Typography, theme } from 'antd'

import { useGsapAnim } from '../../hooks/useGsapAnim'
import MenuItem from './MenuItem'

const { Title } = Typography
const { useToken } = theme

const ModalMenuCards = ({ item, setSelected }) => {
  const { container, gsap, useGSAP } = useGsapAnim()
  const { token } = useToken()

  useGSAP(() => {
    if (container.current) {
      const title = document.querySelector(`#${item.id}-title`)

      const tl = gsap.timeline({ paused: true })
      tl.to(title, {
        backgroundColor: token.grey900,
        color: token.grey100,
        transform: 'translateY(-20px)',
        ease: 'power2.out'
      })

      container.current.addEventListener('mouseenter', () => tl.play())
      container.current.addEventListener('mouseleave', () => tl.reverse())
    }
  }, { scope: container })

  return (
    <Flex
      id={item.id}
      ref={container}
      style={{ width: '100%', alignSelf: 'start', alignItems: 'center', height: '100%', position: 'relative', paddingInline: '3%' }}
      vertical
    >
      <Title
        id={`${item.id}-title`}
        level={5}
        style={{ cursor: 'pointer', backgroundColor: token.colorBgBase, paddingInline: '5%', paddingBlock: 2 }}
        onClick={() => setSelected(item.id, item.category)}
      >
        {item.category}
      </Title>
      <Divider style={{ margin: 0, padding: 0, paddingBlock: 10 }} />
      <Flex vertical style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', justifyItems: 'center', rowGap: 10 }}>
        {item.subcategories.map((op) => (
          <MenuItem key={op.id} item={item} setSelected={setSelected} {...op} />
        ))}
      </Flex>
    </Flex>
  )
}

export default ModalMenuCards
