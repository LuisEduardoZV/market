import { motion, useAnimation } from 'framer-motion'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Col, Flex, Rate, Row, Space, Typography, theme } from 'antd'

const { Title, Text } = Typography
const { useToken } = theme

const FlexMotion = motion.create(Flex)

const BigCardProduct = ({ id, rating, thumbnail, title, tags, brand, price, discountPercentage, category }) => {
  const { token } = useToken()
  const navigate = useNavigate()

  const infoPrice = useMemo(() => ({
    oldPrice: price,
    discountPercentage: Math.round(discountPercentage),
    price: (price * ((100 - Math.round(discountPercentage)) / 100)).toFixed(2)
  }), [price, discountPercentage])

  const priceControls = useAnimation()
  const oldPriceControls = useAnimation()

  const containerVariants = {
    hover: {
      borderColor: token.colorBgBase,
      scale: 1.05,
      boxShadow: '2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028), 12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042), 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07)'
    },
    tap: {
      borderColor: token.colorBgBase,
      scale: 0.9,
      boxShadow: '2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02), 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028), 12.5px 12.5px 10px rgba(0, 0, 0, 0.035), 22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042), 41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05), 100px 100px 80px rgba(0, 0, 0, 0.07)'
    },
    rest: {
      borderColor: token.colorPaper,
      scale: 1,
      boxShadow: 'none'
    }
  }

  const oldPriceVariants = {
    hover: {
      backgroundColor: token.colorPaper
    },
    rest: {
      backgroundColor: token.colorBgBase
    }
  }

  const priceVariants = {
    hover: {
      backgroundColor: token.colorPrimary,
      border: 'none',
      color: token.colorPaper
    },
    rest: {
      backgroundColor: token.colorPaper,
      border: 'none',
      color: token.colorText
    }
  }

  const handleHoverStart = () => {
    priceControls.start('hover')
    oldPriceControls.start('hover')
  }

  const handleHoverEnd = () => {
    priceControls.start('rest')
    oldPriceControls.start('rest')
  }

  return (
    <FlexMotion
      vertical
      className='big-card-item'
      onClick={() => navigate(`${category}/product/${id}`, { state: { hasDiscount: true } })}
      variants={containerVariants}
      whileHover='hover'
      whileTap='tap'
      initial='rest'
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
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
            <FlexMotion
              className='big-card-price-container'
              initial='rest'
              animate={priceControls}
            >
              <FlexMotion
                variants={oldPriceVariants}
                className='big-card-oldprice'
                animate={oldPriceVariants}
              >
                <span>
                  $ {infoPrice.oldPrice}
                  <span className='underline-old-price' />
                </span>
              </FlexMotion>
              <motion.span variants={priceVariants} animate={priceControls} className='big-card-price'>$ {infoPrice.price}</motion.span>
            </FlexMotion>
          )}
        </Col>
      </Row>
    </FlexMotion>
  )
}

export default BigCardProduct
