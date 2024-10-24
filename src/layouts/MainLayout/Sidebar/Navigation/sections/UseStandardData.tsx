import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const UseStandardData = () => {
  const standardData: MenuSection = useMemo(() => {
    return {
      title: 'Chuẩn hóa dữ liệu',
      items: [
        {
          title: 'Chuẩn hóa dữ liệu',
          path: '/chuan-hoa-du-lieu',
          icon: <StickyNote2OutlinedIcon />,
          children: [
            {
              title: 'Quản lý, chuẩn hóa danh sách trạm ảnh hưởng',
              path: EndPoints.standardData.influenceStationManagement,
              page: PAGES.STANDARD_DATA
            },
            {
              title: 'Quản lý, chuẩn hóa danh sách thiết bị truyền dẫn ảnh hưởng',
              path: EndPoints.standardData.transmissionEquipmentManagement,
              page: PAGES.STANDARD_DATA
            }
          ]
        }
      ]
    }
  }, [])

  return { standardData }
}

export default UseStandardData
