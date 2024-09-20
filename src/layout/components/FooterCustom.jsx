import { Link } from 'react-router-dom'

// ant
import { IconAddressBook, IconBrandGithub, IconBrandLinkedin, IconPackage, IconPhoto, IconSunFilled } from '@tabler/icons-react'
import { Avatar, Col, Divider, Flex, Layout, Row, Space, Typography, theme } from 'antd'

// project
import { NAME_APP } from '../../config'

const { Text, Title } = Typography
const { Footer } = Layout
const { useToken } = theme

const FooterCustom = () => {
  const { token } = useToken()

  return (
    <Footer style={{ marginTop: 30, backgroundColor: token.colorBgBase, paddingBlock: '2%' }}>
      <Row
        align='start'
      >
        <Col xs={24} sm={11} lg={7} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Text style={{ alignItems: 'center', display: 'flex', gap: 5, fontWeight: 500 }}><strong color={token.colorPrimaryText} style={{ fontSize: '1.4rem' }}>©</strong> {NAME_APP} | Online shopping simulation. 2024.</Text>
        </Col>
        <Col xs={24} sm={11} lg={5}>
          <Flex vertical justify='start' align='start' style={{ gap: 10 }}>
            <Flex vertical>
              <Title style={{ margin: 0, color: token.colorPrimaryText }} level={5}>API's used:
              </Title>
              <Divider style={{ margin: 0, backgroundColor: token.colorPrimary, width: '100%', paddingInline: 65 }} />
            </Flex>
            <Space direction='vertical' style={{ alignItems: 'start' }}>
              <Link to='https://dummyjson.com' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <IconPackage stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>DummyJson (products)</Text>
              </Link>
              <Link to='https://www.pexels.com/es-es/' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10, color: token.colorPrimaryTextActive }}>
                <IconPhoto stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Pexels (images)</Text>
              </Link>
            </Space>
          </Flex>
        </Col>
        <Col xs={24} sm={11} lg={5}>
          <Flex vertical justify='start' align='start' style={{ gap: 10 }}>
            <Flex vertical>
              <Title style={{ margin: 0, color: token.colorPrimaryText }} level={5}>Enlaces externos:
              </Title>
              <Divider style={{ margin: 0, backgroundColor: token.colorPrimary, width: '100%', paddingInline: 70 }} />
            </Flex>
            <Space direction='vertical' style={{ alignItems: 'start' }}>
              <Link to='https://github.com/LuisEduardoZV/portafolio' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <IconAddressBook stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Portafolio</Text>
              </Link>
              <Link to='https://luiseduardozv.github.io/weather/' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <IconSunFilled stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Weather App</Text>
              </Link>
            </Space>
          </Flex>
        </Col>
        <Col xs={24} sm={11} lg={5}>
          <Flex vertical justify='start' align='start' style={{ gap: 10 }}>
            <Space direction='vertical' style={{ alignItems: 'start', justifyContent: 'start', textAlign: 'left' }}>
              <Text>Diseño y desarrollo por <i style={{ color: token.colorPrimary }}>Luis Eduardo Zúñiga Vera</i>.</Text>
              <Flex style={{ gap: 15, zIndex: 10 }}>
                <Link to='https://github.com/LuisEduardoZV' target='_blank'>
                  <Avatar style={{ backgroundColor: token.colorPrimaryBg, color: token.colorPrimaryActive }} icon={<IconBrandGithub />} />
                </Link>
                <Link to='https://github.com/LuisEduardoZV' target='_blank'>
                  <Avatar style={{ backgroundColor: token.colorPrimaryBg, color: token.colorPrimaryActive }} icon={<IconBrandLinkedin />} />
                </Link>
              </Flex>
            </Space>
          </Flex>
        </Col>
      </Row>
    </Footer>
  )
}

export default FooterCustom
