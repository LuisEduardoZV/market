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
  const [show, setShow] = useState(false)

  const { categoriesInside, categories } = useGetCategories(currentCategory)

  useEffect(() => {
    if (currentCategory) {
      navigate(`/${currentCategory}`)
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
      <HeaderContainer openMenu={() => { setShow(true) }} />
      <Content style={{ maxWidth: '100vw', marginTop: 40 }}>
        <MenuModal
          categories={categories}
          open={show}
          close={() => { setShow(false) }}
          setSelected={setCurrentCat}
        />
        <Outlet context={[categoriesInside, show, setCurrentCat]} />
      </Content>
      <FooterCustom />
    </Layout>
  )
}

export default MainLayout
