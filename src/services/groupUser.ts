import { URIS } from '@src/constants/uri'
import { HttpAuth } from '@src/utils/HttpClient'

import type { GroupUser, HttpPaginationResponse, HttpResponse, PaginationStates, User } from '@src/types'

export type SearchingGroupUserParams = {
  searchText: string
} & Pick<PaginationStates, 'pageNumber' | 'pageSize'>

export const apiSearchGroupUser = async (params: SearchingGroupUserParams) => {
  return HttpAuth.post<SearchingGroupUserParams, HttpPaginationResponse<GroupUser>>(URIS.groupUser.search, params)
}

export const apiGetListMemberGroupUser = async (id: number) => {
  return HttpAuth.get<number, HttpResponse<User[]>>(URIS.groupUser.listMemberGroup(id))
}

export const apiEditGroupUser = async (
  userId: number,
  param: {
    name: string
    description: string
  }
) => {
  return HttpAuth.put<typeof param, HttpResponse<GroupUser>>(URIS.groupUser.edit(userId), param)
}

export const apiAddMemberGroupUser = async (
  groupId: number,
  param: {
    addUserIdList: number[]
    removeUserIdList: number[]
  }
) => {
  return HttpAuth.post<typeof param, HttpResponse<User>>(URIS.groupUser.addMember(groupId), param)
}

export const apiDeleteGroupUser = async (id: number) => {
  return HttpAuth.delete<any, HttpResponse<any>>(URIS.groupUser.delete(id))
}

export const apiCreateGroupUser = async (params: { name: string; description: string }) => {
  return HttpAuth.post<typeof params, HttpResponse<GroupUser>>(URIS.groupUser.create, params)
}

export const apiGetAllGroupUser = async () => {
  return HttpAuth.get<number, HttpResponse<GroupUser[]>>(URIS.groupUser.getAll)
}
