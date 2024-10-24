import { createContext, forwardRef, useCallback, useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'

import type { SyntheticEvent } from 'react'
import type { FCC, PickUnion } from '@src/types'
import type { AlertProps } from '@mui/material/Alert'

import { __DEV__ } from '@src/config'
import { setMessage } from '@src/slices/notification'
import { useTypedDispatch, useTypedSelector } from '@src/store'
import HttpError from '@src/utils/HttpError'
import sleep from '@src/utils/sleep'

const AlertMessage = forwardRef<HTMLDivElement, AlertProps>((props, ref) => <Alert ref={ref} {...props} />)

interface Settings {
  message: string | null
  error: string | null
  severity?: AlertProps['severity']
  onUndo?: () => Promise<void> | void
  onForward?: () => Promise<void> | void
}

export type NotificationContextValue = (config: PickUnion<Settings>) => void

const NotificationContext = createContext<NotificationContextValue | null>(null)

if (__DEV__) {
  NotificationContext.displayName = 'NotificationContext'
}

const initialSettings: Settings = {
  message: null,
  error: null
}

const NotificationProvider: FCC = (props) => {
  const { children } = props
  const dispatch = useTypedDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const messageCode = useTypedSelector((state) => state.notification.message)

  useEffect(() => {
    if (messageCode) {
      const message = HttpError.parse(messageCode)
      setSettings({
        message: null,
        error: message
      })
      setOpen(true)
    }
  }, [messageCode])

  const { message, error, severity = 'success', onUndo, onForward } = settings

  const handleReset = async () => {
    setOpen(false)
    await sleep(350)
    setSettings(initialSettings)
    dispatch(setMessage(null))
  }

  const handleClose = async (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    handleReset()
  }

  const handleUndo = async (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    onUndo?.()
    handleReset()
  }

  const handleForward = async (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    onForward?.()
    handleReset()
  }

  const setNotification = useCallback((settings: PickUnion<Settings>) => {
    setSettings((state) => ({
      ...state,
      ...settings
    }))
    setOpen(true)
  }, [])

  return (
    <NotificationContext.Provider value={setNotification}>
      {children}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <AlertMessage
          onClose={handleClose}
          severity={error ? 'error' : severity}
          action={
            <Stack>
              {typeof onUndo === 'function' && (
                <Button variant='text' color='inherit' onClick={handleUndo}>
                  Cancel
                </Button>
              )}
              {typeof onForward === 'function' && (
                <Button variant='text' color='inherit' onClick={handleForward}>
                  Yes
                </Button>
              )}
              <IconButton color='inherit' onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          }
        >
          {error || message}
        </AlertMessage>
      </Snackbar>
    </NotificationContext.Provider>
  )
}

export { NotificationContext as default, NotificationProvider }
