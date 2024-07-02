import { Outlet } from 'react-router-dom'

import { Layout, theme } from 'antd'

import HeaderContainer from './components/HeaderContainer'

const { Content, Footer } = Layout
const { useToken } = theme

const MainLayout = () => {
  const { token } = useToken()

  return (
    <Layout style={{
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: token.colorPaper
    }}
    >
      <HeaderContainer />
      <Content style={{ maxWidth: '100vw', overflow: 'hidden' }}>
        <Outlet />
      </Content>
      <Footer style={{ backgroundColor: 'transparent' }}>
        footer
      </Footer>
    </Layout>
  )
}

export default MainLayout
