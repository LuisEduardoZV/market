import PropTypes from 'prop-types'

import { Row } from 'antd'

import CardMenu from './extended/CardMenu'

const ImageMenu = ({ categories }) => {
  if (!categories) return null
  return (
    <Row style={{ width: 'auto', paddingBlock: 10, marginTop: 40, paddingInline: '10%', justifyContent: 'space-between' }}>
      {categories.map((op, idx) => (
        <CardMenu key={idx} id={idx} {...op} />
      ))}
    </Row>
  )
}

ImageMenu.propTypes = {
  categories: PropTypes.array
}

export default ImageMenu
