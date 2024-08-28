import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Col, Flex, Rate, Row, Space, Typography, theme } from 'antd'

const { Title, Text } = Typography
const { useToken } = theme

gsap.registerPlugin(useGSAP)

const BigCardProduct = ({ id, rating, thumbnail, title, tags, brand, price, discountPercentage, category }) => {
  const { token } = useToken()
  const container = useRef(null)
  const navigate = useNavigate()

  const infoPrice = useMemo(() => ({
    oldPrice: price,
    discountPercentage: Math.round(discountPercentage),
    price: (price * ((100 - Math.round(discountPercentage)) / 100)).toFixed(2)
  }), [price, discountPercentage])

  useGSAP(() => {
    if (container.current) {
      const oldPrice = document.querySelector(`#big-card-${id}-oldprice`)
      const price = document.querySelector(`#big-card-${id}-price`)

      const tl = gsap.timeline({ paused: true })

      tl.to(container.current, {
        borderColor: token.colorBgBase
      })
      tl.to(oldPrice, {
        backgroundColor: token.colorPaper
      }, 0.1)
      tl.to(price, {
        backgroundColor: token.colorBgBase
      }, 0.2)

      container.current.addEventListener('mouseenter', () => tl.play())
      container.current.addEventListener('mouseleave', () => tl.reverse())
    }
  }, { scope: container })

  return (
    <Flex ref={container} id={`big-card-container-${id}`} vertical key={id} className='big-card-item' onClick={() => navigate(`${category}/product/${id}`)}>
      <Flex style={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        borderLeftWidth: 0,
        backgroundColor: token.colorPaper
      }}
      >
        <Rate
          disabled
          allowHalf
          defaultValue={rating}
          style={{
            backgroundColor: token.colorPaper
          }}
        />
      </Flex>
      <Flex style={{ backgroundColor: token.colorBgBase }}><img src={thumbnail} alt={title} style={{ width: '100%', maxHeight: 400 }} /></Flex>
      <Row>
        <Col span={16}>
          <Flex vertical style={{ minHeight: 'max-content', height: '100%', backgroundColor: token.colorPaper, paddingBlock: '3%' }}>
            <Title level={5} style={{ fontWeight: 500, fontStyle: 'italic', padding: 0, margin: 0, width: 'fit-content' }}>{title}</Title>
            <Space>
              {tags && tags.map((tag, idx) => (
                <Text key={idx} type='secondary' style={{ fontSize: '0.85rem' }}>{tag} |</Text>
              ))}
            </Space>
            <Text>{brand}</Text>
          </Flex>
        </Col>
        <Col span={8}>
          {infoPrice && (
            <Flex style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Flex
                id={`big-card-${id}-oldprice`} style={{
                  position: 'absolute',
                  top: '55%',
                  left: '15%',
                  backgroundColor: token.colorBgBase,
                  paddingInline: 10,
                  paddingBottom: 5,
                  paddingTop: 20
                }}
              >
                <span style={{ position: 'relative', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  $ {infoPrice.oldPrice}
                  <span style={{ position: 'absolute', width: '200%', backgroundColor: token.colorErrorDark, height: 0.5, top: '45%', left: '-50%', transform: 'translateY(-50%)' }} />
                </span>
              </Flex>
              <span id={`big-card-${id}-price`} style={{ position: 'absolute', top: '32%', right: '10%', backgroundColor: token.colorPaper, paddingInline: 10, paddingBlock: 5, border: '1px solid', borderColor: token.colorBgBase, fontWeight: 600, fontSize: '1.1rem' }}>$ {infoPrice.price}</span>
            </Flex>
          )}
        </Col>
      </Row>
    </Flex>
  )
}

export default BigCardProduct
