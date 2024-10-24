import { useContext } from 'react'

import { AuthContextDispatch } from '@src/contexts/Auth'

const useAuthDispatch = () => {
  const context = useContext(AuthContextDispatch)

  if (!context) {
    throw new Error('Forgot to wrap component in AuthContext')
  }

  return context
}

export default useAuthDispatch
