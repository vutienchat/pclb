import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import RouteError from '@src/components/core/RouteError'
import MainLayout from '@src/layouts/MainLayout'
import PrivateRoute from '@src/components/core/PrivateRoute'
import { EndPoints } from '@src/constants/paths'
import userManagementRoutes from './userManagement'
import weatherRoutes from './weather'
import Loadable from '@src/components/core/Loadable'
import preparingStormManagementRoutes from './preparingStormManagement'
import influenceRoutes from './influence'
import standardDataRoutes from './standardData'

const WeatherInformationPage = Loadable(lazy(() => import('@src/pages/StormManagement/WeatherInformation')))
const AccountPage = Loadable(lazy(() => import('@src/pages/Account')))
const StormInformationPage = Loadable(lazy(() => import('@src/pages/StormManagement/StormInformation')))

const mainRoutes: RouteObject = {
  path: EndPoints.home,
  element: (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  ),
  errorElement: <RouteError />,
  children: [
    {
      errorElement: <RouteError />,
      children: [
        {
          index: true,
          element: <WeatherInformationPage />
        },
        {
          path: EndPoints.account,
          element: <AccountPage />
        },
        {
          path: EndPoints.listStorm,
          element: <StormInformationPage />
        },
        {
          path: EndPoints.chat,
          element: <></>
        },
        userManagementRoutes,
        weatherRoutes,
        influenceRoutes,
        preparingStormManagementRoutes,
        standardDataRoutes
      ]
    }
  ]
}

export default mainRoutes
