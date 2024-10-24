import { lazy } from 'react'

import type { RouteObject } from 'react-router-dom'

import AuthLayout from '@src/layouts/AuthLayout'
import PublicRoute from '@src/components/core/PublicRoute'
import Loadable from '@src/components/core/Loadable'

const LoginPage = Loadable(lazy(() => import('@src/pages/Login')))

const authRoutes: RouteObject = {
  path: '/dang-nhap',
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      )
    }
  ]
}

export default authRoutes
