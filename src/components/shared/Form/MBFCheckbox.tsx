import Checkbox from '@mui/material/Checkbox'
import FormControlLabel, { type FormControlLabelProps, formControlLabelClasses } from '@mui/material/FormControlLabel'
import { useController, useFormContext } from 'react-hook-form'
import { AnySchema } from 'yup'

import Validation from '@src/utils/Validation'

export interface FormControlProps extends Omit<FormControlLabelProps, 'name' | 'control'> {
  name: string
  validate?: AnySchema
}

const MBFCheckbox = (props: FormControlProps) => {
  const { label, name, validate, defaultValue, ...rest } = props

  const { control } = useFormContext()

  const {
    field: { value, onChange }
  } = useController({
    name,
    control,
    defaultValue: validate ? validate.getDefault() : defaultValue,
    rules: { validate: Validation.validate(validate) }
  })

  return (
    <FormControlLabel
      sx={{
        [`& .${formControlLabelClasses.label}`]: {
          fontSize: '0.875rem',
          pl: '0.25rem',
          '&:hover': {
            color: 'primary.main'
          }
        }
      }}
      label={label}
      control={<Checkbox checked={value} onChange={onChange} inputProps={{ 'aria-label': 'controlled' }} />}
      {...rest}
    />
  )
}

export default MBFCheckbox
