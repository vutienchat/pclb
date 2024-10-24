import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useSettings = () => {
  const settings: MenuSection = useMemo(() => {
    return {
      title: 'Log, Tần suất sử dụng',
      items: [
        {
          title: 'Log, Tần suất sử dụng',
          path: '/cai-dat',
          icon: <AssignmentOutlinedIcon />,
          children: [
            {
              title: 'Quản lý log SMS',
              path: EndPoints.settings.logSms,
              page: PAGES.SETTINGS
            },
            {
              title: 'Quản lý log Email',
              path: EndPoints.settings.logEmail,
              page: PAGES.SETTINGS
            },
            {
              title: 'Quản lý log Notify',
              path: EndPoints.settings.logNotify,
              page: PAGES.SETTINGS
            },
            {
              title: 'Quản lý log cập nhật thông tin',
              path: EndPoints.settings.logSms,
              page: PAGES.SETTINGS
            },
            {
              title: 'Tần suất sử dụng',
              path: EndPoints.settings.frequency,
              page: PAGES.SETTINGS
            }
          ]
        }
      ]
    }
  }, [])

  return { settings }
}

export default useSettings
