import { useContext } from 'react'

import AuthContextState from '@src/contexts/Auth'

const useAuthState = () => {
  const context = useContext(AuthContextState)

  if (!context) {
    throw new Error('Forgot to wrap component in AuthContext')
  }

  return context
}

export default useAuthState
