import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Layout } from 'antd'
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint'

import { useGetCategories } from '../hooks/useGetCategories'
import FooterCustom from './components/FooterCustom'
import HeaderContainer from './components/HeaderContainer'
import MenuModal from './components/MenuModal'
import MovilMenuModal from './components/MovilMenuModal'

const { Content } = Layout

const MainLayout = () => {
  const screens = useBreakpoint()
  const navigate = useNavigate()
  const [currentCategory, setCurrentCat] = useState(null)
  const [currentSubCategory, setCurrentSubCat] = useState(null)
  const [show, setShow] = useState(false)

  const { categoriesInside, categories } = useGetCategories(currentCategory?.id)

  const handleCurrentCat = (id, title, subcategory) => {
    setShow(false)
    setCurrentCat({ id, title })
    setCurrentSubCat(subcategory)
  }

  const handleToHome = () => {
    setCurrentCat(null)
    setCurrentSubCat(null)
    navigate('//')
  }

  useEffect(() => {
    if (currentCategory) {
      navigate(`/${currentCategory.id}`, { state: { title: currentCategory.title, subcategory: currentSubCategory } })
      setShow(false)
    }
  }, [currentCategory])

  return (
    <Layout className='main'>
      <HeaderContainer openMenu={() => { setShow(true) }} handleToHome={handleToHome} />
      <Content className='mainContent'>
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {(screens.xs && show) &&
            (
              <MovilMenuModal
                open={show}
                onClose={() => { setShow(false) }}
                categories={categories}
                setSelected={handleCurrentCat}
              />
            )}
          {(!screens.xs && show) &&
            (
              <MenuModal
                categories={categories}
                open={show}
                close={() => { setShow(false) }}
                setSelected={handleCurrentCat}
              />
            )}
        </AnimatePresence>
        <Outlet context={[{ currentCategory: { ...currentCategory, subcategory: currentSubCategory }, categoriesInside, show, handleCurrentCat }]} />
      </Content>
      <FooterCustom />
    </Layout>
  )
}

export default MainLayout
