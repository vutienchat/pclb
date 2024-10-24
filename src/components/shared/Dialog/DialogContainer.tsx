import Dialog from '@mui/material/Dialog'

import type { DialogProps } from '@mui/material/Dialog'

const DialogContainer = (props: DialogProps) => {
  const { children, open, onClose, ...rest } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll='paper'
      PaperProps={{ elevation: 3, sx: { borderRadius: 0, position: 'relative' } }}
      fullWidth
      {...rest}
      sx={{
        maxHeight: '100%'
      }}
    >
      {children}
    </Dialog>
  )
}

export default DialogContainer
