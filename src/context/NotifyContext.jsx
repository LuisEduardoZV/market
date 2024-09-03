import { notification } from 'antd'
import { createContext } from 'react'

import { IconShoppingCartCopy } from '@tabler/icons-react'

const NotifyContext = createContext({
  openNotification: () => {}
})

function NotifyProvider ({ children }) {
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (noti) => {
    if (noti.type) {
      api[noti.type]({
        message: noti.message,
        description: noti.description
      })
    } else {
      api.open({
        message: noti.message,
        description: noti.description,
        icon: (
          <IconShoppingCartCopy
            color='#0a369d'
          />
        )
      })
    }
  }

  return (
    <NotifyContext.Provider value={{ openNotification }}>
      {children}
      {contextHolder}
    </NotifyContext.Provider>
  )
}

export { NotifyContext, NotifyProvider }
