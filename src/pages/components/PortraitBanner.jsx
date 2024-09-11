import { Col, Flex, Row, Typography } from 'antd'

import interesting from '../../utils/interestingCards.json'

const { Text, Title } = Typography

const PortraitBanner = () => {
  return (
    <Row style={{ marginTop: 10, width: '100%', alignItems: 'start', justifyContent: 'space-around', paddingInline: '10%', paddingBottom: 5 }}>
      {interesting.map((op, idx) => (
        <Col key={idx} span={5} style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
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
            <Flex vertical style={{ flex: 'none', justifyContent: 'space-between', height: 'max-content' }}>
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
