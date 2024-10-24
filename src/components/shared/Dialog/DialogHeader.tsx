import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import type { FCC } from '@src/types'

interface Props {
  onClose?: () => void
}

const DialogHeader: FCC<Props> = (props) => {
  const { children, onClose } = props

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        py: 1,
        px: 2
      }}
    >
      <Typography variant='body1' sx={{ fontWeight: 500, color: 'primary.contrastText', fontSize: 24 }}>
        {children}
      </Typography>
      {typeof onClose === 'function' && (
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ fill: '#ffffff' }} />
        </IconButton>
      )}
    </Box>
  )
}

export default DialogHeader
