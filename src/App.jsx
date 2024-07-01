import './assets/scss/styles.scss'

import Routes from './routes'
import CustomTheme from './theme'

function App () {
  return (
    <CustomTheme>
      <Routes />
    </CustomTheme>
  )
}

export default App
