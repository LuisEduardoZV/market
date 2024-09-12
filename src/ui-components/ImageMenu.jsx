import { Flex } from 'antd'

import CardMenu from './extended/CardMenu'

const ImageMenu = ({ categories, setSelected, currentCategory }) => {
  if (!categories || currentCategory.subcategory) return null
  return (
    <Flex style={{ width: '100%', paddingBlock: 10, marginTop: 40, paddingInline: '10%', justifyContent: currentCategory.subcategory ? 'start' : 'space-between', rowGap: 20, columnGap: currentCategory.subcategory ? 20 : 0, flexWrap: 'wrap' }}>
      {categories.map((op, idx) => (
        !op?.inside && <CardMenu key={idx} id={idx} setSelected={setSelected} {...op} />
      ))}
    </Flex>
  )
}

export default ImageMenu
