import { Link } from 'react-router-dom'

// ant
import { IconAntenna, IconBook, IconBrandGithub, IconBrandLinkedin, IconBrightness2, IconDeviceLaptop, IconHaze, IconServer, IconSunWind } from '@tabler/icons-react'
import { Avatar, Col, Divider, Flex, Layout, Row, Space, Typography, theme } from 'antd'

// project
import { NAME_APP } from '../../config'

const { Text, Title } = Typography
const { Footer } = Layout
const { useToken } = theme

const FooterCustom = () => {
  const { token } = useToken()

  return (
    <Footer style={{ marginTop: 50, backgroundColor: token.colorBgBase }}>
      <Row
        align='start'
      >
        <Col xs={24} sm={11} lg={7} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
          <Text style={{ alignItems: 'center', display: 'flex', gap: 5, fontWeight: 500 }}><strong color={token.colorPrimaryText} style={{ fontSize: '1.4rem' }}>©</strong> {NAME_APP} | Todos los derechos reservados. 2024.</Text>
        </Col>
        <Col xs={24} sm={11} lg={5}>
          <Flex vertical justify='start' align='start' style={{ gap: 10 }}>
            <Flex vertical>
              <Title style={{ margin: 0, color: token.colorPrimaryText }} level={5}>APIs utilizadas:
              </Title>
              <Divider style={{ margin: 0, backgroundColor: token.colorPrimary, width: '100%', paddingInline: 65 }} />
            </Flex>
            <Space direction='vertical' style={{ alignItems: 'start' }}>
              <Link to='https://openweathermap.org/current' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <IconBrightness2 stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Clima Actual</Text>
              </Link>
              <Link to='https://openweathermap.org/forecast5' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10, color: token.colorPrimaryTextActive }}>
                <IconHaze stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Pronóstico del Clima</Text>
              </Link>
              <Link to='https://openweathermap.org/api/air-pollution' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10, color: token.colorPrimaryTextActive }}>
                <IconSunWind stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Contaminación Atmosférica Actual y Prevista</Text>
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
                <IconDeviceLaptop stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Portafolio</Text>
              </Link>
              <Link to='https://luiseduardozv.github.io/antennaApp/' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <IconAntenna stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Antenna App</Text>
              </Link>
              <Link to='https://github.com/LuisEduardoZV/server-antennaApp' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <IconServer stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Antenna App Server</Text>
              </Link>
              <Link to='https://github.com/LuisEduardoZV/marvel-project' target='_blank' style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <IconBook stroke={1} color={token.colorPrimaryTextActive} size={20} />
                <Text style={{ fontWeight: 500, fontStyle: 'italic' }}>Marvel's Project</Text>
              </Link>
            </Space>
          </Flex>
        </Col>
        <Col xs={24} sm={11} lg={5}>
          <Flex vertical justify='start' align='start' style={{ gap: 10 }}>
            <Flex vertical>
              <Title style={{ margin: 0, color: token.colorPrimaryText }} level={5}>Créditos
              </Title>
              <Divider style={{ margin: 0, backgroundColor: token.colorPrimary, width: '100%', paddingInline: 40 }} />
            </Flex>
            <Space direction='vertical' style={{ alignItems: 'start', justifyContent: 'start', textAlign: 'left' }}>
              <Text>Datos del clima proporcionados por <Link to='https://openweathermap.org/' target='_blank' style={{ color: token.colorPrimaryTextActive, fontWeight: 600 }}>OpenWeather</Link>.</Text>
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
