import type { SvgIconComponent } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { HTMLAttributes, MouseEvent, ReactElement, ReactNode } from 'react'
import { cloneElement, Fragment, isValidElement, useState } from 'react'

import DialogContainer from './DialogContainer'
import DialogContent from './DialogBody'
import DialogFooter from './DialogFooter'
import DialogHeader from './DialogHeader'
import sleep from '@src/utils/sleep'
import Logger from '@src/utils/Logger'

interface Props {
  onSubmit: () => Promise<void>
  children: ReactElement
  content: {
    title: string
    label: string
    description: ReactNode
    submitIcon?: SvgIconComponent
  }
}

const PopConfirm = (props: Props) => {
  const { content, onSubmit, children } = props
  const [open, setOpen] = useState<boolean>(false)

  const { label, title, description, submitIcon: SubmitIcon = CheckIcon } = content

  const handleClick = (_event: MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    try {
      handleClose()
      await sleep(350)
      onSubmit()
    } catch (error) {
      Logger.log(error)
    }
  }

  return (
    <Fragment>
      {isValidElement<HTMLAttributes<HTMLButtonElement>>(children)
        ? cloneElement(children, {
            onClick: handleClick
          })
        : null}
      <DialogContainer open={open} onClose={handleClose} maxWidth='xs'>
        <DialogHeader>{title}</DialogHeader>
        <DialogContent>
          <Typography variant='subtitle1' gutterBottom sx={{ textAlign: 'center' }}>
            {description}
          </Typography>
        </DialogContent>
        <DialogFooter>
          <Button variant='outlined' startIcon={<CloseIcon />} onClick={handleClose}>
            Hủy bỏ
          </Button>
          <LoadingButton startIcon={<SubmitIcon />} color='success' onClick={handleSubmit}>
            {label}
          </LoadingButton>
        </DialogFooter>
      </DialogContainer>
    </Fragment>
  )
}

export default PopConfirm
