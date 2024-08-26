import { Row } from 'antd'

import ButtonCardMenu from './extended/ButtonCardMenu'
import CardMenu from './extended/CardMenu'

const ImageMenu = ({ categories, setSelected }) => {
  if (!categories) return null
  return (
    <Row style={{ width: 'auto', paddingBlock: 10, marginTop: 40, paddingInline: '10%', justifyContent: 'space-between' }}>
      {categories.map((op, idx) => (
        op?.inside ? <ButtonCardMenu key={idx} {...op} /> : <CardMenu key={idx} id={idx} setSelected={setSelected} {...op} />
      ))}
    </Row>
  )
}

export default ImageMenu
