import { lazy } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

import { EndPoints } from '@src/constants/paths'
import RouteError from '@src/components/core/RouteError'
import Loadable from '@src/components/core/Loadable'

const PrepareBeforeStormManagementPage = Loadable(lazy(() => import('@src/pages/PreparingStormManagement/BeforeStorm')))
const PrepareWorksManagementPage = Loadable(lazy(() => import('@src/pages/PreparingStormManagement/PreparingWorks')))

const preparingStormManagementRoutes: RouteObject = {
  path: 'chuan-bi-truoc-khi-bao',
  element: <Outlet />,
  errorElement: <RouteError />,
  children: [
    {
      index: true,
      element: <PrepareBeforeStormManagementPage />
    },
    {
      path: EndPoints.preparingStormManagement.before,
      element: <PrepareBeforeStormManagementPage />
    },
    {
      path: EndPoints.preparingStormManagement.works,
      element: <PrepareWorksManagementPage />
    }
  ]
}

export default preparingStormManagementRoutes
