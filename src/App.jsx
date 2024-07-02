import './assets/scss/styles.scss'

import Routes from './routes'
import CustomTheme from './theme'

import { PexelsProvider } from './context/PexelsContext'

function App () {
  return (
    <CustomTheme>
      <PexelsProvider>
        <Routes />
      </PexelsProvider>
    </CustomTheme>
  )
}

export default App
