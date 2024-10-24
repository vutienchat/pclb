import type { FCC } from '@src/types'
import { Fragment, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { DEFAULT_PAGE } from '@src/constants/paths'
import useAuthDispatch from '@src/hooks/useAuthDispatch'
import useAuthState from '@src/hooks/useAuthState'

const PublicRoute: FCC = (props) => {
  const { children } = props
  const { state } = useLocation()
  const { isAuthenticated } = useAuthState()
  const dispatch = useAuthDispatch()

  // Reset the authentication context when the user doesn't trigger the logout action.
  // That means this logout action can come from outside React, (HttpClient,...).
  const reset = state?.reset

  useEffect(() => {
    if (reset) {
      dispatch({ type: 'UNAUTHORIZED' })
    }
  }, [reset, dispatch])

  if (isAuthenticated) {
    return <Navigate to={DEFAULT_PAGE} replace />
  }

  return <Fragment>{children}</Fragment>
}

export default PublicRoute
