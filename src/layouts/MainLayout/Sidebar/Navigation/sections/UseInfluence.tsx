import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useInfluence = () => {
  const influence: MenuSection = useMemo(() => {
    return {
      title: 'Ảnh hưởng bão',
      items: [
        {
          title: 'Ảnh hưởng bão',
          path: '/anh-huong-bao',
          icon: <SignalCellularAltOutlinedIcon />,
          children: [
            {
              title: 'Báo cáo tình hình mạng lưới',
              path: EndPoints.influence.overallReport,
              page: PAGES.INFLUENCE
            },
            {
              title: 'Bản đồ số',
              path: EndPoints.influence.digitalMap,
              page: PAGES.INFLUENCE
            }
          ]
        }
      ]
    }
  }, [])

  return { influence }
}

export default useInfluence
