import { FCC } from '@src/types/app/react'
import { styled } from '@mui/material/styles'
import SimpleBar from 'simplebar-react'

import 'simplebar-react/dist/simplebar.min.css'

const NavigationScrollbar: FCC = (props) => {
  const { children } = props
  return (
    <Scrollbar
      sx={{
        mt: 2,
        maxHeight: 'calc(100vh - 64px)'
      }}
    >
      {children}
    </Scrollbar>
  )
}

const Scrollbar = styled(SimpleBar)({})

export default NavigationScrollbar
