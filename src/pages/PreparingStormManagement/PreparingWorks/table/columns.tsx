import { useMemo } from 'react'
import { Box, ListItem, Tooltip } from '@mui/material'

import Index from '@src/components/shared/Table/components/Index'
import useDialog from '@src/hooks/useDialog'
import { getColumnHelper, type IWork, TableColumn, type HeadCell } from '@src/types'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'

const columnHelper = getColumnHelper<IWork>()

const HEAD_CELLS: HeadCell<IWork> = {
  index: 'STT',

  name: 'Công việc',
  userGroupsStr: 'Nhóm người nhận công việc',
  note: 'Ghi chú',

  actions: 'Hành động'
}

interface Props {
  pageIndex: number
  pageSize: number
  onEdit: (workId: number) => () => void
  onShowDetail: (workId: number) => () => void
  onDelete: (workId: number) => () => void
}

const useWorksTable = (props: Props) => {
  const { pageIndex, pageSize, onEdit, onShowDetail, onDelete } = props
  const dialog = useDialog()

  const columns: TableColumn<IWork> = useMemo(() => {
    return [
      Index<IWork>(pageIndex, pageSize),

      columnHelper.accessor('name', {
        id: 'name',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.name,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.name
        }
      }),
      columnHelper.accessor('userGroupsStr', {
        id: 'userGroupsStr',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.userGroupsStr,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.userGroupsStr
        }
      }),
      columnHelper.accessor('note', {
        id: 'note',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.note,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.note
        }
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => HEAD_CELLS.actions,
        cell: (context: any) => {
          const work: IWork = context.row.original

          return (
            <ListItem sx={{ pl: 0 }}>
              <Tooltip title='Xem chi tiết'>
                <Box>
                  <MBFActionIconButton actionType='view' onClick={onShowDetail(work.id)} />
                </Box>
              </Tooltip>
              <Tooltip title='Chỉnh sửa'>
                <Box>
                  <MBFActionIconButton actionType='edit' onClick={onEdit(work.id)} />
                </Box>
              </Tooltip>
              <Tooltip title='Xóa công việc'>
                <Box>
                  <MBFActionIconButton actionType='delete' onClick={onDelete(work.id)} />
                </Box>
              </Tooltip>
            </ListItem>
          )
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center'
        }
      }
    ]
  }, [pageIndex, pageSize, onEdit, onShowDetail, dialog])

  return { columns }
}

export default useWorksTable
