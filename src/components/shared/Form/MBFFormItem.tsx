import Box from '@mui/material/Box'

import type { BoxProps } from '@mui/material/Box'

const MBFFormItem = (props: BoxProps) => {
  const { children, ...rest } = props
  return (
    <Box sx={{ '& + &': { mt: 2 } }} {...rest}>
      {children}
    </Box>
  )
}

export default MBFFormItem
