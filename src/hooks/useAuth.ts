import { useContext } from 'react'

import AuthContextState from '@src/contexts/Auth'

const useAuth = () => {
  const context = useContext(AuthContextState)

  if (!context) {
    throw new Error('Forgot to wrap component in AuthContext')
  }

  const { user, permissions } = context

  if (!user) {
    throw new Error('Unauthorized')
  }

  return { user, permissions }
}

export default useAuth
