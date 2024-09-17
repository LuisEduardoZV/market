import { Flex } from 'antd'

import CardMenu from './extended/CardMenu'

const ImageMenu = ({ categories, setSelected, currentCategory }) => {
  if (!categories || currentCategory.subcategory) return null
  return (
    <Flex className='image-menu'>
      {categories.map((op, idx) => (
        !op?.inside && <CardMenu key={idx} id={idx} setSelected={setSelected} {...op} />
      ))}
    </Flex>
  )
}

export default ImageMenu
