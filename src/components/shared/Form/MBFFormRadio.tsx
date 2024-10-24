import { Option } from '@src/types'
import { AnySchema } from 'yup'
import { useController, useFormContext } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import Validation from '@src/utils/Validation'
import FormControl from '@mui/material/FormControl'
import MBFFormLabel from '@src/components/shared/Form/MBFFormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'

interface MBFFormRadioProps {
  label?: string
  required?: boolean
  labelVariant?: 'standard' | 'outlined'
  name: string
  options: Option<string>[]
  validate?: AnySchema
  defaultValue?: string
  itemLayout?: 'horizontal' | 'vertical',
  disabled?: boolean
}

const MBFFormRadio = (props: MBFFormRadioProps) => {
  const {
    label,
    required = false,
    labelVariant = 'standard',
    name,
    options,
    validate,
    defaultValue,
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
    onChange((event.target as HTMLInputElement).value)
  }

  return (
    <FormControl>
      {label && labelVariant === 'standard' && <MBFFormLabel title={label} name={name} required={required} />}
      <RadioGroup
        name={name}
        value={value}
        onChange={handleChange}
        sx={{ flexDirection: itemLayout === 'horizontal' ? 'row' : 'column' }}
      >
        {options.map(item => (
          <FormControlLabel
            key={item.value}
            control={
              <Radio disabled={disabled} value={item.value} />
            }
            label={item.label}
            sx={{ ml: 0 }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default MBFFormRadio