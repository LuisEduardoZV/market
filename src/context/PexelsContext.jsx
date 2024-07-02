import PropTypes from 'prop-types'
import { createContext } from 'react'

import { createClient } from 'pexels'

// project imports
import { API_KEY_IMAGES } from '../config'

const PexelsContext = createContext()

function PexelsProvider ({ children }) {
  const client = createClient(API_KEY_IMAGES)

  return (
    <PexelsContext.Provider
      value={{
        client
      }}
    >
      {children}
    </PexelsContext.Provider>
  )
}

PexelsProvider.propTypes = {
  children: PropTypes.node
}

export { PexelsContext, PexelsProvider }
