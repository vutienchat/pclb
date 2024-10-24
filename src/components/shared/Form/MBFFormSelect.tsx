import Select, { SelectProps } from '@mui/material/Select'
import MBFFormLabel from '@src/components/shared/Form/MBFFormLabel'
import { useController, useFormContext } from 'react-hook-form'
import type { AnySchema } from 'yup'
import Validation from '@src/utils/Validation'
import { Option } from '@src/types'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'

interface MBFFormSelectProps {
  name: string
  label?: string
  required?: boolean
  disabled?: boolean
  validate?: AnySchema
  options: Option<string | number>[]
  SelectProps?: Partial<SelectProps>
}

const MBFFormSelect = (props: MBFFormSelectProps) => {
  const {
    name,
    label,
    required = false,
    disabled = false,
    validate,
    options,
    SelectProps
  } = props
  const { control } = useFormContext()

  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({ name, control, rules: { validate: Validation.validate(validate) } })

  return (
    <>
      {label && <MBFFormLabel title={label} name={name} required={required} />}
      <Select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        sx={{
          ...(error?.message && {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'error.main'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'error.main'
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'error.main'
            }
          })
        }}
        {...SelectProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      {error?.message && (
        <FormHelperText variant="standard" sx={{ color: 'error.main' }} component={'span'}>
          {error.message}
        </FormHelperText>
      )}
    </>
  )
}
export default MBFFormSelect