import { lazy } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

import { EndPoints } from '@src/constants/paths'
import RouteError from '@src/components/core/RouteError'
import Loadable from '@src/components/core/Loadable'

const OverallReportPage = Loadable(lazy(() => import('@src/pages/Influence/OverallReport')))
const DigitalMapPage = Loadable(lazy(() => import('@src/pages/Influence/DigitalMap')))

const influenceRoutes: RouteObject = {
  path: 'anh-huong-bao',
  element: <Outlet />,
  errorElement: <RouteError />,
  children: [
    {
      index: true,
      element: <></>
    },
    {
      path: EndPoints.influence.overallReport,
      element: <OverallReportPage />
    },
    {
      path: EndPoints.influence.digitalMap,
      element: <DigitalMapPage />
    }
  ]
}

export default influenceRoutes
