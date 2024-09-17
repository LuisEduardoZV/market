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
      console.log(item.id)

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
      className='modal-menu-card-category'
      vertical
    >
      <Title
        id={`${item.id}-title`}
        level={5}
        onClick={() => setSelected(item.id, item.category)}
      >
        {item.category}
      </Title>
      <Divider style={{ margin: 0, padding: 0, paddingBlock: 10 }} />
      <Flex vertical className='menu-list-categories'>
        {item.subcategories.map((op) => (
          <MenuItem key={op.id} item={item} setSelected={setSelected} {...op} />
        ))}
      </Flex>
    </Flex>
  )
}

export default ModalMenuCards
