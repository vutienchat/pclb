import { HttpServices } from '@src/utils/HttpClient'
import { URIS } from '@src/constants/uri'
import { HttpPaginationResponse, HttpResponse } from '@src/types'
import { SearchStormParams, StormData, StormDetail, StormDirectionHistory, StormList } from '@src/types/service/storm'

export const apiGetStormList = async (params: SearchStormParams) =>
  HttpServices.get<HttpPaginationResponse<StormList>>(URIS.storms.list, { params })

export const apiCreateStorm = async (params: StormData) =>
  HttpServices.post<any, HttpResponse<any>>(URIS.storms.create, params)

export const apiEditStorm = async (id: number, params: StormData) =>
  HttpServices.put<StormData, HttpResponse<any>>(URIS.storms.edit(id), params)

export const apiDeleteStorm = async (id: number) =>
  HttpServices.delete<null, HttpResponse<any>>(URIS.storms.delete(id))

export const apiGetStormById = async (id: number) =>
  HttpServices.get<HttpResponse<StormDetail>>(URIS.storms.get(id))

export const apiGetDirectHistories = async (id: number) =>
  HttpServices.get<HttpResponse<StormDirectionHistory[]>>(URIS.storms.getDirectHistory(id))