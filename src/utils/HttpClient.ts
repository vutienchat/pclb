import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

import DateTime from './DateTime'
import HttpError from './HttpError'
import { __URL_SERVICE__ } from '@src/config'
import SessionStorage from './SessionStorage'
import type { HttpErrorResponse } from '@src/types'
import router from '@src/routes'
import { EndPoints } from '@src/constants/paths'

class Axios {
  private instance: AxiosInstance
  private requests: ((accessToken: string) => void)[] = []
  private isRefreshing: boolean = false

  constructor(configService: AxiosRequestConfig) {
    const instance = axios.create(configService)

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        const accessToken = this.getAccessToken()
        if (config.headers) {
          if (accessToken) {
            config.headers.Authorization = accessToken
          } else {
            delete config.headers.Authorization
          }
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<HttpErrorResponse>) => {
        const { config, response } = error

        if (!config) return Promise.reject(error)

        // Unauthorized
        const isUnauthorized = response?.status === 401

        if (isUnauthorized) {
          // TO DO: implement refresh token
          // redirect to login
          console.log('Unauthorized')
          // this.signOut()
        }

        return Promise.reject(error)
      }
    )

    //  #region Push notification interceptor
    instance.interceptors.response.use((response: AxiosResponse) => response, HttpError.unwrap)

    this.instance = instance
  }

  public get Instance() {
    return this.instance
  }

  private getAPIKey() {}

  private getAccessToken() {
    const accessToken: string | null = SessionStorage.get('mbfAccessToken')
    return accessToken
  }

  private setAccessToken(accessToken: string) {
    SessionStorage.set('mbfAccessToken', accessToken)
  }

  private getRefreshToken() {
    const refreshToken: string | null = SessionStorage.get('mbfRefreshToken')
    return refreshToken
  }

  private setRefreshToken(refreshToken: string) {
    SessionStorage.set('mbfRefreshToken', refreshToken)
  }

  private addRequest(request: (accessToken: string) => void) {
    this.requests.push(request)
  }

  private onAccessTokenChanged(accessToken: string) {
    this.requests = this.requests.filter((request) => request(accessToken))
  }

  private signOut() {
    this.requests = []
    SessionStorage.clear()
    // Use "href" instead of "navigate" if you need to reload the login page immediately
    // window.location.href = 'dang-nhap';
    router.navigate(EndPoints.auth.login, {
      replace: true,
      state: { reset: true }
    })
  }

  private async refreshToken() {}

  // Create
  public post<D = any>(url: string): Promise<D>
  public post<D = any, R = any>(url: string, data: D, config?: AxiosRequestConfig<D>): Promise<R>
  public post<D = any, R = any>(
    url: string,
    data: D,
    config: AxiosRequestConfig<D> & { integrity: true }
  ): Promise<AxiosResponse<R, D>>
  public post<D, R>(url: string, data?: D, config: any = {}): Promise<unknown> {
    const { integrity, ...rest } = config
    return new Promise((resolve, reject) => {
      this.Instance.post<D, AxiosResponse<R>>(url, data, rest)
        .then((response) => resolve(integrity ? response : response.data))
        .catch((error: AxiosError) => reject(error.response?.data))
    })
  }

  // Read
  public get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return new Promise((resolve, reject) => {
      this.Instance.get<T, AxiosResponse<R>, D>(url, config)
        .then((response) => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response?.data))
    })
  }

  // Update
  public put<D = any, R = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return new Promise((resolve, reject) => {
      this.Instance.put<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response?.data))
    })
  }

  // Delete
  public delete<D = any, R = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return new Promise((resolve, reject) => {
      this.Instance.delete<D, AxiosResponse<R>>(url, config)
        .then((response) => resolve(response.data))
        .catch((error: AxiosError) => reject(error.response?.data))
    })
  }
}

const configAuthService: AxiosRequestConfig = {
  baseURL: __URL_SERVICE__.__AUTH_URL__,
  headers: {
    'Content-Type': 'application/json',
    TimeZone: DateTime.TimeZone()
  },
  timeout: 10 * 60 * 1000
}

const configCoreService: AxiosRequestConfig = {
  baseURL: __URL_SERVICE__.__CORE_URL__,
  headers: {
    'Content-Type': 'application/json',
    TimeZone: DateTime.TimeZone()
  },
  timeout: 10 * 60 * 1000
}

const configCDNService: AxiosRequestConfig = {
  baseURL: __URL_SERVICE__.__CDN_URL__,
  headers: {
    'Content-Type': 'multipart/form-data',
    TimeZone: DateTime.TimeZone()
  },
  timeout: 10 * 60 * 1000
}

const HttpAuth = new Axios(configAuthService)
const HttpServices = new Axios(configCoreService)
const HttpCDN = new Axios(configCDNService)

export { HttpAuth, HttpServices, HttpCDN }
