import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconThumbUp } from '@tabler/icons-react'
import { Col, Flex, Row, Skeleton, Space, Typography, theme } from 'antd'

const { Text, Title } = Typography
const { useToken } = theme

gsap.registerPlugin(useGSAP)

const BasicCardProduct = ({ id, title, rating, tags, images, price, typeCarousel, noRating, category, isLoading = false }) => {
  const { token } = useToken()
  const card = useRef(null)
  const navigate = useNavigate()

  let image = null
  if (!isLoading) image = images[0] ?? ''

  useGSAP(() => {
    if (!isLoading) {
      const card = document.querySelector(`#card-item-carousel-${typeCarousel}-${id}`)
      const title = document.querySelector(`#price-card-item-carousel-${id}`)

      const tl = gsap.timeline({ paused: true })

      tl.to(title, {
        backgroundColor: token.colorBgBase,
        paddingInline: '4%'
      })

      card.addEventListener('mouseenter', () => tl.play())
      card.addEventListener('mouseleave', () => tl.reverse())
    }
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
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => {
        console.log(category)

        navigate(`/${category}/product/${id}`)
      }}
    >
      {isLoading ? <Skeleton.Image active style={{ height: '100%', minHeight: 350, width: '100%', minWidth: 350 }} /> : <img src={image} alt='Image' style={{ height: '100%', maxHeight: 350, width: 'fit-content' }} />}
      <Flex vertical style={{ backgroundColor: token.colorPaper, alignItems: 'center', width: '100%', height: '100%' }}>
        <Row style={{ paddingBlock: '3%', alignSelf: 'start', width: '100%' }}>
          <Col span={18}>
            <Flex vertical>
              {isLoading ? <Skeleton.Button active block /> : <Title level={5} style={{ fontWeight: 500, fontStyle: 'italic', padding: 0, margin: 0, width: 'fit-content' }}>{title}</Title>}
              {!isLoading && (
                <Space>
                  {tags && tags.map((op, idx) => (
                    <Text key={idx} type='secondary' style={{ fontSize: '0.85rem' }}>{op} |</Text>
                  ))}
                </Space>
              )}
            </Flex>
          </Col>
          <Col span={6}>
            {(!noRating && !isLoading) && (
              <Flex style={{ display: 'flex', alignItems: 'end', width: 'fit-content' }}>
                <IconThumbUp color={token.colorPrimary} />
                <Text strong italic style={{ fontSize: '0.9rem' }}>{rating}%</Text>
              </Flex>
            )}
          </Col>
        </Row>
        {isLoading
          ? <Skeleton.Button active block />
          : (
            <Text id={`price-card-item-carousel-${id}`} strong italic style={{ backgroundColor: token.colorPaper, alignSelf: 'start', paddingBlock: '1.5%' }}>
              ${price}
            </Text>
            )}
      </Flex>
    </Flex>
  )
}

export default BasicCardProduct
