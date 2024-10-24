import { useContext } from 'react'
import MasterdataContext from '@src/contexts/Masterdata'

const useMasterdata = () => {
  const context = useContext(MasterdataContext)

  if (!context) {
    throw new Error('Forgot to wrap component in MasterdataProvider')
  }

  return context
}

export default useMasterdata