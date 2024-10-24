import logger from './Logger'

type Key = 'mbfAccessToken' | 'mbfRefreshToken' | 'mbfExpiresAt' | 'mbfUserId'

class SessionStorage {
  public get(key: Key, fallback: any = null) {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? JSON.parse(item) : fallback
    } catch (error) {
      logger.log(error)
      return fallback
    }
  }

  public set(key: Key, value: any, callback?: VoidFunction) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      callback?.()
    } catch (error) {
      logger.log(error)
    }
  }

  public remove(key: Key, callback?: VoidFunction) {
    window.sessionStorage.removeItem(key)
    callback?.()
  }

  public clear() {
    window.sessionStorage.clear()
  }
}

export default new SessionStorage()
