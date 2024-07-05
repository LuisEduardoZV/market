import { useState } from 'react'
import { useQuery } from 'react-query'
import { getTopProductsByCategory } from '../../services/productsFun'

import { Flex, Radio } from 'antd'

import BigCardProduct from '../../ui-components/extended/BigCardProduct'

const ShoesByGender = () => {
  const [selected, setSelected] = useState('mens-shoes')

  const { data } = useQuery(['topProductsBy', selected], () => getTopProductsByCategory(selected))

  return (
    <Flex vertical style={{ marginTop: 50, paddingInline: '10%' }}>
      <Radio.Group value={selected} buttonStyle='outline' onChange={(e) => { setSelected(e.target.value) }}>
        <Radio.Button value='mens-shoes'>Man Shoes</Radio.Button>
        <Radio.Button value='womens-shoes'>Woman Shoes</Radio.Button>
      </Radio.Group>
      {data && (
        <Flex wrap style={{ marginTop: 30, width: '100%', alignItems: 'start', justifyContent: 'space-around', rowGap: 60 }}>
          {data.map((op) => (
            <BigCardProduct key={op.id} {...op} />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

export default ShoesByGender
