import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { Col, Flex, Row, Skeleton, Space, Typography, theme } from 'antd'
import IconThumbUpMotion from './IconThumbUpMotion'

const { Text, Title } = Typography
const { useToken } = theme

const FlexMotion = motion.create(Flex)
const TextMotion = motion.create(Text)

const BasicCardProduct = ({ id, title, rating, tags, images, price, noRating, category, isLoading = false }) => {
  const { token } = useToken()
  const navigate = useNavigate()

  let image = null
  if (!isLoading) image = images[0] ?? ''

  const priceTextVariants = {
    hover: {
      backgroundColor: token.colorBgBase,
      paddingInline: '4%'
    },
    rest: {
      paddingInline: '0.5%',
      backgroundColor: token.colorPaper
    }
  }

  const cardVariants = {
    hover: {
      boxShadow: '5.9px 4.6px 10px rgba(0, 0, 0, 0.02), 47px 37px 80px rgba(0, 0, 0, 0.04)'
    },
    rest: {
      boxShadow: 'none'
    }
  }

  return (
    <FlexMotion
      vertical
      className='basic-card-product'
      onClick={() => {
        navigate(`/${category}/product/${id}`)
      }}
      variants={cardVariants}
      whileHover='hover'
      whileTap='rest'
      initial='rest'
    >
      {isLoading
        ? <Skeleton.Image active className='skeleton-img-product' />
        : (
          <div className='image-product-card'>
            <motion.img src={image} alt='Image' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} />
          </div>
          )}
      <Flex vertical className='info-product-card'>
        <Row>
          <Col span={18}>
            <Flex vertical>
              {isLoading ? <Skeleton.Button active block /> : <Title level={5}>{title}</Title>}
              {!isLoading && (
                <Space style={{ flexWrap: 'wrap', width: '100%' }}>
                  {tags && tags.map((op, idx) => (
                    <Text key={idx} type='secondary' style={{ fontSize: '0.85rem' }}>{op} |</Text>
                  ))}
                </Space>
              )}
            </Flex>
          </Col>
          <Col span={6}>
            {(!noRating && !isLoading) && (
              <Flex className='rate-product-card'>
                <IconThumbUpMotion />
                <Text strong italic style={{ fontSize: '0.9rem' }}>{rating}%</Text>
              </Flex>
            )}
          </Col>
        </Row>
        {isLoading
          ? <Skeleton.Button active block />
          : (
            <TextMotion variants={priceTextVariants} strong italic className='price-product-card' transition={{ type: 'spring', stiffness: 200, damping: 5 }}>
              ${price}
            </TextMotion>
            )}
      </Flex>
    </FlexMotion>
  )
}

export default BasicCardProduct
