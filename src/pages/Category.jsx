import { useLocation, useOutletContext, useParams } from 'react-router-dom'

import { Button, Flex, Typography, theme } from 'antd'

import BasicCardProduct from '../ui-components/extended/BasicCardProduct'
import NoInfoOverlay from '../ui-components/NoInfoOverlay'
import SideMenuCategory from '../ui-components/SideMenuCategory'
import PromoBanner from './components/PromoBanner'

import { useCategoryDataMng } from '../hooks/useCategoryDataMng'

const { Title } = Typography
const { useToken } = theme

const Category = () => {
  const { token } = useToken()
  const { state } = useLocation()
  const { category } = useParams()
  const [context] = useOutletContext()
  const { categoriesInside } = context

  const { extraInfo, filters, handleFilters, isLoading, maxPage, page, loadingPaginated, paginated, nextPage } = useCategoryDataMng(categoriesInside, category, state?.subcategory)

  const renderCards = () => {
    let info = []
    if (paginated) info = paginated.map((op) => (<BasicCardProduct key={op.id} {...op} />))

    for (let i = 5; i < info.length; i += 7) info.splice(i + 1, 0, <div key={'banner' + i} style={{ gridColumn: 'span 3' }}><PromoBanner inCategory /></div>)

    if (info.length === 0) info.push(<NoInfoOverlay key='noInfo' />)

    return info
  }

  return (
    <Flex vertical style={{ width: '100%', position: 'relative', paddingLeft: '4%', minHeight: '100vh' }}>
      <Title style={{ marginBlock: 50, position: 'sticky', top: '8%', width: '100%', zIndex: 1, backgroundColor: token.colorWhite, paddingBottom: 10 }}>{state.title ?? category}</Title>
      <Flex style={{ justifyContent: 'space-around', width: '100%' }}>
        {extraInfo && <SideMenuCategory categoriesInside={categoriesInside} filters={filters} brands={extraInfo?.brands} prices={extraInfo?.prices} handleFilters={handleFilters} />}
        {isLoading
          ? (
            <Flex style={{ width: '82%', gap: 30, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignSelf: 'end', position: 'sticky', top: '8%', marginTop: '0', paddingRight: '5%' }}>
              <BasicCardProduct id={1} typeCarousel='loading' isLoading />
              <BasicCardProduct id={2} typeCarousel='loading' isLoading />
              <BasicCardProduct id={3} typeCarousel='loading' isLoading />
              <BasicCardProduct id={4} typeCarousel='loading' isLoading />
              <BasicCardProduct id={5} typeCarousel='loading' isLoading />
              <BasicCardProduct id={6} typeCarousel='loading' isLoading />
            </Flex>
            )
          : (
            <Flex style={{ width: '80%', gap: 30, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignSelf: 'end', top: 0, justifySelf: 'end' }}>
              {renderCards()}
              <Flex style={{ gridColumn: 'span 3', justifyContent: 'center' }}>
                {page < maxPage && (
                  <Button onClick={nextPage} loading={loadingPaginated} type='primary' style={{ borderRadius: 5 }} className='shadow-menu-subcategory'>Cargar más...</Button>
                )}
              </Flex>
            </Flex>
            )}
      </Flex>
    </Flex>
  )
}

export default Category
