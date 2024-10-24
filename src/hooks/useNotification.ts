import { useContext } from 'react'
import NotificationContext from '@src/contexts/Notification'

const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error('Forgot to wrap component in NotificationProvider')
  }

  return context
}

export default useNotification
