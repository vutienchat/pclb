import { useState } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

import type { LoadingButtonProps } from '@mui/lab/LoadingButton'

import Logger from '@src/utils/Logger'

type TActionTypeButton =
  | 'search'
  | 'download'
  | 'save'
  | 'cancel'
  | 'delete'
  | 'check'
  | 'add'
  | 'upload'
  | 'return'
  | 'forward'
  | 'outward'
  | 'login'
  | 'edit'
  | 'expandMore'

interface Props extends LoadingButtonProps {
  actionType: TActionTypeButton
  iconPosition?: 'start' | 'end'
  onSubmit?: () => Promise<void>
}

const MBFButton = (props: Props) => {
  const { actionType, iconPosition = 'start', onSubmit, loading, ...rest } = props

  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (!onSubmit) {
      return
    }

    try {
      setSubmitting(true)
      await onSubmit()
    } catch (error) {
      Logger.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <LoadingButton
      onClick={handleSubmit}
      loading={submitting || loading}
      {...((submitting || loading) && {
        loadingPosition: 'start',
        startIcon: <></>
      })}
      sx={{
        ...(actionType === 'cancel' && {
          borderColor: (theme) => theme.palette.error.main,
          backgroundColor: 'error.main',
          color: '#ffffff',
          '&:hover': {
            opacity: 0.8,
            backgroundColor: 'error.main',
            color: '#ffffff'
          }
        })
      }}
      {...rest}
    />
  )
}

export default MBFButton
