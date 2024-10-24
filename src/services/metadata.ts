import { URIS } from '@src/constants/uri'
import { HttpAuth, HttpCDN } from '@src/utils/HttpClient'

import type { HttpResponse, ICenter, IDepartment, IPosition, ITeam, IUploadImageRes } from '@src/types'

export const getPosition = async () => {
  return HttpAuth.get<any, HttpResponse<IPosition[]>>(URIS.position)
}

export const getCenter = async () => {
  return HttpAuth.get<any, HttpResponse<ICenter[]>>(URIS.center)
}

export const getDepartment = async (centerId: number) => {
  return HttpAuth.get<any, HttpResponse<IDepartment[]>>(URIS.department({ centerId }))
}

export const getTeam = async (centerId: number, departmentId: number) => {
  return HttpAuth.get<any, HttpResponse<ITeam[]>>(URIS.team({ centerId, departmentId }))
}

export const uploadImage = async (file: File, folder: string) => {
  const formData = new FormData()
  formData.append('inputFile', file)
  return HttpCDN.post<any, HttpResponse<IUploadImageRes>>(`${URIS.uploadFile}?folderName=${folder}`, formData)
}
