import { createContext, useEffect } from 'react'

import type { FCC } from '@src/types'

import { __DEV__ } from '@src/config'
import useRefresh from '@src/hooks/useRefresh'
import { useTypedDispatch, useTypedSelector } from '@src/store'
import { useGetCenter, useGetPosition } from '@src/queries'
import { setCenters, setPositions } from '@src/slices/metadata'
import SessionStorage from '@src/utils/SessionStorage'

interface State {}

export interface MetadataContextStateValue extends State {}

const MetadataContextState = createContext<MetadataContextStateValue | null>(null)

if (__DEV__) {
  MetadataContextState.displayName = 'MetadataContext'
}

const MetadataProvider: FCC = (props) => {
  const { children } = props
  const [refresh, refetch] = useRefresh()
  const { centers, positions } = useTypedSelector((state) => state.metadata)
  const dispatch = useTypedDispatch()

  const getCenterMutation = useGetCenter()
  const getPositionMutation = useGetPosition()

  useEffect(() => {
    const accessToken = SessionStorage.get('mbfAccessToken')
    if (!centers.length && accessToken) {
      getCenterMutation.mutateAsync().then((data) => {
        if (data && data.responseData) {
          dispatch(setCenters(data.responseData || []))
        }
      })
    }
  }, [refresh])

  useEffect(() => {
    const accessToken = SessionStorage.get('mbfAccessToken')
    if (!positions.length && accessToken) {
      getPositionMutation.mutateAsync().then((data) => {
        if (data && data.responseData) {
          dispatch(setPositions(data.responseData || []))
        }
      })
    }
  }, [refresh])

  return <MetadataContextState.Provider value={{}}>{children}</MetadataContextState.Provider>
}

const MetadataConsumer = MetadataContextState.Consumer
export { MetadataContextState as default, MetadataProvider, MetadataConsumer }
