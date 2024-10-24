import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useController, useFormContext } from 'react-hook-form'

import type { AnySchema } from 'yup'
import type { TextFieldProps } from '@mui/material/TextField'

import MBFFormLabel from './MBFFormLabel'
import Validation from '@src/utils/Validation'

export interface FormTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string
  validate?: AnySchema
  labelVariant?: 'standard' | 'outlined'
}

const MBFFormInput = (props: FormTextFieldProps) => {
  const {
    name,
    placeholder,
    disabled,
    required,
    validate,
    defaultValue,
    label,
    labelVariant = 'standard',
    ...rest
  } = props

  const { control } = useFormContext()

  const {
    field: { value, ref, onBlur, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: validate ? validate.getDefault() : defaultValue,
    rules: { validate: Validation.validate(validate) }
  })

  return (
    <Box sx={{ width: 1 }}>
      {label && labelVariant === 'standard' && <MBFFormLabel title={label} name={name} required={required} />}
      <TextField
        id={name}
        required={required}
        error={Boolean(error)}
        helperText={error?.message && error.message}
        placeholder={disabled ? void 0 : placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        label={labelVariant === 'outlined' ? label : null}
        name={name}
        inputRef={ref}
        {...rest}
      />
    </Box>
  )
}

export default MBFFormInput
