import PropTypes from 'prop-types'

// ant
import { ConfigProvider, theme } from 'antd'

// project
import { defaultPalette } from './palette'

export default function CustomTheme ({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: defaultPalette
      }}
    >
      {children}
    </ConfigProvider>
  )
}

CustomTheme.propTypes = {
  children: PropTypes.node
}
