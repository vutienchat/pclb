import { useMemo } from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'

import { PAGES } from '@src/constants/pages'
import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useNotification = () => {
  const notification: MenuSection = useMemo(() => {
    return {
      title: 'Thông báo',
      items: [
        {
          title: 'Thông báo',
          path: EndPoints.notification,
          icon: <NotificationsNoneOutlinedIcon />,
          page: PAGES.NOTIFICATION
        }
      ]
    }
  }, [])

  return { notification }
}

export default useNotification
