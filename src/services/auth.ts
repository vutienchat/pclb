import { URIS } from '@src/constants/uri'
import { HttpAuth } from '@src/utils/HttpClient'

import type { HttpResponse, SignInParams, SignInResponse } from '@src/types'

export const signIn = async (params: SignInParams) => {
  return HttpAuth.post<typeof params, HttpResponse<SignInResponse>>(URIS.auth.login, params)
}

export const signOut = async () => {
  return HttpAuth.get(URIS.auth.logout)
}
