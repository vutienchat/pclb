import FormControl from '@mui/material/FormControl'
import type { FormControlLabelProps } from '@mui/material/FormControlLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Switch from '@mui/material/Switch'
import Validation from '@src/utils/Validation'
import { useController, useFormContext } from 'react-hook-form'
import type { AnySchema } from 'yup'

export interface FormTextFieldProps extends Omit<FormControlLabelProps, 'control'> {
  name: string
  validate?: AnySchema
  onChecked?: (value: boolean) => void
  label: string
  checkedLabel: string
}

const MBFFormSwitch = (props: FormTextFieldProps) => {
  const { name, disabled, validate, defaultValue, onChecked, label, checkedLabel, ...rest } = props

  const { control } = useFormContext()

  const {
    field: { value, ref, onChange },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: validate ? validate.getDefault() : defaultValue,
    rules: { validate: Validation.validate(validate) }
  })

  return (
    <FormControl error={Boolean(error)} sx={{ display: 'flex' }}>
      <FormControlLabel
        {...rest}
        control={
          <Switch
            id={name}
            name={name}
            disabled={disabled}
            inputRef={ref}
            checked={Boolean(value)}
            onChange={(event) => {
              const checked = event.target.checked
              onChange(checked)
              onChecked?.(checked)
            }}
          />
        }
        label={value ? checkedLabel : label}
        componentsProps={{
          typography: { variant: 'subtitle2' }
        }}
      />
      {error?.message && <FormHelperText variant='standard'>{error.message}</FormHelperText>}
    </FormControl>
  )
}

export default MBFFormSwitch
