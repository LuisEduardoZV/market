import { useState } from 'react'
import { useLocation, useOutletContext, useParams } from 'react-router-dom'

import { Button, Flex, Typography } from 'antd'

import BasicCardProduct from '../ui-components/extended/BasicCardProduct'
import MovileMenuCategory from '../ui-components/MovileMenuCategory'
import NoInfoOverlay from '../ui-components/NoInfoOverlay'
import SideMenuCategory from '../ui-components/SideMenuCategory'
import PromoBanner from './components/PromoBanner'

import { useCategoryDataMng } from '../hooks/useCategoryDataMng'

const { Title } = Typography
const PROMO_QUERYS = ['tennis', 'golf', 'fashion', 'shoes', 'style', 'relax']

const Category = () => {
  const { state } = useLocation()
  const { category } = useParams()
  const [context] = useOutletContext()
  const { categoriesInside } = context

  const { extraInfo, filters, handleFilters, isLoading, maxPage, page, loadingPaginated, paginated, nextPage } = useCategoryDataMng(categoriesInside, category, state?.subcategory)

  const [banners, setBanners] = useState([])

  const renderCards = () => {
    let info = []
    if (paginated) info = paginated.map((op) => (<BasicCardProduct key={op.id} {...op} />))

    for (let i = 5; i < info.length; i += 7) {
      if (!banners[i]) {
        const newBanner = <div key={'banner' + i} className='banner-container-category'><PromoBanner inCategory promoBanner={PROMO_QUERYS[Math.floor(Math.random() * PROMO_QUERYS.length)]} /></div>
        setBanners(prev => [...prev, newBanner])
      }
      info.splice(i + 1, 0, banners[i])
    }

    if (info.length === 0) info.push(<NoInfoOverlay key='noInfo' />)

    return info
  }

  return (
    <Flex vertical className='main-category'>
      <Title level={1}>{state.title ?? category}</Title>
      <Flex>
        {extraInfo && <SideMenuCategory categoriesInside={categoriesInside} filters={filters} brands={extraInfo?.brands} prices={extraInfo?.prices} handleFilters={handleFilters} />}
        {extraInfo && <MovileMenuCategory categoriesInside={categoriesInside} filters={filters} brands={extraInfo?.brands} handleFilters={handleFilters} />}
        {isLoading
          ? (
            <Flex className='list-products-skeleton-container'>
              <BasicCardProduct id={1} typeCarousel='loading' isLoading />
              <BasicCardProduct id={2} typeCarousel='loading' isLoading />
              <BasicCardProduct id={3} typeCarousel='loading' isLoading />
              <BasicCardProduct id={4} typeCarousel='loading' isLoading />
              <BasicCardProduct id={5} typeCarousel='loading' isLoading />
              <BasicCardProduct id={6} typeCarousel='loading' isLoading />
            </Flex>
            )
          : (
            <Flex className='list-products-container'>
              {renderCards()}
              <Flex className='load-more-container'>
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
