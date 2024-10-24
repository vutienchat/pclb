import store from '@src/store'
import { setMessage } from '@src/slices/notification'
import type { HttpErrorResponse } from '@src/types'

import { AxiosError } from 'axios'

class HttpError {
  private ERROR_CODE: Record<string, string> = {
    common: 'common',
    forbidden: 'forbidden',
    err_network: 'err_network',
    unexpected_error: 'unexpected_error',
    unauthorized: 'unauthorized'
  }

  public unwrap(error: AxiosError<HttpErrorResponse>) {
    const { code, response } = error

    if (code === AxiosError.ERR_NETWORK) {
      store.dispatch({
        type: setMessage.type,
        payload: 'err_network'
      })
    } else if (response) {
      const { status, data } = response

      switch (status) {
        case 403: {
          store.dispatch({
            type: setMessage.type,
            payload: 'Forbidden'
          })
          break
        }
        case 404: {
          store.dispatch({
            type: setMessage.type,
            payload: 'Not found'
          })
          break
        }
        default: {
          if (data && typeof data === 'object' && 'responseMessage' in data && data['responseMessage']) {
            store.dispatch({
              type: setMessage.type,
              payload: data['responseMessage']
            })
          } else {
            store.dispatch({
              type: setMessage.type,
              payload: 'Lỗi hệ thống'
            })
          }
          break
        }
      }
    }

    return Promise.reject(error)
  }

  public parse(messageCode: string | null) {
    if (typeof messageCode === 'string' && messageCode in this.ERROR_CODE) {
      return `${this.ERROR_CODE[messageCode]}`
    }

    return messageCode
  }
}

export default new HttpError()
