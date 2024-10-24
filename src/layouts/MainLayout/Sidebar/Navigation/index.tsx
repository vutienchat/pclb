import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import NavigationScrollbar from './components/NavigationScrollbar'
import NavigationSection from './components/NavigationSection'
import useUserManagement from './sections/UserManagement'
import useStormManagement from './sections/Weather'
import useStormPreparation from './sections/StormPreparation'
import useStormingManagement from './sections/UseStandardData'
import useNotificationManagement from './sections/NotificationManagement'
import useSettings from './sections/Settings'
import useNotification from './sections/Notification'
import useStormList from './sections/ListStorm'
import useWeather from './sections/Weather'
import useInfluence from './sections/UseInfluence'
import useChat from './sections/Chat'
import UseStandardData from './sections/UseStandardData'

export interface MenuItem {
  title: string
  path: string
  page?: number
  children?: MenuItem[]
  info?: () => JSX.Element
  icon?: ReactNode
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

const Navigation = () => {
  const { pathname } = useLocation()

  const { users } = useUserManagement()
  const { notificationManagement } = useNotificationManagement()
  const { listStorm } = useStormList()
  const { weather } = useWeather()
  const { stormPreparationManagement } = useStormPreparation()
  const { influence } = useInfluence()
  const { chat } = useChat()
  const { standardData } = UseStandardData()
  const { settings } = useSettings()

  const sections: MenuSection[] = [
    weather,
    listStorm,
    stormPreparationManagement,
    influence,
    chat,
    standardData,
    notificationManagement,
    settings,
    users
  ]

  return (
    <NavigationScrollbar>
      {sections.map((section, i) => (
        <NavigationSection key={i} pathname={pathname} {...section} />
      ))}
    </NavigationScrollbar>
  )
}

export default Navigation
