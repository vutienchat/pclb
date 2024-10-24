import { lazy } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

import { EndPoints } from '@src/constants/paths'
import RouteError from '@src/components/core/RouteError'
import Loadable from '@src/components/core/Loadable'

const WeatherInformationPage = Loadable(lazy(() => import('@src/pages/StormManagement/WeatherInformation')))
const DetailWeatherNewPage = Loadable(lazy(() => import('@src/pages/StormManagement/DetailWeatherNew')))
const DigitalMapPage = Loadable(lazy(() => import('@src/pages/Influence/DigitalMap')))

const weatherRoutes: RouteObject = {
  path: 'thong-tin-thoi-tiet',
  element: <Outlet />,
  errorElement: <RouteError />,
  children: [
    {
      index: true,
      element: <WeatherInformationPage />
    },
    {
      path: EndPoints.weather.weather,
      element: <WeatherInformationPage />
    },
    {
      path: `${EndPoints.weather.weather}/:postId`,
      element: <DetailWeatherNewPage />
    },
    {
      path: EndPoints.weather.digitalMap,
      element: <DigitalMapPage />
    }
  ]
}

export default weatherRoutes
