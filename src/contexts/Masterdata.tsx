import { createContext, useEffect, useState } from 'react'
import { __DEV__ } from '@src/config'
import type { FCC, IProvince, Option } from '@src/types'
import { useTypedDispatch, useTypedSelector } from '@src/store'
import {
  useGetMasterDataDistricts,
  useGetMasterDataProvinces,
  useGetMasterDataUserGroup
} from '@src/queries/masterdata'
import {
  setProvinces,
  setUserGroupAssignWork,
  setUserGroupNotify,
  setDistricts,
  setProvinceLonLat
} from '@src/slices/masterdata'
import {
  EUserGroupType,
  MasterdataDistrictsParams,
  MasterdataProvincesParams,
  MasterdataUserGroupParams
} from '@src/types/service/masterdata'
import useAuthState from '@src/hooks/useAuthState'
import SessionStorage from '@src/utils/SessionStorage'

interface State {
  provinces: Option<number>[]
  userGroupNotify: Option<number>[]
  userGroupAssignWork: Option<number>[]
  loadingUserGroupNotify: boolean
  loadingUserGroupAssignTask: boolean
  loadingDistricts: boolean
  loadingProvinces: boolean
  districts: Option<number>[]
  provinceLatLong: IProvince[]
}

export interface MasterdataContextStateValue extends State {
  getProvinces: (params?: MasterdataProvincesParams) => void
  getUserGroupsNotify: (params?: MasterdataUserGroupParams) => void
  getUserGroupsAssignWork: (params?: MasterdataUserGroupParams) => void
  getDistricts: (params: MasterdataDistrictsParams) => void
  handleResetLocation: () => void
}

const MasterdataContext = createContext<MasterdataContextStateValue | null>(null)

if (__DEV__) {
  MasterdataContext.displayName = 'MasterdataContext'
}

const MasterdataProvider: FCC = (props) => {
  const { children } = props
  const { isAuthenticated, isInitialized } = useAuthState()
  const { provinces, userGroupAssignWork, userGroupNotify, districts, provinceLatLong } = useTypedSelector(
    (state) => state.masterdata
  )
  const dispatch = useTypedDispatch()
  const getProvince = useGetMasterDataProvinces()
  const getUserGroupNotify = useGetMasterDataUserGroup()
  const getUserGroupAssignWork = useGetMasterDataUserGroup()
  const getDistrict = useGetMasterDataDistricts()
  const [loadingUserGroupNotify, setLoadingUserGroupNotify] = useState<boolean>(false)
  const [loadingUserGroupAssignTask, setLoadingUserGroupAssignTask] = useState<boolean>(false)
  const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false)
  const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false)

  const getDistricts = (params: MasterdataDistrictsParams) => {
    setLoadingDistricts(true)
    getDistrict.mutate(params, {
      onSuccess: (data) => {
        if (data && data.responseData) {
          dispatch(
            setDistricts(
              data.responseData.map((item) => ({
                label: item.name,
                value: item.value
              }))
            )
          )
        }
      },
      onSettled: () => {
        setLoadingDistricts(false)
      }
    })
  }

  const getProvinces = (params?: MasterdataProvincesParams) => {
    setLoadingProvinces(true)
    getProvince.mutate(params, {
      onSuccess: (data) => {
        if (data && data.responseData) {
          dispatch(
            setProvinces(
              data.responseData.map((item) => ({
                label: item.name,
                value: item.value
              }))
            )
          )
          dispatch(setProvinceLonLat(data.responseData || []))
          dispatch(setDistricts([]))
        }
      },
      onSettled: () => {
        setLoadingProvinces(false)
      }
    })
  }

  const getUserGroupsNotify = (params?: MasterdataUserGroupParams) => {
    setLoadingUserGroupNotify(true)
    getUserGroupNotify.mutate(
      {
        ...params,
        groupType: EUserGroupType.Notify
      },
      {
        onSuccess: (data) => {
          if (data && data.responseData) {
            dispatch(
              setUserGroupNotify(
                data.responseData.map((item) => ({
                  label: item.name,
                  value: item.value
                }))
              )
            )
          }
        },
        onSettled: () => {
          setLoadingUserGroupNotify(false)
        }
      }
    )
  }

  const getUserGroupsAssignWork = (params?: MasterdataUserGroupParams) => {
    setLoadingUserGroupAssignTask(true)
    getUserGroupAssignWork.mutate(
      {
        ...params,
        groupType: EUserGroupType.AssignWork
      },
      {
        onSuccess: (data) => {
          console.log(data)
          if (data && data.responseData) {
            dispatch(
              setUserGroupAssignWork(
                data.responseData.map((item) => ({
                  label: item.name,
                  value: item.value
                }))
              )
            )
          }
        },
        onSettled: () => {
          setLoadingUserGroupAssignTask(false)
        }
      }
    )
  }

  useEffect(() => {
    getUserGroupsNotify()
    getUserGroupsAssignWork()
    getProvinces()
  }, [])

  const handleResetLocation = () => {
    dispatch(setProvinces([]))
    dispatch(setDistricts([]))
  }

  useEffect(() => {
    const accessToken = SessionStorage.get('mbfAccessToken')
    if (accessToken && isAuthenticated && isInitialized) {
      getUserGroupsNotify()
      getUserGroupsAssignWork()
    }
  }, [isAuthenticated, isInitialized])

  return (
    <MasterdataContext.Provider
      value={{
        provinces,
        userGroupNotify,
        userGroupAssignWork,
        getProvinces,
        getUserGroupsNotify,
        getUserGroupsAssignWork,
        loadingUserGroupNotify,
        loadingUserGroupAssignTask,
        loadingDistricts,
        loadingProvinces,
        getDistricts,
        districts,
        handleResetLocation,
        provinceLatLong
      }}
    >
      {children}
    </MasterdataContext.Provider>
  )
}

const MasterdataConsumer = MasterdataContext.Consumer
export { MasterdataContext as default, MasterdataProvider, MasterdataConsumer }
