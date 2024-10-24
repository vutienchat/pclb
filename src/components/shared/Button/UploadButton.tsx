import { Box, Button, ButtonProps } from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { ChangeEventHandler } from 'react'
import { FCC } from '@src/types'

interface UploadButtonsProps extends ButtonProps {
  label?: string
  setImage: (image: File) => void
}

const UploadButton: FCC<UploadButtonsProps> = (props) => {
  const { label = 'Tải ảnh từ file, tệp', sx, setImage, ...rest } = props

  const onUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    setImage(file)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
          margin: 1
        },
        '& > input': {
          display: 'none'
        }
      }}
    >
      <input accept='image/*' id='contained-button-file' type='file' onChange={onUpload} />
      <label htmlFor='contained-button-file'>
        <Button
          variant='contained'
          component='span'
          startIcon={<FileUploadOutlinedIcon sx={{ width: '32px', height: '32px' }} />}
          {...rest}
          sx={{
            ...sx,
            backgroundColor: '#ffffff',
            color: 'primary.main',
            textTransform: 'none',
            fontSize: '14px',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#ffffff',
              color: 'primary.main',
              opacity: 0.8
            }
          }}
        >
          {label}
        </Button>
      </label>
    </Box>
  )
}

export default UploadButton
