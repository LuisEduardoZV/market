import { useParams } from 'react-router-dom'

import { Flex } from 'antd'

const Category = () => {
  const { category } = useParams()
  return (
    <Flex>
      {category}
    </Flex>
  )
}

export default Category
