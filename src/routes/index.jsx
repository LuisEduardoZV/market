import { useRoutes } from 'react-router-dom'

import MainLayout from '../layout/MainLayout'

export default function Routes () {
  const Routes = {
    path: '/',
    element: (
      <MainLayout />
    ),
    children: [{
      path: '',
      element: <section><h1>Inicio</h1></section>
    }
    ]
  }
  return useRoutes([Routes])
}
