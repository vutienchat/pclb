import dayjs from 'dayjs'
import type {Dayjs} from 'dayjs'
import {
  useController,
  useFormContext
} from 'react-hook-form'
import type {TextFieldProps} from '@mui/material/TextField'
import {
  DateTimePicker,
  DateTimePickerProps
} from '@mui/x-date-pickers/DateTimePicker'
import FormHelperText from '@mui/material/FormHelperText'

import {DateTimeFormat} from '@src/constants/locale'
import MBFFormLabel from './MBFFormLabel'
import Validation from '@src/utils/Validation'
import type {AnySchema} from 'yup'
import DateTime from '@src/utils/DateTime'

interface Props {
  name: string
  label?: DateTimePickerProps<Dayjs, boolean>['label']
  onSelect?: (date: string | null) => void
  TextFieldProps?: TextFieldProps
  shouldDisableDate?: (date: Dayjs | null) => boolean
  DatePickerProps?: Partial<DateTimePickerProps<Dayjs, boolean>>
  disabled?: boolean
  validate?: AnySchema
  type?: 'startDate' | 'endDate'
  required?: boolean
}

const MBFFormDateTimePicker = (props: Props) => {
  const {
    required = false,
    name,
    disabled,
    onSelect,
    DatePickerProps,
    shouldDisableDate,
    label,
    validate,
    type
  } = props

  const {control} = useFormContext()

  const {
    field: {
      value,
      onChange
    },
    fieldState: {error}
  } = useController({
    name,
    control,
    rules: {validate: Validation.validate(validate)}
  })

  return (
    <>
      {label &&
        <MBFFormLabel title={label}
                      name={name}
                      required={required} />}
      <DateTimePicker
        disabled={disabled}
        format={DateTimeFormat}
        shouldDisableDate={shouldDisableDate}
        dayOfWeekFormatter={(day) => day.format('dd')}
        onChange={(date: Dayjs | null) => {
          const value = date ?
            type === 'startDate' ? DateTime.StartOfDay(date) :
              type === 'endDate' ? DateTime.EndOfDay(date) : date.toISOString()
            : null
          onChange(value)
          onSelect?.(value)
        }}
        value={value ? dayjs(value) : null}
        slotProps={{
          textField: {
            ...(
              error?.message && {
                helperText: (
                  <FormHelperText variant="standard"
                                  sx={{color: 'error.main'}}
                                  component={'span'}>
                    {error.message}
                  </FormHelperText>
                )
              }
            ),

          },
          ...DatePickerProps?.slotProps
        }}
        sx={{
          ...(
            error?.message && {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'error.main'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'error.main'
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'error.main'
              },
            }
          ),
          ...(
            disabled && {
              '& .MuiInputAdornment-root': {
                display: 'none'
              }
            }
          ),
          '& .MuiButtonBase-root': {
            padding: 0,
          }
        }}
        {...DatePickerProps}
      />
    </>
  )
}

export default MBFFormDateTimePicker
