import { lazy } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

import { EndPoints } from '@src/constants/paths'
import RouteError from '@src/components/core/RouteError'
import Loadable from '@src/components/core/Loadable'

const InfluenceStationManagementPage = Loadable(
  lazy(() => import('@src/pages/StandardData/InfluenceStationManagement'))
)
const TransmissionEquipmentMapPage = Loadable(lazy(() => import('@src/pages/StandardData/TransmissionEquipmentMap')))

const standardDataRoutes: RouteObject = {
  path: 'chuan-hoa-du-lieu',
  element: <Outlet />,
  errorElement: <RouteError />,
  children: [
    {
      index: true,
      element: <InfluenceStationManagementPage />
    },
    {
      path: EndPoints.standardData.influenceStationManagement,
      element: <InfluenceStationManagementPage />
    },
    {
      path: EndPoints.standardData.transmissionEquipmentManagement,
      element: <TransmissionEquipmentMapPage />
    }
  ]
}

export default standardDataRoutes
