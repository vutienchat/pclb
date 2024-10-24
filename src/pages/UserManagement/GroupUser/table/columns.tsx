import { useMemo } from 'react'
import { Box, ListItem, Tooltip } from '@mui/material'

import Index from '@src/components/shared/Table/components/Index'
import useDialog from '@src/hooks/useDialog'
import { getColumnHelper, GroupUser, TableColumn, type HeadCell } from '@src/types'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'

const columnHelper = getColumnHelper<any>()

const HEAD_CELLS: HeadCell<any> = {
  index: 'STT',

  fullName: 'Người tạo',
  name: 'Tên nhóm',

  actions: 'Hành động'
}

interface Props {
  pageIndex: number
  pageSize: number
  onEdit: (groupUser: GroupUser) => () => void
  onShowDetail: (groupUser: GroupUser) => () => void
  onDelete: (groupUser: GroupUser) => () => void
}

const useGroupUserTable = (props: Props) => {
  const { pageIndex, pageSize, onEdit, onShowDetail, onDelete } = props
  const dialog = useDialog()

  const columns: TableColumn<any> = useMemo(() => {
    return [
      Index<any>(pageIndex, pageSize),
      columnHelper.accessor('name', {
        id: 'name',
        size: 200,
        enableSorting: true,
        header: () => HEAD_CELLS.name,
        cell: (context) => context.renderValue(),
        meta: {
          title: HEAD_CELLS.name
        }
      }),
      columnHelper.accessor('fullName', {
        id: 'fullName',
        size: 250,
        enableSorting: true,
        header: () => HEAD_CELLS.fullName,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.fullName
        }
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => HEAD_CELLS.actions,
        cell: (context: any) => {
          const groupUser: GroupUser = context.row.original

          return (
            <ListItem sx={{ pl: 0 }}>
              <Tooltip title='Xem chi tiết'>
                <Box>
                  <MBFActionIconButton actionType='view' onClick={onShowDetail(groupUser)} />
                </Box>
              </Tooltip>
              <Tooltip title='Chỉnh sửa'>
                <Box>
                  <MBFActionIconButton actionType='edit' onClick={onEdit(groupUser)} />
                </Box>
              </Tooltip>
              {groupUser.isDefault ? null : (
                <Tooltip title='Xóa người dùng'>
                  <Box>
                    <MBFActionIconButton actionType='delete' onClick={onDelete(groupUser)} />
                  </Box>
                </Tooltip>
              )}
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

export default useGroupUserTable
