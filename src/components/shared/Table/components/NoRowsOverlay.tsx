import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { RefObject } from 'react'
import TableOverlay from './TableOverlay'

interface Props {
  visible?: boolean
  scroll: boolean
  root: RefObject<HTMLDivElement>
  head: RefObject<HTMLDivElement>
}

const NoRowsOverlay = (props: Props) => {
  const { visible, scroll, root, head } = props

  if (!visible || !scroll) {
    return null
  }

  return (
    <TableOverlay root={root} head={head}>
      <Box
        sx={{
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant='subtitle2'>Không có dữ liệu</Typography>
      </Box>
    </TableOverlay>
  )
}

export default NoRowsOverlay
