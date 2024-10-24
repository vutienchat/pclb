import { createContext, useEffect, useReducer } from 'react'

import type { Dispatch } from 'react'
import type { FCC, UserProfile } from '@src/types'

import { __DEV__ } from '@src/config'
import useRefresh from '@src/hooks/useRefresh'
import SessionStorage from '@src/utils/SessionStorage'
import { useLogout, useUserProfile } from '@src/queries'

interface State {
  isInitialized: boolean
  isAuthenticated: boolean
  user: UserProfile | null
  permissions: any[]
}

export interface AuthContextStateValue extends State {
  logout: () => void
}

type Action =
  | {
      type: 'AUTHORIZED'
      payload: {
        user: any | null
        permissions: any[]
      }
    }
  | { type: 'UNAUTHORIZED' }
  | { type: 'LOGOUT' }

const initialState: State = {
  isAuthenticated: true,
  isInitialized: true,
  user: null,
  permissions: []
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'AUTHORIZED': {
      const { user, permissions } = action.payload
      return {
        isInitialized: true,
        isAuthenticated: true,
        permissions,
        user
      }
    }
    case 'UNAUTHORIZED': {
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: false
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false
      }
    }
    default:
      return state
  }
}

const AuthContextState = createContext<AuthContextStateValue | null>(null)
const AuthContextDispatch = createContext<Dispatch<Action> | null>(null)

if (__DEV__) {
  AuthContextState.displayName = 'AuthContext'
}

const AuthProvider: FCC = (props) => {
  const { children } = props
  const [refresh, refetch] = useRefresh()
  const [state, dispatch] = useReducer(reducer, initialState)

  const logoutMutation = useLogout()
  const getUserMutation = useUserProfile()

  const fetchUser = () => {
    getUserMutation.mutate(undefined, {
      onSuccess(data) {
        if (data.responseData) {
          dispatch({ type: 'AUTHORIZED', payload: { user: data.responseData, permissions: [] } })
        }
      },
      onError: () => {
        dispatch({ type: 'UNAUTHORIZED' })
      }
    })
  }

  useEffect(() => {
    const accessToken = SessionStorage.get('mbfAccessToken')

    if (accessToken && !state?.user) {
      // Fetch user data
      fetchUser()
      return
    }

    if (!accessToken || !state?.user) {
      dispatch({ type: 'UNAUTHORIZED' })
      return
    }
  }, [refresh])

  const logout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        SessionStorage.clear()
        dispatch({ type: 'LOGOUT' })
      }
    })
  }

  return (
    <AuthContextState.Provider value={{ ...state, logout }}>
      <AuthContextDispatch.Provider value={dispatch}>{children}</AuthContextDispatch.Provider>
    </AuthContextState.Provider>
  )
}

const AuthConsumer = AuthContextState.Consumer
export { AuthContextState as default, AuthProvider, AuthConsumer, AuthContextDispatch }
