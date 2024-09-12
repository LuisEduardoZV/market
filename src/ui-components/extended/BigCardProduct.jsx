import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Col, Flex, Rate, Row, Space, Typography, theme } from 'antd'

const { Title, Text } = Typography
const { useToken } = theme

gsap.registerPlugin(useGSAP)

const FlexMotion = motion.create(Flex)

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
    <FlexMotion
      ref={container}
      id={`big-card-container-${id}`}
      vertical
      className='big-card-item'
      onClick={() => navigate(`${category}/product/${id}`)}
      whileHover={{ scale: 1.05, boxShadow: '2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028), 12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042), 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07)' }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <Flex className='rating-container'>
        <Rate
          disabled
          allowHalf
          defaultValue={rating}
          style={{
            backgroundColor: token.colorPaper
          }}
        />
      </Flex>
      <Flex style={{ backgroundColor: token.colorBgBase }}><img src={thumbnail} alt={title} /></Flex>
      <Row className='big-card-info-container'>
        <Col span={16}>
          <Flex vertical className='big-card-title'>
            <Title level={5}>{title}</Title>
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
            <Flex className='big-card-price-container'>
              <Flex
                id={`big-card-${id}-oldprice`}
                className='big-card-oldprice'
              >
                <span>
                  $ {infoPrice.oldPrice}
                  <span className='underline-old-price' />
                </span>
              </Flex>
              <span id={`big-card-${id}-price`} className='big-card-price'>$ {infoPrice.price}</span>
            </Flex>
          )}
        </Col>
      </Row>
    </FlexMotion>
  )
}

export default BigCardProduct
