import {
  Fragment
} from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type {FieldValues} from 'react-hook-form'
import {
  useController,
  useFormContext
} from 'react-hook-form'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'

import type {TextFieldProps} from '@mui/material/TextField'

import MBFFormLabel from './MBFFormLabel'
import {removeDuplicates} from "@src/utils/common";

interface Value<T> {
  key: string | number
  label: string
  value: T
  disabled: boolean
}

interface Props<O extends FieldValues, V extends string | number>
  extends Omit<TextFieldProps, 'name' | 'onSelect'> {
  name: string
  options: O[]
  initOptions?: O[]
  renderLabel?: (option: O) => string
  renderValue?: (option: O) => V
  getOptionDisabled?: (option: O) => boolean
  onSelect?: (value: V | null) => void
  placeholder?: string
  actionText?: string // Like placeholder, but for instruction
  labelVariant?: 'standard' | 'outlined'
  onSearch?: (value: any) => void
  loading?: boolean
}

const MBFFormAutocomplete = <O extends FieldValues, V extends string | number>(props: Props<O, V>) => {
  const {
    name,
    options = [],
    initOptions = [],
    renderLabel = (option) => option.label,
    renderValue = (option) => option.value,
    disabled,
    placeholder,
    actionText,
    getOptionDisabled,
    onSelect,
    required,
    label,
    labelVariant = 'standard',
    loading = false,
    onSearch,
    ...rest
  } = props

  const {
    control
  } = useFormContext()

  const {
    field: {
      value,
      onChange,
      ...others
    },
    fieldState: {error}
  } = useController({
    name,
    control
  })

  const entries = removeDuplicates(options.concat(initOptions), ['value'])
    .reduce<Map<string | number, Value<V>>>((acc, option, i) => {
      const value = renderValue(option)
      const label = renderLabel(option)
      const disabled = getOptionDisabled?.(option) || false
      acc.set(
        value,
        {
          value,
          label,
          disabled,
          key: i
        }
      )
      return acc
    }, new Map())

  // Rollback
  // useEffect(() => {
  //   if (entries.has(value) || value === null) return
  //   setValue(name, null)
  // }, [value, entries, name, setValue])

  return (
    <Fragment>
      {label &&
        labelVariant ===
        'standard' &&
        <MBFFormLabel title={label}
                      name={name}
                      required={required} />}
      <Autocomplete<V, false>
        id={name}
        disabled={disabled}
        loading={loading}
        multiple={false}
        {...(
          disabled && {
            forcePopupIcon: false
          }
        )}
        ListboxProps={{
          // Each item 36px + 16px padding Top, bottom
          style: {
            maxHeight: 36 * 5 + 16,
            overflowY: 'auto'
          }
        }}
        options={options?.map(renderValue)}
        getOptionLabel={(option) => entries.get(option)?.label || ''}
        noOptionsText={!options?.length && !actionText ? 'Không có lựa chọn' : actionText}
        getOptionDisabled={(option) => entries.get(option)?.disabled || false}
        filterOptions={
          onSearch
            ? (options) => {
              return options
            }
            : undefined
        }
        renderInput={(params) => (
          <TextField
            error={Boolean(error)}
            helperText={error?.message && error.message}
            placeholder={disabled ? void 0 : placeholder}
            onChange={(e) => {
              onSearch?.(e.target.value)
            }}
            {...params}
            {...rest}
          />
        )}
        renderOption={(props, option) => {
          if(!entries?.get(option)?.label) return null
          return (
            <Box component='li' {...props}
                 key={option}>
              <Typography variant='subtitle2'>{entries?.get(option)?.label}</Typography>
            </Box>
          )
        }}
        popupIcon={<ExpandMoreOutlinedIcon />}
        {...others}
        value={entries?.has(value) ? value : null}
        onChange={(_event, value) => {
          onSelect?.(value)
          onChange(value)
        }}
      />
    </Fragment>
  )
}

export default MBFFormAutocomplete
