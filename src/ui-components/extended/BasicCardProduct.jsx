import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { IconThumbUp } from '@tabler/icons-react'
import { Col, Flex, Row, Space, Typography, theme } from 'antd'

const { Text, Title } = Typography
const { useToken } = theme

gsap.registerPlugin(useGSAP)

const BasicCardProduct = ({ id, title, rating, tags, images, price, typeCarousel, noRating }) => {
  const { token } = useToken()
  const card = useRef(null)

  const image = images[0] ?? ''

  useGSAP(() => {
    const card = document.querySelector(`#card-item-carousel-${typeCarousel}-${id}`)
    const title = document.querySelector(`#price-card-item-carousel-${id}`)

    const tl = gsap.timeline({ paused: true })

    tl.to(title, {
      backgroundColor: token.colorBgBase,
      paddingInline: '4%'
    })

    card.addEventListener('mouseenter', () => tl.play())
    card.addEventListener('mouseleave', () => tl.reverse())
  }, {
    scope: card
  })

  return (
    <Flex
      ref={card}
      id={`card-item-carousel-${typeCarousel}-${id}`}
      vertical
      style={{
        backgroundColor: token.colorBgBase,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      <img src={image} alt='Image' style={{ height: '100%', maxHeight: 350, width: 'fit-content' }} />
      <Flex vertical style={{ backgroundColor: token.colorPaper, alignItems: 'center', width: '100%' }}>
        <Row style={{ paddingBlock: '3%', alignSelf: 'start', width: '100%' }}>
          <Col span={18}>
            <Flex vertical>
              <Title level={5} style={{ fontWeight: 500, fontStyle: 'italic', padding: 0, margin: 0, width: 'fit-content' }}>{title}</Title>
              <Space>
                {tags && tags.map((op, idx) => (
                  <Text key={idx} type='secondary' style={{ fontSize: '0.85rem' }}>{op} |</Text>
                ))}
              </Space>
            </Flex>
          </Col>
          <Col span={6}>
            {!noRating && (
              <Flex style={{ display: 'flex', alignItems: 'end', width: 'fit-content' }}>
                <IconThumbUp color={token.colorPrimary} />
                <Text strong italic style={{ fontSize: '0.9rem' }}>{rating}%</Text>
              </Flex>
            )}
          </Col>
        </Row>
        <Text id={`price-card-item-carousel-${id}`} strong italic style={{ backgroundColor: token.colorPaper, alignSelf: 'start', paddingBlock: '1.5%' }}>
          ${price}
        </Text>
      </Flex>
    </Flex>
  )
}

export default BasicCardProduct
