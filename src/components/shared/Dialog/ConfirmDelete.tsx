import { forwardRef, type MouseEvent, useImperativeHandle, useState } from 'react'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import DialogContent from '@src/components/shared/Dialog/DialogBody'
import Typography from '@mui/material/Typography'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import sleep from '@src/utils/sleep'
import Logger from '@src/utils/Logger'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useTheme } from '@mui/material/styles'

interface ConfirmDeleteProps {
  title: string
  onSubmit: (id: number) => void
}

export interface ConfirmDeleteRef {
  open: (id: number, description: string) => void,
  close: () => void
}

const ConfirmDelete = forwardRef<ConfirmDeleteRef, ConfirmDeleteProps>((props, ref) => {
  const {
    title,
    onSubmit
  } = props

  const theme = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = (_event: MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setId(0)
  }

  const handleOpen = (id: number, des: string) => {
    setOpen(true)
    setId(id)
    setDescription(des)
  }

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }))

  const handleSubmit = async () => {
    try {
      handleClose()
      onSubmit(id)
    } catch (error) {
      Logger.log(error)
    }
  }

  return (
    <DialogContainer open={open} onClose={handleClose} maxWidth="xs">
      <DialogHeader>{title}</DialogHeader>
      <DialogContent sx={{ textAlign: 'center' }}>
        <DeleteOutlinedIcon sx={{ fontSize: 80, color: theme.palette.error.main }} />
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', color: theme.palette.error.main }}>
          {description}
        </Typography>
      </DialogContent>
      <DialogFooter>
        <Button variant="outlined" onClick={handleClose}>
          Hủy bỏ
        </Button>
        <LoadingButton color="error" onClick={handleSubmit} loading={loading}>
          Đồng ý
        </LoadingButton>
      </DialogFooter>
    </DialogContainer>
  )
})
export default ConfirmDelete