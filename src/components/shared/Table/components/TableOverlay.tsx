import Box from '@mui/material/Box'
import { alpha } from '@mui/material/styles'
import type { RefObject } from 'react'
import type { FCC } from '@src/types'
import useMeasure from '@src/hooks/useMeasure'

interface Props {
  root: RefObject<HTMLDivElement>
  head: RefObject<HTMLDivElement>
  backdrop?: boolean
  above?: boolean
}

const TableOverlay: FCC<Props> = (props) => {
  const { root, head, children, backdrop, above } = props
  const { width, height: containerHeight } = useMeasure(root)
  const { height: headHeight } = useMeasure(head)

  if (!width || !containerHeight || !headHeight) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        width: width,
        height: containerHeight - headHeight,
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...(backdrop && {
          bgcolor: alpha('rgba(255, 255, 255)', 0.38)
        }),
        ...(above && {
          zIndex: (theme) => theme.zIndex.appBar + 3
        })
      }}
    >
      {children}
    </Box>
  )
}

export default TableOverlay
