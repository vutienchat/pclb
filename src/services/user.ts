import { URIS } from '@src/constants/uri'
import { HttpAuth } from '@src/utils/HttpClient'

import type { HttpPaginationResponse, HttpResponse, ISystemRole, PaginationStates, User, UserProfile } from '@src/types'

export const getUserProfile = async () => {
  return HttpAuth.get<any, HttpResponse<UserProfile>>(URIS.user.profile)
}

export type TEditUserProfile = Pick<
  UserProfile,
  'avatarUrl' | 'fullName' | 'email' | 'mobile' | 'teamId' | 'positionId'
>

export const editUserProfile = async (param: TEditUserProfile) => {
  return HttpAuth.put<TEditUserProfile, HttpResponse<UserProfile>>(URIS.user.edit, param)
}

export type SearchingUserParams = {
  searchText: string
  centerId: number | null
  positionId: number | null
} & Pick<PaginationStates, 'pageNumber' | 'pageSize'>

export const apiSearchUser = async (params: SearchingUserParams) => {
  return HttpAuth.post<SearchingUserParams, HttpPaginationResponse<User>>(URIS.user.search, params)
}

export type TEditUser = Pick<User, 'avatarUrl' | 'fullName' | 'email' | 'mobile' | 'teamId' | 'positionId'> & {
  systemRoleIdList: number[]
}

export const editUser = async (userId: number, param: TEditUser) => {
  return HttpAuth.put<TEditUser, HttpResponse<User>>(URIS.user.editUser(userId), param)
}

export const apiDeleteUser = async (id: number) => {
  return HttpAuth.delete<any, HttpResponse<any>>(URIS.user.delete(id))
}

export const apiGetSystemRole = async () => {
  return HttpAuth.get<any, HttpResponse<ISystemRole[]>>(URIS.user.systemRole)
}

export const apiGetUserInfo = async (userId: number) => {
  return HttpAuth.get<any, HttpResponse<User>>(URIS.user.userInfo(userId))
}
