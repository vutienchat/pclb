import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useUserManagement = () => {
  const users: MenuSection = useMemo(() => {
    return {
      title: 'Người dùng, phân quyền truy cập',
      items: [
        {
          title: 'Người dùng, phân quyền truy cập',
          path: '/nguoi-dung',
          icon: <ManageAccountsOutlinedIcon />,
          children: [
            {
              title: 'Quản lý người dùng',
              path: EndPoints.user.users,
              page: PAGES.USER
            },
            {
              title: 'Quản lý nhóm người dùng',
              path: EndPoints.user.groupUser
            },
            {
              title: 'Quản lý vai trò',
              path: EndPoints.user.role,
              page: PAGES.USER
            }
          ]
        }
      ]
    }
  }, [])

  return { users }
}

export default useUserManagement
