import Box from '@mui/material/Box'
import DialogContent from '@mui/material/DialogContent'
import LinearProgress from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

import type { DialogContentProps } from '@mui/material/DialogContent'

interface Props extends DialogContentProps {
  loading?: boolean
  disableGutters?: boolean
}

const DialogBody = (props: Props) => {
  const { children, loading, ...rest } = props
  return (
    <Wrapper dividers {...rest}>
      {loading && (
        <Box sx={{ width: 1, position: 'absolute', top: 0, left: 0 }}>
          <LinearProgress sx={{ borderRadius: 0, height: 2 }} />
        </Box>
      )}
      {children}
    </Wrapper>
  )
}

const Wrapper = styled(DialogContent, {
  shouldForwardProp: (prop) => prop !== 'disableGutters'
})<{ disableGutters?: boolean }>(({ disableGutters }) => ({
  position: 'relative',
  ...(disableGutters && {
    padding: 24
  })
}))

export default DialogBody
