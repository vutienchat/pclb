import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import { useMemo } from 'react'
import { PAGES } from '@src/constants/pages'

import type { MenuSection } from '..'
import { EndPoints } from '@src/constants/paths'

const useChat = () => {
  const chat: MenuSection = useMemo(() => {
    return {
      title: 'Điều hành ứng cứu',
      items: [
        {
          title: 'Điều hành ứng cứu',
          path: EndPoints.chat,
          icon: <ChatOutlinedIcon />,
          page: PAGES.CHAT
        }
      ]
    }
  }, [])

  return { chat }
}

export default useChat
