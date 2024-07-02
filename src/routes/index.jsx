import { useRoutes } from 'react-router-dom'

import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'

export default function Routes () {
  const Routes = {
    path: '/',
    element: (
      <MainLayout />
    ),
    children: [{
      path: '',
      element: <Home />
    }
    ]
  }
  return useRoutes([Routes])
}
