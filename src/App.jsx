import './assets/scss/styles.scss'

import { NotifyProvider } from './context/NotifyContext'
import NavigationScroll from './layout/NavigationScroll'
import Routes from './routes'
import CustomTheme from './theme'

import { PexelsProvider } from './context/PexelsContext'

function App () {
  return (
    <CustomTheme>
      <NotifyProvider>
        <NavigationScroll>
          <PexelsProvider>
            <Routes />
          </PexelsProvider>
        </NavigationScroll>
      </NotifyProvider>
    </CustomTheme>
  )
}

export default App
