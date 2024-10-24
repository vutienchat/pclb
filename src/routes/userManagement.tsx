import { lazy } from 'react'
import { Outlet, RouteObject } from 'react-router-dom'

import { EndPoints } from '@src/constants/paths'
import RouteError from '@src/components/core/RouteError'
import Loadable from '@src/components/core/Loadable'

const Users = Loadable(lazy(() => import('@src/pages/UserManagement/Users')))
const PermissionsPage = Loadable(lazy(() => import('@src/pages/UserManagement/Permissions')))
const GroupUserPage = Loadable(lazy(() => import('@src/pages/UserManagement/GroupUser')))

const userManagementRoutes: RouteObject = {
  path: 'nguoi-dung',
  element: <Outlet />,
  errorElement: <RouteError />,
  children: [
    {
      index: true,
      element: <Users />
    },
    {
      path: EndPoints.user.users,
      element: <Users />
    },
    {
      path: EndPoints.user.role,
      element: <PermissionsPage />
    },
    {
      path: EndPoints.user.groupUser,
      element: <GroupUserPage />
    }
  ]
}

export default userManagementRoutes
