import { Box, Stack, type BoxProps } from '@mui/material'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'

import Image from '../core/Image'
import { FCC } from '@src/types'

import DEFAULT_AVATAR from '@src/assets/images/default_avatar.png'
import UploadButton from './Button/UploadButton'
import { useState } from 'react'

interface UploadableAvatarProps extends BoxProps {
  src?: string
  enableUpload?: boolean
  setImage?: (image: File) => void
}

const UploadableAvatar: FCC<UploadableAvatarProps> = (props) => {
  const { sx, enableUpload, src, setImage, ...rest } = props
  const [file, setFile] = useState<string | null>(null)

  const onChangeFile = (image: File) => {
    const url = URL.createObjectURL(image)
    setFile(url)
    setImage && setImage(image)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      <Box
        {...rest}
        sx={{
          ...sx,
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          border: '1px solid #000000',
          position: 'relative'
        }}
      >
        <Image alt='avatar' src={file || src || DEFAULT_AVATAR} width={'120px'} height={'120px'} />
        {enableUpload ? (
          <CameraAltOutlinedIcon
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '32px',
              height: '32px',
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: '4px',
              cursor: 'pointer'
            }}
          />
        ) : null}
      </Box>
      {enableUpload ? (
        <Stack>
          <UploadButton setImage={onChangeFile} />
        </Stack>
      ) : null}
    </Box>
  )
}

export default UploadableAvatar
