import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef } from 'react'

import { Flex, Typography } from 'antd'

import beaty from '../../assets/img/beauty.jpeg'
import fashion from '../../assets/img/fashion.jpeg'
import home from '../../assets/img/home.jpeg'
import tech from '../../assets/img/tech.jpeg'

const { Title } = Typography
gsap.registerPlugin(useGSAP)

const CardMenu = ({ category, id, setSelected }) => {
  const card = useRef(null)

  const img = useMemo(() => {
    switch (id) {
      case 'tech':
        return tech
      case 'fashion':
        return fashion
      case 'home':
        return home
      case 'beauty':
      default:
        return beaty
    }
  }, [id])

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
