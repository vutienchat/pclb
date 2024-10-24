import { Fragment } from 'react'
import Typography from '@mui/material/Typography'
import FormLabel, { formLabelClasses } from '@mui/material/FormLabel'

import { FCC } from '@src/types'
import type { ReactNode } from 'react'
import type { FormLabelProps } from '@mui/material/FormLabel'

interface Props extends Omit<FormLabelProps, 'title'> {
  title: ReactNode
  name: string
}

const MBFFormLabel: FCC<Props> = (props) => {
  const { title, name, children, ...rest } = props

  return (
    <Fragment>
      <FormLabel
        sx={{
          [`& .${formLabelClasses.asterisk}`]: {
            color: 'error.main'
          }
        }}
        htmlFor={name}
        {...rest}
      >
        <Typography variant='body2' sx={{ display: 'inline-block' }} gutterBottom>
          {title}
        </Typography>
      </FormLabel>
      {children}
    </Fragment>
  )
}

export default MBFFormLabel
