import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Layout, theme } from 'antd'

import { useGetCategories } from '../hooks/useGetCategories'
import FooterCustom from './components/FooterCustom'
import HeaderContainer from './components/HeaderContainer'
import MenuModal from './components/MenuModal'

const { Content } = Layout
const { useToken } = theme

const MainLayout = () => {
  const { token } = useToken()
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
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (currentCategory) {
      navigate(`/${currentCategory.id}`, { state: { title: currentCategory.title, subcategory: currentSubCategory } })
      setShow(false)
    }
  }, [currentCategory])

  return (
    <Layout style={{
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: token.colorPaper
    }}
    >
      <HeaderContainer openMenu={() => { setShow(true) }} handleToHome={handleToHome} />
      <Content style={{ maxWidth: '100vw', marginTop: 40 }}>
        <MenuModal
          categories={categories}
          open={show}
          close={() => { setShow(false) }}
          setSelected={handleCurrentCat}
        />
        <Outlet context={[{ currentCategory: { ...currentCategory, subcategory: currentSubCategory }, categoriesInside, show, handleCurrentCat }]} />
      </Content>
      <FooterCustom />
    </Layout>
  )
}

export default MainLayout
