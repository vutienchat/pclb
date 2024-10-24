import type { AnySchema, ObjectShape, ValidationError } from 'yup'
import { array, boolean, date, mixed, number, object, ref, setLocale, string } from 'yup'

import DateTime from './DateTime'
import RegExps from './RegExps'

class Validation {
  constructor() {
    setLocale({
      mixed: {
        required: 'Bắt buộc'
      },
      string: {
        trim: 'validation.trim',
        max: 'validation.maxLength'
      }
    })
  }

  public ref(key: string) {
    return ref(key)
  }

  public mixed() {
    return mixed()
  }

  public array() {
    return array().default([])
  }

  public boolean() {
    return boolean().default(false)
  }

  public resolver(error: ValidationError) {
    return error.message
  }

  public validate(validate?: AnySchema) {
    return async (value: any) => {
      if (!validate) return true

      const message = await validate
        .validate(value)
        .then(() => void 0)
        .catch(this.resolver)

      return message
    }
  }

  public shape<T extends ObjectShape>(additions: T, excludes?: [string, string][]) {
    return object().shape<T>(additions, excludes)
  }

  public parse(error: string = '') {
    try {
      return JSON.parse(error) as Record<string, any>
    } catch (error) {
      return {}
    }
  }

  // Schema

  public string() {
    return string().ensure().required().max(255).trim().default('')
  }

  public number() {
    return number().required().typeError('Số không hợp lệ')
  }

  public option() {
    return number().required().nullable().default(null)
  }

  public optionNumber() {
    return number().required().nullable().default(null)
  }

  public optionString() {
    return string().nullable().default('')
  }

  public select(value: number) {
    return number().required().default(value)
  }

  public date() {
    return date().required().typeError('validation.invalidDate').nullable().default(null)
  }

  public isPast(name: string) {
    return this.date().max(
      DateTime.EndOfDay(new Date()),
      JSON.stringify({
        key: 'validation.isPast',
        name
      })
    )
  }

  public email() {
    return string().trim().required().matches(RegExps.email, 'Email không hợp lệ').max(255).default('')
  }

  public phone() {
    return string().trim().required().matches(RegExps.phone, 'Số điện thoại không hợp lệ').max(255).default('')
  }

  public username() {
    return this.pattern(RegExps.username, 'validation.username')
      .min(4, 'validation.username')
      .max(15, 'validation.username')
  }

  public password() {
    return this.pattern(RegExps.password, 'validation.password').max(15, 'validation.passwordLength')
  }

  public description() {
    return string().trim().max(5000).default('')
  }

  public pattern(regexp: RegExp, message?: string) {
    return this.string().matches(regexp, message)
  }

  public numbers() {
    return array().of(number().required()).min(1, 'Bắt buộc').default([])
  }

  public strings() {
    return array().of(string().required()).min(1, 'Bắt buộc').default([])
  }

  public optionalNumber() {
    return number()
      .nullable()
      .optional()
      .transform((_, value) => (value === '' ? null : Number(value)))
  }

  public optionalString() {
    return string().nullable().optional()
  }
}

export default new Validation()
