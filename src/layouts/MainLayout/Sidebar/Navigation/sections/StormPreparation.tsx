import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import { useMemo } from 'react'

import { PAGES } from '@src/constants/pages'
import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useStormPreparation = () => {
  const stormPreparationManagement: MenuSection = useMemo(() => {
    return {
      title: 'Chuẩn bị trước khi bão',
      items: [
        {
          title: 'Chuẩn bị trước khi bão',
          path: '/chuan-bi-truoc-khi-bao',
          icon: <FormatListBulletedOutlinedIcon />,
          children: [
            {
              title: 'Danh sách chuẩn bị trước bão',
              path: EndPoints.preparingStormManagement.before,
              page: PAGES.STORM_PREPARATION
            },
            {
              title: 'Danh sách công việc cần chuẩn bị',
              path: EndPoints.preparingStormManagement.works,
              page: PAGES.STORM_PREPARATION
            }
          ]
        }
      ]
    }
  }, [])

  return { stormPreparationManagement }
}

export default useStormPreparation
