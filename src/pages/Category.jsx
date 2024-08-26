import { useQuery } from 'react-query'
import { useOutletContext, useParams } from 'react-router-dom'

import { Flex, Typography } from 'antd'

import { getProductsByCategories } from '../services/productsFun'
import BasicCardProduct from '../ui-components/extended/BasicCardProduct'
import PromoBanner from './components/PromoBanner'

const { Title } = Typography

const Category = () => {
  const { category } = useParams()
  const [categoriesInside] = useOutletContext()

  const { data } = useQuery(category, () => getProductsByCategories(categoriesInside), { refetchOnWindowFocus: false })

  return (
    <Flex vertical>
      <Title>{category}</Title>
      <Flex style={{ width: '100%', gap: 30, marginTop: 100, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingInline: '10%' }}>
        {data && data.map((op, idx) => (idx % 7 ? <BasicCardProduct key={op.id} {...op} /> : <div key={idx} style={{ gridColumn: 'span 3' }}><PromoBanner inCategory /></div>))}
      </Flex>
    </Flex>
  )
}

export default Category
