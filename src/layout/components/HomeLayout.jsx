import { useOutletContext, useParams } from 'react-router-dom'

import { Flex } from 'antd'

import Banner from '../../ui-components/Banner'
import ImageMenu from '../../ui-components/ImageMenu'

const HomeLayout = ({ children }) => {
  const [categoriesInside, , setCurrentCat] = useOutletContext()
  const { category } = useParams()

  return (
    <Flex vertical>
      <Banner category={category?.replace('-', ' ')} />
      <ImageMenu categories={categoriesInside} setSelected={setCurrentCat} />
      {children}
    </Flex>
  )
}

export default HomeLayout
