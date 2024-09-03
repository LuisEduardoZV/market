import PropTypes from 'prop-types'

// ant
import { ConfigProvider, theme } from 'antd'

// project
import useConfig from '../hooks/useConfig'
import { defaultPalette } from './palette'

export default function CustomTheme ({ children }) {
  const { theme: userTheme } = useConfig()

  return (
    <ConfigProvider
      theme={{
        algorithm: userTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        token: defaultPalette,
        components: {
          Typography: {
            fontFamily: '"SUSE", sans-serif'
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}

CustomTheme.propTypes = {
  children: PropTypes.node
}
