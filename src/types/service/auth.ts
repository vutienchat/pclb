export interface SignInParams {
  username: string
  password: string
}

export interface SignInResponse {
  refreshToken: string
  accessToken: string
}
