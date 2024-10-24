import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useStormList = () => {
  const listStorm: MenuSection = useMemo(() => {
    return {
      title: 'Danh sách cơn bão',
      items: [
        {
          title: 'Danh sách cơn bão',
          path: EndPoints.listStorm,
          icon: <ElectricBoltOutlinedIcon />,
          page: PAGES.LIST_STORM
        }
      ]
    }
  }, [])

  return { listStorm }
}

export default useStormList
