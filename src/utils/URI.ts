import Logger from './Logger'

class URI {
  Decode(encoded: string) {
    try {
      return decodeURI(encoded)
    } catch (error) {
      Logger.log(error)
      return null
    }
  }
}

export default new URI()
