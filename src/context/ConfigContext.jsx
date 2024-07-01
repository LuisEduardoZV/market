import PropTypes from 'prop-types'
import { createContext } from 'react'

// project imports
import config from '../config'
import useSessionStorage from '../hooks/useSessionStorage'

const initialState = {
  ...config,
  onChangeTheme: () => {}
}

const ConfigContext = createContext(initialState)

function ConfigProvider ({ children }) {
  const [config, setConfig] = useSessionStorage('weather-config', {
    theme: initialState.theme
  })

  const onChangeTheme = (theme) => {
    setConfig({
      ...config,
      theme
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        ...config, onChangeTheme
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

ConfigProvider.propTypes = {
  children: PropTypes.node
}

export { ConfigContext, ConfigProvider }
