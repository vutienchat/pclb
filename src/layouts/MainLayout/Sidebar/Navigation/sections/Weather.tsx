import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useWeather = () => {
  const weather: MenuSection = useMemo(() => {
    return {
      title: 'Thông tin thời tiết',
      items: [
        {
          title: 'Thông tin thời tiết',
          path: '/thong-tin-thoi-tiet',
          icon: <ThunderstormOutlinedIcon />,
          children: [
            {
              title: 'Tin cảnh báo thiên tai',
              path: EndPoints.weather.weather,
              page: PAGES.WEATHER
            },
            {
              title: 'Bản đồ số',
              path: EndPoints.weather.digitalMap,
              page: PAGES.WEATHER
            }
          ]
        }
      ]
    }
  }, [])

  return { weather }
}

export default useWeather
