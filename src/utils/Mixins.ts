import type { Dictionary } from '@src/types'

type Values<T> = T[keyof T]

class Mixins {
  public keys<T extends Dictionary>(object: T) {
    return Object.keys(object) as (keyof T)[]
  }

  public entries<T extends Dictionary>(object: T) {
    return Object.entries<T[keyof T]>(object)
  }

  public lastKey<T extends Dictionary>(object: T) {
    return Object.keys(object).pop()
  }

  public pop<T extends Dictionary>(object: T): Values<T> | null {
    const lastKey = Object.keys(object).pop()
    if (lastKey) {
      return object[lastKey]
    }
    return null
  }

  public shift<T extends Dictionary>(object: T): Values<T> | null {
    const firstKey = Object.keys(object).shift()
    if (firstKey) {
      return object[firstKey]
    }
    return null
  }

  public size<T extends Dictionary>(object: T) {
    return Object.keys(object).length
  }

  public isEmptyObject<T extends Dictionary>(object: T) {
    return Object.keys(object).length === 0
  }

  public isExist<T extends Dictionary>(object: T) {
    return Object.keys(object).length !== 0
  }

  public in<K extends PropertyKey>(obj: object, key: K): obj is Record<K, unknown> {
    return key in obj
  }

  public includes<T extends any[], E extends any>(array: T, element: E): element is T[number] {
    return array.includes(element)
  }

  public isEmptyArray<T extends any[]>(array: T) {
    return Array.isArray(array) && array.length === 0
  }

  public join<T extends any[]>(array: T, separator: string = ' ') {
    if (!Array.isArray(array)) return ''
    return array.filter(Boolean).join(separator)
  }
}

export default new Mixins()
