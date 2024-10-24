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
import {
  removeDuplicates,
  removeDuplicatesValueArray
} from "@src/utils/common";

interface Value<T> {
  key: string | number
  label: string
  value: T
  disabled: boolean
}

interface Props<O extends FieldValues, V extends string | number | any>
  extends Omit<TextFieldProps, 'name' | 'onSelect'> {
  name: string
  options: O[]
  renderLabel?: (option: O) => string
  renderValue?: (option: O) => V
  getOptionDisabled?: (option: O) => boolean
  onSelect?: (value: V) => void
  placeholder?: string
  actionText?: string // Like placeholder, but for instruction
  labelVariant?: 'standard' | 'outlined'
  onSearch?: (value: any) => void
  loading?: boolean
  initOptions?: O[],
  /** Fixed select option - can't delete */
  fixedSelect?: O[],
  onChangeAutoInput?: (value: V[]) => void
}

const MBFFormAutocompleteMultiple = <O extends FieldValues, V extends string | number>(props: Props<O, V>) => {
  const {
    name,
    options,
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
    onSearch,
    loading = false,
    initOptions = [],
    fixedSelect = [],
    onChangeAutoInput,
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
      <Autocomplete<V, true>
        id={name}
        disabled={disabled}
        loading={loading}
        multiple={true}
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
        options={options.map(renderValue)}
        getOptionLabel={(option) => entries.get(option)?.label || ''}
        noOptionsText={!options.length && !actionText ? 'Không có lựa chọn' : actionText}
        getOptionDisabled={(option) => entries.get(option)?.disabled || false}
        renderInput={(params) => (
          <TextField
            error={Boolean(error)}
            helperText={error?.message && error.message}
            placeholder={disabled ? void 0 : placeholder}
            onChange={e => {
              onSearch?.(e.target.value)
            }}
            {...params}
            {...rest}
          />
        )}
        filterOptions={onSearch ? (options) => {
          return options
        } : undefined}
        renderOption={(props, option) => (
          <Box component="li" {...props}
               key={option}>
            <Typography variant="subtitle2">{entries.get(option)?.label}</Typography>
          </Box>
        )}
        renderTags={(value) =>
          value.map((option) => entries.get(option)?.label)
            .join(', ')
        }
        popupIcon={<ExpandMoreOutlinedIcon />}
        {...others}
        value={value}
        onChange={(_event, value) => {
          const data = removeDuplicatesValueArray(fixedSelect.map(i => i.value)
            .concat(value))
          onChangeAutoInput?.(data)
          onChange(data)
        }}
      />
    </Fragment>
  )
}

export default MBFFormAutocompleteMultiple
