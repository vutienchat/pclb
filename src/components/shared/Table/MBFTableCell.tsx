import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import type { TableCellProps } from '@mui/material/TableCell'

interface Props extends TableCellProps {
  fixed?: 'left' | 'right' | false
  header?: boolean
  selected?: boolean
  leftOffset: number
  rightOffset: number
  isGrouped: boolean
}

const MBFTableCell = styled(TableCell, {
  shouldForwardProp: (prop: string) =>
    !['fixed', 'header', 'selected', 'leftOffset', 'rightOffset', 'isGrouped'].includes(prop)
})<Props>(({ theme, fixed, header, selected, leftOffset, rightOffset, isGrouped }) => ({
  wordBreak: 'break-all',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  ...(fixed && {
    position: 'sticky',
    ...(fixed === 'left' && {
      left: leftOffset,
      boxShadow: '2px 0px 4px -2px rgb(0 0 0 / 21%)',
      zIndex: theme.zIndex.appBar - 2
    }),
    ...(fixed === 'right' && {
      right: rightOffset,
      boxShadow: '-2px 0px 4px -2px rgb(0 0 0 / 21%)',
      zIndex: theme.zIndex.appBar - 2
    }),
    ...(header && {
      zIndex: theme.zIndex.appBar - 1
    })
  }),
  ...(header && {
    whiteSpace: 'nowrap',
    borderRight: `1px solid ${theme.palette.divider}`
  }),

  backgroundColor: theme.palette.common.white
  // ...(!header && {
  //   backgroundColor: theme.palette.common.white,
  // }),
  // ...(selected && {
  //   backgroundColor: theme.palette.grey[200],
  // }),
}))

export default MBFTableCell
