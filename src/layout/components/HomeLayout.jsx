import { useOutletContext, useParams } from 'react-router-dom'

import { Flex } from 'antd'

import Banner from '../../ui-components/Banner'
import ImageMenu from '../../ui-components/ImageMenu'

const HomeLayout = ({ children }) => {
  const [context] = useOutletContext()

  const { categoriesInside, handleCurrentCat, currentCategory } = context
  const { category } = useParams()

  return (
    <Flex vertical>
      <Banner category={category?.replace('-', ' ')} />
      <ImageMenu categories={categoriesInside} setSelected={handleCurrentCat} currentCategory={currentCategory} />
      {children}
    </Flex>
  )
}

export default HomeLayout
