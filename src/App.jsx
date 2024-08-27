import './assets/scss/styles.scss'

import NavigationScroll from './layout/NavigationScroll'
import Routes from './routes'
import CustomTheme from './theme'

import { PexelsProvider } from './context/PexelsContext'

function App () {
  return (
    <CustomTheme>
      <NavigationScroll>
        <PexelsProvider>
          <Routes />
        </PexelsProvider>
      </NavigationScroll>
    </CustomTheme>
  )
}

export default App
