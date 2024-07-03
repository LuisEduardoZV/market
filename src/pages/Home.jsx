import { useQuery } from 'react-query'

import { Flex, Space, Typography } from 'antd'

const { Text, Title } = Typography

const Home = () => {
  async function getTopProducts () {
    return await fetch('https://dummyjson.com/products/?select=title,price,rating,thumbnail&limit=15&sortBy=rating&order=desc')
      .then((res) => {
        if (!res.ok) throw new Error('Error')
        return res.json()
      })
      .then((data) => data.products)
  }

  const { data } = useQuery('topProducts', getTopProducts, { refetchOnWindowFocus: false })

  async function getDisscountProducts () {
    return await fetch('https://dummyjson.com/products/?select=title,price,discountPercentage,thumbnail&limit=15&sortBy=price&order=asc')
      .then((res) => {
        if (!res.ok) throw new Error('Error')
        return res.json()
      })
      .then((data) => data.products)
  }

  const { data: diss } = useQuery('disscountProducts', getDisscountProducts, { refetchOnWindowFocus: false })

  return (
    <Flex vertical>
      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>People's favourite products!</Title>
        <Space style={{ overflowX: 'auto', gap: 10 }}>
          {data && data?.map(({ thumbnail, id, rating, title, price }) => (
            <Flex
              key={id} vertical style={{
                backgroundColor: 'white'
              }}
            >
              <Space>
                <Title level={5} style={{ fontWeight: 500, fontStyle: 'italic' }}>{title}</Title>
                <Text strong italic>{rating}</Text>
              </Space>
              <img src={thumbnail} />
              <Text strong italic>
                ${price}
              </Text>
            </Flex>
          ))}
        </Space>
      </Flex>

      <Flex style={{ width: '100%', overflow: 'hidden' }} vertical>
        <Title level={3} style={{ marginBlock: '3%', paddingLeft: '2%' }}>Deeply discounted products!!</Title>
        <Space style={{ overflowX: 'auto', gap: 10 }}>
          {diss && diss?.map(({ thumbnail, id, discountPercentage, title, price }) => (
            <Flex
              key={id} vertical style={{
                backgroundColor: 'white'
              }}
            >
              <Title level={5} style={{ fontWeight: 500, fontStyle: 'italic' }}>{title}</Title>
              <img src={thumbnail} />
              <Space>
                <Text delete type='danger' strong>${discountPercentage}</Text>
                <Text strong italic>
                  ${price}
                </Text>
              </Space>
            </Flex>
          ))}
        </Space>
      </Flex>
    </Flex>
  )
}

export default Home
