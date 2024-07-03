import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { IconSquareRoundedXFilled } from '@tabler/icons-react'
import { Button, Flex, Layout, Typography, theme } from 'antd'

import { useGetCategories } from '../hooks/useGetCategories'
import HeaderContainer from './components/HeaderContainer'

const { Content, Footer } = Layout
const { useToken } = theme
const { Text, Title } = Typography

const MainLayout = () => {
  const { token } = useToken()
  const navigate = useNavigate()
  const [currentCategory, setCurrentCat] = useState()
  const [show, setShow] = useState(false)

  const { categories, categoriesInside } = useGetCategories()

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
      <Content style={{ maxWidth: '100vw' }}>
        {/* SE ESTA TRABAJANDO LA MODAL */}
        {show && (
          <Flex
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: token.colorPaper,
              maxHeight: '100vh'
            }}
            vertical
          >
            <Title level={2} style={{ marginBlock: '2.5%', paddingInline: '7%' }}>Choose a specific category!</Title>
            <Button type='text' icon={<IconSquareRoundedXFilled />} style={{ position: 'absolute', top: '6.5%', right: '5%' }} onClick={() => setShow(false)} />
            <Flex
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                justifyItems: 'center',
                rowGap: 10
              }}
              vertical
            >
              {categories && categories.map((op) => (
                <Text
                  key={op.slug} style={{ paddingBlock: 5, paddingInline: 100, background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,1) 50%, transparent 100%)', backdropFilter: 'blur(10px)', width: 'fit-content', cursor: 'pointer' }} onClick={() => {
                    setCurrentCat(op.slug)
                  }}
                >
                  {op.label}
                </Text>
              ))}
            </Flex>
          </Flex>
        )}
        <Outlet context={[categoriesInside, show]} />
      </Content>
      <Footer style={{ backgroundColor: 'transparent' }}>
        footer
      </Footer>
    </Layout>
  )
}

export default MainLayout
