import { Col, Flex, Row, Typography } from 'antd'

import interesting from '../../utils/interestingCards.json'

const { Text, Title } = Typography

const PortraitBanner = () => {
  return (
    <Row className='portrait-banner'>
      {interesting.map((op, idx) => (
        <Col key={idx} span={5} className='per-banner'>
          <Flex style={{ width: '100%', minHeight: 200, height: '100%', flex: 1 }} vertical>
            {(typeof op.img === 'string')
              ? (
                <img src={op.img} alt='Image' style={{ maxHeight: 400, width: '100%', objectFit: 'cover' }} />
                )
              : (
                <Flex style={{ maxHeight: 400, width: '100%', flex: 1 }} vertical>
                  {op.img.map((img, ixd) => (
                    <img key={idx + ixd} src={img} alt='Image' style={{ maxHeight: (400 / op.img.length) - 8, width: '100%', objectFit: 'cover' }} />
                  ))}
                </Flex>
                )}
            <Flex vertical className='portrait-banner-info'>
              <Title level={5} style={{ fontSize: '1rem', paddingBlock: 10 }}>
                {op.title}
              </Title>
              <Text type='secondary' style={{ fontSize: '0.9rem' }}>{op.subtitle}</Text>
              <Flex className='button-borders' style={{ marginTop: 20 }}>
                <button className='primary-button'>
                  {op.btnText}
                </button>
              </Flex>
            </Flex>
          </Flex>
        </Col>
      ))}
    </Row>
  )
}

export default PortraitBanner
