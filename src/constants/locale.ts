import type { LocalizationProviderProps } from '@mui/x-date-pickers'
import type { Dayjs } from 'dayjs'

export const DateFormat = 'DD/MM/YYYY'
export const DateTimeFormat = 'DD/MM/YYYY, HH:mm'

export const DatePickerLocaleText: LocalizationProviderProps<Dayjs, boolean>['localeText'] = {
  previousMonth: 'Tháng trước',
  nextMonth: 'Tháng sau',

  // Action bar
  cancelButtonLabel: 'Hủy bỏ',
  clearButtonLabel: 'Xóa',
  okButtonLabel: 'Đóng',
  todayButtonLabel: 'Hôm nay'
}
