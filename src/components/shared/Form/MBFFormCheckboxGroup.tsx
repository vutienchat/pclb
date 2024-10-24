import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import MBFFormLabel from '@src/components/shared/Form/MBFFormLabel'
import { Option } from '@src/types'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { AnySchema } from 'yup'
import { useController, useFormContext } from 'react-hook-form'
import Validation from '@src/utils/Validation'
import FormHelperText from '@mui/material/FormHelperText'
import { useTheme } from '@mui/material/styles'

interface MBFFormCheckboxGroupProps {
  label: string
  required?: boolean
  labelVariant?: 'standard' | 'outlined'
  name: string
  options: Option<string>[]
  validate?: AnySchema
  defaultValue?: string[]
  itemLayout?: 'horizontal' | 'vertical',
  disabled?: boolean
}

const MBFFormCheckboxGroup = (props: MBFFormCheckboxGroupProps) => {
  const {
    label,
    required = false,
    labelVariant = 'standard',
    name,
    options,
    validate,
    defaultValue = [],
    itemLayout = 'horizontal',
    disabled = false
  } = props
  const { control } = useFormContext()
  const theme = useTheme()
  const {
    field: { value, onChange }, fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: validate ? validate.getDefault() : defaultValue,
    rules: { validate: Validation.validate(validate) }
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    const newValue = checked
      ? [...(value as string[]), name]
      : (value as string[]).filter(item => item !== name)
    onChange(newValue)
  }

  return (
    <FormControl>
      {label && labelVariant === 'standard' && <MBFFormLabel title={label} name={name} required={required} />}
      <FormGroup
        sx={{ flexDirection: itemLayout === 'horizontal' ? 'row' : 'column' }}
      >
        {options.map(item => (
          <FormControlLabel
            key={item.value}
            control={
              <Checkbox
                checked={(value as string[]).includes(item.value)}
                name={item.value}
                onChange={handleChange}
                disabled={disabled}
              />
            }
            label={item.label}
            sx={{ ml: 0 }}
          />
        ))}
      </FormGroup>
      {error?.message && (
        <FormHelperText sx={{ color: theme.palette.error.main }}>
          {error?.message}
        </FormHelperText>
      )}

    </FormControl>
  )
}
export default MBFFormCheckboxGroup