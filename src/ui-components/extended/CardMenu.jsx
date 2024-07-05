import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { Col, Flex, Typography } from 'antd'

const { Title } = Typography
gsap.registerPlugin(useGSAP)

const CardMenu = ({ url, label, id }) => {
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
      width: 'auto',
      height: '50%'
    }, '<')

    cardElement.addEventListener('mouseenter', () => tl.play())
    cardElement.addEventListener('mouseleave', () => tl.reverse())
  },
  { scope: card })

  return (
    <Col ref={card} id={`shadow-img-menu-${id}`} span={5} className='shadow-img-menu' style={{ position: 'relative', width: '100%', backgroundImage: `url(${url})`, minHeight: 130, backgroundSize: '100%', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}>
      <Flex id={`card-title-${id}`} style={{ paddingBlock: '1.5%', paddingInline: '10%', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
        <Title level={5} style={{ wordBreak: 'keep-all', color: 'white', width: 'max-content', textTransform: 'uppercase', padding: 0, margin: 0 }}>{label}</Title>
      </Flex>
    </Col>
  )
}

export default CardMenu
