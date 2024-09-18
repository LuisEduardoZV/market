import { Divider, Flex, Typography } from 'antd'
import { Fragment } from 'react'

const ListSearchResult = ({ data, onClick }) => {
  if (!data) return <div>Loading...</div>

  let newData = []
  if (data.total > 3) newData = data.products.slice(0, 3)
  else newData = data.products

  const renderProducts = newData.map((op) => (
    <Fragment key={op.id}>
      <Flex
        className='hoverProductSearching' style={{ paddingBlock: 10, paddingRight: 10, transition: 'background-color 0.3s ease-in-out' }} onClick={onClick}
      >
        <img src={op.thumbnail} alt='Product image' style={{ width: 80, height: 80, objectFit: 'cover' }} />
        <Flex vertical>
          <Typography.Text id='titleProductSearch' style={{ fontWeight: 'bold' }}>{op.title}</Typography.Text>
          <Typography.Text type='secondary' italic style={{ fontSize: '0.8rem' }}>SKU: {op.sku}</Typography.Text>
          <Typography.Text>${op.price}</Typography.Text>
        </Flex>
      </Flex>
      <Divider style={{ margin: 0 }} />
    </Fragment>
  ))

  return (
    <Flex vertical>
      {renderProducts.length > 0
        ? renderProducts.map((op) => op)
        : (
          <Flex>Sin resultados...</Flex>
          )}
      {renderProducts.length > 0 && <Typography.Link style={{ paddingTop: 10 }}>Ver todos los productos</Typography.Link>}
    </Flex>
  )
}

export default ListSearchResult
