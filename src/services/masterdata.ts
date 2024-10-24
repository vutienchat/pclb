import {
  MasterdataDistrictsParams,
  MasterdataProvincesParams,
  MasterdataUserGroupParams,
  TDropdown
} from '@src/types/service/masterdata'
import { HttpServices } from '@src/utils/HttpClient'
import { URIS } from '@src/constants/uri'
import { HttpResponse, IProvince } from '@src/types'
import { normalizeQueryParams } from '@src/utils/common'

export const getProvinces = async (params?: MasterdataProvincesParams) => {
  return HttpServices.get<HttpResponse<IProvince[]>>(`${URIS.masterdata.provinces}?${normalizeQueryParams(params)}`)
}

export const getUserGroup = async (params?: MasterdataUserGroupParams) =>
  HttpServices.get<HttpResponse<TDropdown[]>>(URIS.masterdata.userGroup, { params })

export const getDistricts = async (params: MasterdataDistrictsParams) =>
  HttpServices.get<HttpResponse<TDropdown[]>>(URIS.masterdata.districts, { params })
