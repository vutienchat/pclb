import { URIS } from '@src/constants/uri'
import type { HttpResponse, IIssue, IMapSite, ISiteDetail, ITransmissionDevice, TDevice } from '@src/types'
import { HttpServices } from '@src/utils/HttpClient'

export type IGetMapSiteParams = {
  provinceId: number | null
  priority: number | null
  status: number | null
}

export const apiGetMapSite = async (params: IGetMapSiteParams) => {
  return HttpServices.post<typeof params, HttpResponse<IMapSite[]>>(URIS.digitalMap.getMapSite, params)
}

export const apiGetTransmissionDeviceMap = async (provinceId: number) => {
  return HttpServices.get<any, HttpResponse<TDevice[]>>(URIS.digitalMap.getTransmissionDeviceMap(provinceId))
}

export const apiGetIssue = async () => {
  return HttpServices.get<any, HttpResponse<IIssue>>(URIS.issue.getIssue)
}

export const apiGetSiteDetail = async (siteId: number) => {
  return HttpServices.get<any, HttpResponse<ISiteDetail>>(URIS.digitalMap.detailSite(siteId))
}

export const apiGetTransmissionDeviceDetail = async (siteId: number) => {
  return HttpServices.get<any, HttpResponse<ITransmissionDevice>>(URIS.digitalMap.getTransmissionDeviceMap(siteId))
}
