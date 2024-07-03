import PropTypes from 'prop-types'

import { Col, Row, Typography } from 'antd'

const { Title } = Typography

const ImageMenu = ({ categories }) => {
  if (!categories) return null
  return (
    <Row style={{ width: 'auto', paddingBlock: 10, marginTop: 40, justifyContent: 'space-around' }}>
      {categories.map(({ label, url }, idx) => (
        <Col span={4} key={idx} style={{ position: 'relative', width: '100%', backgroundImage: `url(${url})`, minHeight: 130, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Title level={5} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', wordBreak: 'keep-all', paddingBlock: '1.5%', paddingInline: '12%', backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)', color: 'white', width: 'max-content', textTransform: 'uppercase' }}>{label}</Title>
        </Col>
      ))}
    </Row>
  )
}

ImageMenu.propTypes = {
  categories: PropTypes.array
}

export default ImageMenu
