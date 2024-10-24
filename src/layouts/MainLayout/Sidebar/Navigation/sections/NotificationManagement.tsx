import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useNotificationManagement = () => {
  const notificationManagement: MenuSection = useMemo(() => {
    return {
      title: 'Tiến trình gửi SMS, email, notify',
      items: [
        {
          title: 'Tiến trình gửi SMS, email, notify',
          path: '/thong-bao',
          icon: <QuestionAnswerOutlinedIcon />,
          children: [
            {
              title: 'Quản lý tiến trình gửi sms',
              path: EndPoints.notificationManagement.sms,
              page: PAGES.NOTIFICATION
            },
            {
              title: 'Quản lý tiến trình gửi email',
              path: EndPoints.notificationManagement.email,
              page: PAGES.NOTIFICATION
            },
            {
              title: 'Quản lý tiến trình gửi notify',
              path: EndPoints.notificationManagement.notify,
              page: PAGES.NOTIFICATION
            }
          ]
        }
      ]
    }
  }, [])

  return { notificationManagement }
}

export default useNotificationManagement
