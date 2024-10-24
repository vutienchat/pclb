import dayjs from 'dayjs'

// Plugins
import customParseFormat from 'dayjs/plugin/customParseFormat'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'

// Dayjs locale
import 'dayjs/locale/en'
import 'dayjs/locale/vi'

import type { Dayjs } from 'dayjs'
import { DateFormat } from '@src/constants/locale'

class DateTime {
  constructor() {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.extend(customParseFormat)
    dayjs.extend(updateLocale)
  }

  public initLocale() {
    dayjs.updateLocale('vi', {
      months: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12'
      ]
    })
  }

  public IsValid(date: any) {
    if (!date) return false
    return dayjs(date).isValid()
  }

  public TimeZone() {
    return dayjs.tz.guess()
  }

  public Format(value: any, pattern: string = DateFormat) {
    return this.IsValid(value) ? dayjs(value).format(pattern) : null
  }

  public ToString(value: Date | Dayjs | number): string
  public ToString(value?: Date | null): string | null
  public ToString(value?: any) {
    return this.IsValid(value) ? dayjs(value).toISOString() : null
  }

  public StartOfDay(value: Date | Dayjs | number): string
  public StartOfDay(value?: Date | null): string | null
  public StartOfDay(value?: any) {
    return this.IsValid(value) ? dayjs(value).startOf('day').toISOString() : null
  }

  public EndOfDay(value: Date | Dayjs | number): string
  public EndOfDay(value?: Date | null): string | null
  public EndOfDay(value?: any) {
    return this.IsValid(value) ? dayjs(value).endOf('day').toISOString() : null
  }

  public Instance(value: Date | Dayjs | number): Dayjs
  public Instance(value?: Date | null): Dayjs | null
  public Instance(value?: any) {
    return this.IsValid(value) ? dayjs(value) : null
  }

  public currentDateTime() {
    return dayjs().format(DateFormat)
  }
}

export default new DateTime()
