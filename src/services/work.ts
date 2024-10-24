import { URIS } from '@src/constants/uri'
import type { HttpPaginationResponse, HttpResponse, IWork, IWorkDetail, PaginationStates } from '@src/types'
import { HttpServices } from '@src/utils/HttpClient'

export type SearchingWorkParams = {
  searchText: string
  groupId: number | null
} & Pick<PaginationStates, 'pageNumber' | 'pageSize'>

export const apiSearchWork = async (params: SearchingWorkParams) => {
  return HttpServices.get<SearchingWorkParams, HttpPaginationResponse<IWork>>(URIS.work.search(params))
}

export type CreateWorkParams = {
  userGroupIds: number[]
  taskDetails: {
    name: string
    note: string
    children: { name: string; expectation: string; valueType: number }[]
  }
}

export const apiCreateWork = async (params: CreateWorkParams) => {
  return HttpServices.post<typeof params, HttpResponse<IWorkDetail>>(URIS.work.create, params)
}

export const apiGetDetailWork = async (id: number) => {
  return HttpServices.get<any, HttpResponse<IWorkDetail>>(URIS.work.get(id))
}

export type EditWorkParams = {
  userGroupIds: number[]
  taskDetails: {
    id: number
    name: string
    note: string
    children: { name: string; expectation: string; valueType: number }[]
  }
}

export const apiEditWork = async (params: EditWorkParams) => {
  return HttpServices.put<typeof params, HttpResponse<any>>(URIS.work.edit, params)
}

export const apiDeleteWork = async (id: number) => {
  return HttpServices.delete<any, HttpResponse<any>>(URIS.work.delete(id))
}
