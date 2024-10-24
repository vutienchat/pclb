import { Fragment } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import type { FCC } from '@src/types'

import SplashScreen from './SplashScreen'
import useAuthState from '@src/hooks/useAuthState'
import SessionStorage from '@src/utils/SessionStorage'
import { EndPoints } from '@src/constants/paths'
import { MetadataProvider } from '@src/contexts/Metadata'

const PrivateRoute: FCC = (props) => {
  const { children } = props
  const { pathname } = useLocation()
  const { isAuthenticated, isInitialized } = useAuthState()

  if (!isInitialized) {
    return <SplashScreen />
  }

  if (!isAuthenticated) {
    // Redirect them to the /auth/login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    SessionStorage.clear()
    return <Navigate to={EndPoints.auth.login} state={{ from: pathname }} replace />
  }

  return (
    <Fragment>
      <MetadataProvider>{children}</MetadataProvider>
    </Fragment>
  )
}

export default PrivateRoute
