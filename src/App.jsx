import './assets/scss/styles.scss'

import { NotifyProvider } from './context/NotifyContext'
import NavigationScroll from './layout/NavigationScroll'
import Routes from './routes'
import CustomTheme from './theme'

function App () {
  return (
    <CustomTheme>
      <NotifyProvider>
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </NotifyProvider>
    </CustomTheme>
  )
}

export default App
