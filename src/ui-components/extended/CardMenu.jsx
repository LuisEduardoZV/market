import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { Flex, Typography } from 'antd'

const { Title } = Typography
gsap.registerPlugin(useGSAP)

const CardMenu = ({ img, category, id, setSelected }) => {
  const card = useRef(null)

  useGSAP(() => {
    const cardElement = document.querySelector(`#shadow-img-menu-${id}`)
    const titleElement = document.querySelector(`#card-title-${id}`)

    const tl = gsap.timeline({ paused: true })

    tl.to(cardElement, {
      backgroundSize: '120%',
      alignItems: 'center'
    })
    tl.to(titleElement, {
      height: '50%',
      zIndex: 1
    }, '<')

    cardElement.addEventListener('mouseenter', () => tl.play())
    cardElement.addEventListener('mouseleave', () => tl.reverse())
  },
  { scope: card })

  return (
    <Flex ref={card} id={`shadow-img-menu-${id}`} className='shadow-img-menu image-menu-item' style={{ backgroundImage: `url(${img})` }} onClick={() => setSelected(id, category)}>
      <Flex id={`card-title-${id}`}>
        <Title level={5}>{category}</Title>
      </Flex>
    </Flex>
  )
}

export default CardMenu
