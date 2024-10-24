import { URIS } from '@src/constants/uri'
import type { HttpResponse, INew, INewDetail } from '@src/types'
import { HttpServices } from '@src/utils/HttpClient'

export const apiGetNew = async () => {
  return HttpServices.get<any, HttpResponse<INew[]>>(URIS.new.getAll)
}

export const apiGetDetailNew = async (postId: number) => {
  return HttpServices.get<any, HttpResponse<INewDetail>>(URIS.new.getDetail(postId))
}
