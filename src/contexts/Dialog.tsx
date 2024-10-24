import { createContext, useCallback, useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { FCC } from '@src/types'
import type { LoadingButtonProps } from '@mui/lab/LoadingButton'

import Logger from '@src/utils/Logger'
import sleep from '@src/utils/sleep'
import type { ReactNode } from 'react'

type Operation = () => Promise<void> | void

interface Options {
  icon?: ReactNode
  headline?: string
  supportingText?: string
  content?: ReactNode
  color?: LoadingButtonProps['color']
  onConfirm?: Operation
  onCancel?: Operation | false
}

const noop = async () => {}

export type DialogContextValue = (options: Options) => void

export const DialogContext = createContext<DialogContextValue | null>(null)

const DialogProvider: FCC = (props) => {
  const { children } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [options, setOptions] = useState<Options>({})
  const [resolve, setResolve] = useState<Operation>(noop)
  const [reject, setReject] = useState<Operation | false>(noop)

  const handleConfirm = useCallback((options: Options) => {
    const { headline, supportingText, content, color, icon, onConfirm = noop, onCancel = noop } = options

    setOptions({ headline, supportingText, content, color, icon })
    setResolve(() => onConfirm)
    setReject(() => onCancel)

    setOpen(true)
  }, [])

  const handleClose = async () => {
    setOpen(false)
    await sleep(350)

    setResolve(noop)
    setReject(noop)
    setLoading(false)
  }

  const handleResolve = async () => {
    try {
      setLoading(true)
      await resolve()
    } catch (error) {
      Logger.log(error)
    } finally {
      handleClose()
    }
  }

  const handleReject = () => {
    if (typeof reject === 'function') {
      reject()
    }
    handleClose()
  }

  const { icon, headline, supportingText, content, color } = options

  return (
    <DialogContext.Provider value={handleConfirm}>
      {children}
      <Dialog
        open={open}
        onClose={handleReject}
        scroll='paper'
        maxWidth='xs'
        PaperProps={{ elevation: 3, sx: { borderRadius: 2 } }}
      >
        {headline && (
          <Box
            sx={{
              display: 'grid',
              placeItems: icon ? 'center' : 'flex-start',
              gap: 2
            }}
          >
            <Typography
              variant='h6'
              sx={{
                backgroundColor: 'primary.main',
                color: '#ffffff',
                width: '100%',
                fontWeight: 600,
                fontSize: '24px',
                pl: 2,
                py: 1
              }}
            >
              {headline}
            </Typography>
            {icon}
          </Box>
        )}
        <Box sx={{ pt: headline ? 2 : 3, px: 3 }}>
          {supportingText ? (
            <Typography variant='subtitle1' gutterBottom color='red'>
              {supportingText}
            </Typography>
          ) : (
            content
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 3 }}>
          <Stack justifyContent='center' columnGap={2} width={1}>
            {typeof reject === 'function' && (
              <Button
                variant='text'
                onClick={handleReject}
                sx={{
                  backgroundColor: '#ED1C24',
                  color: '#ffffff',
                  width: '100px',
                  height: '36px',
                  '&:hover': {
                    backgroundColor: '#ED1C24',
                    color: '#ffffff',
                    opacity: 0.8
                  }
                }}
              >
                Hủy
              </Button>
            )}
            <LoadingButton
              loading={loading}
              variant='text'
              color={color}
              onClick={handleResolve}
              sx={{
                backgroundColor: 'primary.main',
                color: '#ffffff',
                width: '100px',
                height: '36px',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: '#ffffff',
                  opacity: 0.8
                }
              }}
            >
              Đồng ý
            </LoadingButton>
          </Stack>
        </Box>
      </Dialog>
    </DialogContext.Provider>
  )
}

export default DialogProvider
